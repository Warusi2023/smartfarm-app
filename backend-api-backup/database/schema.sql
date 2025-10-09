-- SmartFarm Database Schema
-- This file contains the complete database structure for the SmartFarm application

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    firstName TEXT NOT NULL,
    lastName TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'farmer',
    phone TEXT,
    address TEXT,
    isActive BOOLEAN DEFAULT 1,
    lastLoginAt DATETIME,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Farms table
CREATE TABLE IF NOT EXISTS farms (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    location TEXT NOT NULL,
    size REAL NOT NULL, -- in acres
    farmType TEXT NOT NULL DEFAULT 'MIXED',
    ownerId TEXT NOT NULL,
    description TEXT,
    isActive BOOLEAN DEFAULT 1,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (ownerId) REFERENCES users(id)
);

-- Crops table
CREATE TABLE IF NOT EXISTS crops (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    variety TEXT NOT NULL,
    farmId TEXT NOT NULL,
    plantedDate DATE NOT NULL,
    expectedHarvestDate DATE NOT NULL,
    actualHarvestDate DATE,
    area REAL NOT NULL, -- in acres
    status TEXT NOT NULL DEFAULT 'PLANNED',
    yield REAL, -- in tons
    notes TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (farmId) REFERENCES farms(id)
);

-- Livestock table
CREATE TABLE IF NOT EXISTS livestock (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    type TEXT NOT NULL,
    breed TEXT NOT NULL,
    farmId TEXT NOT NULL,
    birthDate DATE NOT NULL,
    weight REAL NOT NULL, -- in kg
    healthStatus TEXT NOT NULL DEFAULT 'GOOD',
    location TEXT NOT NULL,
    notes TEXT,
    lastVaccination DATE,
    nextVaccination DATE,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (farmId) REFERENCES farms(id)
);

-- Tasks table
CREATE TABLE IF NOT EXISTS tasks (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    farmId TEXT NOT NULL,
    assignedTo TEXT,
    priority TEXT NOT NULL DEFAULT 'MEDIUM',
    status TEXT NOT NULL DEFAULT 'PENDING',
    dueDate DATE NOT NULL,
    completedDate DATE,
    category TEXT NOT NULL,
    estimatedHours REAL,
    actualHours REAL,
    notes TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (farmId) REFERENCES farms(id),
    FOREIGN KEY (assignedTo) REFERENCES users(id)
);

-- Financial records table
CREATE TABLE IF NOT EXISTS financial_records (
    id TEXT PRIMARY KEY,
    farmId TEXT NOT NULL,
    type TEXT NOT NULL, -- 'income' or 'expense'
    category TEXT NOT NULL,
    amount REAL NOT NULL,
    description TEXT NOT NULL,
    date DATE NOT NULL,
    relatedEntityId TEXT,
    relatedEntityType TEXT, -- 'crop', 'livestock', 'task', etc.
    notes TEXT,
    receiptUrl TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (farmId) REFERENCES farms(id)
);

-- Inventory table
CREATE TABLE IF NOT EXISTS inventory (
    id TEXT PRIMARY KEY,
    farmId TEXT NOT NULL,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    quantity REAL NOT NULL,
    unit TEXT NOT NULL,
    cost REAL NOT NULL,
    supplier TEXT,
    notes TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (farmId) REFERENCES farms(id)
);

-- Employees table
CREATE TABLE IF NOT EXISTS employees (
    id TEXT PRIMARY KEY,
    farmId TEXT NOT NULL,
    firstName TEXT NOT NULL,
    lastName TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT,
    position TEXT NOT NULL,
    hireDate DATE NOT NULL,
    salary REAL,
    isActive BOOLEAN DEFAULT 1,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (farmId) REFERENCES farms(id)
);

-- Weather data table
CREATE TABLE IF NOT EXISTS weather_data (
    id TEXT PRIMARY KEY,
    farmId TEXT NOT NULL,
    date DATE NOT NULL,
    temperature REAL NOT NULL, -- in Celsius
    humidity REAL NOT NULL, -- percentage
    precipitation REAL NOT NULL, -- in mm
    windSpeed REAL NOT NULL, -- in km/h
    windDirection TEXT NOT NULL,
    pressure REAL NOT NULL, -- in hPa
    visibility REAL NOT NULL, -- in km
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (farmId) REFERENCES farms(id)
);

