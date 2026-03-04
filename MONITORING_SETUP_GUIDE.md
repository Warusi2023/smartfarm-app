# 📊 Monitoring Setup Guide

**Complete guide to set up monitoring for SmartFarm production**

---

## 🎯 Overview

This guide will help you set up:
1. **Error Tracking** (Sentry) - Track and debug errors in real-time
2. **Uptime Monitoring** (UptimeRobot) - Monitor backend and frontend availability
3. **Basic Analytics** (Optional) - Track user behavior

**All services offer free tiers suitable for production use.**

---

## 🔴 PART 1: Error Tracking with Sentry

### Why Sentry?
- Real-time error tracking
- Stack traces and context
- Email alerts for critical errors
- Free tier: 5,000 events/month
- Works with Node.js and React

### Step 1.1: Create Sentry Account

1. **Go to:** https://sentry.io/signup/
2. **Sign up** with your email
3. **Choose:** "Node.js" as your platform
4. **Create a new project** named "SmartFarm"

### Step 1.2: Get Your Sentry DSN

After creating the project:
1. **Copy your DSN** (Data Source Name)
   - Format: `https://[key]@[org].ingest.sentry.io/[project-id]`
   - Example: `https://abc123@o123456.ingest.sentry.io/1234567`
2. **Save this DSN** - you'll need it for backend and frontend

### Step 1.3: Install Sentry in Backend

1. **Navigate to backend directory:**
   ```powershell
   cd backend
   ```

2. **Install Sentry SDK:**
   ```powershell
   npm install @sentry/node @sentry/profiling-node
   ```

3. **Add to Railway environment variables:**
   - Go to Railway → Backend → Variables
   - Add: `SENTRY_DSN` = (your Sentry DSN)

### Step 1.4: Configure Sentry in Backend

We'll add Sentry initialization to `server.js`:

```javascript
// At the top of server.js (after other imports)
const Sentry = require("@sentry/node");
const { ProfilingIntegration } = require("@sentry/profiling-node");

// Initialize Sentry BEFORE other middleware
if (process.env.SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    environment: process.env.NODE_ENV || "production",
    integrations: [
      new ProfilingIntegration(),
    ],
    tracesSampleRate: 1.0,
    profilesSampleRate: 1.0,
  });
}
```

### Step 1.5: Add Error Handler Middleware

Add Sentry error handler to `server.js`:

```javascript
// After other middleware, before routes
app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

// ... your routes ...

// Error handler AFTER routes
app.use(Sentry.Handlers.errorHandler());
```

### Step 1.6: Install Sentry in Frontend

1. **Navigate to frontend directory:**
   ```powershell
   cd web-project
   ```

2. **Install Sentry SDK:**
   ```powershell
   npm install @sentry/react
   ```

3. **Add to Netlify environment variables:**
   - Go to Netlify → Site → Environment Variables
   - Add: `VITE_SENTRY_DSN` = (your Sentry DSN)

### Step 1.7: Configure Sentry in Frontend

Add to `web-project/src/main.jsx` or `App.jsx`:

```javascript
import * as Sentry from "@sentry/react";

if (import.meta.env.VITE_SENTRY_DSN) {
  Sentry.init({
    dsn: import.meta.env.VITE_SENTRY_DSN,
    environment: import.meta.env.MODE || "production",
    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration(),
    ],
    tracesSampleRate: 1.0,
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
  });
}
```

### Step 1.8: Test Sentry Integration

1. **Deploy backend** (Railway will auto-deploy)
2. **Deploy frontend** (Netlify)
3. **Trigger a test error** (or wait for real errors)
4. **Check Sentry dashboard** - errors should appear within seconds

---

## 🟢 PART 2: Uptime Monitoring with UptimeRobot

### Why UptimeRobot?
- Free tier: 50 monitors
- 5-minute check interval
- Email/SMS alerts
- Public status page option
- No credit card required

### Step 2.1: Create UptimeRobot Account

1. **Go to:** https://uptimerobot.com/signup/
2. **Sign up** with your email
3. **Verify your email**

### Step 2.2: Add Backend Monitor

1. **Click "Add New Monitor"**
2. **Configure:**
   ```
   Monitor Type:     HTTP(s)
   Friendly Name:    SmartFarm Backend
   URL:              https://smartfarm-app-production.up.railway.app/api/health
   Monitoring Interval: 5 minutes
   Alert Contacts:   (select your email)
   ```
3. **Click "Create Monitor"**

### Step 2.3: Add Frontend Monitor

1. **Click "Add New Monitor"** again
2. **Configure:**
   ```
   Monitor Type:     HTTP(s)
   Friendly Name:    SmartFarm Frontend
   URL:              https://your-site.netlify.app
   Monitoring Interval: 5 minutes
   Alert Contacts:   (select your email)
   ```
3. **Click "Create Monitor"**

### Step 2.4: Configure Alert Contacts

1. **Go to:** My Settings → Alert Contacts
2. **Add Email Alert:**
   - Email address
   - Alert when: Down, Up, or Both
3. **Optional:** Add SMS alerts (requires phone verification)

### Step 2.5: Set Up Status Page (Optional)

1. **Go to:** Status Pages → Create Status Page
2. **Configure:**
   ```
   Page Title:       SmartFarm Status
   Page URL:         smartfarm-status (or your choice)
   Monitors:         Select both backend and frontend
   ```
3. **Share the status page URL** with users

---

## 📈 PART 3: Basic Analytics (Optional)

### Option A: Google Analytics 4 (Free)

