-- Geofencing System Tables
-- Migration: 004_geofencing_system.sql
-- Description: Creates tables for farm geofencing and location-based services

-- Add geofencing columns to farms table (if not already added)
ALTER TABLE farms ADD COLUMN latitude DECIMAL(10, 8);
ALTER TABLE farms ADD COLUMN longitude DECIMAL(11, 8);
ALTER TABLE farms ADD COLUMN geofenceRadius DECIMAL(8, 2) DEFAULT 100;
ALTER TABLE farms ADD COLUMN geofencePolygon TEXT;
ALTER TABLE farms ADD COLUMN address TEXT;
ALTER TABLE farms ADD COLUMN city VARCHAR(100);
ALTER TABLE farms ADD COLUMN state VARCHAR(100);
ALTER TABLE farms ADD COLUMN country VARCHAR(100) DEFAULT 'Fiji';
ALTER TABLE farms ADD COLUMN postalCode VARCHAR(20);
ALTER TABLE farms ADD COLUMN isPublic BOOLEAN DEFAULT FALSE;
ALTER TABLE farms ADD COLUMN allowVisitors BOOLEAN DEFAULT FALSE;
ALTER TABLE farms ADD COLUMN visitorInstructions TEXT;

-- Location checks table for tracking user locations
CREATE TABLE IF NOT EXISTS location_checks (
    id TEXT PRIMARY KEY,
    farmId TEXT NOT NULL,
    userId TEXT NOT NULL,
    latitude DECIMAL(10, 8) NOT NULL,
    longitude DECIMAL(11, 8) NOT NULL,
    isWithinGeofence BOOLEAN NOT NULL,
    distance DECIMAL(10, 2), -- in meters
    accuracy DECIMAL(8, 2), -- GPS accuracy in meters
    altitude DECIMAL(8, 2), -- altitude in meters
    speed DECIMAL(8, 2), -- speed in m/s
    heading DECIMAL(8, 2), -- heading in degrees
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (farmId) REFERENCES farms(id) ON DELETE CASCADE,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);

-- Farm visits table for tracking actual visits
CREATE TABLE IF NOT EXISTS farm_visits (
    id TEXT PRIMARY KEY,
    farmId TEXT NOT NULL,
    userId TEXT NOT NULL,
    visitType TEXT NOT NULL, -- 'scheduled', 'walk_in', 'emergency', 'maintenance'
    checkInTime DATETIME NOT NULL,
    checkOutTime DATETIME,
    duration INTEGER, -- in minutes
    purpose TEXT,
    notes TEXT,
    status TEXT DEFAULT 'active', -- 'active', 'completed', 'cancelled'
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (farmId) REFERENCES farms(id) ON DELETE CASCADE,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);

-- Geofence alerts table for notifications
CREATE TABLE IF NOT EXISTS geofence_alerts (
    id TEXT PRIMARY KEY,
    farmId TEXT NOT NULL,
    userId TEXT NOT NULL,
    alertType TEXT NOT NULL, -- 'enter', 'exit', 'nearby', 'visit_request'
    message TEXT NOT NULL,
    isRead BOOLEAN DEFAULT FALSE,
    priority TEXT DEFAULT 'medium', -- 'low', 'medium', 'high', 'urgent'
    metadata TEXT, -- JSON string for additional data
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (farmId) REFERENCES farms(id) ON DELETE CASCADE,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);

