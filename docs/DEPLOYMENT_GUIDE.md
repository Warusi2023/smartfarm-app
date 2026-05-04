# SmartFarm Deployment Guide
**Complete Guide for Railway (Backend) + Netlify (Frontend) + GitHub Actions (CI/CD)**

---

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                    GitHub Repository                     │
│         https://github.com/Warusi2023/smartfarm-app     │
└────────────────┬────────────────────────────────────────┘
                 │
                 │ Push to main branch
                 ↓
┌─────────────────────────────────────────────────────────┐
│              GitHub Actions CI/CD Pipeline               │
│  1. Build & Test → 2. Deploy Backend → 3. Deploy Frontend │
└──────┬──────────────────────────────────────────┬───────┘
       │                                           │
       │                                           │
       ↓                                           ↓
┌──────────────────┐                    ┌──────────────────┐
│  Railway (Backend)│                    │ Netlify (Frontend)│
│  Node.js/Express  │←────API Calls──────│  Static HTML/JS  │
│  PostgreSQL DB    │                    │  CDN Distribution │
└──────────────────┘                    └──────────────────┘
```

---

## 🚀 Quick Start

### Prerequisites
- GitHub account
- Railway account (free tier available)
- Netlify account (free tier available)
- OpenWeatherMap API key (optional, for weather features)

### 1. Configure GitHub Secrets

**Go to:** `GitHub → Repository → Settings → Secrets and variables → Actions`

**Click:** "New repository secret" and add each of these:

| Secret Name | Description | How to Get It |
|-------------|-------------|---------------|
| `RAILWAY_TOKEN` | Railway API token | Railway → Account Settings → Tokens → Create Token |
| `NETLIFY_AUTH_TOKEN` | Netlify personal access token | Netlify → User Settings → Applications → New Token |
| `NETLIFY_SITE_ID` | Netlify site ID | Netlify → Site Settings → Site Information |

**Optional Secrets:**
| Secret Name | Description |
|-------------|-------------|
| `RAILWAY_SERVICE_NAME` | Service name (default: `smartfarm-backend`) |
| `RAILWAY_PUBLIC_URL` | Backend URL (default: auto-detected) |

### 2. Configure Railway Environment Variables

**Go to:** `Railway → Your Project → Variables`

**Required Variables:**
```bash
NODE_ENV=production
JWT_SECRET=<generate-a-secure-32-character-secret>
CORS_ORIGIN=https://dulcet-sawine-92d6a8.netlify.app
LOG_LEVEL=info
```

**Recommended Variables:**
```bash
# Weather Features
WEATHER_API_KEY=<your-openweathermap-api-key>

# Feature Flags
FEATURE_GEOFENCING=true
FEATURE_AI_ADVISORY=true
FEATURE_BYPRODUCTS=true
FEATURE_SUBSCRIPTIONS=true
```

**Generate JWT Secret:**
```bash
# On your local machine, run:
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Copy the output and paste as JWT_SECRET
```

### 3. Configure Netlify Environment Variables

**Go to:** `Netlify → Site Settings → Environment Variables`

**Required:**
```bash
VITE_API_URL=https://web-production-86d39.up.railway.app
```

**Optional:**
```bash
LOG_LEVEL=info
NETLIFY_SITE_NAME=smartfarm-web
```

### 4. Deploy!

**Method 1: Push to GitHub (Automatic)**
```bash
git add .
git commit -m "deploy: trigger production deployment"
git push origin main
```

**GitHub Actions will:**
1. ✅ Build and test backend
2. ✅ Deploy backend to Railway
3. ✅ Run health check
4. ✅ Deploy frontend to Netlify
5. ✅ Run E2E tests (if configured)
6. ✅ Post deployment summary

**Method 2: Manual Railway Deploy**
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Link to project
railway link

# Deploy
railway up
```

**Method 3: Manual Netlify Deploy**
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
cd web-project/public
netlify deploy --prod --dir .
```

---

## 🧪 Testing

### Backend Unit Tests
```bash
cd backend-api
npm install
npm test
```

### Backend Test Coverage
```bash
cd backend-api
npm run test:coverage
```

### E2E Tests (Playwright)
```bash
# Install dependencies
npm install -D @playwright/test
npx playwright install

# Run tests
npx playwright test

# Run with UI
npx playwright test --ui

# Run specific browser
npx playwright test --project=chromium
```

### Manual Testing Checklist
- [ ] Backend health check: `curl https://web-production-86d39.up.railway.app/api/health`
- [ ] Frontend loads: Open `https://dulcet-sawine-92d6a8.netlify.app`
- [ ] Login works
- [ ] Dashboard displays correctly
- [ ] Navigate to all pages
- [ ] Create/edit/delete operations work
- [ ] Weather data loads (if API key configured)
- [ ] Geofencing map loads

---

## 🔍 Monitoring & Debugging

