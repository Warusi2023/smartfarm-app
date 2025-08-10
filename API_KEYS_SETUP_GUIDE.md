# SmartFarm API Keys Setup Guide

## 🔑 **Required API Keys for SmartFarm**

SmartFarm requires the following API keys for full functionality:

### **1. Google Maps API Key**
**Purpose:** Maps integration, location services, geolocation features

#### **Setup Steps:**
1. **Go to Google Cloud Console**
   - Visit [console.cloud.google.com](https://console.cloud.google.com)
   - Sign in with your Google account

2. **Create or Select Project**
   - Click on the project dropdown at the top
   - Click "New Project" or select existing project
   - Give it a name like "SmartFarm"

3. **Enable APIs**
   - Go to "APIs & Services" > "Library"
   - Search for and enable these APIs:
     - Maps JavaScript API
     - Geocoding API
     - Places API
     - Directions API

4. **Create API Key**
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "API Key"
   - Copy the generated key

5. **Restrict API Key (Recommended)**
   - Click on the created API key
   - Under "Application restrictions":
     - Select "HTTP referrers (web sites)"
     - Add your domain: `*.yourdomain.com/*`
   - Under "API restrictions":
     - Select "Restrict key"
     - Select the APIs you enabled above

#### **Environment Variable:**
```bash
GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
```

---

### **2. OpenWeather API Key**
**Purpose:** Real-time weather data, forecasts, weather alerts

#### **Setup Steps:**
1. **Go to OpenWeatherMap**
   - Visit [openweathermap.org](https://openweathermap.org)
   - Click "Sign Up" or "Sign In"

2. **Create Account**
   - Fill in your details
   - Verify your email address

3. **Get API Key**
   - Go to "My API Keys" section
   - Copy your default API key
   - Or create a new one with a specific name

4. **Choose Plan (Free tier available)**
   - Free: 1,000 calls/day
   - Paid plans for higher limits

#### **Environment Variable:**
```bash
OPENWEATHER_API_KEY=your_openweather_api_key_here
```

---

### **3. OpenAI API Key**
**Purpose:** Expert Chat feature, AI-powered farming advice

#### **Setup Steps:**
1. **Go to OpenAI Platform**
   - Visit [platform.openai.com](https://platform.openai.com)
   - Sign up or sign in

2. **Add Payment Method**
   - OpenAI requires a payment method
   - Set up usage limits to control costs

3. **Create API Key**
   - Go to "API Keys" section
   - Click "Create new secret key"
   - Copy the generated key (store it securely)

4. **Set Usage Limits**
   - Go to "Usage" section
   - Set daily/monthly limits to control costs
   - Monitor usage regularly

#### **Environment Variable:**
```bash
OPENAI_API_KEY=your_openai_api_key_here
```

---

## 🚀 **Deployment Platform Configuration**

### **Netlify Environment Variables**
1. Go to your Netlify dashboard
2. Select your SmartFarm site
3. Go to "Site settings" > "Environment variables"
4. Add each variable:
   ```
   GOOGLE_MAPS_API_KEY=your_key_here
   OPENWEATHER_API_KEY=your_key_here
   OPENAI_API_KEY=your_key_here
   ```

### **Vercel Environment Variables**
1. Go to your Vercel dashboard
2. Select your SmartFarm project
3. Go to "Settings" > "Environment Variables"
4. Add each variable for Production environment

### **GitHub Pages (GitHub Secrets)**
1. Go to your GitHub repository
2. Go to "Settings" > "Secrets and variables" > "Actions"
3. Add each secret:
   ```
   GOOGLE_MAPS_API_KEY=your_key_here
   OPENWEATHER_API_KEY=your_key_here
   OPENAI_API_KEY=your_key_here
   ```

---

## 🔒 **Security Best Practices**

### **API Key Security**
- ✅ **Never commit API keys to version control**
- ✅ **Use environment variables**
- ✅ **Restrict API keys to your domain**
- ✅ **Set usage limits and monitor usage**
- ✅ **Rotate keys regularly**

### **Google Maps API Security**
```javascript
// Example of restricting Google Maps API key
// In your HTML or JavaScript
<script>
  // Restrict to your domain
  const API_KEY = 'your_restricted_api_key';
  // The key should be restricted to *.yourdomain.com/*
</script>
```

### **OpenAI API Security**
- Set up usage alerts
- Monitor token usage
- Implement rate limiting in your application

---

## 🧪 **Testing API Keys**

### **Test Google Maps API**
```javascript
// Test in browser console
fetch(`https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places`)
  .then(response => console.log('Google Maps API working'))
  .catch(error => console.error('Google Maps API error:', error));
```

### **Test OpenWeather API**
```javascript
// Test in browser console
fetch(`https://api.openweathermap.org/data/2.5/weather?q=London&appid=YOUR_API_KEY`)
  .then(response => response.json())
  .then(data => console.log('OpenWeather API working:', data))
  .catch(error => console.error('OpenWeather API error:', error));
```

### **Test OpenAI API**
```javascript
// Test in browser console (requires backend proxy)
fetch('/api/openai/test', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ message: 'Hello' })
})
.then(response => response.json())
.then(data => console.log('OpenAI API working:', data))
.catch(error => console.error('OpenAI API error:', error));
```

---

## 💰 **Cost Management**

### **Google Maps API Costs**
- **Free tier:** $200 credit per month
- **Maps JavaScript API:** $7 per 1,000 loads
- **Geocoding API:** $5 per 1,000 requests
- **Places API:** $17 per 1,000 requests

### **OpenWeather API Costs**
- **Free tier:** 1,000 calls/day
- **Paid plans:** Starting from $40/month

### **OpenAI API Costs**
- **GPT-3.5-turbo:** $0.002 per 1K tokens
- **GPT-4:** $0.03 per 1K tokens (input)
- **Set usage limits to control costs**

---

## 🚨 **Troubleshooting**

### **Common Issues**

1. **API Key Not Working**
   - Check if key is correctly copied
   - Verify key is not restricted too much
   - Check billing status (Google Maps)

2. **CORS Errors**
   - Ensure API keys are used server-side when possible
   - Configure CORS headers in your backend

3. **Rate Limiting**
   - Implement caching for API responses
   - Add retry logic with exponential backoff
   - Monitor usage and upgrade plans if needed

4. **Billing Issues**
   - Check payment method is valid
   - Verify billing is enabled (Google Cloud)
   - Set up billing alerts

---

## 📞 **Support Resources**

### **Google Maps API**
- [Google Maps API Documentation](https://developers.google.com/maps/documentation)
- [Google Cloud Console](https://console.cloud.google.com)
- [Google Cloud Support](https://cloud.google.com/support)

### **OpenWeather API**
- [OpenWeather API Documentation](https://openweathermap.org/api)
- [OpenWeather Support](https://openweathermap.org/support)

### **OpenAI API**
- [OpenAI API Documentation](https://platform.openai.com/docs)
- [OpenAI Support](https://help.openai.com)

---

## ✅ **Setup Checklist**

- [ ] Google Maps API key created and restricted
- [ ] OpenWeather API key obtained
- [ ] OpenAI API key created with billing setup
- [ ] Environment variables configured in deployment platform
- [ ] API keys tested and working
- [ ] Usage limits and monitoring set up
- [ ] Security measures implemented
- [ ] Cost management plan in place

---

**Your SmartFarm application is now ready for production with full API functionality! 🌾🚀** 