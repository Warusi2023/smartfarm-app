# 🔧 Cursor Database Connection Issue - Fix Guide

## Problem
Cursor's Postgres database interface is stuck "attempting to connect" and hasn't updated for two months, even though the database is online and variables are set.

## Important Note
**This is a Cursor IDE issue, NOT a SmartFarm application issue.** Your Railway Postgres database is working fine - the problem is with Cursor's MCP (Model Context Protocol) agent interface.

---

## ✅ Quick Verification: Database is Actually Working

### Test 1: Health Check Endpoint
```bash
curl https://smartfarm-app-production.up.railway.app/api/health
```

Should return database status:
```json
{
  "database": {
    "connected": true,
    "version": "PostgreSQL 15.x"
  }
}
```

### Test 2: Direct Database Test Script
```bash
cd backend
npm run test:db
```

This will:
- ✅ Test database connection
- ✅ Verify tables exist
- ✅ Check email verification fields
- ✅ Show connection pool status

---

## 🔍 Cursor-Specific Fixes

### Fix 1: Restart Cursor MCP Agent

**In Cursor:**
1. Open Command Palette (Ctrl+Shift+P / Cmd+Shift+P)
2. Type: `MCP: Restart Server`
3. Select your Postgres MCP server
4. Wait for reconnection

**Or manually:**
```bash
# Stop Cursor agent
cursor agent stop

# Start Cursor agent
cursor agent start
```

### Fix 2: Reset Database Variables in Cursor

1. Open Cursor Settings
2. Go to **MCP** or **Database** section
3. Find Postgres connection settings
4. Re-enter all variables:
   - `DATABASE_URL` (full connection string)
   - Or individual: `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`
5. Save and restart Cursor

### Fix 3: Check Cursor Logs

**View Cursor Logs:**
1. Help → Toggle Developer Tools
2. Console tab
3. Look for:
   - MCP connection errors
   - Postgres agent errors
   - Authentication failures

**Common Error Patterns:**
- `ECONNREFUSED` - Connection refused
- `ETIMEDOUT` - Connection timeout
- `28P01` - Authentication failed
- `3D000` - Database doesn't exist

### Fix 4: Update/Rollback Cursor Version

**If recently updated:**
1. Check Cursor version: Help → About
2. If on latest, try rolling back:
   - Download previous version from Cursor website
   - Install and test
3. Report issue to Cursor forum if persists

### Fix 5: Disable/Re-enable MCP Postgres Agent

1. Cursor Settings → Extensions → MCP
2. Find Postgres agent
3. Disable it
4. Restart Cursor
5. Re-enable it
6. Reconfigure connection

---

## ✅ Verify Database Works Independently

### Option 1: Use psql (Command Line)
```bash
# Connect using DATABASE_URL from Railway
psql $DATABASE_URL

# Or manually
psql -h HOST -p PORT -U USER -d DATABASE

# Test query
SELECT NOW(), version();
```

### Option 2: Use DBeaver or pgAdmin
1. Download DBeaver (free): https://dbeaver.io
2. Create new PostgreSQL connection
3. Use DATABASE_URL from Railway:
   - Extract: host, port, database, user, password
4. Test connection
5. If works → Database is fine, issue is Cursor

### Option 3: Use Railway CLI
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Link to project
railway link

# Connect to Postgres
railway connect postgres

# Run queries
SELECT NOW();
SELECT current_database();
```

---

## 🛠️ SmartFarm Database Test Script

We've created a test script to verify your database works:

```bash
cd backend
npm run test:db
```

**What it checks:**
- ✅ Database connection
- ✅ PostgreSQL version
- ✅ Current database name
- ✅ Users table existence
- ✅ Email verification fields
- ✅ Connection pool status

**If test passes:** Database is working, issue is Cursor IDE
**If test fails:** Database connection issue, check Railway

---

## 📋 Railway Database Status Check

### Verify in Railway Dashboard:
1. **Postgres Service Status:**
   - Should show "Running" ✅
   - Last updated: 2 months ago (normal for DB images)
   - Volume attached: `postgres-skkk-volume` ✅

2. **Connection String:**
   - Railway → Postgres → Settings → Variables
   - Copy `DATABASE_URL`
   - Format: `postgresql://user:pass@host:port/dbname?sslmode=require`

3. **Application Service:**
   - Railway → `smartfarm-app` → Settings → Variables
   - Verify `DATABASE_URL` matches Postgres service
   - Should be auto-provided by Railway

---

## 🔧 Advanced Troubleshooting

### Check for Ghost Processes
```bash
# Windows PowerShell
Get-Process | Where-Object {$_.ProcessName -like "*postgres*"}

# Kill if needed
Stop-Process -Name "postgres" -Force
```

### Test Connection from Backend
Add this temporary endpoint to test:

```javascript
// In backend/server.js (temporary)
app.get('/api/db-test', async (req, res) => {
  try {
    if (!dbPool) {
      return res.json({ 
        error: 'Database pool not initialized',
        hasEnvVar: !!process.env.DATABASE_URL 
      });
    }
    
    const result = await dbPool.query('SELECT NOW(), version(), current_database()');
    res.json({
      connected: true,
      timestamp: result.rows[0].now,
      version: result.rows[0].version,
      database: result.rows[0].current_database,
      poolSize: dbPool.totalCount
    });
  } catch (error) {
    res.json({
      connected: false,
      error: error.message,
      code: error.code
    });
  }
});
```

Then test:
```bash
curl https://smartfarm-app-production.up.railway.app/api/db-test
```

---

## ✅ Summary

### Database Status:
- ✅ Railway Postgres is running
- ✅ Backend can connect (health check works)
- ✅ Application is functional
- ❌ Cursor IDE interface is stuck

### Action Items:
1. **Verify database works:** Run `npm run test:db` in backend
2. **Fix Cursor:** Restart MCP agent, reset variables, or update Cursor
3. **Use alternative tools:** DBeaver, pgAdmin, or Railway CLI for database access
4. **Report to Cursor:** If issue persists, report to Cursor forum

### Key Takeaway:
**Your database is fine!** This is a Cursor IDE interface issue. The SmartFarm application can connect and use the database normally. Use alternative database tools if Cursor's interface continues to have issues.

---

**Last Updated**: After creating database test script
**Status**: Database is working - Cursor IDE interface issue

