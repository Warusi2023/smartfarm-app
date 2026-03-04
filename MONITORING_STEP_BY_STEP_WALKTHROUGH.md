# 🚀 Monitoring Setup - Step-by-Step Walkthrough

**Follow these steps in order to complete monitoring setup**

---

## 📋 PART 1: Sentry Error Tracking (Backend)

### ✅ Step 1.1: Create Sentry Account

**Action:**
1. Open browser and go to: **https://sentry.io/signup/**
2. Click **"Sign up"** or **"Get Started"**
3. Choose sign-up method:
   - Email (recommended)
   - GitHub
   - Google
4. Complete sign-up form
5. Verify your email if required

**Check when done:**
- [ ] Sentry account created
- [ ] Email verified (if required)

**Time:** ~2 minutes

---

### ✅ Step 1.2: Create Sentry Project

**Action:**
1. After login, you'll see **"Create Project"** or **"Add Project"**
2. Click **"Create Project"**
3. Select platform: **"Node.js"**
4. Project name: **"SmartFarm"**
5. Click **"Create Project"**

**Check when done:**
- [ ] Project "SmartFarm" created
- [ ] Platform: Node.js selected

**Time:** ~1 minute

---

### ✅ Step 1.3: Get Your Sentry DSN

**Action:**
1. After creating project, you'll see **"Configure SDK"** page
2. Look for **"DSN"** or **"Data Source Name"**
3. **Copy the DSN** - it looks like:
   ```
   https://abc123def456@o1234567.ingest.sentry.io/1234567
   ```
4. **Save it somewhere safe** (notepad, notes app, etc.)

**Check when done:**
- [ ] DSN copied
- [ ] DSN saved securely

**Sentry DSN:** `________________________________`

**Time:** ~1 minute

---

### ✅ Step 1.4: Install Backend Sentry Packages

**Action:**
1. Open PowerShell/Terminal
2. Navigate to backend directory:
   ```powershell
   cd backend
   ```
3. Install Sentry packages:
   ```powershell
   npm install @sentry/node @sentry/profiling-node
   ```
4. Wait for installation to complete
5. Verify installation:
   ```powershell
   npm list @sentry/node @sentry/profiling-node
   ```

**Check when done:**
- [ ] Navigated to `backend` directory
- [ ] Packages installed successfully
- [ ] No errors during installation

**Time:** ~2 minutes

---

### ✅ Step 1.5: Add SENTRY_DSN to Railway

**Action:**
1. Open browser and go to: **https://railway.app/dashboard**
2. Sign in if needed
3. Click on your **backend service** (not PostgreSQL)
4. Click **"Variables"** tab
5. Click **"New Variable"** or **"+"** button
6. Enter:
   - **Name:** `SENTRY_DSN`
   - **Value:** (paste your DSN from Step 1.3)
7. Click **"Add"** or **"Save"**
8. Railway will automatically redeploy your backend

**Check when done:**
- [ ] `SENTRY_DSN` added to Railway variables
- [ ] Value matches your Sentry DSN
- [ ] Backend deployment triggered

**Time:** ~2 minutes

---

### ✅ Step 1.6: Verify Backend Deployment

**Action:**
1. In Railway dashboard, go to your backend service
2. Click **"Deployments"** tab
3. Wait for latest deployment to complete (status: "Success")
4. Check **"Logs"** tab
5. Look for: `"Sentry initialized successfully"` or `"SENTRY_DSN not set"`
   - If you see "Sentry initialized successfully" → ✅ Working!
   - If you see "SENTRY_DSN not set" → Check variable name/value

**Check when done:**
- [ ] Backend deployed successfully
- [ ] Sentry initialization message in logs

**Time:** ~3 minutes (waiting for deploy)

---

### ✅ Step 1.7: Test Sentry Error Tracking

**Action:**
1. Test backend health endpoint:
   ```powershell
   Invoke-WebRequest -Uri "https://smartfarm-app-production.up.railway.app/api/health"
   ```
2. Go to Sentry dashboard: **https://sentry.io/organizations/[your-org]/issues/**
3. Check if any events appear (may take 1-2 minutes)
4. To trigger a test error, visit:
   ```
   https://smartfarm-app-production.up.railway.app/api/nonexistent
   ```
