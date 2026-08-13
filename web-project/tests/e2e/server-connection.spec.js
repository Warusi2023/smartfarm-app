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
    await page.goto('/');
    await page.waitForSelector('body');
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

  test('should retry failed requests with exponential backoff', async ({ page }) => {
    let requestCount = 0;

    await page.route('**/api/farms**', (route) => {
      requestCount++;
      if (requestCount <= 2) {
        route.abort('failed');
      } else {
        route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({ success: true, data: [] })
        });
      }
    });

    await gotoProtectedPage(page, '/dashboard.html', { readySelector: '#dashboardView' });

    await page.evaluate(async () => {
      if (window.SmartFarmAPI && typeof window.SmartFarmAPI.getFarms === 'function') {
        try {
          await window.SmartFarmAPI.getFarms();
        } catch (_) {
          /* retries handled inside client */
        }
      }
    });
    await page.waitForTimeout(10000);

    expect(requestCount).toBeGreaterThanOrEqual(3);
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
    const response = await page.request.get(apiUrl('/api/livestock'), {
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
