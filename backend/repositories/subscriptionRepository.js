/**
 * Subscription Repository
 * Data access layer for subscription-related database operations
 */

class SubscriptionRepository {
    constructor(dbPool) {
        this.dbPool = dbPool;
    }

    /**
     * Get subscription plans (static data)
     * @returns {Object} Subscription plans
     */
    getPlans() {
        return {
            trial: {
                id: 'trial',
                name: '30-Day Free Trial',
                price: 0,
                duration: 30,
                billingCycle: 'trial',
                features: [
                    'All Professional features unlocked',
                    'No farm limitations',
                    'AI-powered insights',
                    'Complete crop & livestock management',
                    'Weather forecasting',
                    'Geofencing & GPS tracking',
                    'Financial management',
                    'Inventory management',
                    'Priority support',
                    'API access'
                ],
                limits: {
                    maxFarms: -1, // Unlimited during trial
                    maxUsers: 5,
                    apiCallsPerMonth: 10000
                },
                note: 'After 30 days, subscription required to continue'
            },
            professional: {
                id: 'professional',
                name: 'Professional Plan',
                price: 29,
                billingCycle: 'monthly',
                features: [
                    'Up to 10 farms',
                    'Advanced crop management',
                    'Complete livestock tracking',
                    'AI-powered insights',
                    'Weather forecasting',
                    'Geofencing & GPS tracking',
                    'Financial management',
                    'Inventory management',
                    'Priority support',
                    'API access'
                ],
                limits: {
                    maxFarms: 10,
                    maxUsers: 5,
                    apiCallsPerMonth: 10000
                }
            },
            enterprise: {
                id: 'enterprise',
                name: 'Enterprise Plan',
                price: 99,
                billingCycle: 'monthly',
                features: [
                    'Unlimited farms',
                    'Everything in Professional',
                    'Multi-user management',
                    'Advanced analytics',
                    'Custom integrations',
                    'White-label options',
                    'Dedicated support',
                    'Custom training',
                    'SLA guarantee',
                    'On-premise deployment'
                ],
                limits: {
                    maxFarms: -1,
                    maxUsers: -1,
                    apiCallsPerMonth: -1
                }
            }
        };
    }

    /**
     * Get user subscription from database
     * @param {string} userId - User ID
     * @returns {Promise<Object|null>} Subscription or null
     */
    async getUserSubscription(userId) {
        if (!this.dbPool) {
            return null;
        }

        const DatabaseHelpers = require('../utils/db-helpers');
        const dbHelpers = new DatabaseHelpers(this.dbPool);
        return await dbHelpers.getUserSubscription(userId);
    }

    /**
     * Get user trial info from database
     * @param {string} userId - User ID
     * @returns {Promise<Object|null>} Trial info or null
     */
    async getUserTrialInfo(userId) {
        if (!this.dbPool) {
            return null;
        }

        const DatabaseHelpers = require('../utils/db-helpers');
        const dbHelpers = new DatabaseHelpers(this.dbPool);
        return await dbHelpers.getUserTrialInfo(userId);
    }

    /**
     * Create or update subscription
     * @param {Object} subscriptionData - Subscription data
     * @returns {Promise<Object>} Created/updated subscription
     */
    async createOrUpdateSubscription(subscriptionData) {
        if (!this.dbPool) {
            return subscriptionData;
        }

        const DatabaseHelpers = require('../utils/db-helpers');
        const dbHelpers = new DatabaseHelpers(this.dbPool);
        return await dbHelpers.createOrUpdateSubscription(subscriptionData);
    }

    /**
     * Update subscription
     * @param {string} userId - User ID
     * @param {Object} updates - Update data
     * @returns {Promise<Object>} Updated subscription
     */
    async updateSubscription(userId, updates) {
        if (!this.dbPool) {
            return { ...updates, userId };
        }

        const DatabaseHelpers = require('../utils/db-helpers');
        const dbHelpers = new DatabaseHelpers(this.dbPool);
        return await dbHelpers.updateSubscription(userId, updates);
    }

    /**
     * Get subscription history
     * @param {string} userId - User ID
     * @returns {Promise<Array>} Subscription history
     */
    async getSubscriptionHistory(userId) {
        if (!this.dbPool) {
            return [];
        }

        const DatabaseHelpers = require('../utils/db-helpers');
        const dbHelpers = new DatabaseHelpers(this.dbPool);
        return await dbHelpers.getSubscriptionHistory(userId);
    }
}

module.exports = SubscriptionRepository;

