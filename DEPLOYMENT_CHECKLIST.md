# 🚀 SmartFarm Production Deployment Checklist
**Use this checklist to deploy to production**

---

## ⏱️ Estimated Time: 30 minutes

---

## 📋 PRE-DEPLOYMENT

### 1. GitHub Secrets Configuration (5 minutes)

**Navigate to:** `https://github.com/Warusi2023/smartfarm-app/settings/secrets/actions`

- [ ] Click "New repository secret"
- [ ] Add `RAILWAY_TOKEN`
  - Get from: Railway → Account Settings → Tokens
  - Create new token, copy value
- [ ] Add `NETLIFY_AUTH_TOKEN`
  - Get from: Netlify → User Settings → Applications → Personal access tokens
  - Create new token, copy value
- [ ] Add `NETLIFY_SITE_ID`
  - Get from: Netlify → Site Settings → General → Site information
  - Copy "Site ID"

**Verify:** You should see 3 secrets listed

---

### 2. Railway Configuration (5 minutes)

**Navigate to:** `https://railway.app → Your SmartFarm Project → Variables`

- [ ] Add `NODE_ENV` = `production`
- [ ] Add `JWT_SECRET` = `<generate 32-char secret>`
  - Run locally: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`
  - Copy output
- [ ] Add `CORS_ORIGIN` = `https://dulcet-sawine-92d6a8.netlify.app`
  - **Important:** Use your actual Netlify URL
- [ ] Add `LOG_LEVEL` = `info`
- [ ] (Optional) Add `WEATHER_API_KEY` = `<your OpenWeatherMap API key>`
- [ ] (Optional) Add `FEATURE_GEOFENCING` = `true`

**Verify:** Variables are saved and showing in Railway dashboard

---

### 3. Netlify Configuration (2 minutes)

**Navigate to:** `https://app.netlify.com → Your Site → Site settings → Environment variables`

- [ ] Click "Add a variable"
- [ ] Add `VITE_API_URL` = `https://smartfarm-app-production.up.railway.app`
  - **Important:** Use your actual Railway URL (no trailing slash)

**Verify:** Variable saved and showing in Netlify

---

## 🚀 DEPLOYMENT

### 4. Trigger Deployment (2 minutes)

**Option A: Make a small change**
```bash
git commit --allow-empty -m "deploy: trigger production deployment"
git push origin main
```

**Option B: Re-push current commit**
```bash
git push origin main --force-with-lease
```

- [ ] Command executed successfully
- [ ] Check GitHub Actions tab

---

### 5. Monitor GitHub Actions (5 minutes)

**Navigate to:** `https://github.com/Warusi2023/smartfarm-app/actions`

- [ ] Workflow is running (yellow dot)
- [ ] `build-and-test` job passes (green checkmark)
- [ ] `deploy-backend` job passes (green checkmark)
- [ ] `deploy-frontend` job passes (green checkmark)
- [ ] All jobs complete successfully

**If any job fails:** Check logs, fix issue, re-push

---

## ✅ POST-DEPLOYMENT VERIFICATION

### 6. Backend Health Check (2 minutes)

**Test:** Open in browser or use curl

```bash
curl https://smartfarm-app-production.up.railway.app/api/health
```

**Expected Response:**
```json
{
  "status": "OK",
  "timestamp": "2025-10-01T...",
  "version": "1.0.0",
  "environment": "production",
  "uptime": { ... },
  "memory": { ... },
  "database": { "type": "...", "connected": true },
  "apis": { "weather": true/false, "maps": true/false },
  "features": { "geofencing": true, ... },
  "cors": { "allowedOrigins": ["https://..."] }
}
```

- [ ] Status is "OK"
- [ ] Environment is "production"
- [ ] Database is connected
- [ ] CORS origin matches your Netlify URL

---

### 7. Frontend Verification (3 minutes)

**Navigate to:** `https://dulcet-sawine-92d6a8.netlify.app` (or your Netlify URL)

- [ ] Page loads without errors
- [ ] No console errors (press F12 → Console tab)
- [ ] Images and styles load correctly
- [ ] Can see login page
- [ ] SmartFarm logo displays

---

### 8. Login & Authentication Test (3 minutes)

