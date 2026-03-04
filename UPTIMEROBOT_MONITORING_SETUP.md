# 🟢 UptimeRobot Monitoring Setup Guide

**Complete guide to set up UptimeRobot for monitoring SmartFarm backend and frontend**

---

## 📋 **Overview**

UptimeRobot is a free uptime monitoring service that checks your services every 5 minutes and alerts you when they're down.

**What you'll set up:**
- Backend health check monitor (Railway)
- Frontend availability monitor (Netlify)
- Email alerts for downtime

**Estimated Time:** 15-20 minutes

---

## 🚀 **Step 1: Create UptimeRobot Account**

### 1.1 Sign Up
1. Go to https://uptimerobot.com/signup/
2. Enter your email address
3. Create a password
4. Click **"Sign Up"**

### 1.2 Verify Email
1. Check your email inbox
2. Click the verification link in the email from UptimeRobot
3. You'll be redirected to the dashboard

---

## 🔧 **Step 2: Add Backend Monitor**

### 2.1 Create New Monitor
1. After logging in, click **"+ Add New Monitor"** (top right)
2. Or go to **"My Monitors"** → **"+ Add New Monitor"**

### 2.2 Configure Monitor Settings

**Monitor Type:**
- Select **"HTTP(s)"**

**Monitor Details:**
- **Friendly Name:** `SmartFarm Backend API`
- **URL:** `https://smartfarm-app-production.up.railway.app/api/health`
  - Replace with your actual Railway backend URL
  - Make sure to include `/api/health` endpoint

**Monitoring Interval:**
- Select **"5 minutes"** (default, free tier)

**Alert Contacts:**
- Select your email address (or add one first - see Step 4)

### 2.3 Save Monitor
1. Click **"Create Monitor"**
2. UptimeRobot will immediately start checking your backend
3. Status should show **"Up"** (green) if backend is running

---

## 🌐 **Step 3: Add Frontend Monitor**

### 3.1 Create New Monitor
1. Click **"+ Add New Monitor"** again

### 3.2 Configure Monitor Settings

**Monitor Type:**
- Select **"HTTP(s)"**

**Monitor Details:**
- **Friendly Name:** `SmartFarm Frontend`
- **URL:** `https://your-site.netlify.app`
  - Replace with your actual Netlify site URL
  - No trailing slash needed

**Monitoring Interval:**
- Select **"5 minutes"**

**Alert Contacts:**
- Select your email address

### 3.3 Save Monitor
1. Click **"Create Monitor"**
2. Status should show **"Up"** (green) if frontend is accessible

---

## 📧 **Step 4: Configure Alert Contacts**

### 4.1 Add Email Contact
1. Go to **"My Settings"** → **"Alert Contacts"** (left sidebar)
2. Click **"+ Add Alert Contact"**
3. Select **"Email"**
4. Enter your email address
5. Click **"Create Alert Contact"**

### 4.2 Configure Alert Settings
1. Go back to **"My Monitors"**
2. Click on each monitor → **"Edit"**
3. Under **"Alert Contacts"**, ensure your email is selected
4. Click **"Update Monitor"**

### 4.3 Test Alert (Optional)
1. Temporarily stop your backend (or use a test endpoint that returns 500)
2. Wait for UptimeRobot to detect downtime (up to 5 minutes)
3. You should receive an email alert
4. Restore service and wait for "Up" notification

---

## ✅ **Step 5: Verify Monitors**

### 5.1 Check Monitor Status

**Dashboard View:**
- Go to **"My Monitors"**
- Both monitors should show:
  - ✅ **Status:** "Up" (green)
  - ✅ **Last Check:** Recent timestamp (within last 5 minutes)
  - ✅ **Uptime:** Should show percentage (e.g., "100%")

### 5.2 Verify Health Endpoint

**Test Backend Health Endpoint:**
```bash
curl https://smartfarm-app-production.up.railway.app/api/health
```

**Expected Response:**
```json
{
  "status": "ok",
  "timestamp": "2025-01-XX...",
  "uptime": 12345
}
```

**Test Frontend:**
- Visit your Netlify URL in a browser
- Should load without errors

---

## 🎛️ **Step 6: Advanced Configuration (Optional)**

### 6.1 Custom Alert Thresholds

