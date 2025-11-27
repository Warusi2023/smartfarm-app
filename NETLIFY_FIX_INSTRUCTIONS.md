# Netlify Build Fix - Critical Steps

## Problem
Netlify is trying to build from the repository root (`/opt/build/repo`) instead of `web-project/` directory, causing `package.json` not found error.

## Root Cause
The Netlify dashboard UI settings are overriding the `netlify.toml` file configuration.

## Solution

### Step 1: Update Netlify Dashboard Settings

1. **Go to Netlify Dashboard**
   - Visit: https://app.netlify.com
   - Select your site

2. **Navigate to Build Settings**
   - Go to: **Site Settings** → **Build & Deploy** → **Build settings**

3. **Update Base Directory**
   - Find **"Base directory"** field
   - Set it to: `web-project`
   - **IMPORTANT**: This must be exactly `web-project` (no leading/trailing slashes)

4. **Update Publish Directory**
   - Find **"Publish directory"** field
   - Set it to: `web-project/dist`
   - **OR** leave it as `dist` if Netlify resolves it relative to base directory

5. **Verify Build Command**
   - Find **"Build command"** field
   - Should be: `npm install && npm run build`
   - If empty, Netlify will use the command from `netlify.toml`

6. **Save Settings**
   - Click **"Save"** button at the bottom

### Step 2: Clear Build Cache (Optional but Recommended)

1. Go to **Deploys** tab
2. Click **"Clear cache and retry deploy"** (or trigger a new deploy)

### Step 3: Verify Configuration

After updating settings, the resolved config should show:
- `base: /opt/build/repo/web-project` (not `/opt/build/repo`)
- `publish: /opt/build/repo/web-project/dist` (not `/opt/build/repo/dist`)

## Alternative: Use Netlify UI to Override

If the `netlify.toml` file is still not being respected:

1. **Remove base directory from netlify.toml** (let UI handle it)
2. **Set everything in Netlify Dashboard UI**:
   - Base directory: `web-project`
   - Build command: `npm install && npm run build`
   - Publish directory: `web-project/dist`

## Expected Result

After fixing, the build should:
- ✅ Change into `web-project/` directory
- ✅ Find `package.json` in `web-project/package.json`
- ✅ Run `npm install` successfully
- ✅ Run `npm run build` successfully
- ✅ Publish from `web-project/dist/`

## Verification

Check the build logs - you should see:
```
Current directory: /opt/build/repo/web-project
```

Instead of:
```
Current directory: /opt/build/repo
```

