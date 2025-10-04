/**
 * API Keys Configuration for SmartFarm Backend
 * 
 * This module handles secure API key management and validation
 * NEVER commit actual API keys to version control
 */

const config = {
    // Google API Configuration
    google: {
        apiKey: process.env.GOOGLE_API_KEY,
        mapsApiKey: process.env.GOOGLE_MAPS_API_KEY || process.env.GOOGLE_API_KEY,
        geocodingApiKey: process.env.GOOGLE_GEOCODING_API_KEY || process.env.GOOGLE_API_KEY,
        placesApiKey: process.env.GOOGLE_PLACES_API_KEY || process.env.GOOGLE_API_KEY
    },
    
    // Weather API Configuration
    weather: {
        openweatherApiKey: process.env.OPENWEATHER_API_KEY
    },
    
    // Firebase Configuration
    firebase: {
        projectId: process.env.FIREBASE_PROJECT_ID || 'smart-farm-291d5',
        apiKey: process.env.FIREBASE_API_KEY || process.env.GOOGLE_API_KEY,
        authDomain: process.env.FIREBASE_AUTH_DOMAIN || 'smart-farm-291d5.firebaseapp.com',
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET || 'smart-farm-291d5.firebasestorage.app'
    }
};

/**
 * Validate that all required API keys are present
 * @returns {Object} Validation result with missing keys
 */
function validateApiKeys() {
    const missing = [];
    
    if (!config.google.apiKey) {
        missing.push('GOOGLE_API_KEY');
    }
    
    if (!config.weather.openweatherApiKey) {
        missing.push('OPENWEATHER_API_KEY');
    }
    
    return {
        isValid: missing.length === 0,
        missingKeys: missing
    };
}

/**
 * Get Google API key for server-side use only
 * @returns {string} Google API key
 */
function getGoogleApiKey() {
    if (!config.google.apiKey) {
        throw new Error('Google API key not configured. Please set GOOGLE_API_KEY environment variable.');
    }
    return config.google.apiKey;
}

/**
 * Get OpenWeather API key
 * @returns {string} OpenWeather API key
 */
function getOpenWeatherApiKey() {
    if (!config.weather.openweatherApiKey) {
        throw new Error('OpenWeather API key not configured. Please set OPENWEATHER_API_KEY environment variable.');
    }
    return config.weather.openweatherApiKey;
}

/**
 * Create secure API endpoints configuration
 * @returns {Object} API endpoints with keys
 */
function getSecureApiEndpoints() {
    return {
        google: {
            geocoding: `https://maps.googleapis.com/maps/api/geocode/json?key=${getGoogleApiKey()}`,
            places: `https://maps.googleapis.com/maps/api/place/textsearch/json?key=${getGoogleApiKey()}`,
            maps: `https://maps.googleapis.com/maps/api/js?key=${getGoogleApiKey()}`
        },
        weather: {
            current: `https://api.openweathermap.org/data/2.5/weather?appid=${getOpenWeatherApiKey()}`,
            forecast: `https://api.openweathermap.org/data/2.5/forecast?appid=${getOpenWeatherApiKey()}`
        }
    };
}

/**
 * Log API key status (without exposing keys)
 */
function logApiKeyStatus() {
    const validation = validateApiKeys();
    
    console.log('🔑 API Keys Status:');
    console.log(`  Google API: ${config.google.apiKey ? '✅ Configured' : '❌ Missing'}`);
    console.log(`  OpenWeather API: ${config.weather.openweatherApiKey ? '✅ Configured' : '❌ Missing'}`);
    console.log(`  Firebase: ${config.firebase.apiKey ? '✅ Configured' : '❌ Missing'}`);
    
    if (!validation.isValid) {
        console.warn('⚠️ Missing API keys:', validation.missingKeys.join(', '));
        console.warn('⚠️ Some features may not work properly');
    } else {
        console.log('✅ All API keys configured successfully');
    }
}

module.exports = {
    config,
    validateApiKeys,
    getGoogleApiKey,
    getOpenWeatherApiKey,
    getSecureApiEndpoints,
    logApiKeyStatus
};