1. Edit monitor → **"Advanced Options"**
2. Configure:
   - **Alert When Down For:** 1 minute (default)
   - **Alert When Up For:** 1 minute (default)
   - **Alert After:** 1 occurrence

### 6.2 Status Page (Optional - Paid Feature)

1. Go to **"Status Pages"** → **"Create Status Page"**
2. Add your monitors to the status page
3. Share public URL with users

**Note:** Status pages require paid plan, but monitoring is free.

### 6.3 Maintenance Windows

1. Go to **"My Settings"** → **"Maintenance Windows"**
2. Create maintenance window for scheduled updates
3. Monitors won't alert during maintenance windows

---

## 📊 **Step 7: Monitor Dashboard**

### Key Information Displayed

**Monitor List Shows:**
- ✅ Status (Up/Down)
- ⏱️ Last check time
- 📈 Uptime percentage
- 🔔 Alert status
- 📝 Response time

**Click on Monitor to See:**
- Response time graph
- Uptime history
- Log of all checks
- Alert history

---

## 🔔 **Step 8: Alert Configuration**

### Email Alerts

**When You'll Receive Alerts:**
- ⚠️ Service goes down
- ✅ Service comes back up
- ⚠️ Service is slow (if configured)

**Alert Frequency:**
- Free tier: Alerts every 5 minutes while down
- Paid tier: More frequent alerts available

### Multiple Alert Contacts

**Add More Contacts:**
1. Go to **"Alert Contacts"**
2. Add:
   - Additional email addresses
   - SMS (paid feature)
   - Webhooks (for Slack, Discord, etc.)
   - Push notifications (mobile app)

---

## 🐛 **Troubleshooting**

### Problem: Monitor shows "Down" but service is up

**Solutions:**
- Check URL is correct (including `/api/health` for backend)
- Verify service is publicly accessible (not behind VPN/firewall)
- Check if health endpoint returns 200 OK status
- Wait a few minutes - checks happen every 5 minutes

### Problem: Not receiving email alerts

**Solutions:**
- Check spam/junk folder
- Verify email address in Alert Contacts
- Check Alert Contacts are selected for the monitor
- Verify email address is verified

### Problem: Too many alerts

**Solutions:**
- Increase "Alert When Down For" threshold
- Use maintenance windows for scheduled downtime
- Adjust alert frequency in monitor settings

### Problem: Health endpoint not responding

**Backend Health Check:**
- Verify `/api/health` endpoint exists in your backend
- Check Railway logs for errors
- Test endpoint manually: `curl https://your-backend.railway.app/api/health`

---

## ✅ **Verification Checklist**

### Account Setup
- [ ] UptimeRobot account created
- [ ] Email verified

### Backend Monitor
- [ ] Backend monitor added
- [ ] URL: `https://your-backend.railway.app/api/health`
- [ ] Status showing "Up"
- [ ] Last check is recent

### Frontend Monitor
- [ ] Frontend monitor added
- [ ] URL: `https://your-site.netlify.app`
- [ ] Status showing "Up"
- [ ] Last check is recent

### Alerts
- [ ] Email contact added
- [ ] Alerts configured for both monitors
- [ ] Test alert received (optional)

---

## 🎯 **Success Criteria**

UptimeRobot setup is complete when:

- ✅ Both monitors show "Up" status
- ✅ Last check times are recent (within 5 minutes)
- ✅ Email alerts configured
- ✅ Dashboard accessible and monitoring active

---

## 📚 **Additional Resources**

- UptimeRobot Docs: https://uptimerobot.com/api/
- UptimeRobot Status Page: https://status.uptimerobot.com/
- Free Tier Limits: 50 monitors, 5-minute intervals

---

## 🔄 **Next Steps**

After UptimeRobot is set up:

1. ✅ Complete Sentry error tracking setup (see `SENTRY_MONITORING_SETUP.md`)
2. ✅ Complete browser compatibility testing
3. ✅ Complete end-to-end feature testing
4. ✅ Verify API keys configuration

---

## 💡 **Pro Tips**

1. **Bookmark Dashboard:** Add UptimeRobot dashboard to bookmarks for quick access
2. **Mobile App:** Install UptimeRobot mobile app for on-the-go monitoring
3. **Multiple Contacts:** Add team members' emails for better coverage
4. **Response Time:** Monitor response times to catch performance issues early
5. **Status Page:** Consider paid plan for public status page (builds trust)

---

**Last Updated:** January 2025
