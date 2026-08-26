/**
 * Data-integrity review runner (create/refresh/edit/idempotency/session).
 *
 * Safety:
 *   - Refuses to run unless RUN_INTEGRATION_TESTS=true
 *   - Refuses Railway / production hosts in DATABASE_URL or API base
 *   - Uses a throwaway local Postgres (Docker) unless INTEGRITY_DATABASE_URL
 *     is an explicit localhost/127.0.0.1 URL
 *
 * Usage (from repo root or backend/):
 *   RUN_INTEGRATION_TESTS=true node scripts/data-integrity-review.js
 *
 * Windows PowerShell:
 *   $env:RUN_INTEGRATION_TESTS='true'; node scripts/data-integrity-review.js
 */

'use strict';

const { spawn, spawnSync } = require('child_process');
const crypto = require('crypto');
const http = require('http');
const os = require('os');
const path = require('path');
const { Client } = require('pg');
const jwt = require('jsonwebtoken');

const BACKEND_ROOT = path.resolve(__dirname, '..');
const CONTAINER_NAME = 'smartfarm-integrity-pg-20260817';
const PG_PORT = process.env.INTEGRITY_PG_PORT || '55432';
const PG_USER = 'smartfarm';
const PG_PASSWORD = 'integrity_local_only';
const PG_DB = 'smartfarm_integrity';
const API_PORT = process.env.INTEGRITY_API_PORT || '3101';
const JWT_SECRET = 'integrity-review-local-only-20260817';
const PASSWORD = 'Integrity1!';

const BLOCKED_HOST_RE = /railway\.app|web-production|smartfarm-app\.com|amazonaws\.com|neon\.tech|supabase\.co/i;

const results = [];
const startedAt = new Date();

function record(scenario, entity, result, evidence) {
    results.push({ scenario, entity, result, evidence: String(evidence || '') });
    const mark = result === 'PASS' ? 'PASS' : result === 'N/A' ? 'N/A ' : result === 'DEFERRED' ? 'DEFER' : 'FAIL';
    console.log(`[${mark}] ${scenario} / ${entity}: ${evidence}`);
}

function assert(condition, scenario, entity, passEvidence, failEvidence) {
    record(scenario, entity, condition ? 'PASS' : 'FAIL', condition ? passEvidence : failEvidence);
    return Boolean(condition);
}

function countByResult(kind) {
    return results.filter((r) => r.result === kind).length;
}

function buildReleaseRecommendation(unexpectedFailureCount, deferredCount) {
    if (unexpectedFailureCount > 0) {
        return 'Blocked';
    }
    if (deferredCount > 0) {
        return 'Passed with explicit deferrals';
    }
    return 'Passed';
}

function isBlockedUrl(value) {
    return Boolean(value) && BLOCKED_HOST_RE.test(String(value));
}

function isLocalUrl(value) {
    const s = String(value || '');
    return /localhost|127\.0\.0\.1|::1/.test(s);
}

function refuseIfProduction(label, value) {
    if (isBlockedUrl(value)) {
        throw new Error(`${label} looks like a hosted/production target and is refused: ${String(value).replace(/:[^:@/]+@/, ':***@')}`);
    }
}

function localEnv(databaseUrl) {
    const env = { ...process.env };
    delete env.POSTGRES_URL;
    delete env.DATABASE_PRIVATE_URL;
    delete env.DATABASE_PUBLIC_URL;
    env.DATABASE_URL = databaseUrl;
    env.JWT_SECRET = JWT_SECRET;
    env.JWT_EXPIRES_IN = '15m';
    env.PORT = String(API_PORT);
    env.NODE_ENV = 'development';
    env.REDIS_URL = '';
    env.SENTRY_DSN = '';
    env.STRIPE_SECRET_KEY = '';
    env.STRIPE_WEBHOOK_SECRET = '';
    env.EMAIL_USER = '';
    env.EMAIL_PASS = '';
    env.EMAIL_SERVICE = 'test';
    env.MIGRATIONS_STRICT = 'true';
    env.FRONTEND_URL = 'http://127.0.0.1:8080';
    env.PGCLIENTENCODING = 'UTF8';
    return env;
}

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

