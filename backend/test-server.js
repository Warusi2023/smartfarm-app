// Test script to verify server-simple.cjs works
const http = require('http');

const PORT = process.env.PORT || 3000;

// Test the server
const server = require('./server-simple.cjs');

console.log(`✅ Server loaded successfully`);
console.log(`🚀 Server should be running on port ${PORT}`);
console.log(`🔗 Test health check: http://localhost:${PORT}/api/health`);

// Test health endpoint after 2 seconds
setTimeout(() => {
    const options = {
        hostname: 'localhost',
        port: PORT,
        path: '/api/health',
        method: 'GET'
    };

    const req = http.request(options, (res) => {
        console.log(`📊 Health check status: ${res.statusCode}`);
        res.on('data', (chunk) => {
            console.log(`📋 Response: ${chunk}`);
        });
        res.on('end', () => {
            console.log('✅ Health check completed');
            process.exit(0);
        });
    });

    req.on('error', (err) => {
        console.error(`❌ Health check failed: ${err.message}`);
        process.exit(1);
    });

    req.end();
}, 2000);