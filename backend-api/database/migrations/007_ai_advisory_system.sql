-- AI Advisory System Migration
-- This migration creates tables for AI-powered agricultural recommendations

-- AI recommendations table
CREATE TABLE IF NOT EXISTS ai_recommendations (
    id TEXT PRIMARY KEY,
    userId TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('crop_nutrition', 'livestock_health', 'soil_testing', 'weather_advisory')),
    sourceType TEXT NOT NULL CHECK (sourceType IN ('crop', 'livestock', 'farm', 'general')),
    sourceId TEXT,
    recommendations TEXT NOT NULL, -- JSON string with recommendations
    growthStage TEXT,
    weatherData TEXT, -- JSON string with weather conditions
    soilData TEXT, -- JSON string with soil test results
    priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'applied', 'dismissed', 'expired')),
    appliedDate TEXT,
    notes TEXT,
    createdAt TEXT NOT NULL,
    updatedAt TEXT NOT NULL,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);

-- Fertilizer application records table
CREATE TABLE IF NOT EXISTS fertilizer_applications (
    id TEXT PRIMARY KEY,
    userId TEXT NOT NULL,
    cropId TEXT NOT NULL,
    fertilizerType TEXT NOT NULL,
    amount REAL NOT NULL,
    unit TEXT NOT NULL DEFAULT 'kg/ha',
    applicationDate TEXT NOT NULL,
    method TEXT NOT NULL,
    weatherConditions TEXT, -- JSON string
    growthStage TEXT,
    notes TEXT,
    createdAt TEXT NOT NULL,
    updatedAt TEXT NOT NULL,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (cropId) REFERENCES crops(id) ON DELETE CASCADE
);

-- Livestock health records table
CREATE TABLE IF NOT EXISTS livestock_health_records (
    id TEXT PRIMARY KEY,
    userId TEXT NOT NULL,
    livestockId TEXT NOT NULL,
    treatmentType TEXT NOT NULL CHECK (treatmentType IN ('vaccination', 'deworming', 'medication', 'supplement', 'checkup')),
    treatmentName TEXT NOT NULL,
    dosage TEXT,
    method TEXT NOT NULL,
    administeredBy TEXT,
    treatmentDate TEXT NOT NULL,
    nextDueDate TEXT,
    notes TEXT,
    createdAt TEXT NOT NULL,
    updatedAt TEXT NOT NULL,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (livestockId) REFERENCES livestock(id) ON DELETE CASCADE
);

-- Soil test results table
CREATE TABLE IF NOT EXISTS soil_test_results (
    id TEXT PRIMARY KEY,
    userId TEXT NOT NULL,
    farmId TEXT NOT NULL,
    testDate TEXT NOT NULL,
    ph REAL,
    nitrogen REAL,
    phosphorus REAL,
    potassium REAL,
    organicMatter REAL,
    cationExchangeCapacity REAL,
    testLab TEXT,
    recommendations TEXT, -- JSON string with recommendations
    notes TEXT,
    createdAt TEXT NOT NULL,
    updatedAt TEXT NOT NULL,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (farmId) REFERENCES farms(id) ON DELETE CASCADE
);

-- Weather advisory table
CREATE TABLE IF NOT EXISTS weather_advisories (
    id TEXT PRIMARY KEY,
    userId TEXT NOT NULL,
    farmId TEXT,
    advisoryType TEXT NOT NULL CHECK (advisoryType IN ('fertilizer', 'pest_control', 'harvest', 'planting', 'livestock')),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    severity TEXT NOT NULL DEFAULT 'medium' CHECK (severity IN ('low', 'medium', 'high', 'critical')),
    startDate TEXT NOT NULL,
    endDate TEXT NOT NULL,
    weatherConditions TEXT, -- JSON string
    recommendations TEXT, -- JSON string
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'expired', 'dismissed')),
    createdAt TEXT NOT NULL,
    updatedAt TEXT NOT NULL,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (farmId) REFERENCES farms(id) ON DELETE CASCADE
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_ai_recommendations_user ON ai_recommendations(userId);
CREATE INDEX IF NOT EXISTS idx_ai_recommendations_type ON ai_recommendations(type);
CREATE INDEX IF NOT EXISTS idx_ai_recommendations_source ON ai_recommendations(sourceType, sourceId);
CREATE INDEX IF NOT EXISTS idx_ai_recommendations_status ON ai_recommendations(status);
CREATE INDEX IF NOT EXISTS idx_ai_recommendations_created ON ai_recommendations(createdAt);

CREATE INDEX IF NOT EXISTS idx_fertilizer_applications_user ON fertilizer_applications(userId);
CREATE INDEX IF NOT EXISTS idx_fertilizer_applications_crop ON fertilizer_applications(cropId);
CREATE INDEX IF NOT EXISTS idx_fertilizer_applications_date ON fertilizer_applications(applicationDate);

