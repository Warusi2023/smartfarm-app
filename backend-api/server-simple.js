const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const sqlite3 = require('sqlite3').verbose();
const dbPath = path.join(__dirname, 'database', 'smartfarm.db');
const db = new sqlite3.Database(dbPath);

// Simple livestock routes
app.get('/api/livestock', (req, res) => {
    const query = `
        SELECT l.*, f.name as farmName
        FROM livestock l
        LEFT JOIN farms f ON l.farmId = f.id
        ORDER BY l.createdAt DESC
    `;
    
    db.all(query, (err, rows) => {
        if (err) {
            console.error('Error fetching livestock:', err);
            return res.status(500).json({
                success: false,
                error: 'Internal server error'
            });
        }
        
        res.json({
            success: true,
            data: rows,
            pagination: {
                page: 1,
                limit: 10,
                total: rows.length,
                totalPages: 1
            }
        });
    });
});

app.post('/api/livestock', (req, res) => {
    const { name, type, farmId, breed, birthDate, weight, description } = req.body;
    
    // Validation
    if (!name || !type || !farmId || !breed || !birthDate) {
        return res.status(400).json({
            success: false,
            error: 'Missing required fields: name, type, farmId, breed, birthDate'
        });
    }
    
    const id = 'livestock-' + Date.now();
    const createdAt = new Date().toISOString();
    
    const query = `
        INSERT INTO livestock (id, name, type, farmId, breed, birthDate, weight, description, status, createdAt, updatedAt)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'HEALTHY', ?, ?)
    `;
    
    db.run(query, [
        id, name, type, farmId, breed, birthDate, weight || null, 
        description || null, createdAt, createdAt
    ], function(err) {
        if (err) {
            console.error('Error creating livestock:', err);
            return res.status(500).json({
                success: false,
                error: 'Internal server error'
            });
        }
        
        // Get the created livestock
        db.get('SELECT * FROM livestock WHERE id = ?', [id], (err, row) => {
            if (err) {
                console.error('Error fetching created livestock:', err);
                return res.status(500).json({
                    success: false,
                    error: 'Internal server error'
                });
            }
            
            res.status(201).json({
                success: true,
                message: 'Livestock created successfully',
                data: row
            });
        });
    });
});

// Health check
app.get('/api/health', (req, res) => {
    res.json({
        success: true,
        message: 'Server is running',
        timestamp: new Date().toISOString()
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Simple SmartFarm Backend API running on port ${PORT}`);
    console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
    console.log(`🐄 Livestock API: http://localhost:${PORT}/api/livestock`);
});
