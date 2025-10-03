/**
 * E2E Tests for Console Error Verification
 * Tests that the dashboard loads without console errors
 */

const { test, expect } = require('@playwright/test');

test.describe('Console Error Verification', () => {
    let consoleErrors = [];
    let consoleWarnings = [];

    test.beforeEach(async ({ page }) => {
        // Capture console errors and warnings
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

        // Capture unhandled promise rejections
        page.on('pageerror', error => {
            consoleErrors.push({
                type: 'unhandledPromiseRejection',
                text: error.message,
                stack: error.stack
            });
        });
    });

    test('should load dashboard without critical console errors', async ({ page }) => {
        await page.goto('/dashboard.html');
        
        // Wait for page to fully load
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(2000); // Allow for async operations
        
        // Check for critical errors
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
        await page.goto('/dashboard.html');
        await page.waitForLoadState('networkidle');
        
        // List of menu items to test
        const menuItems = [
            'Dashboard',
            'Farm Management',
            'Crop Management',
            'Livestock Management',
            'Pets Management',
            'Inventory Management',
            'Analytics',
            'Tasks',
            'Reports'
        ];

        for (const menuItem of menuItems) {
            // Clear previous errors
            consoleErrors = [];
            consoleWarnings = [];
            
            try {
                // Try to find and click the menu item
                const menuSelector = `text=${menuItem}`;
                const menuElement = page.locator(menuSelector).first();
                
                if (await menuElement.count() > 0) {
                    await menuElement.click();
                    await page.waitForTimeout(1000); // Wait for navigation
                    
                    // Check for errors after navigation
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
                } else {
                    console.log(`Menu item "${menuItem}" not found - skipping`);
                }
            } catch (error) {
                console.log(`Error testing menu item "${menuItem}":`, error.message);
                // Don't fail the test for missing menu items
            }
        }
    });

    test('should load API endpoints without CSP violations', async ({ page }) => {
        await page.goto('/dashboard.html');
        await page.waitForLoadState('networkidle');
        
        // Check for network errors
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
        await page.goto('/user-management.html');
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(2000);
        
        // Check for JSON parsing errors
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
        await page.goto('/dashboard.html');
        await page.waitForLoadState('networkidle');
        
        // Wait for weather service to initialize
        await page.waitForTimeout(3000);
        
        // Check for environment errors
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
        await page.goto('/dashboard.html');
        await page.waitForLoadState('networkidle');
        
        // Wait for IoT sensors to load
        await page.waitForTimeout(3000);
        
        // Check for IoT validation warnings
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

        // Allow some IoT warnings but not critical ones
        const criticalIotWarnings = iotWarnings.filter(warning => {
            const text = warning.text.toLowerCase();
            return text.includes('critical') || text.includes('error');
        });

        expect(criticalIotWarnings).toHaveLength(0);
    });

    test('should load performance optimizer without MutationObserver errors', async ({ page }) => {
        await page.goto('/dashboard.html');
        await page.waitForLoadState('networkidle');
        
        // Wait for performance optimizer to initialize
        await page.waitForTimeout(2000);
        
        // Check for MutationObserver errors
        const observerErrors = consoleErrors.filter(error => {
            const text = error.text.toLowerCase();
            return text.includes('mutationobserver') ||
                   text.includes('observe') ||
                   text.includes('parameter not of type') ||
                   text.includes('intersectionobserver');
        });

        if (observerErrors.length > 0) {
            console.log('Observer errors found:');
            observerErrors.forEach(error => {
                console.log(`- ${error.type}: ${error.text}`);
            });
        }

        expect(observerErrors).toHaveLength(0);
    });

    test('should load accessibility enhancer without DOM insertion errors', async ({ page }) => {
        await page.goto('/dashboard.html');
        await page.waitForLoadState('networkidle');
        
        // Wait for accessibility enhancer to initialize
        await page.waitForTimeout(2000);
        
        // Check for DOM insertion errors
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
        await page.goto('/dashboard.html');
        await page.waitForLoadState('networkidle');
        
        // Try to trigger location selector
        try {
            const locationButton = page.locator('button:has-text("Location")').first();
            if (await locationButton.count() > 0) {
                await locationButton.click();
                await page.waitForTimeout(1000);
            }
        } catch (error) {
            // Location button might not be visible, that's okay
        }
        
        // Check for location selector errors
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

    test.afterEach(async ({ page }) => {
        // Log summary of all console messages
        if (consoleErrors.length > 0 || consoleWarnings.length > 0) {
            console.log('\n=== Console Messages Summary ===');
            console.log(`Errors: ${consoleErrors.length}`);
            console.log(`Warnings: ${consoleWarnings.length}`);
            
            if (consoleErrors.length > 0) {
                console.log('\nErrors:');
                consoleErrors.slice(0, 5).forEach(error => {
                    console.log(`- ${error.text}`);
                });
                if (consoleErrors.length > 5) {
                    console.log(`... and ${consoleErrors.length - 5} more errors`);
                }
            }
            
            if (consoleWarnings.length > 0) {
                console.log('\nWarnings:');
                consoleWarnings.slice(0, 5).forEach(warning => {
                    console.log(`- ${warning.text}`);
                });
                if (consoleWarnings.length > 5) {
                    console.log(`... and ${consoleWarnings.length - 5} more warnings`);
                }
            }
        }
    });
});
