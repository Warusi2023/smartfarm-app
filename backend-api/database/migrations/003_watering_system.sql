-- Watering System Tables
-- Migration: 003_watering_system.sql
-- Description: Creates tables for intelligent watering management

-- Watering schedules table
CREATE TABLE IF NOT EXISTS watering_schedules (
    id TEXT PRIMARY KEY,
    cropId TEXT NOT NULL,
    farmId TEXT NOT NULL,
    scheduledTime DATETIME NOT NULL,
    duration INTEGER NOT NULL, -- minutes
    zone TEXT, -- irrigation zone
    notes TEXT,
    status TEXT DEFAULT 'scheduled', -- scheduled, completed, cancelled, failed
    actualStartTime DATETIME,
    actualEndTime DATETIME,
    waterAmount REAL, -- liters
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (cropId) REFERENCES crops(id) ON DELETE CASCADE,
    FOREIGN KEY (farmId) REFERENCES farms(id) ON DELETE CASCADE
);

-- Soil moisture readings table
CREATE TABLE IF NOT EXISTS soil_moisture_readings (
    id TEXT PRIMARY KEY,
    farmId TEXT NOT NULL,
    zone TEXT NOT NULL,
    moistureLevel REAL NOT NULL, -- percentage (0-100)
    temperature REAL, -- celsius
    ph REAL, -- soil pH
    readingTime DATETIME DEFAULT CURRENT_TIMESTAMP,
    sensorId TEXT,
    notes TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (farmId) REFERENCES farms(id) ON DELETE CASCADE
);

-- Irrigation zones table
CREATE TABLE IF NOT EXISTS irrigation_zones (
    id TEXT PRIMARY KEY,
    farmId TEXT NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    area REAL, -- square meters
    soilType TEXT, -- clay, sandy, loam, silt
    cropTypes TEXT, -- comma-separated list
    irrigationType TEXT, -- drip, sprinkler, flood, manual
    waterSource TEXT, -- well, river, municipal, rainwater
    maxFlowRate REAL, -- liters per minute
    isActive BOOLEAN DEFAULT TRUE,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (farmId) REFERENCES farms(id) ON DELETE CASCADE
);

-- Weather data table (for historical analysis)
CREATE TABLE IF NOT EXISTS weather_data (
    id TEXT PRIMARY KEY,
    farmId TEXT NOT NULL,
    date DATE NOT NULL,
    temperature REAL, -- celsius
    humidity REAL, -- percentage
    rainfall REAL, -- mm
    windSpeed REAL, -- km/h
    uvIndex INTEGER,
    cloudCover REAL, -- percentage
    pressure REAL, -- hPa
    source TEXT, -- api_provider or manual
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (farmId) REFERENCES farms(id) ON DELETE CASCADE
);

