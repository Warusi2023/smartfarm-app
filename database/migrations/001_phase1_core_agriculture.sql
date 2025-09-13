-- =====================================================
-- SMARTFARM DATABASE - PHASE 1: CORE AGRICULTURE
-- =====================================================
-- Implementation: Immediate
-- Tables: 15 core tables for basic farm management
-- Features: Farms, Fields, Crops, Livestock, Basic Floriculture, Horticulture, Livestock Nutrition

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "postgis";

-- =====================================================
-- CORE FARM MANAGEMENT TABLES
-- =====================================================

-- Users table (if not exists)
CREATE TABLE IF NOT EXISTS users (
    id BIGSERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    phone VARCHAR(20),
    role VARCHAR(20) DEFAULT 'farmer',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Farms table
CREATE TABLE IF NOT EXISTS farms (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    location POINT,
    address TEXT,
    area DECIMAL(10,2), -- in hectares
    soil_type VARCHAR(100),
    climate_zone VARCHAR(50),
    elevation DECIMAL(8,2), -- in meters
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Fields table
CREATE TABLE IF NOT EXISTS fields (
    id BIGSERIAL PRIMARY KEY,
    farm_id BIGINT REFERENCES farms(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    area DECIMAL(10,2), -- in hectares
    soil_type VARCHAR(100),
    soil_ph DECIMAL(3,2),
    organic_matter DECIMAL(4,2), -- percentage
    irrigation_type VARCHAR(50),
    drainage VARCHAR(50),
    slope DECIMAL(4,2), -- percentage
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crops table
CREATE TABLE IF NOT EXISTS crops (
    id BIGSERIAL PRIMARY KEY,
    field_id BIGINT REFERENCES fields(id) ON DELETE CASCADE,
    crop_type VARCHAR(100) NOT NULL,
    variety VARCHAR(100),
    planting_date DATE,
    expected_harvest_date DATE,
    actual_harvest_date DATE,
    planting_density DECIMAL(8,2), -- plants per hectare
    seed_quantity DECIMAL(8,2), -- kg
    expected_yield DECIMAL(10,2), -- kg per hectare
    actual_yield DECIMAL(10,2), -- kg per hectare
    quality_score DECIMAL(3,2), -- 0.0 to 1.0
    status VARCHAR(50) DEFAULT 'planted',
    notes TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Livestock table
CREATE TABLE IF NOT EXISTS livestock (
    id BIGSERIAL PRIMARY KEY,
    farm_id BIGINT REFERENCES farms(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(50) NOT NULL, -- CATTLE, SHEEP, PIGS, POULTRY, etc.
    breed VARCHAR(100),
    birth_date DATE,
    weight DECIMAL(8,2), -- kg
    health_status VARCHAR(50) DEFAULT 'healthy',
    gender VARCHAR(10),
    identification_tag VARCHAR(100),
    parent_male_id BIGINT REFERENCES livestock(id),
    parent_female_id BIGINT REFERENCES livestock(id),
    notes TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- BASIC FLORICULTURE TABLES
-- =====================================================

-- Flower production table
CREATE TABLE IF NOT EXISTS flower_production (
    id BIGSERIAL PRIMARY KEY,
    production_id VARCHAR(100) UNIQUE NOT NULL DEFAULT uuid_generate_v4()::text,
    field_id BIGINT REFERENCES fields(id) ON DELETE CASCADE,
    flower_type VARCHAR(50) NOT NULL, -- ROSE, TULIP, LILY, etc.
    variety VARCHAR(100),
    planting_date TIMESTAMP,
    harvest_date TIMESTAMP,
    growth_stage VARCHAR(50) DEFAULT 'planted',
    quality_score DECIMAL(3,2), -- 0.0 to 1.0
    yield DECIMAL(10,2), -- kg or stems
    market_value DECIMAL(10,2),
    color VARCHAR(50),
    size DECIMAL(8,2), -- cm
    fragrance_score DECIMAL(3,2), -- 0.0 to 1.0
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Greenhouse management table
CREATE TABLE IF NOT EXISTS greenhouse_management (
    id BIGSERIAL PRIMARY KEY,
    greenhouse_id VARCHAR(100) UNIQUE NOT NULL DEFAULT uuid_generate_v4()::text,
    farm_id BIGINT REFERENCES farms(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    greenhouse_type VARCHAR(50), -- GLASS, POLYCARBONATE, etc.
    area DECIMAL(10,2), -- square meters
    temperature_setpoint DECIMAL(5,2), -- Celsius
    humidity_setpoint DECIMAL(5,2), -- percentage
    co2_setpoint DECIMAL(6,2), -- ppm
    light_intensity DECIMAL(10,2), -- lux
    irrigation_system VARCHAR(50),
    ventilation_system VARCHAR(50),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Ornamental plants table
CREATE TABLE IF NOT EXISTS ornamental_plants (
    id BIGSERIAL PRIMARY KEY,
    plant_id VARCHAR(100) UNIQUE NOT NULL DEFAULT uuid_generate_v4()::text,
    greenhouse_id BIGINT REFERENCES greenhouse_management(id) ON DELETE CASCADE,
    species VARCHAR(100),
    cultivar VARCHAR(100),
    plant_type VARCHAR(50), -- ANNUAL, PERENNIAL, etc.
    height DECIMAL(8,2), -- cm
    spread DECIMAL(8,2), -- cm
    flower_color VARCHAR(50),
    bloom_time VARCHAR(100),
    care_requirements TEXT,
    market_value DECIMAL(10,2),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- BASIC HORTICULTURE TABLES
-- =====================================================

-- Fruit trees table
CREATE TABLE IF NOT EXISTS fruit_trees (
    id BIGSERIAL PRIMARY KEY,
    tree_id VARCHAR(100) UNIQUE NOT NULL DEFAULT uuid_generate_v4()::text,
    farm_id BIGINT REFERENCES farms(id) ON DELETE CASCADE,
    species VARCHAR(100),
    variety VARCHAR(100),
    planting_date TIMESTAMP,
    age INTEGER, -- years
    height DECIMAL(8,2), -- meters
    canopy_spread DECIMAL(8,2), -- meters
    trunk_diameter DECIMAL(8,2), -- cm
    health_score DECIMAL(3,2), -- 0.0 to 1.0
    productivity_score DECIMAL(3,2), -- 0.0 to 1.0
    last_harvest_date DATE,
    expected_yield DECIMAL(10,2), -- kg
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Vegetable production table
CREATE TABLE IF NOT EXISTS vegetable_production (
    id BIGSERIAL PRIMARY KEY,
    production_id VARCHAR(100) UNIQUE NOT NULL DEFAULT uuid_generate_v4()::text,
    field_id BIGINT REFERENCES fields(id) ON DELETE CASCADE,
    vegetable_type VARCHAR(50), -- TOMATO, PEPPER, CUCUMBER, etc.
    variety VARCHAR(100),
    planting_date TIMESTAMP,
    harvest_date TIMESTAMP,
    growth_stage VARCHAR(50) DEFAULT 'planted',
    yield DECIMAL(10,2), -- kg per hectare
    quality_score DECIMAL(3,2), -- 0.0 to 1.0
    size DECIMAL(8,2), -- cm
    color VARCHAR(50),
    firmness_score DECIMAL(3,2), -- 0.0 to 1.0
    shelf_life INTEGER, -- days
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Herb garden table
CREATE TABLE IF NOT EXISTS herb_garden (
    id BIGSERIAL PRIMARY KEY,
    garden_id VARCHAR(100) UNIQUE NOT NULL DEFAULT uuid_generate_v4()::text,
    farm_id BIGINT REFERENCES farms(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    area DECIMAL(10,2), -- square meters
    layout_type VARCHAR(50), -- FORMAL, INFORMAL, etc.
    soil_type VARCHAR(100),
    irrigation_method VARCHAR(50),
    herbs_count INTEGER,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Herbs table
CREATE TABLE IF NOT EXISTS herbs (
    id BIGSERIAL PRIMARY KEY,
    herb_id VARCHAR(100) UNIQUE NOT NULL DEFAULT uuid_generate_v4()::text,
    garden_id BIGINT REFERENCES herb_garden(id) ON DELETE CASCADE,
    name VARCHAR(100),
    type VARCHAR(50), -- CULINARY, MEDICINAL, AROMATIC, etc.
    height DECIMAL(8,2), -- cm
    spread DECIMAL(8,2), -- cm
    color VARCHAR(50),
    fragrance BOOLEAN DEFAULT FALSE,
    flowering BOOLEAN DEFAULT FALSE,
    light_requirements VARCHAR(50),
    water_needs VARCHAR(50),
    uses TEXT[],
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- BASIC LIVESTOCK NUTRITION TABLES
-- =====================================================

-- Livestock nutrition table
CREATE TABLE IF NOT EXISTS livestock_nutrition (
    id BIGSERIAL PRIMARY KEY,
    nutrition_id VARCHAR(100) UNIQUE NOT NULL DEFAULT uuid_generate_v4()::text,
    livestock_id BIGINT REFERENCES livestock(id) ON DELETE CASCADE,
    animal_type VARCHAR(50),
    age_group VARCHAR(50), -- NEWBORN, YOUNG, ADULT, etc.
    weight DECIMAL(8,2), -- kg
    protein_requirement DECIMAL(6,2), -- percentage
    energy_requirement DECIMAL(8,2), -- kcal/kg
    fiber_requirement DECIMAL(6,2), -- percentage
    water_intake DECIMAL(8,2), -- liters per day
    feeding_frequency INTEGER, -- times per day
    daily_feed_amount DECIMAL(8,2), -- kg
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Feed ingredients table
CREATE TABLE IF NOT EXISTS feed_ingredients (
    id BIGSERIAL PRIMARY KEY,
    ingredient_id VARCHAR(100) UNIQUE NOT NULL DEFAULT uuid_generate_v4()::text,
    name VARCHAR(100) NOT NULL,
    category VARCHAR(50), -- CONCENTRATE, ROUGHAGE, FORAGE, etc.
    protein_content DECIMAL(6,2), -- percentage
    energy_content DECIMAL(8,2), -- kcal/kg
    fiber_content DECIMAL(6,2), -- percentage
    fat_content DECIMAL(6,2), -- percentage
    cost_per_kg DECIMAL(8,2),
    availability VARCHAR(50), -- HIGH, MEDIUM, LOW
    quality_grade VARCHAR(20), -- PREMIUM, GRADE_A, etc.
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Feed rations table
CREATE TABLE IF NOT EXISTS feed_rations (
    id BIGSERIAL PRIMARY KEY,
    ration_id VARCHAR(100) UNIQUE NOT NULL DEFAULT uuid_generate_v4()::text,
    animal_type VARCHAR(50),
    age_group VARCHAR(50),
    total_weight DECIMAL(8,2), -- kg per day
    cost_per_day DECIMAL(8,2),
    protein_percentage DECIMAL(6,2),
    energy_density DECIMAL(8,2), -- kcal/kg
    fiber_percentage DECIMAL(6,2),
    calcium_percentage DECIMAL(6,2),
    phosphorus_percentage DECIMAL(6,2),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Feeding schedules table
CREATE TABLE IF NOT EXISTS feeding_schedules (
    id BIGSERIAL PRIMARY KEY,
    schedule_id VARCHAR(100) UNIQUE NOT NULL DEFAULT uuid_generate_v4()::text,
    animal_type VARCHAR(50),
    age_group VARCHAR(50),
    feeding_times TEXT[], -- array of times like ["06:00", "12:00", "18:00"]
    total_daily_amount DECIMAL(8,2), -- kg
    feeding_method VARCHAR(50), -- FREE_CHOICE, RESTRICTED, etc.
    water_availability BOOLEAN DEFAULT TRUE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- INDEXES FOR PERFORMANCE
-- =====================================================

-- Core farm indexes
CREATE INDEX IF NOT EXISTS idx_farms_user_id ON farms(user_id);
CREATE INDEX IF NOT EXISTS idx_farms_location ON farms USING GIST(location);
CREATE INDEX IF NOT EXISTS idx_fields_farm_id ON fields(farm_id);
CREATE INDEX IF NOT EXISTS idx_crops_field_id ON crops(field_id);
CREATE INDEX IF NOT EXISTS idx_crops_type ON crops(crop_type);
CREATE INDEX IF NOT EXISTS idx_livestock_farm_id ON livestock(farm_id);
CREATE INDEX IF NOT EXISTS idx_livestock_category ON livestock(category);

-- Floriculture indexes
CREATE INDEX IF NOT EXISTS idx_flower_production_type ON flower_production(flower_type);
CREATE INDEX IF NOT EXISTS idx_flower_production_field_id ON flower_production(field_id);
CREATE INDEX IF NOT EXISTS idx_greenhouse_farm_id ON greenhouse_management(farm_id);
CREATE INDEX IF NOT EXISTS idx_ornamental_greenhouse_id ON ornamental_plants(greenhouse_id);

-- Horticulture indexes
CREATE INDEX IF NOT EXISTS idx_fruit_trees_farm_id ON fruit_trees(farm_id);
CREATE INDEX IF NOT EXISTS idx_fruit_trees_species ON fruit_trees(species);
CREATE INDEX IF NOT EXISTS idx_vegetable_production_field_id ON vegetable_production(field_id);
CREATE INDEX IF NOT EXISTS idx_vegetable_production_type ON vegetable_production(vegetable_type);
CREATE INDEX IF NOT EXISTS idx_herb_garden_farm_id ON herb_garden(farm_id);
CREATE INDEX IF NOT EXISTS idx_herbs_garden_id ON herbs(garden_id);

-- Livestock nutrition indexes
CREATE INDEX IF NOT EXISTS idx_livestock_nutrition_livestock_id ON livestock_nutrition(livestock_id);
CREATE INDEX IF NOT EXISTS idx_livestock_nutrition_animal_type ON livestock_nutrition(animal_type);
CREATE INDEX IF NOT EXISTS idx_feed_ingredients_category ON feed_ingredients(category);
CREATE INDEX IF NOT EXISTS idx_feed_rations_animal_type ON feed_rations(animal_type);
CREATE INDEX IF NOT EXISTS idx_feeding_schedules_animal_type ON feeding_schedules(animal_type);

-- =====================================================
-- TRIGGERS FOR AUTOMATIC TIMESTAMP UPDATES
-- =====================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply triggers to all tables with updated_at column
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_farms_updated_at BEFORE UPDATE ON farms FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_fields_updated_at BEFORE UPDATE ON fields FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_crops_updated_at BEFORE UPDATE ON crops FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_livestock_updated_at BEFORE UPDATE ON livestock FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_flower_production_updated_at BEFORE UPDATE ON flower_production FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_greenhouse_management_updated_at BEFORE UPDATE ON greenhouse_management FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_ornamental_plants_updated_at BEFORE UPDATE ON ornamental_plants FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_fruit_trees_updated_at BEFORE UPDATE ON fruit_trees FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_vegetable_production_updated_at BEFORE UPDATE ON vegetable_production FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_herb_garden_updated_at BEFORE UPDATE ON herb_garden FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_herbs_updated_at BEFORE UPDATE ON herbs FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_livestock_nutrition_updated_at BEFORE UPDATE ON livestock_nutrition FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_feed_ingredients_updated_at BEFORE UPDATE ON feed_ingredients FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_feed_rations_updated_at BEFORE UPDATE ON feed_rations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_feeding_schedules_updated_at BEFORE UPDATE ON feeding_schedules FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- CONSTRAINTS FOR DATA VALIDATION
-- =====================================================

-- Farm constraints
ALTER TABLE farms ADD CONSTRAINT chk_farm_area CHECK (area > 0);
ALTER TABLE fields ADD CONSTRAINT chk_field_area CHECK (area > 0);
ALTER TABLE crops ADD CONSTRAINT chk_crop_yield CHECK (expected_yield >= 0 AND actual_yield >= 0);
ALTER TABLE livestock ADD CONSTRAINT chk_livestock_weight CHECK (weight > 0);

-- Floriculture constraints
ALTER TABLE flower_production ADD CONSTRAINT chk_flower_yield CHECK (yield >= 0);
ALTER TABLE flower_production ADD CONSTRAINT chk_flower_quality CHECK (quality_score >= 0 AND quality_score <= 1);
ALTER TABLE greenhouse_management ADD CONSTRAINT chk_greenhouse_area CHECK (area > 0);

-- Horticulture constraints
ALTER TABLE fruit_trees ADD CONSTRAINT chk_tree_height CHECK (height > 0);
ALTER TABLE fruit_trees ADD CONSTRAINT chk_tree_health CHECK (health_score >= 0 AND health_score <= 1);
ALTER TABLE vegetable_production ADD CONSTRAINT chk_vegetable_yield CHECK (yield >= 0);

-- Livestock nutrition constraints
ALTER TABLE livestock_nutrition ADD CONSTRAINT chk_nutrition_weight CHECK (weight > 0);
ALTER TABLE livestock_nutrition ADD CONSTRAINT chk_protein_requirement CHECK (protein_requirement >= 0 AND protein_requirement <= 100);
ALTER TABLE feed_ingredients ADD CONSTRAINT chk_protein_content CHECK (protein_content >= 0 AND protein_content <= 100);
ALTER TABLE feed_rations ADD CONSTRAINT chk_ration_weight CHECK (total_weight > 0);

-- =====================================================
-- SAMPLE DATA FOR TESTING
-- =====================================================

-- Insert sample user
INSERT INTO users (username, email, password_hash, first_name, last_name, role) 
VALUES ('demo_farmer', 'demo@smartfarm.com', 'hashed_password', 'Demo', 'Farmer', 'farmer')
ON CONFLICT (email) DO NOTHING;

-- Insert sample farm (assuming user_id = 1)
INSERT INTO farms (user_id, name, description, location, area, soil_type, climate_zone)
VALUES (1, 'Demo Smart Farm', 'A demonstration farm showcasing SmartFarm capabilities', POINT(-74.0059, 40.7128), 100.5, 'Loam', 'Temperate')
ON CONFLICT DO NOTHING;

-- Insert sample field (assuming farm_id = 1)
INSERT INTO fields (farm_id, name, area, soil_type, soil_ph, irrigation_type)
VALUES (1, 'North Field', 25.0, 'Clay Loam', 6.8, 'Drip Irrigation')
ON CONFLICT DO NOTHING;

-- =====================================================
-- PHASE 1 COMPLETION SUMMARY
-- =====================================================
-- ✅ 15 Core Tables Created
-- ✅ Indexes for Performance Optimization
-- ✅ Triggers for Automatic Timestamp Updates
-- ✅ Constraints for Data Validation
-- ✅ Sample Data for Testing
-- ✅ Ready for Basic Farm Management Operations
