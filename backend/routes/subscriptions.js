/**
 * SmartFarm Subscription Routes
 * Route definitions only - delegates to controllers
 */

const express = require('express');
const AuthMiddleware = require('../middleware/auth');
const { validate } = require('../middleware/validator');
const { asyncHandler } = require('../middleware/error-handler');
const { cacheMiddleware, invalidateCache } = require('../middleware/cache-middleware');
const { CACHE_TTL } = require('../config/cache-config');
const SubscriptionController = require('../controllers/subscriptionController');

class SubscriptionRoutes {
    constructor(dbPool = null) {
        this.router = express.Router();
        this.controller = new SubscriptionController(dbPool);
        this.authMiddleware = new AuthMiddleware();
        this.setupRoutes();
    }

    setupRoutes() {
        // Get subscription plans (public) - cached (static data)
        this.router.get('/plans', 
            cacheMiddleware('subscriptions:plans', CACHE_TTL.SUBSCRIPTION_PLANS),
            validate('subscriptions.getPlans'), 
            asyncHandler(this.controller.getPlans.bind(this.controller))
        );
        
        // Get user subscription (protected)
        this.router.get('/current', 
            this.authMiddleware.authenticate(), 
            validate('subscriptions.getCurrent'), 
            asyncHandler(this.controller.getCurrentSubscription.bind(this.controller))
        );
        
        // Subscribe to a plan (protected) - invalidates cache
        this.router.post('/subscribe', 
            this.authMiddleware.authenticate(), 
            invalidateCache('subscriptions:create'),
            validate('subscriptions.subscribe'), 
            asyncHandler(this.controller.subscribe.bind(this.controller))
        );
        
        // Cancel subscription (protected) - invalidates cache
        this.router.post('/cancel', 
            this.authMiddleware.authenticate(), 
            invalidateCache('subscriptions:delete'),
            validate('subscriptions.cancel'), 
            asyncHandler(this.controller.cancelSubscription.bind(this.controller))
        );
        
        // Update subscription (protected) - invalidates cache
        this.router.put('/update', 
            this.authMiddleware.authenticate(), 
            invalidateCache('subscriptions:update'),
            validate('subscriptions.update'),
            asyncHandler(this.controller.updateSubscription.bind(this.controller))
        );
        
        // Get subscription history (protected)
        this.router.get('/history', 
            this.authMiddleware.authenticate(), 
            validate('subscriptions.getHistory'),
            asyncHandler(this.controller.getHistory.bind(this.controller))
        );
    }

    getRouter() {
        return this.router;
    }
}

module.exports = SubscriptionRoutes;
