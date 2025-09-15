# Manual Database Import Guide - Railway PostgreSQL

## 🔧 Alternative: Manual Table Import

If you prefer to import tables manually instead of using the automatic migration system, here's the complete process:

### **Step 1: Access Railway PostgreSQL Console**

1. **Go to Railway Dashboard**
   - Visit [railway.app](https://railway.app)
   - Select your project
   - Click on your **PostgreSQL service**

2. **Open SQL Console**
   - Click the **"Query"** tab
   - You'll see a SQL editor interface

### **Step 2: Get Your Schema Content**

Your database schema is located in:
```
railway-clean/database/migrations/001_full_schema.sql
```

This file contains:
- ✅ **46 table definitions**
- ✅ **Indexes and constraints**
- ✅ **Enums and functions**
- ✅ **Triggers for auto-updates**

### **Step 3: Copy and Paste Schema**

1. **Copy the entire content** from `001_full_schema.sql`
2. **Paste into Railway's SQL console**
3. **Click "Run"** to execute

### **Step 4: Verify Tables Created**

After running the SQL, check your tables:

```sql
-- List all tables
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;

-- Check specific tables
SELECT COUNT(*) as user_count FROM users;
SELECT COUNT(*) as farm_count FROM farms;
SELECT COUNT(*) as field_count FROM fields;
```

## 📋 What Gets Created

### **Core Tables (8)**
- `users` - User accounts
- `roles` - User permissions
- `farms` - Farm information
- `farm_members` - Farm access
- `fields` - Field/plot data
- `crops` - Crop definitions
- `crop_varieties` - Crop types
- `plantings` - Planting records

### **Operations Tables (12)**
- `irrigation_events` - Water management
- `fertilization_events` - Fertilizer tracking
- `pest_disease_events` - Pest control
- `harvests` - Harvest records
- `storage_units` - Storage facilities
- `inventory_items` - Product catalog
- `inventory_locations` - Storage locations
- `inventory_balances` - Stock levels
- `inventory_movements` - Stock tracking
- `livestock_groups` - Animal groups
- `animals` - Individual animals
- `animal_health_events` - Health records

### **Business Tables (16)**
- `customers` - Customer management
- `suppliers` - Supplier data
- `sales_orders` - Sales tracking
- `sales_order_items` - Order details
- `purchase_orders` - Purchase management
- `purchase_order_items` - Purchase details
- `shipments` - Shipping tracking
- `shipment_items` - Shipment contents
- `invoices` - Invoice generation
- `invoice_items` - Invoice details
- `payments` - Payment tracking
- `tasks` - Task management
- `task_assignees` - Task assignments
- `documents` - File management
- `alerts` - System notifications
- `compliance_audits` - Compliance tracking

### **IoT & Advanced Tables (10)**
- `sensors` - IoT devices
- `sensor_readings` - Sensor data
- `weather_observations` - Weather tracking
- `greenhouses` - Greenhouse facilities
- `greenhouse_zones` - Zone management
- `greenhouse_readings` - Environmental data
- `nutrient_recipes` - Nutrient solutions
- `nutrient_recipe_components` - Recipe ingredients
- `soil_tests` - Soil analysis
- `water_tests` - Water quality

## 🎯 Manual vs Automatic Import

### **Manual Import Advantages:**
- ✅ **Full control** over the process
- ✅ **See exactly what's happening**
- ✅ **Debug any issues** immediately
- ✅ **Run partial imports** if needed
- ✅ **Custom modifications** possible

### **Automatic Import Advantages:**
- ✅ **Zero manual work** required
- ✅ **Consistent deployment** every time
- ✅ **Version control** of migrations
- ✅ **Rollback support** built-in
- ✅ **Production ready** process

## 🔍 Troubleshooting Manual Import

### **Common Issues:**

1. **"Table already exists" errors**
   - Solution: Use `CREATE TABLE IF NOT EXISTS` (already in your schema)

2. **Permission errors**
   - Solution: Ensure you're connected as the database owner

3. **Syntax errors**
   - Solution: Copy the exact content from `001_full_schema.sql`

4. **Connection timeouts**
   - Solution: Run in smaller batches if the schema is large

### **Verification Commands:**

```sql
-- Check if tables exist
SELECT COUNT(*) FROM information_schema.tables 
WHERE table_schema = 'public';

-- Should return 46 tables

-- Check migration tracking
SELECT * FROM schema_migrations;

-- Check specific table structure
\d users
\d farms
\d fields
```

## 🚀 Next Steps After Manual Import

1. **Verify all tables** are created (46 total)
2. **Test basic operations**:
   ```sql
   INSERT INTO users (email, password_hash, display_name) 
   VALUES ('test@example.com', 'hashed_password', 'Test User');
   
   INSERT INTO farms (name, country, region) 
   VALUES ('Test Farm', 'Fiji', 'Central');
   ```

3. **Update your application** to use the database
4. **Set up your API endpoints** to interact with tables

## 📊 Expected Results

After successful import:
- ✅ **46 tables created**
- ✅ **All indexes applied**
- ✅ **Foreign key constraints active**
- ✅ **Triggers functioning**
- ✅ **Ready for application use**

---

**Manual Import Status**: Ready to execute
**Schema File**: `database/migrations/001_full_schema.sql`
**Expected Tables**: 46 comprehensive tables
**Verification**: Use SQL queries above
