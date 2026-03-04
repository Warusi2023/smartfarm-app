# 🔑 API Keys Configuration Verification Guide

**Complete guide to verify and configure all API keys for SmartFarm**

---

## 📋 **Overview**

This guide helps you verify that all required API keys are configured correctly for SmartFarm features.

**API Keys to Verify:**
- OpenWeatherMap API Key (for weather alerts) - **Required**
- Google Maps API Key (for maps/geocoding) - Optional
- OpenAI API Key (for AI features) - Optional
- Sentry DSN (for error tracking) - Recommended
- Other optional API keys

**Estimated Time:** 30 minutes

---

## 🎯 **Verification Checklist**

### ✅ **Required API Keys**

#### **OpenWeatherMap API Key** (for weather alerts)
- [ ] API key obtained from OpenWeatherMap
- [ ] Key added to Railway backend variables as `WEATHER_API_KEY`
- [ ] Weather alerts feature tested and working
- [ ] No API errors in logs

#### **Sentry DSN** (for error tracking)
- [ ] Sentry account created
- [ ] DSN obtained from Sentry dashboard
- [ ] Backend DSN added to Railway as `SENTRY_DSN`
- [ ] Frontend DSN added to Netlify as `VITE_SENTRY_DSN`
- [ ] Error tracking tested and working

### ✅ **Optional API Keys**

#### **Google Maps API Key** (for maps features)
- [ ] API key obtained from Google Cloud Console
- [ ] Key added to Railway backend as `GOOGLE_API_KEY`
- [ ] Maps features tested and working
- [ ] API restrictions configured (if applicable)

#### **OpenAI API Key** (for AI features)
- [ ] API key obtained from OpenAI Platform
- [ ] Key added to Railway backend as `OPENAI_API_KEY`
- [ ] AI features tested and working
- [ ] API usage monitored

#### **Google Analytics** (for analytics)
- [ ] Measurement ID obtained
- [ ] Added to Netlify as `VITE_GA_MEASUREMENT_ID`
- [ ] Analytics tracking tested

---

## 🌤️ **Step 1: OpenWeatherMap API Key**

### 1.1 Get API Key

1. Go to https://openweathermap.org/api
2. Click **"Sign Up"** or **"Sign In"**
3. Create account or login
4. Go to **"API Keys"** section
5. Click **"Create API Key"** or use default key
6. **Copy and save the API key**

**Note:** Free tier allows 60 calls/minute, 1,000,000 calls/month

### 1.2 Add to Railway Backend

1. Go to Railway Dashboard → Your Backend → **"Variables"**
2. Click **"+ New Variable"**
3. Add:
   - **Variable name:** `WEATHER_API_KEY`
   - **Value:** Your OpenWeatherMap API key
   - Click **"Add"**

### 1.3 Verify Configuration

**Check backend code uses the key:**
- Search for `WEATHER_API_KEY` or `process.env.WEATHER_API_KEY` in backend code
- Verify it's used in weather-related endpoints

**Test weather API:**
```bash
# Test from command line (replace YOUR_KEY with actual key)
curl "https://api.openweathermap.org/data/2.5/weather?q=London&appid=YOUR_KEY"
```

**Expected Response:**
```json
{
  "coord": {...},
  "weather": [...],
  "base": "stations",
  "main": {...},
  ...
}
```

### 1.4 Test Weather Feature

1. Login to SmartFarm
2. Navigate to weather alerts or weather dashboard
3. Verify weather data loads
4. Check browser console for errors
5. Check Railway logs for API calls

---

## 🗺️ **Step 2: Google Maps API Key**

### 2.1 Get API Key

1. Go to https://console.cloud.google.com/
2. Create new project or select existing
3. Go to **"APIs & Services"** → **"Credentials"**
4. Click **"+ CREATE CREDENTIALS"** → **"API Key"**
5. **Copy and save the API key**

### 2.2 Enable Required APIs

**Enable these APIs:**
1. Go to **"APIs & Services"** → **"Library"**
2. Search and enable:
   - **Maps JavaScript API**
   - **Geocoding API**
   - **Places API** (if using place search)

