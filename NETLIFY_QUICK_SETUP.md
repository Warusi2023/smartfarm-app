# ⚡ Netlify Frontend Quick Setup

**Fast setup guide - 10 minutes**

---

## 🎯 Quick Steps

### 1. Go to Netlify Dashboard
**Link:** https://app.netlify.com

### 2. Find or Create Your Site
- **If site exists:** Click on it
- **If new:** "Add new site" → "Import from GitHub" → Select `smartfarm-app`

### 3. Set Environment Variables ⚠️ **DO THIS FIRST!**

**Go to:** Site settings → Environment variables → Add a variable

**Add these 5 variables:**

```
1. VITE_API_URL = https://smartfarm-app-production.up.railway.app
2. VITE_API_BASE_URL = https://smartfarm-app-production.up.railway.app
3. VITE_APP_NAME = SmartFarm
4. VITE_APP_VERSION = 1.0.0
5. NODE_ENV = production
```

**Important:** 
- Variables must start with `VITE_` to work in frontend
- No `/api` at the end of API URL
- Set these BEFORE deploying!

### 4. Configure Build Settings

**Go to:** Site settings → Build & deploy → Build settings → Edit settings

**Set:**
```
Base directory:     web-project
Build command:      npm install && npm run build
Publish directory:   web-project/dist
Node version:        18 or 20
```

### 5. Deploy

**Go to:** Deploys tab → "Trigger deploy" → "Clear cache and deploy site"

**Wait:** 2-5 minutes for build to complete

### 6. Get Your Netlify URL

After deployment, note your URL:
- Format: `https://[name].netlify.app`
- **Save this!** You'll need it for CORS configuration

### 7. Verify

1. Visit your Netlify URL
2. Open DevTools (F12) → Console
3. Look for: `[API Config] Using environment URL: https://smartfarm-app-production.up.railway.app`
4. Should see no errors

---

## ✅ Success Checklist

- [ ] All 5 environment variables added
- [ ] Build settings configured correctly
- [ ] Site deployed successfully
- [ ] Netlify URL noted
- [ ] Site loads without errors
- [ ] API config shows correct backend URL

---

## 🔗 Next Step

After Netlify is configured:

**Update Railway CORS_ORIGINS:**
1. Railway → Backend → Variables → CORS_ORIGINS
2. Set to: `https://your-site.netlify.app,https://www.your-site.netlify.app`
3. Save and wait for redeploy

---

## 📚 Detailed Guide

For step-by-step instructions with troubleshooting, see:
- **NETLIFY_FRONTEND_SETUP.md** - Complete detailed guide
- **NETLIFY_SETUP_CHECKLIST.md** - Checklist to track progress

---

**Ready? Start with Step 1!** 🚀
