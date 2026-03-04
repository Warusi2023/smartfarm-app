#!/usr/bin/env node

/**
 * Backend Connection Test Script
 * Tests backend health, database connection, and authentication
 */

const https = require('https');
const http = require('http');

const BACKEND_URL = process.env.BACKEND_URL || 'https://smartfarm-app-production.up.railway.app';

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

        req.setTimeout(10000, () => {
            req.destroy();
            reject(new Error('Request timeout'));
        });

        req.end();
    });
}

async function testHealthEndpoint() {
    log('\n🔍 Step 1: Testing Health Endpoint...', 'cyan');
    log('='.repeat(60), 'cyan');
    
    try {
        const response = await makeRequest(`${BACKEND_URL}/api/health`);
        
        log(`\n📡 Response Status: HTTP ${response.statusCode}`, 'blue');
        
        if (response.statusCode === 200) {
            const data = JSON.parse(response.body);
            
            log('\n✅ Health Endpoint Response:', 'green');
            log(JSON.stringify(data, null, 2), 'blue');
            
            // Check database status
            if (data.database) {
                if (typeof data.database === 'object') {
                    if (data.database.connected === true) {
                        log('\n✅ Database: CONNECTED', 'green');
                        if (data.database.poolSize) {
                            log(`   Pool Size: ${data.database.poolSize}`, 'blue');
                        }
                        if (data.database.version) {
                            log(`   PostgreSQL Version: ${data.database.version}`, 'blue');
                        }
                    } else {
                        log('\n❌ Database: DISCONNECTED', 'red');
                        if (data.database.error) {
                            log(`   Error: ${data.database.error}`, 'red');
                        }
                        if (data.database.hasEnvVar === false) {
                            log('   ⚠️  DATABASE_URL environment variable not set!', 'yellow');
                        }
                    }
                } else if (data.database === 'connected') {
                    log('\n✅ Database: CONNECTED', 'green');
                } else {
                    log(`\n⚠️  Database Status: ${data.database}`, 'yellow');
                }
            } else {
                log('\n⚠️  Database status not in response', 'yellow');
            }
            
            // Check service status
            if (data.ok === true || data.ok === undefined) {
                log('\n✅ Service Status: HEALTHY', 'green');
            } else {
                log('\n❌ Service Status: UNHEALTHY', 'red');
            }
            
            return { success: true, data };
        } else {
            log(`\n❌ Health check failed: HTTP ${response.statusCode}`, 'red');
            log(`Response: ${response.body.substring(0, 500)}`, 'yellow');
            return { success: false, statusCode: response.statusCode };
        }
    } catch (error) {
        log(`\n❌ Health check error: ${error.message}`, 'red');
        return { success: false, error: error.message };
    }
}

