/**
 * Farm costs API — durable cost rows (W2-06+).
 */

const express = require('express');
const AuthMiddleware = require('../middleware/auth');
const { asyncHandler } = require('../middleware/error-handler');
const { BadRequestError, ServiceUnavailableError } = require('../utils/errors');
const farmCostsStore = require('../services/farmCostsStore');
const writeIdempotency = require('../services/writeIdempotency');
const { ConflictError } = require('../utils/errors');
const logger = require('../utils/logger');

class FarmCostRoutes {
    constructor(dbPool = null) {
        this.router = express.Router();
        this.dbPool = dbPool;
        this.authMiddleware = new AuthMiddleware();
        this.setupRoutes();
    }

    setupRoutes() {
        this.router.post(
            '/feed-mix',
            this.authMiddleware.authenticate(),
            asyncHandler(this.recordFeedMixCost.bind(this))
        );
        this.router.post(
            '/crop-action',
            this.authMiddleware.authenticate(),
            asyncHandler(this.recordCropActionCost.bind(this))
        );
    }

    /**
     * POST /api/farm-costs/feed-mix
     * Record feed mix daily cost as a farmcosts row.
     */
    async recordFeedMixCost(req, res) {
        if (!this.dbPool) {
            throw new ServiceUnavailableError('Farm costs storage is not available');
        }

        const body = req.body || {};
        const amountRaw =
            body.amount != null ? body.amount : body.dailyCost != null ? body.dailyCost : null;

        if (amountRaw == null || amountRaw === '') {
            throw new BadRequestError('amount or dailyCost is required');
        }

        const amount = Number(amountRaw);
        if (!Number.isFinite(amount) || amount < 0) {
            throw new BadRequestError('amount must be a non-negative number');
        }

        let farmId = body.farmId || body.farm_id || null;
        if (farmId != null && String(farmId).trim() === '') {
            farmId = null;
        }

        const userId = req.user.id;
        const clientRequestId = body.clientRequestId;

        const out = await writeIdempotency.runIdempotent({
            userId,
            operation: 'feed-mix-cost',
            clientRequestId,
            payload: body,
            execute: async () => {
                const payloadHash = writeIdempotency.hashPayload('feed-mix-cost', body);

                if (clientRequestId) {
                    const existing = await farmCostsStore.findByClientRequestId(
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
                        logger.info('Feed mix cost idempotent hit (Postgres)', {
                            farmCostId: existing.row.id,
                            clientRequestId,
                            userId
                        });
                        return existing.row;
                    }
                }

                return farmCostsStore.insertFeedMixFarmCost(this.dbPool, {
                    userId: userId,
                    farmId: farmId,
                    amount: amount,
                    feedMixId: body.feedMixId != null ? body.feedMixId : body.id,
                    livestockType: body.livestockType || body.species,
                    group: body.group,
                    species: body.species || body.livestockType,
                    lifecycle: body.lifecycle || body.growthStage,
                    purpose: body.purpose,
                    dailyCost: amount,
                    clientRequestId: clientRequestId,
                    clientRequestPayloadHash: payloadHash
                });
            }
        });

        res.status(out.replayed ? 200 : 201).json({
            success: true,
            message: out.replayed
                ? 'Feed mix cost already recorded (idempotent replay)'
                : 'Feed mix cost recorded',
            data: out.result,
            idempotentReplay: out.replayed
        });
    }

    /**
     * POST /api/farm-costs/crop-action
     * Record crop action spend (W2-05). Prefer POST /crop-recommendations/actions with costAmount when logging.
     */
    async recordCropActionCost(req, res) {
        if (!this.dbPool) {
            throw new ServiceUnavailableError('Farm costs storage is not available');
        }

        const body = req.body || {};
        const amountRaw =
            body.amount != null ? body.amount : body.costAmount != null ? body.costAmount : null;

        if (amountRaw == null || amountRaw === '') {
            throw new BadRequestError('amount or costAmount is required');
        }

        const amount = Number(amountRaw);
        if (!Number.isFinite(amount) || amount <= 0) {
            throw new BadRequestError('amount must be a positive number');
        }

        let farmId = body.farmId || body.farm_id || null;
        if (farmId != null && String(farmId).trim() === '') {
            farmId = null;
        }

        const row = await farmCostsStore.insertCropActionFarmCost(this.dbPool, {
            userId: req.user.id,
            farmId: farmId,
            amount: amount,
            cropActionId: body.cropActionId || body.actionId,
            cropId: body.cropId,
            actionType: body.actionType,
            costNote: body.costNote || body.description,
            fieldId: body.fieldId || body.field_id,
            alertId: body.alertId
        });

        res.status(201).json({
            success: true,
            message: 'Crop action cost recorded',
            data: row
        });
    }

    getRouter() {
        return this.router;
    }
}

module.exports = FarmCostRoutes;
