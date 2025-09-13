-- =====================================================
-- SMARTFARM DATABASE - PHASE 2: ADVANCED FEATURES
-- =====================================================
-- Implementation: Month 1-2
-- Tables: AI/ML prediction, IoT device management, Blockchain traceability
-- Features: Machine Learning, Internet of Things, Supply Chain Transparency

-- =====================================================
-- AI/ML PREDICTION TABLES
-- =====================================================

-- AI Models table
CREATE TABLE IF NOT EXISTS ai_models (
    id BIGSERIAL PRIMARY KEY,
    model_id VARCHAR(100) UNIQUE NOT NULL DEFAULT uuid_generate_v4()::text,
    model_name VARCHAR(255) NOT NULL,
    model_type VARCHAR(50), -- CROP_HEALTH, YIELD_PREDICTION, PEST_DETECTION, etc.
    algorithm VARCHAR(100), -- CNN, LSTM, TRANSFORMER, etc.
    version VARCHAR(20) DEFAULT '1.0.0',
    accuracy DECIMAL(5,4), -- 0.0 to 1.0
    precision_score DECIMAL(5,4),
    recall_score DECIMAL(5,4),
    f1_score DECIMAL(5,4),
    training_data_size INTEGER,
    training_date TIMESTAMP,
    model_parameters JSONB,
    performance_metrics JSONB,
    model_file_path VARCHAR(500),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crop Health Predictions table
CREATE TABLE IF NOT EXISTS crop_health_predictions (
    id BIGSERIAL PRIMARY KEY,
    prediction_id VARCHAR(100) UNIQUE NOT NULL DEFAULT uuid_generate_v4()::text,
    field_id BIGINT REFERENCES fields(id) ON DELETE CASCADE,
    crop_id BIGINT REFERENCES crops(id) ON DELETE CASCADE,
    model_id BIGINT REFERENCES ai_models(id),
    health_score DECIMAL(3,2), -- 0.0 to 1.0
    disease_probability DECIMAL(3,2),
    pest_probability DECIMAL(3,2),
    stress_level DECIMAL(3,2),
    predicted_yield DECIMAL(10,2),
    confidence_level DECIMAL(3,2),
    recommendations TEXT[],
    risk_factors JSONB,
    prediction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Yield Predictions table
CREATE TABLE IF NOT EXISTS yield_predictions (
    id BIGSERIAL PRIMARY KEY,
    prediction_id VARCHAR(100) UNIQUE NOT NULL DEFAULT uuid_generate_v4()::text,
    field_id BIGINT REFERENCES fields(id) ON DELETE CASCADE,
    crop_id BIGINT REFERENCES crops(id) ON DELETE CASCADE,
    model_id BIGINT REFERENCES ai_models(id),
    predicted_yield DECIMAL(10,2), -- kg per hectare
    confidence_interval_lower DECIMAL(10,2),
    confidence_interval_upper DECIMAL(10,2),
    confidence_level DECIMAL(3,2),
    prediction_factors JSONB, -- weather, soil, management practices
    seasonal_adjustment DECIMAL(5,2),
    market_price_impact DECIMAL(8,2),
    recommendations TEXT[],
    prediction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    harvest_date DATE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Pest Detection table
CREATE TABLE IF NOT EXISTS pest_detections (
    id BIGSERIAL PRIMARY KEY,
    detection_id VARCHAR(100) UNIQUE NOT NULL DEFAULT uuid_generate_v4()::text,
    field_id BIGINT REFERENCES fields(id) ON DELETE CASCADE,
    crop_id BIGINT REFERENCES crops(id) ON DELETE CASCADE,
    model_id BIGINT REFERENCES ai_models(id),
    pest_type VARCHAR(100),
    pest_species VARCHAR(100),
    severity_level DECIMAL(3,2), -- 0.0 to 1.0
    infestation_area DECIMAL(10,2), -- square meters
    detection_location POINT,
    image_data BYTEA,
    image_metadata JSONB,
    detection_confidence DECIMAL(3,2),
    treatment_recommendations TEXT[],
    economic_impact DECIMAL(10,2),
    detection_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Disease Diagnosis table
CREATE TABLE IF NOT EXISTS disease_diagnoses (
    id BIGSERIAL PRIMARY KEY,
    diagnosis_id VARCHAR(100) UNIQUE NOT NULL DEFAULT uuid_generate_v4()::text,
    crop_id BIGINT REFERENCES crops(id) ON DELETE CASCADE,
    model_id BIGINT REFERENCES ai_models(id),
    disease_type VARCHAR(100),
    disease_species VARCHAR(100),
    severity_level DECIMAL(3,2),
    affected_area_percentage DECIMAL(5,2),
    symptoms TEXT[],
    diagnostic_images BYTEA[],
    treatment_plan JSONB,
    treatment_cost DECIMAL(8,2),
    recovery_probability DECIMAL(3,2),
    prevention_measures TEXT[],
    diagnosis_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- IOT DEVICE MANAGEMENT TABLES
-- =====================================================

-- IoT Devices table
CREATE TABLE IF NOT EXISTS iot_devices (
    id BIGSERIAL PRIMARY KEY,
    device_id VARCHAR(100) UNIQUE NOT NULL DEFAULT uuid_generate_v4()::text,
    device_name VARCHAR(255) NOT NULL,
    device_type VARCHAR(50), -- SENSOR, ACTUATOR, GATEWAY, etc.
    device_category VARCHAR(50), -- SOIL_SENSOR, WEATHER_STATION, IRRIGATION_CONTROLLER, etc.
    manufacturer VARCHAR(100),
    model VARCHAR(100),
    serial_number VARCHAR(100),
    firmware_version VARCHAR(50),
    location POINT,
    field_id BIGINT REFERENCES fields(id),
    farm_id BIGINT REFERENCES farms(id),
    capabilities JSONB,
    connectivity_type VARCHAR(50), -- WIFI, LORA, BLUETOOTH, etc.
    power_source VARCHAR(50), -- BATTERY, SOLAR, GRID, etc.
    battery_level DECIMAL(5,2), -- percentage
    signal_strength DECIMAL(5,2), -- dBm
    status VARCHAR(50) DEFAULT 'active', -- active, inactive, maintenance, error
    last_communication TIMESTAMP,
    configuration JSONB,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sensors table
CREATE TABLE IF NOT EXISTS sensors (
    id BIGSERIAL PRIMARY KEY,
    sensor_id VARCHAR(100) UNIQUE NOT NULL DEFAULT uuid_generate_v4()::text,
    device_id BIGINT REFERENCES iot_devices(id) ON DELETE CASCADE,
    sensor_type VARCHAR(50), -- TEMPERATURE, HUMIDITY, SOIL_MOISTURE, etc.
    sensor_category VARCHAR(50), -- ENVIRONMENTAL, SOIL, CROP, etc.
    measurement_unit VARCHAR(20), -- CELSIUS, PERCENTAGE, PPM, etc.
    measurement_range_min DECIMAL(10,4),
    measurement_range_max DECIMAL(10,4),
    accuracy DECIMAL(6,4), -- +/- percentage
    resolution DECIMAL(8,4),
    calibration_date TIMESTAMP,
    calibration_due_date TIMESTAMP,
    location POINT,
    installation_height DECIMAL(5,2), -- meters above ground
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sensor Readings table
CREATE TABLE IF NOT EXISTS sensor_readings (
    id BIGSERIAL PRIMARY KEY,
    sensor_id BIGINT REFERENCES sensors(id) ON DELETE CASCADE,
    reading_value DECIMAL(12,6),
    unit VARCHAR(20),
    quality_score DECIMAL(3,2), -- 0.0 to 1.0
    reading_location POINT,
    battery_level DECIMAL(5,2),
    signal_strength DECIMAL(5,2),
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_anomaly BOOLEAN DEFAULT FALSE,
    anomaly_score DECIMAL(3,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Actuators table
CREATE TABLE IF NOT EXISTS actuators (
    id BIGSERIAL PRIMARY KEY,
    actuator_id VARCHAR(100) UNIQUE NOT NULL DEFAULT uuid_generate_v4()::text,
    device_id BIGINT REFERENCES iot_devices(id) ON DELETE CASCADE,
    actuator_type VARCHAR(50), -- VALVE, PUMP, MOTOR, HEATER, etc.
    actuator_category VARCHAR(50), -- IRRIGATION, VENTILATION, LIGHTING, etc.
    control_type VARCHAR(50), -- ON_OFF, PWM, ANALOG, etc.
    max_capacity DECIMAL(10,2),
    capacity_unit VARCHAR(20),
    current_status VARCHAR(50), -- ON, OFF, PARTIAL, ERROR
    target_value DECIMAL(10,2),
    current_value DECIMAL(10,2),
    last_command TIMESTAMP,
    response_time DECIMAL(6,2), -- seconds
    location POINT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- IoT Data Analytics table
CREATE TABLE IF NOT EXISTS iot_data_analytics (
    id BIGSERIAL PRIMARY KEY,
    analysis_id VARCHAR(100) UNIQUE NOT NULL DEFAULT uuid_generate_v4()::text,
    device_id BIGINT REFERENCES iot_devices(id),
    sensor_id BIGINT REFERENCES sensors(id),
    analysis_type VARCHAR(50), -- TREND, ANOMALY, PATTERN, etc.
    analysis_period_start TIMESTAMP,
    analysis_period_end TIMESTAMP,
    data_points_count INTEGER,
    trend_direction VARCHAR(20), -- INCREASING, DECREASING, STABLE
    trend_strength DECIMAL(3,2),
    anomaly_count INTEGER,
    pattern_type VARCHAR(50),
    insights TEXT[],
    recommendations TEXT[],
    confidence_level DECIMAL(3,2),
    analysis_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- BLOCKCHAIN TRACEABILITY TABLES
-- =====================================================

-- Supply Chain Events table
CREATE TABLE IF NOT EXISTS supply_chain_events (
    id BIGSERIAL PRIMARY KEY,
    event_id VARCHAR(100) UNIQUE NOT NULL DEFAULT uuid_generate_v4()::text,
    product_id VARCHAR(100) NOT NULL,
    batch_id VARCHAR(100),
    event_type VARCHAR(50), -- PLANTING, HARVESTING, PROCESSING, TRANSPORT, etc.
    event_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    location POINT,
    participants JSONB, -- array of participant addresses
    data_hash VARCHAR(255),
    block_hash VARCHAR(255),
    transaction_hash VARCHAR(255),
    block_number BIGINT,
    gas_used BIGINT,
    gas_price DECIMAL(20,8),
    event_data JSONB,
    verification_status VARCHAR(50) DEFAULT 'pending', -- pending, verified, rejected
    verification_date TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Product Batches table
CREATE TABLE IF NOT EXISTS product_batches (
    id BIGSERIAL PRIMARY KEY,
    batch_id VARCHAR(100) UNIQUE NOT NULL DEFAULT uuid_generate_v4()::text,
    product_type VARCHAR(50), -- CROP, LIVESTOCK, PROCESSED_PRODUCT, etc.
    product_name VARCHAR(255),
    quantity DECIMAL(12,4),
    quantity_unit VARCHAR(20),
    quality_metrics JSONB,
    origin_farm_id BIGINT REFERENCES farms(id),
    origin_location POINT,
    harvest_date TIMESTAMP,
    expiration_date TIMESTAMP,
    blockchain_address VARCHAR(255),
    smart_contract_address VARCHAR(255),
    certification_status VARCHAR(50) DEFAULT 'pending',
    certification_body VARCHAR(100),
    certification_date TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Smart Contracts table
CREATE TABLE IF NOT EXISTS smart_contracts (
    id BIGSERIAL PRIMARY KEY,
    contract_id VARCHAR(100) UNIQUE NOT NULL DEFAULT uuid_generate_v4()::text,
    contract_name VARCHAR(255),
    contract_type VARCHAR(50), -- QUALITY_ASSURANCE, PAYMENT, CERTIFICATION, etc.
    contract_address VARCHAR(255),
    blockchain_network VARCHAR(50), -- ETHEREUM, POLYGON, BSC, etc.
    contract_version VARCHAR(20),
    deployment_date TIMESTAMP,
    contract_terms JSONB,
    parties JSONB, -- array of participant addresses
    status VARCHAR(50) DEFAULT 'active', -- active, inactive, terminated
    gas_cost DECIMAL(20,8),
    transaction_count INTEGER DEFAULT 0,
    last_interaction TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Carbon Credits table
CREATE TABLE IF NOT EXISTS carbon_credits (
    id BIGSERIAL PRIMARY KEY,
    credit_id VARCHAR(100) UNIQUE NOT NULL DEFAULT uuid_generate_v4()::text,
    farm_id BIGINT REFERENCES farms(id),
    credit_type VARCHAR(50), -- CARBON_SEQUESTRATION, EMISSION_REDUCTION, etc.
    carbon_amount DECIMAL(12,4), -- tons of CO2 equivalent
    verification_method VARCHAR(100),
    verification_date TIMESTAMP,
    verification_body VARCHAR(100),
    blockchain_address VARCHAR(255),
    token_id VARCHAR(100),
    price_per_ton DECIMAL(10,2),
    total_value DECIMAL(12,2),
    buyer_address VARCHAR(255),
    sale_date TIMESTAMP,
    retirement_date TIMESTAMP,
    status VARCHAR(50) DEFAULT 'available', -- available, sold, retired
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- NFT Certificates table
CREATE TABLE IF NOT EXISTS nft_certificates (
    id BIGSERIAL PRIMARY KEY,
    certificate_id VARCHAR(100) UNIQUE NOT NULL DEFAULT uuid_generate_v4()::text,
    product_id VARCHAR(100),
    batch_id BIGINT REFERENCES product_batches(id),
    certificate_type VARCHAR(50), -- ORGANIC, FAIR_TRADE, SUSTAINABLE, etc.
    certificate_title VARCHAR(255),
    certificate_description TEXT,
    metadata JSONB,
    image_url VARCHAR(500),
    nft_address VARCHAR(255),
    token_id VARCHAR(100),
    blockchain_network VARCHAR(50),
    owner_address VARCHAR(255),
    creator_address VARCHAR(255),
    mint_date TIMESTAMP,
    transfer_count INTEGER DEFAULT 0,
    current_price DECIMAL(20,8),
    market_platform VARCHAR(100),
    status VARCHAR(50) DEFAULT 'minted', -- minted, listed, sold, transferred
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- INDEXES FOR PERFORMANCE
-- =====================================================

-- AI/ML indexes
CREATE INDEX IF NOT EXISTS idx_ai_models_type ON ai_models(model_type);
CREATE INDEX IF NOT EXISTS idx_ai_models_algorithm ON ai_models(algorithm);
CREATE INDEX IF NOT EXISTS idx_crop_health_predictions_field_id ON crop_health_predictions(field_id);
CREATE INDEX IF NOT EXISTS idx_crop_health_predictions_crop_id ON crop_health_predictions(crop_id);
CREATE INDEX IF NOT EXISTS idx_crop_health_predictions_date ON crop_health_predictions(prediction_date);
CREATE INDEX IF NOT EXISTS idx_yield_predictions_field_id ON yield_predictions(field_id);
CREATE INDEX IF NOT EXISTS idx_yield_predictions_date ON yield_predictions(prediction_date);
CREATE INDEX IF NOT EXISTS idx_pest_detections_field_id ON pest_detections(field_id);
CREATE INDEX IF NOT EXISTS idx_pest_detections_date ON pest_detections(detection_date);
CREATE INDEX IF NOT EXISTS idx_disease_diagnoses_crop_id ON disease_diagnoses(crop_id);
CREATE INDEX IF NOT EXISTS idx_disease_diagnoses_date ON disease_diagnoses(diagnosis_date);

-- IoT indexes
CREATE INDEX IF NOT EXISTS idx_iot_devices_type ON iot_devices(device_type);
CREATE INDEX IF NOT EXISTS idx_iot_devices_farm_id ON iot_devices(farm_id);
CREATE INDEX IF NOT EXISTS idx_iot_devices_field_id ON iot_devices(field_id);
CREATE INDEX IF NOT EXISTS idx_iot_devices_location ON iot_devices USING GIST(location);
CREATE INDEX IF NOT EXISTS idx_sensors_device_id ON sensors(device_id);
CREATE INDEX IF NOT EXISTS idx_sensors_type ON sensors(sensor_type);
CREATE INDEX IF NOT EXISTS idx_sensor_readings_sensor_id ON sensor_readings(sensor_id);
CREATE INDEX IF NOT EXISTS idx_sensor_readings_timestamp ON sensor_readings(timestamp);
CREATE INDEX IF NOT EXISTS idx_sensor_readings_location ON sensor_readings USING GIST(reading_location);
CREATE INDEX IF NOT EXISTS idx_actuators_device_id ON actuators(device_id);
CREATE INDEX IF NOT EXISTS idx_actuators_type ON actuators(actuator_type);
CREATE INDEX IF NOT EXISTS idx_iot_analytics_device_id ON iot_data_analytics(device_id);
CREATE INDEX IF NOT EXISTS idx_iot_analytics_date ON iot_data_analytics(analysis_date);

-- Blockchain indexes
CREATE INDEX IF NOT EXISTS idx_supply_chain_events_product_id ON supply_chain_events(product_id);
CREATE INDEX IF NOT EXISTS idx_supply_chain_events_type ON supply_chain_events(event_type);
CREATE INDEX IF NOT EXISTS idx_supply_chain_events_timestamp ON supply_chain_events(event_timestamp);
CREATE INDEX IF NOT EXISTS idx_supply_chain_events_location ON supply_chain_events USING GIST(location);
CREATE INDEX IF NOT EXISTS idx_product_batches_type ON product_batches(product_type);
CREATE INDEX IF NOT EXISTS idx_product_batches_farm_id ON product_batches(origin_farm_id);
CREATE INDEX IF NOT EXISTS idx_smart_contracts_type ON smart_contracts(contract_type);
CREATE INDEX IF NOT EXISTS idx_smart_contracts_status ON smart_contracts(status);
CREATE INDEX IF NOT EXISTS idx_carbon_credits_farm_id ON carbon_credits(farm_id);
CREATE INDEX IF NOT EXISTS idx_carbon_credits_status ON carbon_credits(status);
CREATE INDEX IF NOT EXISTS idx_nft_certificates_type ON nft_certificates(certificate_type);
CREATE INDEX IF NOT EXISTS idx_nft_certificates_status ON nft_certificates(status);

-- =====================================================
-- TRIGGERS FOR AUTOMATIC TIMESTAMP UPDATES
-- =====================================================

-- Apply triggers to new tables
CREATE TRIGGER update_ai_models_updated_at BEFORE UPDATE ON ai_models FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_crop_health_predictions_updated_at BEFORE UPDATE ON crop_health_predictions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_yield_predictions_updated_at BEFORE UPDATE ON yield_predictions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_pest_detections_updated_at BEFORE UPDATE ON pest_detections FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_disease_diagnoses_updated_at BEFORE UPDATE ON disease_diagnoses FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_iot_devices_updated_at BEFORE UPDATE ON iot_devices FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_sensors_updated_at BEFORE UPDATE ON sensors FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_actuators_updated_at BEFORE UPDATE ON actuators FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_iot_data_analytics_updated_at BEFORE UPDATE ON iot_data_analytics FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_supply_chain_events_updated_at BEFORE UPDATE ON supply_chain_events FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_product_batches_updated_at BEFORE UPDATE ON product_batches FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_smart_contracts_updated_at BEFORE UPDATE ON smart_contracts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_carbon_credits_updated_at BEFORE UPDATE ON carbon_credits FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_nft_certificates_updated_at BEFORE UPDATE ON nft_certificates FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- CONSTRAINTS FOR DATA VALIDATION
-- =====================================================

-- AI/ML constraints
ALTER TABLE ai_models ADD CONSTRAINT chk_model_accuracy CHECK (accuracy >= 0 AND accuracy <= 1);
ALTER TABLE crop_health_predictions ADD CONSTRAINT chk_health_score CHECK (health_score >= 0 AND health_score <= 1);
ALTER TABLE crop_health_predictions ADD CONSTRAINT chk_disease_probability CHECK (disease_probability >= 0 AND disease_probability <= 1);
ALTER TABLE yield_predictions ADD CONSTRAINT chk_predicted_yield CHECK (predicted_yield >= 0);
ALTER TABLE pest_detections ADD CONSTRAINT chk_severity_level CHECK (severity_level >= 0 AND severity_level <= 1);

-- IoT constraints
ALTER TABLE iot_devices ADD CONSTRAINT chk_battery_level CHECK (battery_level >= 0 AND battery_level <= 100);
ALTER TABLE sensors ADD CONSTRAINT chk_measurement_range CHECK (measurement_range_min < measurement_range_max);
ALTER TABLE sensors ADD CONSTRAINT chk_accuracy CHECK (accuracy >= 0 AND accuracy <= 100);
ALTER TABLE sensor_readings ADD CONSTRAINT chk_quality_score CHECK (quality_score >= 0 AND quality_score <= 1);
ALTER TABLE actuators ADD CONSTRAINT chk_max_capacity CHECK (max_capacity > 0);

-- Blockchain constraints
ALTER TABLE product_batches ADD CONSTRAINT chk_batch_quantity CHECK (quantity > 0);
ALTER TABLE carbon_credits ADD CONSTRAINT chk_carbon_amount CHECK (carbon_amount > 0);
ALTER TABLE carbon_credits ADD CONSTRAINT chk_price_per_ton CHECK (price_per_ton > 0);

-- =====================================================
-- SAMPLE DATA FOR TESTING
-- =====================================================

-- Insert sample AI model
INSERT INTO ai_models (model_name, model_type, algorithm, accuracy, precision_score, recall_score, f1_score, training_data_size)
VALUES ('Crop Health CNN v1.0', 'CROP_HEALTH', 'CNN', 0.9234, 0.9156, 0.9289, 0.9222, 50000)
ON CONFLICT (model_id) DO NOTHING;

-- Insert sample IoT device (assuming farm_id = 1, field_id = 1)
INSERT INTO iot_devices (device_name, device_type, device_category, manufacturer, model, farm_id, field_id, location, status)
VALUES ('Smart Soil Sensor 001', 'SENSOR', 'SOIL_SENSOR', 'SmartFarm IoT', 'SFS-2000', 1, 1, POINT(-74.0059, 40.7128), 'active')
ON CONFLICT (device_id) DO NOTHING;

-- Insert sample sensor (assuming device_id = 1)
INSERT INTO sensors (device_id, sensor_type, sensor_category, measurement_unit, measurement_range_min, measurement_range_max, accuracy)
VALUES (1, 'SOIL_MOISTURE', 'SOIL', 'PERCENTAGE', 0.0, 100.0, 0.5)
ON CONFLICT (sensor_id) DO NOTHING;

-- Insert sample supply chain event
INSERT INTO supply_chain_events (product_id, batch_id, event_type, location, event_data)
VALUES ('CORN_2024_001', 'BATCH_001', 'PLANTING', POINT(-74.0059, 40.7128), '{"variety": "Golden Corn", "quantity": 100}')
ON CONFLICT (event_id) DO NOTHING;

-- =====================================================
-- PHASE 2 COMPLETION SUMMARY
-- =====================================================
-- ✅ 15 Advanced Tables Created
-- ✅ AI/ML Prediction Models and Data
-- ✅ IoT Device Management and Sensor Data
-- ✅ Blockchain Traceability and Supply Chain
-- ✅ Performance Indexes and Constraints
-- ✅ Ready for Advanced Farm Management Operations
