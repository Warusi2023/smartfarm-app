const {
    formatBillingDate,
    buildStatusBadge,
    buildRenewalLabel,
    buildBillingAlert,
    buildSubscriptionView,
    normalizeStripeStatus
} = require('../../utils/subscriptionBillingPresentation');

describe('subscriptionBillingPresentation', () => {
    test('formatBillingDate renders en-GB style', () => {
        expect(formatBillingDate('2026-08-12T00:00:00.000Z')).toMatch(/12 Aug 2026/);
    });

    test('buildStatusBadge maps Stripe statuses', () => {
        expect(buildStatusBadge('active').label).toBe('Active');
        expect(buildStatusBadge('past_due').tone).toBe('warning');
        expect(buildStatusBadge('cancelled').stripeStatus).toBe('canceled');
    });

    test('buildRenewalLabel shows renew vs access until cancel', () => {
        const active = buildRenewalLabel({
            status: 'active',
            current_period_end: '2026-08-12T00:00:00.000Z'
        });
        expect(active).toBe('Renews on 12 Aug 2026');

        const canceling = buildRenewalLabel({
            status: 'active',
            cancel_at_period_end: true,
            current_period_end: '2026-08-12T00:00:00.000Z'
        });
        expect(canceling).toBe('Access until 12 Aug 2026');
    });

    test('buildBillingAlert for past_due includes pause date', () => {
        const alert = buildBillingAlert({
            status: 'past_due',
            current_period_end: '2026-08-12T00:00:00.000Z',
            next_payment_attempt: '2026-08-05T00:00:00.000Z'
        });
        expect(alert.code).toBe('PAYMENT_FAILED');
        expect(alert.message).toContain("couldn't charge your card");
        expect(alert.message).toContain('12 Aug 2026');
        expect(alert.message).toContain('Stripe will retry');
    });

    test('buildSubscriptionView for trialing user without Stripe row', () => {
        const future = new Date();
        future.setDate(future.getDate() + 10);
        const view = buildSubscriptionView(null, { trial_end: future.toISOString() });
        expect(view.stripeStatus).toBe('trialing');
        expect(view.statusBadge.label).toBe('Trialing');
        expect(view.renewalLabel).toContain('Trial ends');
    });

    test('normalizeStripeStatus maps cancelled spelling', () => {
        expect(normalizeStripeStatus('cancelled')).toBe('canceled');
    });
});
