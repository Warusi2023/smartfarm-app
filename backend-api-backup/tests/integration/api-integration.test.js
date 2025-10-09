/**
 * Integration Tests for SmartFarm API
 * Tests the complete flow of API endpoints working together
 */

const request = require('supertest');
const app = require('../../server');
const { User, Farm, Crop, Livestock } = require('../../database/models');
const bcrypt = require('bcrypt');

describe('SmartFarm API Integration Tests', () => {
  let testUser;
  let authToken;
  let farmId;

  beforeAll(async () => {
    // Clean up all test data
    await Livestock.destroy({ where: {} });
    await Crop.destroy({ where: {} });
    await Farm.destroy({ where: {} });
    await User.destroy({ where: {} });
  });

  afterAll(async () => {
    // Clean up all test data
    await Livestock.destroy({ where: {} });
    await Crop.destroy({ where: {} });
    await Farm.destroy({ where: {} });
    await User.destroy({ where: {} });
  });

  describe('Complete Farm Management Flow', () => {
    it('should complete the full farm management workflow', async () => {
      // Step 1: Register a new user
      const userData = {
        username: 'integrationtest',
        email: 'integration@test.com',
        password: 'IntegrationTest123!',
        firstName: 'Integration',
        lastName: 'Test'
      };

      const registerResponse = await request(app)
        .post('/api/auth/register')
        .send(userData)
        .expect(201);

      expect(registerResponse.body.success).toBe(true);
      expect(registerResponse.body.data.username).toBe(userData.username);

      // Step 2: Login to get authentication token
      const loginResponse = await request(app)
        .post('/api/auth/login')
        .send({
          username: userData.username,
          password: userData.password
        })
        .expect(200);

      expect(loginResponse.body.success).toBe(true);
      expect(loginResponse.body.data.token).toBeDefined();
      authToken = loginResponse.body.data.token;

      // Step 3: Create a farm
      const farmData = {
        name: 'Integration Test Farm',
        location: 'Test Valley',
        size: 150.5,
        type: 'Mixed',
        description: 'A test farm for integration testing'
      };

      const farmResponse = await request(app)
        .post('/api/farms')
        .set('Authorization', `Bearer ${authToken}`)
        .send(farmData)
        .expect(201);

      expect(farmResponse.body.success).toBe(true);
      expect(farmResponse.body.data.name).toBe(farmData.name);
      farmId = farmResponse.body.data.id;

      // Step 4: Add crops to the farm
      const cropData = {
        name: 'Test Tomatoes',
        type: 'Vegetable',
        farmId: farmId,
        plantedDate: new Date().toISOString().split('T')[0],
        expectedHarvestDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        area: 25.0,
        description: 'Test tomato crop'
      };

      const cropResponse = await request(app)
        .post('/api/crops')
        .set('Authorization', `Bearer ${authToken}`)
        .send(cropData)
        .expect(201);

      expect(cropResponse.body.success).toBe(true);
      expect(cropResponse.body.data.name).toBe(cropData.name);

      // Step 5: Add livestock to the farm
      const livestockData = {
        name: 'Test Cattle',
        type: 'Cattle',
        farmId: farmId,
        breed: 'Holstein',
        birthDate: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        weight: 600,
        description: 'Test cattle for integration'
      };

      const livestockResponse = await request(app)
        .post('/api/livestock')
        .set('Authorization', `Bearer ${authToken}`)
        .send(livestockData)
        .expect(201);

      expect(livestockResponse.body.success).toBe(true);
      expect(livestockResponse.body.data.name).toBe(livestockData.name);

      // Step 6: Get farm analytics
      const analyticsResponse = await request(app)
        .get('/api/farms/analytics')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(analyticsResponse.body.success).toBe(true);
      expect(analyticsResponse.body.data.totalFarms).toBe(1);
      expect(analyticsResponse.body.data.totalArea).toBe(farmData.size);

      // Step 7: Get crop analytics
      const cropAnalyticsResponse = await request(app)
        .get('/api/crops/analytics')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(cropAnalyticsResponse.body.success).toBe(true);
      expect(cropAnalyticsResponse.body.data.totalCrops).toBe(1);

      // Step 8: Get livestock analytics
      const livestockAnalyticsResponse = await request(app)
        .get('/api/livestock/analytics')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(livestockAnalyticsResponse.body.success).toBe(true);
      expect(livestockAnalyticsResponse.body.data.totalLivestock).toBe(1);

      // Step 9: Update farm information
      const updateData = {
        name: 'Updated Integration Test Farm',
        description: 'Updated description'
      };

      const updateResponse = await request(app)
        .put(`/api/farms/${farmId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send(updateData)
        .expect(200);

      expect(updateResponse.body.success).toBe(true);
      expect(updateResponse.body.data.name).toBe(updateData.name);

      // Step 10: Verify data integrity
      const finalFarmResponse = await request(app)
        .get(`/api/farms/${farmId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(finalFarmResponse.body.success).toBe(true);
      expect(finalFarmResponse.body.data.name).toBe(updateData.name);
    });
  });

  describe('Error Handling Integration', () => {
    it('should handle authentication errors consistently', async () => {
      // Test protected endpoints without authentication
      const protectedEndpoints = [
        { method: 'GET', path: '/api/farms' },
        { method: 'POST', path: '/api/farms' },
        { method: 'GET', path: '/api/crops' },
        { method: 'POST', path: '/api/crops' },
        { method: 'GET', path: '/api/livestock' },
        { method: 'POST', path: '/api/livestock' }
      ];

      for (const endpoint of protectedEndpoints) {
        const response = await request(app)
          [endpoint.method.toLowerCase()](endpoint.path)
          .expect(401);

        expect(response.body.success).toBe(false);
        expect(response.body.error).toContain('No token provided');
      }
    });

    it('should handle validation errors consistently', async () => {
      // Create user and login first
      const userData = {
        username: 'validationtest',
        email: 'validation@test.com',
        password: 'ValidationTest123!',
        firstName: 'Validation',
        lastName: 'Test'
      };

      await request(app)
        .post('/api/auth/register')
        .send(userData)
        .expect(201);

      const loginResponse = await request(app)
        .post('/api/auth/login')
        .send({
          username: userData.username,
          password: userData.password
        })
        .expect(200);

      const token = loginResponse.body.data.token;

      // Test invalid farm data
      const invalidFarmData = {
        name: '', // Empty name
        location: 'Test Location',
        size: -10, // Negative size
        type: 'Invalid Type'
      };

      const farmResponse = await request(app)
        .post('/api/farms')
        .set('Authorization', `Bearer ${token}`)
        .send(invalidFarmData)
        .expect(400);

      expect(farmResponse.body.success).toBe(false);
      expect(farmResponse.body.errors).toBeDefined();
      expect(farmResponse.body.errors.length).toBeGreaterThan(0);
    });
  });

  describe('Data Consistency Integration', () => {
    it('should maintain data consistency across related entities', async () => {
      // Create user and farm
      const userData = {
        username: 'consistencytest',
        email: 'consistency@test.com',
        password: 'ConsistencyTest123!',
        firstName: 'Consistency',
        lastName: 'Test'
      };

      await request(app)
        .post('/api/auth/register')
        .send(userData)
        .expect(201);

      const loginResponse = await request(app)
        .post('/api/auth/login')
        .send({
          username: userData.username,
          password: userData.password
        })
        .expect(200);

      const token = loginResponse.body.data.token;

      const farmData = {
        name: 'Consistency Test Farm',
        location: 'Test Location',
        size: 100.0,
        type: 'Test',
        description: 'Test farm'
      };

      const farmResponse = await request(app)
        .post('/api/farms')
        .set('Authorization', `Bearer ${token}`)
        .send(farmData)
        .expect(201);

      const farmId = farmResponse.body.data.id;

      // Create crops and livestock
      const cropData = {
        name: 'Test Crop',
        type: 'Vegetable',
        farmId: farmId,
        plantedDate: new Date().toISOString().split('T')[0],
        expectedHarvestDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        area: 10.0,
        description: 'Test crop'
      };

      await request(app)
        .post('/api/crops')
        .set('Authorization', `Bearer ${token}`)
        .send(cropData)
        .expect(201);

      const livestockData = {
        name: 'Test Livestock',
        type: 'Cattle',
        farmId: farmId,
        breed: 'Test Breed',
        birthDate: new Date().toISOString().split('T')[0],
        weight: 500,
        description: 'Test livestock'
      };

      await request(app)
        .post('/api/livestock')
        .set('Authorization', `Bearer ${token}`)
        .send(livestockData)
        .expect(201);

      // Verify data consistency
      const farmAnalytics = await request(app)
        .get('/api/farms/analytics')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      const cropAnalytics = await request(app)
        .get('/api/crops/analytics')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      const livestockAnalytics = await request(app)
        .get('/api/livestock/analytics')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(farmAnalytics.body.data.totalFarms).toBe(1);
      expect(cropAnalytics.body.data.totalCrops).toBe(1);
      expect(livestockAnalytics.body.data.totalLivestock).toBe(1);
    });
  });

  describe('Performance Integration', () => {
    it('should handle multiple concurrent requests', async () => {
      // Create user and login
      const userData = {
        username: 'performancetest',
        email: 'performance@test.com',
        password: 'PerformanceTest123!',
        firstName: 'Performance',
        lastName: 'Test'
      };

      await request(app)
        .post('/api/auth/register')
        .send(userData)
        .expect(201);

      const loginResponse = await request(app)
        .post('/api/auth/login')
        .send({
          username: userData.username,
          password: userData.password
        })
        .expect(200);

      const token = loginResponse.body.data.token;

      // Create multiple farms concurrently
      const farmPromises = [];
      for (let i = 0; i < 5; i++) {
        const farmData = {
          name: `Performance Farm ${i}`,
          location: `Location ${i}`,
          size: 100 + i * 10,
          type: 'Test',
          description: `Test farm ${i}`
        };

        farmPromises.push(
          request(app)
            .post('/api/farms')
            .set('Authorization', `Bearer ${token}`)
            .send(farmData)
        );
      }

      const results = await Promise.all(farmPromises);
      
      // All requests should succeed
      results.forEach(result => {
        expect(result.status).toBe(201);
        expect(result.body.success).toBe(true);
      });

      // Verify all farms were created
      const farmsResponse = await request(app)
        .get('/api/farms')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(farmsResponse.body.data.length).toBe(5);
    });
  });
});
