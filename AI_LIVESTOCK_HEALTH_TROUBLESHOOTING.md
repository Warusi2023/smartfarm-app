# 🐄 AI Livestock Health Advice API Troubleshooting Guide

## Problem Identification

The system attempts to fetch AI Health advice via `/api/ai-advisory/livestock-health/{animalId}` but returns a **404 (Not Found)** error. This manifests as failing to get AI recommendations in the livestock management module.

---

## ✅ Diagnostic Steps

### 1. Verify API Endpoint Exists

**Check Backend Routes:**
- ✅ Endpoint should be: `GET /api/ai-advisory/livestock-health/:animalId`
- ✅ Route is registered in `backend/routes/ai-advisory.js`
- ✅ Route is mounted in `backend/server.js` as `/api/ai-advisory`
- ✅ Direct endpoint exists in `backend/server.js` as fallback

**Test Endpoint:**
```bash
curl https://smartfarm-app-production.up.railway.app/api/ai-advisory/livestock-health/3?type=Cattle&age=12&healthStatus=healthy
```

Expected response:
```json
{
  "success": true,
  "message": "AI health advice generated successfully",
  "data": {
    "healthStatus": "healthy",
    "nutrition": {...},
    "vaccinations": {...},
    "healthChecks": {...},
    "warnings": [...],
    "tips": [...]
  }
}
```

### 2. Check Backend Deployment Status

**Verify Latest Code is Deployed:**
1. Railway Dashboard → `smartfarm-app` service
2. Check **Deployments** tab
3. Verify latest commit includes livestock health endpoint
4. Check build logs for errors

