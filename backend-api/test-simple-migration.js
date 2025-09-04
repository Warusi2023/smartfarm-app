const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'database', 'smartfarm.db');
const db = new sqlite3.Database(dbPath);

console.log('Testing simple migration...');

db.serialize(() => {
    // Create a simple test table
    db.run(`
        CREATE TABLE IF NOT EXISTS test_table (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL
        );
    `, (err) => {
        if (err) {
            console.error('Error creating test table:', err);
        } else {
            console.log('✅ Test table created successfully');
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
