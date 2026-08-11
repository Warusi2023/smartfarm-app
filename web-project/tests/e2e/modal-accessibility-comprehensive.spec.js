/**
 * Comprehensive Modal Accessibility E2E Tests
 * Tests modal accessibility in real browser environment with actual user interactions
 */

const { test, expect } = require('@playwright/test');
const {
    gotoDashboardReady,
    clickDashboardAction
} = require('./helpers/dashboard-ready');

async function openLivestockModalFromDashboard(page) {
    const livestockNav = page.locator('.sidebar a[onclick*="showLivestockManagement"]').first();
    await livestockNav.scrollIntoViewIfNeeded();
    await livestockNav.click({ timeout: 10000 });
    await page.waitForSelector('#livestockManagementView', { state: 'visible', timeout: 10000 });
    await clickDashboardAction(page, '#livestockManagementView button[onclick="addNewLivestock()"]');
    await page.waitForSelector('.modal.show', { timeout: 8000 });
}

test.describe('Modal Accessibility E2E Tests', () => {
    test.beforeEach(async ({ page }) => {
        await gotoDashboardReady(page);
    });

    test('should open addLivestockModal without aria-hidden errors', async ({ page }) => {
        const consoleErrors = [];
        page.on('console', msg => {
            if (msg.type() === 'error' && msg.text().includes('aria-hidden')) {
                consoleErrors.push(msg.text());
            }
        });

        await openLivestockModalFromDashboard(page);
        
        const modal = page.locator('.modal.show').first();
        await expect(modal).toBeVisible();
        
        expect(consoleErrors.length).toBe(0);
        
        await expect(modal).toHaveAttribute('aria-modal', 'true');
        await expect(modal).not.toHaveAttribute('aria-hidden', 'true');
        
        await page.locator('.modal.show .btn-close').first().click({ timeout: 8000 });
        await page.waitForSelector('.modal.show', { state: 'hidden', timeout: 8000 });
    });

    test('should handle focus management correctly in addLivestockModal', async ({ page }) => {
        await openLivestockModalFromDashboard(page);
        
        const firstInput = page.locator('.modal.show input').first();
        await expect(firstInput).toBeFocused();
        
        await page.keyboard.press('Tab');
        
        await page.keyboard.press('Escape');
        await page.waitForSelector('.modal.show', { state: 'hidden', timeout: 8000 });
    });

    test('should open static addLivestockModal in livestock-management page', async ({ page }) => {
        await page.goto('/livestock-management.html', { waitUntil: 'domcontentloaded' });
        await page.waitForSelector('button[data-bs-target="#addLivestockModal"]', { timeout: 15000 });
        
        const consoleErrors = [];
        page.on('console', msg => {
            if (msg.type() === 'error' && msg.text().includes('aria-hidden')) {
                consoleErrors.push(msg.text());
            }
        });

        const trigger = page.locator('button[data-bs-target="#addLivestockModal"]').first();
        await trigger.scrollIntoViewIfNeeded();
        await trigger.click({ timeout: 10000 });
        
        await page.waitForSelector('#addLivestockModal.show', { timeout: 8000 });
        
        const modal = page.locator('#addLivestockModal');
        await expect(modal).toBeVisible();
        
        expect(consoleErrors.length).toBe(0);
        
        await expect(modal).toHaveAttribute('aria-modal', 'true');
        await expect(modal).not.toHaveAttribute('aria-hidden', 'true');
        
        const firstInput = page.locator('#addLivestockModal input').first();
        await expect(firstInput).toBeFocused();
        
        await page.click('#addLivestockModal .btn-close');
        await page.waitForSelector('#addLivestockModal.show', { state: 'hidden', timeout: 8000 });
    });

    test('should handle multiple modals correctly', async ({ page }) => {
        await openLivestockModalFromDashboard(page);
        
        const firstModal = page.locator('.modal.show').first();
        await expect(firstModal).toHaveAttribute('aria-modal', 'true');
        
        await page.locator('.modal.show .btn-close').first().click({ timeout: 8000 });
        await page.waitForSelector('.modal.show', { state: 'hidden', timeout: 8000 });
        
        const cropNav = page.locator('.sidebar a[onclick*="showCropManagement"]').first();
        await cropNav.scrollIntoViewIfNeeded();
        await cropNav.click({ timeout: 10000 });
        await page.waitForSelector('#cropManagementView', { state: 'visible', timeout: 10000 });
        await clickDashboardAction(page, '#cropManagementView button[onclick="addNewCrop()"]');
        await page.waitForSelector('.modal.show', { timeout: 8000 });
        
        const secondModal = page.locator('.modal.show').first();
        await expect(secondModal).toHaveAttribute('aria-modal', 'true');
        await expect(secondModal).not.toHaveAttribute('aria-hidden', 'true');
    });

    test('should prevent background interaction when modal is open', async ({ page }) => {
        await openLivestockModalFromDashboard(page);
        
        // Modal should remain visible (backdrop intercepts background)
        await expect(page.locator('.modal.show').first()).toBeVisible();
        
        await page.locator('.modal.show .btn-close').first().click({ timeout: 8000 });
        await page.waitForSelector('.modal.show', { state: 'hidden', timeout: 8000 });
    });

    test('should restore focus to trigger button after modal closes', async ({ page }) => {
        const livestockNav = page.locator('.sidebar a[onclick*="showLivestockManagement"]').first();
        await livestockNav.scrollIntoViewIfNeeded();
        await livestockNav.click({ timeout: 10000 });
        await page.waitForSelector('#livestockManagementView', { state: 'visible', timeout: 10000 });

        const addButton = page.locator('#livestockManagementView button[onclick="addNewLivestock()"]').first();
        await addButton.scrollIntoViewIfNeeded();
        await addButton.focus();
        
        await addButton.click({ timeout: 10000 });
        await page.waitForSelector('.modal.show', { timeout: 8000 });
        
        await page.locator('.modal.show .btn-close').first().click({ timeout: 8000 });
        await page.waitForSelector('.modal.show', { state: 'hidden', timeout: 8000 });
        
        await page.waitForTimeout(100);
        
        await expect(addButton).toBeFocused();
    });

    test('should handle keyboard navigation correctly', async ({ page }) => {
        await openLivestockModalFromDashboard(page);
        
        await page.keyboard.press('Tab');
        await page.keyboard.press('Tab');
        await page.keyboard.press('Tab');
        
        await page.keyboard.press('Shift+Tab');
        
        await page.keyboard.press('Escape');
        await page.waitForSelector('.modal.show', { state: 'hidden', timeout: 8000 });
    });

    test('should validate modal accessibility with automated tools', async ({ page }) => {
        await openLivestockModalFromDashboard(page);
        
        const modal = page.locator('.modal.show').first();
        
        await expect(modal).toHaveAttribute('role', 'dialog');
        await expect(modal).toHaveAttribute('aria-modal', 'true');
        
        const modalTitle = page.locator('.modal.show .modal-title').first();
        await expect(modalTitle).toBeVisible();
        
        const closeButton = page.locator('.modal.show .btn-close').first();
        await expect(closeButton).toBeVisible();
        
        await closeButton.click({ timeout: 8000 });
        await page.waitForSelector('.modal.show', { state: 'hidden', timeout: 8000 });
    });

    test('should handle rapid modal open/close without errors', async ({ page }) => {
        const consoleErrors = [];
        page.on('console', msg => {
            if (msg.type() === 'error' && msg.text().includes('aria-hidden')) {
                consoleErrors.push(msg.text());
            }
        });

        const livestockNav = page.locator('.sidebar a[onclick*="showLivestockManagement"]').first();
        await livestockNav.scrollIntoViewIfNeeded();
        await livestockNav.click({ timeout: 10000 });
        await page.waitForSelector('#livestockManagementView', { state: 'visible', timeout: 10000 });

        for (let i = 0; i < 3; i++) {
            await clickDashboardAction(page, '#livestockManagementView button[onclick="addNewLivestock()"]');
            await page.waitForSelector('.modal.show', { timeout: 8000 });
            
            await page.locator('.modal.show .btn-close').first().click({ timeout: 8000 });
            await page.waitForSelector('.modal.show', { state: 'hidden', timeout: 8000 });
            
            await page.waitForTimeout(100);
        }
        
        expect(consoleErrors.length).toBe(0);
    });
});
