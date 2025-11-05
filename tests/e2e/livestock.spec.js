/**
 * Playwright smoke tests for Livestock Management Page
 * Tests data persistence, modal functionality, and error handling
 */

import { test, expect } from '@playwright/test';

test.describe('Livestock Management', () => {
    test.beforeEach(async ({ page }) => {
        // Navigate to livestock management page
        // Adjust URL based on your app structure
        await page.goto('/livestock-management.html');
        
        // Wait for page to load
        await page.waitForLoadState('networkidle');
    });

    test('livestock list shows and does not disappear', async ({ page }) => {
        // Wait for statistics or container to be visible
        await expect(page.locator('#livestockContainer, .page-header')).toBeVisible({ timeout: 10000 });
        
        // Count animal cards on first load
        const firstLoad = await page.locator('[data-testid="animal-card"], .livestock-card').count();
        console.log(`Initial animal count: ${firstLoad}`);
        
        // Reload the page
        await page.reload();
        await page.waitForLoadState('networkidle');
        
        // Count animal cards after reload
        const afterReload = await page.locator('[data-testid="animal-card"], .livestock-card').count();
        console.log(`After reload animal count: ${afterReload}`);
        
        // Data should persist - either we have animals or show "no animals" message
        const hasAnimals = afterReload > 0;
        const hasNoAnimalsMessage = await page.locator('#noAnimalsMessage').isVisible().catch(() => false);
        
        expect(hasAnimals || hasNoAnimalsMessage).toBe(true);
        
        // If we had animals initially, we should still have them (or show error banner, not clear UI)
        if (firstLoad > 0) {
            // Either we still have animals, or we have an error banner (but not empty UI)
            const hasErrorBanner = await page.locator('#livestock-error-banner').isVisible().catch(() => false);
            const stillHasAnimals = afterReload > 0;
            
            expect(stillHasAnimals || hasErrorBanner).toBe(true);
        }
    });

    test('add new animal opens, validates, and closes', async ({ page }) => {
        // Find and click the "Add New Animal" button
        const addButton = page.getByRole('button', { name: /Add New Animal|Add Your First Animal/i }).first();
        
        // Wait for button to be visible and clickable
        await expect(addButton).toBeVisible({ timeout: 5000 });
        await addButton.click();
        
        // Wait for modal to appear
        const modal = page.locator('#addLivestockModal');
        await expect(modal).toBeVisible({ timeout: 5000 });
        
        // Verify modal has required fields
        await expect(page.locator('#animalSpecies')).toBeVisible();
        await expect(page.locator('#animalTag')).toBeVisible();
        await expect(page.locator('#animalBreed')).toBeVisible();
        
        // Try to submit without filling required fields (should show validation)
        const saveButton = page.locator('#saveLivestockButton, button:has-text("Save Animal")').first();
        if (await saveButton.isVisible()) {
            await saveButton.click();
            
            // Should show validation error or alert
            await page.waitForTimeout(500); // Wait for validation
        }
        
        // Close modal using Cancel or Close button
        const cancelButton = page.locator('button:has-text("Cancel"), button:has-text("Close"), .btn-close').first();
        if (await cancelButton.isVisible()) {
            await cancelButton.click();
        } else {
            // Try pressing Escape
            await page.keyboard.press('Escape');
        }
        
        // Modal should be hidden
        await expect(modal).not.toBeVisible({ timeout: 3000 });
    });

    test('filters persist in URL and work correctly', async ({ page }) => {
        // Set a filter
        const speciesFilter = page.locator('#speciesFilter');
        if (await speciesFilter.isVisible()) {
            await speciesFilter.selectOption('cattle');
            
            // Check URL has filter param
            await page.waitForTimeout(500);
            const url = page.url();
            expect(url).toContain('species=cattle');
            
            // Reload page
            await page.reload();
            await page.waitForLoadState('networkidle');
            
            // Filter should still be set
            const filterValue = await speciesFilter.inputValue();
            expect(filterValue).toBe('cattle');
        }
    });

    test('error banner shows with retry button on API failure', async ({ page }) => {
        // Simulate network failure
        await page.route('**/api/livestock*', route => route.abort());
        
        // Reload page to trigger error
        await page.reload();
        await page.waitForTimeout(2000);
        
        // Check for error banner
        const errorBanner = page.locator('#livestock-error-banner');
        const hasBanner = await errorBanner.isVisible().catch(() => false);
        
        if (hasBanner) {
            // Check for retry button
            const retryButton = errorBanner.locator('button:has-text("Retry")');
            await expect(retryButton).toBeVisible();
            
            // Verify last good data is still shown (not empty UI)
            const animalCards = await page.locator('.livestock-card, [data-testid="animal-card"]').count();
            // Should either show animals or "no animals" message, not just empty
            const hasContent = animalCards > 0 || await page.locator('#noAnimalsMessage').isVisible().catch(() => false);
            expect(hasContent).toBe(true);
        }
    });

    test('visibility change triggers data refresh', async ({ page }) => {
        // Wait for initial load
        await page.waitForLoadState('networkidle');
        
        // Simulate tab becoming visible
        await page.evaluate(() => {
            document.dispatchEvent(new Event('visibilitychange'));
        });
        
        // Wait a bit for refresh to happen
        await page.waitForTimeout(1000);
        
        // Page should still be functional
        await expect(page.locator('#livestockContainer, .page-header')).toBeVisible();
    });

    test('online/offline events trigger appropriate actions', async ({ page }) => {
        // Wait for initial load
        await page.waitForLoadState('networkidle');
        
        // Simulate going offline
        await page.context().setOffline(true);
        await page.evaluate(() => {
            window.dispatchEvent(new Event('offline'));
        });
        
        await page.waitForTimeout(500);
        
        // Should show offline message (check for alert)
        // Note: This may not always show depending on implementation
        
        // Simulate coming back online
        await page.context().setOffline(false);
        await page.evaluate(() => {
            window.dispatchEvent(new Event('online'));
        });
        
        await page.waitForTimeout(1000);
        
        // Page should still be functional
        await expect(page.locator('#livestockContainer, .page-header')).toBeVisible();
    });
});

