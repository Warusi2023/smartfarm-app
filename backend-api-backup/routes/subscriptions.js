const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const db = require('../database/init');

// Subscription plans configuration
const SUBSCRIPTION_PLANS = {
    free: {
        name: 'Free',
        price: 0,
        features: [
            'Up to 2 farms',
            'Basic crop management',
            'Simple livestock tracking',
            'Basic weather data',
            'Email support',
            'Mobile app access'
        ],
        limits: {
            maxFarms: 2,
            maxUsers: 1,
            apiCallsPerMonth: 1000
        }
    },
    professional: {
        name: 'Professional',
        price: 29,
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
        name: 'Enterprise',
        price: 99,
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
            maxFarms: -1, // Unlimited
            maxUsers: -1, // Unlimited
            apiCallsPerMonth: -1 // Unlimited
        }
    }
};

// Helper function to check subscription limits
async function checkSubscriptionLimits(userId, action) {
    const subscription = await db.get(
        'SELECT * FROM subscriptions WHERE userId = ? AND status = "active" ORDER BY createdAt DESC LIMIT 1',
        [userId]
    );

    if (!subscription) {
        // Default to free plan
        return { allowed: true, plan: 'free', limits: SUBSCRIPTION_PLANS.free.limits };
    }

    const plan = SUBSCRIPTION_PLANS[subscription.plan];
    if (!plan) {
        return { allowed: false, reason: 'Invalid subscription plan' };
    }

    // Check specific limits based on action
    switch (action) {
        case 'create_farm':
            if (plan.limits.maxFarms === -1) return { allowed: true };
            const farmCount = await db.get(
                'SELECT COUNT(*) as count FROM farms WHERE ownerId = ?',
                [userId]
            );
            return { 
                allowed: farmCount.count < plan.limits.maxFarms,
                plan: subscription.plan,
                limits: plan.limits,
                current: farmCount.count,
                max: plan.limits.maxFarms
            };
        
        case 'api_call':
            if (plan.limits.apiCallsPerMonth === -1) return { allowed: true };
            const currentMonth = new Date().toISOString().substring(0, 7);
            const apiCount = await db.get(
                'SELECT COUNT(*) as count FROM api_usage WHERE userId = ? AND month = ?',
                [userId, currentMonth]
            );
            return { 
                allowed: apiCount.count < plan.limits.apiCallsPerMonth,
                plan: subscription.plan,
                limits: plan.limits,
                current: apiCount.count,
                max: plan.limits.apiCallsPerMonth
            };
        
        default:
            return { allowed: true, plan: subscription.plan, limits: plan.limits };
    }
}

// Get subscription plans
router.get('/plans', (req, res) => {
    try {
        res.json({
            success: true,
            data: SUBSCRIPTION_PLANS
        });
    } catch (error) {
        console.error('Error fetching subscription plans:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch subscription plans'
        });
    }
});

// Get user's current subscription
router.get('/current', async (req, res) => {
    try {
        const userId = req.user.id;
        
        const subscription = await db.get(
            'SELECT * FROM subscriptions WHERE userId = ? AND status = "active" ORDER BY createdAt DESC LIMIT 1',
            [userId]
        );

        if (!subscription) {
            return res.json({
                success: true,
                data: {
                    plan: 'free',
                    status: 'active',
                    features: SUBSCRIPTION_PLANS.free.features,
                    limits: SUBSCRIPTION_PLANS.free.limits
                }
            });
        }

        const plan = SUBSCRIPTION_PLANS[subscription.plan];
        res.json({
            success: true,
            data: {
                ...subscription,
                features: plan.features,
                limits: plan.limits
            }
        });
    } catch (error) {
        console.error('Error fetching current subscription:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch current subscription'
        });
    }
});

// Create new subscription
router.post('/', async (req, res) => {
    try {
        const { plan, paymentMethod, billingInfo } = req.body;
        const userId = req.user.id;

        if (!SUBSCRIPTION_PLANS[plan]) {
            return res.status(400).json({
                success: false,
                error: 'Invalid subscription plan'
            });
        }

        // Check if user already has an active subscription
        const existingSubscription = await db.get(
            'SELECT * FROM subscriptions WHERE userId = ? AND status = "active"',
            [userId]
        );

        if (existingSubscription) {
            return res.status(400).json({
                success: false,
                error: 'User already has an active subscription'
            });
        }

        const subscriptionId = uuidv4();
        const now = new Date().toISOString();
        const endDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(); // 30 days from now

        // Create subscription record
        const subscriptionQuery = `
            INSERT INTO subscriptions (
                id, userId, plan, status, startDate, endDate, 
                paymentMethod, billingInfo, refundEligible, createdAt, updatedAt
            ) VALUES (?, ?, ?, 'active', ?, ?, ?, ?, 1, ?, ?)
        `;

        await db.run(subscriptionQuery, [
            subscriptionId,
            userId,
            plan,
            now,
            endDate,
            paymentMethod,
            JSON.stringify(billingInfo),
            now,
            now
        ]);

        // Create payment record
        const paymentId = uuidv4();
        const paymentQuery = `
            INSERT INTO payments (
                id, subscriptionId, userId, amount, currency, status, 
                paymentMethod, transactionId, createdAt
            ) VALUES (?, ?, ?, ?, 'USD', 'completed', ?, ?, ?)
        `;

        await db.run(paymentQuery, [
            paymentId,
            subscriptionId,
            userId,
            SUBSCRIPTION_PLANS[plan].price,
            paymentMethod,
            `txn_${Date.now()}`,
            now
        ]);

        res.status(201).json({
            success: true,
            message: 'Subscription created successfully',
            data: {
                subscriptionId,
                plan,
                status: 'active',
                endDate,
                refundEligible: true
            }
        });
    } catch (error) {
        console.error('Error creating subscription:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to create subscription'
        });
    }
});

