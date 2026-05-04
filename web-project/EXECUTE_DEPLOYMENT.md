# 🚀 Execute SmartFarm Production Deployment

**Status**: Ready to execute deployment

**Follow this guide step-by-step to deploy to Netlify**

---

## ✅ Pre-Flight Check

Before starting, verify:

- [x] Local build works (`npm run build`)
- [x] GitHub repository is up to date
- [x] Netlify account ready (https://app.netlify.com)
- [x] Backend API is accessible: https://web-production-86d39.up.railway.app

---

## Step 1: Deploy to Netlify (10-15 minutes)

### 1.1 Go to Netlify Dashboard
- Visit: https://app.netlify.com
- Sign in (or create account)

### 1.2 Add New Site
- Click **"Add new site"** (top right)
- Select **"Import an existing project"**
- Choose **GitHub** as Git provider
- Authorize Netlify if prompted
- Select repository: **smartfarm-app** (or your repo name)

### 1.3 Configure Build Settings ⚠️ **CRITICAL - DO THIS BEFORE DEPLOYING**

Click **"Show advanced"** or **"Change settings"** button:

**Set these EXACT values:**

```
Base directory:     web-project
Build command:      npm install && npm run build
Publish directory:  web-project/dist
```

**Set Node version:**
- Go to: **Site Settings** → **Build & Deploy** → **Environment**
- Set **Node version**: `18` or `20`

### 1.4 Set Environment Variables ⚠️ **BEFORE FIRST DEPLOY**

**IMPORTANT**: Set these BEFORE clicking "Deploy site"

Go to: **Site Settings** → **Environment variables** → **Add a variable**

**Add these 5 variables:**

| Variable Name | Value |
|--------------|-------|
| `VITE_API_BASE_URL` | `https://web-production-86d39.up.railway.app` |
| `VITE_API_URL` | `https://web-production-86d39.up.railway.app` |
| `VITE_APP_NAME` | `SmartFarm` |
| `VITE_APP_VERSION` | `1.0.0` |
| `NODE_ENV` | `production` |

**Verify all 5 variables are added before proceeding.**

### 1.5 Deploy Site
- Click **"Deploy site"** button
- Watch build logs (2-5 minutes)
- Wait for "Published" status
- Note your production URL: `https://[site-name].netlify.app`

---

## Step 2: Verify Deployment (2 minutes)

After deployment completes, run verification script:

```powershell
cd E:\Document\SmartFarm\web-project
.\scripts\verify-production.ps1 -ProductionUrl "https://your-site-name.netlify.app"
```

**Replace `your-site-name` with your actual Netlify site name.**

**Expected Results:**
- ✅ Production URL is accessible
- ✅ HTTPS enabled
- ✅ Security headers present
- ✅ Backend API connectivity
- ✅ Static assets load correctly

**If verification fails:**
- Check Netlify build logs for errors
- Verify environment variables are set correctly
- Ensure backend API is accessible

---

## Step 3: Test Performance (3-5 minutes)

Run Lighthouse performance test:

```powershell
.\scripts\test-lighthouse.ps1 -Url "https://your-site-name.netlify.app"
```

**Target Scores:**
- Performance: ≥ 80
- Accessibility: ≥ 90
- Best Practices: ≥ 80
- SEO: ≥ 80

**If scores are below targets:**
- Review Lighthouse report recommendations
- Optimize images if needed
- Check bundle size
- See PRODUCTION_DEPLOYMENT_GUIDE.md Section 3 for optimization tips

---

## Step 4: Manual Testing (5-10 minutes)

Test these critical user flows:

### Authentication
- [ ] User registration works
- [ ] User login works
- [ ] Logout works
- [ ] Session persists on page refresh

### Core Features
- [ ] Dashboard loads with data
- [ ] Navigation works correctly
- [ ] Create farm (CRUD)
- [ ] View farms list
- [ ] Edit farm
- [ ] Delete farm
- [ ] Similar CRUD for livestock, crops, tasks, inventory

### API Integration
- [ ] API calls succeed (check Browser DevTools → Network tab)
- [ ] No CORS errors in console
- [ ] Data loads from backend
- [ ] Error handling works

**If issues found:**
- Check browser console for errors
- Verify `VITE_API_BASE_URL` is correct
- Ensure backend is running and accessible
- Check CORS configuration on backend

---

## Step 5: Backend Configuration (If Needed)

If your backend isn't already configured, see:
- **PRODUCTION_DEPLOYMENT_GUIDE.md** → Section 2

**Quick Checklist:**
- [ ] PostgreSQL database provisioned (Railway/Supabase/Neon)
- [ ] Database migrations run
- [ ] Backend environment variables set:
  - `DATABASE_URL`
  - `JWT_SECRET`
  - `JWT_REFRESH_SECRET`
  - `CORS_ORIGIN` (include your Netlify URL)
- [ ] Backend health endpoint working: `/api/health`

---

## Step 6: Add API Keys (Optional - 10 minutes)

If you need external services:

### Google Maps API
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create project → Enable **Maps JavaScript API**
3. Create API key → Restrict to your Netlify domain
4. Add to Netlify: `VITE_MAPS_API_KEY=your_key`
5. Go to **Deploys** → **Trigger deploy** → **Deploy site**

### OpenWeather API
1. Go to [OpenWeatherMap](https://openweathermap.org/api)
2. Sign up → Get API key
3. Add to Netlify: `VITE_OPENWEATHER_API_KEY=your_key`
4. Go to **Deploys** → **Trigger deploy** → **Deploy site**

---

## Step 7: Security Review (10 minutes)

Complete security checklist (see PRODUCTION_DEPLOYMENT_GUIDE.md Section 4):

- [ ] HTTPS enabled (automatic with Netlify) ✅
- [ ] No API keys exposed in client code (check browser DevTools → Sources)
- [ ] Protected routes require authentication
- [ ] CORS configured correctly on backend
- [ ] Security headers present (verified by script)
- [ ] Rate limiting implemented on backend
- [ ] Input validation working

**Security Headers Verified:**
- Run verification script to confirm headers are present
- Check: X-Frame-Options, X-XSS-Protection, X-Content-Type-Options, CSP

---

## Step 8: Set Up Monitoring (10-15 minutes)

### Error Tracking (Sentry)
1. Create account at https://sentry.io
2. Create new project → Select JavaScript
3. Get DSN
4. Add to Netlify: `VITE_SENTRY_DSN=your_dsn`
5. Redeploy

### Analytics (Google Analytics)
1. Create GA4 property at https://analytics.google.com
2. Get Measurement ID
3. Add to Netlify: `VITE_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX`
4. Redeploy

### Uptime Monitoring
1. Set up UptimeRobot (https://uptimerobot.com) or Pingdom
2. Monitor your Netlify URL
3. Set up alerts for downtime

---

## ✅ Deployment Complete Checklist

- [ ] Site deployed to Netlify
- [ ] Deployment verified with script
- [ ] Performance tested with Lighthouse
- [ ] Manual testing completed
- [ ] Backend configured (if needed)
- [ ] API keys added (if needed)
- [ ] Security review completed
- [ ] Monitoring set up

---

## 🎯 Success Criteria

Your deployment is successful when:

1. ✅ Site loads at production URL
2. ✅ No console errors
3. ✅ API calls work correctly
4. ✅ Authentication flows work
5. ✅ CRUD operations work
6. ✅ Lighthouse scores meet targets
7. ✅ Security headers present
8. ✅ Backend connectivity verified

---

## 📞 Troubleshooting

### Build Fails
- Check Netlify build logs
- Verify base directory is `web-project`
- Ensure build command is correct
- Check Node version (18 or 20)

### Environment Variables Not Working
- Variables must start with `VITE_` prefix
- Redeploy after adding variables
- Check variable names are exact (case-sensitive)

### API Calls Fail
- Verify `VITE_API_BASE_URL` is set correctly
- Check backend is running: `curl https://web-production-86d39.up.railway.app/api/health`
- Verify CORS is configured on backend

### Performance Issues
- Review Lighthouse report
- Optimize images
- Check bundle size
- Enable compression in Netlify

---

## 📚 Reference Documentation

- **DEPLOY_NOW.md** - Detailed deployment guide
- **PRODUCTION_DEPLOYMENT_GUIDE.md** - Complete reference
- **PRODUCTION_CHECKLIST.md** - Detailed checklist

---

**Ready to deploy? Start with Step 1 above!**

**Estimated Total Time**: 45-60 minutes for complete deployment and setup

