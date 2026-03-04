#!/usr/bin/env node
/**
 * Performance Testing Script
 * Tests API response times and basic performance metrics
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
const API_URL = process.env.API_URL || 'https://smartfarm-app-production.up.railway.app';
const MAX_RESPONSE_TIME = 2000; // 2 seconds
const MAX_PAGE_LOAD_TIME = 3000; // 3 seconds

async function testApiEndpoint(endpoint, method = 'GET') {
  return new Promise((resolve) => {
    const url = new URL(`${API_URL}${endpoint}`);
    const startTime = Date.now();
    
    const options = {
      hostname: url.hostname,
      port: url.port || (url.protocol === 'https:' ? 443 : 80),
      path: url.pathname,
      method: method,
      headers: {
        'User-Agent': 'SmartFarm-Performance-Test/1.0'
      }
    };

    const client = url.protocol === 'https:' ? https : http;
    
    const req = client.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        const endTime = Date.now();
        const responseTime = endTime - startTime;
        
        resolve({
          success: res.statusCode >= 200 && res.statusCode < 300,
          statusCode: res.statusCode,
          responseTime: responseTime,
          size: data.length
        });
      });
    });

    req.on('error', (error) => {
      resolve({
        success: false,
        error: error.message,
        responseTime: Date.now() - startTime
      });
    });

    req.setTimeout(10000, () => {
      req.destroy();
      resolve({
        success: false,
        error: 'Request timeout',
        responseTime: Date.now() - startTime
      });
    });

    req.end();
  });
}

async function runPerformanceTests() {
  log('\n⚡ Performance Testing', 'cyan');
  log('='.repeat(60), 'cyan');
  log(`Testing API: ${API_URL}\n`, 'blue');

  const endpoints = [
    { path: '/api/health', name: 'Health Check' },
    { path: '/api/auth/register', name: 'Registration Endpoint', method: 'POST' },
    { path: '/api/auth/login', name: 'Login Endpoint', method: 'POST' },
    // Add more endpoints as needed
  ];

  let allPassed = true;
  const results = [];

  for (const endpoint of endpoints) {
    log(`Testing: ${endpoint.name} (${endpoint.path})`, 'yellow');
    
    const result = await testApiEndpoint(endpoint.path, endpoint.method || 'GET');
    results.push({ ...endpoint, ...result });

    if (result.success) {
      if (result.responseTime <= MAX_RESPONSE_TIME) {
        log(`  ✅ Success: ${result.responseTime}ms (Status: ${result.statusCode})`, 'green');
      } else {
        log(`  ⚠️  Slow: ${result.responseTime}ms (exceeds ${MAX_RESPONSE_TIME}ms limit)`, 'yellow');
        allPassed = false;
      }
    } else {
      log(`  ❌ Failed: ${result.error || `Status ${result.statusCode}`}`, 'red');
      allPassed = false;
    }
  }

  // Summary
  log('\n📊 Performance Summary', 'cyan');
  log('─'.repeat(60), 'cyan');

  const avgResponseTime = results
    .filter(r => r.success)
    .reduce((sum, r) => sum + r.responseTime, 0) / results.filter(r => r.success).length || 0;

  log(`Average Response Time: ${avgResponseTime.toFixed(2)}ms`, 'blue');
  log(`Target: < ${MAX_RESPONSE_TIME}ms`, 'blue');
  
  const slowEndpoints = results.filter(r => r.success && r.responseTime > MAX_RESPONSE_TIME);
  if (slowEndpoints.length > 0) {
    log(`\n⚠️  Slow Endpoints (>${MAX_RESPONSE_TIME}ms):`, 'yellow');
    slowEndpoints.forEach(ep => {
      log(`  - ${ep.name}: ${ep.responseTime}ms`, 'yellow');
    });
  }

  const failedEndpoints = results.filter(r => !r.success);
  if (failedEndpoints.length > 0) {
    log(`\n❌ Failed Endpoints:`, 'red');
    failedEndpoints.forEach(ep => {
      log(`  - ${ep.name}: ${ep.error || `Status ${ep.statusCode}`}`, 'red');
    });
  }

  log('\n📝 Recommendations:', 'cyan');
  if (avgResponseTime > MAX_RESPONSE_TIME) {
    log('  - Consider optimizing slow endpoints', 'yellow');
    log('  - Add caching for frequently accessed data', 'yellow');
    log('  - Optimize database queries', 'yellow');
  }
  log('  - Run Lighthouse audit for frontend performance', 'blue');
  log('  - Test with slow network throttling', 'blue');
  log('  - Monitor memory usage', 'blue');

  log('\n✅ Performance testing complete!', allPassed ? 'green' : 'yellow');
  
  return allPassed;
}

// Run tests
if (require.main === module) {
  runPerformanceTests()
    .then(success => process.exit(success ? 0 : 1))
    .catch(error => {
      console.error('Error:', error);
      process.exit(1);
    });
}

module.exports = { runPerformanceTests, testApiEndpoint };
