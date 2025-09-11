# 🔗 API Connection Setup Guide

## ✅ Your Current URLs:
- **Frontend (Netlify)**: `https://dulcet-sawine-92d6a8.netlify.app`
- **Backend (Railway)**: `https://your-railway-backend-url.up.railway.app` (needs your actual URL)

## 🚀 Next Steps to Complete Setup:

### 1. Get Your Railway Backend URL
1. Go to your Railway dashboard
2. Find your deployed service
3. Copy the URL (should look like: `https://smartfarm-production-xxxxx.up.railway.app`)

### 2. Configure Railway Environment Variables
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

### 3. Configure Netlify Environment Variables
In your Netlify dashboard, add these environment variables:

```
VITE_API_URL=https://your-actual-railway-url.up.railway.app
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
VITE_OPENWEATHER_API_KEY=your_openweather_api_key
VITE_OPENAI_API_KEY=your_openai_api_key
```

### 4. Test the Connection
Once both are configured:

1. **Test Railway Backend**:
   ```bash
   curl https://your-railway-url.up.railway.app/api/health
   ```

2. **Test Netlify Frontend**:
   Visit: `https://dulcet-sawine-92d6a8.netlify.app`

3. **Test API Connection**:
   The frontend should be able to call the backend API endpoints

## 🔧 Current Status:
- ✅ Frontend deployed on Netlify
- ✅ Backend deployed on Railway (needs URL)
- ✅ CORS configured for your Netlify URL
- ⏳ Need Railway URL to complete setup

## 📝 What You Need to Do:
1. **Get your Railway URL** from Railway dashboard
2. **Update environment variables** in both platforms
3. **Test the connection** between frontend and backend

Once you provide your Railway URL, I can help you complete the final configuration!
