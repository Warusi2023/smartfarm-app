# 🚀 Phase 1: Production Environment Configuration Guide

**Status:** CRITICAL - Must Complete Before Launch  
**Estimated Time:** 2-3 hours  
**Last Updated:** January 2025

---

## 📋 Overview

This guide walks you through setting up the production environment for SmartFarm, including:
- Railway backend deployment with PostgreSQL
- Netlify frontend deployment
- Environment variable configuration
- Database migrations
- Health verification

---

## 🔧 PART 1: Backend Setup (Railway)

### Step 1.1: Create Railway Account & Project

1. **Sign up/Login to Railway**
   - Go to https://railway.app
   - Sign in with GitHub (recommended)

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose repository: `Warusi2023/smartfarm-app`
   - Select root directory: `backend` (IMPORTANT!)

3. **Verify Project Created**
   - You should see your project dashboard
   - Note your project name (e.g., `smartfarm-backend`)

---

### Step 1.2: Provision PostgreSQL Database

1. **Add PostgreSQL Plugin**
   - In Railway project dashboard, click "New"
   - Select "Database" → "Add PostgreSQL"
   - Railway will automatically provision PostgreSQL

2. **Get Database Connection String**
   - Click on the PostgreSQL service
   - Go to "Variables" tab
   - Copy the `DATABASE_URL` value (it looks like: `postgresql://postgres:password@host:port/railway`)
   - **IMPORTANT:** Save this securely - you'll need it!

3. **Enable Backups** (Recommended)
   - In PostgreSQL service settings
   - Enable "Backups" → Set to daily
   - This ensures automatic daily snapshots

---

### Step 1.3: Configure Backend Environment Variables

1. **Go to Backend Service Variables**
   - In Railway dashboard, click on your backend service (not PostgreSQL)
   - Click "Variables" tab
   - Click "New Variable" for each variable below

2. **Add Required Variables:**

```bash
# Core Configuration
NODE_ENV=production
PORT=3000
API_NAME=SmartFarm
API_VERSION=v1

# Database (Auto-injected by Railway PostgreSQL plugin)
# DATABASE_URL is automatically added - verify it exists!

# Authentication (CRITICAL - Generate a secure secret!)
JWT_SECRET=<GENERATE_SECURE_32_CHAR_SECRET>
JWT_EXPIRES_IN=7d
BCRYPT_ROUNDS=12

# CORS Configuration (Update with your actual frontend domain)
CORS_ORIGINS=https://your-frontend.netlify.app,https://www.your-frontend.netlify.app

# External APIs (Get these from respective services)
WEATHER_API_KEY=<your-openweather-api-key>
GOOGLE_API_KEY=<your-google-maps-api-key>  # Optional
OPENAI_API_KEY=<your-openai-api-key>       # Optional

# Logging
LOG_LEVEL=info
ENABLE_DEBUG_ROUTES=false
ENABLE_SWAGGER_DOCS=false
```

3. **Generate JWT_SECRET** (IMPORTANT!)
   ```bash
   # Option 1: Use Node.js
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   
   # Option 2: Use OpenSSL
   openssl rand -hex 32
   
   # Option 3: Use online generator
   # Visit: https://generate-secret.vercel.app/32
   ```
   - Copy the generated string
   - Set as `JWT_SECRET` value in Railway
   - **NEVER commit this to git!**

---

### Step 1.4: Run Database Migrations

1. **Connect to Railway Database**
   - You can use Railway's built-in PostgreSQL console
   - Or use a local PostgreSQL client (pgAdmin, DBeaver, etc.)

2. **Method 1: Using Railway CLI** (Recommended)
   ```bash
   # Install Railway CLI
   npm install -g @railway/cli
   
   # Login to Railway
   railway login
   
   # Link to your project
   railway link
   
   # Connect to PostgreSQL shell
   railway connect postgres
   ```

