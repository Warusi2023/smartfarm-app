/**
 * Subscription Service
 * Business logic for subscription management
 */

const SubscriptionRepository = require('../repositories/subscriptionRepository');
const logger = require('../utils/logger');
const { buildSubscriptionView, normalizeStripeStatus } = require('../utils/subscriptionBillingPresentation');

class SubscriptionService {
    constructor(dbPool) {
        this.dbPool = dbPool;
        this.repository = new SubscriptionRepository(dbPool);
    }

    /**
     * Access gate for login: active trial on user row, active paid subscription row, or neither.
     * @returns {Promise<{ valid: boolean, reason?: string, trialEnd?: string }>}
     */
    async getUserAccessStatus(userId) {
        const sub = await this.repository.getUserSubscription(userId);
        if (sub) {
            const status = normalizeStripeStatus(sub.status);
            const planRaw = sub.plan || sub.plan_type || sub.plan_name || '';
            const plan = String(planRaw).toLowerCase();
            const paidPlan = ['professional', 'enterprise'].includes(plan);
            if (paidPlan && ['active', 'trialing', 'past_due'].includes(status)) {
                if (sub.cancel_at_period_end && sub.current_period_end) {
                    const end = new Date(sub.current_period_end);
                    if (end <= new Date()) {
                        return { valid: false, reason: 'SUBSCRIPTION_ENDED' };
                    }
                }
                return { valid: true };
            }
            if (plan === 'free' && status === 'canceled') {
                /* fall through to trial check */
            } else if (sub.status === 'active' && ['professional', 'enterprise', 'free', 'trial'].includes(plan)) {
                return { valid: true };
            }
        }

        const trialInfo = await this.repository.getUserTrialInfo(userId);
        const now = new Date();

        if (trialInfo && trialInfo.trial_end) {
            const trialEnd = new Date(trialInfo.trial_end);
            if (trialEnd > now) {
                return { valid: true };
            }
            return {
                valid: false,
                reason: 'TRIAL_EXPIRED',
                trialEnd: trialEnd.toISOString()
            };
        }

        return { valid: false, reason: 'NO_SUBSCRIPTION' };
    }

    /**
     * Ensure user has a trial window on the users row (recovery path for missing trial_end).
     */
    async createTrialSubscription(userId) {
        if (!this.dbPool) {
            return;
        }
        const trialEnd = new Date();
        trialEnd.setDate(trialEnd.getDate() + 30);
        try {
            await this.dbPool.query(
                `UPDATE users SET trial_end = $2::date, updated_at = CURRENT_TIMESTAMP WHERE id = $1`,
                [userId, trialEnd]
            );
        } catch (error) {
            logger.warn('createTrialSubscription update failed', { error: error.message, userId });
            throw error;
        }
    }

    /**
     * Used by subscription middleware — same shape as getCurrentSubscription
     */
    async getLatestSubscription(userId) {
        return this.getCurrentSubscription(userId);
    }