-- Documents table
CREATE TABLE IF NOT EXISTS documents (
    id TEXT PRIMARY KEY,
    farmId TEXT NOT NULL,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    filePath TEXT NOT NULL,
    fileSize INTEGER NOT NULL, -- in bytes
    mimeType TEXT NOT NULL,
    description TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (farmId) REFERENCES farms(id)
);

-- Analytics data table
CREATE TABLE IF NOT EXISTS analytics_data (
    id TEXT PRIMARY KEY,
    farmId TEXT NOT NULL,
    metric TEXT NOT NULL,
    value REAL NOT NULL,
    date DATE NOT NULL,
    category TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (farmId) REFERENCES farms(id)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_farms_owner ON farms(ownerId);
CREATE INDEX IF NOT EXISTS idx_crops_farm ON crops(farmId);
CREATE INDEX IF NOT EXISTS idx_crops_status ON crops(status);
CREATE INDEX IF NOT EXISTS idx_livestock_farm ON livestock(farmId);
CREATE INDEX IF NOT EXISTS idx_livestock_type ON livestock(type);
CREATE INDEX IF NOT EXISTS idx_livestock_health ON livestock(healthStatus);
CREATE INDEX IF NOT EXISTS idx_tasks_farm ON tasks(farmId);
CREATE INDEX IF NOT EXISTS idx_tasks_status ON tasks(status);
CREATE INDEX IF NOT EXISTS idx_tasks_assigned ON tasks(assignedTo);
CREATE INDEX IF NOT EXISTS idx_financial_farm ON financial_records(farmId);
CREATE INDEX IF NOT EXISTS idx_financial_type ON financial_records(type);
CREATE INDEX IF NOT EXISTS idx_financial_date ON financial_records(date);
CREATE INDEX IF NOT EXISTS idx_inventory_farm ON inventory(farmId);
CREATE INDEX IF NOT EXISTS idx_employees_farm ON employees(farmId);
CREATE INDEX IF NOT EXISTS idx_weather_farm_date ON weather_data(farmId, date);
CREATE INDEX IF NOT EXISTS idx_documents_farm ON documents(farmId);
CREATE INDEX IF NOT EXISTS idx_analytics_farm_date ON analytics_data(farmId, date);

-- Create views for common queries
CREATE VIEW IF NOT EXISTS farm_overview AS
SELECT 
    f.id,
    f.name,
    f.location,
    f.size,
    f.farmType,
    u.firstName || ' ' || u.lastName as ownerName,
    u.email as ownerEmail,
    COUNT(DISTINCT c.id) as cropCount,
    COUNT(DISTINCT l.id) as livestockCount,
    COUNT(DISTINCT t.id) as taskCount,
    f.isActive,
    f.createdAt
FROM farms f
LEFT JOIN users u ON f.ownerId = u.id
LEFT JOIN crops c ON f.id = c.farmId
LEFT JOIN livestock l ON f.id = l.farmId
LEFT JOIN tasks t ON f.id = t.farmId
GROUP BY f.id;

CREATE VIEW IF NOT EXISTS financial_summary AS
SELECT 
    farmId,
    type,
    category,
    SUM(amount) as totalAmount,
    COUNT(*) as transactionCount,
    MIN(date) as firstTransaction,
    MAX(date) as lastTransaction
FROM financial_records
GROUP BY farmId, type, category;

-- Insert default data
INSERT OR IGNORE INTO users (id, email, password, firstName, lastName, role) 
VALUES ('admin-001', 'admin@smartfarm.com', '$2a$10$hashedpassword', 'Admin', 'User', 'admin');

INSERT OR IGNORE INTO users (id, email, password, firstName, lastName, role) 
VALUES ('farmer-001', 'farmer@smartfarm.com', '$2a$10$hashedpassword', 'John', 'Farmer', 'farmer');
