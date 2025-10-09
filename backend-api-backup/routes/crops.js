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

// Helper function to check crop exists
async function checkCropExists(cropId) {
    const crop = await db.get('SELECT id FROM crops WHERE id = ?', [cropId]);
    return crop !== null;
}

// Get all crops with filtering and pagination
router.get('/', async (req, res) => {
    try {
        const { page = 1, limit = 10, farmId, type, status, search } = req.query;
        const offset = (page - 1) * limit;
        const userId = req.user.id;

        let whereClause = 'WHERE c.farmId IN (SELECT id FROM farms WHERE ownerId = ?)';
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
            whereClause += ' AND c.farmId = ?';
            params.push(farmId);
        }

        if (type) {
            whereClause += ' AND c.type = ?';
            params.push(type);
        }

        if (status) {
            whereClause += ' AND c.status = ?';
            params.push(status);
        }

        if (search) {
            whereClause += ' AND (c.name LIKE ? OR c.description LIKE ?)';
            const searchTerm = `%${search}%`;
            params.push(searchTerm, searchTerm);
        }

        // Get total count
        const countQuery = `
            SELECT COUNT(*) as total 
            FROM crops c 
            ${whereClause}
        `;
        const countResult = await db.get(countQuery, params);
        const total = countResult ? countResult.total : 0;

        // Get crops with pagination
        const query = `
            SELECT c.*, f.name as farmName
            FROM crops c
            LEFT JOIN farms f ON c.farmId = f.id
            ${whereClause}
            ORDER BY c.plantedDate DESC
            LIMIT ? OFFSET ?
        `;
        const queryParams = [...params, parseInt(limit), offset];
        const crops = await db.all(query, queryParams);

        res.json({
            success: true,
            data: crops,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total,
                totalPages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        console.error('Error fetching crops:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
});

// Get crop by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const query = `
            SELECT c.*, f.name as farmName
            FROM crops c
            LEFT JOIN farms f ON c.farmId = f.id
            WHERE c.id = ?
        `;
        
        const crop = await db.get(query, [id]);
        
        if (!crop) {
            return res.status(404).json({
                success: false,
                error: 'Crop not found'
            });
        }

        // Check farm access
        const hasAccess = await checkFarmAccess(crop.farmId, userId);
        if (!hasAccess) {
            return res.status(403).json({
                success: false,
                error: 'Access denied to this crop'
            });
        }
        
        res.json({
            success: true,
            data: crop
        });
    } catch (error) {
        console.error('Error fetching crop:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
});

// Create new crop
router.post('/', async (req, res) => {
    try {
        const { name, type, farmId, plantedDate, expectedHarvestDate, area, description } = req.body;
        const userId = req.user.id;

        // Validation
        if (!name || !type || !farmId || !plantedDate || !expectedHarvestDate) {
            return res.status(400).json({
                success: false,
                error: 'Missing required fields: name, type, farmId, plantedDate, expectedHarvestDate'
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
        const planted = new Date(plantedDate);
        const harvest = new Date(expectedHarvestDate);
        const now = new Date();

        if (planted > now) {
            return res.status(400).json({
                success: false,
                error: 'Planted date cannot be in the future'
            });
        }

        if (harvest <= planted) {
            return res.status(400).json({
                success: false,
                error: 'Expected harvest date must be after planted date'
            });
        }

        if (area && area <= 0) {
            return res.status(400).json({
                success: false,
                error: 'Area must be positive'
            });
        }

        const id = uuidv4();
        const createdAt = new Date().toISOString();
        
        const query = `
            INSERT INTO crops (id, name, type, farmId, plantedDate, expectedHarvestDate, area, description, status, createdAt, updatedAt)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'GROWING', ?, ?)
        `;
        
        const result = await db.run(query, [
            id, name, type, farmId, plantedDate, expectedHarvestDate, area || null, 
            description || null, createdAt, createdAt
        ]);
        
        if (result.changes === 0) {
            return res.status(500).json({
                success: false,
                error: 'Failed to create crop'
            });
        }

        // Get the created crop
        const newCrop = await db.get('SELECT * FROM crops WHERE id = ?', [id]);
        
        res.status(201).json({
            success: true,
            message: 'Crop created successfully',
            data: newCrop
        });
    } catch (error) {
        console.error('Error creating crop:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
});

// Update crop
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, type, plantedDate, expectedHarvestDate, area, description, status } = req.body;
        const userId = req.user.id;

        // Check if crop exists
        const cropExists = await checkCropExists(id);
        if (!cropExists) {
            return res.status(404).json({
                success: false,
                error: 'Crop not found'
            });
        }

        // Get crop to check farm access
        const crop = await db.get('SELECT farmId FROM crops WHERE id = ?', [id]);
        const hasAccess = await checkFarmAccess(crop.farmId, userId);
        if (!hasAccess) {
            return res.status(403).json({
                success: false,
                error: 'Access denied to this crop'
            });
        }

        // Build update query dynamically
        let updateQuery = 'UPDATE crops SET';
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
        if (plantedDate !== undefined) {
            updates.push(' plantedDate = ?');
            updateParams.push(plantedDate);
        }
        if (expectedHarvestDate !== undefined) {
            updates.push(' expectedHarvestDate = ?');
            updateParams.push(expectedHarvestDate);
        }
        if (area !== undefined) {
            if (area <= 0) {
                return res.status(400).json({
                    success: false,
                    error: 'Area must be positive'
                });
            }
            updates.push(' area = ?');
            updateParams.push(area);
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
                error: 'Failed to update crop'
            });
        }
        
        res.json({
            success: true,
            message: 'Crop updated successfully'
        });
    } catch (error) {
        console.error('Error updating crop:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
});

// Delete crop
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        // Check if crop exists
        const cropExists = await checkCropExists(id);
        if (!cropExists) {
            return res.status(404).json({
                success: false,
                error: 'Crop not found'
            });
        }

        // Get crop to check farm access
        const crop = await db.get('SELECT farmId FROM crops WHERE id = ?', [id]);
        const hasAccess = await checkFarmAccess(crop.farmId, userId);
        if (!hasAccess) {
            return res.status(403).json({
                success: false,
                error: 'Access denied to this crop'
            });
        }

        const result = await db.run('DELETE FROM crops WHERE id = ?', [id]);
        
        if (result.changes === 0) {
            return res.status(500).json({
                success: false,
                error: 'Failed to delete crop'
            });
        }
        
        res.json({
            success: true,
            message: 'Crop deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting crop:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
});

// Update crop status
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

        const validStatuses = ['PLANTED', 'GROWING', 'FLOWERING', 'FRUITING', 'HARVESTED', 'FAILED'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                error: 'Invalid status. Must be one of: PLANTED, GROWING, FLOWERING, FRUITING, HARVESTED, FAILED'
            });
        }

        // Check if crop exists
        const cropExists = await checkCropExists(id);
        if (!cropExists) {
            return res.status(404).json({
                success: false,
                error: 'Crop not found'
            });
        }

        // Get crop to check farm access
        const crop = await db.get('SELECT farmId FROM crops WHERE id = ?', [id]);
        const hasAccess = await checkFarmAccess(crop.farmId, userId);
        if (!hasAccess) {
            return res.status(403).json({
                success: false,
                error: 'Access denied to this crop'
            });
        }

        const updateQuery = `
            UPDATE crops 
            SET status = ?, notes = ?, updatedAt = ? 
            WHERE id = ?
        `;
        
        const result = await db.run(updateQuery, [
            status, notes || null, new Date().toISOString(), id
        ]);
        
        if (result.changes === 0) {
            return res.status(500).json({
                success: false,
                error: 'Failed to update crop status'
            });
        }
        
        res.json({
            success: true,
            message: 'Crop status updated successfully'
        });
    } catch (error) {
        console.error('Error updating crop status:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
});

// Get crop analytics
router.get('/:id/analytics', async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        // Check if crop exists
        const cropExists = await checkCropExists(id);
        if (!cropExists) {
            return res.status(404).json({
                success: false,
                error: 'Crop not found'
            });
        }

        // Get crop to check farm access
        const crop = await db.get('SELECT farmId FROM crops WHERE id = ?', [id]);
        const hasAccess = await checkFarmAccess(crop.farmId, userId);
        if (!hasAccess) {
            return res.status(403).json({
                success: false,
                error: 'Access denied to this crop'
            });
        }

        // Get crop analytics
        const cropData = await db.get('SELECT * FROM crops WHERE id = ?', [id]);
        
        // Calculate growth days
        const plantedDate = new Date(cropData.plantedDate);
        const now = new Date();
        const growthDays = Math.floor((now - plantedDate) / (1000 * 60 * 60 * 24));
        
        // Calculate progress percentage
        const totalGrowthDays = Math.floor(
            (new Date(cropData.expectedHarvestDate) - plantedDate) / (1000 * 60 * 60 * 24)
        );
        const progressPercentage = Math.min(Math.max((growthDays / totalGrowthDays) * 100, 0), 100);

        const analytics = {
            cropId: id,
            status: cropData.status,
            type: cropData.type,
            growthDays: Math.max(0, growthDays),
            progressPercentage: Math.round(progressPercentage * 100) / 100,
            plantedDate: cropData.plantedDate,
            expectedHarvestDate: cropData.expectedHarvestDate,
            area: cropData.area || 0
        };

        res.json({
            success: true,
            data: analytics
        });
    } catch (error) {
        console.error('Error fetching crop analytics:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
});

// Get crop statistics overview
router.get('/stats/overview', async (req, res) => {
    try {
        const userId = req.user.id;

        // Get crop statistics
        const [totalCrops, byType, byStatus, totalArea] = await Promise.all([
            db.get('SELECT COUNT(*) as count FROM crops c JOIN farms f ON c.farmId = f.id WHERE f.ownerId = ?', [userId]),
            db.all('SELECT type, COUNT(*) as count FROM crops c JOIN farms f ON c.farmId = f.id WHERE f.ownerId = ? GROUP BY type', [userId]),
            db.all('SELECT status, COUNT(*) as count FROM crops c JOIN farms f ON c.farmId = f.id WHERE f.ownerId = ? GROUP BY status', [userId]),
            db.get('SELECT SUM(area) as total FROM crops c JOIN farms f ON c.farmId = f.id WHERE f.ownerId = ? AND area IS NOT NULL', [userId])
        ]);

        const stats = {
            overview: {
                total: totalCrops ? totalCrops.count : 0,
                totalArea: totalArea ? totalArea.total : 0,
                averageArea: totalCrops && totalArea ? (totalArea.total / totalCrops.count) : 0
            },
            byType: byType || [],
            byStatus: byStatus || []
        };

        res.json({
            success: true,
            data: stats
        });
    } catch (error) {
        console.error('Error fetching crop statistics:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
});

module.exports = router; 