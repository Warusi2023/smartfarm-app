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
        const userId = req.user.id;
        const { planId, paymentMethod } = req.body;

        if (!planId || !['free', 'professional', 'enterprise'].includes(planId)) {
            throw new BadRequestError('Invalid plan ID');
        }

        const subscription = await this.subscriptionService.subscribe(userId, planId, paymentMethod);

        res.json({
            success: true,
            message: `Successfully subscribed to ${planId} plan`,
            data: subscription
        });
    }

    /**
     * Cancel subscription
     * POST /api/subscriptions/cancel
     */
    async cancelSubscription(req, res) {
        const userId = req.user.id;

        try {
            const result = await this.subscriptionService.cancelSubscription(userId);

            res.json({
                success: true,
                message: 'Subscription cancelled successfully',
                data: result
            });
        } catch (error) {
            if (error.message === 'No active paid subscription to cancel') {
                throw new BadRequestError(error.message);
            }
            throw error;
        }
    }

    /**
     * Update subscription
     * PUT /api/subscriptions/update
     */
    async updateSubscription(req, res) {
        const userId = req.user.id;
        const { planId, autoRenew } = req.body;

        try {
            const subscription = await this.subscriptionService.updateSubscription(userId, {
                planId,
                autoRenew
            });

            res.json({
                success: true,
                message: 'Subscription updated successfully',
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

