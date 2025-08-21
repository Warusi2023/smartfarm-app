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

// Get all farms with filtering and pagination
router.get('/', async (req, res) => {
    try {
        const { page = 1, limit = 10, status, minSize, maxSize, search } = req.query;
        const offset = (page - 1) * limit;
        const userId = req.user.id;

        let whereClause = 'WHERE f.ownerId = ?';
        const params = [userId];

        if (status) {
            whereClause += ' AND f.status = ?';
            params.push(status);
        }

        if (minSize) {
            whereClause += ' AND f.size >= ?';
            params.push(parseFloat(minSize));
        }

        if (maxSize) {
            whereClause += ' AND f.size <= ?';
            params.push(parseFloat(maxSize));
        }

        if (search) {
            whereClause += ' AND (f.name LIKE ? OR f.location LIKE ?)';
            const searchTerm = `%${search}%`;
            params.push(searchTerm, searchTerm);
        }

        // Get total count
        const countQuery = `
            SELECT COUNT(*) as total 
            FROM farms f 
            ${whereClause}
        `;
        const countResult = await db.get(countQuery, params);
        const total = countResult ? countResult.total : 0;

        // Get farms with pagination
        const query = `
            SELECT f.*, u.firstName, u.lastName, u.email as ownerEmail
            FROM farms f
            LEFT JOIN users u ON f.ownerId = u.id
            ${whereClause}
            ORDER BY f.createdAt DESC
            LIMIT ? OFFSET ?
        `;
        const queryParams = [...params, parseInt(limit), offset];
        const farms = await db.all(query, queryParams);

        res.json({
            success: true,
            data: farms,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total,
                totalPages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        console.error('Error fetching farms:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
});

// Get farm by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const query = `
            SELECT f.*, u.firstName, u.lastName, u.email as ownerEmail
            FROM farms f
            LEFT JOIN users u ON f.ownerId = u.id
            WHERE f.id = ?
        `;
        
        const farm = await db.get(query, [id]);
        
        if (!farm) {
            return res.status(404).json({
                success: false,
                error: 'Farm not found'
            });
        }

        // Check farm access
        const hasAccess = await checkFarmAccess(id, userId);
        if (!hasAccess) {
            return res.status(403).json({
                success: false,
                error: 'Access denied to this farm'
            });
        }
        
        res.json({
            success: true,
            data: farm
        });
    } catch (error) {
        console.error('Error fetching farm:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
});

// Create new farm
router.post('/', async (req, res) => {
    try {
        const { name, location, size, description } = req.body;
        const userId = req.user.id;

        // Validation
        if (!name || !location || !size) {
            return res.status(400).json({
                success: false,
                error: 'Missing required fields: name, location, size'
            });
        }

        if (size <= 0) {
            return res.status(400).json({
                success: false,
                error: 'Size must be positive'
            });
        }

        const id = uuidv4();
        const now = new Date().toISOString();
        
        const query = `
            INSERT INTO farms (id, name, location, size, description, ownerId, status, createdAt, updatedAt)
            VALUES (?, ?, ?, ?, ?, ?, 'active', ?, ?)
        `;
        
        const result = await db.run(query, [id, name, location, size, description || null, userId, now, now]);
        
        if (result.changes === 0) {
            return res.status(500).json({
                success: false,
                error: 'Failed to create farm'
            });
        }

        // Get the created farm
        const newFarm = await db.get('SELECT * FROM farms WHERE id = ?', [id]);
        
        res.status(201).json({
            success: true,
            message: 'Farm created successfully',
            data: newFarm
        });
    } catch (error) {
        console.error('Error creating farm:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
});

// Update farm
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, location, size, status, description } = req.body;
        const userId = req.user.id;

        // Check if farm exists first
        const farmExists = await checkFarmExists(id);
        if (!farmExists) {
            return res.status(404).json({
                success: false,
                error: 'Farm not found'
            });
        }

        // Check farm access
        const hasAccess = await checkFarmAccess(id, userId);
        if (!hasAccess) {
            return res.status(403).json({
                success: false,
                error: 'Access denied to this farm'
            });
        }

        // Build update query dynamically
        let updateQuery = 'UPDATE farms SET';
        const updateParams = [];
        const updates = [];

        if (name !== undefined) {
            updates.push(' name = ?');
            updateParams.push(name);
        }
        if (location !== undefined) {
            updates.push(' location = ?');
            updateParams.push(location);
        }
        if (size !== undefined) {
            if (size <= 0) {
                return res.status(400).json({
                    success: false,
                    error: 'Size must be positive'
                });
            }
            updates.push(' size = ?');
            updateParams.push(size);
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
                error: 'Failed to update farm'
            });
        }
        
        res.json({
            success: true,
            message: 'Farm updated successfully'
        });
    } catch (error) {
        console.error('Error updating farm:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
});

// Delete farm
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        // Check farm access
        const hasAccess = await checkFarmAccess(id, userId);
        if (!hasAccess) {
            return res.status(403).json({
                success: false,
                error: 'Access denied to this farm'
            });
        }

        // Check if farm exists
        const farmExists = await checkFarmExists(id);
        if (!farmExists) {
            return res.status(404).json({
                success: false,
                error: 'Farm not found'
            });
        }

        const result = await db.run('DELETE FROM farms WHERE id = ?', [id]);
        
        if (result.changes === 0) {
            return res.status(500).json({
                success: false,
                error: 'Failed to delete farm'
            });
        }
        
        res.json({
            success: true,
            message: 'Farm deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting farm:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
});

// Get farm analytics
router.get('/:id/analytics', async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        // Check farm access
        const hasAccess = await checkFarmAccess(id, userId);
        if (!hasAccess) {
            return res.status(403).json({
                success: false,
                error: 'Access denied to this farm'
            });
        }

        // Get farm analytics data
        const [cropCount, livestockCount, taskCount] = await Promise.all([
            db.get('SELECT COUNT(*) as count FROM crops WHERE farmId = ?', [id]),
            db.get('SELECT COUNT(*) as count FROM livestock WHERE farmId = ?', [id]),
            db.get('SELECT COUNT(*) as count FROM tasks WHERE farmId = ?', [id])
        ]);

        const analytics = {
            farmId: id,
            cropCount: cropCount ? cropCount.count : 0,
            livestockCount: livestockCount ? livestockCount.count : 0,
            taskCount: taskCount ? taskCount.count : 0,
            totalArea: 0, // This would be calculated from crops table
            utilization: 0 // This would be calculated based on area usage
        };

        res.json({
            success: true,
            data: analytics
        });
    } catch (error) {
        console.error('Error fetching farm analytics:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
});

// Get farm statistics overview
router.get('/stats/overview', async (req, res) => {
    try {
        const userId = req.user.id;

        // Get farm statistics
        const [totalFarms, activeFarms, totalSize] = await Promise.all([
            db.get('SELECT COUNT(*) as count FROM farms WHERE ownerId = ?', [userId]),
            db.get('SELECT COUNT(*) as count FROM farms WHERE ownerId = ? AND status = "active"', [userId]),
            db.get('SELECT SUM(size) as total FROM farms WHERE ownerId = ?', [userId])
        ]);

        const stats = {
            total: totalFarms ? totalFarms.count : 0,
            active: activeFarms ? activeFarms.count : 0,
            totalSize: totalSize ? totalSize.total : 0,
            averageSize: totalFarms && totalSize ? (totalSize.total / totalFarms.count) : 0
        };

        res.json({
            success: true,
            data: stats
        });
    } catch (error) {
        console.error('Error fetching farm statistics:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
});

module.exports = router; 