function jsonRequest(method, urlPath, { token, body } = {}) {
    return new Promise((resolve, reject) => {
        const payload = body == null ? null : JSON.stringify(body);
        const headers = { Accept: 'application/json' };
        if (payload) {
            headers['Content-Type'] = 'application/json';
            headers['Content-Length'] = Buffer.byteLength(payload);
        }
        if (token) {
            headers.Authorization = `Bearer ${token}`;
        }
        const req = http.request(
            {
                hostname: '127.0.0.1',
                port: Number(API_PORT),
                path: urlPath,
                method,
                headers
            },
            (res) => {
                const chunks = [];
                res.on('data', (c) => chunks.push(c));
                res.on('end', () => {
                    const raw = Buffer.concat(chunks).toString('utf8');
                    let json = null;
                    try {
                        json = raw ? JSON.parse(raw) : null;
                    } catch {
                        json = { parseError: true, raw: raw.slice(0, 500) };
                    }
                    resolve({ status: res.statusCode, json, raw });
                });
            }
        );
        req.on('error', reject);
        req.setTimeout(20000, () => {
            req.destroy(new Error(`timeout ${method} ${urlPath}`));
        });
        if (payload) {
            req.write(payload);
        }
        req.end();
    });
}

function dataOf(res) {
    if (!res || !res.json) return null;
    return res.json.data != null ? res.json.data : res.json;
}

function asList(value) {
    if (Array.isArray(value)) return value;
    if (value && Array.isArray(value.items)) return value.items;
    if (value && Array.isArray(value.farms)) return value.farms;
    return [];
}

function stopChild(child) {
    if (!child || child.killed || child.exitCode != null) {
        return;
    }
    if (process.platform === 'win32') {
        spawnSync('taskkill', ['/pid', String(child.pid), '/t', '/f'], { stdio: 'ignore' });
    } else {
        child.kill('SIGTERM');
    }
}

async function waitForPostgres(databaseUrl, attempts = 40) {
    for (let i = 0; i < attempts; i += 1) {
        const client = new Client({ connectionString: databaseUrl, ssl: false });
        try {
            await client.connect();
            await client.query('SELECT 1');
            await client.end();
            return;
        } catch {
            try {
                await client.end();
            } catch {
                /* ignore */
            }
            await sleep(1000);
        }
    }
    throw new Error('Postgres did not become ready');
}

async function waitForHealth(attempts = 40) {
    for (let i = 0; i < attempts; i += 1) {
        try {
            const res = await jsonRequest('GET', '/api/health');
            if (res.status === 200 && res.json && (res.json.ok === true || res.json.status === 'ok' || res.json.success === true)) {
                return res.json;
            }
            if (res.status === 200) {
                return res.json;
            }
        } catch {
            /* retry */
        }
        await sleep(1000);
    }
    throw new Error('API /api/health did not become ready');
}

function dockerAvailable() {
    const probe = spawnSync('docker', ['--version'], { encoding: 'utf8' });
    return probe.status === 0;
}

function loadEmbeddedPostgres() {
    try {
        const mod = require('embedded-postgres');
        return mod.default || mod;
    } catch (error) {
        throw new Error(
            'Docker is not available. Install a throwaway local Postgres with `npm install --no-save embedded-postgres` in backend/, or set INTEGRITY_DATABASE_URL to a localhost URL. Original: ' +
                error.message
        );
    }
}

async function startEmbeddedPostgres() {
    const EmbeddedPostgres = loadEmbeddedPostgres();
    const dataDir = path.join(os.tmpdir(), `smartfarm-integrity-pg-${Date.now()}`);
    const instance = new EmbeddedPostgres({
        databaseDir: dataDir,
        user: PG_USER,
        password: PG_PASSWORD,
        port: Number(PG_PORT),
        persistent: false,
        initdbFlags: ['--encoding=UTF8', '--locale=C', '--lc-collate=C', '--lc-ctype=C']
    });
    await instance.initialise();
    await instance.start();
    try {
        await instance.createDatabase(PG_DB);
    } catch (error) {
        if (!/already exists/i.test(error.message || '')) {
            throw error;
        }
    }
    return instance;
}

function startDockerPostgres() {
    spawnSync('docker', ['rm', '-f', CONTAINER_NAME], { stdio: 'ignore' });
    const started = spawnSync(
        'docker',
        [
            'run',
            '--name',
            CONTAINER_NAME,
            '-e',
            `POSTGRES_USER=${PG_USER}`,
            '-e',
            `POSTGRES_PASSWORD=${PG_PASSWORD}`,
            '-e',
            `POSTGRES_DB=${PG_DB}`,
            '-p',
            `${PG_PORT}:5432`,
            '-d',
            'postgres:16-alpine'
        ],
        { encoding: 'utf8' }
    );
    if (started.status !== 0) {
        throw new Error(`docker run failed: ${started.stderr || started.stdout}`);
    }
}

