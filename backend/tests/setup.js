/**
 * Jest Test Setup
 * Configures test environment and global mocks
 */

// Set test environment variables
process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test-jwt-secret-key-for-testing-only';
process.env.JWT_EXPIRES_IN = '1h';
process.env.BCRYPT_ROUNDS = '4'; // Lower rounds for faster tests
process.env.EMAIL_FROM = 'test@smartfarm.com';
process.env.FRONTEND_URL = 'http://localhost:3000';
process.env.DATABASE_URL = ''; // No database in tests
process.env.WEATHER_API_KEY = 'test-weather-api-key';
process.env.EMAIL_SERVICE = 'test';
process.env.EMAIL_USER = 'test@example.com';
process.env.EMAIL_PASS = 'test-password';

// Suppress console output during tests (optional - comment out for debugging)
// global.console = {
//     ...console,
//     log: jest.fn(),
//     debug: jest.fn(),
//     info: jest.fn(),
//     warn: jest.fn(),
//     error: jest.fn(),
// };

// Global test utilities
global.testUtils = {
    // Helper to create mock request
    createMockRequest: (options = {}) => ({
        body: options.body || {},
        query: options.query || {},
        params: options.params || {},
        headers: options.headers || {},
        user: options.user || null,
        ip: options.ip || '127.0.0.1',
        method: options.method || 'GET',
        path: options.path || '/',
        originalUrl: options.originalUrl || '/',
        get: jest.fn((header) => options.headers?.[header] || ''),
        ...options
    }),
    
    // Helper to create mock response
    createMockResponse: () => {
        const res = {};
        res.status = jest.fn().mockReturnValue(res);
        res.json = jest.fn().mockReturnValue(res);
        res.send = jest.fn().mockReturnValue(res);
        res.cookie = jest.fn().mockReturnValue(res);
        res.clearCookie = jest.fn().mockReturnValue(res);
        res.setHeader = jest.fn().mockReturnValue(res);
        res.getHeader = jest.fn();
        return res;
    },
    
    // Helper to create mock next function
    createMockNext: () => jest.fn(),
    
    // Helper to wait for async operations
    wait: (ms) => new Promise(resolve => setTimeout(resolve, ms))
};

