#!/usr/bin/env node
/**
 * Farm team invitations — production probe (read-only + optional authenticated).
 *
 * Env: SMARTFARM_API_BASE, SMARTFARM_WEB_BASE, SMARTFARM_SMOKE_EMAIL, SMARTFARM_SMOKE_PASSWORD,
 *      SMARTFARM_SMOKE_JWT, SMARTFARM_SMOKE_FARM_ID (farm UUID — not farm name)
 *      SMARTFARM_SMOKE_FARM_NAME (optional — match name when FARM_ID is omitted)
 */
const https = require('https');

const API = (process.env.SMARTFARM_API_BASE || 'https://web-production-86d39.up.railway.app').replace(/\/$/, '');
const WEB = (process.env.SMARTFARM_WEB_BASE || 'https://www.smartfarm-app.com').replace(/\/$/, '');
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

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

function isUuid(value) {
    return typeof value === 'string' && UUID_RE.test(value.trim());
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

async function resolveFarmId(token, explicitId, farmNameHint) {
    const auth = { Authorization: `Bearer ${token}` };
    const farmsRes = await request('GET', `${API}/api/farms`, { headers: auth });
    const farms = farmsRes.json?.data || [];
    const summary = farms.map((f) => ({ id: f.id, name: f.name }));

    if (isUuid(explicitId)) {
        const match = farms.find((f) => f.id === explicitId);
        return {
            farmId: explicitId,
            source: 'SMARTFARM_SMOKE_FARM_ID',
            farmsListed: summary,
            matchedFarm: match ? { id: match.id, name: match.name } : null
        };
    }

    if (explicitId && !isUuid(explicitId)) {
        const byName = farms.find(
            (f) => String(f.name || '').toLowerCase() === explicitId.toLowerCase()
        );
        if (byName) {
            return {
                farmId: byName.id,
                source: 'resolved_name_from_SMOKE_FARM_ID',
                farmsListed: summary,
                matchedFarm: { id: byName.id, name: byName.name },
                note: `"${explicitId}" is a farm name, not a UUID — use SMARTFARM_SMOKE_FARM_ID=${byName.id}`
            };
        }
        return {
            farmId: null,
            source: 'invalid_SMOKE_FARM_ID',
            farmsListed: summary,
            error: `"${explicitId}" is not a UUID and did not match any farm name`
        };
    }

    if (farmNameHint) {
        const byName = farms.find(
            (f) => String(f.name || '').toLowerCase() === farmNameHint.toLowerCase()
        );
        if (byName) {
            return {
                farmId: byName.id,
                source: 'SMARTFARM_SMOKE_FARM_NAME',
                farmsListed: summary,
                matchedFarm: { id: byName.id, name: byName.name }
            };
        }
    }

    if (farms[0]) {
        return {
            farmId: farms[0].id,
            source: 'first_farm_from_GET_/api/farms',
            farmsListed: summary,
            matchedFarm: { id: farms[0].id, name: farms[0].name }
        };
    }

    return {
        farmId: null,
        source: 'none',
        farmsListed: summary,
        error: 'No farms returned from GET /api/farms'
    };
}

function summarizeTeamCall(label, res) {
    return {
        status: res.status,
        success: res.json?.success,
        code: res.json?.code,
        error: res.json?.error,
        count: Array.isArray(res.json?.data) ? res.json.data.length : undefined,
        pass: res.status === 200 && res.json?.success !== false
    };
}

async function main() {
    const report = {
        ts: new Date().toISOString(),
        api: API,
        web: WEB,
        public: {},
        authenticated: {},
        followUps: [],
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

    if (token && token.split('.').length === 3) {
        const explicitFarmId = (process.env.SMARTFARM_SMOKE_FARM_ID || '').trim();
        const farmNameHint = (process.env.SMARTFARM_SMOKE_FARM_NAME || '').trim();
        const resolved = await resolveFarmId(token, explicitFarmId, farmNameHint);
        report.authenticated.farmResolution = resolved;

        if (!isUuid(explicitFarmId) && explicitFarmId) {
            report.followUps.push(
                `SMARTFARM_SMOKE_FARM_ID="${explicitFarmId}" is not a UUID. ` +
                'Team routes validate params.farmId as UUID (schemas.js farmTeam.listInvitations). ' +
                'A non-UUID value returns 400 before auth/membership checks.'
            );
        }

        if (resolved.farmId) {
            const auth = { Authorization: `Bearer ${token}` };
            const listInv = await request('GET', `${API}/api/farms/${resolved.farmId}/invitations`, {
                headers: auth
            });
            const listMem = await request('GET', `${API}/api/farms/${resolved.farmId}/members`, {
                headers: auth
            });
            report.authenticated.listInvitations = summarizeTeamCall('invitations', listInv);
            report.authenticated.listMembers = summarizeTeamCall('members', listMem);

            if (!report.authenticated.listInvitations.pass || !report.authenticated.listMembers.pass) {
                report.followUps.push(
                    'Team list calls did not return 200 — check farmResolution.matchedFarm and owner role.'
                );
            } else {
                report.nextSteps.push(
                    'Run manual invite/resend/accept scenarios from farm-team-invitations.md.'
                );
            }
        } else {
            report.followUps.push(resolved.error || 'Could not resolve farm UUID for team probe.');
            report.nextSteps.push('Set SMARTFARM_SMOKE_FARM_ID to a UUID from GET /api/farms.');
        }
    }

    const teamOk =
        report.authenticated.listInvitations?.pass && report.authenticated.listMembers?.pass;
    report.pass =
        report.blockers.length === 0 &&
        report.public.unauthenticated.webProxy?.pass &&
        (teamOk || !report.authenticated.login?.ok);

    console.log(JSON.stringify(report, null, 2));
    process.exit(report.blockers.length || (report.authenticated.login?.ok && !teamOk) ? 1 : 0);
}

main().catch((e) => {
    console.error(e);
    process.exit(2);
});
