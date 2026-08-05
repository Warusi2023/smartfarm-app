/**
 * Stripe-aligned subscription labels for API + dashboard UI.
 */

function normalizeStripeStatus(status) {
    if (!status) {
        return null;
    }
    const s = String(status).toLowerCase();
    if (s === 'cancelled') {
        return 'canceled';
    }
    return s;
}

function parseDate(value) {
    if (!value) {
        return null;
    }
    const d = value instanceof Date ? value : new Date(value);
    return Number.isNaN(d.getTime()) ? null : d;
}

function formatBillingDate(value) {
    const d = parseDate(value);
    if (!d) {
        return null;
    }
    return d.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    });
}

const STATUS_BADGES = {
    active: { label: 'Active', tone: 'success' },
    trialing: { label: 'Trialing', tone: 'info' },
    past_due: { label: 'Past due', tone: 'warning' },
    canceled: { label: 'Canceled', tone: 'secondary' },
    incomplete: { label: 'Incomplete', tone: 'warning' },
    unpaid: { label: 'Unpaid', tone: 'danger' },
    trial_expired: { label: 'Trial ended', tone: 'danger' },
    no_subscription: { label: 'No plan', tone: 'secondary' }
};

function buildStatusBadge(stripeStatus, options = {}) {
    const normalized = normalizeStripeStatus(stripeStatus) || 'no_subscription';
    const base = STATUS_BADGES[normalized] || { label: normalized, tone: 'secondary' };
    const badge = { ...base, stripeStatus: normalized };

    if (options.cancelAtPeriodEnd && (normalized === 'active' || normalized === 'trialing')) {
        badge.label = 'Active';
        badge.tone = 'success';
        badge.cancelScheduled = true;
    }

    return badge;
}

function buildRenewalLabel(sub) {
    if (!sub) {
        return null;
    }

    const periodEnd = sub.current_period_end || sub.currentPeriodEnd || sub.nextBillingDate;
    const endLabel = formatBillingDate(periodEnd);

    if (sub.plan === 'trial' && sub.trialEnd) {
        const trialEndLabel = formatBillingDate(sub.trialEnd);
        return trialEndLabel ? `Trial ends ${trialEndLabel}` : null;
    }

    if (!endLabel) {
        return null;
    }

    const status = normalizeStripeStatus(sub.status || sub.stripeStatus);
    const cancelAtEnd = sub.cancel_at_period_end || sub.cancelAtPeriodEnd;

    if (cancelAtEnd && (status === 'active' || status === 'trialing' || status === 'past_due')) {
        return `Access until ${endLabel}`;
    }

    if (status === 'canceled') {
        return endLabel ? `Ended ${endLabel}` : null;
    }

    if (['active', 'trialing', 'past_due'].includes(status)) {
        return endLabel ? `Renews on ${endLabel}` : null;
    }

    return null;
}

function buildBillingAlert(sub) {
    if (!sub) {
        return null;
    }

    const status = normalizeStripeStatus(sub.status || sub.stripeStatus);
    const periodEnd = sub.current_period_end || sub.currentPeriodEnd || sub.nextBillingDate;
    const endLabel = formatBillingDate(periodEnd) || 'the end of your billing period';
    const nextAttempt = sub.next_payment_attempt || sub.nextPaymentAttempt;
    const nextAttemptLabel = formatBillingDate(nextAttempt);

    if (status === 'past_due' || status === 'unpaid') {
        let message = `We couldn't charge your card. Farm Pro will pause on ${endLabel} if you don't update your payment method.`;
        if (nextAttemptLabel) {
            message += ` Stripe will retry on ${nextAttemptLabel}.`;
        }
        return {
            tone: 'danger',
            code: 'PAYMENT_FAILED',
            message,
            action: 'manage_billing'
        };
    }

    if (sub.cancel_at_period_end || sub.cancelAtPeriodEnd) {
        return {
            tone: 'warning',
            code: 'CANCEL_SCHEDULED',
            message: `Your Farm Pro subscription will cancel on ${endLabel}. You keep access until then.`,
            action: 'manage_billing'
        };
    }

    if (status === 'incomplete') {
        return {
            tone: 'warning',
            code: 'INCOMPLETE',
            message: 'Your checkout did not finish. Complete payment to activate Farm Pro.',
            action: 'upgrade'
        };
    }

    return null;
}

function buildSubscriptionView(sub, trialInfo) {
    if (!sub) {
        if (trialInfo && trialInfo.trial_end) {
            const trialEnd = parseDate(trialInfo.trial_end);
            const now = new Date();
            if (trialEnd && trialEnd > now) {
                const daysRemaining = Math.ceil((trialEnd - now) / (1000 * 60 * 60 * 24));
                const trialSub = {
                    plan: 'trial',
                    planName: '30-Day Free Trial',
                    status: 'trialing',
                    stripeStatus: 'trialing',
                    trialEnd: trialEnd.toISOString(),
                    daysRemaining,
                    maxFarms: 1,
                    priceMonthly: 0,
                    canUpgrade: true
                };
                return {
                    ...trialSub,
                    statusBadge: buildStatusBadge('trialing'),
                    renewalLabel: buildRenewalLabel(trialSub),
                    billingAlert: null,
                    currentPeriodEnd: trialEnd.toISOString()
                };
            }
            const expired = {
                plan: null,
                status: 'trial_expired',
                stripeStatus: 'trial_expired',
                trialEnd: trialEnd.toISOString(),
                daysRemaining: 0,
                canUpgrade: true
            };
            return {
                ...expired,
                statusBadge: buildStatusBadge('trial_expired'),
                renewalLabel: null,
                billingAlert: {
                    tone: 'danger',
                    code: 'TRIAL_EXPIRED',
                    message: 'Your 30-day trial has ended. Upgrade to Farm Pro ($29/month) to keep using SmartFarm.',
                    action: 'upgrade'
                }
            };
        }
        return {
            plan: null,
            status: 'no_subscription',
            stripeStatus: 'no_subscription',
            statusBadge: buildStatusBadge('no_subscription'),
            renewalLabel: null,
            billingAlert: null,
            canUpgrade: true
        };
    }

    const stripeStatus = normalizeStripeStatus(sub.status);
    const periodEnd = sub.current_period_end || sub.nextBillingDate;
    const view = {
        ...sub,
        stripeStatus,
        cancelAtPeriodEnd: !!sub.cancel_at_period_end,
        canceledAt: sub.canceled_at || null,
        nextPaymentAttempt: sub.next_payment_attempt || null,
        currentPeriodEnd: periodEnd ? parseDate(periodEnd)?.toISOString() || periodEnd : null,
        statusBadge: buildStatusBadge(stripeStatus, {
            cancelAtPeriodEnd: sub.cancel_at_period_end
        }),
        renewalLabel: buildRenewalLabel(sub),
        billingAlert: buildBillingAlert(sub),
        canManageBilling: !!(sub.stripe_subscription_id || sub.stripeSubscriptionId)
    };

    return view;
}

module.exports = {
    normalizeStripeStatus,
    formatBillingDate,
    buildStatusBadge,
    buildRenewalLabel,
    buildBillingAlert,
    buildSubscriptionView
};
