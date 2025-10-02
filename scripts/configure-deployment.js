#!/usr/bin/env node

/**
 * SmartFarm Deployment Configuration Script
 * Helps configure GitHub Secrets, Railway Variables, and Netlify Variables
 */

const fs = require('fs');
const https = require('https');

console.log('🔧 SmartFarm Deployment Configuration Assistant\n');

// Configuration data
const config = {
  github: {
    repo: 'Warusi2023/smartfarm-app',
    secretsUrl: 'https://github.com/Warusi2023/smartfarm-app/settings/secrets/actions',
    requiredSecrets: [
      'RAILWAY_TOKEN',
      'NETLIFY_AUTH_TOKEN', 
      'NETLIFY_SITE_ID',
      'NETLIFY_SITE_ID_STAGING',
      'NETLIFY_PRODUCTION_URL',
      'RAILWAY_PRODUCTION_URL',
      'RAILWAY_MIGRATION_TOKEN'
    ]
  },
  railway: {
    projectUrl: 'https://railway.app',
    requiredVariables: [
      'NODE_ENV',
      'JWT_SECRET',
      'CORS_ORIGIN',
      'LOG_LEVEL',
      'DATABASE_URL',
      'OPENWEATHER_API_KEY',
      'FEATURE_GEOFENCING'
    ]
  },
  netlify: {
    siteUrl: 'https://app.netlify.com',
    requiredVariables: [
      'VITE_API_BASE_URL',
      'VITE_OPENWEATHER_API_KEY',
      'VITE_ENVIRONMENT'
    ]
  }
};

// Generate configuration values
const jwtSecret = 'e3b65bed85523fbb9a2ae082a7e29491e8f7862df3431efc1851661d4aaad6b1';
const productionUrls = {
  backend: 'https://smartfarm-app-production.up.railway.app',
  frontend: 'https://dulcet-sawine-92d6a8.netlify.app'
};

console.log('📋 Configuration Summary:\n');

// GitHub Secrets Configuration
console.log('🔑 GitHub Secrets Configuration');
console.log('📍 URL: https://github.com/Warusi2023/smartfarm-app/settings/secrets/actions\n');

const githubSecrets = {
  'RAILWAY_TOKEN': 'Get from Railway → Account Settings → Tokens → Create new token',
  'NETLIFY_AUTH_TOKEN': 'Get from Netlify → User Settings → Applications → Personal access tokens',
  'NETLIFY_SITE_ID': 'Get from Netlify → Site Settings → General → Site information → Site ID',
  'NETLIFY_SITE_ID_STAGING': 'Create staging site in Netlify and get Site ID',
  'NETLIFY_PRODUCTION_URL': productionUrls.frontend,
  'RAILWAY_PRODUCTION_URL': productionUrls.backend,
  'RAILWAY_MIGRATION_TOKEN': jwtSecret
};

Object.entries(githubSecrets).forEach(([key, value]) => {
  console.log(`   ${key}: ${value}`);
});

// Railway Variables Configuration
console.log('\n🚂 Railway Variables Configuration');
console.log('📍 URL: https://railway.app → Your Project → Variables\n');

const railwayVariables = {
  'NODE_ENV': 'production',
  'JWT_SECRET': jwtSecret,
  'CORS_ORIGIN': productionUrls.frontend,
  'LOG_LEVEL': 'info',
  'DATABASE_URL': 'postgresql://user:password@host:port/database',
  'OPENWEATHER_API_KEY': 'your_openweather_api_key_here',
  'FEATURE_GEOFENCING': 'true'
};

Object.entries(railwayVariables).forEach(([key, value]) => {
  console.log(`   ${key} = ${value}`);
});

// Netlify Variables Configuration
console.log('\n🌐 Netlify Variables Configuration');
console.log('📍 URL: https://app.netlify.com → Your Site → Environment variables\n');

const netlifyVariables = {
  'VITE_API_BASE_URL': `${productionUrls.backend}/api`,
  'VITE_OPENWEATHER_API_KEY': 'your_openweather_api_key_here',
  'VITE_ENVIRONMENT': 'production'
};

Object.entries(netlifyVariables).forEach(([key, value]) => {
  console.log(`   ${key} = ${value}`);
});

// Create step-by-step configuration guide
const configurationGuide = `# 🔧 SmartFarm Deployment Configuration Guide

## Step 1: Configure GitHub Secrets

### Navigate to GitHub Secrets
🔗 **URL**: https://github.com/Warusi2023/smartfarm-app/settings/secrets/actions

### Required Secrets:
${Object.entries(githubSecrets).map(([key, value]) => `- **${key}**: ${value}`).join('\n')}

### How to Add Secrets:
1. Click "New repository secret"
2. Enter the secret name (exactly as shown above)
3. Enter the secret value
4. Click "Add secret"
5. Repeat for all secrets

---

## Step 2: Configure Railway Variables

### Navigate to Railway Variables
🔗 **URL**: https://railway.app → Your Project → Variables

### Required Variables:
${Object.entries(railwayVariables).map(([key, value]) => `- **${key}** = \`${value}\``).join('\n')}

### How to Add Variables:
1. Go to your Railway project
2. Click on "Variables" tab
3. Click "New Variable"
4. Enter the variable name and value
5. Click "Add"
6. Repeat for all variables

