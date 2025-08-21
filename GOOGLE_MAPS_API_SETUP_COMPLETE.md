# Google Maps API Key Setup - Complete Guide

## 🗺️ **SmartFarm Google Maps API Setup**

This guide will walk you through setting up a real Google Maps API key for your SmartFarm app.

---

## **📋 Prerequisites**

- Google account with billing enabled
- Access to Google Cloud Console
- SmartFarm app package name: `com.yourcompany.smartfarm`

---

## **🚀 Step-by-Step Setup**

### **Step 1: Access Google Cloud Console**

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Sign in with your Google account
3. Create a new project or select existing one
4. **Enable billing** (required for API usage)

### **Step 2: Enable Maps SDK for Android**

1. In the left sidebar, click **"APIs & Services"** → **"Library"**
2. Search for **"Maps SDK for Android"**
3. Click on **"Maps SDK for Android"**
4. Click **"Enable"**

### **Step 3: Create API Key**

1. Go to **"APIs & Services"** → **"Credentials"**
2. Click **"+ CREATE CREDENTIALS"** → **"API key"**
3. Copy the generated API key (starts with `AIzaSy...`)

### **Step 4: Restrict API Key (CRITICAL for Security)**

1. Click on the **pencil icon** next to your API key
2. Under **"Application restrictions"**, select **"Android apps"**
3. Click **"Add package name and fingerprint"**
4. Add your package: `com.yourcompany.smartfarm`
5. Get your SHA-1 fingerprint (see instructions below)

### **Step 5: Get SHA-1 Fingerprint**

Run this command in your project directory:

```bash
keytool -list -v -keystore smartfarm-upload-key.jks -alias smartfarm-upload-key -storepass smartfarm123
```

Look for the **SHA1** line in the output.

### **Step 6: Update Your Configuration**

1. Open `app/local.properties`
2. Replace the placeholder with your real API key:

```properties
MAPS_API_KEY=AIzaSy...your_actual_key_here...XYZ
```

3. **Save the file**

---

## **🔐 Security Best Practices**

### **✅ DO:**
- Restrict API key to your specific package name
- Restrict API key to Maps SDK for Android only
- Use SHA-1 fingerprint restrictions
- Monitor API usage in Google Cloud Console

### **❌ DON'T:**
- Share your API key publicly
- Commit API keys to version control
- Use unrestricted API keys
- Forget to monitor usage

---

## **🧪 Testing Your API Key**

### **Step 1: Re-enable Google Maps in Manifest**

1. Open `app/src/main/AndroidManifest.xml`
2. Uncomment the Google Maps meta-data section:

```xml
<!-- Google Maps API Key -->
<meta-data
    android:name="com.google.android.geo.API_KEY"
    android:value="${MAPS_API_KEY}" />
```

### **Step 2: Test Build**

```bash
./gradlew assembleDebug
```

### **Step 3: Test in App**

- Run the app on a device/emulator
- Navigate to any map-related screens
- Verify no API key errors

---

## **💰 Cost Information**

- **Maps SDK for Android**: Free tier available
- **Usage limits**: Generous free tier
- **Billing**: Only charged if you exceed free limits
- **Monitoring**: Set up billing alerts in Google Cloud Console

---

## **🚨 Troubleshooting**

### **Common Issues:**

1. **"API key not valid"**
   - Check if API key is correctly copied
   - Verify Maps SDK is enabled
   - Check package name restrictions

2. **"Quota exceeded"**
   - Check usage in Google Cloud Console
   - Verify billing is enabled
   - Consider setting up usage alerts

3. **"Access denied"**
   - Check SHA-1 fingerprint restrictions
   - Verify package name matches exactly
   - Check API key restrictions

---

## **📱 Next Steps After Setup**

1. **Test the API key** in your app
2. **Monitor usage** in Google Cloud Console
3. **Set up billing alerts** for cost control
4. **Prepare for Play Store** upload

---

## **🎯 Success Checklist**

- [ ] Google Cloud Console project created
- [ ] Billing enabled
- [ ] Maps SDK for Android enabled
- [ ] API key generated
- [ ] API key restricted to your package
- [ ] SHA-1 fingerprint added
- [ ] API key updated in local.properties
- [ ] Google Maps re-enabled in AndroidManifest.xml
- [ ] App builds successfully
- [ ] Maps functionality works in app

---

## **🔗 Useful Links**

- [Google Cloud Console](https://console.cloud.google.com/)
- [Maps SDK for Android Documentation](https://developers.google.com/maps/documentation/android-sdk)
- [API Key Best Practices](https://developers.google.com/maps/api-key-best-practices)
- [Billing Setup](https://cloud.google.com/billing/docs/how-to/modify-project)

---

## **💡 Pro Tips**

1. **Start with free tier** - it's generous for most apps
2. **Set up billing alerts** to avoid unexpected charges
3. **Monitor usage regularly** in Google Cloud Console
4. **Use different API keys** for development and production
5. **Keep your keystore secure** - you'll need it for updates

---

**🎉 Once completed, your SmartFarm app will have a real Google Maps API key and be ready for production!**
