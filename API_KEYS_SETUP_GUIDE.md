# 🔑 API Keys Setup Guide

## 🚨 **CRITICAL: Fix CORS Issue First!**

Your backend is currently configured for `https://www.smartfarm-app.com` but your actual frontend is `https://dulcet-sawine-92d6a8.netlify.app`.

### **Fix CORS in Railway Dashboard:**
1. Go to your Railway dashboard
2. Find your service settings
3. Add/Update this environment variable:
```
CORS_ORIGIN=https://dulcet-sawine-92d6a8.netlify.app
```

## 🔑 **API Keys Setup**

### **1. Google Maps API Key**
**Purpose**: Location services, maps, geolocation

**How to get it:**
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable "Maps JavaScript API" and "Geocoding API"
4. Go to "Credentials" → "Create Credentials" → "API Key"
5. Copy the API key

**Set in Railway:**
```
MAPS_API_KEY=your_google_maps_api_key_here
```

**Set in Netlify:**
```
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
```

### **2. OpenWeather API Key**
**Purpose**: Weather forecasts, climate data

**How to get it:**
1. Go to [OpenWeatherMap](https://openweathermap.org/api)
2. Sign up for a free account
3. Go to "API Keys" section
4. Copy your API key

**Set in Railway:**
```
WEATHER_API_KEY=your_openweather_api_key_here
```

**Set in Netlify:**
```
VITE_OPENWEATHER_API_KEY=your_openweather_api_key_here
```

### **3. OpenAI API Key**
**Purpose**: AI chat features, expert advice

**How to get it:**
1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Sign up or log in
3. Go to "API Keys" section
4. Create a new API key
5. Copy the key (starts with `sk-`)

**Set in Railway:**
```
OPENAI_API_KEY=your_openai_api_key_here
```

**Set in Netlify:**
```
VITE_OPENAI_API_KEY=your_openai_api_key_here
```

### **4. JWT Secret (Backend Only)**
**Purpose**: User authentication security

**Generate a secure secret:**
```bash
# Use this command to generate a secure JWT secret
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

**Set in Railway:**
```
JWT_SECRET=your_generated_jwt_secret_here
```

## 🚀 **Complete Environment Variables Setup**

### **Railway Dashboard Environment Variables:**
```
CORS_ORIGIN=https://dulcet-sawine-92d6a8.netlify.app
NODE_ENV=production
PORT=3000
JWT_SECRET=your_generated_jwt_secret_here
WEATHER_API_KEY=your_openweather_api_key_here
MAPS_API_KEY=your_google_maps_api_key_here
OPENAI_API_KEY=your_openai_api_key_here
```

### **Netlify Dashboard Environment Variables:**
```
VITE_API_URL=https://smartfarm-app-production.up.railway.app
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
VITE_OPENWEATHER_API_KEY=your_openweather_api_key_here
VITE_OPENAI_API_KEY=your_openai_api_key_here
```

## 🧪 **Testing Your Setup**

### **1. Test CORS Fix:**
```bash
curl -H "Origin: https://dulcet-sawine-92d6a8.netlify.app" https://smartfarm-app-production.up.railway.app/api/health
```

### **2. Test Frontend:**
Visit: `https://dulcet-sawine-92d6a8.netlify.app`

### **3. Test API Integration:**
Check if the frontend can successfully call backend APIs

## 📋 **Priority Order:**
1. **FIRST**: Fix CORS issue in Railway
2. **SECOND**: Set up Google Maps API (for location features)
3. **THIRD**: Set up OpenWeather API (for weather data)
4. **FOURTH**: Set up OpenAI API (for AI features)
5. **FIFTH**: Generate and set JWT secret

## 🔒 **Security Notes:**
- Never commit API keys to your repository
- Use environment variables for all sensitive data
- Regularly rotate your API keys
- Monitor API usage to avoid unexpected charges

## 🆘 **Need Help?**
If you encounter any issues:
1. Check Railway logs for backend errors
2. Check Netlify logs for frontend errors
3. Verify environment variables are set correctly
4. Test API endpoints individually