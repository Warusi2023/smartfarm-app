/**
 * Subscription Service
 * Business logic for subscription management
 */

const BaseSubscriptionService = require('./subscriptionService').SubscriptionService;
const SubscriptionRepository = require('../repositories/subscriptionRepository');
const logger = require('../utils/logger');

class SubscriptionService extends BaseSubscriptionService {
    constructor(dbPool) {
        super(dbPool);
        this.repository = new SubscriptionRepository(dbPool);
    }

    /**
     * Get available subscription plans
     * @returns {Object} Subscription plans
     */
    getPlans() {
        return this.repository.getPlans();
    }

    /**
     * Get current user subscription with trial status
     * @param {string} userId - User ID
     * @returns {Promise<Object>} Subscription data
     */
    async getCurrentSubscription(userId) {
        const subscription = await this.repository.getUserSubscription(userId);
        const userTrialInfo = await this.repository.getUserTrialInfo(userId);

        if (!subscription) {
            // Check if user is in trial period
            if (userTrialInfo && userTrialInfo.trial_end) {
                const trialEnd = new Date(userTrialInfo.trial_end);
                const now = new Date();

                if (trialEnd > now) {
                    // Still in trial
                    const daysRemaining = Math.ceil((trialEnd - now) / (1000 * 60 * 60 * 24));
                    return {
                        plan: 'trial',
                        status: 'active',
                        trialEnd: trialEnd.toISOString(),
                        daysRemaining: daysRemaining,
                        startDate: userTrialInfo.created_at || new Date().toISOString(),
                        nextBillingDate: null,
                        autoRenew: false,
                        requiresSubscription: true
                    };
                } else {
                    // Trial expired
                    return {
                        plan: null,
                        status: 'trial_expired',
                        trialEnd: trialEnd.toISOString(),
                        daysRemaining: 0,
                        requiresSubscription: true,
                        message: 'Your free trial has ended. Please subscribe to continue using SmartFarm.'
                    };
                }
            }

            // No trial info - likely new user
            return {
                plan: null,
                status: 'no_subscription',
                requiresSubscription: true,
                message: 'Please start your free trial or subscribe to a plan.'
            };
        }

        return subscription;
    }

    /**
     * Subscribe to a plan
     * @param {string} userId - User ID
     * @param {string} planId - Plan ID
     * @param {string} paymentMethod - Payment method
     * @returns {Promise<Object>} Subscription data
     */
    async subscribe(userId, planId, paymentMethod = null) {
        // Validate plan ID
        const validPlans = ['free', 'professional', 'enterprise'];
        if (!validPlans.includes(planId)) {
            throw new Error('Invalid plan ID');
        }

        // In production, integrate with payment processor (Stripe, PayPal, etc.)
        // For now, simulate successful subscription
        const subscription = {
            userId,
            plan: planId,
            status: 'active',
            startDate: new Date().toISOString(),
            nextBillingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
            autoRenew: true,
            paymentMethod: paymentMethod || 'none'
        };

        // Save to database
        await this.repository.createOrUpdateSubscription(subscription);

        return subscription;
    }

    /**
     * Cancel subscription
     * @param {string} userId - User ID
     * @returns {Promise<Object>} Cancellation result
     */
    async cancelSubscription(userId) {
        const subscription = await this.repository.getUserSubscription(userId);

        if (!subscription || !['professional', 'enterprise'].includes(subscription.plan)) {
            throw new Error('No active paid subscription to cancel');
        }

        // Update subscription status
        await this.repository.updateSubscription(userId, {
            status: 'cancelled',
            cancelledAt: new Date().toISOString(),
            autoRenew: false
        });

        return {
            plan: null,
            status: 'cancelled',
            message: 'Your subscription has been cancelled. You will retain access until the end of your current billing period.'
        };
    }

    /**
     * Update subscription
     * @param {string} userId - User ID
     * @param {Object} updates - Update data
     * @returns {Promise<Object>} Updated subscription
     */
    async updateSubscription(userId, updates) {
        const { planId, autoRenew } = updates;

        if (planId && !['professional', 'enterprise'].includes(planId)) {
            throw new Error('Invalid plan ID. Must subscribe to Professional or Enterprise plan.');
        }

        const updateData = {
            ...(planId && { plan: planId }),
            ...(autoRenew !== undefined && { autoRenew }),
            updatedAt: new Date().toISOString()
        };

        await this.repository.updateSubscription(userId, updateData);

        return updateData;
    }

    /**
     * Get subscription history
     * @param {string} userId - User ID
     * @returns {Promise<Array>} Subscription history
     */
    async getSubscriptionHistory(userId) {
        return await this.repository.getSubscriptionHistory(userId);
    }
}

module.exports = SubscriptionService;
