/**
 * SmartFarm Subscription Routes
 * Handles subscription plans, payments, and billing
 */

const express = require('express');
const AuthMiddleware = require('../middleware/auth');
const DatabaseHelpers = require('../utils/db-helpers');

class SubscriptionRoutes {
    constructor(dbPool = null) {
        this.router = express.Router();
        this.dbHelpers = new DatabaseHelpers(dbPool);
        this.authMiddleware = new AuthMiddleware(); // Instantiate AuthMiddleware
        this.setupRoutes();
    }

    setupRoutes() {
        // Get subscription plans (public)
        this.router.get('/plans', this.getPlans.bind(this));
        
        // Get user subscription (protected)
        this.router.get('/current', this.authMiddleware.authenticate(), this.getCurrentSubscription.bind(this));
        
        // Subscribe to a plan (protected)
        this.router.post('/subscribe', this.authMiddleware.authenticate(), this.subscribe.bind(this));
        
        // Cancel subscription (protected)
        this.router.post('/cancel', this.authMiddleware.authenticate(), this.cancelSubscription.bind(this));
        
        // Update subscription (protected)
        this.router.put('/update', this.authMiddleware.authenticate(), this.updateSubscription.bind(this));
        
        // Get subscription history (protected)
        this.router.get('/history', this.authMiddleware.authenticate(), this.getHistory.bind(this));
    }

    /**
     * Get available subscription plans
     */
    async getPlans(req, res) {
        try {
            const plans = {
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

            res.json({
                success: true,
                data: plans
            });
        } catch (error) {
            console.error('Error getting plans:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to retrieve subscription plans',
                code: 'PLANS_ERROR'
            });
        }
    }

    /**
     * Get current user subscription
     */
    async getCurrentSubscription(req, res) {
        try {
            const userId = req.user.id;
            
            // Get subscription from database
            const subscription = await this.dbHelpers.getUserSubscription(userId);
            
            // Get user's trial_end from users table
            const userTrialInfo = await this.dbHelpers.getUserTrialInfo(userId);
            
            if (!subscription) {
                // Check if user is in trial period
                if (userTrialInfo && userTrialInfo.trial_end) {
                    const trialEnd = new Date(userTrialInfo.trial_end);
                    const now = new Date();
                    
                    if (trialEnd > now) {
                        // Still in trial
                        const daysRemaining = Math.ceil((trialEnd - now) / (1000 * 60 * 60 * 24));
                        return res.json({
                            success: true,
                            data: {
                                plan: 'trial',
                                status: 'active',
                                trialEnd: trialEnd.toISOString(),
                                daysRemaining: daysRemaining,
                                startDate: userTrialInfo.created_at || new Date().toISOString(),
                                nextBillingDate: null,
                                autoRenew: false,
                                requiresSubscription: true
                            }
                        });
                    } else {
                        // Trial expired
                        return res.json({
                            success: true,
                            data: {
                                plan: null,
                                status: 'trial_expired',
                                trialEnd: trialEnd.toISOString(),
                                daysRemaining: 0,
                                requiresSubscription: true,
                                message: 'Your free trial has ended. Please subscribe to continue using SmartFarm.'
                            }
                        });
                    }
                }
                
                // No trial info - likely new user, should start trial
                return res.json({
                    success: true,
                    data: {
                        plan: null,
                        status: 'no_subscription',
                        requiresSubscription: true,
                        message: 'Please start your free trial or subscribe to a plan.'
                    }
                });
            }

            res.json({
                success: true,
                data: subscription
            });
        } catch (error) {
            console.error('Error getting subscription:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to retrieve subscription',
                code: 'SUBSCRIPTION_ERROR'
            });
        }
    }

    /**
     * Subscribe to a plan
     */
    async subscribe(req, res) {
        try {
            const userId = req.user.id;
            const { planId, paymentMethod } = req.body;

            if (!planId || !['free', 'professional', 'enterprise'].includes(planId)) {
                return res.status(400).json({
                    success: false,
                    error: 'Invalid plan ID',
                    code: 'INVALID_PLAN'
                });
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
            await this.dbHelpers.createOrUpdateSubscription(subscription);

            res.json({
                success: true,
                message: `Successfully subscribed to ${planId} plan`,
                data: subscription
            });
        } catch (error) {
            console.error('Error subscribing:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to process subscription',
                code: 'SUBSCRIPTION_ERROR'
            });
        }
    }

    /**
     * Cancel subscription
     */
    async cancelSubscription(req, res) {
        try {
            const userId = req.user.id;
            
            const subscription = await this.dbHelpers.getUserSubscription(userId);
            
            if (!subscription || !['professional', 'enterprise'].includes(subscription.plan)) {
                return res.status(400).json({
                    success: false,
                    error: 'No active paid subscription to cancel',
                    code: 'NO_SUBSCRIPTION'
                });
            }

            // Update subscription status
            await this.dbHelpers.updateSubscription(userId, {
                status: 'cancelled',
                cancelledAt: new Date().toISOString(),
                autoRenew: false
            });

            res.json({
                success: true,
                message: 'Subscription cancelled successfully',
                data: {
                    plan: null,
                    status: 'cancelled',
                    message: 'Your subscription has been cancelled. You will retain access until the end of your current billing period.'
                }
            });
        } catch (error) {
            console.error('Error cancelling subscription:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to cancel subscription',
                code: 'CANCELLATION_ERROR'
            });
        }
    }

    /**
     * Update subscription
     */
    async updateSubscription(req, res) {
        try {
            const userId = req.user.id;
            const { planId, autoRenew } = req.body;

            if (!planId || !['professional', 'enterprise'].includes(planId)) {
                return res.status(400).json({
                    success: false,
                    error: 'Invalid plan ID. Must subscribe to Professional or Enterprise plan.',
                    code: 'INVALID_PLAN'
                });
            }

            await this.dbHelpers.updateSubscription(userId, {
                plan: planId,
                autoRenew: autoRenew !== undefined ? autoRenew : true,
                updatedAt: new Date().toISOString()
            });

            res.json({
                success: true,
                message: 'Subscription updated successfully'
            });
        } catch (error) {
            console.error('Error updating subscription:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to update subscription',
                code: 'UPDATE_ERROR'
            });
        }
    }

    /**
     * Get subscription history
     */
    async getHistory(req, res) {
        try {
            const userId = req.user.id;
            
            const history = await this.dbHelpers.getSubscriptionHistory(userId);

            res.json({
                success: true,
                data: history || []
            });
        } catch (error) {
            console.error('Error getting history:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to retrieve subscription history',
                code: 'HISTORY_ERROR'
            });
        }
    }
}

module.exports = SubscriptionRoutes;

