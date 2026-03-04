# 🔴 Monitoring Setup Quick Checklist

**Complete checklist for setting up Sentry and UptimeRobot monitoring**

---

## 🔴 **Sentry Error Tracking (Recommended)**

### Account & Project Setup
- [ ] Create Sentry account at https://sentry.io
- [ ] Create "SmartFarm" project (or separate projects for backend/frontend)
- [ ] Copy DSN (Data Source Name) - save it!
- [ ] Note: Backend already has Sentry code in `server.js` (lines 16-39), just needs DSN configured

### Backend Setup (Railway)
- [ ] Navigate to `backend` directory
- [ ] Install packages: `npm install @sentry/node @sentry/profiling-node`
- [ ] Run setup script: `node ../scripts/setup-sentry-backend.js` (optional - code already exists)
- [ ] Add `SENTRY_DSN` to Railway variables:
  - Go to Railway Dashboard → Backend Service → Variables
  - Add: `SENTRY_DSN` = Your Sentry DSN
- [ ] Redeploy backend (Railway auto-redeploys when variables change)
- [ ] Check Railway logs for: `"Sentry initialized successfully"`
- [ ] Test error reporting (see testing section below)

### Frontend Setup (Netlify)
- [ ] Navigate to `web-project` directory
- [ ] Install package: `npm install @sentry/react`
- [ ] Run setup script: `node ../scripts/setup-sentry-frontend.js` (optional)
- [ ] Or manually configure Sentry in `src/main.jsx` or `src/sentry.js` (see guide)
- [ ] Add `VITE_SENTRY_DSN` to Netlify variables:
  - Go to Netlify Dashboard → Site Settings → Environment Variables
  - Add: `VITE_SENTRY_DSN` = Your Sentry DSN
- [ ] Redeploy frontend (trigger deploy in Netlify)
- [ ] Check browser console for: `"✅ Sentry initialized for frontend"`
- [ ] Test error reporting (see testing section below)

### Testing Error Reporting

**Backend Test:**
1. Temporarily add test endpoint to `server.js`:
   ```javascript
   app.get('/api/test-sentry', (req, res) => {
     throw new Error('Test Sentry error from backend');
   });
   ```
2. Visit: `https://your-backend.railway.app/api/test-sentry`
3. Check Sentry dashboard → Issues → Should see the error
4. **Remove test endpoint after verification**

**Frontend Test:**
1. Add temporary test button to a component:
   ```javascript
   <button onClick={() => { throw new Error('Test Sentry error'); }}>
     Test Sentry
   </button>
   ```
2. Click the button
3. Check Sentry dashboard → Issues → Should see the error
4. **Remove test code after verification**

---

## 🟢 **UptimeRobot Monitoring (Free - Recommended)**

### Account Setup
- [ ] Create account at https://uptimerobot.com
- [ ] Verify email (check inbox for verification link)

### Backend Monitor Setup
- [ ] Click "+ Add New Monitor" in UptimeRobot dashboard
- [ ] Monitor Type: Select **"HTTP(s)"**
- [ ] Friendly Name: `SmartFarm Backend API`
- [ ] URL: `https://smartfarm-app-production.up.railway.app/api/health`
  - Replace with your actual Railway backend URL
  - Make sure to include `/api/health` endpoint
- [ ] Monitoring Interval: **5 minutes** (default)
- [ ] Click **"Create Monitor"**
- [ ] Verify status shows **"Up"** (green)

### Frontend Monitor Setup
- [ ] Click "+ Add New Monitor" again
- [ ] Monitor Type: Select **"HTTP(s)"**
- [ ] Friendly Name: `SmartFarm Frontend`
- [ ] URL: `https://your-site.netlify.app`
  - Replace with your actual Netlify site URL
  - No trailing slash needed
- [ ] Monitoring Interval: **5 minutes**
- [ ] Click **"Create Monitor"**
- [ ] Verify status shows **"Up"** (green)

### Email Alerts Configuration
- [ ] Go to **"My Settings"** → **"Alert Contacts"**
- [ ] Click **"+ Add Alert Contact"**
- [ ] Select **"Email"**
- [ ] Enter your email address
- [ ] Click **"Create Alert Contact"**
- [ ] Go back to **"My Monitors"**
- [ ] Edit each monitor → Select your email under **"Alert Contacts"**
- [ ] Click **"Update Monitor"**
- [ ] (Optional) Test alert by temporarily stopping a service

---

## ✅ **Verification Checklist**

### Sentry
- [ ] Backend errors appear in Sentry dashboard
- [ ] Frontend errors appear in Sentry dashboard
- [ ] Stack traces are visible
- [ ] Error details include request information
- [ ] Email alerts configured (optional)

### UptimeRobot
- [ ] Both monitors showing "Up" status
- [ ] Last check time is recent (within 5 minutes)
- [ ] Email alerts configured
- [ ] Test alert received (optional)

---

## 📝 **Quick Commands**

### Install Sentry Packages

**Backend:**
```bash
cd backend
npm install @sentry/node @sentry/profiling-node
```

**Frontend:**
```bash
cd web-project
npm install @sentry/react
```

### Run Setup Scripts (Optional)

**Backend:**
```bash
node scripts/setup-sentry-backend.js
```

**Frontend:**
```bash
node scripts/setup-sentry-frontend.js
```

**Note:** These scripts are optional since Sentry code already exists in `server.js`. They're useful if you need to add Sentry to a fresh installation.

---

## 🔗 **Quick Links**

- **Sentry:** https://sentry.io
- **UptimeRobot:** https://uptimerobot.com
- **Railway Dashboard:** https://railway.app
- **Netlify Dashboard:** https://app.netlify.com

---

## 📚 **Full Documentation**

For detailed setup instructions, see:
- **Sentry Setup:** `SENTRY_MONITORING_SETUP.md`
- **UptimeRobot Setup:** `UPTIMEROBOT_MONITORING_SETUP.md`

---

## ⏱️ **Estimated Time**

- **Sentry Setup:** 30 minutes
- **UptimeRobot Setup:** 15 minutes
- **Total:** ~45 minutes

---

**Last Updated:** January 2025
