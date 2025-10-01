// Jest Test Setup
// Runs before all tests

// Set test environment
process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test-secret-key-for-jest-testing-only';
process.env.LOG_LEVEL = 'error'; // Reduce noise during tests
process.env.DB_TYPE = 'sqlite';
process.env.DB_PATH = ':memory:'; // Use in-memory database for tests

// Mock console methods to reduce noise
global.console = {
    ...console,
    log: jest.fn(),
    debug: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
    // Keep error for debugging
    error: console.error,
};

// Global test timeout
jest.setTimeout(30000);

// Cleanup after all tests
afterAll(async () => {
    // Close any open database connections
    const db = require('../database/init');
    if (db && db.close) {
        await db.close();
    }
});
