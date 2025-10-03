const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database/smartfarm.db');

console.log('🔍 Checking database schema...');

db.all('SELECT name FROM sqlite_master WHERE type="table"', (err, tables) => {
    if (err) {
        console.error('Error getting tables:', err);
        return;
    }
    
    console.log('📋 Tables found:');
    tables.forEach(table => console.log(`- ${table.name}`));
    
    // Check livestock table specifically
    if (tables.some(t => t.name === 'livestock')) {
        console.log('\n🐄 Livestock table schema:');
        db.all('PRAGMA table_info(livestock)', (err, columns) => {
            if (err) {
                console.error('Error getting livestock schema:', err);
                return;
            }
            
            columns.forEach(col => {
                console.log(`- ${col.name}: ${col.type} (nullable: ${col.notnull === 0})`);
            });
            
            // Check if there's any data
            db.all('SELECT COUNT(*) as count FROM livestock', (err, result) => {
                if (err) {
                    console.error('Error counting livestock:', err);
                    return;
                }
                
                console.log(`\n📊 Livestock records: ${result[0].count}`);
                
                if (result[0].count > 0) {
                    db.all('SELECT * FROM livestock LIMIT 3', (err, rows) => {
                        if (err) {
                            console.error('Error getting livestock data:', err);
                            return;
                        }
                        
                        console.log('\n📝 Sample livestock data:');
                        rows.forEach(row => {
                            console.log(JSON.stringify(row, null, 2));
                        });
                        
                        db.close();
                    });
                } else {
                    db.close();
                }
            });
        });
    } else {
        console.log('\n❌ Livestock table not found!');
        db.close();
    }
});