5. Check Sentry dashboard again - should see error

**Check when done:**
- [ ] Test error sent to Sentry
- [ ] Errors visible in Sentry dashboard
- [ ] Stack traces visible

**Time:** ~3 minutes

---

## 📋 PART 2: UptimeRobot Monitoring

### ✅ Step 2.1: Create UptimeRobot Account

**Action:**
1. Open browser and go to: **https://uptimerobot.com/signup/**
2. Fill in sign-up form:
   - Email address
   - Password
   - Confirm password
3. Click **"Sign Up"**
4. Check your email for verification link
5. Click verification link in email

**Check when done:**
- [ ] UptimeRobot account created
- [ ] Email verified

**Time:** ~2 minutes

---

### ✅ Step 2.2: Add Backend Monitor

**Action:**
1. After login, you'll see dashboard
2. Click **"Add New Monitor"** button (top right)
3. Fill in monitor details:
   - **Monitor Type:** Select **"HTTP(s)"**
   - **Friendly Name:** `SmartFarm Backend`
   - **URL:** `https://smartfarm-app-production.up.railway.app/api/health`
   - **Monitoring Interval:** `5 minutes`
   - **Alert Contacts:** Select your email (or add it first)
4. Click **"Create Monitor"**

**Check when done:**
- [ ] Backend monitor added
- [ ] URL is correct
- [ ] Status shows "Up" (may take a minute)

**Time:** ~2 minutes

---

### ✅ Step 2.3: Add Frontend Monitor

**Action:**
1. Click **"Add New Monitor"** again
2. Fill in monitor details:
   - **Monitor Type:** Select **"HTTP(s)"**
   - **Friendly Name:** `SmartFarm Frontend`
   - **URL:** `https://________________.netlify.app` (your actual Netlify URL)
   - **Monitoring Interval:** `5 minutes`
   - **Alert Contacts:** Select your email
3. Click **"Create Monitor"**

**Check when done:**
- [ ] Frontend monitor added
- [ ] URL is correct (your Netlify URL)
- [ ] Status shows "Up"

**Time:** ~2 minutes

---

### ✅ Step 2.4: Configure Alert Contacts

**Action:**
1. Click **"My Settings"** (top right)
2. Click **"Alert Contacts"** tab
3. Click **"Add Alert Contact"**
4. Select **"Email"**
5. Enter your email address
6. Select alert preferences:
   - Alert when: **"Down"** (or "Down & Up")
7. Click **"Save"**
8. Go back to monitors and edit each one
9. Make sure your email is selected in "Alert Contacts"

**Check when done:**
- [ ] Email alert contact added
- [ ] Alerts configured for both monitors
- [ ] Email address verified

**Time:** ~3 minutes

---

### ✅ Step 2.5: Test UptimeRobot Monitoring

**Action:**
1. Go to UptimeRobot dashboard
2. Check monitor status:
   - Both should show **"Up"** (green)
   - Last check time should be recent (< 5 minutes ago)
3. To test alerts (optional):
   - Temporarily change backend URL to wrong one
   - Wait 5 minutes
   - Should receive email alert
   - Change back to correct URL

**Check when done:**
- [ ] Both monitors showing "Up"
- [ ] Last check time recent
- [ ] Email alerts working (if tested)

**Time:** ~2 minutes

---

## 📋 PART 3: Frontend Sentry (Optional)

### ✅ Step 3.1: Install Frontend Sentry Package

**Action:**
1. Open PowerShell/Terminal
2. Navigate to frontend directory:
   ```powershell
   cd web-project
   ```
3. Install Sentry package:
   ```powershell
   npm install @sentry/react
   ```
4. Wait for installation to complete

**Check when done:**
- [ ] Navigated to `web-project` directory
- [ ] Package installed successfully

**Time:** ~2 minutes

---

### ✅ Step 3.2: Add Sentry to Frontend Code

