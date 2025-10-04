# Improved Fix Dependencies Script for SmartFarm
Write-Host "Fixing SmartFarm Dependencies (Improved Version)..." -ForegroundColor Green

# Function to safely remove directories
function Remove-SafeDirectory {
    param([string]$Path)
    if (Test-Path $Path) {
        Write-Host "Removing $Path..." -ForegroundColor Yellow
        try {
            Remove-Item -Recurse -Force $Path -ErrorAction Stop
            Write-Host "Removed $Path" -ForegroundColor Green
        } catch {
            try {
                $cmd = "rmdir /s /q `"$Path`""
                cmd /c $cmd
                Write-Host "Removed $Path (via CMD)" -ForegroundColor Green
            } catch {
                Write-Host "Could not remove $Path" -ForegroundColor Yellow
            }
        }
    } else {
        Write-Host "$Path does not exist" -ForegroundColor Gray
    }
}

# Function to safely remove files
function Remove-SafeFile {
    param([string]$Path)
    if (Test-Path $Path) {
        Write-Host "Removing $Path..." -ForegroundColor Yellow
        try {
            Remove-Item -Force $Path -ErrorAction Stop
            Write-Host "Removed $Path" -ForegroundColor Green
        } catch {
            Write-Host "Could not remove $Path" -ForegroundColor Yellow
        }
    } else {
        Write-Host "$Path does not exist" -ForegroundColor Gray
    }
}

# Clear npm cache
Write-Host "Clearing npm cache..." -ForegroundColor Yellow
npm cache clean --force

Write-Host "Cleaning directories..." -ForegroundColor Cyan
Remove-SafeDirectory "node_modules"
Remove-SafeFile "package-lock.json"
Remove-SafeDirectory "backend-api\node_modules"
Remove-SafeFile "backend-api\package-lock.json"
Remove-SafeDirectory "web-project\node_modules"
Remove-SafeFile "web-project\package-lock.json"

# Install root dependencies
Write-Host "Installing root dependencies..." -ForegroundColor Cyan
npm install --no-optional --legacy-peer-deps --force

# Install backend dependencies
Write-Host "Installing backend dependencies..." -ForegroundColor Cyan
Set-Location backend-api
npm install --no-optional --legacy-peer-deps --force
Set-Location ..

# Install frontend dependencies
Write-Host "Installing frontend dependencies..." -ForegroundColor Cyan
Set-Location web-project
npm install --no-optional --legacy-peer-deps --force
Set-Location ..

Write-Host "Dependency fix completed!" -ForegroundColor Green
