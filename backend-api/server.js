const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database initialization
const { initializeDatabase } = require('./database/init');

// Import routes with authentication middleware
const { router: authRouter, authenticateToken, authorizeRole } = require('./routes/auth');

// Public routes (no authentication required)
app.use('/api/auth', authRouter);

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

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        version: '1.0.0',
        environment: process.env.NODE_ENV || 'development',
        database: 'SQLite',
        features: [
            'User Authentication (JWT)',
            'Farm Management',
            'Livestock Tracking',
            'Crop Management',
            'Weather Data',
            'Inventory Management',
            'Employee Management',
            'Financial Records',
            'Advanced Analytics',
            'Document Management'
        ]
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