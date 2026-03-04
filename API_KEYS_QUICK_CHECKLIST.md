# 🔑 API Keys Quick Checklist

**Quick reference for all API keys needed for SmartFarm**

---

## ✅ **Required API Keys**

### **OpenWeatherMap API Key** (for weather alerts)
- [ ] Get from: https://openweathermap.org/api
- [ ] Set as `WEATHER_API_KEY` in Railway backend variables
- [ ] Test weather alerts functionality
- [ ] Verify no API errors in logs

**Steps:**
1. Sign up/login at https://openweathermap.org/api
2. Go to "API Keys" section
3. Copy your API key
4. Add to Railway: Backend → Variables → `WEATHER_API_KEY`
5. Test weather feature in SmartFarm

---

## ⚠️ **Optional API Keys (Nice to Have)**

### **Google Maps API Key** (for map features)
- [ ] Get from: https://console.cloud.google.com
- [ ] Enable APIs:
  - [ ] Maps JavaScript API
  - [ ] Geocoding API
  - [ ] Places API
- [ ] Set as `GOOGLE_API_KEY` in Railway backend variables
- [ ] Configure API key restrictions (HTTP referrers)
- [ ] Test map features

**Steps:**
1. Go to https://console.cloud.google.com
2. Create project or select existing
3. Go to "APIs & Services" → "Credentials"
4. Click "+ CREATE CREDENTIALS" → "API Key"
5. Enable required APIs: Maps JavaScript API, Geocoding API, Places API
6. Configure restrictions:
   - API restrictions: Select Maps JavaScript API, Geocoding API, Places API
   - Application restrictions: HTTP referrers
   - Add your domains: `https://your-site.netlify.app/*`
7. Add to Railway: Backend → Variables → `GOOGLE_API_KEY`
8. Test maps/geocoding features

### **OpenAI API Key** (for AI features)
- [ ] Get from: https://platform.openai.com
- [ ] Set as `OPENAI_API_KEY` in Railway backend variables
- [ ] Test AI features (advisory, chat, etc.)
- [ ] Monitor usage in OpenAI dashboard

**Steps:**
1. Go to https://platform.openai.com
2. Sign up/login
3. Go to "API Keys" section
4. Click "+ Create new secret key"
5. Name it (e.g., "SmartFarm Production")
6. Copy the key (starts with `sk-`) - save it immediately!
7. Add to Railway: Backend → Variables → `OPENAI_API_KEY`
8. Test AI features in SmartFarm
9. Monitor usage at https://platform.openai.com/usage

---

## 📋 **Railway Variables Summary**

Add these to Railway Dashboard → Your Backend → Variables:

| Variable Name | Value | Required | Purpose |
|--------------|-------|----------|---------|
| `WEATHER_API_KEY` | Your OpenWeatherMap key | ✅ Yes | Weather alerts |
| `GOOGLE_API_KEY` | Your Google Maps key | ⚠️ Optional | Maps/geocoding |
| `OPENAI_API_KEY` | Your OpenAI key (sk-...) | ⚠️ Optional | AI features |
| `SENTRY_DSN` | Your Sentry DSN | ⚠️ Recommended | Error tracking |

---

## 🧪 **Quick Verification**

### Test OpenWeatherMap API Key:
```bash
curl "https://api.openweathermap.org/data/2.5/weather?q=London&appid=YOUR_KEY"
```
Should return weather data (not 401 error).

### Test OpenAI API Key:
```bash
curl https://api.openai.com/v1/models \
  -H "Authorization: Bearer YOUR_KEY"
```
Should return list of models (not 401 error).

### Test Google Maps API Key:
- Visit your SmartFarm site
- Navigate to maps feature
- Check browser console for errors
- Map should load without errors

---

## 🔒 **Security Notes**

1. **Never commit API keys to Git**
   - Use environment variables only
   - Add `.env` to `.gitignore`

2. **Use API key restrictions**
   - Google Maps: Restrict to specific domains
   - OpenAI: Monitor usage regularly

3. **Rotate keys if compromised**
   - Generate new keys if needed
   - Update in Railway immediately

4. **Monitor usage**
   - Check API provider dashboards
   - Set up usage alerts

---

## 📚 **Full Documentation**

For detailed setup instructions, see:
- **Complete Guide:** `API_KEYS_VERIFICATION.md`
- **Verification Script:** `scripts/verify-api-keys.js`

---

**Last Updated:** January 2025
