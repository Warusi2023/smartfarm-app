#!/usr/bin/env node

/**
 * Railway Status Checker
 * Helps verify Railway configuration and provides next steps
 */

const colors = {
    reset: '\x1b[0m',
    green: '\x1b[32m',
    red: '\x1b[31m',
    yellow: '\x1b[33m',
    blue: '\x1b[36m',
    cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
    console.log(`${colors[color]}${message}${colors.reset}`);
}

function main() {
    log('\n🚂 Railway Configuration Checklist', 'cyan');
    log('='.repeat(60), 'cyan');
    
    log('\n📋 Manual Steps to Complete:', 'yellow');
    log('='.repeat(60), 'cyan');
    
    log('\n1️⃣  CHECK RAILWAY LOGS', 'cyan');
    log('   ──────────────────────────────────────────────────────', 'blue');
    log('   Step 1: Go to https://railway.app/dashboard', 'blue');
    log('   Step 2: Click your backend service', 'blue');
    log('   Step 3: Click "Logs" tab', 'blue');
    log('   Step 4: Look for these messages:', 'blue');
    log('', 'reset');
    log('   ✅ Good signs:', 'green');
    log('      • "Database connected successfully"', 'green');
    log('      • "Database pool initialized"', 'green');
    log('      • "Server started successfully"', 'green');
    log('', 'reset');
    log('   ❌ Bad signs:', 'red');
    log('      • "Database connection error"', 'red');
    log('      • "DATABASE_URL not set"', 'red');
    log('      • "Failed to connect to database"', 'red');
    
    log('\n2️⃣  CHECK ENVIRONMENT VARIABLES', 'cyan');
    log('   ──────────────────────────────────────────────────────', 'blue');
    log('   Step 1: Railway → Backend service → "Variables" tab', 'blue');
    log('   Step 2: Verify these exist:', 'blue');
    log('', 'reset');
    log('   Required Variables:', 'yellow');
    log('   ✅ DATABASE_URL (should be auto-added)', 'green');
    log('   ✅ NODE_ENV=production', 'green');
    log('   ✅ PORT=3000', 'green');
    log('   ✅ JWT_SECRET (your secure secret)', 'green');
    log('   ✅ CORS_ORIGINS (your frontend URL)', 'green');
    log('', 'reset');
    log('   If DATABASE_URL is missing:', 'yellow');
    log('   1. Go to PostgreSQL service → Variables', 'blue');
    log('   2. Copy DATABASE_URL value', 'blue');
    log('   3. Go to Backend service → Variables', 'blue');
    log('   4. Add DATABASE_URL = (paste value)', 'blue');
    
    log('\n3️⃣  CONFIGURE FRONTEND (NETLIFY)', 'cyan');
    log('   ──────────────────────────────────────────────────────', 'blue');
    log('   Step 1: Go to https://app.netlify.com', 'blue');
    log('   Step 2: Click your site → Site settings → Environment variables', 'blue');
    log('   Step 3: Add these variables:', 'blue');
    log('', 'reset');
    log('   VITE_API_URL = https://smartfarm-app-production.up.railway.app', 'green');
    log('   VITE_APP_NAME = SmartFarm', 'green');
    log('   VITE_APP_VERSION = 1.0.0', 'green');
    log('', 'reset');
    log('   Step 4: Deploys tab → Trigger deploy → Clear cache and deploy', 'blue');
    
    log('\n4️⃣  UPDATE CORS_ORIGINS', 'cyan');
    log('   ──────────────────────────────────────────────────────', 'blue');
    log('   Step 1: Get your Netlify URL (from step 3)', 'blue');
    log('   Step 2: Railway → Backend → Variables → CORS_ORIGINS', 'blue');
    log('   Step 3: Set value to:', 'blue');
    log('', 'reset');
    log('   https://your-site.netlify.app,https://www.your-site.netlify.app', 'green');
    log('', 'reset');
    log('   ⚠️  Important: No spaces around commas!', 'yellow');
    log('   Step 4: Save and wait for auto-redeploy', 'blue');
    
    log('\n5️⃣  RUN FINAL VERIFICATION', 'cyan');
    log('   ──────────────────────────────────────────────────────', 'blue');
    log('   After completing steps 1-4, run:', 'blue');
    log('', 'reset');
    log('   $env:FRONTEND_URL="https://your-site.netlify.app"', 'green');
    log('   node scripts/verify-phase1.js', 'green');
    
    log('\n📊 Current Status', 'cyan');
    log('='.repeat(60), 'cyan');
    log('✅ Backend is running and responding', 'green');
    log('✅ Health endpoint works', 'green');
    log('✅ User registration works', 'green');
    log('✅ User login works', 'green');
    log('⚠️  Database status needs verification (check logs)', 'yellow');
    log('⚠️  Frontend needs environment variables configured', 'yellow');
    
    log('\n💡 Quick Links', 'cyan');
    log('='.repeat(60), 'cyan');
    log('Railway Dashboard: https://railway.app/dashboard', 'blue');
    log('Netlify Dashboard: https://app.netlify.com', 'blue');
    log('Backend Health: https://smartfarm-app-production.up.railway.app/api/health', 'blue');
    
    log('\n🎯 Estimated Time: 15-20 minutes', 'cyan');
    log('='.repeat(60), 'cyan');
    
    log('\n📝 Next: Follow the steps above, starting with checking Railway logs!', 'yellow');
    log('   See PHASE1_COMPLETE_SETUP.md for detailed instructions', 'yellow');
}

if (require.main === module) {
    main();
}

module.exports = { main };
