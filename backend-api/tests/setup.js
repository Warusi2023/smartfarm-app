// Test setup file for Jest
process.env.NODE_ENV = 'test';
process.env.PORT = 3001;
process.env.JWT_SECRET = 'test-secret-key';

// Global test timeout
jest.setTimeout(10000);

// Suppress console.log during tests (unless there's an error)
global.console = {
  ...console,
  log: jest.fn(),
  debug: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: console.error, // Keep error logging
};

// Clean up after each test
afterEach(() => {
  jest.clearAllMocks();
});
