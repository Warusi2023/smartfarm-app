@echo off
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
echo Next: Run scripts\trigger-deployment.bat
pause
