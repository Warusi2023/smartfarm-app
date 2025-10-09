# CORS Fix - Application Error Resolution

## Problem Identified

The "Application Error" is caused by **CORS (Cross-Origin Resource Sharing) blocking**:

**Error:** `Access to fetch at 'https://smartfarm-app-production.up.railway.app/api/health' from origin 'https://www.smartfarm-app.com' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.`

## Root Cause

The backend server (`server-simple.cjs`) was missing `https://www.smartfarm-app.com` in the allowed origins list.

**Current allowed origins:**
- ✅ `https://smartfarmfiji.com`
- ✅ `https://www.smartfarmfiji.com`
- ❌ `https://smartfarm-app.com` (MISSING)
- ❌ `https://www.smartfarm-app.com` (MISSING)
- ✅ `https://smartfarm-app.netlify.app`

## Fix Applied

Updated `backend/server-simple.cjs` CORS configuration:

```javascript
const allowedOrigins = [
    'https://smartfarmfiji.com',
    'https://www.smartfarmfiji.com',
    'https://smartfarm-app.com',        // ✅ ADDED
    'https://www.smartfarm-app.com',    // ✅ ADDED
    'https://smartfarm-app.netlify.app',
    'http://localhost:3000',
    'http://localhost:8080'
];
```

## Additional Railway Environment Variable

Also ensure Railway has the correct CORS_ORIGINS environment variable:

**In Railway Dashboard → Variables:**
```
CORS_ORIGINS=https://smartfarm-app.com,https://www.smartfarm-app.com,https://smartfarmfiji.com,https://www.smartfarmfiji.com,https://smartfarm-app.netlify.app
```

## Expected Result

After deployment:
1. ✅ Frontend (`https://www.smartfarm-app.com`) can access backend
2. ✅ CORS headers will include `Access-Control-Allow-Origin: https://www.smartfarm-app.com`
3. ✅ API calls will succeed
4. ✅ Dashboard will load without "Application Error"
5. ✅ Health check will pass

## Files Modified

- **Updated:** `backend/server-simple.cjs` (added missing CORS origins)
- **Commit and push** to trigger Railway redeployment

## Verification Steps

After deployment, test:
1. Visit `https://www.smartfarm-app.com/dashboard`
2. Open browser console (F12)
3. Should see NO CORS errors
4. Dashboard should load successfully
5. API calls should work

## Alternative: Quick Test

Test the backend CORS directly:
```bash
curl -H "Origin: https://www.smartfarm-app.com" \
     -H "Access-Control-Request-Method: GET" \
     -H "Access-Control-Request-Headers: X-Requested-With" \
     -X OPTIONS \
     https://smartfarm-app-production.up.railway.app/api/health
```

Should return headers including:
```
Access-Control-Allow-Origin: https://www.smartfarm-app.com
```

This fix resolves the CORS blocking that was causing the "Application Error"!