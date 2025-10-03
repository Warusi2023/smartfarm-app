const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database/smartfarm.db');

console.log('🌱 Inserting sample data...');

db.serialize(() => {
    // Insert sample user
    const sampleUser = {
        id: 'user-001',
        email: 'farmer@smartfarm.com',
        password: '$2a$10$hashedpassword',
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
        ['livestock-001', 'Angus Cattle #1', 'Cattle', sampleFarm.id, 'Angus', '2022-01-15', 450.5, 'Main herd bull', 'HEALTHY'],
        ['livestock-002', 'Yorkshire Pig #1', 'Pigs', sampleFarm.id, 'Yorkshire', '2023-03-10', 180.2, 'Breeding stock', 'HEALTHY'],
        ['livestock-003', 'Rhode Island Red Hen #1', 'Chickens', sampleFarm.id, 'Rhode Island Red', '2023-06-01', 2.5, 'Egg production', 'HEALTHY']
    ];

    sampleLivestock.forEach(([id, name, type, farmId, breed, birthDate, weight, description, status]) => {
        db.run(`INSERT OR IGNORE INTO livestock (id, name, type, farmId, breed, birthDate, weight, description, status) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [id, name, type, farmId, breed, birthDate, weight, description, status]
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

    // Check final data
    setTimeout(() => {
        console.log('\n📊 Checking sample data...');
        
        db.all('SELECT COUNT(*) as count FROM users', (err, result) => {
            if (!err) console.log(`👥 Users: ${result[0].count}`);
        });
        
        db.all('SELECT COUNT(*) as count FROM farms', (err, result) => {
            if (!err) console.log(`🏡 Farms: ${result[0].count}`);
        });
        
        db.all('SELECT COUNT(*) as count FROM livestock', (err, result) => {
            if (!err) console.log(`🐄 Livestock: ${result[0].count}`);
        });
        
        db.all('SELECT COUNT(*) as count FROM crops', (err, result) => {
            if (!err) console.log(`🌾 Crops: ${result[0].count}`);
        });
        
        db.all('SELECT COUNT(*) as count FROM inventory', (err, result) => {
            if (!err) console.log(`📦 Inventory: ${result[0].count}`);
        });
        
        // Show sample livestock
        db.all('SELECT * FROM livestock LIMIT 3', (err, rows) => {
            if (!err) {
                console.log('\n🐄 Sample livestock:');
                rows.forEach(row => {
                    console.log(`- ${row.name} (${row.type}, ${row.breed})`);
                });
            }
            
            db.close();
        });
    }, 500);
});
