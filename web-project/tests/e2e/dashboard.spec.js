/**
 * E2E Tests for SmartFarm Dashboard
 */

const { test, expect } = require('@playwright/test');
const { gotoDashboardReady } = require('./helpers/dashboard-ready');

test.describe('SmartFarm Dashboard', () => {
  test.beforeEach(async ({ page }) => {
    await gotoDashboardReady(page);
  });

  test('should load the dashboard successfully', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('SmartFarm Dashboard');
    await expect(page.locator('.navbar')).toBeVisible();
    await expect(page.locator('.sidebar')).toBeVisible();
    await expect(page.locator('.main-content')).toBeVisible();
  });

  test('should display navigation menu', async ({ page }) => {
    await expect(page.locator('a[href="#overview"]')).toBeVisible();
    await expect(page.locator('a[href="#farms"]')).toBeVisible();
    await expect(page.locator('a[href="#crops"]')).toBeVisible();
    await expect(page.locator('a[href="#livestock"]')).toBeVisible();
    await expect(page.locator('a[href="#analytics"]')).toBeVisible();
    await expect(page.locator('a[href="#weather"]')).toBeVisible();
  });

  test('should navigate between sections', async ({ page }) => {
    await page.click('a[href="#farms"]');
    await expect(page.locator('#farms')).toBeVisible();
    
    await page.click('a[href="#crops"]');
    await expect(page.locator('#crops')).toBeVisible();
    
    await page.click('a[href="#livestock"]');
    await expect(page.locator('#livestock')).toBeVisible();
    
    await page.click('a[href="#analytics"]');
    await expect(page.locator('#analytics')).toBeVisible();
  });

  test('should display farm management form', async ({ page }) => {
    await page.click('a[href="#farms"]');
    
    await expect(page.locator('#farmName')).toBeVisible();
    await expect(page.locator('#farmLocation')).toBeVisible();
    await expect(page.locator('#farmArea')).toBeVisible();
    await expect(page.locator('#farmType')).toBeVisible();
    await expect(page.locator('button[onclick="saveFarmData()"]')).toBeVisible();
  });

  test('should display crop management form', async ({ page }) => {
    await page.click('a[href="#crops"]');
    
    await expect(page.locator('#cropName')).toBeVisible();
    await expect(page.locator('#cropType')).toBeVisible();
    await expect(page.locator('#plantedDate')).toBeVisible();
    await expect(page.locator('#harvestDate')).toBeVisible();
    await expect(page.locator('#cropArea')).toBeVisible();
  });

  test('should display livestock management form', async ({ page }) => {
    await page.click('a[href="#livestock"]');
    
    await expect(page.locator('#livestockType')).toBeVisible();
    await expect(page.locator('#breed')).toBeVisible();
    await expect(page.locator('#quantity')).toBeVisible();
    await expect(page.locator('#healthNotes')).toBeVisible();
  });

  test('should display analytics charts', async ({ page }) => {
    await page.click('a[href="#analytics"]');
    
    await expect(page.locator('#farmAnalyticsChart')).toBeVisible();
    await expect(page.locator('#cropAnalyticsChart')).toBeVisible();
    await expect(page.locator('#livestockAnalyticsChart')).toBeVisible();
  });

  test('should display weather information', async ({ page }) => {
    await page.click('a[href="#weather"]');
    
    await expect(page.locator('#weatherInfo')).toBeVisible();
    await expect(page.locator('#weatherChart')).toBeVisible();
  });

  test('should handle form validation', async ({ page }) => {
    await page.click('a[href="#farms"]');
    
    await page.click('button[onclick="saveFarmData()"]');
    
    await expect(page.locator('.invalid-feedback')).toBeVisible();
  });

  test('should display responsive design on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    
    await expect(page.locator('.navbar-toggler')).toBeVisible();
    
    await page.click('.navbar-toggler');
    await expect(page.locator('.sidebar')).toBeVisible();
  });

  test('should handle API service integration', async ({ page }) => {
    const apiServiceLoaded = await page.evaluate(() => {
      return typeof window.SmartFarmAPI !== 'undefined';
    });
    expect(apiServiceLoaded).toBe(true);
  });

  test('should display loading states', async ({ page }) => {
    await page.click('a[href="#farms"]');
    
    await page.fill('#farmName', 'Test Farm');
    await page.fill('#farmLocation', 'Test Location');
    await page.fill('#farmArea', '100');
    await page.selectOption('#farmType', 'Mixed');
    
    await page.click('button[onclick="saveFarmData()"]');
    
    await expect(page.locator('.fa-spinner')).toBeVisible();
  });

  test('should display success notifications', async ({ page }) => {
    await page.route('**/api/farms', route => {
      route.fulfill({
        status: 201,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          data: { id: 1, name: 'Test Farm' }
        })
      });
    });
    
    await page.click('a[href="#farms"]');
    await page.fill('#farmName', 'Test Farm');
    await page.fill('#farmLocation', 'Test Location');
    await page.fill('#farmArea', '100');
    await page.selectOption('#farmType', 'Mixed');
    await page.click('button[onclick="saveFarmData()"]');
    
    await expect(page.locator('.alert-success')).toBeVisible();
  });

  test('should display error notifications', async ({ page }) => {
    await page.route('**/api/farms', route => {
      route.fulfill({
        status: 400,
        contentType: 'application/json',
        body: JSON.stringify({
          success: false,
          error: 'Validation failed'
        })
      });
    });
    
    await page.click('a[href="#farms"]');
    await page.fill('#farmName', 'Test Farm');
    await page.fill('#farmLocation', 'Test Location');
    await page.fill('#farmArea', '100');
    await page.selectOption('#farmType', 'Mixed');
    await page.click('button[onclick="saveFarmData()"]');
    
    await expect(page.locator('.alert-danger')).toBeVisible();
  });

  test('should handle keyboard navigation', async ({ page }) => {
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    
    const focusedElement = await page.locator(':focus');
    await expect(focusedElement).toBeVisible();
  });

  test('should display accessibility features', async ({ page }) => {
    // Playwright toHaveCount expects a number, not { min: n }
    const ariaCount = await page.locator('[aria-label]').count();
    expect(ariaCount).toBeGreaterThan(0);

    const roleCount = await page.locator('[role]').count();
    expect(roleCount).toBeGreaterThan(0);
    
    const images = await page.locator('img').all();
    for (const img of images) {
      const alt = await img.getAttribute('alt');
      expect(alt).toBeTruthy();
    }
  });

  test('should handle service worker registration', async ({ page }) => {
    const swRegistered = await page.evaluate(async () => {
      if ('serviceWorker' in navigator) {
        const registration = await navigator.serviceWorker.getRegistration();
        return registration !== undefined;
      }
      return false;
    });
    expect(swRegistered).toBe(true);
  });

  test('should display performance metrics', async ({ page }) => {
    // Script exposes window.performanceOptimizer
    const performanceLoaded = await page.evaluate(() => {
      return typeof window.performanceOptimizer !== 'undefined' ||
        typeof window.SmartFarmPerformance !== 'undefined';
    });
    expect(performanceLoaded).toBe(true);
  });

  test('should display accessibility enhancements', async ({ page }) => {
    // Script exposes window.accessibilityEnhancer
    const accessibilityLoaded = await page.evaluate(() => {
      return typeof window.accessibilityEnhancer !== 'undefined' ||
        typeof window.SmartFarmAccessibility !== 'undefined';
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
