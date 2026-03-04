# ✅ Quick Verification Checklist

**Use this checklist while verifying your environment**

---

## 🔴 RAILWAY BACKEND

### Environment Variables
- [ ] `DATABASE_URL` exists
- [ ] `JWT_SECRET` exists (32+ chars)
- [ ] `CORS_ORIGINS` includes frontend URL
- [ ] `NODE_ENV=production`
- [ ] `PORT=3000`
- [ ] `API_NAME=SmartFarm`
- [ ] `API_VERSION=v1`
- [ ] `WEATHER_API_KEY` (optional)

### Service Status
- [ ] Backend service: Running
- [ ] PostgreSQL service: Running
- [ ] Database connection: Confirmed in logs

### Notes:
```
DATABASE_URL: [ ] Found  [ ] Missing
JWT_SECRET: [ ] Found  [ ] Missing  
CORS_ORIGINS: [ ] Found  [ ] Missing
Database Logs: [ ] Connected  [ ] Errors
```

---

## 🌐 NETLIFY FRONTEND

### Environment Variables
- [ ] `VITE_API_URL` set correctly
- [ ] `VITE_APP_NAME=SmartFarm`
- [ ] `VITE_APP_VERSION=1.0.0`

### Deployment Status
- [ ] Site deployed: Published
- [ ] Build settings correct
- [ ] Netlify URL noted: `https://________________.netlify.app`

### Notes:
```
VITE_API_URL: [ ] Set  [ ] Missing
Site URL: ________________________________
```

---

## 🔗 CORS CONFIGURATION

- [ ] `CORS_ORIGINS` includes Netlify URL
- [ ] Format correct (no spaces, no trailing slashes)
- [ ] Backend redeployed after CORS change
- [ ] No CORS errors in browser console

### Notes:
```
CORS_ORIGINS Value: ________________________________
CORS Errors: [ ] None  [ ] Present
```

---

## ✅ TESTING

- [ ] Backend health endpoint works
- [ ] Frontend loads correctly
- [ ] User registration works
- [ ] User login works
- [ ] No console errors
- [ ] API calls succeed

---

## 📊 VERIFICATION SUMMARY

**Railway Variables:** ___/7 set  
**Netlify Variables:** ___/3 set  
**CORS Configured:** [ ] Yes  [ ] No  
**All Tests Pass:** [ ] Yes  [ ] No  

**Status:** [ ] ✅ Complete  [ ] ⚠️ Needs Work

---

**Date Verified:** _______________
