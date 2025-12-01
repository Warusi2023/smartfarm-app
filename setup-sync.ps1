# Setup script for Web-to-Android synchronization
# Run this script once to set up the synchronization system

Write-Host "🚀 Setting up Web-to-Android Synchronization System" -ForegroundColor Cyan
Write-Host "==================================================" -ForegroundColor Cyan

# Check if shared config exists
if (-not (Test-Path "shared-api-config.json")) {
    Write-Host "❌ shared-api-config.json not found!" -ForegroundColor Red
    Write-Host "Please ensure shared-api-config.json exists in the root directory." -ForegroundColor Yellow
    exit 1
}

# Check if web-project exists
if (-not (Test-Path "web-project")) {
    Write-Host "❌ web-project directory not found!" -ForegroundColor Red
    exit 1
}

# Check if android-project exists
if (-not (Test-Path "android-project")) {
    Write-Host "❌ android-project directory not found!" -ForegroundColor Red
    exit 1
}

Write-Host "✓ Found shared-api-config.json" -ForegroundColor Green
Write-Host "✓ Found web-project directory" -ForegroundColor Green
Write-Host "✓ Found android-project directory" -ForegroundColor Green

# Generate initial API code
Write-Host "`n📝 Generating API code from shared configuration..." -ForegroundColor Cyan
& ".\generate-api-code.ps1"

# Perform initial sync
Write-Host "`n🔄 Performing initial synchronization..." -ForegroundColor Cyan
& ".\sync-web-to-android.ps1" -Force

Write-Host "`n✅ Setup complete!" -ForegroundColor Green
Write-Host "`n📚 Next steps:" -ForegroundColor Yellow
Write-Host "1. Review WEB_ANDROID_SYNC_GUIDE.md for usage instructions" -ForegroundColor White
Write-Host "2. Use '.\sync-web-to-android.ps1 -Watch' for automatic syncing" -ForegroundColor White
Write-Host "3. Update shared-api-config.json when making API changes" -ForegroundColor White
Write-Host "4. Run '.\generate-api-code.ps1' after updating shared config" -ForegroundColor White

