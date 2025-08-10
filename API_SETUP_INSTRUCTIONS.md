# SmartFarm API Setup Instructions

## Step 1: Run the Setup Script

### Option A: Interactive Setup (Recommended)
```powershell
powershell -ExecutionPolicy Bypass -File "setup-api-keys.ps1"
```

### Option B: Non-Interactive Setup (with your actual API keys)
```powershell
powershell -ExecutionPolicy Bypass -File "setup-api-keys.ps1" -Interactive:$false -GoogleMapsApiKey "YOUR_ACTUAL_GOOGLE_MAPS_API_KEY" -WeatherApiKey "YOUR_ACTUAL_WEATHER_API_KEY" -OpenAIApiKey "YOUR_ACTUAL_OPENAI_API_KEY" -FirebaseProjectId "YOUR_ACTUAL_FIREBASE_PROJECT_ID"
```

## Step 2: Get Your API Keys

### 1. Google Maps API Key
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing project
3. Enable the following APIs:
   - Maps SDK for Android
   - Places API
   - Geocoding API
4. Go to "Credentials" → "Create Credentials" → "API Key"
5. Copy the generated API key (format: `AIzaSyB...`)

### 2. OpenWeatherMap API Key
1. Go to [OpenWeatherMap](https://openweathermap.org/api)
2. Sign up for a free account
3. Go to "API keys" section
4. Copy your API key (32-character hexadecimal string)

### 3. OpenAI API Key
1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Sign up or log in to your account
3. Go to "API Keys" section
4. Create a new API key
5. Copy the generated key (format: `sk-...`)

### 4. Firebase Project ID
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select existing project
3. Copy the Project ID from the project settings

## Step 3: Configure Your API Keys

When you run the setup script, you'll be prompted to enter each API key:

```
Enter your Google Maps API key: AIzaSyB-your-actual-key-here
Enter your OpenWeatherMap API key: your-32-char-hex-key
Enter your OpenAI API key: sk-your-actual-openai-key
Enter your Firebase Project ID: your-project-id
```

## Step 4: Verify Configuration

The script will create the following files:

1. **`local.properties`** - Contains Weather API key
2. **`app/google-services.json`** - Firebase configuration template
3. **`API_CONFIGURATION_GUIDE.md`** - Detailed configuration guide
4. **`api-config.json`** - Centralized API configuration

## Step 5: Test the Integration

### Build the Android App
```bash
# Clean and build the project
./gradlew clean
./gradlew build

# Run on device/emulator
./gradlew installDebug
```

### Build the Web App
```bash
# Build the web application
./gradlew buildWeb

# Run the web server
./gradlew runWeb
```

### Test API Connections

1. **Weather API Test**
   - Open the Weather screen in the app
   - Verify current weather data is displayed
   - Check that forecasts are working

2. **Google Maps Test**
   - Open any screen with location features
   - Verify maps are loading correctly
   - Test location services

3. **OpenAI Chat Test**
   - Open the Expert Chat screen
   - Send a test message
   - Verify AI responses are received

## Step 6: Monitor API Usage

### Google Cloud Console
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project
3. Go to "APIs & Services" → "Dashboard"
4. Monitor usage and quotas

### OpenWeatherMap
1. Go to [OpenWeatherMap](https://openweathermap.org/api)
2. Check your account dashboard
3. Monitor API call usage

### OpenAI Platform
1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Check your usage dashboard
3. Monitor API costs and usage

## Troubleshooting

### Common Issues

1. **API Key Invalid**
   - Verify the API key format
   - Check if the API is enabled in the console
   - Ensure billing is set up (if required)

2. **Rate Limiting**
   - Check your API usage limits
   - Implement caching if needed
   - Consider upgrading your plan

3. **Network Issues**
   - Check internet connectivity
   - Verify firewall settings
   - Test API endpoints directly

### Error Messages

- **"API key not valid"** - Check key format and enablement
- **"Quota exceeded"** - Monitor usage and upgrade plan
- **"Service unavailable"** - Check service status pages

## Security Best Practices

1. **Never commit API keys to version control**
   - Use `.gitignore` to exclude sensitive files
   - Use environment variables in production

2. **Rotate API keys regularly**
   - Set up key rotation schedules
   - Monitor for unauthorized usage

3. **Use API key restrictions**
   - Restrict keys to specific IP addresses
   - Limit API scopes to minimum required

4. **Monitor usage**
   - Set up alerts for unusual activity
   - Track usage patterns

## Next Steps

After successful API configuration:

1. **Test all features** thoroughly
2. **Monitor performance** and optimize
3. **Set up monitoring** and alerts
4. **Plan for scaling** as usage grows

## Support

If you encounter issues:

1. Check the generated `API_CONFIGURATION_GUIDE.md`
2. Review the troubleshooting section above
3. Check service status pages for outages
4. Contact support for the respective services

---

**Remember**: Keep your API keys secure and never share them publicly! 