/**
 * Farm routes with subscription and farm-limit enforcement.
 */

const express = require('express');
const AuthMiddleware = require('../middleware/auth');
const SubscriptionMiddleware = require('../middleware/subscriptionMiddleware');
const { validate } = require('../middleware/validator');
const { asyncHandler } = require('../middleware/error-handler');
const logger = require('../utils/logger');
const FarmMembershipService = require('../services/farmMembershipService');

class FarmRoutes {
    constructor(dbPool = null) {
        this.router = express.Router();
        this.dbPool = dbPool;
        this.authMiddleware = new AuthMiddleware();
        this.subscriptionMiddleware = new SubscriptionMiddleware(dbPool);
        this.membershipService = dbPool ? new FarmMembershipService(dbPool) : null;
        this.setupRoutes();
    }

    setupRoutes() {
        this.router.get(
            '/',
            this.authMiddleware.authenticate(),
            validate('farms.list'),
            asyncHandler(this.listFarms.bind(this))
        );
        this.router.post(
            '/',
            this.authMiddleware.authenticate(),
            this.subscriptionMiddleware.requireActiveSubscription('pro'),
            this.subscriptionMiddleware.enforceFarmLimit(),
            validate('farms.create'),
            asyncHandler(this.createFarm.bind(this))
        );
    }

    async listFarms(req, res) {
        if (!this.dbPool || !this.membershipService) {
            return res.status(503).json({
                success: false,
                error: 'Database unavailable',
                code: 'DB_UNAVAILABLE'
            });
        }
        try {
            const farms = await this.membershipService.listFarmsForUser(req.user.id);
            res.json({ success: true, data: farms });
        } catch (error) {
            logger.errorWithContext('List farms error', { error: error.message, userId: req.user.id });
            res.status(500).json({
                success: false,
                error: 'Failed to list farms',
                code: 'FARM_LIST_ERROR'
            });
        }
    }

    async createFarm(req, res) {
        const userId = req.user.id;
        const { name, location, areaHectares, farmType, description, latitude, longitude } = req.body;

        if (!this.dbPool) {
            return res.status(503).json({
                success: false,
                error: 'Database unavailable',
                code: 'DB_UNAVAILABLE'
            });
        }

        const area = areaHectares != null ? Number(areaHectares) : null;
        if (!name || !location || area == null || Number.isNaN(area) || !farmType) {
            return res.status(400).json({
                success: false,
                error: 'name, location, areaHectares, and farmType are required',
                code: 'MISSING_FIELDS'
            });
        }

        try {
            const result = await this.dbPool.query(
                `INSERT INTO farms (user_id, name, location, area_hectares, farm_type, description, latitude, longitude)
                 VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
                 RETURNING *`,
                [
                    userId,
                    name,
                    location,
                    area,
                    farmType,
                    description || null,
                    latitude != null ? Number(latitude) : null,
                    longitude != null ? Number(longitude) : null
                ]
            );

            const row = result.rows[0];
            if (this.membershipService) {
                await this.membershipService.createOwnerMembership(row.id, userId);
            }
            res.status(201).json({
                success: true,
                message: 'Farm created successfully',
                data: {
                    id: row.id,
                    name: row.name,
                    location: row.location,
                    areaHectares: row.area_hectares,
                    farmType: row.farm_type,
                    description: row.description,
                    latitude: row.latitude,
                    longitude: row.longitude,
                    createdAt: row.created_at
                }
            });
        } catch (error) {
            logger.errorWithContext('Create farm error', { error: error.message, userId });
            res.status(500).json({
                success: false,
                error: 'Failed to create farm',
                code: 'FARM_CREATE_ERROR'
            });
        }
    }

    getRouter() {
        return this.router;
    }
}

module.exports = FarmRoutes;
