/**
 * Live Railway smoke — intentionally separate from the browser E2E matrix.
 * Included only by the `railway-smoke` Playwright project.
 * Requires RAILWAY_API_BASE (or SMARTFARM_RAILWAY_API_BASE) to be set explicitly.
 */

const { test, expect } = require('@playwright/test');

const RAILWAY_API_BASE = (
  process.env.RAILWAY_API_BASE ||
  process.env.SMARTFARM_RAILWAY_API_BASE ||
  ''
).replace(/\/+$/, '');

test.describe('Railway production smoke', () => {
  test('health endpoint responds with SmartFarm payload', async ({ request }) => {
    expect(
      RAILWAY_API_BASE,
      'RAILWAY_API_BASE (or SMARTFARM_RAILWAY_API_BASE) must be set for the railway-smoke project'
    ).toBeTruthy();

    let lastError;
    let response;
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        response = await request.get(`${RAILWAY_API_BASE}/api/health`, {
          timeout: 15000
        });
        if (response.ok()) {
          break;
        }
        lastError = new Error(`HTTP ${response.status()}`);
      } catch (err) {
        lastError = err;
      }
      await new Promise((r) => setTimeout(r, 2000 * attempt));
    }

    expect(response, lastError && String(lastError)).toBeTruthy();
    expect(response.ok()).toBeTruthy();
    const body = await response.json();
    expect(body.ok).toBeTruthy();
    expect(body.service).toBe('SmartFarm');
    expect(body.ts).toBeDefined();
  });

  test('farms endpoint is reachable without auth (expects 401)', async ({ request }) => {
    expect(RAILWAY_API_BASE).toBeTruthy();

    let lastError;
    let response;
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        response = await request.get(`${RAILWAY_API_BASE}/api/farms`, {
          timeout: 15000
        });
        // Connectivity smoke: route exists and is not a gateway outage.
        if (response.status() < 500) {
          break;
        }
        lastError = new Error(`HTTP ${response.status()}`);
      } catch (err) {
        lastError = err;
      }
      await new Promise((r) => setTimeout(r, 2000 * attempt));
    }

    expect(response, lastError && String(lastError)).toBeTruthy();
    expect([401, 403]).toContain(response.status());
    const body = await response.json();
    expect(body.error || body.code || body.message).toBeTruthy();
  });
});
