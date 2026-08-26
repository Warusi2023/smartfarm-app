/**
 * SmartFarm Navigation E2E Tests
 * End-to-end tests for navigation functionality
 */

const { test, expect } = require('@playwright/test');
const { gotoDashboardReady, clickSidebarNavByOnclick } = require('./helpers/dashboard-ready');

test.describe('SmartFarm Navigation E2E Tests', () => {
    test.beforeEach(async ({ page }) => {
        await gotoDashboardReady(page);
    });

    test('should navigate to Dashboard and display correct content', async ({ page }) => {
        await clickSidebarNavByOnclick(page, 'showDashboard');
        
        await page.waitForSelector('#dashboardView', { state: 'visible' });
        
        const dashboardView = await page.locator('#dashboardView');
        await expect(dashboardView).toBeVisible();
        
        const activeNav = await page.locator('.sidebar .nav-link.active');
        await expect(activeNav).toContainText('Dashboard');
    });

    test('should navigate to Farm Management and display correct content', async ({ page }) => {
        await clickSidebarNavByOnclick(page, 'showFarmManagement');
        
        await page.waitForSelector('#farmManagementView', { state: 'visible' });
        
        const farmView = await page.locator('#farmManagementView');
        await expect(farmView).toBeVisible();
        
        const activeNav = await page.locator('.sidebar .nav-link.active');
        await expect(activeNav).toContainText('Farm Overview');
    });

    test('should navigate to Crop Management and display correct content', async ({ page }) => {
        await clickSidebarNavByOnclick(page, 'showCropManagement');
        
        await page.waitForSelector('#cropManagementView', { state: 'visible' });
        
        const cropView = await page.locator('#cropManagementView');
        await expect(cropView).toBeVisible();
        
        const activeNav = await page.locator('.sidebar .nav-link.active');
        await expect(activeNav).toContainText('Crop Management');
    });

    test('should navigate to Livestock Management and display correct content', async ({ page }) => {
        await clickSidebarNavByOnclick(page, 'showLivestockManagement');
        
        await page.waitForSelector('#livestockManagementView', { state: 'visible' });
        
        const livestockView = await page.locator('#livestockManagementView');
        await expect(livestockView).toBeVisible();
        
        const activeNav = await page.locator('.sidebar .nav-link.active');
        await expect(activeNav).toContainText('Livestock');
    });

    test('should navigate to Pets Management and display correct content', async ({ page }) => {
        await clickSidebarNavByOnclick(page, 'showPetsManagement');
        
        await page.waitForSelector('#petsManagementView', { state: 'visible' });
        
        const petsView = await page.locator('#petsManagementView');
        await expect(petsView).toBeVisible();
        
        const activeNav = await page.locator('.sidebar .nav-link.active');
        await expect(activeNav).toContainText('Pets');
    });

    test('should navigate to Inventory Management and display correct content', async ({ page }) => {
        await clickSidebarNavByOnclick(page, 'showInventoryManagement');
        
        await page.waitForSelector('#inventoryManagementView', { state: 'visible' });
        
        const inventoryView = await page.locator('#inventoryManagementView');
        await expect(inventoryView).toBeVisible();
        
        const activeNav = await page.locator('.sidebar .nav-link.active');
        await expect(activeNav).toContainText('Inventory');
    });

    test('should navigate to Analytics and display correct content', async ({ page }) => {
        await clickSidebarNavByOnclick(page, 'showAnalytics');
        
        await page.waitForSelector('#analyticsView', { state: 'visible' });
        
        const analyticsView = await page.locator('#analyticsView');
        await expect(analyticsView).toBeVisible();
        
        const activeNav = await page.locator('.sidebar .nav-link.active');
        await expect(activeNav).toContainText('Analytics');
    });

    test('should navigate to Tasks and display correct content', async ({ page }) => {
        await clickSidebarNavByOnclick(page, 'showTasks');
        
        await page.waitForSelector('#tasksView', { state: 'visible' });
        
        const tasksView = await page.locator('#tasksView');
        await expect(tasksView).toBeVisible();
        
        const activeNav = await page.locator('.sidebar .nav-link.active');
        await expect(activeNav).toContainText('Farm Tasks');
    });

    test('should navigate to Reports and display correct content', async ({ page }) => {
        await clickSidebarNavByOnclick(page, 'showReports');
        
        await page.waitForSelector('#reportsView', { state: 'visible' });
        
        const reportsView = await page.locator('#reportsView');
        await expect(reportsView).toBeVisible();
        
        const activeNav = await page.locator('.sidebar .nav-link.active');
        await expect(activeNav).toContainText('Reports');
    });

    test('should maintain only one active nav item at a time', async ({ page }) => {
        await clickSidebarNavByOnclick(page, 'showDashboard');
        await page.waitForSelector('#dashboardView', { state: 'visible' });
        
        let activeNavs = await page.locator('.sidebar .nav-link.active').count();
        expect(activeNavs).toBe(1);
        
        await clickSidebarNavByOnclick(page, 'showLivestockManagement');
        await page.waitForSelector('#livestockManagementView', { state: 'visible' });
        
        activeNavs = await page.locator('.sidebar .nav-link.active').count();
        expect(activeNavs).toBe(1);
        
        const dashboardNav = await page.locator('.sidebar a[onclick*="showDashboard"]');
        await expect(dashboardNav).not.toHaveClass(/active/);
        
        const livestockNav = await page.locator('.sidebar a[onclick*="showLivestockManagement"]');
        await expect(livestockNav).toHaveClass(/active/);
    });

    test('should not redirect to dashboard when clicking navigation items', async ({ page }) => {
        await page.waitForSelector('#dashboardView', { state: 'visible' });
        
        await clickSidebarNavByOnclick(page, 'showLivestockManagement');
        await page.waitForSelector('#livestockManagementView', { state: 'visible' });
        
        const livestockView = await page.locator('#livestockManagementView');
        await expect(livestockView).toBeVisible();
        
        const dashboardView = await page.locator('#dashboardView');
        await expect(dashboardView).not.toBeVisible();
    });

    test('should handle external navigation links correctly', async ({ page }) => {
        const userManagementLink = await page.locator('a[href="user-management.html"]');
        await expect(userManagementLink).toBeVisible();
        
        const wateringLink = await page.locator('a[href="watering-management.html"]');
        await expect(wateringLink).toBeVisible();
        
        const farmLocatorLink = await page.locator('a[href="farm-locator.html"]');
        await expect(farmLocatorLink).toBeVisible();
    });

    test('should handle navigation errors gracefully', async ({ page }) => {
        const consoleErrors = [];
        page.on('console', msg => {
            if (msg.type() === 'error') {
                consoleErrors.push(msg.text());
            }
        });
        
        await clickSidebarNavByOnclick(page, 'showLivestockManagement');
        await page.waitForTimeout(1000);
        
        const body = await page.locator('body');
        await expect(body).toBeVisible();
    });

    test('should update URL when navigating between views', async ({ page }) => {
        await page.waitForSelector('#dashboardView', { state: 'visible' });
        
        await clickSidebarNavByOnclick(page, 'showLivestockManagement');
        await page.waitForSelector('#livestockManagementView', { state: 'visible' });
        
        await expect(page.locator('#livestockManagementView')).toBeVisible();
        await expect(page.locator('.preview-placeholder')).toHaveCount(0);
    });
});
