#!/usr/bin/env node
/**
 * CORS Configuration Test Script
 * Tests CORS configuration from command line
 */

const https = require('https');
const http = require('http');

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  blue: '\x1b[34m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

// Configuration
const BACKEND_URL = process.env.BACKEND_URL || 'https://smartfarm-app-production.up.railway.app';
const FRONTEND_URL = process.env.FRONTEND_URL || 'https://your-site.netlify.app';

async function testCORS(endpoint, method = 'GET', origin = FRONTEND_URL) {
  return new Promise((resolve) => {
    const url = new URL(`${BACKEND_URL}${endpoint}`);
    
    const options = {
      hostname: url.hostname,
      port: url.port || (url.protocol === 'https:' ? 443 : 80),
      path: url.pathname,
      method: method,
      headers: {
        'Origin': origin,
        'Access-Control-Request-Method': method,
        'Access-Control-Request-Headers': 'Content-Type, Authorization'
      }
    };

    const client = url.protocol === 'https:' ? https : http;
    
    // Test preflight (OPTIONS) first
    const preflightOptions = { ...options, method: 'OPTIONS' };
    
    const preflightReq = client.request(preflightOptions, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        const corsHeaders = {
          'access-control-allow-origin': res.headers['access-control-allow-origin'],
          'access-control-allow-methods': res.headers['access-control-allow-methods'],
          'access-control-allow-headers': res.headers['access-control-allow-headers'],
          'access-control-max-age': res.headers['access-control-max-age']
        };

        resolve({
          preflight: {
            success: res.statusCode === 200 || res.statusCode === 204,
            statusCode: res.statusCode,
            headers: corsHeaders
          }
        });
      });
    });

    preflightReq.on('error', (error) => {
      resolve({
        preflight: {
          success: false,
          error: error.message
        }
      });
    });

    preflightReq.setTimeout(5000, () => {
      preflightReq.destroy();
      resolve({
        preflight: {
          success: false,
          error: 'Preflight request timeout'
        }
      });
    });

    preflightReq.end();
  });
}

async function testActualRequest(endpoint, method = 'GET', origin = FRONTEND_URL) {
  return new Promise((resolve) => {
    const url = new URL(`${BACKEND_URL}${endpoint}`);
    
    const options = {
      hostname: url.hostname,
      port: url.port || (url.protocol === 'https:' ? 443 : 80),
      path: url.pathname,
      method: method,
      headers: {
        'Origin': origin,
        'Content-Type': 'application/json'
      }
    };

    const client = url.protocol === 'https:' ? https : http;
    
    const req = client.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        const corsHeader = res.headers['access-control-allow-origin'];
        resolve({
          success: res.statusCode >= 200 && res.statusCode < 300,
          statusCode: res.statusCode,
          corsHeader: corsHeader,
          allowed: corsHeader === origin || corsHeader === '*'
        });
      });
    });

    req.on('error', (error) => {
      resolve({
        success: false,
        error: error.message
      });
    });

    req.setTimeout(5000, () => {
      req.destroy();
      resolve({
        success: false,
        error: 'Request timeout'
      });
    });

    req.end();
  });
}

async function runCORSTests() {
  log('\n🔒 CORS Configuration Test', 'cyan');
  log('='.repeat(60), 'cyan');
  log(`Backend URL: ${BACKEND_URL}`, 'blue');
  log(`Frontend URL (Origin): ${FRONTEND_URL}\n`, 'blue');

  const endpoints = [
    { path: '/api/health', method: 'GET', name: 'Health Check' },
    { path: '/api/auth/login', method: 'POST', name: 'Login Endpoint' },
    { path: '/api/auth/register', method: 'POST', name: 'Registration Endpoint' }
  ];

  let allPassed = true;

  for (const endpoint of endpoints) {
    log(`Testing: ${endpoint.name} (${endpoint.path})`, 'yellow');
    
    // Test preflight
    const preflightResult = await testCORS(endpoint.path, endpoint.method);
    
    if (preflightResult.preflight.success) {
      const headers = preflightResult.preflight.headers;
      log(`  ✅ Preflight (OPTIONS): Success`, 'green');
      
      if (headers['access-control-allow-origin']) {
        const allowedOrigin = headers['access-control-allow-origin'];
        if (allowedOrigin === FRONTEND_URL || allowedOrigin === '*') {
          log(`     Allowed Origin: ${allowedOrigin}`, 'green');
        } else {
          log(`     ⚠️  Allowed Origin: ${allowedOrigin} (doesn't match ${FRONTEND_URL})`, 'yellow');
          allPassed = false;
        }
      } else {
        log(`     ⚠️  No Access-Control-Allow-Origin header`, 'yellow');
        allPassed = false;
      }
    } else {
      log(`  ❌ Preflight (OPTIONS): Failed - ${preflightResult.preflight.error || `Status ${preflightResult.preflight.statusCode}`}`, 'red');
      allPassed = false;
    }

    // Test actual request
    const requestResult = await testActualRequest(endpoint.path, endpoint.method);
    
    if (requestResult.success) {
      if (requestResult.allowed) {
        log(`  ✅ Actual Request: Success (CORS headers present)`, 'green');
      } else {
        log(`  ⚠️  Actual Request: Success but CORS header doesn't match origin`, 'yellow');
        allPassed = false;
      }
    } else {
      log(`  ❌ Actual Request: Failed - ${requestResult.error || `Status ${requestResult.statusCode}`}`, 'red');
      // Don't fail if it's a 401/403 (expected for auth endpoints without credentials)
      if (requestResult.statusCode !== 401 && requestResult.statusCode !== 403) {
        allPassed = false;
      }
    }

    log(''); // Empty line
  }

  // Summary
  log('📊 CORS Test Summary', 'cyan');
  log('─'.repeat(60), 'cyan');

  if (allPassed) {
    log('✅ CORS configuration looks correct!', 'green');
    log(`   Frontend origin (${FRONTEND_URL}) should be able to access backend`, 'green');
  } else {
    log('⚠️  Some CORS issues detected', 'yellow');
    log(`   Verify ALLOWED_ORIGINS in Railway includes: ${FRONTEND_URL}`, 'yellow');
  }

  log('\n📝 Next Steps:', 'cyan');
  log('   1. Verify ALLOWED_ORIGINS in Railway includes your Netlify URL', 'blue');
  log('   2. Test from browser DevTools Console (see CORS_VERIFICATION_CHECKLIST.md)', 'blue');
  log('   3. Check for CORS errors when using the frontend', 'blue');

  log('\n✅ CORS testing complete!', 'green');
  
  return allPassed;
}

// Run tests
if (require.main === module) {
  runCORSTests()
    .then(success => process.exit(success ? 0 : 1))
    .catch(error => {
      console.error('Error:', error);
      process.exit(1);
    });
}

module.exports = { runCORSTests, testCORS, testActualRequest };
