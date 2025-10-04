export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/tests'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest'
  },
  testMatch: [
    '<rootDir>/tests/**/*.(test|spec).(ts|tsx|js|jsx)',
    '<rootDir>/**/*.(test|spec).(ts|tsx|js|jsx)'
  ],
  collectCoverageFrom: [
    'public/js/**/*.{ts,tsx,js,jsx}',
    '!public/js/**/*.d.ts',
    '!public/js/vendor/**',
    '!public/js/lib/**'
  ],
  setupFilesAfterEnv: ['<rootDir>/tests/setup.ts'],
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/public/$1',
    '^@/js/(.*)$': '<rootDir>/public/js/$1',
    '^@/css/(.*)$': '<rootDir>/public/css/$1',
    '^@/tests/(.*)$': '<rootDir>/tests/$1'
  },
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  },
  coverageReporters: ['text', 'lcov', 'html'],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/dist/',
    '/build/',
    '/coverage/',
    '/test-results/',
    '/playwright-report/',
    '/.lighthouseci/'
  ]
};