### 2.3 Configure API Key Restrictions (Recommended)

**For Security:**
1. Go to **"Credentials"** → Click on your API key
2. Under **"API restrictions"**, select:
   - Restrict key to: **"Restrict key"**
   - Select APIs: Choose Maps JavaScript API, Geocoding API, Places API
3. Under **"Application restrictions"**:
   - **HTTP referrers (web sites)**
   - Add your domains:
     - `https://your-site.netlify.app/*`
     - `https://*.netlify.app/*` (for preview deployments)
     - `http://localhost:*` (for local development)
4. Click **"Save"**

### 2.4 Add to Railway Backend

1. Go to Railway Dashboard → Your Backend → **"Variables"**
2. Click **"+ New Variable"**
3. Add:
   - **Variable name:** `GOOGLE_API_KEY`
   - **Value:** Your Google Maps API key
   - Click **"Add"**

### 2.5 Add to Netlify Frontend (if needed)

**If frontend directly uses Google Maps:**
1. Go to Netlify Dashboard → Site Settings → **"Environment Variables"**
2. Click **"Add a variable"**
3. Add:
   - **Variable name:** `VITE_GOOGLE_MAPS_API_KEY`
   - **Value:** Your Google Maps API key
   - Click **"Add variable"**

### 2.6 Test Maps Feature

1. Login to SmartFarm
2. Navigate to maps feature or farm location
3. Verify map loads
4. Test geocoding (search for address)
5. Check browser console for errors

**Common Errors:**
- `"This API key is not authorized"` → Check API restrictions
- `"RefererNotAllowedMapError"` → Add domain to HTTP referrers
- `"ApiNotActivatedMapError"` → Enable required APIs

---

## 🤖 **Step 3: OpenAI API Key (Optional)**

### 3.1 Get API Key

