# Testing Guide: Weather-Based Smart Alerts

## Pre-Commit Testing Checklist

Use this guide to verify Feature 1 (Weather-Based Smart Alerts) is working correctly before committing.

---

## 🔧 Backend Testing

### 1. Database Migration
```bash
# Connect to database
psql $DATABASE_URL

# Run migration
\i backend/database/migrations/003_add_weather_alerts.sql

# Verify tables created
\dt weather_alerts
\dt alert_preferences
\dt alert_metrics
```

**Expected**: All three tables should exist with correct schema.

### 2. Manual Alert Generation
```bash
# Set environment variables
export DATABASE_URL="your_database_url"
export WEATHER_API_KEY="your_openweather_api_key"

# Run script manually
cd backend
node scripts/generate-weather-alerts.js
```

**Expected Output**:
```
🌤️ Starting weather alerts generation...
Time: 2024-01-01T12:00:00.000Z
Processing weather alerts for X farms
Generated Y weather alerts
✅ Weather alerts generation complete. Generated Y alerts.
```

**Verify in Database**:
```sql
-- Check alerts were created
SELECT COUNT(*) FROM weather_alerts;

-- Check alert details
SELECT id, alert_type, severity, title, is_read, created_at 
FROM weather_alerts 
ORDER BY created_at DESC 
LIMIT 10;
```

### 3. API Endpoints Testing

#### Test 1: Get Alerts (Requires Authentication)
```bash
# Get auth token first (login)
TOKEN=$(curl -X POST https://smartfarm-app-production.up.railway.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password"}' \
  | jq -r '.data.token')

# Get alerts
curl -X GET https://smartfarm-app-production.up.railway.app/api/weather-alerts \
  -H "Authorization: Bearer $TOKEN" \
  | jq '.'
```

**Expected**: JSON response with `success: true` and `data` array of alerts.

#### Test 2: Get Alert Statistics
```bash
curl -X GET https://smartfarm-app-production.up.railway.app/api/weather-alerts/stats \
  -H "Authorization: Bearer $TOKEN" \
  | jq '.'
```

**Expected**: JSON with `total`, `unread`, `critical`, `high`, `upcoming` counts.

#### Test 3: Mark Alert as Read
```bash
ALERT_ID="your-alert-id"

curl -X PATCH https://smartfarm-app-production.up.railway.app/api/weather-alerts/$ALERT_ID/read \
  -H "Authorization: Bearer $TOKEN" \
  | jq '.'
```

**Expected**: Alert returned with `is_read: true`.

#### Test 4: Dismiss Alert
```bash
curl -X PATCH https://smartfarm-app-production.up.railway.app/api/weather-alerts/$ALERT_ID/dismiss \
  -H "Authorization: Bearer $TOKEN" \
  | jq '.'
```

**Expected**: Alert returned with `is_dismissed: true`.

#### Test 5: Get Preferences
```bash
curl -X GET https://smartfarm-app-production.up.railway.app/api/weather-alerts/preferences \
  -H "Authorization: Bearer $TOKEN" \
  | jq '.'
```

**Expected**: User's alert preferences returned.

### 4. Alert Rule Evaluation

**Test Heavy Rain Alert**:
- Set up a farm with coordinates
- Mock weather API response with heavy rain (>20mm/hour)
- Run alert generation
- Verify alert created with type `heavy_rain`

**Test Frost Alert**:
- Mock weather API response with low temperature (<2°C)
- Verify alert created with type `frost` and severity `critical`

**Test Heat Stress Alert**:
- Mock weather API response with high temperature (>35°C)
- Verify alert created with type `heat_stress`

---

## 🌐 Web Testing

### 1. Dashboard Widget

**Steps**:
1. Open `http://localhost:5173/dashboard.html` (or production URL)
2. Log in with a test account that has farms with location data
3. Verify weather alerts widget appears on dashboard

**Expected**:
- ✅ Widget displays "Weather Alerts" header
- ✅ Shows unread count badge if alerts exist
- ✅ Displays latest 1-3 alerts
- ✅ "View All" button is clickable
- ✅ Empty state shows if no alerts

**Test Scenarios**:
- **No Alerts**: Widget shows "No weather alerts" message
- **With Alerts**: Widget shows alert titles and messages
- **Critical Alerts**: Widget has red/orange background
- **Click Widget**: Navigates to full alerts page

### 2. Full Alerts Page

**Steps**:
1. Navigate to `/weather-alerts.html` or click "View All" in widget
2. Verify page loads correctly

