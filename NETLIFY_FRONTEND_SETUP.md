# 🌐 Netlify Frontend Configuration Guide

**Step-by-step guide to configure your SmartFarm frontend on Netlify**

---

## 📋 Prerequisites

- ✅ Netlify account (sign up at https://app.netlify.com if needed)
- ✅ GitHub repository connected
- ✅ Backend URL: `https://smartfarm-app-production.up.railway.app`

---

## 🚀 Step-by-Step Setup

### Step 1: Access Netlify Dashboard (1 minute)

1. **Go to Netlify**
   - Visit: https://app.netlify.com
   - Sign in with GitHub (recommended)

2. **Find Your Site**
   - If site already exists: Click on your SmartFarm site
   - If site doesn't exist: See "Create New Site" section below

---

### Step 2: Create New Site (If Needed) (5 minutes)

**Skip this if your site already exists!**

1. **Click "Add new site"**
   - Top right corner → "Add new site"
   - Select "Import an existing project"

2. **Connect GitHub**
   - Choose "GitHub" as Git provider
   - Authorize Netlify if prompted
   - Select repository: `Warusi2023/smartfarm-app`

3. **Configure Build Settings**
   - Click "Show advanced" or "Change settings"
   - Set these values:
     ```
     Base directory:     web-project
     Build command:      npm install && npm run build
     Publish directory:  web-project/dist
     ```
   - **DO NOT click "Deploy site" yet!** (We need to set environment variables first)

---

### Step 3: Configure Environment Variables (5 minutes)

**⚠️ CRITICAL: Set these BEFORE deploying!**

1. **Go to Environment Variables**
   - Click your site → **"Site settings"** (left sidebar)
   - Click **"Environment variables"** (under "Build & deploy")
   - Click **"Add a variable"**

2. **Add Required Variables**

   Add these variables one by one:

   **Variable 1:**
   ```
   Variable name: VITE_API_URL
   Value: https://smartfarm-app-production.up.railway.app
   Scope: All scopes (or Production)
   ```
   Click **"Add variable"**

   **Variable 2:**
   ```
   Variable name: VITE_API_BASE_URL
   Value: https://smartfarm-app-production.up.railway.app
   Scope: All scopes (or Production)
   ```
   Click **"Add variable"**

   **Variable 3:**
   ```
   Variable name: VITE_APP_NAME
   Value: SmartFarm
   Scope: All scopes (or Production)
   ```
   Click **"Add variable"**

   **Variable 4:**
   ```
   Variable name: VITE_APP_VERSION
   Value: 1.0.0
   Scope: All scopes (or Production)
   ```
   Click **"Add variable"**

   **Variable 5 (Optional but recommended):**
   ```
   Variable name: NODE_ENV
   Value: production
   Scope: All scopes (or Production)
   ```
   Click **"Add variable"**

3. **Verify All Variables**
   - You should see 5 variables listed:
     - ✅ VITE_API_URL
     - ✅ VITE_API_BASE_URL
     - ✅ VITE_APP_NAME
     - ✅ VITE_APP_VERSION
     - ✅ NODE_ENV

---

### Step 4: Configure Build Settings (2 minutes)

1. **Go to Build Settings**
   - Site settings → **"Build & deploy"** → **"Build settings"**
   - Click **"Edit settings"**

2. **Verify Build Configuration**
   ```
   Base directory:     web-project
   Build command:      npm install && npm run build
   Publish directory:   web-project/dist
   ```

3. **Set Node Version**
   - Scroll down to **"Environment"** section
   - Set **Node version**: `18` or `20`
   - Click **"Save"**

---

### Step 5: Deploy Frontend (5 minutes)

1. **Trigger Deployment**
   - Go to **"Deploys"** tab (top navigation)
   - Click **"Trigger deploy"** → **"Clear cache and deploy site"**
   - Or if this is first deploy, click **"Deploy site"** button

2. **Monitor Build**
   - Watch the build logs
   - Look for:
     - ✅ `npm install` completes
     - ✅ `npm run build` completes
     - ✅ `Deploy site` completes
     - ✅ "Published" status

3. **Note Your Netlify URL**
   - After deployment, you'll see your site URL
   - Format: `https://[random-name].netlify.app`
   - Or custom domain if configured
   - **Save this URL!** You'll need it for CORS configuration

---

### Step 6: Verify Deployment (3 minutes)

1. **Visit Your Site**
   - Click on your Netlify URL
   - Or go to: Deploys tab → Latest deployment → "View deploy"

2. **Check Browser Console**
   - Open DevTools (F12)
   - Go to **Console** tab
   - Look for:
     - ✅ `[API Config] Using environment URL: https://smartfarm-app-production.up.railway.app`
     - ✅ No CORS errors
     - ✅ No API connection errors

3. **Test API Connection**
   - Go to **Network** tab in DevTools
   - Try to register/login
   - Check if API calls succeed (status 200)
   - Verify API calls go to: `https://smartfarm-app-production.up.railway.app`

---

## ✅ Verification Checklist

After completing all steps, verify:

- [ ] Site is deployed and accessible
- [ ] All 5 environment variables are set
- [ ] Build completed successfully
- [ ] No errors in browser console
- [ ] API calls succeed (check Network tab)
- [ ] Frontend connects to backend
- [ ] Netlify URL is noted (for CORS configuration)

---

## 🔧 Troubleshooting

### Problem: Build Fails

**Common Causes:**
- Missing environment variables
- Wrong base directory
- Node version mismatch

**Solution:**
1. Check build logs for specific errors
2. Verify environment variables are set
3. Verify base directory is `web-project`
4. Try setting Node version to 18 or 20

### Problem: Frontend Can't Connect to Backend

**Check:**
1. Verify `VITE_API_URL` is set correctly
2. No `/api` at the end of URL
3. Check browser console for errors
4. Verify backend is running (test health endpoint)

### Problem: Environment Variables Not Working

**Check:**
1. Variables must start with `VITE_` to be available in frontend
2. Redeploy after adding variables
3. Check build logs for variable injection
4. Clear cache and redeploy

### Problem: CORS Errors

**Solution:**
1. This is normal until CORS_ORIGINS is configured in Railway
2. After getting Netlify URL, update Railway CORS_ORIGINS
3. See next section for CORS configuration

---

## 🔗 Next Steps

After Netlify is configured:

1. **Update Railway CORS_ORIGINS**
   - Railway → Backend → Variables → CORS_ORIGINS
   - Set to: `https://your-site.netlify.app,https://www.your-site.netlify.app`
   - Wait for Railway redeploy

2. **Test End-to-End**
   - Visit Netlify URL
   - Try user registration
   - Try user login
   - Verify no CORS errors

3. **Run Final Verification**
   ```powershell
   $env:FRONTEND_URL="https://your-site.netlify.app"
   node scripts/verify-phase1.js
   ```

---

## 📝 Quick Reference

**Netlify Dashboard:** https://app.netlify.com  
**Environment Variables:** Site settings → Environment variables  
**Build Settings:** Site settings → Build & deploy → Build settings  
**Deployments:** Deploys tab → Trigger deploy

**Required Variables:**
```
VITE_API_URL=https://smartfarm-app-production.up.railway.app
VITE_API_BASE_URL=https://smartfarm-app-production.up.railway.app
VITE_APP_NAME=SmartFarm
VITE_APP_VERSION=1.0.0
NODE_ENV=production
```

---

**Ready to start? Follow Step 1 above!** 🚀
