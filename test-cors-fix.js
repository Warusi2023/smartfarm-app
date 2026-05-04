// Test CORS configuration after fixes
const https = require('https');

console.log('🔗 Testing CORS Configuration...\n');

// Test CORS from different origins
const testOrigins = [
    'https://smartfarm-app.netlify.app',
    'https://web-production-86d39.up.railway.app',
    'https://localhost:8080',
    'https://127.0.0.1:8080'
];

const API_URL = 'https://web-production-86d39.up.railway.app';

async function testCORSFromOrigin(origin) {
    return new Promise((resolve) => {
        console.log(`Testing CORS from: ${origin}`);
        
        const options = {
            hostname: 'web-production-86d39.up.railway.app',
            port: 443,
            path: '/api/health',
            method: 'GET',
            headers: {
                'Origin': origin,
                'Access-Control-Request-Method': 'GET',
                'Access-Control-Request-Headers': 'Content-Type'
            }
        };
        
        const req = https.request(options, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                const corsHeaders = {
                    'Access-Control-Allow-Origin': res.headers['access-control-allow-origin'],
                    'Access-Control-Allow-Methods': res.headers['access-control-allow-methods'],
                    'Access-Control-Allow-Headers': res.headers['access-control-allow-headers'],
                    'Access-Control-Allow-Credentials': res.headers['access-control-allow-credentials']
                };
                
                console.log(`  Status: ${res.statusCode}`);
                console.log(`  CORS Headers:`, corsHeaders);
                
                const isAllowed = corsHeaders['Access-Control-Allow-Origin'] === origin || 
                                 corsHeaders['Access-Control-Allow-Origin'] === '*';
                
                console.log(`  Result: ${isAllowed ? '✅ ALLOWED' : '❌ BLOCKED'}`);
                console.log('─'.repeat(60));
                
                resolve({
                    origin,
                    status: res.statusCode,
                    corsHeaders,
                    allowed: isAllowed
                });
            });
        });
        
        req.on('error', (error) => {
            console.log(`  Error: ${error.message}`);
            console.log(`  Result: ❌ FAILED`);
            console.log('─'.repeat(60));
            resolve({
                origin,
                error: error.message,
                allowed: false
            });
        });
        
        req.setTimeout(10000, () => {
            console.log('  Error: Request timeout');
            console.log(`  Result: ❌ FAILED`);
            console.log('─'.repeat(60));
            req.destroy();
            resolve({
                origin,
                error: 'timeout',
                allowed: false
            });
        });
        
        req.end();
    });
}

async function runCORSTests() {
    console.log('🚀 Starting CORS Tests...\n');
    
    const results = [];
    
    for (const origin of testOrigins) {
        const result = await testCORSFromOrigin(origin);
        results.push(result);
        await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second between tests
    }
    
    console.log('\n📊 CORS Test Summary:');
    const allowed = results.filter(r => r.allowed).length;
    const total = results.length;
    
    console.log(`✅ Allowed: ${allowed}/${total}`);
    console.log(`❌ Blocked: ${total - allowed}/${total}`);
    
    console.log('\n🔍 Detailed Results:');
    results.forEach(result => {
        if (result.allowed) {
            console.log(`✅ ${result.origin} - CORS ALLOWED`);
        } else {
            console.log(`❌ ${result.origin} - CORS BLOCKED`);
            if (result.error) {
                console.log(`   Error: ${result.error}`);
            }
        }
    });
    
    if (allowed === total) {
        console.log('\n🎉 All CORS origins are properly configured!');
    } else {
        console.log('\n⚠️ Some CORS origins are blocked.');
        console.log('You may need to update your Railway backend CORS_ORIGIN setting.');
    }
    
    return results;
}

// Run tests if this script is executed directly
if (require.main === module) {
    runCORSTests().then(results => {
        const allAllowed = results.every(r => r.allowed);
        process.exit(allAllowed ? 0 : 1);
    });
}

module.exports = { testCORSFromOrigin, runCORSTests };
