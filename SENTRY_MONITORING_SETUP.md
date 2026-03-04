# 🔴 Sentry Error Tracking Setup Guide

**Complete guide to set up Sentry error tracking for SmartFarm backend and frontend**

---

## 📋 **Overview**

Sentry provides real-time error tracking and performance monitoring. This guide will help you:
- Set up Sentry account and project
- Configure backend error tracking (Railway)
- Configure frontend error tracking (Netlify)
- Verify error reporting works

**Estimated Time:** 30-45 minutes

---

## 🚀 **Step 1: Create Sentry Account & Project**

### 1.1 Create Account
1. Go to https://sentry.io/signup/
2. Sign up with GitHub (recommended) or email
3. Verify your email address

### 1.2 Create Project
1. After logging in, click **"Create Project"** or **"Projects"** → **"Create Project"**
2. Select platform:
   - **Backend:** Choose **"Node.js"**
   - **Frontend:** Choose **"React"** (or "Browser JavaScript")
3. Project name: `SmartFarm` (or `SmartFarm-Backend` / `SmartFarm-Frontend`)
4. Click **"Create Project"**

### 1.3 Get DSN (Data Source Name)
1. After creating project, you'll see the **DSN** (looks like: `https://xxxxx@xxxxx.ingest.sentry.io/xxxxx`)
2. **Copy and save this DSN** - you'll need it for both backend and frontend
3. You can also find it later: **Settings** → **Projects** → **Your Project** → **Client Keys (DSN)**

---

## 🔧 **Step 2: Backend Setup (Railway)**

### 2.1 Install Sentry Packages

**In your local `backend` directory:**

```bash
cd backend
npm install @sentry/node @sentry/profiling-node
```

**Note:** The backend code already has Sentry integration in `server.js` (lines 16-39), so you just need to install packages and add the DSN.

### 2.2 Verify Backend Code

Check that `backend/server.js` has Sentry initialization (it should already be there):

```javascript
// --- Sentry Error Tracking ---
let Sentry;
let ProfilingIntegration;
try {
  Sentry = require("@sentry/node");
  ProfilingIntegration = require("@sentry/profiling-node");
  
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
    logger.info('Sentry initialized successfully');
  } else {
    logger.warn('SENTRY_DSN not set - Sentry disabled');
  }
} catch (error) {
  logger.warn('Sentry not available:', error.message);
}
```

### 2.3 Add DSN to Railway

1. Go to https://railway.app
2. Navigate to your SmartFarm backend project
3. Click on your backend service → **"Variables"** tab
4. Click **"+ New Variable"**
5. Add:
   - **Variable name:** `SENTRY_DSN`
   - **Value:** Your Sentry DSN (from Step 1.3)
   - Click **"Add"**

### 2.4 Update package.json (if needed)

Verify `backend/package.json` includes Sentry dependencies:

```json
{
  "dependencies": {
    "@sentry/node": "^7.x.x",
    "@sentry/profiling-node": "^7.x.x"
  }
}
```

If missing, add them and commit to trigger Railway redeploy.

### 2.5 Deploy Backend

1. Railway will automatically redeploy when you add the variable
2. Or trigger manual redeploy: Railway Dashboard → **"Deployments"** → **"Redeploy"**
3. Check logs for: `"Sentry initialized successfully"`

---

## 🌐 **Step 3: Frontend Setup (Netlify)**

### 3.1 Install Sentry Package

**In your local `web-project` directory:**

```bash
cd web-project
npm install @sentry/react
```

### 3.2 Configure Frontend Sentry

**Create or update `web-project/src/sentry.js`:**

```javascript
import * as Sentry from "@sentry/react";

export function initSentry() {
  const dsn = import.meta.env.VITE_SENTRY_DSN;
  
  if (dsn) {
    Sentry.init({
      dsn: dsn,
      environment: import.meta.env.MODE || "production",
      integrations: [
        Sentry.browserTracingIntegration(),
        Sentry.replayIntegration({
          maskAllText: true,
          blockAllMedia: true,
        }),
      ],
      // Performance Monitoring
      tracesSampleRate: 1.0, // 100% of transactions
      // Session Replay
      replaysSessionSampleRate: 0.1, // 10% of sessions
      replaysOnErrorSampleRate: 1.0, // 100% of sessions with errors
    });
    
    console.log('✅ Sentry initialized for frontend');
  } else {
    console.warn('⚠️ VITE_SENTRY_DSN not set - Sentry disabled');
  }
}
```

### 3.3 Initialize Sentry in Main Entry Point

**Update `web-project/src/main.jsx` (or `main.tsx`):**

```javascript
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { initSentry } from './sentry'
import App from './App.jsx'

// Initialize Sentry BEFORE other code
initSentry();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

### 3.4 Add DSN to Netlify

1. Go to https://app.netlify.com
2. Navigate to your SmartFarm site
3. Go to **"Site settings"** → **"Environment variables"**
4. Click **"Add a variable"**
5. Add:
   - **Variable name:** `VITE_SENTRY_DSN`
   - **Value:** Your Sentry DSN (same as backend, or create separate project)
   - **Scope:** All scopes (or Production)
   - Click **"Add variable"**

### 3.5 Update package.json

Verify `web-project/package.json` includes Sentry:

```json
{
  "dependencies": {
    "@sentry/react": "^7.x.x"
  }
}
```

### 3.6 Deploy Frontend

1. Commit your changes (if modified locally)
2. Netlify will auto-deploy, or trigger manual deploy:
   - Netlify Dashboard → **"Deploys"** → **"Trigger deploy"** → **"Deploy site"**
3. Check browser console for: `"✅ Sentry initialized for frontend"`

---

## 🧪 **Step 4: Test Error Reporting**

### 4.1 Test Backend Error

**Option A: Create Test Endpoint (Temporary)**

Add to `backend/server.js` (temporary, remove after testing):

```javascript
// Test Sentry endpoint (REMOVE AFTER TESTING)
app.get('/api/test-sentry', (req, res) => {
  throw new Error('Test Sentry error from backend');
});
```

1. Visit: `https://your-backend.railway.app/api/test-sentry`
2. Check Sentry dashboard → **"Issues"** → Should see the error
3. **Remove the test endpoint after verification**

