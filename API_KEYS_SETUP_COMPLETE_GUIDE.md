# 🔑 SmartFarm API Keys Setup - Complete Guide

## 🎯 **API Keys for Enhanced SmartFarm Functionality**

This guide will help you set up the essential API keys to unlock the full potential of your SmartFarm application.

---

## 📋 **Required API Keys Overview**

| API Service | Purpose | Cost | Priority | Setup Time |
|-------------|---------|------|----------|------------|
| **Google Maps** | Location services, maps | Free tier available | High | 10 minutes |
| **OpenWeather** | Weather forecasts | Free tier available | High | 5 minutes |
| **OpenAI** | Expert chat AI features | Paid | Medium | 15 minutes |

---

## 🗺️ **1. Google Maps API Setup**

### **Purpose:**
- Interactive maps for farm locations
- GPS coordinates and geolocation
- Location-based services
- Farm boundary mapping

### **Step-by-Step Setup:**

#### **Step 1: Create Google Cloud Project**
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Click "Select a project" → "New Project"
3. Enter project name: "SmartFarm Maps"
4. Click "Create"

#### **Step 2: Enable Maps API**
1. In the Google Cloud Console, go to "APIs & Services" → "Library"
2. Search for "Maps JavaScript API"
3. Click on it and press "Enable"
4. Also enable "Geocoding API" and "Places API"

#### **Step 3: Create API Key**
1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "API Key"
3. Copy the generated API key
4. Click "Restrict Key" for security

#### **Step 4: Configure API Key Restrictions**
1. **Application restrictions:** HTTP referrers
2. **Add your domains:**
   - `https://your-netlify-url.netlify.app/*`
   - `https://smartfarm-app.com/*` (if using custom domain)
3. **API restrictions:** Select only the APIs you enabled
4. Click "Save"

#### **Step 5: Add to Netlify**
1. Go to your Netlify dashboard
2. Navigate to "Site settings" → "Environment variables"
3. Add new variable:
   - **Key:** `GOOGLE_MAPS_API_KEY`
   - **Value:** `your_google_maps_api_key_here`
4. Click "Save"

### **Cost Information:**
- **Free tier:** $200 credit per month (covers most usage)
- **Maps JavaScript API:** $7 per 1,000 requests
- **Geocoding API:** $5 per 1,000 requests

---

## 🌤️ **2. OpenWeather API Setup**

### **Purpose:**
- Real-time weather data
- 7-day weather forecasts
- Weather alerts and warnings
- Agricultural weather insights

### **Step-by-Step Setup:**

