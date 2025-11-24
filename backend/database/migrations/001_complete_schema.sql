-- SmartFarm Complete Database Schema
-- Production-ready PostgreSQL schema for all SmartFarm features
-- Run this migration to create all tables

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "citext";

-- =====================================================================
-- CORE USER MANAGEMENT
-- =====================================================================

-- Users table with email verification
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email CITEXT UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    country VARCHAR(100) DEFAULT 'Fiji',
    role VARCHAR(50) DEFAULT 'farmer',
    is_verified BOOLEAN DEFAULT FALSE,
    verification_token VARCHAR(255),
    verification_expires TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    last_login TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User sessions for JWT token management
CREATE TABLE IF NOT EXISTS user_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    token_hash VARCHAR(255) NOT NULL,
    refresh_token_hash VARCHAR(255),
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_used_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================================
-- FARM MANAGEMENT
-- =====================================================================

-- Farms table
CREATE TABLE IF NOT EXISTS farms (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    area_hectares DECIMAL(10,2) NOT NULL,
    farm_type VARCHAR(100) NOT NULL,
    description TEXT,
    latitude DECIMAL(10,8),
    longitude DECIMAL(11,8),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Fields table
CREATE TABLE IF NOT EXISTS fields (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    farm_id UUID REFERENCES farms(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    area_hectares DECIMAL(10,2),
    soil_type VARCHAR(100),
    irrigation_type VARCHAR(50),
    latitude DECIMAL(10,8),
    longitude DECIMAL(11,8),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================================
-- CROP MANAGEMENT
-- =====================================================================

-- Crops table
CREATE TABLE IF NOT EXISTS crops (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    farm_id UUID REFERENCES farms(id) ON DELETE CASCADE,
    field_id UUID REFERENCES fields(id) ON DELETE SET NULL,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    variety VARCHAR(255),
    category VARCHAR(100) NOT NULL,
    planting_date DATE NOT NULL,
    expected_harvest_date DATE,
    actual_harvest_date DATE,
    status VARCHAR(50) DEFAULT 'planted', -- planted, growing, flowering, fruiting, harvesting, completed
    growth_stage VARCHAR(50), -- vegetative, flowering, fruiting, mature
    area_planted DECIMAL(8,2) NOT NULL,
    expected_yield DECIMAL(10,2),
    actual_yield DECIMAL(10,2),
    yield_unit VARCHAR(20) DEFAULT 'kg',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crop health records
CREATE TABLE IF NOT EXISTS crop_health_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    crop_id UUID REFERENCES crops(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    record_date DATE NOT NULL,
    health_status VARCHAR(50) DEFAULT 'healthy', -- healthy, warning, critical
    disease_detected VARCHAR(255),
    pest_detected VARCHAR(255),
    treatment_applied TEXT,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================================
-- LIVESTOCK MANAGEMENT
-- =====================================================================

-- Livestock table
CREATE TABLE IF NOT EXISTS livestock (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    farm_id UUID REFERENCES farms(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    animal_type VARCHAR(100) NOT NULL, -- Cattle, Pigs, Chickens, Sheep, Goats
    breed VARCHAR(100),
    tag_number VARCHAR(50) UNIQUE,
    gender VARCHAR(20), -- Male, Female
    birth_date DATE,
    age_months INTEGER,
    weight DECIMAL(8,2),
    health_status VARCHAR(50) DEFAULT 'healthy', -- healthy, sick, pregnant, injured
    lifecycle_stage VARCHAR(50), -- calf, heifer, cow, bull, etc.
    production_purpose VARCHAR(50), -- dairy, beef, breeding, meat, eggs, wool
    location VARCHAR(255),
    gps_latitude DECIMAL(10,8),
    gps_longitude DECIMAL(11,8),
    vaccination_status VARCHAR(50),
    last_vet_visit DATE,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Livestock health records
CREATE TABLE IF NOT EXISTS livestock_health_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    livestock_id UUID REFERENCES livestock(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    record_date DATE NOT NULL,
    health_status VARCHAR(50) DEFAULT 'healthy',
    symptoms TEXT,
    diagnosis TEXT,
    treatment TEXT,
    veterinarian VARCHAR(255),
    next_checkup_date DATE,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Pets table (for smaller animals)
CREATE TABLE IF NOT EXISTS pets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    farm_id UUID REFERENCES farms(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    species VARCHAR(100) NOT NULL,
    breed VARCHAR(100),
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

-- =====================================================================
-- FEED MIX CALCULATOR
-- =====================================================================

-- Feed mix calculations
CREATE TABLE IF NOT EXISTS feed_mix_calculations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    livestock_id UUID REFERENCES livestock(id) ON DELETE SET NULL,
    species VARCHAR(100) NOT NULL,
    lifecycle_stage VARCHAR(100) NOT NULL,
    weight DECIMAL(8,2) NOT NULL,
    age_months INTEGER,
    production_purpose VARCHAR(50),
    feed_mix JSONB NOT NULL, -- Store feed composition as JSON
    daily_intake_kg DECIMAL(10,2),
    daily_cost DECIMAL(10,2),
    monthly_cost DECIMAL(10,2),
    annual_cost DECIMAL(10,2),
    recommendations TEXT[],
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================================
-- AI ADVISORY SYSTEM
-- =====================================================================

-- AI crop nutrition advice
CREATE TABLE IF NOT EXISTS ai_crop_advice (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    crop_id UUID REFERENCES crops(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    growth_stage VARCHAR(50),
    recommendations JSONB NOT NULL, -- Store AI recommendations as JSON
    nutrition_advice TEXT,
    warnings TEXT[],
    tips TEXT[],
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- AI livestock health advice
CREATE TABLE IF NOT EXISTS ai_livestock_advice (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    livestock_id UUID REFERENCES livestock(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    health_status VARCHAR(50),
    recommendations JSONB NOT NULL, -- Store AI recommendations as JSON
    nutrition_advice TEXT,
    vaccination_schedule TEXT,
    health_checks TEXT[],
    warnings TEXT[],
    tips TEXT[],
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================================
-- QR CODE & TRACEABILITY
-- =====================================================================

-- QR codes for products/byproducts
CREATE TABLE IF NOT EXISTS qr_codes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID, -- Can reference crops, livestock, or inventory
    product_type VARCHAR(50) NOT NULL, -- crop, livestock, inventory
    qr_code_data TEXT NOT NULL,
    traceability_url TEXT NOT NULL,
    batch_number VARCHAR(100),
    generated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    scanned_count INTEGER DEFAULT 0,
    last_scanned_at TIMESTAMP
);

-- Traceability records
CREATE TABLE IF NOT EXISTS traceability_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    qr_code_id UUID REFERENCES qr_codes(id) ON DELETE CASCADE,
    scanned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    scanned_location VARCHAR(255),
    scanner_ip VARCHAR(45),
    user_agent TEXT
);

-- =====================================================================
-- INVENTORY MANAGEMENT
-- =====================================================================

-- Inventory items
CREATE TABLE IF NOT EXISTS inventory (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    farm_id UUID REFERENCES farms(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    item_name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    quantity DECIMAL(10,2) NOT NULL,
    unit VARCHAR(50) NOT NULL,
    cost_per_unit DECIMAL(10,2),
    supplier VARCHAR(255),
    purchase_date DATE,
    expiry_date DATE,
    location VARCHAR(255),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================================
-- TASK MANAGEMENT
-- =====================================================================

-- Tasks table
CREATE TABLE IF NOT EXISTS tasks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    farm_id UUID REFERENCES farms(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    priority VARCHAR(20) DEFAULT 'medium', -- low, medium, high, urgent
    status VARCHAR(50) DEFAULT 'pending', -- pending, in_progress, completed, cancelled
    due_date DATE,
    completed_date DATE,
    assigned_to UUID REFERENCES users(id) ON DELETE SET NULL,
    task_type VARCHAR(50), -- weeding, watering, harvesting, feeding, etc.
    related_crop_id UUID REFERENCES crops(id) ON DELETE SET NULL,
    related_livestock_id UUID REFERENCES livestock(id) ON DELETE SET NULL,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================================
-- WATERING MANAGEMENT
-- =====================================================================

-- Watering schedules
CREATE TABLE IF NOT EXISTS watering_schedules (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    crop_id UUID REFERENCES crops(id) ON DELETE CASCADE,
    field_id UUID REFERENCES fields(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    schedule_type VARCHAR(50) NOT NULL, -- daily, weekly, custom
    frequency_days INTEGER,
    duration_minutes INTEGER,
    water_amount_liters DECIMAL(10,2),
    next_watering_date DATE,
    is_active BOOLEAN DEFAULT TRUE,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Watering events log
CREATE TABLE IF NOT EXISTS watering_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    schedule_id UUID REFERENCES watering_schedules(id) ON DELETE SET NULL,
    crop_id UUID REFERENCES crops(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    watered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    water_amount_liters DECIMAL(10,2),
    method VARCHAR(50), -- drip, sprinkler, manual, etc.
    notes TEXT
);

-- =====================================================================
-- GEOFENCING
-- =====================================================================

-- Geofences
CREATE TABLE IF NOT EXISTS geofences (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    farm_id UUID REFERENCES farms(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    geofence_type VARCHAR(50) NOT NULL, -- polygon, circle
    coordinates JSONB NOT NULL, -- Store geofence coordinates
    radius_meters DECIMAL(10,2), -- For circle type
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Geofence alerts
CREATE TABLE IF NOT EXISTS geofence_alerts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    geofence_id UUID REFERENCES geofences(id) ON DELETE CASCADE,
    livestock_id UUID REFERENCES livestock(id) ON DELETE CASCADE,
    alert_type VARCHAR(50) NOT NULL, -- entry, exit, boundary_crossing
    latitude DECIMAL(10,8),
    longitude DECIMAL(11,8),
    alert_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_resolved BOOLEAN DEFAULT FALSE,
    resolved_at TIMESTAMP,
    notes TEXT
);

-- =====================================================================
-- WEATHER DATA
-- =====================================================================

-- Weather observations
CREATE TABLE IF NOT EXISTS weather_data (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    farm_id UUID REFERENCES farms(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    temperature_high DECIMAL(5,2),
    temperature_low DECIMAL(5,2),
    humidity DECIMAL(5,2),
    rainfall DECIMAL(8,2),
    wind_speed DECIMAL(5,2),
    wind_direction VARCHAR(10),
    conditions VARCHAR(100),
    source VARCHAR(50) DEFAULT 'api', -- api, manual, sensor
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(farm_id, date)
);

-- =====================================================================
-- FINANCIAL MANAGEMENT
-- =====================================================================

-- Financial records
CREATE TABLE IF NOT EXISTS financial_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    farm_id UUID REFERENCES farms(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL, -- income, expense
    category VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    amount DECIMAL(12,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'FJD',
    transaction_date DATE NOT NULL,
    payment_method VARCHAR(100),
    reference_number VARCHAR(255),
    related_crop_id UUID REFERENCES crops(id) ON DELETE SET NULL,
    related_livestock_id UUID REFERENCES livestock(id) ON DELETE SET NULL,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================================
-- SUBSCRIPTIONS & BILLING
-- =====================================================================

-- Subscriptions
CREATE TABLE IF NOT EXISTS subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    plan_name VARCHAR(100) NOT NULL,
    plan_type VARCHAR(50) NOT NULL, -- free, basic, premium
    status VARCHAR(50) DEFAULT 'active', -- active, cancelled, expired
    stripe_subscription_id VARCHAR(255),
    current_period_start DATE,
    current_period_end DATE,
    trial_end DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================================
-- ANALYTICS & MONITORING
-- =====================================================================

-- API usage tracking
CREATE TABLE IF NOT EXISTS api_usage (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    endpoint VARCHAR(255) NOT NULL,
    method VARCHAR(10) NOT NULL,
    response_time INTEGER, -- milliseconds
    status_code INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================================
-- INDEXES FOR PERFORMANCE
-- =====================================================================

-- Users indexes
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_verification_token ON users(verification_token);
CREATE INDEX IF NOT EXISTS idx_users_created_at ON users(created_at);
CREATE INDEX IF NOT EXISTS idx_user_sessions_user_id ON user_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_user_sessions_expires_at ON user_sessions(expires_at);

-- Farms indexes
CREATE INDEX IF NOT EXISTS idx_farms_user_id ON farms(user_id);
CREATE INDEX IF NOT EXISTS idx_fields_farm_id ON fields(farm_id);

-- Crops indexes
CREATE INDEX IF NOT EXISTS idx_crops_farm_id ON crops(farm_id);
CREATE INDEX IF NOT EXISTS idx_crops_user_id ON crops(user_id);
CREATE INDEX IF NOT EXISTS idx_crops_status ON crops(status);
CREATE INDEX IF NOT EXISTS idx_crop_health_crop_id ON crop_health_records(crop_id);

-- Livestock indexes
CREATE INDEX IF NOT EXISTS idx_livestock_farm_id ON livestock(farm_id);
CREATE INDEX IF NOT EXISTS idx_livestock_user_id ON livestock(user_id);
CREATE INDEX IF NOT EXISTS idx_livestock_tag_number ON livestock(tag_number);
CREATE INDEX IF NOT EXISTS idx_livestock_health_livestock_id ON livestock_health_records(livestock_id);

-- Feed mix indexes
CREATE INDEX IF NOT EXISTS idx_feed_mix_user_id ON feed_mix_calculations(user_id);
CREATE INDEX IF NOT EXISTS idx_feed_mix_livestock_id ON feed_mix_calculations(livestock_id);

-- AI advice indexes
CREATE INDEX IF NOT EXISTS idx_ai_crop_advice_crop_id ON ai_crop_advice(crop_id);
CREATE INDEX IF NOT EXISTS idx_ai_livestock_advice_livestock_id ON ai_livestock_advice(livestock_id);

-- QR code indexes
CREATE INDEX IF NOT EXISTS idx_qr_codes_product ON qr_codes(product_id, product_type);
CREATE INDEX IF NOT EXISTS idx_traceability_qr_code_id ON traceability_records(qr_code_id);

-- Task indexes
CREATE INDEX IF NOT EXISTS idx_tasks_user_id ON tasks(user_id);
CREATE INDEX IF NOT EXISTS idx_tasks_due_date ON tasks(due_date);
CREATE INDEX IF NOT EXISTS idx_tasks_status ON tasks(status);

-- Watering indexes
CREATE INDEX IF NOT EXISTS idx_watering_schedules_crop_id ON watering_schedules(crop_id);
CREATE INDEX IF NOT EXISTS idx_watering_events_crop_id ON watering_events(crop_id);

-- Geofence indexes
CREATE INDEX IF NOT EXISTS idx_geofences_farm_id ON geofences(farm_id);
CREATE INDEX IF NOT EXISTS idx_geofence_alerts_geofence_id ON geofence_alerts(geofence_id);

-- Weather indexes
CREATE INDEX IF NOT EXISTS idx_weather_data_farm_id ON weather_data(farm_id);
CREATE INDEX IF NOT EXISTS idx_weather_data_date ON weather_data(date);

-- Financial indexes
CREATE INDEX IF NOT EXISTS idx_financial_records_user_id ON financial_records(user_id);
CREATE INDEX IF NOT EXISTS idx_financial_records_date ON financial_records(transaction_date);
CREATE INDEX IF NOT EXISTS idx_financial_records_type ON financial_records(type);

-- Subscription indexes
CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_status ON subscriptions(status);

-- API usage indexes
CREATE INDEX IF NOT EXISTS idx_api_usage_user_id ON api_usage(user_id);
CREATE INDEX IF NOT EXISTS idx_api_usage_created_at ON api_usage(created_at);

-- =====================================================================
-- TRIGGERS FOR UPDATED_AT TIMESTAMPS
-- =====================================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply triggers to all tables with updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_farms_updated_at BEFORE UPDATE ON farms
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_fields_updated_at BEFORE UPDATE ON fields
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_crops_updated_at BEFORE UPDATE ON crops
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_livestock_updated_at BEFORE UPDATE ON livestock
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_pets_updated_at BEFORE UPDATE ON pets
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_inventory_updated_at BEFORE UPDATE ON inventory
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tasks_updated_at BEFORE UPDATE ON tasks
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_watering_schedules_updated_at BEFORE UPDATE ON watering_schedules
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_geofences_updated_at BEFORE UPDATE ON geofences
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_financial_records_updated_at BEFORE UPDATE ON financial_records
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_subscriptions_updated_at BEFORE UPDATE ON subscriptions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================================
-- COMMENTS FOR DOCUMENTATION
-- =====================================================================

COMMENT ON TABLE users IS 'User accounts with email verification support';
COMMENT ON TABLE farms IS 'Farm properties and locations';
COMMENT ON TABLE crops IS 'Crop planting and management records';
COMMENT ON TABLE livestock IS 'Livestock animal records with health tracking';
COMMENT ON TABLE feed_mix_calculations IS 'Feed mix calculator results and recommendations';
COMMENT ON TABLE ai_crop_advice IS 'AI-generated crop nutrition and care advice';
COMMENT ON TABLE ai_livestock_advice IS 'AI-generated livestock health advice';
COMMENT ON TABLE qr_codes IS 'QR codes for product traceability';
COMMENT ON TABLE tasks IS 'Task management and work assignments';
COMMENT ON TABLE watering_schedules IS 'Automated watering schedules for crops';
COMMENT ON TABLE geofences IS 'Geofencing boundaries for livestock tracking';
COMMENT ON TABLE weather_data IS 'Historical weather observations';
COMMENT ON TABLE financial_records IS 'Income and expense tracking';
COMMENT ON TABLE subscriptions IS 'User subscription and billing information';

