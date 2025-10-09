/**
 * Jest Test Setup
 * Configures the test environment for SmartFarm backend tests
 */

const { initializeDatabase, closeDatabase } = require('../database/init');

// Setup test database before all tests
beforeAll(async () => {
  // Set test environment
  process.env.NODE_ENV = 'test';
  process.env.DATABASE_URL = 'sqlite:test.db';
  
  try {
    await initializeDatabase();
    console.log('Test database initialized');
  } catch (error) {
    console.error('Failed to initialize test database:', error);
    throw error;
  }
});

// Cleanup after all tests
afterAll(async () => {
  try {
    await closeDatabase();
    console.log('Test database closed');
  } catch (error) {
    console.error('Failed to close test database:', error);
  }
});

// Global test utilities
global.testUtils = {
  // Generate test data
  createTestUser: () => ({
    username: `testuser_${Date.now()}`,
    email: `test_${Date.now()}@example.com`,
    password: 'TestPassword123!',
    firstName: 'Test',
    lastName: 'User'
  }),

  createTestFarm: () => ({
    name: `Test Farm ${Date.now()}`,
    location: 'Test Location',
    size: 100.5,
    type: 'Mixed',
    description: 'Test farm description'
  }),

  createTestCrop: (farmId) => ({
    name: `Test Crop ${Date.now()}`,
    type: 'Vegetable',
    farmId: farmId,
    plantedDate: new Date().toISOString().split('T')[0],
    expectedHarvestDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    area: 10.5,
    description: 'Test crop description'
  }),

  createTestLivestock: (farmId) => ({
    name: `Test Livestock ${Date.now()}`,
    type: 'Cattle',
    farmId: farmId,
    breed: 'Holstein',
    birthDate: new Date().toISOString().split('T')[0],
    weight: 500,
    description: 'Test livestock description'
  }),

  // Wait for async operations
  wait: (ms) => new Promise(resolve => setTimeout(resolve, ms)),

  // Generate random string
  randomString: (length = 10) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }
};