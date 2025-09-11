# 🔗 API Connection Setup Guide

## ✅ Your Current URLs:
- **Frontend (Netlify)**: `https://dulcet-sawine-92d6a8.netlify.app`
- **Backend (Railway)**: `https://smartfarm-app-production.up.railway.app`

## 🚀 Next Steps to Complete Setup:

### 1. Configure Railway Environment Variables
In your Railway dashboard, add these environment variables:

```
CORS_ORIGIN=https://dulcet-sawine-92d6a8.netlify.app
NODE_ENV=production
PORT=3000
JWT_SECRET=your-secure-jwt-secret-here
WEATHER_API_KEY=your_openweather_api_key
MAPS_API_KEY=your_google_maps_api_key
OPENAI_API_KEY=your_openai_api_key
```

### 2. Configure Netlify Environment Variables
In your Netlify dashboard, add these environment variables:

```
VITE_API_URL=https://smartfarm-app-production.up.railway.app
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
VITE_OPENWEATHER_API_KEY=your_openweather_api_key
VITE_OPENAI_API_KEY=your_openai_api_key
```

### 3. Test the Connection
Once both are configured:

1. **Test Railway Backend**:
   ```bash
   curl https://smartfarm-app-production.up.railway.app/api/health
   ```

2. **Test Netlify Frontend**:
   Visit: `https://dulcet-sawine-92d6a8.netlify.app`

3. **Test API Connection**:
   The frontend should be able to call the backend API endpoints

## 🔧 Current Status:
- ✅ Frontend deployed on Netlify
- ✅ Backend deployed on Railway
- ✅ CORS configured for your Netlify URL
- ✅ API URLs configured
- ⏳ Need to set environment variables in both platforms

## 📝 What You Need to Do:
1. **Set environment variables** in Railway dashboard
2. **Set environment variables** in Netlify dashboard
3. **Test the connection** between frontend and backend

## 🎯 Critical Environment Variable:
**In Railway Dashboard**, make sure to set:
```
CORS_ORIGIN=https://dulcet-sawine-92d6a8.netlify.app
```

This will allow your Netlify frontend to communicate with your Railway backend!
