# SmartFarm API Configuration Guide

## Overview
This guide provides step-by-step instructions for configuring all required API keys and services for the SmartFarm app before publication.

## 🔑 Required API Keys

### 1. Google Maps API Key
**Purpose**: Farm location mapping and geolocation services
**Current Status**: ⚠️ Placeholder in AndroidManifest.xml

#### Setup Instructions:
1. **Go to Google Cloud Console**
   - Visit: https://console.cloud.google.com/
   - Create a new project or select existing project

2. **Enable Maps SDK**
   - Navigate to "APIs & Services" > "Library"
   - Search for "Maps SDK for Android"
   - Click "Enable"

3. **Create API Key**
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "API Key"
   - Copy the generated API key

4. **Restrict API Key (Recommended)**
   - Click on the created API key
   - Under "Application restrictions", select "Android apps"
   - Add your app's package name: `com.example.smartfarm`
   - Add your app's SHA-1 fingerprint
   - Under "API restrictions", select "Restrict key"
   - Select "Maps SDK for Android"

5. **Update AndroidManifest.xml**
   ```xml
   <meta-data
       android:name="com.google.android.geo.API_KEY"
       android:value="YOUR_ACTUAL_MAPS_API_KEY" />
   ```

### 2. OpenWeatherMap API Key
**Purpose**: Weather forecasts and agricultural weather data
**Current Status**: ⚠️ Not configured

#### Setup Instructions:
1. **Sign up for OpenWeatherMap**
   - Visit: https://openweathermap.org/api
   - Create a free account
   - Verify your email

2. **Get API Key**
   - Go to "My API Keys" section
   - Copy your API key
   - Note: Free tier allows 1000 calls/day

3. **Configure in local.properties**
   ```properties
   WEATHER_API_KEY=your_openweathermap_api_key_here
   ```

4. **Update WeatherService Configuration**
   - The app will automatically read from local.properties
   - No code changes needed if using the provided configuration

### 3. Google Services Configuration
**Purpose**: Google Sign-In, Calendar integration, and other Google services
**Current Status**: ⚠️ Placeholder in google-services.json

#### Setup Instructions:
1. **Go to Firebase Console**
   - Visit: https://console.firebase.google.com/
   - Create a new project or select existing project

2. **Add Android App**
   - Click "Add app" > "Android"
   - Package name: `com.example.smartfarm`
   - App nickname: "SmartFarm"
   - Download the `google-services.json` file

3. **Enable Required Services**
   - **Authentication**: Enable Google Sign-In
   - **Cloud Firestore**: For data backup (optional)
   - **Analytics**: For app usage analytics (optional)

4. **Replace google-services.json**
   - Replace the placeholder file with your actual `google-services.json`

### 4. Google Calendar API
**Purpose**: Calendar integration for farm activities
**Current Status**: ⚠️ Not configured

#### Setup Instructions:
1. **Enable Google Calendar API**
   - Go to Google Cloud Console
   - Navigate to "APIs & Services" > "Library"
   - Search for "Google Calendar API"
   - Click "Enable"

2. **Create OAuth 2.0 Credentials**
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "OAuth 2.0 Client IDs"
   - Application type: "Android"
   - Package name: `com.example.smartfarm`
   - SHA-1 fingerprint: Your app's SHA-1

3. **Configure OAuth Consent Screen**
   - Go to "OAuth consent screen"
   - Add required scopes:
     - `https://www.googleapis.com/auth/calendar`
     - `https://www.googleapis.com/auth/calendar.events`

## 📁 Configuration Files

### 1. local.properties (Local Development)
```properties
# SDK location
sdk.dir=E\:\\AppData\\Local\\Android\\Sdk

# API Keys (DO NOT commit to version control)
WEATHER_API_KEY=your_openweathermap_api_key_here
MAPS_API_KEY=your_google_maps_api_key_here
```

### 2. AndroidManifest.xml
```xml
<!-- Google Maps API Key -->
<meta-data
    android:name="com.google.android.geo.API_KEY"
    android:value="YOUR_ACTUAL_MAPS_API_KEY" />
```

### 3. google-services.json
Replace the placeholder file with your actual Firebase configuration.

