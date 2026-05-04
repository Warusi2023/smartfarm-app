# 🔧 SmartFarm Deployment Configuration Guide

## Step 1: Configure GitHub Secrets

### Navigate to GitHub Secrets
🔗 **URL**: https://github.com/Warusi2023/smartfarm-app/settings/secrets/actions

### Required Secrets:
- **RAILWAY_TOKEN**: Get from Railway → Account Settings → Tokens → Create new token
- **NETLIFY_AUTH_TOKEN**: Get from Netlify → User Settings → Applications → Personal access tokens
- **NETLIFY_SITE_ID**: Get from Netlify → Site Settings → General → Site information → Site ID
- **NETLIFY_SITE_ID_STAGING**: Create staging site in Netlify and get Site ID
- **NETLIFY_PRODUCTION_URL**: https://dulcet-sawine-92d6a8.netlify.app
- **RAILWAY_PRODUCTION_URL**: https://web-production-86d39.up.railway.app
- **RAILWAY_MIGRATION_TOKEN**: e3b65bed85523fbb9a2ae082a7e29491e8f7862df3431efc1851661d4aaad6b1

### How to Add Secrets:
1. Click "New repository secret"
2. Enter the secret name (exactly as shown above)
3. Enter the secret value
4. Click "Add secret"
5. Repeat for all secrets

---

## Step 2: Configure Railway Variables

### Navigate to Railway Variables
🔗 **URL**: https://railway.app → Your Project → Variables

### Required Variables:
- **NODE_ENV** = `production`
- **JWT_SECRET** = `e3b65bed85523fbb9a2ae082a7e29491e8f7862df3431efc1851661d4aaad6b1`
- **CORS_ORIGIN** = `https://dulcet-sawine-92d6a8.netlify.app`
- **LOG_LEVEL** = `info`
- **DATABASE_URL** = `postgresql://user:password@host:port/database`
- **OPENWEATHER_API_KEY** = `your_openweather_api_key_here`
- **FEATURE_GEOFENCING** = `true`

### How to Add Variables:
1. Go to your Railway project
2. Click on "Variables" tab
3. Click "New Variable"
4. Enter the variable name and value
5. Click "Add"
6. Repeat for all variables

---

## Step 3: Configure Netlify Variables

### Navigate to Netlify Variables
🔗 **URL**: https://app.netlify.com → Your Site → Environment variables

### Required Variables:
- **VITE_API_BASE_URL** = `https://web-production-86d39.up.railway.app/api`
- **VITE_OPENWEATHER_API_KEY** = `your_openweather_api_key_here`
- **VITE_ENVIRONMENT** = `production`

### How to Add Variables:
1. Go to your Netlify site
2. Click "Site settings"
3. Click "Environment variables"
4. Click "Add a variable"
5. Enter the variable name and value
6. Click "Save"
7. Repeat for all variables

---

## Step 4: Trigger Deployment

After configuring all secrets and variables:

```bash
# Option 1: Use automated script
scripts\trigger-deployment.bat

# Option 2: Manual deployment
git commit --allow-empty -m "deploy: trigger production deployment"
git push origin main
```

---

## Step 5: Monitor Deployment

🔗 **GitHub Actions**: https://github.com/Warusi2023/smartfarm-app/actions

### What to Look For:
- All jobs should show green checkmarks ✅
- No red X marks ❌
- Deployment should complete within 5-10 minutes

---

## Step 6: Verify Deployment

### Backend Health Check:
🔗 **URL**: https://web-production-86d39.up.railway.app/api/health

**Expected Response:**
```json
{
  "status": "OK",
  "environment": "production",
  "database": "connected"
}
```

### Frontend Access:
🔗 **URL**: https://dulcet-sawine-92d6a8.netlify.app

**Expected Result:**
- Page loads without errors
- SmartFarm logo displays
- Login form is visible

---

## Troubleshooting

### If GitHub Actions Fail:
1. Check the logs in the Actions tab
2. Verify all secrets are configured correctly
3. Ensure secret names match exactly (case-sensitive)

### If Backend Health Check Fails:
1. Check Railway deployment logs
2. Verify all Railway variables are set
3. Ensure DATABASE_URL is correct

### If Frontend Doesn't Load:
1. Check Netlify deployment logs
2. Verify all Netlify variables are set
3. Ensure VITE_API_BASE_URL points to correct backend

---

## Success Criteria

✅ All GitHub Actions jobs pass
✅ Backend health check returns 200 OK
✅ Frontend loads without errors
✅ User can register and login
✅ Dashboard displays correctly
✅ API calls work without CORS errors

---

**Generated**: 2025-10-02T18:24:06.452Z
