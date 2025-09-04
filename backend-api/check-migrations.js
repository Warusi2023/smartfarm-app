const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'database', 'smartfarm.db');
const db = new sqlite3.Database(dbPath);

console.log('Checking migration status...');

db.serialize(() => {
    // Check applied migrations
    db.all("SELECT * FROM migrations ORDER BY version", (err, rows) => {
        if (err) {
            console.error('Error checking migrations:', err);
        } else {
            console.log('Applied migrations:');
            rows.forEach(row => {
                console.log(`- ${row.version}: ${row.name} (applied at: ${row.applied_at})`);
            });
        }
        
        db.close();
    });
});