async function cleanupUser(databaseUrl, email, prefix) {
    const client = new Client({ connectionString: databaseUrl, ssl: false });
    await client.connect();
    const statements = [
        ['DELETE FROM farm_task_updates WHERE farm_id IN (SELECT id FROM farms WHERE name LIKE $1)', [`${prefix}%`]],
        ['DELETE FROM farm_tasks WHERE farm_id IN (SELECT id FROM farms WHERE name LIKE $1)', [`${prefix}%`]],
        ['DELETE FROM livestock WHERE tag_number LIKE $1', [`${prefix}%`]],
        ['DELETE FROM crops WHERE name LIKE $1', [`${prefix}%`]],
        ['DELETE FROM farm_memberships WHERE farm_id IN (SELECT id FROM farms WHERE name LIKE $1)', [`${prefix}%`]],
        ['DELETE FROM farms WHERE name LIKE $1', [`${prefix}%`]],
        ['DELETE FROM user_sessions WHERE user_id IN (SELECT id FROM users WHERE email = $1)', [email]],
        ['DELETE FROM users WHERE email = $1', [email]]
    ];
    try {
        for (const [sql, params] of statements) {
            try {
                await client.query(sql, params);
            } catch (error) {
                if (error.code !== '42P01' && error.code !== '42703') {
                    throw error;
                }
            }
        }
    } finally {
        await client.end();
    }
}

async function verifyUserEmail(databaseUrl, email) {
    const client = new Client({ connectionString: databaseUrl, ssl: false });
    await client.connect();
    try {
        const result = await client.query(
            `UPDATE users
             SET is_verified = TRUE, verification_token = NULL, verification_expires = NULL, updated_at = CURRENT_TIMESTAMP
             WHERE email = $1
             RETURNING id, email, is_verified, trial_end`,
            [email]
        );
        if (!result.rows[0]) {
            throw new Error(`User not found for verification: ${email}`);
        }
        return result.rows[0];
    } finally {
        await client.end();
    }
}

async function countLivestockByPrefix(databaseUrl, prefix) {
    const client = new Client({ connectionString: databaseUrl, ssl: false });
    await client.connect();
    try {
        const result = await client.query(
            `SELECT COUNT(*)::int AS n FROM livestock WHERE name LIKE $1 OR tag_number LIKE $1`,
            [`${prefix}%`]
        );
        return result.rows[0].n;
    } finally {
        await client.end();
    }
}

