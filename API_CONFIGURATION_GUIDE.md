# SmartFarm API Configuration Guide

## 🌾 Overview

This guide provides step-by-step instructions for configuring all required API keys and services for the SmartFarm application. Proper API configuration is essential for the app to function correctly.

## 📋 Required APIs

### 1. Google Maps API
**Purpose**: Location services, farm mapping, and navigation
**Status**: 🔴 **Required**

### 2. OpenWeatherMap API  
**Purpose**: Weather forecasts and alerts for farming decisions
**Status**: 🔴 **Required**

### 3. OpenAI API
**Purpose**: Expert chat functionality and AI assistance
**Status**: 🟡 **Optional** (for expert chat features)

### 4. Google Services (Firebase)
**Purpose**: Analytics, crash reporting, and cloud services
**Status**: 🟡 **Optional** (for monitoring and analytics)

## 🔧 Setup Instructions

### Step 1: Google Maps API Setup

#### 1.1 Create Google Cloud Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Select a project" → "New Project"
3. Enter project name: `SmartFarm-API`
4. Click "Create"

#### 1.2 Enable Maps SDK
1. In the Google Cloud Console, go to "APIs & Services" → "Library"
2. Search for "Maps SDK for Android"
3. Click on it and press "Enable"

#### 1.3 Create API Key
1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "API Key"
3. Copy the generated API key

#### 1.4 Restrict API Key (Recommended)
1. Click on the created API key
2. Under "Application restrictions", select "Android apps"
3. Add your app's package name: `com.example.smartfarm`
4. Get your app's SHA-1 fingerprint:
   ```bash
   # For debug builds
   keytool -list -v -keystore ~/.android/debug.keystore -alias androiddebugkey -storepass android -keypass android
   
   # For release builds (use your release keystore)
   keytool -list -v -keystore your-release-keystore.jks -alias your-alias
   ```
5. Add the SHA-1 fingerprint to the restrictions
6. Under "API restrictions", select "Restrict key" and choose "Maps SDK for Android"

#### 1.5 Configure in App
1. Open `app/src/main/AndroidManifest.xml`
2. Add the API key inside the `<application>` tag:
   ```xml
   <meta-data
       android:name="com.google.android.geo.API_KEY"
       android:value="YOUR_GOOGLE_MAPS_API_KEY_HERE" />
   ```

### Step 2: OpenWeatherMap API Setup

