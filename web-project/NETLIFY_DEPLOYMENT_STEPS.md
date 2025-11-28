# Netlify Deployment - Step-by-Step Guide

This guide walks you through deploying SmartFarm to Netlify with the correct configuration.

## Prerequisites

- ✅ GitHub repository is up to date
- ✅ Local build works (`npm run build` succeeds)
- ✅ Netlify account (sign up at https://app.netlify.com)

---

## Step 1: Run Preparation Script

First, verify everything is ready:

```powershell
cd web-project
.\scripts\prepare-deployment.ps1
```

This will:
- Verify build works
- Check configuration files
- List required environment variables

---

## Step 2: Connect Repository to Netlify

1. Go to [Netlify Dashboard](https://app.netlify.com)
2. Click **"Add new site"** → **"Import an existing project"**
3. Choose **"Deploy with GitHub"**
4. Authorize Netlify to access your GitHub account (if first time)
5. Select your repository: `smartfarm-app` (or your repo name)
6. Click **"Connect"**

---

## Step 3: Configure Build Settings

**IMPORTANT**: Configure these settings BEFORE clicking "Deploy site"

### 3.1: Basic Build Settings

In the **"Configure build"** section:

- **Base directory**: `web-project`
  - This tells Netlify to run commands from the `web-project/` folder
  
- **Build command**: `npm install && npm run build`
  - This installs dependencies and builds the app
  
- **Publish directory**: `dist`
  - This is where Vite outputs the built files
  - **Note**: This is relative to the base directory, so Netlify will look for `web-project/dist`

### 3.2: Advanced Settings (Optional)

Click **"Show advanced"** to configure:

- **Node version**: `18` (or `20`)
- **NPM version**: Auto (or specify if needed)

---

## Step 4: Add Environment Variables

**CRITICAL**: Add these BEFORE the first deploy so they're available during build.

1. Click **"Show advanced"** → **"New variable"**
2. Add each variable one by one:

```bash
# Required - API Configuration
VITE_API_BASE_URL = https://smartfarm-app-production.up.railway.app
VITE_API_URL = https://smartfarm-app-production.up.railway.app

# Required - App Configuration
VITE_APP_NAME = SmartFarm
VITE_APP_VERSION = 1.0.0
NODE_ENV = production

# Optional - External Services (add later if needed)
# VITE_MAPS_API_KEY = your_google_maps_api_key
# VITE_OPENWEATHER_API_KEY = your_openweather_api_key
# VITE_GOOGLE_ANALYTICS_ID = your_ga_id
```

**Important Notes**:
- Variable names are **case-sensitive**
- Variables starting with `VITE_` are exposed to client-side code
- After adding variables, you'll need to trigger a new deployment

---

## Step 5: Deploy

1. Review all settings
2. Click **"Deploy site"**
3. Wait for build to complete (2-5 minutes)
4. Your site will be live at: `https://[random-name].netlify.app`

---

## Step 6: Verify Deployment

After deployment completes, run the verification script:

```powershell
cd web-project
.\scripts\verify-production.ps1 -ProductionUrl "https://your-site-name.netlify.app"
```

Or manually check:
- ✅ Site loads without errors
- ✅ HTTPS is enabled (green padlock)
- ✅ No console errors in browser DevTools
- ✅ API calls work (check Network tab)

---

## Step 7: Update Site Settings (Post-Deployment)

After first successful deployment:

### 7.1: Site Name (Optional)

1. Go to **Site Settings** → **General** → **Site details**
2. Click **"Change site name"**
3. Enter a custom name (e.g., `smartfarm-app`)
4. Your URL becomes: `https://smartfarm-app.netlify.app`

### 7.2: Custom Domain (Optional)

1. Go to **Site Settings** → **Domain management**
2. Click **"Add custom domain"**
3. Enter your domain (e.g., `smartfarm.com`)
4. Follow DNS configuration instructions
5. Netlify will automatically provision SSL certificate

### 7.3: Continuous Deployment

By default, Netlify will auto-deploy when you push to `main` branch.

To configure:
1. Go to **Site Settings** → **Build & deploy** → **Continuous Deployment**
2. Verify:
   - **Production branch**: `main`
   - **Build command**: `npm install && npm run build`
   - **Publish directory**: `dist`
   - **Base directory**: `web-project`

---

## Step 8: Run Performance Tests

After deployment, test performance:

```powershell
cd web-project
.\scripts\test-lighthouse.ps1 -Url "https://your-site-name.netlify.app"
```

Or use Chrome DevTools:
1. Open your site in Chrome
2. Press F12 → Go to **Lighthouse** tab
3. Select categories → Click **"Generate report"**

**Target Scores**:
- Performance: ≥ 80
- Accessibility: ≥ 90
- Best Practices: ≥ 80
- SEO: ≥ 80

---

## Step 9: Test Core Features

Manually test these critical flows:

- [ ] **Authentication**
  - [ ] User registration
  - [ ] User login
  - [ ] Logout
  - [ ] Session persistence (refresh page)

- [ ] **Dashboard**
  - [ ] Dashboard loads with data
  - [ ] Navigation works
  - [ ] Responsive design (mobile/tablet/desktop)

- [ ] **Data Operations**
  - [ ] Create farm
  - [ ] View farms list
  - [ ] Edit farm
  - [ ] Delete farm
  - [ ] Similar tests for livestock, crops, tasks, inventory

- [ ] **API Integration**
  - [ ] API calls succeed (check Network tab)
  - [ ] No CORS errors
  - [ ] Error handling works

---

## Troubleshooting

### Build Fails

**Check build logs**:
1. Go to **Deploys** tab
2. Click on failed deploy
3. Review **"Deploy log"**

**Common issues**:
- **"Command not found"**: Verify Node version is set to 18 or 20
- **"Module not found"**: Ensure `package.json` has all dependencies
- **"Build directory not found"**: Verify base directory is `web-project`

**Fix**:
1. Go to **Site Settings** → **Build & deploy**
2. Update settings
3. Click **"Trigger deploy"** → **"Clear cache and deploy site"**

### Environment Variables Not Working

**Symptoms**: API calls fail, app shows wrong URLs

**Fix**:
1. Go to **Site Settings** → **Environment variables**
2. Verify variables are set correctly (case-sensitive)
3. Ensure variables start with `VITE_` prefix
4. Click **"Trigger deploy"** → **"Clear cache and deploy site"**

### Site Loads But API Calls Fail

**Check**:
1. Open browser DevTools → Network tab
2. Look for failed requests
3. Check CORS errors

**Fix**:
- Verify `VITE_API_BASE_URL` is correct
- Check backend is running: `curl https://smartfarm-app-production.up.railway.app/api/health`
- Verify backend CORS allows your Netlify domain

### 404 Errors on Navigation

**Cause**: SPA routing not configured

**Fix**: The `netlify.toml` already has redirect rules. If issues persist:
1. Verify `netlify.toml` is in `web-project/` directory
2. Check redirect rules are correct
3. Redeploy

---

## Next Steps

After successful deployment:

1. **Add API Keys** (if needed):
   - Google Maps API key
   - OpenWeather API key
   - Add to Netlify environment variables
   - Redeploy

2. **Set Up Monitoring**:
   - Configure error tracking (Sentry)
   - Set up analytics (Google Analytics)
   - Configure uptime monitoring

3. **Security Review**:
   - Run security headers check
   - Verify HTTPS
   - Test authentication flows
   - Review CORS configuration

4. **Performance Optimization**:
   - Review Lighthouse scores
   - Optimize images
   - Enable CDN caching
   - Code splitting

5. **Database Setup** (Backend):
   - Provision PostgreSQL database
   - Run migrations
   - Configure backend environment variables

See [PRODUCTION_DEPLOYMENT_GUIDE.md](./PRODUCTION_DEPLOYMENT_GUIDE.md) for comprehensive details.

---

## Quick Reference

**Netlify Dashboard**: https://app.netlify.com

**Build Settings**:
- Base directory: `web-project`
- Build command: `npm install && npm run build`
- Publish directory: `dist`

**Required Environment Variables**:
- `VITE_API_BASE_URL`
- `VITE_API_URL`
- `VITE_APP_NAME`
- `VITE_APP_VERSION`
- `NODE_ENV`

**Verification**:
```powershell
.\scripts\verify-production.ps1 -ProductionUrl "https://your-site.netlify.app"
```

---

**Last Updated**: [Date]
**Status**: Ready for Production Deployment

