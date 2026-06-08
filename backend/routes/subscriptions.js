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
        // Billing config (public — publishable key only)
        this.router.get('/billing-config',
            cacheMiddleware('subscriptions:billing-config', CACHE_TTL.SUBSCRIPTION_PLANS),
            asyncHandler(this.controller.getBillingConfig.bind(this.controller))
        );

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
        
        // Stripe Checkout session (protected)
        this.router.post('/create-checkout-session',
            this.authMiddleware.authenticate(),
            invalidateCache('subscriptions:create'),
            validate('subscriptions.createCheckoutSession'),
            asyncHandler(this.controller.createCheckoutSession.bind(this.controller))
        );

        // Client analytics events (protected)
        this.router.post('/events',
            this.authMiddleware.authenticate(),
            validate('subscriptions.logEvent'),
            asyncHandler(this.controller.logEvent.bind(this.controller))
        );

        // Legacy subscribe — redirects to Stripe Checkout flow
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
        const updateSubscriptionHandlers = [
            this.authMiddleware.authenticate(),
            invalidateCache('subscriptions:update'),
            validate('subscriptions.update'),
            asyncHandler(this.controller.updateSubscription.bind(this.controller))
        ];

        // Backward-compatible update alias
        this.router.put('/',
            ...updateSubscriptionHandlers
        );

        this.router.put('/update', 
            ...updateSubscriptionHandlers
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
