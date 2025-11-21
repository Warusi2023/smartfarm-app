# 🗄️ PostgreSQL Database Status Check Guide

## Overview
This guide helps you systematically check the status and health of your PostgreSQL database service in Railway and verify connectivity from your SmartFarm application.

---

## ✅ Step 1: Verify Postgres Service Health in Railway

### Railway Dashboard Check
1. Go to [Railway Dashboard](https://railway.app)
2. Find your **Postgres** service (should show blue elephant icon)
3. Check the service card for:
   - ✅ **Status**: Should show "Running" or "Active"
   - ⏰ **Last Updated**: Shows "2 months ago via Docker Image" (this is normal - DB images don't update frequently)
   - 📊 **Health**: Should show green indicator

### Check Service Logs
1. Click on **Postgres** service
2. Go to **"Logs"** tab
3. Look for:
   - ✅ Connection messages
   - ✅ "database system is ready to accept connections"
   - ❌ Any error messages or warnings
   - ⚠️ Connection limit warnings

---

## ✅ Step 2: Review Volume Association

### Verify Data Persistence
1. In Railway Dashboard, check for **`postgres-skkk-volume`** or similar volume
2. Verify it's connected to your Postgres service:
   - Postgres service → **Settings** → **Volumes**
   - Should show volume attached
3. Check volume size and usage:
   - Ensure there's available space
   - Monitor growth over time

### Volume Health Check
- ✅ Volume should be attached and mounted
- ✅ No storage warnings or errors
- ✅ Backup status (if backups are configured)

---

## ✅ Step 3: Environment Consistency Check

### Verify Database Connection String
1. Go to **Postgres** service → **Settings** → **Variables**
2. Look for `DATABASE_URL` or `POSTGRES_URL`
3. Copy the connection string (format: `postgresql://user:password@host:port/dbname`)

### Check Application Services Connection
1. Go to **`smartfarm-app`** service → **Settings** → **Variables**
2. Verify `DATABASE_URL` matches Postgres service
3. Check `web` service variables (if it needs DB access)

### Connection String Format
```
postgresql://USER:PASSWORD@HOST:PORT/DATABASE?sslmode=require
```

---

## ✅ Step 4: Manual Health Check Commands

### Option A: Railway CLI (Recommended)
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Link to project
railway link

# Connect to Postgres
railway connect postgres

# Run test query
SELECT NOW(), version();
```

### Option B: Direct Connection Test
If you have `psql` installed:
```bash
# Use DATABASE_URL from Railway
psql $DATABASE_URL

# Test query
SELECT NOW();
SELECT current_database();
SELECT version();
```

### Option C: Backend Health Check Endpoint
Test via your backend API:
```bash
# Check if backend can connect to DB
curl https://smartfarm-app-production.up.railway.app/api/health

# Should show database connection status
```

---

## ✅ Step 5: Verify Database Schema

### Check Required Tables
Connect to database and verify tables exist:

```sql
-- List all tables
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public';

-- Check users table structure
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'users';

-- Verify email verification fields exist
SELECT column_name 
FROM information_schema.columns 
WHERE table_name = 'users' 
AND column_name IN ('verification_token', 'verification_expires', 'is_verified');
```

### Expected Tables
- ✅ `users` - User accounts with email verification fields
- ✅ Other application tables as needed

---

## ✅ Step 6: Test Database Connection from Backend

### Check Backend Logs
1. Go to **`smartfarm-app`** service → **Logs**
2. Look for database connection messages:
   - ✅ "Database connected successfully"
   - ✅ "✅ Database connected"
   - ❌ "Database connection error"
   - ❌ "Connection timeout"

### Test Connection Programmatically
Create a test endpoint in backend to verify DB connection:

```javascript
// Test endpoint (add to server.js temporarily)
app.get('/api/db-test', async (req, res) => {
  try {
    if (!dbPool) {
      return res.json({ 
        connected: false, 
        error: 'Database pool not initialized',
        hasEnvVar: !!process.env.DATABASE_URL 
      });
    }
    
    const result = await dbPool.query('SELECT NOW(), version()');
    res.json({
      connected: true,
      timestamp: result.rows[0].now,
      version: result.rows[0].version,
      poolSize: dbPool.totalCount
    });
  } catch (error) {
    res.json({
      connected: false,
      error: error.message
    });
  }
});
```

---

## ✅ Step 7: Check Recent Activity

### Review Deployment History
1. Railway Dashboard → **Postgres** service → **Deployments**
2. Check:
   - Last deployment date
   - Deployment status
   - Any failed deployments

### Check Application Activity
1. Review `smartfarm-app` deployment logs
2. Look for database-related errors:
   - Connection failures
   - Query timeouts
   - Migration errors

---

## ✅ Step 8: Verify Database Migrations

### Check Migration Status
1. Review migration files in `backend/database/migrations/`
2. Verify migrations have been run:
   - `add-email-verification.sql` - Should add verification fields

### Run Pending Migrations
If migrations haven't been applied:

```bash
# Connect to database
railway connect postgres

# Run migration
\i backend/database/migrations/add-email-verification.sql

# Or manually run SQL
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS verification_token VARCHAR(255),
ADD COLUMN IF NOT EXISTS verification_expires TIMESTAMP;

CREATE INDEX IF NOT EXISTS idx_users_verification_token ON users(verification_token);
```

---

## 🔍 Troubleshooting Common Issues

### Issue 1: Database Not Connected
**Symptoms**: Backend logs show "Database connection error"
**Solutions**:
- Verify `DATABASE_URL` environment variable is set
- Check Postgres service is running
- Verify connection string format is correct
- Check network/firewall rules

### Issue 2: Missing Tables/Columns
**Symptoms**: Queries fail with "relation does not exist"
**Solutions**:
- Run database migrations
- Verify schema matches expected structure
- Check migration scripts are correct

### Issue 3: Connection Pool Exhausted
**Symptoms**: "too many connections" errors
**Solutions**:
- Reduce pool size in backend
- Check for connection leaks
- Increase Postgres max_connections if needed

### Issue 4: Volume Not Attached
**Symptoms**: Data loss after restart
**Solutions**:
- Verify volume is attached in Railway
- Check volume mount path
- Ensure backups are configured

---

## 📊 Status Checklist

Use this checklist to verify everything is working:

- [ ] Postgres service shows "Running" status
- [ ] Volume is attached and shows available space
- [ ] `DATABASE_URL` is set in `smartfarm-app` service
- [ ] Backend logs show successful database connection
- [ ] Test query (`SELECT NOW()`) works
- [ ] Required tables exist (`users`, etc.)
- [ ] Email verification columns exist in `users` table
- [ ] No connection errors in logs
- [ ] Database migrations have been applied
- [ ] Connection pool is working correctly

---

## 🎯 Quick Health Check Script

Add this to your backend for quick status checks:

```javascript
// Health check with database status
app.get('/api/health', async (req, res) => {
  const health = {
    ok: true,
    service: 'SmartFarm',
    timestamp: new Date().toISOString(),
    database: {
      connected: false,
      poolSize: 0
    }
  };

  if (dbPool) {
    try {
      await dbPool.query('SELECT 1');
      health.database.connected = true;
      health.database.poolSize = dbPool.totalCount;
    } catch (error) {
      health.database.error = error.message;
    }
  } else {
    health.database.error = 'Database pool not initialized';
  }

  res.json(health);
});
```

---

## 📝 Reporting Findings

After completing checks, document:

1. **Last Known Good State**: When database was last verified working
2. **Current Status**: Running, errors, warnings
3. **Issues Detected**: Any problems found
4. **Recommendations**: Actions needed (update, restart, migrate, etc.)

---

## 🚀 Next Steps After Verification

Once database is verified:

1. ✅ Ensure email verification migration is applied
2. ✅ Test user registration with email verification
3. ✅ Verify AI advisory endpoints can access DB (if needed)
4. ✅ Set up automated backups (if not already configured)
5. ✅ Monitor database performance and connections

---

**Last Updated**: After implementing email verification system
**Status**: Ready for database verification

