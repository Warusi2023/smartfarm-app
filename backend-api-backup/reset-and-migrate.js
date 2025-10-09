const sqlite3 = require('sqlite3').verbose();
const path = require('path');

console.log('🔧 Resetting database and running migrations...');

// Delete the database file
const fs = require('fs');
const dbPath = './database/smartfarm.db';

try {
    if (fs.existsSync(dbPath)) {
        fs.unlinkSync(dbPath);
        console.log('🗑️ Deleted existing database');
    }
} catch (error) {
    console.error('Error deleting database:', error);
}

// Create new database and run migrations
const { initializeDatabase } = require('./database/init');

initializeDatabase()
    .then(() => {
        console.log('✅ Database initialized successfully');
        
        // Check final state
        const db = new sqlite3.Database(dbPath);
        db.all('SELECT name FROM sqlite_master WHERE type="table"', (err, tables) => {
            if (err) {
                console.error('Error checking tables:', err);
                return;
            }
            
            console.log('\n📋 Final tables:');
            tables.forEach(table => console.log(`- ${table.name}`));
            
            db.close();
        });
    })
    .catch(error => {
        console.error('❌ Database initialization failed:', error);
    });
