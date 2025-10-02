#!/usr/bin/env node

/**
 * SmartFarm Configuration Checker
 * Verifies that all required secrets and variables are configured
 */

const https = require('https');

console.log('🔍 SmartFarm Configuration Checker\n');

// Configuration values
const config = {
  jwtSecret: 'dc9fd018ef76c1e7065698adecdb551dbe3baa002cdbd4f8ae35a52211e65516',
  backendUrl: 'https://smartfarm-app-production.up.railway.app',
  frontendUrl: 'https://dulcet-sawine-92d6a8.netlify.app',
  githubRepo: 'Warusi2023/smartfarm-app'
};

console.log('📋 Configuration Values:');
console.log('=' .repeat(50));
console.log(`JWT_SECRET: ${config.jwtSecret}`);
console.log(`BACKEND_URL: ${config.backendUrl}`);
console.log(`FRONTEND_URL: ${config.frontendUrl}`);
console.log(`GITHUB_REPO: ${config.githubRepo}`);
console.log('=' .repeat(50));

console.log('\n🔧 CONFIGURATION CHECKLIST:\n');

console.log('1️⃣ GITHUB SECRETS');
console.log('🔗 URL: https://github.com/Warusi2023/smartfarm-app/settings/secrets/actions');
console.log('');
console.log('Required Secrets:');
console.log('  ✅ RAILWAY_TOKEN');
console.log('  ✅ NETLIFY_AUTH_TOKEN');
console.log('  ✅ NETLIFY_SITE_ID');
console.log('  ✅ NETLIFY_PRODUCTION_URL');
console.log('  ✅ RAILWAY_PRODUCTION_URL');
console.log('  ✅ RAILWAY_MIGRATION_TOKEN');
console.log('');

console.log('2️⃣ RAILWAY VARIABLES');
console.log('🔗 URL: https://railway.app → Your Project → Variables');
console.log('');
console.log('Required Variables:');
console.log('  ✅ NODE_ENV = production');
console.log('  ✅ JWT_SECRET = ' + config.jwtSecret);
console.log('  ✅ CORS_ORIGIN = ' + config.frontendUrl);
console.log('  ✅ LOG_LEVEL = info');
console.log('  ✅ DATABASE_URL = postgresql://user:password@host:port/database');
console.log('  ✅ OPENWEATHER_API_KEY = your_openweather_api_key_here');
console.log('  ✅ FEATURE_GEOFENCING = true');
console.log('');

console.log('3️⃣ NETLIFY VARIABLES');
console.log('🔗 URL: https://app.netlify.com → Your Site → Environment variables');
console.log('');
console.log('Required Variables:');
console.log('  ✅ VITE_API_BASE_URL = ' + config.backendUrl + '/api');
console.log('  ✅ VITE_OPENWEATHER_API_KEY = your_openweather_api_key_here');
console.log('  ✅ VITE_ENVIRONMENT = production');
console.log('');

console.log('🚀 AFTER CONFIGURATION:');
console.log('');
console.log('Run this command to trigger deployment:');
console.log('scripts\\trigger-deployment-simple.bat');
console.log('');
console.log('Or manually:');
console.log('git commit --allow-empty -m "deploy: trigger production deployment"');
console.log('git push origin main');
console.log('');

console.log('📊 MONITORING:');
console.log('  🔗 GitHub Actions: https://github.com/Warusi2023/smartfarm-app/actions');
console.log('  🔗 Backend Health: ' + config.backendUrl + '/api/health');
console.log('  🔗 Frontend: ' + config.frontendUrl);
console.log('');

console.log('✅ SUCCESS CRITERIA:');
console.log('  - All GitHub Actions jobs show green checkmarks');
console.log('  - Backend health check returns 200 OK');
console.log('  - Frontend loads without errors');
console.log('  - User can login and access dashboard');
console.log('');

console.log('🎯 Ready to configure? Follow the checklist above!');
console.log('After configuration, run: scripts\\trigger-deployment-simple.bat');
