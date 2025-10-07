// Test API connectivity across all platforms
const https = require('https');

const API_URL = 'https://smartfarm-app-production.up.railway.app';

console.log('🔗 Testing API Connectivity...\n');

async function testAPIEndpoint(endpoint, description) {
    return new Promise((resolve) => {
        const url = `${API_URL}${endpoint}`;
        console.log(`Testing: ${description}`);
        console.log(`URL: ${url}`);
        
        const req = https.request(url, { method: 'GET' }, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                console.log(`Status: ${res.statusCode}`);
                console.log(`Response: ${data.substring(0, 200)}${data.length > 200 ? '...' : ''}`);
                console.log(`Result: ${res.statusCode === 200 ? '✅ SUCCESS' : '❌ FAILED'}`);
                console.log('─'.repeat(50));
                resolve({ success: res.statusCode === 200, status: res.statusCode, data });
            });
        });
        
        req.on('error', (error) => {
            console.log(`Error: ${error.message}`);
            console.log(`Result: ❌ FAILED`);
            console.log('─'.repeat(50));
            resolve({ success: false, error: error.message });
        });
        
        req.setTimeout(10000, () => {
            console.log('Error: Request timeout');
            console.log(`Result: ❌ FAILED`);
            console.log('─'.repeat(50));
            req.destroy();
            resolve({ success: false, error: 'timeout' });
        });
        
        req.end();
    });
}

async function runAllTests() {
    console.log('🚀 Starting API Connectivity Tests...\n');
    
    const tests = [
        { endpoint: '/api/health', description: 'Health Check Endpoint' },
        { endpoint: '/api', description: 'API Root Endpoint' },
        { endpoint: '/', description: 'Root Endpoint' }
    ];
    
    const results = [];
    
    for (const test of tests) {
        const result = await testAPIEndpoint(test.endpoint, test.description);
        results.push({ ...test, ...result });
        await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second between tests
    }
    
    console.log('\n📊 Test Summary:');
    const successful = results.filter(r => r.success).length;
    const total = results.length;
    
    console.log(`✅ Successful: ${successful}/${total}`);
    console.log(`❌ Failed: ${total - successful}/${total}`);
    
    if (successful === total) {
        console.log('\n🎉 All API endpoints are accessible!');
    } else {
        console.log('\n⚠️ Some API endpoints are not accessible.');
        console.log('This might explain why the dashboard is showing fallback mode.');
    }
    
    return results;
}

// Run tests if this script is executed directly
if (require.main === module) {
    runAllTests().then(results => {
        process.exit(results.every(r => r.success) ? 0 : 1);
    });
}

module.exports = { testAPIEndpoint, runAllTests };
