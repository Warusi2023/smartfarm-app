const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        status: 'success',
        message: 'SmartFarm API is running',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'production',
        version: '1.0.0'
    });
});

// Root endpoint
app.get('/', (req, res) => {
    res.json({
        message: 'SmartFarm API Server',
        status: 'running',
        version: '1.0.0'
    });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 SmartFarm API server running on port ${PORT}`);
});

module.exports = app;
