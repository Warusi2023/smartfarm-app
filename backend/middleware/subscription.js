/**
 * SmartFarm Subscription Middleware
 * Enforces subscription/trial requirements for protected routes
 */

const DatabaseHelpers = require('../utils/db-helpers');

class SubscriptionMiddleware {
    constructor(dbPool) {
        this.dbHelpers = new DatabaseHelpers(dbPool);
    }

    /**
     * Middleware to require active subscription or valid trial
     */
    requireActiveAccess() {
        return async (req, res, next) => {
            try {
                if (!req.user || !req.user.id) {
                    return res.status(401).json({
                        success: false,
                        error: 'Authentication required',
                        code: 'AUTH_REQUIRED'
                    });
                }

                const accessStatus = await this.dbHelpers.hasActiveAccess(req.user.id);

                if (!accessStatus.hasAccess) {
                    if (accessStatus.reason === 'trial_expired') {
                        return res.status(403).json({
                            success: false,
                            error: 'Your free trial has ended. Please subscribe to continue using SmartFarm.',
                            code: 'TRIAL_EXPIRED',
                            message: 'Your 30-day free trial has expired. Please subscribe to Professional ($29/month) or Enterprise ($99/month) to continue.',
                            requiresSubscription: true,
                            trialEnd: accessStatus.trialEnd
                        });
                    } else {
                        return res.status(403).json({
                            success: false,
                            error: 'Active subscription or trial required',
                            code: 'SUBSCRIPTION_REQUIRED',
                            message: 'Please start your free trial or subscribe to a plan to access this feature.',
                            requiresSubscription: true
                        });
                    }
                }

                // Add subscription info to request for use in route handlers
                req.subscription = {
                    type: accessStatus.type,
                    plan: accessStatus.plan || 'trial',
                    daysRemaining: accessStatus.daysRemaining
                };

                next();
            } catch (error) {
                console.error('Subscription middleware error:', error);
                return res.status(500).json({
                    success: false,
                    error: 'Failed to verify subscription status',
                    code: 'SUBSCRIPTION_CHECK_ERROR'
                });
            }
        };
    }

    /**
     * Middleware to require paid subscription (no trial)
     */
    requirePaidSubscription() {
        return async (req, res, next) => {
            try {
                if (!req.user || !req.user.id) {
                    return res.status(401).json({
                        success: false,
                        error: 'Authentication required',
                        code: 'AUTH_REQUIRED'
                    });
                }

                const subscription = await this.dbHelpers.getUserSubscription(req.user.id);

                if (!subscription || !['professional', 'enterprise'].includes(subscription.plan) || subscription.status !== 'active') {
                    return res.status(403).json({
                        success: false,
                        error: 'Paid subscription required',
                        code: 'PAID_SUBSCRIPTION_REQUIRED',
                        message: 'This feature requires a paid subscription. Please subscribe to Professional ($29/month) or Enterprise ($99/month).',
                        requiresSubscription: true
                    });
                }

                req.subscription = {
                    type: 'subscription',
                    plan: subscription.plan,
                    status: subscription.status
                };

                next();
            } catch (error) {
                console.error('Subscription middleware error:', error);
                return res.status(500).json({
                    success: false,
                    error: 'Failed to verify subscription status',
                    code: 'SUBSCRIPTION_CHECK_ERROR'
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
                    const accessStatus = await this.dbHelpers.hasActiveAccess(req.user.id);
                    req.subscription = {
                        hasAccess: accessStatus.hasAccess,
                        type: accessStatus.type,
                        plan: accessStatus.plan || null,
                        daysRemaining: accessStatus.daysRemaining
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

