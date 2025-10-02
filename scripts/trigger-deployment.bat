@echo off
REM SmartFarm Deployment Trigger Script

echo 🚀 Triggering SmartFarm Production Deployment

echo 📝 Creating deployment commit...
git commit --allow-empty -m "deploy: trigger production deployment"

echo 🚀 Pushing to main branch...
git push origin main

echo ✅ Deployment triggered!
echo 📋 Monitor progress at: https://github.com/Warusi2023/smartfarm-app/actions
echo 🔍 Verify deployment with: node scripts/verify-deployment.js

pause
