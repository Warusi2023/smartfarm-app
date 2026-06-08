/**
 * Stripe Checkout (hosted) for Farm Pro — $29/month per account.
 */

const logger = require('../utils/logger');
const SubscriptionEventService = require('./subscriptionEventService');

let StripeSdk;
try {
    StripeSdk = require('stripe');
} catch (_) {
    StripeSdk = null;
}

class StripeBillingService {
    constructor(dbPool) {
        this.dbPool = dbPool;
        this.events = new SubscriptionEventService(dbPool);
        const secret = process.env.STRIPE_SECRET_KEY;
        this.stripe = secret && StripeSdk ? new StripeSdk(secret) : null;
        this.priceId = process.env.STRIPE_PRICE_ID_FARM_PRO || '';
        this.frontendUrl = (
            process.env.FRONTEND_URL ||
            process.env.PUBLIC_FRONTEND_URL ||
            'https://www.smartfarm-app.com'
        ).replace(/\/$/, '');
    }

    isConfigured() {
        return !!(this.stripe && this.priceId);
    }

    getPublishableKey() {
        return process.env.STRIPE_PUBLISHABLE_KEY || '';
    }

    /**
     * @param {string} userId
     * @param {string} email
     */
    async getOrCreateCustomer(userId, email) {
        if (!this.dbPool) {
            throw new Error('Database unavailable');
        }
        const existing = await this.dbPool.query(
            'SELECT stripe_customer_id, email FROM users WHERE id = $1',
            [userId]
        );
        if (!existing.rows[0]) {
            throw new Error('User not found');
        }
        const row = existing.rows[0];
        if (row.stripe_customer_id) {
            return row.stripe_customer_id;
        }
        if (!this.stripe) {
            throw new Error('Stripe is not configured');
        }
        const customer = await this.stripe.customers.create({
            email: email || row.email,
            metadata: { smartfarm_user_id: userId }
        });
        await this.dbPool.query(
            'UPDATE users SET stripe_customer_id = $2, updated_at = CURRENT_TIMESTAMP WHERE id = $1',
            [userId, customer.id]
        );
        return customer.id;
    }

    /**
     * @param {string} userId
     * @param {string} email
     */
    async createCheckoutSession(userId, email) {
        if (!this.isConfigured()) {
            const err = new Error('Stripe billing is not configured');
            err.code = 'BILLING_NOT_CONFIGURED';
            throw err;
        }
        const customerId = await this.getOrCreateCustomer(userId, email);
        await this.events.log(userId, 'upgrade_started', { plan: 'professional' });

        const session = await this.stripe.checkout.sessions.create({
            mode: 'subscription',
            customer: customerId,
            line_items: [{ price: this.priceId, quantity: 1 }],
            success_url: `${this.frontendUrl}/subscription-management.html?checkout=success`,
            cancel_url: `${this.frontendUrl}/subscription-management.html?checkout=cancelled`,
            client_reference_id: userId,
            metadata: { smartfarm_user_id: userId, plan: 'professional' },
            subscription_data: {
                metadata: { smartfarm_user_id: userId, plan: 'professional' }
            }
        });

        return { sessionId: session.id, url: session.url };
    }

    /**
     * @param {import('stripe').Stripe.Event} event
     */
    async handleWebhookEvent(event) {
        switch (event.type) {
            case 'checkout.session.completed':
                await this.onCheckoutCompleted(event.data.object);
                break;
            case 'customer.subscription.updated':
                await this.onSubscriptionUpdated(event.data.object);
                break;
            case 'customer.subscription.deleted':
                await this.onSubscriptionDeleted(event.data.object);
                break;
            case 'invoice.payment_failed':
                logger.warn('Stripe invoice payment failed', {
                    subscriptionId: event.data.object.subscription,
                    customerId: event.data.object.customer
                });
                break;
            default:
                break;
        }
    }

    async onCheckoutCompleted(session) {
        const userId = session.client_reference_id || session.metadata?.smartfarm_user_id;
        if (!userId || !session.subscription) {
            logger.warn('checkout.session.completed missing user or subscription', { sessionId: session.id });
            return;
        }
        const sub = await this.stripe.subscriptions.retrieve(session.subscription);
        await this.activateProfessional(userId, sub);
        await this.events.log(userId, 'upgrade_completed', {
            plan: 'professional',
            stripeSubscriptionId: sub.id
        });
    }

    async onSubscriptionUpdated(subscription) {
        const userId = subscription.metadata?.smartfarm_user_id;
        if (!userId) {
            return;
        }
        if (subscription.status === 'active' || subscription.status === 'trialing') {
            await this.activateProfessional(userId, subscription);
            return;
        }
        if (subscription.status === 'past_due' || subscription.status === 'unpaid') {
            await this.updateSubscriptionStatus(userId, 'past_due', subscription);
        }
    }

    async onSubscriptionDeleted(subscription) {
        const userId = subscription.metadata?.smartfarm_user_id;
        if (!userId || !this.dbPool) {
            return;
        }
        const DatabaseHelpers = require('../utils/db-helpers');
        const db = new DatabaseHelpers(this.dbPool);
        await db.updateSubscription(userId, { status: 'cancelled' });
        await this.events.log(userId, 'subscription_cancelled', { stripeSubscriptionId: subscription.id });
    }

    /**
     * @param {string} userId
     * @param {object} stripeSub Stripe subscription object
     */
    async activateProfessional(userId, stripeSub) {
        if (!this.dbPool) {
            return;
        }
        const periodStart = stripeSub.current_period_start
            ? new Date(stripeSub.current_period_start * 1000).toISOString()
            : new Date().toISOString();
        const periodEnd = stripeSub.current_period_end
            ? new Date(stripeSub.current_period_end * 1000).toISOString()
            : null;

        await this.dbPool.query(
            `INSERT INTO subscriptions (
                user_id, plan_name, plan_type, status,
                current_period_start, current_period_end, stripe_subscription_id
             ) VALUES ($1, $2, $3, $4, $5, $6, $7)
             ON CONFLICT (user_id) DO UPDATE SET
                plan_name = EXCLUDED.plan_name,
                plan_type = EXCLUDED.plan_type,
                status = EXCLUDED.status,
                current_period_start = EXCLUDED.current_period_start,
                current_period_end = EXCLUDED.current_period_end,
                stripe_subscription_id = EXCLUDED.stripe_subscription_id,
                updated_at = NOW()`,
            [
                userId,
                'Farm Pro',
                'professional',
                'active',
                periodStart,
                periodEnd,
                stripeSub.id
            ]
        );
    }

    async updateSubscriptionStatus(userId, status, stripeSub) {
        if (!this.dbPool) {
            return;
        }
        await this.dbPool.query(
            `UPDATE subscriptions SET status = $2, stripe_subscription_id = $3, updated_at = NOW() WHERE user_id = $1`,
            [userId, status, stripeSub.id]
        );
    }

    /**
     * @param {Buffer|string} rawBody
     * @param {string} signature
     */
    constructEvent(rawBody, signature) {
        const secret = process.env.STRIPE_WEBHOOK_SECRET;
        if (!this.stripe || !secret) {
            throw new Error('Stripe webhook is not configured');
        }
        return this.stripe.webhooks.constructEvent(rawBody, signature, secret);
    }
}

module.exports = StripeBillingService;
