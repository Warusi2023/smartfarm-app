/**
 * SmartFarm Subscription Middleware
 * Enforces subscription/trial requirements and farm limits
 */

const { SubscriptionService, PLAN_CONFIG } = require('../services/subscriptionService');

class SubscriptionMiddleware {
    constructor(dbPool) {
        this.subscriptionService = new SubscriptionService(dbPool);
        this.dbPool = dbPool;
    }

    /**
     * Ensure user has at least an active trial or paid subscription
     * @param {string} requiredLevel - 'pro' or 'enterprise' (default: 'pro')
     */
    requireActiveSubscription(requiredLevel = 'pro') {
        return async (req, res, next) => {
            try {
                const userId = req.user && req.user.id;

                if (!userId) {
                    return res.status(401).json({
                        success: false,
                        error: 'Unauthorized',
                        code: 'AUTH_REQUIRED'
                    });
                }

                const subscription = await this.subscriptionService.getLatestSubscription(userId);
                const result = this.subscriptionService.evaluateSubscription(subscription);

                if (!result.valid) {
                    let errorMessage = 'Subscription required. Your trial may have expired.';
                    if (result.reason === 'TRIAL_EXPIRED') {
                        errorMessage = 'Your free trial has ended. Please subscribe to continue using SmartFarm.';
                    }

                    return res.status(403).json({
                        success: false,
                        error: errorMessage,
                        code: result.reason,
                        requiresSubscription: true,
                        trialEnd: result.trialEnd
                    });
                }

                // Check access level (pro vs enterprise)
                const levelRank = {
                    pro: 1,
                    enterprise: 2
                };

                const userRank = levelRank[result.level] || 0;
                const requiredRank = levelRank[requiredLevel] || 0;

                if (userRank < requiredRank) {
                    return res.status(403).json({
                        success: false,
                        error: `Your plan does not include access to this feature. Required level: ${requiredLevel}.`,
                        code: 'INSUFFICIENT_PLAN_LEVEL',
                        currentLevel: result.level,
                        requiredLevel: requiredLevel
                    });
                }

                // Attach subscription info to request for downstream handlers
                req.subscription = result;

                next();
            } catch (err) {
                console.error('requireActiveSubscription error:', err);
                res.status(500).json({
                    success: false,
                    error: 'Internal server error',
                    code: 'SUBSCRIPTION_CHECK_ERROR'
                });
            }
        };
    }

    /**
     * Enforce farm count per plan (trial/pro vs enterprise)
     */
    enforceFarmLimit() {
        return async (req, res, next) => {
            try {
                const userId = req.user && req.user.id;

                if (!userId) {
                    return res.status(401).json({
                        success: false,
                        error: 'Unauthorized',
                        code: 'AUTH_REQUIRED'
                    });
                }

                // We expect requireActiveSubscription to have run before this,
                // but be defensive:
                const subInfo = req.subscription;

                if (!subInfo || !subInfo.valid) {
                    return res.status(403).json({
                        success: false,
                        error: 'Active subscription or trial required.',
                        code: 'NO_VALID_SUBSCRIPTION'
                    });
                }

                const maxFarms = subInfo.maxFarms;

                if (!Number.isFinite(maxFarms)) {
                    // Enterprise / unlimited
                    return next();
                }

                if (!this.dbPool) {
                    // Mock - allow if no database
                    return next();
                }

                const { rows } = await this.dbPool.query(
                    'SELECT COUNT(*)::int AS count FROM farms WHERE user_id = $1',
                    [userId]
                );

                const count = rows[0].count;

                if (count >= maxFarms) {
                    return res.status(403).json({
                        success: false,
                        error: `Your plan allows up to ${maxFarms} farms. Please upgrade to add more.`,
                        code: 'FARM_LIMIT_REACHED',
                        currentFarms: count,
                        maxFarms: maxFarms
                    });
                }

                next();
            } catch (err) {
                console.error('enforceFarmLimit error:', err);
                res.status(500).json({
                    success: false,
                    error: 'Internal server error',
                    code: 'FARM_LIMIT_CHECK_ERROR'
                });
            }
        };
    }

    /**
     * Optional middleware - adds subscription info but doesn't block access
     */
    optionalSubscriptionInfo() {
        return async (req, res, next) => {
            try {
                if (req.user && req.user.id) {
                    const accessStatus = await this.subscriptionService.getUserAccessStatus(req.user.id);
                    req.subscription = {
                        ...accessStatus,
                        hasAccess: accessStatus.valid
                    };
                }
                next();
            } catch (error) {
                // Don't block on error, just continue
                console.warn('Optional subscription info error:', error);
                next();
            }
        };
    }
}

module.exports = SubscriptionMiddleware;



