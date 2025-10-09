# ⚠️ MANUAL RAILWAY DASHBOARD UPDATE REQUIRED

## 🎉 Good News!

✅ **Railway is now using Nixpacks** (no more Dockerfile detection)!  
✅ **Build completes successfully**  
✅ **Container starts**

## ❌ Current Issue

Railway dashboard has a **Custom Start Command** set to `node bootstrap.cjs`, which doesn't exist.

This is overriding our Procfile and railway.toml settings.

## 🔧 Manual Fix Required

### Step 1: Go to Railway Dashboard

1. Open your Railway dashboard: https://railway.app/
2. Navigate to your SmartFarm project
3. Click on your **backend service** (smartfarm-backend)

### Step 2: Update Deploy Settings

1. Click on the **Settings** tab
2. Scroll down to the **Deploy** section
3. Look for **Custom Start Command** or **Start Command** field

### Step 3: Update the Command

**Current (wrong):**
```
node bootstrap.cjs
```

**Change to one of these options:**

**Option 1: Use our correct command (recommended)**
```
node server-simple.cjs
```

**Option 2: Remove the custom start command entirely (also good)**
- Delete the text in the field
- This will let Railway use our Procfile/railway.toml

### Step 4: Save and Redeploy

1. Click **Save** or **Update**
2. Railway should automatically trigger a new deployment
3. If not, click **Deploy** or **Redeploy**

## 📊 What Will Happen

After you update the dashboard setting:

1. ✅ Railway will use Nixpacks builder
2. ✅ Railway will read Procfile: `web: cd backend && node server-simple.cjs`
3. ✅ Server will start from backend directory
4. ✅ server-simple.cjs will run successfully
5. ✅ Health check at /api/health will pass (200 OK)
6. ✅ **Deployment will succeed!**

## 🔍 How to Verify

Watch the Railway deployment logs. You should see:

```
Starting Container
🚀 SmartFarm API server running on port 3000
📊 Environment: production
🔗 Health check: http://localhost:3000/api/health
```

And **NO MORE** errors about `bootstrap.cjs`!

## 🎯 Why This Happened

Railway's command priority:
1. **Dashboard Custom Start Command** ← This is currently wrong
2. Procfile ← We just added this
3. railway.toml startCommand ← We updated this
4. package.json start script ← This was already correct

The dashboard setting (#1) overrides everything else, so we need to fix it manually.

## 📝 Alternative: Use Railway CLI

If you prefer CLI, you can also update this with:

```bash
railway service update --start-command "node server-simple.cjs"
```

Or remove it:
```bash
railway service update --start-command ""
```

---

**Once you update the dashboard, Railway will deploy successfully! 🚀**

