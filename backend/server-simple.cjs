/**
 * SmartFarm Simple Production Server
 * Minimal server for Railway deployment
 */

const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

/** Allow only known web origins */
const ALLOWED_ORIGINS = new Set([
    'https://www.smartfarm-app.com',                      // your Netlify/custom domain (PRIMARY)
    'https://smartfarm-app.com',                          // your Netlify/custom domain (no www)
    'https://smartfarm-app.netlify.app',                  // Netlify preview
    'https://smartfarm-app-production.up.railway.app',    // default Railway domain (if used)
    'https://smartfarm-backend.railway.app',              // if you use this domain for API
    'https://railway.com',                                // Railway's own domain (required)
    'https://www.railway.com',                            // Railway's www domain
    'https://railway.app',                                // Railway app domain
    'http://localhost:3000',                              // local dev
    'http://localhost:8080',                              // local dev
    'http://localhost:4173',                              // local dev (vite preview)
]);

// Add custom origins from environment
if (process.env.CORS_ORIGINS) {
    const customOrigins = process.env.CORS_ORIGINS.split(',').map(s => s.trim());
    customOrigins.forEach(origin => ALLOWED_ORIGINS.add(origin));
}

// BULLETPROOF CORS - Set headers on EVERY response
app.use((req, res, next) => {
    const origin = req.headers.origin;
    
    // Determine allowed origin
    let allowedOrigin;
    if (origin && ALLOWED_ORIGINS.has(origin)) {
        // If origin is in our allowed list, use it
        allowedOrigin = origin;
    } else if (origin && origin.includes('smartfarm-app')) {
        // If origin contains smartfarm-app, allow it (for various domains)
        allowedOrigin = origin;
    } else {
        // Default fallback to primary domain
        allowedOrigin = 'https://www.smartfarm-app.com';
    }
    
    // Set CORS headers IMMEDIATELY (before any processing)
    res.setHeader('Access-Control-Allow-Origin', allowedOrigin);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS, HEAD');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept, Origin, X-Auth-Token, X-API-Key');
    res.setHeader('Access-Control-Expose-Headers', 'Content-Length, Content-Type, X-Total-Count');
    res.setHeader('Access-Control-Max-Age', '86400'); // 24 hours
    res.setHeader('Vary', 'Origin');
    
    // Log CORS info for debugging (only in development)
    if (process.env.NODE_ENV !== 'production' || process.env.DEBUG_CORS === 'true') {
        console.log(`[CORS] ${req.method} ${req.path} - Origin: ${origin || 'none'} - Allowed: ${allowedOrigin}`);
    }
    
    // Handle preflight OPTIONS requests immediately
    if (req.method === 'OPTIONS') {
        console.log('[CORS] Preflight request handled successfully');
        return res.status(204).end();
    }
    
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

// Global error handler (ensure CORS headers even on errors)
app.use((err, req, res, next) => {
    console.error('Error:', err);
    
    // Ensure CORS headers are set even on error responses
    const origin = req.headers.origin;
    let allowedOrigin;
    if (origin && ALLOWED_ORIGINS.has(origin)) {
        allowedOrigin = origin;
    } else if (origin && origin.includes('smartfarm-app')) {
        allowedOrigin = origin;
    } else {
        allowedOrigin = 'https://www.smartfarm-app.com';
    }
    
    res.setHeader('Access-Control-Allow-Origin', allowedOrigin);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS, HEAD');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept, Origin, X-Auth-Token, X-API-Key');
    res.setHeader('Vary', 'Origin');
    
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