-- Farm zones table for sub-areas within farms
CREATE TABLE IF NOT EXISTS farm_zones (
    id TEXT PRIMARY KEY,
    farmId TEXT NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    zoneType TEXT NOT NULL, -- 'crop_field', 'livestock_area', 'storage', 'office', 'greenhouse', 'other'
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    geofenceRadius DECIMAL(8, 2),
    geofencePolygon TEXT,
    isActive BOOLEAN DEFAULT TRUE,
    accessLevel TEXT DEFAULT 'public', -- 'public', 'restricted', 'private'
    instructions TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (farmId) REFERENCES farms(id) ON DELETE CASCADE
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_farms_location ON farms(latitude, longitude);
CREATE INDEX IF NOT EXISTS idx_farms_public ON farms(isPublic);
CREATE INDEX IF NOT EXISTS idx_farms_visitors ON farms(allowVisitors);

CREATE INDEX IF NOT EXISTS idx_location_checks_farmId ON location_checks(farmId);
CREATE INDEX IF NOT EXISTS idx_location_checks_userId ON location_checks(userId);
CREATE INDEX IF NOT EXISTS idx_location_checks_createdAt ON location_checks(createdAt);
CREATE INDEX IF NOT EXISTS idx_location_checks_within_geofence ON location_checks(isWithinGeofence);

CREATE INDEX IF NOT EXISTS idx_farm_visits_farmId ON farm_visits(farmId);
CREATE INDEX IF NOT EXISTS idx_farm_visits_userId ON farm_visits(userId);
CREATE INDEX IF NOT EXISTS idx_farm_visits_checkInTime ON farm_visits(checkInTime);
CREATE INDEX IF NOT EXISTS idx_farm_visits_status ON farm_visits(status);

CREATE INDEX IF NOT EXISTS idx_geofence_alerts_farmId ON geofence_alerts(farmId);
CREATE INDEX IF NOT EXISTS idx_geofence_alerts_userId ON geofence_alerts(userId);
CREATE INDEX IF NOT EXISTS idx_geofence_alerts_isRead ON geofence_alerts(isRead);
CREATE INDEX IF NOT EXISTS idx_geofence_alerts_createdAt ON geofence_alerts(createdAt);

CREATE INDEX IF NOT EXISTS idx_farm_zones_farmId ON farm_zones(farmId);
CREATE INDEX IF NOT EXISTS idx_farm_zones_type ON farm_zones(zoneType);
CREATE INDEX IF NOT EXISTS idx_farm_zones_active ON farm_zones(isActive);

-- Insert sample farm locations (Fiji coordinates)
INSERT OR IGNORE INTO farms (id, name, latitude, longitude, geofenceRadius, address, city, state, country, isPublic, allowVisitors, visitorInstructions) VALUES
('farm1', 'Suva Organic Farm', -18.1248, 178.4501, 200, '123 Queen Elizabeth Drive', 'Suva', 'Central Division', 'Fiji', 1, 1, 'Please call ahead before visiting. Wear appropriate footwear for farm conditions.'),
('farm2', 'Nadi Valley Farm', -17.8034, 177.4162, 150, '456 Valley Road', 'Nadi', 'Western Division', 'Fiji', 1, 1, 'Visitors welcome during business hours. Guided tours available on weekends.'),
('farm3', 'Lautoka Sugar Farm', -17.6242, 177.4526, 300, '789 Sugar Mill Road', 'Lautoka', 'Western Division', 'Fiji', 1, 0, 'Private farm - no visitors allowed.'),
('farm4', 'Labasa Rice Farm', -16.4167, 179.3833, 250, '321 Rice Field Lane', 'Labasa', 'Northern Division', 'Fiji', 1, 1, 'Educational tours available for schools. Contact for group bookings.'),
('farm5', 'Sigatoka Vegetable Farm', -18.1667, 177.5167, 180, '654 Vegetable Garden Street', 'Sigatoka', 'Western Division', 'Fiji', 1, 1, 'Farm stand open daily 8AM-6PM. Fresh produce available for purchase.');

-- Insert sample farm zones
INSERT OR IGNORE INTO farm_zones (id, farmId, name, description, zoneType, latitude, longitude, geofenceRadius, accessLevel, instructions) VALUES
('zone1', 'farm1', 'Tomato Greenhouse', 'Climate-controlled tomato growing area', 'greenhouse', -18.1248, 178.4501, 50, 'restricted', 'Authorized personnel only. Safety equipment required.'),
('zone2', 'farm1', 'Cattle Pasture', 'Open grazing area for dairy cattle', 'livestock_area', -18.1250, 178.4503, 100, 'public', 'Stay on designated paths. Do not approach cattle.'),
('zone3', 'farm1', 'Storage Shed', 'Equipment and supply storage', 'storage', -18.1246, 178.4499, 30, 'private', 'Restricted access. Staff only.'),
('zone4', 'farm2', 'Rice Paddies', 'Wet rice cultivation fields', 'crop_field', -17.8034, 177.4162, 120, 'public', 'Stay on raised walkways. Do not enter flooded areas.'),
('zone5', 'farm2', 'Farm Office', 'Administrative building', 'office', -17.8032, 177.4160, 25, 'public', 'Office hours: 8AM-5PM Monday-Friday.');

COMMIT;
