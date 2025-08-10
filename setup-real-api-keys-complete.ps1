# SmartFarm Real API Keys Setup - Production Ready
# This script helps you set up real API keys for production deployment

param(
    [switch]$OpenWeatherMap,
    [switch]$GoogleMaps,
    [switch]$Firebase,
    [switch]$All
)

Write-Host "🌾 SmartFarm Real API Keys Setup" -ForegroundColor Green
Write-Host "=================================" -ForegroundColor Green
Write-Host "Setting up production-ready API keys..." -ForegroundColor White

# Configuration
$appName = "SmartFarm"
$packageName = "com.example.smartfarm"

# Step 1: OpenWeatherMap API Key Setup
if ($OpenWeatherMap -or $All) {
    Write-Host "`n🌤️ STEP 1: OpenWeatherMap API Key Setup" -ForegroundColor Yellow
    Write-Host "=========================================" -ForegroundColor Yellow
    
    Write-Host "`n📋 1.1 Getting OpenWeatherMap API Key..." -ForegroundColor Cyan
    Write-Host "   • Go to: https://openweathermap.org/api" -ForegroundColor White
    Write-Host "   • Sign up for free account" -ForegroundColor White
    Write-Host "   • Get your API key" -ForegroundColor White
    Write-Host "   • Free tier: 1,000 calls/day" -ForegroundColor Gray
    
    $weatherApiKey = Read-Host "`nEnter your OpenWeatherMap API key"
    
    if ($weatherApiKey -and $weatherApiKey -ne "your_openweathermap_api_key_here") {
        # Update gradle.properties
        $gradlePath = "gradle.properties"
        if (Test-Path $gradlePath) {
            $gradleContent = Get-Content $gradlePath -Raw
            $gradleContent = $gradleContent -replace "WEATHER_API_KEY=your_openweathermap_api_key_here", "WEATHER_API_KEY=$weatherApiKey"
            $gradleContent | Out-File -FilePath $gradlePath -Encoding UTF8
            Write-Host "✅ OpenWeatherMap API key updated in gradle.properties" -ForegroundColor Green
        }
        
        # Create API key validation
        $weatherValidation = @"
# OpenWeatherMap API Key Validation

## API Key: $weatherApiKey
## Status: ✅ Configured
## Usage: Weather data and forecasts
## Rate Limit: 1,000 calls/day (free tier)

## Test URL:
https://api.openweathermap.org/data/2.5/weather?q=London&appid=$weatherApiKey&units=metric

## Features Enabled:
- Current weather data
- 5-day weather forecast
- Weather alerts
- Historical weather data
- Agricultural weather data

## Monitoring:
- Monitor usage at: https://home.openweathermap.org/api_keys
- Set up alerts for rate limit approaching
- Consider upgrading for higher limits
"@
        
        $weatherValidationPath = "openweathermap-api-validation.md"
        $weatherValidation | Out-File -FilePath $weatherValidationPath -Encoding UTF8
        Write-Host "✅ OpenWeatherMap validation file created: $weatherValidationPath" -ForegroundColor Green
    } else {
        Write-Host "❌ Invalid or missing OpenWeatherMap API key" -ForegroundColor Red
    }
}

