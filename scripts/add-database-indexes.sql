-- Performance Optimization: Database Indexes
-- Run this script to add indexes for frequently queried fields
-- Execute via Railway Database Dashboard or migration script

-- ============================================
-- User Table Indexes
-- ============================================

-- Email index (for login lookups - most critical)
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- User ID index (usually auto-created as primary key, but ensure it exists)
-- CREATE INDEX IF NOT EXISTS idx_users_id ON users(id); -- Usually not needed if primary key

-- Created_at index (for sorting users by registration date)
CREATE INDEX IF NOT EXISTS idx_users_created_at ON users(created_at DESC);

-- ============================================
-- Farm Table Indexes
-- ============================================

-- User ID index (for fetching user's farms)
CREATE INDEX IF NOT EXISTS idx_farms_user_id ON farms(user_id);

-- Created_at index (for sorting farms)
CREATE INDEX IF NOT EXISTS idx_farms_created_at ON farms(created_at DESC);

-- Updated_at index (for sorting by recent updates)
CREATE INDEX IF NOT EXISTS idx_farms_updated_at ON farms(updated_at DESC);

-- Composite index (user_id + created_at) - common query pattern
CREATE INDEX IF NOT EXISTS idx_farms_user_created ON farms(user_id, created_at DESC);

-- Farm name index (if searching by name)
CREATE INDEX IF NOT EXISTS idx_farms_name ON farms(name);

-- ============================================
-- Crop Table Indexes
-- ============================================

-- Farm ID index (for fetching farm's crops)
CREATE INDEX IF NOT EXISTS idx_crops_farm_id ON crops(farm_id);

-- Created_at index (for sorting crops)
CREATE INDEX IF NOT EXISTS idx_crops_created_at ON crops(created_at DESC);

-- Updated_at index
CREATE INDEX IF NOT EXISTS idx_crops_updated_at ON crops(updated_at DESC);

-- Composite index (farm_id + created_at)
CREATE INDEX IF NOT EXISTS idx_crops_farm_created ON crops(farm_id, created_at DESC);

-- Crop type/index (if filtering by crop type)
CREATE INDEX IF NOT EXISTS idx_crops_type ON crops(type);

-- Status index (if filtering by status)
CREATE INDEX IF NOT EXISTS idx_crops_status ON crops(status);

-- ============================================
-- Livestock Table Indexes
-- ============================================

-- Farm ID index (for fetching farm's livestock)
CREATE INDEX IF NOT EXISTS idx_livestock_farm_id ON livestock(farm_id);

-- Created_at index (for sorting livestock)
CREATE INDEX IF NOT EXISTS idx_livestock_created_at ON livestock(created_at DESC);

-- Updated_at index
CREATE INDEX IF NOT EXISTS idx_livestock_updated_at ON livestock(updated_at DESC);

-- Composite index (farm_id + created_at)
CREATE INDEX IF NOT EXISTS idx_livestock_farm_created ON livestock(farm_id, created_at DESC);

-- Species index (if filtering by species)
CREATE INDEX IF NOT EXISTS idx_livestock_species ON livestock(species);

-- Status index (if filtering by status)
CREATE INDEX IF NOT EXISTS idx_livestock_status ON livestock(status);

-- ============================================
-- Additional Common Indexes
-- ============================================

-- If you have a tasks table
-- CREATE INDEX IF NOT EXISTS idx_tasks_user_id ON tasks(user_id);
-- CREATE INDEX IF NOT EXISTS idx_tasks_farm_id ON tasks(farm_id);
-- CREATE INDEX IF NOT EXISTS idx_tasks_due_date ON tasks(due_date);
-- CREATE INDEX IF NOT EXISTS idx_tasks_status ON tasks(status);

-- If you have an inventory table
-- CREATE INDEX IF NOT EXISTS idx_inventory_farm_id ON inventory(farm_id);
-- CREATE INDEX IF NOT EXISTS idx_inventory_category ON inventory(category);

-- ============================================
-- Verification Queries
-- ============================================

-- Check all indexes
-- SELECT 
--     tablename,
--     indexname,
--     indexdef
-- FROM pg_indexes
-- WHERE schemaname = 'public'
-- ORDER BY tablename, indexname;

-- Check index usage (run after some time)
-- SELECT 
--     schemaname,
--     tablename,
--     indexname,
--     idx_scan as index_scans,
--     idx_tup_read as tuples_read,
--     idx_tup_fetch as tuples_fetched
-- FROM pg_stat_user_indexes
-- WHERE schemaname = 'public'
-- ORDER BY idx_scan DESC;
