/**
 * SmartFarm API Utilities
 * Provides consistent API handling with proper error management
 */

class SmartFarmAPI {
    constructor() {
        this.defaultTimeout = 30000; // 30 seconds
        this.retryAttempts = 3;
        this.retryDelay = 1000; // 1 second
    }

    /**
     * Make a fetch request with error handling
     * @param {string} endpoint - API endpoint
     * @param {Object} options - Fetch options
     * @returns {Promise<Object>} Response data
     */
    async request(endpoint, options = {}) {
        const url = this.getFullUrl(endpoint);
        const requestOptions = this.buildRequestOptions(options);
        
        try {
            const response = await this.fetchWithTimeout(url, requestOptions);
            return await this.handleResponse(response);
        } catch (error) {
            return this.handleError(error, endpoint, options);
        }
    }

    /**
     * GET request
     * @param {string} endpoint - API endpoint
     * @param {Object} options - Request options
     * @returns {Promise<Object>} Response data
     */
    async get(endpoint, options = {}) {
        return this.request(endpoint, { ...options, method: 'GET' });
    }

    /**
     * POST request
     * @param {string} endpoint - API endpoint
     * @param {Object} data - Request data
     * @param {Object} options - Request options
     * @returns {Promise<Object>} Response data
     */
    async post(endpoint, data = null, options = {}) {
        const requestOptions = { ...options, method: 'POST' };
        
        if (data) {
            requestOptions.body = JSON.stringify(data);
            requestOptions.headers = {
                'Content-Type': 'application/json',
                ...requestOptions.headers
            };
        }
        
        return this.request(endpoint, requestOptions);
    }

    /**
     * PUT request
     * @param {string} endpoint - API endpoint
     * @param {Object} data - Request data
     * @param {Object} options - Request options
     * @returns {Promise<Object>} Response data
     */
    async put(endpoint, data = null, options = {}) {
        const requestOptions = { ...options, method: 'PUT' };
        
        if (data) {
            requestOptions.body = JSON.stringify(data);
            requestOptions.headers = {
                'Content-Type': 'application/json',
                ...requestOptions.headers
            };
        }
        
        return this.request(endpoint, requestOptions);
    }

    /**
     * DELETE request
     * @param {string} endpoint - API endpoint
     * @param {Object} options - Request options
     * @returns {Promise<Object>} Response data
     */
    async delete(endpoint, options = {}) {
        return this.request(endpoint, { ...options, method: 'DELETE' });
    }

    /**
     * Get full URL for endpoint
     * @param {string} endpoint - API endpoint
     * @returns {string} Full URL
     */
    getFullUrl(endpoint) {
        try {
            if (window.SmartFarmConfig) {
                return window.SmartFarmConfig.getApiUrl(endpoint);
            } else {
                return `/api${endpoint}`;
            }
        } catch (error) {
            if (window.SmartFarmLogger) {
                window.SmartFarmLogger.error('Error building API URL:', error);
            }
            return `/api${endpoint}`;
        }
    }

    /**
     * Build request options
     * @param {Object} options - Request options
     * @returns {Object} Built request options
     */
    buildRequestOptions(options) {
        const defaultOptions = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            timeout: this.defaultTimeout
        };

        return { ...defaultOptions, ...options };
    }

    /**
     * Fetch with timeout
     * @param {string} url - Request URL
     * @param {Object} options - Request options
     * @returns {Promise<Response>} Fetch response
     */
    async fetchWithTimeout(url, options) {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), options.timeout);

        try {
            const response = await fetch(url, {
                ...options,
                signal: controller.signal
            });
            clearTimeout(timeoutId);
            return response;
        } catch (error) {
            clearTimeout(timeoutId);
            if (error.name === 'AbortError') {
                throw new Error(`Request timeout after ${options.timeout}ms`);
            }
            throw error;
        }
    }

    /**
     * Handle fetch response
     * @param {Response} response - Fetch response
     * @returns {Promise<Object>} Parsed response data
     */
    async handleResponse(response) {
        try {
            // Check if response is ok
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`HTTP ${response.status}: ${errorText}`);
            }

            // Check content type
            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                const text = await response.text();
                return { success: true, data: text };
            }

            // Parse JSON
            const data = await response.json();
            return { success: true, data };
        } catch (error) {
            throw new Error(`Response parsing error: ${error.message}`);
        }
    }

    /**
     * Handle fetch error
     * @param {Error} error - Fetch error
     * @param {string} endpoint - API endpoint
     * @param {Object} options - Request options
     * @returns {Object} Error response
     */
    handleError(error, endpoint, options) {
        const errorInfo = {
            endpoint,
            method: options.method || 'GET',
            error: error.message,
            timestamp: new Date().toISOString()
        };

        if (window.SmartFarmLogger) {
            window.SmartFarmLogger.error('API request failed:', errorInfo);
        } else {
            console.error('[SmartFarm] API request failed:', errorInfo);
        }

        return {
            success: false,
            error: error.message,
            data: null,
            errorInfo
        };
    }

    /**
     * Retry failed request
     * @param {Function} requestFn - Request function to retry
     * @param {number} attempts - Number of attempts
     * @returns {Promise<Object>} Response data
     */
    async retry(requestFn, attempts = this.retryAttempts) {
        let lastError;
        
        for (let i = 0; i < attempts; i++) {
            try {
                const result = await requestFn();
                if (result.success) {
                    return result;
                }
                lastError = result.error;
            } catch (error) {
                lastError = error.message;
            }
            
            if (i < attempts - 1) {
                await this.delay(this.retryDelay * (i + 1));
            }
        }
        
        return {
            success: false,
            error: `Request failed after ${attempts} attempts: ${lastError}`,
            data: null
        };
    }

    /**
     * Delay execution
     * @param {number} ms - Milliseconds to delay
     * @returns {Promise<void>}
     */
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /**
     * Check if API is available
     * @returns {Promise<boolean>} API availability
     */
    async checkHealth() {
        try {
            const result = await this.get('/health');
            return result.success;
        } catch (error) {
            return false;
        }
    }

    /**
     * Upload file
     * @param {string} endpoint - Upload endpoint
     * @param {File} file - File to upload
     * @param {Object} options - Upload options
     * @returns {Promise<Object>} Upload result
     */
    async uploadFile(endpoint, file, options = {}) {
        const formData = new FormData();
        formData.append('file', file);
        
        const requestOptions = {
            method: 'POST',
            body: formData,
            headers: {
                // Don't set Content-Type, let browser set it with boundary
                ...options.headers
            }
        };

        return this.request(endpoint, requestOptions);
    }
}

// Create global API instance
window.SmartFarmAPI = new SmartFarmAPI();

// Export convenience functions
window.apiGet = (endpoint, options) => window.SmartFarmAPI.get(endpoint, options);
window.apiPost = (endpoint, data, options) => window.SmartFarmAPI.post(endpoint, data, options);
window.apiPut = (endpoint, data, options) => window.SmartFarmAPI.put(endpoint, data, options);
window.apiDelete = (endpoint, options) => window.SmartFarmAPI.delete(endpoint, options);

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SmartFarmAPI;
}

console.log('🔌 SmartFarm API Utils initialized');