// Update subscription plan
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { plan } = req.body;
        const userId = req.user.id;

        if (!SUBSCRIPTION_PLANS[plan]) {
            return res.status(400).json({
                success: false,
                error: 'Invalid subscription plan'
            });
        }

        // Verify subscription ownership
        const subscription = await db.get(
            'SELECT * FROM subscriptions WHERE id = ? AND userId = ?',
            [id, userId]
        );

        if (!subscription) {
            return res.status(404).json({
                success: false,
                error: 'Subscription not found'
            });
        }

        // Update subscription
        const updateQuery = `
            UPDATE subscriptions 
            SET plan = ?, updatedAt = ?
            WHERE id = ?
        `;

        await db.run(updateQuery, [plan, new Date().toISOString(), id]);

        res.json({
            success: true,
            message: 'Subscription updated successfully'
        });
    } catch (error) {
        console.error('Error updating subscription:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to update subscription'
        });
    }
});

// Cancel subscription
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        // Verify subscription ownership
        const subscription = await db.get(
            'SELECT * FROM subscriptions WHERE id = ? AND userId = ?',
            [id, userId]
        );

        if (!subscription) {
            return res.status(404).json({
                success: false,
                error: 'Subscription not found'
            });
        }

        // Update subscription status
        const updateQuery = `
            UPDATE subscriptions 
            SET status = 'cancelled', updatedAt = ?
            WHERE id = ?
        `;

        await db.run(updateQuery, [new Date().toISOString(), id]);

        res.json({
            success: true,
            message: 'Subscription cancelled successfully'
        });
    } catch (error) {
        console.error('Error cancelling subscription:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to cancel subscription'
        });
    }
});

// Process refund
router.post('/:id/refund', async (req, res) => {
    try {
        const { id } = req.params;
        const { reason } = req.body;
        const userId = req.user.id;

        // Verify subscription ownership
        const subscription = await db.get(
            'SELECT * FROM subscriptions WHERE id = ? AND userId = ?',
            [id, userId]
        );

        if (!subscription) {
            return res.status(404).json({
                success: false,
                error: 'Subscription not found'
            });
        }

        // Check if refund is eligible (within 30 days)
        const subscriptionDate = new Date(subscription.createdAt);
        const now = new Date();
        const daysSinceSubscription = Math.floor((now - subscriptionDate) / (1000 * 60 * 60 * 24));

        if (daysSinceSubscription > 30) {
            return res.status(400).json({
                success: false,
                error: 'Refund period has expired (30 days)'
            });
        }

        if (!subscription.refundEligible) {
            return res.status(400).json({
                success: false,
                error: 'Refund not eligible for this subscription'
            });
        }

        // Create refund record
        const refundId = uuidv4();
        const refundQuery = `
            INSERT INTO refunds (
                id, subscriptionId, userId, amount, reason, status, createdAt
            ) VALUES (?, ?, ?, ?, ?, 'pending', ?)
        `;

        await db.run(refundQuery, [
            refundId,
            id,
            userId,
            SUBSCRIPTION_PLANS[subscription.plan].price,
            reason || 'No reason provided',
            new Date().toISOString()
        ]);

        // Update subscription status
        const updateQuery = `
            UPDATE subscriptions 
            SET status = 'refunded', refundEligible = 0, updatedAt = ?
            WHERE id = ?
        `;

        await db.run(updateQuery, [new Date().toISOString(), id]);

        res.json({
            success: true,
            message: 'Refund request submitted successfully',
            data: {
                refundId,
                status: 'pending',
                estimatedProcessingTime: '3-5 business days'
            }
        });
    } catch (error) {
        console.error('Error processing refund:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to process refund'
        });
    }
});

// Get subscription usage
router.get('/:id/usage', async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        // Verify subscription ownership
        const subscription = await db.get(
            'SELECT * FROM subscriptions WHERE id = ? AND userId = ?',
            [id, userId]
        );

        if (!subscription) {
            return res.status(404).json({
                success: false,
                error: 'Subscription not found'
            });
        }

        const plan = SUBSCRIPTION_PLANS[subscription.plan];
        const currentMonth = new Date().toISOString().substring(0, 7);

        // Get usage statistics
        const [farmCount, apiUsage] = await Promise.all([
            db.get('SELECT COUNT(*) as count FROM farms WHERE ownerId = ?', [userId]),
            db.get('SELECT COUNT(*) as count FROM api_usage WHERE userId = ? AND month = ?', [userId, currentMonth])
        ]);

        res.json({
            success: true,
            data: {
                plan: subscription.plan,
                limits: plan.limits,
                usage: {
                    farms: farmCount.count,
                    apiCalls: apiUsage.count
                },
                remaining: {
                    farms: plan.limits.maxFarms === -1 ? -1 : Math.max(0, plan.limits.maxFarms - farmCount.count),
                    apiCalls: plan.limits.apiCallsPerMonth === -1 ? -1 : Math.max(0, plan.limits.apiCallsPerMonth - apiUsage.count)
                }
            }
        });
    } catch (error) {
        console.error('Error fetching subscription usage:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch subscription usage'
        });
    }
});

// Middleware to check subscription limits
const checkSubscriptionLimit = (action) => {
    return async (req, res, next) => {
        try {
            const result = await checkSubscriptionLimits(req.user.id, action);
            
            if (!result.allowed) {
                return res.status(403).json({
                    success: false,
                    error: 'Subscription limit exceeded',
                    details: result
                });
            }
            
            req.subscription = result;
            next();
        } catch (error) {
            console.error('Error checking subscription limits:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to check subscription limits'
            });
        }
    };
};

module.exports = { router, checkSubscriptionLimit, checkSubscriptionLimits };
