-- Byproducts System Migration
-- This migration creates tables for byproduct processing and management

-- Byproduct processing plans table
CREATE TABLE IF NOT EXISTS byproduct_processing_plans (
    id TEXT PRIMARY KEY,
    userId TEXT NOT NULL,
    sourceType TEXT NOT NULL CHECK (sourceType IN ('crop', 'livestock')),
    sourceId TEXT NOT NULL,
    byproductName TEXT NOT NULL,
    quantity REAL NOT NULL,
    processingMethod TEXT NOT NULL,
    equipment TEXT, -- JSON string with required equipment
    targetMarket TEXT,
    expectedRevenue REAL,
    processingDate TEXT,
    notes TEXT,
    status TEXT NOT NULL DEFAULT 'planned' CHECK (status IN ('planned', 'in_progress', 'completed', 'cancelled')),
    createdAt TEXT NOT NULL,
    updatedAt TEXT NOT NULL,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);

-- Byproduct sales records table
CREATE TABLE IF NOT EXISTS byproduct_sales (
    id TEXT PRIMARY KEY,
    userId TEXT NOT NULL,
    processingPlanId TEXT NOT NULL,
    byproductName TEXT NOT NULL,
    quantity REAL NOT NULL,
    unitPrice REAL NOT NULL,
    totalAmount REAL NOT NULL,
    buyerName TEXT,
    buyerContact TEXT,
    saleDate TEXT NOT NULL,
    paymentStatus TEXT NOT NULL DEFAULT 'pending' CHECK (paymentStatus IN ('pending', 'paid', 'overdue')),
    notes TEXT,
    createdAt TEXT NOT NULL,
    updatedAt TEXT NOT NULL,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (processingPlanId) REFERENCES byproduct_processing_plans(id) ON DELETE CASCADE
);

-- Market prices tracking table
CREATE TABLE IF NOT EXISTS market_prices (
    id TEXT PRIMARY KEY,
    byproductName TEXT NOT NULL,
    category TEXT NOT NULL,
    marketType TEXT NOT NULL CHECK (marketType IN ('local', 'regional', 'national', 'export')),
    price REAL NOT NULL,
    currency TEXT DEFAULT 'USD',
    location TEXT,
    date TEXT NOT NULL,
    source TEXT,
    notes TEXT,
    createdAt TEXT NOT NULL
);

-- Processing equipment inventory table
CREATE TABLE IF NOT EXISTS processing_equipment (
    id TEXT PRIMARY KEY,
    userId TEXT NOT NULL,
    equipmentName TEXT NOT NULL,
    category TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'available' CHECK (status IN ('available', 'in_use', 'maintenance', 'retired')),
    purchaseDate TEXT,
    purchasePrice REAL,
    maintenanceSchedule TEXT, -- JSON string with maintenance dates
    location TEXT,
    notes TEXT,
    createdAt TEXT NOT NULL,
    updatedAt TEXT NOT NULL,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_byproduct_plans_user ON byproduct_processing_plans(userId);
CREATE INDEX IF NOT EXISTS idx_byproduct_plans_source ON byproduct_processing_plans(sourceType, sourceId);
CREATE INDEX IF NOT EXISTS idx_byproduct_plans_status ON byproduct_processing_plans(status);

CREATE INDEX IF NOT EXISTS idx_byproduct_sales_user ON byproduct_sales(userId);
CREATE INDEX IF NOT EXISTS idx_byproduct_sales_plan ON byproduct_sales(processingPlanId);
CREATE INDEX IF NOT EXISTS idx_byproduct_sales_date ON byproduct_sales(saleDate);

CREATE INDEX IF NOT EXISTS idx_market_prices_byproduct ON market_prices(byproductName);
CREATE INDEX IF NOT EXISTS idx_market_prices_date ON market_prices(date);

CREATE INDEX IF NOT EXISTS idx_equipment_user ON processing_equipment(userId);
CREATE INDEX IF NOT EXISTS idx_equipment_category ON processing_equipment(category);
CREATE INDEX IF NOT EXISTS idx_equipment_status ON processing_equipment(status);

-- Insert sample market prices data
INSERT INTO market_prices (id, byproductName, category, marketType, price, currency, location, date, source, createdAt) VALUES
('mp_001', 'Cassava Flour', 'Food Processing', 'local', 2.50, 'USD', 'Suva', '2024-01-01', 'Local Market Survey', '2024-01-01T00:00:00.000Z'),
('mp_002', 'Cassava Flour', 'Food Processing', 'regional', 2.80, 'USD', 'Pacific Region', '2024-01-01', 'Regional Trade Data', '2024-01-01T00:00:00.000Z'),
('mp_003', 'Cassava Starch', 'Industrial', 'export', 3.20, 'USD', 'International', '2024-01-01', 'Export Price Index', '2024-01-01T00:00:00.000Z'),
('mp_004', 'Banana Chips', 'Snack Food', 'local', 6.00, 'USD', 'Suva', '2024-01-01', 'Local Market Survey', '2024-01-01T00:00:00.000Z'),
('mp_005', 'Banana Chips', 'Snack Food', 'export', 7.50, 'USD', 'International', '2024-01-01', 'Export Price Index', '2024-01-01T00:00:00.000Z'),
('mp_006', 'Goat Cheese', 'Dairy', 'local', 12.00, 'USD', 'Suva', '2024-01-01', 'Local Market Survey', '2024-01-01T00:00:00.000Z'),
('mp_007', 'Goat Cheese', 'Dairy', 'regional', 15.00, 'USD', 'Pacific Region', '2024-01-01', 'Regional Trade Data', '2024-01-01T00:00:00.000Z'),
('mp_008', 'Leather', 'Manufacturing', 'export', 50.00, 'USD', 'International', '2024-01-01', 'Export Price Index', '2024-01-01T00:00:00.000Z');

-- Insert sample processing equipment data
INSERT INTO processing_equipment (id, userId, equipmentName, category, status, purchaseDate, purchasePrice, location, createdAt, updatedAt) VALUES
('eq_001', 'demo_user_1', 'Solar Dryer', 'drying', 'available', '2024-01-01', 500.00, 'Main Farm', '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
('eq_002', 'demo_user_1', 'Grinding Mill', 'grinding', 'available', '2024-01-01', 800.00, 'Processing Shed', '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
('eq_003', 'demo_user_1', 'Vacuum Sealer', 'packaging', 'available', '2024-01-01', 200.00, 'Packaging Room', '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
('eq_004', 'demo_user_1', 'Deep Fryer', 'processing', 'available', '2024-01-01', 300.00, 'Processing Shed', '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z');
