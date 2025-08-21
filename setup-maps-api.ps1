# SmartFarm Google Maps API Setup Script
# This script helps you set up your Google Maps API key

Write-Host "🗺️ SmartFarm Google Maps API Setup" -ForegroundColor Green
Write-Host "=====================================" -ForegroundColor Green
Write-Host ""

# Check if local.properties exists
$localPropertiesPath = "app\local.properties"
if (Test-Path $localPropertiesPath) {
    Write-Host "✅ local.properties found" -ForegroundColor Green
} else {
    Write-Host "❌ local.properties not found. Creating template..." -ForegroundColor Red
    # Create template if it doesn't exist
    $template = @"
# SmartFarm API Keys Configuration
# This file should NOT be committed to version control
# Add it to .gitignore to keep your keys secure

# Google Maps API Key
# Get your key from: https://console.cloud.google.com/
# Enable: Maps SDK for Android
MAPS_API_KEY=YOUR_ACTUAL_MAPS_API_KEY_HERE

# Firebase Configuration (if needed)
# FIREBASE_PROJECT_ID=your-project-id
# FIREBASE_APP_ID=your-app-id

# Other API Keys
# WEATHER_API_KEY=your-weather-api-key
# ANALYTICS_API_KEY=your-analytics-key

# Instructions:
# 1. Replace YOUR_ACTUAL_MAPS_API_KEY_HERE with your real Google Maps API key
# 2. Keep this file secure and never commit it to version control
# 3. Share this template with your team (without real keys)
# 4. Each developer should create their own local.properties file
"@
    Set-Content -Path $localPropertiesPath -Value $template
    Write-Host "   ✅ Template created" -ForegroundColor Green
}

Write-Host ""
Write-Host "📋 Setup Instructions:" -ForegroundColor Yellow
Write-Host "=====================" -ForegroundColor Yellow
Write-Host ""

Write-Host "1. 🔑 Get Google Maps API Key:" -ForegroundColor Blue
Write-Host "   • Go to: https://console.cloud.google.com/" -ForegroundColor Gray
Write-Host "   • Create/select a project" -ForegroundColor Gray
Write-Host "   • Enable 'Maps SDK for Android'" -ForegroundColor Gray
Write-Host "   • Create API key in Credentials" -ForegroundColor Gray
Write-Host ""

Write-Host "2. 🔒 Secure Your API Key:" -ForegroundColor Blue
Write-Host "   • Restrict key to Android apps" -ForegroundColor Gray
Write-Host "   • Add package: com.smartfarm.app" -ForegroundColor Gray
Write-Host "   • Add SHA-1 fingerprint" -ForegroundColor Gray
Write-Host ""

Write-Host "3. ⚙️ Update local.properties:" -ForegroundColor Blue
Write-Host "   • Open: $localPropertiesPath" -ForegroundColor Gray
Write-Host "   • Replace YOUR_ACTUAL_MAPS_API_KEY_HERE" -ForegroundColor Gray
Write-Host "   • Save the file" -ForegroundColor Gray
Write-Host ""

Write-Host "4. 🧪 Test the Setup:" -ForegroundColor Blue
Write-Host "   • Clean project: ./gradlew clean" -ForegroundColor Gray
Write-Host "   • Build project: ./gradlew build" -ForegroundColor Gray
Write-Host "   • Run app and test maps" -ForegroundColor Gray
Write-Host ""

# Check current API key status
$content = Get-Content $localPropertiesPath -Raw
if ($content -match "YOUR_ACTUAL_MAPS_API_KEY_HERE") {
    Write-Host "⚠️  Current Status:" -ForegroundColor Red
    Write-Host "   API key still needs to be configured" -ForegroundColor Gray
    Write-Host "   Maps will crash until you add a real key" -ForegroundColor Gray
} else {
    Write-Host "✅ Current Status:" -ForegroundColor Green
    Write-Host "   API key appears to be configured" -ForegroundColor Gray
    Write-Host "   Ready for testing" -ForegroundColor Gray
}

Write-Host ""
Write-Host "🔧 Useful Commands:" -ForegroundColor Yellow
Write-Host "===================" -ForegroundColor Yellow
Write-Host ""

Write-Host "# Get SHA-1 fingerprint for debug keystore:" -ForegroundColor Gray
Write-Host "keytool -list -v -keystore ~/.android/debug.keystore -alias androiddebugkey -storepass android -keypass android" -ForegroundColor White
Write-Host ""

Write-Host "# Clean and build project:" -ForegroundColor Gray
Write-Host "./gradlew clean" -ForegroundColor White
Write-Host "./gradlew build" -ForegroundColor White
Write-Host ""

Write-Host "# Check if API key is loaded:" -ForegroundColor Gray
Write-Host "# Look for BuildConfig.MAPS_API_KEY in generated code" -ForegroundColor White
Write-Host ""

Write-Host "📚 For detailed instructions, see: GOOGLE_MAPS_API_SETUP.md" -ForegroundColor Cyan
Write-Host ""
Write-Host "🎯 After setup, your app will be ready for Play Store upload!" -ForegroundColor Green
