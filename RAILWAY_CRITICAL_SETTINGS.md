# 🚨 CRITICAL RAILWAY SETTINGS - DO THIS NOW

## 🎯 **The Core Problem**

Railway is looking for `bootstrap.cjs` in the **ROOT** directory, but it's in the **backend/** directory.

The error "Is a directory (os error 21)" happens because Railway can't find the file.

---

## ✅ **THE FIX - Railway Dashboard Settings**

### **STEP 1: Configure Your Backend Service**

**Go to:** Railway Dashboard → Project → `smartfarm-app-production` (backend service)

**Click:** Settings Tab

### **STEP 2: Set These EXACT Settings**

| Setting | Value |
|---------|-------|
| **Service Name** | `smartfarm-backend` |
| **Root Directory** | `backend` |
| **Build Command** | Leave empty (uses npm run build) |
| **Start Command** | `node bootstrap.cjs` |
| **Healthcheck Path** | `/api/health` |
| **Healthcheck Timeout** | `120` |

### **STEP 3: Environment Variables**

**Click:** Variables Tab

**Add these:**
```
NODE_ENV=production
API_NAME=SmartFarm
API_VERSION=v1
CORS_ORIGIN=https://smartfarm-app.netlify.app,https://web-production-86d39.up.railway.app
```

---

## 🔄 **Alternative: Use Railway CLI** (Recommended)

This is the FASTEST way to fix it:

### **Install Railway CLI:**
```bash
npm i -g @railway/cli
```

### **Login:**
```bash
railway login
```

### **Link to your project:**
```bash
railway link
```

### **Deploy backend:**
```bash
cd backend
railway up
```

---

## 🎯 **Or: Manual Configuration in Web UI**

### **Step-by-Step:**

1. **Go to Railway Dashboard**
   - URL: https://railway.app/dashboard

2. **Select Your Project**
   - Click on your SmartFarm project

3. **Find the Backend Service**
   - Should be called `smartfarm-app-production` or similar

4. **Click Settings**
   - In the left sidebar

5. **Set Root Directory**
   - Find "Root Directory" field
   - Enter: `backend`
   - Click "Save"

6. **Set Start Command**
   - Find "Start Command" field
   - Enter: `node bootstrap.cjs`
   - Click "Save"

7. **Set Health Check**
   - Find "Healthcheck Path" field
   - Enter: `/api/health`
   - Click "Save"

8. **Redeploy**
   - Click "Deployments" in left sidebar
   - Click "Redeploy" button

---

## 🧪 **Verify It's Working**

### **Check Railway Logs:**
```
[inf] Using Nixpacks
[inf] ║ start      │ node bootstrap.cjs ║
[boot] NODE_ENV = production
[boot] Starting SmartFarm Backend...
[server] SmartFarm listening on :PORT
```

### **Test Locally:**
```bash
node scripts\ping.mjs
```

### **Test in Browser:**
Open: `https://web-production-86d39.up.railway.app/api/health`

**Should return:**
```json
{
  "ok": true,
  "service": "SmartFarm",
  "version": "v1"
}
```

---

## 🎯 **WHY THE ROOT DIRECTORY SETTING IS CRITICAL**

### **Without Root Directory = backend:**
```
Project Root (/)
  ├── backend/
  │   ├── bootstrap.cjs  ← File is here
  │   └── server.cjs
  └── public/

Railway runs: node bootstrap.cjs
Railway looks in: /bootstrap.cjs  ❌ NOT FOUND → Error 21
```

### **With Root Directory = backend:**
```
Project Root (/)
  └── backend/  ← Railway starts here
      ├── bootstrap.cjs  ← File is here ✅
      └── server.cjs

Railway runs: node bootstrap.cjs
Railway looks in: /backend/bootstrap.cjs  ✅ FOUND!
```

---

## 🚨 **If Railway Still Fails:**

### **Option 1: Check Railway Service**
Make sure you're configuring the **BACKEND** service, not the web service!

You should have TWO services:
1. `smartfarm-web` (web-production-86d39)
2. `smartfarm-backend` (smartfarm-app-production)

### **Option 2: Delete and Recreate Service**
1. Delete the failing backend service
2. Create new service from GitHub
3. Set repository path: `/backend`
4. Railway will auto-detect `package.json`

### **Option 3: Use Dockerfile**
If Nixpacks keeps failing:
1. Go to Settings
2. Change Builder to "Dockerfile"
3. Set Dockerfile Path: `backend/Dockerfile.backend`
4. Redeploy

---

## 📊 **Expected Deployment Flow**

### **1. Nixpacks Detection:**
```
✅ Detected Node.js project in /backend
✅ Found package.json
✅ Found bootstrap.cjs
✅ Installing dependencies...
```

### **2. Build:**
```
✅ npm ci
✅ npm run build
```

### **3. Start:**
```
✅ node bootstrap.cjs
[boot] Starting SmartFarm Backend...
[server] SmartFarm listening on :3000
```

### **4. Health Check:**
```
✅ GET /api/health → 200 OK
```

---

## 🎯 **Quick Checklist**

Before redeploying, verify:

- [ ] Service is the **backend** service (not web)
- [ ] Root Directory = `backend`
- [ ] Start Command = `node bootstrap.cjs`
- [ ] Healthcheck Path = `/api/health`
- [ ] Environment variables are set
- [ ] Latest code is pushed to GitHub

Then:
- [ ] Click "Redeploy"
- [ ] Watch logs for success messages
- [ ] Test with `node scripts\ping.mjs`

---

## 💡 **Pro Tip**

The `railway.toml` and `nixpacks.toml` files I created will be automatically detected by Railway when the **Root Directory** is set to `backend`. This makes deployment more reliable.

---

## 🚀 **After Successful Deploy**

You should see:
- ✅ Railway logs show server started
- ✅ Health check returns 200 OK
- ✅ Frontend loads main dashboard
- ✅ No more 502 errors

**The key is setting Root Directory = `backend` in Railway!** 🎯
