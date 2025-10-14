const axios = require('axios');

const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3000';

async function testCropsAPI() {
    console.log('🌾 Testing SmartFarm Crops API...\n');

    try {
        // Test 1: Get all crops (should return empty array initially)
        console.log('1️⃣ Testing GET /api/crops...');
        const getResponse = await axios.get(`${API_BASE_URL}/api/crops`);
        console.log('✅ GET /api/crops:', getResponse.data);
        console.log('');

        // Test 2: Get crop stats
        console.log('2️⃣ Testing GET /api/crops/stats/overview...');
        const statsResponse = await axios.get(`${API_BASE_URL}/api/crops/stats/overview`);
        console.log('✅ GET /api/crops/stats/overview:', statsResponse.data);
        console.log('');

        // Test 3: Create a sample field first (if needed)
        console.log('3️⃣ Testing crop creation...');
        const cropData = {
            crop_type: 'WHEAT',
            field_id: 1, // Assuming field ID 1 exists
            variety: 'Winter Wheat',
            planting_date: '2024-03-15',
            expected_harvest_date: '2024-07-15',
            planting_density: 150.0,
            seed_quantity: 25.5,
            expected_yield: 3500.0,
            notes: 'Test crop entry - Winter wheat variety'
        };

        try {
            const createResponse = await axios.post(`${API_BASE_URL}/api/crops`, cropData);
            console.log('✅ POST /api/crops:', createResponse.data);
            
            const cropId = createResponse.data.data.id;
            
            // Test 4: Get specific crop
            console.log('4️⃣ Testing GET /api/crops/:id...');
            const getByIdResponse = await axios.get(`${API_BASE_URL}/api/crops/${cropId}`);
            console.log('✅ GET /api/crops/:id:', getByIdResponse.data);
            console.log('');

            // Test 5: Update crop
            console.log('5️⃣ Testing PUT /api/crops/:id...');
            const updateData = { 
                planting_density: 160.0, 
                notes: 'Updated planting density - increased for better yield' 
            };
            const updateResponse = await axios.put(`${API_BASE_URL}/api/crops/${cropId}`, updateData);
            console.log('✅ PUT /api/crops/:id:', updateResponse.data);
            console.log('');

            // Test 6: Update crop status
            console.log('6️⃣ Testing PATCH /api/crops/:id/status...');
            const statusData = { status: 'growing', notes: 'Crop is growing well, no issues detected' };
            const statusResponse = await axios.patch(`${API_BASE_URL}/api/crops/${cropId}/status`, statusData);
            console.log('✅ PATCH /api/crops/:id/status:', statusResponse.data);
            console.log('');

            // Test 7: Get crop analytics
            console.log('7️⃣ Testing GET /api/crops/:id/analytics...');
            const analyticsResponse = await axios.get(`${API_BASE_URL}/api/crops/${cropId}/analytics`);
            console.log('✅ GET /api/crops/:id/analytics:', analyticsResponse.data);
            console.log('');

            // Test 8: Test filtering and search
            console.log('8️⃣ Testing GET /api/crops with filters...');
            const filterResponse = await axios.get(`${API_BASE_URL}/api/crops?crop_type=WHEAT&status=growing`);
            console.log('✅ GET /api/crops with filters:', filterResponse.data);
            console.log('');

            // Test 9: Test search functionality
            console.log('9️⃣ Testing GET /api/crops with search...');
            const searchResponse = await axios.get(`${API_BASE_URL}/api/crops?search=wheat`);
            console.log('✅ GET /api/crops with search:', searchResponse.data);
            console.log('');

            // Test 10: Delete crop
            console.log('🔟 Testing DELETE /api/crops/:id...');
            const deleteResponse = await axios.delete(`${API_BASE_URL}/api/crops/${cropId}`);
            console.log('✅ DELETE /api/crops/:id:', deleteResponse.data);
            console.log('');

        } catch (error) {
            if (error.response) {
                console.log('❌ Error:', error.response.status, error.response.data);
            } else {
                console.log('❌ Error:', error.message);
            }
        }

        console.log('🎉 All crops API tests completed!');

    } catch (error) {
        console.error('❌ Test failed:', error.message);
        if (error.response) {
            console.error('Response:', error.response.data);
        }
    }
}

// Run the test
testCropsAPI();
