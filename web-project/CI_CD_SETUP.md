# CI/CD Setup Guide for SmartFarm Web Project

## 🎯 Standard Configuration

All CI/CD platforms should be configured with **`web-project/`** as the base/root directory.

## 📋 Platform-Specific Setup

### Netlify

#### Dashboard Configuration
1. Go to **Site Settings** > **Build & Deploy**
2. Set **Base Directory:** `web-project`
3. **Build Command:** `npm install && npm run build` (auto-detected from `netlify.toml`)
4. **Publish Directory:** `dist` (auto-detected from `netlify.toml`)

#### Configuration File
`web-project/netlify.toml` is already configured:
```toml
[build]
  base = "."
  publish = "dist"
  command = "npm install && npm run build"
```

**Note:** The `base = "."` means "current directory", which should be `web-project/` when set in dashboard.

#### Environment Variables
Set in **Site Settings** > **Environment Variables**:
- `VITE_API_URL`
- `VITE_API_BASE_URL`
- `VITE_APP_NAME`
- `VITE_APP_VERSION`

### Vercel

#### Dashboard Configuration
1. Go to **Project Settings** > **General**
2. Set **Root Directory:** `web-project`
3. **Framework Preset:** Vite (auto-detected)
4. **Build Command:** `npm install && npm run build` (auto-detected)
5. **Output Directory:** `dist` (auto-detected)

#### Configuration File
`web-project/vercel.json` is configured:
```json
{
  "buildCommand": "cd web-project && npm install && npm run build",
  "outputDirectory": "web-project/dist",
  "framework": "vite"
}
```

**Note:** If root directory is set to `web-project/` in dashboard, simplify commands to:
```json
{
  "buildCommand": "npm install && npm run build",
  "outputDirectory": "dist",
  "framework": "vite"
}
```

#### Environment Variables
Set in **Project Settings** > **Environment Variables**:
- `VITE_API_URL`
- `VITE_API_BASE_URL`
- `VITE_APP_NAME`
- `VITE_APP_VERSION`

### Railway

#### Dashboard Configuration
1. Go to **Settings** > **Service**
2. Set **Root Directory:** `web-project`
3. **Build Command:** `npm install && npm run build`
4. **Start Command:** `npm start` (production) or `npm run dev` (development)

#### Configuration File
`web-project/railway.toml` is configured:
```toml
[build]
builder = "NIXPACKS"
buildCommand = "npm install && npm run build"

[deploy]
startCommand = "npm start"
healthcheckPath = "/"
```

#### Environment Variables
Set in **Variables** tab:
- `PORT` (default: 4173)
- `NODE_ENV=production`
- `VITE_API_URL`
- `VITE_API_BASE_URL`

### GitHub Actions

#### Workflow File
Create `.github/workflows/deploy-web.yml`:

```yaml
name: Deploy Web

on:
  push:
    branches: [main]
    paths:
      - 'web-project/**'

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
          cache-dependency-path: web-project/package-lock.json
      
      - name: Install dependencies
        working-directory: ./web-project
        run: npm ci
      
      - name: Build
        working-directory: ./web-project
        run: npm run build
        env:
          VITE_API_URL: ${{ secrets.VITE_API_URL }}
      
      - name: Deploy
        # Add deployment step here
```

**Key Points:**
- Use `working-directory: ./web-project` for all steps
- Cache npm dependencies using `cache-dependency-path: web-project/package-lock.json`

## ✅ Verification Checklist

### Before Deployment
- [ ] Base/Root directory set to `web-project/` in platform dashboard
- [ ] Build command: `npm install && npm run build`
- [ ] Output directory: `dist`
- [ ] Environment variables configured
- [ ] Node.js version matches (>=18.17 <=22)

### After Deployment
- [ ] Build completes successfully
- [ ] Site loads correctly
- [ ] API calls work (check browser console)
- [ ] Assets load correctly (images, CSS, JS)
- [ ] Routes work (SPA routing)

## 🔧 Troubleshooting

### Build Fails: "Cannot find module"
- **Cause:** Base directory not set correctly
- **Fix:** Set base directory to `web-project/` in dashboard

### Build Fails: "Command not found: npm"
- **Cause:** Node.js not installed or wrong version
- **Fix:** Ensure Node.js >=18.17 is installed

### Build Succeeds but Site Doesn't Load
- **Cause:** Wrong publish/output directory
- **Fix:** Set publish directory to `dist` (not `public`)

### Environment Variables Not Working
- **Cause:** Missing `VITE_` prefix
- **Fix:** All client-side env vars must start with `VITE_`

### Port Already in Use (Railway)
- **Cause:** Multiple services using same port
- **Fix:** Set `PORT` environment variable explicitly

## 📝 Best Practices

1. **Always set base directory** in platform dashboard, don't rely on config files alone
2. **Use `npm ci`** in CI/CD (faster, more reliable than `npm install`)
3. **Cache dependencies** to speed up builds
4. **Set environment variables** in platform dashboard, not in code
5. **Test builds locally** before deploying: `cd web-project && npm run build`
6. **Monitor build logs** for warnings and errors
7. **Use preview deployments** to test before production

## 🚀 Quick Reference

| Platform | Base Directory | Build Command | Output Directory |
|----------|---------------|---------------|------------------|
| Netlify | `web-project` | `npm install && npm run build` | `dist` |
| Vercel | `web-project` | `npm install && npm run build` | `dist` |
| Railway | `web-project` | `npm install && npm run build` | `dist` |
| GitHub Actions | `./web-project` | `npm ci && npm run build` | `dist` |

## 📚 Additional Resources

- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [Netlify Build Configuration](https://docs.netlify.com/configure-builds/overview/)
- [Vercel Configuration](https://vercel.com/docs/concepts/projects/overview)
- [Railway Configuration](https://docs.railway.app/develop/config)

