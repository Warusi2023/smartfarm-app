# ⚡ CORS Quick Setup Checklist

## 🎯 Your Mission: Fix CORS Between Netlify & Railway

---

## 📝 **Step-by-Step Checklist**

### **🚂 Railway Backend** (`smartfarm-app-production`)

**Go to:** https://railway.app → Your Backend Service → Variables tab

**Add this variable:**
```
Variable Name:  CORS_ORIGIN
Variable Value: https://smartfarm-app.netlify.app,https://web-production-86d39.up.railway.app
```

✅ Click "Add" or "Save"  
✅ Wait for automatic redeploy  
✅ Check logs for "Deploy successful"

---

### **🚂 Railway Web Service** (`web-production-86d39`)

**Go to:** https://railway.app → Your Web Service → Variables tab

**Add/Update this variable:**
```
Variable Name:  CORS_ORIGINS
Variable Value: https://smartfarm-app.netlify.app,https://web-production-86d39.up.railway.app
```

✅ Click "Add" or "Update"  
✅ Wait for automatic redeploy  
✅ Check logs for "Deploy successful"

---

### **🌐 Netlify** (Your SmartFarm Site)

**Go to:** https://app.netlify.com → Your Site → Site Settings → Environment Variables

**Add these variables:**

**Variable 1:**
```
Key:   VITE_API_URL
Value: https://web-production-86d39.up.railway.app
```

**Variable 2:**
```
Key:   NODE_VERSION
Value: 18
```

**Variable 3:**
```
Key:   CI
Value: true
```

✅ Click "Save"  
✅ Go to "Deploys" tab  
✅ Click "Trigger deploy" → "Clear cache and deploy site"  
✅ Wait for "Published" status

---

## 🧪 **Test Everything**

### **Test 1: Backend Health (Should NOT be 502)**
Open in browser:
```
https://web-production-86d39.up.railway.app/api/health
```
✅ Should see JSON, NOT "502 - Application failed to respond"

### **Test 2: CORS from Browser Console**
1. Open your Netlify site
2. Press F12 → Console tab
3. Paste this:
```javascript
fetch('https://web-production-86d39.up.railway.app/api/health')
  .then(r => r.json())
  .then(data => console.log('✅ SUCCESS:', data))
  .catch(err => console.error('❌ FAILED:', err))
```
4. Press Enter
✅ Should see "✅ SUCCESS:" with data

### **Test 3: Dashboard**
1. Open your Netlify site dashboard page
2. ✅ Should see MAIN dashboard (not fallback)
3. ✅ Data should load
4. ✅ No "Server temporarily unavailable" message

---

## ⚠️ **If Tests Fail**

### **502 Error on Backend Health?**
→ Railway backend is DOWN  
→ Check Railway backend logs  
→ Click "Restart" on backend service  
→ Look for startup errors

### **CORS Error in Console?**
→ Domain names don't match  
→ Check you used the EXACT Netlify domain  
→ No trailing slashes  
→ No spaces in comma-separated list  
→ Redeploy both Railway services

### **Still Seeing Fallback Dashboard?**
→ Backend might be down (check Test 1)  
→ CORS might be wrong (check Test 2)  
→ Clear browser cache (Ctrl+F5)  
→ Check browser console for errors

---

## 🔍 **Find Your Netlify Domain**

**Look at the top of your Netlify dashboard:**
- You'll see something like: `https://smartfarm-app.netlify.app`
- Or: `https://your-site-name.netlify.app`
- **Use THAT domain** in the Railway CORS settings!

**Common formats:**
- `https://smartfarm-app.netlify.app`
- `https://smartfarm-dashboard.netlify.app`
- `https://your-custom-name.netlify.app`

---

## 📋 **Copy-Paste Values**

### **For Railway Backend CORS_ORIGIN:**
```
https://smartfarm-app.netlify.app,https://web-production-86d39.up.railway.app
```
(Replace `smartfarm-app.netlify.app` with your actual domain if different)

### **For Railway Web CORS_ORIGINS:**
```
https://smartfarm-app.netlify.app,https://web-production-86d39.up.railway.app
```
(Replace `smartfarm-app.netlify.app` with your actual domain if different)

### **For Netlify VITE_API_URL:**
```
https://web-production-86d39.up.railway.app
```

---

## ✅ **Success Indicators**

You know it's working when:
- ✅ Backend health returns JSON (not 502)
- ✅ Console test shows "✅ SUCCESS"
- ✅ Main dashboard loads (not fallback)
- ✅ Data loads in dashboard
- ✅ No red error banners

---

## 🎯 **Priority Order**

1. **FIRST:** Fix Railway backend 502 errors
2. **SECOND:** Configure CORS on Railway backend
3. **THIRD:** Configure CORS on Railway web
4. **FOURTH:** Configure Netlify environment variables
5. **FIFTH:** Test everything

**The 502 error is the #1 priority - nothing else matters if backend is down!**