## 🔒 Security Best Practices

### 1. API Key Protection
- **Never commit API keys to version control**
- Use `local.properties` for local development
- Use environment variables for CI/CD
- Restrict API keys to specific apps and services

### 2. Key Restrictions
- **Google Maps API**: Restrict to Android apps with your package name
- **Weather API**: Use IP restrictions if possible
- **Google Services**: Use OAuth 2.0 with proper scopes

### 3. Production Deployment
- Use different API keys for debug and release builds
- Implement API key rotation procedures
- Monitor API usage and costs

## 🚀 Implementation Steps

### Step 1: Get API Keys
1. ✅ Google Maps API Key
2. ✅ OpenWeatherMap API Key
3. ✅ Firebase Configuration
4. ✅ Google Calendar OAuth Credentials

### Step 2: Update Configuration Files
1. ✅ Update `local.properties` with API keys
2. ✅ Replace `google-services.json`
3. ✅ Update `AndroidManifest.xml` with Maps API key

### Step 3: Test Configuration
1. ✅ Test Google Maps functionality
2. ✅ Test weather data retrieval
3. ✅ Test Google Sign-In
4. ✅ Test Calendar integration

### Step 4: Production Setup
1. ✅ Create production API keys
2. ✅ Set up proper restrictions
3. ✅ Configure monitoring and alerts
4. ✅ Document key management procedures

## 📊 API Usage Limits

### Google Maps API
- **Free Tier**: $200 credit/month
- **Usage**: ~$0.007 per 1000 map loads
- **Monitoring**: Enable billing alerts

### OpenWeatherMap API
- **Free Tier**: 1000 calls/day
- **Paid Plans**: Starting at $40/month
- **Monitoring**: Track daily usage

### Google Calendar API
- **Free Tier**: 1,000,000,000 queries/day
- **Quotas**: Per-user limits apply
- **Monitoring**: Enable API quotas

## 🛠️ Troubleshooting

### Common Issues:
1. **Maps not loading**: Check API key restrictions
2. **Weather data not updating**: Verify API key in local.properties
3. **Google Sign-In failing**: Check OAuth configuration
4. **Calendar sync issues**: Verify OAuth scopes

### Debug Steps:
1. Check API key validity
2. Verify package name matches
3. Check SHA-1 fingerprint
4. Review API quotas and billing
5. Check network connectivity

## 📞 Support Resources

### Google Services
- **Google Cloud Console**: https://console.cloud.google.com/
- **Firebase Console**: https://console.firebase.google.com/
- **Google Maps Documentation**: https://developers.google.com/maps

### OpenWeatherMap
- **API Documentation**: https://openweathermap.org/api
- **Support**: https://openweathermap.org/support

### General
- **Android Developer Documentation**: https://developer.android.com/
- **Google Play Console**: https://play.google.com/console

## ✅ Checklist

### Before Development
- [ ] Google Maps API key obtained and configured
- [ ] OpenWeatherMap API key obtained and configured
- [ ] Firebase project created and configured
- [ ] Google Calendar API enabled
- [ ] OAuth 2.0 credentials created

### Before Testing
- [ ] All API keys tested in debug build
- [ ] Maps functionality verified
- [ ] Weather data retrieval confirmed
- [ ] Google Sign-In working
- [ ] Calendar integration tested

### Before Production
- [ ] Production API keys created
- [ ] Proper restrictions applied
- [ ] Billing alerts configured
- [ ] Usage monitoring enabled
- [ ] Documentation updated

### Before App Store Submission
- [ ] All API keys properly configured
- [ ] No placeholder values remaining
- [ ] API usage within limits
- [ ] Security measures implemented
- [ ] Support documentation ready

## 🎯 Next Steps

1. **Immediate**: Follow the setup instructions for each API
2. **Testing**: Verify all integrations work correctly
3. **Production**: Set up production API keys and restrictions
4. **Monitoring**: Implement usage tracking and alerts
5. **Documentation**: Update team documentation with API details

**Status**: ⚠️ **CONFIGURATION REQUIRED** - Follow the steps above to complete API setup before app publication. 