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

const DEFAULT_WEBHOOK_URL = 'https://web-production-86d39.up.railway.app/api/webhooks/stripe';

function detectStripeKeyMode(key, kind) {
    if (!key || typeof key !== 'string') {
        return 'missing';
    }
    if (kind === 'secret') {
        if (key.startsWith('sk_test_')) {
            return 'test';
        }
        if (key.startsWith('sk_live_')) {
            return 'live';
        }
    }
    if (kind === 'publishable') {
        if (key.startsWith('pk_test_')) {
            return 'test';
        }
        if (key.startsWith('pk_live_')) {
            return 'live';
        }
    }
    return 'unknown';
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
        return !!(this.stripe && this.priceId && this.getPublishableKey());
    }

    isWebhookConfigured() {
        return !!(this.stripe && process.env.STRIPE_WEBHOOK_SECRET);
    }

    getPublishableKey() {
        return process.env.STRIPE_PUBLISHABLE_KEY || '';
    }

    getExpectedWebhookUrl() {
        return (process.env.STRIPE_WEBHOOK_URL || DEFAULT_WEBHOOK_URL).replace(/\/$/, '');
    }

    getBillingStatus() {
        const secretKey = process.env.STRIPE_SECRET_KEY || '';
        const publishableKey = this.getPublishableKey();
        const secretMode = detectStripeKeyMode(secretKey, 'secret');
        const publishableMode = detectStripeKeyMode(publishableKey, 'publishable');
        const activeMode = secretMode !== 'missing'
            ? secretMode
            : (publishableMode !== 'missing' ? publishableMode : 'disabled');

        return {
            billingEnabled: this.isConfigured(),
            checkoutReady: this.isConfigured(),
            webhookReady: this.isWebhookConfigured(),
            stripeSdkLoaded: !!StripeSdk,
            config: {
                secretKeyPresent: !!secretKey,
                publishableKeyPresent: !!publishableKey,
                webhookSecretPresent: !!process.env.STRIPE_WEBHOOK_SECRET,
                priceIdPresent: !!this.priceId,
                frontendUrl: this.frontendUrl
            },
            mode: {
                secret: secretMode,
                publishable: publishableMode,
                active: activeMode,
                mismatch: secretMode !== 'missing' &&
                    publishableMode !== 'missing' &&
                    secretMode !== publishableMode
            },
            webhook: {
                expectedUrl: this.getExpectedWebhookUrl(),
                secretConfigured: this.isWebhookConfigured()
            },
            farmProPriceMonthly: 29,
            currency: 'usd'
        };
    }

    /**
     * Best-effort Stripe Dashboard webhook registration check (requires secret key).
     * @param {object} status from getBillingStatus()
     */
    async enrichBillingStatusWithStripeWebhooks(status) {
        if (!this.stripe) {
            status.webhook.stripeApiChecked = false;
            return status;
        }

        try {
            const list = await this.stripe.webhookEndpoints.list({ limit: 20 });
            const expected = status.webhook.expectedUrl;
            const matches = list.data.filter((endpoint) => {
                const url = (endpoint.url || '').replace(/\/$/, '');
                return url === expected || url.endsWith('/api/webhooks/stripe');
            });
            status.webhook.stripeApiChecked = true;
            status.webhook.registeredInStripe = matches.length > 0;
            status.webhook.matchingEndpoints = matches.map((endpoint) => ({
                id: endpoint.id,
                url: endpoint.url,
                status: endpoint.status,
                enabledEvents: endpoint.enabled_events
            }));
        } catch (error) {
            status.webhook.stripeApiChecked = true;
            status.webhook.stripeApiError = error.message;
        }

        return status;
    }

    logStartupStatus() {
        const status = this.getBillingStatus();
        if (status.billingEnabled) {
            logger.info('Stripe billing ready', {
                mode: status.mode.active,
                checkoutReady: status.checkoutReady,
                webhookReady: status.webhookReady,
                priceIdPresent: status.config.priceIdPresent
            });
            if (status.mode.mismatch) {
                logger.warn('Stripe secret/publishable key mode mismatch (test vs live)', {
                    secret: status.mode.secret,
                    publishable: status.mode.publishable
                });
            }
            if (!status.webhookReady) {
                logger.warn('Stripe checkout enabled but STRIPE_WEBHOOK_SECRET missing — subscriptions will not activate after payment');
            }
            return;
        }

        const partial = status.config.secretKeyPresent ||
            status.config.publishableKeyPresent ||
            status.config.priceIdPresent ||
            status.config.webhookSecretPresent;
        if (partial) {
            logger.warn('Stripe billing partially configured — checkout disabled until all required vars are set', {
                config: status.config
            });
            return;
        }

        logger.info('Stripe billing disabled (STRIPE_* env not configured)');
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
     * Stripe Customer Portal — cancel, update payment method, invoices.
     * @param {string} userId
     * @param {string} email
     */
    async createBillingPortalSession(userId, email) {
        if (!this.isConfigured()) {
            const err = new Error('Stripe billing is not configured');
            err.code = 'BILLING_NOT_CONFIGURED';
            throw err;
        }
        const customerId = await this.getOrCreateCustomer(userId, email);
        const session = await this.stripe.billingPortal.sessions.create({
            customer: customerId,
            return_url: `${this.frontendUrl}/subscription-management.html`
        });
        return { url: session.url };
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
                await this.onInvoicePaymentFailed(event.data.object);
                break;
            default:
                break;
        }
    }

    async resolveUserIdFromStripeSubscription(stripeSub) {
        if (stripeSub.metadata?.smartfarm_user_id) {
            return stripeSub.metadata.smartfarm_user_id;
        }
        if (!this.dbPool || !stripeSub.customer) {
            return null;
        }
        const customerId = typeof stripeSub.customer === 'string'
            ? stripeSub.customer
            : stripeSub.customer.id;
        const result = await this.dbPool.query(
            'SELECT id FROM users WHERE stripe_customer_id = $1 LIMIT 1',
            [customerId]
        );
        return result.rows[0]?.id || null;
    }

    async onCheckoutCompleted(session) {
        const userId = session.client_reference_id || session.metadata?.smartfarm_user_id;
        if (!userId || !session.subscription) {
            logger.warn('checkout.session.completed missing user or subscription', { sessionId: session.id });
            return;
        }
        const sub = await this.stripe.subscriptions.retrieve(session.subscription);
        await this.syncFromStripeSubscription(userId, sub);
        await this.events.log(userId, 'upgrade_completed', {
            plan: 'professional',
            stripeSubscriptionId: sub.id
        });
    }

    async onSubscriptionUpdated(subscription) {
        const userId = await this.resolveUserIdFromStripeSubscription(subscription);
        if (!userId) {
            return;
        }
        const extras = {};
        if (subscription.status === 'active' || subscription.status === 'trialing') {
            extras.nextPaymentAttempt = null;
        } else if (subscription.status === 'past_due' && this.dbPool) {
            const row = await this.dbPool.query(
                'SELECT next_payment_attempt FROM subscriptions WHERE user_id = $1',
                [userId]
            );
            extras.nextPaymentAttempt = row.rows[0]?.next_payment_attempt || null;
        }
        await this.syncFromStripeSubscription(userId, subscription, extras);
        if (subscription.cancel_at_period_end) {
            await this.events.log(userId, 'subscription_cancel_scheduled', {
                stripeSubscriptionId: subscription.id,
                currentPeriodEnd: subscription.current_period_end
            });
        }
    }

    async onSubscriptionDeleted(subscription) {
        const userId = await this.resolveUserIdFromStripeSubscription(subscription);
        if (!userId || !this.dbPool) {
            return;
        }

        const periodEnd = subscription.current_period_end
            ? new Date(subscription.current_period_end * 1000).toISOString()
            : null;
        const canceledAt = subscription.canceled_at
            ? new Date(subscription.canceled_at * 1000).toISOString()
            : new Date().toISOString();

        await this.dbPool.query(
            `UPDATE subscriptions SET
                plan_name = $2,
                plan_type = $3,
                status = $4,
                current_period_end = $5,
                cancel_at_period_end = FALSE,
                canceled_at = $6,
                next_payment_attempt = NULL,
                stripe_subscription_id = NULL,
                updated_at = NOW()
             WHERE user_id = $1`,
            [userId, 'Free', 'free', 'canceled', periodEnd, canceledAt]
        );
        await this.events.log(userId, 'subscription_cancelled', { stripeSubscriptionId: subscription.id });
    }

    async onInvoicePaymentFailed(invoice) {
        const subscriptionId = typeof invoice.subscription === 'string'
            ? invoice.subscription
            : invoice.subscription?.id;
        if (!subscriptionId || !this.stripe) {
            logger.warn('invoice.payment_failed without subscription', { invoiceId: invoice.id });
            return;
        }

        const stripeSub = await this.stripe.subscriptions.retrieve(subscriptionId);
        const userId = await this.resolveUserIdFromStripeSubscription(stripeSub);
        if (!userId) {
            logger.warn('invoice.payment_failed could not resolve user', {
                invoiceId: invoice.id,
                subscriptionId
            });
            return;
        }

        const nextPaymentAttempt = invoice.next_payment_attempt
            ? new Date(invoice.next_payment_attempt * 1000).toISOString()
            : null;

        await this.syncFromStripeSubscription(userId, stripeSub, { nextPaymentAttempt });
        await this.events.log(userId, 'payment_failed', {
            invoiceId: invoice.id,
            stripeSubscriptionId: stripeSub.id,
            nextPaymentAttempt
        });

        logger.warn('Stripe invoice payment failed — subscription marked past_due', {
            userId,
            subscriptionId: stripeSub.id,
            nextPaymentAttempt
        });
    }

    /**
     * Mirror Stripe subscription state into subscriptions row.
     * @param {string} userId
     * @param {object} stripeSub
     * @param {{ nextPaymentAttempt?: string|null }} extras
     */
    async syncFromStripeSubscription(userId, stripeSub, extras = {}) {
        if (!this.dbPool) {
            return;
        }

        const periodStart = stripeSub.current_period_start
            ? new Date(stripeSub.current_period_start * 1000).toISOString()
            : new Date().toISOString();
        const periodEnd = stripeSub.current_period_end
            ? new Date(stripeSub.current_period_end * 1000).toISOString()
            : null;
        const canceledAt = stripeSub.canceled_at
            ? new Date(stripeSub.canceled_at * 1000).toISOString()
            : null;
        const stripeStatus = stripeSub.status || 'active';
        const nextPaymentAttempt = Object.prototype.hasOwnProperty.call(extras, 'nextPaymentAttempt')
            ? extras.nextPaymentAttempt
            : null;

        await this.dbPool.query(
            `INSERT INTO subscriptions (
                user_id, plan_name, plan_type, status,
                current_period_start, current_period_end, stripe_subscription_id,
                cancel_at_period_end, canceled_at, next_payment_attempt
             ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
             ON CONFLICT (user_id) DO UPDATE SET
                plan_name = EXCLUDED.plan_name,
                plan_type = EXCLUDED.plan_type,
                status = EXCLUDED.status,
                current_period_start = EXCLUDED.current_period_start,
                current_period_end = EXCLUDED.current_period_end,
                stripe_subscription_id = EXCLUDED.stripe_subscription_id,
                cancel_at_period_end = EXCLUDED.cancel_at_period_end,
                canceled_at = EXCLUDED.canceled_at,
                next_payment_attempt = EXCLUDED.next_payment_attempt,
                updated_at = NOW()`,
            [
                userId,
                'Farm Pro',
                'professional',
                stripeStatus,
                periodStart,
                periodEnd,
                stripeSub.id,
                stripeSub.cancel_at_period_end === true,
                canceledAt,
                nextPaymentAttempt
            ]
        );
    }

    /**
     * @deprecated use syncFromStripeSubscription
     */
    async activateProfessional(userId, stripeSub) {
        await this.syncFromStripeSubscription(userId, stripeSub);
    }

    async updateSubscriptionStatus(userId, status, stripeSub) {
        await this.syncFromStripeSubscription(userId, stripeSub);
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
