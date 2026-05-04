# 🔧 SmartFarm Deployment Configuration Values

## 📋 **EXACT VALUES TO USE**

### 🔑 **GitHub Secrets**
**URL**: https://github.com/Warusi2023/smartfarm-app/settings/secrets/actions

| Secret Name | Secret Value |
|-------------|--------------|
| `RAILWAY_TOKEN` | [Get from Railway → Account Settings → Tokens] |
| `NETLIFY_AUTH_TOKEN` | [Get from Netlify → User Settings → Applications] |
| `NETLIFY_SITE_ID` | [Get from Netlify → Site Settings → General → Site ID] |
| `NETLIFY_PRODUCTION_URL` | `https://dulcet-sawine-92d6a8.netlify.app` |
| `RAILWAY_PRODUCTION_URL` | `https://web-production-86d39.up.railway.app` |
| `RAILWAY_MIGRATION_TOKEN` | `dc9fd018ef76c1e7065698adecdb551dbe3baa002cdbd4f8ae35a52211e65516` |

### 🚂 **Railway Variables**
**URL**: https://railway.app → Your Project → Variables

| Variable Name | Variable Value |
|---------------|----------------|
| `NODE_ENV` | `production` |
| `JWT_SECRET` | `dc9fd018ef76c1e7065698adecdb551dbe3baa002cdbd4f8ae35a52211e65516` |
| `CORS_ORIGIN` | `https://dulcet-sawine-92d6a8.netlify.app` |
| `LOG_LEVEL` | `info` |
| `DATABASE_URL` | `postgresql://user:password@host:port/database` |
| `OPENWEATHER_API_KEY` | `your_openweather_api_key_here` |
| `FEATURE_GEOFENCING` | `true` |

### 🌐 **Netlify Variables**
**URL**: https://app.netlify.com → Your Site → Environment variables

| Variable Name | Variable Value |
|---------------|----------------|
| `VITE_API_BASE_URL` | `https://web-production-86d39.up.railway.app/api` |
| `VITE_OPENWEATHER_API_KEY` | `your_openweather_api_key_here` |
| `VITE_ENVIRONMENT` | `production` |

## 🚀 **Quick Configuration Steps**

### **Step 1: GitHub Secrets**
1. Go to: https://github.com/Warusi2023/smartfarm-app/settings/secrets/actions
2. Click "New repository secret"
3. Add each secret from the table above
4. Click "Add secret" after each one

### **Step 2: Railway Variables**
1. Go to: https://railway.app → Your Project → Variables
2. Click "New Variable"
3. Add each variable from the table above
4. Click "Add" after each one

### **Step 3: Netlify Variables**
1. Go to: https://app.netlify.com → Your Site → Environment variables
2. Click "Add a variable"
3. Add each variable from the table above
4. Click "Save" after each one

## ✅ **After Configuration**

Run this command to trigger deployment:
```bash
scripts\trigger-deployment-simple.bat
```

## 🔍 **Monitor Deployment**

- **GitHub Actions**: https://github.com/Warusi2023/smartfarm-app/actions
- **Backend Health**: https://web-production-86d39.up.railway.app/api/health
- **Frontend**: https://dulcet-sawine-92d6a8.netlify.app

## 🎯 **Success Criteria**

✅ All GitHub Actions jobs show green checkmarks  
✅ Backend health check returns 200 OK  
✅ Frontend loads without errors  
✅ User can login and access dashboard  

---

**Generated**: ${new Date().toISOString()}
