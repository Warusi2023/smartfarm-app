# ✅ Monitoring Setup Checklist

**Track your monitoring setup progress**

---

## 🔴 Sentry Error Tracking

### Account Setup
- [ ] Sentry account created
- [ ] Project "SmartFarm" created
- [ ] DSN copied and saved

### Backend Setup
- [ ] Navigated to `backend` directory
- [ ] Installed packages: `npm install @sentry/node @sentry/profiling-node`
- [ ] Ran setup script: `node ../scripts/setup-sentry-backend.js`
- [ ] Added `SENTRY_DSN` to Railway variables
- [ ] Backend deployed
- [ ] Test error sent to Sentry
- [ ] Errors visible in Sentry dashboard

### Frontend Setup
- [ ] Navigated to `web-project` directory
- [ ] Installed package: `npm install @sentry/react`
- [ ] Ran setup script: `node ../scripts/setup-sentry-frontend.js`
- [ ] Added `VITE_SENTRY_DSN` to Netlify variables
- [ ] Frontend redeployed
- [ ] Test error sent to Sentry
- [ ] Errors visible in Sentry dashboard

**Sentry DSN:** `________________________________`

---

## 🟢 UptimeRobot Monitoring

### Account Setup
- [ ] UptimeRobot account created
- [ ] Email verified

### Monitor Setup
- [ ] Backend monitor added
  - URL: `https://smartfarm-app-production.up.railway.app/api/health`
  - Status: [ ] Up  [ ] Down
- [ ] Frontend monitor added
  - URL: `https://________________.netlify.app`
  - Status: [ ] Up  [ ] Down

### Alert Configuration
- [ ] Email alert contact added
- [ ] Alerts configured for both monitors
- [ ] Test alert received

**UptimeRobot Dashboard:** `https://uptimerobot.com/dashboard`

---

## 📊 Analytics (Optional)

### Google Analytics (if using)
- [ ] Google Analytics account created
- [ ] Property "SmartFarm" created
- [ ] Measurement ID obtained: `G-________`
- [ ] Added to Netlify variables: `VITE_GA_MEASUREMENT_ID`
- [ ] Script added to `index.html`
- [ ] Test visit tracked

### Plausible Analytics (if using)
- [ ] Plausible account created
- [ ] Domain added
- [ ] Script added to `index.html`
- [ ] Test visit tracked

---

## ✅ Verification

### Sentry
- [ ] Backend errors captured
- [ ] Frontend errors captured
- [ ] Stack traces visible
- [ ] Email alerts configured

### UptimeRobot
- [ ] Both monitors showing "Up"
- [ ] Last check time recent
- [ ] Email alerts working
- [ ] Status page created (optional)

### Analytics (if configured)
- [ ] Visits tracked
- [ ] Real-time data visible

---

## 📝 Notes

**Sentry Dashboard:** `https://sentry.io/organizations/[org]/issues/`
**UptimeRobot Dashboard:** `https://uptimerobot.com/dashboard`
**Analytics Dashboard:** `________________________________`

**Issues Encountered:**
1. 
2. 
3. 

**Date Completed:** _______________

---

## 🎯 Success Criteria

Monitoring is complete when:

- ✅ Sentry captures errors from both backend and frontend
- ✅ UptimeRobot monitors both services
- ✅ Email alerts configured and tested
- ✅ Errors visible in Sentry dashboard
- ✅ Uptime status shows "Up" for both services

**Status:** [ ] ✅ Complete  [ ] ⚠️ In Progress  [ ] ❌ Not Started