1. **Go to:** https://analytics.google.com/
2. **Create account** → Create property → "SmartFarm"
3. **Get Measurement ID** (format: `G-XXXXXXXXXX`)
4. **Add to Netlify environment variables:**
   - `VITE_GA_MEASUREMENT_ID` = (your Measurement ID)
5. **Add to frontend** (`index.html` or `main.jsx`):
   ```html
   <!-- Google tag (gtag.js) -->
   <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
   <script>
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());
     gtag('config', 'G-XXXXXXXXXX');
   </script>
   ```

### Option B: Plausible Analytics (Privacy-Friendly)

1. **Go to:** https://plausible.io/
2. **Sign up** (free trial, then $9/month)
3. **Add your domain**
4. **Get script tag** and add to `index.html`

---

## ✅ PART 4: Verification & Testing

### Step 4.1: Test Sentry Error Tracking

**Backend Test:**
```powershell
# This should trigger an error in Sentry
Invoke-WebRequest -Uri "https://smartfarm-app-production.up.railway.app/api/nonexistent"
```

**Frontend Test:**
- Add a test error button in your app
- Or wait for real errors to occur

**Check Sentry Dashboard:**
- Errors should appear within seconds
- Click on error to see stack trace and context

### Step 4.2: Test UptimeRobot Monitoring

1. **Go to UptimeRobot dashboard**
2. **Check monitor status:**
   - Should show "Up" (green)
   - Last check time should be recent
3. **Test alert:**
   - Temporarily stop backend (or use wrong URL)
   - Wait 5 minutes
   - Should receive email alert

### Step 4.3: Verify Analytics (if configured)

1. **Visit your frontend**
2. **Check Google Analytics Real-Time** (if using GA)
3. **Should see your visit** within seconds

---

## 📋 Monitoring Checklist

### Sentry Error Tracking
- [ ] Sentry account created
- [ ] Backend Sentry SDK installed
- [ ] Frontend Sentry SDK installed
- [ ] `SENTRY_DSN` added to Railway
- [ ] `VITE_SENTRY_DSN` added to Netlify
- [ ] Sentry initialized in backend
- [ ] Sentry initialized in frontend
- [ ] Test error sent to Sentry
- [ ] Errors visible in Sentry dashboard

### UptimeRobot Monitoring
- [ ] UptimeRobot account created
- [ ] Backend monitor added
- [ ] Frontend monitor added
- [ ] Alert contacts configured
- [ ] Monitors showing "Up" status
- [ ] Status page created (optional)

### Analytics (Optional)
- [ ] Analytics service chosen
- [ ] Measurement ID obtained
- [ ] Analytics script added to frontend
- [ ] Test visit tracked

---

## 🔧 Configuration Files

### Backend: `backend/server.js` (Sentry Integration)

```javascript
// Add at the top
const Sentry = require("@sentry/node");
const { ProfilingIntegration } = require("@sentry/profiling-node");

// Initialize Sentry
if (process.env.SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    environment: process.env.NODE_ENV || "production",
    integrations: [
      new ProfilingIntegration(),
    ],
    tracesSampleRate: 1.0,
    profilesSampleRate: 1.0,
  });
}

// Add middleware (after app initialization, before routes)
app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

// ... your routes ...

// Error handler (after routes, before error middleware)
app.use(Sentry.Handlers.errorHandler());
```

### Frontend: `web-project/src/main.jsx` (Sentry Integration)

```javascript
import * as Sentry from "@sentry/react";

if (import.meta.env.VITE_SENTRY_DSN) {
  Sentry.init({
    dsn: import.meta.env.VITE_SENTRY_DSN,
    environment: import.meta.env.MODE || "production",
    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration(),
    ],
    tracesSampleRate: 1.0,
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
  });
}
```

---

## 🐛 Troubleshooting

### Sentry Not Capturing Errors

**Check:**
1. `SENTRY_DSN` is set correctly in Railway
2. Sentry SDK is initialized before other code
3. Error handler middleware is after routes
4. Check Sentry dashboard for connection status

**Debug:**
```javascript
// Add to server.js temporarily
console.log('Sentry DSN:', process.env.SENTRY_DSN ? 'Set' : 'Missing');
```

### UptimeRobot Not Sending Alerts

**Check:**
1. Alert contacts are configured
2. Email address is verified
3. Monitor is set to alert on "Down"
4. Check spam folder

### Analytics Not Tracking

**Check:**
1. Measurement ID is correct
2. Script is added to `index.html`
3. Ad blockers are disabled (for testing)
4. Check browser console for errors

---

## 📊 Monitoring Dashboard Links

After setup, bookmark these:

- **Sentry Dashboard:** https://sentry.io/organizations/[your-org]/issues/
- **UptimeRobot Dashboard:** https://uptimerobot.com/dashboard
- **Google Analytics:** https://analytics.google.com/ (if using)

---

## 🎯 Success Criteria

Monitoring is set up when:

- ✅ Sentry captures errors from backend and frontend
- ✅ UptimeRobot monitors both services
- ✅ Email alerts configured and tested
- ✅ Errors visible in Sentry dashboard
- ✅ Uptime status shows "Up" for both services

---

## 💡 Best Practices

1. **Set up alerts** for critical errors only (avoid alert fatigue)
2. **Review Sentry dashboard** weekly for error trends
3. **Check UptimeRobot** daily for service availability
4. **Set up status page** for transparency with users
5. **Monitor error rates** - sudden spikes indicate issues

---

**Ready to start? Begin with Step 1.1: Create Sentry Account!** 🚀
