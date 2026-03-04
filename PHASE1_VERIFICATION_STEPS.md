# 🔍 Phase 1 Verification Steps

**Follow these steps to verify your backend is fully configured**

---

## Step 1: Run Backend Connection Test (5 minutes)

### Run the Test Script

```powershell
# Make sure you're in the project root
cd E:\Document\SmartFarm

# Run the connection test
node scripts/test-backend-connection.js
```

### What to Look For:

✅ **Health Check Should Show:**
- HTTP 200 status
- `"ok": true` or service status healthy
- `"database": { "connected": true }` ← **This is critical!**

✅ **Registration Should Show:**
- HTTP 201 or 200 status
- User object created
- JWT token generated (may be in `token`, `data.token`, or `user.token`)

✅ **Login Should Show:**
- HTTP 200 status
- JWT token received

---

## Step 2: Check Railway Logs (3 minutes)

### Access Railway Dashboard

1. **Go to:** https://railway.app/dashboard
2. **Click** on your backend service (likely `smartfarm-app-production`)
3. **Click** on **"Logs"** tab
4. **Look for** these messages:

### ✅ Good Signs (Database Connected):
```
✅ Database connected successfully
✅ Database pool initialized
✅ Connected to PostgreSQL
✅ Health check passed
```

### ❌ Bad Signs (Database Issues):
```
❌ Database connection error
❌ DATABASE_URL not set
❌ Failed to connect to database
❌ Database pool not initialized
```

### If You See Database Errors:

1. **Check Environment Variables:**
   - Railway → Backend service → **Variables** tab
   - Verify `DATABASE_URL` exists
   - Should look like: `postgresql://user:pass@host:port/db`

2. **Check PostgreSQL Service:**
   - Railway → PostgreSQL service → **Variables** tab
   - Verify service is running (green status)

3. **Restart Backend:**
   - Railway → Backend service → **Deployments** tab
   - Click **"Redeploy"** or **"Deploy"**

---

## Step 3: Verify Environment Variables (5 minutes)

### Required Variables Checklist

Go to: **Railway → Backend Service → Variables Tab**

Check these exist:

```
✅ DATABASE_URL (should be auto-added by PostgreSQL plugin)
✅ NODE_ENV=production
✅ PORT=3000
✅ JWT_SECRET=<your-secure-secret>
✅ CORS_ORIGINS=<your-frontend-url>
✅ API_NAME=SmartFarm
✅ API_VERSION=v1
```

### If JWT_SECRET is Missing:

1. Use the generated secret: `bb2a4fc5abc7bf4ccf661e1835e227c6f22c7280c62ca5f19aed95d49a8220d7`
2. Add it: Railway → Variables → New Variable
3. Name: `JWT_SECRET`
4. Value: `bb2a4fc5abc7bf4ccf661e1835e227c6f22c7280c62ca5f19aed95d49a8220d7`
5. Save and wait for auto-redeploy

### If CORS_ORIGINS is Missing or Wrong:

1. Get your Netlify frontend URL (e.g., `https://your-site.netlify.app`)
2. Add/Update: Railway → Variables → `CORS_ORIGINS`
3. Value: `https://your-site.netlify.app,https://www.your-site.netlify.app`
4. **Important:** No spaces around commas!
5. Save and wait for auto-redeploy

---

## Step 4: Test Authentication Manually (5 minutes)

### Test Registration

```powershell
# Replace email with unique email each time
$body = @{
    email = "test-$(Get-Date -Format 'yyyyMMddHHmmss')@example.com"
    password = "Test123!@#"
    name = "Test User"
    firstName = "Test"
    lastName = "User"
} | ConvertTo-Json

Invoke-RestMethod -Uri "https://smartfarm-app-production.up.railway.app/api/auth/register" `
    -Method Post `
    -ContentType "application/json" `
    -Body $body
```

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "user": { ... },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### Test Login

```powershell
# Use the email from registration above
$body = @{
    email = "test-20250105123456@example.com"  # Use actual email
    password = "Test123!@#"
} | ConvertTo-Json

Invoke-RestMethod -Uri "https://smartfarm-app-production.up.railway.app/api/auth/login" `
    -Method Post `
    -ContentType "application/json" `
    -Body $body
```

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "user": { ... },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

---

## Step 5: Verify Database Tables (2 minutes)

### Check Tables Exist

If you have access to Railway PostgreSQL console:

1. Railway → PostgreSQL service → **Data** tab → **Query** tab
2. Run:
```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;
```

**Should see:** users, farms, crops, livestock, weather_alerts, etc. (30 tables)

---

## Step 6: Final Verification (2 minutes)

### Run Updated Verification Script

```powershell
# Set your actual frontend URL
$env:FRONTEND_URL="https://your-actual-site.netlify.app"
$env:BACKEND_URL="https://smartfarm-app-production.up.railway.app"

# Run verification
node scripts/verify-phase1.js
```

### Expected Output:

```
✅ Backend Health: PASS
✅ Backend Auth: PASS
✅ Frontend: PASS

🎉 All checks passed! Phase 1 verification complete!
```

---

## 🐛 Troubleshooting

### Problem: Database shows as disconnected

**Solution:**
1. Check `DATABASE_URL` exists in Railway variables
2. Verify PostgreSQL service is running
3. Check Railway logs for connection errors
4. Restart backend service

### Problem: Registration returns 400/422 error

**Solution:**
1. Check request body format matches expected schema
2. Verify email is unique (use timestamp in email)
3. Check Railway logs for validation errors
4. Ensure password meets requirements (min 8 chars, etc.)

### Problem: No JWT token in response

**Solution:**
1. Verify `JWT_SECRET` is set in Railway variables
2. Check Railway logs for JWT errors
3. Token might be in different location (`data.token` vs `token`)
4. This is OK if registration/login works - token format may vary

### Problem: CORS errors in browser

**Solution:**
1. Verify `CORS_ORIGINS` includes your exact frontend URL
2. No trailing slashes
3. No spaces around commas
4. Restart backend after changing CORS_ORIGINS

---

## ✅ Success Checklist

Phase 1 is complete when:

- [x] Backend health endpoint returns 200 OK
- [ ] Database shows as "connected" in health response
- [ ] User registration works and returns token
- [ ] User login works and returns token
- [ ] Frontend connects to backend without CORS errors
- [ ] All environment variables are set correctly

---

**Ready to start? Run:** `node scripts/test-backend-connection.js`
