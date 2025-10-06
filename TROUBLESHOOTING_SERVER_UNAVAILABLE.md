# Troubleshooting "Server Temporarily Unavailable" Error

## 🚨 **Immediate Steps to Fix**

### **Step 1: Check Railway Service Status**

1. **Go to Railway Dashboard:**
   - Visit [railway.app](https://railway.app)
   - Navigate to your `smartfarm-app-production` service
   - Check the **Deployments** tab

2. **Look for Issues:**
   - ❌ **Red status** = Service failed to start
   - ⚠️ **Yellow status** = Service is starting/restarting
   - ✅ **Green status** = Service is running

### **Step 2: Check Service Logs**

1. **Click on your service** in Railway dashboard
2. **Go to "Logs" tab**
3. **Look for error messages:**
   - Missing environment variables
   - Port binding issues
   - API key errors
   - Database connection problems

### **Step 3: Common Fixes**

#### **Fix 1: Missing Environment Variables**
If logs show missing variables:
```
Error: Google API key not configured
Error: OpenWeather API key not configured
```

**Solution:**
- Go to **Variables** tab
- Add missing environment variables
- Redeploy the service

#### **Fix 2: Port Issues**
If logs show port errors:
```
Error: listen EADDRINUSE :::3000
```

**Solution:**
- Railway sets `PORT` automatically
- Don't override the `PORT` variable
- Remove any custom `PORT` settings

#### **Fix 3: Service Not Starting**
If service keeps restarting:
- Check that all required dependencies are installed
- Verify the start command is correct
- Check for syntax errors in the code

### **Step 4: Force Redeploy**

1. **Go to Deployments tab**
2. **Click "Redeploy"** or **"Deploy"**
3. **Monitor the build process**
4. **Check logs for any new errors**

## 🔧 **Quick Diagnostic Commands**

### **Test Your Backend API:**
```bash
# Test if the API is responding
curl https://smartfarm-app-production.up.railway.app/api/health

# Expected response:
# {"ok": true, "service": "SmartFarm Backend", "timestamp": "...", "version": "1.0.0"}
```

### **Check Service Status:**
```bash
# Check if the service is reachable
ping smartfarm-app-production.up.railway.app
```

## 📋 **Environment Variables Checklist**

Make sure these are set in Railway:

### **Essential Variables:**
- [ ] `NODE_ENV=production`
- [ ] `CI=1`
- [ ] `HUSKY=0`
- [ ] `CORS_ORIGIN=https://web-production-86d39.up.railway.app`

### **API Keys (if using those features):**
- [ ] `GOOGLE_API_KEY=your-key`
- [ ] `OPENWEATHER_API_KEY=your-key`
- [ ] `FIREBASE_PROJECT_ID=your-project-id`

## 🚨 **Emergency Fixes**

### **Fix 1: Restart Service**
1. Go to Railway dashboard
2. Click on your service
3. Go to **Settings** → **General**
4. Click **Restart Service**

### **Fix 2: Rollback to Previous Version**
1. Go to **Deployments** tab
2. Find a working deployment
3. Click **Redeploy** on that version

### **Fix 3: Check Resource Limits**
1. Go to **Settings** → **Resources**
2. Check if you've hit memory/CPU limits
3. Upgrade plan if needed

## 📊 **Monitoring Your Service**

### **Health Check Endpoint:**
- **URL**: `https://smartfarm-app-production.up.railway.app/api/health`
- **Expected**: `{"ok": true, "service": "SmartFarm Backend"}`
- **If 404**: Service not running
- **If 500**: Service error

### **Railway Metrics:**
- Check **Metrics** tab for:
  - CPU usage
  - Memory usage
  - Request count
  - Error rate

## 🆘 **If Still Not Working**

### **Check These Common Issues:**

1. **Wrong Start Command:**
   - Should be: `npm run start`
   - Check **Settings** → **Deploy**

2. **Missing Dependencies:**
   - Check that `package.json` has all required dependencies
   - Verify `npm install` completes successfully

3. **Code Errors:**
   - Check logs for JavaScript errors
   - Verify all imports are correct
   - Check for syntax errors

4. **Environment Issues:**
   - Verify all environment variables are set
   - Check for typos in variable names
   - Ensure values are correct

### **Get Help:**
1. **Railway Support**: Check Railway documentation
2. **Community**: Railway Discord or forums
3. **Logs**: Share error logs (without API keys) for help

## ✅ **Success Indicators**

Your service is working when:
- ✅ Railway shows green status
- ✅ Health check returns `{"ok": true}`
- ✅ No errors in logs
- ✅ Frontend can connect to API
- ✅ All features work properly
