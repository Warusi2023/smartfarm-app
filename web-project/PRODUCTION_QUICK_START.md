# Production Deployment - Quick Start Guide

This is a condensed guide to get your SmartFarm web app deployed to production quickly.

## 🚀 Quick Deployment (5 Steps)

### Step 1: Deploy to Netlify (5 minutes)

1. Go to [Netlify](https://app.netlify.com) and sign in
2. Click **"Add new site"** → **"Import an existing project"**
3. Connect your GitHub repository
4. Configure:
   - **Base directory**: `web-project`
   - **Build command**: `npm install && npm run build`
   - **Publish directory**: `web-project/dist`
5. Click **"Deploy site"**

✅ **Result**: Your site is live at `https://your-site-name.netlify.app`

---

### Step 2: Set Environment Variables (2 minutes)

In Netlify dashboard → **Site Settings** → **Environment variables**, add:

```bash
VITE_API_BASE_URL=https://smartfarm-app-production.up.railway.app
VITE_API_URL=https://smartfarm-app-production.up.railway.app
VITE_APP_NAME=SmartFarm
VITE_APP_VERSION=1.0.0
NODE_ENV=production
```

Then **trigger a new deployment** (Deploys → Trigger deploy)

---

### Step 3: Verify Deployment (1 minute)

Run the verification script:

```powershell
cd web-project
.\scripts\verify-production.ps1 -ProductionUrl "https://your-site-name.netlify.app"
```

Or manually check:
- ✅ Site loads
- ✅ No console errors
- ✅ HTTPS enabled (green padlock)

---

### Step 4: Test Core Features (5 minutes)

Test these critical flows:
- [ ] Login/Register
- [ ] Dashboard loads
- [ ] Create a farm
- [ ] View farms list
- [ ] Navigation works

---

### Step 5: Add API Keys (Optional - 10 minutes)

If you need external services:

1. **Google Maps**: Get key from [Google Cloud Console](https://console.cloud.google.com)
2. **OpenWeather**: Get key from [OpenWeatherMap](https://openweathermap.org/api)
3. Add to Netlify environment variables:
   ```bash
   VITE_MAPS_API_KEY=your_key_here
   VITE_OPENWEATHER_API_KEY=your_key_here
   ```
4. Redeploy

---

## 📋 Full Checklist

For comprehensive deployment, see:
- **[PRODUCTION_DEPLOYMENT_GUIDE.md](./PRODUCTION_DEPLOYMENT_GUIDE.md)** - Complete guide
- **[PRODUCTION_CHECKLIST.md](./PRODUCTION_CHECKLIST.md)** - Detailed checklist

---

## 🧪 Testing Commands

```powershell
# Verify production deployment
.\scripts\verify-production.ps1 -ProductionUrl "https://your-site.netlify.app"

# Run Lighthouse performance test
.\scripts\test-lighthouse.ps1 -Url "https://your-site.netlify.app"

# Build locally to test
npm run build
npm run preview
```

---

## 🔧 Troubleshooting

### Build Fails
- Check build logs in Netlify dashboard
- Verify Node version (18 or 20)
- Ensure `package.json` has all dependencies

### API Calls Fail
- Verify `VITE_API_BASE_URL` is set correctly
- Check backend is running: `curl https://smartfarm-app-production.up.railway.app/api/health`
- Verify CORS is configured on backend

### Environment Variables Not Working
- Variables must start with `VITE_` prefix
- Redeploy after adding variables
- Check variable names are exact (case-sensitive)

---

## 📊 Performance Targets

After deployment, verify:

- **Lighthouse Performance**: ≥ 80
- **Lighthouse Accessibility**: ≥ 90
- **Page Load Time**: < 3 seconds
- **Bundle Size**: < 500KB (gzipped)

Run Lighthouse from Chrome DevTools or use the script:
```powershell
.\scripts\test-lighthouse.ps1 -Url "https://your-site.netlify.app"
```

---

## 🔒 Security Checklist

Quick security verification:

- [ ] HTTPS enabled (automatic with Netlify)
- [ ] No API keys in client code
- [ ] Protected routes require auth
- [ ] CORS configured correctly
- [ ] Security headers present (check with verification script)

---

## 📞 Next Steps

After basic deployment:

1. **Set up monitoring** (Sentry, Google Analytics)
2. **Configure custom domain** (optional)
3. **Add API keys** for external services
4. **Run full test suite** (see PRODUCTION_CHECKLIST.md)
5. **Set up CI/CD** for automatic deployments

---

## 🆘 Need Help?

- **Full Guide**: See [PRODUCTION_DEPLOYMENT_GUIDE.md](./PRODUCTION_DEPLOYMENT_GUIDE.md)
- **Checklist**: See [PRODUCTION_CHECKLIST.md](./PRODUCTION_CHECKLIST.md)
- **Build Issues**: Check Netlify build logs
- **API Issues**: Verify backend is running and CORS is configured

---

**Estimated Total Time**: 15-20 minutes for basic deployment

**Last Updated**: [Date]

