# 🚀 Phase 1 Setup Walkthrough

**Your Generated JWT_SECRET:** `bb2a4fc5abc7bf4ccf661e1835e227c6f22c7280c62ca5f19aed95d49a8220d7`

**Your Railway Backend URL:** `https://smartfarm-app-production.up.railway.app`

---

## 📋 STEP-BY-STEP SETUP

### STEP 1: Railway Backend Configuration (15 minutes)

#### 1.1: Access Railway Dashboard
1. Go to: https://railway.app/dashboard
2. Sign in with your GitHub account
3. Find your project (likely named `smartfarm-app-production` or similar)

#### 1.2: Verify PostgreSQL Database
1. In Railway dashboard, look for a **PostgreSQL** service
2. If you don't see one:
   - Click **"New"** → **"Database"** → **"Add PostgreSQL"**
   - Railway will automatically provision it
3. Click on the PostgreSQL service
4. Go to **"Variables"** tab
5. **Verify `DATABASE_URL` exists** - Railway adds this automatically
6. Copy the `DATABASE_URL` value (you'll need it for migrations)

#### 1.3: Configure Backend Environment Variables
1. Click on your **backend service** (not PostgreSQL)
2. Go to **"Variables"** tab
3. Click **"New Variable"** for each variable below:

**Required Variables:**
```
NODE_ENV = production
PORT = 3000
API_NAME = SmartFarm
API_VERSION = v1
JWT_SECRET = bb2a4fc5abc7bf4ccf661e1835e227c6f22c7280c62ca5f19aed95d49a8220d7
JWT_EXPIRES_IN = 7d
BCRYPT_ROUNDS = 12
LOG_LEVEL = info
ENABLE_DEBUG_ROUTES = false
ENABLE_SWAGGER_DOCS = false
```

**CORS Configuration:**
```
CORS_ORIGINS = https://your-frontend.netlify.app,https://www.your-frontend.netlify.app
```
⚠️ **Replace with your actual Netlify frontend URL!**

**Optional API Keys:**
```
WEATHER_API_KEY = <your-openweather-api-key>
GOOGLE_API_KEY = <your-google-maps-api-key>
OPENAI_API_KEY = <your-openai-api-key>
```

#### 1.4: Run Database Migrations
1. In Railway dashboard, click on **PostgreSQL** service
2. Go to **"Data"** tab
3. Click **"Query"** tab
4. Open `backend/database/schema.sql` file locally
5. Copy the entire contents
6. Paste into Railway Query editor
7. Click **"Run"** or **"Execute"**
8. Wait for success message
9. Verify tables were created by running:
   ```sql
   SELECT table_name 
   FROM information_schema.tables 
   WHERE table_schema = 'public' 
   ORDER BY table_name;
   ```
   Should see: users, farms, crops, livestock, weather_alerts, etc.

#### 1.5: Verify Backend Deployment
1. Go back to your backend service
2. Check **"Deployments"** tab
3. Verify latest deployment is **"Active"** and **"Running"**
4. If not running, click **"Deploy"** button
5. Wait 2-3 minutes for deployment

#### 1.6: Test Backend Health
Open a new terminal and run:
```bash
curl https://smartfarm-app-production.up.railway.app/api/health
```

Expected response:
```json
{
  "status": "healthy",
  "database": "connected",
  "timestamp": "..."
}
```

---

### STEP 2: Netlify Frontend Configuration (10 minutes)

#### 2.1: Access Netlify Dashboard
1. Go to: https://app.netlify.com
2. Sign in with your GitHub account
3. Find your SmartFarm site

#### 2.2: Configure Environment Variables
1. Click on your site
2. Go to **"Site settings"** → **"Environment variables"**
3. Click **"Add a variable"** for each:

**Required Variables:**
```
VITE_API_URL = https://smartfarm-app-production.up.railway.app
VITE_APP_NAME = SmartFarm
VITE_APP_VERSION = 1.0.0
```

⚠️ **Important:** 
- No `/api` at the end of `VITE_API_URL`
- Variables must start with `VITE_` to be available in frontend

#### 2.3: Verify Build Settings
1. Go to **"Site settings"** → **"Build & deploy"**
2. Verify:
   - **Base directory:** `web-project` (or your frontend folder)
   - **Build command:** `npm run build` (or your build command)
   - **Publish directory:** `dist` (or your build output)

#### 2.4: Trigger Deployment
1. Go to **"Deploys"** tab
2. Click **"Trigger deploy"** → **"Clear cache and deploy site"**
3. Wait for deployment to complete (2-5 minutes)
4. Note your Netlify URL (e.g., `https://your-site.netlify.app`)

#### 2.5: Update CORS_ORIGINS in Railway
1. Go back to Railway → Backend service → Variables
2. Update `CORS_ORIGINS` to include your Netlify URL:
   ```
   CORS_ORIGINS = https://your-site.netlify.app,https://www.your-site.netlify.app
   ```
3. Railway will auto-redeploy

---

### STEP 3: Verification (5 minutes)

#### 3.1: Test Backend
```bash
# Test health endpoint
curl https://smartfarm-app-production.up.railway.app/api/health

# Test registration (replace email with unique email)
curl -X POST https://smartfarm-app-production.up.railway.app/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test123!@#","name":"Test User","firstName":"Test","lastName":"User"}'
```

#### 3.2: Test Frontend
1. Visit your Netlify URL
2. Open browser DevTools (F12)
3. Go to **Console** tab - should see no errors
4. Go to **Network** tab
5. Try to register/login
6. Verify API calls succeed (status 200)
7. Check for CORS errors (should be none)

#### 3.3: Run Verification Script
```bash
# Set your URLs
$env:BACKEND_URL="https://smartfarm-app-production.up.railway.app"
$env:FRONTEND_URL="https://your-site.netlify.app"

# Run verification
node scripts/verify-phase1.js
```

---

## ✅ SUCCESS CRITERIA

Phase 1 is complete when:

- ✅ Backend health endpoint returns `{"status":"healthy","database":"connected"}`
- ✅ Database migrations completed (tables exist)
- ✅ Frontend loads without console errors
- ✅ User registration works
- ✅ User login works
- ✅ No CORS errors in browser console
- ✅ API calls succeed (check Network tab)

---

## 🐛 TROUBLESHOOTING

### Backend Issues

**Problem: Health endpoint returns 502**
- Check Railway logs for errors
- Verify all environment variables are set
- Check if `DATABASE_URL` exists
- Restart the service

**Problem: Database connection fails**
- Verify `DATABASE_URL` is set correctly
- Check PostgreSQL service is running
- Verify migrations were run

**Problem: CORS errors**
- Verify `CORS_ORIGINS` includes your Netlify URL
- No spaces around commas
- No trailing slashes
- Restart backend after changing CORS_ORIGINS

### Frontend Issues

**Problem: Can't connect to backend**
- Verify `VITE_API_URL` is set correctly
- Check backend is running (test health endpoint)
- Verify no `/api` at end of URL

**Problem: Environment variables not working**
- Variables must start with `VITE_`
- Redeploy frontend after adding variables
- Check build logs for variable injection

---

## 📝 NEXT STEPS

Once Phase 1 is complete:
1. ✅ Mark items in `PHASE1_CHECKLIST.md`
2. ✅ Proceed to Phase 2 (Testing & Quality Assurance)
3. ✅ Set up monitoring (Sentry, UptimeRobot)

---

**Ready to start? Begin with Step 1.1 above!** 🚀

