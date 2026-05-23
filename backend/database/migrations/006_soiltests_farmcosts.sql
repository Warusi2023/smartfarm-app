-- Migration: Durable soil tests and farm costs (W2-01)
-- Replaces file-backed / missing storage for soil and cost history.
-- Date: 2026-05-23
--
-- Rollback (manual — run only after backing up data):
--   DROP TABLE IF EXISTS farmcosts;
--   DROP TABLE IF EXISTS soiltests;
-- See bottom of this file for full rollback notes.

-- =====================================================================
-- SOIL TESTS
-- =====================================================================

CREATE TABLE IF NOT EXISTS soiltests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    farm_id UUID REFERENCES farms(id) ON DELETE SET NULL,
    crop_id UUID REFERENCES crops(id) ON DELETE SET NULL,
    field_id UUID REFERENCES fields(id) ON DELETE SET NULL,
    test_date DATE NOT NULL,
    nutrients JSONB NOT NULL DEFAULT '{}'::jsonb,
    notes TEXT,
    source VARCHAR(100),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_soiltests_user_id ON soiltests(user_id);
CREATE INDEX IF NOT EXISTS idx_soiltests_created_at ON soiltests(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_soiltests_farm_id ON soiltests(farm_id);
CREATE INDEX IF NOT EXISTS idx_soiltests_crop_id ON soiltests(crop_id);
CREATE INDEX IF NOT EXISTS idx_soiltests_field_id ON soiltests(field_id);
CREATE INDEX IF NOT EXISTS idx_soiltests_test_date ON soiltests(test_date DESC);

DROP TRIGGER IF EXISTS update_soiltests_updated_at ON soiltests;
CREATE TRIGGER update_soiltests_updated_at BEFORE UPDATE ON soiltests
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

COMMENT ON TABLE soiltests IS 'Soil test results per user/farm/crop/field (W2-01 durable store)';
COMMENT ON COLUMN soiltests.nutrients IS 'JSON nutrient readings e.g. ph, nitrogen, phosphorus, potassium';

-- =====================================================================
-- FARM COSTS
-- =====================================================================

CREATE TABLE IF NOT EXISTS farmcosts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    farm_id UUID REFERENCES farms(id) ON DELETE SET NULL,
    type VARCHAR(100) NOT NULL,
    amount DECIMAL(12, 2) NOT NULL,
    links JSONB,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_farmcosts_user_id ON farmcosts(user_id);
CREATE INDEX IF NOT EXISTS idx_farmcosts_created_at ON farmcosts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_farmcosts_farm_id ON farmcosts(farm_id);
CREATE INDEX IF NOT EXISTS idx_farmcosts_type ON farmcosts(type);

DROP TRIGGER IF EXISTS update_farmcosts_updated_at ON farmcosts;
CREATE TRIGGER update_farmcosts_updated_at BEFORE UPDATE ON farmcosts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

COMMENT ON TABLE farmcosts IS 'Farm cost entries per user/farm (W2-01 durable store)';
COMMENT ON COLUMN farmcosts.links IS 'Optional JSON links to crops, livestock, soil tests, invoices, etc.';

-- =====================================================================
-- ROLLBACK STRATEGY (W2-01)
-- =====================================================================
-- This migration is additive only. To roll back in dev/staging:
--   1. Export any rows you need: COPY soiltests TO ...; COPY farmcosts TO ...;
--   2. DROP TABLE IF EXISTS farmcosts;
--   3. DROP TABLE IF EXISTS soiltests;
-- Production rollback should be a forward migration (e.g. 007_drop_soiltests_farmcosts.sql)
-- rather than editing history, unless no data has been written yet.
-- Re-running this file is safe: CREATE TABLE IF NOT EXISTS / CREATE INDEX IF NOT EXISTS.
