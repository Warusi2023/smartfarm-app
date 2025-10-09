const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'database', 'smartfarm.db');
const db = new sqlite3.Database(dbPath);

console.log('Checking users table structure...');

db.serialize(() => {
    // Check users table structure
    db.all("PRAGMA table_info(users)", (err, rows) => {
        if (err) {
            console.error('Error checking users table:', err);
        } else {
            console.log('Users table structure:');
            rows.forEach(row => {
                console.log(`- ${row.name}: ${row.type} ${row.notnull ? 'NOT NULL' : ''} ${row.pk ? 'PRIMARY KEY' : ''}`);
            });
        }
        
        // Try to create farms table with foreign key constraints disabled
        console.log('\nTrying to create farms table with foreign key constraints disabled...');
        db.run("PRAGMA foreign_keys = OFF", (err) => {
            if (err) {
                console.error('Error disabling foreign keys:', err);
            } else {
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
                        console.log('✅ Farms table created successfully');
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
            }
        });
    });
});
