# Complete Railway Variables Guide for SmartFarm Web Component

## 🚨 ESSENTIAL Variables (Required for Basic Operation)

### Core Server Variables
```
NODE_ENV = production
PORT = 3000
LOG_LEVEL = info
```

## 🔧 FUNCTIONAL Variables (For Full Features)

### API Configuration
```
VITE_API_URL = https://smartfarm-backend.railway.app
VITE_API_BASE_URL = https://smartfarm-backend.railway.app
NEXT_PUBLIC_API_BASE_URL = https://smartfarm-backend.railway.app
```

### External Services
```
VITE_OPENWEATHER_API_KEY = your_openweathermap_api_key
VITE_WEATHER_API_KEY = your_openweathermap_api_key
VITE_MAPS_API_KEY = your_google_maps_api_key
OPENWEATHER_API_KEY = your_openweathermap_api_key
```

### Security & Authentication
```
JWT_SECRET = your_jwt_secret_here
SESSION_SECRET = your_session_secret_here
```

### Database (if using external DB)
```
DATABASE_URL = your_database_connection_string
```

## 🎛️ FEATURE FLAGS (Optional - Enable/Disable Features)

### Core Features
```
VITE_FEATURE_GEOFENCING = true
VITE_FEATURE_AI_ADVISORY = true
VITE_FEATURE_BYPRODUCTS = true
VITE_FEATURE_SUBSCRIPTIONS = true
VITE_FEATURE_ADS = false
```

### Demo Mode
```
VITE_DEMO_ENABLED = false
```

## 📊 MONITORING & ERROR TRACKING (Optional)

### Error Tracking (Sentry)
```
SENTRY_DSN = your_sentry_dsn_here
APP_VERSION = 1.0.2
```

### CORS Configuration
```
CORS_ORIGINS = https://www.smartfarm-app.com,https://smartfarm-app.com,http://localhost:3000,http://localhost:8080
```

## 🚀 QUICK SETUP (Minimum Required)

### For Basic Operation (Copy to Railway Variables):
```
NODE_ENV = production
PORT = 3000
LOG_LEVEL = info
VITE_API_URL = https://smartfarm-backend.railway.app
```

### For Full Features (Copy to Railway Variables):
```
NODE_ENV = production
PORT = 3000
LOG_LEVEL = info
VITE_API_URL = https://smartfarm-backend.railway.app
VITE_OPENWEATHER_API_KEY = your_weather_api_key
VITE_MAPS_API_KEY = your_maps_api_key
VITE_FEATURE_AI_ADVISORY = true
VITE_FEATURE_GEOFENCING = true
```

## 📋 How to Add Variables in Railway:

1. Go to Railway Dashboard → Web Component → Variables Tab
2. Click "+ New Variable" for each variable above
3. OR use "{ } Raw Editor" and paste JSON format:
```json
{
  "NODE_ENV": "production",
  "PORT": "3000",
  "LOG_LEVEL": "info",
  "VITE_API_URL": "https://smartfarm-backend.railway.app",
  "VITE_OPENWEATHER_API_KEY": "your_weather_api_key",
  "VITE_MAPS_API_KEY": "your_maps_api_key"
}
```

## ⚠️ Priority Order:
1. **ESSENTIAL** - Add these first to get basic deployment working
2. **FUNCTIONAL** - Add these for full API connectivity
3. **FEATURE FLAGS** - Add these to enable specific features
4. **MONITORING** - Add these for production monitoring
