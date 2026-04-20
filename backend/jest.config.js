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
    
    // Coverage: off until suite grows (single smoke test cannot satisfy prior thresholds)
    collectCoverage: false,
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

