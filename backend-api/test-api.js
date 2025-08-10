const axios = require('axios');

const BASE_URL = 'http://localhost:3000/api';
let authToken = null;

// Test configuration
const testConfig = {
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
};

// Helper function to make authenticated requests
const makeAuthRequest = async (method, endpoint, data = null) => {
    const config = {
        ...testConfig,
        method,
        url: `${BASE_URL}${endpoint}`,
        headers: {
            ...testConfig.headers,
            'Authorization': authToken ? `Bearer ${authToken}` : ''
        }
    };
    
    if (data) {
        config.data = data;
    }
    
    try {
        const response = await axios(config);
        return response.data;
    } catch (error) {
        console.error(`❌ ${method} ${endpoint} failed:`, error.response?.data || error.message);
        return null;
    }
};

// Test functions
const testHealthCheck = async () => {
    console.log('🏥 Testing health check...');
    const result = await makeAuthRequest('GET', '/health');
    if (result && result.status === 'OK') {
        console.log('✅ Health check passed');
        return true;
    }
    return false;
};

const testUserRegistration = async () => {
    console.log('👤 Testing user registration...');
    const userData = {
        email: 'test@smartfarm.com',
        password: 'testpassword123',
        firstName: 'Test',
        lastName: 'User',
        role: 'farmer'
    };
    
    const result = await makeAuthRequest('POST', '/auth/register', userData);
    if (result && result.success) {
        console.log('✅ User registration passed');
        authToken = result.token;
        return true;
    }
    return false;
};

const testUserLogin = async () => {
    console.log('🔐 Testing user login...');
    const loginData = {
        email: 'test@smartfarm.com',
        password: 'testpassword123'
    };
    
    const result = await makeAuthRequest('POST', '/auth/login', loginData);
    if (result && result.success) {
        console.log('✅ User login passed');
        authToken = result.token;
        return true;
    }
    return false;
};

const testGetProfile = async () => {
    console.log('👤 Testing get profile...');
    const result = await makeAuthRequest('GET', '/auth/profile');
    if (result && result.success) {
        console.log('✅ Get profile passed');
        return true;
    }
    return false;
};

const testCreateFarm = async () => {
    console.log('🏡 Testing create farm...');
    const farmData = {
        name: 'Test Farm',
        description: 'Test farm for API testing',
        location: 'Test Location',
        size: 100.0,
        type: 'mixed'
    };
    
    const result = await makeAuthRequest('POST', '/farms', farmData);
    if (result && result.success) {
        console.log('✅ Create farm passed');
        return result.data.id;
    }
    return null;
};

const testGetFarms = async () => {
    console.log('🏡 Testing get farms...');
    const result = await makeAuthRequest('GET', '/farms');
    if (result && result.success) {
        console.log('✅ Get farms passed');
        return result.data.length > 0 ? result.data[0].id : null;
    }
    return null;
};

const testCreateLivestock = async (farmId) => {
    console.log('🐄 Testing create livestock...');
    const livestockData = {
        farmId,
        type: 'Cattle',
        breed: 'Angus',
        quantity: 25,
        healthStatus: 'healthy',
        notes: 'Test livestock'
    };
    
    const result = await makeAuthRequest('POST', '/livestock', livestockData);
    if (result && result.success) {
        console.log('✅ Create livestock passed');
        return true;
    }
    return false;
};

const testCreateCrop = async (farmId) => {
    console.log('🌾 Testing create crop...');
    const cropData = {
        farmId,
        name: 'Test Corn',
        variety: 'Sweet Corn',
        plantedDate: '2024-04-15',
        expectedHarvestDate: '2024-08-15',
        status: 'growing',
        notes: 'Test crop'
    };
    
    const result = await makeAuthRequest('POST', '/crops', cropData);
    if (result && result.success) {
        console.log('✅ Create crop passed');
        return true;
    }
    return false;
};

