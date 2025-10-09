#!/usr/bin/env node

/**
 * CORS Test Script for SmartFarm
 * Tests GET and OPTIONS (preflight) requests to verify CORS configuration
 */

import fetch from 'node-fetch';

// Configuration
const ORIGIN = 'https://www.smartfarm-app.com';
const BACKUP_ORIGIN = 'https://smartfarm-app.netlify.app';
const API_URL = process.env.API_URL || 'https://smartfarm-app-production.up.railway.app/api/health';

console.log('🧪 Testing CORS Configuration for SmartFarm');
console.log('=' .repeat(50));
console.log(`API URL: ${API_URL}`);
console.log(`Testing Origin: ${ORIGIN}`);
console.log('');

async function testGetRequest() {
    console.log('📡 Testing GET request...');
    try {
        const response = await fetch(API_URL, {
            method: 'GET',
            headers: {
                'Origin': ORIGIN
            }
        });
        
        console.log(`Status: ${response.status}`);
        console.log(`Headers:`, [...response.headers.entries()]);
        
        const text = await response.text();
        console.log(`Response: ${text}`);
        
        // Check CORS headers
        const corsOrigin = response.headers.get('access-control-allow-origin');
        const corsMethods = response.headers.get('access-control-allow-methods');
        const corsHeaders = response.headers.get('access-control-allow-headers');
        
        console.log('');
        console.log('🔍 CORS Headers Analysis:');
        console.log(`Access-Control-Allow-Origin: ${corsOrigin || 'NOT SET'}`);
        console.log(`Access-Control-Allow-Methods: ${corsMethods || 'NOT SET'}`);
        console.log(`Access-Control-Allow-Headers: ${corsHeaders || 'NOT SET'}`);
        
        if (corsOrigin === ORIGIN) {
            console.log('✅ CORS Origin header is correct!');
        } else if (corsOrigin === '*') {
            console.log('⚠️  CORS Origin is set to wildcard (less secure)');
        } else {
            console.log(`❌ CORS Origin mismatch! Expected: ${ORIGIN}, Got: ${corsOrigin}`);
        }
        
        return response.status === 200;
    } catch (error) {
        console.error('❌ GET request failed:', error.message);
        return false;
    }
}

async function testPreflightRequest() {
    console.log('');
    console.log('🛩️  Testing OPTIONS (preflight) request...');
    try {
        const response = await fetch(API_URL, {
            method: 'OPTIONS',
            headers: {
                'Origin': ORIGIN,
                'Access-Control-Request-Method': 'GET',
                'Access-Control-Request-Headers': 'Content-Type,Authorization'
            }
        });
        
        console.log(`Status: ${response.status}`);
        console.log(`Headers:`, [...response.headers.entries()]);
        
        // Check CORS headers for preflight
        const corsOrigin = response.headers.get('access-control-allow-origin');
        const corsMethods = response.headers.get('access-control-allow-methods');
        const corsHeaders = response.headers.get('access-control-allow-headers');
        const corsMaxAge = response.headers.get('access-control-max-age');
        
        console.log('');
        console.log('🔍 Preflight CORS Headers:');
        console.log(`Access-Control-Allow-Origin: ${corsOrigin || 'NOT SET'}`);
        console.log(`Access-Control-Allow-Methods: ${corsMethods || 'NOT SET'}`);
        console.log(`Access-Control-Allow-Headers: ${corsHeaders || 'NOT SET'}`);
        console.log(`Access-Control-Max-Age: ${corsMaxAge || 'NOT SET'}`);
        
        const isSuccess = response.status === 200 || response.status === 204;
        const hasCorrectOrigin = corsOrigin === ORIGIN;
        const hasMethods = corsMethods && corsMethods.includes('GET');
        
        if (isSuccess && hasCorrectOrigin && hasMethods) {
            console.log('✅ Preflight request successful!');
        } else {
            console.log('❌ Preflight request failed!');
            if (!isSuccess) console.log(`   Status should be 200 or 204, got ${response.status}`);
            if (!hasCorrectOrigin) console.log(`   Origin should be ${ORIGIN}, got ${corsOrigin}`);
            if (!hasMethods) console.log(`   Methods should include GET, got ${corsMethods}`);
        }
        
        return isSuccess && hasCorrectOrigin && hasMethods;
    } catch (error) {
        console.error('❌ OPTIONS request failed:', error.message);
        return false;
    }
}

async function testBackupOrigin() {
    console.log('');
    console.log(`🔄 Testing backup origin: ${BACKUP_ORIGIN}...`);
    try {
        const response = await fetch(API_URL, {
            method: 'GET',
            headers: {
                'Origin': BACKUP_ORIGIN
            }
        });
        
        const corsOrigin = response.headers.get('access-control-allow-origin');
        console.log(`Status: ${response.status}`);
        console.log(`CORS Origin: ${corsOrigin || 'NOT SET'}`);
        
        if (corsOrigin === BACKUP_ORIGIN) {
            console.log('✅ Backup origin CORS is working!');
            return true;
        } else {
            console.log(`❌ Backup origin CORS failed! Expected: ${BACKUP_ORIGIN}, Got: ${corsOrigin}`);
            return false;
        }
    } catch (error) {
        console.error('❌ Backup origin test failed:', error.message);
        return false;
    }
}

async function runTests() {
    const getResult = await testGetRequest();
    const preflightResult = await testPreflightRequest();
    const backupResult = await testBackupOrigin();
    
    console.log('');
    console.log('📊 Test Results Summary:');
    console.log('=' .repeat(30));
    console.log(`GET Request: ${getResult ? '✅ PASS' : '❌ FAIL'}`);
    console.log(`Preflight: ${preflightResult ? '✅ PASS' : '❌ FAIL'}`);
    console.log(`Backup Origin: ${backupResult ? '✅ PASS' : '❌ FAIL'}`);
    
    const allPassed = getResult && preflightResult && backupResult;
    console.log('');
    console.log(`Overall Result: ${allPassed ? '✅ ALL TESTS PASSED' : '❌ SOME TESTS FAILED'}`);
    
    if (allPassed) {
        console.log('');
        console.log('🎉 CORS configuration is working correctly!');
        console.log('Your frontend should be able to connect to the API without CORS issues.');
    } else {
        console.log('');
        console.log('🚨 CORS configuration needs attention.');
        console.log('Check your backend CORS settings and environment variables.');
    }
    
    process.exit(allPassed ? 0 : 1);
}

// Run the tests
runTests().catch(error => {
    console.error('💥 Test runner failed:', error);
    process.exit(1);
});
