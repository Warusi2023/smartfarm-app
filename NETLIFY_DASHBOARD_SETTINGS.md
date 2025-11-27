# Netlify Dashboard Settings - Exact Values

## ⚠️ CRITICAL: These settings MUST match your root `netlify.toml`

Go to: **Site Settings** → **Build & Deploy** → **Build settings**

### Required Settings

| Setting | Value | Notes |
|---------|-------|-------|
| **Base directory** | `web-project` | No quotes, no slashes. This is the folder containing `package.json` |
| **Build command** | `npm install && npm run build` | Runs AFTER changing into base directory |
| **Publish directory** | `dist` | Relative to base directory (resolves to `web-project/dist`) |

### How to Set

1. **Base directory**:
   - Click the field
   - Type: `web-project`
   - Press Enter or click outside to save

2. **Build command**:
   - Click the field
   - Type: `npm install && npm run build`
   - Press Enter or click outside to save

3. **Publish directory**:
   - Click the field
   - Type: `dist`
   - Press Enter or click outside to save

4. **Click "Save"** at the bottom of the page

### Verification

After saving, trigger a new deploy and check the build logs:

✅ **Success indicators**:
```
1:01:23 PM: Installing dependencies
1:01:23 PM: Current directory: /opt/build/repo/web-project
1:01:23 PM: Installing NPM modules using NPM version 9.x.x
1:01:23 PM: Found package.json in /opt/build/repo/web-project/package.json
```

❌ **Failure indicators**:
```
1:01:23 PM: Current directory: /opt/build/repo
1:01:23 PM: Error: ENOENT: no such file or directory, open '/opt/build/repo/package.json'
```

### Troubleshooting

**If build still fails**:
1. Double-check Base directory is exactly `web-project` (no typos)
2. Clear build cache: **Deploys** → **Clear cache and retry deploy**
3. Check for typos in Build command
4. Verify `package.json` exists in `web-project/` directory

**If Netlify shows warnings**:
- Red warnings about `netlify.toml` overriding settings are normal
- They're informational and will clear after a successful deploy
- The important thing is that the build succeeds