**Common Issues:**
- ❌ Old code deployed (endpoint doesn't exist)
- ❌ Route not registered properly
- ❌ Build failed silently

### 3. Review Backend Logs

**Check Railway Logs:**
1. Railway Dashboard → `smartfarm-app` → **Logs**
2. Look for:
   - ✅ `✅ AI Advisory routes loaded`
   - ✅ `[AI Advisory] Livestock health request: GET /api/ai-advisory/livestock-health/3`
   - ❌ Route registration errors
   - ❌ 404 errors with path `/`

### 4. Verify Frontend API URL Construction

**Check Browser Console:**
- Look for: `🔍 Fetching AI livestock health advice from: [URL]`
- Verify URL doesn't have double `/api` (e.g., `/api/api/...`)
- Check URL matches expected format

**Expected URL Format:**
```
https://smartfarm-app-production.up.railway.app/api/ai-advisory/livestock-health/3?type=Cattle&age=12&healthStatus=healthy
```

---

## 🔧 Repair Recommendations

### Fix 1: Ensure Endpoint is Deployed

**If endpoint returns 404:**
1. Verify `backend/server.js` includes livestock health endpoint
2. Check `backend/routes/ai-advisory.js` has the route
3. Manually redeploy in Railway:
   - Railway Dashboard → Service → Deployments → Redeploy

### Fix 2: Verify Route Registration

**Check Route Loading:**
```javascript
// In backend/server.js, should see:
app.use('/api/ai-advisory', aiAdvisoryRoutes.getRouter());
// OR
app.get('/api/ai-advisory/livestock-health/:animalId', ...);
```

### Fix 3: Test with Multiple Animal IDs

**After deployment, test:**
```bash
# Test with different IDs
curl .../api/ai-advisory/livestock-health/1
curl .../api/ai-advisory/livestock-health/2
curl .../api/ai-advisory/livestock-health/3
```

All should return valid JSON responses.

---

## 🛡️ Error Handling & Fallback

### Frontend Error Handling

**Implemented Features:**
- ✅ 404 detection with user-friendly message
- ✅ Fallback health advice when API unavailable
- ✅ Detailed error logging for troubleshooting
- ✅ Status code-specific error messages
- ✅ Network error detection

### Fallback Mechanism

**When API Fails:**
1. Shows warning message to user
2. Displays basic health recommendations
3. Includes notice that AI service is unavailable
4. Provides actionable guidance based on:
   - Animal type (Cattle, Pig, Poultry, etc.)
   - Age (young, adult, senior)
   - Health status (healthy, sick, etc.)

### Fallback Recommendations Include:
- Basic nutrition guidelines
- Vaccination schedule reminders
- Health check frequency
- General care tips
- Warning notices for sick animals

---

## 📋 API Request and Response Format

### Request
```http
GET /api/ai-advisory/livestock-health/:animalId?type=Cattle&breed=Angus&age=24&healthStatus=healthy
```

**Query Parameters:**
- `type` - Animal type (Cattle, Pig, Chicken, etc.)
- `breed` - Animal breed
- `age` - Age in months
- `healthStatus` - Current health status

### Response (Success)
```json
{
  "success": true,
  "message": "AI health advice generated successfully",
  "data": {
    "healthStatus": "healthy",
    "nutrition": {
      "feedType": "Balanced feed mix",
      "dailyAmount": "2-3% of body weight",
      "frequency": "2-3 times daily",
      "supplements": ["Mineral salt", "Calcium supplement"],
      "notes": "Ensure access to clean water at all times"
    },
    "vaccinations": {
      "nextVaccination": "In 3 months",
      "recommended": ["Annual health check", "Deworming every 6 months"],
      "critical": "Keep vaccination records up to date"
    },
    "healthChecks": {
      "frequency": "Monthly",
      "checks": ["Body condition score", "Hoof health", "Coat condition", "Appetite"],
      "signs": "Watch for changes in behavior, appetite, or appearance"
    },
    "warnings": [...],
    "tips": [...]
  }
}
```

### Response (Error)
```json
{
  "success": false,
  "error": "API endpoint not found",
  "code": "NOT_FOUND",
  "path": "/api/ai-advisory/livestock-health/3"
}
```

---

## 📝 Documentation and Communication

### Error Traces

**Log all errors with:**
- API URL attempted
- HTTP status code
- Error message
- Animal ID and type
- Timestamp

**Example Log:**
```javascript
console.error('❌ Error getting AI livestock advice:', {
  animalId: 3,
  animalType: 'Cattle',
  apiUrl: 'https://...',
  status: 404,
  error: 'Not Found',
  timestamp: new Date().toISOString()
});
```

### User Communication

**When API is Unavailable:**
- Show clear warning message
- Explain that basic recommendations are being shown
- Suggest retrying later
- Provide contact information for support

**When API is Restored:**
- Notify users via in-app message
- Update status indicator
- Log restoration event

---

## ✅ Verification Checklist

After implementing fixes:

- [ ] Endpoint exists in backend code
- [ ] Route is registered in server.js
- [ ] Backend deployed successfully
- [ ] Test endpoint returns valid JSON
- [ ] Frontend error handling works
- [ ] Fallback recommendations display correctly
- [ ] Error messages are user-friendly
- [ ] Logging captures all errors
- [ ] Multiple animal IDs work correctly
- [ ] Different animal types return appropriate advice

---

## 🎯 Expected Behavior

### When API Works:
1. User clicks "Get AI Health Advice" button
2. Loading message appears
3. API request sent with animal data
4. AI recommendations received
5. Modal displays comprehensive health advice
6. User can apply recommendations

### When API Fails (404):
1. User clicks "Get AI Health Advice" button
2. Loading message appears
3. API request sent
4. 404 error detected
5. Warning message shown
6. Fallback recommendations displayed
7. Notice that AI service is unavailable

### When API Fails (Network):
1. Network error detected
2. Connection error message shown
3. Fallback recommendations displayed
4. Suggestion to check internet connection

---

## 🔍 Troubleshooting Flow

```
1. Check Browser Console
   ↓
2. Verify API URL is correct
   ↓
3. Test endpoint directly (curl/browser)
   ↓
4. Check Railway deployment status
   ↓
5. Review backend logs
   ↓
6. Verify route registration
   ↓
7. Test with different animal IDs
   ↓
8. Verify fallback works correctly
```

---

**Last Updated**: After implementing comprehensive error handling
**Status**: Ready for testing after Railway deployment

