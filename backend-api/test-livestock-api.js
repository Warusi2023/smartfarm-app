const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

console.log('🧪 Testing livestock API...');

async function testLivestockAPI() {
    try {
        // Test GET /api/livestock
        console.log('📡 Testing GET /api/livestock...');
        const response = await fetch('http://localhost:3000/api/livestock');
        
        if (!response.ok) {
            console.error(`❌ GET failed: ${response.status} ${response.statusText}`);
            const text = await response.text();
            console.error('Response:', text);
            return;
        }
        
        const data = await response.json();
        console.log('✅ GET /api/livestock successful');
        console.log('📊 Response:', JSON.stringify(data, null, 2));
        
        // Test POST /api/livestock
        console.log('\n📡 Testing POST /api/livestock...');
        const newLivestock = {
            name: 'Test Cattle #1',
            type: 'Cattle',
            farmId: 'farm-001',
            breed: 'Test Breed',
            birthDate: '2024-01-01',
            weight: 300.0,
            description: 'Test cattle for API validation'
        };
        
        const postResponse = await fetch('http://localhost:3000/api/livestock', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newLivestock)
        });
        
        if (!postResponse.ok) {
            console.error(`❌ POST failed: ${postResponse.status} ${postResponse.statusText}`);
            const text = await postResponse.text();
            console.error('Response:', text);
            return;
        }
        
        const postData = await postResponse.json();
        console.log('✅ POST /api/livestock successful');
        console.log('📊 Created livestock:', JSON.stringify(postData, null, 2));
        
        // Test GET again to verify persistence
        console.log('\n📡 Testing GET /api/livestock after POST...');
        const getResponse2 = await fetch('http://localhost:3000/api/livestock');
        const getData2 = await getResponse2.json();
        console.log('✅ GET after POST successful');
        console.log(`📊 Total livestock records: ${getData2.data.length}`);
        
    } catch (error) {
        console.error('❌ API test failed:', error.message);
    }
}

// Wait a bit for server to start, then test
setTimeout(testLivestockAPI, 3000);