1. Go to https://platform.openai.com
2. Click **"Sign Up"** or **"Sign In"**
3. Create account or login
4. Go to **"API Keys"** section (left sidebar)
5. Click **"+ Create new secret key"**
6. Enter a name for the key (e.g., "SmartFarm Production")
7. Click **"Create secret key"**
8. **Copy and save the API key immediately** (you won't be able to see it again!)

**Note:** 
- Free tier may have limited credits
- Pay-as-you-go pricing available
- Monitor usage in OpenAI dashboard

### 3.2 Add to Railway Backend

1. Go to Railway Dashboard → Your Backend → **"Variables"**
2. Click **"+ New Variable"**
3. Add:
   - **Variable name:** `OPENAI_API_KEY`
   - **Value:** Your OpenAI API key (starts with `sk-`)
   - Click **"Add"**

**Security Note:** 
- Never commit API keys to Git
- Keep keys secure and rotate if compromised
- Use environment variables only

### 3.3 Verify Configuration

**Check backend code uses the key:**
- Search for `OPENAI_API_KEY` or `process.env.OPENAI_API_KEY` in backend code
- Verify it's used in AI-related endpoints

**Test OpenAI API (optional):**
```bash
# Test from command line (replace YOUR_KEY with actual key)
curl https://api.openai.com/v1/models \
  -H "Authorization: Bearer YOUR_KEY"
```

**Expected Response:**
```json
{
  "data": [
    {
      "id": "gpt-4",
      "object": "model",
      ...
    }
  ]
}
```

### 3.4 Test AI Features

1. Login to SmartFarm
2. Navigate to AI features (if available)
3. Test AI functionality:
   - AI advisory features
   - Chat/completion features
   - Other AI-powered features
4. Verify AI responses are generated
5. Check Railway logs for API calls
6. Monitor OpenAI dashboard for usage

### 3.5 Monitor Usage

**Check OpenAI Dashboard:**
1. Go to https://platform.openai.com/usage
2. Monitor API usage and costs
3. Set up usage alerts if needed
4. Review rate limits

**Common Issues:**
- `401 Unauthorized` → Invalid API key
- `429 Too Many Requests` → Rate limit exceeded
- `Insufficient quota` → Need to add payment method

---

## 🔴 **Step 4: Sentry DSN**

### 3.1 Get Sentry DSN

**If not already set up:**
1. Go to https://sentry.io
2. Create account or login
3. Create project (Node.js for backend, React for frontend)
4. Copy DSN from project settings

**See:** `SENTRY_MONITORING_SETUP.md` for detailed setup

### 3.2 Verify Backend DSN

1. Check Railway Dashboard → Backend → **"Variables"**
2. Verify `SENTRY_DSN` is set
3. Check Railway logs for: `"Sentry initialized successfully"`

### 3.3 Verify Frontend DSN

1. Check Netlify Dashboard → Site Settings → **"Environment Variables"**
2. Verify `VITE_SENTRY_DSN` is set
3. Check browser console for: `"✅ Sentry initialized for frontend"`

### 3.4 Test Error Tracking

**Backend:**
- Trigger a test error (see Sentry setup guide)
- Check Sentry dashboard for error

**Frontend:**
- Trigger a test error in browser
- Check Sentry dashboard for error

---

## 📊 **Step 5: Google Analytics (Optional)**

### 4.1 Get Measurement ID

1. Go to https://analytics.google.com/
2. Create account or login
3. Create property for SmartFarm
4. Get Measurement ID (format: `G-XXXXXXXXXX`)

### 4.2 Add to Netlify

1. Go to Netlify Dashboard → Site Settings → **"Environment Variables"**
2. Click **"Add a variable"**
3. Add:
   - **Variable name:** `VITE_GA_MEASUREMENT_ID`
   - **Value:** Your Measurement ID (e.g., `G-XXXXXXXXXX`)
   - Click **"Add variable"**

### 4.3 Verify Implementation

**Check frontend code:**
- Search for Google Analytics script in `index.html` or main component
- Verify Measurement ID is used correctly

**Test:**
1. Visit your site
2. Check Google Analytics dashboard for real-time visitors
3. Verify tracking works

---

## 🔍 **Step 6: Verification Script**

Create a file `scripts/verify-api-keys.js`:

```javascript
#!/usr/bin/env node
/**
 * API Keys Verification Script
 * Verifies that all API keys are configured correctly
 */

const https = require('https');

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

// Check environment variables
const apiKeys = {
  'WEATHER_API_KEY': {
    name: 'OpenWeatherMap API Key',
    test: async (key) => {
      return new Promise((resolve) => {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${key}`;
        https.get(url, (res) => {
          let data = '';
          res.on('data', (chunk) => { data += chunk; });
          res.on('end', () => {
            try {
              const json = JSON.parse(data);
              resolve(json.cod === 200);
            } catch {
              resolve(false);
            }
          });
        }).on('error', () => resolve(false));
      });
    }
  },
  'GOOGLE_API_KEY': {
    name: 'Google Maps API Key',
    test: null // Can't easily test without making actual API call
  },
  'SENTRY_DSN': {
    name: 'Sentry DSN',
    test: null // DSN format validation only
  }
};

async function verifyApiKeys() {
  log('\n🔑 API Keys Verification', 'cyan');
  log('='.repeat(60), 'cyan');

  for (const [key, config] of Object.entries(apiKeys)) {
    const value = process.env[key];
    
    if (!value) {
      log(`\n❌ ${config.name} (${key}): NOT SET`, 'red');
      continue;
    }

    // Mask the key for display
    const displayValue = value.length > 20 
      ? value.substring(0, 8) + '...' + value.substring(value.length - 4)
      : '***';

    log(`\n✅ ${config.name} (${key}): Set`, 'green');
    log(`   Value: ${displayValue}`, 'blue');

    // Test if test function available
    if (config.test) {
      log(`   Testing...`, 'yellow');
      const isValid = await config.test(value);
      if (isValid) {
        log(`   ✅ API key is valid`, 'green');
      } else {
        log(`   ⚠️  API key test failed (may still be valid)`, 'yellow');
      }
    } else {
      // Basic format validation
      if (key === 'SENTRY_DSN' && value.startsWith('https://')) {
        log(`   ✅ DSN format looks correct`, 'green');
      } else if (key === 'GOOGLE_API_KEY' && value.length > 20) {
        log(`   ✅ Key format looks correct`, 'green');
      }
    }
  }

  log('\n📝 Frontend API Keys (check in Netlify dashboard):', 'cyan');
  log('   - VITE_SENTRY_DSN', 'blue');
  log('   - VITE_GOOGLE_MAPS_API_KEY (if using)', 'blue');
  log('   - VITE_GA_MEASUREMENT_ID (if using)', 'blue');

  log('\n✅ Verification complete!', 'green');
}

