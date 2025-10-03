/**
 * Comprehensive Modal Accessibility E2E Tests
 * Tests modal accessibility in real browser environment with actual user interactions
 */

const { test, expect } = require('@playwright/test');

test.describe('Modal Accessibility E2E Tests', () => {
    test.beforeEach(async ({ page }) => {
        // Navigate to dashboard
        await page.goto('/dashboard.html');
        
        // Wait for page to load
        await page.waitForLoadState('networkidle');
    });

    test('should open addLivestockModal without aria-hidden errors', async ({ page }) => {
        // Listen for console errors
        const consoleErrors = [];
        page.on('console', msg => {
            if (msg.type() === 'error' && msg.text().includes('aria-hidden')) {
                consoleErrors.push(msg.text());
            }
        });

        // Click add livestock button
        await page.click('button[onclick="addNewLivestock()"]');
        
        // Wait for modal to appear
        await page.waitForSelector('.modal.show', { timeout: 5000 });
        
        // Check modal is visible
        const modal = page.locator('.modal.show');
        await expect(modal).toBeVisible();
        
        // Verify no aria-hidden errors
        expect(consoleErrors.length).toBe(0);
        
        // Check modal attributes
        await expect(modal).toHaveAttribute('aria-modal', 'true');
        await expect(modal).not.toHaveAttribute('aria-hidden', 'true');
        
        // Close modal
        await page.click('.modal .btn-close');
        await page.waitForSelector('.modal.show', { state: 'hidden' });
    });

    test('should handle focus management correctly in addLivestockModal', async ({ page }) => {
        // Open modal
        await page.click('button[onclick="addNewLivestock()"]');
        await page.waitForSelector('.modal.show');
        
        // Check first input is focused
        const firstInput = page.locator('.modal input').first();
        await expect(firstInput).toBeFocused();
        
        // Test tab navigation
        await page.keyboard.press('Tab');
        const secondElement = page.locator('.modal select').first();
        await expect(secondElement).toBeFocused();
        
        // Test escape key closes modal
        await page.keyboard.press('Escape');
        await page.waitForSelector('.modal.show', { state: 'hidden' });
    });

    test('should open static addLivestockModal in livestock-management page', async ({ page }) => {
        // Navigate to livestock management page
        await page.goto('/livestock-management.html');
        await page.waitForLoadState('networkidle');
        
        // Listen for console errors
        const consoleErrors = [];
        page.on('console', msg => {
            if (msg.type() === 'error' && msg.text().includes('aria-hidden')) {
                consoleErrors.push(msg.text());
            }
        });

        // Click add new animal button
        await page.click('button[data-bs-target="#addLivestockModal"]');
        
        // Wait for modal to appear
        await page.waitForSelector('#addLivestockModal.show', { timeout: 5000 });
        
        // Check modal is visible and accessible
        const modal = page.locator('#addLivestockModal');
        await expect(modal).toBeVisible();
        
        // Verify no aria-hidden errors
        expect(consoleErrors.length).toBe(0);
        
        // Check modal attributes
        await expect(modal).toHaveAttribute('aria-modal', 'true');
        await expect(modal).not.toHaveAttribute('aria-hidden', 'true');
        
        // Test focus management
        const firstInput = page.locator('#addLivestockModal input').first();
        await expect(firstInput).toBeFocused();
        
        // Close modal
        await page.click('#addLivestockModal .btn-close');
        await page.waitForSelector('#addLivestockModal.show', { state: 'hidden' });
    });

    test('should handle multiple modals correctly', async ({ page }) => {
        // Open first modal
        await page.click('button[onclick="addNewLivestock()"]');
        await page.waitForSelector('.modal.show');
        
        // Verify first modal is accessible
        const firstModal = page.locator('.modal.show').first();
        await expect(firstModal).toHaveAttribute('aria-modal', 'true');
        
        // Close first modal
        await page.click('.modal .btn-close');
        await page.waitForSelector('.modal.show', { state: 'hidden' });
        
        // Open second modal (add crop)
        await page.click('button[onclick="addNewCrop()"]');
        await page.waitForSelector('.modal.show');
        
        // Verify second modal is accessible
        const secondModal = page.locator('.modal.show').first();
        await expect(secondModal).toHaveAttribute('aria-modal', 'true');
        await expect(secondModal).not.toHaveAttribute('aria-hidden', 'true');
    });

    test('should prevent background interaction when modal is open', async ({ page }) => {
        // Open modal
        await page.click('button[onclick="addNewLivestock()"]');
        await page.waitForSelector('.modal.show');
        
        // Try to click background element (should not work)
        const backgroundButton = page.locator('button').first();
        await backgroundButton.click();
        
        // Modal should still be visible
        await expect(page.locator('.modal.show')).toBeVisible();
        
        // Close modal
        await page.click('.modal .btn-close');
        await page.waitForSelector('.modal.show', { state: 'hidden' });
    });

    test('should restore focus to trigger button after modal closes', async ({ page }) => {
        // Focus on add livestock button
        const addButton = page.locator('button[onclick="addNewLivestock()"]');
        await addButton.focus();
        
        // Open modal
        await addButton.click();
        await page.waitForSelector('.modal.show');
        
        // Close modal
        await page.click('.modal .btn-close');
        await page.waitForSelector('.modal.show', { state: 'hidden' });
        
        // Wait for focus restoration
        await page.waitForTimeout(100);
        
        // Check focus is restored
        await expect(addButton).toBeFocused();
    });

    test('should handle keyboard navigation correctly', async ({ page }) => {
        // Open modal
        await page.click('button[onclick="addNewLivestock()"]');
        await page.waitForSelector('.modal.show');
        
        // Test tab navigation through modal
        await page.keyboard.press('Tab');
        await page.keyboard.press('Tab');
        await page.keyboard.press('Tab');
        
        // Test shift+tab navigation (backwards)
        await page.keyboard.press('Shift+Tab');
        
        // Test escape key closes modal
        await page.keyboard.press('Escape');
        await page.waitForSelector('.modal.show', { state: 'hidden' });
    });

    test('should validate modal accessibility with automated tools', async ({ page }) => {
        // Open modal
        await page.click('button[onclick="addNewLivestock()"]');
        await page.waitForSelector('.modal.show');
        
        // Check for common accessibility issues
        const modal = page.locator('.modal.show').first();
        
        // Verify required ARIA attributes
        await expect(modal).toHaveAttribute('role', 'dialog');
        await expect(modal).toHaveAttribute('aria-modal', 'true');
        
        // Verify modal has a label
        const modalTitle = page.locator('.modal-title');
        await expect(modalTitle).toBeVisible();
        
        // Verify close button has proper attributes
        const closeButton = page.locator('.modal .btn-close');
        await expect(closeButton).toBeVisible();
        
        // Close modal
        await page.click('.modal .btn-close');
        await page.waitForSelector('.modal.show', { state: 'hidden' });
    });

    test('should handle rapid modal open/close without errors', async ({ page }) => {
        // Listen for console errors
        const consoleErrors = [];
        page.on('console', msg => {
            if (msg.type() === 'error' && msg.text().includes('aria-hidden')) {
                consoleErrors.push(msg.text());
            }
        });

        // Rapidly open and close modal multiple times
        for (let i = 0; i < 3; i++) {
            await page.click('button[onclick="addNewLivestock()"]');
            await page.waitForSelector('.modal.show');
            
            await page.click('.modal .btn-close');
            await page.waitForSelector('.modal.show', { state: 'hidden' });
            
            // Small delay between iterations
            await page.waitForTimeout(100);
        }
        
        // Verify no aria-hidden errors occurred
        expect(consoleErrors.length).toBe(0);
    });
});