**Expected**:
- ✅ Statistics cards show correct counts
- ✅ Filters (farm, severity, type, status) work
- ✅ Alert list displays all alerts
- ✅ Alert cards show correct information
- ✅ Mark as read/dismiss buttons work
- ✅ Clicking alert navigates to detail (if implemented)

**Test Scenarios**:
- **Filter by Severity**: Only shows alerts of selected severity
- **Filter by Type**: Only shows alerts of selected type
- **Filter by Status**: Unread/Read/Dismissed filters work
- **Mark as Read**: Alert updates and badge count decreases
- **Dismiss**: Alert disappears from list
- **Empty State**: Shows message when no alerts match filters

### 3. Alert Actions

**Test Mark as Read**:
1. Click "Mark as Read" on an unread alert
2. Verify alert updates (becomes less prominent)
3. Verify unread count decreases

**Test Dismiss**:
1. Click "Dismiss" on an alert
2. Verify alert disappears from list
3. Verify statistics update

**Test Action Taken**:
1. Click "Action Taken" (if implemented)
2. Verify alert shows action taken status
3. Verify action notes are saved

### 4. Responsive Design

**Test on Different Screen Sizes**:
- Desktop (1920x1080)
- Tablet (768x1024)
- Mobile (375x667)

**Expected**:
- ✅ Widget adapts to screen size
- ✅ Alerts page is readable on mobile
- ✅ Buttons are tappable on mobile
- ✅ No horizontal scrolling

---

## 📱 Android Testing

### Prerequisites
- Android Studio installed
- Android device or emulator
- Test user account with farms and alerts

### 1. Build and Install

```bash
cd android-project
./gradlew assembleDebug
# Install on device/emulator
adb install app/build/outputs/apk/debug/androidApp-debug.apk
```

**Expected**: App builds without errors and installs successfully.

### 2. Dashboard Widget

**Steps**:
1. Launch app and log in
2. Navigate to Dashboard screen
3. Verify weather alerts widget appears

**Expected**:
- ✅ Widget card displays at top of dashboard
- ✅ Shows "Weather Alerts" title with icon
- ✅ Displays unread count badge
- ✅ Shows latest 1-3 alerts
- ✅ "View All Alerts" button visible
- ✅ Widget is clickable

**Test Scenarios**:
- **No Alerts**: Widget shows "No weather alerts"
- **With Alerts**: Widget shows alert previews
- **Critical Alerts**: Widget has error/tertiary color
- **Tap Widget**: Navigates to alerts list screen

### 3. Alerts List Screen

**Steps**:
1. Tap "View All Alerts" or navigate to alerts screen
2. Verify screen loads

**Expected**:
- ✅ Screen title shows "Weather Alerts" with unread badge
- ✅ Statistics cards show correct counts
- ✅ Alert list displays all alerts
- ✅ Each alert card shows:
  - Title
  - Message (truncated)
  - Severity badge
  - Farm name
  - Expected time
- ✅ Mark as Read/Dismiss buttons work
- ✅ Pull to refresh works

**Test Scenarios**:
- **Loading State**: Shows loading indicator
- **Error State**: Shows error message with retry button
- **Empty State**: Shows "No Weather Alerts" message
- **Alert Tap**: Navigates to detail screen
- **Mark as Read**: Alert updates, stats refresh
- **Dismiss**: Alert removed, stats refresh

### 4. Alert Detail Screen

**Steps**:
1. Tap an alert from the list
2. Verify detail screen loads

**Expected**:
- ✅ Screen shows full alert details
- ✅ Header card with title and severity badge
- ✅ Full message displayed
- ✅ Details section shows:
  - Alert type
  - Expected time
  - Farm name
  - Location
  - Weather data (if available)
- ✅ Action buttons visible:
  - Mark as Read (if unread)
  - Dismiss (if not dismissed)
  - Action Taken (if not taken)

**Test Scenarios**:
- **Mark as Read**: Alert updates, returns to list
- **Dismiss**: Alert dismissed, returns to list
- **Action Taken**: Shows action taken status
- **Back Button**: Returns to list screen

### 5. Navigation Flow

**Test Complete Flow**:
1. Dashboard → Tap widget → Alerts List
2. Alerts List → Tap alert → Alert Detail
3. Alert Detail → Back → Alerts List
4. Alerts List → Back → Dashboard

**Expected**: All navigation works smoothly, state is preserved.

### 6. Offline Handling (If Implemented)

**Test Offline Mode**:
1. Disable network connection
2. Try to load alerts
3. Verify graceful error handling

