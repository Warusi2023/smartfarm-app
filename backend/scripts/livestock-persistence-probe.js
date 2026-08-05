#!/usr/bin/env node
/**
 * Livestock persistence / sync probe.
 *
 * Proves the web+phone contract against a deployed API:
 *   1. create an animal with the full web payload
 *   2. re-read the list (what a hard refresh does) and confirm it is still there
 *   3. create an Android-shaped animal (type/name/age only) and confirm the
 *      web-facing aliases (species, tag, sex, birthDate, healthStatus) are present
 *   4. clean up both records
 *
 * Usage:
 *   SMARTFARM_SMOKE_EMAIL=... SMARTFARM_SMOKE_PASSWORD=... node scripts/livestock-persistence-probe.js
 *   SMARTFARM_SMOKE_JWT=... node scripts/livestock-persistence-probe.js
 */

const https = require('https');
const http = require('http');

const API = (process.env.SMARTFARM_API_URL || 'https://web-production-86d39.up.railway.app').replace(
    /\/$/,
    ''
);

function request(method, url, { headers = {}, body = null } = {}) {
    return new Promise((resolve, reject) => {
        const u = new URL(url);
        const transport = u.protocol === 'http:' ? http : https;
        const req = transport.request(
            {
                hostname: u.hostname,
                port: u.port || undefined,
                path: u.pathname + u.search,
                method,
                headers: { Accept: 'application/json', ...headers }
            },
            (res) => {
                let data = '';
                res.on('data', (c) => (data += c));
                res.on('end', () => {
                    let json = null;
                    try {
                        json = JSON.parse(data);
                    } catch (_) {
                        /* non-JSON */
                    }
                    resolve({ status: res.statusCode, body: data, json });
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

async function resolveToken() {
    const jwt = (process.env.SMARTFARM_SMOKE_JWT || '').trim();
    if (jwt.split('.').length === 3) return jwt;

    const email = (process.env.SMARTFARM_SMOKE_EMAIL || '').trim();
    const password = (process.env.SMARTFARM_SMOKE_PASSWORD || '').trim();
    if (!email || !password) {
        throw new Error(
            'Set SMARTFARM_SMOKE_JWT, or SMARTFARM_SMOKE_EMAIL + SMARTFARM_SMOKE_PASSWORD'
        );
    }
    const res = await request('POST', `${API}/api/auth/login`, { body: { email, password } });
    if (res.status !== 200 || !res.json?.success) {
        throw new Error(`Login failed (${res.status}): ${res.body.slice(0, 300)}`);
    }
    return res.json.data.token;
}

async function main() {
    const results = [];
    const record = (name, ok, detail) => {
        results.push({ name, ok, detail });
        console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${detail ? ` — ${detail}` : ''}`);
    };

    const token = await resolveToken();
    const auth = { Authorization: `Bearer ${token}` };
    const stamp = Date.now();
    const createdIds = [];

    const webPayload = {
        name: `Probe Brahman WEB-${stamp}`,
        type: 'cattle',
        breed: 'Brahman',
        tag: `WEB-${stamp}`,
        sex: 'female',
        birthDate: '2024-03-02',
        weight: 320,
        location: 'Probe paddock',
        value: 1500,
        purpose: 'dairy',
        lifecycle: 'heifer',
        description: 'livestock-persistence-probe'
    };

    const webCreate = await request('POST', `${API}/api/livestock`, { headers: auth, body: webPayload });
    const webAnimal = webCreate.json?.data;
    record(
        'web create returns 201 with an id',
        webCreate.status === 201 && Boolean(webAnimal?.id),
        `status=${webCreate.status}`
    );
    if (webAnimal?.id) createdIds.push(webAnimal.id);

    record(
        'web create keeps tag / sex / birthDate / value',
        webAnimal?.tag === webPayload.tag &&
            webAnimal?.sex === 'female' &&
            webAnimal?.birthDate === '2024-03-02' &&
            Number(webAnimal?.value) === 1500,
        JSON.stringify({
            tag: webAnimal?.tag,
            sex: webAnimal?.sex,
            birthDate: webAnimal?.birthDate,
            value: webAnimal?.value
        })
    );

    const androidPayload = {
        type: 'goat',
        name: `Probe Goat PHONE-${stamp}`,
        breed: 'Boer',
        age: 2,
        weight: 40,
        healthStatus: 'healthy',
        location: 'Probe pen',
        notes: 'livestock-persistence-probe'
    };
    const phoneCreate = await request('POST', `${API}/api/livestock`, {
        headers: auth,
        body: androidPayload
    });
    const phoneAnimal = phoneCreate.json?.data;
    record(
        'phone-shaped create returns 201',
        phoneCreate.status === 201 && Boolean(phoneAnimal?.id),
        `status=${phoneCreate.status}`
    );
    if (phoneAnimal?.id) createdIds.push(phoneAnimal.id);

    record(
        'phone create exposes web aliases (species/healthStatus/birthDate from age)',
        phoneAnimal?.species === 'goat' &&
            phoneAnimal?.healthStatus === 'healthy' &&
            Boolean(phoneAnimal?.birthDate),
        JSON.stringify({
            species: phoneAnimal?.species,
            healthStatus: phoneAnimal?.healthStatus,
            birthDate: phoneAnimal?.birthDate
        })
    );

    // A hard refresh on web is just this GET.
    const list = await request('GET', `${API}/api/livestock`, { headers: auth });
    const items = Array.isArray(list.json?.data) ? list.json.data : [];
    const ids = items.map((i) => String(i.id));
    record('list read returns 200', list.status === 200, `count=${items.length}`);
    record(
        'web-created animal survives a refresh',
        Boolean(webAnimal?.id) && ids.includes(String(webAnimal.id))
    );
    record(
        'phone-created animal is visible to web',
        Boolean(phoneAnimal?.id) && ids.includes(String(phoneAnimal.id))
    );

    const anonymous = await request('GET', `${API}/api/livestock`);
    record(
        'list requires authentication',
        anonymous.status === 401 || anonymous.status === 403,
        `status=${anonymous.status}`
    );

    for (const id of createdIds) {
        const del = await request('DELETE', `${API}/api/livestock/${id}`, { headers: auth });
        record(`cleanup ${id}`, del.status === 200, `status=${del.status}`);
    }

    const failed = results.filter((r) => !r.ok);
    console.log(`\n${results.length - failed.length}/${results.length} checks passed`);
    process.exitCode = failed.length === 0 ? 0 : 1;
}

main().catch((error) => {
    console.error('Probe failed:', error.message);
    process.exitCode = 1;
});