### Check Railway Logs
```bash
# Using Railway CLI
railway logs

# Or in Railway dashboard:
# Your Project → Service → Deployments → View Logs
```

### Check Netlify Deploy Logs
```bash
# Netlify Dashboard:
# Your Site → Deploys → Click on latest deploy → Deploy log
```

### Check GitHub Actions
```bash
# GitHub:
# Repository → Actions → Click on latest workflow run
```

### Health Check
```bash
# Backend
curl https://web-production-86d39.up.railway.app/api/health

# Should return:
{
  "status": "OK",
  "timestamp": "2025-10-01T12:00:00.000Z",
  "version": "1.0.0",
  "environment": "production",
  "uptime": { "seconds": 123, "formatted": "0h 2m 3s" },
  "memory": { "heapUsed": "45MB", "heapTotal": "60MB" },
  "database": { "type": "postgresql", "connected": true },
  "apis": { "weather": true, "maps": false },
  "features": {
    "geofencing": true,
    "aiAdvisory": true,
    "byproducts": true,
    "subscriptions": true
  },
  "cors": {
    "allowedOrigins": ["https://dulcet-sawine-92d6a8.netlify.app"]
  }
}
```

---

## 🐛 Troubleshooting

### CORS Errors

**Problem:** `Access-Control-Allow-Origin` errors

**Solution:**
1. Check Railway `CORS_ORIGIN` variable matches your Netlify URL exactly
2. Make sure it includes the protocol (`https://`)
3. Redeploy Railway after changing

```bash
# Correct format:
CORS_ORIGIN=https://dulcet-sawine-92d6a8.netlify.app

# NOT:
CORS_ORIGIN=dulcet-sawine-92d6a8.netlify.app  # Missing https://
```

### API Connection Failures

**Problem:** Frontend can't connect to backend

**Solution:**
1. Check Netlify `VITE_API_URL` is set correctly
2. Verify Railway service is running
3. Test health endpoint directly
4. Check browser console for errors

### Authentication Issues

**Problem:** Login fails or "401 Unauthorized"

**Solution:**
1. Clear browser localStorage/sessionStorage
2. Check JWT_SECRET is set on Railway
3. Verify user exists in database
4. Check token expiration

### Database Errors

**Problem:** "Database connection failed"

**Solution:**
1. Check Railway PostgreSQL plugin is added
2. Verify DATABASE_URL is set automatically
3. Run migrations: `railway run npm run migrate`
4. Check database logs in Railway

---

## 📊 Monitoring

### Railway Metrics
- **CPU Usage:** Railway Dashboard → Metrics
- **Memory Usage:** Railway Dashboard → Metrics
- **Request Count:** Check logs
- **Error Rate:** Check logs for 5xx errors

### Netlify Analytics
- **Page Views:** Netlify Dashboard → Analytics
- **Load Times:** Netlify Dashboard → Analytics
- **Bandwidth:** Netlify Dashboard → Usage

### GitHub Actions
- **Build Success Rate:** Actions tab → Workflow insights
- **Deploy Time:** Check workflow duration
- **Test Pass Rate:** Check test job results

---

## 🔄 Rollback Procedure

### If deployment fails:

**1. Rollback Railway:**
```bash
# Using Railway dashboard:
# Deployments → Previous successful deploy → "Redeploy"

# Or using CLI:
railway rollback
```

**2. Rollback Netlify:**
```bash
# Netlify dashboard:
# Deploys → Previous deploy → "Publish deploy"

# Or using CLI:
netlify rollback
```

**3. Revert Git:**
```bash
git revert HEAD
git push origin main
```

---

## 📝 Post-Deployment Checklist

After each deployment, verify:

- [ ] ✅ Backend health endpoint responds
- [ ] ✅ Frontend loads without errors
- [ ] ✅ Login/authentication works
- [ ] ✅ Dashboard displays data
- [ ] ✅ API calls succeed
- [ ] ✅ Weather data loads (if configured)
- [ ] ✅ Geofencing map displays
- [ ] ✅ No console errors
- [ ] ✅ Mobile responsive
- [ ] ✅ All navigation links work

---

## 🔐 Security Best Practices

1. **Never commit `.env` files** - Use `.env.example` as template
2. **Rotate secrets regularly** - Change JWT_SECRET periodically
3. **Use strong passwords** - Minimum 12 characters
4. **Enable 2FA** - On GitHub, Railway, and Netlify accounts
5. **Review logs** - Check for suspicious activity
6. **Update dependencies** - Run `npm audit` regularly
7. **CORS restrictions** - Only allow necessary origins

---

## 📞 Support

**Issues:** https://github.com/Warusi2023/smartfarm-app/issues  
**Documentation:** `docs/` folder  
**API Docs:** https://web-production-86d39.up.railway.app/api/docs

---

**Last Updated:** October 1, 2025  
**Version:** 1.0.0

