# ✅ Android & Web - Shared Backend Configuration Complete

## 🎯 Summary

Both your **Android app** and **Web app** now use the **same Railway backend**:

**Backend URL:** `https://smartfarm-app-production.up.railway.app`

---

## ✅ What Was Configured

### 1. Android App (`android-project/`)

**Updated Files:**
- ✅ `shared/src/commonMain/kotlin/com/yourcompany/smartfarm/shared/config/ApiConfig.kt`
  - Production URL: `https://smartfarm-app-production.up.railway.app/api`
  - Development URL: `http://10.0.2.2:3000/api` (for Android Emulator)

**Already Configured:**
- ✅ `ServiceFactory.kt` → Uses `REAL_API` by default
- ✅ `AndroidManifest.xml` → Has INTERNET permission
- ✅ `RealApiService.kt` → Ready to connect to backend

### 2. Web App (`public/`)

**Already Configured:**
- ✅ `js/api-config.js` → Points to Railway backend
- ✅ All API calls use shared backend

---

## 🏗️ Architecture

```
┌─────────────────┐         ┌─────────────────┐
│   Web App       │         │  Android App    │
│  (HTML/JS)      │         │  (Kotlin)      │
└────────┬────────┘         └────────┬────────┘
         │                           │
         │  HTTP/REST API            │
         │                           │
         └───────────┬───────────────┘
                     │
         ┌───────────▼───────────────┐
         │   Railway Backend         │
         │   Node.js + Express       │
         │   PostgreSQL Database     │
         └────────────────────────────┘
```

---

## 🔌 Shared API Endpoints

Both apps use the same endpoints:

### Authentication
- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/verify-email/:token`
- `POST /api/auth/resend-verification`

### Core Resources
- `GET /api/farms`
- `POST /api/farms`
- `GET /api/crops`
- `POST /api/crops`
- `GET /api/livestock`
- `POST /api/livestock`
- `GET /api/tasks`
- `GET /api/inventory`

### AI Advisory
- `GET /api/ai-advisory/crop-nutrition/:cropId`
- `GET /api/ai-advisory/livestock-health/:animalId`

### Health Check
- `GET /api/health`

---

## 📱 Data Synchronization

Since both apps use the same backend:

- ✅ **Same user accounts** - Login credentials work on both platforms
- ✅ **Same farms** - Created on Web, immediately visible on Android
- ✅ **Same crops** - Added on Android, shows on Web dashboard
- ✅ **Same livestock** - Health records sync across all devices
- ✅ **Same tasks** - Task management unified
- ✅ **Same inventory** - Stock levels consistent

---

## 🚀 How to Use

### Android App

**Production (Default):**
- Already configured to use Railway backend
- No changes needed

**Local Development:**
1. Start local backend: `cd backend && npm run dev`
2. Update `ApiConfig.kt`:
   ```kotlin
   val currentEnvironment = Environment.DEVELOPMENT
   ```
3. Run Android app → Connects to `http://10.0.2.2:3000/api`

### Web App

**Production:**
- Already configured to use Railway backend
- No changes needed

**Local Development:**
- Update `js/api-config.js` or use environment variables

---

## 🔐 Authentication

Both apps use the same authentication system:

1. **User registers** → Backend creates account
2. **Email verification** → Required before login
3. **Login** → Backend returns JWT token
4. **API calls** → Include JWT token in Authorization header

**Token Format:**
```
Authorization: Bearer <jwt-token>
```

---

## 📚 Documentation

### Android
- **Full Setup Guide:** `android-project/ANDROID_BACKEND_SETUP.md`
- **Quick Start:** `android-project/SHARED_BACKEND_QUICK_START.md`

### Backend
- **Local Development:** `backend/LOCAL_DEVELOPMENT_SETUP.md`
- **API Routes:** `backend/server.js`

---

## ✅ Verification Checklist

### Backend
- [x] Railway backend deployed and running
- [x] Health endpoint accessible: `/api/health`
- [x] CORS configured for web origins
- [x] Database connected and migrations run

### Android App
- [x] API URL configured in `ApiConfig.kt`
- [x] `ServiceFactory` uses `REAL_API`
- [x] Internet permission in `AndroidManifest.xml`
- [x] `RealApiService` ready to use

### Web App
- [x] API URL configured in `api-config.js`
- [x] All API calls use shared backend
- [x] CORS headers accepted

---

## 🧪 Testing

### Test Backend Connection

**From Terminal:**
```bash
curl https://smartfarm-app-production.up.railway.app/api/health
```

**From Android App:**
```kotlin
val apiService = ServiceFactory.getDataService() as? RealApiService
val connected = apiService?.testConnection() ?: false
println("Backend connected: $connected")
```

**From Web App:**
```javascript
fetch('https://smartfarm-app-production.up.railway.app/api/health')
  .then(r => r.json())
  .then(console.log)
```

---

## 🐛 Troubleshooting

### "Connection refused" (Android)
- ✅ Check Railway backend is running
- ✅ Verify `ApiConfig.kt` has correct URL
- ✅ Ensure INTERNET permission in AndroidManifest

### "CORS Error" (Web)
- ✅ Check backend CORS configuration
- ✅ Verify web origin is in allowed list

### "401 Unauthorized"
- ✅ Ensure user is logged in
- ✅ Verify JWT token is valid
- ✅ Check token is included in API requests

---

## 🎉 Benefits

1. **Single Source of Truth** - One database, one API
2. **Consistent Data** - Same farms, crops, livestock everywhere
3. **Easier Maintenance** - Update features once, both apps benefit
4. **Unified Authentication** - Same login works everywhere
5. **Cost Efficient** - One backend to scale and monitor

---

## 📝 Next Steps

1. ✅ **Test Android connection** - Run app and verify API calls
2. ✅ **Implement token storage** - Secure JWT storage in Android
3. ✅ **Test data sync** - Create farm on Web, verify on Android
4. ✅ **Deploy Android app** - Publish to Google Play Store

---

## 📞 Support

- **Backend Issues:** Check `backend/README.md`
- **Android Setup:** See `android-project/ANDROID_BACKEND_SETUP.md`
- **Web Setup:** Check `public/js/api-config.js`

---

**Status:** ✅ **Configuration Complete**

Both Android and Web apps are now connected to the shared Railway backend!

