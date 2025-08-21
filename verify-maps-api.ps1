# SmartFarm Google Maps API Verification Script
# This script helps verify your Google Maps API key setup

Write-Host "🗺️ SmartFarm Google Maps API Verification" -ForegroundColor Green
Write-Host "==========================================" -ForegroundColor Green
Write-Host ""

# Check current status
$localPropertiesPath = "app\local.properties"
$manifestPath = "app\src\main\AndroidManifest.xml"

Write-Host "📋 Current Status:" -ForegroundColor Yellow
Write-Host "==================" -ForegroundColor Yellow

# Check local.properties
if (Test-Path $localPropertiesPath) {
    $content = Get-Content $localPropertiesPath -Raw
    $hasPlaceholder = $content -match "YOUR_ACTUAL_MAPS_API_KEY_HERE"
    $hasRealKey = $content -match "AIzaSy[A-Za-z0-9_-]{35}"
    
    if ($hasPlaceholder) {
        Write-Host "❌ Placeholder API key found - needs real key" -ForegroundColor Red
        Write-Host "   Current: YOUR_ACTUAL_MAPS_API_KEY_HERE" -ForegroundColor Gray
    } elseif ($hasRealKey) {
        Write-Host "✅ Real API key configured" -ForegroundColor Green
        $keyMatch = [regex]::Match($content, "AIzaSy[A-Za-z0-9_-]{35}")
        if ($keyMatch.Success) {
            $key = $keyMatch.Value
            $maskedKey = $key.Substring(0, 10) + "..." + $key.Substring($key.Length - 4)
            Write-Host "   Key: $maskedKey" -ForegroundColor Gray
        }
    } else {
        Write-Host "⚠️  API key format unclear - check configuration" -ForegroundColor Yellow
    }
} else {
    Write-Host "❌ local.properties not found" -ForegroundColor Red
}

# Check AndroidManifest.xml
if (Test-Path $manifestPath) {
    $manifestContent = Get-Content $manifestPath -Raw
    $usesVariable = $manifestContent -match '\$\{MAPS_API_KEY\}'
    
    if ($usesVariable) {
        Write-Host "✅ AndroidManifest.xml uses MAPS_API_KEY variable" -ForegroundColor Green
    } else {
        Write-Host "❌ AndroidManifest.xml not properly configured" -ForegroundColor Red
    }
} else {
    Write-Host "❌ AndroidManifest.xml not found" -ForegroundColor Red
}

Write-Host ""
Write-Host "🔧 Next Steps:" -ForegroundColor Yellow
Write-Host "==============" -ForegroundColor Yellow

if ($hasPlaceholder) {
    Write-Host "1. Get API key from: https://console.cloud.google.com/" -ForegroundColor Blue
    Write-Host "2. Enable 'Maps SDK for Android'" -ForegroundColor Blue
    Write-Host "3. Create API key and restrict to your package" -ForegroundColor Blue
    Write-Host "4. Update app/local.properties with real key" -ForegroundColor Blue
    Write-Host "5. Test build: ./gradlew clean && ./gradlew build" -ForegroundColor Blue
} else {
    Write-Host "1. Test your build: ./gradlew clean && ./gradlew build" -ForegroundColor Blue
    Write-Host "2. Run app and test maps functionality" -ForegroundColor Blue
    Write-Host "3. Verify no API key crashes" -ForegroundColor Blue
}

Write-Host ""
Write-Host "📚 See GOOGLE_MAPS_API_SETUP.md for detailed instructions" -ForegroundColor Cyan
Write-Host "🔐 Remember: Never commit your real API key to version control!" -ForegroundColor Red