const testCreateInventory = async (farmId) => {
    console.log('📦 Testing create inventory...');
    const inventoryData = {
        farmId,
        name: 'Test Fertilizer',
        category: 'Supplies',
        quantity: 500,
        unit: 'kg',
        cost: 2.50,
        supplier: 'Test Supplier',
        notes: 'Test inventory'
    };
    
    const result = await makeAuthRequest('POST', '/inventory', inventoryData);
    if (result && result.success) {
        console.log('✅ Create inventory passed');
        return true;
    }
    return false;
};

const testCreateFinancialRecord = async (farmId) => {
    console.log('💰 Testing create financial record...');
    const financialData = {
        farmId,
        type: 'income',
        category: 'Test Sales',
        amount: 5000.00,
        description: 'Test income',
        date: '2024-08-20'
    };
    
    const result = await makeAuthRequest('POST', '/financial', financialData);
    if (result && result.success) {
        console.log('✅ Create financial record passed');
        return true;
    }
    return false;
};

const testGetAnalytics = async (farmId) => {
    console.log('📊 Testing analytics...');
    const result = await makeAuthRequest('GET', `/analytics/farm/${farmId}`);
    if (result && result.success) {
        console.log('✅ Analytics passed');
        return true;
    }
    return false;
};

const testGetYieldPredictions = async (farmId) => {
    console.log('🔮 Testing yield predictions...');
    const result = await makeAuthRequest('GET', `/analytics/yield-predictions/${farmId}`);
    if (result && result.success) {
        console.log('✅ Yield predictions passed');
        return true;
    }
    return false;
};

const testAPI = async () => {
    console.log('🚀 Starting SmartFarm Backend API Tests');
    console.log('=====================================');
    
    const results = {
        healthCheck: false,
        registration: false,
        login: false,
        profile: false,
        farmCreation: false,
        farmRetrieval: false,
        livestock: false,
        crops: false,
        inventory: false,
        financial: false,
        analytics: false,
        predictions: false
    };
    
    try {
        // Test health check
        results.healthCheck = await testHealthCheck();
        
        // Test user registration
        results.registration = await testUserRegistration();
        
        // Test user login
        results.login = await testUserLogin();
        
        // Test get profile
        results.profile = await testGetProfile();
        
        // Test farm creation
        const farmId = await testCreateFarm();
        results.farmCreation = farmId !== null;
        
        // Test get farms
        const retrievedFarmId = await testGetFarms();
        results.farmRetrieval = retrievedFarmId !== null;
        
        // Use the farm ID for other tests
        const testFarmId = farmId || retrievedFarmId;
        
        if (testFarmId) {
            // Test livestock creation
            results.livestock = await testCreateLivestock(testFarmId);
            
            // Test crop creation
            results.crops = await testCreateCrop(testFarmId);
            
            // Test inventory creation
            results.inventory = await testCreateInventory(testFarmId);
            
            // Test financial record creation
            results.financial = await testCreateFinancialRecord(testFarmId);
            
            // Test analytics
            results.analytics = await testGetAnalytics(testFarmId);
            
            // Test yield predictions
            results.predictions = await testGetYieldPredictions(testFarmId);
        }
        
        // Generate test report
        console.log('\n📋 Test Results Summary');
        console.log('======================');
        
        const passedTests = Object.values(results).filter(Boolean).length;
        const totalTests = Object.keys(results).length;
        
        Object.entries(results).forEach(([test, passed]) => {
            const status = passed ? '✅' : '❌';
            const testName = test.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
            console.log(`${status} ${testName}: ${passed ? 'PASSED' : 'FAILED'}`);
        });
        
        console.log(`\n📊 Overall Results: ${passedTests}/${totalTests} tests passed`);
        
        if (passedTests === totalTests) {
            console.log('🎉 All tests passed! Backend API is working correctly.');
        } else {
            console.log('⚠️ Some tests failed. Please check the implementation.');
        }
        
        return results;
        
    } catch (error) {
        console.error('❌ Test suite failed:', error);
        return results;
    }
};

// Run tests if this file is executed directly
if (require.main === module) {
    testAPI().then(() => {
        console.log('\n🏁 Test suite completed');
        process.exit(0);
    }).catch((error) => {
        console.error('❌ Test suite error:', error);
        process.exit(1);
    });
}

module.exports = { testAPI }; 