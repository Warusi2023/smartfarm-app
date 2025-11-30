# Feature 1 Deployment Checklist - Quick Reference

## ✅ Pre-Deployment

- [x] Code committed to `main` branch
- [x] All files pushed to GitHub
- [ ] Railway project access confirmed
- [ ] Production database backup created

---

## 🚀 Deployment Steps

### 1. Backend Deployment (Railway)

**Action**: Railway auto-deploys from `main` branch
- [ ] Verify deployment in Railway dashboard
- [ ] Check logs for: `✅ Weather Alerts routes loaded`
- [ ] Verify health endpoint: `/api/health`

**Time**: ~5 minutes

---

### 2. Database Migration

**Action**: Run migration SQL in production database

**Via Railway Dashboard**:
1. Go to Database service → Connect → Postgres
2. Open SQL editor or connect via psql
3. Execute: `backend/database/migrations/003_add_weather_alerts.sql`

**Verify**:
```sql
\dt weather_alerts
\dt alert_preferences  
\dt alert_metrics
```

**Time**: ~2 minutes

---

### 3. Environment Variables

**Action**: Set `WEATHER_API_KEY` in Railway

**Steps**:
1. Railway → Backend Service → Variables
2. Add: `WEATHER_API_KEY` = `your_openweather_api_key`
3. Verify: `DATABASE_URL` is set (auto-set by Railway)
4. Service auto-restarts

**Time**: ~1 minute

---

### 4. Cron Job Setup

**Option A: Railway Cron (Recommended)**
1. Railway → Project → + New Service
2. Select "Cron Job"
3. Schedule: `0 */6 * * *`
4. Command: `node scripts/generate-weather-alerts.js`
5. Working Directory: `backend`
6. Environment: Inherit from backend service

**Option B: Node-Cron (Alternative)**
1. Add to `backend/package.json`: `"node-cron": "^3.0.3"`
2. Add cron code to `backend/server.js` (see runbook)
3. Redeploy backend

**Test**: Run manually via Railway shell:
```bash
cd backend
node scripts/generate-weather-alerts.js
```

**Time**: ~5 minutes

---

### 5. Testing

**Backend**:
- [ ] `GET /api/weather-alerts` returns alerts
- [ ] `GET /api/weather-alerts/stats` returns stats
- [ ] `POST /api/weather-alerts/generate` creates alerts

**Web**:
- [ ] Dashboard widget appears
- [ ] Alerts page loads
- [ ] Actions work (read/dismiss)

**Android**:
- [ ] Widget appears on dashboard
- [ ] Navigation works
- [ ] Actions update state

**Time**: ~15 minutes

---

### 6. Monitoring

**First 24 Hours**:
- [ ] Check cron job runs successfully
- [ ] Verify alerts created in database
- [ ] Monitor error logs
- [ ] Check API response times

**Time**: Ongoing

---

## ⏱️ Total Estimated Time: ~30 minutes

## 🎯 Success Criteria

Feature 1 is **LIVE** when:
- ✅ Backend deployed
- ✅ Migration complete
- ✅ Cron job running
- ✅ Alerts visible in UI
- ✅ No critical errors

---

## 📞 Quick Troubleshooting

**Migration fails** → Check database permissions
**Cron not running** → Verify schedule syntax
**No alerts** → Check WEATHER_API_KEY and farm locations
**API errors** → Check logs in Railway dashboard

---

**See `PRODUCTION_DEPLOYMENT_RUNBOOK_FEATURE1.md` for detailed instructions.**

