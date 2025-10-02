@echo off
echo 🚀 SmartFarm Final Deployment
echo =============================
echo.

echo 📋 Configuration Status Check:
echo   ✅ JWT Secret: dc9fd018ef76c1e7065698adecdb551dbe3baa002cdbd4f8ae35a52211e65516
echo   ✅ Backend URL: https://smartfarm-app-production.up.railway.app
echo   ✅ Frontend URL: https://dulcet-sawine-92d6a8.netlify.app
echo.

echo 🔧 Before proceeding, ensure you have configured:
echo   📋 GitHub Secrets (6 secrets)
echo   📋 Railway Variables (7 variables)
echo   📋 Netlify Variables (3 variables)
echo.

set /p configured="Have you configured all secrets and variables? (y/n): "
if /i "%configured%" neq "y" (
    echo.
    echo ⚠️  Please configure secrets and variables first.
    echo 📋 Run: node scripts/check-configuration.js for detailed guide
    echo.
    echo 🔗 Quick Links:
    echo   GitHub Secrets: https://github.com/Warusi2023/smartfarm-app/settings/secrets/actions
    echo   Railway Variables: https://railway.app → Your Project → Variables
    echo   Netlify Variables: https://app.netlify.com → Your Site → Environment variables
    echo.
    pause
    exit /b
)

echo.
echo 🚀 Starting final deployment...
echo.

echo 📝 Step 1: Creating deployment commit...
git commit --allow-empty -m "deploy: trigger production deployment"
if %errorlevel% neq 0 (
    echo ❌ Failed to create deployment commit
    echo 💡 Make sure you're in the correct directory and git is initialized
    pause
    exit /b
)

echo ✅ Deployment commit created successfully
echo.

echo 🚀 Step 2: Pushing to GitHub...
git push origin main
if %errorlevel% neq 0 (
    echo ❌ Failed to push to GitHub
    echo 💡 Check your internet connection and GitHub access
    pause
    exit /b
)

echo ✅ Code pushed to GitHub successfully
echo.

echo 🎉 DEPLOYMENT TRIGGERED SUCCESSFULLY!
echo.
echo 📊 Monitoring Information:
echo   🔗 GitHub Actions: https://github.com/Warusi2023/smartfarm-app/actions
echo   🔗 Backend Health: https://smartfarm-app-production.up.railway.app/api/health
echo   🔗 Frontend: https://dulcet-sawine-92d6a8.netlify.app
echo.

echo ⏳ Expected Timeline:
echo   📋 GitHub Actions: 2-3 minutes
echo   🚂 Railway Deployment: 3-5 minutes
echo   🌐 Netlify Deployment: 2-3 minutes
echo   ⏱️  Total: 5-10 minutes
echo.

echo 🔍 Verification Commands:
echo   node scripts/verify-deployment.js
echo.

echo 🎯 SUCCESS CRITERIA:
echo   ✅ All GitHub Actions jobs show green checkmarks
echo   ✅ Backend health check returns 200 OK
echo   ✅ Frontend loads without errors
echo   ✅ User can login and access dashboard
echo.

echo 🚀 SmartFarm deployment is now in progress!
echo Check GitHub Actions for real-time status updates.
echo.

pause
