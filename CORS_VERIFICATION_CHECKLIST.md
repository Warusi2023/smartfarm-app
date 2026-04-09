# 🔒 CORS Configuration Verification Checklist

**Complete guide to verify CORS is configured correctly for SmartFarm**

**Estimated Time:** 10 minutes

---

## 📋 **Overview**

CORS (Cross-Origin Resource Sharing) allows your Netlify frontend to make API calls to your Railway backend. This guide helps you verify CORS is configured correctly.

**Note:** Backend code shows CORS is configured in `server.js` (lines 43-103), just needs origin verification.

---

## ✅ **Verification Checklist**

### **Step 1: Verify Railway Environment Variable**

- [ ] Go to Railway Dashboard → Your Backend Service → **"Variables"** tab
- [ ] Check for `ALLOWED_ORIGINS` or `CORS_ORIGINS` variable
- [ ] Verify it includes your Netlify frontend URL

**Expected Format:**
```
ALLOWED_ORIGINS=https://your-site.netlify.app,https://www.your-site.netlify.app
```

**Important Notes:**
- Use comma-separated values for multiple origins
- Include `https://` protocol
- No trailing slashes
- Include both `www` and non-`www` versions if applicable

**If Missing:**
1. Click **"+ New Variable"**
2. Variable name: `ALLOWED_ORIGINS`
3. Value: Your Netlify URL(s), comma-separated
4. Click **"Add"**
5. Railway will auto-redeploy

---

### **Step 2: Test from Frontend**

#### 2.1 Open Browser DevTools

- [ ] Visit your Netlify frontend site
- [ ] Open DevTools (F12 or Right-click → Inspect)
- [ ] Go to **"Console"** tab
- [ ] Clear console (optional, for cleaner output)

#### 2.2 Test Registration/Login

- [ ] Try to register a new account
  - Fill out registration form
  - Submit form
  - Check console for errors

- [ ] Try to login
  - Enter credentials
  - Click login
  - Check console for errors

#### 2.3 Check for CORS Errors

**✅ Should NOT see:**
```
Access to fetch at 'https://your-backend.railway.app/api/...' from origin 'https://your-site.netlify.app' 
has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
```

**✅ Should see:**
- Successful API calls
- No CORS errors
- Data loads correctly
- Forms submit successfully

---

### **Step 3: Verify Preflight Requests**

Preflight requests (OPTIONS) are sent automatically by browsers for certain requests.

#### 3.1 Check Network Tab

- [ ] Open DevTools → **"Network"** tab
- [ ] Filter by **"XHR"** or **"Fetch"**
- [ ] Try to register/login
- [ ] Look for OPTIONS requests (preflight)
- [ ] Verify OPTIONS requests return **200 OK**

#### 3.2 Verify Preflight Headers

Click on an OPTIONS request and check **Response Headers**:

**Should include:**
- `Access-Control-Allow-Origin: https://your-site.netlify.app`
- `Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS`
- `Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, Accept, Origin`
- `Access-Control-Max-Age: 86400`

---

### **Step 4: Test API Calls from Frontend**

#### 4.1 Test Registration API Call

- [ ] Open DevTools → **"Network"** tab
- [ ] Try to register
- [ ] Find the registration API call
- [ ] Verify:
  - [ ] Request succeeds (200 or 201 status)
  - [ ] No CORS errors
  - [ ] Response headers include CORS headers
  - [ ] Data is returned correctly

#### 4.2 Test Login API Call

- [ ] Try to login
- [ ] Find the login API call
- [ ] Verify:
  - [ ] Request succeeds (200 status)
  - [ ] No CORS errors
  - [ ] Token is returned (if applicable)
  - [ ] Response headers include CORS headers

#### 4.3 Test Other API Calls

- [ ] Navigate through your app
- [ ] Test various features that make API calls
- [ ] Verify all API calls succeed
- [ ] Verify no CORS errors appear

---

## 🔍 **How CORS Works in Your Backend**

Your backend (`server.js` lines 43-103) uses this CORS configuration:

1. **Reads from environment variable:**
   ```javascript
   const rawOrigins = process.env.ALLOWED_ORIGINS || '';
   ```

2. **Combines with hardcoded origins:**
   - Production origins (always allowed)
   - Dev fallback origins (localhost)

