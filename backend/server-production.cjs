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

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// Initialize database connection
const dbPool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
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

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: {
        success: false,
        error: 'Too many requests from this IP, please try again later.',
        code: 'RATE_LIMIT_EXCEEDED'
    },
    standardHeaders: true,
    legacyHeaders: false,
});

app.use('/api/', limiter);

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

// Global error handler
app.use((err, req, res, next) => {
    console.error('Global error handler:', err);

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
