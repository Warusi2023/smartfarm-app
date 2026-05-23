#!/usr/bin/env node
/**
 * W3-05 deployed reliability smoke (API layer).
 *
 * Usage:
 *   npm run test:w3:deployed
 *
 * Auth (pick one):
 *   SMARTFARM_SMOKE_JWT=<full smartfarm_token from browser localStorage>
 *   SMARTFARM_SMOKE_EMAIL=... SMARTFARM_SMOKE_PASSWORD=...   (POST /api/auth/login)
 *
 * Without auth: health + auth gates + file-backed crop/soil idempotency (default-user).
 * With auth: also feed-mix, revenue, financials, and DB soil idempotency for UUID users.
 */

const crypto = require('crypto');

const BASE = (process.env.SMARTFARM_API_BASE || 'https://web-production-86d39.up.railway.app').replace(
    /\/$/,
    ''
);
function parseJwt(raw) {
    if (
        raw &&
        raw.length > 80 &&
        !raw.includes('....') &&
        !raw.includes('<paste') &&
        raw.split('.').length === 3
    ) {
        return raw;
    }
    return '';
}

async function resolveJwt() {
    const fromEnv = parseJwt(process.env.SMARTFARM_SMOKE_JWT || '');
    if (fromEnv) {
        return { token: fromEnv, source: 'SMARTFARM_SMOKE_JWT' };
    }
    if (process.env.SMARTFARM_SMOKE_JWT) {
        console.warn(
            'SMARTFARM_SMOKE_JWT is set but invalid — paste the full smartfarm_token (three dot-separated segments).\n'
        );
    }

    const email = (process.env.SMARTFARM_SMOKE_EMAIL || '').trim();
    const password = process.env.SMARTFARM_SMOKE_PASSWORD || '';
    const placeholderEmail = /^your@/i.test(email) || email === 'you@example.com';
    if (!email || !password || placeholderEmail) {
        if (email && placeholderEmail) {
            console.warn('SMARTFARM_SMOKE_EMAIL looks like a placeholder — use your real login email.\n');
        }
        return { token: '', source: null };
    }

    const { status, json } = await request('POST', '/api/auth/login', {
        body: { email, password }
    });
    const token =
        json && json.success && json.data && json.data.token ? json.data.token : '';
    if (!token) {
        console.warn(`Login failed (HTTP ${status}): ${json?.error || json?.code || 'no token'}\n`);
        return { token: '', source: null };
    }
    return { token, source: 'login' };
}

function uid(prefix) {
    const t = Date.now().toString(36);
    const r = crypto.randomBytes(4).toString('hex');
    return `${prefix}-${t}-${r}`.slice(0, 64);
}

async function request(method, path, { body, token } = {}) {
    const headers = { Accept: 'application/json' };
    if (body !== undefined) {
        headers['Content-Type'] = 'application/json';
    }
    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }
    const res = await fetch(`${BASE}${path}`, {
        method,
        headers,
        body: body !== undefined ? JSON.stringify(body) : undefined
    });
    let json = null;
    const ct = res.headers.get('content-type') || '';
    if (ct.includes('json')) {
        try {
            json = await res.json();
        } catch {
            json = null;
        }
    } else {
        await res.text();
    }
    return { status: res.status, json };
}

function record(results, name, ok, detail) {
    results.push({ name, ok, detail });
    if (ok === null) {
        console.log(`[SKIP] ${name}${detail ? ` — ${detail}` : ''}`);
        return;
    }
    const mark = ok ? 'PASS' : 'FAIL';
    console.log(`[${mark}] ${name}${detail ? ` — ${detail}` : ''}`);
}

async function testHealth(results) {
    const { status, json } = await request('GET', '/api/health');
    const ok = status === 200 && json && json.ok === true;
    record(
        results,
        'Health GET /api/health',
        ok,
        ok ? `db=${json.database?.connected}` : `status=${status}`
    );
}

async function testAuthGates(results) {
    for (const [name, path, body] of [
        ['Feed-mix requires JWT', '/api/farm-costs/feed-mix', { amount: 1, clientRequestId: uid('w3feed') }],
        ['Revenue requires JWT', '/api/farm-summary/revenue', { amount: 1, date: '2026-05-23', clientRequestId: uid('w3rev') }]
    ]) {
        const { status, json } = await request('POST', path, { body });
        const ok = status === 401 && json && json.code === 'MISSING_TOKEN';
        record(results, name, ok, `status=${status}`);
    }
}

async function testIdempotentFlow(results, label, path, buildBodies, token) {
    const clientRequestId = uid('w3smoke');
    const firstBody = buildBodies(clientRequestId).first;
    const replayBody = buildBodies(clientRequestId).replay;
    const conflictBody = buildBodies(clientRequestId).conflict;

    const r1 = await request('POST', path, { body: firstBody, token });
    const firstOk =
        (r1.status === 201 || r1.status === 200) &&
        r1.json &&
        r1.json.success !== false &&
        r1.json.idempotentReplay === false;

    const r2 = await request('POST', path, { body: replayBody, token });
    const replayOk =
        r2.status === 200 &&
        r2.json &&
        r2.json.idempotentReplay === true;

    const r3 = await request('POST', path, { body: conflictBody, token });
    const conflictOk = r3.status === 409;

    const ok = firstOk && replayOk && conflictOk;
    const detail = `first=${r1.status} replay=${r2.status} conflict=${r3.status} id=${clientRequestId}`;
    record(results, label, ok, detail);
    return { clientRequestId, firstOk, replayOk, conflictOk };
}

