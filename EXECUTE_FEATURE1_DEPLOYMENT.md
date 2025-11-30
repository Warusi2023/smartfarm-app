# Execute Feature 1 Deployment - Step-by-Step Guide

## 🎯 Overview

This guide helps you execute the production deployment steps from `PRODUCTION_DEPLOYMENT_RUNBOOK_FEATURE1.md`.

**Backend URL**: `https://smartfarm-app-production.up.railway.app`

---

## ✅ Pre-Flight Checks

Before starting, verify:

- [ ] You have access to Railway dashboard
- [ ] You have access to production database
- [ ] You have OpenWeatherMap API key ready
- [ ] Migration file exists: `backend/database/migrations/003_add_weather_alerts.sql`

---

## Task 1: Deploy Backend to Production

### Step 1.1: Verify Railway Deployment

**Action**: Check if Railway auto-deployed from `main` branch

1. Go to [Railway Dashboard](https://railway.app)
2. Navigate to your SmartFarm project
3. Find your backend service (likely named `smartfarm-app` or similar)
4. Check the "Deployments" tab
5. Look for the latest deployment (should show recent commit)

**Expected**: Latest deployment shows recent commit hash from `main` branch

### Step 1.2: Verify Deployment Success

**Check Logs**:
1. In Railway dashboard → Your backend service → "Logs" tab
2. Look for: `✅ Weather Alerts routes loaded`
3. Verify no errors related to weather alerts

**Test Health Endpoint**:
```bash
curl https://smartfarm-app-production.up.railway.app/api/health
```

**Expected Response**:
```json
{"ok":true,"service":"SmartFarm","ts":...}
```

**Verify New Routes**:
```bash
# Test weather alerts endpoint (will return 401 without auth, but confirms route exists)
curl -I https://smartfarm-app-production.up.railway.app/api/weather-alerts
```

**Expected**: HTTP 401 (Unauthorized) - This confirms the route exists!

**✅ Task 1 Complete When**:
- [ ] Latest deployment shows recent commit
- [ ] Logs show "Weather Alerts routes loaded"
- [ ] Health endpoint returns 200 OK
- [ ] Weather alerts endpoint returns 401 (not 404)

---

## Task 2: Run Database Migration

### Step 2.1: Connect to Production Database

**Option A: Via Railway Dashboard (Easiest)**
1. Railway Dashboard → Your project → Database service
2. Click "Connect" → "Postgres"
3. Copy the connection string (DATABASE_URL)

**Option B: Via Railway CLI**
```bash
# Install Railway CLI if needed
npm install -g @railway/cli

# Login
railway login

# Connect to database
railway connect postgres
```

### Step 2.2: Run Migration

**Option A: Via Railway Dashboard SQL Editor**
1. Railway Dashboard → Database → "Data" tab
2. Click "Query" or "SQL Editor"
3. Copy contents of `backend/database/migrations/003_add_weather_alerts.sql`
4. Paste and execute

**Option B: Via Railway Shell**
```bash
# In Railway dashboard → Backend service → Shell
cd backend
psql $DATABASE_URL -f database/migrations/003_add_weather_alerts.sql
```

**Option C: Via psql Client**
```bash
# Connect using DATABASE_URL from Railway
psql $DATABASE_URL -f backend/database/migrations/003_add_weather_alerts.sql
```

### Step 2.3: Verify Migration

**Run Verification Query**:
```sql
-- Check tables exist
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('weather_alerts', 'alert_preferences', 'alert_metrics');

-- Check weather_alerts schema
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'weather_alerts' 
ORDER BY ordinal_position;
```

**Expected Result**:
- ✅ 3 rows returned (weather_alerts, alert_preferences, alert_metrics)
- ✅ weather_alerts has columns: id, farm_id, user_id, alert_type, severity, title, message, etc.

**✅ Task 2 Complete When**:
- [ ] All 3 tables exist
- [ ] weather_alerts table has correct schema
- [ ] Indexes created successfully

---

## Task 3: Configure Environment Variables

### Step 3.1: Get OpenWeatherMap API Key

**If you don't have one**:
1. Go to [OpenWeatherMap](https://openweathermap.org/api)
2. Sign up for free account
3. Get API key from dashboard
4. Copy the key (you'll need it in next step)

### Step 3.2: Set WEATHER_API_KEY in Railway

**Steps**:
1. Railway Dashboard → Your backend service → "Variables" tab
2. Click "+ New Variable"
3. Add:
   - **Name**: `WEATHER_API_KEY`
   - **Value**: `your_openweather_api_key_here`
4. Click "Add"
5. Railway will auto-restart the service

**Verify Other Variables**:
Check these exist (Railway should auto-set them):
- `DATABASE_URL` ✅ (auto-set by Railway)
- `NODE_ENV` ✅ (should be `production`)

### Step 3.3: Verify Variables Loaded

**Check Logs**:
1. Railway Dashboard → Backend service → Logs
2. After restart, verify no errors about missing WEATHER_API_KEY
3. Service should start successfully

**✅ Task 3 Complete When**:
- [ ] WEATHER_API_KEY is set in Railway
- [ ] Service restarted successfully
- [ ] No errors in logs about missing API key

---

## Task 4: Configure Cron Job

### Step 4.1: Choose Method

**Recommended: Railway Cron Job**

### Step 4.2: Create Railway Cron Job

**Steps**:
1. Railway Dashboard → Your project
2. Click "+ New Service"
3. Select "Cron Job" (or "Scheduled Task" if available)
4. Configure:
   - **Schedule**: `0 */6 * * *` (every 6 hours)
   - **Command**: `node scripts/generate-weather-alerts.js`
   - **Working Directory**: `backend`
   - **Environment Variables**: Inherit from backend service (so it gets DATABASE_URL and WEATHER_API_KEY)

**Alternative: If Railway Cron Not Available**

Use node-cron in application:
1. Uncomment the cron code in `backend/server.js` (lines ~372-390)
2. Add to `backend/package.json`: `"node-cron": "^3.0.3"`
3. Commit and push changes
4. Railway will auto-deploy

### Step 4.3: Test Cron Job Manually

**Via Railway Shell**:
1. Railway Dashboard → Backend service → Shell
2. Run:
```bash
cd backend
node scripts/generate-weather-alerts.js
```

**Expected Output**:
```
🌤️ Starting weather alerts generation...
Time: 2024-XX-XXTXX:XX:XX.XXXZ
Processing weather alerts for X farms
Generated Y weather alerts
✅ Weather alerts generation complete. Generated Y alerts.
```

**Verify Alerts Created**:
```sql
-- Check alerts in database
SELECT COUNT(*) as alerts_created 
FROM weather_alerts 
WHERE created_at > NOW() - INTERVAL '10 minutes';
```

**✅ Task 4 Complete When**:
- [ ] Cron job configured (Railway Cron or node-cron)
- [ ] Manual test run successful
- [ ] Alerts created in database

---

## Task 5: End-to-End Tests

### Step 5.1: Backend API Tests

**Get Auth Token**:
```bash
# Login first
TOKEN=$(curl -X POST https://smartfarm-app-production.up.railway.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"your_test_email@example.com","password":"your_password"}' \
  | jq -r '.data.token')

echo "Token: $TOKEN"
```

**Test 1: Get Alerts**
```bash
curl -X GET https://smartfarm-app-production.up.railway.app/api/weather-alerts \
  -H "Authorization: Bearer $TOKEN" \
  | jq '.'
```

**Expected**: JSON with `success: true` and `data` array

**Test 2: Get Statistics**
```bash
curl -X GET https://smartfarm-app-production.up.railway.app/api/weather-alerts/stats \
  -H "Authorization: Bearer $TOKEN" \
  | jq '.'
```

**Expected**: JSON with `total`, `unread`, `critical`, `high`, `upcoming` counts

**Test 3: Manual Alert Generation**
```bash
curl -X POST https://smartfarm-app-production.up.railway.app/api/weather-alerts/generate \
  -H "Authorization: Bearer $TOKEN" \
  | jq '.'
```

**Expected**: JSON showing alerts generated for user's farms

**✅ Backend Tests Complete When**:
- [ ] All 3 API endpoints return success
- [ ] Alerts can be retrieved
- [ ] Statistics are accurate

### Step 5.2: Web UI Tests

**Test Dashboard Widget**:
1. Open production web URL (e.g., `https://dulcet-sawine-92d6a8.netlify.app` or your Railway web URL)
2. Log in with test account
3. Navigate to dashboard
4. **Verify**:
   - [ ] Weather Alerts widget appears at top
   - [ ] Shows latest alerts (if any)
   - [ ] Unread count badge displays
   - [ ] "View All" button visible

**Test Full Alerts Page**:
1. Click "View All" or navigate to `/weather-alerts.html`
2. **Verify**:
   - [ ] Statistics cards show correct counts
   - [ ] Alert list displays
   - [ ] Filters work
   - [ ] Mark as Read/Dismiss buttons work

**✅ Web Tests Complete When**:
- [ ] Widget appears and functions
- [ ] Alerts page loads correctly
- [ ] Actions work

### Step 5.3: Android App Tests

**Build Production APK** (if needed):
```bash
cd android-project
./gradlew assembleRelease
```

**Install and Test**:
1. Install APK on device/emulator
2. Log in with production test account
3. **Verify**:
   - [ ] Weather Alerts widget appears on dashboard
   - [ ] Shows alerts (if any)
   - [ ] Navigation to alerts screen works
   - [ ] Alert detail screen works
   - [ ] Actions (mark read/dismiss) work

**✅ Android Tests Complete When**:
- [ ] Widget appears
- [ ] Navigation works
- [ ] Actions update state

---

## Task 6: Monitoring

### Step 6.1: Monitor First Cron Run

**Wait for Scheduled Run** (or trigger manually):
- Schedule: Every 6 hours (00:00, 06:00, 12:00, 18:00 UTC)
- Or trigger manually via Railway shell

**Check Logs**:
1. Railway Dashboard → Cron service → Logs
2. Look for successful execution messages
3. Verify no errors

**Check Database**:
```sql
-- Alerts created in last 24 hours
SELECT 
    alert_type,
    severity,
    COUNT(*) as count
FROM weather_alerts
WHERE created_at > NOW() - INTERVAL '24 hours'
GROUP BY alert_type, severity;
```

### Step 6.2: Monitor for 24-72 Hours

**Daily Checks**:
- [ ] Cron job runs successfully
- [ ] Alerts generated appropriately
- [ ] No error spikes in logs
- [ ] API response times acceptable
- [ ] User feedback positive

**✅ Task 6 Complete When**:
- [ ] Monitoring set up
- [ ] First cron run successful
- [ ] No critical issues detected

---

## 🎉 Final Verification

Feature 1 is **LIVE IN PRODUCTION** when:

- [x] Backend deployed ✅
- [ ] Database migration complete
- [ ] Environment variables configured
- [ ] Cron job running
- [ ] Backend API tests pass
- [ ] Web UI tests pass
- [ ] Android app tests pass
- [ ] Monitoring active

---

## 📝 Update Production Status

After all tasks complete, update `FEATURE1_PRODUCTION_READY.md` with:

- Actual cron schedule chosen
- WEATHER_API_KEY provider (OpenWeatherMap)
- Any known issues or limitations
- Production URLs
- Deployment date

---

## 🚨 Troubleshooting

**Issue**: Migration fails
- **Solution**: Check database permissions, verify SQL syntax

**Issue**: Cron not running
- **Solution**: Verify schedule syntax, check Railway cron service status

**Issue**: No alerts generated
- **Solution**: Check WEATHER_API_KEY, verify farms have location data

**Issue**: API returns errors
- **Solution**: Check Railway logs, verify environment variables

---

**Follow this guide step-by-step. Check off each item as you complete it!** ✅

