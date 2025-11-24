# 🚀 Quick Start: Android + Shared Backend

## ✅ Already Configured

Your Android app is **already set up** to use the shared Railway backend!

### Current Configuration

1. **API Base URL:** `https://smartfarm-app-production.up.railway.app/api`
2. **Service Type:** `REAL_API` (configured in `ServiceFactory.kt`)
3. **Environment:** `PRODUCTION`

---

## 🔍 Verify Configuration

### 1. Check API Config

**File:** `shared/src/commonMain/kotlin/com/yourcompany/smartfarm/shared/config/ApiConfig.kt`

```kotlin
val currentEnvironment = Environment.PRODUCTION
// Base URL: https://smartfarm-app-production.up.railway.app/api
```

### 2. Check Service Factory

**File:** `shared/src/commonMain/kotlin/com/yourcompany/smartfarm/shared/services/ServiceFactory.kt`

```kotlin
val currentServiceType = ServiceType.REAL_API
// Uses RealApiService (connects to Railway backend)
```

---

## 🧪 Test Connection

### In Android Studio:

1. **Run the app**
2. **Check Logcat** for API calls:
   ```
   🌐 Using Real API Service
   🌐 HTTP GET: https://smartfarm-app-production.up.railway.app/api/farms
   ```

3. **Test Health Endpoint:**
   ```kotlin
   val apiService = ServiceFactory.getDataService() as? RealApiService
   val connected = apiService?.testConnection() ?: false
   println("Backend connected: $connected")
   ```

---

## 📱 Development vs Production

### For Local Development:

1. **Start local backend:**
   ```bash
   cd backend
   npm run dev
   ```

2. **Update ApiConfig.kt:**
   ```kotlin
   val currentEnvironment = Environment.DEVELOPMENT
   // Uses: http://10.0.2.2:3000/api (Android Emulator)
   ```

### For Production:

```kotlin
val currentEnvironment = Environment.PRODUCTION
// Uses: https://smartfarm-app-production.up.railway.app/api
```

---

## 🔐 Authentication Flow

1. **User registers/logs in** → Backend returns JWT token
2. **Store token securely** → Android Keystore or EncryptedSharedPreferences
3. **Set token in API service:**
   ```kotlin
   val apiService = ServiceFactory.getDataService() as? RealApiService
   apiService.setAuthToken("your-jwt-token")
   ```
4. **All subsequent API calls** include the token automatically

---

## 📊 Data Sync

Since Android and Web use the same backend:

- ✅ **Same user accounts** - Login works on both
- ✅ **Same farms** - Created on Web, visible on Android
- ✅ **Same crops** - Added on Android, shows on Web
- ✅ **Same livestock** - Synced across all devices

---

## 🐛 Common Issues

### "Connection refused"
- ✅ Check Railway backend is running: `curl https://smartfarm-app-production.up.railway.app/api/health`
- ✅ Verify Internet permission in `AndroidManifest.xml`

### "401 Unauthorized"
- ✅ Ensure user is logged in
- ✅ Set auth token: `apiService.setAuthToken(token)`

### "404 Not Found"
- ✅ Verify endpoint path matches backend routes
- ✅ Check base URL includes `/api` prefix

---

## 📚 Full Documentation

See `ANDROID_BACKEND_SETUP.md` for complete setup guide.

---

## ✅ Summary

**Your Android app is ready to use the shared backend!**

- ✅ API URL configured
- ✅ Real API service enabled
- ✅ Same endpoints as web app
- ✅ Data syncs automatically

**Next:** Test the connection and implement authentication token storage.

