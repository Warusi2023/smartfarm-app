/**
 * SmartFarm Production Server
 * Production-ready Express server with authentication, database, and monitoring
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const { Pool } = require('pg');

// Import routes and middleware
const AuthRoutes = require('./routes/auth');
const AuthMiddleware = require('./middleware/auth');
const PaginationMiddleware = require('./middleware/pagination');
const CacheMiddleware = require('./middleware/cache');
const MonitoringConfig = require('./config/monitoring');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// Initialize database connection with improved pool settings
const dbPool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
    max: parseInt(process.env.DB_POOL_MAX || '50', 10), // Increased from 20 to 50
    min: parseInt(process.env.DB_POOL_MIN || '10', 10), // Minimum connections
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
    // Additional performance settings
    statement_timeout: 30000, // 30 seconds query timeout
    query_timeout: 30000,
});

// Test database connection
dbPool.on('connect', () => {
    console.log('✅ Database connected successfully');
});

dbPool.on('error', (err) => {
    console.error('❌ Database connection error:', err);
});

// Initialize middleware
const authMiddleware = new AuthMiddleware();
const paginationMiddleware = new PaginationMiddleware();
const cacheMiddleware = new CacheMiddleware();
const monitoring = new MonitoringConfig();

// Apply pagination middleware to all API routes
app.use('/api/', paginationMiddleware.parsePagination.bind(paginationMiddleware));
app.use('/api/', paginationMiddleware.responseHelper.bind(paginationMiddleware));

// Apply monitoring middleware
app.use(monitoring.requestTracking());

// Security middleware
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            scriptSrc: ["'self'"],
            imgSrc: ["'self'", "data:", "https:"],
            connectSrc: ["'self'"],
            fontSrc: ["'self'"],
            objectSrc: ["'none'"],
            mediaSrc: ["'self'"],
            frameSrc: ["'none'"],
        },
    },
    crossOriginEmbedderPolicy: false
}));

// CORS middleware
app.use(authMiddleware.cors());

// Compression middleware
app.use(compression());

// Logging middleware
if (NODE_ENV === 'production') {
    app.use(morgan('combined'));
} else {
    app.use(morgan('dev'));
}

// Tiered rate limiting - Different limits for authenticated vs unauthenticated users
// Unauthenticated users - stricter limits
const unauthenticatedLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: parseInt(process.env.RATE_LIMIT_UNAUTH || '100', 10), // 100 requests per 15 min
    message: {
        success: false,
        error: 'Too many requests from this IP, please try again later.',
        code: 'RATE_LIMIT_EXCEEDED'
    },
    standardHeaders: true,
    legacyHeaders: false,
    skip: (req) => {
        // Skip if user is authenticated (they'll use authenticated limiter)
        return !!req.headers.authorization;
    }
});

// Authenticated users - more generous limits
const authenticatedLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: parseInt(process.env.RATE_LIMIT_AUTH || '300', 10), // 300 requests per 15 min
    message: {
        success: false,
        error: 'Too many requests, please try again later.',
        code: 'RATE_LIMIT_EXCEEDED'
    },
    standardHeaders: true,
    legacyHeaders: false,
    skip: (req) => {
        // Only apply to authenticated requests
        return !req.headers.authorization;
    },
    keyGenerator: (req) => {
        // Use user ID if available, otherwise fall back to IP
        return req.user?.id || req.ip;
    }
});

// Apply rate limiting to API routes
app.use('/api/', unauthenticatedLimiter);
app.use('/api/', authenticatedLimiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check endpoint (before auth)
app.get('/api/health', async (req, res) => {
    try {
        // Test database connection
        const dbTest = await dbPool.query('SELECT 1 as test');
        
        res.json({
            ok: true,
            service: process.env.API_NAME || 'SmartFarm',
            version: process.env.API_VERSION || 'v1',
            environment: NODE_ENV,
            timestamp: Date.now(),
            database: dbTest.rows[0] ? 'connected' : 'disconnected'
        });
    } catch (error) {
        console.error('Health check failed:', error);
        res.status(503).json({
            ok: false,
            service: process.env.API_NAME || 'SmartFarm',
            version: process.env.API_VERSION || 'v1',
            environment: NODE_ENV,
            timestamp: Date.now(),
            error: 'Service unavailable'
        });
    }
});

// API routes
const authRoutes = new AuthRoutes();
app.use('/api/auth', authRoutes.getRouter());

// Protected API routes (require authentication)
app.use('/api/farms', authMiddleware.authenticate(), (req, res) => {
    res.json({
        success: true,
        message: 'Farms endpoint - authentication required',
        user: req.user
    });
});

app.use('/api/crops', authMiddleware.authenticate(), (req, res) => {
    res.json({
        success: true,
        message: 'Crops endpoint - authentication required',
        user: req.user
    });
});

app.use('/api/livestock', authMiddleware.authenticate(), (req, res) => {
    res.json({
        success: true,
        message: 'Livestock endpoint - authentication required',
        user: req.user
    });
});

app.use('/api/pets', authMiddleware.authenticate(), (req, res) => {
    res.json({
        success: true,
        message: 'Pets endpoint - authentication required',
        user: req.user
    });
});

app.use('/api/inventory', authMiddleware.authenticate(), (req, res) => {
    res.json({
        success: true,
        message: 'Inventory endpoint - authentication required',
        user: req.user
    });
});

app.use('/api/tasks', authMiddleware.authenticate(), (req, res) => {
    res.json({
        success: true,
        message: 'Tasks endpoint - authentication required',
        user: req.user
    });
});

app.use('/api/financial', authMiddleware.authenticate(), (req, res) => {
    res.json({
        success: true,
        message: 'Financial endpoint - authentication required',
        user: req.user
    });
});

app.use('/api/analytics', authMiddleware.authenticate(), (req, res) => {
    res.json({
        success: true,
        message: 'Analytics endpoint - authentication required',
        user: req.user
    });
});

// API documentation endpoint (development only)
if (NODE_ENV === 'development' && process.env.ENABLE_SWAGGER_DOCS === 'true') {
    app.get('/api/docs', (req, res) => {
        res.json({
            title: 'SmartFarm API Documentation',
            version: '1.0.0',
            endpoints: {
                health: 'GET /api/health',
                auth: {
                    register: 'POST /api/auth/register',
                    login: 'POST /api/auth/login',
                    logout: 'POST /api/auth/logout',
                    profile: 'GET /api/auth/me',
                    refresh: 'POST /api/auth/refresh'
                },
                protected: {
                    farms: 'GET /api/farms',
                    crops: 'GET /api/crops',
                    livestock: 'GET /api/livestock',
                    pets: 'GET /api/pets',
                    inventory: 'GET /api/inventory',
                    tasks: 'GET /api/tasks',
                    financial: 'GET /api/financial',
                    analytics: 'GET /api/analytics'
                }
            }
        });
    });
}

// 404 handler
app.use('/api/*', (req, res) => {
    res.status(404).json({
        success: false,
        error: 'API endpoint not found',
        code: 'NOT_FOUND',
        path: req.path
    });
});

// Global error handler with monitoring
app.use(monitoring.errorHandler());
app.use((err, req, res, next) => {
    console.error('Global error handler:', err);

    // Capture error with monitoring (already done by errorHandler middleware)
    // This is a fallback if errorHandler didn't catch it

    // Don't leak error details in production
    const errorMessage = NODE_ENV === 'production' 
        ? 'Internal server error' 
        : err.message;

    res.status(err.status || 500).json({
        success: false,
        error: errorMessage,
        code: 'INTERNAL_ERROR',
        ...(NODE_ENV === 'development' && { stack: err.stack })
    });
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM received, shutting down gracefully');
    server.close(() => {
        console.log('Process terminated');
        dbPool.end(() => {
            console.log('Database connections closed');
            process.exit(0);
        });
    });
});

process.on('SIGINT', () => {
    console.log('SIGINT received, shutting down gracefully');
    server.close(() => {
        console.log('Process terminated');
        dbPool.end(() => {
            console.log('Database connections closed');
            process.exit(0);
        });
    });
});

// Start server
const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 SmartFarm API server running on port ${PORT}`);
    console.log(`📊 Environment: ${NODE_ENV}`);
    console.log(`🔗 Health check: http://localhost:${PORT}/api/health`);
    console.log(`📚 API docs: http://localhost:${PORT}/api/docs`);
    console.log(`🗄️ Database: ${process.env.DATABASE_URL ? 'Connected' : 'Not configured'}`);
});

// Export for testing
module.exports = { app, server, dbPool };
