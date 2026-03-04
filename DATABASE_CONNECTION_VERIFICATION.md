# 🗄️ Database Connection Verification Checklist

**Complete guide to verify database connection and functionality**

**Estimated Time:** 5 minutes

---

## 📋 **Overview**

This guide helps you verify that your PostgreSQL database is properly connected to your Railway backend and functioning correctly.

**Database:** PostgreSQL (provided by Railway PostgreSQL plugin)

---

## ✅ **Verification Checklist**

### **Step 1: Check Railway Logs for Database Connection**

#### 1.1 Access Railway Logs

- [ ] Go to Railway Dashboard → Your Backend Service
- [ ] Click on **"Logs"** tab
- [ ] Review recent log entries

#### 1.2 Look for Connection Messages

**✅ Should see:**
```
Database connected successfully
Connected to PostgreSQL
Database connection established
```

**❌ Should NOT see:**
```
Database connection error
Failed to connect to database
Connection timeout
ECONNREFUSED
```

#### 1.3 Check for Connection Details

Look for log entries showing:
- [ ] Database host/connection info (may be masked)
- [ ] Connection pool initialized
- [ ] Database migrations status

**Example Success Log:**
```
SmartFarm API Server Started
environment: production
port: 3000
Database connected successfully
Auth routes with email verification loaded
```

---

### **Step 2: Verify Database Migrations Completed**

#### 2.1 Check Migration Logs

- [ ] Review Railway logs for migration messages
- [ ] Look for entries like:
  - `Migrations completed`
  - `Database schema initialized`
  - `Tables created successfully`

#### 2.2 Verify Tables Exist

**Option A: Check via Railway Database Dashboard**

- [ ] Go to Railway Dashboard → PostgreSQL Service
- [ ] Click **"Data"** or **"Query"** tab
- [ ] Run query: `SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';`
- [ ] Verify expected tables exist (e.g., users, farms, crops, livestock, etc.)

**Option B: Check via API Health Endpoint**

- [ ] Visit: `https://your-backend.railway.app/api/health`
- [ ] Check response includes database status
- [ ] Verify `database: "connected"` or similar

**Expected Tables (30 tables mentioned in summary):**
- users
- farms
- crops
- livestock
- And 26+ other tables

---

### **Step 3: Test Database Queries via API Endpoints**

#### 3.1 Test Health Endpoint

- [ ] Visit: `https://your-backend.railway.app/api/health`
- [ ] Verify response includes database status
- [ ] Check response time is reasonable (< 1 second)

**Expected Response:**
```json
{
  "status": "ok",
  "timestamp": "2025-01-XX...",
  "uptime": 12345,
  "database": "connected"
}
```

#### 3.2 Test Authentication Endpoints

- [ ] Test registration endpoint:
  - `POST https://your-backend.railway.app/api/auth/register`
  - Should create user in database
  - Check Railway logs for database insert

- [ ] Test login endpoint:
  - `POST https://your-backend.railway.app/api/auth/login`
  - Should query database for user
  - Check Railway logs for database query

#### 3.3 Test Data Retrieval Endpoints

- [ ] Test GET endpoints (if authenticated):
  - Farms endpoint
  - Crops endpoint
  - Livestock endpoint
- [ ] Verify data is returned from database
- [ ] Check Railway logs for SELECT queries

**Note:** Some endpoints may require authentication. Use a tool like Postman or curl with proper headers.

---

### **Step 4: Verify Database Backups (If Railway Provides)**

#### 4.1 Check Railway Backup Settings

- [ ] Go to Railway Dashboard → PostgreSQL Service
- [ ] Look for **"Backups"** or **"Settings"** tab
- [ ] Check if automatic backups are enabled

#### 4.2 Verify Backup Configuration

**Railway PostgreSQL Plugin Features:**
- [ ] Check if backups are automatic (Railway may provide this)
- [ ] Verify backup frequency (daily/weekly)
- [ ] Check backup retention period
- [ ] Verify backup storage location

**Note:** Railway's PostgreSQL plugin may provide automatic backups. Check Railway documentation for details.

#### 4.3 Manual Backup (If Needed)

If automatic backups aren't available:

- [ ] Use Railway CLI or dashboard to export database
- [ ] Or use `pg_dump` command:
  ```bash
  pg_dump $DATABASE_URL > backup.sql
  ```
