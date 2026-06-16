/**
 * Farm invitation accept/decline (token in URL path).
 */

const express = require('express');
const AuthMiddleware = require('../middleware/auth');
const { validate } = require('../middleware/validator');
const { asyncHandler } = require('../middleware/error-handler');
const FarmInvitationService = require('../services/farmInvitationService');
const logger = require('../utils/logger');

class FarmInvitationRoutes {
    constructor(dbPool = null) {
        this.router = express.Router();
        this.dbPool = dbPool;
        this.authMiddleware = new AuthMiddleware();
        this.service = dbPool ? new FarmInvitationService(dbPool) : null;
        this.setupRoutes();
    }

    setupRoutes() {
        const auth = this.authMiddleware.authenticate();

        this.router.post(
            '/:token/accept',
            auth,
            validate('farmTeam.acceptInvitation'),
            asyncHandler(this.accept.bind(this))
        );
        this.router.post(
            '/:token/decline',
            auth,
            validate('farmTeam.declineInvitation'),
            asyncHandler(this.decline.bind(this))
        );
    }

    async accept(req, res) {
        if (!this.service) {
            return res.status(503).json({ success: false, error: 'Database unavailable', code: 'DB_UNAVAILABLE' });
        }
        try {
            const result = await this.service.acceptInvitation(
                req.params.token,
                req.user.id,
                req.user.email
            );
            res.json({
                success: true,
                message: 'Invitation accepted',
                data: result
            });
        } catch (error) {
            const status = error.statusCode || 500;
            if (status >= 500) {
                logger.errorWithContext('Accept invitation error', { error: error.message });
            }
            res.status(status).json({
                success: false,
                error: error.message,
                code: error.code || 'INVITE_ACCEPT_ERROR'
            });
        }
    }

    async decline(req, res) {
        if (!this.service) {
            return res.status(503).json({ success: false, error: 'Database unavailable', code: 'DB_UNAVAILABLE' });
        }
        try {
            const result = await this.service.declineInvitation(req.params.token, req.user.email);
            res.json({ success: true, message: 'Invitation declined', data: result });
        } catch (error) {
            const status = error.statusCode || 500;
            res.status(status).json({
                success: false,
                error: error.message,
                code: error.code || 'INVITE_DECLINE_ERROR'
            });
        }
    }

    getRouter() {
        return this.router;
    }
}

module.exports = FarmInvitationRoutes;
