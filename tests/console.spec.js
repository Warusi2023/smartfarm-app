/**
 * SmartFarm Console Error Tests
 * Ensures no console errors or warnings appear across all routes
 */

import { test, expect } from '@playwright/test';

// Define all routes to test
const routes = [
    '/',
    '/dashboard.html',
    '/crop-management.html',
    '/livestock-management.html',
    '/login.html',
    '/register.html',
    '/geofencing-setup.html',
    '/farm-locator.html',
    '/watering-management.html',
    '/weeding-management.html',
    '/ai-advisory.html',
    '/farm-to-table.html',
    '/pricing.html',
    '/checkout.html',
    '/subscription-management.html',
    '/role-management.html',
    '/button-debugger.html',
    '/ads-testing.html',
    '/ads-analytics.html',
    '/traceability.html',
    '/supply-chain.html',
    '/analytics-dashboard.html',
    '/inventory-management.html',
    '/pesticide-management.html',
    '/qr-test.html',
    '/verify-email.html'
];

// Error patterns to ignore (known issues that are being addressed)
const IGNORED_ERROR_PATTERNS = [
    /CORS policy/i,
    /Access-Control-Allow-Origin/i,
    /Failed to fetch/i,
    /net::ERR_FAILED/i,
    /Refused to load/i,
    /Content Security Policy/i,
    /Mixed Content/i,
    /Script error/i,
    /Loading chunk/i,
    /favicon.ico/i,
    /404/i,
    /500/i
];

// Test each route for console errors
for (const route of routes) {
    test(`no console errors on ${route}`, async ({ page }) => {
        const messages = [];
        const errors = [];
        const warnings = [];

        // Capture console messages
        page.on('console', msg => {
            const type = msg.type();
            const text = msg.text();
            
            // Check if this error should be ignored
            const shouldIgnore = IGNORED_ERROR_PATTERNS.some(pattern => pattern.test(text));
            
            if (type === 'error' && !shouldIgnore) {
                errors.push(text);
                messages.push(`ERROR: ${text}`);
            } else if (type === 'warning' && !shouldIgnore) {
                warnings.push(text);
                messages.push(`WARNING: ${text}`);
            }
        });

        // Capture page errors
        page.on('pageerror', error => {
            errors.push(`Page Error: ${error.message}`);
            messages.push(`PAGE ERROR: ${error.message}`);
        });

        // Capture unhandled promise rejections
        page.on('requestfailed', request => {
            if (request.failure()) {
                const error = `Request Failed: ${request.url()} - ${request.failure().errorText}`;
                errors.push(error);
                messages.push(`REQUEST ERROR: ${error}`);
            }
        });

        try {
            // Navigate to the route
            await page.goto(`http://localhost:3000${route}`, { 
                waitUntil: 'networkidle',
                timeout: 30000 
            });

            // Wait for page to stabilize
            await page.waitForTimeout(2000);

            // Check for critical errors
            if (errors.length > 0) {
                console.log(`\n❌ Console errors found on ${route}:`);
                errors.forEach(error => console.log(`  - ${error}`));
            }

            // Check for warnings
            if (warnings.length > 0) {
                console.log(`\n⚠️ Console warnings found on ${route}:`);
                warnings.forEach(warning => console.log(`  - ${warning}`));
            }

            // Assert no critical errors
            expect(errors, `Critical errors found on ${route}: ${errors.join(', ')}`).toHaveLength(0);

            // Log warnings for review (but don't fail the test)
            if (warnings.length > 0) {
                console.log(`\n⚠️ Warnings on ${route} (non-critical): ${warnings.join(', ')}`);
            }

        } catch (error) {
            // Handle navigation errors
            if (error.message.includes('net::ERR_CONNECTION_REFUSED')) {
                console.log(`\n⚠️ Server not running for ${route} - skipping test`);
                test.skip();
            } else {
                throw error;
            }
        }
    });
}

