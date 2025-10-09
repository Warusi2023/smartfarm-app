const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'database', 'smartfarm.db');
const db = new sqlite3.Database(dbPath);

console.log('Testing database connection...');

db.serialize(() => {
    // List all tables
    db.all("SELECT name FROM sqlite_master WHERE type='table'", (err, rows) => {
        if (err) {
            console.error('Error listing tables:', err);
        } else {
            console.log('Tables in database:');
            rows.forEach(row => {
                console.log('- ' + row.name);
            });
        }
        
        // Test farms table specifically
        db.all("SELECT COUNT(*) as count FROM farms", (err, rows) => {
            if (err) {
                console.error('Error querying farms table:', err);
            } else {
                console.log('Farms table count:', rows[0].count);
            }
            
            db.close();
        });
    });
});
