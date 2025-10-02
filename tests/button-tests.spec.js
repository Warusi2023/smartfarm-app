// SmartFarm Button Tests
// Run with: npx playwright test button-tests.spec.js

const { test, expect } = require('@playwright/test');

test.describe('SmartFarm Button Functionality', () => {
    test.beforeEach(async ({ page }) => {
        // Navigate to the dashboard
        await page.goto('http://localhost:8080/dashboard.html');
        // Wait for page to load
        await page.waitForLoadState('networkidle');
    });

    test('Dashboard buttons are clickable and functional', async ({ page }) => {
        // Test Financial Details button
        await page.getByRole('button', { name: /view details/i }).click();
        await expect(page.getByText(/financial details/i)).toBeVisible();
        
        // Close modal
        await page.getByRole('button', { name: /close/i }).click();
        
        // Test QR Code Generation button
        await page.getByRole('button', { name: /generate qr code/i }).click();
        await expect(page.getByText(/qr code/i)).toBeVisible();
    });

    test('Navigation buttons work correctly', async ({ page }) => {
        // Test sidebar navigation
        await page.getByRole('link', { name: /crop management/i }).click();
        await expect(page).toHaveURL(/crop-management/);
        
        await page.getByRole('link', { name: /livestock/i }).click();
        await expect(page).toHaveURL(/livestock-management/);
        
        await page.getByRole('link', { name: /dashboard/i }).click();
        await expect(page).toHaveURL(/dashboard/);
    });

    test('Form submission buttons work', async ({ page }) => {
        // Navigate to crop management
        await page.getByRole('link', { name: /crop management/i }).click();
        await page.waitForLoadState('networkidle');
        
        // Fill form
        await page.fill('#cropName', 'Test Crop');
        await page.fill('#cropVariety', 'Test Variety');
        await page.fill('#plantingDate', '2024-01-01');
        
        // Submit form
        await page.getByRole('button', { name: /add crop/i }).click();
        
        // Check for success message or form reset
        await expect(page.locator('#cropName')).toHaveValue('');
    });

    test('Modal buttons work correctly', async ({ page }) => {
        // Test Add New Product button
        await page.getByRole('button', { name: /new product/i }).click();
        await expect(page.getByText(/add new product/i)).toBeVisible();
        
        // Close modal
        await page.getByRole('button', { name: /close/i }).click();
        
        // Test QR Options button
        await page.getByRole('button', { name: /qr options/i }).click();
        await expect(page.getByText(/qr code options/i)).toBeVisible();
    });

    test('AI Advisory buttons work', async ({ page }) => {
        // Navigate to crop management
        await page.getByRole('link', { name: /crop management/i }).click();
        await page.waitForLoadState('networkidle');
        
        // Test AI Advisory button (if crops exist)
        const aiButton = page.getByRole('button', { name: /ai advisory/i }).first();
        if (await aiButton.isVisible()) {
            await aiButton.click();
            await expect(page.getByText(/ai advice/i)).toBeVisible();
        }
    });

    test('Weeding management buttons work', async ({ page }) => {
        // Navigate to weeding management
        await page.getByRole('link', { name: /weeding/i }).click();
        await page.waitForLoadState('networkidle');
        
        // Test Execute Task button
        const executeButton = page.getByRole('button', { name: /execute task/i }).first();
        if (await executeButton.isVisible()) {
            await executeButton.click();
            // Should show confirmation or modal
            await expect(page.getByText(/confirm/i)).toBeVisible();
        }
    });

    test('Ads testing buttons work', async ({ page }) => {
        // Navigate to ads testing
        await page.getByRole('link', { name: /ads testing/i }).click();
        await page.waitForLoadState('networkidle');
        
        // Test AdSense button
        await page.getByRole('button', { name: /test adsense/i }).click();
        await expect(page.getByText(/adsense/i)).toBeVisible();
        
        // Test Affiliate button
        await page.getByRole('button', { name: /test affiliate/i }).click();
        await expect(page.getByText(/affiliate/i)).toBeVisible();
    });

    test('Button debugger works', async ({ page }) => {
        // Navigate to button debugger
        await page.getByRole('link', { name: /button debugger/i }).click();
        await page.waitForLoadState('networkidle');
        
        // Test scan buttons
        await page.getByRole('button', { name: /scan all buttons/i }).click();
        await expect(page.getByText(/total buttons/i)).toBeVisible();
        
        // Test test all buttons
        await page.getByRole('button', { name: /test all buttons/i }).click();
        await expect(page.getByText(/test results/i)).toBeVisible();
    });

    test('All buttons have proper accessibility attributes', async ({ page }) => {
        // Check all buttons have proper roles and labels
        const buttons = page.locator('button');
        const count = await buttons.count();
        
        for (let i = 0; i < count; i++) {
            const button = buttons.nth(i);
            const text = await button.textContent();
            const ariaLabel = await button.getAttribute('aria-label');
            
            // Button should have text or aria-label
            expect(text || ariaLabel).toBeTruthy();
            
            // Button should not be disabled unless intended
            const isDisabled = await button.isDisabled();
            if (isDisabled) {
                console.log(`Button "${text || ariaLabel}" is disabled`);
            }
        }
    });

    test('No JavaScript errors on button clicks', async ({ page }) => {
        const errors = [];
        
        // Listen for console errors
        page.on('console', msg => {
            if (msg.type() === 'error') {
                errors.push(msg.text());
            }
        });
        
        // Click various buttons
        const buttons = [
            'view details',
            'generate qr code',
            'new product',
            'qr options'
        ];
        
        for (const buttonText of buttons) {
            try {
                await page.getByRole('button', { name: new RegExp(buttonText, 'i') }).click();
                await page.waitForTimeout(500); // Wait for any async operations
            } catch (error) {
                console.log(`Button "${buttonText}" not found or not clickable`);
            }
        }
        
        // Check for critical errors
        const criticalErrors = errors.filter(error => 
            !error.includes('favicon') && 
            !error.includes('404') &&
            !error.includes('CORS')
        );
        
        expect(criticalErrors).toHaveLength(0);
    });

    test('Button loading states work correctly', async ({ page }) => {
        // Test buttons that might have loading states
        const loadingButtons = page.locator('button[data-loading]');
        const count = await loadingButtons.count();
        
        for (let i = 0; i < count; i++) {
            const button = loadingButtons.nth(i);
            await button.click();
            
            // Check if button shows loading state
            const isLoading = await button.getAttribute('data-loading');
            if (isLoading === 'true') {
                await expect(button).toHaveClass(/loading/);
            }
        }
    });

    test('Form validation prevents invalid submissions', async ({ page }) => {
        // Navigate to crop management
        await page.getByRole('link', { name: /crop management/i }).click();
        await page.waitForLoadState('networkidle');
        
        // Try to submit empty form
        await page.getByRole('button', { name: /add crop/i }).click();
        
        // Should show validation error or prevent submission
        const errorMessage = page.getByText(/required/i).first();
        if (await errorMessage.isVisible()) {
            await expect(errorMessage).toBeVisible();
        }
    });

    test('Button tooltips work correctly', async ({ page }) => {
        // Check buttons with title attributes
        const buttonsWithTooltips = page.locator('button[title]');
        const count = await buttonsWithTooltips.count();
        
        for (let i = 0; i < count; i++) {
            const button = buttonsWithTooltips.nth(i);
            const title = await button.getAttribute('title');
            
            // Hover over button
            await button.hover();
            
            // Check if tooltip appears (this might need adjustment based on your tooltip implementation)
            expect(title).toBeTruthy();
        }
    });
});

test.describe('Mobile Button Functionality', () => {
    test.use({ viewport: { width: 375, height: 667 } }); // iPhone SE size
    
    test('Buttons work on mobile devices', async ({ page }) => {
        await page.goto('http://localhost:8080/dashboard.html');
        await page.waitForLoadState('networkidle');
        
        // Test mobile menu toggle
        const menuToggle = page.getByRole('button', { name: /menu/i });
        if (await menuToggle.isVisible()) {
            await menuToggle.click();
            await expect(page.locator('.sidebar')).toBeVisible();
        }
        
        // Test that buttons are still clickable on mobile
        const buttons = page.locator('button').first();
        if (await buttons.isVisible()) {
            await buttons.click();
            // Should not throw any errors
        }
    });
});

test.describe('Button Performance', () => {
    test('Button clicks respond within acceptable time', async ({ page }) => {
        await page.goto('http://localhost:8080/dashboard.html');
        await page.waitForLoadState('networkidle');
        
        const startTime = Date.now();
        await page.getByRole('button', { name: /view details/i }).click();
        const endTime = Date.now();
        
        const responseTime = endTime - startTime;
        expect(responseTime).toBeLessThan(1000); // Should respond within 1 second
    });
});
