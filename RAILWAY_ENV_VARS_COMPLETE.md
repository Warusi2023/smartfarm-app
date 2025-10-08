# 🔑 Complete Railway Environment Variables Guide

## 📋 **All Environment Variables Needed**

Add these to your **Backend Service** on Railway:

---

## **1. REQUIRED - Basic Configuration**

These are **REQUIRED** for the backend to work:

```bash
NODE_ENV=production
PORT=3000
API_NAME=SmartFarm
API_VERSION=v1
```

---

## **2. REQUIRED - CORS Configuration**

**CRITICAL** for frontend to connect:

```bash
CORS_ORIGIN=https://smartfarm-app.netlify.app,https://web-production-86d39.up.railway.app
```

**What this does:** Allows your Netlify frontend to make requests to Railway backend

---

## **3. OPTIONAL - API Keys (For Advanced Features)**

These are **OPTIONAL** - backend will work without them, but some features won't work:

### **Google API Key** (for Maps, Geocoding, Places)
```bash
GOOGLE_API_KEY=your_google_api_key_here
```

**Get it from:** https://console.cloud.google.com/apis/credentials

**Used for:**
- Farm location mapping
- Address geocoding
- Place search

### **OpenWeather API Key** (for Weather Data)
```bash
OPENWEATHER_API_KEY=your_openweather_api_key_here
```

**Get it from:** https://openweathermap.org/api

**Used for:**
- Current weather data
- Weather forecasts
- Farm weather conditions

### **Firebase Configuration** (if using Firebase)
```bash
FIREBASE_PROJECT_ID=smart-farm-291d5
FIREBASE_API_KEY=your_firebase_api_key_here
FIREBASE_AUTH_DOMAIN=smart-farm-291d5.firebaseapp.com
FIREBASE_STORAGE_BUCKET=smart-farm-291d5.firebasestorage.app
```

**Get it from:** https://console.firebase.google.com/

**Used for:**
- User authentication
- File storage
- Real-time database

---

## **4. OPTIONAL - Database Configuration** (if using database)

```bash
DATABASE_URL=your_database_connection_string_here
JWT_SECRET=your_secure_random_string_here
```

---

## 🎯 **Minimum Configuration to Get Started**

To just get the backend working (without advanced features):

```bash
# Basic Config
NODE_ENV=production
API_NAME=SmartFarm
API_VERSION=v1

# CORS - CRITICAL!
CORS_ORIGIN=https://smartfarm-app.netlify.app,https://web-production-86d39.up.railway.app
```

**This is enough to:**
- ✅ Start the backend
- ✅ Pass health checks
- ✅ Connect frontend to backend
- ✅ Stop dashboard flickering

---

## 🚀 **How to Add These to Railway**

### **Method 1: Railway Dashboard (Recommended)**

1. **Go to:** Railway Dashboard → Your Backend Service
2. **Click:** "Variables" tab
3. **Click:** "New Variable" button
4. **Add each variable:**
   - Variable name: `NODE_ENV`
   - Value: `production`
   - Click "Add"
5. **Repeat** for each variable
6. **Click:** "Deploy" to apply changes

### **Method 2: Railway CLI**

```bash
railway variables set NODE_ENV=production
railway variables set API_NAME=SmartFarm
railway variables set API_VERSION=v1
railway variables set CORS_ORIGIN=https://smartfarm-app.netlify.app,https://web-production-86d39.up.railway.app
```

---

## 📊 **What Happens Without API Keys**

### **Without GOOGLE_API_KEY:**
- ❌ Maps won't load
- ❌ Location search won't work
- ❌ Geocoding will fail
- ✅ Backend still runs
- ✅ Dashboard still works (with limited features)

### **Without OPENWEATHER_API_KEY:**
- ❌ Weather data won't load
- ❌ Forecasts won't work
- ✅ Backend still runs
- ✅ Dashboard still works (with limited features)

### **Without CORS_ORIGIN:**
- ❌ Frontend CANNOT connect to backend
- ❌ Dashboard will keep flickering
- ❌ API calls will fail with CORS errors
- **THIS IS CRITICAL!**

---

## ✅ **Recommended Setup Order**

### **Phase 1: Get Backend Working (5 minutes)**
```bash
NODE_ENV=production
API_NAME=SmartFarm
API_VERSION=v1
CORS_ORIGIN=https://smartfarm-app.netlify.app,https://web-production-86d39.up.railway.app
```

**Result:** Backend works, dashboard stops flickering

### **Phase 2: Add API Keys Later (when needed)**
```bash
GOOGLE_API_KEY=your_key_here
OPENWEATHER_API_KEY=your_key_here
```

**Result:** Advanced features like maps and weather work

---

## 🧪 **Test After Adding Variables**

### **Step 1: Verify Backend**
```bash
node scripts\ping.mjs
```

**Expected:** Status 200 ✅

### **Step 2: Check Dashboard**
Open: `https://smartfarm-app.netlify.app`

**Expected:**
- ✅ Dashboard loads
- ✅ No flickering
- ✅ Data loads from API

### **Step 3: Check Features**
- If maps don't work → Add `GOOGLE_API_KEY`
- If weather doesn't work → Add `OPENWEATHER_API_KEY`

---

## 📋 **Quick Copy-Paste for Railway**

### **Minimum (Required):**
```
NODE_ENV=production
API_NAME=SmartFarm
API_VERSION=v1
CORS_ORIGIN=https://smartfarm-app.netlify.app,https://web-production-86d39.up.railway.app
```

### **Full (All Features):**
```
NODE_ENV=production
API_NAME=SmartFarm
API_VERSION=v1
CORS_ORIGIN=https://smartfarm-app.netlify.app,https://web-production-86d39.up.railway.app
GOOGLE_API_KEY=your_google_api_key_here
OPENWEATHER_API_KEY=your_openweather_api_key_here
FIREBASE_PROJECT_ID=smart-farm-291d5
FIREBASE_API_KEY=your_firebase_api_key_here
FIREBASE_AUTH_DOMAIN=smart-farm-291d5.firebaseapp.com
FIREBASE_STORAGE_BUCKET=smart-farm-291d5.firebasestorage.app
```

---

## 🎯 **Priority Order**

1. **CRITICAL (Add First):** `CORS_ORIGIN` - Without this, nothing works
2. **Required:** `NODE_ENV`, `API_NAME`, `API_VERSION`
3. **Optional:** `GOOGLE_API_KEY`, `OPENWEATHER_API_KEY` - Add when you need these features
4. **Advanced:** Firebase, Database - Add if you're using these services

---

## 💡 **Pro Tip**

**Start with the minimum configuration:**
1. Add basic + CORS variables
2. Redeploy
3. Test backend
4. If it works, add API keys later as needed

**Don't wait for API keys!** Get the backend working first, then add features incrementally.

---

## 🚀 **Next Steps**

1. **Add minimum variables** to Railway (4 variables)
2. **Redeploy** backend
3. **Test** with `node scripts\ping.mjs`
4. **Check** dashboard - should stop flickering
5. **Add API keys** later when you need those features

**Start with CORS_ORIGIN - that's the most critical one!** 🎯
