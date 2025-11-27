# Deploy SmartFarm to Netlify - Step-by-Step Guide

Follow these exact steps to deploy your SmartFarm web app to production on Netlify.

## Prerequisites

- ✅ GitHub repository is up to date
- ✅ Local build works (`npm run build` succeeds)
- ✅ Netlify account (sign up at https://app.netlify.com if needed)

---

## Step 1: Prepare for Deployment

Run the preparation script to verify everything is ready:

```powershell
cd web-project
.\scripts\prepare-netlify-deploy.ps1
```

This will:
- ✅ Verify your build works locally
- ✅ Check that `dist/` folder exists
- ✅ Validate Netlify configuration
- ✅ Display deployment instructions

---

## Step 2: Connect Repository to Netlify

1. **Go to Netlify Dashboard**
   - Visit: https://app.netlify.com
   - Sign in (or create account)

2. **Add New Site**
   - Click **"Add new site"** button (top right)
   - Select **"Import an existing project"**

3. **Connect Git Provider**
   - Choose **GitHub**
   - Authorize Netlify if prompted
   - Select repository: **smartfarm-app** (or your repo name)

4. **Configure Build Settings** ⚠️ **CRITICAL**

   **IMPORTANT**: You MUST configure these settings BEFORE deploying:
   
   Click **"Show advanced"** or **"Change settings"** to reveal:
   
   - **Base directory**: `web-project`
   - **Build command**: `npm install && npm run build`
   - **Publish directory**: `web-project/dist`
   - **Node version**: `18` (or `20`)

   ⚠️ **DO NOT click "Deploy site" yet!** First add environment variables.

---

## Step 3: Set Environment Variables (BEFORE First Deploy)

**This is critical** - Environment variables must be set BEFORE the first deployment so they're available during the build.

1. **Before clicking "Deploy site"**, click **"New variable"** or go to:
   - **Site Settings** → **Environment variables** → **Add a variable**

2. **Add these required variables:**

   | Variable Name | Value |
   |--------------|-------|
   | `VITE_API_BASE_URL` | `https://smartfarm-app-production.up.railway.app` |
   | `VITE_API_URL` | `https://smartfarm-app-production.up.railway.app` |
   | `VITE_APP_NAME` | `SmartFarm` |
   | `VITE_APP_VERSION` | `1.0.0` |
   | `NODE_ENV` | `production` |

3. **Optional variables** (add later if needed):
   - `VITE_MAPS_API_KEY` - Google Maps API key
   - `VITE_OPENWEATHER_API_KEY` - OpenWeather API key
   - `VITE_GOOGLE_ANALYTICS_ID` - Google Analytics ID

4. **Verify all variables are added** before proceeding

---

## Step 4: Deploy

1. **Click "Deploy site"** button
2. **Wait for build** (2-5 minutes)
   - Watch the build logs in real-time
   - Build should complete successfully
3. **Get your production URL**
   - Netlify will assign: `https://[random-name].netlify.app`
   - You can customize this later in Domain settings

---

## Step 5: Verify Deployment

After deployment completes, run the verification script:

```powershell
cd web-project
.\scripts\verify-production.ps1 -ProductionUrl "https://your-site-name.netlify.app"
```

Replace `your-site-name` with your actual Netlify site name.

**Expected output:**
- ✅ Production URL is accessible
- ✅ HTTPS enabled
- ✅ Security headers present
- ✅ Backend API connectivity
- ✅ Static assets load

---

## Step 6: Test Performance

Run Lighthouse performance test:

```powershell
.\scripts\test-lighthouse.ps1 -Url "https://your-site-name.netlify.app"
```

**Target scores:**
- Performance: ≥ 80
- Accessibility: ≥ 90
- Best Practices: ≥ 80
- SEO: ≥ 80

---

## Step 7: Manual Testing

Test these critical user flows:

### Authentication
- [ ] User registration works
- [ ] User login works
- [ ] Logout works
- [ ] Session persists on page refresh

### Core Features
- [ ] Dashboard loads with data
- [ ] Navigation works
- [ ] Create farm (CRUD)
- [ ] View farms list
- [ ] Edit farm
- [ ] Delete farm
- [ ] Similar CRUD for livestock, crops, tasks, inventory

### API Integration
- [ ] API calls succeed (check Network tab)
- [ ] No CORS errors
- [ ] Data loads from backend
- [ ] Error handling works

---

## Step 8: Configure Backend (If Not Already Done)

If your backend isn't already configured, see:
- **PRODUCTION_DEPLOYMENT_GUIDE.md** → Section 2: Configure Production Backend & Keys

Key steps:
1. Provision PostgreSQL database (Railway/Supabase/Neon)
2. Set backend environment variables
3. Run database migrations
4. Verify backend health endpoint

---

## Step 9: Add API Keys (Optional)

If you need external services:

### Google Maps API
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create project → Enable Maps JavaScript API
3. Create API key → Restrict to your domain
4. Add to Netlify: `VITE_MAPS_API_KEY=your_key`

### OpenWeather API
1. Go to [OpenWeatherMap](https://openweathermap.org/api)
2. Sign up → Get API key
3. Add to Netlify: `VITE_OPENWEATHER_API_KEY=your_key`

**After adding keys:**
- Go to **Deploys** → **Trigger deploy** → **Deploy site**
- Wait for redeployment

---

## Step 10: Security Review

Complete security checklist (see PRODUCTION_DEPLOYMENT_GUIDE.md Section 4):

- [ ] HTTPS enabled (automatic with Netlify)
- [ ] No API keys exposed in client code
- [ ] Protected routes require authentication
- [ ] CORS configured correctly on backend
- [ ] Security headers present (verified by script)
- [ ] Rate limiting implemented on backend
- [ ] Input validation working

---

## Step 11: Set Up Monitoring

### Error Tracking
- Set up Sentry or similar
- Add DSN to environment variables

### Analytics
- Configure Google Analytics
- Add tracking ID to environment variables

### Uptime Monitoring
- Set up UptimeRobot or Pingdom
- Monitor your production URL

---

## Troubleshooting

### Build Fails

**Check build logs:**
- Go to Netlify → Deploys → Click failed deploy → View logs

**Common issues:**
- ❌ **Base directory wrong**: Should be `web-project`
- ❌ **Build command wrong**: Should be `npm install && npm run build`
- ❌ **Publish directory wrong**: Should be `web-project/dist`
- ❌ **Node version**: Set to 18 or 20 in Netlify settings

**Fix:**
- Go to Site Settings → Build & Deploy → Build settings
- Update settings and redeploy

### Environment Variables Not Working

**Symptoms:**
- API calls fail
- Wrong API URL in console

**Fix:**
- Verify variables start with `VITE_` prefix
- Check variable names are exact (case-sensitive)
- Redeploy after adding variables
- Variables are only available at BUILD time, not runtime

### API Calls Fail

**Check:**
1. Backend is running: `curl https://smartfarm-app-production.up.railway.app/api/health`
2. CORS is configured on backend
3. `VITE_API_BASE_URL` is set correctly
4. Check browser console for errors

### Site Loads But Features Don't Work

**Check:**
- Browser console for JavaScript errors
- Network tab for failed API calls
- Verify backend is accessible
- Check CORS configuration

---

## Quick Reference

### Netlify Settings Summary

```
Base directory:     web-project
Build command:      npm install && npm run build
Publish directory:  web-project/dist
Node version:       18 or 20
```

### Required Environment Variables

```
VITE_API_BASE_URL=https://smartfarm-app-production.up.railway.app
VITE_API_URL=https://smartfarm-app-production.up.railway.app
VITE_APP_NAME=SmartFarm
VITE_APP_VERSION=1.0.0
NODE_ENV=production
```

### Verification Commands

```powershell
# Verify deployment
.\scripts\verify-production.ps1 -ProductionUrl "https://your-site.netlify.app"

# Test performance
.\scripts\test-lighthouse.ps1 -Url "https://your-site.netlify.app"

# Test locally
npm run build
npm run preview
```

---

## Next Steps After Deployment

1. ✅ **Custom Domain** (optional): Configure in Netlify Domain settings
2. ✅ **CI/CD**: Automatic deployments on git push (already enabled)
3. ✅ **Monitoring**: Set up error tracking and analytics
4. ✅ **Performance**: Optimize based on Lighthouse results
5. ✅ **Security**: Complete security review checklist

---

## Support

- **Full Guide**: See [PRODUCTION_DEPLOYMENT_GUIDE.md](./PRODUCTION_DEPLOYMENT_GUIDE.md)
- **Checklist**: See [PRODUCTION_CHECKLIST.md](./PRODUCTION_CHECKLIST.md)
- **Quick Start**: See [PRODUCTION_QUICK_START.md](./PRODUCTION_QUICK_START.md)

---

**Estimated Time**: 15-20 minutes for complete deployment

**Last Updated**: [Date]

