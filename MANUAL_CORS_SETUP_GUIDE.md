# 🔧 Manual CORS Configuration Guide

## Step-by-Step Instructions for Railway & Netlify

---

## 🚂 **PART 1: Railway Backend CORS Setup**

### **Step 1: Log into Railway**
1. Go to https://railway.app
2. Log in with your account
3. Find your **`smartfarm-app-production`** service (Backend API)

### **Step 2: Open Variables Settings**
1. Click on your **Backend service** (smartfarm-app-production)
2. Click on the **"Variables"** tab at the top
3. You should see existing variables like `CI`, `HUSKY`, etc.

### **Step 3: Add CORS_ORIGIN Variable**
1. Click **"+ New Variable"** button
2. In the **Variable Name** field, type:
   ```
   CORS_ORIGIN
   ```

3. In the **Value** field, type:
   ```
   https://smartfarm-app.netlify.app,https://web-production-86d39.up.railway.app
   ```
   
   **⚠️ IMPORTANT:** 
   - Replace `smartfarm-app.netlify.app` with your actual Netlify domain if different
   - No spaces after the comma
   - Include both domains for flexibility

4. Click **"Add"** or **"Save"**

### **Step 4: Redeploy Backend**
1. After adding the variable, Railway will automatically trigger a redeploy
2. Or you can click **"Deploy"** manually
3. Wait for the deployment to complete (watch the logs)

---

## 🌐 **PART 2: Railway Web Service CORS Setup**

### **Step 1: Open Web Service**
1. In Railway dashboard, find your **Web Service** (`web-production-86d39`)
2. Click on it to open

### **Step 2: Add/Update CORS_ORIGINS Variable**
1. Click on the **"Variables"** tab
2. Look for `CORS_ORIGINS` variable (if it exists, update it; if not, create it)

3. If **creating new**:
   - Click **"+ New Variable"**
   - Variable Name: `CORS_ORIGINS`
   - Value: `https://smartfarm-app.netlify.app,https://web-production-86d39.up.railway.app`
   - Click **"Add"**

4. If **updating existing**:
   - Click on the `CORS_ORIGINS` variable
   - Update the value to: `https://smartfarm-app.netlify.app,https://web-production-86d39.up.railway.app`
   - Click **"Update"**

### **Step 3: Redeploy Web Service**
1. Wait for automatic redeploy
2. Or click **"Deploy"** manually

---

## 📦 **PART 3: Netlify CORS Setup** (Optional but Recommended)

### **Step 1: Log into Netlify**
1. Go to https://app.netlify.com
2. Log in with your account
3. Find your SmartFarm site

### **Step 2: Find Your Netlify Domain**
1. On your site dashboard, look for the domain name
2. It will look like: `smartfarm-app.netlify.app` or `your-site-name.netlify.app`
3. **Copy this domain** - you'll need it for Railway!

### **Step 3: Configure Environment Variables**
1. Click on **"Site settings"**
2. In the left sidebar, click **"Environment variables"** (or "Build & deploy" → "Environment")
3. Click **"Add a variable"** or **"Edit variables"**

4. Add these variables:
   - **Variable 1:**
     - Key: `VITE_API_URL`
     - Value: `https://smartfarm-app-production.up.railway.app`
   
   - **Variable 2:**
     - Key: `NODE_VERSION`
     - Value: `18`
   
   - **Variable 3:**
     - Key: `CI`
     - Value: `true`

5. Click **"Save"**

### **Step 4: Redeploy Netlify Site**
1. Go to **"Deploys"** tab
2. Click **"Trigger deploy"** → **"Clear cache and deploy site"**
3. Wait for deployment to complete

---

## 🔍 **PART 4: Verify Your Netlify Domain**

### **Option A: From Netlify Dashboard**
1. In your Netlify site, look at the top
2. You'll see: **"https://your-site-name.netlify.app"**
3. This is your domain!

### **Option B: From Site Settings**
1. Click **"Site settings"**
2. Look for **"Site information"**
3. Find **"Site name"** - it shows: `your-site-name.netlify.app`

