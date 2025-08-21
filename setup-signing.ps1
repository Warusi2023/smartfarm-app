# SmartFarm Signing Configuration Setup Script
# This script helps you set up secure app signing

Write-Host "🔐 SmartFarm Signing Configuration Setup" -ForegroundColor Green
Write-Host "==========================================" -ForegroundColor Green
Write-Host ""

# Check current status
$localPropertiesPath = "app\local.properties"
$keystorePath = "..\smartfarm-upload-key.jks"

Write-Host "📋 Current Status:" -ForegroundColor Yellow
Write-Host "==================" -ForegroundColor Yellow

# Check local.properties
if (Test-Path $localPropertiesPath) {
    $content = Get-Content $localPropertiesPath -Raw
    $hasPasswords = $content -match "YOUR_.*_PASSWORD_HERE"
    
    if ($hasPasswords) {
        Write-Host "❌ Placeholder passwords found - needs configuration" -ForegroundColor Red
    } else {
        Write-Host "✅ Passwords configured" -ForegroundColor Green
    }
} else {
    Write-Host "❌ local.properties not found" -ForegroundColor Red
}

# Check keystore
if (Test-Path $keystorePath) {
    Write-Host "✅ Keystore file exists" -ForegroundColor Green
} else {
    Write-Host "❌ Keystore file not found" -ForegroundColor Red
}

Write-Host ""
Write-Host "🔧 Setup Options:" -ForegroundColor Yellow
Write-Host "1. Generate keystore: .\generate-keystore.ps1" -ForegroundColor Blue
Write-Host "2. Update local.properties with real passwords" -ForegroundColor Blue
Write-Host "3. Test build: ./gradlew assembleRelease" -ForegroundColor Blue
Write-Host ""
Write-Host "📚 See APP_SIGNING_SETUP.md for detailed instructions" -ForegroundColor Cyan
