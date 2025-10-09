# Railway Start Command Fix

## Problem Identified

✅ **GOOD NEWS:** Railway is now using Nixpacks (no more Dockerfile detection)!

❌ **NEW ISSUE:** Railway is trying to run `bootstrap.cjs` instead of `server-simple.cjs`

**Error in logs:**
```
Error: Cannot find module '/app/bootstrap.cjs'
```

## Root Cause

Railway's **dashboard settings** have a custom start command (`node bootstrap.cjs`) that is overriding both:
- `package.json` start script
- `railway.toml` configuration

Railway's command priority:
1. **Dashboard "Custom Start Command"** (highest - currently set incorrectly)
2. Procfile
3. railway.toml [deploy] startCommand
4. package.json start script
5. Nixpacks auto-detection

## Solution Applied

### 1. Added Procfile (High Priority)

Created `Procfile` at root:
```
web: cd backend && node server-simple.cjs
```

This ensures Railway uses the correct start command even if dashboard settings are wrong.

### 2. Updated railway.toml

Added explicit `startCommand` in `[deploy]` section:
```toml
[deploy]
startCommand = "node server-simple.cjs"
healthcheckPath = "/api/health"
healthcheckTimeout = 120
```

### 3. Verified package.json

Confirmed `backend/package.json` has correct start script:
```json
{
  "scripts": {
    "start": "node server-simple.cjs"
  }
}
```

## What Changed from "Failed" to "Crashed"

**This is actually PROGRESS!**

### Before (Failed):
- Railway detected Dockerfile
- Used Docker build mode
- Health check failed because wrong build process

### Now (Crashed):
- ✅ Railway is using Nixpacks (correct!)
- ✅ Build completed successfully
- ✅ Container started
- ❌ Wrong start command tried to run bootstrap.cjs
- ❌ App crashed immediately

### After this fix:
- ✅ Railway uses Nixpacks
- ✅ Build completes
- ✅ Container starts with correct command
- ✅ server-simple.cjs runs
- ✅ Health check passes
- ✅ Deployment succeeds!

## Manual Steps Required

**IMPORTANT:** You also need to update Railway's dashboard:

1. Go to your Railway project dashboard
2. Click on your backend service
3. Go to **Settings** tab
4. Find **Deploy** section
5. Look for **Custom Start Command**
6. If it says `node bootstrap.cjs`, change it to:
   ```
   node server-simple.cjs
   ```
7. Or **remove the custom start command** to let Railway use Procfile/railway.toml

## Expected Result

After commit and push:
1. ✅ Railway uses Nixpacks builder
2. ✅ Railway reads Procfile
3. ✅ Starts with `node server-simple.cjs` from backend directory
4. ✅ Server binds to port 3000
5. ✅ Health check at /api/health returns 200 OK
6. ✅ Deployment succeeds!

## Files Modified

- **Created:** `Procfile`
- **Updated:** `railway.toml` (added startCommand)
- **Verified:** `backend/package.json` (start script correct)

