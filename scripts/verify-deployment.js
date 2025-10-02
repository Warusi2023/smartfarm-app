#!/usr/bin/env node

/**
 * SmartFarm Deployment Verification Script
 */

const https = require('https');

async function verifyDeployment() {
  console.log('🔍 Verifying SmartFarm Deployment...\n');
  
  // Check backend
  console.log('🔍 Checking Backend...');
  try {
    const backendHealth = await checkHealth('https://smartfarm-app-production.up.railway.app/api/health');
    console.log('✅ Backend: OK');
  } catch (error) {
    console.log('❌ Backend: Failed -', error.message);
  }
  
  // Check frontend
  console.log('🔍 Checking Frontend...');
  try {
    const frontendHealth = await checkHealth('https://dulcet-sawine-92d6a8.netlify.app');
    console.log('✅ Frontend: OK');
  } catch (error) {
    console.log('❌ Frontend: Failed -', error.message);
  }
  
  console.log('\n🎉 Deployment verification complete!');
}

function checkHealth(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode === 200) {
        resolve(true);
      } else {
        reject(new Error(`Status: ${res.statusCode}`));
      }
    }).on('error', reject);
  });
}

verifyDeployment().catch(console.error);
