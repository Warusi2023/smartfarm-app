/**
 * Subscription Controller
 * Handles HTTP request/response for subscription endpoints
 */

const SubscriptionService = require('../services/subscriptionService');
const { BadRequestError } = require('../middleware/error-handler');
const logger = require('../utils/logger');

class SubscriptionController {
    constructor(dbPool) {
        this.subscriptionService = new SubscriptionService(dbPool);
    }

    /** Paid self-serve billing is disabled until a payment provider is integrated. */
    billingNotEnabled(res) {
        return res.status(503).json({
            success: false,
            error: 'Online subscription billing is not enabled',
            code: 'BILLING_NOT_ENABLED',
            message:
                'Paid plans are arranged manually during beta. Register for a 30-day free trial, or contact us for Professional or Enterprise.'
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
}

module.exports = SubscriptionController;

