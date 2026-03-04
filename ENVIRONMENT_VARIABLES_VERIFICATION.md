# 🔍 Environment Variables Verification Guide

**Complete guide to verify and configure environment variables for Railway (Backend) and Netlify (Frontend)**

---

## 📋 **Quick Verification Checklist**

### ✅ **Railway Backend Variables** (Required)
- [ ] `DATABASE_URL` - Auto-provided by Railway PostgreSQL plugin
- [ ] `JWT_SECRET` - 32+ character random string
- [ ] `ALLOWED_ORIGINS` or `CORS_ORIGINS` - Must include Netlify frontend URL
- [ ] `NODE_ENV=production`
- [ ] `PORT=3000` (or Railway default)
- [ ] `SENTRY_DSN` - Optional but recommended
- [ ] `WEATHER_API_KEY` - Optional (for weather alerts)
- [ ] `GOOGLE_API_KEY` - Optional (for maps features)

### ✅ **Netlify Frontend Variables** (Required)
- [ ] `VITE_API_URL` - Backend API URL (e.g., `https://smartfarm-app-production.up.railway.app`)
- [ ] `VITE_APP_NAME=SmartFarm`
- [ ] `VITE_APP_VERSION=1.0.0`
- [ ] `VITE_SENTRY_DSN` - Optional but recommended

---

## 🚂 **Railway Backend Verification**

### Step 1: Access Railway Dashboard
1. Go to https://railway.app
2. Sign in to your account
3. Navigate to your SmartFarm backend project
4. Click on the backend service (usually named `smartfarm-app` or `backend`)

### Step 2: Check Variables Tab
1. Click on **"Variables"** tab in the left sidebar
2. Review all listed environment variables

### Step 3: Verify Required Variables

#### **Critical Variables (Must Have):**

| Variable | Expected Value | How to Verify |
|----------|---------------|---------------|
| `DATABASE_URL` | `postgresql://...` | Should be auto-added by Railway PostgreSQL plugin. Check Railway logs for "Database connected successfully" |
| `JWT_SECRET` | Random 32+ char string | Generate: `openssl rand -base64 32` or use Railway's random generator |
| `ALLOWED_ORIGINS` | Your Netlify URL(s) | Format: `https://your-site.netlify.app` (comma-separated for multiple) |
| `NODE_ENV` | `production` | Must be exactly `production` |

#### **Optional but Recommended:**

| Variable | Purpose | How to Get |
|----------|---------|------------|
| `SENTRY_DSN` | Error tracking | Get from Sentry dashboard (see Sentry setup guide) |
| `WEATHER_API_KEY` | Weather alerts | Get from https://openweathermap.org/api |
| `GOOGLE_API_KEY` | Maps/Geocoding | Get from https://console.cloud.google.com |

### Step 4: Add Missing Variables

**If any required variables are missing:**

1. Click **"+ New Variable"** button
2. Enter variable name (case-sensitive)
3. Enter variable value
4. Click **"Add"**
5. Railway will automatically redeploy

**Quick Setup Commands (for Railway CLI):**

```bash
# Install Railway CLI (if not installed)
npm install -g @railway/cli

# Login
railway login

# Link to your project
railway link

# Add variables
railway variables set JWT_SECRET=$(openssl rand -base64 32)
railway variables set NODE_ENV=production
railway variables set ALLOWED_ORIGINS=https://your-site.netlify.app
```

### Step 5: Verify Database Connection

1. Go to Railway Dashboard → Your Backend → **"Logs"** tab
2. Look for: `"Database connected successfully"` or `"Connected to PostgreSQL"`
3. If you see connection errors, check `DATABASE_URL` is set correctly

### Step 6: Test CORS Configuration

1. Open your Netlify frontend in a browser
2. Open DevTools (F12) → Console tab
3. Try to register/login
4. **Should NOT see:** `CORS policy: No 'Access-Control-Allow-Origin' header`
5. **Should see:** Successful API calls

---

## 🌐 **Netlify Frontend Verification**

### Step 1: Access Netlify Dashboard
1. Go to https://app.netlify.com
2. Sign in to your account
3. Navigate to your SmartFarm site

### Step 2: Check Environment Variables
1. Click **"Site settings"** (left sidebar)
2. Click **"Environment variables"** (under "Build & deploy")
3. Review all listed variables

### Step 3: Verify Required Variables

#### **Critical Variables (Must Have):**

