#!/usr/bin/env node
/**
 * Command center — production probe.
 *
 * Env: SMARTFARM_API_BASE, SMARTFARM_WEB_BASE, SMARTFARM_SMOKE_EMAIL, SMARTFARM_SMOKE_PASSWORD,
 *      SMARTFARM_SMOKE_JWT
 */
const https = require('https');

const API = (process.env.SMARTFARM_API_BASE || 'https://web-production-86d39.up.railway.app').replace(/\/$/, '');
const WEB = (process.env.SMARTFARM_WEB_BASE || 'https://www.smartfarm-app.com').replace(/\/$/, '');

function request(method, url, { headers = {}, body = null } = {}) {
    return new Promise((resolve, reject) => {
        const u = new URL(url);
        const req = https.request(
            {
                hostname: u.hostname,
                path: u.pathname + u.search,
                method,
                headers: { ...headers }
            },
            (res) => {
                let data = '';
                res.on('data', (c) => (data += c));
                res.on('end', () => {
                    let json = null;
                    try {
                        json = JSON.parse(data);
                    } catch (_) {}
                    resolve({
                        status: res.statusCode,
                        contentType: res.headers['content-type'],
                        json,
                        body: data
                    });
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
    if (!email || !password) {
        return null;
    }
    const res = await request('POST', `${API}/api/auth/login`, { body: { email, password } });
    if (res.status !== 200 || !res.json?.success) {
        return { error: res, email };
    }
    return { token: res.json.data.token, email };
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

    for (const base of [{ label: 'webProxy', origin: WEB }, { label: 'railway', origin: API }]) {
        const r = await request('GET', `${base.origin}/api/farm-summary/command-center?window=today`);
        const isJson = (r.contentType || '').includes('json');
        report.public[base.label] = {
            status: r.status,
            isJson,
            code: r.json?.code,
            pass: r.status === 401 && isJson
        };
        if (!isJson) {
            report.blockers.push(`${base.label} command-center returned non-JSON`);
        }
    }

    const assets = ['js/farm-command-center.js', 'js/farm-action-center.js', 'js/offline-write-queue.js'];
    report.public.assets = {};
    for (const asset of assets) {
        const r = await request('GET', `${WEB}/${asset}`);
        report.public.assets[asset] = { status: r.status, ok: r.status === 200 };
    }

    let token = (process.env.SMARTFARM_SMOKE_JWT || '').trim();
    const loginData = await login();
    if (loginData && !loginData.error) {
        token = loginData.token;
        report.authenticated.login = { ok: true, email: loginData.email };
    } else if (loginData?.error) {
        report.authenticated.login = { ok: false, status: loginData.error.status };
    } else {
        report.authenticated.login = { skipped: true };
        report.nextSteps.push('Set SMARTFARM_SMOKE_EMAIL/PASSWORD for authenticated command-center payload.');
    }

    if (token && token.split('.').length === 3) {
        const auth = { Authorization: `Bearer ${token}` };
        for (const window of ['today', 'week']) {
            const r = await request('GET', `${API}/api/farm-summary/command-center?window=${window}`, {
                headers: auth
            });
            const d = r.json?.data;
            report.authenticated[`commandCenter_${window}`] = {
                status: r.status,
                success: r.json?.success,
                hasPeriodStats: !!d?.periodStats,
                hasRecentActivity: Array.isArray(d?.recentActivity),
                hasFinancials: !!d?.financials,
                hasAttention: d?.attention != null
            };
        }
    }

    report.pass = report.blockers.length === 0 && report.public.webProxy?.pass;
    console.log(JSON.stringify(report, null, 2));
    process.exit(report.blockers.length ? 1 : 0);
}

main().catch((e) => {
    console.error(e);
    process.exit(2);
});
