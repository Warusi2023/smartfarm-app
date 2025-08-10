const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// Database connection
const dbPath = path.join(__dirname, '../database/smartfarm.db');
const db = new sqlite3.Database(dbPath);

// Get all farms
router.get('/', (req, res) => {
    const query = `
        SELECT f.*, u.firstName, u.lastName, u.email as ownerEmail
        FROM farms f
        LEFT JOIN users u ON f.ownerId = u.id
        ORDER BY f.createdAt DESC
    `;
    
    db.all(query, [], (err, rows) => {
        if (err) {
            console.error('Error fetching farms:', err);
            return res.status(500).json({ error: 'Failed to fetch farms' });
        }
        
        res.json({
            success: true,
            data: rows,
            count: rows.length
        });
    });
});

// Get farm by ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    
    const query = `
        SELECT f.*, u.firstName, u.lastName, u.email as ownerEmail
        FROM farms f
        LEFT JOIN users u ON f.ownerId = u.id
        WHERE f.id = ?
    `;
    
    db.get(query, [id], (err, row) => {
        if (err) {
            console.error('Error fetching farm:', err);
            return res.status(500).json({ error: 'Failed to fetch farm' });
        }
        
        if (!row) {
            return res.status(404).json({ error: 'Farm not found' });
        }
        
        res.json({
            success: true,
            data: row
        });
    });
});

// Create new farm
router.post('/', (req, res) => {
    const { name, location, size, ownerId } = req.body;
    
    if (!name || !location || !size || !ownerId) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    
    const id = uuidv4();
    const query = `
        INSERT INTO farms (id, name, location, size, ownerId)
        VALUES (?, ?, ?, ?, ?)
    `;
    
    db.run(query, [id, name, location, size, ownerId], function(err) {
        if (err) {
            console.error('Error creating farm:', err);
            return res.status(500).json({ error: 'Failed to create farm' });
        }
        
        res.status(201).json({
            success: true,
            message: 'Farm created successfully',
            data: { id, name, location, size, ownerId }
        });
    });
});

// Update farm
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { name, location, size, ownerId } = req.body;
    
    const query = `
        UPDATE farms 
        SET name = ?, location = ?, size = ?, ownerId = ?, updatedAt = CURRENT_TIMESTAMP
        WHERE id = ?
    `;
    
    db.run(query, [name, location, size, ownerId, id], function(err) {
        if (err) {
            console.error('Error updating farm:', err);
            return res.status(500).json({ error: 'Failed to update farm' });
        }
        
        if (this.changes === 0) {
            return res.status(404).json({ error: 'Farm not found' });
        }
        
        res.json({
            success: true,
            message: 'Farm updated successfully',
            data: { id, name, location, size, ownerId }
        });
    });
});

// Delete farm
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    
    const query = 'DELETE FROM farms WHERE id = ?';
    
    db.run(query, [id], function(err) {
        if (err) {
            console.error('Error deleting farm:', err);
            return res.status(500).json({ error: 'Failed to delete farm' });
        }
        
        if (this.changes === 0) {
            return res.status(404).json({ error: 'Farm not found' });
        }
        
        res.json({
            success: true,
            message: 'Farm deleted successfully'
        });
    });
});

// Get farm statistics
router.get('/:id/stats', (req, res) => {
    const { id } = req.params;
    
    const queries = {
        livestock: 'SELECT COUNT(*) as count FROM livestock WHERE farmId = ?',
        crops: 'SELECT COUNT(*) as count FROM crops WHERE farmId = ?',
        inventory: 'SELECT COUNT(*) as count FROM inventory WHERE farmId = ?',
        financial: 'SELECT SUM(CASE WHEN type = "income" THEN amount ELSE -amount END) as netIncome FROM financial_records WHERE farmId = ?'
    };
    
    const stats = {};
    let completedQueries = 0;
    const totalQueries = Object.keys(queries).length;
    
    Object.keys(queries).forEach(key => {
        db.get(queries[key], [id], (err, row) => {
            if (err) {
                console.error(`Error fetching ${key} stats:`, err);
            } else {
                stats[key] = row ? row.count || row.netIncome || 0 : 0;
            }
            
            completedQueries++;
            if (completedQueries === totalQueries) {
                res.json({
                    success: true,
                    data: stats
                });
            }
        });
    });
});

module.exports = router; 