- [ ] Store backups securely

---

## 🧪 **Quick Test Script**

### **Test Database Connection**

Create a file `scripts/test-db-connection.js`:

```javascript
#!/usr/bin/env node
/**
 * Test Database Connection
 * Run: node scripts/test-db-connection.js
 */

const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

async function testConnection() {
  try {
    console.log('🔍 Testing database connection...\n');
    
    // Test connection
    const client = await pool.connect();
    console.log('✅ Database connection successful!\n');
    
    // Test query
    const result = await client.query('SELECT NOW() as current_time, version() as pg_version');
    console.log('📊 Database Info:');
    console.log(`   Current Time: ${result.rows[0].current_time}`);
    console.log(`   PostgreSQL Version: ${result.rows[0].pg_version.split(' ')[0]} ${result.rows[0].pg_version.split(' ')[1]}\n`);
    
    // Check tables
    const tablesResult = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name
    `);
    
    console.log(`📋 Tables Found: ${tablesResult.rows.length}`);
    tablesResult.rows.forEach((row, index) => {
      if (index < 10) {
        console.log(`   - ${row.table_name}`);
      }
    });
    if (tablesResult.rows.length > 10) {
      console.log(`   ... and ${tablesResult.rows.length - 10} more`);
    }
    
    client.release();
    console.log('\n✅ Database connection test complete!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    process.exit(1);
  }
}

testConnection();
```

**Run the script:**
```bash
cd backend
node ../scripts/test-db-connection.js
```

---

## 🔍 **Troubleshooting**

### **Problem: "Database connected successfully" not in logs**

**Solutions:**
1. **Check DATABASE_URL is set:**
   - Railway Dashboard → Backend → Variables
   - Verify `DATABASE_URL` exists
   - Should be auto-provided by PostgreSQL plugin

2. **Check PostgreSQL plugin is attached:**
   - Railway Dashboard → Backend Service
   - Verify PostgreSQL plugin is connected
   - If not, add PostgreSQL plugin

3. **Check connection code:**
   - Verify `server.js` has database connection code (lines 388-410)
   - Check for connection errors in logs

### **Problem: Migrations not completed**

**Solutions:**
1. **Check migration scripts exist:**
   - Look for migration files in `backend/migrations/` or `backend/database/`
   - Verify migration scripts are present

2. **Run migrations manually:**
   - Check if there's a migration script
   - Run: `npm run setup:db` or similar
   - Or run migrations via Railway CLI

3. **Check migration logs:**
   - Review Railway logs for migration errors
   - Fix any migration errors

### **Problem: API endpoints return database errors**

**Solutions:**
1. **Check database connection:**
   - Verify connection is active
   - Check Railway logs for connection errors

2. **Check table existence:**
   - Verify tables were created
   - Run migration if needed

3. **Check query syntax:**
   - Review API endpoint code
   - Check for SQL errors in logs

### **Problem: Database backups not configured**

**Solutions:**
1. **Check Railway features:**
   - Review Railway PostgreSQL plugin features
   - Check if backups are automatic

2. **Set up manual backups:**
   - Use Railway CLI to export database
   - Schedule regular backups
   - Store backups securely

---

## ✅ **Verification Summary**

Database connection is correctly configured when:

- ✅ Railway logs show "Database connected successfully"
- ✅ Database migrations completed successfully
- ✅ API endpoints return data from database
- ✅ Database queries work correctly
- ✅ Database backups are configured (if available)

---

## 📊 **Quick Verification Commands**

### **Check Health Endpoint**

```bash
curl https://your-backend.railway.app/api/health
```

**Expected:** JSON response with database status

### **Test Database Connection (Local)**

```bash
cd backend
node ../scripts/test-db-connection.js
```

**Expected:** Connection successful message and table list

---

## 📚 **Related Documentation**

- **Environment Variables:** `ENVIRONMENT_VARIABLES_VERIFICATION.md`
- **Database Schema:** `POSTGRESQL_DATABASE_SCHEMA.md` (if exists)
- **Railway Documentation:** https://docs.railway.app/databases/postgresql

---

## 🔗 **Railway Database Dashboard**

- **Access:** Railway Dashboard → PostgreSQL Service
- **Features:**
  - View database metrics
  - Run queries
  - View tables
  - Check connections
  - Manage backups (if available)

---

**Last Updated:** January 2025
