const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const db = require('../database/init');

// Helper function to check farm access
async function checkFarmAccess(farmId, userId) {
    const farm = await db.get(
        'SELECT id FROM farms WHERE id = ? AND ownerId = ?',
        [farmId, userId]
    );
    return farm !== null;
}

// Helper function to check farm exists
async function checkFarmExists(farmId) {
    const farm = await db.get('SELECT id FROM farms WHERE id = ?', [farmId]);
    return farm !== null;
}

// Helper function to check livestock exists
async function checkLivestockExists(livestockId) {
    const livestock = await db.get('SELECT id FROM livestock WHERE id = ?', [livestockId]);
    return livestock !== null;
}

// Get all livestock with filtering and pagination
router.get('/', async (req, res) => {
    try {
        const { page = 1, limit = 10, farmId, type, status, search } = req.query;
        const offset = (page - 1) * limit;
        const userId = req.user.id;

        let whereClause = 'WHERE l.farmId IN (SELECT id FROM farms WHERE ownerId = ?)';
        const params = [userId];

        if (farmId) {
            // Verify farm access
            const hasAccess = await checkFarmAccess(farmId, userId);
            if (!hasAccess) {
                return res.status(403).json({
                    success: false,
                    error: 'Access denied to this farm'
                });
            }
            whereClause += ' AND l.farmId = ?';
            params.push(farmId);
        }

        if (type) {
            whereClause += ' AND l.type = ?';
            params.push(type);
        }

        if (status) {
            whereClause += ' AND l.status = ?';
            params.push(status);
        }

        if (search) {
            whereClause += ' AND (l.name LIKE ? OR l.description LIKE ?)';
            const searchTerm = `%${search}%`;
            params.push(searchTerm, searchTerm);
        }

        // Get total count
        const countQuery = `
            SELECT COUNT(*) as total 
            FROM livestock l 
            ${whereClause}
        `;
        const countResult = await db.get(countQuery, params);
        const total = countResult ? countResult.total : 0;

        // Get livestock with pagination
        const query = `
            SELECT l.*, f.name as farmName
            FROM livestock l
            LEFT JOIN farms f ON l.farmId = f.id
            ${whereClause}
            ORDER BY l.createdAt DESC
            LIMIT ? OFFSET ?
        `;
        const queryParams = [...params, parseInt(limit), offset];
        const livestock = await db.all(query, queryParams);

        res.json({
            success: true,
            data: livestock,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total,
                totalPages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        console.error('Error fetching livestock:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
});

// Get livestock by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const query = `
            SELECT l.*, f.name as farmName
            FROM livestock l
            LEFT JOIN farms f ON l.farmId = f.id
            WHERE l.id = ?
        `;
        
        const livestock = await db.get(query, [id]);
        
        if (!livestock) {
            return res.status(404).json({
                success: false,
                error: 'Livestock not found'
            });
        }

        // Check farm access
        const hasAccess = await checkFarmAccess(livestock.farmId, userId);
        if (!hasAccess) {
            return res.status(403).json({
                success: false,
                error: 'Access denied to this livestock'
            });
        }
        
        res.json({
            success: true,
            data: livestock
        });
    } catch (error) {
        console.error('Error fetching livestock:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
});

// Create new livestock
router.post('/', async (req, res) => {
    try {
        const { name, type, farmId, breed, birthDate, weight, description } = req.body;
        const userId = req.user.id;

        // Validation
        if (!name || !type || !farmId || !breed || !birthDate) {
            return res.status(400).json({
                success: false,
                error: 'Missing required fields: name, type, farmId, breed, birthDate'
            });
        }

        // Check farm access
        const hasAccess = await checkFarmAccess(farmId, userId);
        if (!hasAccess) {
            return res.status(403).json({
                success: false,
                error: 'Access denied to this farm'
            });
        }

        // Validate dates
        const birth = new Date(birthDate);
        const now = new Date();

        if (isNaN(birth.getTime())) {
            return res.status(400).json({
                success: false,
                error: 'Invalid birth date format'
            });
        }

        if (birth > now) {
            return res.status(400).json({
                success: false,
                error: 'Birth date cannot be in the future'
            });
        }

        if (weight && weight <= 0) {
            return res.status(400).json({
                success: false,
                error: 'Weight must be positive'
            });
        }

        const id = uuidv4();
        const createdAt = new Date().toISOString();
        
        const query = `
            INSERT INTO livestock (id, name, type, farmId, breed, birthDate, weight, description, status, createdAt, updatedAt)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'HEALTHY', ?, ?)
        `;
        
        const result = await db.run(query, [
            id, name, type, farmId, breed, birthDate, weight || null, 
            description || null, createdAt, createdAt
        ]);
        
        if (result.changes === 0) {
            return res.status(500).json({
                success: false,
                error: 'Failed to create livestock'
            });
        }

        // Get the created livestock
        const newLivestock = await db.get('SELECT * FROM livestock WHERE id = ?', [id]);
        
        res.status(201).json({
            success: true,
            message: 'Livestock created successfully',
            data: newLivestock
        });
    } catch (error) {
        console.error('Error creating livestock:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
});

// Update livestock
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, type, breed, birthDate, weight, description, status } = req.body;
        const userId = req.user.id;

        // Check if livestock exists
        const livestockExists = await checkLivestockExists(id);
        if (!livestockExists) {
            return res.status(404).json({
                success: false,
                error: 'Livestock not found'
            });
        }

        // Get livestock to check farm access
        const livestock = await db.get('SELECT farmId FROM livestock WHERE id = ?', [id]);
        const hasAccess = await checkFarmAccess(livestock.farmId, userId);
        if (!hasAccess) {
            return res.status(403).json({
                success: false,
                error: 'Access denied to this livestock'
            });
        }

        // Build update query dynamically
        let updateQuery = 'UPDATE livestock SET';
        const updateParams = [];
        const updates = [];

        if (name !== undefined) {
            updates.push(' name = ?');
            updateParams.push(name);
        }
        if (type !== undefined) {
            updates.push(' type = ?');
            updateParams.push(type);
        }
        if (breed !== undefined) {
            updates.push(' breed = ?');
            updateParams.push(breed);
        }
        if (birthDate !== undefined) {
            updates.push(' birthDate = ?');
            updateParams.push(birthDate);
        }
        if (weight !== undefined) {
            if (weight <= 0) {
                return res.status(400).json({
                    success: false,
                    error: 'Weight must be positive'
                });
            }
            updates.push(' weight = ?');
            updateParams.push(weight);
        }
        if (description !== undefined) {
            updates.push(' description = ?');
            updateParams.push(description);
        }
        if (status !== undefined) {
            updates.push(' status = ?');
            updateParams.push(status);
        }

        if (updates.length === 0) {
            return res.status(400).json({
                success: false,
                error: 'No fields provided for update'
            });
        }

        updateQuery += updates.join(',') + ', updatedAt = ? WHERE id = ?';
        updateParams.push(new Date().toISOString(), id);

        const result = await db.run(updateQuery, updateParams);
        
        if (result.changes === 0) {
            return res.status(500).json({
                success: false,
                error: 'Failed to update livestock'
            });
        }
        
        res.json({
            success: true,
            message: 'Livestock updated successfully'
        });
    } catch (error) {
        console.error('Error updating livestock:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
});

// Delete livestock
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        // Check if livestock exists
        const livestockExists = await checkLivestockExists(id);
        if (!livestockExists) {
            return res.status(404).json({
                success: false,
                error: 'Livestock not found'
            });
        }

        // Get livestock to check farm access
        const livestock = await db.get('SELECT farmId FROM livestock WHERE id = ?', [id]);
        const hasAccess = await checkFarmAccess(livestock.farmId, userId);
        if (!hasAccess) {
            return res.status(403).json({
                success: false,
                error: 'Access denied to this livestock'
            });
        }

        const result = await db.run('DELETE FROM livestock WHERE id = ?', [id]);
        
        if (result.changes === 0) {
            return res.status(500).json({
                success: false,
                error: 'Failed to delete livestock'
            });
        }
        
        res.json({
            success: true,
            message: 'Livestock deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting livestock:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
});

// Update livestock status
router.patch('/:id/status', async (req, res) => {
    try {
        const { id } = req.params;
        const { status, notes } = req.body;
        const userId = req.user.id;

        // Validation
        if (!status) {
            return res.status(400).json({
                success: false,
                error: 'Status is required'
            });
        }

        const validStatuses = ['HEALTHY', 'SICK', 'INJURED', 'RECOVERING', 'QUARANTINED', 'SOLD', 'DECEASED'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                error: 'Invalid status. Must be one of: HEALTHY, SICK, INJURED, RECOVERING, QUARANTINED, SOLD, DECEASED'
            });
        }

        // Check if livestock exists
        const livestockExists = await checkLivestockExists(id);
        if (!livestockExists) {
            return res.status(404).json({
                success: false,
                error: 'Livestock not found'
            });
        }

        // Get livestock to check farm access
        const livestock = await db.get('SELECT farmId FROM livestock WHERE id = ?', [id]);
        const hasAccess = await checkFarmAccess(livestock.farmId, userId);
        if (!hasAccess) {
            return res.status(403).json({
                success: false,
                error: 'Access denied to this livestock'
            });
        }

        const updateQuery = `
            UPDATE livestock 
            SET status = ?, notes = ?, updatedAt = ? 
            WHERE id = ?
        `;
        
        const result = await db.run(updateQuery, [
            status, notes || null, new Date().toISOString(), id
        ]);
        
        if (result.changes === 0) {
            return res.status(500).json({
                success: false,
                error: 'Failed to update livestock status'
            });
        }
        
        res.json({
            success: true,
            message: 'Livestock status updated successfully'
        });
    } catch (error) {
        console.error('Error updating livestock status:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
});

// Get livestock analytics
router.get('/:id/analytics', async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        // Check if livestock exists
        const livestockExists = await checkLivestockExists(id);
        if (!livestockExists) {
            return res.status(404).json({
                success: false,
                error: 'Livestock not found'
            });
        }

        // Get livestock to check farm access
        const livestock = await db.get('SELECT farmId FROM livestock WHERE id = ?', [id]);
        const hasAccess = await checkFarmAccess(livestock.farmId, userId);
        if (!hasAccess) {
            return res.status(403).json({
                success: false,
                error: 'Access denied to this livestock'
            });
        }

        // Get livestock analytics
        const livestockData = await db.get('SELECT * FROM livestock WHERE id = ?', [id]);
        
        // Calculate age
        const birthDate = new Date(livestockData.birthDate);
        const now = new Date();
        const ageInDays = Math.floor((now - birthDate) / (1000 * 60 * 60 * 24));
        const ageInYears = ageInDays / 365.25;
        
        // Calculate weight gain if weight exists
        let weightGain = null;
        if (livestockData.weight && livestockData.initialWeight) {
            weightGain = livestockData.weight - livestockData.initialWeight;
        }

        const analytics = {
            livestockId: id,
            status: livestockData.status,
            type: livestockData.type,
            breed: livestockData.breed,
            ageInDays: Math.max(0, ageInDays),
            ageInYears: Math.round(ageInYears * 100) / 100,
            currentWeight: livestockData.weight || 0,
            weightGain: weightGain,
            birthDate: livestockData.birthDate
        };

        res.json({
            success: true,
            data: analytics
        });
    } catch (error) {
        console.error('Error fetching livestock analytics:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
});

// Get livestock statistics overview
router.get('/stats/overview', async (req, res) => {
    try {
        const userId = req.user.id;

        // Get livestock statistics
        const [totalLivestock, byType, byStatus, byBreed, totalWeight] = await Promise.all([
            db.get('SELECT COUNT(*) as count FROM livestock l JOIN farms f ON l.farmId = f.id WHERE f.ownerId = ?', [userId]),
            db.all('SELECT type, COUNT(*) as count FROM livestock l JOIN farms f ON l.farmId = f.id WHERE f.ownerId = ? GROUP BY type', [userId]),
            db.all('SELECT status, COUNT(*) as count FROM livestock l JOIN farms f ON l.farmId = f.id WHERE f.ownerId = ? GROUP BY status', [userId]),
            db.all('SELECT breed, COUNT(*) as count FROM livestock l JOIN farms f ON l.farmId = f.id WHERE f.ownerId = ? GROUP BY breed', [userId]),
            db.get('SELECT SUM(weight) as total FROM livestock l JOIN farms f ON l.farmId = f.id WHERE f.ownerId = ? AND weight IS NOT NULL', [userId])
        ]);

        const stats = {
            overview: {
                total: totalLivestock ? totalLivestock.count : 0,
                totalWeight: totalWeight ? totalWeight.total : 0,
                averageWeight: totalLivestock && totalWeight ? (totalWeight.total / totalLivestock.count) : 0
            },
            byType: byType || [],
            byStatus: byStatus || [],
            byBreed: byBreed || []
        };

        res.json({
            success: true,
            data: stats
        });
    } catch (error) {
        console.error('Error fetching livestock statistics:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
});

module.exports = router; 