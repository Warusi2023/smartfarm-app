# 🚀 Phase 1 Quick Start Guide

**Get your production environment running in 30 minutes!**

---

## ⚡ Quick Steps

### 1. Backend Setup (Railway) - 15 minutes

```bash
# Step 1: Go to Railway
https://railway.app → New Project → Deploy from GitHub

# Step 2: Select your repo and set root directory to "backend"

# Step 3: Add PostgreSQL database
Railway Dashboard → New → Database → Add PostgreSQL

# Step 4: Add environment variables (Railway → Variables)
NODE_ENV=production
PORT=3000
JWT_SECRET=<generate with: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))">
CORS_ORIGINS=https://your-frontend.netlify.app
WEATHER_API_KEY=<your-key>

# Step 5: Run database migrations
Railway → PostgreSQL → Data → Query → Paste schema.sql → Execute

# Step 6: Verify deployment
curl https://your-backend.railway.app/api/health
```

### 2. Frontend Setup (Netlify) - 10 minutes

```bash
# Step 1: Go to Netlify
https://app.netlify.com → Add new site → Import from GitHub

# Step 2: Configure build
Base directory: web-project
Build command: npm run build
Publish directory: dist

# Step 3: Add environment variables (Netlify → Environment Variables)
VITE_API_URL=https://your-backend.railway.app
VITE_APP_NAME=SmartFarm
VITE_APP_VERSION=1.0.0

# Step 4: Deploy
Netlify will auto-deploy on git push, or click "Deploy site"
```

### 3. Verification - 5 minutes

```bash
# Run verification script
node scripts/verify-phase1.js

# Or test manually:
curl https://your-backend.railway.app/api/health
curl https://your-frontend.netlify.app
```

---

## 📋 Required API Keys

### OpenWeatherMap (Required for weather alerts)
1. Sign up: https://openweathermap.org/api
2. Get API key from dashboard
3. Add to Railway: `WEATHER_API_KEY=your-key`

### Google Maps (Optional)
1. Go to: https://console.cloud.google.com/apis/credentials
2. Create API key
3. Enable: Maps JavaScript API, Geocoding API
4. Add to Railway: `GOOGLE_API_KEY=your-key`

---

## ✅ Success Checklist

- [ ] Backend health endpoint returns `{"status":"healthy"}`
- [ ] Frontend loads without errors
- [ ] User registration works
- [ ] User login works
- [ ] No CORS errors in browser console

---

## 🆘 Need Help?

- **Detailed Guide:** See `PHASE1_PRODUCTION_SETUP_GUIDE.md`
- **Checklist:** See `PHASE1_CHECKLIST.md`
- **Troubleshooting:** Check guide's troubleshooting section

---

**Ready? Let's go!** 🚀

