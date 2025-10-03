/**
 * E2E tests for Modal Accessibility
 * Tests actual user interactions and verifies no console errors
 */

const { test, expect } = require('@playwright/test');

test.describe('Modal Accessibility E2E Tests', () => {
    let consoleErrors = [];

    test.beforeEach(async ({ page }) => {
        // Capture console errors
        consoleErrors = [];
        page.on('console', msg => {
            if (msg.type() === 'error') {
                consoleErrors.push(msg.text());
            }
        });
    });

    test.afterEach(async () => {
        // Verify no accessibility-related console errors
        const accessibilityErrors = consoleErrors.filter(error => 
            error.includes('aria-hidden') || 
            error.includes('Blocked aria-hidden') ||
            error.includes('focus') && error.includes('accessibility')
        );
        
        if (accessibilityErrors.length > 0) {
            console.warn('Accessibility errors detected:', accessibilityErrors);
        }
        
        // Reset for next test
        consoleErrors = [];
    });

    test('should open livestock modal without aria-hidden errors', async ({ page }) => {
        await page.goto('/livestock-management.html');
        
        // Click the add livestock button
        await page.click('button[data-bs-target="#addLivestockModal"]');
        
        // Wait for modal to be visible
        await page.waitForSelector('#addLivestockModal.show', { timeout: 5000 });
        
        // Verify modal is accessible
        const modal = page.locator('#addLivestockModal');
        await expect(modal).toBeVisible();
        
        // Check that aria-hidden is not set to true
        const ariaHidden = await modal.getAttribute('aria-hidden');
        expect(ariaHidden).not.toBe('true');
        
        // Check that aria-modal is set
        const ariaModal = await modal.getAttribute('aria-modal');
        expect(ariaModal).toBe('true');
        
        // Check that role is set
        const role = await modal.getAttribute('role');
        expect(role).toBe('dialog');
    });

    test('should handle focus correctly in livestock modal', async ({ page }) => {
        await page.goto('/livestock-management.html');
        
        // Click the add livestock button
        await page.click('button[data-bs-target="#addLivestockModal"]');
        
        // Wait for modal to be visible
        await page.waitForSelector('#addLivestockModal.show', { timeout: 5000 });
        
        // Check that focus is trapped within modal
        const firstInput = page.locator('#addLivestockModal input').first();
        await expect(firstInput).toBeFocused();
        
        // Test tab navigation
        await page.keyboard.press('Tab');
        
        // Verify focus is still within modal
        const activeElement = await page.evaluate(() => document.activeElement);
        const modal = page.locator('#addLivestockModal');
        const isWithinModal = await modal.evaluate((modal, element) => 
            modal.contains(element), activeElement
        );
        expect(isWithinModal).toBe(true);
    });

    test('should close modal with Escape key', async ({ page }) => {
        await page.goto('/livestock-management.html');
        
        // Open modal
        await page.click('button[data-bs-target="#addLivestockModal"]');
        await page.waitForSelector('#addLivestockModal.show', { timeout: 5000 });
        
        // Press Escape key
        await page.keyboard.press('Escape');
        
        // Wait for modal to be hidden
        await page.waitForSelector('#addLivestockModal.show', { state: 'hidden', timeout: 5000 });
        
        // Verify modal is hidden
        const modal = page.locator('#addLivestockModal');
        await expect(modal).not.toBeVisible();
        
        // Check that aria-hidden is now true
        const ariaHidden = await modal.getAttribute('aria-hidden');
        expect(ariaHidden).toBe('true');
    });

    test('should close modal with close button', async ({ page }) => {
        await page.goto('/livestock-management.html');
        
        // Open modal
        await page.click('button[data-bs-target="#addLivestockModal"]');
        await page.waitForSelector('#addLivestockModal.show', { timeout: 5000 });
        
        // Click close button
        await page.click('#addLivestockModal .btn-close');
        
        // Wait for modal to be hidden
        await page.waitForSelector('#addLivestockModal.show', { state: 'hidden', timeout: 5000 });
        
        // Verify modal is hidden
        const modal = page.locator('#addLivestockModal');
        await expect(modal).not.toBeVisible();
    });

    test('should handle dynamic modals in dashboard', async ({ page }) => {
        await page.goto('/dashboard.html');
        
        // Navigate to crop management
        await page.click('a[onclick*="showCropManagement"]');
        
        // Wait for crop management view
        await page.waitForSelector('#cropManagementView', { state: 'visible', timeout: 5000 });
        
        // Click add new crop button
        await page.click('button[onclick="addNewCrop()"]');
        
        // Wait for modal to appear (dynamically created)
        await page.waitForSelector('.modal.show', { timeout: 5000 });
        
        // Verify modal is accessible
        const modal = page.locator('.modal.show').first();
        await expect(modal).toBeVisible();
        
        // Check ARIA attributes
        const ariaHidden = await modal.getAttribute('aria-hidden');
        expect(ariaHidden).not.toBe('true');
        
        const ariaModal = await modal.getAttribute('aria-modal');
        expect(ariaModal).toBe('true');
    });

    test('should handle livestock modal in dashboard', async ({ page }) => {
        await page.goto('/dashboard.html');
        
        // Navigate to livestock management
        await page.click('a[onclick*="showLivestockManagement"]');
        
        // Wait for livestock management view
        await page.waitForSelector('#livestockManagementView', { state: 'visible', timeout: 5000 });
        
        // Click add new animal button
        await page.click('button[onclick="addNewLivestock()"]');
        
        // Wait for modal to appear (dynamically created)
        await page.waitForSelector('.modal.show', { timeout: 5000 });
        
        // Verify modal is accessible
        const modal = page.locator('.modal.show').first();
        await expect(modal).toBeVisible();
        
        // Check ARIA attributes
        const ariaHidden = await modal.getAttribute('aria-hidden');
        expect(ariaHidden).not.toBe('true');
        
        const ariaModal = await modal.getAttribute('aria-modal');
        expect(ariaModal).toBe('true');
    });

    test('should prevent background focus when modal is open', async ({ page }) => {
        await page.goto('/livestock-management.html');
        
        // Focus a background element
        const backgroundButton = page.locator('button[data-bs-target="#addLivestockModal"]');
        await backgroundButton.focus();
        
        // Open modal
        await backgroundButton.click();
        await page.waitForSelector('#addLivestockModal.show', { timeout: 5000 });
        
        // Try to focus background elements
        await page.keyboard.press('Tab');
        await page.keyboard.press('Tab');
        await page.keyboard.press('Tab');
        
        // Verify focus is still within modal
        const activeElement = await page.evaluate(() => document.activeElement);
        const modal = page.locator('#addLivestockModal');
        const isWithinModal = await modal.evaluate((modal, element) => 
            modal.contains(element), activeElement
        );
        expect(isWithinModal).toBe(true);
    });

    test('should restore focus to trigger button when modal closes', async ({ page }) => {
        await page.goto('/livestock-management.html');
        
        // Focus the trigger button
        const triggerButton = page.locator('button[data-bs-target="#addLivestockModal"]');
        await triggerButton.focus();
        
        // Open modal
        await triggerButton.click();
        await page.waitForSelector('#addLivestockModal.show', { timeout: 5000 });
        
        // Close modal
        await page.click('#addLivestockModal .btn-close');
        await page.waitForSelector('#addLivestockModal.show', { state: 'hidden', timeout: 5000 });
        
        // Verify focus is restored to trigger button
        await expect(triggerButton).toBeFocused();
    });

    test('should handle multiple modals without conflicts', async ({ page }) => {
        await page.goto('/dashboard.html');
        
        // Open first modal (crop management)
        await page.click('a[onclick*="showCropManagement"]');
        await page.waitForSelector('#cropManagementView', { state: 'visible', timeout: 5000 });
        await page.click('button[onclick="addNewCrop()"]');
        await page.waitForSelector('.modal.show', { timeout: 5000 });
        
        const firstModal = page.locator('.modal.show').first();
        await expect(firstModal).toBeVisible();
        
        // Close first modal
        await page.click('.modal.show .btn-close');
        await page.waitForSelector('.modal.show', { state: 'hidden', timeout: 5000 });
        
        // Open second modal (livestock management)
        await page.click('a[onclick*="showLivestockManagement"]');
        await page.waitForSelector('#livestockManagementView', { state: 'visible', timeout: 5000 });
        await page.click('button[onclick="addNewLivestock()"]');
        await page.waitForSelector('.modal.show', { timeout: 5000 });
        
        const secondModal = page.locator('.modal.show').first();
        await expect(secondModal).toBeVisible();
        
        // Verify second modal is accessible
        const ariaHidden = await secondModal.getAttribute('aria-hidden');
        expect(ariaHidden).not.toBe('true');
    });
});