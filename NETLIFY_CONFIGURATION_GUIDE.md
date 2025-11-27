# Netlify Configuration Guide - Updated for Current Directory Structure

## Current Directory Structure

```
SmartFarm/                          (GitHub repository root)
├── netlify.toml                   (Root-level Netlify config)
├── web-project/                    (Web application directory)
│   ├── package.json               (npm dependencies)
│   ├── netlify.toml               (Web-project specific config)
│   ├── vite.config.ts            (Vite configuration)
│   ├── dist/                      (Build output - created during build)
│   ├── public/                    (Static assets)
│   └── src/                       (Source files)
├── android-project/               (Android app - not deployed to Netlify)
└── backend/                       (Backend API - not deployed to Netlify)
```

## Netlify Configuration

### Root-Level `netlify.toml` (Repository Root)

This file tells Netlify:
- **Base directory**: `web-project` (change into this directory before building)
- **Build command**: `npm install && npm run build` (runs from web-project/)
- **Publish directory**: `dist` (relative to base, so web-project/dist)

### Configuration Details

```toml
[build]
  base = "web-project"              # Change into web-project/ before building
  command = "npm install && npm run build"  # Run from web-project/
  publish = "dist"                  # Output is web-project/dist/
```

## Netlify Dashboard Settings

**CRITICAL**: You must set these in the Netlify dashboard UI:

1. **Go to**: Netlify Dashboard → Your Site → Site Settings → Build & Deploy → Build settings

2. **Set these values**:
   ```
   Base directory:     web-project
   Build command:       npm install && npm run build
   Publish directory:   dist
   ```

3. **Why both?**
   - The `netlify.toml` file provides defaults
   - The UI settings can override the file
   - Setting both ensures consistency

## How It Works

1. **Netlify clones your repository** to `/opt/build/repo`
2. **Netlify reads `netlify.toml`** at the root
3. **Netlify changes directory** to `web-project/` (because `base = "web-project"`)
4. **Netlify runs** `npm install` (finds `web-project/package.json`)
5. **Netlify runs** `npm run build` (runs Vite build)
6. **Vite outputs** to `web-project/dist/`
7. **Netlify publishes** from `web-project/dist/`

## Verification

After deployment, check the build logs. You should see:

```
Current directory: /opt/build/repo/web-project
```

**NOT**:
```
Current directory: /opt/build/repo  ❌ (wrong - means base directory not set)
```

## Troubleshooting

### Build Fails: "package.json not found"

**Cause**: Base directory not set correctly

**Fix**:
1. Check Netlify dashboard → Build settings → Base directory = `web-project`
2. Verify `netlify.toml` has `base = "web-project"`
3. Clear cache and redeploy

### Build Succeeds But Site Doesn't Load

**Cause**: Wrong publish directory

**Fix**:
1. Check Netlify dashboard → Build settings → Publish directory = `dist`
2. Verify build output exists in `web-project/dist/`
3. Check that `dist/index.html` exists

### Environment Variables Not Working

**Cause**: Variables not set or missing `VITE_` prefix

**Fix**:
1. Set variables in Netlify dashboard → Environment variables
2. All client-side variables must start with `VITE_`
3. Redeploy after adding variables

## Quick Reference

| Setting | Value | Location |
|---------|-------|----------|
| Base directory | `web-project` | Dashboard + netlify.toml |
| Build command | `npm install && npm run build` | Dashboard + netlify.toml |
| Publish directory | `dist` | Dashboard + netlify.toml |
| Node version | `18` | Dashboard + netlify.toml |

## Next Steps

1. ✅ Update Netlify dashboard settings (if not already done)
2. ✅ Verify `netlify.toml` is committed to repository
3. ✅ Trigger new deployment
4. ✅ Check build logs for correct directory
5. ✅ Verify site loads correctly

