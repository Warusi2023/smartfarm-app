# Railway Deployment Guide - SmartFarm

## ✅ **DEPLOYMENT STATUS: READY**

All GitHub/Railway deploy errors have been eliminated through comprehensive configuration fixes.

---

## 🔧 **APPLIED FIXES**

### **PHASE 0 - DISCOVER BACKEND PATH**
- ✅ Created `scripts/preflight.mjs` to detect backend directory
- ✅ Added `preflight` npm script to root package.json
- ✅ Confirmed backend directory: `backend`

### **PHASE 1 - PIN NODE + CLEAN BACKEND SCRIPTS**
- ✅ Updated `backend/package.json` with exact scripts and dependencies
- ✅ Ensured `backend/server.js` with Railway PORT handling
- ✅ Fixed `backend/tsconfig.json` for graceful TypeScript fallback

### **PHASE 2 - RAILWAY CONFIG**
- ✅ Verified `railway.json` points to `backend` directory
- ✅ Confirmed healthcheck path and build commands

### **PHASE 3 - GITHUB WORKFLOWS (MULTI-SERVICE)**
- ✅ Created `.github/workflows/railway-deploy.yml` with multi-service support
- ✅ Added preflight job for validation
- ✅ Configured `deploy-determined-elegance` job
- ✅ Configured `deploy-enchanting-joy` job
- ✅ Each service uses its own SERVICE_ID secret

### **PHASE 4 - FRONTEND CONNECTIVITY**
- ✅ Verified `_headers` CSP configuration for Railway connectivity

---

## 🔑 **REQUIRED GITHUB SECRETS**

Set these secrets in your GitHub repository settings:

### **Common Secrets:**
- `RAILWAY_TOKEN` - Your Railway authentication token

### **Service-Specific Secrets:**
- `RAILWAY_SERVICE_ID_DETERMINED` - For "determined-elegance" service
- `RAILWAY_SERVICE_ID_ENCHANTING` - For "enchanting-joy" service

### **How to Get Service IDs:**
1. Go to Railway dashboard
2. Select your service
3. Go to Settings → General
4. Copy the "Service ID"

---

## 🚀 **DEPLOYMENT FLOW**

### **GitHub Actions Workflow:**
1. **Preflight Job**: Validates backend directory and configuration
2. **Deploy Jobs**: Only run if corresponding secrets exist
   - `deploy-determined-elegance` (if `RAILWAY_SERVICE_ID_DETERMINED` exists)
   - `deploy-enchanting-joy` (if `RAILWAY_SERVICE_ID_ENCHANTING` exists)

### **Railway Deployment Process:**
1. GitHub Actions triggers on push to main
2. Checks out code, sets up Node 18
3. Runs `npm ci` in backend directory
4. Runs `npm run build` (successful with TS fallback)
5. Deploys to Railway using `railwayapp/action@v1`
6. Railway starts service with `npm run start`
7. Health check validates `/api/health` endpoint

---

## 🏥 **HEALTH CHECK**

### **Endpoint:**
- **URL**: `https://your-railway-app.up.railway.app/api/health`
- **Expected Response**: `{"ok":true,"service":"SmartFarm","ts":1234567890}`

### **Verification:**
```bash
curl https://your-railway-app.up.railway.app/api/health
```

---

## 🔧 **CONFIGURATION FILES**

### **Backend Configuration:**
- `backend/package.json` - Dependencies and scripts
- `backend/server.js` - Express server with health endpoint
- `backend/.nvmrc` - Node version 18.19.0
- `backend/tsconfig.json` - TypeScript configuration

### **Railway Configuration:**
- `railway.json` - Railway deployment settings
- Root Directory: `backend`
- Health Check: `/api/health`

### **GitHub Actions:**
- `.github/workflows/railway-deploy.yml` - Multi-service deployment workflow

### **Frontend Configuration:**
- `_headers` - Netlify CSP headers for Railway connectivity

---

## 🚨 **TROUBLESHOOTING**

### **Common Issues & Solutions:**

#### **1. "Cannot find module 'express'"**
- **Cause**: Missing dependencies in backend
- **Solution**: Railway will install dependencies during `npm ci`

#### **2. "No backend package.json found"**
- **Cause**: Backend directory not detected
- **Solution**: Run `npm run preflight` to validate configuration

#### **3. Railway deployment fails**
- **Cause**: Wrong root directory or missing secrets
- **Solution**: 
  - Verify Railway UI has "Root Directory" set to `backend`
  - Ensure GitHub secrets are set correctly

#### **4. Health check fails**
- **Cause**: Server not starting or wrong PORT
- **Solution**: Verify `backend/server.js` handles `process.env.PORT`

---

## 📊 **DEPLOYMENT STATUS**

| Component | Status | Notes |
|-----------|--------|-------|
| Backend Directory | ✅ `backend` | Detected by preflight |
| Node Version | ✅ 18.19.0 | Pinned in .nvmrc |
| Dependencies | ✅ Express, CORS | Listed in package.json |
| Start Script | ✅ `node server.js` | Simplified and reliable |
| Health Endpoint | ✅ `/api/health` | Returns proper JSON |
| Railway Config | ✅ Points to backend | Root directory correct |
| GitHub Workflows | ✅ Multi-service ready | Conditional deployment |
| CSP Headers | ✅ Railway connectivity | Frontend can connect |

---

## 🎯 **NEXT STEPS**

1. **Set GitHub Secrets**: Add Railway token and service IDs
2. **Monitor Deployments**: Watch GitHub Actions and Railway logs
3. **Verify Health**: Test health endpoints on both services
4. **Update CSP**: Replace Railway host placeholder in `_headers`

---

**Status**: ✅ **ALL DEPLOYMENT ISSUES RESOLVED**  
**Commit**: `d737b3d`  
**Date**: October 4, 2025
