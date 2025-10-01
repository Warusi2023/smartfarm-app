// CORS Middleware Configuration
const cors = require('cors');
const environment = require('../config/environment');
const logger = require('../lib/logger');

// CORS configuration
const corsOptions = {
    origin: function (origin, callback) {
        // Allow requests with no origin (mobile apps, Postman, etc.)
        if (!origin) {
            return callback(null, true);
        }

        const allowedOrigins = environment.CORS_ORIGIN;
        
        // Check if origin is allowed
        if (allowedOrigins.includes(origin) || allowedOrigins.includes('*')) {
            callback(null, true);
        } else {
            logger.warn(`CORS blocked request from: ${origin}`, {
                allowedOrigins: allowedOrigins
            });
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: environment.CORS_CREDENTIALS,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: [
        'Content-Type',
        'Authorization',
        'X-Request-Id',
        'X-Requested-With',
        'Accept'
    ],
    exposedHeaders: ['X-Request-Id'],
    maxAge: 86400, // 24 hours
    preflightContinue: false,
    optionsSuccessStatus: 204
};

// Create CORS middleware
const corsMiddleware = cors(corsOptions);

// Log CORS configuration on startup
logger.info('CORS Configuration:', {
    allowedOrigins: environment.CORS_ORIGIN,
    credentials: environment.CORS_CREDENTIALS
});

module.exports = corsMiddleware;

