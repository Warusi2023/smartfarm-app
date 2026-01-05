/**
 * Mock Logger
 * Mocks Winston logger for testing
 */

const logger = {
    error: jest.fn(),
    warn: jest.fn(),
    info: jest.fn(),
    debug: jest.fn(),
    errorWithContext: jest.fn(),
    warnWithContext: jest.fn(),
    infoWithContext: jest.fn(),
    debugWithContext: jest.fn()
};

module.exports = logger;

