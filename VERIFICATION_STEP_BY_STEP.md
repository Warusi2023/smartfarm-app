# ✅ Step-by-Step Verification Guide

**Follow these steps to verify your production environment**

---

## 🔍 PART 1: Railway Backend Verification

### Step 1.1: Access Railway Dashboard

1. **Go to:** https://railway.app/dashboard
2. **Sign in** if needed
3. **Find your project** (likely `smartfarm-app-production` or similar)

### Step 1.2: Check Backend Service Status

1. **Click on your backend service** (not PostgreSQL)
2. **Check service status:**
   - Should show: **"Running"** ✅
   - If not running, click "Deploy" or "Redeploy"

### Step 1.3: Verify Environment Variables

1. **Click "Variables" tab** (in backend service)
2. **Check for these variables:**

**Required Variables:**
```
✅ DATABASE_URL
   - Should exist (auto-added by PostgreSQL plugin)
   - Format: postgresql://user:pass@host:port/db
   - Status: [ ] Found  [ ] Missing

✅ NODE_ENV
   - Value should be: production
   - Status: [ ] Set  [ ] Missing

✅ PORT
   - Value should be: 3000
   - Status: [ ] Set  [ ] Missing

✅ JWT_SECRET
   - Should be 32+ character random string
   - Example: bb2a4fc5abc7bf4ccf661e1835e227c6f22c7280c62ca5f19aed95d49a8220d7
   - Status: [ ] Set  [ ] Missing

✅ CORS_ORIGINS
   - Should include your Netlify URL
   - Format: https://your-site.netlify.app,https://www.your-site.netlify.app
   - No spaces around commas!
   - Status: [ ] Set  [ ] Missing

✅ API_NAME
   - Value: SmartFarm
   - Status: [ ] Set  [ ] Missing

✅ API_VERSION
   - Value: v1
   - Status: [ ] Set  [ ] Missing
```

**Optional Variables:**
```
⚠️ WEATHER_API_KEY
   - For weather alerts feature
   - Status: [ ] Set  [ ] Missing (optional)

⚠️ GOOGLE_API_KEY
   - For Google Maps feature
   - Status: [ ] Set  [ ] Missing (optional)

⚠️ OPENAI_API_KEY
   - For AI features
   - Status: [ ] Set  [ ] Missing (optional)
```

### Step 1.4: Check Database Connection

1. **Click "Logs" tab** (in backend service)
2. **Scroll through recent logs**
3. **Look for these messages:**

**✅ Good Signs:**
```
✅ Database connected successfully
✅ Database pool initialized
✅ Connected to PostgreSQL
✅ Server started successfully
```

**❌ Bad Signs:**
```
❌ Database connection error
❌ DATABASE_URL not set
❌ Failed to connect to database
❌ Database pool not initialized
```

**If you see database errors:**
- Check `DATABASE_URL` exists in Variables tab
- Verify PostgreSQL service is running
- Restart backend service

### Step 1.5: Verify PostgreSQL Service

1. **Click on PostgreSQL service** (separate from backend)
2. **Check status:** Should be **"Running"** ✅
3. **Go to "Variables" tab:**
   - Should see `DATABASE_URL` here
   - Copy this value if backend doesn't have it

---

## 🌐 PART 2: Netlify Frontend Verification

### Step 2.1: Access Netlify Dashboard

1. **Go to:** https://app.netlify.com
2. **Sign in** if needed
3. **Click on your SmartFarm site**

### Step 2.2: Check Site Status

1. **Check deployment status:**
   - Latest deployment should be **"Published"** ✅
   - If failed, check build logs

2. **Note your Netlify URL:**
   - Format: `https://[name].netlify.app`
   - **Save this URL!** You'll need it for CORS

### Step 2.3: Verify Environment Variables

1. **Go to:** Site settings → **Environment variables**
2. **Check for these variables:**

**Required Variables:**
```
✅ VITE_API_URL
   - Value: https://smartfarm-app-production.up.railway.app
   - ⚠️ NO /api at the end!
   - Status: [ ] Set  [ ] Missing

✅ VITE_API_BASE_URL (optional but recommended)
   - Value: https://smartfarm-app-production.up.railway.app
   - Status: [ ] Set  [ ] Missing

✅ VITE_APP_NAME
   - Value: SmartFarm
   - Status: [ ] Set  [ ] Missing

✅ VITE_APP_VERSION
   - Value: 1.0.0
   - Status: [ ] Set  [ ] Missing
```

**Important Notes:**
- Variables must start with `VITE_` to be available in frontend
- After adding variables, **redeploy** the site
- Check "Deploys" tab → "Trigger deploy" → "Clear cache and deploy"

### Step 2.4: Verify Build Settings

1. **Go to:** Site settings → **Build & deploy** → **Build settings**
2. **Click "Edit settings"**
3. **Verify:**
   ```
   Base directory:     web-project
   Build command:      npm install && npm run build
   Publish directory:   web-project/dist
   ```

---

## 🔗 PART 3: CORS Configuration Verification

### Step 3.1: Get Your Netlify URL

From Step 2.2, note your Netlify URL:
- Example: `https://your-site.netlify.app`

### Step 3.2: Update Railway CORS_ORIGINS

1. **Go back to Railway** → Backend service → Variables
2. **Find or create `CORS_ORIGINS`**
3. **Set value to:**
   ```
   https://your-site.netlify.app,https://www.your-site.netlify.app
   ```
   **Important:**
   - Replace `your-site.netlify.app` with your actual Netlify URL
   - No spaces around commas
   - No trailing slashes
   - Include both `www` and non-www versions

