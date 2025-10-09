// Railway Configuration
module.exports = {
    NODE_ENV: process.env.NODE_ENV || 'production',
    PORT: process.env.PORT || 3000,
    JWT_SECRET: process.env.JWT_SECRET || 'smartfarm-railway-secret-key-2024-production',
    CORS_ORIGIN: process.env.CORS_ORIGIN || '*',
    HELMET_ENABLED: process.env.HELMET_ENABLED || 'true',
    RATE_LIMIT_ENABLED: process.env.RATE_LIMIT_ENABLED || 'true',
    RATE_LIMIT_WINDOW_MS: process.env.RATE_LIMIT_WINDOW_MS || 900000,
    RATE_LIMIT_MAX_REQUESTS: process.env.RATE_LIMIT_MAX_REQUESTS || 100,
    LOG_LEVEL: process.env.LOG_LEVEL || 'info'
};
