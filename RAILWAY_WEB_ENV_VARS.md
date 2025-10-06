# Railway Web Production Environment Variables

## 🚀 **Required Environment Variables for web-production-86d39.up.railway.app**

### **Core Application Variables**

| Variable | Value | Description |
|----------|-------|-------------|
| `VITE_API_URL` | `https://smartfarm-app-production.up.railway.app/api` | Backend API URL for frontend to connect to |
| `APP_BUILD_TAG` | `railway` | Build identifier for tracking deployments |

### **CI/CD Configuration Variables**

| Variable | Value | Description |
|----------|-------|-------------|
| `CI` | `1` | Enables CI mode, disables Husky hooks |
| `HUSKY` | `0` | Disables Husky Git hooks in CI environment |
| `NODE_ENV` | `production` | Sets Node.js environment to production |

### **Railway-Specific Variables**

| Variable | Value | Description |
|----------|-------|-------------|
| `PORT` | `8080` | Port for the web server (Railway sets this automatically) |
| `RAILWAY_ENVIRONMENT` | `production` | Railway environment identifier |

### **Optional Development Variables**

| Variable | Value | Description |
|----------|-------|-------------|
| `NEXT_PUBLIC_API_URL` | `https://smartfarm-app-production.up.railway.app/api` | Alternative API URL (for compatibility) |
| `REACT_APP_API_URL` | `https://smartfarm-app-production.up.railway.app/api` | Alternative API URL (for compatibility) |

## 📋 **How to Add These Variables in Railway**

### **Step 1: Access Railway Dashboard**
1. Go to [railway.app](https://railway.app)
2. Navigate to your `web-production-86d39` service
3. Click on the service name

### **Step 2: Add Environment Variables**
1. Go to **Variables** tab
2. Click **+ New Variable** for each variable
3. Add the variables listed above

### **Step 3: Verify Configuration**
1. Check that all variables are set correctly
2. Redeploy the service to apply changes
3. Monitor the deployment logs

## 🔧 **Quick Copy-Paste Commands**

### **Essential Variables (Minimum Required):**
```
VITE_API_URL=https://smartfarm-app-production.up.railway.app/api
APP_BUILD_TAG=railway
CI=1
HUSKY=0
NODE_ENV=production
```

### **Complete Configuration (Recommended):**
```
VITE_API_URL=https://smartfarm-app-production.up.railway.app/api
APP_BUILD_TAG=railway
CI=1
HUSKY=0
NODE_ENV=production
NEXT_PUBLIC_API_URL=https://smartfarm-app-production.up.railway.app/api
REACT_APP_API_URL=https://smartfarm-app-production.up.railway.app/api
```

## ⚠️ **Important Notes**

1. **API URL**: Make sure `VITE_API_URL` points to your actual backend API
2. **CI Variables**: `CI=1` and `HUSKY=0` are essential for proper builds
3. **Port**: Railway automatically sets `PORT`, don't override it
4. **Environment**: Always use `NODE_ENV=production` for production deployments

## 🧪 **Testing After Setup**

1. **Deploy**: Trigger a new deployment after adding variables
2. **Check Logs**: Verify no errors in build logs
3. **Test App**: Visit your Railway URL and check:
   - Application loads completely
   - API URL is displayed correctly
   - No console errors
   - All static files load properly

## 🚨 **Troubleshooting**

### **If App Shows "API call failed":**
- Check that `VITE_API_URL` is correct
- Verify your backend API is running and accessible
- Check CORS settings on your backend

### **If Build Fails:**
- Ensure `CI=1` and `HUSKY=0` are set
- Check that all required variables are present
- Review build logs for specific errors

### **If Static Files Don't Load:**
- Verify the build completed successfully
- Check that the correct publish directory is set
- Ensure all assets are in the `public/` directory
