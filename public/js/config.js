// SmartFarm Unified API Configuration
window.SmartFarmConfig = {
    // API Base URL - use environment variable or fallback to production URL
        API_BASE_URL: window.VITE_API_URL || 
                        (window as any).__SMARTFARM_API_BASE__ ||
                        'https://smartfarm-backend.railway.app',
    
    // Get full API URL for a given endpoint
    getApiUrl: function(endpoint) {
        try {
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
        } catch (error) {
            if (window.SmartFarmLogger) {
                window.SmartFarmLogger.error('Error in getApiUrl:', error);
            } else {
                console.error('[SmartFarm] Error in getApiUrl:', error);
            }
            return `/api${endpoint}`;
        }
    },
    
    // Debug function to log current configuration
    debug: function() {
        const config = {
            API_BASE_URL: this.API_BASE_URL,
            VITE_API_URL: window.VITE_API_URL,
            __SMARTFARM_API_BASE__: (window as any).__SMARTFARM_API_BASE__,
            currentDomain: window.location.origin
        };
        
        if (window.SmartFarmLogger) {
            window.SmartFarmLogger.debug('SmartFarm API Configuration:', config);
        } else {
            console.log('[SmartFarm] API Configuration:', config);
        }
    },
    
    // Validate configuration
    validate: function() {
        const issues = [];
        
        if (!this.API_BASE_URL) {
            issues.push('API_BASE_URL is not set');
        }
        
        if (this.API_BASE_URL && !this.API_BASE_URL.startsWith('http')) {
            issues.push('API_BASE_URL must start with http:// or https://');
        }
        
        if (issues.length > 0) {
            const errorMsg = `Configuration issues: ${issues.join(', ')}`;
            if (window.SmartFarmLogger) {
                window.SmartFarmLogger.warn(errorMsg);
            } else {
                console.warn('[SmartFarm]', errorMsg);
            }
        }
        
        return issues.length === 0;
    }
};

// Validate configuration on load
if (!window.SmartFarmConfig.validate()) {
    if (window.SmartFarmLogger) {
        window.SmartFarmLogger.error('SmartFarm configuration validation failed');
    } else {
        console.error('[SmartFarm] Configuration validation failed');
    }
}

// Auto-debug in development
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    window.SmartFarmConfig.debug();
}