#### 2.1 Create Account
1. Go to [OpenWeatherMap](https://openweathermap.org/api)
2. Click "Sign Up" and create a free account
3. Verify your email address

#### 2.2 Get API Key
1. After login, go to "My API Keys"
2. Copy your default API key (or create a new one)

#### 2.3 Configure in App
1. Create or edit `local.properties` file in the project root:
   ```properties
   # Weather API Configuration
   WEATHER_API_KEY=your_openweathermap_api_key_here
   ```
2. **Important**: Add `local.properties` to `.gitignore` to keep it out of version control

### Step 3: OpenAI API Setup (Optional)

#### 3.1 Create Account
1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Sign up for an account
3. Add billing information (required for API access)

#### 3.2 Generate API Key
1. Go to "API Keys" section
2. Click "Create new secret key"
3. Copy the generated key (starts with `sk-`)

#### 3.3 Configure in App
1. Open `app/src/main/java/com/example/smartfarm/ExpertChatScreen.kt`
2. Find the line with `private val openAIApiKey = "sk-..."`
3. Replace with your actual API key:
   ```kotlin
   private val openAIApiKey = "sk-your-actual-api-key-here"
   ```

### Step 4: Firebase Setup (Optional)

#### 4.1 Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Enter project name: `SmartFarm`
4. Follow the setup wizard

#### 4.2 Add Android App
1. In Firebase Console, click "Add app" → "Android"
2. Enter package name: `com.example.smartfarm`
3. Enter app nickname: `SmartFarm`
4. Click "Register app"

#### 4.3 Download Configuration
1. Download the `google-services.json` file
2. Place it in the `app/` directory of your project

#### 4.4 Enable Services
1. In Firebase Console, go to "Analytics" and enable it
2. Go to "Crashlytics" and enable it
3. Go to "Performance" and enable it

## 🚀 Quick Setup Script

Use the provided PowerShell script for automated setup:

```powershell
# Run the setup script
.\API_SETUP_SCRIPT.ps1

# Or run with parameters
.\API_SETUP_SCRIPT.ps1 -GoogleMapsApiKey "your-maps-key" -WeatherApiKey "your-weather-key" -OpenAIApiKey "your-openai-key" -GoogleServicesProjectId "your-firebase-project-id"
```

## 🔍 Verification

### Test API Configuration
1. Build the app: `./gradlew assembleDebug`
2. Check the logs for any configuration errors
3. Test each feature:
   - **Maps**: Open farm location screen
   - **Weather**: Open weather screen
   - **Expert Chat**: Try asking a farming question
   - **Analytics**: Check Firebase console for data

### Configuration Status
The app includes a configuration status screen that shows:
- ✅ **Configured**: API is properly set up
- ❌ **Missing**: API key is not provided
- ⚠️ **Invalid**: API key format is incorrect
- 🔄 **Placeholder**: Still using default values

## 🔒 Security Best Practices

### 1. API Key Protection
- **Never commit API keys to version control**
- Use `local.properties` for sensitive keys
- Add `local.properties` to `.gitignore`
- Use API key restrictions (Android app restrictions for Google APIs)

### 2. Network Security
- All API calls use HTTPS
- Implement certificate pinning for production
- Use proper timeout values
- Handle network errors gracefully

### 3. Rate Limiting
- Monitor API usage to prevent unexpected charges
- Implement caching to reduce API calls
- Use appropriate request intervals

## 🛠️ Troubleshooting

### Common Issues

#### Google Maps Not Working
**Symptoms**: Maps don't load, location services fail
**Solutions**:
1. Verify API key is correct in `AndroidManifest.xml`
2. Check SHA-1 fingerprint is added to API key restrictions
3. Ensure Maps SDK for Android is enabled
4. Check internet connectivity

#### Weather Data Not Loading
**Symptoms**: Weather screen shows no data
**Solutions**:
1. Verify OpenWeatherMap API key in `local.properties`
2. Check internet connectivity
3. Verify API key has proper permissions
4. Check API usage limits

#### Expert Chat Not Responding
**Symptoms**: Chat shows error messages
**Solutions**:
1. Verify OpenAI API key is correct
2. Check billing status on OpenAI account
3. Ensure API key has proper permissions
4. Check network connectivity

#### Firebase Services Not Working
**Symptoms**: Analytics/crash reporting not working
**Solutions**:
1. Verify `google-services.json` is in `app/` directory
2. Check project ID matches in Firebase Console
3. Ensure required Firebase services are enabled
4. Check internet connectivity

### Error Messages

#### "API key not configured"
- Add the missing API key to the appropriate configuration file
- Restart the app after configuration

#### "Invalid API key"
- Check the API key format
- Verify the key is correct
- Ensure the key has proper permissions

#### "Network error"
- Check internet connectivity
- Verify API endpoints are accessible
- Check firewall settings

#### "Rate limit exceeded"
- Reduce API call frequency
- Implement proper caching
- Check API usage limits

## 📊 API Usage Monitoring

### Google Maps API
- Monitor usage in Google Cloud Console
- Set up billing alerts
- Check API quotas

### OpenWeatherMap API
- Monitor usage in OpenWeatherMap dashboard
- Free tier: 1,000 calls/day
- Consider paid plan for higher usage

### OpenAI API
- Monitor usage in OpenAI dashboard
- Set up billing alerts
- Check token usage

### Firebase
- Monitor usage in Firebase Console
- Check Analytics data
- Review Crashlytics reports

## 🔄 Updates and Maintenance

### Regular Tasks
1. **Monthly**: Review API usage and costs
2. **Quarterly**: Rotate API keys for security
3. **Annually**: Review and update API configurations

### API Key Rotation
1. Generate new API keys
2. Update configuration files
3. Test all functionality
4. Remove old keys from services

### Version Updates
1. Check for API changes when updating dependencies
2. Test all API integrations after updates
3. Update documentation as needed

## 📞 Support

### Documentation Links
- [Google Maps API Documentation](https://developers.google.com/maps/documentation/android-sdk)
- [OpenWeatherMap API Documentation](https://openweathermap.org/api)
- [OpenAI API Documentation](https://platform.openai.com/docs)
- [Firebase Documentation](https://firebase.google.com/docs)

### Contact Information
- **Google Cloud Support**: [Google Cloud Support](https://cloud.google.com/support)
- **OpenWeatherMap Support**: [OpenWeatherMap Support](https://openweathermap.org/support)
- **OpenAI Support**: [OpenAI Support](https://help.openai.com/)
- **Firebase Support**: [Firebase Support](https://firebase.google.com/support)

## ✅ Checklist

### Required APIs
- [ ] Google Maps API key configured
- [ ] OpenWeatherMap API key configured
- [ ] API keys added to appropriate files
- [ ] API key restrictions set up
- [ ] App builds successfully
- [ ] Maps functionality tested
- [ ] Weather functionality tested

### Optional APIs
- [ ] OpenAI API key configured (if using expert chat)
- [ ] Firebase project set up (if using analytics)
- [ ] Expert chat functionality tested
- [ ] Analytics data appearing in Firebase console

### Security
- [ ] `local.properties` added to `.gitignore`
- [ ] API keys not committed to version control
- [ ] API key restrictions configured
- [ ] HTTPS used for all API calls

### Testing
- [ ] All features work correctly
- [ ] Error handling tested
- [ ] Offline functionality tested
- [ ] Performance acceptable

---

**Note**: This configuration is essential for the SmartFarm app to function properly. Make sure to follow all security best practices and keep your API keys secure. 