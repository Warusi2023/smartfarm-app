# Fix Dependencies Script for SmartFarm
Write-Host "🔧 Fixing SmartFarm Dependencies..." -ForegroundColor Green

# Function to safely remove directories
function Remove-SafeDirectory {
    param([string]$Path)
    if (Test-Path $Path) {
        Write-Host "Removing $Path..." -ForegroundColor Yellow
        try {
            Remove-Item -Recurse -Force $Path -ErrorAction Stop
            Write-Host "✅ Removed $Path" -ForegroundColor Green
        } catch {
            Write-Host "⚠️ Could not remove $Path`: $($_.Exception.Message)" -ForegroundColor Yellow
        }
    }
}

# Function to safely remove files
function Remove-SafeFile {
    param([string]$Path)
    if (Test-Path $Path) {
        Write-Host "Removing $Path..." -ForegroundColor Yellow
        try {
            Remove-Item -Force $Path -ErrorAction Stop
            Write-Host "✅ Removed $Path" -ForegroundColor Green
        } catch {
            Write-Host "⚠️ Could not remove $Path`: $($_.Exception.Message)" -ForegroundColor Yellow
        }
    }
}

Write-Host "`n📁 Cleaning root directory..." -ForegroundColor Cyan
Remove-SafeDirectory "node_modules"
Remove-SafeFile "package-lock.json"

Write-Host "`n📁 Cleaning backend-api directory..." -ForegroundColor Cyan
Remove-SafeDirectory "backend-api\node_modules"
Remove-SafeFile "backend-api\package-lock.json"

Write-Host "`n📁 Cleaning web-project directory..." -ForegroundColor Cyan
Remove-SafeDirectory "web-project\node_modules"
Remove-SafeFile "web-project\package-lock.json"

Write-Host "`n🔄 Installing root dependencies..." -ForegroundColor Cyan
try {
    npm install --no-optional --legacy-peer-deps
    Write-Host "✅ Root dependencies installed" -ForegroundColor Green
} catch {
    Write-Host "❌ Failed to install root dependencies: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "`n🔄 Installing backend dependencies..." -ForegroundColor Cyan
try {
    Set-Location backend-api
    npm install --no-optional --legacy-peer-deps
    Write-Host "✅ Backend dependencies installed" -ForegroundColor Green
    Set-Location ..
} catch {
    Write-Host "❌ Failed to install backend dependencies: $($_.Exception.Message)" -ForegroundColor Red
    Set-Location ..
}

Write-Host "`n🔄 Installing frontend dependencies..." -ForegroundColor Cyan
try {
    Set-Location web-project
    npm install --no-optional --legacy-peer-deps
    Write-Host "✅ Frontend dependencies installed" -ForegroundColor Green
    Set-Location ..
} catch {
    Write-Host "❌ Failed to install frontend dependencies: $($_.Exception.Message)" -ForegroundColor Red
    Set-Location ..
}

Write-Host "`n🧪 Testing deployment diagnostics..." -ForegroundColor Cyan
try {
    node scripts/deploy-diagnostics.mjs
    Write-Host "✅ Diagnostics completed successfully" -ForegroundColor Green
} catch {
    Write-Host "❌ Diagnostics failed: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "`n🎉 Dependency fix completed!" -ForegroundColor Green
