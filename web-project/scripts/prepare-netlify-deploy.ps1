# SmartFarm Netlify Deployment Preparation Script
# This script provides step-by-step instructions for Netlify deployment

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "SmartFarm Netlify Deployment Preparation" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Verify build works
Write-Host "Verifying local build..." -ForegroundColor Yellow
$distPath = Join-Path $PSScriptRoot "..\dist"
if (Test-Path $distPath) {
    $fileCount = (Get-ChildItem -Path $distPath -Recurse -File).Count
    Write-Host "  [OK] dist/ folder exists with $fileCount files" -ForegroundColor Green
} else {
    Write-Host "  [WARN] dist/ folder not found. Run 'npm run build' first." -ForegroundColor Yellow
}

Write-Host ""

# Display deployment instructions
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Netlify Deployment Instructions" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "1. Go to Netlify Dashboard: https://app.netlify.com" -ForegroundColor White
Write-Host ""

Write-Host "2. Add New Site -> Import an existing project" -ForegroundColor White
Write-Host ""

Write-Host "3. Connect GitHub repository: smartfarm-app" -ForegroundColor White
Write-Host ""

Write-Host "4. Configure Build Settings (IMPORTANT):" -ForegroundColor Yellow
Write-Host "   Base directory: web-project" -ForegroundColor Cyan
Write-Host "   Build command: npm install && npm run build" -ForegroundColor Cyan
Write-Host "   Publish directory: web-project/dist" -ForegroundColor Cyan
Write-Host ""

Write-Host "5. Set Environment Variables (BEFORE deploying):" -ForegroundColor Yellow
Write-Host "   VITE_API_BASE_URL=https://smartfarm-app-production.up.railway.app" -ForegroundColor Green
Write-Host "   VITE_API_URL=https://smartfarm-app-production.up.railway.app" -ForegroundColor Green
Write-Host "   VITE_APP_NAME=SmartFarm" -ForegroundColor Green
Write-Host "   VITE_APP_VERSION=1.0.0" -ForegroundColor Green
Write-Host "   NODE_ENV=production" -ForegroundColor Green
Write-Host ""

Write-Host "6. Click 'Deploy site'" -ForegroundColor White
Write-Host ""

Write-Host "7. After deployment, verify:" -ForegroundColor Yellow
Write-Host "   .\scripts\verify-production.ps1 -ProductionUrl `"https://your-site.netlify.app`"" -ForegroundColor Cyan
Write-Host ""

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Quick Reference" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Base directory:     web-project" -ForegroundColor White
Write-Host "Build command:       npm install && npm run build" -ForegroundColor White
Write-Host "Publish directory:   web-project/dist" -ForegroundColor White
Write-Host "Node version:        18 or 20" -ForegroundColor White
Write-Host ""

Write-Host "For detailed instructions, see:" -ForegroundColor Yellow
Write-Host "  - DEPLOY_NOW.md" -ForegroundColor Cyan
Write-Host "  - PRODUCTION_QUICK_START.md" -ForegroundColor Cyan
Write-Host ""
