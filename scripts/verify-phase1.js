#!/usr/bin/env node

/**
 * Phase 1 Verification Script
 * Tests backend and frontend connectivity
 */

const https = require('https');
const http = require('http');

// Configuration - Update these with your URLs
const BACKEND_URL = process.env.BACKEND_URL || 'https://smartfarm-app-production.up.railway.app';
const FRONTEND_URL = process.env.FRONTEND_URL || 'https://your-site.netlify.app';

const colors = {
    reset: '\x1b[0m',
    green: '\x1b[32m',
    red: '\x1b[31m',
    yellow: '\x1b[33m',
    blue: '\x1b[36m',
    cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
    console.log(`${colors[color]}${message}${colors.reset}`);
}

function makeRequest(url, options = {}) {
    return new Promise((resolve, reject) => {
        const urlObj = new URL(url);
        const protocol = urlObj.protocol === 'https:' ? https : http;
        
        const reqOptions = {
            hostname: urlObj.hostname,
            port: urlObj.port || (urlObj.protocol === 'https:' ? 443 : 80),
            path: urlObj.pathname + urlObj.search,
            method: options.method || 'GET',
            headers: options.headers || {}
        };

        const req = protocol.request(reqOptions, (res) => {
            let data = '';
            res.on('data', (chunk) => { data += chunk; });
            res.on('end', () => {
                resolve({
                    statusCode: res.statusCode,
                    headers: res.headers,
                    body: data
                });
            });
        });

        req.on('error', (error) => {
            reject(error);
        });

        if (options.body) {
            req.write(options.body);
        }

        req.end();
    });
}

async function testBackendHealth() {
    log('\n🔍 Testing Backend Health Endpoint...', 'cyan');
    try {
        const response = await makeRequest(`${BACKEND_URL}/api/health`);
        
        if (response.statusCode === 200) {
            const data = JSON.parse(response.body);
            log('✅ Backend health check passed', 'green');
            log(`   Service: ${data.service || data.API_NAME || 'SmartFarm'}`, 'blue');
            log(`   Status: ${data.ok ? 'OK' : 'FAIL'}`, data.ok ? 'green' : 'red');
            log(`   Environment: ${data.env || data.environment || 'unknown'}`, 'blue');
            
            // Check database status (format varies)
            if (data.database) {
                if (typeof data.database === 'object') {
                    log(`   Database: ${data.database.connected ? '✅ Connected' : '❌ Disconnected'}`, 
                        data.database.connected ? 'green' : 'red');
                    if (data.database.error) {
                        log(`   Database Error: ${data.database.error}`, 'yellow');
                    }
                } else {
                    log(`   Database: ${data.database}`, 'blue');
                }
            } else {
                log(`   Database: Status unknown`, 'yellow');
            }
            
            return data.ok !== false; // Return true if ok is true or undefined
        } else {
            log(`❌ Backend health check failed: HTTP ${response.statusCode}`, 'red');
            log(`   Response: ${response.body.substring(0, 200)}`, 'yellow');
            return false;
        }
    } catch (error) {
        log(`❌ Backend health check failed: ${error.message}`, 'red');
        if (error.message.includes('JSON')) {
            log(`   Raw response: ${error.response?.body?.substring(0, 200) || 'N/A'}`, 'yellow');
        }
        return false;
    }
}

