/**
 * Test Backend Connection Script
 * Diagnoses ERR_CONNECTION_RESET errors
 */

const https = require('https');

const BACKEND_URL = process.env.BACKEND_URL || 'https://smartfarm-app-production.up.railway.app';

console.log('🔍 Testing backend connection...');
console.log('URL:', BACKEND_URL);
console.log('');

// Test health endpoint
https.get(`${BACKEND_URL}/api/health`, (res) => {
  let data = '';
  
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    console.log('✅ Backend is responding!');
    console.log('Status Code:', res.statusCode);
    console.log('Response:', data);
    console.log('');
    
    try {
      const json = JSON.parse(data);
      if (json.ok) {
        console.log('✅ Health check passed!');
        console.log('Environment:', json.environment);
        console.log('Timestamp:', json.timestamp);
      } else {
        console.log('⚠️ Health check returned ok: false');
      }
    } catch (e) {
      console.log('⚠️ Response is not JSON:', data);
    }
  });
}).on('error', (err) => {
  console.error('❌ Connection error:', err.message);
  console.error('');
  console.log('🔧 Troubleshooting Steps:');
  console.log('');
  console.log('1. Check Railway Dashboard:');
  console.log('   - Go to https://railway.app');
  console.log('   - Check if service is running');
  console.log('   - Check logs for errors');
  console.log('');
  console.log('2. Check Environment Variables:');
  console.log('   - DATABASE_URL');
  console.log('   - JWT_SECRET');
  console.log('   - ALLOWED_ORIGINS');
  console.log('   - NODE_ENV');
  console.log('');
  console.log('3. Check Database Connection:');
  console.log('   - Verify PostgreSQL plugin is attached');
  console.log('   - Check DATABASE_URL is set');
  console.log('');
  console.log('4. Restart Backend Service:');
  console.log('   - Railway Dashboard → Restart');
  console.log('');
  console.log('For detailed troubleshooting, see:');
  console.log('TROUBLESHOOTING_CONNECTION_RESET.md');
  process.exit(1);
});

// Timeout after 10 seconds
setTimeout(() => {
  console.error('❌ Request timed out after 10 seconds');
  console.error('Backend is not responding');
  process.exit(1);
}, 10000);
