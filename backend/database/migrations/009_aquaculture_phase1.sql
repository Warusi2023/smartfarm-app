-- Phase 1 aquaculture: production units and daily logs

CREATE TABLE IF NOT EXISTS aquaculture_units (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    farm_id UUID NOT NULL REFERENCES farms(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    unit_type VARCHAR(32) NOT NULL CHECK (unit_type IN ('pond', 'tank', 'cage', 'hatchery')),
    species VARCHAR(32) NOT NULL CHECK (species IN ('tilapia', 'shrimp', 'other')),
    species_other VARCHAR(255),
    capacity_notes TEXT,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS aquaculture_daily_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    unit_id UUID NOT NULL REFERENCES aquaculture_units(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    log_date DATE NOT NULL,
    feed_amount_kg DECIMAL(10, 2),
    mortality_count INTEGER DEFAULT 0,
    estimated_stock_count INTEGER,
    average_weight_g DECIMAL(10, 2),
    water_temp_c DECIMAL(5, 2),
    ph DECIMAL(4, 2),
    dissolved_oxygen_mgl DECIMAL(5, 2),
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (unit_id, log_date)
);

CREATE INDEX IF NOT EXISTS idx_aquaculture_units_farm_id ON aquaculture_units(farm_id);
CREATE INDEX IF NOT EXISTS idx_aquaculture_units_user_id ON aquaculture_units(user_id);
CREATE INDEX IF NOT EXISTS idx_aquaculture_daily_logs_unit_id ON aquaculture_daily_logs(unit_id);
CREATE INDEX IF NOT EXISTS idx_aquaculture_daily_logs_log_date ON aquaculture_daily_logs(log_date);
