/**
 * Subscription Controller
 * Handles HTTP request/response for subscription endpoints
 */

const SubscriptionService = require('../services/subscriptionService');
const StripeBillingService = require('../services/stripeBillingService');
const SubscriptionEventService = require('../services/subscriptionEventService');
const { BadRequestError } = require('../middleware/error-handler');
const logger = require('../utils/logger');

class SubscriptionController {
    constructor(dbPool) {
        this.dbPool = dbPool;
        this.subscriptionService = new SubscriptionService(dbPool);
        this.stripeBilling = new StripeBillingService(dbPool);
        this.events = new SubscriptionEventService(dbPool);
    }

    /** Legacy direct subscribe — use Stripe Checkout instead. */
    billingNotEnabled(res) {
        return res.status(503).json({
            success: false,
            error: 'Direct subscription API is deprecated',
            code: 'USE_STRIPE_CHECKOUT',
            message: 'Use POST /api/subscriptions/create-checkout-session to upgrade to Farm Pro.'
        });
    }

    /**
     * Get available subscription plans
     * GET /api/subscriptions/plans
     */
    async getPlans(req, res) {
        const plans = this.subscriptionService.getPlans();

        res.json({
            success: true,
            data: plans
        });
    }

    /**
     * Get current user subscription
     * GET /api/subscriptions/current
     */
    async getCurrentSubscription(req, res) {
        const userId = req.user.id;
        const subscription = await this.subscriptionService.getCurrentSubscription(userId);

        res.json({
            success: true,
            data: subscription
        });
    }

    /**
     * Subscribe to a plan
     * POST /api/subscriptions/subscribe
     */
    async subscribe(req, res) {
        return this.billingNotEnabled(res);
    }

    /**
     * Cancel subscription
     * POST /api/subscriptions/cancel
     */
    async cancelSubscription(req, res) {
        return this.billingNotEnabled(res);
    }

    /**
     * Update subscription
     * PUT /api/subscriptions/update
     */
    async updateSubscription(req, res) {
        const { planId } = req.body;
        if (planId) {
            return this.billingNotEnabled(res);
        }
        const userId = req.user.id;
        try {
            const subscription = await this.subscriptionService.updateSubscription(userId, {
                autoRenew: req.body.autoRenew
            });
            res.json({
                success: true,
                message: 'Subscription preferences updated',
                data: subscription
            });
        } catch (error) {
            if (error.message.includes('Invalid plan ID')) {
                throw new BadRequestError(error.message);
            }
            throw error;
        }
    }

    /**
     * Get subscription history
     * GET /api/subscriptions/history
     */
    async getHistory(req, res) {
        const userId = req.user.id;
        const history = await this.subscriptionService.getSubscriptionHistory(userId);

        res.json({
            success: true,
            data: history || []
        });
    }

    /**
     * Public billing config (publishable key only).
     * GET /api/subscriptions/billing-config
     */
    async getBillingConfig(req, res) {
        res.json({
            success: true,
            data: {
                billingEnabled: this.stripeBilling.isConfigured(),
                publishableKey: this.stripeBilling.getPublishableKey(),
                farmProPriceMonthly: 29,
                currency: 'usd'
            }
        });
    }

    /**
     * Create Stripe Checkout Session for Farm Pro.
     * POST /api/subscriptions/create-checkout-session
     */
    async createCheckoutSession(req, res) {
        if (!this.stripeBilling.isConfigured()) {
            return res.status(503).json({
                success: false,
                error: 'Stripe billing is not configured',
                code: 'BILLING_NOT_CONFIGURED'
            });
        }

        const userId = req.user.id;
        const email = req.user.email;

        try {
            const session = await this.stripeBilling.createCheckoutSession(userId, email);
            res.json({
                success: true,
                data: session
            });
        } catch (error) {
            logger.errorWithContext('createCheckoutSession failed', {
                userId,
                error: error.message
            });
            if (error.code === 'BILLING_NOT_CONFIGURED') {
                return res.status(503).json({
                    success: false,
                    error: error.message,
                    code: error.code
                });
            }
            throw error;
        }
    }

    /**
     * Log client-side subscription analytics events.
     * POST /api/subscriptions/events
     */
    async logEvent(req, res) {
        const userId = req.user.id;
        const { eventType, metadata } = req.body || {};
        const allowed = new Set([
            'command_center_load',
            'dashboard_load',
            'upgrade_started',
            'trial_expired'
        ]);

        if (!eventType || !allowed.has(eventType)) {
            throw new BadRequestError('Invalid or missing eventType');
        }

        await this.events.log(userId, eventType, metadata || {});
        res.json({ success: true });
    }
}

module.exports = SubscriptionController;

