/**
 * Mock Axios
 * Mocks HTTP requests for testing external APIs
 */

const axios = jest.createMockFromModule('axios');

// Default mock implementation
axios.create = jest.fn(() => axios);
axios.get = jest.fn(() => Promise.resolve({ data: {} }));
axios.post = jest.fn(() => Promise.resolve({ data: {} }));
axios.put = jest.fn(() => Promise.resolve({ data: {} }));
axios.delete = jest.fn(() => Promise.resolve({ data: {} }));
axios.patch = jest.fn(() => Promise.resolve({ data: {} }));

module.exports = axios;

