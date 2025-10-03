#!/usr/bin/env node

/**
 * SmartFarm Backend Startup Script
 * Handles initialization and graceful startup
 */

const path = require('path');

// Set up environment
process.env.NODE_ENV = process.env.NODE_ENV || 'production';
process.env.PORT = process.env.PORT || 3000;
process.env.HOST = process.env.HOST || '0.0.0.0';

console.log('🚀 Starting SmartFarm Backend API...');
console.log(`🌍 Environment: ${process.env.NODE_ENV}`);
console.log(`🔌 Host: ${process.env.HOST}`);
console.log(`🔌 Port: ${process.env.PORT}`);

// Ensure database directory exists
const fs = require('fs');
const dbDir = path.join(__dirname, 'database');
if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
    console.log('📁 Created database directory');
}

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
    console.error('❌ Uncaught Exception:', error);
    process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
    process.exit(1);
});

// Start the server
try {
    require('./server.js');
} catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
}
