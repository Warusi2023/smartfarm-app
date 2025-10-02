#!/usr/bin/env node

/**
 * CORS Update Script for Railway
 * This script helps update CORS configuration on Railway
 */

const environment = require('./config/environment');

console.log('🔧 SmartFarm CORS Configuration Update');
console.log('=====================================');
console.log('');

console.log('Current CORS Origins:');
environment.CORS_ORIGIN.forEach((origin, index) => {
    console.log(`  ${index + 1}. ${origin}`);
});

console.log('');
console.log('🚨 IMPORTANT: Update Railway Environment Variables');
console.log('');
console.log('Go to your Railway project dashboard and update the CORS_ORIGIN variable:');
console.log('');
console.log('CORS_ORIGIN=https://www.smartfarm-app.com,https://smartfarm-app.com,https://dulcet-sawine-92d6a8.netlify.app,http://localhost:3000,http://localhost:8080');
console.log('');
console.log('Steps:');
console.log('1. Go to https://railway.app/dashboard');
console.log('2. Select your SmartFarm backend project');
console.log('3. Go to Variables tab');
console.log('4. Update CORS_ORIGIN with the value above');
console.log('5. Redeploy the service');
console.log('');
console.log('After updating, your geofencing setup should work!');
console.log('');

// Check if we're in production
if (environment.IS_PRODUCTION) {
    console.log('⚠️  You are in PRODUCTION mode');
    console.log('Make sure to update Railway environment variables before testing');
} else {
    console.log('ℹ️  You are in DEVELOPMENT mode');
    console.log('CORS should work with localhost origins');
}

console.log('');
console.log('✅ CORS update instructions complete');
