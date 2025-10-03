/**
 * Modal Accessibility E2E Tests
 * End-to-end tests for modal accessibility compliance
 */

const { test, expect } = require('@playwright/test');

test.describe('Modal Accessibility E2E', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/dashboard.html');
        await page.waitForLoadState('networkidle');
    });

    test('should not have aria-hidden focus conflicts in addLivestockModal', async ({ page }) => {
        // Click to open the livestock modal
        await page.click('button[onclick="addNewLivestock()"]');
        
        // Wait for modal to be visible
        await page.waitForSelector('.modal.show', { state: 'visible' });
        
        // Check that modal does not have aria-hidden="true" when focused
        const modal = page.locator('.modal.show');
        await expect(modal).not.toHaveAttribute('aria-hidden', 'true');
        
        // Check that modal has proper ARIA attributes
        await expect(modal).toHaveAttribute('aria-modal', 'true');
        await expect(modal).toHaveAttribute('role', 'dialog');
        
        // Check that first input is focused
        const firstInput = modal.locator('input').first();
        await expect(firstInput).toBeFocused();
        
        // Verify no console errors about aria-hidden conflicts
        const consoleLogs = [];
        page.on('console', msg => {
            if (msg.type() === 'error' && msg.text().includes('aria-hidden')) {
                consoleLogs.push(msg.text());
            }
        });
        
        // Close modal
        await page.click('.btn-close');
        await page.waitForSelector('.modal.show', { state: 'hidden' });
        
        // Verify no aria-hidden errors were logged
        expect(consoleLogs.length).toBe(0);
    });

    test('should trap focus within addLivestockModal', async ({ page }) => {
        // Open the livestock modal
        await page.click('button[onclick="addNewLivestock()"]');
        await page.waitForSelector('.modal.show');
        
        const modal = page.locator('.modal.show');
        const firstInput = modal.locator('input').first();
        const lastButton = modal.locator('button').last();
        
        // Focus first input
        await firstInput.focus();
        await expect(firstInput).toBeFocused();
        
        // Tab through focusable elements
        await page.keyboard.press('Tab');
        
        // Should focus next focusable element
        const secondFocusable = modal.locator('input, select, textarea, button').nth(1);
        await expect(secondFocusable).toBeFocused();
        
        // Continue tabbing to last element
        await page.keyboard.press('Tab');
        await page.keyboard.press('Tab');
        await page.keyboard.press('Tab');
        await page.keyboard.press('Tab');
        
        // Tab from last element should wrap to first
        await page.keyboard.press('Tab');
        await expect(firstInput).toBeFocused();
    });

    test('should handle Escape key to close modal', async ({ page }) => {
        // Open the livestock modal
        await page.click('button[onclick="addNewLivestock()"]');
        await page.waitForSelector('.modal.show');
        
        // Press Escape key
        await page.keyboard.press('Escape');
        
        // Modal should be closed
        await page.waitForSelector('.modal.show', { state: 'hidden' });
        await expect(page.locator('.modal.show')).not.toBeVisible();
    });

    test('should return focus to trigger button when modal closes', async ({ page }) => {
        // Get the trigger button
        const triggerButton = page.locator('button[onclick="addNewLivestock()"]');
        
        // Focus the trigger button
        await triggerButton.focus();
        await expect(triggerButton).toBeFocused();
        
        // Click to open modal
        await triggerButton.click();
        await page.waitForSelector('.modal.show');
        
        // Close modal
        await page.click('.btn-close');
        await page.waitForSelector('.modal.show', { state: 'hidden' });
        
        // Focus should return to trigger button
        await expect(triggerButton).toBeFocused();
    });

    test('should apply inert to background elements when modal is open', async ({ page }) => {
        // Get a background element
        const backgroundElement = page.locator('nav').first();
        
        // Open modal
        await page.click('button[onclick="addNewLivestock()"]');
        await page.waitForSelector('.modal.show');
        
        // Background element should have inert attribute
        await expect(backgroundElement).toHaveAttribute('inert');
        
        // Close modal
        await page.click('.btn-close');
        await page.waitForSelector('.modal.show', { state: 'hidden' });
        
        // Inert should be removed
        await expect(backgroundElement).not.toHaveAttribute('inert');
    });

    test('should validate addLivestockModal accessibility', async ({ page }) => {
        // Open modal
        await page.click('button[onclick="addNewLivestock()"]');
        await page.waitForSelector('.modal.show');
        
        // Run accessibility validation
        const accessibilityResults = await page.evaluate(() => {
            const modal = document.querySelector('.modal.show');
            return window.ModalAccessibility.validateModalAccessibility(modal);
        });
        
        // Should have no accessibility issues
        expect(accessibilityResults.length).toBe(0);
    });

    test('should work with livestock management page modal', async ({ page }) => {
        // Navigate to livestock management page
        await page.goto('/livestock-management.html');
        await page.waitForLoadState('networkidle');
        
        // Click to open the add livestock modal
        await page.click('button[data-bs-target="#addLivestockModal"]');
        await page.waitForSelector('#addLivestockModal.show');
        
        // Check modal accessibility
        const modal = page.locator('#addLivestockModal');
        await expect(modal).toHaveAttribute('aria-modal', 'true');
        await expect(modal).not.toHaveAttribute('aria-hidden', 'true');
        
        // Check that first input is focused
        const firstInput = modal.locator('input').first();
        await expect(firstInput).toBeFocused();
        
        // Close modal
        await page.click('#addLivestockModal .btn-close');
        await page.waitForSelector('#addLivestockModal.show', { state: 'hidden' });
    });

    test('should handle multiple modals correctly', async ({ page }) => {
        // Open first modal
        await page.click('button[onclick="addNewLivestock()"]');
        await page.waitForSelector('.modal.show');
        
        // Close first modal
        await page.click('.btn-close');
        await page.waitForSelector('.modal.show', { state: 'hidden' });
        
        // Open second modal (if available)
        const secondModalButton = page.locator('button[onclick*="Modal"]').first();
        if (await secondModalButton.isVisible()) {
            await secondModalButton.click();
            await page.waitForSelector('.modal.show');
            
            // Check accessibility
            const modal = page.locator('.modal.show');
            await expect(modal).toHaveAttribute('aria-modal', 'true');
            await expect(modal).not.toHaveAttribute('aria-hidden', 'true');
        }
    });

    test('should announce modal opening to screen readers', async ({ page }) => {
        // Listen for ARIA live region announcements
        let announcement = '';
        page.on('console', msg => {
            if (msg.text().includes('Modal opened')) {
                announcement = msg.text();
            }
        });
        
        // Open modal
        await page.click('button[onclick="addNewLivestock()"]');
        await page.waitForSelector('.modal.show');
        
        // Check for live region
        const liveRegion = page.locator('[aria-live]');
        await expect(liveRegion).toBeAttached();
    });

    test('should handle keyboard navigation in modal forms', async ({ page }) => {
        // Open modal
        await page.click('button[onclick="addNewLivestock()"]');
        await page.waitForSelector('.modal.show');
        
        const modal = page.locator('.modal.show');
        
        // Tab through form elements
        await page.keyboard.press('Tab'); // First input
        await page.keyboard.press('Tab'); // Second input
        await page.keyboard.press('Tab'); // Third input
        
        // Shift+Tab should go backwards
        await page.keyboard.press('Shift+Tab');
        const currentFocus = page.locator(':focus');
        await expect(currentFocus).toBeVisible();
        
        // Enter should work on buttons
        await page.keyboard.press('Tab'); // Move to button
        await page.keyboard.press('Enter'); // Activate button
        
        // Modal should close
        await page.waitForSelector('.modal.show', { state: 'hidden' });
    });

    test('should maintain accessibility with dynamic content', async ({ page }) => {
        // Open modal
        await page.click('button[onclick="addNewLivestock()"]');
        await page.waitForSelector('.modal.show');
        
        // Add dynamic content
        await page.evaluate(() => {
            const modalBody = document.querySelector('.modal.show .modal-body');
            const newInput = document.createElement('input');
            newInput.type = 'text';
            newInput.placeholder = 'Dynamic input';
            modalBody.appendChild(newInput);
        });
        
        // Focus should still be trapped
        const dynamicInput = page.locator('input[placeholder="Dynamic input"]');
        await dynamicInput.focus();
        await expect(dynamicInput).toBeFocused();
        
        // Tab navigation should still work
        await page.keyboard.press('Tab');
        const nextFocus = page.locator(':focus');
        await expect(nextFocus).toBeVisible();
    });
});
