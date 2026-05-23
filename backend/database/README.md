# SmartFarm Database Schema

## 📋 Complete Database Schema for SmartFarm Platform

This directory contains the complete PostgreSQL database schema for the SmartFarm platform, including all features that have been implemented.

## 🗄️ Database Tables Overview

### **Core Tables (25 tables)**

1. **User Management**
   - `users` - User accounts with email verification
   - `user_sessions` - JWT token management
   - `user_preferences` - User settings and preferences

2. **Farm Management**
   - `farms` - Farm properties and locations
   - `fields` - Individual field/plot management

3. **Crop Management**
   - `crops` - Crop planting and tracking
   - `crop_health_records` - Crop health monitoring

4. **Livestock Management**
   - `livestock` - Animal records
   - `livestock_health_records` - Health tracking
   - `pets` - Pet management

5. **Feed & Nutrition**
   - `feed_mix_calculations` - Feed mix calculator results

6. **AI Advisory**
   - `ai_crop_advice` - AI crop nutrition advice
   - `ai_livestock_advice` - AI livestock health advice

7. **QR Code & Traceability**
   - `qr_codes` - QR code generation
   - `traceability_records` - QR code scan tracking

8. **Operations**
   - `tasks` - Task management
   - `watering_schedules` - Watering automation
   - `watering_events` - Watering log
   - `weeding_tasks` - Weeding management
   - `pesticide_applications` - Pesticide tracking

9. **Geofencing**
   - `geofences` - Geofence boundaries
   - `geofence_alerts` - Boundary alerts

10. **Inventory & Supply Chain**
    - `inventory` - Inventory management
    - `byproducts` - Product/byproduct tracking

11. **Financial**
    - `financial_records` - Income/expense tracking

12. **Weather**
    - `weather_data` - Historical weather observations

13. **Subscriptions**
    - `subscriptions` - User subscription management

14. **Analytics**
    - `api_usage` - API usage tracking
    - `reports` - Generated reports
    - `notifications` - User notifications

## 🚀 Setup Instructions

### Option 1: Run Complete Schema (Recommended)

```bash
# From backend/ folder
npm run migrate:prod
```

### Pre-Migration Backup (Subscriptions)

Before running production migrations that include `005_subscriptions_user_unique.sql`, back up the `subscriptions` table (or the full database).

Recommended minimum backup examples:

```bash
# full DB backup (preferred)
pg_dump "$DATABASE_URL" > pre_migrate_backup.sql
```

```sql
-- table-only backup in SQL clients (example)
CREATE TABLE subscriptions_backup AS
SELECT * FROM subscriptions;
```

Post-migration verification (must return zero rows):

```sql
SELECT user_id, COUNT(*)
FROM subscriptions
GROUP BY user_id
HAVING COUNT(*) > 1;
```

### Option 2: Using Railway CLI

```bash
# Connect to Railway Postgres
railway connect postgres

# Run canonical migration command
cd backend
npm run migrate:prod
```

### Option 3: Using Node.js Script

```bash
cd backend
node scripts/test-db-connection.js  # Verify connection first

# Then run SQL files using psql or pgAdmin
```

## 📊 Table Count

- **Total Tables**: 25+ tables
- **Core Features**: All implemented features covered
- **Indexes**: Optimized for performance
- **Triggers**: Auto-update timestamps

## ✅ Features Covered

- ✅ User authentication with email verification
- ✅ Farm and field management
- ✅ Crop management with health tracking
- ✅ Livestock management with health records
- ✅ Feed Mix Calculator
- ✅ AI Advisory (crop & livestock)
- ✅ QR Code traceability
- ✅ Task management
- ✅ Watering management
- ✅ Weeding management
- ✅ Pesticide management
- ✅ Geofencing
- ✅ Inventory management
- ✅ Supply chain/byproducts
- ✅ Financial records
- ✅ Soil tests (`soiltests`) — W2-01 migration `006_soiltests_farmcosts.sql`
- ✅ Farm costs (`farmcosts`) — W2-01 migration `006_soiltests_farmcosts.sql`
- ✅ Farm revenue (`farmrevenue`) — W2-08 migration `007_farmrevenue.sql`
- ✅ Soil test writes (`soiltests`) — W2-02 `soilTestsStore.js` (Postgres when pool + auth UUID; file fallback)
- ✅ Crop action costs (`farmcosts` type `crop-action`) — W2-05 via `POST /crop-recommendations/actions` (`costAmount`) or `POST /farm-costs/crop-action`
- ✅ Idempotent replay (`clientRequestId`) — W3-02 `writeIdempotency.js` for `POST /crop-recommendations/actions` and `POST /crop-recommendations/soil-tests` (file cache + `soiltests.nutrients.clientRequestId` for DB dedupe; **no new migration**)
- ✅ Weather data
- ✅ Subscriptions
- ✅ Analytics & reporting
- ✅ Notifications

## 🔍 Verification

After running migrations, verify tables were created:

```sql
-- List all tables
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;

-- Check table counts
SELECT 
    schemaname,
    tablename,
    pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) AS size
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;
```

## 📝 Migration Order

1. `001_complete_schema.sql` - Core tables
2. `002_add_missing_features.sql` - Additional features
3. `003_add_weather_alerts.sql` - Weather alerts tables and indexes
4. `add-email-verification.sql` - Email verification columns
5. `004_auth_users_columns.sql` - Trial and password reset columns
6. `005_subscriptions_user_unique.sql` - Enforce one row per user for upserts

## 🛠️ Maintenance

- All tables use UUID primary keys
- Foreign keys with CASCADE/SET NULL as appropriate
- Indexes on frequently queried columns
- Triggers for automatic `updated_at` timestamps
- JSONB columns for flexible data storage

## 📚 Related Files

- `backend/database/schema.sql` - Original schema (may be outdated)
- `backend/database/migrations/` - Migration files
- `backend/scripts/test-db-connection.js` - Database connection test

---

**Last Updated**: After creating complete schema
**Status**: Ready for production use