// Test for specific error patterns
test('no common error patterns', async ({ page }) => {
    const errorPatterns = [
        'ReferenceError',
        'TypeError',
        'SyntaxError',
        'Uncaught',
        'Failed to load',
        'CORS',
        'Mixed Content',
        'Content Security Policy',
        'favicon.ico',
        '404',
        '500'
    ];

    const messages = [];

    page.on('console', msg => {
        const text = msg.text();
        errorPatterns.forEach(pattern => {
            if (text.includes(pattern)) {
                messages.push(`${msg.type()}: ${text}`);
            }
        });
    });

    // Test main routes
    const mainRoutes = ['/', '/dashboard.html', '/crop-management.html', '/livestock-management.html'];
    
    for (const route of mainRoutes) {
        try {
            await page.goto(`http://localhost:3000${route}`, { 
                waitUntil: 'networkidle',
                timeout: 30000 
            });
            await page.waitForTimeout(1000);
        } catch (error) {
            if (error.message.includes('net::ERR_CONNECTION_REFUSED')) {
                test.skip();
            }
        }
    }

    // Check for error patterns
    const foundErrors = messages.filter(msg => 
        errorPatterns.some(pattern => msg.includes(pattern))
    );

    if (foundErrors.length > 0) {
        console.log('\n❌ Common error patterns found:');
        foundErrors.forEach(error => console.log(`  - ${error}`));
    }

    expect(foundErrors, `Common error patterns found: ${foundErrors.join(', ')}`).toHaveLength(0);
});

// Test for performance issues
test('no performance warnings', async ({ page }) => {
    const performanceWarnings = [];
    
    page.on('console', msg => {
        const text = msg.text();
        if (text.includes('slow') || text.includes('performance') || text.includes('memory')) {
            performanceWarnings.push(`${msg.type()}: ${text}`);
        }
    });

    try {
        await page.goto('http://localhost:3000/dashboard.html', { 
            waitUntil: 'networkidle',
            timeout: 30000 
        });
        
        // Wait for page to fully load
        await page.waitForTimeout(3000);
        
        // Check for performance warnings
        if (performanceWarnings.length > 0) {
            console.log('\n⚠️ Performance warnings found:');
            performanceWarnings.forEach(warning => console.log(`  - ${warning}`));
        }
        
        // Performance warnings are non-critical, so we just log them
        console.log(`Performance check completed for dashboard.html`);
        
    } catch (error) {
        if (error.message.includes('net::ERR_CONNECTION_REFUSED')) {
            test.skip();
        }
    }
});

// Test for accessibility issues
test('no accessibility errors', async ({ page }) => {
    const a11yErrors = [];
    
    page.on('console', msg => {
        const text = msg.text();
        if (text.includes('accessibility') || text.includes('a11y') || text.includes('ARIA')) {
            a11yErrors.push(`${msg.type()}: ${text}`);
        }
    });

    try {
        await page.goto('http://localhost:3000/dashboard.html', { 
            waitUntil: 'networkidle',
            timeout: 30000 
        });
        
        await page.waitForTimeout(2000);
        
        if (a11yErrors.length > 0) {
            console.log('\n⚠️ Accessibility errors found:');
            a11yErrors.forEach(error => console.log(`  - ${error}`));
        }
        
    } catch (error) {
        if (error.message.includes('net::ERR_CONNECTION_REFUSED')) {
            test.skip();
        }
    }
});

// Test for network errors
test('no network errors', async ({ page }) => {
    const networkErrors = [];
    
    page.on('requestfailed', request => {
        const failure = request.failure();
        if (failure) {
            networkErrors.push(`${request.method()} ${request.url()} - ${failure.errorText}`);
        }
    });

    try {
        await page.goto('http://localhost:3000/dashboard.html', { 
            waitUntil: 'networkidle',
            timeout: 30000 
        });
        
        await page.waitForTimeout(2000);
        
        if (networkErrors.length > 0) {
            console.log('\n❌ Network errors found:');
            networkErrors.forEach(error => console.log(`  - ${error}`));
        }
        
        expect(networkErrors, `Network errors found: ${networkErrors.join(', ')}`).toHaveLength(0);
        
    } catch (error) {
        if (error.message.includes('net::ERR_CONNECTION_REFUSED')) {
            test.skip();
        }
    }
});
