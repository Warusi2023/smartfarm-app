// Jest Configuration for Backend API Tests

module.exports = {
    // Test environment
    testEnvironment: 'node',
    
    // Test match patterns
    testMatch: [
        '**/tests/**/*.test.js',
        '**/__tests__/**/*.test.js'
    ],
    
    // Coverage
    collectCoverageFrom: [
        'routes/**/*.js',
        'controllers/**/*.js',
        'middleware/**/*.js',
        'lib/**/*.js',
        'services/**/*.js',
        '!**/node_modules/**',
        '!**/tests/**',
        '!**/coverage/**'
    ],
    
    coverageThreshold: {
        global: {
            branches: 60,
            functions: 60,
            lines: 60,
            statements: 60
        }
    },
    
    coverageReporters: [
        'text',
        'text-summary',
        'html',
        'lcov'
    ],
    
    // Setup and teardown
    setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],
    
    // Timeouts
    testTimeout: 30000,
    
    // Verbose output
    verbose: true,
    
    // Clear mocks between tests
    clearMocks: true,
    restoreMocks: true,
    
    // Module paths
    moduleDirectories: ['node_modules', '<rootDir>'],
    
    // Ignore patterns
    testPathIgnorePatterns: [
        '/node_modules/',
        '/coverage/',
        '/dist/'
    ]
};
