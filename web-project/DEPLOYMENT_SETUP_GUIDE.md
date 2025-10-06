# SmartFarm Web - Deployment Setup Guide

## 🚀 Railway Deployment Setup

### Step 1: Set Environment Variables in Railway

1. **Go to Railway Dashboard:**
   - Visit [railway.app](https://railway.app)
   - Navigate to your SmartFarm web project

2. **Add Environment Variables:**
   - Go to **Variables** tab
   - Add the following variables:

   ```
   VITE_API_URL=https://smartfarm-app-production.up.railway.app/api
   APP_BUILD_TAG=railway
   NODE_ENV=production
   ```

3. **Verify Configuration:**
   - Ensure `railway.web.json` is in your project root
   - Check that `rootDirectory` is set to `web-project`

### Step 2: Redeploy Railway

1. **Trigger Deployment:**
   - Go to **Deployments** tab
   - Click **Deploy** or push new changes to trigger rebuild

2. **Monitor Build:**
   - Watch the build logs for any errors
   - Ensure `npm ci` and `npm run build` complete successfully

3. **Test Deployment:**
   - Visit your Railway URL
   - Check that the app loads and shows the correct API URL

---

## 🌐 Netlify Deployment Setup

### Step 1: Set Environment Variables in Netlify

1. **Go to Netlify Dashboard:**
   - Visit [netlify.com](https://netlify.com)
   - Navigate to your SmartFarm site

2. **Add Environment Variables:**
   - Go to **Site settings** → **Environment variables**
   - Add the following variables:

   ```
   VITE_API_URL=https://smartfarm-app-production.up.railway.app/api
   APP_BUILD_TAG=netlify
   NODE_VERSION=18
   ```

3. **Verify Build Settings:**
   - Go to **Site settings** → **Build & deploy** → **Build settings**
   - Ensure:
     - **Build command:** `npm run build`
     - **Publish directory:** `dist`
     - **Node version:** `18`

### Step 2: Redeploy Netlify

1. **Trigger Deployment:**
   - Go to **Deployments** tab
   - Click **Trigger deploy** → **Deploy site**

2. **Monitor Build:**
   - Watch the build logs
   - Ensure build completes without errors

3. **Test Deployment:**
   - Visit your Netlify URL
   - Check that the app loads correctly

---

## 🧪 Testing Your Deployments

### Test Checklist:

- [ ] **Railway deployment loads successfully**
- [ ] **Netlify deployment loads successfully**
- [ ] **API URL is correctly displayed**
- [ ] **Environment variables are working**
- [ ] **Build process completes without errors**

### Common Issues & Solutions:

1. **Build Fails:**
   - Check environment variables are set correctly
   - Verify Node version compatibility
   - Check build logs for specific errors

2. **API Calls Fail:**
   - Verify `VITE_API_URL` is set correctly
   - Check CORS settings on your backend
   - Test API endpoint directly

3. **App Shows Wrong Content:**
   - This indicates the architectural conflict issue
   - Follow the cleanup plan below

---

## 🏗️ Architectural Cleanup Plan

### Current Problem:
Your project has conflicting architectures:
- **Vite SPA** (minimal) - Currently deployed
- **Static HTML** (full app) - Not being used

### Solution Options:

#### Option A: Quick Fix - Use Static HTML (Recommended for immediate deployment)

1. **Update Netlify Configuration:**
   ```toml
   [build]
     command = "echo 'No build needed'"
     publish = "public"
   ```

2. **Update Railway Configuration:**
   ```json
   {
     "build": {
       "builder": "NIXPACKS",
       "installCommand": "echo 'No install needed'",
       "buildCommand": "echo 'No build needed'"
     },
     "deploy": {
       "startCommand": "npx serve public -p $PORT",
       "healthcheckPath": "/",
       "healthcheckTimeout": 120
     },
     "rootDirectory": "web-project"
   }
   ```

3. **Redeploy both platforms**

#### Option B: Convert to Vite SPA (Better long-term)

1. **Move application files:**
   - Move HTML files from `public/` to `src/`
   - Convert to Vue/React components
   - Move JS files to `src/`

2. **Update Vite configuration:**
   - Configure proper routing
   - Set up asset handling

3. **Redeploy with new structure**

---

## 📋 Next Steps

1. **Immediate:** Set environment variables and redeploy
2. **Short-term:** Choose and implement architectural cleanup
3. **Long-term:** Optimize and enhance the application

## 🔗 Useful Links

- [Railway Environment Variables](https://docs.railway.app/deploy/variables)
- [Netlify Environment Variables](https://docs.netlify.com/environment-variables/overview/)
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)
