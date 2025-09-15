# Railway Database Import Guide - Table Columns

## 🗄️ How to Import Table Columns in Railway

There are several ways to import table columns and schema into your Railway PostgreSQL database:

### 1. **Using Your Existing Migration System** (Recommended)

Your project already has a comprehensive migration system set up! Here's how to use it:

#### **Option A: Automatic Migration on Deploy**
```bash
# Railway will automatically run migrations when you deploy
# Your package.json has this configured:
"prestart": "node scripts/migrate.mjs && node scripts/seed.mjs"
```

#### **Option B: Manual Migration**
```bash
# Run migrations manually
npm run migrate

# Or directly:
node scripts/migrate.mjs
```

### 2. **Railway Dashboard - SQL Console**

1. **Go to Railway Dashboard**
   - Visit [railway.app](https://railway.app)
   - Select your project
   - Click on your PostgreSQL service

2. **Open SQL Console**
   - Click "Query" tab
   - Use the built-in SQL editor

3. **Import Your Schema**
   - Copy the content from `database/migrations/001_full_schema.sql`
   - Paste into the SQL console
   - Click "Run" to execute

### 3. **Railway CLI Method**

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login to Railway
railway login

# Connect to your database
railway connect

# Run SQL commands directly
psql -h <host> -p <port> -U <user> -d <database> -f database/migrations/001_full_schema.sql
```

### 4. **Environment Variables Method**

Set up your environment variables in Railway:

```bash
# In Railway Dashboard > Variables
DATABASE_URL=postgresql://user:password@host:port/database
PGDATABASE=your_database_name
PGUSER=your_username
PGPASSWORD=your_password
PGHOST=your_host
PGPORT=5432
```

### 5. **Direct Database Connection**

#### **Using pgAdmin or DBeaver:**
1. Get connection details from Railway Dashboard
2. Connect using:
   - **Host**: `containers-us-west-xxx.railway.app`
   - **Port**: `5432`
   - **Database**: `railway`
   - **Username**: `postgres`
   - **Password**: (from Railway variables)

3. Import your SQL files directly

### 6. **Programmatic Import** (Your Current Setup)

Your migration system (`scripts/migrate.mjs`) will:
- ✅ Check which migrations have been applied
- ✅ Run new migrations in order
- ✅ Handle rollbacks on errors
- ✅ Track migration history

## 📋 Your Current Database Schema

Your `001_full_schema.sql` includes these tables:

### **Core Tables:**
- `users` - User management
- `farms` - Farm information
- `fields` - Field/plot data
- `crops` - Crop definitions
- `plantings` - Planting records

### **Operations Tables:**
- `irrigation_events` - Irrigation tracking
- `fertilization_events` - Fertilizer applications
- `harvests` - Harvest records
- `tasks` - Task management

### **Inventory Tables:**
- `inventory_items` - Product catalog
- `inventory_movements` - Stock movements
- `storage_units` - Storage locations

### **Business Tables:**
- `customers` - Customer management
- `suppliers` - Supplier data
- `sales_orders` - Sales tracking
- `invoices` - Billing system

### **IoT & Monitoring:**
- `sensors` - IoT device management
- `sensor_readings` - Sensor data
- `weather_observations` - Weather data
- `greenhouse_readings` - Greenhouse monitoring

## 🚀 Recommended Approach

### **For Production Deployment:**

1. **Set Environment Variables in Railway:**
   ```
   DATABASE_URL=postgresql://user:password@host:port/database
   NODE_ENV=production
   ```

2. **Deploy Your Code:**
   - Push to GitHub (already done ✅)
   - Railway will automatically run migrations

3. **Verify Schema:**
   ```bash
   # Check if tables were created
   node scripts/verify-schema.js
   ```

### **For Development:**

1. **Local Database:**
   ```bash
   # Set up local PostgreSQL
   createdb smartfarm_dev
   
   # Set environment variable
   export DATABASE_URL="postgresql://localhost/smartfarm_dev"
   
   # Run migrations
   npm run migrate
   ```

2. **Test Schema:**
   ```bash
   # Run your test queries
   node test-queries.sql
   ```

## 🔧 Adding New Table Columns

### **Create New Migration:**
```bash
# Create new migration file
touch database/migrations/003_add_new_columns.sql
```

### **Add Column Definition:**
```sql
-- database/migrations/003_add_new_columns.sql
ALTER TABLE users ADD COLUMN email_verified BOOLEAN DEFAULT false;
ALTER TABLE users ADD COLUMN phone_verified BOOLEAN DEFAULT false;
ALTER TABLE farms ADD COLUMN organic_certified BOOLEAN DEFAULT false;
```

### **Run Migration:**
```bash
npm run migrate
```

## 📊 Monitoring Your Database

### **Check Migration Status:**
```sql
-- In Railway SQL Console
SELECT * FROM schema_migrations ORDER BY applied_at DESC;
```

### **View Table Structure:**
```sql
-- List all tables
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public';

-- Describe table structure
\d users
```

### **Check Table Columns:**
```sql
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'users';
```

## 🎯 Next Steps

1. **Deploy to Railway** with your current code
2. **Verify migrations run** automatically
3. **Check database** in Railway dashboard
4. **Test your API** with the new schema

Your migration system is already set up and ready to go! Just deploy to Railway and the database schema will be imported automatically.

---

**Status**: ✅ **Ready** - Migration system configured  
**Files**: `database/migrations/001_full_schema.sql`  
**Script**: `scripts/migrate.mjs`  
**Command**: `npm run migrate`
