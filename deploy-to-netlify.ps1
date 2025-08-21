# Quick Netlify Deployment Script for SmartFarm
# This script builds and prepares your web app for Netlify deployment

Write-Host "🚀 SmartFarm Netlify Deployment Helper" -ForegroundColor Green
Write-Host "=====================================" -ForegroundColor Green

# Check if we're in the right directory
if (-not (Test-Path "web")) {
    Write-Host "❌ Error: 'web' directory not found. Please run this script from the SmartFarm root directory." -ForegroundColor Red
    exit 1
}

Write-Host "📁 Building web application..." -ForegroundColor Yellow
cd web

# Run the build script
if (Test-Path "build.ps1") {
    .\build.ps1
} else {
    Write-Host "❌ Build script not found. Creating build manually..." -ForegroundColor Yellow
    
    # Create dist directory
    $buildDir = "dist"
    if (Test-Path $buildDir) {
        Remove-Item $buildDir -Recurse -Force
    }
    New-Item -ItemType Directory -Path $buildDir | Out-Null
    
    # Copy files
    Copy-Item "src\main\resources\*" "dist\" -Recurse
    Write-Host "✅ Files copied to dist directory" -ForegroundColor Green
}

# Check if build was successful
if (Test-Path "dist\index.html") {
    Write-Host "✅ Build completed successfully!" -ForegroundColor Green
    Write-Host ""
    Write-Host "🌐 Next Steps for Netlify Deployment:" -ForegroundColor Cyan
    Write-Host "1. Go to https://netlify.com" -ForegroundColor White
    Write-Host "2. Sign up/Login with your GitHub account" -ForegroundColor White
    Write-Host "3. Click 'New site from Git'" -ForegroundColor White
    Write-Host "4. Choose GitHub → SmartFarm repository" -ForegroundColor White
    Write-Host "5. Set build settings:" -ForegroundColor White
    Write-Host "   - Build command: cd web && .\build.ps1" -ForegroundColor White
    Write-Host "   - Publish directory: web/dist" -ForegroundColor White
    Write-Host "6. Click 'Deploy site'" -ForegroundColor White
    Write-Host ""
    Write-Host "📁 Your build files are ready in: web/dist" -ForegroundColor Yellow
    Write-Host "🚀 Ready for deployment!" -ForegroundColor Green
} else {
    Write-Host "❌ Build failed. Please check the build script and try again." -ForegroundColor Red
}

cd ..