3. **Validates origin:**
   - Checks if request origin matches allowed list
   - Supports wildcard patterns
   - Allows requests with no origin (non-browser tools)

4. **Sets CORS headers:**
   - `Access-Control-Allow-Origin`
   - `Access-Control-Allow-Methods`
   - `Access-Control-Allow-Headers`
   - `Access-Control-Max-Age`

---

## 🐛 **Troubleshooting**

### ⚠️ **Before troubleshooting: interpret results correctly**

Check these first to avoid false CORS alarms:

1. Ensure test origin is correct:
   - Your frontend domain in browser and `FRONTEND_URL` (for script-based checks) must match the deployed staging/production frontend.
2. Ensure backend allows that exact origin:
   - `ALLOWED_ORIGINS` (or legacy `CORS_ORIGINS`) includes the exact URL (protocol + domain, no trailing slash).
3. Distinguish CORS failure vs application validation failure:
   - `400` on `/api/auth/login` or `/api/auth/register` can be invalid payload/validation, not CORS.
   - Treat it as CORS failure only when CORS headers are missing/mismatched or browser shows CORS policy errors.

### Problem: CORS errors in browser console

**Symptoms:**
```
Access to fetch at '...' has been blocked by CORS policy
```

**Solutions:**
1. **Check `ALLOWED_ORIGINS` in Railway:**
   - Verify variable is set correctly
   - Verify Netlify URL is included
   - Check for typos (https vs http, trailing slashes)

2. **Verify URL format:**
   - Must include `https://`
   - No trailing slash
   - Exact match required (unless using wildcards)

3. **Check Railway logs:**
   - Look for "CORS: Blocked origin" messages
   - Verify which origins are being checked

4. **Redeploy backend:**
   - After changing `ALLOWED_ORIGINS`, redeploy backend
   - Wait for deployment to complete

### Problem: Preflight requests fail

**Symptoms:**
- OPTIONS requests return errors
- API calls fail even though origin is allowed

**Solutions:**
1. **Verify OPTIONS handling:**
   - Backend has: `app.options('*', cors(corsOptions));`
   - This should handle preflight requests

2. **Check CORS middleware order:**
   - CORS middleware should be before routes
   - Verify in `server.js` (line 102)

### Problem: Some API calls work, others don't

**Possible Causes:**
- Different endpoints have different CORS settings
- Some requests don't trigger preflight (simple requests)
- Headers or methods not allowed

**Solutions:**
- Verify all endpoints use the same CORS configuration
- Check `allowedMethods` includes all needed methods
- Check `allowedHeaders` includes all needed headers

---

## ✅ **Quick Verification Test**

### Test Script (Browser Console)

Open your Netlify site, open DevTools Console, and run:

```javascript
// Test CORS configuration
fetch('https://your-backend.railway.app/api/health', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  }
})
.then(response => {
  console.log('✅ CORS working!', response.status);
  return response.json();
})
.then(data => console.log('Response:', data))
.catch(error => console.error('❌ CORS error:', error));
```

**Expected Result:**
- ✅ Should see "CORS working!" message
- ✅ Should see response data
- ❌ Should NOT see CORS error

---

## 📝 **Verification Summary**

CORS is correctly configured when:

- ✅ `ALLOWED_ORIGINS` includes your Netlify URL
- ✅ No CORS errors in browser console
- ✅ Preflight requests (OPTIONS) succeed
- ✅ API calls from frontend work
- ✅ Registration/login work without CORS errors
- ✅ All API endpoints accessible from frontend

---

## 🔗 **Related Documentation**

- **Environment Variables:** `ENVIRONMENT_VARIABLES_VERIFICATION.md`
- **Backend CORS Code:** `backend/server.js` (lines 43-103)

---

## ⚡ **Quick Fix**

If CORS is not working:

1. **Add/Update Railway Variable:**
   ```
   ALLOWED_ORIGINS=https://your-site.netlify.app
   ```

2. **Redeploy Backend:**
   - Railway auto-redeploys when variables change
   - Or manually trigger redeploy

3. **Test Again:**
   - Clear browser cache
   - Hard refresh (Ctrl+Shift+R)
   - Test registration/login

---

**Last Updated:** January 2025
