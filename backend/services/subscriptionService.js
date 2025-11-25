/**
 * SmartFarm Subscription Service
 * Handles subscription logic, trial management, and access evaluation
 */

const DatabaseHelpers = require('../utils/db-helpers');

// How long the free trial lasts (in days)
const TRIAL_DAYS = 30;

// Map plan -> limits & level rank
const PLAN_CONFIG = {
    trial: {
        level: 'pro',       // trial has Pro features
        maxFarms: 10
    },
    professional: {
        level: 'pro',
        maxFarms: 10
    },
    enterprise: {
        level: 'enterprise',
        maxFarms: Infinity
    }
};

class SubscriptionService {
    constructor(dbPool) {
        this.dbPool = dbPool;
        this.dbHelpers = new DatabaseHelpers(dbPool);
    }

    /**
     * Create a "trial" subscription when a new user registers
     */
    async createTrialSubscription(userId) {
        if (!this.dbPool) {
            // Mock implementation
            const trialEnd = new Date();
            trialEnd.setDate(trialEnd.getDate() + TRIAL_DAYS);
            return { trialEnd };
        }

        const client = await this.dbPool.connect();
        try {
            const now = new Date();
            const trialEnd = new Date();
            trialEnd.setDate(now.getDate() + TRIAL_DAYS);

            await client.query('BEGIN');

            const result = await client.query(
                `
                INSERT INTO subscriptions (
                    user_id,
                    plan_name,
                    plan_type,
                    status,
                    trial_end,
                    created_at,
                    updated_at
                )
                VALUES ($1, $2, $3, $4, $5, NOW(), NOW())
                RETURNING *
                `,
                [userId, 'trial', 'trial', 'trialing', trialEnd]
            );

            await client.query('COMMIT');
            return { trialEnd, subscription: result.rows[0] };
        } catch (error) {
            await client.query('ROLLBACK');
            console.error('Error creating trial subscription:', error);
            throw error;
        } finally {
            client.release();
        }
    }

    /**
     * Get the latest subscription for a user
     */
    async getLatestSubscription(userId) {
        return await this.dbHelpers.getUserSubscription(userId);
    }

    /**
     * Determine if user currently has access (trial or paid)
     */
    evaluateSubscription(sub) {
        if (!sub) {
            return { valid: false, reason: 'NO_SUBSCRIPTION' };
        }

        const now = new Date();

        // Trial subscription
        if (sub.status === 'trialing' && sub.trial_end) {
            const trialEnd = new Date(sub.trial_end);
            if (now <= trialEnd) {
                const daysRemaining = Math.ceil((trialEnd - now) / (1000 * 60 * 60 * 24));
                return {
                    valid: true,
                    planKey: 'trial',
                    planName: 'trial',
                    level: PLAN_CONFIG.trial.level,
                    maxFarms: PLAN_CONFIG.trial.maxFarms,
                    isTrial: true,
                    trialEnd: trialEnd.toISOString(),
                    daysRemaining
                };
            }
            return { valid: false, reason: 'TRIAL_EXPIRED', trialEnd: trialEnd.toISOString() };
        }

        // Paid subscription
        if (sub.status === 'active') {
            // If you store current_period_end, enforce it here
            if (sub.current_period_end) {
                const end = new Date(sub.current_period_end);
                if (now > end) {
                    return { valid: false, reason: 'PERIOD_EXPIRED' };
                }
            }

            // Normalize plan name (handle both 'professional' and 'pro')
            const planName = (sub.plan_name || sub.plan || '').toLowerCase();
            const key = planName === 'professional' ? 'professional' : planName;
            const config = PLAN_CONFIG[key];

            if (!config) {
                return { valid: false, reason: 'UNKNOWN_PLAN', planName: key };
            }

            return {
                valid: true,
                planKey: key,
                planName: sub.plan_name || sub.plan,
                level: config.level,
                maxFarms: config.maxFarms,
                isTrial: false
            };
        }

        return { valid: false, reason: 'INACTIVE_STATUS', status: sub.status };
    }

    /**
     * Get user's active access status (combines subscription lookup and evaluation)
     */
    async getUserAccessStatus(userId) {
        const subscription = await this.getLatestSubscription(userId);
        return this.evaluateSubscription(subscription);
    }
}

module.exports = {
    SubscriptionService,
    TRIAL_DAYS,
    PLAN_CONFIG
};



