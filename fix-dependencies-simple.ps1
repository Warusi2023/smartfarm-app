# Simple Dependency Fix Script for SmartFarm
Write-Host "🔧 Fixing SmartFarm Dependencies (Simple Version)..." -ForegroundColor Green

# Clear npm cache
Write-Host "🧹 Clearing npm cache..." -ForegroundColor Yellow
npm cache clean --force

# Remove problematic directories using cmd
Write-Host "📁 Cleaning directories..." -ForegroundColor Cyan

# Use cmd to remove directories (more reliable on Windows)
$directories = @(
    "node_modules",
    "backend-api\node_modules", 
    "web-project\node_modules"
)

$files = @(
    "package-lock.json",
    "backend-api\package-lock.json",
    "web-project\package-lock.json"
)

foreach ($dir in $directories) {
    if (Test-Path $dir) {
        Write-Host "Removing $dir..." -ForegroundColor Yellow
        cmd /c "rmdir /s /q `"$dir`""
        Write-Host "✅ Removed $dir" -ForegroundColor Green
    }
}

foreach ($file in $files) {
    if (Test-Path $file) {
        Write-Host "Removing $file..." -ForegroundColor Yellow
        cmd /c "del /f /q `"$file`""
        Write-Host "✅ Removed $file" -ForegroundColor Green
    }
}

# Install dependencies with simple approach
Write-Host "`n📦 Installing dependencies..." -ForegroundColor Cyan

# Root dependencies
Write-Host "Installing root dependencies..." -ForegroundColor Yellow
npm install --no-optional --legacy-peer-deps --force

# Backend dependencies
Write-Host "Installing backend dependencies..." -ForegroundColor Yellow
Set-Location backend-api
npm install --no-optional --legacy-peer-deps --force
Set-Location ..

# Frontend dependencies
Write-Host "Installing frontend dependencies..." -ForegroundColor Yellow
Set-Location web-project
npm install --no-optional --legacy-peer-deps --force
Set-Location ..

Write-Host "`n✅ Dependency fix completed!" -ForegroundColor Green
