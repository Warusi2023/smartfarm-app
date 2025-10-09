const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'database', 'smartfarm.db');
const db = new sqlite3.Database(dbPath);

console.log('Creating simple schema...');

db.serialize(() => {
    // Disable foreign key constraints
    db.run("PRAGMA foreign_keys = OFF");
    
    // Create farms table without foreign keys
    db.run(`
        CREATE TABLE IF NOT EXISTS farms (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            description TEXT,
            location TEXT,
            size REAL,
            type TEXT,
            status TEXT DEFAULT 'active',
            parentFarmId TEXT,
            ownerId TEXT NOT NULL,
            managerId TEXT,
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
            updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
        );
    `, (err) => {
        if (err) {
            console.error('Error creating farms table:', err);
        } else {
            console.log('✅ Farms table created');
        }
    });
    
    // Create livestock table
    db.run(`
        CREATE TABLE IF NOT EXISTS livestock (
            id TEXT PRIMARY KEY,
            farmId TEXT NOT NULL,
            type TEXT NOT NULL,
            breed TEXT,
            quantity INTEGER NOT NULL,
            healthStatus TEXT DEFAULT 'healthy',
            weight REAL,
            age REAL,
            gender TEXT,
            notes TEXT,
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
            updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
        );
    `, (err) => {
        if (err) {
            console.error('Error creating livestock table:', err);
        } else {
            console.log('✅ Livestock table created');
        }
    });
    
    // Create crops table
    db.run(`
        CREATE TABLE IF NOT EXISTS crops (
            id TEXT PRIMARY KEY,
            farmId TEXT NOT NULL,
            name TEXT NOT NULL,
            variety TEXT,
            plantedDate DATE,
            expectedHarvestDate DATE,
            actualHarvestDate DATE,
            status TEXT DEFAULT 'growing',
            yield REAL,
            notes TEXT,
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
            updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
        );
    `, (err) => {
        if (err) {
            console.error('Error creating crops table:', err);
        } else {
            console.log('✅ Crops table created');
        }
    });
    
    // Create inventory table
    db.run(`
        CREATE TABLE IF NOT EXISTS inventory (
            id TEXT PRIMARY KEY,
            farmId TEXT NOT NULL,
            name TEXT NOT NULL,
            category TEXT NOT NULL,
            quantity INTEGER NOT NULL,
            unit TEXT NOT NULL,
            cost REAL,
            supplier TEXT,
            expiryDate DATE,
            notes TEXT,
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
            updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
        );
    `, (err) => {
        if (err) {
            console.error('Error creating inventory table:', err);
        } else {
            console.log('✅ Inventory table created');
        }
    });
    
    // Create financial_records table
    db.run(`
        CREATE TABLE IF NOT EXISTS financial_records (
            id TEXT PRIMARY KEY,
            farmId TEXT NOT NULL,
            type TEXT NOT NULL,
            category TEXT,
            amount REAL NOT NULL,
            description TEXT,
            date DATE NOT NULL,
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
            updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
        );
    `, (err) => {
        if (err) {
            console.error('Error creating financial_records table:', err);
        } else {
            console.log('✅ Financial records table created');
        }
    });
    
    // Create employees table
    db.run(`
        CREATE TABLE IF NOT EXISTS employees (
            id TEXT PRIMARY KEY,
            farmId TEXT NOT NULL,
            firstName TEXT NOT NULL,
            lastName TEXT NOT NULL,
            email TEXT,
            phone TEXT,
            position TEXT,
            hireDate DATE,
            salary REAL,
            status TEXT DEFAULT 'active',
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
            updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
        );
    `, (err) => {
        if (err) {
            console.error('Error creating employees table:', err);
        } else {
            console.log('✅ Employees table created');
        }
    });
    
    // Create tasks table
    db.run(`
        CREATE TABLE IF NOT EXISTS tasks (
            id TEXT PRIMARY KEY,
            farmId TEXT NOT NULL,
            title TEXT NOT NULL,
            description TEXT,
            assignedTo TEXT,
            priority TEXT DEFAULT 'medium',
            status TEXT DEFAULT 'pending',
            dueDate DATE,
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
            updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
        );
    `, (err) => {
        if (err) {
            console.error('Error creating tasks table:', err);
        } else {
            console.log('✅ Tasks table created');
        }
    });
    
    // Create weather_data table
    db.run(`
        CREATE TABLE IF NOT EXISTS weather_data (
            id TEXT PRIMARY KEY,
            farmId TEXT NOT NULL,
            date DATE NOT NULL,
            temperature REAL,
            humidity REAL,
            precipitation REAL,
            windSpeed REAL,
            windDirection TEXT,
            pressure REAL,
            visibility REAL,
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
        );
    `, (err) => {
        if (err) {
            console.error('Error creating weather_data table:', err);
        } else {
            console.log('✅ Weather data table created');
        }
    });
    
    // Create documents table
    db.run(`
        CREATE TABLE IF NOT EXISTS documents (
            id TEXT PRIMARY KEY,
            farmId TEXT NOT NULL,
            name TEXT NOT NULL,
            category TEXT,
            filePath TEXT NOT NULL,
            fileSize INTEGER,
            mimeType TEXT,
            description TEXT,
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
            updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
        );
    `, (err) => {
        if (err) {
            console.error('Error creating documents table:', err);
        } else {
            console.log('✅ Documents table created');
        }
    });
    
    // Create analytics_data table
    db.run(`
        CREATE TABLE IF NOT EXISTS analytics_data (
            id TEXT PRIMARY KEY,
            farmId TEXT NOT NULL,
            metric TEXT NOT NULL,
            value REAL NOT NULL,
            date DATE NOT NULL,
            category TEXT,
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
        );
    `, (err) => {
        if (err) {
            console.error('Error creating analytics_data table:', err);
        } else {
            console.log('✅ Analytics data table created');
        }
    });
    
    // Re-enable foreign key constraints
    db.run("PRAGMA foreign_keys = ON", (err) => {
        if (err) {
            console.error('Error enabling foreign keys:', err);
        } else {
            console.log('✅ Foreign key constraints re-enabled');
        }
        
        // List all tables
        db.all("SELECT name FROM sqlite_master WHERE type='table'", (err, rows) => {
            if (err) {
                console.error('Error listing tables:', err);
            } else {
                console.log('\nAll tables:');
                rows.forEach(row => {
                    console.log('- ' + row.name);
                });
            }
            
            db.close();
        });
    });
});
