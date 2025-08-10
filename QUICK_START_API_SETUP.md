# 🚀 Quick Start: SmartFarm API Setup

## **Immediate Action Required**

Your SmartFarm app is ready for API configuration! Follow these steps to get all services working.

---

## **Step 1: Get Your API Keys (30 minutes)**

### **🔑 1. Google Maps API Key**
**Priority**: 🔴 **CRITICAL**
1. Go to: https://console.cloud.google.com/
2. Create new project: "SmartFarm-API"
3. Enable "Maps SDK for Android"
4. Create API key and restrict to Android app
5. **Package name**: `com.example.smartfarm`

### **🌤️ 2. OpenWeatherMap API Key**
**Priority**: 🔴 **CRITICAL**
1. Go to: https://openweathermap.org/api
2. Create free account
3. Get API key (1000 calls/day free)
4. Test with: `https://api.openweathermap.org/data/2.5/weather?q=London&appid=YOUR_KEY`

### **🔥 3. Firebase Configuration**
**Priority**: 🔴 **CRITICAL**
1. Go to: https://console.firebase.google.com/
2. Create project: "SmartFarm-App"
3. Add Android app with package: `com.example.smartfarm`
4. Download `google-services.json`

### **📅 4. Google Calendar API**
**Priority**: 🟡 **IMPORTANT**
1. In Google Cloud Console (same project as Maps)
2. Enable "Google Calendar API"
3. Create OAuth 2.0 credentials for Android

---

## **Step 2: Update Configuration Files (10 minutes)**

### **📝 1. Update local.properties**
```properties
# Add these lines to local.properties
WEATHER_API_KEY=your_openweathermap_api_key_here
MAPS_API_KEY=your_google_maps_api_key_here
```

### **📱 2. Replace google-services.json**
- Replace `app/google-services.json` with your downloaded file

### **🔧 3. Update AndroidManifest.xml**
```xml
<!-- Replace placeholder in AndroidManifest.xml -->
<meta-data
    android:name="com.google.android.geo.API_KEY"
    android:value="YOUR_ACTUAL_MAPS_API_KEY" />
```

---

## **Step 3: Test Your Setup (5 minutes)**

### **🧪 Run Validation Script**
```powershell
# Run the validation script
.\API_SETUP_SCRIPT.ps1 -Validate
```

### **🔨 Build and Test**
```bash
# Clean and build
./gradlew clean build

# Test debug build
./gradlew assembleDebug
```

---

## **Step 4: Verify Integrations (10 minutes)**

### **✅ Test Each Feature**
1. **Maps**: Launch app → Map screen → Should show map
2. **Weather**: Weather screen → Should show weather data
3. **Sign-In**: Try Google Sign-In → Should work
4. **Calendar**: Try adding calendar event → Should work

---

## **🚨 Critical Security Checklist**

### **🔒 Before You Start**
- [ ] Never commit API keys to git
- [ ] Use `local.properties` for local development
- [ ] Restrict API keys to your app only
- [ ] Set up billing alerts for Google Cloud

### **🔒 After Setup**
- [ ] Test all features work
- [ ] Check API usage limits
- [ ] Set up monitoring alerts
- [ ] Document your API keys securely

---

## **📞 Quick Support**

### **Need Help?**
- **Google Maps**: https://developers.google.com/maps
- **OpenWeatherMap**: https://openweathermap.org/api
- **Firebase**: https://console.firebase.google.com/
- **Google Cloud**: https://console.cloud.google.com/

### **Common Issues**
- **Maps not loading**: Check API key restrictions
- **Weather not working**: Verify API key in local.properties
- **Build errors**: Check google-services.json is valid
- **Sign-in failing**: Verify OAuth configuration

---

## **🎯 Success Checklist**

### **✅ Ready for Development**
- [ ] All API keys obtained
- [ ] Configuration files updated
- [ ] Build successful
- [ ] Basic functionality tested

### **✅ Ready for Testing**
- [ ] All integrations working
- [ ] Error handling implemented
- [ ] Performance acceptable
- [ ] Security measures in place

### **✅ Ready for Production**
- [ ] Production API keys ready
- [ ] Proper restrictions applied
- [ ] Monitoring configured
- [ ] Documentation complete

---

## **⏱️ Time Estimate**

- **API Key Setup**: 30 minutes
- **Configuration**: 10 minutes
- **Testing**: 15 minutes
- **Total**: ~55 minutes

---

## **🚀 Next Steps After Setup**

1. **Test all app features thoroughly**
2. **Set up production API keys**
3. **Configure monitoring and alerts**
4. **Prepare for app store submission**

---

## **💡 Pro Tips**

1. **Start with Google Maps** - Most critical for app functionality
2. **Use the validation script** - Automatically checks your setup
3. **Test on real device** - Some features don't work in emulator
4. **Keep API keys secure** - Never share or commit them
5. **Monitor usage** - Set up alerts to avoid unexpected charges

---

**🎉 You're ready to go! Follow these steps and your SmartFarm app will be fully functional with all API integrations working perfectly.** 