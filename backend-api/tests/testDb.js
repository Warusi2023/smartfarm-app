const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

class TestDatabase {
    constructor() {
        this.dbPath = path.join(__dirname, 'test.db');
        this.db = null;
    }

    async initialize() {
        return new Promise((resolve, reject) => {
            // Remove existing test database
            if (fs.existsSync(this.dbPath)) {
                fs.unlinkSync(this.dbPath);
            }

            this.db = new sqlite3.Database(this.dbPath, (err) => {
                if (err) {
                    reject(err);
                    return;
                }

                // Create test schema
                this.createSchema()
                    .then(() => this.insertTestData())
                    .then(() => resolve())
                    .catch(reject);
            });
        });
    }

    async createSchema() {
        const schema = `
            -- Users table
            CREATE TABLE IF NOT EXISTS users (
                id TEXT PRIMARY KEY,
                email TEXT UNIQUE NOT NULL,
                password TEXT NOT NULL,
                firstName TEXT NOT NULL,
                lastName TEXT NOT NULL,
                role TEXT NOT NULL DEFAULT 'farmer',
                status TEXT NOT NULL DEFAULT 'active',
                lastLoginAt DATETIME,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
            );

            -- Farms table
            CREATE TABLE IF NOT EXISTS farms (
                id TEXT PRIMARY KEY,
                name TEXT NOT NULL,
                location TEXT NOT NULL,
                size REAL NOT NULL,
                farmType TEXT NOT NULL,
                ownerId TEXT NOT NULL,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (ownerId) REFERENCES users(id)
            );

            -- Tasks table
            CREATE TABLE IF NOT EXISTS tasks (
                id TEXT PRIMARY KEY,
                title TEXT NOT NULL,
                description TEXT NOT NULL,
                farmId TEXT NOT NULL,
                assignedTo TEXT,
                priority TEXT NOT NULL DEFAULT 'MEDIUM',
                status TEXT NOT NULL DEFAULT 'PENDING',
                dueDate DATE NOT NULL,
                completedDate DATE,
                category TEXT NOT NULL,
                estimatedHours REAL,
                actualHours REAL,
                notes TEXT,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (farmId) REFERENCES farms(id),
                FOREIGN KEY (assignedTo) REFERENCES users(id)
            );

            -- Inventory table
            CREATE TABLE IF NOT EXISTS inventory (
                id TEXT PRIMARY KEY,
                name TEXT NOT NULL,
                category TEXT NOT NULL,
                quantity REAL NOT NULL,
                unit TEXT NOT NULL,
                cost REAL NOT NULL,
                supplier TEXT,
                notes TEXT,
                farmId TEXT NOT NULL,
                lowStockThreshold REAL DEFAULT 10,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (farmId) REFERENCES farms(id)
            );
        `;

        return new Promise((resolve, reject) => {
            this.db.exec(schema, (err) => {
                if (err) reject(err);
                else resolve();
            });
        });
    }

    async insertTestData() {
        const testData = [
            // Test users
            `INSERT INTO users (id, email, password, firstName, lastName, role) VALUES 
            ('test-user-1', 'test1@example.com', '$2a$10$test', 'Test', 'User1', 'farmer'),
            ('test-user-2', 'test2@example.com', '$2a$10$test', 'Test', 'User2', 'admin')`,

            // Test farms
            `INSERT INTO farms (id, name, location, size, farmType, ownerId) VALUES 
            ('test-farm-1', 'Test Farm 1', 'Test Location 1', 100.0, 'MIXED', 'test-user-1'),
            ('test-farm-2', 'Test Farm 2', 'Test Location 2', 150.0, 'LIVESTOCK', 'test-user-1')`,

            // Test tasks
            `INSERT INTO tasks (id, title, description, farmId, assignedTo, priority, status, dueDate, category) VALUES 
            ('test-task-1', 'Test Task 1', 'Test Description 1', 'test-farm-1', 'test-user-1', 'HIGH', 'PENDING', '2024-12-31', 'PLANTING'),
            ('test-task-2', 'Test Task 2', 'Test Description 2', 'test-farm-1', 'test-user-1', 'MEDIUM', 'IN_PROGRESS', '2024-12-30', 'HARVESTING')`,

            // Test inventory
            `INSERT INTO inventory (id, name, category, quantity, unit, cost, supplier, farmId) VALUES 
            ('test-inventory-1', 'Test Item 1', 'SEEDS', 50.0, 'kg', 25.0, 'Test Supplier 1', 'test-farm-1'),
            ('test-inventory-2', 'Test Item 2', 'FERTILIZER', 100.0, 'kg', 75.0, 'Test Supplier 2', 'test-farm-1')`
        ];

        for (const query of testData) {
            await new Promise((resolve, reject) => {
                this.db.run(query, (err) => {
                    if (err) reject(err);
                    else resolve();
                });
            });
        }
    }

    async close() {
        return new Promise((resolve) => {
            if (this.db) {
                this.db.close(() => {
                    // Remove test database file
                    if (fs.existsSync(this.dbPath)) {
                        fs.unlinkSync(this.dbPath);
                    }
                    resolve();
                });
            } else {
                resolve();
            }
        });
    }

    getConnection() {
        return this.db;
    }
}

module.exports = TestDatabase;
