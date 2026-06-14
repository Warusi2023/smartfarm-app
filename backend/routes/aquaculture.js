/**
 * Aquaculture Phase 1 API routes.
 */

const express = require('express');
const AuthMiddleware = require('../middleware/auth');
const { validate } = require('../middleware/validator');
const { asyncHandler } = require('../middleware/error-handler');
const AquacultureService = require('../services/aquacultureService');
const logger = require('../utils/logger');

class AquacultureRoutes {
    constructor(dbPool = null) {
        this.router = express.Router();
        this.dbPool = dbPool;
        this.authMiddleware = new AuthMiddleware();
        this.service = dbPool ? new AquacultureService(dbPool) : null;
        this.setupRoutes();
    }

    setupRoutes() {
        this.router.get(
            '/units',
            this.authMiddleware.authenticate(),
            validate('aquaculture.listUnits'),
            asyncHandler(this.listUnits.bind(this))
        );
        this.router.post(
            '/units',
            this.authMiddleware.authenticate(),
            validate('aquaculture.createUnit'),
            asyncHandler(this.createUnit.bind(this))
        );
        this.router.get(
            '/units/:unitId',
            this.authMiddleware.authenticate(),
            validate('aquaculture.getUnit'),
            asyncHandler(this.getUnit.bind(this))
        );
        this.router.patch(
            '/units/:unitId',
            this.authMiddleware.authenticate(),
            validate('aquaculture.updateUnit'),
            asyncHandler(this.updateUnit.bind(this))
        );
        this.router.get(
            '/units/:unitId/logs',
            this.authMiddleware.authenticate(),
            validate('aquaculture.listLogs'),
            asyncHandler(this.listLogs.bind(this))
        );
        this.router.post(
            '/units/:unitId/logs',
            this.authMiddleware.authenticate(),
            validate('aquaculture.saveLog'),
            asyncHandler(this.saveLog.bind(this))
        );
        this.router.get(
            '/status',
            this.authMiddleware.authenticate(),
            validate('aquaculture.farmStatus'),
            asyncHandler(this.getFarmStatus.bind(this))
        );
    }

    ensureService(res) {
        if (!this.service) {
            res.status(503).json({
                success: false,
                error: 'Database unavailable',
                code: 'DB_UNAVAILABLE'
            });
            return false;
        }
        return true;
    }

    handleServiceError(res, error) {
        const status = error.statusCode || 500;
        if (status >= 500) {
            logger.errorWithContext('Aquaculture route error', { error: error.message, code: error.code });
        }
        res.status(status).json({
            success: false,
            error: error.message || 'Aquaculture request failed',
            code: error.code || 'AQUACULTURE_ERROR'
        });
    }

    async listUnits(req, res) {
        if (!this.ensureService(res)) {
            return;
        }
        try {
            const { farmId } = req.query;
            const units = await this.service.listUnits(req.user.id, farmId);
            res.json({ success: true, data: units });
        } catch (error) {
            this.handleServiceError(res, error);
        }
    }

    async createUnit(req, res) {
        if (!this.ensureService(res)) {
            return;
        }
        try {
            const unit = await this.service.createUnit(req.user.id, req.body);
            res.status(201).json({ success: true, data: unit });
        } catch (error) {
            this.handleServiceError(res, error);
        }
    }

    async getUnit(req, res) {
        if (!this.ensureService(res)) {
            return;
        }
        try {
            const unit = await this.service.getUnitDetail(req.user.id, req.params.unitId);
            res.json({ success: true, data: unit });
        } catch (error) {
            this.handleServiceError(res, error);
        }
    }

    async updateUnit(req, res) {
        if (!this.ensureService(res)) {
            return;
        }
        try {
            const unit = await this.service.updateUnit(req.user.id, req.params.unitId, req.body);
            res.json({ success: true, data: unit });
        } catch (error) {
            this.handleServiceError(res, error);
        }
    }

    async listLogs(req, res) {
        if (!this.ensureService(res)) {
            return;
        }
        try {
            const { from, to } = req.query;
            const logs = await this.service.listLogs(req.user.id, req.params.unitId, from, to);
            res.json({ success: true, data: logs });
        } catch (error) {
            this.handleServiceError(res, error);
        }
    }

    async saveLog(req, res) {
        if (!this.ensureService(res)) {
            return;
        }
        try {
            const result = await this.service.upsertDailyLog(req.user.id, req.params.unitId, req.body);
            res.json({ success: true, data: result });
        } catch (error) {
            this.handleServiceError(res, error);
        }
    }

    async getFarmStatus(req, res) {
        if (!this.ensureService(res)) {
            return;
        }
        try {
            const { farmId } = req.query;
            const status = await this.service.getFarmStatus(req.user.id, farmId);
            res.json({ success: true, data: status });
        } catch (error) {
            this.handleServiceError(res, error);
        }
    }

    getRouter() {
        return this.router;
    }
}

module.exports = AquacultureRoutes;
