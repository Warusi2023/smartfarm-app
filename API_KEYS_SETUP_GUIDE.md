# API Keys Setup Guide for Railway

## 🔐 **Security First - Never Share Your API Keys**

**⚠️ IMPORTANT**: Never share your actual API keys in chat, code, or public repositories. They should be treated as passwords.

## 📋 **Railway Environment Variables Setup**

### **Step 1: Access Railway Dashboard**
1. Go to [railway.app](https://railway.app)
2. Navigate to your `smartfarm-app-production` service
3. Click on **Variables** tab

### **Step 2: Add Each Variable One by One**

Click **+ New Variable** for each of these:

#### **Google API Keys:**
- **Variable Name**: `GOOGLE_API_KEY`
- **Value**: `[Your main Google API key]`

- **Variable Name**: `GOOGLE_MAPS_API_KEY` 
- **Value**: `[Your Google Maps API key]`

- **Variable Name**: `GOOGLE_GEOCODING_API_KEY`
- **Value**: `[Your Google Geocoding API key]`

- **Variable Name**: `GOOGLE_PLACES_API_KEY`
- **Value**: `[Your Google Places API key]`

#### **Weather API Key:**
- **Variable Name**: `OPENWEATHER_API_KEY`
- **Value**: `[Your OpenWeather API key]`

#### **Firebase Configuration:**
- **Variable Name**: `FIREBASE_PROJECT_ID`
- **Value**: `[Your Firebase project ID]`

- **Variable Name**: `FIREBASE_API_KEY`
- **Value**: `[Your Firebase API key]`

- **Variable Name**: `FIREBASE_AUTH_DOMAIN`
- **Value**: `[Your Firebase auth domain]`

- **Variable Name**: `FIREBASE_STORAGE_BUCKET`
- **Value**: `[Your Firebase storage bucket]`

### **Step 3: Essential Variables (Don't Forget These)**

Also add these required variables:

- **Variable Name**: `NODE_ENV`
- **Value**: `production`

- **Variable Name**: `CI`
- **Value**: `1`

- **Variable Name**: `HUSKY`
- **Value**: `0`

- **Variable Name**: `CORS_ORIGIN`
- **Value**: `https://web-production-86d39.up.railway.app`

## 🔍 **How to Find Your API Keys**

### **Google API Keys:**
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project
3. Go to **APIs & Services** → **Credentials**
4. Copy the API keys you created

### **OpenWeather API Key:**
1. Go to [OpenWeatherMap](https://openweathermap.org/api)
2. Sign in to your account
3. Go to **API Keys** section
4. Copy your API key

### **Firebase Configuration:**
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Go to **Project Settings** → **General**
4. Scroll down to **Your apps** section
5. Click on your web app or create one
6. Copy the configuration values

## ✅ **Verification Checklist**

After adding all variables, check:

- [ ] All 12 API key variables are added
- [ ] All 4 essential variables are added
- [ ] No typos in variable names
- [ ] Values are correct (no extra spaces)
- [ ] All variables are marked as "Secret" (recommended)

## 🚀 **After Setup**

1. **Redeploy**: Trigger a new deployment
2. **Test**: Visit `https://smartfarm-app-production.up.railway.app/api/health`
3. **Check Logs**: Verify no API key errors in Railway logs

## 🛡️ **Security Best Practices**

1. **Never commit API keys** to version control
2. **Use Railway's secret variables** (they're encrypted)
3. **Rotate keys regularly** for security
4. **Monitor API usage** to detect unauthorized access
5. **Set up API key restrictions** in Google Cloud Console

## 🆘 **If You Need Help**

- **Missing Keys**: Check the service dashboards for your API keys
- **Wrong Values**: Double-check the variable names and values
- **Still Not Working**: Check Railway logs for specific error messages