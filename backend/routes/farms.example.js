/**
 * Example: Farm Routes with Subscription Protection
 * 
 * This file demonstrates how to protect routes using the subscription middleware.
 * Copy this pattern to your actual farm routes.
 */

const express = require('express');
const router = express.Router();

// Import middleware
const AuthMiddleware = require('../middleware/auth');
const SubscriptionMiddleware = require('../middleware/subscriptionMiddleware');

// Initialize middleware (pass dbPool if available)
const authMiddleware = new AuthMiddleware();
const subscriptionMiddleware = new SubscriptionMiddleware(require('../server').dbPool); // Adjust path

/**
 * Create farm - requires trial or paid plan and respects farm limit
 */
router.post(
    '/',
    authMiddleware.authenticate(),
    subscriptionMiddleware.requireActiveSubscription('pro'),
    subscriptionMiddleware.enforceFarmLimit(),
    async (req, res) => {
        try {
            const userId = req.user.id;
            const { name, location, area } = req.body;

            // Your farm creation logic here
            // req.subscription contains subscription info:
            // - planKey: 'trial' | 'professional' | 'enterprise'
            // - maxFarms: 10 | Infinity
            // - level: 'pro' | 'enterprise'
            // - daysRemaining: (if trial)

            res.json({
                success: true,
                message: 'Farm created successfully',
                data: { /* farm data */ }
            });
        } catch (error) {
            console.error('Create farm error:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to create farm'
            });
        }
    }
);

/**
 * Get all farms - requires active subscription or trial
 */
router.get(
    '/',
    authMiddleware.authenticate(),
    subscriptionMiddleware.requireActiveSubscription('pro'),
    async (req, res) => {
        try {
            const userId = req.user.id;
            // Your farm fetching logic here
            res.json({
                success: true,
                data: [ /* farms */ ]
            });
        } catch (error) {
            console.error('Get farms error:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to fetch farms'
            });
        }
    }
);

/**
 * Enterprise-only feature - requires enterprise plan
 */
router.get(
    '/enterprise-analytics',
    authMiddleware.authenticate(),
    subscriptionMiddleware.requireActiveSubscription('enterprise'),
    async (req, res) => {
        try {
            // Only enterprise users can reach this code
            res.json({
                success: true,
                data: { /* enterprise analytics */ }
            });
        } catch (error) {
            console.error('Enterprise analytics error:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to fetch analytics'
            });
        }
    }
);

module.exports = router;



