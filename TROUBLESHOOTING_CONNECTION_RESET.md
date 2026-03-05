# 🔧 Troubleshooting ERR_CONNECTION_RESET

**Error:** `Failed to load resource: net::ERR_CONNECTION_RESET`

This error means the backend server is not responding or the connection was reset.

---

## 🔍 **Quick Diagnosis Steps**

### Step 1: Check if Backend is Running

**Test the backend health endpoint directly:**

```bash
# Test Railway backend
curl https://smartfarm-app-production.up.railway.app/api/health

# Or open in browser:
https://smartfarm-app-production.up.railway.app/api/health
```

**Expected Response:**
```json
{
  "ok": true,
  "timestamp": "2025-01-XX...",
  "environment": "production"
}
```

**If this fails:**
- ❌ Backend is down or crashed
- ⚠️ Go to Step 2: Check Railway Dashboard

**If this works:**
- ✅ Backend is running
- ⚠️ Go to Step 3: Check CORS Configuration

---

### Step 2: Check Railway Dashboard

1. **Go to Railway Dashboard:**
   - https://railway.app
   - Navigate to your SmartFarm backend project

2. **Check Service Status:**
   - [ ] Is the service showing as "Running" (green)?
   - [ ] Or is it "Stopped" or "Crashed" (red)?

3. **Check Logs:**
   - Click on "Logs" tab
   - Look for error messages
   - Common issues:
     - Database connection errors
     - Missing environment variables
     - Port binding errors
     - Application crashes

4. **Check Recent Deployments:**
   - [ ] Was there a recent deployment?
   - [ ] Did the deployment succeed?
   - [ ] Check deployment logs for errors

---

### Step 3: Check CORS Configuration

**If backend health check works but frontend can't connect:**

1. **Verify CORS Origins:**
   - Go to Railway Dashboard → Variables
   - Check `ALLOWED_ORIGINS` variable
   - Must include your Netlify frontend URL

2. **Test CORS from Browser Console:**

Open browser DevTools → Console and run:

```javascript
fetch('https://smartfarm-app-production.up.railway.app/api/health', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  }
})
.then(response => response.json())
.then(data => console.log('✅ Backend is reachable:', data))
.catch(error => console.error('❌ Connection error:', error));
```

**If you see CORS errors:**
- ⚠️ CORS is not configured correctly
- Go to Step 4: Fix CORS Configuration

---

### Step 4: Fix CORS Configuration

**In Railway Dashboard → Variables:**

1. **Check `ALLOWED_ORIGINS` variable:**
   ```
   ALLOWED_ORIGINS=https://your-site.netlify.app,https://www.smartfarm-app.com
   ```

2. **Add your Netlify URL if missing:**
   - Get your Netlify site URL
   - Add it to `ALLOWED_ORIGINS` (comma-separated)
   - Example: `https://dulcet-sawine-92d6a8.netlify.app`

3. **Redeploy Backend:**
   - After changing variables, trigger a redeploy
   - Railway Dashboard → Deployments → Redeploy

---

### Step 5: Check Environment Variables

**Critical Variables in Railway:**

- [ ] `DATABASE_URL` - Must be set (auto from PostgreSQL plugin)
- [ ] `JWT_SECRET` - Must be 32+ characters
- [ ] `ALLOWED_ORIGINS` - Must include Netlify URL
- [ ] `NODE_ENV` - Should be `production`
- [ ] `PORT` - Should be `3000` (or Railway default)

**If any are missing:**
1. Add missing variables in Railway Dashboard
2. Redeploy backend
3. Check logs for errors

---

### Step 6: Check Database Connection

**If backend is crashing due to database:**

1. **Check Railway Logs for:**
   ```
   Database connected successfully
   ```
   or
   ```
   Error connecting to database
   ```

2. **Verify PostgreSQL Plugin:**
   - Railway Dashboard → Your Project
   - Check if PostgreSQL plugin is attached
   - Verify `DATABASE_URL` is auto-generated

3. **Test Database Connection:**
   ```bash
   # Run from backend directory
   cd backend
   node scripts/test-db-connection.js
   ```

---

### Step 7: Restart Backend Service

**If backend is stuck or crashed:**

