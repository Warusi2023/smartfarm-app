const express = require('express');
const helmet = require('helmet');
const path = require('path');

// Load environment and logger
const environment = require('./config/environment');
const logger = require('./lib/logger');

const app = express();
const PORT = environment.PORT;

// Custom Middleware
const corsMiddleware = require('./middleware/cors');
const requestIdMiddleware = require('./middleware/request-id');
const { sanitizeInput, preventSQLInjection } = require('./middleware/validation');

// Apply middleware in correct order
app.use(requestIdMiddleware);  // Add request ID first
app.use(helmet());              // Security headers
app.use(corsMiddleware);        // CORS with validation
app.use(logger.logRequest.bind(logger));  // Request logging
app.use(express.json({ limit: '10mb' })); // Limit JSON payload size
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(sanitizeInput);         // Sanitize all inputs
app.use(preventSQLInjection);   // Prevent SQL injection

// Database initialization
const { initializeDatabase } = require('./database/init');

// Import routes with authentication middleware
const { router: authRouter, authenticateToken, authorizeRole } = require('./routes/auth');

// Public routes (no authentication required)
app.use('/api/auth', authRouter);
app.use('/api/health', require('./routes/health'));

// Protected routes (authentication required)
app.use('/api/users', require('./routes/users'));
app.use('/api/farms', authenticateToken, require('./routes/farms'));
app.use('/api/livestock', authenticateToken, require('./routes/livestock'));
app.use('/api/crops', authenticateToken, require('./routes/crops'));
app.use('/api/weather', authenticateToken, require('./routes/weather'));
app.use('/api/inventory', authenticateToken, require('./routes/inventory'));
app.use('/api/employees', authenticateToken, require('./routes/employees'));
app.use('/api/financial', authenticateToken, require('./routes/financial'));
app.use('/api/tasks', authenticateToken, require('./routes/tasks'));
app.use('/api/analytics', authenticateToken, require('./routes/analytics'));
app.use('/api/documents', authenticateToken, require('./routes/documents'));
app.use('/api/watering', authenticateToken, require('./routes/watering'));
app.use('/api/geofencing', authenticateToken, require('./routes/geofencing'));
app.use('/api/subscriptions', authenticateToken, require('./routes/subscriptions').router);
app.use('/api/byproducts', authenticateToken, require('./routes/byproducts'));
app.use('/api/ai-advisory', authenticateToken, require('./routes/ai-advisory'));
app.use('/api/errors', require('./routes/errors')); // Error tracking endpoint
app.use('/api/weather', require('./routes/weather')); // Public endpoint, no auth required
app.use('/api/ads', require('./routes/ads')); // Public endpoint, no auth required

// Health check endpoint
app.get('/api/health', (req, res) => {
    const uptime = process.uptime();
    const memoryUsage = process.memoryUsage();
    
    res.json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        version: '1.0.0',
        environment: environment.NODE_ENV,
        uptime: {
            seconds: Math.floor(uptime),
            formatted: `${Math.floor(uptime / 3600)}h ${Math.floor((uptime % 3600) / 60)}m ${Math.floor(uptime % 60)}s`
        },
        memory: {
            heapUsed: `${Math.round(memoryUsage.heapUsed / 1024 / 1024)}MB`,
            heapTotal: `${Math.round(memoryUsage.heapTotal / 1024 / 1024)}MB`
        },
        database: {
            type: environment.DB_TYPE,
            connected: true
        },
        apis: {
            weather: !!environment.WEATHER_API_KEY,
            maps: !!environment.MAPS_API_KEY
        },
        features: {
            geofencing: environment.FEATURE_GEOFENCING,
            aiAdvisory: environment.FEATURE_AI_ADVISORY,
            byproducts: environment.FEATURE_BYPRODUCTS,
            subscriptions: environment.FEATURE_SUBSCRIPTIONS
        },
        cors: {
            allowedOrigins: environment.CORS_ORIGIN
        }
    });
});