- [ ] Register new user or login with existing account
- [ ] Login redirects to dashboard
- [ ] Dashboard loads correctly
- [ ] User name displays in navbar
- [ ] Location button shows (top right)

---

### 9. API Connection Test (2 minutes)

**In dashboard:**
- [ ] Location button works (click it)
- [ ] Can search for locations
- [ ] Weather data loads (if API key configured)
- [ ] Dashboard widgets display data
- [ ] No API connection errors in console

---

### 10. Navigation Test (2 minutes)

**Click each navigation link:**
- [ ] Dashboard
- [ ] Crop Management
- [ ] Livestock Management
- [ ] Watering Management
- [ ] Farm Locator
- [ ] Geofencing Setup
- [ ] AI Advisory
- [ ] Subscription

**Verify:** Each page loads without errors

---

### 11. Feature Test (3 minutes)

**Test key features:**
- [ ] Click "Identify Crop Issues" - Modal opens
- [ ] Click "Diagnose Livestock" - Modal opens
- [ ] Press `?` key - Keyboard shortcuts modal opens
- [ ] Click location button - Location selector opens
- [ ] View weather data - Shows current location

---

### 12. Geofencing Test (5 minutes)

**Navigate to Geofencing Setup:**
- [ ] Map loads correctly
- [ ] Can select a farm
- [ ] Can set GPS coordinates
- [ ] Can draw geofence on map
- [ ] Can save configuration
- [ ] Data persists after page reload

---

## 🐛 TROUBLESHOOTING

### If Backend Health Check Fails

**Check:**
1. Railway deployment completed successfully
2. Railway service is running (not sleeping)
3. Environment variables are set correctly
4. Database connected (check Railway logs)

**Solution:**
```bash
# View Railway logs
railway logs

# Or in dashboard: Railway → Deployments → View Logs
```

---

### If Frontend Doesn't Load

**Check:**
1. Netlify deployment succeeded
2. DNS is configured correctly
3. Files deployed to correct directory

**Solution:**
```bash
# Check Netlify deploy log
# Netlify → Deploys → Latest deploy → Deploy log
```

---

### If API Calls Fail (CORS Errors)

**Check:**
1. `CORS_ORIGIN` in Railway matches Netlify URL exactly
2. URL includes `https://`
3. No trailing slash

**Solution:**
```bash
# In Railway Variables, ensure:
CORS_ORIGIN=https://dulcet-sawine-92d6a8.netlify.app

# Redeploy Railway after changing
```

---

### If Authentication Fails

**Check:**
1. `JWT_SECRET` is set in Railway
2. Token is being sent from frontend
3. User exists in database

**Solution:**
```bash
# Clear browser storage
localStorage.clear();
sessionStorage.clear();

# Try registering new user
# Or login with existing credentials
```

---

## 📊 Success Indicators

### ✅ Deployment Successful If:
1. GitHub Actions all jobs green ✅
2. Railway shows "Deployed" status ✅
3. Netlify shows "Published" status ✅
4. Health endpoint returns 200 OK ✅
5. Frontend loads without errors ✅
6. Login works ✅
7. Dashboard displays ✅
8. API calls succeed ✅
9. No CORS errors ✅
10. Weather data loads (if configured) ✅

---

## 🎯 Quick Reference

### URLs
- **GitHub Repo:** https://github.com/Warusi2023/smartfarm-app
- **GitHub Actions:** https://github.com/Warusi2023/smartfarm-app/actions
- **Backend API:** https://smartfarm-app-production.up.railway.app
- **Frontend:** https://dulcet-sawine-92d6a8.netlify.app
- **Health Check:** https://smartfarm-app-production.up.railway.app/api/health

### Commands
```bash
# Generate JWT Secret
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Test Backend Health
curl https://smartfarm-app-production.up.railway.app/api/health

# View Railway Logs
railway logs

# Run Tests Locally
cd backend-api && npm test

# Run E2E Tests
npx playwright test
```

---

## ✨ You're Done!

Once all checkboxes above are checked, your SmartFarm application is:
- ✅ Deployed to production
- ✅ Accessible worldwide
- ✅ Automatically deploying on code changes
- ✅ Monitored and healthy
- ✅ Ready for users!

**Next:** Share the URL with your team and start farming smarter! 🌱

---

**Questions?** See `docs/DEPLOYMENT_GUIDE.md` or create a GitHub issue.

