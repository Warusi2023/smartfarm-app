/**
 * Farm summary API — financial totals and manual revenue (W2-07 / W2-08).
 */

const express = require('express');
const AuthMiddleware = require('../middleware/auth');
const { asyncHandler } = require('../middleware/error-handler');
const { BadRequestError, ServiceUnavailableError } = require('../utils/errors');
const farmRevenueStore = require('../services/farmRevenueStore');
const farmSummaryFinancials = require('../services/farmSummaryFinancials');
const farmCommandCenter = require('../services/farmCommandCenter');
const writeIdempotency = require('../services/writeIdempotency');
const { ConflictError } = require('../utils/errors');
const logger = require('../utils/logger');

class FarmSummaryRoutes {
    constructor(dbPool = null) {
        this.router = express.Router();
        this.dbPool = dbPool;
        this.authMiddleware = new AuthMiddleware();
        this.setupRoutes();
    }

    setupRoutes() {
        this.router.get(
            '/financials',
            this.authMiddleware.authenticate(),
            asyncHandler(this.getFinancials.bind(this))
        );

        this.router.get(
            '/command-center',
            this.authMiddleware.authenticate(),
            asyncHandler(this.getCommandCenter.bind(this))
        );

        this.router.post(
            '/revenue',
            this.authMiddleware.authenticate(),
            asyncHandler(this.createRevenue.bind(this))
        );
    }

    /**
     * GET /api/farm-summary/financials?period=month&farmId=
     */
    /**
     * GET /api/farm-summary/command-center?window=today|7d|30d (week → 7d)
     */
    async getCommandCenter(req, res) {
        if (!this.dbPool) {
            throw new ServiceUnavailableError('Command center is not available');
        }

        const window = farmCommandCenter.normalizeWindow(req.query.window);
        const data = await farmCommandCenter.getCommandCenter(this.dbPool, req.user.id, {
            window: window
        });

        res.json({
            success: true,
            data: data
        });
    }

    async getFinancials(req, res) {
        if (!this.dbPool) {
            throw new ServiceUnavailableError('Financial summary is not available');
        }

        const period = req.query.period || 'month';
        const farmId = req.query.farmId || req.query.farm_id || null;

        const data = await farmSummaryFinancials.getFinancialSummary(this.dbPool, req.user.id, {
            period: period,
            farmId: farmId
        });

        res.json({
            success: true,
            data: data
        });
    }

    /**
     * POST /api/farm-summary/revenue
     */
    async createRevenue(req, res) {
        if (!this.dbPool) {
            throw new ServiceUnavailableError('Revenue storage is not available');
        }

        const body = req.body || {};
        const amount = Number(body.amount);
        if (body.amount == null || body.amount === '' || !Number.isFinite(amount) || amount < 0) {
            throw new BadRequestError('amount must be a non-negative number');
        }

        let farmId = body.farmId || body.farm_id || null;
        if (farmId != null && String(farmId).trim() === '') {
            farmId = null;
        }

        const description = body.description != null ? String(body.description).trim() : '';
        const entryDate =
            farmRevenueStore.parseDateOnly(body.date) ||
            farmRevenueStore.parseDateOnly(new Date().toISOString().slice(0, 10));

        const links = {};
        if (body.category) links.category = String(body.category).trim();
        if (body.cropName) links.cropName = String(body.cropName).trim();
        if (body.livestockType) links.livestockType = String(body.livestockType).trim();
        if (body.note) links.note = String(body.note).trim();

        const userId = req.user.id;
        const clientRequestId = body.clientRequestId;

        const out = await writeIdempotency.runIdempotent({
            userId,
            operation: 'farm-revenue',
            clientRequestId,
            payload: body,
            execute: async () => {
                const payloadHash = writeIdempotency.hashPayload('farm-revenue', body);

                if (clientRequestId) {
                    const existing = await farmRevenueStore.findByClientRequestId(
                        this.dbPool,
                        userId,
                        clientRequestId
                    );
                    if (existing) {
                        if (
                            existing.storedPayloadHash &&
                            existing.storedPayloadHash !== payloadHash
                        ) {
                            throw new ConflictError(
                                'This clientRequestId was already used with a different payload'
                            );
                        }
                        logger.info('Farm revenue idempotent hit (Postgres)', {
                            revenueId: existing.row.id,
                            clientRequestId,
                            userId
                        });
                        return existing.row;
                    }
                }

                return farmRevenueStore.insertFarmRevenue(this.dbPool, {
                    userId: userId,
                    farmId: farmId,
                    type: String(body.type || 'manual').trim() || 'manual',
                    amount: amount,
                    description: description,
                    date: entryDate,
                    links: Object.keys(links).length ? links : null,
                    clientRequestId: clientRequestId,
                    clientRequestPayloadHash: payloadHash
                });
            }
        });

        res.status(out.replayed ? 200 : 201).json({
            success: true,
            message: out.replayed
                ? 'Revenue already recorded (idempotent replay)'
                : 'Revenue recorded',
            data: out.result,
            idempotentReplay: out.replayed
        });
    }

    getRouter() {
        return this.router;
    }
}

module.exports = FarmSummaryRoutes;
