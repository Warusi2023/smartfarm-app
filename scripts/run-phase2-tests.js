#!/usr/bin/env node

/**
 * Phase 2 Automated Testing Script
 * Runs automated tests for Phase 2 verification
 */

const https = require('https');
const http = require('http');

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

const testResults = {
    passed: 0,
    failed: 0,
    skipped: 0,
    tests: []
};

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

        req.setTimeout(10000, () => {
            req.destroy();
            reject(new Error('Request timeout'));
        });

        req.end();
    });
}

function recordTest(name, passed, message = '') {
    testResults.tests.push({ name, passed, message });
    if (passed) {
        testResults.passed++;
        log(`  ✅ ${name}`, 'green');
    } else {
        testResults.failed++;
        log(`  ❌ ${name}`, 'red');
        if (message) log(`     ${message}`, 'yellow');
    }
}

async function testHealthEndpoint() {
    log('\n🔍 Testing Health Endpoint...', 'cyan');
    try {
        const startTime = Date.now();
        const response = await makeRequest(`${BACKEND_URL}/api/health`);
        const responseTime = Date.now() - startTime;
        
        const passed = response.statusCode === 200;
        recordTest('Health endpoint returns 200', passed, 
            passed ? `Response time: ${responseTime}ms` : `Got ${response.statusCode}`);
        
        if (passed) {
            try {
                const data = JSON.parse(response.body);
                recordTest('Health response is valid JSON', true);
                recordTest('Health response time < 2s', responseTime < 2000,
                    `Response time: ${responseTime}ms`);
            } catch (e) {
                recordTest('Health response is valid JSON', false, e.message);
            }
        }
    } catch (error) {
        recordTest('Health endpoint accessible', false, error.message);
    }
}

async function testAuthEndpoints() {
    log('\n🔍 Testing Authentication Endpoints...', 'cyan');
    
    // Test registration
    try {
        const testEmail = `test-phase2-${Date.now()}@example.com`;
        const startTime = Date.now();
        const response = await makeRequest(`${BACKEND_URL}/api/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: testEmail,
                password: 'Test123!@#',
                name: 'Test User',
                firstName: 'Test',
                lastName: 'User'
            })
        });
        const responseTime = Date.now() - startTime;
        
        const passed = response.statusCode === 201 || response.statusCode === 200;
        recordTest('Registration endpoint works', passed,
            passed ? `Response time: ${responseTime}ms` : `Got ${response.statusCode}`);
        
        if (passed) {
            try {
                const data = JSON.parse(response.body);
                const hasToken = !!(data.token || data.data?.token);
                recordTest('Registration returns token', hasToken);
                recordTest('Registration response time < 2s', responseTime < 2000,
                    `Response time: ${responseTime}ms`);
                
                // Test login with same credentials
                if (hasToken) {
                    await testLogin(testEmail);
                }
            } catch (e) {
                recordTest('Registration response is valid JSON', false, e.message);
            }
        }
    } catch (error) {
        recordTest('Registration endpoint accessible', false, error.message);
    }
}

async function testLogin(email) {
    try {
        const startTime = Date.now();
        const response = await makeRequest(`${BACKEND_URL}/api/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: email,
                password: 'Test123!@#'
            })
        });
        const responseTime = Date.now() - startTime;
        
        const passed = response.statusCode === 200;
        recordTest('Login endpoint works', passed,
            passed ? `Response time: ${responseTime}ms` : `Got ${response.statusCode}`);
        
        if (passed) {
            try {
                const data = JSON.parse(response.body);
                const hasToken = !!(data.token || data.data?.token);
                recordTest('Login returns token', hasToken);
                recordTest('Login response time < 2s', responseTime < 2000,
                    `Response time: ${responseTime}ms`);
            } catch (e) {
                recordTest('Login response is valid JSON', false, e.message);
            }
        }
    } catch (error) {
        recordTest('Login endpoint accessible', false, error.message);
    }
}

async function testProtectedEndpoints() {
    log('\n🔍 Testing Protected Endpoints...', 'cyan');
    
    // Test without token
    try {
        const response = await makeRequest(`${BACKEND_URL}/api/farms`);
        recordTest('Protected endpoint requires auth', response.statusCode === 401,
            `Got ${response.statusCode}, expected 401`);
    } catch (error) {
        recordTest('Protected endpoint accessible', false, error.message);
    }
}

