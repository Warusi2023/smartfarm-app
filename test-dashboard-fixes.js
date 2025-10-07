// Test script to verify dashboard fixes
console.log('🧪 Testing SmartFarm Dashboard Fixes...');

// Test 1: Check if error boundary is properly configured
function testErrorBoundary() {
    console.log('\n1️⃣ Testing Error Boundary Configuration...');
    
    if (typeof window.SmartFarmErrorBoundary !== 'undefined') {
        const stats = window.SmartFarmErrorBoundary.getStats();
        console.log('✅ Error boundary initialized');
        console.log(`   Max errors: ${stats.maxErrors}`);
        console.log(`   Current errors: ${stats.errorCount}`);
        console.log(`   Recoverable: ${stats.isRecovering ? 'Yes' : 'No'}`);
        
        if (stats.maxErrors >= 10) {
            console.log('✅ Error tolerance increased (was 5, now 10)');
        } else {
            console.log('❌ Error tolerance not increased');
        }
    } else {
        console.log('❌ Error boundary not found');
    }
}

// Test 2: Check if API fallback functions exist
function testAPIFallbacks() {
    console.log('\n2️⃣ Testing API Fallback Functions...');
    
    const fallbackFunctions = [
        'loadFarmDataFromStorage',
        'loadCropsDataFromStorage'
    ];
    
    fallbackFunctions.forEach(funcName => {
        if (typeof window[funcName] === 'function') {
            console.log(`✅ ${funcName} function exists`);
        } else {
            console.log(`❌ ${funcName} function missing`);
        }
    });
}

// Test 3: Check if main data loading functions have error handling
function testDataLoadingFunctions() {
    console.log('\n3️⃣ Testing Data Loading Functions...');
    
    const dataFunctions = [
        'loadFarmData',
        'loadCropsData', 
        'loadLivestockData'
    ];
    
    dataFunctions.forEach(funcName => {
        if (typeof window[funcName] === 'function') {
            const funcString = window[funcName].toString();
            
            if (funcString.includes('try') && funcString.includes('catch')) {
                console.log(`✅ ${funcName} has error handling`);
            } else {
                console.log(`❌ ${funcName} missing error handling`);
            }
            
            if (funcString.includes('localStorage')) {
                console.log(`✅ ${funcName} has localStorage fallback`);
            } else {
                console.log(`❌ ${funcName} missing localStorage fallback`);
            }
        } else {
            console.log(`❌ ${funcName} function not found`);
        }
    });
}

// Test 4: Check API configuration
function testAPIConfiguration() {
    console.log('\n4️⃣ Testing API Configuration...');
    
    if (typeof window.SmartFarmAPI !== 'undefined') {
        const baseURL = window.SmartFarmAPI.baseURL;
        console.log(`✅ SmartFarmAPI initialized`);
        console.log(`   Base URL: ${baseURL}`);
        
        if (baseURL.includes('smartfarm-app-production.up.railway.app')) {
            console.log('✅ Correct backend URL configured');
        } else {
            console.log('❌ Incorrect backend URL');
        }
    } else {
        console.log('❌ SmartFarmAPI not available');
    }
    
    if (typeof window.SmartFarmConfig !== 'undefined') {
        const configURL = window.SmartFarmConfig.API_BASE_URL;
        console.log(`✅ SmartFarmConfig available`);
        console.log(`   Config URL: ${configURL}`);
        
        if (configURL.includes('smartfarm-app-production.up.railway.app')) {
            console.log('✅ Config has correct backend URL');
        } else {
            console.log('❌ Config has incorrect backend URL');
        }
    } else {
        console.log('❌ SmartFarmConfig not available');
    }
}

// Test 5: Simulate API failure to test fallback
async function testAPIFailureHandling() {
    console.log('\n5️⃣ Testing API Failure Handling...');
    
    try {
        // Simulate API failure by calling non-existent endpoint
        if (typeof window.SmartFarmAPI !== 'undefined') {
            const response = await window.SmartFarmAPI.request('/test-failure-endpoint');
            console.log('❌ API should have failed but returned:', response);
        } else {
            console.log('⚠️ SmartFarmAPI not available for testing');
        }
    } catch (error) {
        console.log('✅ API failure handled gracefully');
        console.log(`   Error: ${error.message}`);
    }
}

// Test 6: Check localStorage functionality
function testLocalStorageFunctionality() {
    console.log('\n6️⃣ Testing localStorage Functionality...');
    
    try {
        const testData = { test: 'dashboard-fix', timestamp: Date.now() };
        localStorage.setItem('testDashboardFix', JSON.stringify(testData));
        
        const retrieved = JSON.parse(localStorage.getItem('testDashboardFix'));
        if (retrieved.test === testData.test) {
            console.log('✅ localStorage working correctly');
        } else {
            console.log('❌ localStorage data mismatch');
        }
        
        // Clean up
        localStorage.removeItem('testDashboardFix');
        
    } catch (error) {
        console.log('❌ localStorage test failed:', error.message);
    }
}

// Run all tests
async function runAllTests() {
    console.log('🚀 Starting SmartFarm Dashboard Fix Tests...\n');
    
    testErrorBoundary();
    testAPIFallbacks();
    testDataLoadingFunctions();
    testAPIConfiguration();
    await testAPIFailureHandling();
    testLocalStorageFunctionality();
    
    console.log('\n✅ All tests completed!');
    console.log('\n📋 Summary:');
    console.log('- Error boundary should be more tolerant (10 errors max)');
    console.log('- API fallback functions should exist');
    console.log('- Data loading functions should have error handling');
    console.log('- API should point to correct backend URL');
    console.log('- localStorage should work for fallback data');
}

// Auto-run tests if this script is loaded
if (typeof window !== 'undefined') {
    // Run tests after a short delay to ensure everything is loaded
    setTimeout(runAllTests, 1000);
} else {
    // If running in Node.js, just export the functions
    module.exports = {
        testErrorBoundary,
        testAPIFallbacks,
        testDataLoadingFunctions,
        testAPIConfiguration,
        testAPIFailureHandling,
        testLocalStorageFunctionality,
        runAllTests
    };
}
