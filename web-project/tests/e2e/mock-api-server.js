/**
 * Deterministic in-memory API for Playwright E2E.
 * Does not depend on Railway, Postgres, or external network.
 *
 * Start: node tests/e2e/mock-api-server.js
 * Env:   PLAYWRIGHT_API_PORT (default 3099)
 */

const http = require('http');
const { URL } = require('url');

const PORT = Number(process.env.PLAYWRIGHT_API_PORT || 3099);
const HOST = process.env.PLAYWRIGHT_API_HOST || '127.0.0.1';

function seedState() {
  return {
    farms: [
      {
        id: 'farm-e2e-1',
        name: 'E2E Green Valley',
        location: 'Test Location',
        areaHectares: 25.5,
        farmType: 'mixed'
      }
    ],
    crops: [
      {
        id: 'crop-e2e-1',
        name: 'E2E Tomato',
        type: 'Vegetable',
        status: 'growing'
      }
    ],
    livestock: [
      {
        id: 'livestock-e2e-1',
        type: 'Cattle',
        species: 'Cattle',
        breed: 'Holstein',
        tag: 'E2E-SEED-1',
        sex: 'female',
        weight: 500,
        location: 'Pen A'
      }
    ]
  };
}

let state = seedState();

function resetState() {
  state = seedState();
}

function sendJson(res, status, body, origin) {
  const headers = {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store'
  };
  if (origin) {
    headers['Access-Control-Allow-Origin'] = origin;
    headers['Access-Control-Allow-Credentials'] = 'true';
    headers['Vary'] = 'Origin';
  }
  res.writeHead(status, headers);
  res.end(JSON.stringify(body));
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', (c) => chunks.push(c));
    req.on('end', () => {
      const raw = Buffer.concat(chunks).toString('utf8');
      if (!raw) {
        resolve({});
        return;
      }
      try {
        resolve(JSON.parse(raw));
      } catch (err) {
        reject(err);
      }
    });
    req.on('error', reject);
  });
}

function hasBearer(req) {
  const auth = req.headers.authorization || '';
  if (!auth.startsWith('Bearer ')) {
    return false;
  }
  const token = auth.slice(7).trim();
  return token.split('.').length === 3;
}

function requireAuth(req, res, origin) {
  if (hasBearer(req)) {
    return true;
  }
  sendJson(
    res,
    401,
    { success: false, error: 'Access token required', code: 'MISSING_TOKEN' },
    origin
  );
  return false;
}

function corsOrigin(req) {
  return req.headers.origin || 'http://localhost:8080';
}

function emptyCommandCenter() {
  return {
    window: 'today',
    dailyChecklist: { items: [], progress: {}, routines: {} },
    weatherRisk: null,
    hazardAssessment: null,
    weeklyPriorities: { items: [], weekKey: '', weekLabel: '' },
    weeklyReset: null,
    focusProgress: { items: [] },
    stats: { actions: 0 }
  };
}

/**
 * Dashboard secondary endpoints — return empty success so the UI does not
 * emit browser "404 (Not Found)" console errors during matrix E2E.
 */
function handleDashboardStub(method, path, req, res, origin) {
  if (method !== 'GET' && method !== 'PATCH' && method !== 'POST') {
    return false;
  }

  if (method === 'GET' && path === '/api/crop-recommendations/alerts') {
    if (!requireAuth(req, res, origin)) return true;
    sendJson(res, 200, { success: true, data: [], alerts: [] }, origin);
    return true;
  }

  if (method === 'PATCH' && path.startsWith('/api/crop-recommendations/alerts/')) {
    if (!requireAuth(req, res, origin)) return true;
    sendJson(res, 200, { success: true }, origin);
    return true;
  }

  if (method === 'GET' && path === '/api/farm-summary/command-center') {
    if (!requireAuth(req, res, origin)) return true;
    sendJson(res, 200, { success: true, data: emptyCommandCenter() }, origin);
    return true;
  }

  if (method === 'GET' && path === '/api/farm-summary/financials') {
    if (!requireAuth(req, res, origin)) return true;
    sendJson(
      res,
      200,
      {
        success: true,
        data: {
          revenue: 0,
          costs: 0,
          net: 0,
          helperText: 'E2E mock — no financial activity yet.'
        }
      },
      origin
    );
    return true;
  }

  if (method === 'POST' && path === '/api/farm-summary/revenue') {
    if (!requireAuth(req, res, origin)) return true;
    sendJson(res, 201, { success: true, data: { id: `rev-${Date.now()}` } }, origin);
    return true;
  }

  if (method === 'GET' && (path === '/api/weather-alerts' || path.startsWith('/api/weather-alerts/'))) {
    if (path.endsWith('/stats')) {
      sendJson(
        res,
        200,
        { success: true, data: { total: 0, unread: 0, critical: 0 } },
        origin
      );
      return true;
    }
    sendJson(res, 200, { success: true, data: [], alerts: [] }, origin);
    return true;
  }

  if (method === 'GET' && path === '/api/subscriptions/current') {
    sendJson(
      res,
      200,
      {
        success: true,
        data: {
          plan: 'free',
          status: 'active',
          statusBadge: 'Free',
          maxFarms: 1
        }
      },
      origin
    );
    return true;
  }

  if (method === 'POST' && path === '/api/subscriptions/events') {
    sendJson(res, 200, { success: true, data: { recorded: true }, events: [] }, origin);
    return true;
  }

  if (method === 'GET' && path === '/api/subscriptions/events') {
    sendJson(res, 200, { success: true, data: [], events: [] }, origin);
    return true;
  }

  if (method === 'GET' && path === '/api/catalog') {
    sendJson(res, 200, { success: true, data: [], items: [] }, origin);
    return true;
  }

  if (method === 'GET' && path === '/api/daily-tips/today') {
    sendJson(
      res,
      200,
      {
        success: true,
        tip: {
          id: 'e2e-tip',
          title: 'E2E tip',
          content: 'Deterministic tip for Playwright.',
          category: 'general'
        },
        date: new Date().toISOString().slice(0, 10)
      },
      origin
    );
    return true;
  }

  if (method === 'GET' && path === '/api/pets') {
    if (!requireAuth(req, res, origin)) return true;
    sendJson(res, 200, { success: true, data: [] }, origin);
    return true;
  }

  if (method === 'GET' && path === '/api/tasks') {
    if (!requireAuth(req, res, origin)) return true;
    sendJson(res, 200, { success: true, data: [] }, origin);
    return true;
  }

  return false;
}

