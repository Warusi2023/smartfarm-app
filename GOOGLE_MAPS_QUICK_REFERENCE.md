# 🗺️ Google Maps API - Quick Reference Card

## **📱 Your App Details**
- **Package Name**: `com.yourcompany.smartfarm`
- **SHA-1 Fingerprint**: `3F:98:B1:F4:A2:FA:B7:1C:07:DE:5F:FF:0C:03:9D:C0:8F:2F:DA:4A`
- **Project ID**: `smart-farm-291d5`

## **🔑 Get API Key (5 Steps)**

### **1. Go to Google Cloud Console**
🌐 **URL**: https://console.cloud.google.com/

### **2. Select Your Project**
- Project ID: `smart-farm-291d5`
- Enable billing (required)

### **3. Enable Maps SDK**
- **APIs & Services** → **Library**
- Search: "Maps SDK for Android"
- Click **"Enable"**

### **4. Create API Key**
- **APIs & Services** → **Credentials**
- Click **"+ CREATE CREDENTIALS"** → **"API key"**
- Copy the generated key (starts with `AIzaSy...`)

### **5. Restrict API Key (CRITICAL!)**
- Click **pencil icon** next to your API key
- **Application restrictions**: Select **"Android apps"**
- **Add package name and fingerprint**:
  - Package: `com.yourcompany.smartfarm`
  - SHA-1: `3F:98:B1:F4:A2:FA:B7:1C:07:DE:5F:FF:0C:03:9D:C0:8F:2F:DA:4A`

## **📝 Update Your App**

### **Option 1: Use the Script (Recommended)**
```bash
.\update-maps-api.ps1
```

### **Option 2: Manual Update**
Edit `app/local.properties`:
```properties
MAPS_API_KEY=AIzaSy...your_actual_key_here...XYZ
```

## **🧪 Test Your Setup**

### **1. Test Build**
```bash
.\gradlew assembleDebug
```

### **2. Build Release APK**
```bash
.\gradlew assembleRelease
```

### **3. Test on Device**
- Install APK
- Verify Google Maps loads
- Check for any API key errors

## **🚨 Common Issues**

### **API Key Not Restricted**
- **Error**: "This API project is not authorized"
- **Fix**: Restrict API key to your Android app

### **Wrong Package Name**
- **Error**: "No matching client found"
- **Fix**: Verify package name in google-services.json

### **Billing Not Enabled**
- **Error**: "Billing has not been enabled"
- **Fix**: Enable billing in Google Cloud Console

## **🔒 Security Best Practices**

- ✅ **Always restrict API keys** to your app
- ✅ **Never commit API keys** to version control
- ✅ **Use different keys** for debug/release builds
- ✅ **Monitor API usage** in Google Cloud Console

## **📞 Need Help?**

- **Google Cloud Documentation**: https://cloud.google.com/maps-platform
- **Maps SDK for Android**: https://developers.google.com/maps/documentation/android-sdk
- **API Key Restrictions**: https://cloud.google.com/docs/authentication/api-keys

---

**Your SmartFarm app will be ready for Google Maps once you complete these steps!** 🚀
