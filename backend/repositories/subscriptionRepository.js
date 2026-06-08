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
        const w6Features = [
            'Farm command center',
            'Daily checklist',
            'Weekly summary strip',
            'Weekly priorities',
            'Weekly reset',
            'Focus pills',
            'Today on farm',
            'Responsive web on phone and tablet'
        ];
        return {
            trial: {
                id: 'trial',
                name: '30-Day Free Trial',
                price: 0,
                duration: 30,
                billingCycle: 'trial',
                features: w6Features,
                limits: {
                    maxFarms: 1
                },
                note: 'After 30 days, upgrade to Farm Pro to continue'
            },
            professional: {
                id: 'professional',
                name: 'Farm Pro',
                price: 29,
                billingCycle: 'monthly',
                selfServe: true,
                features: w6Features,
                limits: {
                    maxFarms: 3
                }
            },
            enterprise: {
                id: 'enterprise',
                name: 'Enterprise',
                price: null,
                billingCycle: 'contact',
                selfServe: false,
                contactOnly: true,
                features: [
                    'Custom farm count and onboarding',
                    'Dedicated support',
                    'Contact our team for pricing'
                ],
                limits: {
                    maxFarms: -1
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

