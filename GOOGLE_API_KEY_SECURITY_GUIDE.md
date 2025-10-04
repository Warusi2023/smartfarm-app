# 🔐 Google API Key Security Guide

## ⚠️ CRITICAL SECURITY ALERT

Your Google API Key `AIzaSyCS_Q467Ub6ijh2MIGa-NC6PMCrbGfQqxM` has been detected as a **PUBLIC LEAK** and needs immediate attention.

## 🚨 Immediate Actions Required

### 1. **Regenerate Your API Key** (URGENT)
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to **APIs & Services** > **Credentials**
3. Find your current API key
4. Click **Delete** to revoke the compromised key
5. Create a new API key
6. **Restrict the new key** (see restrictions below)

### 2. **Secure Storage Locations**

#### ✅ **CORRECT Locations:**
- **Backend Environment Variables**: `backend-production.env`
- **Railway Environment Variables**: Set via Railway dashboard
- **Local Development**: `.env` file (gitignored)
- **CI/CD Secrets**: GitHub Secrets, Railway Secrets

#### ❌ **NEVER Store In:**
- Public repositories
- Client-side JavaScript
- Browser localStorage
- Version control (git)
- Public documentation
- Screenshots or images

### 3. **API Key Restrictions** (ESSENTIAL)

When creating your new API key, apply these restrictions:

#### **Application Restrictions:**
- **HTTP referrers (web sites)**: Add your domain(s)
  - `https://yourdomain.com/*`
  - `https://*.yourdomain.com/*`
  - `http://localhost:3000/*` (for development)

#### **API Restrictions:**
Limit to only the APIs you need:
- Google Maps JavaScript API
- Google Maps Geocoding API
- Google Places API
- Firebase (if using Firebase services)

### 4. **Implementation in SmartFarm**

#### **Backend Configuration:**
```javascript
// backend/server.cjs
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

// Use in API endpoints only
app.get('/api/geocode', async (req, res) => {
  const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${GOOGLE_API_KEY}`);
  // Process and return safe data
});
```

#### **Frontend Usage:**
```javascript
// web-project/public/js/api-service.js
// NEVER expose the API key directly to frontend
// Always make API calls through your backend
async geocodeAddress(address) {
  return await this.request('/api/geocode', {
    method: 'POST',
    body: JSON.stringify({ address })
  });
}
```

### 5. **Environment Setup**

#### **Local Development:**
```bash
# Create .env file (gitignored)
cp environment-template.env .env

# Edit .env file
GOOGLE_API_KEY=your_new_secure_api_key_here
```

#### **Production (Railway):**
```bash
# Set environment variables in Railway dashboard
railway variables set GOOGLE_API_KEY=your_new_secure_api_key_here
```

#### **GitHub Secrets:**
```
GOOGLE_API_KEY=your_new_secure_api_key_here
```

### 6. **Security Best Practices**

#### **API Key Rotation:**
- Rotate API keys every 90 days
- Monitor API usage for anomalies
- Set up billing alerts

#### **Monitoring:**
- Enable Google Cloud Monitoring
- Set up usage quotas
- Monitor for unusual activity

#### **Access Control:**
- Use IAM roles and permissions
- Implement API rate limiting
- Use HTTPS only

### 7. **Current Status**

#### **Files Updated:**
- ✅ `backend-production.env` - Added GOOGLE_API_KEY
- ✅ `environment-template.env` - Created template
- ✅ `.gitignore` - Already excludes *.env files

#### **Next Steps:**
1. **IMMEDIATELY** regenerate your API key
2. Update the new key in all environment files
3. Test the application with the new key
4. Monitor for any issues

### 8. **Emergency Contacts**

If you suspect your API key has been misused:
- [Google Cloud Support](https://cloud.google.com/support)
- Check your [Google Cloud Billing](https://console.cloud.google.com/billing)
- Review [API Usage Reports](https://console.cloud.google.com/apis/dashboard)

## 🔒 Remember: API Keys are like passwords - never share them publicly!

---

**Last Updated:** $(date)
**Security Level:** CRITICAL
**Action Required:** IMMEDIATE
