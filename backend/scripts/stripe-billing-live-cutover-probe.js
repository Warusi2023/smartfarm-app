#!/usr/bin/env node
/**
 * Live Stripe cutover probe — run after switching Railway to sk_live_ / pk_live_.
 *
 * Env:
 *   SMARTFARM_API_BASE     default https://web-production-86d39.up.railway.app
 *   SMARTFARM_SMOKE_EMAIL  optional — portal session check
 *   SMARTFARM_SMOKE_PASSWORD
 *   SMARTFARM_SMOKE_JWT
 *
 * Exit 0 = live billing config looks correct. Exit 1 = blockers found.
 */
const https = require('https');

const API = (process.env.SMARTFARM_API_BASE || 'https://web-production-86d39.up.railway.app').replace(/\/$/, '');

function request(method, url, { headers = {}, body = null } = {}) {
    return new Promise((resolve, reject) => {
        const u = new URL(url);
        const req = https.request(
            { hostname: u.hostname, path: u.pathname + u.search, method, headers },
            (res) => {
                let data = '';
                res.on('data', (c) => (data += c));
                res.on('end', () => {
                    let json = null;
                    try { json = JSON.parse(data); } catch (_) { /* text */ }
                    resolve({ status: res.statusCode, json, body: data });
                });
            }
        );
        req.on('error', reject);
        if (body) {
            req.setHeader('Content-Type', 'application/json');
            req.write(JSON.stringify(body));
        }
        req.end();
    });
}

async function login() {
    const email = (process.env.SMARTFARM_SMOKE_EMAIL || '').trim();
    const password = (process.env.SMARTFARM_SMOKE_PASSWORD || '').trim();
    if (!email || !password) return null;
    const res = await request('POST', `${API}/api/auth/login`, { body: { email, password } });
    if (res.status !== 200 || !res.json?.success) return { error: res };
    return { token: res.json.data.token, email };
}

async function main() {
    const blockers = [];
    const warnings = [];
    const report = { ts: new Date().toISOString(), api: API, checks: {} };

    const status = await request('GET', `${API}/api/subscriptions/billing-status?checkStripe=true`);
    const config = await request('GET', `${API}/api/subscriptions/billing-config`);
    const data = status.json?.data;
    const pk = config.json?.data?.publishableKey || '';

    report.checks.billingStatus = { status: status.status, mode: data?.mode?.active, billingEnabled: data?.billingEnabled };
    report.checks.billingConfig = { publishableKeyPrefix: pk.slice(0, 8) };

    if (!data?.billingEnabled) {
        blockers.push('billingEnabled=false — set live STRIPE_* vars on Railway and redeploy');
    }
    if (data?.mode?.active !== 'live') {
        blockers.push(`Expected mode.active=live, got "${data?.mode?.active || 'unknown'}" — confirm sk_live_ and pk_live_ on Railway`);
    }
    if (data?.mode?.mismatch) {
        blockers.push('Stripe secret/publishable key mode mismatch (test vs live mixed)');
    }
    if (!pk.startsWith('pk_live_')) {
        blockers.push('publishableKey does not start with pk_live_');
    }
    if (!data?.webhookReady) {
        blockers.push('STRIPE_WEBHOOK_SECRET missing — subscriptions will not activate after payment');
    }
    if (data?.webhook?.stripeApiChecked && data.webhook.registeredInStripe === false) {
        blockers.push(`No live webhook registered for ${data.webhook.expectedUrl}`);
    }
    if (!data?.webhookReady || !data?.webhook?.registeredInStripe) {
        warnings.push('Register live webhook: checkout.session.completed, customer.subscription.updated/deleted, invoice.payment_failed');
    }

    let token = (process.env.SMARTFARM_SMOKE_JWT || '').trim();
    const loginData = await login();
    if (loginData?.token) token = loginData.token;

    if (token && token.split('.').length === 3) {
        const auth = { Authorization: `Bearer ${token}` };
        const current = await request('GET', `${API}/api/subscriptions/current`, { headers: auth });
        const portal = await request('POST', `${API}/api/billing/portal`, { headers: auth, body: {} });
        const sub = current.json?.data;

        report.checks.subscriptionsCurrent = {
            status: current.status,
            hasStatusBadge: !!sub?.statusBadge,
            hasRenewalLabel: sub?.renewalLabel != null,
            stripeStatus: sub?.stripeStatus
        };
        report.checks.billingPortal = {
            status: portal.status,
            hasUrl: !!(portal.json?.data?.url)
        };

        if (current.status === 200 && sub && !sub.statusBadge) {
            warnings.push('GET /subscriptions/current missing statusBadge — deploy latest backend');
        }
        if (portal.status !== 200 || !portal.json?.data?.url) {
            warnings.push('POST /billing/portal failed — enable Customer Portal in Stripe live mode');
        }
    } else {
        report.checks.authenticated = { skipped: true, reason: 'Set SMARTFARM_SMOKE_EMAIL/PASSWORD or JWT for portal check' };
        warnings.push('Set smoke credentials to verify POST /api/billing/portal');
    }

    report.blockers = blockers;
    report.warnings = warnings;
    report.pass = blockers.length === 0;

    console.log(JSON.stringify(report, null, 2));
    console.log('');
    if (report.pass) {
        console.log('LIVE BILLING READY — complete manual checklist in docs/BILLING_LIVE_CUTOVER_CHECKLIST.md');
        if (warnings.length) {
            console.log('Warnings:', warnings.join('; '));
        }
    } else {
        console.log('LIVE CUTOVER BLOCKED —', blockers.join('; '));
    }

    process.exit(blockers.length ? 1 : 0);
}

main().catch((err) => {
    console.error(err);
    process.exit(2);
});