// API Documentation endpoint
app.get('/api/docs', (req, res) => {
    res.json({
        title: 'SmartFarm API Documentation',
        version: '1.0.0',
        baseUrl: `http://localhost:${PORT}/api`,
        endpoints: {
            auth: {
                'POST /auth/register': 'Register a new user',
                'POST /auth/login': 'Login user',
                'GET /auth/profile': 'Get user profile (authenticated)',
                'PUT /auth/profile': 'Update user profile (authenticated)',
                'PUT /auth/change-password': 'Change password (authenticated)'
            },
            users: {
                'GET /users': 'Get all users (admin only)',
                'GET /users/:id': 'Get user by ID (admin or own profile)',
                'POST /users': 'Create new user (admin only)',
                'PUT /users/:id': 'Update user (admin or own profile)',
                'DELETE /users/:id': 'Delete user (admin only)',
                'GET /users/stats/overview': 'Get user statistics (admin only)',
                'PUT /users/:id/reset-password': 'Reset user password (admin only)'
            },
            farms: {
                'GET /farms': 'Get all farms (authenticated)',
                'GET /farms/:id': 'Get farm by ID (authenticated)',
                'POST /farms': 'Create new farm (authenticated)',
                'PUT /farms/:id': 'Update farm (authenticated)',
                'DELETE /farms/:id': 'Delete farm (authenticated)',
                'GET /farms/:id/stats': 'Get farm statistics (authenticated)'
            },
            analytics: {
                'GET /analytics/farm/:farmId': 'Get farm analytics (authenticated)',
                'GET /analytics/yield-predictions/:farmId': 'Get yield predictions (authenticated)',
                'GET /analytics/revenue-analysis/:farmId': 'Get revenue analysis (authenticated)',
                'GET /analytics/cost-breakdown/:farmId': 'Get cost breakdown (authenticated)',
                'GET /analytics/weather-impact/:farmId': 'Get weather impact (authenticated)',
                'GET /analytics/efficiency/:farmId': 'Get efficiency metrics (authenticated)'
            },
            livestock: {
                'GET /livestock': 'Get all livestock (authenticated)',
                'POST /livestock': 'Add livestock (authenticated)',
                'PUT /livestock/:id': 'Update livestock (authenticated)',
                'DELETE /livestock/:id': 'Delete livestock (authenticated)'
            },
            crops: {
                'GET /crops': 'Get all crops (authenticated)',
                'POST /crops': 'Add crop (authenticated)',
                'PUT /crops/:id': 'Update crop (authenticated)',
                'DELETE /crops/:id': 'Delete crop (authenticated)'
            },
            inventory: {
                'GET /inventory': 'Get all inventory (authenticated)',
                'GET /inventory/:id': 'Get inventory item by ID (authenticated)',
                'POST /inventory': 'Add inventory item (authenticated)',
                'PUT /inventory/:id': 'Update inventory item (authenticated)',
                'DELETE /inventory/:id': 'Delete inventory item (authenticated)',
                'PATCH /inventory/:id/quantity': 'Update inventory quantity (authenticated)',
                'GET /inventory/:id/analytics': 'Get inventory analytics (authenticated)',
                'GET /inventory/stats/overview': 'Get inventory statistics (authenticated)'
            },
            employees: {
                'GET /employees': 'Get all employees (authenticated)',
                'POST /employees': 'Add employee (authenticated)',
                'PUT /employees/:id': 'Update employee (authenticated)',
                'DELETE /employees/:id': 'Delete employee (authenticated)'
            },
            financial: {
                'GET /financial': 'Get financial records (authenticated)',
                'POST /financial': 'Add financial record (authenticated)',
                'PUT /financial/:id': 'Update financial record (authenticated)',
                'DELETE /financial/:id': 'Delete financial record (authenticated)'
            },
            tasks: {
                'GET /tasks': 'Get all tasks (authenticated)',
                'GET /tasks/:id': 'Get task by ID (authenticated)',
                'POST /tasks': 'Create new task (authenticated)',
                'PUT /tasks/:id': 'Update task (authenticated)',
                'DELETE /tasks/:id': 'Delete task (authenticated)',
                'PATCH /tasks/:id/status': 'Update task status (authenticated)',
                'GET /tasks/:id/analytics': 'Get task analytics (authenticated)',
                'GET /tasks/stats/overview': 'Get task statistics (authenticated)'
            },
            documents: {
                'GET /documents': 'Get all documents (authenticated)',
                'POST /documents': 'Upload document (authenticated)',
                'PUT /documents/:id': 'Update document (authenticated)',
                'DELETE /documents/:id': 'Delete document (authenticated)'
            }
        },
        authentication: {
            type: 'JWT Bearer Token',
            header: 'Authorization: Bearer <token>',
            tokenExpiry: '24 hours'
        },
        roles: {
            farmer: 'Basic farm management access',
            manager: 'Extended farm management with employee access',
            admin: 'Full system access including user management'
        }
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        error: 'Something went wrong!',
        message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
    });
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        error: 'Route not found',
        path: req.originalUrl,
        availableEndpoints: [
            '/api/health',
            '/api/docs',
            '/api/auth/*',
            '/api/users/*',
            '/api/farms/*',
            '/api/analytics/*',
            '/api/livestock/*',
            '/api/crops/*',
            '/api/tasks/*',
            '/api/inventory/*',
            '/api/employees/*',
            '/api/financial/*',
            '/api/documents/*'
        ]
    });
});

// Start server
async function startServer() {
    try {
        // Initialize database first
        await initializeDatabase();
        
        // Start the server
        app.listen(PORT, () => {
            console.log(`🚀 SmartFarm Backend API running on port ${PORT}`);
            console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
            console.log(`📚 API Documentation: http://localhost:${PORT}/api/docs`);
            console.log(`🔐 Authentication: JWT Bearer Token`);
            console.log(`💾 Database: SQLite`);
            console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
        });
    } catch (error) {
        console.error('❌ Failed to start server:', error);
        process.exit(1);
    }
}

// Start the server
startServer();

module.exports = app; 