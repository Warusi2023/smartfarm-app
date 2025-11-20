# 🔧 Railway Deployment Not Updating - Fix Guide

## Problem Identified

Railway shows deployments from 5 days ago, but recent GitHub pushes aren't triggering new deployments.

## Root Causes

1. **Configuration Mismatch**: Railway configs point to `server.cjs` but we're using `server.js`
2. **GitHub Actions Workflow**: Checks for wrong file (`server.cjs` instead of `server.js`)
3. **Railway Service Configuration**: May not be watching the correct branch/repo

## ✅ Fixes Applied

### 1. Updated Configuration Files
- ✅ `backend/nixpacks.toml` - Changed start command to `node server.js`
- ✅ `railway.json` - Changed start command to `node server.js`
- ✅ `.github/workflows/railway-deploy.yml` - Updated to check for `server.js`

### 2. Manual Railway Dashboard Steps Required

**You need to verify these in Railway Dashboard:**

#### Step 1: Check Service Connection
1. Go to [Railway Dashboard](https://railway.app)
2. Click on your `smartfarm-app` service
3. Go to **Settings** → **Source**
4. Verify:
   - ✅ Repository: `Warusi2023/smartfarm-app` (or your repo)
   - ✅ Branch: `main`
   - ✅ Auto Deploy: **Enabled**

#### Step 2: Check Start Command
1. Go to **Settings** → **Deploy**
2. Verify **Start Command** is: `node server.js`
3. If it shows `server.cjs` or `server-simple.cjs`, change it to `node server.js`
4. Click **Save**

#### Step 3: Trigger Manual Redeploy
1. Go to **Deployments** tab
2. Click **"Redeploy"** button
3. Select **"Deploy latest commit"**
4. This will force Railway to pull the latest code

#### Step 4: Check Build Logs
1. Click on the latest deployment
2. Check **Build Logs** for errors
3. Common issues:
   - Missing dependencies → Check `package.json` has all deps
   - Build errors → Check Node version (should be 18-22)
   - Start command errors → Verify `server.js` exists

## 🔍 Verification Steps

### Check GitHub Repository
```bash
# Verify latest commits are pushed
git log --oneline -5

# Should show recent commits like:
# b84343e feat: Activate AI Nutrition Advice button
# 65f44ca feat: Add missing dependencies
# cb734d5 feat: Integrate email verification
```

### Check Railway Service Configuration
1. Railway Dashboard → Your Service → Settings
2. Verify:
   - **Root Directory**: `backend` (not empty)
   - **Build Command**: `npm run build` (or empty)
   - **Start Command**: `node server.js`
   - **Health Check Path**: `/api/health`

### Test API Endpoint
After redeploy, test:
```bash
curl https://smartfarm-app-production.up.railway.app/api/health
```

Should return:
```json
{"ok":true,"service":"SmartFarm","ts":...}
```

## 🚨 If Still Not Working

### Option 1: Disconnect and Reconnect GitHub
1. Railway Dashboard → Service → Settings → Source
2. Click **"Disconnect"**
3. Click **"Connect GitHub Repo"**
4. Select your repository
5. Select branch: `main`
6. Enable **Auto Deploy**

### Option 2: Check GitHub Secrets
Railway GitHub Action requires these secrets:
- `RAILWAY_TOKEN` - Your Railway API token
- `RAILWAY_SERVICE_ID_DETERMINED` - Service ID for deployment

To get Railway token:
1. Railway Dashboard → Account → Tokens
2. Generate new token
3. Add to GitHub Secrets: Settings → Secrets → Actions

### Option 3: Manual Deploy via Railway CLI
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Link to project
railway link

# Deploy
railway up
```

## 📋 Checklist

- [ ] Configuration files updated (`nixpacks.toml`, `railway.json`)
- [ ] GitHub Actions workflow updated
- [ ] Railway service watching correct branch (`main`)
- [ ] Start command set to `node server.js`
- [ ] Auto Deploy enabled in Railway
- [ ] Latest code pushed to GitHub
- [ ] Manual redeploy triggered in Railway
- [ ] Build logs checked for errors
- [ ] Health check endpoint working

## 🎯 Expected Result

After fixes:
- Railway should auto-deploy on every push to `main`
- Latest commits should appear in Railway deployments
- API should be accessible at production URL
- Health check should return success

---

**Last Updated**: After fixing configuration mismatches
**Status**: Ready for Railway redeploy
