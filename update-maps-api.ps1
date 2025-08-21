# SmartFarm Google Maps API Key Updater
Write-Host "🗺️ SmartFarm Google Maps API Key Updater" -ForegroundColor Green
Write-Host "=========================================" -ForegroundColor Green
Write-Host ""

# Check if local.properties exists
$localPropertiesPath = "app\local.properties"
if (-not (Test-Path $localPropertiesPath)) {
    Write-Host "❌ Error: local.properties file not found at $localPropertiesPath" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Found local.properties file" -ForegroundColor Green
Write-Host ""

# Get current API key
$currentContent = Get-Content $localPropertiesPath -Raw
if ($currentContent -match 'MAPS_API_KEY=AIzaSyC\.\.\.your_actual_key_here\.\.\.XYZ') {
    Write-Host "⚠️  Current status: Using placeholder API key" -ForegroundColor Yellow
} else {
    Write-Host "✅ Current status: API key already configured" -ForegroundColor Green
}

Write-Host ""
Write-Host "📋 To get your Google Maps API key:" -ForegroundColor Cyan
Write-Host "1. Go to: https://console.cloud.google.com/" -ForegroundColor White
Write-Host "2. Select project: smart-farm-291d5" -ForegroundColor White
Write-Host "3. Enable: Maps SDK for Android" -ForegroundColor White
Write-Host "4. Create API key in Credentials section" -ForegroundColor White
Write-Host "5. Restrict to Android app:" -ForegroundColor White
Write-Host "   - Package: com.yourcompany.smartfarm" -ForegroundColor White
Write-Host "   - SHA-1: 3F:98:B1:F4:A2:FA:B7:1C:07:DE:5F:FF:0C:03:9D:C0:8F:2F:DA:4A" -ForegroundColor White
Write-Host ""

# Ask user for API key
$apiKey = Read-Host "🔑 Enter your Google Maps API key (or press Enter to skip)"

if ($apiKey -eq "") {
    Write-Host "⏭️  Skipping API key update" -ForegroundColor Yellow
    exit 0
}

# Validate API key format
if ($apiKey -notmatch '^AIza[0-9A-Za-z_-]{35}$') {
    Write-Host "❌ Error: Invalid API key format. Should start with 'AIza' and be 39 characters long." -ForegroundColor Red
    exit 1
}

Write-Host "✅ Valid API key format detected" -ForegroundColor Green

# Update the file
$newContent = $currentContent -replace 'MAPS_API_KEY=AIzaSyC\.\.\.your_actual_key_here\.\.\.XYZ', "MAPS_API_KEY=$apiKey"

# Backup original file
$backupPath = "app\local.properties.backup.$(Get-Date -Format 'yyyyMMdd_HHmmss')"
Copy-Item $localPropertiesPath $backupPath
Write-Host "💾 Backup created: $backupPath" -ForegroundColor Cyan

# Write new content
Set-Content -Path $localPropertiesPath -Value $newContent -NoNewline

Write-Host ""
Write-Host "✅ Google Maps API key updated successfully!" -ForegroundColor Green
Write-Host "📱 Your app is now ready to use Google Maps" -ForegroundColor Green
Write-Host ""
Write-Host "🚀 Next steps:" -ForegroundColor Cyan
Write-Host "1. Test the build: .\gradlew assembleDebug" -ForegroundColor White
Write-Host "2. Build release APK: .\gradlew assembleRelease" -ForegroundColor White
Write-Host "3. Test on device to verify Maps integration" -ForegroundColor White
Write-Host ""
Write-Host "🔒 Security note: local.properties is in .gitignore and won't be committed" -ForegroundColor Yellow
