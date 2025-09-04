const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'database', 'smartfarm.db');
const db = new sqlite3.Database(dbPath);

console.log('Testing farms table creation...');

db.serialize(() => {
    // Create farms table manually
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
            updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (ownerId) REFERENCES users (id),
            FOREIGN KEY (managerId) REFERENCES users (id),
            FOREIGN KEY (parentFarmId) REFERENCES farms (id)
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
                console.log('All tables:');
                rows.forEach(row => {
                    console.log('- ' + row.name);
                });
            }
            
            db.close();
        });
    });
});
