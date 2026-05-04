# 🔑 Railway Environment Variables for CORS Fix

## 🎯 **Required Environment Variables**

Add these to your Railway backend service (`smartfarm-app-production`):

### **Core CORS Configuration**
```
CORS_ORIGINS=https://www.smartfarm-app.com,https://smartfarm-app.netlify.app,https://web-production-86d39.up.railway.app
```

### **Service Configuration**
```
API_NAME=SmartFarm
API_VERSION=v1
NODE_ENV=production
```

### **Optional (if not already set)**
```
PORT=3000
```

---

## 📋 **Step-by-Step Setup**

### **1. Go to Railway Dashboard**
- Visit: https://railway.app/dashboard
- Navigate to your `smartfarm-app-production` service

### **2. Add Environment Variables**
1. Click on your backend service
2. Go to **Variables** tab
3. Click **+ New Variable**
4. Add each variable from the list above

### **3. Variables to Add**

| Variable Name | Value |
|---------------|-------|
| `CORS_ORIGINS` | `https://www.smartfarm-app.com,https://smartfarm-app.netlify.app,https://web-production-86d39.up.railway.app` |
| `API_NAME` | `SmartFarm` |
| `API_VERSION` | `v1` |
| `NODE_ENV` | `production` |

### **4. Deploy Changes**
- Railway will automatically redeploy when you add variables
- Wait for deployment to complete (usually 1-2 minutes)

---

## 🧪 **Testing the Configuration**

### **1. Test Health Endpoint**
Visit: `https://web-production-86d39.up.railway.app/api/health`

Should return:
```json
{
  "ok": true,
  "service": "SmartFarm",
  "version": "v1",
  "ts": 1234567890
}
```

### **2. Test CORS with Browser**
1. Open browser developer tools
2. Go to Console tab
3. Run this JavaScript:
```javascript
fetch('https://web-production-86d39.up.railway.app/api/health', {
  method: 'GET',
  headers: {
    'Origin': 'https://www.smartfarm-app.com'
  }
})
.then(response => {
  console.log('Status:', response.status);
  console.log('CORS Origin:', response.headers.get('Access-Control-Allow-Origin'));
  return response.json();
})
.then(data => console.log('Data:', data))
.catch(error => console.error('Error:', error));
```

### **3. Run CORS Test Script**
```bash
node scripts/test-cors.mjs
```

---

## 🔍 **Expected Results**

### **✅ Success Indicators**
- Health endpoint returns JSON with `ok: true`
- CORS headers include your domain
- No CORS errors in browser console
- Test script shows all tests passed

### **❌ Common Issues**
- **502 Bad Gateway**: Service not running
- **CORS errors**: Wrong origins in CORS_ORIGINS
- **404 Not Found**: Wrong API URL

---

## 🚨 **Troubleshooting**

### **If CORS still fails:**
1. **Check Railway logs**: Look for CORS configuration messages
2. **Verify origins**: Make sure URLs match exactly (no trailing slashes)
3. **Test with curl**:
   ```bash
   curl -H "Origin: https://www.smartfarm-app.com" \
        -H "Access-Control-Request-Method: GET" \
        -X OPTIONS \
        https://web-production-86d39.up.railway.app/api/health
   ```

### **If 502 errors persist:**
1. **Check service status**: Ensure backend is running
2. **Check logs**: Look for startup errors
3. **Restart service**: Force a new deployment

---

## 📊 **Current Configuration**

Your backend should now:
- ✅ Allow requests from `https://www.smartfarm-app.com`
- ✅ Allow requests from `https://smartfarm-app.netlify.app`
- ✅ Allow requests from `https://web-production-86d39.up.railway.app`
- ✅ Handle preflight (OPTIONS) requests correctly
- ✅ Return proper CORS headers
- ✅ Provide health endpoint for monitoring

---

## 🎯 **Next Steps**

After setting up environment variables:
1. ✅ Test the health endpoint
2. ✅ Run the CORS test script
3. ✅ Test your frontend application
4. ✅ Verify no CORS errors in browser console

**Your CORS configuration should now be working perfectly!** 🚀
