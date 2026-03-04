# ✅ Netlify Frontend Setup Checklist

**Use this checklist to track your Netlify configuration progress**

---

## 📋 Pre-Setup

- [ ] Netlify account created
- [ ] Signed in to Netlify dashboard
- [ ] GitHub repository access granted

---

## 🚀 Site Setup

### Create Site (If New)
- [ ] Clicked "Add new site" → "Import from GitHub"
- [ ] Selected repository: `Warusi2023/smartfarm-app`
- [ ] Authorized Netlify to access GitHub

### Build Configuration
- [ ] Base directory set to: `web-project`
- [ ] Build command set to: `npm install && npm run build`
- [ ] Publish directory set to: `web-project/dist`
- [ ] Node version set to: `18` or `20`

---

## 🔧 Environment Variables

**Location:** Site settings → Environment variables

- [ ] `VITE_API_URL` = `https://smartfarm-app-production.up.railway.app`
- [ ] `VITE_API_BASE_URL` = `https://smartfarm-app-production.up.railway.app`
- [ ] `VITE_APP_NAME` = `SmartFarm`
- [ ] `VITE_APP_VERSION` = `1.0.0`
- [ ] `NODE_ENV` = `production`

**All 5 variables added:** ☐ Yes  ☐ No

---

## 🚀 Deployment

- [ ] Environment variables set BEFORE first deploy
- [ ] Clicked "Deploy site" or "Trigger deploy"
- [ ] Build completed successfully
- [ ] Site status: "Published"
- [ ] Netlify URL noted: `https://________________.netlify.app`

---

## ✅ Verification

### Browser Testing
- [ ] Site loads correctly
- [ ] No console errors (F12 → Console)
- [ ] API config shows correct backend URL
- [ ] Network tab shows API calls to Railway backend

### API Connection
- [ ] API calls succeed (status 200)
- [ ] No CORS errors (yet - will fix after updating Railway)
- [ ] Registration form works
- [ ] Login form works

---

## 🔗 Next Steps

After Netlify is configured:

- [ ] Update Railway CORS_ORIGINS with Netlify URL
- [ ] Test end-to-end flow
- [ ] Run final verification script

---

## 📝 Notes

**Netlify URL:** _________________________________________________

**Issues Encountered:**
- 
- 
- 

**Date Completed:** _______________

---

## 🎉 Completion

**Netlify Frontend Setup:** ☐ Complete  ☐ In Progress

**Ready for CORS Configuration:** ☐ Yes  ☐ No
