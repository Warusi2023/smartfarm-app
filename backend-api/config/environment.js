// Environment Configuration with Validation
const path = require('path');

// Load environment variables
require('dotenv').config({ path: path.join(__dirname, '../.env') });

// Environment configuration object
const environment = {
    // Server
    NODE_ENV: process.env.NODE_ENV || 'development',
    PORT: parseInt(process.env.PORT, 10) || 3000,
    HOST: process.env.HOST || '0.0.0.0',
    
    // Logging
    LOG_LEVEL: process.env.LOG_LEVEL || 'info',
    
    // Database
    DB_TYPE: process.env.DB_TYPE || 'sqlite',
    DB_PATH: process.env.DB_PATH || './database/smartfarm.db',
    DATABASE_URL: process.env.DATABASE_URL,
    
    // Security
    JWT_SECRET: process.env.JWT_SECRET || 'dev-secret-change-in-production',
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '24h',
    
    // CORS
    CORS_ORIGIN: process.env.CORS_ORIGIN ? 
        process.env.CORS_ORIGIN.split(',').map(origin => origin.trim()) : 
        ['http://localhost:3000', 'http://localhost:8080'],
    CORS_CREDENTIALS: process.env.CORS_CREDENTIALS === 'true',
    
    // External APIs
    WEATHER_API_KEY: process.env.WEATHER_API_KEY,
    MAPS_API_KEY: process.env.MAPS_API_KEY,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    
    // Rate Limiting
    RATE_LIMIT_ENABLED: process.env.RATE_LIMIT_ENABLED !== 'false',
    RATE_LIMIT_WINDOW_MS: parseInt(process.env.RATE_LIMIT_WINDOW_MS, 10) || 900000,
    RATE_LIMIT_MAX_REQUESTS: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS, 10) || 100,
    
    // File Uploads
    MAX_FILE_SIZE: parseInt(process.env.MAX_FILE_SIZE, 10) || 10485760,
    UPLOAD_PATH: process.env.UPLOAD_PATH || './uploads',
    
    // Feature Flags
    FEATURE_GEOFENCING: process.env.FEATURE_GEOFENCING !== 'false',
    FEATURE_AI_ADVISORY: process.env.FEATURE_AI_ADVISORY !== 'false',
    FEATURE_BYPRODUCTS: process.env.FEATURE_BYPRODUCTS !== 'false',
    FEATURE_SUBSCRIPTIONS: process.env.FEATURE_SUBSCRIPTIONS !== 'false',
    
    // Computed
    IS_PRODUCTION: process.env.NODE_ENV === 'production',
    IS_DEVELOPMENT: process.env.NODE_ENV === 'development',
    IS_TEST: process.env.NODE_ENV === 'test',
};

// Validation
function validateEnvironment() {
    const errors = [];
    
    // Check critical variables in production
    if (environment.IS_PRODUCTION) {
        if (environment.JWT_SECRET === 'dev-secret-change-in-production') {
            errors.push('JWT_SECRET must be set in production');
        }
        
        if (environment.JWT_SECRET.length < 32) {
            errors.push('JWT_SECRET must be at least 32 characters');
        }
        
        if (!environment.DATABASE_URL && environment.DB_TYPE === 'postgresql') {
            errors.push('DATABASE_URL must be set for PostgreSQL');
        }
    }
    
    // Check PORT is valid
    if (isNaN(environment.PORT) || environment.PORT < 1 || environment.PORT > 65535) {
        errors.push('PORT must be a valid port number (1-65535)');
    }
    
    // Warn about missing API keys (non-critical)
    const warnings = [];
    if (!environment.WEATHER_API_KEY) {
        warnings.push('WEATHER_API_KEY not set - weather features will use demo data');
    }
    if (!environment.MAPS_API_KEY) {
        warnings.push('MAPS_API_KEY not set - map features may be limited');
    }
    
    // Log validation results
    if (errors.length > 0) {
        console.error('❌ Environment Validation Errors:');
        errors.forEach(error => console.error(`   - ${error}`));
        if (environment.IS_PRODUCTION) {
            throw new Error('Invalid environment configuration in production');
        }
    }
    
    if (warnings.length > 0 && environment.IS_DEVELOPMENT) {
        console.warn('⚠️  Environment Warnings:');
        warnings.forEach(warning => console.warn(`   - ${warning}`));
    }
    
    if (errors.length === 0 && environment.IS_PRODUCTION) {
        console.log('✅ Environment validation passed');
    }
}

// Run validation
validateEnvironment();

// Log environment info
if (environment.IS_DEVELOPMENT) {
    console.log('\n📋 Environment Configuration:');
    console.log(`   NODE_ENV: ${environment.NODE_ENV}`);
    console.log(`   PORT: ${environment.PORT}`);
    console.log(`   LOG_LEVEL: ${environment.LOG_LEVEL}`);
    console.log(`   DB_TYPE: ${environment.DB_TYPE}`);
    console.log(`   CORS_ORIGIN: ${environment.CORS_ORIGIN.join(', ')}`);
    console.log(`   Features: Geofencing=${environment.FEATURE_GEOFENCING}, AI=${environment.FEATURE_AI_ADVISORY}`);
    console.log('');
}

module.exports = environment;

