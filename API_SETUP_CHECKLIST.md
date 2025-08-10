# SmartFarm API Setup Checklist

## 🎯 **Phase 1: API Key Acquisition**

### ✅ **1. Google Maps API Key**
**Status**: ⚠️ **REQUIRED**
**Purpose**: Farm location mapping and geolocation services

#### **Setup Steps:**
1. **Go to Google Cloud Console**
   - Visit: https://console.cloud.google.com/
   - Create new project: "SmartFarm-API"
   - Enable billing (required for Maps API)

2. **Enable Maps SDK**
   - Navigate to "APIs & Services" > "Library"
   - Search for "Maps SDK for Android"
   - Click "Enable"

3. **Create API Key**
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "API Key"
   - Copy the generated API key

4. **Restrict API Key (CRITICAL)**
   - Click on the created API key
   - Under "Application restrictions", select "Android apps"
   - Add package name: `com.example.smartfarm`
   - Add SHA-1 fingerprint (get from Android Studio)
   - Under "API restrictions", select "Restrict key"
   - Select "Maps SDK for Android"

**✅ Checklist:**
- [ ] Google Cloud project created
- [ ] Maps SDK enabled
- [ ] API key generated
- [ ] API key restricted to Android app
- [ ] SHA-1 fingerprint added

---

### ✅ **2. OpenWeatherMap API Key**
**Status**: ⚠️ **REQUIRED**
**Purpose**: Weather forecasts and agricultural weather data

#### **Setup Steps:**
1. **Sign up for OpenWeatherMap**
   - Visit: https://openweathermap.org/api
   - Create free account
   - Verify email address

2. **Get API Key**
   - Go to "My API Keys" section
   - Copy your API key
   - Note: Free tier allows 1000 calls/day

3. **Test API Key**
   - Use the test URL: `https://api.openweathermap.org/data/2.5/weather?q=London&appid=YOUR_API_KEY`
   - Should return JSON weather data

**✅ Checklist:**
- [ ] OpenWeatherMap account created
- [ ] Email verified
- [ ] API key obtained
- [ ] API key tested successfully

---

### ✅ **3. Firebase Configuration**
**Status**: ⚠️ **REQUIRED**
**Purpose**: Google Sign-In, Analytics, Crashlytics, Performance

#### **Setup Steps:**
1. **Go to Firebase Console**
   - Visit: https://console.firebase.google.com/
   - Create new project: "SmartFarm-App"
   - Enable Google Analytics (recommended)

2. **Add Android App**
   - Click "Add app" > "Android"
   - Package name: `com.example.smartfarm`
   - App nickname: "SmartFarm"
   - Download `google-services.json`

3. **Enable Services**
   - **Authentication**: Enable Google Sign-In
   - **Analytics**: Already enabled
   - **Crashlytics**: Enable for crash reporting
   - **Performance**: Enable for performance monitoring

**✅ Checklist:**
- [ ] Firebase project created
- [ ] Android app added
- [ ] google-services.json downloaded
- [ ] Authentication enabled
- [ ] Crashlytics enabled
- [ ] Performance monitoring enabled

---

### ✅ **4. Google Calendar API**
**Status**: ⚠️ **REQUIRED**
**Purpose**: Calendar integration for farm activities

#### **Setup Steps:**
1. **Enable Google Calendar API**
   - Go to Google Cloud Console (same project as Maps)
   - Navigate to "APIs & Services" > "Library"
   - Search for "Google Calendar API"
   - Click "Enable"

2. **Create OAuth 2.0 Credentials**
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "OAuth 2.0 Client IDs"
   - Application type: "Android"
   - Package name: `com.example.smartfarm`
   - SHA-1 fingerprint: Same as Maps API

3. **Configure OAuth Consent Screen**
   - Go to "OAuth consent screen"
   - Add scopes:
     - `https://www.googleapis.com/auth/calendar`
     - `https://www.googleapis.com/auth/calendar.events`

**✅ Checklist:**
- [ ] Calendar API enabled
- [ ] OAuth 2.0 credentials created
- [ ] OAuth consent screen configured
- [ ] Required scopes added

---

## 🎯 **Phase 2: Configuration Files Update**

### ✅ **1. Update local.properties**
**File**: `local.properties` (in project root)
**Purpose**: Store API keys locally (not committed to version control)

