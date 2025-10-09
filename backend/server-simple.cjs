/**
 * SmartFarm Simple Production Server
 * Minimal server for Railway deployment
 */

const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// CORS configuration
const allowedOrigins = [
    'https://smartfarmfiji.com',
    'https://www.smartfarmfiji.com',
    'https://smartfarm-app.com',
    'https://www.smartfarm-app.com',
    'https://smartfarm-app.netlify.app',
    'http://localhost:3000',
    'http://localhost:8080'
];

// Add custom origins from environment
if (process.env.CORS_ORIGINS) {
    const customOrigins = process.env.CORS_ORIGINS.split(',').map(s => s.trim());
    allowedOrigins.push(...customOrigins);
}

app.use(cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-API-Key']
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        ok: true,
        service: process.env.API_NAME || 'SmartFarm',
        version: process.env.API_VERSION || 'v1',
        environment: process.env.NODE_ENV || 'production',
        timestamp: Date.now(),
        database: 'not_configured'
    });
});

// Basic API endpoints
app.get('/api', (req, res) => {
    res.json({
        message: 'SmartFarm API is running!',
        version: process.env.API_VERSION || 'v1',
        environment: process.env.NODE_ENV || 'production'
    });
});

// Authentication endpoints (basic implementation)
app.post('/api/auth/register', (req, res) => {
    const { email, password, firstName, lastName } = req.body;
    
    if (!email || !password || !firstName || !lastName) {
        return res.status(400).json({
            success: false,
            error: 'Missing required fields',
            code: 'MISSING_FIELDS'
        });
    }
    
    // Mock successful registration
    res.status(201).json({
        success: true,
        message: 'User registered successfully',
        data: {
            user: {
                id: 'user_' + Date.now(),
                email: email,
                firstName: firstName,
                lastName: lastName,
                role: 'farmer'
            },
            token: 'mock-jwt-token-' + Date.now()
        }
    });
});

app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;
    
    if (!email || !password) {
        return res.status(400).json({
            success: false,
            error: 'Email and password are required',
            code: 'MISSING_CREDENTIALS'
        });
    }
    
    // Mock successful login
    res.json({
        success: true,
        message: 'Login successful',
        data: {
            user: {
                id: 'user_123',
                email: email,
                firstName: 'Test',
                lastName: 'User',
                role: 'farmer'
            },
            token: 'mock-jwt-token-' + Date.now()
        }
    });
});

// Protected routes (basic implementation)
app.get('/api/farms', (req, res) => {
    res.json({
        success: true,
        message: 'Farms endpoint - authentication required',
        data: []
    });
});

app.get('/api/crops', (req, res) => {
    res.json({
        success: true,
        message: 'Crops endpoint - authentication required',
        data: []
    });
});

app.get('/api/livestock', (req, res) => {
    res.json({
        success: true,
        message: 'Livestock endpoint - authentication required',
        data: []
    });
});

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
    console.error('Error:', err);
    res.status(err.status || 500).json({
        success: false,
        error: process.env.NODE_ENV === 'production' ? 'Internal server error' : err.message,
        code: 'INTERNAL_ERROR'
    });
});

// Start server
const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 SmartFarm API server running on port ${PORT}`);
    console.log(`📊 Environment: ${process.env.NODE_ENV || 'production'}`);
    console.log(`🔗 Health check: http://localhost:${PORT}/api/health`);
    console.log(`🌐 CORS Origins: ${allowedOrigins.join(', ')}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM received, shutting down gracefully');
    server.close(() => {
        console.log('Process terminated');
        process.exit(0);
    });
});

process.on('SIGINT', () => {
    console.log('SIGINT received, shutting down gracefully');
    server.close(() => {
        console.log('Process terminated');
        process.exit(0);
    });
});

module.exports = { app, server };