#### **Step 1: Create OpenWeather Account**
1. Go to [OpenWeatherMap](https://openweathermap.org/api)
2. Click "Sign Up" in the top right
3. Fill in your details and verify email
4. Log in to your account

#### **Step 2: Get API Key**
1. Go to [API Keys page](https://home.openweathermap.org/api_keys)
2. You'll see your default API key
3. Copy the API key (starts with letters/numbers)

#### **Step 3: Test API Key**
1. Test your key with this URL:
   ```
   https://api.openweathermap.org/data/2.5/weather?q=London&appid=YOUR_API_KEY
   ```
2. You should see weather data in JSON format

#### **Step 4: Add to Netlify**
1. Go to your Netlify dashboard
2. Navigate to "Site settings" → "Environment variables"
3. Add new variable:
   - **Key:** `OPENWEATHER_API_KEY`
   - **Value:** `your_openweather_api_key_here`
4. Click "Save"

### **Cost Information:**
- **Free tier:** 1,000 API calls per day
- **Paid plans:** Starting at $40/month for 100,000 calls/day

---

## 🤖 **3. OpenAI API Setup**

### **Purpose:**
- Expert Chat AI features
- Agricultural advice and recommendations
- Smart farm management suggestions
- Natural language processing

### **Step-by-Step Setup:**

#### **Step 1: Create OpenAI Account**
1. Go to [OpenAI Platform](https://platform.openai.com)
2. Click "Sign Up" and create account
3. Verify your email address
4. Complete account setup

#### **Step 2: Add Payment Method**
1. Go to "Billing" in your OpenAI dashboard
2. Click "Add payment method"
3. Add credit card or PayPal
4. Set up usage limits (recommended: $10-20/month)

#### **Step 3: Create API Key**
1. Go to "API Keys" in your dashboard
2. Click "Create new secret key"
3. Give it a name: "SmartFarm Expert Chat"
4. Copy the API key (starts with "sk-")

#### **Step 4: Add to Netlify**
1. Go to your Netlify dashboard
2. Navigate to "Site settings" → "Environment variables"
3. Add new variable:
   - **Key:** `OPENAI_API_KEY`
   - **Value:** `your_openai_api_key_here`
4. Click "Save"

### **Cost Information:**
- **GPT-3.5-turbo:** $0.002 per 1K tokens
- **GPT-4:** $0.03 per 1K tokens
- **Typical usage:** $5-15/month for moderate use

---

## 🔧 **4. Configure API Keys in SmartFarm**

### **Environment Variables Setup:**

After adding all API keys to Netlify, you need to configure them in your SmartFarm application:

#### **Step 1: Update Frontend Configuration**
1. Go to your GitHub repository
2. Navigate to `web-project/src/main/resources/`
3. Update the API configuration file

#### **Step 2: Test API Integration**
1. Deploy the updated code to Netlify
2. Test each feature that uses APIs:
   - Maps integration
   - Weather data display
   - Expert chat functionality

---

## 🧪 **5. API Testing Checklist**

### **Google Maps API Testing:**
- [ ] **Maps load** - Interactive map displays
- [ ] **Location detection** - GPS coordinates work
- [ ] **Farm markers** - Location pins show
- [ ] **Geocoding** - Address to coordinates conversion

### **OpenWeather API Testing:**
- [ ] **Current weather** - Real-time data displays
- [ ] **Weather forecast** - 7-day forecast shows
- [ ] **Weather alerts** - Notifications work
- [ ] **Location-based weather** - Weather for farm location

### **OpenAI API Testing:**
- [ ] **Expert chat** - AI responses work
- [ ] **Agricultural advice** - Relevant recommendations
- [ ] **Natural language** - Understands farm queries
- [ ] **Response quality** - Helpful and accurate answers

---

## 💰 **6. Cost Management**

### **Monthly Cost Estimates:**
- **Google Maps:** $0-20 (depending on usage)
- **OpenWeather:** $0-40 (free tier covers most usage)
- **OpenAI:** $5-15 (moderate usage)
- **Total:** $5-75/month

### **Cost Optimization Tips:**
1. **Set usage limits** on all APIs
2. **Monitor usage** regularly
3. **Use free tiers** when possible
4. **Cache responses** to reduce API calls
5. **Implement rate limiting** in your app

---

## 🔒 **7. Security Best Practices**

### **API Key Security:**
- ✅ **Never expose keys** in client-side code
- ✅ **Use environment variables** only
- ✅ **Restrict API keys** to specific domains
- ✅ **Rotate keys** regularly
- ✅ **Monitor usage** for unusual activity

### **Netlify Security:**
- ✅ **Environment variables** are encrypted
- ✅ **Keys are not visible** in build logs
- ✅ **Access is restricted** to authorized users

---

## 🚀 **8. Deployment After API Setup**

### **Steps to Deploy:**
1. **Add all API keys** to Netlify environment variables
2. **Update your code** to use the environment variables
3. **Test locally** with API keys
4. **Deploy to Netlify** with updated configuration
5. **Test live application** with all API features

### **Verification:**
- [ ] **Maps display** correctly
- [ ] **Weather data** loads
- [ ] **Expert chat** responds
- [ ] **No API errors** in console
- [ ] **All features** work as expected

---

## 📊 **9. API Usage Monitoring**

### **Monitor These Metrics:**
- **API call frequency** - How often APIs are used
- **Error rates** - Failed API calls
- **Response times** - API performance
- **Cost tracking** - Monthly API expenses

### **Tools for Monitoring:**
- **Google Cloud Console** - Maps API usage
- **OpenWeather Dashboard** - Weather API usage
- **OpenAI Usage Dashboard** - AI API usage
- **Netlify Analytics** - Overall app performance

---

## 🎯 **10. Next Steps After API Setup**

### **Immediate Actions:**
1. ✅ **Test all API features** thoroughly
2. ✅ **Monitor API usage** for first week
3. ✅ **Set up alerts** for API errors
4. ✅ **Document API usage** for team

### **Future Enhancements:**
1. **Add more APIs** - Soil data, market prices
2. **Implement caching** - Reduce API calls
3. **Add offline support** - Cache API responses
4. **Create API dashboard** - Monitor all APIs

---

## 🎉 **API Setup Complete!**

Once you've completed this setup, your SmartFarm application will have:
- ✅ **Interactive maps** for farm locations
- ✅ **Real-time weather** data and forecasts
- ✅ **AI-powered expert chat** for agricultural advice
- ✅ **Enhanced user experience** with external data
- ✅ **Professional-grade features** for farm management

**Your SmartFarm application will be fully functional with all advanced features!** 🌾🚀

---

*API Setup Guide completed: $(Get-Date -Format "yyyy-MM-dd HH:mm:ss")*
