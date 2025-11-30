# Production Deployment Runbook - Feature 1: Weather-Based Smart Alerts

## 🎯 Overview

This runbook guides you through deploying Feature 1 (Weather-Based Smart Alerts) to production.

**Status**: Code is committed and pushed to `main` branch ✅

---

## 📋 Pre-Deployment Checklist

- [x] Code committed to `main` branch
- [x] All tests pass locally
- [x] Android build successful
- [ ] Production database backup created
- [ ] Production environment variables documented
- [ ] Deployment platform access confirmed

---

## Task 1: Deploy Backend to Production

### Step 1.1: Verify Deployment Platform

Based on project configuration, the backend is deployed on **Railway**.

**Action Required**:
1. Go to [Railway Dashboard](https://railway.app)
2. Navigate to your SmartFarm project
3. Verify the backend service is connected to GitHub repository
4. Confirm it's set to deploy from `main` branch

### Step 1.2: Trigger Deployment

**Option A: Automatic (if auto-deploy enabled)**
- Railway will automatically deploy when `main` branch is updated
- Check deployment logs in Railway dashboard

**Option B: Manual Trigger**
```bash
# If Railway CLI is installed
railway up

# Or trigger via Railway dashboard:
# 1. Go to your service
# 2. Click "Redeploy"
```

### Step 1.3: Verify Deployment

**Check Deployment Logs**:
1. Go to Railway dashboard → Your service → Deployments
2. Verify latest deployment shows:
   - ✅ Build successful
   - ✅ Service started
   - ✅ Health check passing

**Verify Backend Version**:
```bash
# Check health endpoint
curl https://your-backend-url.railway.app/api/health

# Expected response should include version or timestamp
```

**Check Logs for New Routes**:
```bash
# In Railway dashboard → Logs, look for:
✅ Weather Alerts routes loaded
```

---

## Task 2: Run Database Migration

### Step 2.1: Connect to Production Database

**Via Railway Dashboard**:
1. Go to Railway project → Database service
2. Click "Connect" → "Postgres"
3. Copy connection string (DATABASE_URL)

**Via Railway CLI**:
```bash
railway connect postgres
```

### Step 2.2: Run Migration

**Option A: Via Railway CLI**
```bash
# Connect to database
railway run psql $DATABASE_URL

# Run migration
\i backend/database/migrations/003_add_weather_alerts.sql

# Or if using Railway shell:
railway run bash
cd backend
psql $DATABASE_URL -f database/migrations/003_add_weather_alerts.sql
```

**Option B: Via Railway Dashboard**
1. Go to your backend service
2. Click "Shell" or "Run Command"
3. Run:
```bash
cd backend
psql $DATABASE_URL -f database/migrations/003_add_weather_alerts.sql
```

**Option C: Via Database Client**
1. Use pgAdmin, DBeaver, or similar tool
2. Connect using DATABASE_URL
3. Execute SQL from `backend/database/migrations/003_add_weather_alerts.sql`

### Step 2.3: Verify Migration

**Check Tables Created**:
```sql
-- Connect to database
\dt weather_alerts
\dt alert_preferences
\dt alert_metrics

-- Check schema
\d weather_alerts
\d alert_preferences
\d alert_metrics
```

**Expected Result**:
- ✅ `weather_alerts` table exists with columns: id, farm_id, alert_type, severity, title, message, etc.
- ✅ `alert_preferences` table exists
- ✅ `alert_metrics` table exists
- ✅ Indexes created on key columns

---

## Task 3: Configure Environment Variables

### Step 3.1: Verify Required Variables

**In Railway Dashboard**:
1. Go to your backend service → Variables
2. Verify these variables exist:

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | ✅ Yes | PostgreSQL connection string |
| `WEATHER_API_KEY` | ✅ Yes | OpenWeatherMap API key |
| `NODE_ENV` | ✅ Yes | Should be `production` |
| `PORT` | Optional | Default: 3000 |
| `JWT_SECRET` | ✅ Yes | JWT signing secret |

### Step 3.2: Set Missing Variables

**Add WEATHER_API_KEY** (if missing):
1. Get API key from [OpenWeatherMap](https://openweathermap.org/api)
2. In Railway → Variables → Add Variable:
   - Name: `WEATHER_API_KEY`
   - Value: `your_api_key_here`
   - Click "Add"

**Verify DATABASE_URL**:
- Should be automatically set by Railway if using Railway PostgreSQL
- Format: `postgresql://user:password@host:port/database`

### Step 3.3: Restart Service

After adding/updating variables:
1. Railway automatically restarts the service
2. Or manually: Service → Settings → Restart

**Verify Variables Loaded**:
Check logs for:
```
✅ Environment variables loaded
✅ Database connected
✅ Weather API key configured
```

---

## Task 4: Configure Cron Job

### Step 4.1: Choose Configuration Method

**Recommended: Railway Cron Job** (if available)

**In Railway Dashboard**:
1. Go to your project
2. Click "+ New Service"
3. Select "Cron Job" or "Scheduled Task"
4. Configure:
   - **Schedule**: `0 */6 * * *` (every 6 hours)
   - **Command**: `node scripts/generate-weather-alerts.js`
   - **Working Directory**: `backend`
   - **Environment**: Same as backend service (inherits DATABASE_URL, WEATHER_API_KEY)

**Alternative: Node-Cron in Application**

If Railway cron is not available, use node-cron in `backend/server.js`:

```javascript
// Add to backend/server.js (if not already present)
const cron = require('node-cron');

// Schedule weather alert generation (every 6 hours)
if (process.env.NODE_ENV === 'production' && process.env.WEATHER_API_KEY) {
    cron.schedule('0 */6 * * *', async () => {
        console.log(`[${new Date().toISOString()}] Running scheduled weather alerts generation...`);
        try {
            const { main } = require('./scripts/generate-weather-alerts');
            await main();
            console.log(`[${new Date().toISOString()}] Scheduled weather alerts generation completed successfully.`);
        } catch (error) {
            console.error(`[${new Date().toISOString()}] Error in scheduled alert generation:`, error);
        }
    }, {
        scheduled: true,
        timezone: "UTC"
    });
    console.log('✅ Weather alert generation cron job scheduled (every 6 hours).');
}
```

**Install node-cron** (if needed):
```bash
cd backend
npm install node-cron
```

### Step 4.2: Test Cron Job Manually

**Via Railway Shell**:
```bash
# Connect to backend service shell
railway run bash

# Run script manually
cd backend
node scripts/generate-weather-alerts.js
```

**Expected Output**:
```
🌤️ Starting weather alerts generation...
Time: 2024-01-XXTXX:XX:XX.XXXZ
Processing weather alerts for X farms
Generated Y weather alerts
✅ Weather alerts generation complete. Generated Y alerts.
```

**Verify Alerts Created**:
```sql
-- Check alerts in database
SELECT COUNT(*) FROM weather_alerts WHERE created_at > NOW() - INTERVAL '1 hour';
```

### Step 4.3: Verify Cron Schedule

**Check Logs**:
- Look for cron job initialization message
- Wait for first scheduled run (or trigger manually)
- Verify logs show successful execution

---

## Task 5: Production End-to-End Tests

### Step 5.1: Backend API Tests

**Test 1: Health Check**
```bash
curl https://your-backend-url.railway.app/api/health
```

**Test 2: Get Alerts (Requires Auth)**
```bash
# Login first
TOKEN=$(curl -X POST https://your-backend-url.railway.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password"}' \
  | jq -r '.data.token')

# Get alerts
curl -X GET https://your-backend-url.railway.app/api/weather-alerts \
  -H "Authorization: Bearer $TOKEN" \
  | jq '.'
```

**Expected**: JSON response with `success: true` and `data` array

**Test 3: Get Statistics**
```bash
curl -X GET https://your-backend-url.railway.app/api/weather-alerts/stats \
  -H "Authorization: Bearer $TOKEN" \
  | jq '.'
```

**Expected**: JSON with `total`, `unread`, `critical`, `high`, `upcoming` counts

**Test 4: Manual Alert Generation**
```bash
curl -X POST https://your-backend-url.railway.app/api/weather-alerts/generate \
  -H "Authorization: Bearer $TOKEN" \
  | jq '.'
```

**Expected**: JSON showing alerts generated for user's farms

### Step 5.2: Web UI Tests

**Test 1: Dashboard Widget**
1. Open production web URL (e.g., `https://your-app.netlify.app` or Railway web URL)
2. Log in with test account
3. Navigate to dashboard
4. **Verify**:
   - ✅ Weather Alerts widget appears at top
   - ✅ Shows latest alerts (if any)
   - ✅ Unread count badge displays
   - ✅ "View All" button visible

**Test 2: Full Alerts Page**
1. Click "View All" in widget or navigate to `/weather-alerts.html`
2. **Verify**:
   - ✅ Statistics cards show correct counts
   - ✅ Alert list displays
   - ✅ Filters work (farm, severity, type, status)
   - ✅ Mark as Read/Dismiss buttons work
   - ✅ Alert details display correctly

**Test 3: Responsive Design**
- Test on desktop (1920x1080)
- Test on tablet (768x1024)
- Test on mobile (375x667)
- **Verify**: Layout adapts, buttons tappable, no horizontal scroll

### Step 5.3: Android App Tests

**Test 1: Build Production APK**
```bash
cd android-project
./gradlew assembleRelease
```

**Test 2: Install and Test**
1. Install APK on device/emulator
2. Log in with production test account
3. **Verify Dashboard**:
   - ✅ Weather Alerts widget appears
   - ✅ Shows alerts (if any)
   - ✅ Unread badge displays
   - ✅ Widget is clickable

**Test 3: Navigation Flow**
1. Tap widget → Navigate to alerts list
2. Tap alert → Navigate to detail screen
3. **Verify**:
   - ✅ List screen shows alerts
   - ✅ Detail screen shows full information
   - ✅ Back navigation works
   - ✅ Pull-to-refresh works

**Test 4: Actions**
1. Mark alert as read
2. Dismiss alert
3. **Verify**:
   - ✅ UI updates immediately
   - ✅ Statistics refresh
   - ✅ Changes persist after app restart

---

## Task 6: Monitoring and Validation

### Step 6.1: Set Up Logging

**Railway Logs**:
- Logs are automatically available in Railway dashboard
- Monitor for:
  - Cron job execution times
  - API errors
  - Alert generation counts
  - Database errors

**Key Log Messages to Monitor**:
```
✅ Weather alerts generation complete. Generated X alerts.
❌ Error generating weather alerts: [error message]
✅ Weather Alerts routes loaded
```

### Step 6.2: Database Monitoring

**Check Alert Generation**:
```sql
-- Alerts created in last 24 hours
SELECT 
    alert_type,
    severity,
    COUNT(*) as count
FROM weather_alerts
WHERE created_at > NOW() - INTERVAL '24 hours'
GROUP BY alert_type, severity;

-- Alert engagement
SELECT 
    COUNT(*) FILTER (WHERE is_read = true) as read_count,
    COUNT(*) FILTER (WHERE is_dismissed = true) as dismissed_count,
    COUNT(*) as total_count
FROM weather_alerts
WHERE created_at > NOW() - INTERVAL '24 hours';
```

### Step 6.3: User Validation

**First 24-72 Hours**:
1. **Monitor Alert Volume**:
   - Check if too many alerts generated (noise)
   - Check if too few alerts (rules too strict)

2. **Spot-Check User Accounts**:
   - Log in as test users
   - Verify alerts are relevant to their farms
   - Check alert messages are clear and actionable

3. **Check API Performance**:
   - Monitor response times for `/api/weather-alerts`
   - Check for any timeout errors
   - Verify database queries are optimized

### Step 6.4: Adjustments (If Needed)

**If Too Many Alerts**:
- Increase alert thresholds in `weatherAlertService.js`
- Add more filtering in alert generation
- Adjust cron frequency (every 12 hours instead of 6)

**If Too Few Alerts**:
- Decrease alert thresholds
- Check weather API is working correctly
- Verify farms have location data

**If Performance Issues**:
- Add database indexes (already included in migration)
- Optimize weather API calls (caching)
- Consider batching farm processing

---

## ✅ Completion Checklist

- [ ] Backend deployed to production
- [ ] Database migration executed successfully
- [ ] Environment variables configured
- [ ] Cron job configured and tested
- [ ] Backend API tests pass
- [ ] Web UI tests pass
- [ ] Android app tests pass
- [ ] Monitoring set up
- [ ] First cron run successful
- [ ] Alerts visible in production UI

---

## 🚨 Troubleshooting

### Issue: Migration Fails

**Symptoms**: Error when running migration SQL

**Solutions**:
- Check database connection string
- Verify user has CREATE TABLE permissions
- Check if tables already exist (may need to drop first)
- Review error message for specific issue

### Issue: Cron Job Not Running

**Symptoms**: No alerts generated, no logs

**Solutions**:
- Verify cron schedule syntax
- Check Railway cron service is enabled
- Verify environment variables are set
- Check logs for errors
- Test script manually first

### Issue: No Alerts Generated

**Symptoms**: Cron runs but creates 0 alerts

**Solutions**:
- Check farms have latitude/longitude set
- Verify WEATHER_API_KEY is valid
- Check weather API quota/rate limits
- Review logs for API errors
- Test weather API manually

### Issue: API Returns 401/403

**Symptoms**: Unauthorized errors

**Solutions**:
- Verify JWT token is valid
- Check token expiration
- Verify user has access to farms
- Check authentication middleware

---

## 📝 Post-Deployment Notes

**Deployment Date**: _______________

**Deployed By**: _______________

**Production URL**: _______________

**Database**: _______________

**Cron Schedule**: Every 6 hours (`0 */6 * * *`)

**Issues Encountered**: _______________

**Resolution**: _______________

**Next Steps**: _______________

---

## 🎉 Success Criteria

Feature 1 is **fully live in production** when:

1. ✅ Backend deployed and healthy
2. ✅ Database migration complete
3. ✅ Cron job running successfully
4. ✅ Alerts visible in web UI
5. ✅ Alerts visible in Android app
6. ✅ No critical errors in logs
7. ✅ Users can interact with alerts

**Once all criteria met, Feature 1 is production-ready!** 🚀

