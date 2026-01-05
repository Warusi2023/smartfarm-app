/**
 * Jest Configuration for SmartFarm Backend
 * Test environment separation and coverage settings
 */

module.exports = {
    // Test environment
    testEnvironment: 'node',
    
    // Test file patterns
    testMatch: [
        '**/tests/**/*.test.js',
        '**/__tests__/**/*.js'
    ],
    
    // Coverage settings
    collectCoverage: true,
    coverageDirectory: 'coverage',
    coveragePathIgnorePatterns: [
        '/node_modules/',
        '/tests/',
        '/coverage/',
        '/scripts/',
        '/database/',
        '/docs/',
        'jest.config.js',
        'server.js',
        'server-production.cjs',
        'server-simple.cjs',
        'server.cjs'
    ],
    
    // Coverage thresholds (focus on critical paths)
    coverageThresholds: {
        global: {
            branches: 50,
            functions: 50,
            lines: 50,
            statements: 50
        },
        // Higher thresholds for critical files
        './auth/auth.js': {
            branches: 70,
            functions: 70,
            lines: 70,
            statements: 70
        },
        './routes/auth.js': {
            branches: 60,
            functions: 60,
            lines: 60,
            statements: 60
        },
        './middleware/error-handler.js': {
            branches: 70,
            functions: 70,
            lines: 70,
            statements: 70
        }
    },
    
    // Setup files
    setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],
    
    // Module paths
    moduleDirectories: ['node_modules', '<rootDir>'],
    
    // Clear mocks between tests
    clearMocks: true,
    resetMocks: true,
    restoreMocks: true,
    
    // Verbose output
    verbose: true,
    
    // Test timeout
    testTimeout: 10000
};

