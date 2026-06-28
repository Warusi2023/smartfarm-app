#!/usr/bin/env node
/**
 * Stripe billing production probe — read-only checks + optional authenticated flow.
 *
 * Env (optional for authenticated steps):
 *   SMARTFARM_API_BASE     default https://web-production-86d39.up.railway.app
 *   SMARTFARM_WEB_BASE     default https://www.smartfarm-app.com
 *   SMARTFARM_SMOKE_EMAIL  verified trial user email
 *   SMARTFARM_SMOKE_PASSWORD
 *   SMARTFARM_SMOKE_JWT    skip login if set
 *
 * Full Checkout (4242 card) cannot be automated here — complete in browser, then re-run
 * with JWT to capture after-state via GET /api/subscriptions/current.
 */
const https = require('https');

const API = (process.env.SMARTFARM_API_BASE || 'https://web-production-86d39.up.railway.app').replace(/\/$/, '');
const WEB = (process.env.SMARTFARM_WEB_BASE || 'https://www.smartfarm-app.com').replace(/\/$/, '');

function request(method, url, { headers = {}, body = null } = {}) {
    return new Promise((resolve, reject) => {
        const u = new URL(url);
        const opts = {
            hostname: u.hostname,
            path: u.pathname + u.search,
            method,
            headers: { ...headers }
        };
        const req = https.request(opts, (res) => {
            let data = '';
            res.on('data', (c) => (data += c));
            res.on('end', () => {
                let json = null;
                try {
                    json = JSON.parse(data);
                } catch (_) {
                    /* text */
                }
                resolve({
                    status: res.statusCode,
                    contentType: res.headers['content-type'],
                    body: data,
                    json
                });
            });
        });
        req.on('error', reject);
        if (body) {
            req.setHeader('Content-Type', 'application/json');
            req.write(JSON.stringify(body));
        }
        req.end();
    });
}

function pkMode(key) {
    if (!key || typeof key !== 'string') {
        return 'missing';
    }
    if (key.startsWith('pk_test_')) {
        return 'test';
    }
    if (key.startsWith('pk_live_')) {
        return 'live';
    }
    return 'unknown';
}

async function login() {
    const email = (process.env.SMARTFARM_SMOKE_EMAIL || '').trim();
    const password = (process.env.SMARTFARM_SMOKE_PASSWORD || '').trim();
    if (!email || !password) {
        return null;
    }
    const res = await request('POST', `${API}/api/auth/login`, {
        body: { email, password }
    });
    if (res.status !== 200 || !res.json?.success) {
        return { error: res, email };
    }
    return { token: res.json.data.token, email, user: res.json.data.user };
}

async function main() {
    const report = {
        ts: new Date().toISOString(),
        api: API,
        web: WEB,
        public: {},
        authenticated: {},
        blockers: [],
        nextSteps: []
    };

    const plansRailway = await request('GET', `${API}/api/subscriptions/plans`);
    const configRailway = await request('GET', `${API}/api/subscriptions/billing-config`);
    const configWeb = await request('GET', `${WEB}/api/subscriptions/billing-config`);
    const pages = ['pricing.html', 'subscription-management.html', 'checkout.html'];

    report.public.plans = {
        status: plansRailway.status,
        ok: plansRailway.status === 200 && plansRailway.json?.success
    };
    report.public.billingConfig = {
        railway: {
            status: configRailway.status,
            billingEnabled: configRailway.json?.data?.billingEnabled,
            publishableKeyMode: pkMode(configRailway.json?.data?.publishableKey),
            farmProPriceMonthly: configRailway.json?.data?.farmProPriceMonthly
        },
        webProxy: {
            status: configWeb.status,
            billingEnabled: configWeb.json?.data?.billingEnabled,
            publishableKeyMode: pkMode(configWeb.json?.data?.publishableKey)
        }
    };

    report.public.pages = {};
    for (const page of pages) {
        const r = await request('GET', `${WEB}/${page}`);
        report.public.pages[page] = { status: r.status, html: (r.contentType || '').includes('text/html') };
    }

    if (!configRailway.json?.data?.billingEnabled) {
        report.blockers.push(
            'Railway STRIPE_* env not configured: billingEnabled=false, publishableKey empty. ' +
            'Set STRIPE_SECRET_KEY, STRIPE_PUBLISHABLE_KEY, STRIPE_WEBHOOK_SECRET, STRIPE_PRICE_ID_FARM_PRO on Backend service.'
        );
        report.nextSteps.push(
            'Configure Stripe env vars on Railway Backend, redeploy, confirm billing-config shows billingEnabled=true.'
        );
        report.nextSteps.push(
            'Register webhook https://web-production-86d39.up.railway.app/api/webhooks/stripe in Stripe Dashboard.'
        );
    }

    let token = (process.env.SMARTFARM_SMOKE_JWT || '').trim();
    const loginData = await login();
    if (loginData && !loginData.error) {
        token = loginData.token;
        report.authenticated.login = { ok: true, email: loginData.email };
    } else if (loginData?.error) {
        report.authenticated.login = {
            ok: false,
            status: loginData.error.status,
            email: loginData.email,
            code: loginData.error.json?.code
        };
    } else {
        report.authenticated.login = { skipped: true, reason: 'No SMARTFARM_SMOKE_EMAIL/PASSWORD or JWT' };
    }

    if (token && token.split('.').length === 3) {
        const auth = { Authorization: `Bearer ${token}` };
        const before = await request('GET', `${API}/api/subscriptions/current`, { headers: auth });
        report.authenticated.subscriptionsCurrentBefore = {
            status: before.status,
            data: before.json?.data || null
        };

        const checkout = await request('POST', `${API}/api/subscriptions/create-checkout-session`, {
            headers: auth,
            body: {}
        });
        report.authenticated.createCheckoutSession = {
            status: checkout.status,
            code: checkout.json?.code,
            sessionId: checkout.json?.data?.sessionId || null,
            hasUrl: !!(checkout.json?.data?.url)
        };

        if (checkout.status === 503 && checkout.json?.code === 'BILLING_NOT_CONFIGURED') {
            report.blockers.push('create-checkout-session returns 503 BILLING_NOT_CONFIGURED');
        }
        if (checkout.status === 200 && checkout.json?.data?.url) {
            report.nextSteps.push(
                'Open checkout URL in browser, pay with 4242 4242 4242 4242, confirm webhook delivery in Stripe Dashboard.'
            );
            report.nextSteps.push(
                'Re-run probe with same JWT to capture subscriptionsCurrentAfter and compare.'
            );
        }

        report.authenticated.hint = {
            afterCheckoutConsole:
                'fetch("/api/subscriptions/current",{headers:{Authorization:`Bearer ${token}`}}).then(r=>r.json()).then(console.log)'
        };
    } else {
        report.authenticated.skipped = 'No valid JWT for subscription/checkout checks';
        report.nextSteps.push(
            'Set SMARTFARM_SMOKE_EMAIL + SMARTFARM_SMOKE_PASSWORD (verified trial user) or SMARTFARM_SMOKE_JWT.'
        );
    }

    report.pass = report.blockers.length === 0 && report.public.plans.ok;
    console.log(JSON.stringify(report, null, 2));
    process.exit(report.blockers.length ? 1 : 0);
}

main().catch((err) => {
    console.error(err);
    process.exit(2);
});
