// SmartFarm Unified API Configuration
export const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  (window as any).__SMARTFARM_API_BASE__ ||
  'http://localhost:3000';

// Export for use in other modules
export default {
  API_BASE_URL,
  // Add other config values here as needed
};
