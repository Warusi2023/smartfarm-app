/**
 * Unit Tests for Farms Routes
 */

const request = require('supertest');
const app = require('../../server');
const { User, Farm } = require('../../database/models');
const bcrypt = require('bcrypt');

describe('Farms Routes', () => {
  let testUser;
  let authToken;
  let testFarm;

  beforeEach(async () => {
    // Clean up test data
    await Farm.destroy({ where: {} });
    await User.destroy({ where: {} });
    
    // Create test user
    testUser = global.testUtils.createTestUser();
    const hashedPassword = await bcrypt.hash(testUser.password, 10);
    const user = await User.create({
      ...testUser,
      password: hashedPassword
    });

    // Login to get token
    const loginResponse = await request(app)
      .post('/api/auth/login')
      .send({
        username: testUser.username,
        password: testUser.password
      });
    
    authToken = loginResponse.body.data.token;

    // Create test farm
    testFarm = global.testUtils.createTestFarm();
    testFarm.userId = user.id;
  });

  afterEach(async () => {
    await Farm.destroy({ where: {} });
    await User.destroy({ where: {} });
  });

  describe('GET /api/farms', () => {
    it('should get farms for authenticated user', async () => {
      // Create a farm first
      await Farm.create(testFarm);

      const response = await request(app)
        .get('/api/farms')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toBeInstanceOf(Array);
      expect(response.body.data.length).toBe(1);
      expect(response.body.data[0]).toHaveProperty('name', testFarm.name);
    });

    it('should return empty array when no farms exist', async () => {
      const response = await request(app)
        .get('/api/farms')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toBeInstanceOf(Array);
      expect(response.body.data.length).toBe(0);
    });

    it('should reject request without authentication', async () => {
      const response = await request(app)
        .get('/api/farms')
        .expect(401);

      expect(response.body.success).toBe(false);
      expect(response.body.error).toContain('No token provided');
    });

    it('should support pagination', async () => {
      // Create multiple farms
      for (let i = 0; i < 5; i++) {
        await Farm.create({
          ...testFarm,
          name: `Farm ${i}`,
          userId: testFarm.userId
        });
      }

      const response = await request(app)
        .get('/api/farms?page=1&limit=2')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.length).toBe(2);
      expect(response.body.pagination).toBeDefined();
      expect(response.body.pagination.page).toBe(1);
      expect(response.body.pagination.limit).toBe(2);
    });
  });

  describe('GET /api/farms/:id', () => {
    let farmId;

    beforeEach(async () => {
      const farm = await Farm.create(testFarm);
      farmId = farm.id;
    });

    it('should get specific farm by ID', async () => {
      const response = await request(app)
        .get(`/api/farms/${farmId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('id', farmId);
      expect(response.body.data).toHaveProperty('name', testFarm.name);
    });

    it('should reject request for non-existent farm', async () => {
      const response = await request(app)
        .get('/api/farms/99999')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(404);

      expect(response.body.success).toBe(false);
      expect(response.body.error).toContain('Farm not found');
    });

    it('should reject request without authentication', async () => {
      const response = await request(app)
        .get(`/api/farms/${farmId}`)
        .expect(401);

      expect(response.body.success).toBe(false);
    });
  });

  describe('POST /api/farms', () => {
    it('should create a new farm', async () => {
      const newFarm = {
        name: 'New Test Farm',
        location: 'New Location',
        size: 200.5,
        type: 'Organic',
        description: 'New farm description'
      };

      const response = await request(app)
        .post('/api/farms')
        .set('Authorization', `Bearer ${authToken}`)
        .send(newFarm)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('id');
      expect(response.body.data).toHaveProperty('name', newFarm.name);
      expect(response.body.data).toHaveProperty('location', newFarm.location);
      expect(response.body.data).toHaveProperty('size', newFarm.size);
    });

    it('should reject farm creation with invalid data', async () => {
      const invalidFarm = {
        name: '', // Empty name
        location: 'Test Location',
        size: -10, // Negative size
        type: 'Invalid Type'
      };

      const response = await request(app)
        .post('/api/farms')
        .set('Authorization', `Bearer ${authToken}`)
        .send(invalidFarm)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.errors).toBeDefined();
    });

    it('should reject farm creation without authentication', async () => {
      const newFarm = {
        name: 'New Test Farm',
        location: 'New Location',
        size: 200.5,
        type: 'Organic'
      };

      const response = await request(app)
        .post('/api/farms')
        .send(newFarm)
        .expect(401);

      expect(response.body.success).toBe(false);
    });
  });

  describe('PUT /api/farms/:id', () => {
    let farmId;

    beforeEach(async () => {
      const farm = await Farm.create(testFarm);
      farmId = farm.id;
    });

    it('should update existing farm', async () => {
      const updateData = {
        name: 'Updated Farm Name',
        location: 'Updated Location',
        size: 300.0,
        type: 'Updated Type',
        description: 'Updated description'
      };

      const response = await request(app)
        .put(`/api/farms/${farmId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send(updateData)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('name', updateData.name);
      expect(response.body.data).toHaveProperty('location', updateData.location);
      expect(response.body.data).toHaveProperty('size', updateData.size);
    });

    it('should reject update of non-existent farm', async () => {
      const updateData = {
        name: 'Updated Farm Name'
      };

      const response = await request(app)
        .put('/api/farms/99999')
        .set('Authorization', `Bearer ${authToken}`)
        .send(updateData)
        .expect(404);

      expect(response.body.success).toBe(false);
      expect(response.body.error).toContain('Farm not found');
    });

    it('should reject update with invalid data', async () => {
      const invalidData = {
        name: '', // Empty name
        size: -10 // Negative size
      };

      const response = await request(app)
        .put(`/api/farms/${farmId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send(invalidData)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.errors).toBeDefined();
    });
  });

  describe('DELETE /api/farms/:id', () => {
    let farmId;

    beforeEach(async () => {
      const farm = await Farm.create(testFarm);
      farmId = farm.id;
    });

    it('should delete existing farm', async () => {
      const response = await request(app)
        .delete(`/api/farms/${farmId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.message).toContain('Farm deleted successfully');

      // Verify farm is deleted
      const getResponse = await request(app)
        .get(`/api/farms/${farmId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(404);

      expect(getResponse.body.success).toBe(false);
    });

    it('should reject deletion of non-existent farm', async () => {
      const response = await request(app)
        .delete('/api/farms/99999')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(404);

      expect(response.body.success).toBe(false);
      expect(response.body.error).toContain('Farm not found');
    });

    it('should reject deletion without authentication', async () => {
      const response = await request(app)
        .delete(`/api/farms/${farmId}`)
        .expect(401);

      expect(response.body.success).toBe(false);
    });
  });

  describe('GET /api/farms/analytics', () => {
    beforeEach(async () => {
      // Create multiple farms for analytics
      for (let i = 0; i < 3; i++) {
        await Farm.create({
          ...testFarm,
          name: `Farm ${i}`,
          size: (i + 1) * 100,
          type: i % 2 === 0 ? 'Organic' : 'Conventional',
          userId: testFarm.userId
        });
      }
    });

    it('should get farm analytics', async () => {
      const response = await request(app)
        .get('/api/farms/analytics')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('totalFarms');
      expect(response.body.data).toHaveProperty('totalArea');
      expect(response.body.data).toHaveProperty('farmTypes');
      expect(response.body.data.totalFarms).toBe(3);
      expect(response.body.data.totalArea).toBe(600); // 100 + 200 + 300
    });

    it('should reject analytics request without authentication', async () => {
      const response = await request(app)
        .get('/api/farms/analytics')
        .expect(401);

      expect(response.body.success).toBe(false);
    });
  });
});
