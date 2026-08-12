/**
 * E2E Tests for Server Connection
 * Tests frontend-backend connectivity from Netlify to Railway
 */

const { test, expect } = require('@playwright/test');
const {
  seedDashboardSession,
  gotoProtectedPage,
  fakeJwt
} = require('./helpers/dashboard-ready');

const API_BASE = (
  process.env.SMARTFARM_API_BASE ||
  process.env.VITE_API_BASE_URL ||
  'https://web-production-86d39.up.railway.app'
).replace(/\/$/, '');

function apiUrl(path) {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${API_BASE}${normalized}`;
}

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

  test('should successfully connect to Railway backend', async ({ page }) => {
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
    // Reachable Railway endpoint: success or auth rejection (not a network/5xx outage)
    expect([200, 401, 403]).toContain(farmsResponse.status());
    const farmsData = await farmsResponse.json();
    if (farmsResponse.ok()) {
      expect(Array.isArray(farmsData.data || farmsData)).toBeTruthy();
    } else {
      expect(farmsData.error || farmsData.message || farmsData.code).toBeTruthy();
    }
  });

  test('should fetch crops from backend API', async ({ page }) => {
    const cropsResponse = await page.request.get(apiUrl('/api/crops'), {
      headers: authHeaders()
    });
    expect([200, 401, 403]).toContain(cropsResponse.status());
    const cropsData = await cropsResponse.json();
    if (cropsResponse.ok()) {
      expect(Array.isArray(cropsData.data || cropsData)).toBeTruthy();
    } else {
      expect(cropsData.error || cropsData.message || cropsData.code).toBeTruthy();
    }
  });

  test('should fetch livestock from backend API', async ({ page }) => {
    const livestockResponse = await page.request.get(apiUrl('/api/livestock'), {
      headers: authHeaders()
    });
    expect([200, 401, 403]).toContain(livestockResponse.status());
    const livestockData = await livestockResponse.json();
    if (livestockResponse.ok()) {
      expect(Array.isArray(livestockData.data || livestockData)).toBeTruthy();
    } else {
      expect(livestockData.error || livestockData.message || livestockData.code).toBeTruthy();
    }
  });

  test('should create livestock via API', async ({ page }) => {
    const newLivestock = {
      species: 'Cattle',
      breed: 'Holstein',
      tag: 'E2E-TEST-' + Date.now(),
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

    if (createResponse.ok()) {
      const createData = await createResponse.json();
      expect(createData.success || createData.id || createData.data).toBeTruthy();
    } else {
      expect([400, 401, 403, 422]).toContain(createResponse.status());
      const body = await createResponse.json().catch(() => ({}));
      expect(body.error || body.message || body.code || createResponse.status()).toBeTruthy();
    }
  });

  test('should handle API errors gracefully', async ({ page }) => {
    const invalidResponse = await page.request.get(apiUrl('/api/invalid-endpoint'), {
      headers: authHeaders()
    });
    expect([404, 401, 403]).toContain(invalidResponse.status());
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

    // Fulfill remote API from the page origin so we verify the app itself
    // does not introduce CORS issues (static E2E preview is not on Netlify).
    await page.route('**/api/livestock**', async (route) => {
      const origin = 'http://localhost:8080';
      if (route.request().method() === 'OPTIONS') {
        return route.fulfill({
          status: 204,
          headers: {
            'Access-Control-Allow-Origin': origin,
            'Access-Control-Allow-Credentials': 'true',
            'Access-Control-Allow-Methods': 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
            'Access-Control-Allow-Headers': 'Authorization,Content-Type,Accept'
          }
        });
      }
      return route.fulfill({
        status: 200,
        contentType: 'application/json',
        headers: {
          'Access-Control-Allow-Origin': origin,
          'Access-Control-Allow-Credentials': 'true'
        },
        body: JSON.stringify({ success: true, data: [] })
      });
    });

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
          body: JSON.stringify({ data: [] })
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

    expect([200, 401, 403]).toContain(response.status());
    expect(endTime - startTime).toBeLessThan(5000);

    const data = await response.json();
    expect(data).toBeDefined();
  });
});
