# Google Maps API Setup Guide for SmartFarm

## 🗺️ **Google Maps API Key Setup**

This guide will help you set up a proper Google Maps API key for the SmartFarm app.

---

## **🚨 Critical Issue Fixed**

- ❌ **Before**: Fake API key `AIzaSyBQJQJQJQJQJQJQJQJQJQJQJQJQJQJQJQ` (causes crashes)
- ✅ **After**: Secure API key management with local.properties

---

## **📋 Prerequisites**

1. **Google Account** with billing enabled
2. **Android Studio** or access to project files
3. **SmartFarm project** with updated build configuration

---

## **🔑 Step 1: Get Google Maps API Key**

### **1.1 Go to Google Cloud Console**
- Visit: https://console.cloud.google.com/
- Sign in with your Google account

### **1.2 Create/Select Project**
- Click on project dropdown at the top
- Click "New Project" or select existing project
- Give it a name like "SmartFarm Maps"

### **1.3 Enable Maps SDK for Android**
- In the left sidebar, click "APIs & Services" → "Library"
- Search for "Maps SDK for Android"
- Click on it and click "Enable"

### **1.4 Create API Key**
- Go to "APIs & Services" → "Credentials"
- Click "Create Credentials" → "API Key"
- Copy the generated API key

---

## **🔒 Step 2: Secure Your API Key**

### **2.1 Restrict API Key (IMPORTANT!)**
- Click on your newly created API key
- Under "Application restrictions", select "Android apps"
- Click "Add package name and fingerprint"
- Add your package: `com.yourcompany.smartfarm`
- Get your SHA-1 fingerprint (see instructions below)

### **2.2 Get SHA-1 Fingerprint**
```bash
# Debug keystore (for development)
keytool -list -v -keystore ~/.android/debug.keystore -alias androiddebugkey -storepass android -keypass android

# Release keystore (for production)
keytool -list -v -keystore path/to/your/release-keystore.jks -alias your-key-alias
```

---

## **⚙️ Step 3: Configure Your Project**

### **3.1 Update local.properties**
- Open `app/local.properties` in your project
- Replace `YOUR_ACTUAL_MAPS_API_KEY_HERE` with your real API key:

```properties
# Google Maps API Key
MAPS_API_KEY=AIzaSyC...your_actual_key_here...XYZ
```

### **3.2 Verify Build Configuration**
Your `app/build.gradle.kts` should already be configured to:
- Load API keys from `local.properties`
- Generate `BuildConfig.MAPS_API_KEY`
- Use `${MAPS_API_KEY}` in AndroidManifest.xml

---

## **🧪 Step 4: Test the Setup**

### **4.1 Clean and Rebuild**
```bash
./gradlew clean
./gradlew build
```

### **4.2 Verify API Key Loading**
- Check that `BuildConfig.MAPS_API_KEY` contains your key
- Verify no build errors related to API keys

### **4.3 Test Maps Functionality**
- Run the app on a device/emulator
- Navigate to any screen with maps
- Verify maps load without crashes

---

## **🚨 Security Best Practices**

### **✅ DO:**
- Keep API keys in `local.properties` (not committed to git)
- Restrict API keys to your app's package name
- Use different keys for debug/release builds
- Monitor API usage in Google Cloud Console

### **❌ DON'T:**
- Commit API keys to version control
- Share API keys publicly
- Use the same key for multiple apps
- Leave API keys unrestricted

---

## **🔧 Troubleshooting**

### **Common Issues:**

#### **1. "API key not valid" error**
- Check that you've enabled "Maps SDK for Android"
- Verify the API key is correct in `local.properties`
- Ensure the key is restricted to your package name

#### **2. Maps not loading**
- Check internet connection
- Verify location permissions are granted
- Check logcat for specific error messages

#### **3. Build errors**
- Ensure `local.properties` exists and has correct format
- Verify `buildFeatures.buildConfig = true` is set
- Clean and rebuild project

---

## **📱 Production Deployment**

### **Release Build**
- Use a separate API key for production
- Ensure production API key is properly restricted
- Test release build thoroughly before Play Store upload

### **API Key Rotation**
- Regularly rotate your API keys
- Monitor usage for any unauthorized access
- Have a plan for key rotation without app updates

---

## **📊 Monitoring and Usage**

### **Google Cloud Console**
- Monitor API usage and costs
- Set up billing alerts
- Track API quota usage

### **App Analytics**
- Monitor maps-related crashes
- Track user engagement with maps features
- Identify performance issues

---

## **✅ Verification Checklist**

- [ ] Google Maps API key obtained from Google Cloud Console
- [ ] Maps SDK for Android enabled
- [ ] API key restricted to `com.smartfarm.app`
- [ ] `local.properties` updated with real API key
- [ ] Project builds without errors
- [ ] Maps functionality works in app
- [ ] No API key-related crashes
- [ ] API key not committed to version control

---

## **🎯 Next Steps**

After completing this setup:

1. **Test thoroughly** - Ensure all maps features work
2. **Monitor usage** - Check Google Cloud Console regularly
3. **Prepare for Play Store** - Your app is now ready for upload
4. **Consider other APIs** - Weather, Places, etc. if needed

---

## **🚀 Success!**

Your SmartFarm app now has:
- ✅ **Secure API key management**
- ✅ **Production-ready Google Maps integration**
- ✅ **No more placeholder keys**
- ✅ **Play Store compliant setup**

**Your app is ready for Google Play Store upload! 🎉**