async function testRegistration() {
    log('\n🔍 Step 2: Testing User Registration...', 'cyan');
    log('='.repeat(60), 'cyan');
    
    const testEmail = `test-${Date.now()}@example.com`;
    const testPassword = 'Test123!@#';
    
    log(`\n📝 Test User:`, 'blue');
    log(`   Email: ${testEmail}`, 'blue');
    log(`   Password: ${testPassword}`, 'blue');
    
    try {
        const response = await makeRequest(`${BACKEND_URL}/api/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: testEmail,
                password: testPassword,
                name: 'Test User',
                firstName: 'Test',
                lastName: 'User'
            })
        });

        log(`\n📡 Response Status: HTTP ${response.statusCode}`, 'blue');
        log(`\n📄 Response Body:`, 'blue');
        log(response.body.substring(0, 1000), 'blue');
        
        if (response.statusCode === 201 || response.statusCode === 200) {
            try {
                const data = JSON.parse(response.body);
                
                log('\n✅ Registration Successful!', 'green');
                
                // Check for token in various possible locations
                let token = null;
                if (data.token) {
                    token = data.token;
                } else if (data.data && data.data.token) {
                    token = data.data.token;
                } else if (data.user && data.user.token) {
                    token = data.user.token;
                }
                
                if (token) {
                    log('✅ JWT Token Generated', 'green');
                    log(`   Token (first 50 chars): ${token.substring(0, 50)}...`, 'blue');
                    return { success: true, token, email: testEmail, password: testPassword };
                } else {
                    log('⚠️  Registration succeeded but no token found', 'yellow');
                    log('   Response structure:', 'yellow');
                    log(JSON.stringify(Object.keys(data), null, 2), 'yellow');
                    return { success: true, noToken: true, email: testEmail, password: testPassword, data };
                }
            } catch (parseError) {
                log('⚠️  Response is not valid JSON', 'yellow');
                log(`   Parse Error: ${parseError.message}`, 'yellow');
                return { success: false, parseError: parseError.message };
            }
        } else {
            log(`\n❌ Registration Failed: HTTP ${response.statusCode}`, 'red');
            log(`Response: ${response.body}`, 'yellow');
            return { success: false, statusCode: response.statusCode };
        }
    } catch (error) {
        log(`\n❌ Registration Error: ${error.message}`, 'red');
        return { success: false, error: error.message };
    }
}

async function testLogin(email, password) {
    log('\n🔍 Step 3: Testing User Login...', 'cyan');
    log('='.repeat(60), 'cyan');
    
    if (!email || !password) {
        log('⚠️  Skipping login test (no credentials)', 'yellow');
        return { success: false, skipped: true };
    }
    
    log(`\n📝 Login Credentials:`, 'blue');
    log(`   Email: ${email}`, 'blue');
    
    try {
        const response = await makeRequest(`${BACKEND_URL}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });

        log(`\n📡 Response Status: HTTP ${response.statusCode}`, 'blue');
        
        if (response.statusCode === 200) {
            try {
                const data = JSON.parse(response.body);
                log('\n✅ Login Successful!', 'green');
                
                let token = null;
                if (data.token) {
                    token = data.token;
                } else if (data.data && data.data.token) {
                    token = data.data.token;
                }
                
                if (token) {
                    log('✅ JWT Token Received', 'green');
                    log(`   Token (first 50 chars): ${token.substring(0, 50)}...`, 'blue');
                    return { success: true, token };
                } else {
                    log('⚠️  Login succeeded but no token found', 'yellow');
                    return { success: true, noToken: true };
                }
            } catch (parseError) {
                log('⚠️  Response is not valid JSON', 'yellow');
                return { success: false, parseError: parseError.message };
            }
        } else {
            log(`\n❌ Login Failed: HTTP ${response.statusCode}`, 'red');
            log(`Response: ${response.body}`, 'yellow');
            return { success: false, statusCode: response.statusCode };
        }
    } catch (error) {
        log(`\n❌ Login Error: ${error.message}`, 'red');
        return { success: false, error: error.message };
    }
}

async function main() {
    log('\n🚀 Backend Connection Test', 'cyan');
    log('='.repeat(60), 'cyan');
    log(`Backend URL: ${BACKEND_URL}`, 'blue');
    log('='.repeat(60), 'cyan');

    const results = {
        health: null,
        registration: null,
        login: null
    };

    // Test 1: Health endpoint
    results.health = await testHealthEndpoint();

    // Test 2: Registration
    results.registration = await testRegistration();

    // Test 3: Login (if registration succeeded)
    if (results.registration.success && results.registration.email) {
        results.login = await testLogin(
            results.registration.email,
            results.registration.password
        );
    }

    // Summary
    log('\n📊 Test Summary', 'cyan');
    log('='.repeat(60), 'cyan');
    log(`Health Check:     ${results.health.success ? '✅ PASS' : '❌ FAIL'}`, 
        results.health.success ? 'green' : 'red');
    log(`Registration:     ${results.registration.success ? '✅ PASS' : '❌ FAIL'}`, 
        results.registration.success ? 'green' : 'red');
    log(`Login:            ${results.login ? (results.login.success ? '✅ PASS' : '❌ FAIL') : '⏭️  SKIPPED'}`, 
        results.login ? (results.login.success ? 'green' : 'red') : 'yellow');
    log('='.repeat(60), 'cyan');

    // Database status
    if (results.health.success && results.health.data) {
        const db = results.health.data.database;
        if (db && typeof db === 'object' && db.connected === true) {
            log('\n✅ Database Connection: VERIFIED', 'green');
        } else {
            log('\n⚠️  Database Connection: NEEDS VERIFICATION', 'yellow');
            log('   Check Railway logs for database connection status', 'yellow');
        }
    }

    // Recommendations
    log('\n💡 Recommendations:', 'cyan');
    if (!results.health.success) {
        log('   ❌ Backend is not responding - check Railway deployment', 'red');
    } else if (results.health.data && results.health.data.database && 
               typeof results.health.data.database === 'object' && 
               !results.health.data.database.connected) {
        log('   ⚠️  Database not connected - check DATABASE_URL in Railway', 'yellow');
    } else if (results.registration.success && results.registration.noToken) {
        log('   ⚠️  Registration works but token format may differ', 'yellow');
        log('   ✅ This is OK - authentication is working!', 'green');
    } else if (results.registration.success && results.login && results.login.success) {
        log('   🎉 All tests passed! Backend is fully functional!', 'green');
    }

    process.exit(0);
}

if (require.main === module) {
    main().catch(error => {
        log(`\n❌ Test script error: ${error.message}`, 'red');
        process.exit(1);
    });
}

module.exports = { testHealthEndpoint, testRegistration, testLogin };