CREATE INDEX IF NOT EXISTS idx_livestock_health_user ON livestock_health_records(userId);
CREATE INDEX IF NOT EXISTS idx_livestock_health_livestock ON livestock_health_records(livestockId);
CREATE INDEX IF NOT EXISTS idx_livestock_health_type ON livestock_health_records(treatmentType);
CREATE INDEX IF NOT EXISTS idx_livestock_health_date ON livestock_health_records(treatmentDate);

CREATE INDEX IF NOT EXISTS idx_soil_test_user ON soil_test_results(userId);
CREATE INDEX IF NOT EXISTS idx_soil_test_farm ON soil_test_results(farmId);
CREATE INDEX IF NOT EXISTS idx_soil_test_date ON soil_test_results(testDate);

CREATE INDEX IF NOT EXISTS idx_weather_advisories_user ON weather_advisories(userId);
CREATE INDEX IF NOT EXISTS idx_weather_advisories_farm ON weather_advisories(farmId);
CREATE INDEX IF NOT EXISTS idx_weather_advisories_type ON weather_advisories(advisoryType);
CREATE INDEX IF NOT EXISTS idx_weather_advisories_dates ON weather_advisories(startDate, endDate);

-- Insert sample AI recommendations
INSERT INTO ai_recommendations (id, userId, type, sourceType, sourceId, recommendations, growthStage, priority, status, createdAt, updatedAt) VALUES
('rec_001', 'demo_user_1', 'crop_nutrition', 'crop', 'crop_001', 
 '{"urea": {"timing": "2-3 weeks after planting", "amount": "50-75 kg/ha", "method": "Side dressing"}}', 
 'vegetative', 'high', 'active', '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
('rec_002', 'demo_user_1', 'livestock_health', 'livestock', 'livestock_001', 
 '{"vaccinations": [{"vaccine": "Annual boosters", "timing": "Before breeding season"}]}', 
 'adult', 'medium', 'active', '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z');

-- Insert sample fertilizer applications
INSERT INTO fertilizer_applications (id, userId, cropId, fertilizerType, amount, unit, applicationDate, method, growthStage, createdAt, updatedAt) VALUES
('fert_001', 'demo_user_1', 'crop_001', 'Urea', 75.0, 'kg/ha', '2024-01-15', 'Side dressing', 'vegetative', '2024-01-15T00:00:00.000Z', '2024-01-15T00:00:00.000Z'),
('fert_002', 'demo_user_1', 'crop_001', 'Compost', 10.0, 'tons/ha', '2024-01-01', 'Broadcasting', 'planting', '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z');

-- Insert sample livestock health records
INSERT INTO livestock_health_records (id, userId, livestockId, treatmentType, treatmentName, dosage, method, administeredBy, treatmentDate, nextDueDate, createdAt, updatedAt) VALUES
('health_001', 'demo_user_1', 'livestock_001', 'vaccination', 'Annual boosters', '1ml', 'Intramuscular injection', 'Veterinarian', '2024-01-10', '2025-01-10', '2024-01-10T00:00:00.000Z', '2024-01-10T00:00:00.000Z'),
('health_002', 'demo_user_1', 'livestock_001', 'deworming', 'Broad-spectrum dewormer', '5ml', 'Oral drench', 'Farmer', '2024-01-05', '2024-04-05', '2024-01-05T00:00:00.000Z', '2024-01-05T00:00:00.000Z');

-- Insert sample soil test results
INSERT INTO soil_test_results (id, userId, farmId, testDate, ph, nitrogen, phosphorus, potassium, organicMatter, testLab, recommendations, createdAt, updatedAt) VALUES
('soil_001', 'demo_user_1', 'farm_001', '2024-01-01', 6.2, 45.0, 25.0, 180.0, 2.5, 'Fiji Agriculture Lab', 
 '{"recommendations": [{"fertilizer": "Urea", "amount": "50-75 kg/ha"}, {"fertilizer": "Compost", "amount": "10-15 tons/ha"}]}', 
 '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z');

-- Insert sample weather advisories
INSERT INTO weather_advisories (id, userId, farmId, advisoryType, title, description, severity, startDate, endDate, weatherConditions, recommendations, status, createdAt, updatedAt) VALUES
('weather_001', 'demo_user_1', 'farm_001', 'fertilizer', 'Heavy Rain Warning', 
 'Heavy rainfall expected in next 24 hours. Delay fertilizer application.', 'high', 
 '2024-01-20', '2024-01-21', '{"rainfall": 25, "temperature": 28}', 
 '{"action": "delay_fertilizer", "reason": "heavy_rain"}', 'active', 
 '2024-01-20T00:00:00.000Z', '2024-01-20T00:00:00.000Z');