async function testBackendAuth() {
    log('\n🔍 Testing Backend Authentication Endpoints...', 'cyan');
    
    // Test registration endpoint
    try {
        const testEmail = `test-${Date.now()}@example.com`;
        const response = await makeRequest(`${BACKEND_URL}/api/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: testEmail,
                password: 'Test123!@#',
                name: 'Test User',
                firstName: 'Test',
                lastName: 'User'
            })
        });

        if (response.statusCode === 201 || response.statusCode === 200) {
            log('✅ Registration endpoint works', 'green');
            try {
                const data = JSON.parse(response.body);
                if (data.token || data.data?.token) {
                    const token = data.token || data.data.token;
                    log('✅ JWT token generated correctly', 'green');
                    return { success: true, token };
                } else {
                    log('⚠️  Registration succeeded but no token in response', 'yellow');
                    log(`   Response keys: ${Object.keys(data).join(', ')}`, 'yellow');
                    // Still consider it a success if status is 201/200
                    return { success: true };
                }
            } catch (parseError) {
                log('⚠️  Registration response is not valid JSON', 'yellow');
                log(`   Response: ${response.body.substring(0, 200)}`, 'yellow');
                // If status is 201/200, consider it success even if we can't parse
                return { success: true };
            }
        } else {
            log(`⚠️  Registration endpoint returned: HTTP ${response.statusCode}`, 'yellow');
            log(`   Response: ${response.body.substring(0, 200)}`, 'yellow');
            return { success: false };
        }
    } catch (error) {
        log(`❌ Registration endpoint test failed: ${error.message}`, 'red');
    }
    
    return { success: false };
}

async function testFrontend() {
    log('\n🔍 Testing Frontend Availability...', 'cyan');
    try {
        const response = await makeRequest(FRONTEND_URL);
        
        if (response.statusCode === 200) {
            log('✅ Frontend is accessible', 'green');
            log(`   Status Code: ${response.statusCode}`, 'blue');
            
            // Check if it's HTML (not just a redirect)
            const contentType = response.headers['content-type'] || '';
            if (contentType.includes('text/html')) {
                log('✅ Frontend returns HTML content', 'green');
            }
            
            return true;
        } else {
            log(`⚠️  Frontend returned: HTTP ${response.statusCode}`, 'yellow');
            return false;
        }
    } catch (error) {
        log(`❌ Frontend test failed: ${error.message}`, 'red');
        log('   Make sure FRONTEND_URL is set correctly', 'yellow');
        return false;
    }
}

async function checkEnvironmentVariables() {
    log('\n🔍 Checking Environment Variables...', 'cyan');
    
    const required = ['DATABASE_URL', 'JWT_SECRET', 'NODE_ENV'];
    const optional = ['WEATHER_API_KEY', 'GOOGLE_API_KEY', 'OPENAI_API_KEY'];
    
    log('   Required variables:', 'blue');
    required.forEach(varName => {
        if (process.env[varName]) {
            log(`   ✅ ${varName} is set`, 'green');
        } else {
            log(`   ❌ ${varName} is NOT set`, 'red');
        }
    });
    
    log('   Optional variables:', 'blue');
    optional.forEach(varName => {
        if (process.env[varName]) {
            log(`   ✅ ${varName} is set`, 'green');
        } else {
            log(`   ⚠️  ${varName} is not set (optional)`, 'yellow');
        }
    });
}

async function main() {
    log('🚀 Phase 1 Verification Script', 'cyan');
    log('='.repeat(60), 'cyan');
    log(`Backend URL: ${BACKEND_URL}`, 'blue');
    log(`Frontend URL: ${FRONTEND_URL}`, 'blue');
    log('='.repeat(60), 'cyan');

    const results = {
        backendHealth: false,
        backendAuth: false,
        frontend: false
    };

    // Test backend health
    results.backendHealth = await testBackendHealth();

    // Test backend auth
    const authResult = await testBackendAuth();
    results.backendAuth = authResult.success;

    // Test frontend
    results.frontend = await testFrontend();

    // Check environment variables (if running locally)
    if (process.env.DATABASE_URL || process.env.JWT_SECRET) {
        await checkEnvironmentVariables();
    }

    // Summary
    log('\n📊 Verification Summary', 'cyan');
    log('='.repeat(60), 'cyan');
    log(`Backend Health: ${results.backendHealth ? '✅ PASS' : '❌ FAIL'}`, results.backendHealth ? 'green' : 'red');
    log(`Backend Auth:   ${results.backendAuth ? '✅ PASS' : '❌ FAIL'}`, results.backendAuth ? 'green' : 'red');
    log(`Frontend:       ${results.frontend ? '✅ PASS' : '❌ FAIL'}`, results.frontend ? 'green' : 'red');
    log('='.repeat(60), 'cyan');

    const allPassed = results.backendHealth && results.backendAuth && results.frontend;
    
    if (allPassed) {
        log('\n🎉 All checks passed! Phase 1 verification complete!', 'green');
        process.exit(0);
    } else {
        log('\n⚠️  Some checks failed. Please review the errors above.', 'yellow');
        log('   See PHASE1_PRODUCTION_SETUP_GUIDE.md for troubleshooting', 'yellow');
        process.exit(1);
    }
}

// Run if executed directly
if (require.main === module) {
    main().catch(error => {
        log(`\n❌ Verification script error: ${error.message}`, 'red');
        process.exit(1);
    });
}

module.exports = { testBackendHealth, testBackendAuth, testFrontend };

