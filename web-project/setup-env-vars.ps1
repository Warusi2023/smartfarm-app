# SmartFarm Web - Environment Variables Setup Script
# This script helps you set up environment variables for Railway and Netlify

Write-Host "🚀 SmartFarm Web - Environment Variables Setup" -ForegroundColor Green
Write-Host "=================================================" -ForegroundColor Green

Write-Host "`n📋 Environment Variables to Set:" -ForegroundColor Yellow
Write-Host "VITE_API_URL=https://smartfarm-app-production.up.railway.app/api" -ForegroundColor Cyan
Write-Host "APP_BUILD_TAG=railway (for Railway) or netlify (for Netlify)" -ForegroundColor Cyan
Write-Host "NODE_VERSION=18" -ForegroundColor Cyan

Write-Host "`n🔧 Railway Setup:" -ForegroundColor Yellow
Write-Host "1. Go to https://railway.app" -ForegroundColor White
Write-Host "2. Navigate to your SmartFarm web project" -ForegroundColor White
Write-Host "3. Go to Variables tab" -ForegroundColor White
Write-Host "4. Add the environment variables listed above" -ForegroundColor White
Write-Host "5. Redeploy your project" -ForegroundColor White

Write-Host "`n🌐 Netlify Setup:" -ForegroundColor Yellow
Write-Host "1. Go to https://netlify.com" -ForegroundColor White
Write-Host "2. Navigate to your SmartFarm site" -ForegroundColor White
Write-Host "3. Go to Site settings → Environment variables" -ForegroundColor White
Write-Host "4. Add the environment variables listed above" -ForegroundColor White
Write-Host "5. Go to Deployments → Trigger deploy" -ForegroundColor White

Write-Host "`n✅ Configuration Changes Made:" -ForegroundColor Green
Write-Host "- Updated netlify.toml to serve from public/ directory" -ForegroundColor White
Write-Host "- Updated railway.web.json to serve static files" -ForegroundColor White
Write-Host "- Created deployment setup guide" -ForegroundColor White

Write-Host "`n🎯 Next Steps:" -ForegroundColor Yellow
Write-Host "1. Set environment variables in both platforms" -ForegroundColor White
Write-Host "2. Redeploy both applications" -ForegroundColor White
Write-Host "3. Test your deployments" -ForegroundColor White
Write-Host "4. Your full SmartFarm application should now be visible!" -ForegroundColor White

Write-Host "`n📚 For detailed instructions, see DEPLOYMENT_SETUP_GUIDE.md" -ForegroundColor Cyan
