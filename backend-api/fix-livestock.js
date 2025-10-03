const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database/smartfarm.db');

console.log('🔧 Fixing livestock table...');

db.serialize(() => {
    // Check if livestock_new exists
    db.all("SELECT name FROM sqlite_master WHERE type='table' AND name='livestock_new'", (err, rows) => {
        if (err) {
            console.error('Error checking livestock_new:', err);
            return;
        }
        
        if (rows.length > 0) {
            console.log('✅ Found livestock_new table, renaming to livestock...');
            
            // Rename livestock_new to livestock
            db.run('ALTER TABLE livestock_new RENAME TO livestock', (err) => {
                if (err) {
                    console.error('Error renaming table:', err);
                    return;
                }
                
                console.log('✅ Successfully renamed livestock_new to livestock');
                
                // Create index
                db.run('CREATE INDEX IF NOT EXISTS idx_livestock_farm ON livestock(farmId)', (err) => {
                    if (err) {
                        console.error('Error creating index:', err);
                        return;
                    }
                    
                    console.log('✅ Created index on farmId');
                    
                    // Check final schema
                    db.all('PRAGMA table_info(livestock)', (err, columns) => {
                        if (err) {
                            console.error('Error getting final schema:', err);
                            return;
                        }
                        
                        console.log('\n🎉 Final livestock table schema:');
                        columns.forEach(col => {
                            console.log(`- ${col.name}: ${col.type}`);
                        });
                        
                        db.close();
                    });
                });
            });
        } else {
            console.log('❌ livestock_new table not found');
            db.close();
        }
    });
});