1. **In Railway Dashboard:**
   - Go to your backend service
   - Click "Restart" button
   - Wait for deployment to complete

2. **Check Logs After Restart:**
   - Look for "Server started on port..."
   - Look for "Database connected successfully"
   - Check for any error messages

---

## 🚨 **Common Causes & Solutions**

### Cause 1: Backend Crashed
**Symptoms:**
- Health endpoint returns error
- Railway shows service as "Stopped"

**Solution:**
1. Check Railway logs for crash reason
2. Fix the issue (missing env vars, database error, etc.)
3. Restart the service

---

### Cause 2: Missing Environment Variables
**Symptoms:**
- Backend starts but crashes immediately
- Logs show "undefined" errors

**Solution:**
1. Check Railway Variables tab
2. Add missing required variables
3. Redeploy backend

---

### Cause 3: Database Connection Failed
**Symptoms:**
- Backend crashes on startup
- Logs show database connection errors

**Solution:**
1. Verify PostgreSQL plugin is attached
2. Check `DATABASE_URL` is set
3. Test database connection
4. Restart backend

---

### Cause 4: CORS Blocking Requests
**Symptoms:**
- Backend health check works
- Frontend gets CORS errors
- `ERR_CONNECTION_RESET` in browser

**Solution:**
1. Add frontend URL to `ALLOWED_ORIGINS`
2. Redeploy backend
3. Clear browser cache
4. Test again

---

### Cause 5: Wrong Backend URL
**Symptoms:**
- Frontend pointing to wrong URL
- Connection reset errors

**Solution:**
1. Check Netlify environment variables:
   - `VITE_API_URL` should be: `https://smartfarm-app-production.up.railway.app`
2. Verify frontend config files
3. Redeploy frontend

---

## 🔧 **Quick Fix Script**

Create a test script to diagnose the issue:

```javascript
// test-backend-connection.js
const https = require('https');

const BACKEND_URL = 'https://smartfarm-app-production.up.railway.app';

console.log('🔍 Testing backend connection...');
console.log('URL:', BACKEND_URL);

https.get(`${BACKEND_URL}/api/health`, (res) => {
  let data = '';
  
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    console.log('✅ Backend is responding!');
    console.log('Status:', res.statusCode);
    console.log('Response:', data);
  });
}).on('error', (err) => {
  console.error('❌ Connection error:', err.message);
  console.error('This means the backend is not reachable.');
  console.log('\nNext steps:');
  console.log('1. Check Railway Dashboard');
  console.log('2. Check if service is running');
  console.log('3. Check Railway logs for errors');
});
```

**Run it:**
```bash
node test-backend-connection.js
```

---

## 📋 **Checklist to Fix ERR_CONNECTION_RESET**

- [ ] Test backend health endpoint directly
- [ ] Check Railway Dashboard for service status
- [ ] Check Railway logs for errors
- [ ] Verify all environment variables are set
- [ ] Check database connection
- [ ] Verify CORS configuration
- [ ] Restart backend service if needed
- [ ] Clear browser cache
- [ ] Test from frontend again

---

## 🆘 **Still Not Working?**

If none of the above fixes the issue:

1. **Check Railway Status Page:**
   - https://status.railway.app
   - See if Railway is experiencing issues

2. **Check Railway Logs:**
   - Look for specific error messages
   - Check for stack traces
   - Look for database connection errors

3. **Verify Backend Code:**
   - Check `server.js` for errors
   - Verify all dependencies are installed
   - Check for syntax errors

4. **Test Locally:**
   ```bash
   cd backend
   npm install
   npm start
   # Test: http://localhost:3000/api/health
   ```

5. **Contact Support:**
   - Railway Support: https://railway.app/help
   - Include error logs and steps taken

---

## ✅ **Verification Steps**

After fixing, verify:

1. **Backend Health Check:**
   ```bash
   curl https://smartfarm-app-production.up.railway.app/api/health
   ```

2. **Frontend Connection:**
   - Open frontend in browser
   - Check browser console
   - Should see successful API calls
   - No `ERR_CONNECTION_RESET` errors

3. **Test Core Features:**
   - User registration
   - User login
   - Dashboard loading
   - API calls working

---

**Last Updated:** January 2025