3. **Method 2: Using psql with DATABASE_URL**
   ```bash
   # Get DATABASE_URL from Railway → PostgreSQL → Variables
   # Then run:
   psql $DATABASE_URL -f backend/database/schema.sql
   ```

4. **Method 3: Using Railway Web Console**
   - Go to PostgreSQL service → "Data" tab
   - Click "Query" tab
   - Copy contents of `backend/database/schema.sql`
   - Paste and execute

5. **Verify Migrations**
   ```sql
   -- Run this query to verify tables were created
   SELECT table_name 
   FROM information_schema.tables 
   WHERE table_schema = 'public' 
   ORDER BY table_name;
   
   -- Should see tables like: users, farms, crops, livestock, weather_alerts, etc.
   ```

---

### Step 1.5: Deploy Backend

1. **Trigger Deployment**
   - Railway automatically deploys on git push
   - Or manually: Click "Deploy" button in Railway dashboard

2. **Monitor Build Logs**
   - Watch the deployment logs
   - Look for: "✓ Server started successfully"
   - Check for any errors

3. **Verify Deployment**
   - Check service status (should be "Running")
   - Note your Railway URL (e.g., `https://smartfarm-app-production.up.railway.app`)

---

### Step 1.6: Backend Health Verification

1. **Test Health Endpoint**
   ```bash
   # Replace with your Railway URL
   curl https://your-backend.railway.app/api/health
   
   # Should return:
   # {"status":"healthy","timestamp":"...","database":"connected"}
   ```

2. **Test Authentication Endpoints**
   ```bash
   # Test registration endpoint
   curl -X POST https://your-backend.railway.app/api/auth/register \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com","password":"Test123!@#","name":"Test User"}'
   
   # Should return user object with token
   ```

3. **Check Logs**
   - In Railway dashboard → Backend service → "Logs" tab
   - Verify no errors
   - Check for database connection messages

4. **Verify Database Connectivity**
   - Check logs for: "Database connected successfully"
   - Health endpoint should show: `"database":"connected"`

---

## 🌐 PART 2: Frontend Setup (Netlify)

### Step 2.1: Create Netlify Account & Site

1. **Sign up/Login to Netlify**
   - Go to https://app.netlify.com
   - Sign in with GitHub (recommended)

2. **Create New Site**
   - Click "Add new site" → "Import an existing project"
   - Select "Deploy with GitHub"
   - Authorize Netlify to access your GitHub
   - Select repository: `Warusi2023/smartfarm-app`

3. **Configure Build Settings**
   - **Base directory:** `web-project` (or wherever your frontend code is)
   - **Build command:** `npm run build` (or your build command)
   - **Publish directory:** `dist` (or your build output directory)
   - Click "Deploy site"

---

### Step 2.2: Configure Frontend Environment Variables

1. **Go to Site Settings**
   - In Netlify dashboard, click on your site
   - Go to "Site settings" → "Environment variables"
   - Click "Add a variable"

2. **Add Required Variables:**

```bash
# Backend API URL (Use your Railway backend URL)
VITE_API_URL=https://your-backend.railway.app

# App Configuration
VITE_APP_NAME=SmartFarm
VITE_APP_VERSION=1.0.0

# Optional: External API Keys (if frontend needs them)
VITE_OPENWEATHER_API_KEY=<your-openweather-api-key>
VITE_GOOGLE_API_KEY=<your-google-maps-api-key>
```

