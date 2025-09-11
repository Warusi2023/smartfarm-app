// Test script for Railway deployment
const app = require('./railway-server');

console.log('🧪 Testing Railway server...');

// Test health endpoint
const testHealth = async () => {
    try {
        const response = await fetch('http://localhost:3000/api/health');
        const data = await response.json();
        console.log('✅ Health check:', data.status);
        return true;
    } catch (error) {
        console.log('❌ Health check failed:', error.message);
        return false;
    }
};

// Test auth endpoints
const testAuth = async () => {
    try {
        // Test registration
        const registerResponse = await fetch('http://localhost:3000/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: 'testuser',
                email: 'test@example.com',
                password: 'password123'
            })
        });
        
        const registerData = await registerResponse.json();
        console.log('✅ Registration:', registerData.status);
        
        // Test login
        const loginResponse = await fetch('http://localhost:3000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: 'test@example.com',
                password: 'password123'
            })
        });
        
        const loginData = await loginResponse.json();
        console.log('✅ Login:', loginData.status);
        
        return loginData.token;
    } catch (error) {
        console.log('❌ Auth test failed:', error.message);
        return null;
    }
};

// Test protected endpoints
const testProtected = async (token) => {
    try {
        const response = await fetch('http://localhost:3000/api/farms', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        const data = await response.json();
        console.log('✅ Protected endpoint:', data.status);
        return true;
    } catch (error) {
        console.log('❌ Protected endpoint failed:', error.message);
        return false;
    }
};

// Run tests
const runTests = async () => {
    console.log('🚀 Starting Railway server tests...');
    
    // Wait for server to start
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const healthOk = await testHealth();
    const token = await testAuth();
    const protectedOk = token ? await testProtected(token) : false;
    
    console.log('\n📊 Test Results:');
    console.log(`Health Check: ${healthOk ? '✅ PASS' : '❌ FAIL'}`);
    console.log(`Authentication: ${token ? '✅ PASS' : '❌ FAIL'}`);
    console.log(`Protected Routes: ${protectedOk ? '✅ PASS' : '❌ FAIL'}`);
    
    if (healthOk && token && protectedOk) {
        console.log('\n🎉 All tests passed! Railway server is ready for deployment.');
    } else {
        console.log('\n⚠️ Some tests failed. Check the configuration.');
    }
};

// Run tests if this file is executed directly
if (require.main === module) {
    runTests();
}

module.exports = { runTests };
