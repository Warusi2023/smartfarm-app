# 🔧 GitHub & Railway Deployment Not Updating - Complete Fix

## Problem
GitHub deployments showing 5 days ago, Railway not auto-deploying from GitHub.

## Root Causes

### 1. GitHub Actions Workflow Issues
- Missing GitHub Secrets (RAILWAY_TOKEN, RAILWAY_SERVICE_ID_DETERMINED)
- Workflow might be disabled or failing silently
- Workflow condition preventing deployment

### 2. Railway Direct GitHub Integration Issues
- Railway service not connected to GitHub repo
- Wrong branch configured
- Auto-deploy disabled
- Service watching wrong repository

## ✅ Step-by-Step Fix

### Part 1: Check GitHub Actions Workflow

#### Step 1: Verify Workflow is Enabled
1. Go to your GitHub repo: `https://github.com/Warusi2023/smartfarm-app`
2. Click **"Actions"** tab
3. Look for **"Deploy SmartFarm Backend to Railway"** workflow
4. Check if it shows:
   - ✅ Green checkmark = Success (but secrets might be missing)
   - ❌ Red X = Failed (check logs)
   - ⚠️ Yellow circle = Running
   - ⚪ Gray = Not triggered (this is the problem!)

#### Step 2: Check Workflow Runs
1. In Actions tab, click on **"Deploy SmartFarm Backend to Railway"**
2. Check **"All workflows"** dropdown
3. Look for recent runs after your commits
4. If no runs appear, the workflow isn't triggering

#### Step 3: Manually Trigger Workflow
1. Go to **Actions** → **Deploy SmartFarm Backend to Railway**
2. Click **"Run workflow"** button (top right)
3. Select branch: `main`
4. Click **"Run workflow"**
5. This will force a run even if auto-trigger isn't working

### Part 2: Check GitHub Secrets

The workflow requires these secrets to deploy:

#### Required Secrets:
- `RAILWAY_TOKEN` - Railway API token
- `RAILWAY_SERVICE_ID_DETERMINED` - Service ID for deployment
- `RAILWAY_SERVICE_ID_ENCHANTING` - (Optional) Second service ID

#### How to Add Secrets:
1. GitHub repo → **Settings** → **Secrets and variables** → **Actions**
2. Click **"New repository secret"**
3. Add each secret:
   - Name: `RAILWAY_TOKEN`
   - Value: Your Railway token (get from Railway dashboard)

#### How to Get Railway Token:
1. Go to [Railway Dashboard](https://railway.app)
2. Click your profile (top right) → **Account Settings**
3. Go to **Tokens** tab
4. Click **"New Token"**
5. Name it: `GitHub Actions Deploy`
6. Copy the token
7. Add to GitHub Secrets as `RAILWAY_TOKEN`

#### How to Get Service ID:
1. Railway Dashboard → Your `smartfarm-app` service
2. Go to **Settings** → **General**
3. Scroll down to **Service ID**
4. Copy the ID (looks like: `abc123-def456-ghi789`)
5. Add to GitHub Secrets as `RAILWAY_SERVICE_ID_DETERMINED`

### Part 3: Fix Railway Direct GitHub Integration

Railway can deploy directly from GitHub (without GitHub Actions). This might be what's configured:

#### Step 1: Check Service Source
1. Railway Dashboard → `smartfarm-app` service
2. Go to **Settings** → **Source**
3. Check:
   - **Repository**: Should be `Warusi2023/smartfarm-app`
   - **Branch**: Should be `main`
   - **Auto Deploy**: Should be **Enabled** ✅

#### Step 2: Reconnect GitHub (if needed)
1. If repository shows wrong repo or "Not connected":
   - Click **"Disconnect"**
   - Click **"Connect GitHub Repo"**
   - Select `Warusi2023/smartfarm-app`
   - Select branch: `main`
   - Enable **Auto Deploy**
   - Click **"Save"**

#### Step 3: Trigger Manual Deploy
1. Railway Dashboard → `smartfarm-app` service
2. Go to **Deployments** tab
3. Click **"Redeploy"** button
4. Select **"Deploy latest commit"**
5. This forces Railway to pull latest code

#### Step 4: Check Build Logs
1. Click on the deployment
2. Check **Build Logs** tab
3. Look for errors:
   - ❌ "server.cjs not found" → Start command wrong
   - ❌ "npm install failed" → Dependency issues
   - ❌ "Build timeout" → Build taking too long
   - ✅ "Build successful" → Good!

### Part 4: Verify Configuration Files

Make sure these files are correct:

#### `backend/package.json`
```json
{
  "scripts": {
    "start": "node server.js"  // ✅ Should be server.js
  }
}
```

#### `railway.json`
```json
{
  "deploy": {
    "startCommand": "node server.js"  // ✅ Should be server.js
  }
}
```

#### `backend/nixpacks.toml`
```toml
[start]
cmd = "node server.js"  // ✅ Should be server.js
```

## 🎯 Quick Diagnostic Commands

### Check Recent Commits
```bash
git log --oneline -5
# Should show recent commits like:
# 4f38fd1 fix: Update Railway configs
# b84343e feat: Activate AI Nutrition Advice
```

### Check if Files Exist
```bash
# Verify server.js exists
ls backend/server.js

# Verify package.json exists
ls backend/package.json

# Verify package-lock.json exists
ls backend/package-lock.json
```

### Test API Locally
```bash
cd backend
npm install
node server.js
# Should start server on port 3000
# Test: curl http://localhost:3000/api/health
```

## 🚨 Common Issues & Solutions

### Issue 1: Workflow Not Triggering
**Symptom**: No workflow runs in GitHub Actions
**Solution**: 
- Check if Actions are enabled: Repo Settings → Actions → General → Allow all actions
- Manually trigger workflow: Actions → Run workflow

### Issue 2: Workflow Failing on Preflight
**Symptom**: Workflow runs but fails at "Verify backend path & files"
**Solution**:
- Ensure `backend/server.js` exists
- Ensure `backend/package-lock.json` exists (run `npm install` in backend)

### Issue 3: Deployment Skipped (No Secrets)
**Symptom**: Workflow shows "Skipped" for deploy jobs
**Solution**:
- Add GitHub Secrets: `RAILWAY_TOKEN` and `RAILWAY_SERVICE_ID_DETERMINED`

### Issue 4: Railway Not Detecting Changes
**Symptom**: Railway shows old deployment, GitHub has new commits
**Solution**:
- Reconnect GitHub in Railway Settings → Source
- Trigger manual redeploy
- Check if watching correct branch (`main`)

### Issue 5: Build Fails in Railway
**Symptom**: Railway deployment fails during build
**Solution**:
- Check build logs for specific error
- Verify start command: `node server.js`
- Check Node version compatibility

## ✅ Verification Checklist

After fixes, verify:

- [ ] GitHub Actions workflow runs successfully
- [ ] Railway service shows latest deployment
- [ ] API health check works: `curl https://smartfarm-app-production.up.railway.app/api/health`
- [ ] New features are live (AI Nutrition Advice, Email Verification)
- [ ] Build logs show no errors

## 🎯 Expected Result

After completing all steps:
- ✅ GitHub Actions workflow runs on every push to `main`
- ✅ Railway auto-deploys from GitHub
- ✅ Latest code is live in production
- ✅ Deployments show current date/time

---

**Next Steps**: 
1. Check GitHub Actions tab for workflow runs
2. Add missing GitHub Secrets
3. Verify Railway service connection
4. Trigger manual redeploy if needed

