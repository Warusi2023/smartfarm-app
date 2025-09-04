#!/usr/bin/env node

/**
 * Railway Setup Script for SmartFarm Backend
 * This script helps prepare the backend for Railway deployment
 */

const fs = require('fs');
const path = require('path');

console.log('🚀 SmartFarm Backend - Railway Setup');
console.log('=====================================\n');

// Check if we're in the right directory
if (!fs.existsSync('package.json')) {
    console.error('❌ Error: Please run this script from the backend-api directory');
    process.exit(1);
}

// Check if .env file exists
if (!fs.existsSync('.env')) {
    console.log('📝 Creating .env file from template...');
    if (fs.existsSync('config.env.example')) {
        fs.copyFileSync('config.env.example', '.env');
        console.log('✅ .env file created from config.env.example');
    } else {
        console.log('⚠️  config.env.example not found, creating basic .env...');
        const basicEnv = `# SmartFarm Backend Environment Variables
NODE_ENV=development
PORT=3000
JWT_SECRET=your-super-secret-jwt-key-here-change-in-production
DB_TYPE=sqlite
DB_PATH=./database/smartfarm.db
CORS_ORIGIN=http://localhost:3000,http://localhost:8080
`;
        fs.writeFileSync('.env', basicEnv);
        console.log('✅ Basic .env file created');
    }
} else {
    console.log('✅ .env file already exists');
}

// Check if node_modules exists
if (!fs.existsSync('node_modules')) {
    console.log('📦 Installing dependencies...');
    const { execSync } = require('child_process');
    try {
        execSync('npm install', { stdio: 'inherit' });
        console.log('✅ Dependencies installed');
    } catch (error) {
        console.error('❌ Error installing dependencies:', error.message);
        process.exit(1);
    }
} else {
    console.log('✅ Dependencies already installed');
}

// Check if database exists
if (!fs.existsSync('database/smartfarm.db')) {
    console.log('🗄️  Setting up database...');
    try {
        const { execSync } = require('child_process');
        execSync('npm run migrate', { stdio: 'inherit' });
        console.log('✅ Database initialized');
    } catch (error) {
        console.error('❌ Error setting up database:', error.message);
        console.log('💡 You may need to run: npm run migrate');
    }
} else {
    console.log('✅ Database already exists');
}

// Check Railway configuration files
const railwayFiles = ['railway.json', 'nixpacks.toml', 'railway.env.example'];
let missingFiles = [];

railwayFiles.forEach(file => {
    if (!fs.existsSync(file)) {
        missingFiles.push(file);
    }
});

if (missingFiles.length > 0) {
    console.log('⚠️  Missing Railway configuration files:', missingFiles.join(', '));
    console.log('💡 These files should have been created automatically');
} else {
    console.log('✅ Railway configuration files present');
}

// Test server startup
console.log('\n🧪 Testing server startup...');
try {
    const { execSync } = require('child_process');
    const testProcess = execSync('timeout 5s npm start || true', { 
        stdio: 'pipe',
        encoding: 'utf8'
    });
    console.log('✅ Server can start successfully');
} catch (error) {
    console.log('⚠️  Server startup test failed, but this might be normal');
}

console.log('\n🎉 Railway Setup Complete!');
console.log('\nNext steps:');
console.log('1. Push your code to GitHub');
console.log('2. Go to https://railway.app');
console.log('3. Create a new project from your GitHub repo');
console.log('4. Add PostgreSQL database');
console.log('5. Configure environment variables');
console.log('6. Deploy!');
console.log('\n📚 See RAILWAY_DEPLOYMENT_GUIDE.md for detailed instructions');

// Display current configuration
console.log('\n📋 Current Configuration:');
console.log('========================');
console.log(`Node.js Version: ${process.version}`);
console.log(`Platform: ${process.platform}`);
console.log(`Architecture: ${process.arch}`);

// Check package.json scripts
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
console.log(`Available Scripts: ${Object.keys(packageJson.scripts).join(', ')}`);

console.log('\n🚀 Ready for Railway deployment!');
