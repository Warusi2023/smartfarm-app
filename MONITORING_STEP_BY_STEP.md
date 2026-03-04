# 🚀 Monitoring Setup - Step-by-Step Guide

**Follow these steps in order. Check off each item as you complete it.**

---

## 📋 PART 1: Sentry Error Tracking (Backend)

### ✅ STEP 1.1: Create Sentry Account

**Action:**
1. ✅ Browser opened to: https://sentry.io/signup/
2. [ ] Click "Sign up" or choose sign-up method (Email/GitHub/Google)
3. [ ] Fill in sign-up form:
   - Email address
   - Password
   - Confirm password
4. [ ] Click "Sign Up" or "Create Account"
5. [ ] Check email for verification (if required)
6. [ ] Click verification link in email

**Check when done:**
- [ ] Sentry account created
- [ ] Email verified (if required)

**Time:** ~2 minutes

---

### ✅ STEP 1.2: Create Sentry Project

**Action:**
1. [ ] After login, look for "Create Project" or "Add Project" button
2. [ ] Click "Create Project"
3. [ ] Select platform: **"Node.js"**
4. [ ] Project name: **"SmartFarm"**
5. [ ] Click "Create Project" or "Continue"

**Check when done:**
- [ ] Project "SmartFarm" created
- [ ] Platform: Node.js selected

**Time:** ~1 minute

---

### ✅ STEP 1.3: Get Your Sentry DSN

**Action:**
1. [ ] After creating project, you'll see "Configure SDK" page
2. [ ] Look for **"DSN"** or **"Data Source Name"**
3. [ ] **Copy the DSN** - it looks like:
   ```
   https://abc123def456@o1234567.ingest.sentry.io/1234567
   ```
4. [ ] **Save it** - you'll need it for Railway!

**Check when done:**
- [ ] DSN copied
- [ ] DSN saved (write it here): `________________________________`

**Time:** ~1 minute

---

### ✅ STEP 1.4: Install Backend Sentry Packages

**Action:**
1. [ ] Open PowerShell/Terminal
2. [ ] Navigate to backend:
   ```powershell
   cd backend
   ```
3. [ ] Install packages:
   ```powershell
   npm install @sentry/node @sentry/profiling-node
   ```
4. [ ] Wait for installation (may take 1-2 minutes)
5. [ ] Verify installation:
   ```powershell
   npm list @sentry/node @sentry/profiling-node
   ```

**Check when done:**
- [ ] Navigated to `backend` directory
- [ ] Packages installed successfully
- [ ] No errors during installation

**Time:** ~2 minutes

---

### ✅ STEP 1.5: Add SENTRY_DSN to Railway

**Action:**
1. [ ] Go to: https://railway.app/dashboard
2. [ ] Sign in if needed
3. [ ] Click on your **backend service** (not PostgreSQL)
4. [ ] Click **"Variables"** tab
5. [ ] Click **"New Variable"** or **"+"** button
6. [ ] Enter:
   - **Name:** `SENTRY_DSN`
   - **Value:** (paste your DSN from Step 1.3)
7. [ ] Click **"Add"** or **"Save"**
8. [ ] Wait for Railway to redeploy (check Deployments tab)

**Check when done:**
- [ ] `SENTRY_DSN` added to Railway variables
- [ ] Value matches your Sentry DSN
- [ ] Backend deployment triggered

**Time:** ~2 minutes

---

### ✅ STEP 1.6: Verify Backend Deployment

**Action:**
1. [ ] In Railway, go to backend service → **"Deployments"** tab
2. [ ] Wait for latest deployment to complete (status: "Success")
3. [ ] Click **"Logs"** tab
4. [ ] Look for: `"Sentry initialized successfully"` or `"SENTRY_DSN not set"`
   - ✅ If "Sentry initialized successfully" → Working!
   - ❌ If "SENTRY_DSN not set" → Check variable name/value

**Check when done:**
- [ ] Backend deployed successfully
- [ ] Sentry initialization message in logs

**Time:** ~3 minutes (waiting for deploy)

---

### ✅ STEP 1.7: Test Sentry Error Tracking

**Action:**
1. [ ] Test backend health:
   ```powershell
   Invoke-WebRequest -Uri "https://smartfarm-app-production.up.railway.app/api/health"
   ```