async function main() {
    const results = [];
    const { token: JWT, source: jwtSource } = await resolveJwt();
    console.log(`W3 deployed smoke — ${BASE}`);
    console.log(
        JWT
            ? `JWT: (${jwtSource})`
            : 'JWT: (not set — skipping Postgres financial flows; set SMARTFARM_SMOKE_JWT or EMAIL/PASSWORD)\n'
    );
    if (JWT) console.log('');

    await testHealth(results);
    await testAuthGates(results);

    await testIdempotentFlow(
        results,
        'Crop action idempotency (file store)',
        '/api/crop-recommendations/actions',
        (id) => ({
            first: {
                cropId: '1',
                actionType: 'general',
                status: 'completed',
                clientRequestId: id,
                notes: 'w3-smoke-first'
            },
            replay: {
                cropId: '1',
                actionType: 'general',
                status: 'completed',
                clientRequestId: id,
                notes: 'w3-smoke-first'
            },
            conflict: {
                cropId: '1',
                actionType: 'general',
                status: 'completed',
                clientRequestId: id,
                notes: 'w3-smoke-conflict-payload'
            }
        })
    );

    await testIdempotentFlow(
        results,
        'Soil test idempotency (file or DB)',
        '/api/crop-recommendations/soil-tests',
        (id) => ({
            first: {
                cropId: '1',
                testDate: '2026-05-23',
                ph: 6.5,
                nitrogen: 10,
                phosphorus: 20,
                potassium: 30,
                clientRequestId: id,
                notes: 'w3-smoke-soil'
            },
            replay: {
                cropId: '1',
                testDate: '2026-05-23',
                ph: 6.5,
                nitrogen: 10,
                phosphorus: 20,
                potassium: 30,
                clientRequestId: id,
                notes: 'w3-smoke-soil'
            },
            conflict: {
                cropId: '1',
                testDate: '2026-05-23',
                ph: 7.0,
                nitrogen: 10,
                phosphorus: 20,
                potassium: 30,
                clientRequestId: id,
                notes: 'w3-smoke-soil'
            }
        }),
        JWT || undefined
    );

    if (JWT) {
        const amount = 0.01 + Math.floor(Math.random() * 100) / 10000;
        await testIdempotentFlow(
            results,
            'Feed-mix cost idempotency (Postgres)',
            '/api/farm-costs/feed-mix',
            (id) => ({
                first: { amount, dailyCost: amount, clientRequestId: id, livestockType: 'w3-smoke' },
                replay: { amount, dailyCost: amount, clientRequestId: id, livestockType: 'w3-smoke' },
                conflict: { amount: amount + 1, dailyCost: amount + 1, clientRequestId: id, livestockType: 'w3-smoke' }
            }),
            JWT
        );

        await testIdempotentFlow(
            results,
            'Manual revenue idempotency (Postgres)',
            '/api/farm-summary/revenue',
            (id) => ({
                first: {
                    amount,
                    date: '2026-05-23',
                    description: 'W3 smoke',
                    clientRequestId: id
                },
                replay: {
                    amount,
                    date: '2026-05-23',
                    description: 'W3 smoke',
                    clientRequestId: id
                },
                conflict: {
                    amount: amount + 1,
                    date: '2026-05-23',
                    description: 'W3 smoke',
                    clientRequestId: id
                }
            }),
            JWT
        );

        const fin = await request('GET', '/api/farm-summary/financials?period=month', { token: JWT });
        const finOk = fin.status === 200 && fin.json && fin.json.success !== false;
        record(
            results,
            'Financials summary with JWT',
            finOk,
            finOk ? `revenue=${fin.json.data?.revenue} costs=${fin.json.data?.costs}` : `status=${fin.status}`
        );
    } else {
        record(
            results,
            'Feed-mix idempotency (Postgres)',
            null,
            'skipped — set SMARTFARM_SMOKE_JWT or EMAIL/PASSWORD'
        );
        record(
            results,
            'Manual revenue idempotency (Postgres)',
            null,
            'skipped — set SMARTFARM_SMOKE_JWT or EMAIL/PASSWORD'
        );
        record(
            results,
            'Financials summary with JWT',
            null,
            'skipped — set SMARTFARM_SMOKE_JWT or EMAIL/PASSWORD'
        );
    }

    const failed = results.filter((r) => r.ok === false);
    const skipped = results.filter((r) => r.ok === null);
    const passed = results.filter((r) => r.ok === true);

    console.log(`\nSummary: ${passed.length} passed, ${failed.length} failed, ${skipped.length} skipped`);
    if (failed.length) {
        process.exitCode = 1;
    }
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
