-- Migration: Durable manual revenue entries (W2-08)
-- Parallel to farmcosts for clear revenue vs cost separation.
-- Date: 2026-05-23
--
-- Rollback (manual):
--   DROP TABLE IF EXISTS farmrevenue;

CREATE TABLE IF NOT EXISTS farmrevenue (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    farm_id UUID REFERENCES farms(id) ON DELETE SET NULL,
    type VARCHAR(100) NOT NULL DEFAULT 'manual',
    amount DECIMAL(12, 2) NOT NULL,
    description TEXT,
    links JSONB,
    date DATE NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_farmrevenue_user_id ON farmrevenue(user_id);
CREATE INDEX IF NOT EXISTS idx_farmrevenue_created_at ON farmrevenue(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_farmrevenue_farm_id ON farmrevenue(farm_id);
CREATE INDEX IF NOT EXISTS idx_farmrevenue_date ON farmrevenue(date DESC);
CREATE INDEX IF NOT EXISTS idx_farmrevenue_type ON farmrevenue(type);

DROP TRIGGER IF EXISTS update_farmrevenue_updated_at ON farmrevenue;
CREATE TRIGGER update_farmrevenue_updated_at BEFORE UPDATE ON farmrevenue
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

COMMENT ON TABLE farmrevenue IS 'Manual and logged farm revenue (W2-08)';
COMMENT ON COLUMN farmrevenue.links IS 'Optional JSON e.g. category, cropName, livestockType';
