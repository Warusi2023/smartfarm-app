# Removing Neon Extension from Netlify

## Current Status

✅ **Good news**: The neon extension is **NOT** in your `netlify.toml` file.

The neon extension is configured in the **Netlify Dashboard UI**, not in the config file.

## How to Remove Neon Extension

Since it's configured in the UI, you need to remove it from the Netlify dashboard:

1. **Go to Netlify Dashboard**
   - Visit: https://app.netlify.com
   - Select your site

2. **Navigate to Integrations/Extensions**
   - Go to: **Site Settings** → **Integrations** (or **Build & Deploy** → **Build plugins**)
   - Look for **"Neon"** extension

3. **Remove the Extension**
   - Click on the Neon extension
   - Click **"Remove"** or **"Uninstall"**
   - Confirm removal

4. **Alternative Location**
   - Sometimes extensions are under: **Site Settings** → **Build & Deploy** → **Build plugins**
   - Or: **Site Settings** → **Integrations** → **Installed integrations**

## Verification

After removing, trigger a new deployment. The build logs should **NOT** show:
```
❯ Installing extensions
   - neon  ❌ (should not appear)
```

## Why This Matters

- Extensions add build time
- If you're not using Neon database, the extension is unnecessary
- Removing unused extensions speeds up builds

## Note

Your `netlify.toml` file is clean - no neon references. The extension is only in the Netlify dashboard UI configuration.

