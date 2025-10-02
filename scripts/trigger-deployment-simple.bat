@echo off
echo 🚀 SmartFarm Deployment Trigger
echo ================================
echo.

echo 📋 Before proceeding, ensure you have configured:
echo   ✅ GitHub Secrets (6 secrets)
echo   ✅ Railway Variables (7 variables)
echo   ✅ Netlify Variables (3 variables)
echo.

set /p ready="Are you ready to trigger deployment? (y/n): "
if /i "%ready%" neq "y" (
    echo.
    echo ⚠️  Please configure secrets and variables first.
    echo 📋 Run: node scripts/simple-deploy.js for configuration guide
    pause
    exit /b
)

echo.
echo 🚀 Triggering deployment...
echo.

echo 📝 Creating deployment commit...
git commit --allow-empty -m "deploy: trigger production deployment"
if %errorlevel% neq 0 (
    echo ❌ Failed to create deployment commit
    pause
    exit /b
)

echo ✅ Deployment commit created
echo.

echo 🚀 Pushing to GitHub...
git push origin main
if %errorlevel% neq 0 (
    echo ❌ Failed to push to GitHub
    pause
    exit /b
)

echo ✅ Code pushed to GitHub
echo.

echo 🎉 Deployment triggered successfully!
echo.
echo 📋 Next Steps:
echo   1. Monitor: https://github.com/Warusi2023/smartfarm-app/actions
echo   2. Wait 5-10 minutes for deployment
echo   3. Check backend: https://smartfarm-app-production.up.railway.app/api/health
echo   4. Check frontend: https://dulcet-sawine-92d6a8.netlify.app
echo.

echo 🔍 To verify deployment:
echo   node scripts/verify-deployment.js
echo.

echo 🎯 Deployment in progress! Check GitHub Actions for status.
pause
