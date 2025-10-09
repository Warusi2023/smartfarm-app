const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

// Database connection
const dbPath = path.join(__dirname, 'smartfarm.db');
const db = new sqlite3.Database(dbPath);

// Migration table to track applied migrations
const MIGRATION_TABLE = `
CREATE TABLE IF NOT EXISTS migrations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    version TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    applied_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    checksum TEXT
);
`;

// Migration definitions
const migrations = [
    {
        version: '001',
        name: 'Initial Schema',
        up: `
            -- Users table
            CREATE TABLE IF NOT EXISTS users (
                id TEXT PRIMARY KEY,
                email TEXT UNIQUE NOT NULL,
                password TEXT NOT NULL,
                firstName TEXT NOT NULL,
                lastName TEXT NOT NULL,
                phone TEXT,
                avatar TEXT,
                role TEXT DEFAULT 'farmer',
                status TEXT DEFAULT 'active',
                permissions TEXT,
                lastLoginAt DATETIME,
                emailVerified BOOLEAN DEFAULT 0,
                phoneVerified BOOLEAN DEFAULT 0,
                twoFactorEnabled BOOLEAN DEFAULT 0,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
            );

            -- Farms table
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

            -- Livestock table
            CREATE TABLE IF NOT EXISTS livestock (
                id TEXT PRIMARY KEY,
                name TEXT NOT NULL,
                type TEXT NOT NULL,
                farmId TEXT NOT NULL,
                breed TEXT,
                birthDate DATE,
                weight REAL,
                description TEXT,
                status TEXT DEFAULT 'HEALTHY',
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (farmId) REFERENCES farms (id)
            );

            -- Crops table
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
            );

            -- Inventory table
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
            );

            -- Financial records table
            CREATE TABLE IF NOT EXISTS financial_records (
                id TEXT PRIMARY KEY,
                farmId TEXT NOT NULL,
                type TEXT NOT NULL,
                category TEXT NOT NULL,
                amount REAL NOT NULL,
                description TEXT,
                date DATE NOT NULL,
                paymentMethod TEXT,
                reference TEXT,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (farmId) REFERENCES farms (id)
            );

            -- Weather data table
            CREATE TABLE IF NOT EXISTS weather_data (
                id TEXT PRIMARY KEY,
                farmId TEXT NOT NULL,
                date DATE NOT NULL,
                temperature REAL,
                humidity REAL,
                precipitation REAL,
                windSpeed REAL,
                windDirection TEXT,
                pressure REAL,
                visibility REAL,
                notes TEXT,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (farmId) REFERENCES farms (id)
            );

            -- Documents table
            CREATE TABLE IF NOT EXISTS documents (
                id TEXT PRIMARY KEY,
                farmId TEXT NOT NULL,
                name TEXT NOT NULL,
                category TEXT NOT NULL,
                filePath TEXT,
                fileSize INTEGER,
                mimeType TEXT,
                description TEXT,
                tags TEXT,
                notes TEXT,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (farmId) REFERENCES farms (id)
            );

            -- Analytics data table
            CREATE TABLE IF NOT EXISTS analytics_data (
                id TEXT PRIMARY KEY,
                farmId TEXT NOT NULL,
                metric TEXT NOT NULL,
                value REAL NOT NULL,
                date DATE NOT NULL,
                category TEXT,
                notes TEXT,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (farmId) REFERENCES farms (id)
            );

            -- Employees table
            CREATE TABLE IF NOT EXISTS employees (
                id TEXT PRIMARY KEY,
                farmId TEXT NOT NULL,
                firstName TEXT NOT NULL,
                lastName TEXT NOT NULL,
                email TEXT,
                phone TEXT,
                position TEXT,
                hireDate DATE,
                salary REAL,
                status TEXT DEFAULT 'active',
                notes TEXT,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (farmId) REFERENCES farms (id)
            );

            -- Tasks table
            CREATE TABLE IF NOT EXISTS tasks (
                id TEXT PRIMARY KEY,
                farmId TEXT NOT NULL,
                title TEXT NOT NULL,
                description TEXT,
                assignedTo TEXT,
                priority TEXT DEFAULT 'medium',
                status TEXT DEFAULT 'pending',
                dueDate DATE,
                completedDate DATE,
                notes TEXT,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (farmId) REFERENCES farms (id),
                FOREIGN KEY (assignedTo) REFERENCES employees (id)
            );

            -- Create indexes for better performance
            CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
            CREATE INDEX IF NOT EXISTS idx_farms_owner ON farms(ownerId);
            CREATE INDEX IF NOT EXISTS idx_livestock_farm ON livestock(farmId);
            CREATE INDEX IF NOT EXISTS idx_crops_farm ON crops(farmId);
            CREATE INDEX IF NOT EXISTS idx_inventory_farm ON inventory(farmId);
            CREATE INDEX IF NOT EXISTS idx_financial_farm ON financial_records(farmId);
            CREATE INDEX IF NOT EXISTS idx_weather_farm ON weather_data(farmId);
            CREATE INDEX IF NOT EXISTS idx_documents_farm ON documents(farmId);
            CREATE INDEX IF NOT EXISTS idx_analytics_farm ON analytics_data(farmId);
            CREATE INDEX IF NOT EXISTS idx_employees_farm ON employees(farmId);
            CREATE INDEX IF NOT EXISTS idx_tasks_farm ON tasks(farmId);
        `,
        down: `
            DROP TABLE IF EXISTS tasks;
            DROP TABLE IF EXISTS employees;
            DROP TABLE IF EXISTS analytics_data;
            DROP TABLE IF EXISTS documents;
            DROP TABLE IF EXISTS weather_data;
            DROP TABLE IF EXISTS financial_records;
            DROP TABLE IF EXISTS inventory;
            DROP TABLE IF EXISTS crops;
            DROP TABLE IF EXISTS livestock;
            DROP TABLE IF EXISTS farms;
            DROP TABLE IF EXISTS users;
        `
    },
    {
        version: '002',
        name: 'Add User Permissions and Settings',
        up: `
            -- Add permissions column to users table (if not exists)
            ALTER TABLE users ADD COLUMN permissions TEXT DEFAULT '[]';
            
            -- Add settings column to users table (if not exists)
            ALTER TABLE users ADD COLUMN settings TEXT DEFAULT '{}';
            
            -- Add notification preferences (if not exists)
            ALTER TABLE users ADD COLUMN notificationPreferences TEXT DEFAULT '{}';
            
            -- Create user sessions table
            CREATE TABLE IF NOT EXISTS user_sessions (
                id TEXT PRIMARY KEY,
                userId TEXT NOT NULL,
                token TEXT NOT NULL,
                deviceInfo TEXT,
                ipAddress TEXT,
                expiresAt DATETIME NOT NULL,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (userId) REFERENCES users (id)
            );
            
            CREATE INDEX IF NOT EXISTS idx_user_sessions_user ON user_sessions(userId);
            CREATE INDEX IF NOT EXISTS idx_user_sessions_token ON user_sessions(token);
        `,
        down: `
            DROP TABLE IF EXISTS user_sessions;
            -- Note: SQLite doesn't support DROP COLUMN, so we'll keep the new columns
        `
    },
    {
        version: '003',
        name: 'Add Farm Equipment and Maintenance',
        up: `
            -- Equipment table
            CREATE TABLE IF NOT EXISTS equipment (
                id TEXT PRIMARY KEY,
                farmId TEXT NOT NULL,
                name TEXT NOT NULL,
                type TEXT NOT NULL,
                model TEXT,
                serialNumber TEXT,
                purchaseDate DATE,
                purchasePrice REAL,
                currentValue REAL,
                status TEXT DEFAULT 'operational',
                location TEXT,
                notes TEXT,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (farmId) REFERENCES farms (id)
            );
            
            -- Maintenance records table
            CREATE TABLE IF NOT EXISTS maintenance_records (
                id TEXT PRIMARY KEY,
                equipmentId TEXT NOT NULL,
                type TEXT NOT NULL,
                description TEXT,
                cost REAL,
                performedBy TEXT,
                performedDate DATE,
                nextMaintenanceDate DATE,
                notes TEXT,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (equipmentId) REFERENCES equipment (id)
            );
            
            CREATE INDEX IF NOT EXISTS idx_equipment_farm ON equipment(farmId);
            CREATE INDEX IF NOT EXISTS idx_maintenance_equipment ON maintenance_records(equipmentId);
        `,
        down: `
            DROP TABLE IF EXISTS maintenance_records;
            DROP TABLE IF EXISTS equipment;
        `
    },
    {
        version: '004',
        name: 'Update Livestock Table Schema',
        up: `
            -- Update livestock table to match API expectations
            -- First, create a new table with the correct schema
            CREATE TABLE IF NOT EXISTS livestock_new (
                id TEXT PRIMARY KEY,
                name TEXT NOT NULL,
                type TEXT NOT NULL,
                farmId TEXT NOT NULL,
                breed TEXT,
                birthDate DATE,
                weight REAL,
                description TEXT,
                status TEXT DEFAULT 'HEALTHY',
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (farmId) REFERENCES farms (id)
            );

            -- Migrate existing data if any
            INSERT OR IGNORE INTO livestock_new (id, name, type, farmId, breed, birthDate, weight, description, status, createdAt, updatedAt)
            SELECT 
                id,
                COALESCE(name, type || ' ' || breed) as name,
                type,
                farmId,
                breed,
                COALESCE(birthDate, date('now')) as birthDate,
                weight,
                COALESCE(notes, description) as description,
                COALESCE(healthStatus, 'HEALTHY') as status,
                COALESCE(createdAt, datetime('now')) as createdAt,
                COALESCE(updatedAt, datetime('now')) as updatedAt
            FROM livestock;

            -- Drop the old table
            DROP TABLE IF EXISTS livestock;

            -- Rename the new table
            ALTER TABLE livestock_new RENAME TO livestock;

            -- Recreate the index
            CREATE INDEX IF NOT EXISTS idx_livestock_farm ON livestock(farmId);
        `,
        down: `
            -- Revert to old schema (not recommended as data may be lost)
            -- This is a destructive rollback
            DROP TABLE IF EXISTS livestock;
        `
    }
];

