/**
 * Crop recommendation action log, soil tests, and derived alerts
 */

const express = require('express');
const store = require('../services/cropRecommendationStore');
const soilTestsStore = require('../services/soilTestsStore');
const farmCostsStore = require('../services/farmCostsStore');
const { refineRecommendationsWithSoil } = require('../services/soilAdviceRefiner');
const { asyncHandler } = require('../middleware/error-handler');
const AuthMiddleware = require('../middleware/auth');
const logger = require('../utils/logger');

const ALLOWED_STATUSES = new Set(['scheduled', 'completed', 'skipped', 'not_started']);
const ALLOWED_ACTION_TYPES = new Set([
    'fertilizer', 'watering', 'soil_test', 'ph_correction', 'compost', 'general'
]);

class CropRecommendationRoutes {
    constructor(dbPool = null) {
        this.router = express.Router();
        this.dbPool = dbPool;
        this.authMiddleware = new AuthMiddleware();
        this.setupRoutes();
    }

    setupRoutes() {
        this.router.use(this.authMiddleware.optionalAuth());

        this.router.post('/snapshots', asyncHandler(this.createSnapshot.bind(this)));
        this.router.post('/actions', asyncHandler(this.createAction.bind(this)));
        this.router.get('/actions/crop/:cropId', asyncHandler(this.getActionsByCrop.bind(this)));
        this.router.get('/history/crop/:cropId', asyncHandler(this.getHistory.bind(this)));
        this.router.post('/soil-tests', asyncHandler(this.createSoilTest.bind(this)));
        this.router.get(
            '/soil-tests/latest/:cropId',
            asyncHandler(this.getLatestSoilTest.bind(this))
        );
        this.router.post('/refine-advice', asyncHandler(this.refineAdvice.bind(this)));
        this.router.get('/alerts', asyncHandler(this.listAlerts.bind(this)));
        this.router.patch('/alerts/:alertId', asyncHandler(this.patchAlert.bind(this)));
    }

    getUserId(req) {
        return (req.user && req.user.id) || 'default-user';
    }

    requireCropId(body) {
        const cropId = body && body.cropId;
        if (cropId === undefined || cropId === null || String(cropId).trim() === '') {
            return null;
        }
        return String(cropId).trim();
    }

    async createSnapshot(req, res) {
        const cropId = this.requireCropId(req.body);
        if (!cropId) {
            return res.status(400).json({ success: false, error: 'cropId is required' });
        }
        const userId = this.getUserId(req);
        const rec = store.saveRecommendationSnapshot({ ...req.body, cropId, userId });
        res.status(201).json({ success: true, data: rec });
    }

    async createAction(req, res) {
        const cropId = this.requireCropId(req.body);
        if (!cropId) {
            return res.status(400).json({ success: false, error: 'cropId is required' });
        }
        const status = req.body.status || 'scheduled';
        if (!ALLOWED_STATUSES.has(status)) {
            return res.status(400).json({ success: false, error: 'Invalid status' });
        }
        const actionType = req.body.actionType || 'general';
        if (!ALLOWED_ACTION_TYPES.has(actionType)) {
            return res.status(400).json({ success: false, error: 'Invalid actionType' });
        }
        const userId = this.getUserId(req);
        const costParsed = this.parseOptionalCost(req.body);
        if (costParsed.error) {
            return res.status(400).json({ success: false, error: costParsed.error });
        }
        if (costParsed.amount > 0 && !soilTestsStore.isUuid(userId)) {
            return res.status(400).json({
                success: false,
                error: 'Sign in to record action costs in farm financials'
            });
        }

        const result = store.createAction({ ...req.body, cropId, userId });

        let farmCost = null;
        let farmCostWarning = null;
        if (costParsed.amount > 0) {
            if (!this.dbPool) {
                farmCostWarning = 'Cost was not saved — database unavailable';
            } else {
                try {
                    farmCost = await farmCostsStore.insertCropActionFarmCost(this.dbPool, {
                        userId: userId,
                        farmId: req.body.farmId || req.body.farm_id || null,
                        amount: costParsed.amount,
                        cropActionId: result.action.id,
                        cropId: cropId,
                        actionType: req.body.actionType || 'general',
                        costNote: costParsed.note,
                        fieldId: req.body.fieldId || req.body.field_id || '',
                        alertId: result.alert && result.alert.id
                    });
                } catch (costErr) {
                    logger.warnWithContext('Crop action saved but farmcosts insert failed', {
                        error: costErr,
                        cropId,
                        userId,
                        actionId: result.action.id
                    });
                    farmCostWarning =
                        costErr.message || 'Cost could not be saved to financial records';
                }
            }
        }

        res.status(201).json({
            success: true,
            message: 'Action logged',
            data: { ...result, farmCost, farmCostWarning }
        });
    }