### **Option C: From Domain Management**
1. Click **"Domain settings"** or **"Domain management"**
2. You'll see all domains (Netlify default + custom domains)
3. The default is: `https://your-site-name.netlify.app`

---

## ✅ **PART 5: Update Railway with Correct Netlify Domain**

Once you know your Netlify domain:

### **If Your Domain is Different:**
1. Go back to **Railway Backend**
2. Click **"Variables"**
3. Update `CORS_ORIGIN` to include your actual domain:
   ```
   https://your-actual-domain.netlify.app,https://web-production-86d39.up.railway.app
   ```

4. Save and redeploy

---

## 🧪 **PART 6: Test the Configuration**

### **Test 1: Check Backend is Running**
1. Open a new browser tab
2. Go to: `https://smartfarm-app-production.up.railway.app/api/health`
3. You should see JSON response (not a 502 error)

### **Test 2: Test from Netlify Site**
1. Open your Netlify site
2. Open browser console (F12 → Console tab)
3. Paste this code:
   ```javascript
   fetch('https://smartfarm-app-production.up.railway.app/api/health')
     .then(r => r.json())
     .then(data => console.log('✅ CORS Working!', data))
     .catch(err => console.error('❌ CORS Blocked!', err))
   ```
4. Press Enter
5. If you see "✅ CORS Working!" - it's fixed!
6. If you see "❌ CORS Blocked!" - check your domain names

### **Test 3: Check Dashboard**
1. Open your Netlify site
2. Go to the dashboard page
3. You should see the **main dashboard**, not the fallback
4. Data should load correctly

---

## 📋 **Quick Reference: Variable Values**

### **Railway Backend Variables:**
```
CORS_ORIGIN = https://your-netlify-domain.netlify.app,https://web-production-86d39.up.railway.app
CI = 1
HUSKY = 0
NODE_ENV = production
```

### **Railway Web Variables:**
```
CORS_ORIGINS = https://your-netlify-domain.netlify.app,https://web-production-86d39.up.railway.app
NODE_ENV = production
PORT = 3000
CI = 1
HUSKY = 0
```

### **Netlify Environment Variables:**
```
VITE_API_URL = https://smartfarm-app-production.up.railway.app
NODE_VERSION = 18
CI = true
HUSKY = 0
```

---

## 🚨 **Common Issues & Solutions**

### **Issue 1: Still Getting 502 Errors**
**Solution:**
- Your Railway backend is not running
- Check Railway backend logs for errors
- Click "Restart" on the backend service

### **Issue 2: CORS Still Blocked**
**Solution:**
- Double-check the domain names match **exactly**
- No trailing slashes: ❌ `https://domain.com/` ✅ `https://domain.com`
- No spaces in the comma-separated list
- Make sure you redeployed after changes

### **Issue 3: Can't Find Netlify Domain**
**Solution:**
- It's at the top of your Netlify dashboard
- Or in Site Settings → Site information
- Format is always: `https://site-name.netlify.app`

### **Issue 4: Changes Not Taking Effect**
**Solution:**
- Make sure you **saved** the variables
- Make sure Railway **redeployed** (check deploy logs)
- Make sure Netlify **redeployed** (check deploy status)
- Clear browser cache (Ctrl+F5)

---

## ✅ **Checklist**

- [ ] Found my Netlify domain name
- [ ] Added CORS_ORIGIN to Railway Backend
- [ ] Added CORS_ORIGINS to Railway Web (or updated it)
- [ ] Added VITE_API_URL to Netlify
- [ ] Redeployed Railway Backend
- [ ] Redeployed Railway Web
- [ ] Redeployed Netlify
- [ ] Tested backend health endpoint (no 502 error)
- [ ] Tested CORS from browser console
- [ ] Dashboard loads without fallback mode

---

## 📞 **If You Need Help**

**Provide these details:**
1. Your Netlify domain: `https://______.netlify.app`
2. Railway backend URL: `https://smartfarm-app-production.up.railway.app`
3. What error you're seeing (screenshot helps!)
4. Browser console errors (F12 → Console)

**Remember:** The #1 issue right now is that your Railway backend is returning 502 errors, which means it's not running. Fix that first, then CORS!

