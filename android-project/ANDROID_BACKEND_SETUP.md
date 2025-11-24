# 🔗 Android App - Shared Backend Setup Guide

## Overview

The SmartFarm Android app uses the **same backend API** as the web application. Both clients connect to the Railway-hosted backend at:

**Production Backend:** `https://smartfarm-app-production.up.railway.app`

This ensures:
- ✅ **Data Synchronization** - Android and Web see the same farms, crops, livestock
- ✅ **Single Source of Truth** - One database, one API, one set of business logic
- ✅ **Easier Maintenance** - Update features once, both apps benefit
- ✅ **Consistent Security** - Same authentication, authorization, and security measures

---

## 🏗️ Architecture

```
┌─────────────────┐         ┌─────────────────┐
│   Web App       │         │  Android App    │
│  (React/HTML)   │         │  (Kotlin/Compose)│
└────────┬────────┘         └────────┬─────────┘
         │                           │
         │  HTTP/REST API            │
         │                           │
         └───────────┬───────────────┘
                     │
         ┌───────────▼───────────────┐
         │   Railway Backend          │
         │   (Node.js + Express)      │
         │                            │
         │   ┌──────────────────┐    │
         │   │  PostgreSQL DB   │    │
         │   └──────────────────┘    │
         └────────────────────────────┘
```

---

## ⚙️ Configuration

### 1. API Configuration File

The base URL is configured in:
```
android-project/shared/src/commonMain/kotlin/com/yourcompany/smartfarm/shared/config/ApiConfig.kt
```

**Current Settings:**
```kotlin
val currentEnvironment = Environment.PRODUCTION

private val baseUrls = mapOf(
    Environment.DEVELOPMENT to "http://10.0.2.2:3000/api",  // Android Emulator localhost
    Environment.STAGING to "https://smartfarm-app-production.up.railway.app/api",
    Environment.PRODUCTION to "https://smartfarm-app-production.up.railway.app/api"
)
```

### 2. Environment Selection

To switch environments, change `currentEnvironment`:

```kotlin
// For local development (requires local backend running)
val currentEnvironment = Environment.DEVELOPMENT

// For production (Railway backend)
val currentEnvironment = Environment.PRODUCTION
```

**Note:** For Android Emulator:
- Use `10.0.2.2` instead of `localhost` to access your local machine
- For physical device, use your computer's LAN IP (e.g., `http://192.168.1.100:3000/api`)

---

## 🔌 API Endpoints

The Android app uses the same endpoints as the web app:

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/verify-email/:token` - Verify email
- `POST /api/auth/resend-verification` - Resend verification email

### Core Resources
- `GET /api/farms` - List farms
- `POST /api/farms` - Create farm
- `GET /api/crops` - List crops
- `POST /api/crops` - Create crop
- `GET /api/livestock` - List livestock
- `POST /api/livestock` - Create livestock
- `GET /api/tasks` - List tasks
- `GET /api/inventory` - List inventory

### AI Advisory
- `GET /api/ai-advisory/crop-nutrition/:cropId` - Get crop nutrition advice
- `GET /api/ai-advisory/livestock-health/:animalId` - Get livestock health advice

### Health Check
- `GET /api/health` - Backend health status

---

## 🚀 Using Real API vs Mock Data

The Android project has two service implementations:

### 1. Mock Data Service (Default)
**File:** `DataService.kt`
- Uses in-memory mock data
- No network calls
- Good for UI development and testing

### 2. Real API Service
**File:** `RealApiService.kt`
- Connects to Railway backend
- Makes actual HTTP requests
- Falls back to mock data on errors

### Switching to Real API

**Option 1: Update ServiceFactory**

Find `ServiceFactory.kt` and change:

```kotlin
// Current (Mock)
fun createDataService(): DataService {
    return DataService() // Mock data
}