    parseOptionalCost(body) {
        const raw =
            body && body.costAmount != null
                ? body.costAmount
                : body && body.cost != null
                  ? body.cost
                  : null;
        if (raw == null || raw === '') {
            return { amount: 0, note: null, error: null };
        }
        const amount = Number(raw);
        if (!Number.isFinite(amount) || amount < 0) {
            return { amount: 0, note: null, error: 'costAmount must be a non-negative number' };
        }
        const note =
            body.costNote != null && String(body.costNote).trim() !== ''
                ? String(body.costNote).trim()
                : null;
        return { amount, note, error: null };
    }

    async getActionsByCrop(req, res) {
        const userId = this.getUserId(req);
        const actions = store.getActionsByCrop(req.params.cropId, userId);
        res.json({ success: true, data: actions });
    }

    async getHistory(req, res) {
        const userId = this.getUserId(req);
        const history = store.getHistoryByCrop(req.params.cropId, userId);
        res.json({ success: true, data: history });
    }

    async createSoilTest(req, res) {
        const cropId = this.requireCropId(req.body);
        if (!cropId) {
            return res.status(400).json({ success: false, error: 'cropId is required' });
        }
        const userId = this.getUserId(req);
        const payload = { ...req.body, cropId, userId };

        if (this.dbPool && soilTestsStore.isUuid(userId)) {
            try {
                const test = await soilTestsStore.insertSoilTest(this.dbPool, payload);
                const alert = store.createSoilTestAlert(test, payload);
                logger.info('Soil test saved to Postgres', { soilTestId: test.id, userId });
                return res.status(201).json({
                    success: true,
                    data: { test, alert }
                });
            } catch (dbErr) {
                logger.warnWithContext('Postgres soil test insert failed; using file store', {
                    error: dbErr,
                    userId,
                    cropId
                });
            }
        }

        const result = store.saveSoilTest(payload);
        res.status(201).json({ success: true, data: result });
    }

    pickLatestSoilTest(dbTest, fileTest) {
        if (!dbTest) return fileTest || null;
        if (!fileTest) return dbTest || null;
        const dbDate = String(dbTest.testDate || '');
        const fileDate = String(fileTest.testDate || '');
        if (fileDate > dbDate) return fileTest;
        if (dbDate > fileDate) return dbTest;
        const dbCreated = dbTest.createdAt ? new Date(dbTest.createdAt).getTime() : 0;
        const fileCreated = fileTest.createdAt ? new Date(fileTest.createdAt).getTime() : 0;
        return fileCreated > dbCreated ? fileTest : dbTest;
    }

    async getLatestSoilTest(req, res) {
        const cropId = String(req.params.cropId || '').trim();
        if (!cropId) {
            return res.status(400).json({ success: false, error: 'cropId is required' });
        }
        const userId = this.getUserId(req);

        let dbTest = null;
        if (this.dbPool && soilTestsStore.isUuid(userId)) {
            try {
                dbTest = await soilTestsStore.getLatestSoilTestForCrop(this.dbPool, cropId, userId);
            } catch (dbErr) {
                logger.warnWithContext('Postgres latest soil test read failed', {
                    error: dbErr,
                    cropId,
                    userId
                });
            }
        }

        const fileTest = store.getLatestSoilTestFromFile(cropId, userId);
        const latest = this.pickLatestSoilTest(dbTest, fileTest);

        res.json({ success: true, data: latest });
    }

    async refineAdvice(req, res) {
        const { soilTest, recommendations } = req.body;
        const refined = refineRecommendationsWithSoil(soilTest || {}, recommendations || {});
        res.json({ success: true, data: refined });
    }

    async listAlerts(req, res) {
        const userId = this.getUserId(req);
        const data = store.listAlerts({
            cropId: req.query.cropId,
            userId,
            status: req.query.status
        });
        res.json({ success: true, data });
    }

    async patchAlert(req, res) {
        const userId = this.getUserId(req);
        const updates = {};
        if (req.body.status !== undefined) updates.status = req.body.status;
        if (req.body.notes !== undefined) updates.notes = req.body.notes;
        const updated = store.updateAlert(req.params.alertId, updates, userId);
        if (!updated) {
            return res.status(404).json({ success: false, error: 'Alert not found' });
        }
        res.json({ success: true, data: updated });
    }

    getRouter() {
        return this.router;
    }
}

module.exports = CropRecommendationRoutes;
