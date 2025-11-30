# Complete Feature 1 Deployment - Execution Checklist

## 🎯 Current Status

**Backend**: ✅ Deployed to Railway (auto-deploy from `main` branch)
**Code**: ✅ All fixes committed and pushed
**Routes**: ✅ Weather alerts routes should be loading

---

## ✅ Task 1: Verify Backend Deployment (COMPLETED)

**Status**: ✅ Backend is deployed and running

**Verification**:
- Health endpoint: `https://smartfarm-app-production.up.railway.app/api/health` ✅
- Weather alerts route: Check if returns 401 (route exists) or 404 (needs fix)

**Next**: Proceed to database migration

---

## 📋 Task 2: Run Database Migration

### Step 2.1: Access Railway Database

**Option A: Via Railway Dashboard (Recommended)**
1. Go to [Railway Dashboard](https://railway.app)
2. Navigate to your SmartFarm project
3. Find your PostgreSQL database service
4. Click "Connect" → "Postgres" → Copy connection details

**Option B: Via Railway CLI**
```bash
railway login
railway connect postgres
```

### Step 2.2: Run Migration SQL

**Via Railway SQL Editor**:
1. Railway Dashboard → Database → "Data" tab → "Query" or "SQL Editor"
2. Copy entire contents of `backend/database/migrations/003_add_weather_alerts.sql`
3. Paste and execute

**Via Railway Shell**:
```bash
# In Railway dashboard → Backend service → Shell
cd backend
psql $DATABASE_URL -f database/migrations/003_add_weather_alerts.sql
```

**Via psql Client**:
```bash
# Get DATABASE_URL from Railway → Database → Variables
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

-- Expected: 3 rows returned
```

**✅ Task 2 Complete When**:
- [ ] Migration executed without errors
- [ ] All 3 tables exist (weather_alerts, alert_preferences, alert_metrics)
- [ ] Indexes created successfully

---

## 🔑 Task 3: Set WEATHER_API_KEY Environment Variable

### Step 3.1: Get OpenWeatherMap API Key

**If you don't have one**:
1. Go to [OpenWeatherMap API](https://openweathermap.org/api)
2. Sign up for free account (or log in)
3. Go to "API keys" section
4. Copy your API key (or create a new one)

**Free Tier Limits**:
- 60 calls/minute
- 1,000,000 calls/month
- Sufficient for testing and small production use

### Step 3.2: Set in Railway

**Steps**:
1. Railway Dashboard → Your backend service → "Variables" tab
2. Click "+ New Variable"
3. Add:
   - **Name**: `WEATHER_API_KEY`
   - **Value**: `your_openweather_api_key_here`
4. Click "Add"
5. Railway will automatically restart the service

### Step 3.3: Verify

**Check Logs**:
1. Railway Dashboard → Backend service → Logs
2. After restart, verify:
   - ✅ No errors about missing WEATHER_API_KEY
   - ✅ Service started successfully
   - ✅ Weather alerts routes loaded

**✅ Task 3 Complete When**:
- [ ] WEATHER_API_KEY is set in Railway
- [ ] Service restarted successfully
- [ ] No errors in logs

---

## ⏰ Task 4: Configure Cron Job

### Step 4.1: Choose Method

**Recommended: Railway Cron Job** (if available)

### Step 4.2: Create Railway Cron Job

**Steps**:
1. Railway Dashboard → Your project
2. Click "+ New Service"
3. Select "Cron Job" or "Scheduled Task"
4. Configure:
   - **Schedule**: `0 */6 * * *` (every 6 hours at :00 minutes)
   - **Command**: `node scripts/generate-weather-alerts.js`
   - **Working Directory**: `backend`
   - **Environment Variables**: 
     - Inherit from backend service (gets DATABASE_URL, WEATHER_API_KEY)
     - Or manually set: `DATABASE_URL`, `WEATHER_API_KEY`

**Schedule Explanation**:
- `0 */6 * * *` = Every 6 hours (00:00, 06:00, 12:00, 18:00 UTC)
- Runs at the top of every 6th hour

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
- [ ] Cron job configured (Railway Cron)
- [ ] Manual test run successful
- [ ] Alerts created in database
- [ ] No errors in logs

---

## 🧪 Task 5: Run Production End-to-End Tests

### Step 5.1: Backend API Tests

**Get Auth Token**:
```bash
# Login first (replace with your test credentials)
curl -X POST https://smartfarm-app-production.up.railway.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"your_test_email@example.com","password":"your_password"}'

# Extract token from response and use in next commands
```

**Test 1: Get Alerts**
```bash
curl -X GET https://smartfarm-app-production.up.railway.app/api/weather-alerts \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json"
```

**Expected**: JSON with `success: true` and `data` array

**Test 2: Get Statistics**
```bash
curl -X GET https://smartfarm-app-production.up.railway.app/api/weather-alerts/stats \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json"
```

**Expected**: JSON with `total`, `unread`, `critical`, `high`, `upcoming` counts

**Test 3: Manual Alert Generation**
```bash
curl -X POST https://smartfarm-app-production.up.railway.app/api/weather-alerts/generate \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json"
```

**Expected**: JSON showing alerts generated for user's farms

**✅ Backend Tests Complete When**:
- [ ] All 3 API endpoints return success
- [ ] Alerts can be retrieved
- [ ] Statistics are accurate
- [ ] Manual generation creates alerts

### Step 5.2: Web UI Tests

**Test Dashboard Widget**:
1. Open production web URL
2. Log in with test account
3. Navigate to dashboard
4. **Verify**:
   - [ ] Weather Alerts widget appears
   - [ ] Shows latest alerts (if any)
   - [ ] Unread count badge displays
   - [ ] "View All" button visible
   - [ ] No "API call failed" error

**Test Full Alerts Page**:
1. Click "View All" or navigate to `/weather-alerts.html`
2. **Verify**:
   - [ ] Statistics cards show correct counts
   - [ ] Alert list displays
   - [ ] Filters work (farm, severity, type, status)
   - [ ] Mark as Read/Dismiss buttons work
   - [ ] Alert details display correctly

**✅ Web Tests Complete When**:
- [ ] Widget appears and functions
- [ ] Alerts page loads correctly
- [ ] Actions work
- [ ] No console errors

### Step 5.3: Android App Tests

**Build Production APK** (if needed):
```bash
cd android-project
./gradlew assembleRelease
```

**Install and Test**:
1. Install APK on device/emulator
2. Log in with production test account
3. **Verify Dashboard**:
   - [ ] Weather Alerts widget appears
   - [ ] Shows alerts (if any)
   - [ ] Unread badge displays
   - [ ] Widget is clickable

**Test Navigation Flow**:
1. Tap widget → Navigate to alerts list
2. Tap alert → Navigate to detail screen
3. **Verify**:
   - [ ] List screen shows alerts
   - [ ] Detail screen shows full information
   - [ ] Back navigation works
   - [ ] Pull-to-refresh works

**Test Actions**:
1. Mark alert as read
2. Dismiss alert
3. **Verify**:
   - [ ] UI updates immediately
   - [ ] Statistics refresh
   - [ ] Changes persist after app restart

**✅ Android Tests Complete When**:
- [ ] Widget appears
- [ ] Navigation works
- [ ] Actions update state
- [ ] No crashes or errors

---

## 📊 Task 6: Monitoring and Validation

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

## ✅ Final Checklist

Feature 1 is **LIVE IN PRODUCTION** when:

- [x] Backend deployed ✅
- [ ] Database migration complete
- [ ] Environment variables configured (WEATHER_API_KEY)
- [ ] Cron job running
- [ ] Backend API tests pass
- [ ] Web UI tests pass
- [ ] Android app tests pass
- [ ] Monitoring active

---

## 🚨 Troubleshooting

### Issue: Migration Fails
- **Check**: Database permissions, SQL syntax
- **Solution**: Verify user has CREATE TABLE permissions

### Issue: Cron Not Running
- **Check**: Schedule syntax, Railway cron service status
- **Solution**: Verify schedule `0 */6 * * *`, check Railway cron is enabled

### Issue: No Alerts Generated
- **Check**: WEATHER_API_KEY is valid, farms have location data
- **Solution**: Test weather API manually, verify farm coordinates

### Issue: API Returns 404
- **Check**: Routes loaded in logs
- **Solution**: Check Railway logs for "Weather Alerts routes loaded" message

### Issue: API Returns 401
- **Check**: Auth token is valid
- **Solution**: This is expected - route exists, needs authentication

---

## 📝 Notes

**Deployment Date**: _______________

**Deployed By**: _______________

**Production URL**: `https://smartfarm-app-production.up.railway.app`

**Cron Schedule**: Every 6 hours (`0 */6 * * *`)

**WEATHER_API_KEY Provider**: OpenWeatherMap

**Issues Encountered**: _______________

**Resolution**: _______________

---

**Follow this checklist step-by-step. Check off each item as you complete it!** ✅

