# Railway Web Component - Minimal Configuration Setup

## 🚨 **IMMEDIATE FIX - Copy These Variables to Railway**

### **Step 1: Go to Railway Dashboard**
1. Open Railway Dashboard
2. Navigate to your project
3. Click on **"web"** component
4. Go to **"Variables"** tab

### **Step 2: Add These 6 Essential Variables**

#### **Method A: Individual Variables (Recommended)**
Click **"+ New Variable"** and add each one:

```
NODE_ENV = production
PORT = 3000
LOG_LEVEL = info
VITE_API_URL = https://smartfarm-backend.railway.app
VITE_API_BASE_URL = https://smartfarm-backend.railway.app
NEXT_PUBLIC_API_BASE_URL = https://smartfarm-backend.railway.app
```

#### **Method B: Raw Editor (Faster)**
1. Click **"{ } Raw Editor"** button
2. Delete any existing content
3. Copy and paste this JSON:

```json
{
  "NODE_ENV": "production",
  "PORT": "3000",
  "LOG_LEVEL": "info",
  "VITE_API_URL": "https://smartfarm-backend.railway.app",
  "VITE_API_BASE_URL": "https://smartfarm-backend.railway.app",
  "NEXT_PUBLIC_API_BASE_URL": "https://smartfarm-backend.railway.app"
}
```

4. Click **"Save"**

### **Step 3: Watch the Deployment**
- Railway will automatically redeploy your web component
- Status should change: **"Failed"** → **"Building"** → **"Deployed"**
- Green checkmark should appear

## 🎯 **Why These Variables?**

### **Essential for Basic Operation:**
- `NODE_ENV=production` - Tells Node.js this is production mode
- `PORT=3000` - Port for the web server to listen on
- `LOG_LEVEL=info` - Logging level for debugging

### **API Connection:**
- `VITE_API_URL` - Where your web component connects to smartfarm-app
- `VITE_API_BASE_URL` - Backup API URL configuration
- `NEXT_PUBLIC_API_BASE_URL` - Another backup for API connections

## 🔧 **Optional Variables (Add Later if Needed)**

### **For Weather Features:**
```
VITE_OPENWEATHER_API_KEY = your_openweathermap_api_key
```

### **For Maps Features:**
```
VITE_MAPS_API_KEY = your_google_maps_api_key
```

### **For Full Authentication:**
```
JWT_SECRET = your_jwt_secret
SESSION_SECRET = your_session_secret
```

## ✅ **Expected Results**

After adding the 6 essential variables:
1. ✅ Web component status changes from "Failed" to "Deployed"
2. ✅ Green checkmark appears
3. ✅ Web URL becomes accessible
4. ✅ No more red "Failed" status

## 🚨 **If Still Failing**

1. Check the **"Deployments"** tab for error logs
2. Look for specific error messages
3. Common issues:
   - Port conflicts (make sure PORT=3000)
   - Missing dependencies (should be handled automatically)
   - Build errors (check deployment logs)

## 📞 **Need Help?**

If the web component still fails after adding these variables:
1. Check the deployment logs in Railway
2. Look for specific error messages
3. The logs will tell us exactly what's wrong