// Initialize migration table
function initializeMigrationTable() {
    return new Promise((resolve, reject) => {
        db.run(MIGRATION_TABLE, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

// Get applied migrations
function getAppliedMigrations() {
    return new Promise((resolve, reject) => {
        db.all('SELECT version FROM migrations ORDER BY version', (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows.map(row => row.version));
            }
        });
    });
}

// Apply migration
// Helper function to check if column exists
function columnExists(tableName, columnName) {
    return new Promise((resolve, reject) => {
        db.all(`PRAGMA table_info(${tableName})`, (err, rows) => {
            if (err) {
                reject(err);
                return;
            }
            const exists = rows.some(row => row.name === columnName);
            resolve(exists);
        });
    });
}

// Helper function to safely add column
async function safeAddColumn(tableName, columnName, columnDef) {
    const exists = await columnExists(tableName, columnName);
    if (!exists) {
        return new Promise((resolve, reject) => {
            db.run(`ALTER TABLE ${tableName} ADD COLUMN ${columnName} ${columnDef}`, (err) => {
                if (err) reject(err);
                else resolve();
            });
        });
    }
    return Promise.resolve();
}

function applyMigration(migration) {
    return new Promise(async (resolve, reject) => {
        try {
            db.serialize(() => {
                db.run('BEGIN TRANSACTION');
                
                // Handle migration 002 specially to avoid duplicate column errors
                if (migration.version === '002') {
                    // Check if columns exist before adding them
                    db.all("PRAGMA table_info(users)", (err, rows) => {
                        if (err) {
                            db.run('ROLLBACK');
                            reject(err);
                            return;
                        }
                        
                        const columnNames = rows.map(row => row.name);
                        const columnsToAdd = [];
                        
                        if (!columnNames.includes('permissions')) {
                            columnsToAdd.push("ALTER TABLE users ADD COLUMN permissions TEXT DEFAULT '[]'");
                        }
                        if (!columnNames.includes('settings')) {
                            columnsToAdd.push("ALTER TABLE users ADD COLUMN settings TEXT DEFAULT '{}'");
                        }
                        if (!columnNames.includes('notificationPreferences')) {
                            columnsToAdd.push("ALTER TABLE users ADD COLUMN notificationPreferences TEXT DEFAULT '{}'");
                        }
                        
                        // Execute column additions
                        let completed = 0;
                        const total = columnsToAdd.length + 3; // +3 for table creation and 2 indexes
                        
                        if (columnsToAdd.length === 0) {
                            completed = columnsToAdd.length;
                        } else {
                            columnsToAdd.forEach(sql => {
                                db.run(sql, (err) => {
                                    if (err) {
                                        console.log(`Column already exists or error: ${err.message}`);
                                    }
                                    completed++;
                                    if (completed >= total) {
                                        finishMigration();
                                    }
                                });
                            });
                        }
                        
                        // Create user sessions table
                        db.run(`
                            CREATE TABLE IF NOT EXISTS user_sessions (
                                id TEXT PRIMARY KEY,
                                userId TEXT NOT NULL,
                                token TEXT NOT NULL,
                                deviceInfo TEXT,
                                ipAddress TEXT,
                                expiresAt DATETIME NOT NULL,
                                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                                FOREIGN KEY (userId) REFERENCES users (id)
                            );
                        `, (err) => {
                            if (err) {
                                console.log(`Table creation error: ${err.message}`);
                            }
                            completed++;
                            if (completed >= total) {
                                finishMigration();
                            }
                        });
                        
                        // Create indexes
                        db.run('CREATE INDEX IF NOT EXISTS idx_user_sessions_user ON user_sessions(userId);', (err) => {
                            if (err) {
                                console.log(`Index creation error: ${err.message}`);
                            }
                            completed++;
                            if (completed >= total) {
                                finishMigration();
                            }
                        });
                        
                        db.run('CREATE INDEX IF NOT EXISTS idx_user_sessions_token ON user_sessions(token);', (err) => {
                            if (err) {
                                console.log(`Index creation error: ${err.message}`);
                            }
                            completed++;
                            if (completed >= total) {
                                finishMigration();
                            }
                        });
                        
                        function finishMigration() {
                            const checksum = require('crypto').createHash('md5').update(migration.up).digest('hex');
                            db.run(
                                'INSERT INTO migrations (version, name, checksum) VALUES (?, ?, ?)',
                                [migration.version, migration.name, checksum],
                                (err) => {
                                    if (err) {
                                        db.run('ROLLBACK');
                                        reject(err);
                                        return;
                                    }
                                    
                                    db.run('COMMIT');
                                    resolve();
                                }
                            );
                        }
                    });
                } else {
                    // Handle other migrations normally
                    console.log(`Executing migration ${migration.version}: ${migration.name}`);
                    console.log(`SQL length: ${migration.up.length} characters`);
                    
                    db.run(migration.up, (err) => {
                        if (err) {
                            console.error(`Migration ${migration.version} failed:`, err);
                            db.run('ROLLBACK');
                            reject(err);
                            return;
                        }
                        
                        console.log(`Migration ${migration.version} executed successfully`);
                        
                        const checksum = require('crypto').createHash('md5').update(migration.up).digest('hex');
                        db.run(
                            'INSERT INTO migrations (version, name, checksum) VALUES (?, ?, ?)',
                            [migration.version, migration.name, checksum],
                            (err) => {
                                if (err) {
                                    db.run('ROLLBACK');
                                    reject(err);
                                    return;
                                }
                                
                                db.run('COMMIT');
                                resolve();
                            }
                        );
                    });
                }
            });
        } catch (err) {
            reject(err);
        }
    });
}

// Rollback migration
function rollbackMigration(migration) {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.run('BEGIN TRANSACTION');
            
            db.run(migration.down, (err) => {
                if (err) {
                    db.run('ROLLBACK');
                    reject(err);
                    return;
                }
                
                db.run('DELETE FROM migrations WHERE version = ?', [migration.version], (err) => {
                    if (err) {
                        db.run('ROLLBACK');
                        reject(err);
                        return;
                    }
                    
                    db.run('COMMIT');
                    resolve();
                });
            });
        });
    });
}

