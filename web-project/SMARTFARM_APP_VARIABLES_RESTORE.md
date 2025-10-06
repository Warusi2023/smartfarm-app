# SmartFarm-App Component - Variable Restoration Guide

## 🚨 **URGENT: Restore Deleted Variables**

Your `smartfarm-app` component is missing essential variables. Here's how to restore them:

## 📋 **Step 1: Go to SmartFarm-App Variables**

1. Open Railway Dashboard
2. Click on **"smartfarm-app"** component (not web)
3. Go to **"Variables"** tab
4. You should see only Railway system variables and a few API URLs

## 🔧 **Step 2: Add Essential Variables**

### **Method A: Raw Editor (Fastest)**

1. Click **"{ } Raw Editor"** button
2. You should see existing variables. **DON'T DELETE THEM**
3. Add these missing variables to the JSON:

```json
{
  "NODE_ENV": "production",
  "PORT": "8080",
  "LOG_LEVEL": "info",
  "WEATHER_API_KEY": "your_openweathermap_api_key_here",
  "GOOGLE_MAPS_API_KEY": "your_google_maps_api_key_here",
  "JWT_SECRET": "your_jwt_secret_here",
  "SESSION_SECRET": "your_session_secret_here",
  "DATABASE_URL": "your_database_connection_string_here",
  "CORS_ORIGINS": "https://www.smartfarm-app.com,https://smartfarm-app.com,http://localhost:3000,http://localhost:8080"
}
```

### **Method B: Individual Variables**

Click **"+ New Variable"** and add each one:

```
NODE_ENV = production
PORT = 8080
LOG_LEVEL = info
WEATHER_API_KEY = your_openweathermap_api_key_here
GOOGLE_MAPS_API_KEY = your_google_maps_api_key_here
JWT_SECRET = your_jwt_secret_here
SESSION_SECRET = your_session_secret_here
DATABASE_URL = your_database_connection_string_here
CORS_ORIGINS = https://www.smartfarm-app.com,https://smartfarm-app.com,http://localhost:3000,http://localhost:8080
```

## 🎯 **Essential Variables Explained**

### **Server Configuration:**
- `NODE_ENV=production` - Production mode
- `PORT=8080` - Port for smartfarm-app (different from web's 3000)
- `LOG_LEVEL=info` - Logging level

### **External APIs:**
- `WEATHER_API_KEY` - OpenWeatherMap API key
- `GOOGLE_MAPS_API_KEY` - Google Maps API key

### **Security:**
- `JWT_SECRET` - For JSON Web Token authentication
- `SESSION_SECRET` - For session management

### **Database:**
- `DATABASE_URL` - Connection to your PostgreSQL database

### **CORS:**
- `CORS_ORIGINS` - Allowed origins for cross-origin requests

## ⚠️ **Important Notes**

1. **Keep existing variables** - Don't delete the Railway system variables or API URLs you already have
2. **Replace placeholder values** - Change "your_*_here" with your actual API keys and secrets
3. **PORT=8080** - This is different from web component's PORT=3000

## 🔑 **Where to Get API Keys**

### **OpenWeatherMap API:**
1. Go to https://openweathermap.org/api
2. Sign up for free account
3. Get your API key

### **Google Maps API:**
1. Go to https://console.cloud.google.com/
2. Create project
3. Enable Maps JavaScript API
4. Create API key

### **Database URL:**
- This should be your PostgreSQL connection string from Railway
- Format: `postgresql://username:password@host:port/database`

## ✅ **After Adding Variables**

1. Railway will automatically redeploy smartfarm-app
2. Check the "Deployments" tab for build progress
3. Status should show "Deployed" with green checkmark
4. Your web component should now be able to connect to smartfarm-app

## 🚨 **If You Don't Have API Keys**

You can still deploy without external APIs by setting:
```
WEATHER_API_KEY = demo_mode
GOOGLE_MAPS_API_KEY = demo_mode
```

This will enable demo mode for weather and maps features.
