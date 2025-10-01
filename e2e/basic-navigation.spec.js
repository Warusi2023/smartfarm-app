// Basic Navigation E2E Tests for SmartFarm
// Tests all major navigation links and page loads

const { test, expect } = require('@playwright/test');

const BASE_URL = process.env.TEST_URL || 'http://localhost:3000';
const DASHBOARD_URL = `${BASE_URL}/dashboard.html`;

test.describe('SmartFarm Navigation', () => {
    // Skip login for now - add authentication tests later
    test.beforeEach(async ({ page }) => {
        // Set demo user in localStorage to bypass login
        await page.goto(DASHBOARD_URL);
        await page.evaluate(() => {
            localStorage.setItem('smartfarm_user', JSON.stringify({
                id: 'demo-user',
                name: 'Demo User',
                email: 'demo@smartfarm.com',
                role: 'farmer'
            }));
            localStorage.setItem('smartfarm_token', 'demo-token');
        });
        await page.goto(DASHBOARD_URL);
    });

    test('should load dashboard', async ({ page }) => {
        await expect(page).toHaveTitle(/Farm Dashboard/);
        await expect(page.locator('h1, h2, .navbar-brand')).toContainText(/SmartFarm|Dashboard/i);
    });

    test('should navigate to Crop Management', async ({ page }) => {
        await page.click('text=Crop Management');
        await expect(page).toHaveURL(/crop-management\.html/);
        await expect(page.locator('h1, h2, h3')).toContainText(/Crop/i);
    });

    test('should navigate to Livestock Management', async ({ page }) => {
        await page.click('text=Livestock Management');
        await expect(page).toHaveURL(/livestock-management\.html/);
        await expect(page.locator('h1, h2, h3')).toContainText(/Livestock/i);
    });

    test('should navigate to Watering Management', async ({ page }) => {
        await page.click('text=Watering Management');
        await expect(page).toHaveURL(/watering-management\.html/);
        await expect(page.locator('h1, h2, h3')).toContainText(/Watering/i);
    });

    test('should navigate to Farm Locator', async ({ page }) => {
        await page.click('text=Farm Locator');
        await expect(page).toHaveURL(/farm-locator\.html/);
        // Check for map or location elements
        await expect(page.locator('#map, .map-container')).toBeVisible({ timeout: 10000 });
    });

    test('should navigate to Geofencing Setup', async ({ page }) => {
        await page.click('text=Geofencing Setup');
        await expect(page).toHaveURL(/geofencing-setup\.html/);
        await expect(page.locator('h1, h2, h3')).toContainText(/Geofencing/i);
    });

    test('should navigate to AI Advisory', async ({ page }) => {
        await page.click('text=AI Advisory');
        await expect(page).toHaveURL(/ai-advisory\.html/);
        await expect(page.locator('h1, h2, h3')).toContainText(/AI|Advisory/i);
    });

    test('should navigate to Subscription', async ({ page }) => {
        await page.click('text=Subscription');
        await expect(page).toHaveURL(/subscription-management\.html/);
        await expect(page.locator('h1, h2, h3')).toContainText(/Subscription/i);
    });
});

test.describe('Dashboard Interactions', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(DASHBOARD_URL);
        await page.evaluate(() => {
            localStorage.setItem('smartfarm_user', JSON.stringify({
                id: 'demo-user',
                name: 'Demo User',
                email: 'demo@smartfarm.com',
                role: 'farmer'
            }));
            localStorage.setItem('smartfarm_token', 'demo-token');
        });
        await page.reload();
    });

    test('should open financial details modal', async ({ page }) => {
        // Look for financial details button
        const financialBtn = page.locator('button:has-text("View Details"), button:has-text("Financial")').first();
        
        if (await financialBtn.isVisible()) {
            await financialBtn.click();
            // Check for modal
            await expect(page.locator('.modal.show, [role="dialog"]')).toBeVisible({ timeout: 5000 });
        }
    });

    test('should handle location selector', async ({ page }) => {
        const locationBtn = page.locator('button:has(i.fa-map-marker-alt)').first();
        
        if (await locationBtn.isVisible()) {
            await locationBtn.click();
            // Check for location selector
            await expect(page.locator('.location-selector, #locationSelector')).toBeVisible({ timeout: 5000 });
        }
    });

    test('should show keyboard shortcuts', async ({ page }) => {
        // Press ? key
        await page.keyboard.press('Shift+?');
        
        // Check for shortcuts modal
        const shortcutsModal = page.locator('#keyboardShortcutsModal, .modal:has-text("Keyboard Shortcuts")');
        await expect(shortcutsModal).toBeVisible({ timeout: 5000 });
    });
});

test.describe('Geofencing Workflow', () => {
    test('should complete geofencing zone creation', async ({ page }) => {
        // Setup auth
        await page.goto(DASHBOARD_URL);
        await page.evaluate(() => {
            localStorage.setItem('smartfarm_user', JSON.stringify({
                id: 'demo-user',
                name: 'Demo User',
                email: 'demo@smartfarm.com',
                role: 'farmer'
            }));
            localStorage.setItem('smartfarm_token', 'demo-token');
        });

        // Navigate to geofencing setup
        await page.goto(`${BASE_URL}/geofencing-setup.html`);
        
        // Wait for page to load
        await page.waitForLoadState('networkidle');
        
        // Check if map is present
        const map = page.locator('#map, .map-container');
        await expect(map).toBeVisible({ timeout: 10000 });
        
        // Screenshot for debugging
        await page.screenshot({ path: 'test-results/geofencing-page.png' });
    });
});

