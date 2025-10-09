const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database/smartfarm.db');

console.log('🔧 Fixing all table issues...');

db.serialize(() => {
    // Check all tables
    db.all('SELECT name FROM sqlite_master WHERE type="table"', (err, tables) => {
        if (err) {
            console.error('Error getting tables:', err);
            return;
        }
        
        console.log('📋 Current tables:');
        tables.forEach(table => console.log(`- ${table.name}`));
        
        // Fix livestock table
        if (tables.some(t => t.name === 'livestock_new')) {
            console.log('\n🔧 Fixing livestock table...');
            db.run('ALTER TABLE livestock_new RENAME TO livestock', (err) => {
                if (err) {
                    console.error('Error renaming livestock_new:', err);
                    return;
                }
                console.log('✅ Renamed livestock_new to livestock');
                
                // Create index
                db.run('CREATE INDEX IF NOT EXISTS idx_livestock_farm ON livestock(farmId)', (err) => {
                    if (err) {
                        console.error('Error creating livestock index:', err);
                        return;
                    }
                    console.log('✅ Created livestock index');
                });
            });
        }
        
        // Check farms table
        if (!tables.some(t => t.name === 'farms')) {
            console.log('\n🔧 Creating farms table...');
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
                )
            `, (err) => {
                if (err) {
                    console.error('Error creating farms table:', err);
                    return;
                }
                console.log('✅ Created farms table');
                
                // Create index
                db.run('CREATE INDEX IF NOT EXISTS idx_farms_owner ON farms(ownerId)', (err) => {
                    if (err) {
                        console.error('Error creating farms index:', err);
                        return;
                    }
                    console.log('✅ Created farms index');
                });
            });
        }
        
        // Check crops table
        if (!tables.some(t => t.name === 'crops')) {
            console.log('\n🔧 Creating crops table...');
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
                    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                    FOREIGN KEY (farmId) REFERENCES farms (id)
                )
            `, (err) => {
                if (err) {
                    console.error('Error creating crops table:', err);
                    return;
                }
                console.log('✅ Created crops table');
                
                // Create index
                db.run('CREATE INDEX IF NOT EXISTS idx_crops_farm ON crops(farmId)', (err) => {
                    if (err) {
                        console.error('Error creating crops index:', err);
                        return;
                    }
                    console.log('✅ Created crops index');
                });
            });
        }
        
        // Check inventory table
        if (!tables.some(t => t.name === 'inventory')) {
            console.log('\n🔧 Creating inventory table...');
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
                    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                    FOREIGN KEY (farmId) REFERENCES farms (id)
                )
            `, (err) => {
                if (err) {
                    console.error('Error creating inventory table:', err);
                    return;
                }
                console.log('✅ Created inventory table');
                
                // Create index
                db.run('CREATE INDEX IF NOT EXISTS idx_inventory_farm ON inventory(farmId)', (err) => {
                    if (err) {
                        console.error('Error creating inventory index:', err);
                        return;
                    }
                    console.log('✅ Created inventory index');
                });
            });
        }
        
        // Wait a bit and then check final state
        setTimeout(() => {
            db.all('SELECT name FROM sqlite_master WHERE type="table"', (err, finalTables) => {
                if (err) {
                    console.error('Error getting final tables:', err);
                    return;
                }
                
                console.log('\n🎉 Final tables:');
                finalTables.forEach(table => console.log(`- ${table.name}`));
                
                db.close();
            });
        }, 1000);
    });
});
