# ⚡ Phase 2 Quick Start Guide

**Get started with Phase 2 testing in 10 minutes**

---

## 🚀 Quick Steps

### Step 1: Run Automated Tests (2 minutes)

```powershell
# Set your URLs
$env:FRONTEND_URL="https://your-site.netlify.app"
$env:BACKEND_URL="https://smartfarm-app-production.up.railway.app"

# Run tests
node scripts/run-phase2-tests.js
```

**Expected:** Most tests should pass ✅

---

### Step 2: Manual Core Testing (30 minutes)

**Test These Core Features:**

1. **User Registration**
   - Visit frontend → Register → Verify user created

2. **User Login**
   - Login with created user → Verify session works

3. **Protected Routes**
   - Access dashboard while logged in → Should work
   - Logout → Try accessing dashboard → Should redirect to login

4. **Farm Management**
   - Create a farm → Verify it saves
   - Refresh page → Verify farm still exists

5. **Data Persistence**
   - Create data → Refresh page → Verify data persists

---

### Step 3: Browser Testing (15 minutes)

**Test in:**
- Chrome/Edge
- Firefox
- Mobile browser (if available)

**Check:**
- Site loads
- Features work
- No console errors

---

### Step 4: Performance Check (10 minutes)

**Run Lighthouse:**
1. Open Chrome DevTools (F12)
2. Go to Lighthouse tab
3. Run audit
4. Check scores (aim for 80+)

---

### Step 5: Security Check (10 minutes)

**Verify:**
- Protected routes require login
- CORS configured correctly
- Forms validate input
- No sensitive data in console

---

## ✅ Quick Checklist

- [ ] Automated tests run successfully
- [ ] User registration works
- [ ] User login works
- [ ] Protected routes work
- [ ] Data persists after refresh
- [ ] Site works in Chrome
- [ ] Site works in Firefox
- [ ] No critical console errors
- [ ] Performance acceptable

---

## 📚 Detailed Guides

- **PHASE2_TESTING_QA_GUIDE.md** - Complete testing guide
- **PHASE2_TESTING_CHECKLIST.md** - Detailed checklist
- **PHASE2_STATUS.md** - Current test results

---

## 🎯 Success Criteria

Phase 2 is complete when:
- ✅ Core features work correctly
- ✅ Site works in major browsers
- ✅ Performance is acceptable
- ✅ No critical bugs

---

**Start with Step 1: Run automated tests!** 🧪
