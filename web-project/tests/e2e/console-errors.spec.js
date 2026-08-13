/**
 * E2E Tests for Console Error Verification
 * Tests that the dashboard loads without console errors
 */

const { test, expect } = require('@playwright/test');
const {
    gotoDashboardReady,
    clickSidebarNav,
    ensureMobileSidebarOpen
} = require('./helpers/dashboard-ready');

test.describe('Console Error Verification', () => {
    let consoleErrors = [];
    let consoleWarnings = [];

    test.beforeEach(async ({ page }) => {
        consoleErrors = [];
        consoleWarnings = [];
        
        page.on('console', msg => {
            if (msg.type() === 'error') {
                consoleErrors.push({
                    type: msg.type(),
                    text: msg.text(),
                    location: msg.location()
                });
            } else if (msg.type() === 'warning') {
                consoleWarnings.push({
                    type: msg.type(),
                    text: msg.text(),
                    location: msg.location()
                });
            }
        });

        page.on('pageerror', error => {
            consoleErrors.push({
                type: 'unhandledPromiseRejection',
                text: error.message,
                stack: error.stack
            });
        });
    });

    test('should load dashboard without critical console errors', async ({ page }) => {
        await gotoDashboardReady(page);
        await page.waitForTimeout(1000);
        
        const criticalErrors = consoleErrors.filter(error => {
            const text = error.text.toLowerCase();
            return text.includes('cannot read properties of null') ||
                   text.includes('unexpected token') ||
                   text.includes('syntaxerror') ||
                   text.includes('typeerror') ||
                   text.includes('referenceerror') ||
                   text.includes('process is not defined') ||
                   text.includes('404 (not found)') ||
                   text.includes('csp violation') ||
                   text.includes('content security policy');
        });

        if (criticalErrors.length > 0) {
            console.log('Critical errors found:');
            criticalErrors.forEach(error => {
                console.log(`- ${error.type}: ${error.text}`);
                if (error.location) {
                    console.log(`  Location: ${error.location.url}:${error.location.lineNumber}`);
                }
            });
        }

        expect(criticalErrors).toHaveLength(0);
    });

    test('should navigate through all menu tabs without errors', async ({ page }) => {
        test.setTimeout(process.env.CI ? 120000 : 60000);
        await gotoDashboardReady(page);
        
        // Exact sidebar labels (substring text= matches marketing page wrongly)
        const menuItems = [
            'Dashboard',
            'Farm Overview',
            'Crop Management',
            'Livestock',
            'Inventory',
            'Analytics',
            'Farm Tasks',
            'Reports'
        ];

        for (const menuItem of menuItems) {
            consoleErrors = [];
            consoleWarnings = [];
            
            try {
                await ensureMobileSidebarOpen(page);
                await clickSidebarNav(page, menuItem);
                await page.waitForTimeout(500);
                
                const navigationErrors = consoleErrors.filter(error => {
                    const text = error.text.toLowerCase();
                    return text.includes('cannot read properties of null') ||
                           text.includes('unexpected token') ||
                           text.includes('syntaxerror') ||
                           text.includes('typeerror') ||
                           text.includes('referenceerror');
                });
                
                if (navigationErrors.length > 0) {
                    console.log(`Navigation errors for ${menuItem}:`);
                    navigationErrors.forEach(error => {
                        console.log(`- ${error.type}: ${error.text}`);
                    });
                }
                
                expect(navigationErrors).toHaveLength(0);
            } catch (error) {
                console.log(`Error testing menu item "${menuItem}":`, error.message);
                throw error;
            }
        }
    });

    test('should load API endpoints without CSP violations', async ({ page }) => {
        await gotoDashboardReady(page);
        
        const networkErrors = consoleErrors.filter(error => {
            const text = error.text.toLowerCase();
            return text.includes('refused to connect') ||
                   text.includes('csp violation') ||
                   text.includes('content security policy') ||
                   text.includes('blocked by client');
        });

        if (networkErrors.length > 0) {
            console.log('Network/CSP errors found:');
            networkErrors.forEach(error => {
                console.log(`- ${error.type}: ${error.text}`);
            });
        }

        expect(networkErrors).toHaveLength(0);
    });

    test('should handle user management without JSON parsing errors', async ({ page }) => {
        await page.goto('/user-management.html', { waitUntil: 'domcontentloaded' });
        await page.waitForSelector('body');
        await page.waitForTimeout(1000);
        
        const jsonErrors = consoleErrors.filter(error => {
            const text = error.text.toLowerCase();
            return text.includes('unexpected token') ||
                   text.includes('json.parse') ||
                   text.includes('invalid json') ||
                   text.includes('syntaxerror');
        });

        if (jsonErrors.length > 0) {
            console.log('JSON parsing errors found:');
            jsonErrors.forEach(error => {
                console.log(`- ${error.type}: ${error.text}`);
            });
        }

        expect(jsonErrors).toHaveLength(0);
    });

    test('should load weather service without environment errors', async ({ page }) => {
        await gotoDashboardReady(page);
        await page.waitForTimeout(1500);
        
        const envErrors = consoleErrors.filter(error => {
            const text = error.text.toLowerCase();
            return text.includes('process is not defined') ||
                   text.includes('process.env') ||
                   text.includes('environment') ||
                   text.includes('api key');
        });

        if (envErrors.length > 0) {
            console.log('Environment errors found:');
            envErrors.forEach(error => {
                console.log(`- ${error.type}: ${error.text}`);
            });
        }

        expect(envErrors).toHaveLength(0);
    });

    test('should handle IoT sensor data without validation warnings', async ({ page }) => {
        await gotoDashboardReady(page);
        await page.waitForTimeout(1500);
        
        const iotWarnings = consoleWarnings.filter(warning => {
            const text = warning.text.toLowerCase();
            return text.includes('invalid sensor data') ||
                   text.includes('livestockhealth') ||
                   text.includes('sensor validation') ||
                   text.includes('iot data');
        });

        if (iotWarnings.length > 0) {
            console.log('IoT validation warnings found:');
            iotWarnings.forEach(warning => {
                console.log(`- ${warning.type}: ${warning.text}`);
            });
        }

        const criticalIotWarnings = iotWarnings.filter(warning => {
            const text = warning.text.toLowerCase();
            return text.includes('critical') || text.includes('error');
        });

        expect(criticalIotWarnings).toHaveLength(0);
    });

    test('should load performance optimizer without MutationObserver errors', async ({ page }) => {
        await gotoDashboardReady(page);
        await page.waitForTimeout(1000);
        
        // Real assertion: no MutationObserver/IntersectionObserver console errors
        const observerErrors = consoleErrors.filter(error => {
            const text = error.text.toLowerCase();
            return text.includes('mutationobserver') ||
                   text.includes('parameter not of type') ||
                   text.includes('intersectionobserver') ||
                   (text.includes('observe') && text.includes('failed'));
        });

        if (observerErrors.length > 0) {
            console.log('Observer errors found:');
            observerErrors.forEach(error => {
                console.log(`- ${error.type}: ${error.text}`);
            });
        }

        expect(observerErrors).toHaveLength(0);
        // Script exposes performanceOptimizer (not SmartFarmPerformance)
        const optimizerLoaded = await page.evaluate(() => typeof window.performanceOptimizer !== 'undefined');
        expect(optimizerLoaded).toBe(true);
    });

    test('should load accessibility enhancer without DOM insertion errors', async ({ page }) => {
        await gotoDashboardReady(page);
        await page.waitForTimeout(1000);
        
        const domErrors = consoleErrors.filter(error => {
            const text = error.text.toLowerCase();
            return text.includes('insertbefore') ||
                   text.includes('insertadjacenthtml') ||
                   text.includes('cannot read properties of null') ||
                   text.includes('dom manipulation');
        });

        if (domErrors.length > 0) {
            console.log('DOM insertion errors found:');
            domErrors.forEach(error => {
                console.log(`- ${error.type}: ${error.text}`);
            });
        }

        expect(domErrors).toHaveLength(0);
    });

    test('should handle location selector without null reference errors', async ({ page }) => {
        await gotoDashboardReady(page);
        
        try {
            const locationButton = page.locator('button:has-text("Location")').first();
            if (await locationButton.count() > 0) {
                await locationButton.scrollIntoViewIfNeeded();
                await locationButton.click({ timeout: 8000 });
                await page.waitForTimeout(500);
            }
        } catch (error) {
            // Location button might not be visible, that's okay
        }
        
        const locationErrors = consoleErrors.filter(error => {
            const text = error.text.toLowerCase();
            return text.includes('location selector') ||
                   text.includes('location-selector') ||
                   (text.includes('insertadjacenthtml') && text.includes('location'));
        });

        if (locationErrors.length > 0) {
            console.log('Location selector errors found:');
            locationErrors.forEach(error => {
                console.log(`- ${error.type}: ${error.text}`);
            });
        }

        expect(locationErrors).toHaveLength(0);
    });

    test.afterEach(async () => {
        if (consoleErrors.length > 0 || consoleWarnings.length > 0) {
            console.log('\n=== Console Messages Summary ===');
            console.log(`Errors: ${consoleErrors.length}`);
            console.log(`Warnings: ${consoleWarnings.length}`);
        }
    });
});