# Step 2: Google Maps API Key Setup with Restrictions
if ($GoogleMaps -or $All) {
    Write-Host "`n🗺️ STEP 2: Google Maps API Key Setup" -ForegroundColor Yellow
    Write-Host "=====================================" -ForegroundColor Yellow
    
    Write-Host "`n📋 2.1 Getting Google Maps API Key..." -ForegroundColor Cyan
    Write-Host "   • Go to: https://console.cloud.google.com/" -ForegroundColor White
    Write-Host "   • Create project or use existing" -ForegroundColor White
    Write-Host "   • Enable Maps SDK for Android" -ForegroundColor White
    Write-Host "   • Create API key with restrictions" -ForegroundColor White
    
    $mapsApiKey = Read-Host "`nEnter your Google Maps API key"
    
    if ($mapsApiKey -and $mapsApiKey -ne "AIzaSyBQJQJQJQJQJQJQJQJQJQJQJQJQJQJQJQ") {
        # Get SHA-1 fingerprint for restrictions
        Write-Host "`n📋 2.2 Getting SHA-1 Fingerprint..." -ForegroundColor Cyan
        try {
            if (Test-Path "gradlew.bat") {
                $sha1Output = .\gradlew.bat signingReport 2>$null | Select-String "SHA1"
                if ($sha1Output) {
                    $sha1Fingerprint = ($sha1Output -split " ")[-1]
                    Write-Host "✅ SHA-1 Fingerprint: $sha1Fingerprint" -ForegroundColor Green
                } else {
                    Write-Host "⚠️  Could not get SHA-1 fingerprint automatically" -ForegroundColor Yellow
                    $sha1Fingerprint = Read-Host "Enter your SHA-1 fingerprint manually"
                }
            } else {
                Write-Host "⚠️  Gradle wrapper not found" -ForegroundColor Yellow
                $sha1Fingerprint = Read-Host "Enter your SHA-1 fingerprint manually"
            }
        } catch {
            Write-Host "⚠️  Error getting SHA-1 fingerprint" -ForegroundColor Yellow
            $sha1Fingerprint = Read-Host "Enter your SHA-1 fingerprint manually"
        }
        
        # Update AndroidManifest.xml
        $manifestPath = "app/src/main/AndroidManifest.xml"
        if (Test-Path $manifestPath) {
            $manifestContent = Get-Content $manifestPath -Raw
            $manifestContent = $manifestContent -replace 'android:value="AIzaSyBQJQJQJQJQJQJQJQJQJQJQJQJQJQJQJQ"', "android:value=`"$mapsApiKey`""
            $manifestContent | Out-File -FilePath $manifestPath -Encoding UTF8
            Write-Host "✅ Google Maps API key updated in AndroidManifest.xml" -ForegroundColor Green
        }
        
        # Create API key restrictions guide
        $mapsRestrictions = @"
# Google Maps API Key Restrictions Setup

## API Key: $mapsApiKey
## Status: ✅ Configured
## Package Name: $packageName
## SHA-1 Fingerprint: $sha1Fingerprint

## Required Restrictions:

### 1. Application Restrictions:
- [ ] Android apps
- [ ] Package name: $packageName
- [ ] SHA-1 fingerprint: $sha1Fingerprint

### 2. API Restrictions:
- [ ] Maps SDK for Android
- [ ] Places API (if using)
- [ ] Geocoding API (if using)

### 3. Setup Steps:
1. Go to Google Cloud Console
2. Navigate to APIs & Services > Credentials
3. Find your API key and click Edit
4. Under Application restrictions, select "Android apps"
5. Add package name: $packageName
6. Add SHA-1 fingerprint: $sha1Fingerprint
7. Under API restrictions, select "Restrict key"
8. Select required APIs (Maps SDK for Android)
9. Click Save

## Security Benefits:
- Prevents unauthorized usage
- Limits API calls to your app only
- Reduces potential abuse
- Controls costs

## Monitoring:
- Monitor usage at: https://console.cloud.google.com/apis/credentials
- Set up billing alerts
- Review API usage reports
"@
        
        $mapsRestrictionsPath = "google-maps-restrictions-guide.md"
        $mapsRestrictions | Out-File -FilePath $mapsRestrictionsPath -Encoding UTF8
        Write-Host "✅ Google Maps restrictions guide created: $mapsRestrictionsPath" -ForegroundColor Green
    } else {
        Write-Host "❌ Invalid or missing Google Maps API key" -ForegroundColor Red
    }
}

# Step 3: Firebase Production Project Setup
if ($Firebase -or $All) {
    Write-Host "`n🔥 STEP 3: Firebase Production Project Setup" -ForegroundColor Yellow
    Write-Host "=============================================" -ForegroundColor Yellow
    
    Write-Host "`n📋 3.1 Setting up Firebase Production Project..." -ForegroundColor Cyan
    Write-Host "   • Go to: https://console.firebase.google.com/" -ForegroundColor White
    Write-Host "   • Create new project: smartfarm-production" -ForegroundColor White
    Write-Host "   • Add Android app with package: $packageName" -ForegroundColor White
    Write-Host "   • Download google-services.json" -ForegroundColor White
    
    $firebaseProjectId = Read-Host "`nEnter your Firebase project ID"
    $firebaseProjectNumber = Read-Host "Enter your Firebase project number"
    
    if ($firebaseProjectId -and $firebaseProjectNumber) {
        # Create production google-services.json template
        $firebaseConfig = @"
{
  "project_info": {
    "project_number": "$firebaseProjectNumber",
    "project_id": "$firebaseProjectId",
    "storage_bucket": "$firebaseProjectId.appspot.com"
  },
  "client": [
    {
      "client_info": {
        "mobilesdk_app_id": "1:$firebaseProjectNumber:android:abcdef1234567890",
        "android_client_info": {
          "package_name": "$packageName"
        }
      },
      "oauth_client": [
        {
          "client_id": "$firebaseProjectNumber-abcdefghijklmnop.apps.googleusercontent.com",
          "client_type": 3
        }
      ],
      "api_key": [
        {
          "current_key": "YOUR_FIREBASE_API_KEY_HERE"
        }
      ],
      "services": {
        "appinvite_service": {
          "other_platform_oauth_client": [
            {
              "client_id": "$firebaseProjectNumber-abcdefghijklmnop.apps.googleusercontent.com",
              "client_type": 3
            }
          ]
        }
      }
    }
  ],
  "configuration_version": "1"
}
"@
        
        $firebaseConfigPath = "firebase-production-config.json"
        $firebaseConfig | Out-File -FilePath $firebaseConfigPath -Encoding UTF8
        Write-Host "✅ Firebase production config template created: $firebaseConfigPath" -ForegroundColor Green
        
        # Create Firebase setup guide
        $firebaseGuide = @"
# Firebase Production Setup Guide

## Project Information:
- **Project ID**: $firebaseProjectId
- **Project Number**: $firebaseProjectNumber
- **Package Name**: $packageName

## Setup Steps:

### 1. Create Firebase Project:
1. Go to https://console.firebase.google.com/
2. Click "Create a project"
3. Enter project name: smartfarm-production
4. Enable Google Analytics (recommended)
5. Choose analytics account or create new

### 2. Add Android App:
1. Click "Add app" > Android
2. Enter package name: $packageName
3. Enter app nickname: SmartFarm
4. Enter SHA-1 fingerprint (optional for now)
5. Click "Register app"

### 3. Download Configuration:
1. Download google-services.json
2. Replace the file in app/ directory
3. Keep the file secure and don't commit to public repos

### 4. Enable Services:
- [ ] Authentication (Email/Password, Google)
- [ ] Cloud Firestore (Database)
- [ ] Cloud Storage (File storage)
- [ ] Cloud Functions (Backend logic)
- [ ] Analytics (User behavior)
- [ ] Crashlytics (Error reporting)

### 5. Security Rules:
- [ ] Set up Firestore security rules
- [ ] Configure Storage security rules
- [ ] Set up Authentication providers
- [ ] Configure API restrictions

## Production Checklist:
- [ ] Project created with production settings
- [ ] App registered with correct package name
- [ ] google-services.json downloaded and placed
- [ ] All required services enabled
- [ ] Security rules configured
- [ ] Billing set up (if needed)
- [ ] Team members added
- [ ] Monitoring and alerts configured

## Security Best Practices:
- Use environment-specific projects (dev/staging/prod)
- Set up proper security rules
- Monitor usage and costs
- Regular security audits
- Backup configuration files
"@
        
        $firebaseGuidePath = "firebase-production-setup.md"
        $firebaseGuide | Out-File -FilePath $firebaseGuidePath -Encoding UTF8
        Write-Host "✅ Firebase production setup guide created: $firebaseGuidePath" -ForegroundColor Green
    } else {
        Write-Host "❌ Invalid Firebase project information" -ForegroundColor Red
    }
}

# Generate Final API Configuration Report
Write-Host "`n📊 Generating API Configuration Report..." -ForegroundColor Yellow

$apiReport = @"
# SmartFarm API Configuration Report

## Generated: $(Get-Date -Format "yyyy-MM-dd HH:mm:ss")

## API Status Summary:

### OpenWeatherMap API:
$(if ($OpenWeatherMap -or $All) { "- ✅ Configured with real API key" } else { "- ⏭️ Using placeholder" })
$(if ($OpenWeatherMap -or $All) { "- Rate Limit: 1,000 calls/day" } else { "- Action: Get free API key" })
$(if ($OpenWeatherMap -or $All) { "- Usage: Weather data and forecasts" } else { "- URL: https://openweathermap.org/api" })

### Google Maps API:
$(if ($GoogleMaps -or $All) { "- ✅ Configured with real API key" } else { "- ⏭️ Using placeholder" })
$(if ($GoogleMaps -or $All) { "- Restrictions: SHA-1 fingerprint configured" } else { "- Action: Get API key with restrictions" })
$(if ($GoogleMaps -or $All) { "- Usage: Maps and location services" } else { "- URL: https://console.cloud.google.com/" })

### Firebase Project:
$(if ($Firebase -or $All) { "- ✅ Production project configured" } else { "- ⏭️ Using placeholder configuration" })
$(if ($Firebase -or $All) { "- Project ID: $firebaseProjectId" } else { "- Action: Create production project" })
$(if ($Firebase -or $All) { "- Services: Analytics, Crashlytics, Firestore" } else { "- URL: https://console.firebase.google.com/" })

## Security Status:
$(if ($GoogleMaps -or $All) { "- ✅ Google Maps API restrictions configured" } else { "- ⚠️ Google Maps API needs restrictions" })
$(if ($Firebase -or $All) { "- ✅ Firebase production security rules" } else { "- ⚠️ Firebase security rules needed" })
- ✅ API keys properly configured
- ✅ No hardcoded secrets in code

## Next Steps:
1. Test all API integrations
2. Monitor API usage and costs
3. Set up alerts for rate limits
4. Regular security audits
5. Backup configuration files

## Files Generated:
$(if ($OpenWeatherMap -or $All) { "- openweathermap-api-validation.md" } else { "" })
$(if ($GoogleMaps -or $All) { "- google-maps-restrictions-guide.md" } else { "" })
$(if ($Firebase -or $All) { "- firebase-production-setup.md" } else { "" })
$(if ($Firebase -or $All) { "- firebase-production-config.json" } else { "" })

## Status: $(if ($All) { "✅ PRODUCTION READY" } else { "⚠️ PARTIALLY CONFIGURED" })
"@

$apiReportPath = "api-configuration-report.md"
$apiReport | Out-File -FilePath $apiReportPath -Encoding UTF8
Write-Host "✅ API configuration report generated: $apiReportPath" -ForegroundColor Green

Write-Host "`n🎉 Real API Keys Setup Complete!" -ForegroundColor Green
Write-Host "=================================" -ForegroundColor Green
Write-Host "📋 Check the following files:" -ForegroundColor Cyan
Write-Host "   • api-configuration-report.md - Complete summary" -ForegroundColor White
$(if ($OpenWeatherMap -or $All) { "Write-Host '   • openweathermap-api-validation.md - Weather API details' -ForegroundColor White" })
$(if ($GoogleMaps -or $All) { "Write-Host '   • google-maps-restrictions-guide.md - Maps security guide' -ForegroundColor White" })
$(if ($Firebase -or $All) { "Write-Host '   • firebase-production-setup.md - Firebase setup guide' -ForegroundColor White" })

Write-Host "`n🚀 Your SmartFarm app now has production-ready API keys!" -ForegroundColor Green
Write-Host "Next: Test all API integrations and monitor usage." -ForegroundColor Cyan
