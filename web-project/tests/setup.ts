// Jest setup file
// This file runs before each test file

// Mock global objects that might not be available in test environment
global.console = {
  ...console,
  // Suppress console.log in tests unless explicitly needed
  log: jest.fn(),
  debug: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
};

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

// Mock sessionStorage
const sessionStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, 'sessionStorage', {
  value: sessionStorageMock
});

// Mock fetch
global.fetch = jest.fn();

// Mock window.location
delete (window as any).location;
window.location = {
  href: 'http://localhost:3000',
  origin: 'http://localhost:3000',
  protocol: 'http:',
  host: 'localhost:3000',
  hostname: 'localhost',
  port: '3000',
  pathname: '/',
  search: '',
  hash: '',
  assign: jest.fn(),
  replace: jest.fn(),
  reload: jest.fn(),
} as any;

// Mock document methods
Object.defineProperty(document, 'getElementById', {
  value: jest.fn(() => ({
    style: { display: '' },
    classList: {
      add: jest.fn(),
      remove: jest.fn(),
      contains: jest.fn(),
      toggle: jest.fn(),
    },
    setAttribute: jest.fn(),
    getAttribute: jest.fn(),
    removeAttribute: jest.fn(),
    appendChild: jest.fn(),
    removeChild: jest.fn(),
    querySelector: jest.fn(),
    querySelectorAll: jest.fn(),
  })),
});

Object.defineProperty(document, 'querySelector', {
  value: jest.fn(() => null),
});

Object.defineProperty(document, 'querySelectorAll', {
  value: jest.fn(() => []),
});

// Mock bootstrap if it exists
(window as any).bootstrap = {
  Modal: jest.fn(() => ({
    show: jest.fn(),
    hide: jest.fn(),
    dispose: jest.fn(),
  })),
};

// Setup test timeout
jest.setTimeout(10000);
