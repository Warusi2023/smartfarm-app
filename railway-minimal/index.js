const express = require('express');
const app = express();

// Environment variables
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'production';
const API_VERSION = process.env.API_VERSION || '1.0.0';
const API_NAME = process.env.API_NAME || 'SmartFarm API';
const LOG_LEVEL = process.env.LOG_LEVEL || 'info';

// Middleware
app.use(express.json());

// CORS middleware
app.use((req, res, next) => {
    const corsOrigin = process.env.CORS_ORIGIN || '*';
    res.header('Access-Control-Allow-Origin', corsOrigin);
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        status: 'success',
        message: `${API_NAME} is running`,
        timestamp: new Date().toISOString(),
        environment: NODE_ENV,
        version: API_VERSION,
        port: PORT,
        logLevel: LOG_LEVEL,
        database: process.env.DATABASE_TYPE || 'In-Memory',
        corsOrigin: process.env.CORS_ORIGIN || '*'
    });
});

// Root endpoint
app.get('/', (req, res) => {
    res.json({
        message: API_NAME,
        status: 'running',
        version: API_VERSION,
        environment: NODE_ENV,
        endpoints: {
            health: '/api/health',
            root: '/'
        }
    });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 ${API_NAME} server running on port ${PORT}`);
    console.log(`🌍 Environment: ${NODE_ENV}`);
    console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
    console.log(`📝 Log level: ${LOG_LEVEL}`);
});

module.exports = app;
