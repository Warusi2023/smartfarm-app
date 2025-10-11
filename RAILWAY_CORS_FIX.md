# Railway CORS Configuration Fix

## Problem

```
Access to fetch at 'https://smartfarm-app-production.up.railway.app/api/health' 
from origin 'https://www.smartfarm-app.com' has been blocked by CORS policy: 
No 'Access-Control-Allow-Origin' header is present on the requested resource.
```

## Solution Implemented

### 1. Enhanced CORS Middleware in `backend/server-simple.cjs`

**Updated ALLOWED_ORIGINS to include:**
- ✅ `https://www.smartfarm-app.com` (PRIMARY - Netlify custom domain)
- ✅ `https://smartfarm-app.com` (no www variant)
- ✅ `https://smartfarm-app.netlify.app` (Netlify default domain)
- ✅ `https://smartfarm-app-production.up.railway.app` (Railway backend)
- ✅ All Railway domains (`railway.com`, `railway.app`, etc.)
- ✅ Local development URLs

**Enhanced CORS Logic:**
```javascript
// Bulletproof CORS handling
if (origin && ALLOWED_ORIGINS.has(origin)) {
    allowedOrigin = origin;
} else if (origin && origin.includes('smartfarm-app')) {
    allowedOrigin = origin; // Allow any smartfarm-app subdomain
} else {
    allowedOrigin = 'https://www.smartfarm-app.com'; // Default fallback
}
```

**CORS Headers Set:**
- `Access-Control-Allow-Origin`: Dynamic based on request origin
- `Access-Control-Allow-Credentials`: `true`
- `Access-Control-Allow-Methods`: `GET, POST, PUT, PATCH, DELETE, OPTIONS, HEAD`
- `Access-Control-Allow-Headers`: `Content-Type, Authorization, X-Requested-With, Accept, Origin, X-Auth-Token, X-API-Key`
- `Access-Control-Expose-Headers`: `Content-Length, Content-Type, X-Total-Count`
- `Access-Control-Max-Age`: `86400` (24 hours cache)
- `Vary`: `Origin`

**Preflight Handling:**
- OPTIONS requests return `204 No Content` immediately
- All CORS headers included in preflight response

**Error Handler:**
- CORS headers sent even on error responses
- Ensures frontend always receives proper CORS headers

### 2. Environment Variables for Railway

Set these in Railway dashboard (Settings → Variables):

```
CORS_ORIGINS=https://www.smartfarm-app.com,https://smartfarm-app.com,https://smartfarm-app.netlify.app
NODE_ENV=production
PORT=3000
DEBUG_CORS=true
```

### 3. Testing CORS Configuration

**Test Preflight Request:**
```bash
curl -X OPTIONS https://smartfarm-app-production.up.railway.app/api/health \
  -H "Origin: https://www.smartfarm-app.com" \
  -H "Access-Control-Request-Method: GET" \
  -H "Access-Control-Request-Headers: Content-Type" \
  -v
```

**Expected Response:**
```
< HTTP/2 204
< access-control-allow-origin: https://www.smartfarm-app.com
< access-control-allow-credentials: true
< access-control-allow-methods: GET, POST, PUT, PATCH, DELETE, OPTIONS, HEAD
< access-control-allow-headers: Content-Type, Authorization, X-Requested-With, Accept, Origin, X-Auth-Token, X-API-Key
< access-control-max-age: 86400
< vary: Origin
```

**Test Actual Request:**
```bash
curl https://smartfarm-app-production.up.railway.app/api/health \
  -H "Origin: https://www.smartfarm-app.com" \
  -v
```

**Expected Response:**
```
< HTTP/2 200
< access-control-allow-origin: https://www.smartfarm-app.com
< access-control-allow-credentials: true
< content-type: application/json
{"ok":true,"service":"SmartFarm","ts":1234567890}
```

### 4. Frontend Configuration (Already Set)

**Netlify (`netlify.toml`):**
```toml
[[redirects]]
  from = "/api/*"
  to = "https://smartfarm-app-production.up.railway.app/api/:splat"
  status = 200
  force = true
  headers = {X-From = "Netlify Edge"}
```

**Frontend API Service (`public/js/api-service.js`):**
```javascript
getApiBaseUrl() {
    return window.VITE_API_URL || 
           'https://smartfarm-app-production.up.railway.app';
}
```

### 5. Deployment Steps

1. **Commit CORS fixes:**
   ```bash
   git add backend/server-simple.cjs
   git commit -m "Fix CORS policy to allow www.smartfarm-app.com"
   git push
   ```

2. **Railway will automatically redeploy** with new CORS configuration

3. **Verify deployment:**
   - Check Railway logs for startup messages
   - Look for: "🌐 CORS Origins: https://www.smartfarm-app.com, ..."

4. **Test from browser:**
   - Open: https://www.smartfarm-app.com
   - Open DevTools → Network tab
   - Check for successful API calls
   - No CORS errors should appear

### 6. Troubleshooting

**If CORS errors persist:**

1. **Check Railway logs:**
   ```
   Railway Dashboard → Deployments → Latest → Logs
   ```
   Look for: `[CORS]` messages showing origin handling

2. **Verify Railway is using correct code:**
   - Check deployment timestamp
   - Ensure latest commit is deployed

3. **Clear browser cache:**
   - Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
   - Or clear browser cache completely

4. **Check Network tab:**
   - Look at response headers
   - Should see `access-control-allow-origin: https://www.smartfarm-app.com`

5. **Test with curl:**
   - Use curl commands above to test directly
   - Verify CORS headers are present

### 7. Expected Outcome

✅ **Frontend at `https://www.smartfarm-app.com`** can access API  
✅ **Preflight OPTIONS requests** handled correctly  
✅ **All API endpoints** return proper CORS headers  
✅ **Error responses** include CORS headers  
✅ **No CORS policy errors** in browser console  
✅ **Dashboard loads successfully** with API data  

### 8. Railway Environment Variables Checklist

Set these in Railway dashboard:

- [ ] `CORS_ORIGINS` - Custom origins (optional, already in code)
- [ ] `NODE_ENV=production` - Production mode
- [ ] `PORT` - Let Railway set this automatically
- [ ] `DEBUG_CORS=true` - Enable CORS logging (optional, for debugging)

## Summary

The CORS issue has been fixed by:

1. ✅ Adding `https://www.smartfarm-app.com` and `https://smartfarm-app.com` to ALLOWED_ORIGINS
2. ✅ Enhanced CORS middleware with wildcard support for `smartfarm-app` subdomains
3. ✅ Proper preflight OPTIONS handling
4. ✅ CORS headers on all responses (including errors)
5. ✅ Comprehensive logging for debugging

**Railway will automatically redeploy when you push these changes to GitHub.**
