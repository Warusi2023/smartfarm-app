/**
 * Minimal subscription / activation event logging for MRR and conversion metrics.
 */

const logger = require('../utils/logger');

class SubscriptionEventService {
    constructor(dbPool) {
        this.dbPool = dbPool;
    }

    /**
     * @param {string|null} userId
     * @param {string} eventType
     * @param {object} [metadata]
     */
    async log(userId, eventType, metadata = {}) {
        if (!this.dbPool || !eventType) {
            return;
        }
        try {
            await this.dbPool.query(
                `INSERT INTO subscription_events (user_id, event_type, metadata)
                 VALUES ($1, $2, $3::jsonb)`,
                [userId || null, eventType, JSON.stringify(metadata || {})]
            );
        } catch (error) {
            logger.warn('subscription event log failed', {
                eventType,
                userId,
                error: error.message
            });
        }
    }
}

module.exports = SubscriptionEventService;
