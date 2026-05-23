/**
 * Farm summary API — financial totals and manual revenue (W2-07 / W2-08).
 */

const express = require('express');
const AuthMiddleware = require('../middleware/auth');
const { asyncHandler } = require('../middleware/error-handler');
const { BadRequestError, ServiceUnavailableError } = require('../utils/errors');
const farmRevenueStore = require('../services/farmRevenueStore');
const farmSummaryFinancials = require('../services/farmSummaryFinancials');

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

        this.router.post(
            '/revenue',
            this.authMiddleware.authenticate(),
            asyncHandler(this.createRevenue.bind(this))
        );
    }

    /**
     * GET /api/farm-summary/financials?period=month&farmId=
     */
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

        const row = await farmRevenueStore.insertFarmRevenue(this.dbPool, {
            userId: req.user.id,
            farmId: farmId,
            type: String(body.type || 'manual').trim() || 'manual',
            amount: amount,
            description: description,
            date: entryDate,
            links: Object.keys(links).length ? links : null
        });

        res.status(201).json({
            success: true,
            message: 'Revenue recorded',
            data: row
        });
    }

    getRouter() {
        return this.router;
    }
}

module.exports = FarmSummaryRoutes;
