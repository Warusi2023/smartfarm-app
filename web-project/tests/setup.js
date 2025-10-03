/**
 * Jest Setup File for SmartFarm Tests
 * Configures testing environment and global test utilities
 */

// Import jest-axe for accessibility testing
import { toHaveNoViolations } from 'jest-axe';

// Extend Jest matchers
expect.extend(toHaveNoViolations);

// Mock window.matchMedia for responsive tests
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
};

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
};

// Mock fetch globally
global.fetch = jest.fn();

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock;
global.sessionStorage = localStorageMock;

// Mock console methods to avoid noise in tests
global.console = {
  ...console,
  log: jest.fn(),
  debug: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
};

// Mock Bootstrap
global.bootstrap = {
  Modal: jest.fn().mockImplementation(() => ({
    show: jest.fn(),
    hide: jest.fn(),
    dispose: jest.fn(),
  })),
  Modal: {
    getInstance: jest.fn(() => ({
      show: jest.fn(),
      hide: jest.fn(),
      dispose: jest.fn(),
    })),
  },
};

// Mock Chart.js
global.Chart = jest.fn().mockImplementation(() => ({
  destroy: jest.fn(),
  update: jest.fn(),
  resize: jest.fn(),
}));

// Mock QRCode
global.QRCode = {
  toCanvas: jest.fn(),
  toString: jest.fn(),
};

// Mock jsPDF
global.jsPDF = jest.fn().mockImplementation(() => ({
  save: jest.fn(),
  addImage: jest.fn(),
  text: jest.fn(),
}));

// Setup DOM testing utilities
import { JSDOM } from 'jsdom';

const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>', {
  url: 'http://localhost',
  pretendToBeVisual: true,
  resources: 'usable',
});

global.window = dom.window;
global.document = dom.window.document;
global.navigator = dom.window.navigator;

// Global test utilities
global.testUtils = {
  createMockModal: (id = 'testModal') => {
    const modal = document.createElement('div');
    modal.className = 'modal fade';
    modal.id = id;
    modal.innerHTML = `
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Test Modal</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <input type="text" class="form-control" placeholder="Test input">
            <button type="button" class="btn btn-primary">Test Button</button>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
    return modal;
  },

  createMockLivestock: () => ({
    id: 1,
    species: 'Cattle',
    breed: 'Holstein',
    count: 5,
    earTags: 'HT001-HT005',
    location: 'Barn A',
    gps: '18.1234,-178.4321',
    lastWeight: 450,
    healthStatus: 'healthy',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }),

  createMockCrop: () => ({
    id: 1,
    name: 'Tomatoes',
    variety: 'Roma',
    field: 'Field A',
    area: 2.5,
    plantedDate: '2025-01-15',
    expectedHarvestDate: '2025-04-15',
    status: 'growing',
    notes: 'Test crop',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }),

  createMockFarm: () => ({
    id: 1,
    name: 'Test Farm',
    location: 'Suva, Fiji',
    area: 25.5,
    type: 'mixed',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }),

  mockApiResponse: (data, success = true) => ({
    success,
    data,
    message: success ? 'Operation successful' : 'Operation failed',
    timestamp: new Date().toISOString(),
  }),

  waitFor: (condition, timeout = 5000) => {
    return new Promise((resolve, reject) => {
      const startTime = Date.now();
      const check = () => {
        if (condition()) {
          resolve();
        } else if (Date.now() - startTime > timeout) {
          reject(new Error('Timeout waiting for condition'));
        } else {
          setTimeout(check, 100);
        }
      };
      check();
    });
  },

  simulateUserInteraction: async (element, eventType = 'click') => {
    const event = new Event(eventType, { bubbles: true, cancelable: true });
    element.dispatchEvent(event);
    await new Promise(resolve => setTimeout(resolve, 0));
  },
};

// Cleanup after each test
afterEach(() => {
  // Clear all mocks
  jest.clearAllMocks();
  
  // Clean up DOM
  document.body.innerHTML = '';
  
  // Reset localStorage
  localStorageMock.getItem.mockClear();
  localStorageMock.setItem.mockClear();
  localStorageMock.removeItem.mockClear();
  localStorageMock.clear.mockClear();
  
  // Reset fetch
  fetch.mockClear();
});

// Global error handler for tests
window.addEventListener('error', (event) => {
  console.error('Test environment error:', event.error);
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('Test environment unhandled promise rejection:', event.reason);
});
