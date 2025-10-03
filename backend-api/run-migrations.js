const sqlite3 = require('sqlite3').verbose();
const { runMigrations } = require('./database/migrations');

console.log('🚀 Running all migrations...');

runMigrations()
    .then(() => {
        console.log('✅ All migrations completed successfully');
        
        // Check tables after migrations
        const db = new sqlite3.Database('./database/smartfarm.db');
        db.all('SELECT name FROM sqlite_master WHERE type="table"', (err, tables) => {
            if (err) {
                console.error('Error checking tables:', err);
                return;
            }
            
            console.log('\n📋 Tables after migrations:');
            tables.forEach(table => console.log(`- ${table.name}`));
            
            db.close();
        });
    })
    .catch(error => {
        console.error('❌ Migration failed:', error);
    });
