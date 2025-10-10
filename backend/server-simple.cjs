/**
 * SmartFarm Simple Production Server
 * Minimal server for Railway deployment
 */

const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

/** Allow only known web origins */
const ALLOWED_ORIGINS = new Set([
    'https://www.smartfarm-app.com',                      // your Netlify/custom domain
    'https://smartfarm-app.netlify.app',                  // Netlify preview
    'https://smartfarm-backend.railway.app',              // if you use this domain for API
    'https://smartfarm-app-production.up.railway.app',    // default Railway domain (if used)
    'http://localhost:3000',                              // local dev
    'http://localhost:8080',                              // local dev
]);

// Add custom origins from environment
if (process.env.CORS_ORIGINS) {
    const customOrigins = process.env.CORS_ORIGINS.split(',').map(s => s.trim());
    customOrigins.forEach(origin => ALLOWED_ORIGINS.add(origin));
}

app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (origin && ALLOWED_ORIGINS.has(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
        res.setHeader('Vary', 'Origin');
    }
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    // If you need cookies across sites:
    // res.setHeader('Access-Control-Allow-Credentials', 'true');

    if (req.method === 'OPTIONS') return res.status(204).end();
    next();
});

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

/** Fast health for Railway */
app.get('/api/health', (_req, res) => {
    res.json({ ok: true, service: 'SmartFarm', ts: Date.now() });
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
    console.log(`🌐 CORS Origins: ${Array.from(ALLOWED_ORIGINS).join(', ')}`);
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