// Run migrations
async function runMigrations() {
    try {
        console.log('🔄 Initializing migration system...');
        await initializeMigrationTable();
        
        const appliedMigrations = await getAppliedMigrations();
        console.log(`📋 Applied migrations: ${appliedMigrations.join(', ') || 'None'}`);
        
        const pendingMigrations = migrations.filter(m => !appliedMigrations.includes(m.version));
        
        if (pendingMigrations.length === 0) {
            console.log('✅ Database is up to date');
            return;
        }
        
        console.log(`🚀 Running ${pendingMigrations.length} pending migrations...`);
        
        for (const migration of pendingMigrations) {
            console.log(`📝 Applying migration ${migration.version}: ${migration.name}`);
            await applyMigration(migration);
            console.log(`✅ Migration ${migration.version} applied successfully`);
        }
        
        console.log('🎉 All migrations completed successfully');
    } catch (error) {
        console.error('❌ Migration failed:', error);
        throw error;
    }
}

// Rollback migrations
async function rollbackMigrations(count = 1) {
    try {
        console.log(`🔄 Rolling back ${count} migration(s)...`);
        
        const appliedMigrations = await getAppliedMigrations();
        const migrationsToRollback = appliedMigrations.slice(-count).reverse();
        
        for (const version of migrationsToRollback) {
            const migration = migrations.find(m => m.version === version);
            if (!migration) {
                console.warn(`⚠️ Migration ${version} not found in migration definitions`);
                continue;
            }
            
            console.log(`📝 Rolling back migration ${migration.version}: ${migration.name}`);
            await rollbackMigration(migration);
            console.log(`✅ Migration ${migration.version} rolled back successfully`);
        }
        
        console.log('🎉 Rollback completed successfully');
    } catch (error) {
        console.error('❌ Rollback failed:', error);
        throw error;
    }
}

// Get migration status
async function getMigrationStatus() {
    try {
        await initializeMigrationTable();
        const appliedMigrations = await getAppliedMigrations();
        
        const status = migrations.map(migration => ({
            version: migration.version,
            name: migration.name,
            applied: appliedMigrations.includes(migration.version),
            appliedAt: null // Could be enhanced to include timestamp
        }));
        
        return status;
    } catch (error) {
        console.error('❌ Failed to get migration status:', error);
        throw error;
    }
}

module.exports = {
    runMigrations,
    rollbackMigrations,
    getMigrationStatus,
    migrations
}; 