// Change to (Real API)
fun createDataService(): DataService {
    return RealApiService() // Real API calls
}
```

**Option 2: Dependency Injection**

If using DI (Koin, Hilt, etc.), bind `RealApiService` instead of `DataService`.

---

## 🔐 Authentication

### Setting Auth Token

After login, set the JWT token:

```kotlin
val apiService = RealApiService()
apiService.setAuthToken("your-jwt-token-here")
```

The token is automatically included in all subsequent API requests.

### Token Storage

Store tokens securely using:
- **Android Keystore** (recommended)
- **EncryptedSharedPreferences**
- **Secure DataStore**

Example:
```kotlin
// After successful login
val token = response.data.token
saveTokenSecurely(token) // Your secure storage method
apiService.setAuthToken(token)
```

---

## 🧪 Testing Backend Connection

### 1. Test Health Endpoint

```kotlin
val apiService = RealApiService()
val isConnected = apiService.testConnection()
if (isConnected) {
    println("✅ Backend is reachable")
} else {
    println("❌ Backend connection failed")
}
```

### 2. Check API Info

```kotlin
val info = apiService.getApiInfo()
println("Environment: ${info["Environment"]}")
println("Base URL: ${info["Base URL"]}")
```

### 3. Test in Android Studio

1. Open Android Studio
2. Run the app on emulator/device
3. Check Logcat for API calls:
   ```
   🌐 HTTP GET: https://smartfarm-app-production.up.railway.app/api/farms
   ```

---

## 🐛 Troubleshooting

### Issue: "Connection refused" or "Network error"

**Solutions:**
1. **Check Railway backend is running:**
   ```bash
   curl https://smartfarm-app-production.up.railway.app/api/health
   ```

2. **Verify API URL in `ApiConfig.kt`:**
   - Ensure no trailing slashes
   - Use `https://` (not `http://`) for production

3. **Check Android Internet permission:**
   ```xml
   <uses-permission android:name="android.permission.INTERNET" />
   ```

4. **For Android Emulator:**
   - Use `10.0.2.2` instead of `localhost`
   - Ensure local backend is running on `localhost:3000`

### Issue: "401 Unauthorized"

**Solutions:**
1. Check if user is logged in
2. Verify JWT token is valid and not expired
3. Ensure token is set: `apiService.setAuthToken(token)`

### Issue: "404 Not Found"

**Solutions:**
1. Verify endpoint path matches backend routes
2. Check base URL includes `/api` prefix
3. Ensure backend has deployed latest code

### Issue: "CORS Error" (if testing in browser)

**Note:** CORS is not an issue for Android apps (only affects browsers)

---

## 📱 Development Workflow

### Local Development

1. **Start local backend:**
   ```bash
   cd backend
   npm run dev
   ```

2. **Update Android config:**
   ```kotlin
   val currentEnvironment = Environment.DEVELOPMENT
   ```

3. **Run Android app** - It will connect to `http://10.0.2.2:3000/api`

### Production Testing

1. **Ensure Railway backend is deployed**
2. **Update Android config:**
   ```kotlin
   val currentEnvironment = Environment.PRODUCTION
   ```

3. **Run Android app** - It will connect to Railway backend

---

## 🔄 Data Synchronization

Since both Web and Android use the same backend:

- ✅ **Farms created on Web** → Immediately visible on Android
- ✅ **Crops added on Android** → Show up on Web dashboard
- ✅ **Livestock records** → Synced across all devices
- ✅ **User accounts** → Same login works on both platforms

---

## 📚 Related Files

- **API Config:** `shared/src/commonMain/kotlin/com/yourcompany/smartfarm/shared/config/ApiConfig.kt`
- **HTTP Client:** `shared/src/commonMain/kotlin/com/yourcompany/smartfarm/shared/services/HttpClient.kt`
- **Real API Service:** `shared/src/commonMain/kotlin/com/yourcompany/smartfarm/shared/services/RealApiService.kt`
- **Mock Data Service:** `shared/src/commonMain/kotlin/com/yourcompany/smartfarm/shared/services/DataService.kt`
- **Service Factory:** `shared/src/commonMain/kotlin/com/yourcompany/smartfarm/shared/services/ServiceFactory.kt`

---

## ✅ Summary

1. ✅ Android app configured to use Railway backend
2. ✅ Same API endpoints as web app
3. ✅ Shared database and authentication
4. ✅ Easy switching between mock and real API
5. ✅ Data syncs automatically between Web and Android

**Next Steps:**
- Switch `ServiceFactory` to use `RealApiService` for production
- Implement secure token storage
- Test all API endpoints
- Deploy Android app with production backend URL

---

**Need Help?** Check backend documentation:
- `backend/README.md`
- `backend/LOCAL_DEVELOPMENT_SETUP.md`
- `backend/server.js` (API routes)

