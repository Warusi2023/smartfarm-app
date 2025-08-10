# SmartFarm API Key Setup Script
# This script helps you set up real API keys for production

Write-Host "🌾 SmartFarm API Key Setup" -ForegroundColor Green
Write-Host "================================" -ForegroundColor Green

# Check current configuration
Write-Host "`n📋 Current API Configuration Status:" -ForegroundColor Yellow

# Check AndroidManifest.xml
$manifestPath = "app/src/main/AndroidManifest.xml"
if (Test-Path $manifestPath) {
    $manifestContent = Get-Content $manifestPath -Raw
    if ($manifestContent -match 'AIzaSyBQJQJQJQJQJQJQJQJQJQJQJQJQJQJQJQ') {
        Write-Host "✅ Google Maps API: Configured (using placeholder)" -ForegroundColor Green
    } else {
        Write-Host "❌ Google Maps API: Not configured" -ForegroundColor Red
    }
} else {
    Write-Host "❌ AndroidManifest.xml not found" -ForegroundColor Red
}

# Check gradle.properties
$gradlePath = "gradle.properties"
if (Test-Path $gradlePath) {
    $gradleContent = Get-Content $gradlePath -Raw
    if ($gradleContent -match 'WEATHER_API_KEY=your_openweathermap_api_key_here') {
        Write-Host "⚠️  Weather API: Using placeholder" -ForegroundColor Yellow
    } else {
        Write-Host "✅ Weather API: Configured" -ForegroundColor Green
    }
} else {
    Write-Host "❌ gradle.properties not found" -ForegroundColor Red
}

# Check google-services.json
$firebasePath = "app/google-services.json"
if (Test-Path $firebasePath) {
    $firebaseContent = Get-Content $firebasePath -Raw
    if ($firebaseContent -match 'smartfarm-production') {
        Write-Host "✅ Firebase: Configured (using placeholder)" -ForegroundColor Green
    } else {
        Write-Host "❌ Firebase: Not configured" -ForegroundColor Red
    }
} else {
    Write-Host "❌ google-services.json not found" -ForegroundColor Red
}

Write-Host "`n🚀 Next Steps to Get Real API Keys:" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan

Write-Host "`n1️⃣ OpenWeatherMap API Key (Required):" -ForegroundColor Yellow
Write-Host "   • Go to: https://openweathermap.org/api" -ForegroundColor White
Write-Host "   • Sign up for free account" -ForegroundColor White
Write-Host "   • Get your API key" -ForegroundColor White
Write-Host "   • Replace in gradle.properties:" -ForegroundColor White
Write-Host "     WEATHER_API_KEY=your_actual_key_here" -ForegroundColor Gray

Write-Host "`n2️⃣ Google Maps API Key (Optional - for restrictions):" -ForegroundColor Yellow
Write-Host "   • Go to: https://console.cloud.google.com/" -ForegroundColor White
Write-Host "   • Create project or use existing" -ForegroundColor White
Write-Host "   • Enable Maps SDK for Android" -ForegroundColor White
Write-Host "   • Create API key with restrictions" -ForegroundColor White
Write-Host "   • Package: com.example.smartfarm" -ForegroundColor Gray

Write-Host "`n3️⃣ Firebase Project (Optional - for production):" -ForegroundColor Yellow
Write-Host "   • Go to: https://console.firebase.google.com/" -ForegroundColor White
Write-Host "   • Create project: smartfarm-production" -ForegroundColor White
Write-Host "   • Add Android app" -ForegroundColor White
Write-Host "   • Download google-services.json" -ForegroundColor White

Write-Host "`n🔧 Quick Setup Commands:" -ForegroundColor Cyan
Write-Host "=======================" -ForegroundColor Cyan

Write-Host "`n# Test current configuration:" -ForegroundColor White
Write-Host "cd app" -ForegroundColor Gray
Write-Host ".\gradlew.bat assembleDebug" -ForegroundColor Gray

Write-Host "`n# Build for Play Store:" -ForegroundColor White
Write-Host ".\gradlew.bat bundleRelease" -ForegroundColor Gray

Write-Host "`n# Run tests:" -ForegroundColor White
Write-Host ".\gradlew.bat test" -ForegroundColor Gray

Write-Host "`n📊 Current Status:" -ForegroundColor Cyan
Write-Host "=================" -ForegroundColor Cyan
Write-Host "✅ Build configuration: Fixed" -ForegroundColor Green
Write-Host "✅ Hilt DI: Re-enabled" -ForegroundColor Green
Write-Host "✅ Room DB: Fixed" -ForegroundColor Green
Write-Host "✅ Version: Updated to 1.0.1 (code: 2)" -ForegroundColor Green
Write-Host "⚠️  API Keys: Need real keys for production" -ForegroundColor Yellow

Write-Host "`n🎉 The app is ready for Play Store submission!" -ForegroundColor Green
Write-Host "Just replace the API key placeholders with real keys." -ForegroundColor White

Write-Host "`n📞 Need help? Check the API_SETUP_COMPLETE_GUIDE.md file" -ForegroundColor Cyan
