// SmartFarm API Configuration
window.SmartFarmConfig = {
    // API Base URL - use environment variable or fallback to relative path
    API_BASE_URL: window.VITE_API_URL || '',
    
    // Get full API URL for a given endpoint
    getApiUrl: function(endpoint) {
        const baseUrl = this.API_BASE_URL;
        if (baseUrl) {
            // Remove trailing slash from base URL and leading slash from endpoint
            const cleanBaseUrl = baseUrl.replace(/\/$/, '');
            const cleanEndpoint = endpoint.replace(/^\//, '');
            return `${cleanBaseUrl}/api/${cleanEndpoint}`;
        } else {
            // Fallback to relative URL
            return `/api${endpoint}`;
        }
    },
    
    // Debug function to log current configuration
    debug: function() {
        console.log('SmartFarm API Configuration:', {
            API_BASE_URL: this.API_BASE_URL,
            VITE_API_URL: window.VITE_API_URL,
            currentDomain: window.location.origin
        });
    }
};

// Auto-debug in development
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    window.SmartFarmConfig.debug();
}
