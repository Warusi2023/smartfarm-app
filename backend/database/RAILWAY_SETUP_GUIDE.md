# 🚀 Railway Postgres Setup Guide - DBeaver

## Quick Setup Steps for DBeaver

### Step 1: Get Connection Details from Railway

1. Go to Railway Dashboard → Your Postgres service
2. Click **"Database"** tab → **"Credentials"** tab
3. Copy the connection details:
   - **Host**: (e.g., `containers-us-west-xxx.railway.app`)
   - **Port**: `5432`
   - **Database**: `railway`
   - **User**: `postgres`
   - **Password**: (copy from Railway)

### Step 2: Connect in DBeaver

1. Open DBeaver
2. Click **"New Database Connection"** (plug icon)
3. Select **PostgreSQL**
4. Enter connection details:
   - **Host**: From Railway Credentials
   - **Port**: `5432`
   - **Database**: `railway`
   - **Username**: `postgres`
   - **Password**: From Railway Credentials
5. Click **"Test Connection"** → Should show "Connected"
6. Click **"Finish"**

### Step 3: Run SQL Migrations

#### Method 1: Execute SQL Script (Recommended)

1. In DBeaver, right-click on your connection → **"SQL Editor"** → **"New SQL Script"**
2. Open file: `backend/database/migrations/001_complete_schema.sql`
3. Copy **ALL** contents (Ctrl+A, Ctrl+C)
4. Paste into DBeaver SQL Editor
5. Click **"Execute SQL Script"** (play button) or press `Ctrl+Enter`
6. Wait for completion (should show "Success" or table creation messages)
7. Repeat for `002_add_missing_features.sql`

#### Method 2: Execute SQL File Directly

1. In DBeaver, right-click on your connection
2. Select **"SQL Editor"** → **"Open SQL Script"**
3. Navigate to `backend/database/migrations/001_complete_schema.sql`
4. Click **"Execute SQL Script"** (play button)
5. Repeat for `002_add_missing_features.sql`

### Step 4: Verify Tables Created

Run this query in DBeaver SQL Editor:

```sql
-- List all tables
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;
```

You should see ~25+ tables including:
- users
- farms
- crops
- livestock
- tasks
- inventory
- feed_mix_calculations
- ai_crop_advice
- ai_livestock_advice
- qr_codes
- etc.

### Step 5: Check Table Structure

```sql
-- Check users table structure
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'users'
ORDER BY ordinal_position;
```

## Troubleshooting

### Error: "permission denied"
- Make sure you're using the `postgres` user from Railway credentials
- Check that you're connected to the correct database

### Error: "extension already exists"
- This is OK - extensions are created with `IF NOT EXISTS`
- Continue with the rest of the script

### Error: "relation already exists"
- Tables might already exist
- Check with: `SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';`
- If tables exist but empty, you can drop and recreate:
  ```sql
  DROP SCHEMA public CASCADE;
  CREATE SCHEMA public;
  GRANT ALL ON SCHEMA public TO postgres;
  ```
  Then re-run migrations

### No tables showing after execution
- Check the DBeaver "Log" tab for errors
- Make sure you executed the entire script (not just a portion)
- Verify connection is active (green icon in DBeaver)

## Quick Test Query

After tables are created, test with:

```sql
-- Test users table
SELECT * FROM users LIMIT 1;

-- Count tables
SELECT COUNT(*) as table_count 
FROM information_schema.tables 
WHERE table_schema = 'public';

-- Check indexes
SELECT tablename, indexname 
FROM pg_indexes 
WHERE schemaname = 'public' 
LIMIT 10;
```

---

**Need Help?** Check the `backend/database/README.md` for more details.