---

## Step 3: Configure Netlify Variables

### Navigate to Netlify Variables
🔗 **URL**: https://app.netlify.com → Your Site → Environment variables

### Required Variables:
${Object.entries(netlifyVariables).map(([key, value]) => `- **${key}** = \`${value}\``).join('\n')}

### How to Add Variables:
1. Go to your Netlify site
2. Click "Site settings"
3. Click "Environment variables"
4. Click "Add a variable"
5. Enter the variable name and value
6. Click "Save"
7. Repeat for all variables

---

## Step 4: Trigger Deployment

After configuring all secrets and variables:

\`\`\`bash
# Option 1: Use automated script
scripts\\trigger-deployment.bat

# Option 2: Manual deployment
git commit --allow-empty -m "deploy: trigger production deployment"
git push origin main
\`\`\`

---

## Step 5: Monitor Deployment

🔗 **GitHub Actions**: https://github.com/Warusi2023/smartfarm-app/actions

### What to Look For:
- All jobs should show green checkmarks ✅
- No red X marks ❌
- Deployment should complete within 5-10 minutes

---

## Step 6: Verify Deployment

### Backend Health Check:
🔗 **URL**: ${productionUrls.backend}/api/health

**Expected Response:**
\`\`\`json
{
  "status": "OK",
  "environment": "production",
  "database": "connected"
}
\`\`\`

### Frontend Access:
🔗 **URL**: ${productionUrls.frontend}

**Expected Result:**
- Page loads without errors
- SmartFarm logo displays
- Login form is visible

---

## Troubleshooting

### If GitHub Actions Fail:
1. Check the logs in the Actions tab
2. Verify all secrets are configured correctly
3. Ensure secret names match exactly (case-sensitive)

### If Backend Health Check Fails:
1. Check Railway deployment logs
2. Verify all Railway variables are set
3. Ensure DATABASE_URL is correct

### If Frontend Doesn't Load:
1. Check Netlify deployment logs
2. Verify all Netlify variables are set
3. Ensure VITE_API_BASE_URL points to correct backend

---

## Success Criteria

✅ All GitHub Actions jobs pass
✅ Backend health check returns 200 OK
✅ Frontend loads without errors
✅ User can register and login
✅ Dashboard displays correctly
✅ API calls work without CORS errors

---

**Generated**: ${new Date().toISOString()}
`;

fs.writeFileSync('DEPLOYMENT_CONFIGURATION_GUIDE.md', configurationGuide);

console.log('\n📝 Configuration guide created: DEPLOYMENT_CONFIGURATION_GUIDE.md');

// Create quick configuration script
const quickConfigScript = `@echo off
REM SmartFarm Quick Configuration Script

echo 🔧 SmartFarm Deployment Configuration
echo.

echo 📋 Step 1: Configure GitHub Secrets
echo 🔗 Open: https://github.com/Warusi2023/smartfarm-app/settings/secrets/actions
echo.
echo Required Secrets:
echo   RAILWAY_TOKEN
echo   NETLIFY_AUTH_TOKEN
echo   NETLIFY_SITE_ID
echo   NETLIFY_SITE_ID_STAGING
echo   NETLIFY_PRODUCTION_URL
echo   RAILWAY_PRODUCTION_URL
echo   RAILWAY_MIGRATION_TOKEN
echo.
pause

echo 📋 Step 2: Configure Railway Variables
echo 🔗 Open: https://railway.app → Your Project → Variables
echo.
echo Required Variables:
echo   NODE_ENV = production
echo   JWT_SECRET = e3b65bed85523fbb9a2ae082a7e29491e8f7862df3431efc1851661d4aaad6b1
echo   CORS_ORIGIN = https://dulcet-sawine-92d6a8.netlify.app
echo   LOG_LEVEL = info
echo   DATABASE_URL = postgresql://user:password@host:port/database
echo   OPENWEATHER_API_KEY = your_openweather_api_key_here
echo   FEATURE_GEOFENCING = true
echo.
pause

echo 📋 Step 3: Configure Netlify Variables
echo 🔗 Open: https://app.netlify.com → Your Site → Environment variables
echo.
echo Required Variables:
echo   VITE_API_BASE_URL = https://smartfarm-app-production.up.railway.app/api
echo   VITE_OPENWEATHER_API_KEY = your_openweather_api_key_here
echo   VITE_ENVIRONMENT = production
echo.
pause

echo 🚀 Configuration complete! Ready to deploy.
echo.
echo Next: Run scripts\\trigger-deployment.bat
pause
`;

fs.writeFileSync('scripts/configure-deployment.bat', quickConfigScript);

console.log('📝 Quick configuration script created: scripts/configure-deployment.bat');

console.log('\n🎯 Next Steps:');
console.log('1. Run: scripts\\configure-deployment.bat');
console.log('2. Follow the step-by-step configuration');
console.log('3. Run: scripts\\trigger-deployment.bat');
console.log('4. Monitor: https://github.com/Warusi2023/smartfarm-app/actions');
console.log('5. Verify: node scripts/verify-deployment.js');

console.log('\n✨ Configuration assistant complete!');