3. **Important Notes:**
   - Variables starting with `VITE_` are exposed to the frontend
   - Never put secrets in `VITE_` variables (they're public!)
   - Update `VITE_API_URL` with your actual Railway backend URL

---

### Step 2.3: Redeploy Frontend

1. **Trigger Redeploy**
   - After adding environment variables, click "Deploy settings"
   - Click "Trigger deploy" → "Deploy site"
   - Or push a commit to trigger automatic deploy

2. **Monitor Deployment**
   - Watch build logs
   - Verify build completes successfully
   - Note your Netlify URL (e.g., `https://your-site.netlify.app`)

---

### Step 2.4: Frontend Verification

1. **Test Frontend Loads**
   - Visit your Netlify URL
   - Verify homepage loads correctly
   - Check browser console for errors (F12 → Console)

2. **Test API Connection**
   - Open browser DevTools → Network tab
   - Try to register/login
   - Verify API calls are made to your Railway backend
   - Check for CORS errors (should be none)

3. **Test Authentication Flow**
   - Try user registration
   - Try user login
   - Verify JWT token is stored
   - Test protected routes

---

## ✅ Verification Checklist

### Backend Verification ✅
- [ ] Railway backend service is running
- [ ] PostgreSQL database is provisioned
- [ ] `DATABASE_URL` environment variable exists
- [ ] All required environment variables are set
- [ ] Database migrations have been run
- [ ] Health endpoint returns: `{"status":"healthy","database":"connected"}`
- [ ] User registration endpoint works
- [ ] User login endpoint works
- [ ] Database queries execute successfully
- [ ] No errors in Railway logs

### Frontend Verification ✅
- [ ] Netlify site is deployed
- [ ] Environment variables are configured
- [ ] Frontend loads without errors
- [ ] API calls succeed (check Network tab)
- [ ] No CORS errors in console
- [ ] User registration flow works
- [ ] User login flow works
- [ ] Protected pages require authentication

### Security Verification ✅
- [ ] `JWT_SECRET` is a secure random string (32+ chars)
- [ ] No secrets are committed to git
- [ ] CORS origins are set correctly
- [ ] HTTPS is enabled (Railway & Netlify provide automatically)
- [ ] Database backups are enabled

---

## 🐛 Troubleshooting

### Backend Issues

**Problem: Database connection fails**
- Verify `DATABASE_URL` is set correctly in Railway
- Check PostgreSQL service is running
- Verify database migrations were run
- Check Railway logs for connection errors

**Problem: Health endpoint returns 500**
- Check Railway logs for errors
- Verify all required environment variables are set
- Check database connection status
- Verify `JWT_SECRET` is set

**Problem: CORS errors**
- Verify `CORS_ORIGINS` includes your Netlify domain
- Check format: `https://domain1.com,https://domain2.com` (no spaces!)
- Restart backend service after changing CORS_ORIGINS

### Frontend Issues

**Problem: Frontend can't connect to backend**
- Verify `VITE_API_URL` is set correctly
- Check Railway backend URL is correct
- Verify backend is running (test health endpoint)
- Check browser console for errors

**Problem: Environment variables not working**
- Variables must start with `VITE_` to be available in frontend
- Redeploy frontend after adding variables
- Check build logs for variable injection

**Problem: Build fails**
- Check build command is correct
- Verify base directory is set correctly
- Check for TypeScript/compilation errors
- Review Netlify build logs

---

## 📝 Next Steps After Phase 1

Once Phase 1 is complete, proceed to:
- **Phase 2:** Testing & Quality Assurance
- **Phase 3:** Legal & Compliance (Privacy Policy, Terms)
- **Phase 4:** Monitoring & Analytics Setup

---

## 🔗 Quick Reference Links

- **Railway Dashboard:** https://railway.app
- **Netlify Dashboard:** https://app.netlify.com
- **OpenWeatherMap API:** https://openweathermap.org/api
- **Google Maps API:** https://console.cloud.google.com/apis/credentials
- **OpenAI API:** https://platform.openai.com/api-keys

---

## 🎉 Success Criteria

Phase 1 is complete when:
- ✅ Backend is deployed and healthy on Railway
- ✅ Database is connected and migrations are run
- ✅ Frontend is deployed and connected to backend
- ✅ User registration and login work end-to-end
- ✅ No critical errors in logs
- ✅ All environment variables are configured securely

**Congratulations! Your production environment is ready!** 🚀

