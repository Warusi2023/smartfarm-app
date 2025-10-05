#!/usr/bin/env node

/**
 * Railway Deployment Setup Script
 * This script prepares the web-project for Railway deployment
 */

const fs = require('fs');
const path = require('path');

console.log('🚀 Setting up Railway deployment...');

try {
    // Backup original files
    console.log('📁 Creating backups...');
    
    if (fs.existsSync('package.json')) {
        fs.copyFileSync('package.json', 'package.json.backup');
    }
    
    if (fs.existsSync('railway.json')) {
        fs.copyFileSync('railway.json', 'railway.json.backup');
    }
    
    // Use Railway-optimized configuration
    console.log('⚙️  Applying Railway configuration...');
    fs.copyFileSync('package-railway.json', 'package.json');
    fs.copyFileSync('railway-simple.json', 'railway.json');
    
    console.log('✅ Railway deployment setup complete!');
    console.log('');
    console.log('📋 Railway Configuration:');
    console.log('  - Uses http-server for static file serving');
    console.log('  - Minimal dependencies (only http-server)');
    console.log('  - No complex build process');
    console.log('  - Optimized for Railway deployment');
    console.log('');
    console.log('🌐 Your dashboard will be available at:');
    console.log('  - /dashboard.html (main dashboard)');
    console.log('  - /dashboard-simple.html (fallback dashboard)');
    
} catch (error) {
    console.error('❌ Error setting up Railway deployment:', error.message);
    process.exit(1);
}
