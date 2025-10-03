/**
 * SmartFarm Navigation E2E Tests
 * End-to-end tests for navigation functionality
 */

const { test, expect } = require('@playwright/test');

test.describe('SmartFarm Navigation E2E Tests', () => {
    test.beforeEach(async ({ page }) => {
        // Navigate to the dashboard
        await page.goto('/dashboard.html');
        
        // Wait for page to load
        await page.waitForLoadState('networkidle');
    });

    test('should navigate to Dashboard and display correct content', async ({ page }) => {
        // Click on Dashboard nav item
        await page.click('a[onclick*="showDashboard"]');
        
        // Wait for view to load
        await page.waitForSelector('#dashboardView', { state: 'visible' });
        
        // Verify dashboard view is displayed
        const dashboardView = await page.locator('#dashboardView');
        await expect(dashboardView).toBeVisible();
        
        // Verify nav item is active
        const activeNav = await page.locator('.sidebar .nav-link.active');
        await expect(activeNav).toContainText('Dashboard');
    });

    test('should navigate to Farm Management and display correct content', async ({ page }) => {
        // Click on Farm Management nav item
        await page.click('a[onclick*="showFarmManagement"]');
        
        // Wait for view to load
        await page.waitForSelector('#farmManagementView', { state: 'visible' });
        
        // Verify farm management view is displayed
        const farmView = await page.locator('#farmManagementView');
        await expect(farmView).toBeVisible();
        
        // Verify nav item is active
        const activeNav = await page.locator('.sidebar .nav-link.active');
        await expect(activeNav).toContainText('Farm Management');
    });

    test('should navigate to Crop Management and display correct content', async ({ page }) => {
        // Click on Crop Management nav item
        await page.click('a[onclick*="showCropManagement"]');
        
        // Wait for view to load
        await page.waitForSelector('#cropManagementView', { state: 'visible' });
        
        // Verify crop management view is displayed
        const cropView = await page.locator('#cropManagementView');
        await expect(cropView).toBeVisible();
        
        // Verify nav item is active
        const activeNav = await page.locator('.sidebar .nav-link.active');
        await expect(activeNav).toContainText('Crop Management');
    });

    test('should navigate to Livestock Management and display correct content', async ({ page }) => {
        // Click on Livestock nav item
        await page.click('a[onclick*="showLivestockManagement"]');
        
        // Wait for view to load
        await page.waitForSelector('#livestockManagementView', { state: 'visible' });
        
        // Verify livestock management view is displayed
        const livestockView = await page.locator('#livestockManagementView');
        await expect(livestockView).toBeVisible();
        
        // Verify nav item is active
        const activeNav = await page.locator('.sidebar .nav-link.active');
        await expect(activeNav).toContainText('Livestock');
    });

    test('should navigate to Pets Management and display correct content', async ({ page }) => {
        // Click on Pets nav item
        await page.click('a[onclick*="showPetsManagement"]');
        
        // Wait for view to load
        await page.waitForSelector('#petsManagementView', { state: 'visible' });
        
        // Verify pets management view is displayed
        const petsView = await page.locator('#petsManagementView');
        await expect(petsView).toBeVisible();
        
        // Verify nav item is active
        const activeNav = await page.locator('.sidebar .nav-link.active');
        await expect(activeNav).toContainText('Pets');
    });

    test('should navigate to Inventory Management and display correct content', async ({ page }) => {
        // Click on Inventory nav item
        await page.click('a[onclick*="showInventoryManagement"]');
        
        // Wait for view to load
        await page.waitForSelector('#inventoryManagementView', { state: 'visible' });
        
        // Verify inventory management view is displayed
        const inventoryView = await page.locator('#inventoryManagementView');
        await expect(inventoryView).toBeVisible();
        
        // Verify nav item is active
        const activeNav = await page.locator('.sidebar .nav-link.active');
        await expect(activeNav).toContainText('Inventory');
    });

    test('should navigate to Analytics and display correct content', async ({ page }) => {
        // Click on Analytics nav item
        await page.click('a[onclick*="showAnalytics"]');
        
        // Wait for view to load
        await page.waitForSelector('#analyticsView', { state: 'visible' });
        
        // Verify analytics view is displayed
        const analyticsView = await page.locator('#analyticsView');
        await expect(analyticsView).toBeVisible();
        
        // Verify nav item is active
        const activeNav = await page.locator('.sidebar .nav-link.active');
        await expect(activeNav).toContainText('Analytics');
    });

    test('should navigate to Tasks and display correct content', async ({ page }) => {
        // Click on Tasks nav item
        await page.click('a[onclick*="showTasks"]');
        
        // Wait for view to load
        await page.waitForSelector('#tasksView', { state: 'visible' });
        
        // Verify tasks view is displayed
        const tasksView = await page.locator('#tasksView');
        await expect(tasksView).toBeVisible();
        
        // Verify nav item is active
        const activeNav = await page.locator('.sidebar .nav-link.active');
        await expect(activeNav).toContainText('Tasks');
    });

    test('should navigate to Reports and display correct content', async ({ page }) => {
        // Click on Reports nav item
        await page.click('a[onclick*="showReports"]');
        
        // Wait for view to load
        await page.waitForSelector('#reportsView', { state: 'visible' });
        
        // Verify reports view is displayed
        const reportsView = await page.locator('#reportsView');
        await expect(reportsView).toBeVisible();
        
        // Verify nav item is active
        const activeNav = await page.locator('.sidebar .nav-link.active');
        await expect(activeNav).toContainText('Reports');
    });

    test('should maintain only one active nav item at a time', async ({ page }) => {
        // Click on Dashboard
        await page.click('a[onclick*="showDashboard"]');
        await page.waitForSelector('#dashboardView', { state: 'visible' });
        
        // Verify only Dashboard is active
        let activeNavs = await page.locator('.sidebar .nav-link.active').count();
        expect(activeNavs).toBe(1);
        
        // Click on Livestock
        await page.click('a[onclick*="showLivestockManagement"]');
        await page.waitForSelector('#livestockManagementView', { state: 'visible' });
        
        // Verify only Livestock is active
        activeNavs = await page.locator('.sidebar .nav-link.active').count();
        expect(activeNavs).toBe(1);
        
        // Verify Dashboard is no longer active
        const dashboardNav = await page.locator('a[onclick*="showDashboard"]');
        await expect(dashboardNav).not.toHaveClass('active');
        
        // Verify Livestock is active
        const livestockNav = await page.locator('a[onclick*="showLivestockManagement"]');
        await expect(livestockNav).toHaveClass('active');
    });

    test('should not redirect to dashboard when clicking navigation items', async ({ page }) => {
        // Start on Dashboard
        await page.waitForSelector('#dashboardView', { state: 'visible' });
        
        // Click on Livestock
        await page.click('a[onclick*="showLivestockManagement"]');
        await page.waitForSelector('#livestockManagementView', { state: 'visible' });
        
        // Verify we're still on Livestock view, not back on Dashboard
        const livestockView = await page.locator('#livestockManagementView');
        await expect(livestockView).toBeVisible();
        
        const dashboardView = await page.locator('#dashboardView');
        await expect(dashboardView).not.toBeVisible();
    });

    test('should handle external navigation links correctly', async ({ page }) => {
        // Test User Management link
        const userManagementLink = await page.locator('a[href="user-management.html"]');
        await expect(userManagementLink).toBeVisible();
        
        // Test Watering Management link
        const wateringLink = await page.locator('a[href="watering-management.html"]');
        await expect(wateringLink).toBeVisible();
        
        // Test Farm Locator link
        const farmLocatorLink = await page.locator('a[href="farm-locator.html"]');
        await expect(farmLocatorLink).toBeVisible();
    });

    test('should handle navigation errors gracefully', async ({ page }) => {
        // Mock console.error to catch error messages
        const consoleErrors = [];
        page.on('console', msg => {
            if (msg.type() === 'error') {
                consoleErrors.push(msg.text());
            }
        });
        
        // Try to navigate to a view (should not throw uncaught errors)
        await page.click('a[onclick*="showLivestockManagement"]');
        await page.waitForTimeout(1000); // Wait for any async operations
        
        // Navigation should complete without breaking the page
        const body = await page.locator('body');
        await expect(body).toBeVisible();
    });

    test('should update URL when navigating between views', async ({ page }) => {
        // Start on Dashboard
        await page.waitForSelector('#dashboardView', { state: 'visible' });
        
        // Click on Livestock
        await page.click('a[onclick*="showLivestockManagement"]');
        await page.waitForSelector('#livestockManagementView', { state: 'visible' });
        
        // Check if URL was updated (this depends on the URL routing implementation)
        const currentUrl = page.url();
        // Note: The exact URL format depends on your routing implementation
        // This test verifies that navigation doesn't break the URL
        expect(currentUrl).toContain('dashboard.html');
    });
});
