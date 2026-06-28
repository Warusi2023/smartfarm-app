#!/usr/bin/env node
/**
 * Farm team invitations — production probe (read-only + optional authenticated).
 *
 * Env: SMARTFARM_API_BASE, SMARTFARM_WEB_BASE, SMARTFARM_SMOKE_EMAIL, SMARTFARM_SMOKE_PASSWORD,
 *      SMARTFARM_SMOKE_JWT, SMARTFARM_SMOKE_FARM_ID (owner farm UUID)
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

    const fakeFarmId = '00000000-0000-0000-0000-000000000001';
    const unauthPaths = [
        [`GET`, `${WEB}/api/farms/${fakeFarmId}/invitations`],
        [`GET`, `${API}/api/farms/${fakeFarmId}/invitations`]
    ];

    report.public.unauthenticated = {};
    for (const [method, url] of unauthPaths) {
        const r = await request(method, url);
        const isJson = (r.contentType || '').includes('json');
        const label = url.includes(WEB) ? 'webProxy' : 'railway';
        report.public.unauthenticated[label] = {
            status: r.status,
            isJson,
            code: r.json?.code,
            pass: r.status === 401 && isJson
        };
        if (!isJson) {
            report.blockers.push(`${label} invitations route returned non-JSON (${r.contentType})`);
        }
    }

    const dash = await request('GET', `${WEB}/dashboard.html`);
    report.public.dashboard = {
        status: dash.status,
        hasTeamJs: dash.body.includes('farm-team-management.js'),
        hasCommandCenterJs: dash.body.includes('farm-command-center.js')
    };

    let token = (process.env.SMARTFARM_SMOKE_JWT || '').trim();
    const loginData = await login();
    if (loginData && !loginData.error) {
        token = loginData.token;
        report.authenticated.login = { ok: true, email: loginData.email };
    } else if (loginData?.error) {
        report.authenticated.login = { ok: false, status: loginData.error.status, code: loginData.error.json?.code };
    } else {
        report.authenticated.login = { skipped: true };
        report.nextSteps.push('Set SMARTFARM_SMOKE_EMAIL/PASSWORD for owner account checks.');
    }

    const farmId = (process.env.SMARTFARM_SMOKE_FARM_ID || '').trim();
    if (token && token.split('.').length === 3 && farmId) {
        const auth = { Authorization: `Bearer ${token}` };
        const listInv = await request('GET', `${API}/api/farms/${farmId}/invitations`, { headers: auth });
        const listMem = await request('GET', `${API}/api/farms/${farmId}/members`, { headers: auth });
        report.authenticated.listInvitations = { status: listInv.status, count: listInv.json?.data?.length };
        report.authenticated.listMembers = { status: listMem.status, count: listMem.json?.data?.length };
    } else if (token) {
        report.authenticated.skipped = 'Set SMARTFARM_SMOKE_FARM_ID for list invitations/members';
        report.nextSteps.push('Set SMARTFARM_SMOKE_FARM_ID to owner farm UUID.');
    }

    report.pass = report.blockers.length === 0 && report.public.unauthenticated.webProxy?.pass;
    console.log(JSON.stringify(report, null, 2));
    process.exit(report.blockers.length ? 1 : 0);
}

main().catch((e) => {
    console.error(e);
    process.exit(2);
});
