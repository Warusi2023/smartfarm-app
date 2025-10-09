#!/usr/bin/env node

/**
 * Railway Deployment Script
 * Ensures proper deployment configuration for Railway
 */

const fs = require('fs');
const path = require('path');

console.log('🚀 Starting Railway deployment preparation...');

// Set environment variables for Railway
process.env.NODE_ENV = 'production';
process.env.PORT = process.env.PORT || '3000';
process.env.HOST = '0.0.0.0';

// Ensure database directory exists
const dbDir = path.join(__dirname, 'database');
if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
    console.log('📁 Created database directory');
}

// Check if package.json exists
const packagePath = path.join(__dirname, 'package.json');
if (!fs.existsSync(packagePath)) {
    console.error('❌ package.json not found in backend-api directory');
    process.exit(1);
}

console.log('✅ Railway deployment preparation complete');
console.log(`🌍 Environment: ${process.env.NODE_ENV}`);
console.log(`🔌 Host: ${process.env.HOST}`);
console.log(`🔌 Port: ${process.env.PORT}`);

// Start the server
require('./server.js');
