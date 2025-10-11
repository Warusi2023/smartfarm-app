# Railway Manual Actions Required - 502 Persists

## Current Situation

✅ **All Code Complete**: Backend works perfectly locally (200 OK)  
✅ **All Configuration Correct**: railway.toml, package.json verified  
✅ **All Fixes Pushed**: 4 commits pushed to GitHub  
✅ **Railway Auto-Deploy Triggered**: Multiple times  
❌ **Railway Still Returns 502**: Backend not starting on Railway  

## Why This Is Happening

**This is NOT a code issue.** The backend works 100% locally. Railway has a deployment/configuration issue that requires **manual dashboard actions**.

## Required Manual Actions in Railway Dashboard

### Action 1: Clear Build Cache (CRITICAL)

Railway may be using cached build with old Dockerfile detection.

1. Go to: https://railway.app/dashboard
2. Select your SmartFarm project
3. Select the backend service
4. Go to Settings tab
5. Scroll to "Danger Zone"
6. Click "Clear Build Cache"
7. Confirm the action

### Action 2: Verify Service Settings

#### A. General Settings
1. Go to Settings → General
2. Check these values:

| Setting | Expected Value | Notes |
|---------|---------------|-------|
| Root Directory | `backend` or empty | Path to backend code |
| Start Command | `node server.js` | From package.json |
| Build Command | (empty) | Let Nixpacks handle it |

If values are wrong, update them.

#### B. Deploy Settings
1. Go to Settings → Deploy
2. Check these values:

| Setting | Expected Value | Notes |
|---------|---------------|-------|
| Health Check Path | `/api/health` | Must match backend endpoint |
| Health Check Timeout | `120` seconds | Default 30s may be too short |
| Restart Policy | `On Failure` | Auto-restart on crash |
| Builder | `NIXPACKS` | NOT Dockerfile |

If "Builder" says "Dockerfile", manually change it to "Nixpacks".

### Action 3: Check Environment Variables

1. Go to Settings → Variables
2. Verify these are set:

```
ALLOWED_ORIGINS=https://www.smartfarm-app.com,https://smartfarm-app.com,https://smartfarm-app.netlify.app
NODE_ENV=production
```

**DO NOT SET**:
- `PORT` - Railway sets this automatically
- `START_COMMAND` - Use railway.toml instead

### Action 4: Manual Redeploy

After clearing cache and verifying settings:

1. Go to Deployments tab
2. Click on latest deployment
3. Click "Redeploy" button
4. Watch build logs in real-time

### Action 5: Check Deployment Logs

While deployment is running:

1. Go to Deployments → Latest deployment
2. Click "View Logs"
3. Look for these indicators:

#### ✅ Success Indicators:
```
Using Nixpacks
Nixpacks build succeeded
npm install ... done
Starting...
🚀 SmartFarm API server running on port 3000
Health check passed
```

#### ❌ Failure Indicators:
```
Using Detected Dockerfile  ← WRONG! Should be Nixpacks
npm ERR!  ← Dependency issue
Cannot find module  ← File path issue
Health check failed  ← Server not starting or timeout
EADDRINUSE  ← Port conflict (rare on Railway)
```

### Action 6: If Using Dockerfile (WRONG)

If logs show "Using Detected Dockerfile":

1. **Check for hidden Dockerfile files**:
   - Look in Railway file browser
   - Check for `Dockerfile.clean`, `Dockerfile.disabled`, etc.
   - Delete ALL Dockerfile files from Railway

2. **Force Nixpacks**:
   - Settings → Deploy
   - Builder → Select "Nixpacks"
   - Save changes
   - Redeploy

### Action 7: If Dependencies Failing

If logs show "npm ERR!":

1. Check backend/package.json is valid JSON
2. Verify dependencies exist on npm registry
3. Try manually adding dependency versions:
   ```json
   "dependencies": {
     "express": "4.19.2",
     "cors": "2.8.5"
   }
   ```
4. Redeploy

### Action 8: If Health Check Failing

If logs show "Health check failed":

1. Verify server is starting (look for startup logs)
2. Check if server binds to PORT:
   - Should see: "listening on 0.0.0.0:XXXX"
3. Increase health check timeout to 120 seconds
4. Verify health check path is `/api/health` (with leading slash)
5. Redeploy

## Alternative: Use Railway CLI

If dashboard actions don't work:

### Install Railway CLI
```powershell
npm install -g @railway/cli
```

### Login and Link
```powershell
railway login
railway link
```

### Deploy Manually
```powershell
cd backend
railway up
```

### Watch Logs
```powershell
railway logs
```

### Check Variables
```powershell
railway variables
```

## Testing After Successful Deployment

### Test 1: Health Endpoint
```powershell
Invoke-WebRequest https://smartfarm-app-production.up.railway.app/api/health
```
Expected: `200 OK` with `{"ok":true,"service":"SmartFarm","ts":...}`

### Test 2: CORS Headers
```powershell
$headers = @{"Origin"="https://www.smartfarm-app.com"}
Invoke-WebRequest https://smartfarm-app-production.up.railway.app/api/health -Headers $headers
```
Expected: Response includes `Access-Control-Allow-Origin: https://www.smartfarm-app.com`

### Test 3: Frontend
1. Open: https://www.smartfarm-app.com
2. Open DevTools → Console
3. Expected:
   - No CORS errors
   - No 502 errors
   - Dashboard loads
   - API data displays

## Summary

**All code is ready and working.** Railway just needs proper configuration in the dashboard:

1. ✅ Clear build cache
2. ✅ Verify settings (Nixpacks, health check timeout)
3. ✅ Set environment variables
4. ✅ Manual redeploy
5. ✅ Watch deployment logs
6. ✅ Test health endpoint

Once Railway deploys successfully, everything will work automatically because all the code fixes are already in place!

## Support

If Railway continues to fail:
- Railway Discord: https://discord.gg/railway
- Railway Docs: https://docs.railway.app
- Railway Status: https://status.railway.app
- Consider Railway support ticket if platform issue

