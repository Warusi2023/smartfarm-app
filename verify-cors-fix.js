// Quick CORS verification script
const https = require('https');

console.log('🔍 Testing CORS configuration...\n');

// Test the backend CORS headers
const options = {
  hostname: 'web-production-86d39.up.railway.app',
  port: 443,
  path: '/api/health',
  method: 'OPTIONS',
  headers: {
    'Origin': 'https://www.smartfarm-app.com',
    'Access-Control-Request-Method': 'GET',
    'Access-Control-Request-Headers': 'Content-Type'
  }
};

const req = https.request(options, (res) => {
  console.log('✅ Backend is responding');
  console.log(`📊 Status: ${res.statusCode}`);
  console.log('🌐 CORS Headers:');
  
  Object.keys(res.headers).forEach(header => {
    if (header.toLowerCase().includes('access-control')) {
      console.log(`   ${header}: ${res.headers[header]}`);
    }
  });
  
  if (res.headers['access-control-allow-origin']) {
    console.log('\n🎉 CORS is configured correctly!');
    console.log(`✅ Origin ${res.headers['access-control-allow-origin']} is allowed`);
  } else {
    console.log('\n❌ CORS headers missing - backend needs redeployment');
  }
});

req.on('error', (error) => {
  console.log('❌ Backend not responding:', error.message);
  console.log('💡 Make sure Railway deployment completed');
});

req.end();
