/**
 * Crop recommendation action log, soil tests, and derived alerts
 */

const express = require('express');
const store = require('../services/cropRecommendationStore');
const { refineRecommendationsWithSoil } = require('../services/soilAdviceRefiner');
const { asyncHandler } = require('../middleware/error-handler');
const AuthMiddleware = require('../middleware/auth');

const ALLOWED_STATUSES = new Set(['scheduled', 'completed', 'skipped', 'not_started']);
const ALLOWED_ACTION_TYPES = new Set([
    'fertilizer', 'watering', 'soil_test', 'ph_correction', 'compost', 'general'
]);

class CropRecommendationRoutes {
    constructor() {
        this.router = express.Router();
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
        const result = store.createAction({ ...req.body, cropId, userId });
        res.status(201).json({
            success: true,
            message: 'Action logged',
            data: result
        });
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
        const result = store.saveSoilTest({ ...req.body, cropId, userId });
        res.status(201).json({ success: true, data: result });
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
