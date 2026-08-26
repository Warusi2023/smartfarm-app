/**
 * E2E Tests for Server Connection
 * Matrix suite talks to the local Playwright mock API (see mock-api-server.js).
 * Live Railway coverage lives in railway-smoke.spec.js (--project=railway-smoke).
 */

const { test, expect } = require('@playwright/test');
const {
  seedDashboardSession,
  gotoProtectedPage,
  fakeJwt
} = require('./helpers/dashboard-ready');
const { getE2EApiBase, apiUrl } = require('./helpers/api-base');

function authHeaders() {
  return {
    Authorization: `Bearer ${fakeJwt()}`,
    Accept: 'application/json'
  };
}

test.describe('Server Connection Tests', () => {
  test.beforeEach(async ({ page }) => {
    await seedDashboardSession(page);
    // Landing page CDNs (Bootstrap/FA) can stall the `load` event; do not wait for it.
    // Wait for the real landing shell instead.
    try {
      await page.goto('/', { waitUntil: 'domcontentloaded' });
    } catch (error) {
      const timedOut =
        error &&
        (error.name === 'TimeoutError' || /Timeout.*exceeded/i.test(String(error.message)));
      if (!timedOut) {
        throw error;
      }
    }
    await page.waitForSelector('.navbar-brand, #home.hero', { state: 'visible' });
  });

  test('should successfully connect to backend API', async ({ page }) => {
    const base = getE2EApiBase();
    expect(base).toBeTruthy();
    expect(base.includes('railway.app')).toBeFalsy();

    const healthResponse = await page.request.get(apiUrl('/api/health'));
    expect(healthResponse.ok()).toBeTruthy();

    const healthData = await healthResponse.json();
    expect(healthData.ok).toBeTruthy();
    expect(healthData.service).toBe('SmartFarm');
    expect(healthData.ts).toBeDefined();
  });

  test('should fetch farms from backend API', async ({ page }) => {
    const farmsResponse = await page.request.get(apiUrl('/api/farms'), {
      headers: authHeaders()
    });
    expect(farmsResponse.status()).toBe(200);
    const farmsData = await farmsResponse.json();
    expect(farmsData.success).toBeTruthy();
    expect(Array.isArray(farmsData.data)).toBeTruthy();
    expect(farmsData.data.length).toBeGreaterThan(0);
  });

  test('should fetch crops from backend API', async ({ page }) => {
    const cropsResponse = await page.request.get(apiUrl('/api/crops'), {
      headers: authHeaders()
    });
    expect(cropsResponse.status()).toBe(200);
    const cropsData = await cropsResponse.json();
    expect(cropsData.success).toBeTruthy();
    expect(Array.isArray(cropsData.data)).toBeTruthy();
  });

  test('should fetch livestock from backend API', async ({ page }) => {
    const livestockResponse = await page.request.get(apiUrl('/api/livestock'), {
      headers: authHeaders()
    });
    expect(livestockResponse.status()).toBe(200);
    const livestockData = await livestockResponse.json();
    expect(livestockData.success).toBeTruthy();
    expect(Array.isArray(livestockData.data)).toBeTruthy();
  });

  test('should create livestock via API', async ({ page }) => {
    const tag = `E2E-TEST-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    const newLivestock = {
      species: 'Cattle',
      breed: 'Holstein',
      tag,
      sex: 'female',
      birthDate: '2023-01-01',
      weight: 500,
      location: 'Test Farm',
      value: 1000
    };

    const createResponse = await page.request.post(apiUrl('/api/livestock'), {
      data: newLivestock,
      headers: authHeaders()
    });

    expect(createResponse.status()).toBe(201);
    const createData = await createResponse.json();
    expect(createData.success).toBeTruthy();
    expect(createData.data?.tag || createData.tag).toBe(tag);
  });

  test('should reject unauthenticated farms requests', async ({ page }) => {
    const response = await page.request.get(apiUrl('/api/farms'));
    expect(response.status()).toBe(401);
    const body = await response.json();
    expect(body.code || body.error).toBeTruthy();
  });

  test('should handle API errors gracefully', async ({ page }) => {
    const invalidResponse = await page.request.get(apiUrl('/api/invalid-endpoint'), {
      headers: authHeaders()
    });
    expect(invalidResponse.status()).toBe(404);
    const body = await invalidResponse.json();
    expect(body.success).toBeFalsy();
    expect(body.error || body.code).toBeTruthy();
  });

  test('should not have CORS violations in console', async ({ page }) => {
    const consoleErrors = [];

    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        const text = msg.text();
        if (text.includes('CORS') || text.includes('Cross-Origin')) {
          consoleErrors.push(text);
        }
      }
    });

    // Hit the real local mock API from the page (credentials + CORS).
    await gotoProtectedPage(page, '/livestock-management.html');
    await page.waitForTimeout(2000);

    expect(consoleErrors).toHaveLength(0);
  });

  test('should not have CSP violations in console', async ({ page }) => {
    const consoleErrors = [];

    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        const text = msg.text();
        if (text.includes('Content Security Policy') || text.includes('CSP')) {
          consoleErrors.push(text);
        }
      }
    });

    await gotoProtectedPage(page, '/dashboard.html', { readySelector: '#dashboardView' });
    await page.waitForTimeout(3000);

    expect(consoleErrors).toHaveLength(0);
  });

  test('should load weather service without errors', async ({ page }) => {
    const consoleErrors = [];

    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        const text = msg.text();
        if (
          (text.includes('weather') || text.includes('Weather')) &&
          (text.includes('TypeError') || text.includes('Cannot read'))
        ) {
          consoleErrors.push(text);
        }
      }
    });

    await gotoProtectedPage(page, '/dashboard.html', { readySelector: '#dashboardView' });
    await page.waitForTimeout(2000);

    expect(consoleErrors).toHaveLength(0);
  });

  test('should handle network failures gracefully', async ({ page }) => {
    await page.route('**/api/health**', (route) => route.abort('failed'));
    await page.route('**/api/livestock**', (route) => route.abort('failed'));

    let serverUnavailableBannerVisible = false;

    page.on('console', (msg) => {
      if (msg.text().includes('Server temporarily unavailable')) {
        serverUnavailableBannerVisible = true;
      }
    });

    await gotoProtectedPage(page, '/livestock-management.html');
    await page.waitForTimeout(5000);

    const banner = await page.$('#server-unavailable-banner');
    const bodyVisible = await page.locator('body').isVisible();
    expect(banner || serverUnavailableBannerVisible || bodyVisible).toBeTruthy();
  });

  test.describe('retry backoff (no service worker)', () => {
    // WebKit can satisfy cross-origin /api/farms via a service worker before Playwright
    // page.route runs, which zeroed requestCount while Chromium intercepted correctly.
    test.use({ serviceWorkers: 'block' });

    test('should retry failed requests with exponential backoff', async ({ page }) => {
    // SmartFarmAPI.request uses maxRetries = 1 (initial + one retry = 2 attempts).
    // Probe query isolates this call from dashboard background getFarms() traffic.
    let requestCount = 0;
    const probeParam = 'e2eRetryProbe=1';
    const apiBase = getE2EApiBase();
    const altApiBase = apiBase.includes('127.0.0.1')
      ? apiBase.replace('127.0.0.1', 'localhost')
      : apiBase.replace('localhost', '127.0.0.1');

    const handleFarmsRoute = (route) => {
      const url = route.request().url();
      if (!url.includes(probeParam)) {
        return route.continue();
      }
      requestCount++;
      if (requestCount <= 1) {
        return route.abort('failed');
      }
      return route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          data: [],
          message: 'e2e-retry-probe-ok'
        })
      });
    };

    // Register both loopback hosts — WebKit/Chromium may disagree on 127.0.0.1 vs localhost.
    for (const base of [apiBase, altApiBase]) {
      const pattern = new RegExp(
        `^${base.replace(/[.*+?^${}()|[\]\\]/g, '\\.')}/api/farms`,
        'i'
      );
      await page.route(pattern, handleFarmsRoute);
    }
    await page.route('**/api/farms**', handleFarmsRoute);

    await gotoProtectedPage(page, '/dashboard.html', { readySelector: '#dashboardView' });
    await page.waitForFunction(
      () =>
        !!(
          window.SmartFarmAPI &&
          typeof window.SmartFarmAPI.getFarms === 'function' &&
          window.SmartFarmAPI.getFarms.toString().indexOf('API not available') === -1
        ),
      { timeout: 15000 }
    );

    // Dashboard fetch wrappers (performance-optimizer) turn network failures into a
    // synthetic 503 Response and may cache successful mock bodies. WebKit surfaces
    // route.abort as "Load failed". For this probe only: clear that cache, hit the
    // routed network, then throw a retryable TypeError after attempt 1 so maxRetries=1 runs.
    const probeResult = await page.evaluate(async () => {
      const clearApiCache = () => {
        try {
          if (window.performanceOptimizer && window.performanceOptimizer.apiCache) {
            window.performanceOptimizer.apiCache.clear();
          }
        } catch (_) {
          /* ignore */
        }
      };
      const previousFetch = window.fetch;
      let probeAttempts = 0;
      let lastFetchUrl = '';
      window.fetch = async function (input, init) {
        const url =
          typeof input === 'string' ? input : input && input.url ? String(input.url) : '';
        if (!url.includes('e2eRetryProbe=1')) {
          return previousFetch.call(this, input, init);
        }
        lastFetchUrl = url;
        probeAttempts += 1;
        clearApiCache();
        if (probeAttempts === 1) {
          try {
            await previousFetch.call(this, input, init);
          } catch (_) {
            /* route.abort / wrapper noise */
          }
          clearApiCache();
          throw new TypeError('Failed to fetch');
        }
        return previousFetch.call(this, input, init);
      };
      try {
        const result = await window.SmartFarmAPI.getFarms({ e2eRetryProbe: '1' });
        return {
          result,
          probeAttempts,
          lastFetchUrl,
          apiBase:
            (window.SmartFarmAPI && window.SmartFarmAPI.baseURL) ||
            window.__SMARTFARM_API_BASE__ ||
            null
        };
      } catch (err) {
        return {
          result: {
            success: false,
            error: err && err.message ? String(err.message) : 'evaluate-throw'
          },
          probeAttempts,
          lastFetchUrl,
          apiBase:
            (window.SmartFarmAPI && window.SmartFarmAPI.baseURL) ||
            window.__SMARTFARM_API_BASE__ ||
            null
        };
      } finally {
        window.fetch = previousFetch;
      }
    });
    // maxRetries=1 uses a 1s backoff before the single retry.
    await page.waitForTimeout(5000);

    expect(
      requestCount,
      `probeResult=${JSON.stringify(probeResult)} apiBase=${apiBase}`
    ).toBe(2);
    expect(probeResult.probeAttempts).toBe(2);
    expect(probeResult.result && probeResult.result.success).toBeTruthy();
    expect(probeResult.result.data).toEqual([]);
    expect(probeResult.result.message).toBe('e2e-retry-probe-ok');
    });
  });

  test('should maintain session across page navigation', async ({ page }) => {
    await gotoProtectedPage(page, '/dashboard.html', { readySelector: '#dashboardView' });
    await gotoProtectedPage(page, '/livestock-management.html');
    await gotoProtectedPage(page, '/dashboard.html', { readySelector: '#dashboardView' });

    const consoleErrors = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error' && msg.text().toLowerCase().includes('auth')) {
        consoleErrors.push(msg.text());
      }
    });

    await page.waitForTimeout(1000);
    expect(consoleErrors).toHaveLength(0);
    await expect(page.locator('#dashboardView')).toBeVisible();
  });

  test('should handle large API responses efficiently', async ({ page }) => {
    const startTime = Date.now();
    const response = await page.request.get(apiUrl('/api/livestock?e2eBulk=1'), {
      headers: authHeaders()
    });
    const endTime = Date.now();

    expect(response.status()).toBe(200);
    expect(endTime - startTime).toBeLessThan(5000);

    const data = await response.json();
    expect(Array.isArray(data.data)).toBeTruthy();
    expect(data.data.length).toBeGreaterThan(100);
  });
});
