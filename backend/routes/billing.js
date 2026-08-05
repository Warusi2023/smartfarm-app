/**
 * Stripe Customer Portal routes
 */

const express = require('express');
const AuthMiddleware = require('../middleware/auth');
const { validate } = require('../middleware/validator');
const { asyncHandler } = require('../middleware/error-handler');
const SubscriptionController = require('../controllers/subscriptionController');

class BillingRoutes {
    constructor(dbPool = null) {
        this.router = express.Router();
        this.controller = new SubscriptionController(dbPool);
        this.authMiddleware = new AuthMiddleware();
        this.setupRoutes();
    }

    setupRoutes() {
        this.router.post('/portal',
            this.authMiddleware.authenticate(),
            validate('billing.createPortalSession'),
            asyncHandler(this.controller.createBillingPortalSession.bind(this.controller))
        );
    }

    getRouter() {
        return this.router;
    }
}

module.exports = BillingRoutes;