-- Watering recommendations log
CREATE TABLE IF NOT EXISTS watering_recommendations (
    id TEXT PRIMARY KEY,
    farmId TEXT NOT NULL,
    cropId TEXT,
    recommendationType TEXT NOT NULL, -- daily, weekly, emergency, seasonal
    priority INTEGER DEFAULT 5, -- 1-10 scale
    wateringNeed TEXT, -- low, moderate, high
    optimalTime TEXT, -- early_morning, mid_morning, late_evening
    duration INTEGER, -- minutes
    frequency TEXT, -- daily, twice_daily, every_other_day
    weatherConditions TEXT, -- JSON string
    soilConditions TEXT, -- JSON string
    recommendations TEXT, -- JSON array of specific recommendations
    isApplied BOOLEAN DEFAULT FALSE,
    appliedAt DATETIME,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (farmId) REFERENCES farms(id) ON DELETE CASCADE,
    FOREIGN KEY (cropId) REFERENCES crops(id) ON DELETE CASCADE
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_watering_schedules_cropId ON watering_schedules(cropId);
CREATE INDEX IF NOT EXISTS idx_watering_schedules_farmId ON watering_schedules(farmId);
CREATE INDEX IF NOT EXISTS idx_watering_schedules_status ON watering_schedules(status);
CREATE INDEX IF NOT EXISTS idx_watering_schedules_scheduledTime ON watering_schedules(scheduledTime);

CREATE INDEX IF NOT EXISTS idx_soil_moisture_farmId ON soil_moisture_readings(farmId);
CREATE INDEX IF NOT EXISTS idx_soil_moisture_zone ON soil_moisture_readings(zone);
CREATE INDEX IF NOT EXISTS idx_soil_moisture_readingTime ON soil_moisture_readings(readingTime);

CREATE INDEX IF NOT EXISTS idx_irrigation_zones_farmId ON irrigation_zones(farmId);
CREATE INDEX IF NOT EXISTS idx_irrigation_zones_active ON irrigation_zones(isActive);

CREATE INDEX IF NOT EXISTS idx_weather_data_farmId ON weather_data(farmId);
CREATE INDEX IF NOT EXISTS idx_weather_data_date ON weather_data(date);

CREATE INDEX IF NOT EXISTS idx_watering_recommendations_farmId ON watering_recommendations(farmId);
CREATE INDEX IF NOT EXISTS idx_watering_recommendations_cropId ON watering_recommendations(cropId);
CREATE INDEX IF NOT EXISTS idx_watering_recommendations_priority ON watering_recommendations(priority);
CREATE INDEX IF NOT EXISTS idx_watering_recommendations_applied ON watering_recommendations(isApplied);

-- Insert sample irrigation zones
INSERT OR IGNORE INTO irrigation_zones (id, farmId, name, description, area, soilType, cropTypes, irrigationType, waterSource, maxFlowRate) VALUES
('zone1', (SELECT id FROM farms LIMIT 1), 'Zone 1 - Vegetable Garden', 'Main vegetable growing area', 500.0, 'loam', 'tomato,lettuce,pepper', 'drip', 'well', 50.0),
('zone2', (SELECT id FROM farms LIMIT 1), 'Zone 2 - Fruit Trees', 'Orchard area with fruit trees', 800.0, 'clay', 'apple,orange,banana', 'sprinkler', 'river', 80.0),
('zone3', (SELECT id FROM farms LIMIT 1), 'Zone 3 - Kava Field', 'Traditional kava cultivation area', 300.0, 'loam', 'kava', 'manual', 'rainwater', 30.0),
('zone4', (SELECT id FROM farms LIMIT 1), 'Zone 4 - Greenhouse', 'Controlled environment growing', 200.0, 'sandy', 'lettuce,herbs', 'drip', 'municipal', 25.0);

-- Insert sample weather data for the last 7 days
INSERT OR IGNORE INTO weather_data (id, farmId, date, temperature, humidity, rainfall, windSpeed, uvIndex, cloudCover, pressure, source) VALUES
('weather1', (SELECT id FROM farms LIMIT 1), date('now', '-6 days'), 26.5, 78, 0, 10, 7, 25, 1013, 'api_provider'),
('weather2', (SELECT id FROM farms LIMIT 1), date('now', '-5 days'), 28.2, 72, 5, 12, 8, 30, 1012, 'api_provider'),
('weather3', (SELECT id FROM farms LIMIT 1), date('now', '-4 days'), 30.1, 68, 0, 15, 9, 20, 1011, 'api_provider'),
('weather4', (SELECT id FROM farms LIMIT 1), date('now', '-3 days'), 29.8, 75, 0, 14, 8, 35, 1012, 'api_provider'),
('weather5', (SELECT id FROM farms LIMIT 1), date('now', '-2 days'), 27.3, 82, 15, 8, 6, 60, 1014, 'api_provider'),
('weather6', (SELECT id FROM farms LIMIT 1), date('now', '-1 days'), 25.9, 85, 20, 6, 5, 70, 1015, 'api_provider'),
('weather7', (SELECT id FROM farms LIMIT 1), date('now'), 28.0, 75, 0, 12, 8, 30, 1013, 'api_provider');

-- Insert sample soil moisture readings
INSERT OR IGNORE INTO soil_moisture_readings (id, farmId, zone, moistureLevel, temperature, ph, sensorId) VALUES
('moisture1', (SELECT id FROM farms LIMIT 1), 'Zone 1 - Vegetable Garden', 65.2, 22.5, 6.5, 'sensor_001'),
('moisture2', (SELECT id FROM farms LIMIT 1), 'Zone 2 - Fruit Trees', 70.8, 24.1, 6.8, 'sensor_002'),
('moisture3', (SELECT id FROM farms LIMIT 1), 'Zone 3 - Kava Field', 80.3, 26.2, 6.2, 'sensor_003'),
('moisture4', (SELECT id FROM farms LIMIT 1), 'Zone 4 - Greenhouse', 60.1, 28.0, 6.7, 'sensor_004');

COMMIT;
