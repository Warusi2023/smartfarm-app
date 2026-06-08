/**
 * Stripe webhook handler — must use raw body (mounted before express.json in server.js).
 */

const logger = require('../utils/logger');
const StripeBillingService = require('../services/stripeBillingService');

/**
 * @param {import('pg').Pool|null} dbPool
 */
function createStripeWebhookHandler(dbPool) {
    const billing = new StripeBillingService(dbPool);

    return async function stripeWebhook(req, res) {
        const signature = req.headers['stripe-signature'];
        if (!signature) {
            return res.status(400).json({ success: false, error: 'Missing Stripe signature' });
        }

        let event;
        try {
            event = billing.constructEvent(req.body, signature);
        } catch (error) {
            logger.warn('Stripe webhook signature verification failed', { error: error.message });
            return res.status(400).json({ success: false, error: 'Invalid webhook signature' });
        }

        try {
            await billing.handleWebhookEvent(event);
            return res.json({ received: true });
        } catch (error) {
            logger.errorWithContext('Stripe webhook handler error', {
                type: event.type,
                error: error.message
            });
            return res.status(500).json({ success: false, error: 'Webhook handler failed' });
        }
    };
}

module.exports = { createStripeWebhookHandler };
