/**
 * E2E Tests for Server Connection
 * Tests frontend-backend connectivity from Netlify to Railway
 */

const { test, expect } = require('@playwright/test');

test.describe('Server Connection Tests', () => {
    test.beforeEach(async ({ page }) => {
        // Navigate to the app
        await page.goto('/');
        
        // Wait for page to load
        await page.waitForSelector('body');
    });

    test('should successfully connect to Railway backend', async ({ page }) => {
        // Test API health check
        const healthResponse = await page.request.get('/api/health');
        expect(healthResponse.ok()).toBeTruthy();
        
        const healthData = await healthResponse.json();
        expect(healthData.message).toBe('OK');
        expect(healthData.timestamp).toBeDefined();
    });

    test('should fetch farms from backend API', async ({ page }) => {
        const farmsResponse = await page.request.get('/api/farms');
        expect(farmsResponse.ok()).toBeTruthy();
        
        const farmsData = await farmsResponse.json();
        expect(Array.isArray(farmsData.data || farmsData)).toBeTruthy();
    });

    test('should fetch crops from backend API', async ({ page }) => {
        const cropsResponse = await page.request.get('/api/crops');
        expect(cropsResponse.ok()).toBeTruthy();
        
        const cropsData = await cropsResponse.json();
        expect(Array.isArray(cropsData.data || cropsData)).toBeTruthy();
    });

    test('should fetch livestock from backend API', async ({ page }) => {
        const livestockResponse = await page.request.get('/api/livestock');
        expect(livestockResponse.ok()).toBeTruthy();
        
        const livestockData = await livestockResponse.json();
        expect(Array.isArray(livestockData.data || livestockData)).toBeTruthy();
    });

    test('should create livestock via API', async ({ page }) => {
        const newLivestock = {
            species: 'Cattle',
            breed: 'Holstein',
            tag: 'E2E-TEST-' + Date.now(),
            sex: 'female',
            birthDate: '2023-01-01',
            weight: 500,
            location: 'Test Farm',
            value: 1000
        };

        const createResponse = await page.request.post('/api/livestock', {
            data: newLivestock
        });

        expect(createResponse.ok()).toBeTruthy();
        
        const createData = await createResponse.json();
        expect(createData.success || createData.id).toBeTruthy();
    });

    test('should handle API errors gracefully', async ({ page }) => {
        // Test invalid endpoint
        const invalidResponse = await page.request.get('/api/invalid-endpoint');
        expect(invalidResponse.status()).toBe(404);
    });

    test('should not have CORS violations in console', async ({ page }) => {
        const consoleErrors = [];
        
        page.on('console', msg => {
            if (msg.type() === 'error') {
                const text = msg.text();
                if (text.includes('CORS') || text.includes('Cross-Origin')) {
                    consoleErrors.push(text);
                }
            }
        });

        // Navigate to livestock management page (makes API calls)
        await page.goto('/livestock-management.html');
        await page.waitForSelector('body');
        
        // Wait a bit for any potential errors
        await page.waitForTimeout(2000);

        expect(consoleErrors).toHaveLength(0);
    });

    test('should not have CSP violations in console', async ({ page }) => {
        const consoleErrors = [];
        
        page.on('console', msg => {
            if (msg.type() === 'error') {
                const text = msg.text();
                if (text.includes('Content Security Policy') || text.includes('CSP')) {
                    consoleErrors.push(text);
                }
            }
        });

        // Navigate to dashboard (loads external resources)
        await page.goto('/dashboard.html');
        await page.waitForSelector('body');
        
        // Wait for external resources to load
        await page.waitForTimeout(3000);

        expect(consoleErrors).toHaveLength(0);
    });

    test('should load weather service without errors', async ({ page }) => {
        const consoleErrors = [];
        
        page.on('console', msg => {
            if (msg.type() === 'error') {
                const text = msg.text();
                if (text.includes('weather') || text.includes('Weather')) {
                    consoleErrors.push(text);
                }
            }
        });

        // Navigate to dashboard (includes weather service)
        await page.goto('/dashboard.html');
        await page.waitForSelector('body');
        
        // Wait for weather service to initialize
        await page.waitForTimeout(2000);

        // Weather service should not cause console errors
        expect(consoleErrors).toHaveLength(0);
    });

    test('should handle network failures gracefully', async ({ page }) => {
        // Mock network failure
        await page.route('/api/health', route => route.abort('failed'));
        
        let serverUnavailableBannerVisible = false;
        
        page.on('console', msg => {
            if (msg.text().includes('Server temporarily unavailable')) {
                serverUnavailableBannerVisible = true;
            }
        });

        // Navigate to a page that makes API calls
        await page.goto('/livestock-management.html');
        await page.waitForSelector('body');
        
        // Wait for API calls and potential retry logic
        await page.waitForTimeout(5000);

        // Should show server unavailable banner or handle gracefully
        const banner = await page.$('#server-unavailable-banner');
        expect(banner || serverUnavailableBannerVisible).toBeTruthy();
    });

    test('should retry failed requests with exponential backoff', async ({ page }) => {
        let requestCount = 0;
        
        // Mock API to fail twice, then succeed
        await page.route('/api/farms', route => {
            requestCount++;
            if (requestCount <= 2) {
                route.abort('failed');
            } else {
                route.fulfill({
                    status: 200,
                    contentType: 'application/json',
                    body: JSON.stringify({ data: [] })
                });
            }
        });

        // Navigate to page that fetches farms
        await page.goto('/dashboard.html');
        await page.waitForSelector('body');
        
        // Wait for retry logic to complete
        await page.waitForTimeout(10000);

        // Should have made 3 requests (initial + 2 retries)
        expect(requestCount).toBe(3);
    });

    test('should maintain session across page navigation', async ({ page }) => {
        // Test session persistence
        await page.goto('/dashboard.html');
        await page.waitForSelector('body');
        
        // Navigate to another page
        await page.goto('/livestock-management.html');
        await page.waitForSelector('body');
        
        // Navigate back
        await page.goto('/dashboard.html');
        await page.waitForSelector('body');
        
        // Should not have authentication errors
        const consoleErrors = [];
        page.on('console', msg => {
            if (msg.type() === 'error' && msg.text().includes('auth')) {
                consoleErrors.push(msg.text());
            }
        });
        
        await page.waitForTimeout(1000);
        expect(consoleErrors).toHaveLength(0);
    });

    test('should handle large API responses efficiently', async ({ page }) => {
        const startTime = Date.now();
        
        // Test with livestock endpoint (potentially large dataset)
        const response = await page.request.get('/api/livestock');
        const endTime = Date.now();
        
        expect(response.ok()).toBeTruthy();
        
        // Response should complete within reasonable time (5 seconds)
        expect(endTime - startTime).toBeLessThan(5000);
        
        const data = await response.json();
        expect(data).toBeDefined();
    });
});