**Option B: Check Existing Errors**

1. Go to Sentry Dashboard → **"Issues"**
2. Look for any existing errors from your backend
3. Click on an error to see stack trace, request details, etc.

### 4.2 Test Frontend Error

**Option A: Add Test Button (Temporary)**

Add to a component (temporary):

```javascript
function TestSentryButton() {
  const handleError = () => {
    throw new Error('Test Sentry error from frontend');
  };
  
  return <button onClick={handleError}>Test Sentry</button>;
}
```

1. Click the button
2. Check Sentry dashboard → **"Issues"** → Should see the error
3. **Remove test code after verification**

**Option B: Check Browser Console**

1. Open your Netlify site
2. Open DevTools → Console
3. Look for: `"✅ Sentry initialized for frontend"`
4. Any uncaught errors should automatically be sent to Sentry

---

## ✅ **Step 5: Verification Checklist**

### Backend Verification
- [ ] `@sentry/node` and `@sentry/profiling-node` installed
- [ ] `SENTRY_DSN` added to Railway variables
- [ ] Backend deployed successfully
- [ ] Railway logs show: `"Sentry initialized successfully"`
- [ ] Test error appears in Sentry dashboard
- [ ] Error includes stack trace and request details

### Frontend Verification
- [ ] `@sentry/react` installed
- [ ] `VITE_SENTRY_DSN` added to Netlify variables
- [ ] Sentry initialized in `main.jsx`
- [ ] Frontend deployed successfully
- [ ] Browser console shows: `"✅ Sentry initialized for frontend"`
- [ ] Test error appears in Sentry dashboard
- [ ] Error includes browser info and stack trace

---

## 🔍 **Step 6: Configure Alerts (Optional)**

### Email Alerts

1. Go to Sentry Dashboard → **"Settings"** → **"Alerts"**
2. Click **"Create Alert Rule"**
3. Configure:
   - **Name:** `SmartFarm Critical Errors`
   - **Conditions:** When an issue is created
   - **Actions:** Send email to your address
4. Save alert rule

### Slack/Discord Integration (Optional)

1. Go to **"Settings"** → **"Integrations"**
2. Choose integration (Slack, Discord, etc.)
3. Follow setup instructions
4. Configure alerts to send to your channel

---

## 🐛 **Troubleshooting**

### Problem: Sentry not capturing errors

**Backend:**
- Check `SENTRY_DSN` is set correctly in Railway
- Verify packages are installed: `npm list @sentry/node`
- Check Railway logs for Sentry initialization messages
- Ensure DSN format is correct: `https://xxxxx@xxxxx.ingest.sentry.io/xxxxx`

**Frontend:**
- Check `VITE_SENTRY_DSN` is set in Netlify
- Verify package is installed: `npm list @sentry/react`
- Check browser console for initialization message
- Ensure variable starts with `VITE_` prefix
- Redeploy frontend after adding variable

### Problem: Too many errors / Noise

**Solution:**
- Adjust `tracesSampleRate` to lower value (e.g., `0.1` for 10%)
- Configure filters in Sentry dashboard
- Ignore specific error types in Sentry settings

### Problem: Sensitive data in errors

**Solution:**
- Sentry automatically filters common secrets
- Configure `beforeSend` hook to filter additional data (already in backend code)
- Review Sentry's data scrubbing settings

---

## 📊 **Using Sentry Dashboard**

### Key Features

1. **Issues:** List of all errors
2. **Performance:** API endpoint performance metrics
3. **Releases:** Track deployments and errors per release
4. **Alerts:** Configure notifications
5. **Settings:** Project configuration

### Useful Views

- **"Issues"** → See all errors with stack traces
- **"Performance"** → See slow API endpoints
- **"Releases"** → Track which deployment introduced errors
- **"Users"** → See errors by user (if user tracking enabled)

---

## 🎯 **Success Criteria**

Sentry setup is complete when:

- ✅ Backend errors appear in Sentry dashboard
- ✅ Frontend errors appear in Sentry dashboard
- ✅ Stack traces are visible and helpful
- ✅ Email alerts configured (optional)
- ✅ No Sentry initialization errors in logs

---

## 📚 **Additional Resources**

- Sentry Docs: https://docs.sentry.io/platforms/javascript/
- Sentry React Docs: https://docs.sentry.io/platforms/javascript/guides/react/
- Sentry Node.js Docs: https://docs.sentry.io/platforms/node/

---

## 🔄 **Next Steps**

After Sentry is set up:

1. ✅ Set up UptimeRobot monitoring (see `UPTIMEROBOT_MONITORING_SETUP.md`)
2. ✅ Complete browser compatibility testing
3. ✅ Complete end-to-end feature testing
4. ✅ Verify API keys configuration

---

**Last Updated:** January 2025