4. **Save** - Railway will auto-redeploy

### Step 3.3: Test CORS Configuration

1. **Wait 2-3 minutes** for Railway redeploy
2. **Visit your Netlify URL**
3. **Open DevTools (F12)** → **Console** tab
4. **Try to register/login**
5. **Check for CORS errors:**
   - ✅ No CORS errors = Configured correctly
   - ❌ CORS errors = Check CORS_ORIGINS format

---

## ✅ PART 4: Final Verification

### Step 4.1: Run Verification Script

```powershell
# Set your actual frontend URL
$env:FRONTEND_URL="https://your-actual-site.netlify.app"
$env:BACKEND_URL="https://smartfarm-app-production.up.railway.app"

# Run verification
node scripts/verify-pre-launch-status.js
```

### Step 4.2: Manual Testing

1. **Test Backend Health:**
   ```powershell
   # Should return: {"ok": true, ...}
   Invoke-WebRequest -Uri "https://smartfarm-app-production.up.railway.app/api/health"
   ```

2. **Test Frontend:**
   - Visit your Netlify URL
   - Open DevTools → Console
   - Should see: `[API Config] Using environment URL: ...`
   - No errors

3. **Test Registration:**
   - Try to register a new user
   - Should succeed
   - Check Network tab → Should see API call succeed

4. **Test Login:**
   - Try to login
   - Should succeed
   - Should redirect to dashboard

---

## 📋 Verification Checklist

### Railway Backend
- [ ] Backend service is running
- [ ] `DATABASE_URL` exists in Variables
- [ ] `JWT_SECRET` exists (32+ chars)
- [ ] `CORS_ORIGINS` includes frontend URL
- [ ] `NODE_ENV=production` is set
- [ ] `API_NAME=SmartFarm` is set
- [ ] `API_VERSION=v1` is set
- [ ] Database connection confirmed in logs
- [ ] PostgreSQL service is running

### Netlify Frontend
- [ ] Site is deployed and published
- [ ] `VITE_API_URL` is set correctly
- [ ] `VITE_APP_NAME=SmartFarm` is set
- [ ] `VITE_APP_VERSION=1.0.0` is set
- [ ] Build settings are correct
- [ ] Site loads without errors

### CORS Configuration
- [ ] `CORS_ORIGINS` includes Netlify URL
- [ ] Format is correct (no spaces, no trailing slashes)
- [ ] Backend redeployed after CORS change
- [ ] No CORS errors in browser console

### Testing
- [ ] Backend health endpoint works
- [ ] Frontend loads correctly
- [ ] User registration works
- [ ] User login works
- [ ] No console errors
- [ ] API calls succeed

---

## 🐛 Common Issues & Fixes

### Issue: DATABASE_URL Missing

**Fix:**
1. Go to PostgreSQL service → Variables
2. Copy `DATABASE_URL` value
3. Go to Backend service → Variables
4. Add `DATABASE_URL` = (paste value)
5. Save and wait for redeploy

### Issue: CORS Errors

**Fix:**
1. Verify `CORS_ORIGINS` includes exact Netlify URL
2. Check format: `https://site.netlify.app,https://www.site.netlify.app`
3. No spaces around commas
4. Restart backend after changing

### Issue: Frontend Can't Connect to Backend

**Fix:**
1. Verify `VITE_API_URL` is set correctly
2. No `/api` at the end
3. Check backend is running
4. Redeploy frontend after adding variables

### Issue: Environment Variables Not Working

**Fix:**
1. Variables must start with `VITE_` for frontend
2. Redeploy after adding variables
3. Clear cache and redeploy
4. Check build logs for variable injection

---

## 📝 Verification Report Template

**Date:** _______________
**Verified By:** _______________

### Railway Backend
- DATABASE_URL: [ ] ✅ Set  [ ] ❌ Missing
- JWT_SECRET: [ ] ✅ Set  [ ] ❌ Missing
- CORS_ORIGINS: [ ] ✅ Set  [ ] ❌ Missing
- Database Connection: [ ] ✅ Connected  [ ] ❌ Issues

### Netlify Frontend
- VITE_API_URL: [ ] ✅ Set  [ ] ❌ Missing
- VITE_APP_NAME: [ ] ✅ Set  [ ] ❌ Missing
- VITE_APP_VERSION: [ ] ✅ Set  [ ] ❌ Missing
- Site Status: [ ] ✅ Published  [ ] ❌ Issues

### CORS Configuration
- CORS_ORIGINS Updated: [ ] ✅ Yes  [ ] ❌ No
- CORS Errors: [ ] ✅ None  [ ] ❌ Present

### Testing Results
- Backend Health: [ ] ✅ Works  [ ] ❌ Fails
- Frontend Loads: [ ] ✅ Works  [ ] ❌ Fails
- Registration: [ ] ✅ Works  [ ] ❌ Fails
- Login: [ ] ✅ Works  [ ] ❌ Fails

**Issues Found:**
1. 
2. 
3. 

**Next Steps:**
1. 
2. 
3. 

---

## 🎯 Success Criteria

Verification is complete when:

- ✅ All required environment variables are set
- ✅ Database connection confirmed
- ✅ CORS configured correctly
- ✅ Backend health endpoint works
- ✅ Frontend connects to backend
- ✅ No CORS errors
- ✅ Registration/login works

---

**Ready to start? Begin with Step 1.1: Access Railway Dashboard!** 🔍