    /**
     * Normalize subscription/trial object for middleware (valid, level, maxFarms)
     */
    evaluateSubscription(data) {
        if (!data) {
            return { valid: false, reason: 'NO_SUBSCRIPTION', level: 'none', maxFarms: 0 };
        }
        if (data.status === 'trial_expired') {
            return {
                valid: false,
                reason: 'TRIAL_EXPIRED',
                trialEnd: data.trialEnd,
                level: 'none',
                maxFarms: 0
            };
        }
        if (data.status === 'no_subscription') {
            return { valid: false, reason: 'NO_SUBSCRIPTION', level: 'none', maxFarms: 0 };
        }

        const stripeStatus = normalizeStripeStatus(data.status || data.stripeStatus);
        const periodEnd = data.current_period_end || data.currentPeriodEnd || data.nextBillingDate;
        if (stripeStatus === 'canceled' || stripeStatus === 'incomplete' || stripeStatus === 'unpaid') {
            if (periodEnd) {
                const end = new Date(periodEnd);
                if (end > new Date() && data.cancelAtPeriodEnd) {
                    return { valid: true, reason: 'OK', level: 'pro', maxFarms: 3 };
                }
            }
            return { valid: false, reason: 'NO_SUBSCRIPTION', level: 'none', maxFarms: 0 };
        }
        if (stripeStatus === 'past_due') {
            return { valid: true, reason: 'OK', level: 'pro', maxFarms: 3 };
        }

        const p = String(data.plan || data.plan_type || data.plan_name || '').toLowerCase();
        if (p === 'enterprise') {
            return { valid: true, reason: 'OK', level: 'enterprise', maxFarms: -1 };
        }
        if (p === 'trial' || data.plan === 'trial') {
            return { valid: true, reason: 'OK', level: 'trial', maxFarms: 1 };
        }
        if (['professional', 'free', 'pro'].includes(p)) {
            return { valid: true, reason: 'OK', level: 'pro', maxFarms: 3 };
        }
        if (stripeStatus === 'active' || stripeStatus === 'trialing') {
            return { valid: true, reason: 'OK', level: 'pro', maxFarms: 3 };
        }
        if (data.status === 'active') {
            return { valid: true, reason: 'OK', level: 'pro', maxFarms: 3 };
        }
        return { valid: false, reason: 'NO_SUBSCRIPTION', level: 'none', maxFarms: 0 };
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
        const stripeCustomerId = await this.repository.getUserStripeCustomerId(userId);

        if (!subscription) {
            const view = buildSubscriptionView(null, userTrialInfo);
            if (view.status === 'trial_expired') {
                view.message = view.billingAlert?.message ||
                    'Your free trial has ended. Upgrade to Farm Pro to continue using SmartFarm.';
            } else if (view.status === 'no_subscription') {
                view.message = 'Please start your free trial or subscribe to a plan.';
            }
            view.canManageBilling = !!stripeCustomerId;
            return view;
        }

        const planKey = String(subscription.plan || subscription.plan_type || '').toLowerCase();
        const evaluated = this.evaluateSubscription(subscription);
        const view = buildSubscriptionView(subscription, userTrialInfo);
        return {
            ...view,
            planName: view.planName || (planKey === 'professional' ? 'Farm Pro' : subscription.plan_name),
            maxFarms: evaluated.maxFarms,
            priceMonthly: planKey === 'professional' ? 29 : undefined,
            canUpgrade: planKey !== 'professional' && planKey !== 'enterprise',
            canManageBilling: !!(stripeCustomerId || subscription.stripe_subscription_id)
        };
    }

    /**
     * Subscribe to a plan
     */
    async subscribe(userId, planId, paymentMethod = null) {
        const validPlans = ['free', 'professional', 'enterprise'];
        if (!validPlans.includes(planId)) {
            throw new Error('Invalid plan ID');
        }

        const subscription = {
            userId,
            plan: planId,
            status: 'active',
            startDate: new Date().toISOString(),
            nextBillingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
            autoRenew: true,
            paymentMethod: paymentMethod || 'none'
        };

        await this.repository.createOrUpdateSubscription(subscription);

        return subscription;
    }

    /**
     * Cancel subscription
     */
    async cancelSubscription(userId) {
        const subscription = await this.repository.getUserSubscription(userId);
        const plan = subscription && (subscription.plan || subscription.plan_type);
        if (!subscription || !['professional', 'enterprise'].includes(plan)) {
            throw new Error('No active paid subscription to cancel');
        }

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
     */
    async getSubscriptionHistory(userId) {
        return await this.repository.getSubscriptionHistory(userId);
    }
}

SubscriptionService.PLAN_CONFIG = {
    trial: { maxFarms: 1 },
    professional: { maxFarms: 3 },
    enterprise: { maxFarms: -1 }
};

module.exports = SubscriptionService;