2. [ ] Go to Sentry dashboard → "Issues" tab
3. [ ] Check if any events appear (may take 1-2 minutes)
4. [ ] Trigger test error:
   ```
   Visit: https://smartfarm-app-production.up.railway.app/api/nonexistent
   ```
5. [ ] Check Sentry dashboard again - should see error

**Check when done:**
- [ ] Test error sent to Sentry
- [ ] Errors visible in Sentry dashboard
- [ ] Stack traces visible

**Time:** ~3 minutes

---

## 📋 PART 2: UptimeRobot Monitoring

### ✅ STEP 2.1: Create UptimeRobot Account

**Action:**
1. [ ] Go to: https://uptimerobot.com/signup/
2. [ ] Fill in sign-up form:
   - Email address
   - Password
   - Confirm password
3. [ ] Click "Sign Up"
4. [ ] Check email for verification
5. [ ] Click verification link

**Check when done:**
- [ ] UptimeRobot account created
- [ ] Email verified

**Time:** ~2 minutes

---

### ✅ STEP 2.2: Add Backend Monitor

**Action:**
1. [ ] After login, click **"Add New Monitor"** button
2. [ ] Fill in:
   - **Monitor Type:** `HTTP(s)`
   - **Friendly Name:** `SmartFarm Backend`
   - **URL:** `https://smartfarm-app-production.up.railway.app/api/health`
   - **Monitoring Interval:** `5 minutes`
   - **Alert Contacts:** Select your email
3. [ ] Click **"Create Monitor"**

**Check when done:**
- [ ] Backend monitor added
- [ ] URL is correct
- [ ] Status shows "Up"

**Time:** ~2 minutes

---

### ✅ STEP 2.3: Add Frontend Monitor

**Action:**
1. [ ] Click **"Add New Monitor"** again
2. [ ] Fill in:
   - **Monitor Type:** `HTTP(s)`
   - **Friendly Name:** `SmartFarm Frontend`
   - **URL:** `https://________________.netlify.app` (your Netlify URL)
   - **Monitoring Interval:** `5 minutes`
   - **Alert Contacts:** Select your email
3. [ ] Click **"Create Monitor"**

**Check when done:**
- [ ] Frontend monitor added
- [ ] URL is correct
- [ ] Status shows "Up"

**Time:** ~2 minutes

---

### ✅ STEP 2.4: Configure Alert Contacts

**Action:**
1. [ ] Click **"My Settings"** (top right)
2. [ ] Click **"Alert Contacts"** tab
3. [ ] Click **"Add Alert Contact"**
4. [ ] Select **"Email"**
5. [ ] Enter your email address
6. [ ] Select: Alert when **"Down"**
7. [ ] Click **"Save"**
8. [ ] Go back to monitors, edit each one
9. [ ] Make sure your email is selected

**Check when done:**
- [ ] Email alert contact added
- [ ] Alerts configured for both monitors

**Time:** ~3 minutes

---

### ✅ STEP 2.5: Verify UptimeRobot

**Action:**
1. [ ] Go to UptimeRobot dashboard
2. [ ] Check both monitors:
   - Status: **"Up"** ✅
   - Last check: Recent (< 5 min)
3. [ ] Click on a monitor to see details

**Check when done:**
- [ ] Both monitors showing "Up"
- [ ] Last check time recent

**Time:** ~2 minutes

---

## ✅ COMPLETION SUMMARY

### Sentry Backend
- [ ] Account created
- [ ] Project created
- [ ] DSN copied and saved
- [ ] Packages installed
- [ ] DSN added to Railway
- [ ] Backend deployed
- [ ] Errors visible in dashboard

### UptimeRobot
- [ ] Account created
- [ ] Backend monitor added
- [ ] Frontend monitor added
- [ ] Alerts configured
- [ ] Monitors showing "Up"

---

## 🎯 Success!

**Monitoring is set up when:**
- ✅ Sentry captures errors from backend
- ✅ UptimeRobot monitors both services
- ✅ Email alerts configured
- ✅ Errors visible in Sentry dashboard
- ✅ Uptime status shows "Up"

---

## 📊 Dashboard Links

- **Sentry:** https://sentry.io/organizations/[your-org]/issues/
- **UptimeRobot:** https://uptimerobot.com/dashboard

---

**Total Time:** ~30 minutes

**Start with STEP 1.1: Create Sentry Account!** 🚀