**Expected**: Shows error message or cached data.

---

## 🔄 End-to-End Testing

### Complete User Flow

1. **Setup**:
   - Create test user account
   - Add farm with location (latitude/longitude)
   - Ensure `WEATHER_API_KEY` is set

2. **Generate Alerts**:
   ```bash
   node backend/scripts/generate-weather-alerts.js
   ```

3. **Verify Backend**:
   - Check database for alerts
   - Test API endpoints return alerts

4. **Test Web**:
   - Open dashboard
   - Verify widget shows alerts
   - Navigate to alerts page
   - Test filters and actions

5. **Test Android**:
   - Launch app
   - Verify dashboard widget
   - Navigate to alerts screen
   - Test alert actions

6. **Verify Sync**:
   - Mark alert as read on web
   - Verify Android shows it as read
   - Mark alert as dismissed on Android
   - Verify web shows it as dismissed

---

## 🐛 Common Issues & Solutions

### Issue: No Alerts Generated
**Possible Causes**:
- Weather API key not set
- Farms don't have location data
- Weather API rate limit exceeded

**Solution**:
- Check `WEATHER_API_KEY` environment variable
- Verify farms have `latitude` and `longitude` set
- Check API quota/rate limits

### Issue: Widget Not Showing on Dashboard
**Possible Causes**:
- Scripts not loaded
- API config not initialized
- Authentication token missing

**Solution**:
- Check browser console for errors
- Verify scripts are included in HTML
- Check authentication state

### Issue: Android App Crashes
**Possible Causes**:
- Missing imports
- ViewModel not injected
- Navigation route not registered

**Solution**:
- Check Android Studio logcat for errors
- Verify Koin module includes WeatherAlertsViewModel
- Check navigation routes are registered

### Issue: Alerts Not Updating
**Possible Causes**:
- Cache not invalidated
- State not refreshed
- API not called

**Solution**:
- Clear browser cache (web)
- Pull to refresh (Android)
- Check network requests in DevTools

---

## ✅ Success Criteria

### Backend
- [x] Database migration runs successfully
- [x] Alert generation script executes without errors
- [x] API endpoints return correct data
- [x] Alert rules evaluate correctly
- [x] User preferences filter alerts

### Web
- [x] Widget appears on dashboard
- [x] Widget shows alerts correctly
- [x] Full alerts page loads
- [x] Filters work correctly
- [x] Actions (read/dismiss) work
- [x] Responsive on mobile

### Android
- [x] App builds without errors
- [x] Widget appears on dashboard
- [x] Alerts list screen works
- [x] Alert detail screen works
- [x] Navigation flows correctly
- [x] Actions update state

### Integration
- [x] Web and Android show same alerts
- [x] Actions sync across platforms
- [x] Statistics match between platforms

---

## 📊 Performance Testing

### Backend
- Alert generation completes in <30 seconds for 100 farms
- API endpoints respond in <500ms
- Database queries are optimized (use indexes)

### Web
- Widget loads in <1 second
- Alerts page loads in <2 seconds
- Actions complete in <500ms

### Android
- Widget loads in <1 second
- Alerts list loads in <2 seconds
- Navigation is smooth (<100ms transitions)

---

## 🚀 Production Readiness Checklist

Before deploying to production:

- [ ] Database migration tested on production database
- [ ] Weather API key configured in production environment
- [ ] Cron job scheduled and tested
- [ ] API endpoints tested with production URL
- [ ] Web widget tested on production build
- [ ] Android app tested on real device
- [ ] Error handling verified
- [ ] Logging configured
- [ ] Monitoring set up (if available)

---

## 📝 Test Results Template

```
Date: ___________
Tester: ___________

Backend Tests:
- [ ] Migration: PASS/FAIL
- [ ] Alert Generation: PASS/FAIL
- [ ] API Endpoints: PASS/FAIL
- [ ] Rule Evaluation: PASS/FAIL

Web Tests:
- [ ] Dashboard Widget: PASS/FAIL
- [ ] Alerts Page: PASS/FAIL
- [ ] Filters: PASS/FAIL
- [ ] Actions: PASS/FAIL

Android Tests:
- [ ] Build: PASS/FAIL
- [ ] Dashboard Widget: PASS/FAIL
- [ ] Alerts List: PASS/FAIL
- [ ] Alert Detail: PASS/FAIL
- [ ] Navigation: PASS/FAIL

Issues Found:
1. ___________
2. ___________

Notes:
___________
```

---

**Use this guide to ensure Feature 1 is fully tested before committing!** ✅