```properties
# SDK location
sdk.dir=E\:\\AppData\\Local\\Android\\Sdk

# API Keys (DO NOT commit to version control)
WEATHER_API_KEY=your_openweathermap_api_key_here
MAPS_API_KEY=your_google_maps_api_key_here
```

**✅ Checklist:**
- [ ] OpenWeatherMap API key added
- [ ] Google Maps API key added
- [ ] File not committed to git

---

### ✅ **2. Update AndroidManifest.xml**
**File**: `app/src/main/AndroidManifest.xml`
**Purpose**: Configure Maps API key

```xml
<!-- Google Maps API Key -->
<meta-data
    android:name="com.google.android.geo.API_KEY"
    android:value="YOUR_ACTUAL_MAPS_API_KEY" />
```

**✅ Checklist:**
- [ ] Placeholder replaced with actual Maps API key
- [ ] Meta-data tag properly formatted

---

### ✅ **3. Replace google-services.json**
**File**: `app/google-services.json`
**Purpose**: Firebase configuration

**✅ Checklist:**
- [ ] Placeholder file replaced with actual Firebase config
- [ ] Package name matches: `com.example.smartfarm`
- [ ] All required services enabled

---

## 🎯 **Phase 3: Testing & Validation**

### ✅ **1. Build and Test**
```bash
# Clean and build
./gradlew clean build

# Test debug build
./gradlew assembleDebug

# Test release build
./gradlew assembleRelease
```

**✅ Checklist:**
- [ ] Project builds successfully
- [ ] No API key errors
- [ ] All dependencies resolved

---

### ✅ **2. Test API Integrations**
1. **Test Google Maps**
   - Launch app
   - Navigate to map screen
   - Verify map loads correctly

2. **Test Weather Data**
   - Navigate to weather screen
   - Verify weather data displays
   - Check for API call errors

3. **Test Google Sign-In**
   - Try to sign in with Google
   - Verify authentication works

4. **Test Calendar Integration**
   - Try to add calendar event
   - Verify calendar permissions

**✅ Checklist:**
- [ ] Maps functionality working
- [ ] Weather data loading
- [ ] Google Sign-In working
- [ ] Calendar integration working

---

## 🎯 **Phase 4: Production Setup**

### ✅ **1. Production API Keys**
- Create separate API keys for production
- Apply stricter restrictions
- Set up billing alerts

### ✅ **2. Security Measures**
- Enable API key restrictions
- Set up usage quotas
- Configure monitoring alerts

### ✅ **3. Documentation**
- Document API key management
- Create troubleshooting guide
- Update team documentation

---

## 🚨 **Critical Security Notes**

### **⚠️ NEVER Commit API Keys**
- Use `local.properties` for local development
- Use environment variables for CI/CD
- Keep API keys out of version control

### **⚠️ Always Restrict API Keys**
- Restrict to specific apps
- Limit to required APIs only
- Set up usage quotas

### **⚠️ Monitor Usage**
- Enable billing alerts
- Track API usage
- Set up cost monitoring

---

## 📞 **Support Resources**

### **Google Services**
- Google Cloud Console: https://console.cloud.google.com/
- Firebase Console: https://console.firebase.google.com/
- Google Maps Documentation: https://developers.google.com/maps

### **OpenWeatherMap**
- API Documentation: https://openweathermap.org/api
- Support: https://openweathermap.org/support

### **Troubleshooting**
- Check API key validity
- Verify package name matches
- Check SHA-1 fingerprint
- Review API quotas and billing

---

## ✅ **Final Checklist**

### **Before Development**
- [ ] All API keys obtained
- [ ] Configuration files updated
- [ ] Build successful
- [ ] Basic functionality tested

### **Before Testing**
- [ ] All integrations working
- [ ] Error handling implemented
- [ ] Performance acceptable
- [ ] Security measures in place

### **Before Production**
- [ ] Production API keys ready
- [ ] Proper restrictions applied
- [ ] Monitoring configured
- [ ] Documentation complete

### **Before App Store**
- [ ] All placeholders replaced
- [ ] API usage within limits
- [ ] Security audit passed
- [ ] Support documentation ready

---

## 🎯 **Next Steps**

1. **Start with Google Maps API** (most critical)
2. **Set up Firebase project** (for authentication and analytics)
3. **Configure OpenWeatherMap** (for weather data)
4. **Enable Google Calendar API** (for calendar features)
5. **Test all integrations thoroughly**
6. **Set up production configurations**

**Status**: 🚀 **READY TO CONFIGURE** - Follow this checklist step by step to complete API setup. 