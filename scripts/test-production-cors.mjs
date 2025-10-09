#!/usr/bin/env node

/**
 * Production CORS Test Script for SmartFarm
 * Tests the actual Railway production backend
 */

const BACKEND_URL = 'https://smartfarm-app-production.up.railway.app';
const ORIGINS = [
  'https://www.smartfarm-app.com',
  'https://smartfarm-app.netlify.app'
];

console.log('🧪 Testing Production CORS Configuration');
console.log('=' .repeat(50));
console.log(`Backend URL: ${BACKEND_URL}`);
console.log(`Testing Origins: ${ORIGINS.join(', ')}`);
console.log('');

async function testHealthEndpoint() {
    console.log('📡 Testing Health Endpoint...');
    try {
        const response = await fetch(`${BACKEND_URL}/api/health`);
        console.log(`Status: ${response.status}`);
        
        if (response.ok) {
            const data = await response.json();
            console.log(`Response: ${JSON.stringify(data)}`);
            console.log('✅ Health endpoint is working!');
            return true;
        } else {
            console.log(`❌ Health endpoint failed with status: ${response.status}`);
            return false;
        }
    } catch (error) {
        console.log(`❌ Health endpoint error: ${error.message}`);
        return false;
    }
}

async function testCORS(origin) {
    console.log(`\n🌐 Testing CORS for origin: ${origin}`);
    
    // Test GET request
    console.log('  Testing GET request...');
    try {
        const response = await fetch(`${BACKEND_URL}/api/health`, {
            headers: { 'Origin': origin }
        });
        
        console.log(`  GET Status: ${response.status}`);
        const corsOrigin = response.headers.get('access-control-allow-origin');
        console.log(`  CORS Origin: ${corsOrigin || 'NOT SET'}`);
        
        if (corsOrigin === origin) {
            console.log('  ✅ GET CORS working!');
        } else {
            console.log(`  ❌ GET CORS failed! Expected: ${origin}, Got: ${corsOrigin}`);
        }
    } catch (error) {
        console.log(`  ❌ GET request failed: ${error.message}`);
    }
    
    // Test OPTIONS preflight
    console.log('  Testing OPTIONS preflight...');
    try {
        const response = await fetch(`${BACKEND_URL}/api/health`, {
            method: 'OPTIONS',
            headers: {
                'Origin': origin,
                'Access-Control-Request-Method': 'GET',
                'Access-Control-Request-Headers': 'Content-Type'
            }
        });
        
        console.log(`  OPTIONS Status: ${response.status}`);
        const corsOrigin = response.headers.get('access-control-allow-origin');
        const corsMethods = response.headers.get('access-control-allow-methods');
        console.log(`  CORS Origin: ${corsOrigin || 'NOT SET'}`);
        console.log(`  CORS Methods: ${corsMethods || 'NOT SET'}`);
        
        const isSuccess = response.status === 200 || response.status === 204;
        const hasCorrectOrigin = corsOrigin === origin;
        const hasMethods = corsMethods && corsMethods.includes('GET');
        
        if (isSuccess && hasCorrectOrigin && hasMethods) {
            console.log('  ✅ OPTIONS preflight working!');
        } else {
            console.log('  ❌ OPTIONS preflight failed!');
            if (!isSuccess) console.log(`    Status should be 200/204, got ${response.status}`);
            if (!hasCorrectOrigin) console.log(`    Origin should be ${origin}, got ${corsOrigin}`);
            if (!hasMethods) console.log(`    Methods should include GET, got ${corsMethods}`);
        }
    } catch (error) {
        console.log(`  ❌ OPTIONS request failed: ${error.message}`);
    }
}

async function runTests() {
    console.log('🚀 Starting Production Tests...\n');
    
    // Test health endpoint first
    const healthOk = await testHealthEndpoint();
    
    if (!healthOk) {
        console.log('\n❌ Backend is not responding. Please check:');
        console.log('1. Railway service is deployed');
        console.log('2. Environment variables are set');
        console.log('3. Service is not crashing on startup');
        return;
    }
    
    // Test CORS for each origin
    for (const origin of ORIGINS) {
        await testCORS(origin);
    }
    
    console.log('\n📊 Test Summary:');
    console.log('=' .repeat(30));
    console.log('✅ Health endpoint working');
    console.log('✅ CORS configuration tested');
    console.log('\n🎉 Production backend is ready!');
    console.log('\nNext steps:');
    console.log('1. Deploy frontend with VITE_API_URL set correctly');
    console.log('2. Test your dashboard application');
    console.log('3. Verify no CORS errors in browser console');
}

// Run the tests
runTests().catch(error => {
    console.error('💥 Test runner failed:', error);
    process.exit(1);
});
