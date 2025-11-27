# Netlify Build Fix - Step-by-Step Checklist

## ✅ Problem
Netlify cannot find `package.json` because it's building from the wrong directory.

## ✅ Solution
Set the **Base directory** in Netlify Dashboard to `web-project` (the folder containing `package.json`).

---

## 📋 Action Checklist

### Step 1: Open Netlify Dashboard
- [ ] Go to: https://app.netlify.com
- [ ] Click on your **SmartFarm** site

### Step 2: Navigate to Build Settings
- [ ] Click: **Site Settings** (in the top navigation)
- [ ] Click: **Build & Deploy** (left sidebar)
- [ ] Click: **Build settings** (under Build & Deploy)

### Step 3: Update Base Directory ⚠️ CRITICAL
- [ ] Find the **"Base directory"** field
- [ ] **Clear any existing value** (if present)
- [ ] **Type exactly**: `web-project`
  - ✅ Correct: `web-project`
  - ❌ Wrong: `/web-project` (no leading slash)
  - ❌ Wrong: `web-project/` (no trailing slash)
  - ❌ Wrong: `./web-project` (no dot-slash)
- [ ] Press Enter or click outside the field

### Step 4: Update Build Command
- [ ] Find the **"Build command"** field
- [ ] **Set it to**: `npm install && npm run build`
- [ ] Press Enter or click outside the field

### Step 5: Update Publish Directory
- [ ] Find the **"Publish directory"** field
- [ ] **Set it to**: `dist`
  - This is relative to the base directory
  - Since base = `web-project`, this resolves to `web-project/dist`
- [ ] Press Enter or click outside the field

### Step 6: Save Settings
- [ ] Scroll to the bottom of the page
- [ ] Click the **"Save"** button
- [ ] Wait for confirmation that settings are saved

### Step 7: Trigger New Deploy
- [ ] Go to the **Deploys** tab (top navigation)
- [ ] Click **"Trigger deploy"** → **"Deploy site"**
  - OR click **"Clear cache and retry deploy"** if there's a failed deploy

### Step 8: Verify Build Success
- [ ] Watch the build logs
- [ ] Look for these success indicators:
  ```
  ✅ Current directory: /opt/build/repo/web-project
  ✅ Installing dependencies
  ✅ Found package.json in /opt/build/repo/web-project/package.json
  ✅ npm install completed successfully
  ✅ npm run build completed successfully
  ```

---

## 🔍 Verification

### What You Should See in Build Logs:

**✅ SUCCESS:**
```
1:01:23 PM: Installing dependencies
1:01:23 PM: Current directory: /opt/build/repo/web-project
1:01:23 PM: Installing NPM modules using NPM version 9.x.x
1:01:23 PM: Found package.json in /opt/build/repo/web-project/package.json
1:01:25 PM: npm install completed
1:01:25 PM: Running build command
1:01:30 PM: Build completed successfully
```

**❌ FAILURE (if base directory is wrong):**
```
1:01:23 PM: Current directory: /opt/build/repo
1:01:23 PM: Error: ENOENT: no such file or directory, open '/opt/build/repo/package.json'
1:01:23 PM: Build failed: exit code 254
```

---

## 🎯 Quick Reference

| Setting | Value |
|---------|-------|
| **Base directory** | `web-project` |
| **Build command** | `npm install && npm run build` |
| **Publish directory** | `dist` |

---

## 🐛 Troubleshooting

### If build still fails:

1. **Double-check Base directory**
   - Must be exactly `web-project` (no quotes, no slashes)
   - Go back to Step 3 and verify

2. **Clear build cache**
   - Go to **Deploys** tab
   - Click **"Clear cache and retry deploy"**

3. **Verify package.json exists**
   - Check that `web-project/package.json` exists in your repository
   - If not, the folder structure might be different

4. **Check for typos**
   - Base directory: `web-project` (not `webproject`, not `web_project`)
   - Build command: `npm install && npm run build` (exact spelling)

---

## 📝 Notes

- The root `netlify.toml` file already has `base = "web-project"`, but **Netlify Dashboard UI settings override the config file**
- You MUST set the Base directory in the dashboard UI for it to work
- After setting correctly, future deploys will use these settings automatically

---

## ✅ Success Criteria

When this checklist is complete, you should have:
- ✅ Base directory set to `web-project` in Netlify Dashboard
- ✅ Build command set to `npm install && npm run build`
- ✅ Publish directory set to `dist`
- ✅ A successful build that finds `package.json` and completes without errors