if (require.main === module) {
  verifyApiKeys().catch(console.error);
}

module.exports = { verifyApiKeys };
```

---

## ✅ **Step 7: Complete Verification Checklist**

### Backend API Keys (Railway)
- [ ] `WEATHER_API_KEY` - Set and tested (Required)
- [ ] `GOOGLE_API_KEY` - Set (if using maps) (Optional)
- [ ] `OPENAI_API_KEY` - Set (if using AI features) (Optional)
- [ ] `SENTRY_DSN` - Set and tested (Recommended)

### Frontend API Keys (Netlify)
- [ ] `VITE_SENTRY_DSN` - Set and tested
- [ ] `VITE_GOOGLE_MAPS_API_KEY` - Set (if frontend uses maps)
- [ ] `VITE_GA_MEASUREMENT_ID` - Set (if using analytics)

### Feature Testing
- [ ] Weather alerts feature works
- [ ] Maps/geocoding feature works (if applicable)
- [ ] AI features work (if applicable)
- [ ] Sentry error tracking works
- [ ] Analytics tracking works (if applicable)

---

## 🐛 **Troubleshooting**

### Problem: Weather API returns 401 Unauthorized

**Solution:**
- Verify `WEATHER_API_KEY` is set correctly in Railway
- Check API key is valid (not expired)
- Verify API key has correct permissions
- Test API key directly: `curl "https://api.openweathermap.org/data/2.5/weather?q=London&appid=YOUR_KEY"`

### Problem: Google Maps not loading

**Solution:**
- Verify `GOOGLE_API_KEY` is set correctly
- Check API restrictions allow your domain
- Verify required APIs are enabled (Maps JavaScript API, Geocoding API)
- Check browser console for specific error messages
- Verify HTTP referrer restrictions include your domain

### Problem: OpenAI API returns 401 Unauthorized

**Solution:**
- Verify `OPENAI_API_KEY` is set correctly in Railway
- Check API key format (should start with `sk-`)
- Verify API key is valid and not expired
- Check OpenAI dashboard for account status
- Ensure payment method is added (if required)

### Problem: Sentry not capturing errors

**Solution:**
- Verify `SENTRY_DSN` format is correct (starts with `https://`)
- Check Sentry dashboard for connection status
- Verify packages are installed (`@sentry/node`, `@sentry/react`)
- Check logs for Sentry initialization messages

---

## 🎯 **Success Criteria**

API keys verification is complete when:

- ✅ All required API keys are set
- ✅ Weather API key tested and working
- ✅ Google Maps API key configured (if using maps)
- ✅ OpenAI API key configured (if using AI features)
- ✅ Sentry DSN configured and tested
- ✅ All features using API keys work correctly
- ✅ No API errors in logs or console

---

## 📚 **Additional Resources**

- OpenWeatherMap API Docs: https://openweathermap.org/api
- Google Maps API Docs: https://developers.google.com/maps/documentation
- OpenAI API Docs: https://platform.openai.com/docs
- Sentry Docs: https://docs.sentry.io/
- Google Analytics Docs: https://developers.google.com/analytics

---

## 🔒 **Security Best Practices**

1. **Never commit API keys to Git**
   - Use environment variables only
   - Add `.env` to `.gitignore`

2. **Use API key restrictions**
   - Restrict Google API keys to specific domains
   - Use IP restrictions when possible

3. **Rotate keys regularly**
   - Change keys if compromised
   - Update keys in production

4. **Monitor API usage**
   - Check usage in API provider dashboards
   - Set up alerts for unusual activity

---

**Last Updated:** January 2025