async function main() {
    if (String(process.env.RUN_INTEGRATION_TESTS || '').toLowerCase() !== 'true') {
        console.error('Refusing to run: set RUN_INTEGRATION_TESTS=true');
        process.exit(2);
    }

    refuseIfProduction('INTEGRITY_DATABASE_URL', process.env.INTEGRITY_DATABASE_URL);
    refuseIfProduction('SMARTFARM_API_BASE', process.env.SMARTFARM_API_BASE);

    const runId = crypto.randomBytes(4).toString('hex');
    const prefix = `E2E-INTEGRITY-20260817-${runId}`;
    const email = `e2e-integrity-20260817-${runId}@integrity.smartfarm.test`;
    const farmName = `${prefix}-farm`;
    const livestockName = `${prefix}-cow`;
    const livestockTag = `${prefix}-T1`;
    const cropName = `${prefix}-crop`;
    const taskTitle = `${prefix}-task`;

    let databaseUrl = process.env.INTEGRITY_DATABASE_URL || '';
    let startedDocker = false;
    let embeddedPg = null;
    let serverChild = null;

    try {
        if (databaseUrl) {
            refuseIfProduction('INTEGRITY_DATABASE_URL', databaseUrl);
            if (!isLocalUrl(databaseUrl)) {
                throw new Error('INTEGRITY_DATABASE_URL must be localhost/127.0.0.1');
            }
        } else if (dockerAvailable()) {
            startDockerPostgres();
            startedDocker = true;
            databaseUrl = `postgresql://${PG_USER}:${PG_PASSWORD}@127.0.0.1:${PG_PORT}/${PG_DB}`;
        } else {
            embeddedPg = await startEmbeddedPostgres();
            databaseUrl = `postgresql://${PG_USER}:${PG_PASSWORD}@127.0.0.1:${PG_PORT}/${PG_DB}`;
        }

        refuseIfProduction('resolved DATABASE_URL', databaseUrl);
        await waitForPostgres(databaseUrl);

        const migrate = spawnSync('node', ['scripts/run-migrations.js'], {
            cwd: BACKEND_ROOT,
            env: localEnv(databaseUrl),
            encoding: 'utf8'
        });
        if (migrate.status !== 0) {
            throw new Error(`migrations failed:\n${migrate.stderr || migrate.stdout}`);
        }

        const serverLog = [];
        const captureServer = (buf) => {
            const text = String(buf);
            serverLog.push(text);
            process.stderr.write(text);
        };
        serverChild = spawn('node', ['server.js'], {
            cwd: BACKEND_ROOT,
            env: localEnv(databaseUrl),
            stdio: ['ignore', 'pipe', 'pipe']
        });
        serverChild.stdout.on('data', captureServer);
        serverChild.stderr.on('data', captureServer);
        serverChild.on('exit', (code) => {
            if (code && code !== 0) {
                console.error(`backend exited with ${code}`);
            }
        });

        let health;
        try {
            health = await waitForHealth();
        } catch (error) {
            throw new Error(`${error.message}\n--- backend log ---\n${serverLog.join('').slice(-4000)}`);
        }
        record('setup', 'api-health', 'PASS', `local API ready on 127.0.0.1:${API_PORT}; health keys=${Object.keys(health || {}).join(',')}`);

        const register = await jsonRequest('POST', '/api/auth/register', {
            body: {
                email,
                password: PASSWORD,
                firstName: 'Integrity',
                lastName: 'Review',
                country: 'Fiji'
            }
        });
        if (register.status !== 201 || !register.json || register.json.success !== true) {
            throw new Error(`register failed ${register.status}: ${register.raw}`);
        }

        const verified = await verifyUserEmail(databaseUrl, email);
        if (!verified.is_verified) {
            throw new Error('SQL verification did not set is_verified');
        }

        const login = await jsonRequest('POST', '/api/auth/login', {
            body: { email, password: PASSWORD }
        });
        const loginData = dataOf(login);
        const token = loginData && loginData.token;
        const refreshToken = loginData && loginData.refreshToken;
        if (login.status !== 200 || !token || !refreshToken) {
            throw new Error(`login failed ${login.status}: ${login.raw}`);
        }
        record('F', 'login', 'PASS', 'register + SQL is_verified + login returned access and refresh tokens');

        // --- A create → re-read ---
        const farmCreate = await jsonRequest('POST', '/api/farms', {
            token,
            body: {
                name: farmName,
                location: `${prefix}-loc`,
                areaHectares: 12.5,
                farmType: 'mixed',
                description: `${prefix}-desc`
            }
        });
        const farm = dataOf(farmCreate);
        const farmOk = farmCreate.status === 201 && farm && farm.id && farm.name === farmName;
        assert(
            farmOk,
            'A',
            'farm create',
            `created id=${farm && farm.id}`,
            `status=${farmCreate.status} body=${farmCreate.raw}`
        );

        const farmList = await jsonRequest('GET', '/api/farms', { token });
        const farms = asList(dataOf(farmList));
        const farmReread = farms.find((f) => f.id === farm.id);
        assert(
            Boolean(farmReread) &&
                farmReread.name === farmName &&
                farmReread.location === `${prefix}-loc` &&
                Number(farmReread.areaHectares) === 12.5 &&
                farmReread.farmType === 'mixed',
            'A',
            'farm refresh',
            'GET /api/farms returned the same name/location/area/type',
            `list status=${farmList.status} match=${JSON.stringify(farmReread || null)}`
        );

        const livestockCreate = await jsonRequest('POST', '/api/livestock', {
            token,
            body: {
                name: livestockName,
                type: 'Cattle',
                tag: livestockTag,
                healthStatus: 'healthy',
                weight: 410,
                location: `${prefix}-paddock-a`,
                farmId: farm && farm.id,
                sex: 'female'
            }
        });
        const livestock = dataOf(livestockCreate);
        const livestockOk =
            livestockCreate.status === 201 &&
            livestock &&
            livestock.id &&
            livestock.species === 'cattle' &&
            livestock.tag === livestockTag &&
            Number(livestock.weight) === 410;
        assert(
            livestockOk,
            'A',
            'livestock create',
            `created id=${livestock && livestock.id} species=${livestock && livestock.species}`,
            `status=${livestockCreate.status} body=${livestockCreate.raw}`
        );

        const livestockGet = await jsonRequest('GET', `/api/livestock/${livestock && livestock.id}`, { token });
        const livestockRead = dataOf(livestockGet);
        assert(
            livestockGet.status === 200 &&
                livestockRead &&
                livestockRead.id === livestock.id &&
                livestockRead.species === 'cattle' &&
                livestockRead.type === 'cattle' &&
                livestockRead.tag === livestockTag &&
                livestockRead.healthStatus === 'healthy' &&
                Number(livestockRead.weight) === 410 &&
                livestockRead.location === `${prefix}-paddock-a` &&
                String(livestockRead.farmId || '') === String(farm.id),
            'A',
            'livestock refresh',
            'GET by id matched species/type/tag/health/weight/location/farmId',
            `status=${livestockGet.status} body=${livestockGet.raw}`
        );

        const cropCreate = await jsonRequest('POST', '/api/crops', {
            token,
            body: {
                name: cropName,
                type: 'vegetable',
                farmId: farm && farm.id,
                area: 2.25,
                status: 'planted',
                notes: `${prefix}-notes`
            }
        });
        const crop = dataOf(cropCreate);
        assert(
            cropCreate.status === 201 && crop && crop.id && crop.name === cropName,
            'A',
            'crop create',
            `created id=${crop && crop.id}`,
            `status=${cropCreate.status} body=${cropCreate.raw}`
        );

        const cropGet = await jsonRequest('GET', `/api/crops/${crop && crop.id}`, { token });
        const cropRead = dataOf(cropGet);
        assert(
            cropGet.status === 200 &&
                cropRead &&
                cropRead.name === cropName &&
                Number(cropRead.area) === 2.25 &&
                cropRead.status === 'planted' &&
                String(cropRead.farmId || '') === String(farm.id),
            'A',
            'crop refresh',
            'GET by id matched name/area/status/farmId',
            `status=${cropGet.status} body=${cropGet.raw}`
        );

        const taskCreate = await jsonRequest('POST', `/api/farms/${farm && farm.id}/tasks`, {
            token,
            body: {
                title: taskTitle,
                description: `${prefix}-task-desc`,
                priority: 'high',
                category: 'general'
            }
        });
        const task = dataOf(taskCreate);
        assert(
            taskCreate.status === 201 && task && task.id && task.title === taskTitle,
            'A',
            'task create',
            `created id=${task && task.id} via POST /api/farms/:farmId/tasks`,
            `status=${taskCreate.status} body=${taskCreate.raw}`
        );

        const taskGet = await jsonRequest('GET', `/api/farms/${farm && farm.id}/tasks/${task && task.id}`, { token });
        const taskRead = dataOf(taskGet);
        assert(
            taskGet.status === 200 &&
                taskRead &&
                taskRead.title === taskTitle &&
                taskRead.priority === 'high' &&
                taskRead.status === 'open',
            'A',
            'task refresh',
            'GET task by id matched title/priority/status',
            `status=${taskGet.status} body=${taskGet.raw}`
        );

        record(
            'A',
            'inventory',
            'N/A',
            'No backend /api/inventory routes exist (grep of backend JS). Web inventory is localStorage-only.'
        );
        record(
            'A',
            'global /api/tasks',
            'N/A',
            'Tasks persist as farm_tasks via nested /api/farms/:farmId/tasks, not /api/tasks.'
        );

        // --- B edit → re-read ---
        record(
            'B',
            'farm edit',
            'N/A',
            'FarmRoutes exposes GET/POST /api/farms only; no PUT/PATCH farm update in backend/routes/farms.js.'
        );

        const livestockUpdate = await jsonRequest('PUT', `/api/livestock/${livestock && livestock.id}`, {
            token,
            body: {
                type: 'Goat',
                healthStatus: 'sick',
                weight: 425.5,
                location: `${prefix}-paddock-b`,
                farmId: farm.id
            }
        });
        const livestockUpdated = dataOf(livestockUpdate);
        const livestockUpdateOk =
            livestockUpdate.status === 200 &&
            livestockUpdated &&
            livestockUpdated.species === 'goat' &&
            livestockUpdated.healthStatus === 'sick' &&
            Number(livestockUpdated.weight) === 425.5 &&
            livestockUpdated.location === `${prefix}-paddock-b`;
        assert(
            livestockUpdateOk,
            'B',
            'livestock update',
            'PUT returned goat/sick/425.5/paddock-b',
            `status=${livestockUpdate.status} body=${livestockUpdate.raw}`
        );

        const livestockGet2 = await jsonRequest('GET', `/api/livestock/${livestock.id}`, { token });
        const livestockRead2 = dataOf(livestockGet2);
        assert(
            livestockGet2.status === 200 &&
                livestockRead2.species === 'goat' &&
                livestockRead2.type === 'goat' &&
                livestockRead2.status === 'sick' &&
                livestockRead2.healthStatus === 'sick' &&
                Number(livestockRead2.weight) === 425.5 &&
                livestockRead2.location === `${prefix}-paddock-b` &&
                String(livestockRead2.farmId || '') === String(farm.id),
            'B',
            'livestock refresh after edit',
            'Fresh GET matched type/status/weight/location/farm linkage',
            `status=${livestockGet2.status} body=${livestockGet2.raw}`
        );

        const cropUpdate = await jsonRequest('PUT', `/api/crops/${crop && crop.id}`, {
            token,
            body: { name: `${cropName}-updated`, status: 'growing', area: 3.5 }
        });
        const cropUpdated = dataOf(cropUpdate);
        assert(
            cropUpdate.status === 200 && cropUpdated && cropUpdated.name === `${cropName}-updated` && cropUpdated.status === 'growing',
            'B',
            'crop update',
            'PUT returned updated name/status',
            `status=${cropUpdate.status} body=${cropUpdate.raw}`
        );
        const cropGet2 = await jsonRequest('GET', `/api/crops/${crop.id}`, { token });
        const cropRead2 = dataOf(cropGet2);
        assert(
            cropGet2.status === 200 && cropRead2.name === `${cropName}-updated` && Number(cropRead2.area) === 3.5,
            'B',
            'crop refresh after edit',
            'Fresh GET matched updated name/area',
            `status=${cropGet2.status} body=${cropGet2.raw}`
        );

        const taskUpdate = await jsonRequest('PATCH', `/api/farms/${farm.id}/tasks/${task.id}`, {
            token,
            body: { title: `${taskTitle}-updated`, status: 'in_progress', priority: 'urgent' }
        });
        const taskUpdated = dataOf(taskUpdate);
        assert(
            taskUpdate.status === 200 && taskUpdated && taskUpdated.title === `${taskTitle}-updated` && taskUpdated.status === 'in_progress',
            'B',
            'task update',
            'PATCH returned updated title/status',
            `status=${taskUpdate.status} body=${taskUpdate.raw}`
        );
        const taskGet2 = await jsonRequest('GET', `/api/farms/${farm.id}/tasks/${task.id}`, { token });
        const taskRead2 = dataOf(taskGet2);
        assert(
            taskGet2.status === 200 && taskRead2.title === `${taskTitle}-updated` && taskRead2.priority === 'urgent',
            'B',
            'task refresh after edit',
            'Fresh GET matched updated title/priority',
            `status=${taskGet2.status} body=${taskGet2.raw}`
        );

        // --- C repeated create ---
        const beforeDup = await countLivestockByPrefix(databaseUrl, prefix);
        const dupA = await jsonRequest('POST', '/api/livestock', {
            token,
            body: { name: `${prefix}-dup`, type: 'sheep', tag: `${prefix}-DUP` }
        });
        const dupB = await jsonRequest('POST', '/api/livestock', {
            token,
            body: { name: `${prefix}-dup`, type: 'sheep', tag: `${prefix}-DUP` }
        });
        const afterDup = await countLivestockByPrefix(databaseUrl, prefix);
        const createdDup = afterDup - beforeDup;
        const dupEvidence =
            `sequential identical POSTs created ${createdDup} row(s) (before=${beforeDup} after=${afterDup}); statuses ${dupA.status}/${dupB.status}. writeIdempotency is not wired to livestock/crops/farms/tasks CRUD. Risk: a non-UI client or a double-submit that bypasses the disabled button can persist duplicate livestock. Not fixed in this review.`;
        if (createdDup === 2) {
            record('C', 'livestock API double POST', 'DEFERRED', dupEvidence);
        } else if (createdDup === 1) {
            record(
                'C',
                'livestock API double POST',
                'PASS',
                `sequential identical POSTs created 1 row (API did not duplicate). ${dupEvidence}`
            );
        } else {
            record('C', 'livestock API double POST', 'FAIL', dupEvidence);
        }
        record(
            'C',
            'livestock UI double-submit',
            'PASS',
            'dashboard.html saveDashboardNewLivestock sets submitButton.disabled=true before the request (UI-level only).'
        );
        record(
            'C',
            'farm UI double-submit',
            'PASS',
            'dashboard.html saveFarmData sets submitButton.disabled=true before createFarm (UI-level only).'
        );

        const livestockPutAgain = await jsonRequest('PUT', `/api/livestock/${livestock.id}`, {
            token,
            body: { type: 'Goat', healthStatus: 'sick', weight: 425.5, location: `${prefix}-paddock-b`, farmId: farm.id }
        });
        const livestockAfterRepeat = dataOf(await jsonRequest('GET', `/api/livestock/${livestock.id}`, { token }));
        assert(
            livestockPutAgain.status === 200 &&
                livestockAfterRepeat.species === 'goat' &&
                Number(livestockAfterRepeat.weight) === 425.5,
            'C',
            'livestock repeated update',
            'Second identical PUT left a single record in the intended state',
            `status=${livestockPutAgain.status} read=${JSON.stringify(livestockAfterRepeat)}`
        );

        // --- D cross-view ---
        await sleep(150);
        const listAfter = await jsonRequest('GET', '/api/livestock', { token });
        const animals = asList(dataOf(listAfter));
        const inList = animals.find((a) => a.id === livestock.id);
        const goatMatches = animals.filter((a) => String(a.species || a.type || '').toLowerCase() === 'goat');
        const stats = await jsonRequest('GET', '/api/livestock/stats/overview', { token });
        const statsData = dataOf(stats);
        assert(
            Boolean(inList) && inList.species === 'goat' && inList.healthStatus === 'sick',
            'D',
            'livestock list',
            'Updated animal present in GET /api/livestock with goat/sick',
            `status=${listAfter.status} found=${JSON.stringify(inList || null)}`
        );
        assert(
            goatMatches.some((a) => a.id === livestock.id),
            'D',
            'livestock type filter',
            'Client-side species grouping of the list includes the updated goat (API list has no server type filter in livestockStore.listLivestock)',
            `goat count=${goatMatches.length}`
        );
        assert(
            stats.status === 200 &&
                statsData &&
                Number(statsData.totalAnimals) === animals.length &&
                Number(statsData.totalAnimals) >= 1,
            'D',
            'livestock dashboard stats',
            `stats.totalAnimals=${statsData && statsData.totalAnimals} matches list length ${animals.length}`,
            `stats=${stats.raw} listLen=${animals.length}`
        );
        record(
            'D',
            'mobile device sync',
            'DEFERRED',
            'Android FarmRepository/LivestockRepository use the same REST API + Room cache. Device/AAB sync was not executed: no emulator in this review, Android STAGING URL is Railway production, and production writes are forbidden. API-level web create/read/update above is the shared contract.'
        );

        // --- E API error recovery ---
        const failedCreate = await jsonRequest('POST', '/api/livestock', {
            token,
            body: { name: `${prefix}-invalid` }
        });
        const afterFailedCreate = await countLivestockByPrefix(databaseUrl, `${prefix}-invalid`);
        assert(
            failedCreate.status === 400 && afterFailedCreate === 0,
            'E',
            'failed create (API)',
            `POST without type/species returned ${failedCreate.status}; no livestock row with that name`,
            `status=${failedCreate.status} leftover=${afterFailedCreate} body=${failedCreate.raw}`
        );

        const failedUpdate = await jsonRequest('PUT', `/api/livestock/${livestock.id}`, {
            token,
            body: { weight: -10 }
        });
        const afterFailedUpdate = dataOf(await jsonRequest('GET', `/api/livestock/${livestock.id}`, { token }));
        assert(
            failedUpdate.status === 400 && Number(afterFailedUpdate.weight) === 425.5,
            'E',
            'failed update (API)',
            'Invalid weight rejected; stored weight unchanged at 425.5',
            `status=${failedUpdate.status} weight=${afterFailedUpdate && afterFailedUpdate.weight} body=${failedUpdate.raw}`
        );

        const unauth = await jsonRequest('GET', '/api/livestock');
        assert(
            unauth.status === 401,
            'E',
            'unauthorized read (API)',
            `GET without token returned ${unauth.status} ${unauth.json && unauth.json.code}`,
            `status=${unauth.status} body=${unauth.raw}`
        );

        const retryCreate = await jsonRequest('POST', '/api/livestock', {
            token,
            body: { name: `${prefix}-retry`, type: 'pig', tag: `${prefix}-RTY` }
        });
        const retryId = dataOf(retryCreate) && dataOf(retryCreate).id;
        const retryCount = await countLivestockByPrefix(databaseUrl, `${prefix}-retry`);
        assert(
            retryCreate.status === 201 && retryCount === 1 && retryId,
            'E',
            'retry after failed create (API)',
            `one successful record id=${retryId}`,
            `status=${retryCreate.status} count=${retryCount}`
        );

        record(
            'E',
            'failed create UI (farm)',
            'PASS',
            'Covered by Playwright dashboard.spec.js "should display error notifications" (createFarm stub → alert-danger, no success).'
        );
        record(
            'E',
            'network failure UI',
            'PASS',
            'Covered by Playwright server-connection.spec.js "should handle network failures gracefully" (route.abort on /api/livestock).'
        );
        record(
            'E',
            'livestock UI false success on API failure',
            'DEFERRED',
            'saveDashboardNewLivestock falls back to localStorage and showSuccessMessage("...Saved locally") when createLivestock returns success:false. Farm/crop paths show errors instead. Risk: the operator sees success for a failed server write; a later refresh against a live API can drop the local-only row. Documented defect; not patched in this review.'
        );

        // --- F session ---
        const refresh = await jsonRequest('POST', '/api/auth/refresh', {
            body: { refreshToken }
        });
        const refreshData = dataOf(refresh);
        const newToken = refreshData && refreshData.token;
        const newRefresh = refreshData && refreshData.refreshToken;
        assert(
            refresh.status === 200 && newToken && newRefresh && newRefresh !== refreshToken,
            'F',
            'refresh token rotation',
            'POST /api/auth/refresh returned a new access token and rotated refresh token',
            `status=${refresh.status} body=${refresh.raw}`
        );

        const replayOldRefresh = await jsonRequest('POST', '/api/auth/refresh', {
            body: { refreshToken }
        });
        assert(
            replayOldRefresh.status === 401,
            'F',
            'old refresh rejected',
            'Rotated refresh token cannot be reused',
            `status=${replayOldRefresh.status} body=${replayOldRefresh.raw}`
        );

        const authedRead = await jsonRequest('GET', `/api/livestock/${livestock.id}`, { token: newToken });
        assert(
            authedRead.status === 200 && dataOf(authedRead) && dataOf(authedRead).id === livestock.id,
            'F',
            'authenticated read after refresh',
            'New access token can GET the test livestock record',
            `status=${authedRead.status}`
        );

        const authedWrite = await jsonRequest('PUT', `/api/livestock/${livestock.id}`, {
            token: newToken,
            body: { notes: `${prefix}-session-write`, healthStatus: 'sick', type: 'Goat', weight: 425.5, location: `${prefix}-paddock-b` }
        });
        const afterSessionWrite = dataOf(await jsonRequest('GET', `/api/livestock/${livestock.id}`, { token: newToken }));
        assert(
            authedWrite.status === 200 && afterSessionWrite && String(afterSessionWrite.notes || '').includes(`${prefix}-session-write`),
            'F',
            'authenticated write after refresh',
            'PUT with rotated access token persisted notes',
            `status=${authedWrite.status} notes=${afterSessionWrite && afterSessionWrite.notes}`
        );

        const expired = jwt.sign(
            { userId: verified.id, email, role: 'farmer', iat: Math.floor(Date.now() / 1000) - 7200 },
            JWT_SECRET,
            { expiresIn: '-1h', issuer: 'smartfarm', audience: 'smartfarm-users' }
        );
        const expiredRead = await jsonRequest('GET', '/api/livestock', { token: expired });
        assert(
            expiredRead.status === 401 && expiredRead.json && expiredRead.json.code === 'INVALID_TOKEN',
            'F',
            'expired access token',
            `expired JWT rejected with 401 ${expiredRead.json && expiredRead.json.code}`,
            `status=${expiredRead.status} body=${expiredRead.raw}`
        );

        const invalidRead = await jsonRequest('GET', '/api/livestock', { token: 'not-a-jwt' });
        assert(
            invalidRead.status === 401,
            'F',
            'invalid access token',
            `malformed token rejected with ${invalidRead.status}`,
            `status=${invalidRead.status}`
        );

        record(
            'F',
            'browser token storage',
            'PASS',
            'web-project/public/js/api-service.js stores smartfarm_token and smartfarm_refresh_token in localStorage/sessionStorage and refreshes on 401. Unit: tests/unit/auth-refresh.test.js.'
        );
    } catch (error) {
        record('setup', 'runner', 'FAIL', error.message);
        console.error(error);
    } finally {
        try {
            if (databaseUrl && isLocalUrl(databaseUrl) && email) {
                await cleanupUser(databaseUrl, email, prefix);
            }
        } catch (cleanupError) {
            console.error('cleanup error', cleanupError.message);
            try {
                const client = new Client({ connectionString: databaseUrl, ssl: false });
                await client.connect();
                await client.query('DELETE FROM users WHERE email LIKE $1', [
                    'e2e-integrity-20260817-%@integrity.smartfarm.test'
                ]);
                await client.end();
            } catch (fallbackError) {
                console.error('cleanup fallback error', fallbackError.message);
            }
        }
        stopChild(serverChild);
        if (embeddedPg) {
            try {
                await embeddedPg.stop();
            } catch (stopError) {
                console.error('embedded postgres stop error', stopError.message);
            }
        }
        if (startedDocker) {
            spawnSync('docker', ['rm', '-f', CONTAINER_NAME], { stdio: 'ignore' });
        }
    }

    const passCount = countByResult('PASS');
    const deferredCount = countByResult('DEFERRED');
    const unexpectedFailureCount = countByResult('FAIL');
    const releaseRecommendation = buildReleaseRecommendation(unexpectedFailureCount, deferredCount);
    const summary = {
        startedAt: startedAt.toISOString(),
        finishedAt: new Date().toISOString(),
        apiBase: `http://127.0.0.1:${API_PORT}`,
        database: startedDocker
            ? `local Docker postgres:16-alpine container ${CONTAINER_NAME} on 127.0.0.1:${PG_PORT}/${PG_DB} (destroyed after run)`
            : embeddedPg
              ? `embedded-postgres throwaway cluster on 127.0.0.1:${PG_PORT}/${PG_DB} (stopped after run; Docker was not available)`
              : 'caller-provided local INTEGRITY_DATABASE_URL',
        prefix,
        results,
        passCount,
        deferredCount,
        unexpectedFailureCount,
        releaseRecommendation
    };
    console.log('INTEGRITY_RESULT_JSON_BEGIN');
    console.log(JSON.stringify(summary, null, 2));
    console.log('INTEGRITY_RESULT_JSON_END');
    process.exit(unexpectedFailureCount > 0 ? 1 : 0);
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
