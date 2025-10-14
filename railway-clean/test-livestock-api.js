const axios = require('axios');

const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3000';

async function testLivestockAPI() {
    console.log('🧪 Testing SmartFarm Livestock API...\n');

    try {
        // Test 1: Get all livestock (should return empty array initially)
        console.log('1️⃣ Testing GET /api/livestock...');
        const getResponse = await axios.get(`${API_BASE_URL}/api/livestock`);
        console.log('✅ GET /api/livestock:', getResponse.data);
        console.log('');

        // Test 2: Get livestock stats
        console.log('2️⃣ Testing GET /api/livestock/stats/overview...');
        const statsResponse = await axios.get(`${API_BASE_URL}/api/livestock/stats/overview`);
        console.log('✅ GET /api/livestock/stats/overview:', statsResponse.data);
        console.log('');

        // Test 3: Create a sample farm first (if needed)
        console.log('3️⃣ Testing livestock creation...');
        const livestockData = {
            tag_number: 'TAG-001',
            farm_id: '550e8400-e29b-41d4-a716-446655440000', // Assuming farm UUID exists
            breed: 'Holstein',
            birth_date: '2022-01-15',
            sex: 'female',
            sire_tag: 'SIRE-001',
            dam_tag: 'DAM-001',
            group_id: null, // Optional
            notes: 'Test livestock entry'
        };

        try {
            const createResponse = await axios.post(`${API_BASE_URL}/api/livestock`, livestockData);
            console.log('✅ POST /api/livestock:', createResponse.data);
            
            const livestockId = createResponse.data.data.id;
            
            // Test 4: Get specific livestock
            console.log('4️⃣ Testing GET /api/livestock/:id...');
            const getByIdResponse = await axios.get(`${API_BASE_URL}/api/livestock/${livestockId}`);
            console.log('✅ GET /api/livestock/:id:', getByIdResponse.data);
            console.log('');

            // Test 5: Update livestock
            console.log('5️⃣ Testing PUT /api/livestock/:id...');
            const updateData = { breed: 'Holstein-Friesian', notes: 'Updated breed information' };
            const updateResponse = await axios.put(`${API_BASE_URL}/api/livestock/${livestockId}`, updateData);
            console.log('✅ PUT /api/livestock/:id:', updateResponse.data);
            console.log('');

            // Test 6: Update livestock notes
            console.log('6️⃣ Testing PATCH /api/livestock/:id/status...');
            const statusData = { notes: 'Regular checkup completed - animal healthy' };
            const statusResponse = await axios.patch(`${API_BASE_URL}/api/livestock/${livestockId}/status`, statusData);
            console.log('✅ PATCH /api/livestock/:id/status:', statusResponse.data);
            console.log('');

            // Test 7: Get livestock analytics
            console.log('7️⃣ Testing GET /api/livestock/:id/analytics...');
            const analyticsResponse = await axios.get(`${API_BASE_URL}/api/livestock/${livestockId}/analytics`);
            console.log('✅ GET /api/livestock/:id/analytics:', analyticsResponse.data);
            console.log('');

            // Test 8: Delete livestock
            console.log('8️⃣ Testing DELETE /api/livestock/:id...');
            const deleteResponse = await axios.delete(`${API_BASE_URL}/api/livestock/${livestockId}`);
            console.log('✅ DELETE /api/livestock/:id:', deleteResponse.data);
            console.log('');

        } catch (error) {
            if (error.response) {
                console.log('❌ Error:', error.response.status, error.response.data);
            } else {
                console.log('❌ Error:', error.message);
            }
        }

        console.log('🎉 All livestock API tests completed!');

    } catch (error) {
        console.error('❌ Test failed:', error.message);
        if (error.response) {
            console.error('Response:', error.response.data);
        }
    }
}

// Run the test
testLivestockAPI();
