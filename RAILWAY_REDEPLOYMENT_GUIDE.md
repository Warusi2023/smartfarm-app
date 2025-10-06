# Railway Redeployment Guide - SmartFarm Web

## 🚀 **Step 1: Redeploy on Railway**

### **Option A: Automatic Redeploy (Recommended)**
1. **Go to Railway Dashboard:**
   - Visit [railway.app](https://railway.app)
   - Navigate to your SmartFarm web project

2. **Trigger Redeploy:**
   - Go to **Deployments** tab
   - Click **Deploy** or **Redeploy** button
   - Railway will automatically use the new Dockerfile from the latest commit

### **Option B: Manual Redeploy**
1. **Force Redeploy:**
   - Go to **Settings** → **Deploy**
   - Click **Redeploy** to force a fresh build
   - This ensures the new Dockerfile is used

## 📊 **Step 2: Monitor Build Logs**

### **What to Look For:**

#### **✅ Success Indicators:**
```
✓ Building web-project dependencies
✓ Installing husky@9 as dev dependency
✓ Running guarded prepare script (should exit early)
✓ Building with Vite (no Husky interference)
✓ Copying static files to dist/
✓ Starting serve on port 8080
```

#### **❌ Error Indicators to Watch:**
```
✗ Husky prepare script running (should be skipped)
✗ Lifecycle script execution errors
✗ npm install with scripts enabled
✗ Docker build failures
✗ Port binding issues
```

### **Expected Build Process:**
1. **Base Image:** Node 20 Alpine
2. **Dependencies:** Install with `--ignore-scripts`
3. **Build:** Vite build with environment variables
4. **Runtime:** Serve static files from `dist/`

## 🧪 **Step 3: Test Deployed Application**

### **Health Checks:**
1. **Application Loads:**
   - Visit your Railway URL
   - Should see SmartFarm application (not just API status)

2. **Static Files Served:**
   - Check browser dev tools → Network tab
   - Verify CSS, JS, and images load correctly
   - No 404 errors for static assets

3. **Environment Variables:**
   - Check that API URL is correctly displayed
   - Verify build tag shows "railway"

### **Expected Behavior:**
- ✅ **Full SmartFarm application** loads (not minimal API status)
- ✅ **All static assets** (CSS, JS, images) load correctly
- ✅ **Environment variables** are properly injected
- ✅ **No console errors** related to missing files
- ✅ **Responsive design** works on different screen sizes

## 🔍 **Step 4: Verify Static Files**

### **File Structure Check:**
```
dist/
├── index.html
├── assets/
│   ├── index-[hash].js
│   └── index-[hash].css
├── images/
│   └── logo/
└── css/
    └── dashboard.css
```

### **Network Requests Check:**
- All static files should return **200 OK**
- No **404 Not Found** errors
- Proper **Content-Type** headers
- **Cache-Control** headers for assets

## 🚨 **Troubleshooting**

### **If Build Fails:**
1. **Check Railway Logs:**
   - Look for specific error messages
   - Verify Dockerfile syntax
   - Check environment variables

2. **Common Issues:**
   - **Husky still running:** Check HUSKY=0 is set
   - **Lifecycle scripts:** Verify --ignore-scripts flag
   - **Missing files:** Check COPY commands in Dockerfile
   - **Port issues:** Verify PORT=8080 is set

### **If App Doesn't Load:**
1. **Check URL:** Ensure you're using the correct Railway URL
2. **Check Console:** Look for JavaScript errors
3. **Check Network:** Verify static files are loading
4. **Check Environment:** Ensure VITE_API_URL is set

## 📋 **Success Checklist**

- [ ] **Railway build completes successfully**
- [ ] **No Husky or lifecycle script errors in logs**
- [ ] **Application loads with full SmartFarm interface**
- [ ] **Static files (CSS, JS, images) load correctly**
- [ ] **Environment variables are properly injected**
- [ ] **No 404 errors in browser console**
- [ ] **Application is responsive and functional**

## 🎯 **Expected Outcome**

After successful redeployment:
- **Railway builds will complete** without Husky interference
- **Full SmartFarm application** will be served (not just API status)
- **Static files will load** correctly from the `dist/` directory
- **Environment variables** will be properly configured
- **Application will be production-ready** and fully functional

## 📞 **Next Steps**

Once deployment is successful:
1. **Test all major features** of the SmartFarm application
2. **Verify API connectivity** (if backend is deployed)
3. **Check performance** and loading times
4. **Document any issues** found during testing
5. **Consider setting up monitoring** for production use
