const StripeBillingService = require('../../services/stripeBillingService');

describe('StripeBillingService billing status', () => {
    const originalEnv = process.env;

    beforeEach(() => {
        process.env = { ...originalEnv };
        delete process.env.STRIPE_SECRET_KEY;
        delete process.env.STRIPE_PUBLISHABLE_KEY;
        delete process.env.STRIPE_WEBHOOK_SECRET;
        delete process.env.STRIPE_PRICE_ID_FARM_PRO;
    });

    afterAll(() => {
        process.env = originalEnv;
    });

    test('isConfigured is false when Stripe env is missing', () => {
        const billing = new StripeBillingService(null);
        expect(billing.isConfigured()).toBe(false);
        expect(billing.getBillingStatus().billingEnabled).toBe(false);
        expect(billing.getBillingStatus().mode.active).toBe('disabled');
    });

    test('isConfigured requires secret, publishable key, and price id', () => {
        process.env.STRIPE_SECRET_KEY = 'sk_test_example';
        process.env.STRIPE_PUBLISHABLE_KEY = 'pk_test_example';
        process.env.STRIPE_PRICE_ID_FARM_PRO = 'price_test123';

        const billing = new StripeBillingService(null);
        expect(billing.isConfigured()).toBe(true);

        const status = billing.getBillingStatus();
        expect(status.billingEnabled).toBe(true);
        expect(status.mode.active).toBe('test');
        expect(status.mode.mismatch).toBe(false);
        expect(status.config.secretKeyPresent).toBe(true);
        expect(status.config.publishableKeyPresent).toBe(true);
        expect(status.config.priceIdPresent).toBe(true);
    });

    test('isConfigured is false when publishable key is missing', () => {
        process.env.STRIPE_SECRET_KEY = 'sk_test_example';
        process.env.STRIPE_PRICE_ID_FARM_PRO = 'price_test123';

        const billing = new StripeBillingService(null);
        expect(billing.isConfigured()).toBe(false);
        expect(billing.getBillingStatus().config.publishableKeyPresent).toBe(false);
    });

    test('detects test vs live mode mismatch', () => {
        process.env.STRIPE_SECRET_KEY = 'sk_test_example';
        process.env.STRIPE_PUBLISHABLE_KEY = 'pk_live_example';
        process.env.STRIPE_PRICE_ID_FARM_PRO = 'price_test123';

        const status = new StripeBillingService(null).getBillingStatus();
        expect(status.mode.mismatch).toBe(true);
        expect(status.mode.secret).toBe('test');
        expect(status.mode.publishable).toBe('live');
    });

    test('webhookReady requires webhook secret', () => {
        process.env.STRIPE_SECRET_KEY = 'sk_test_example';
        process.env.STRIPE_PUBLISHABLE_KEY = 'pk_test_example';
        process.env.STRIPE_PRICE_ID_FARM_PRO = 'price_test123';
        process.env.STRIPE_WEBHOOK_SECRET = 'whsec_test';

        const billing = new StripeBillingService(null);
        expect(billing.isWebhookConfigured()).toBe(true);
        expect(billing.getBillingStatus().webhookReady).toBe(true);
    });
});
