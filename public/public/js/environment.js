/**
 * SmartFarm Environment Management
 * Centralized environment variable access and validation
 */

class SmartFarmEnvironment {
    constructor() {
        this.config = this.loadConfiguration();
        this.validateConfiguration();
    }

    loadConfiguration() {
        return {
            // API Configuration
            API_BASE_URL: window.VITE_API_URL || 'https://smartfarm-app-production.up.railway.app',
            
            // Environment Detection
            IS_PRODUCTION: window.location.hostname === 'www.smartfarm-app.com' || 
                          window.location.hostname === 'smartfarm-app.com',
            IS_DEVELOPMENT: window.location.hostname === 'localhost' || 
                           window.location.hostname === '127.0.0.1',
            IS_DEMO: window.VITE_DEMO_ENABLED === 'true',
            
            // Feature Flags
            FEATURE_GEOFENCING: window.VITE_FEATURE_GEOFENCING !== 'false',
            FEATURE_AI_ADVISORY: window.VITE_FEATURE_AI_ADVISORY !== 'false',
            FEATURE_BYPRODUCTS: window.VITE_FEATURE_BYPRODUCTS !== 'false',
            FEATURE_SUBSCRIPTIONS: window.VITE_FEATURE_SUBSCRIPTIONS !== 'false',
            FEATURE_ADS: window.VITE_FEATURE_ADS !== 'false',
            
            // External APIs
            WEATHER_API_KEY: window.VITE_OPENWEATHER_API_KEY,
            MAPS_API_KEY: window.VITE_MAPS_API_KEY,
            
            // Logging
            LOG_LEVEL: window.VITE_LOG_LEVEL || (this.isDevelopment ? 'debug' : 'error'),
            
            // CORS
            CORS_ORIGINS: [
                'https://www.smartfarm-app.com',
                'https://smartfarm-app.com',
                'https://dulcet-sawine-92d6a8.netlify.app',
                'http://localhost:3000',
                'http://localhost:8080'
            ]
        };
    }

    validateConfiguration() {
        const errors = [];
        const warnings = [];

        // Critical validation for production
        if (this.config.IS_PRODUCTION) {
            if (!this.config.API_BASE_URL) {
                errors.push('API_BASE_URL is required in production');
            }
            
            if (this.config.API_BASE_URL && !this.config.API_BASE_URL.startsWith('https://')) {
                errors.push('API_BASE_URL must use HTTPS in production');
            }
        }

        // Warning for missing API keys
        if (!this.config.WEATHER_API_KEY) {
            warnings.push('WEATHER_API_KEY not set - weather features will use demo data');
        }
        
        if (!this.config.MAPS_API_KEY) {
            warnings.push('MAPS_API_KEY not set - map features may be limited');
        }

        // Log validation results
        if (errors.length > 0) {
            if (window.SmartFarmLogger) {
                window.SmartFarmLogger.error('Environment validation failed:', errors);
            } else {
                console.error('[SmartFarm] Environment validation failed:', errors);
            }
            
            if (this.config.IS_PRODUCTION) {
                throw new Error('Invalid environment configuration in production');
            }
        }

        if (warnings.length > 0) {
            if (window.SmartFarmLogger) {
                window.SmartFarmLogger.warn('Environment warnings:', warnings);
            } else {
                console.warn('[SmartFarm] Environment warnings:', warnings);
            }
        }

        // Log successful validation
        if (errors.length === 0 && this.config.IS_PRODUCTION) {
            if (window.SmartFarmLogger) {
                window.SmartFarmLogger.success('Environment validation passed');
            }
        }
    }

    // Getters for easy access
    get apiBaseUrl() {
        return this.config.API_BASE_URL;
    }

    get isProduction() {
        return this.config.IS_PRODUCTION;
    }

    get isDevelopment() {
        return this.config && this.config.IS_DEVELOPMENT || false;
    }

    get isDemo() {
        return this.config.IS_DEMO;
    }

    get logLevel() {
        return this.config.LOG_LEVEL;
    }

    get weatherApiKey() {
        return this.config.WEATHER_API_KEY;
    }

    get mapsApiKey() {
        return this.config.MAPS_API_KEY;
    }

    get corsOrigins() {
        return this.config.CORS_ORIGINS;
    }

    // Feature flag checks
    isFeatureEnabled(feature) {
        return this.config[`FEATURE_${feature.toUpperCase()}`] === true;
    }

    // API URL builder
    getApiUrl(endpoint) {
        const baseUrl = this.config.API_BASE_URL;
        if (baseUrl) {
            const cleanBaseUrl = baseUrl.replace(/\/$/, '');
            const cleanEndpoint = endpoint.replace(/^\//, '');
            return `${cleanBaseUrl}/api/${cleanEndpoint}`;
        } else {
            return `/api${endpoint}`;
        }
    }

    // Debug information
    getDebugInfo() {
        return {
            environment: this.config.IS_PRODUCTION ? 'production' : 'development',
            apiBaseUrl: this.config.API_BASE_URL,
            features: {
                geofencing: this.config.FEATURE_GEOFENCING,
                aiAdvisory: this.config.FEATURE_AI_ADVISORY,
                byproducts: this.config.FEATURE_BYPRODUCTS,
                subscriptions: this.config.FEATURE_SUBSCRIPTIONS,
                ads: this.config.FEATURE_ADS
            },
            apis: {
                weather: !!this.config.WEATHER_API_KEY,
                maps: !!this.config.MAPS_API_KEY
            },
            corsOrigins: this.config.CORS_ORIGINS
        };
    }

    // Assert production environment
    assertProductionEnvironment() {
        if (this.config.IS_PRODUCTION && !this.config.API_BASE_URL) {
            const error = 'Missing VITE_API_URL in production build';
            if (window.SmartFarmLogger) {
                window.SmartFarmLogger.error(error);
            } else {
                console.error(`[SmartFarm] ${error}`);
            }
            throw new Error(error);
        }
    }
}

// Create global environment instance
window.SmartFarmEnvironment = new SmartFarmEnvironment();

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SmartFarmEnvironment;
}

// Initialize environment validation
window.SmartFarmEnvironment.assertProductionEnvironment();

console.log('🌍 SmartFarm Environment initialized');
