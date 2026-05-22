// SmartFarm Unified API Configuration
// BASE_API_ORIGIN: https://host only (VITE_API_URL). Load js/api-origin.js first when possible.
(function () {
    var raw =
        window.SmartFarmApiConfig?.baseUrl ||
        window.VITE_API_BASE_URL ||
        window.VITE_API_URL ||
        window.__SMARTFARM_API_BASE__ ||
        'https://web-production-86d39.up.railway.app';
    var origin = window.SmartFarmApiOrigin
        ? window.SmartFarmApiOrigin.normalizeApiOrigin(raw)
        : String(raw)
            .trim()
            .replace(/\/+$/, '')
            .replace(/\/api$/i, '');
    window.__SMARTFARM_CONFIG_API_ORIGIN__ = origin || raw;
})();

window.SmartFarmConfig = {
    API_BASE_URL: window.__SMARTFARM_CONFIG_API_ORIGIN__,

    // Get full API URL for a given endpoint
    getApiUrl: function(endpoint) {
        try {
            const baseUrl = this.API_BASE_URL;
            if (baseUrl) {
                if (window.SmartFarmApiOrigin) {
                    return window.SmartFarmApiOrigin.joinApiPath(baseUrl, endpoint || '');
                }
                const cleanBaseUrl = baseUrl.replace(/\/$/, '');
                const cleanEndpoint = (endpoint || '').replace(/^\//, '');
                if (cleanEndpoint.startsWith('api/') || cleanEndpoint === 'api') {
                    return `${cleanBaseUrl}/${cleanEndpoint}`;
                }
                return `${cleanBaseUrl}/api/${cleanEndpoint}`;
            } else {
                return `/api${endpoint && endpoint.startsWith('/') ? endpoint : '/' + (endpoint || '')}`;
            }
        } catch (error) {
            if (window.SmartFarmLogger) {
                window.SmartFarmLogger.error('Error in getApiUrl:', error);
            } else {
                console.error('[SmartFarm] Error in getApiUrl:', error);
            }
            var tail = endpoint && String(endpoint).startsWith('/')
                ? String(endpoint)
                : '/' + (endpoint || '');
            return '/api' + tail;
        }
    },
    
    // Debug function to log current configuration
    debug: function() {
        const config = {
            API_BASE_URL: this.API_BASE_URL,
            VITE_API_URL: window.VITE_API_URL,
            __SMARTFARM_API_BASE__: window.__SMARTFARM_API_BASE__,
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
