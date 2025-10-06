# Railway Backend API Environment Variables

## 🚀 **Required Environment Variables for smartfarm-app-production.up.railway.app**

### **Core Application Variables**

| Variable | Value | Description |
|----------|-------|-------------|
| `PORT` | `3000` | Port for the API server (Railway sets this automatically) |
| `NODE_ENV` | `production` | Node.js environment |

### **CI/CD Configuration Variables**

| Variable | Value | Description |
|----------|-------|-------------|
| `CI` | `1` | Enables CI mode, disables Husky hooks |
| `HUSKY` | `0` | Disables Husky Git hooks in CI environment |

### **CORS Configuration (Optional)**

| Variable | Value | Description |
|----------|-------|-------------|
| `CORS_ORIGIN` | `https://web-production-86d39.up.railway.app` | Allowed CORS origins (comma-separated) |

### **API Keys (Required for Full Functionality)**

| Variable | Value | Description |
|----------|-------|-------------|
| `GOOGLE_API_KEY` | `your-google-api-key` | Google Maps and Places API key |
| `OPENWEATHER_API_KEY` | `your-openweather-api-key` | OpenWeather API key for weather data |

### **Optional Google API Keys (for specific services)**

| Variable | Value | Description |
|----------|-------|-------------|
| `GOOGLE_MAPS_API_KEY` | `your-google-maps-key` | Specific Maps API key (falls back to GOOGLE_API_KEY) |
| `GOOGLE_GEOCODING_API_KEY` | `your-geocoding-key` | Geocoding API key (falls back to GOOGLE_API_KEY) |
| `GOOGLE_PLACES_API_KEY` | `your-places-key` | Places API key (falls back to GOOGLE_API_KEY) |

### **Firebase Configuration (Optional)**

| Variable | Value | Description |
|----------|-------|-------------|
| `FIREBASE_PROJECT_ID` | `smart-farm-291d5` | Firebase project ID (has default) |
| `FIREBASE_API_KEY` | `your-firebase-api-key` | Firebase API key (falls back to GOOGLE_API_KEY) |
| `FIREBASE_AUTH_DOMAIN` | `smart-farm-291d5.firebaseapp.com` | Firebase auth domain (has default) |
| `FIREBASE_STORAGE_BUCKET` | `smart-farm-291d5.firebasestorage.app` | Firebase storage bucket (has default) |

### **Railway-Specific Variables (Auto-set by Railway)**

| Variable | Value | Description |
|----------|-------|-------------|
| `RAILWAY_ENVIRONMENT` | `production` | Railway environment identifier |
| `RAILWAY_PROJECT_ID` | `auto-set` | Railway project ID |
| `RAILWAY_SERVICE_ID` | `auto-set` | Railway service ID |

## 📋 **How to Add These Variables in Railway**

### **Step 1: Access Railway Dashboard**
1. Go to [railway.app](https://railway.app)
2. Navigate to your `smartfarm-app-production` service
3. Click on the service name

### **Step 2: Add Environment Variables**
1. Go to **Variables** tab
2. Click **+ New Variable** for each variable
3. Add the variables listed above

### **Step 3: Verify Configuration**
1. Check that all variables are set correctly
2. Redeploy the service to apply changes
3. Monitor the deployment logs

## 🔧 **Quick Copy-Paste Commands**

### **Essential Variables (Minimum Required):**
```
NODE_ENV=production
CI=1
HUSKY=0
CORS_ORIGIN=https://web-production-86d39.up.railway.app
```

### **With API Keys (Recommended for Full Functionality):**
```
NODE_ENV=production
CI=1
HUSKY=0
CORS_ORIGIN=https://web-production-86d39.up.railway.app
GOOGLE_API_KEY=your-google-api-key-here
OPENWEATHER_API_KEY=your-openweather-api-key-here
```

### **Complete Configuration (All Features):**
```
NODE_ENV=production
CI=1
HUSKY=0
CORS_ORIGIN=https://web-production-86d39.up.railway.app
GOOGLE_API_KEY=your-google-api-key-here
OPENWEATHER_API_KEY=your-openweather-api-key-here
GOOGLE_MAPS_API_KEY=your-google-maps-key-here
GOOGLE_GEOCODING_API_KEY=your-geocoding-key-here
GOOGLE_PLACES_API_KEY=your-places-key-here
FIREBASE_PROJECT_ID=smart-farm-291d5
FIREBASE_API_KEY=your-firebase-api-key-here
FIREBASE_AUTH_DOMAIN=smart-farm-291d5.firebaseapp.com
FIREBASE_STORAGE_BUCKET=smart-farm-291d5.firebasestorage.app
```

## ⚠️ **Important Notes**

1. **Port**: Railway automatically sets `PORT`, don't override it
2. **CORS**: Set `CORS_ORIGIN` to your frontend URL for security
3. **API Keys**: Required for maps, weather, and location features
4. **Security**: Never commit actual API keys to version control
5. **Fallbacks**: Some API keys fall back to `GOOGLE_API_KEY` if not set

## 🧪 **Testing After Setup**

1. **Deploy**: Trigger a new deployment after adding variables
2. **Check Logs**: Verify no errors in build logs
3. **Test API**: Visit your Railway URL + `/api/health`
4. **Test Endpoints**: Check that all API endpoints respond correctly

## 🚨 **Troubleshooting**

### **If API Returns 500 Errors:**
- Check that all required API keys are set
- Verify CORS_ORIGIN matches your frontend URL
- Check Railway logs for specific error messages

### **If Maps/Weather Features Don't Work:**
- Ensure `GOOGLE_API_KEY` and `OPENWEATHER_API_KEY` are set
- Verify API keys are valid and have proper permissions
- Check API key quotas and billing

### **If CORS Errors Occur:**
- Verify `CORS_ORIGIN` is set to your frontend URL
- Check that the frontend URL matches exactly
- Ensure no trailing slashes in the CORS_ORIGIN value

## 🔗 **API Endpoints Available**

- `GET /api/health` - Health check
- `GET /api` - API information
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/farms` - Get farms
- `POST /api/farms` - Create farm
- `GET /api/crops` - Get crops
- `POST /api/crops` - Create crop
- `GET /api/livestock` - Get livestock
- `POST /api/livestock` - Create livestock
