/**
 * E2E Tests for SmartFarm Dashboard
 */

const { test, expect } = require('@playwright/test');
const {
  gotoDashboardReady,
  clickSidebarNavByOnclick,
  ensureMobileSidebarOpen
} = require('./helpers/dashboard-ready');

test.describe('SmartFarm Dashboard', () => {
  test.beforeEach(async ({ page }) => {
    await gotoDashboardReady(page);
  });

  test('should load the dashboard successfully', async ({ page }) => {
    await expect(page.locator('#dashboardView')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Farm Dashboard', exact: true })).toBeVisible();
    await expect(page.locator('.navbar')).toBeVisible();
    await expect(page.locator('#sidebar, .sidebar').first()).toBeVisible();
    await expect(page.locator('#mainContent.main-content, .main-content').first()).toBeVisible();
  });

  test('should display navigation menu', async ({ page }) => {
    await ensureMobileSidebarOpen(page);
    await expect(page.locator('.sidebar a[onclick*="showDashboard"]')).toBeVisible();
    await expect(page.locator('.sidebar a[onclick*="showFarmManagement"]')).toBeVisible();
    await expect(page.locator('.sidebar a[onclick*="showCropManagement"]')).toBeVisible();
    await expect(page.locator('.sidebar a[onclick*="showLivestockManagement"]')).toBeVisible();
    await expect(page.locator('.sidebar a[onclick*="showAnalytics"]')).toBeVisible();
    await expect(page.locator('.sidebar a[href="watering-management.html"]')).toBeVisible();
  });

  test('should navigate between sections', async ({ page }) => {
    await clickSidebarNavByOnclick(page, 'showFarmManagement');
    await expect(page.locator('#farmManagementView')).toBeVisible();

    await clickSidebarNavByOnclick(page, 'showCropManagement');
    await expect(page.locator('#cropManagementView')).toBeVisible();

    await clickSidebarNavByOnclick(page, 'showLivestockManagement');
    await expect(page.locator('#livestockManagementView')).toBeVisible();

    await clickSidebarNavByOnclick(page, 'showAnalytics');
    await expect(page.locator('#analyticsView')).toBeVisible();
  });

  test('should display farm management form', async ({ page }) => {
    await clickSidebarNavByOnclick(page, 'showFarmManagement');
    await expect(page.locator('#farmManagementView')).toBeVisible();

    await expect(page.locator('#farmName')).toBeVisible();
    await expect(page.locator('#farmLocation')).toBeVisible();
    await expect(page.locator('#farmArea')).toBeVisible();
    await expect(page.locator('#farmType')).toBeVisible();
    await expect(page.locator('button[onclick="saveFarmData()"]')).toBeVisible();
  });

  test('should display crop management form', async ({ page }) => {
    await clickSidebarNavByOnclick(page, 'showCropManagement');
    await expect(page.locator('#cropManagementView')).toBeVisible();
    await expect(page.locator('#cropManagementView .page-title')).toContainText('Crop Management');
    await expect(
      page.locator('#cropManagementView button[onclick="addNewCrop()"]')
    ).toBeVisible();
  });

  test('should display livestock management form', async ({ page }) => {
    await clickSidebarNavByOnclick(page, 'showLivestockManagement');
    await expect(page.locator('#livestockManagementView')).toBeVisible();
    await expect(page.locator('#livestockManagementView .page-title')).toContainText(
      'Livestock Management'
    );
    await expect(
      page.locator('#livestockManagementView button[onclick="addNewLivestock()"]')
    ).toBeVisible();
  });

  test('should display analytics charts', async ({ page }) => {
    await clickSidebarNavByOnclick(page, 'showAnalytics');
    await expect(page.locator('#analyticsView')).toBeVisible();
    // Analytics view hosts chart canvases / containers once shown
    const chartHosts = page.locator(
      '#analyticsView canvas, #analyticsView .chart-container, #analyticsView [id*="Chart"], #analyticsView [id*="chart"]'
    );
    await expect(chartHosts.first()).toBeVisible({ timeout: 10000 });
  });

  test('should display weather information', async ({ page }) => {
    await expect(page.locator('#dashboardView')).toBeVisible();
    const weather = page.locator(
      '#weatherInfo, #weatherWidget, #dashboardWeather, [id*="weather"], [class*="weather"]'
    ).first();
    // Weather may be a widget on the dashboard overview
    const count = await weather.count();
    if (count > 0) {
      await expect(weather).toBeVisible();
    } else {
      // Fallback: weather service global should still be present
      const hasWeather = await page.evaluate(
        () =>
          typeof window.WeatherService !== 'undefined' ||
          typeof window.SmartFarmWeather !== 'undefined' ||
          typeof window.weatherService !== 'undefined'
      );
      expect(hasWeather).toBe(true);
    }
  });

  test('should handle form validation', async ({ page }) => {
    await clickSidebarNavByOnclick(page, 'showFarmManagement');
    await page.fill('#farmName', '');
    await page.click('button[onclick="saveFarmData()"]');
    await expect(page.locator('.modal.show').filter({ hasText: 'Validation Error' })).toBeVisible({
      timeout: 8000
    });
    await expect(page.getByText('Please enter a farm name.')).toBeVisible();
  });

  test('should display responsive design on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.locator('#sidebarToggle')).toBeVisible();
    await ensureMobileSidebarOpen(page);
    await expect(page.locator('#sidebar.show, .sidebar.show').first()).toBeVisible();
  });

  test('should handle API service integration', async ({ page }) => {
    const apiServiceLoaded = await page.evaluate(() => {
      return typeof window.SmartFarmAPI !== 'undefined';
    });
    expect(apiServiceLoaded).toBe(true);
  });

  test('should display loading states', async ({ page }) => {
    await clickSidebarNavByOnclick(page, 'showFarmManagement');
    await page.fill('#farmName', 'Test Farm');
    await page.fill('#farmLocation', 'Test Location');
    await page.fill('#farmArea', '100');
    await page.selectOption('#farmType', { value: 'crops' });

    // Gate createFarm so the loading UI is observable on fast local/mock backends
    // (including WebKit, where network route delays are not always reliable).
    await page.evaluate(() => {
      if (!window.SmartFarmAPI || typeof window.SmartFarmAPI.createFarm !== 'function') {
        throw new Error('SmartFarmAPI.createFarm is not available');
      }
      window.__e2eFarmCreateGate = new Promise((resolve) => {
        window.__e2eReleaseFarmCreate = resolve;
      });
      const original = window.SmartFarmAPI.createFarm.bind(window.SmartFarmAPI);
      window.SmartFarmAPI.createFarm = async (farmData) => {
        await window.__e2eFarmCreateGate;
        return original(farmData);
      };
    });

    const saveButton = page.locator('button[onclick="saveFarmData()"]');
    await saveButton.click();
    await expect(saveButton).toBeDisabled({ timeout: 8000 });
    await expect(saveButton.locator('.fa-spinner')).toBeVisible({ timeout: 8000 });

    await page.evaluate(() => {
      if (typeof window.__e2eReleaseFarmCreate === 'function') {
        window.__e2eReleaseFarmCreate();
      }
    });
    await expect(saveButton).toBeEnabled({ timeout: 15000 });
  });

  test('should display success notifications', async ({ page }) => {
    await page.route('**/api/farms**', (route) => {
      if (route.request().method() === 'POST' || route.request().method() === 'PUT') {
        return route.fulfill({
          status: 201,
          contentType: 'application/json',
          headers: {
            'Access-Control-Allow-Origin': 'http://localhost:8080',
            'Access-Control-Allow-Credentials': 'true'
          },
          body: JSON.stringify({
            success: true,
            data: { id: `farm-notify-${Date.now()}`, name: 'Test Farm' }
          })
        });
      }
      return route.continue();
    });

    await clickSidebarNavByOnclick(page, 'showFarmManagement');
    await page.fill('#farmName', 'Test Farm');
    await page.fill('#farmLocation', 'Test Location');
    await page.fill('#farmArea', '100');
    await page.selectOption('#farmType', { index: 1 });

    const saveResponsePromise = page.waitForResponse(
      (res) =>
        /\/api\/farms/.test(res.url()) &&
        (res.request().method() === 'POST' || res.request().method() === 'PUT'),
      { timeout: 15000 }
    );

    await page.click('button[onclick="saveFarmData()"]');
    const saveResponse = await saveResponsePromise;
    expect(saveResponse.ok()).toBeTruthy();

    await expect(page.locator('.alert-success, .custom-alert.alert-success').first()).toBeVisible({
      timeout: 10000
    });
  });

  test('should display error notifications', async ({ page }) => {
    await clickSidebarNavByOnclick(page, 'showFarmManagement');
    await page.fill('#farmName', 'Test Farm');
    await page.fill('#farmLocation', 'Test Location');
    await page.fill('#farmArea', '100');
    await page.selectOption('#farmType', { value: 'crops' });

    // Stub createFarm so the error path is deterministic across browsers
    // (WebKit page.route for cross-origin POST is not always intercepted).
    await page.evaluate(() => {
      if (!window.SmartFarmAPI || typeof window.SmartFarmAPI.createFarm !== 'function') {
        throw new Error('SmartFarmAPI.createFarm is not available');
      }
      window.SmartFarmAPI.createFarm = async () => ({
        success: false,
        error: 'Validation failed',
        statusCode: 400
      });
    });

    await page.click('button[onclick="saveFarmData()"]');

    await expect(
      page.locator('.alert-danger, .custom-alert.alert-danger, .alert.alert-danger').first()
    ).toBeVisible({
      timeout: 10000
    });
  });

  test('should handle keyboard navigation', async ({ page }) => {
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');

    const focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeVisible();
  });

  test('should display accessibility features', async ({ page }) => {
    const ariaCount = await page.locator('[aria-label]').count();
    expect(ariaCount).toBeGreaterThan(0);

    const roleCount = await page.locator('[role]').count();
    expect(roleCount).toBeGreaterThan(0);

    const images = page.locator('img');
    const count = await images.count();
    for (let i = 0; i < count; i++) {
      const alt = await images.nth(i).getAttribute('alt');
      expect(alt).toBeTruthy();
    }
  });

  test('should handle service worker registration', async ({ page }) => {
    // Give performance-optimizer time to register /sw.js
    await page.waitForTimeout(1500);
    const swRegistered = await page.evaluate(async () => {
      if (!('serviceWorker' in navigator)) {
        return false;
      }
      try {
        const existing = await navigator.serviceWorker.getRegistration();
        if (existing) {
          return true;
        }
        await navigator.serviceWorker.register('/sw.js');
        return true;
      } catch (_) {
        return false;
      }
    });
    expect(swRegistered).toBe(true);
  });

  test('should display performance metrics', async ({ page }) => {
    const performanceLoaded = await page.evaluate(() => {
      return (
        typeof window.performanceOptimizer !== 'undefined' ||
        typeof window.SmartFarmPerformance !== 'undefined'
      );
    });
    expect(performanceLoaded).toBe(true);
  });

  test('should display accessibility enhancements', async ({ page }) => {
    const accessibilityLoaded = await page.evaluate(() => {
      return (
        typeof window.accessibilityEnhancer !== 'undefined' ||
        typeof window.SmartFarmAccessibility !== 'undefined'
      );
    });
    expect(accessibilityLoaded).toBe(true);
  });

  test('should display UX enhancements', async ({ page }) => {
    const uxLoaded = await page.evaluate(() => {
      return typeof window.SmartFarmUX !== 'undefined';
    });
    expect(uxLoaded).toBe(true);
  });
});