async function testFrontend() {
    log('\n🔍 Testing Frontend...', 'cyan');
    
    try {
        const startTime = Date.now();
        const response = await makeRequest(FRONTEND_URL);
        const responseTime = Date.now() - startTime;
        
        const passed = response.statusCode === 200;
        recordTest('Frontend is accessible', passed,
            passed ? `Response time: ${responseTime}ms` : `Got ${response.statusCode}`);
        
        if (passed) {
            recordTest('Frontend returns HTML', 
                (response.headers['content-type'] || '').includes('text/html'));
            recordTest('Frontend load time < 3s', responseTime < 3000,
                `Load time: ${responseTime}ms`);
        }
    } catch (error) {
        recordTest('Frontend is accessible', false, error.message);
    }
}

async function testPerformance() {
    log('\n🔍 Testing Performance...', 'cyan');
    
    // Test multiple endpoints for average response time
    const endpoints = [
        '/api/health',
        '/api/auth/register'
    ];
    
    let totalTime = 0;
    let successCount = 0;
    
    for (const endpoint of endpoints) {
        try {
            const startTime = Date.now();
            const response = await makeRequest(`${BACKEND_URL}${endpoint}`, {
                method: endpoint.includes('register') ? 'POST' : 'GET',
                headers: endpoint.includes('register') ? { 'Content-Type': 'application/json' } : {},
                body: endpoint.includes('register') ? JSON.stringify({
                    email: `perf-test-${Date.now()}@example.com`,
                    password: 'Test123!@#',
                    name: 'Test',
                    firstName: 'Test',
                    lastName: 'User'
                }) : undefined
            });
            const responseTime = Date.now() - startTime;
            
            if (response.statusCode < 400) {
                totalTime += responseTime;
                successCount++;
            }
        } catch (error) {
            // Skip failed requests
        }
    }
    
    if (successCount > 0) {
        const avgTime = totalTime / successCount;
        recordTest('Average API response time < 2s', avgTime < 2000,
            `Average: ${Math.round(avgTime)}ms`);
    }
}

async function main() {
    log('\n🧪 Phase 2 Automated Testing', 'cyan');
    log('='.repeat(60), 'cyan');
    log(`Backend URL: ${BACKEND_URL}`, 'blue');
    log(`Frontend URL: ${FRONTEND_URL}`, 'blue');
    log('='.repeat(60), 'cyan');
    
    // Run tests
    await testHealthEndpoint();
    await testAuthEndpoints();
    await testProtectedEndpoints();
    await testFrontend();
    await testPerformance();
    
    // Summary
    log('\n📊 Test Summary', 'cyan');
    log('='.repeat(60), 'cyan');
    log(`Total Tests: ${testResults.passed + testResults.failed}`, 'blue');
    log(`Passed: ${testResults.passed}`, 'green');
    log(`Failed: ${testResults.failed}`, testResults.failed > 0 ? 'red' : 'green');
    log('='.repeat(60), 'cyan');
    
    // Detailed results
    if (testResults.failed > 0) {
        log('\n❌ Failed Tests:', 'red');
        testResults.tests.filter(t => !t.passed).forEach(test => {
            log(`  - ${test.name}`, 'red');
            if (test.message) log(`    ${test.message}`, 'yellow');
        });
    }
    
    // Recommendations
    log('\n💡 Recommendations:', 'cyan');
    if (testResults.failed === 0) {
        log('  🎉 All automated tests passed!', 'green');
        log('  ✅ Proceed with manual testing (see PHASE2_TESTING_QA_GUIDE.md)', 'green');
    } else {
        log('  ⚠️  Some tests failed. Review errors above.', 'yellow');
        log('  📝 See PHASE2_TESTING_QA_GUIDE.md for detailed testing guide', 'yellow');
    }
    
    log('\n📝 Note: This script tests basic functionality.', 'blue');
    log('   Complete manual testing using PHASE2_TESTING_CHECKLIST.md', 'blue');
    
    process.exit(testResults.failed > 0 ? 1 : 0);
}

if (require.main === module) {
    main().catch(error => {
        log(`\n❌ Test script error: ${error.message}`, 'red');
        process.exit(1);
    });
}

module.exports = { testHealthEndpoint, testAuthEndpoints, testFrontend };
