# Netlify Build Fix - Critical Steps

## Problem
Netlify is trying to build from the repository root (`/opt/build/repo`) instead of `web-project/` directory, causing `package.json` not found error.

## Root Cause
1. **Netlify dashboard UI settings** are overriding the `netlify.toml` file configuration
2. **Conflicting netlify.toml files**: There are TWO `netlify.toml` files (root and `web-project/`), which may cause confusion

## Solution

### ⚠️ CRITICAL: Update Netlify Dashboard Settings FIRST

**The dashboard UI settings MUST match the root `netlify.toml` file.**

1. **Go to Netlify Dashboard**
   - Visit: https://app.netlify.com
   - Select your site

2. **Navigate to Build Settings**
   - Go to: **Site Settings** → **Build & Deploy** → **Build settings**

3. **Update Base Directory** ⚠️ **MOST IMPORTANT**
   - Find **"Base directory"** field
   - **Set it to: `web-project`**
   - **IMPORTANT**: 
     - Must be exactly `web-project` (no leading/trailing slashes)
     - No quotes, no spaces
     - This tells Netlify: "Change into web-project/ before running any commands"

4. **Update Publish Directory**
   - Find **"Publish directory"** field
   - **Set it to: `dist`** (relative to base directory)
   - Since base = `web-project`, this resolves to `web-project/dist`

5. **Update Build Command**
   - Find **"Build command"** field
   - **Set it to: `npm install && npm run build`**
   - This runs AFTER Netlify changes into `web-project/` directory

6. **Save Settings**
   - Click **"Save"** button at the bottom
   - **Wait for confirmation** that settings are saved

### Step 2: Verify Root netlify.toml File

The root `netlify.toml` (at repository root) should have:
```toml
[build]
  base = "web-project"
  command = "npm install && npm run build"
  publish = "dist"
```

**Note**: The `web-project/netlify.toml` file is redundant and can be ignored. Netlify reads the root `netlify.toml` first.

### Step 3: Clear Build Cache and Trigger New Deploy

1. Go to **Deploys** tab
2. Click **"Clear cache and retry deploy"** (or trigger a new deploy)
3. **Watch the build logs** - you should see it change into `web-project/` directory

### Step 4: Verify Configuration in Build Logs

After updating settings, check the build logs. You should see:
```
Current directory: /opt/build/repo/web-project
Installing dependencies...
Found package.json in /opt/build/repo/web-project/package.json
```

**NOT**:
```
Current directory: /opt/build/repo
Error: ENOENT: no such file or directory, open '/opt/build/repo/package.json'
```

## Why Dashboard Settings Matter

Netlify uses this priority order:
1. **Dashboard UI settings** (highest priority - can override netlify.toml)
2. Root `netlify.toml` file
3. `web-project/netlify.toml` (if base directory is set)

**Therefore**: Dashboard settings MUST be set correctly, even if `netlify.toml` is correct.

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

