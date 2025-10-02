@echo off
REM SmartFarm Quick Deployment Script

echo 🚀 SmartFarm Quick Deployment
echo ================================
echo.

echo 📋 Step 1: Configuration Check
echo.
echo Before proceeding, ensure you have configured:
echo   ✅ GitHub Secrets
echo   ✅ Railway Variables  
echo   ✅ Netlify Variables
echo.
echo If not configured, run: scripts\configure-deployment.bat
echo.
pause

echo 📋 Step 2: Triggering Deployment
echo.
echo This will:
echo   1. Create a deployment commit
echo   2. Push to GitHub
echo   3. Trigger GitHub Actions
echo   4. Deploy to Railway and Netlify
echo.
set /p confirm="Continue with deployment? (y/n): "
if /i "%confirm%" neq "y" (
    echo Deployment cancelled.
    pause
    exit /b
)

echo.
echo 🚀 Starting deployment...
echo.

REM Trigger deployment
git commit --allow-empty -m "deploy: trigger production deployment"
if %errorlevel% neq 0 (
    echo ❌ Failed to create deployment commit
    pause
    exit /b
)

git push origin main
if %errorlevel% neq 0 (
    echo ❌ Failed to push to GitHub
    pause
    exit /b
)

echo.
echo ✅ Deployment triggered successfully!
echo.
echo 📋 Next Steps:
echo   1. Monitor: https://github.com/Warusi2023/smartfarm-app/actions
echo   2. Wait 5-10 minutes for deployment to complete
echo   3. Verify: node scripts/verify-deployment.js
echo.
echo 🔗 Important URLs:
echo   Backend: https://smartfarm-app-production.up.railway.app/api/health
echo   Frontend: https://dulcet-sawine-92d6a8.netlify.app
echo.

echo 🎉 Deployment process started!
echo Check GitHub Actions for progress.
pause
