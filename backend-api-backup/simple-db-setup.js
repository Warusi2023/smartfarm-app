const fs = require('fs');
const path = require('path');

// Create database directory if it doesn't exist
const dbDir = path.join(__dirname, 'database');
if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
}

// Create a simple JSON-based database for development
const dbPath = path.join(dbDir, 'smartfarm_dev.json');

// Initialize database with sample data
const initialData = {
    users: [
        {
            id: 1,
            username: 'admin',
            email: 'admin@smartfarm.com',
            role: 'admin',
            createdAt: new Date().toISOString()
        },
        {
            id: 2,
            username: 'farmer',
            email: 'farmer@smartfarm.com',
            role: 'farmer',
            createdAt: new Date().toISOString()
        }
    ],
    farms: [
        {
            id: 1,
            name: 'Green Valley Farm',
            location: 'California, USA',
            size: 500,
            ownerId: 1,
            createdAt: new Date().toISOString()
        }
    ],
    livestock: [
        {
            id: 1,
            name: 'Daisy',
            type: 'cow',
            breed: 'Holstein',
            farmId: 1,
            healthStatus: 'healthy',
            createdAt: new Date().toISOString()
        }
    ],
    crops: [
        {
            id: 1,
            name: 'Corn',
            field: 'Field A',
            farmId: 1,
            status: 'growing',
            plantedDate: new Date().toISOString(),
            createdAt: new Date().toISOString()
        }
    ],
    inventory: [
        {
            id: 1,
            name: 'Fertilizer',
            category: 'supplies',
            quantity: 100,
            unit: 'kg',
            farmId: 1,
            createdAt: new Date().toISOString()
        }
    ],
    financialRecords: [
        {
            id: 1,
            type: 'income',
            amount: 5000,
            description: 'Crop sale',
            farmId: 1,
            date: new Date().toISOString(),
            createdAt: new Date().toISOString()
        }
    ]
};

// Write initial data to database file
fs.writeFileSync(dbPath, JSON.stringify(initialData, null, 2));

console.log('✅ Simple database setup completed!');
console.log(`📁 Database file created at: ${dbPath}`);
console.log('📊 Sample data includes:');
console.log('   - 2 users (admin, farmer)');
console.log('   - 1 farm (Green Valley Farm)');
console.log('   - 1 livestock (Daisy the cow)');
console.log('   - 1 crop (Corn in Field A)');
console.log('   - 1 inventory item (Fertilizer)');
console.log('   - 1 financial record (Crop sale)');

// Create a simple database helper
const dbHelper = {
    read: () => {
        try {
            const data = fs.readFileSync(dbPath, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            console.error('Error reading database:', error);
            return initialData;
        }
    },
    write: (data) => {
        try {
            fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
            return true;
        } catch (error) {
            console.error('Error writing database:', error);
            return false;
        }
    },
    get: (table, id) => {
        const data = dbHelper.read();
        return data[table]?.find(item => item.id === id);
    },
    getAll: (table) => {
        const data = dbHelper.read();
        return data[table] || [];
    },
    create: (table, item) => {
        const data = dbHelper.read();
        const newId = Math.max(...data[table].map(item => item.id), 0) + 1;
        const newItem = { ...item, id: newId, createdAt: new Date().toISOString() };
        data[table].push(newItem);
        dbHelper.write(data);
        return newItem;
    },
    update: (table, id, updates) => {
        const data = dbHelper.read();
        const index = data[table].findIndex(item => item.id === id);
        if (index !== -1) {
            data[table][index] = { ...data[table][index], ...updates, updatedAt: new Date().toISOString() };
            dbHelper.write(data);
            return data[table][index];
        }
        return null;
    },
    delete: (table, id) => {
        const data = dbHelper.read();
        const index = data[table].findIndex(item => item.id === id);
        if (index !== -1) {
            const deleted = data[table].splice(index, 1)[0];
            dbHelper.write(data);
            return deleted;
        }
        return null;
    }
};

// Export the helper
module.exports = dbHelper; 