**Action:**
1. Open `web-project/index.html` in your editor
2. Find the `</head>` tag
3. Add this code BEFORE `</head>`:
   ```html
   <!-- Sentry Error Tracking -->
   <script type="module">
     if (import.meta.env.VITE_SENTRY_DSN) {
       import('@sentry/react').then(Sentry => {
         Sentry.init({
           dsn: import.meta.env.VITE_SENTRY_DSN,
           environment: import.meta.env.MODE || 'production',
           integrations: [
             Sentry.browserTracingIntegration(),
             Sentry.replayIntegration(),
           ],
           tracesSampleRate: 1.0,
           replaysSessionSampleRate: 0.1,
           replaysOnErrorSampleRate: 1.0,
         });
       }).catch(err => console.warn('Sentry not available:', err));
     }
   </script>
   ```
4. Save the file

**Check when done:**
- [ ] Sentry code added to `index.html`
- [ ] Code placed before `</head>` tag

**Time:** ~3 minutes

---

### ✅ Step 3.3: Add VITE_SENTRY_DSN to Netlify

**Action:**
1. Go to: **https://app.netlify.com**
2. Click on your SmartFarm site
3. Go to: **Site settings** → **Environment variables**
4. Click **"Add a variable"**
5. Enter:
   - **Key:** `VITE_SENTRY_DSN`
   - **Value:** (same DSN from Step 1.3)
6. Click **"Save"**
7. Go to **"Deploys"** tab
8. Click **"Trigger deploy"** → **"Clear cache and deploy site"**

**Check when done:**
- [ ] `VITE_SENTRY_DSN` added to Netlify
- [ ] Frontend redeployed

**Time:** ~3 minutes

---

## 📋 PART 4: Final Verification

### ✅ Step 4.1: Verify Sentry Backend

**Action:**
1. Go to Sentry dashboard
2. Select "SmartFarm" project
3. Click **"Issues"** tab
4. Should see errors (if any occurred)
5. Click on an error to see stack trace

**Check when done:**
- [ ] Backend errors captured
- [ ] Stack traces visible

**Time:** ~2 minutes

---

### ✅ Step 4.2: Verify Sentry Frontend (if configured)

**Action:**
1. Visit your Netlify frontend URL
2. Open browser DevTools (F12)
3. Go to Console tab
4. Should see no Sentry errors
5. Trigger a test error (if possible)
6. Check Sentry dashboard for frontend errors

**Check when done:**
- [ ] Frontend errors captured (if any)
- [ ] No console errors

**Time:** ~3 minutes

---

### ✅ Step 4.3: Verify UptimeRobot

**Action:**
1. Go to UptimeRobot dashboard
2. Check both monitors:
   - Status: **"Up"** ✅
   - Last check: Recent (< 5 min)
   - Uptime: Should show percentage
3. Click on a monitor to see details

**Check when done:**
- [ ] Both monitors showing "Up"
- [ ] Last check time recent
- [ ] Email alerts working

**Time:** ~2 minutes

---

## ✅ COMPLETION CHECKLIST

### Sentry Backend
- [ ] Account created
- [ ] Project created
- [ ] DSN copied
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

### Frontend Sentry (Optional)
- [ ] Package installed
- [ ] Code added
- [ ] DSN added to Netlify
- [ ] Frontend redeployed

---

## 🎯 Success!

**Monitoring is set up when:**

- ✅ Sentry captures errors from backend (and frontend if configured)
- ✅ UptimeRobot monitors both services
- ✅ Email alerts configured
- ✅ Errors visible in Sentry dashboard
- ✅ Uptime status shows "Up" for both services

---

## 📊 Dashboard Links

**Bookmark these:**

- **Sentry:** https://sentry.io/organizations/[your-org]/issues/
- **UptimeRobot:** https://uptimerobot.com/dashboard

---

## 🆘 Need Help?

**Common Issues:**

1. **Sentry not capturing errors:**
   - Check `SENTRY_DSN` is correct in Railway
   - Verify packages are installed
   - Check Railway logs for Sentry initialization

2. **UptimeRobot not sending alerts:**
   - Verify email address
   - Check alert contacts are configured
   - Check spam folder

3. **Frontend Sentry not working:**
   - Verify `VITE_SENTRY_DSN` is set in Netlify
   - Check variable name (must start with `VITE_`)
   - Redeploy frontend after adding variable

---

**Total Estimated Time:** 30-40 minutes

**Start with Step 1.1: Create Sentry Account!** 🚀
