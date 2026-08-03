-- Crops API persistence parity
-- Ensures crops table is usable by GET/POST /api/crops (Android + web)
-- Softens insert defaults and adds free-text location for web "field" values.

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS crops (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    farm_id UUID REFERENCES farms(id) ON DELETE CASCADE,
    field_id UUID REFERENCES fields(id) ON DELETE SET NULL,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    variety VARCHAR(255),
    category VARCHAR(100) NOT NULL DEFAULT 'general',
    planting_date DATE NOT NULL DEFAULT CURRENT_DATE,
    expected_harvest_date DATE,
    actual_harvest_date DATE,
    status VARCHAR(50) DEFAULT 'planted',
    growth_stage VARCHAR(50),
    area_planted DECIMAL(8,2) NOT NULL DEFAULT 0.01,
    expected_yield DECIMAL(10,2),
    actual_yield DECIMAL(10,2),
    yield_unit VARCHAR(20) DEFAULT 'kg',
    notes TEXT,
    location VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Free-text field/location from web crop-management (not fields.id UUID)
ALTER TABLE crops ADD COLUMN IF NOT EXISTS location VARCHAR(255);

-- Defaults so API creates without inventing hard client requirements
ALTER TABLE crops ALTER COLUMN category SET DEFAULT 'general';
ALTER TABLE crops ALTER COLUMN planting_date SET DEFAULT CURRENT_DATE;
ALTER TABLE crops ALTER COLUMN area_planted SET DEFAULT 0.01;
ALTER TABLE crops ALTER COLUMN status SET DEFAULT 'planted';

UPDATE crops SET category = 'general' WHERE category IS NULL OR TRIM(category) = '';
UPDATE crops SET planting_date = CURRENT_DATE WHERE planting_date IS NULL;
UPDATE crops SET area_planted = 0.01 WHERE area_planted IS NULL OR area_planted <= 0;

CREATE INDEX IF NOT EXISTS idx_crops_user_id ON crops(user_id);
CREATE INDEX IF NOT EXISTS idx_crops_farm_id ON crops(farm_id);
CREATE INDEX IF NOT EXISTS idx_crops_user_farm ON crops(user_id, farm_id);
