#!/usr/bin/env node

/**
 * SmartFarm Deployment Setup Script
 * Helps configure environment variables and secrets for production deployment
 */

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

console.log('🚀 SmartFarm Deployment Setup\n');

// Generate JWT Secret
const jwtSecret = crypto.randomBytes(32).toString('hex');
console.log('📝 Generated JWT Secret:');
console.log(`JWT_SECRET=${jwtSecret}\n`);

// Generate API Key placeholder
const apiKey = crypto.randomBytes(16).toString('hex');
console.log('📝 Generated API Key placeholder:');
console.log(`API_KEY=${apiKey}\n`);

// Create environment configuration
const backendEnv = `# SmartFarm Backend Production Environment Variables
# Copy these to Railway Variables

NODE_ENV=production
PORT=3000
JWT_SECRET=${jwtSecret}
CORS_ORIGIN=https://dulcet-sawine-92d6a8.netlify.app
LOG_LEVEL=info
DATABASE_URL=postgresql://user:password@host:port/database
OPENWEATHER_API_KEY=your_openweather_api_key_here
FEATURE_GEOFENCING=true
HELMET_ENABLED=true
TRUST_PROXY=true
API_RATE_LIMIT=100
API_RATE_WINDOW=15
`;

const frontendEnv = `# SmartFarm Frontend Production Environment Variables
# Copy these to Netlify Environment Variables

VITE_API_BASE_URL=https://smartfarm-app-production.up.railway.app/api
VITE_OPENWEATHER_API_KEY=your_openweather_api_key_here
VITE_APP_NAME=SmartFarm
VITE_APP_VERSION=1.0.0
VITE_ENVIRONMENT=production
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_DEBUG=false
VITE_ENABLE_SERVICE_WORKER=true
VITE_LAZY_LOADING=true
VITE_IMAGE_OPTIMIZATION=true
VITE_CACHE_STRATEGY=stale-while-revalidate
VITE_CSP_ENABLED=true
VITE_XSS_PROTECTION=true
VITE_ERROR_REPORTING=true
VITE_PERFORMANCE_MONITORING=true
`;

// Write environment files
fs.writeFileSync('backend-production.env', backendEnv);
fs.writeFileSync('frontend-production.env', frontendEnv);

console.log('✅ Environment files created:');
console.log('   - backend-production.env');
console.log('   - frontend-production.env\n');

// Create GitHub Secrets template
const secretsTemplate = `# GitHub Secrets Configuration
# Add these secrets to: https://github.com/Warusi2023/smartfarm-app/settings/secrets/actions

RAILWAY_TOKEN=your_railway_token_here
NETLIFY_AUTH_TOKEN=your_netlify_auth_token_here
NETLIFY_SITE_ID=your_netlify_site_id_here
NETLIFY_SITE_ID_STAGING=your_netlify_staging_site_id_here
NETLIFY_PRODUCTION_URL=https://dulcet-sawine-92d6a8.netlify.app
RAILWAY_PRODUCTION_URL=https://smartfarm-app-production.up.railway.app
RAILWAY_MIGRATION_TOKEN=${jwtSecret}
SLACK_WEBHOOK=your_slack_webhook_url_here
SNYK_TOKEN=your_snyk_token_here
`;

fs.writeFileSync('github-secrets.txt', secretsTemplate);

console.log('✅ GitHub secrets template created:');
console.log('   - github-secrets.txt\n');

// Create deployment checklist
const checklist = `# Deployment Checklist - Generated ${new Date().toISOString()}

## ✅ Pre-Deployment Setup

### 1. GitHub Secrets (Required)
- [ ] RAILWAY_TOKEN - Get from Railway Account Settings → Tokens
- [ ] NETLIFY_AUTH_TOKEN - Get from Netlify User Settings → Applications
- [ ] NETLIFY_SITE_ID - Get from Netlify Site Settings → General
- [ ] NETLIFY_SITE_ID_STAGING - Create staging site in Netlify
- [ ] NETLIFY_PRODUCTION_URL - Your Netlify production URL
- [ ] RAILWAY_PRODUCTION_URL - Your Railway production URL
- [ ] RAILWAY_MIGRATION_TOKEN - Use: ${jwtSecret}

### 2. Railway Variables (Required)
- [ ] NODE_ENV=production
- [ ] JWT_SECRET=${jwtSecret}
- [ ] CORS_ORIGIN=https://dulcet-sawine-92d6a8.netlify.app
- [ ] LOG_LEVEL=info
- [ ] DATABASE_URL=postgresql://user:password@host:port/database
- [ ] OPENWEATHER_API_KEY=your_openweather_api_key_here
- [ ] FEATURE_GEOFENCING=true

### 3. Netlify Variables (Required)
- [ ] VITE_API_BASE_URL=https://smartfarm-app-production.up.railway.app/api
- [ ] VITE_OPENWEATHER_API_KEY=your_openweather_api_key_here
- [ ] VITE_ENVIRONMENT=production

## 🚀 Deployment Steps

### 4. Trigger Deployment
\`\`\`bash
git commit --allow-empty -m "deploy: trigger production deployment"
git push origin main
\`\`\`

### 5. Monitor GitHub Actions
- [ ] Check: https://github.com/Warusi2023/smartfarm-app/actions
- [ ] Wait for all jobs to complete successfully
- [ ] Fix any failed jobs

### 6. Verify Deployment
- [ ] Backend health: https://smartfarm-app-production.up.railway.app/api/health
- [ ] Frontend: https://dulcet-sawine-92d6a8.netlify.app
- [ ] Test login and dashboard functionality

## 🎯 Success Criteria
- [ ] All GitHub Actions jobs pass
- [ ] Backend health check returns 200 OK
- [ ] Frontend loads without errors
- [ ] Login functionality works
- [ ] Dashboard displays correctly
- [ ] API calls succeed without CORS errors

Generated on: ${new Date().toISOString()}
`;

fs.writeFileSync('deployment-checklist-generated.md', checklist);

console.log('✅ Deployment checklist created:');
console.log('   - deployment-checklist-generated.md\n');

console.log('📋 Next Steps:');
console.log('1. Configure GitHub Secrets using github-secrets.txt');
console.log('2. Configure Railway Variables using backend-production.env');
console.log('3. Configure Netlify Variables using frontend-production.env');
console.log('4. Run: git commit --allow-empty -m "deploy: trigger production deployment"');
console.log('5. Run: git push origin main');
console.log('6. Monitor GitHub Actions for successful deployment\n');

console.log('🔗 Important URLs:');
console.log('   GitHub Secrets: https://github.com/Warusi2023/smartfarm-app/settings/secrets/actions');
console.log('   Railway Variables: https://railway.app → Your Project → Variables');
console.log('   Netlify Variables: https://app.netlify.com → Your Site → Environment variables');
console.log('   GitHub Actions: https://github.com/Warusi2023/smartfarm-app/actions\n');

console.log('✨ Setup complete! Follow the deployment checklist to deploy to production.');
