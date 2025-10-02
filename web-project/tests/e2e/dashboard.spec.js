/**
 * E2E Tests for SmartFarm Dashboard
 */

const { test, expect } = require('@playwright/test');

test.describe('SmartFarm Dashboard', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the dashboard
    await page.goto('/dashboard.html');
    
    // Wait for the page to load
    await page.waitForLoadState('networkidle');
  });

  test('should load the dashboard successfully', async ({ page }) => {
    // Check if the main dashboard elements are present
    await expect(page.locator('h1')).toContainText('SmartFarm Dashboard');
    await expect(page.locator('.navbar')).toBeVisible();
    await expect(page.locator('.sidebar')).toBeVisible();
    await expect(page.locator('.main-content')).toBeVisible();
  });

  test('should display navigation menu', async ({ page }) => {
    // Check navigation items
    await expect(page.locator('a[href="#overview"]')).toBeVisible();
    await expect(page.locator('a[href="#farms"]')).toBeVisible();
    await expect(page.locator('a[href="#crops"]')).toBeVisible();
    await expect(page.locator('a[href="#livestock"]')).toBeVisible();
    await expect(page.locator('a[href="#analytics"]')).toBeVisible();
    await expect(page.locator('a[href="#weather"]')).toBeVisible();
  });

  test('should navigate between sections', async ({ page }) => {
    // Test navigation to farms section
    await page.click('a[href="#farms"]');
    await expect(page.locator('#farms')).toBeVisible();
    
    // Test navigation to crops section
    await page.click('a[href="#crops"]');
    await expect(page.locator('#crops')).toBeVisible();
    
    // Test navigation to livestock section
    await page.click('a[href="#livestock"]');
    await expect(page.locator('#livestock')).toBeVisible();
    
    // Test navigation to analytics section
    await page.click('a[href="#analytics"]');
    await expect(page.locator('#analytics')).toBeVisible();
  });

  test('should display farm management form', async ({ page }) => {
    // Navigate to farms section
    await page.click('a[href="#farms"]');
    
    // Check if farm form elements are present
    await expect(page.locator('#farmName')).toBeVisible();
    await expect(page.locator('#farmLocation')).toBeVisible();
    await expect(page.locator('#farmArea')).toBeVisible();
    await expect(page.locator('#farmType')).toBeVisible();
    await expect(page.locator('button[onclick="saveFarmData()"]')).toBeVisible();
  });

  test('should display crop management form', async ({ page }) => {
    // Navigate to crops section
    await page.click('a[href="#crops"]');
    
    // Check if crop form elements are present
    await expect(page.locator('#cropName')).toBeVisible();
    await expect(page.locator('#cropType')).toBeVisible();
    await expect(page.locator('#plantedDate')).toBeVisible();
    await expect(page.locator('#harvestDate')).toBeVisible();
    await expect(page.locator('#cropArea')).toBeVisible();
  });

  test('should display livestock management form', async ({ page }) => {
    // Navigate to livestock section
    await page.click('a[href="#livestock"]');
    
    // Check if livestock form elements are present
    await expect(page.locator('#livestockType')).toBeVisible();
    await expect(page.locator('#breed')).toBeVisible();
    await expect(page.locator('#quantity')).toBeVisible();
    await expect(page.locator('#healthNotes')).toBeVisible();
  });

  test('should display analytics charts', async ({ page }) => {
    // Navigate to analytics section
    await page.click('a[href="#analytics"]');
    
    // Check if charts are present
    await expect(page.locator('#farmAnalyticsChart')).toBeVisible();
    await expect(page.locator('#cropAnalyticsChart')).toBeVisible();
    await expect(page.locator('#livestockAnalyticsChart')).toBeVisible();
  });

  test('should display weather information', async ({ page }) => {
    // Navigate to weather section
    await page.click('a[href="#weather"]');
    
    // Check if weather elements are present
    await expect(page.locator('#weatherInfo')).toBeVisible();
    await expect(page.locator('#weatherChart')).toBeVisible();
  });

  test('should handle form validation', async ({ page }) => {
    // Navigate to farms section
    await page.click('a[href="#farms"]');
    
    // Try to submit empty form
    await page.click('button[onclick="saveFarmData()"]');
    
    // Check if validation errors are displayed
    await expect(page.locator('.invalid-feedback')).toBeVisible();
  });

  test('should display responsive design on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Check if mobile navigation is present
    await expect(page.locator('.navbar-toggler')).toBeVisible();
    
    // Check if sidebar is collapsible
    await page.click('.navbar-toggler');
    await expect(page.locator('.sidebar')).toBeVisible();
  });

  test('should handle API service integration', async ({ page }) => {
    // Check if API service is loaded
    const apiServiceLoaded = await page.evaluate(() => {
      return typeof window.SmartFarmAPI !== 'undefined';
    });
    expect(apiServiceLoaded).toBe(true);
  });

  test('should display loading states', async ({ page }) => {
    // Navigate to farms section
    await page.click('a[href="#farms"]');
    
    // Fill form and submit
    await page.fill('#farmName', 'Test Farm');
    await page.fill('#farmLocation', 'Test Location');
    await page.fill('#farmArea', '100');
    await page.selectOption('#farmType', 'Mixed');
    
    // Submit form and check for loading state
    await page.click('button[onclick="saveFarmData()"]');
    
    // Check if loading spinner is displayed
    await expect(page.locator('.fa-spinner')).toBeVisible();
  });

  test('should display success notifications', async ({ page }) => {
    // Mock successful API response
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
    
    // Navigate to farms section and submit form
    await page.click('a[href="#farms"]');
    await page.fill('#farmName', 'Test Farm');
    await page.fill('#farmLocation', 'Test Location');
    await page.fill('#farmArea', '100');
    await page.selectOption('#farmType', 'Mixed');
    await page.click('button[onclick="saveFarmData()"]');
    
    // Check if success notification is displayed
    await expect(page.locator('.alert-success')).toBeVisible();
  });

  test('should display error notifications', async ({ page }) => {
    // Mock error API response
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
    
    // Navigate to farms section and submit form
    await page.click('a[href="#farms"]');
    await page.fill('#farmName', 'Test Farm');
    await page.fill('#farmLocation', 'Test Location');
    await page.fill('#farmArea', '100');
    await page.selectOption('#farmType', 'Mixed');
    await page.click('button[onclick="saveFarmData()"]');
    
    // Check if error notification is displayed
    await expect(page.locator('.alert-danger')).toBeVisible();
  });

  test('should handle keyboard navigation', async ({ page }) => {
    // Test keyboard navigation
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    
    // Check if focus is visible
    const focusedElement = await page.locator(':focus');
    await expect(focusedElement).toBeVisible();
  });

  test('should display accessibility features', async ({ page }) => {
    // Check for ARIA labels
    await expect(page.locator('[aria-label]')).toHaveCount({ min: 1 });
    
    // Check for role attributes
    await expect(page.locator('[role]')).toHaveCount({ min: 1 });
    
    // Check for alt text on images
    const images = await page.locator('img').all();
    for (const img of images) {
      const alt = await img.getAttribute('alt');
      expect(alt).toBeTruthy();
    }
  });

  test('should handle service worker registration', async ({ page }) => {
    // Check if service worker is registered
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
    // Check if performance optimizer is loaded
    const performanceLoaded = await page.evaluate(() => {
      return typeof window.SmartFarmPerformance !== 'undefined';
    });
    expect(performanceLoaded).toBe(true);
  });

  test('should display accessibility enhancements', async ({ page }) => {
    // Check if accessibility enhancer is loaded
    const accessibilityLoaded = await page.evaluate(() => {
      return typeof window.SmartFarmAccessibility !== 'undefined';
    });
    expect(accessibilityLoaded).toBe(true);
  });

  test('should display UX enhancements', async ({ page }) => {
    // Check if UX enhancer is loaded
    const uxLoaded = await page.evaluate(() => {
      return typeof window.SmartFarmUX !== 'undefined';
    });
    expect(uxLoaded).toBe(true);
  });
});
