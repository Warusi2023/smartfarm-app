# ⚡ Quick Monitoring Setup

**Fast setup guide - 15 minutes**

---

## 🔴 Sentry (Error Tracking) - 10 min

### 1. Create Account
- Go to: https://sentry.io/signup/
- Create project: "SmartFarm" (Node.js)

### 2. Get DSN
- Copy DSN from project settings
- Format: `https://[key]@[org].ingest.sentry.io/[id]`

### 3. Backend Setup
```powershell
cd backend
npm install @sentry/node @sentry/profiling-node
```

**Add to Railway Variables:**
- `SENTRY_DSN` = (your DSN)

### 4. Frontend Setup
```powershell
cd web-project
npm install @sentry/react
```

**Add to Netlify Variables:**
- `VITE_SENTRY_DSN` = (your DSN)

### 5. Configure Code
- See `MONITORING_SETUP_GUIDE.md` for code snippets
- Or use: `scripts/setup-sentry.js` (if available)

---

## 🟢 UptimeRobot (Uptime Monitoring) - 5 min

### 1. Create Account
- Go to: https://uptimerobot.com/signup/

### 2. Add Backend Monitor
```
Type: HTTP(s)
Name: SmartFarm Backend
URL: https://smartfarm-app-production.up.railway.app/api/health
Interval: 5 minutes
```

### 3. Add Frontend Monitor
```
Type: HTTP(s)
Name: SmartFarm Frontend
URL: https://your-site.netlify.app
Interval: 5 minutes
```

### 4. Configure Alerts
- My Settings → Alert Contacts
- Add your email
- Select monitors to alert

---

## ✅ Quick Checklist

**Sentry:**
- [ ] Account created
- [ ] DSN copied
- [ ] Backend SDK installed
- [ ] Frontend SDK installed
- [ ] DSN added to Railway
- [ ] DSN added to Netlify
- [ ] Code configured

**UptimeRobot:**
- [ ] Account created
- [ ] Backend monitor added
- [ ] Frontend monitor added
- [ ] Alerts configured

**Total Time:** ~15 minutes

---

**For detailed instructions, see `MONITORING_SETUP_GUIDE.md`**