const server = http.createServer(async (req, res) => {
  const origin = corsOrigin(req);
  const url = new URL(req.url, `http://${HOST}:${PORT}`);
  const path = url.pathname.replace(/\/+$/, '') || '/';

  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Methods': 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
      'Access-Control-Allow-Headers':
        'Authorization,Content-Type,Accept,Origin,X-Requested-With',
      'Access-Control-Max-Age': '86400',
      Vary: 'Origin'
    });
    res.end();
    return;
  }

  try {
    // Test-only reset — not part of production API surface.
    if (req.method === 'POST' && path === '/__e2e__/reset') {
      resetState();
      sendJson(res, 200, { success: true, reset: true }, origin);
      return;
    }

    if (req.method === 'GET' && path === '/api/health') {
      sendJson(
        res,
        200,
        {
          ok: true,
          service: 'SmartFarm',
          ts: Date.now(),
          env: 'test',
          version: 'e2e-mock',
          database: { connected: true, poolSize: 0, hasEnvVar: false }
        },
        origin
      );
      return;
    }

    if (handleDashboardStub(req.method, path, req, res, origin)) {
      return;
    }

    if (req.method === 'GET' && path === '/api/farms') {
      if (!requireAuth(req, res, origin)) return;
      sendJson(res, 200, { success: true, data: state.farms }, origin);
      return;
    }

    if (req.method === 'POST' && path === '/api/farms') {
      if (!requireAuth(req, res, origin)) return;
      const body = await readBody(req);
      const farm = {
        id: `farm-e2e-${Date.now()}`,
        name: body.name || 'Untitled Farm',
        location: body.location || '',
        areaHectares: Number(body.areaHectares || body.size || 0),
        farmType: body.farmType || body.type || 'mixed',
        description: body.description || ''
      };
      state.farms.push(farm);
      sendJson(res, 201, { success: true, data: farm }, origin);
      return;
    }

    if (req.method === 'GET' && path === '/api/crops') {
      if (!requireAuth(req, res, origin)) return;
      sendJson(res, 200, { success: true, data: state.crops }, origin);
      return;
    }

    if (req.method === 'GET' && path === '/api/livestock') {
      if (!requireAuth(req, res, origin)) return;
      const bulk = [];
      for (let i = 0; i < 200; i++) {
        bulk.push({
          id: `livestock-bulk-${i}`,
          type: 'Cattle',
          species: 'Cattle',
          breed: 'Holstein',
          tag: `BULK-${i}`,
          sex: i % 2 === 0 ? 'female' : 'male',
          weight: 400 + i,
          location: `Pen ${i % 10}`
        });
      }
      sendJson(
        res,
        200,
        { success: true, data: [...state.livestock, ...bulk] },
        origin
      );
      return;
    }

    if (req.method === 'POST' && path === '/api/livestock') {
      if (!requireAuth(req, res, origin)) return;
      const body = await readBody(req);
      if (!body.species || !body.tag) {
        sendJson(
          res,
          400,
          { success: false, error: 'species and tag are required', code: 'VALIDATION' },
          origin
        );
        return;
      }
      const animal = {
        id: `livestock-e2e-${Date.now()}`,
        type: body.type || body.species,
        species: body.species,
        breed: body.breed || '',
        tag: body.tag,
        sex: body.sex || '',
        birthDate: body.birthDate || null,
        weight: body.weight != null ? Number(body.weight) : null,
        location: body.location || '',
        value: body.value != null ? Number(body.value) : null
      };
      state.livestock.push(animal);
      sendJson(res, 201, { success: true, data: animal, id: animal.id }, origin);
      return;
    }

    if (req.method === 'GET' && path === '/api/recommend') {
      sendJson(res, 200, { success: true, results: [] }, origin);
      return;
    }

    sendJson(
      res,
      404,
      { success: false, error: 'Not found', code: 'NOT_FOUND', path },
      origin
    );
  } catch (err) {
    sendJson(
      res,
      500,
      { success: false, error: err.message || 'Mock API error' },
      origin
    );
  }
});

server.listen(PORT, HOST, () => {
  // eslint-disable-next-line no-console
  console.log(`[e2e-mock-api] listening on http://${HOST}:${PORT}`);
});

server.on('error', (err) => {
  // eslint-disable-next-line no-console
  console.error('[e2e-mock-api] failed to start:', err);
  process.exit(1);
});
