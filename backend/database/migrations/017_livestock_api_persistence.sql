-- Livestock API persistence parity
-- Makes the livestock table usable by GET/POST /api/livestock (Android + web)
-- so records survive backend restarts instead of living in memory.

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS livestock (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    farm_id UUID REFERENCES farms(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    species VARCHAR(100) NOT NULL,
    breed VARCHAR(100),
    tag_number VARCHAR(50),
    gender VARCHAR(20),
    birth_date DATE,
    weight DECIMAL(8,2),
    health_status VARCHAR(50) DEFAULT 'healthy',
    vaccination_status VARCHAR(50),
    last_vet_visit DATE,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Fields the web/Android livestock UIs already send but the base schema lacked
ALTER TABLE livestock ADD COLUMN IF NOT EXISTS name VARCHAR(255);
ALTER TABLE livestock ADD COLUMN IF NOT EXISTS location VARCHAR(255);
ALTER TABLE livestock ADD COLUMN IF NOT EXISTS value DECIMAL(12,2);
ALTER TABLE livestock ADD COLUMN IF NOT EXISTS production_purpose VARCHAR(100);
ALTER TABLE livestock ADD COLUMN IF NOT EXISTS lifecycle_stage VARCHAR(100);
ALTER TABLE livestock ADD COLUMN IF NOT EXISTS breeding_status VARCHAR(100);
ALTER TABLE livestock ADD COLUMN IF NOT EXISTS sire_tag VARCHAR(50);
ALTER TABLE livestock ADD COLUMN IF NOT EXISTS dam_tag VARCHAR(50);
ALTER TABLE livestock ADD COLUMN IF NOT EXISTS first_calving_date DATE;
ALTER TABLE livestock ADD COLUMN IF NOT EXISTS last_calving_date DATE;
ALTER TABLE livestock ADD COLUMN IF NOT EXISTS photo TEXT;

ALTER TABLE livestock ALTER COLUMN health_status SET DEFAULT 'healthy';

UPDATE livestock SET health_status = 'healthy'
WHERE health_status IS NULL OR TRIM(health_status) = '';

UPDATE livestock SET name = COALESCE(NULLIF(TRIM(tag_number), ''), species)
WHERE name IS NULL OR TRIM(name) = '';

CREATE INDEX IF NOT EXISTS idx_livestock_user_id ON livestock(user_id);
CREATE INDEX IF NOT EXISTS idx_livestock_farm_id ON livestock(farm_id);
CREATE INDEX IF NOT EXISTS idx_livestock_user_farm ON livestock(user_id, farm_id);
