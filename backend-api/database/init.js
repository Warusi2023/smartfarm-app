const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const { runMigrations } = require('./migrations');

// Create database file
const dbPath = path.join(__dirname, 'smartfarm.db');
const db = new sqlite3.Database(dbPath);

// Wait for database to be ready
db.on('open', () => {
    console.log('✅ Database connection established');
});

// Initialize database with migrations
async function initializeDatabase() {
    try {
        console.log('🔄 Initializing SmartFarm database...');
        
        // Run migrations to set up schema
        await runMigrations();
        
        // Wait a bit for database to be ready
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Insert sample data
        await insertSampleData();
        
        console.log('✅ Database initialized successfully');
    } catch (error) {
        console.error('❌ Database initialization failed:', error);
        throw error;
    }
}

async function insertSampleData() {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            // Insert sample user
            const sampleUser = {
                id: 'user-001',
                email: 'farmer@smartfarm.com',
                password: '$2a$10$hashedpassword', // In real app, hash the password
                firstName: 'John',
                lastName: 'Farmer',
                role: 'farmer'
            };

            db.run(`INSERT OR IGNORE INTO users (id, email, password, firstName, lastName, role) 
                    VALUES (?, ?, ?, ?, ?, ?)`,
                [sampleUser.id, sampleUser.email, sampleUser.password, sampleUser.firstName, sampleUser.lastName, sampleUser.role]
            );

            // Insert sample farm
            const sampleFarm = {
                id: 'farm-001',
                name: 'Green Acres Farm',
                location: 'Springfield, IL',
                size: 500.0,
                ownerId: sampleUser.id
            };

            db.run(`INSERT OR IGNORE INTO farms (id, name, location, size, ownerId) 
                    VALUES (?, ?, ?, ?, ?)`,
                [sampleFarm.id, sampleFarm.name, sampleFarm.location, sampleFarm.size, sampleFarm.ownerId]
            );

            // Insert sample livestock
            const sampleLivestock = [
                ['livestock-001', sampleFarm.id, 'Cattle', 'Angus', 50, 'healthy', 'Main herd'],
                ['livestock-002', sampleFarm.id, 'Pigs', 'Yorkshire', 25, 'healthy', 'Breeding stock'],
                ['livestock-003', sampleFarm.id, 'Chickens', 'Rhode Island Red', 200, 'healthy', 'Egg production']
            ];

            sampleLivestock.forEach(([id, farmId, type, breed, quantity, healthStatus, notes]) => {
                db.run(`INSERT OR IGNORE INTO livestock (id, farmId, type, breed, quantity, healthStatus, notes) 
                        VALUES (?, ?, ?, ?, ?, ?, ?)`,
                    [id, farmId, type, breed, quantity, healthStatus, notes]
                );
            });

            // Insert sample crops
            const sampleCrops = [
                ['crop-001', sampleFarm.id, 'Corn', 'Sweet Corn', '2024-04-15', '2024-08-15', 'growing', 'Field A'],
                ['crop-002', sampleFarm.id, 'Wheat', 'Winter Wheat', '2023-10-01', '2024-07-01', 'growing', 'Field B'],
                ['crop-003', sampleFarm.id, 'Soybeans', 'Roundup Ready', '2024-05-01', '2024-09-15', 'growing', 'Field C']
            ];

            sampleCrops.forEach(([id, farmId, name, variety, plantedDate, expectedHarvestDate, status, notes]) => {
                db.run(`INSERT OR IGNORE INTO crops (id, farmId, name, variety, plantedDate, expectedHarvestDate, status, notes) 
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
                    [id, farmId, name, variety, plantedDate, expectedHarvestDate, status, notes]
                );
            });

            // Insert sample inventory
            const sampleInventory = [
                ['inv-001', sampleFarm.id, 'Fertilizer', 'Supplies', 1000, 'kg', 2.50, 'AgroSupply Co.', 'NPK 10-10-10'],
                ['inv-002', sampleFarm.id, 'Seeds', 'Supplies', 500, 'kg', 5.00, 'SeedCorp', 'Corn seeds'],
                ['inv-003', sampleFarm.id, 'Tractor Fuel', 'Fuel', 200, 'liters', 1.20, 'Local Gas Station', 'Diesel']
            ];

            sampleInventory.forEach(([id, farmId, name, category, quantity, unit, cost, supplier, notes]) => {
                db.run(`INSERT OR IGNORE INTO inventory (id, farmId, name, category, quantity, unit, cost, supplier, notes) 
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                    [id, farmId, name, category, quantity, unit, cost, supplier, notes]
                );
            });

            // Insert sample financial records
            const sampleFinancial = [
                ['fin-001', sampleFarm.id, 'income', 'Crop Sales', 15000.00, 'Corn harvest sale', '2024-08-20'],
                ['fin-002', sampleFarm.id, 'expense', 'Supplies', 2500.00, 'Fertilizer purchase', '2024-04-10'],
                ['fin-003', sampleFarm.id, 'expense', 'Equipment', 5000.00, 'Tractor maintenance', '2024-03-15']
            ];

            sampleFinancial.forEach(([id, farmId, type, category, amount, description, date]) => {
                db.run(`INSERT OR IGNORE INTO financial_records (id, farmId, type, category, amount, description, date) 
                        VALUES (?, ?, ?, ?, ?, ?, ?)`,
                    [id, farmId, type, category, amount, description, date]
                );
            });

            // Insert sample employees
            const sampleEmployees = [
                ['emp-001', sampleFarm.id, 'Sarah', 'Johnson', 'sarah@greenacres.com', '+1-555-0101', 'Farm Manager', '2023-01-15', 45000],
                ['emp-002', sampleFarm.id, 'Mike', 'Davis', 'mike@greenacres.com', '+1-555-0102', 'Field Worker', '2023-03-01', 35000],
                ['emp-003', sampleFarm.id, 'Lisa', 'Wilson', 'lisa@greenacres.com', '+1-555-0103', 'Livestock Handler', '2023-02-15', 38000]
            ];

            sampleEmployees.forEach(([id, farmId, firstName, lastName, email, phone, position, hireDate, salary]) => {
                db.run(`INSERT OR IGNORE INTO employees (id, farmId, firstName, lastName, email, phone, position, hireDate, salary) 
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                    [id, farmId, firstName, lastName, email, phone, position, hireDate, salary]
                );
            });

            // Insert sample tasks
            const sampleTasks = [
                ['task-001', sampleFarm.id, 'Harvest Corn Field A', 'Complete corn harvest in Field A', 'emp-001', 'high', 'in-progress', '2024-08-25'],
                ['task-002', sampleFarm.id, 'Feed Livestock', 'Morning feeding of all livestock', 'emp-003', 'medium', 'completed', '2024-08-20'],
                ['task-003', sampleFarm.id, 'Maintain Equipment', 'Regular maintenance of tractors', 'emp-002', 'low', 'pending', '2024-08-30']
            ];

            sampleTasks.forEach(([id, farmId, title, description, assignedTo, priority, status, dueDate]) => {
                db.run(`INSERT OR IGNORE INTO tasks (id, farmId, title, description, assignedTo, priority, status, dueDate) 
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
                    [id, farmId, title, description, assignedTo, priority, status, dueDate]
                );
            });

            // Insert sample weather data
            const sampleWeather = [
                ['weather-001', sampleFarm.id, '2024-08-20', 25.5, 65.0, 0.0, 12.0, 'NW', 1013.25, 10.0],
                ['weather-002', sampleFarm.id, '2024-08-21', 28.0, 70.0, 5.2, 8.0, 'SE', 1010.50, 8.5],
                ['weather-003', sampleFarm.id, '2024-08-22', 22.0, 80.0, 15.5, 15.0, 'SW', 1008.75, 5.0]
            ];

            sampleWeather.forEach(([id, farmId, date, temperature, humidity, precipitation, windSpeed, windDirection, pressure, visibility]) => {
                db.run(`INSERT OR IGNORE INTO weather_data (id, farmId, date, temperature, humidity, precipitation, windSpeed, windDirection, pressure, visibility) 
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                    [id, farmId, date, temperature, humidity, precipitation, windSpeed, windDirection, pressure, visibility]
                );
            });

            // Insert sample documents
            const sampleDocuments = [
                ['doc-001', sampleFarm.id, 'Farm Insurance Policy', 'Legal', '/documents/insurance.pdf', 1024000, 'application/pdf', 'Annual insurance policy'],
                ['doc-002', sampleFarm.id, 'Equipment Manual', 'Technical', '/documents/tractor-manual.pdf', 2048000, 'application/pdf', 'Tractor operation manual'],
                ['doc-003', sampleFarm.id, 'Crop Planning Spreadsheet', 'Planning', '/documents/crop-plan.xlsx', 512000, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'Annual crop planning']
            ];

            sampleDocuments.forEach(([id, farmId, name, category, filePath, fileSize, mimeType, description]) => {
                db.run(`INSERT OR IGNORE INTO documents (id, farmId, name, category, filePath, fileSize, mimeType, description) 
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
                    [id, farmId, name, category, filePath, fileSize, mimeType, description]
                );
            });

            // Insert sample analytics data
            const sampleAnalytics = [
                ['analytics-001', sampleFarm.id, 'crop_yield', 4.2, '2024-08-20', 'corn'],
                ['analytics-002', sampleFarm.id, 'revenue', 15000.00, '2024-08-20', 'sales'],
                ['analytics-003', sampleFarm.id, 'costs', 7500.00, '2024-08-20', 'expenses'],
                ['analytics-004', sampleFarm.id, 'efficiency', 85.5, '2024-08-20', 'operations']
            ];

            sampleAnalytics.forEach(([id, farmId, metric, value, date, category]) => {
                db.run(`INSERT OR IGNORE INTO analytics_data (id, farmId, metric, value, date, category) 
                        VALUES (?, ?, ?, ?, ?, ?)`,
                    [id, farmId, metric, value, date, category]
                );
            });

            db.close((err) => {
                if (err) {
                    console.error('Error closing database:', err);
                    reject(err);
                } else {
                    console.log('✅ Sample data inserted successfully');
                    resolve();
                }
            });
        });
    });
}

module.exports = {
    db,
    initializeDatabase
}; 