| Variable | Expected Value | Notes |
|----------|---------------|-------|
| `VITE_API_URL` | `https://smartfarm-app-production.up.railway.app` | No trailing `/api` |
| `VITE_APP_NAME` | `SmartFarm` | Display name |
| `VITE_APP_VERSION` | `1.0.0` | Version number |

#### **Optional but Recommended:**

| Variable | Purpose | How to Get |
|----------|---------|------------|
| `VITE_SENTRY_DSN` | Frontend error tracking | Get from Sentry dashboard |

### Step 4: Add Missing Variables

**If any required variables are missing:**

1. Click **"Add a variable"** button
2. Enter variable name (must start with `VITE_` for Vite to expose it)
3. Enter variable value
4. Select scope: **"All scopes"** or **"Production"**
5. Click **"Add variable"**

**Important Notes:**
- Variables starting with `VITE_` are exposed to the frontend code
- **Never put secrets** in `VITE_` variables (they're public!)
- After adding variables, **redeploy** the site

### Step 5: Redeploy Frontend

After adding/modifying environment variables:

1. Go to **"Deploys"** tab
2. Click **"Trigger deploy"** → **"Deploy site"**
3. Wait for build to complete (2-5 minutes)
4. Verify deployment succeeded

### Step 6: Verify Frontend Configuration

1. Visit your Netlify site URL
2. Open DevTools (F12) → Console tab
3. Look for: `[API Config] Using environment URL: https://smartfarm-app-production.up.railway.app`
4. **Should NOT see:** API connection errors
5. Try navigating to different pages - should work without errors

---

## 🔧 **Verification Script**

Create a file `verify-env-vars.js` in your project root:

```javascript
// verify-env-vars.js
// Run this script to verify environment variables are set correctly

const requiredBackendVars = [
  'DATABASE_URL',
  'JWT_SECRET',
  'ALLOWED_ORIGINS',
  'NODE_ENV'
];

const requiredFrontendVars = [
  'VITE_API_URL',
  'VITE_APP_NAME',
  'VITE_APP_VERSION'
];

console.log('🔍 Environment Variables Verification\n');

// Check backend variables (if running in backend context)
if (process.env.NODE_ENV) {
  console.log('📦 Backend Variables:');
  requiredBackendVars.forEach(varName => {
    const value = process.env[varName];
    if (value) {
      const displayValue = varName.includes('SECRET') || varName.includes('PASSWORD') 
        ? '***' + value.slice(-4) 
        : value;
      console.log(`  ✅ ${varName}: ${displayValue}`);
    } else {
      console.log(`  ❌ ${varName}: MISSING`);
    }
  });
}

console.log('\n📝 Frontend Variables (check in Netlify dashboard):');
requiredFrontendVars.forEach(varName => {
  console.log(`  - ${varName}`);
});

console.log('\n✅ Verification complete!');
```

---

## 🐛 **Troubleshooting**

### Problem: Backend can't connect to database
**Solution:**
- Check `DATABASE_URL` is set in Railway
- Verify PostgreSQL plugin is attached to your service
- Check Railway logs for connection errors

### Problem: CORS errors in browser console
**Solution:**
- Verify `ALLOWED_ORIGINS` in Railway includes your Netlify URL
- Check URL format (no trailing slash, include `https://`)
- Redeploy backend after changing CORS variables

### Problem: Frontend can't connect to backend API
**Solution:**
- Verify `VITE_API_URL` is set correctly in Netlify
- Check backend URL is accessible: `curl https://your-backend.railway.app/api/health`
- Ensure no trailing `/api` in `VITE_API_URL`
- Redeploy frontend after changing variables

### Problem: Environment variables not updating
**Solution:**
- **Railway:** Variables update automatically, but trigger redeploy if needed
- **Netlify:** Must redeploy after adding/changing variables
- Clear browser cache and hard refresh (Ctrl+Shift+R)

---

## ✅ **Final Verification Checklist**

Before launching, verify:

- [ ] All Railway backend variables are set
- [ ] All Netlify frontend variables are set
- [ ] Database connection successful (check Railway logs)
- [ ] CORS working (no errors in browser console)
- [ ] Frontend can make API calls successfully
- [ ] Backend health check returns 200 OK
- [ ] No environment variable warnings in logs

---

## 📚 **Additional Resources**

- Railway Variables Docs: https://docs.railway.app/develop/variables
- Netlify Environment Variables: https://docs.netlify.com/environment-variables/overview/
- Vite Environment Variables: https://vitejs.dev/guide/env-and-mode.html

---

**Last Updated:** January 2025
