const express = require('express');
const router = express.Router();
const { Client } = require('pg');
const { authenticate } = require('../middleware/auth');

// Database connection
const client = new Client({
  connectionString: process.env.DATABASE_URL
});

// Initialize database connection
client.connect().catch(console.error);

// Helper function to check farm access
async function checkFarmAccess(farmId, userId) {
    const result = await client.query(
        'SELECT id FROM farms WHERE id = $1 AND user_id = $2',
        [farmId, userId]
    );
    return result.rows.length > 0;
}

// Helper function to check farm exists
async function checkFarmExists(farmId) {
    const result = await client.query('SELECT id FROM farms WHERE id = $1', [farmId]);
    return result.rows.length > 0;
}

// Helper function to check crop exists
async function checkCropExists(cropId) {
    const result = await client.query('SELECT id FROM crops WHERE id = $1', [cropId]);
    return result.rows.length > 0;
}

// Apply authentication middleware to all routes
router.use(authenticate);

// Get all crops with filtering and pagination
router.get('/', async (req, res) => {
    try {
        const { page = 1, limit = 10, farm_id, crop_type, status, search } = req.query;
        const offset = (page - 1) * limit;
        const userId = req.user?.id || 1; // Default user for demo

        let whereClause = 'WHERE c.field_id IN (SELECT id FROM fields WHERE farm_id IN (SELECT id FROM farms WHERE user_id = $1))';
        const params = [userId];
        let paramCount = 1;

        if (farm_id) {
            // Verify farm access
            const hasAccess = await checkFarmAccess(farm_id, userId);
            if (!hasAccess) {
                return res.status(403).json({
                    success: false,
                    error: 'Access denied to this farm'
                });
            }
            paramCount++;
            whereClause += ` AND f.farm_id = $${paramCount}`;
            params.push(farm_id);
        }

        if (crop_type) {
            paramCount++;
            whereClause += ` AND c.crop_type = $${paramCount}`;
            params.push(crop_type);
        }

        if (status) {
            paramCount++;
            whereClause += ` AND c.status = $${paramCount}`;
            params.push(status);
        }

        if (search) {
            paramCount++;
            whereClause += ` AND (c.crop_type ILIKE $${paramCount} OR c.variety ILIKE $${paramCount} OR c.notes ILIKE $${paramCount})`;
            const searchTerm = `%${search}%`;
            params.push(searchTerm, searchTerm, searchTerm);
        }

        // Get total count
        const countQuery = `
            SELECT COUNT(*) as total 
            FROM crops c
            LEFT JOIN fields f ON c.field_id = f.id
            ${whereClause}
        `;
        const countResult = await client.query(countQuery, params);
        const total = countResult.rows[0]?.total || 0;

        // Get crops with pagination
        const query = `
            SELECT c.*, f.name as field_name, f.farm_id, farm.name as farm_name
            FROM crops c
            LEFT JOIN fields f ON c.field_id = f.id
            LEFT JOIN farms farm ON f.farm_id = farm.id
            ${whereClause}
            ORDER BY c.created_at DESC
            LIMIT $${paramCount + 1} OFFSET $${paramCount + 2}
        `;
        const queryParams = [...params, parseInt(limit), offset];
        const cropsResult = await client.query(query, queryParams);

        res.json({
            success: true,
            data: cropsResult.rows,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total: parseInt(total),
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
        const userId = req.user?.id || 1;

        const query = `
            SELECT c.*, f.name as field_name, f.farm_id, farm.name as farm_name
            FROM crops c
            LEFT JOIN fields f ON c.field_id = f.id
            LEFT JOIN farms farm ON f.farm_id = farm.id
            WHERE c.id = $1
        `;
        
        const result = await client.query(query, [id]);
        const crop = result.rows[0];
        
        if (!crop) {
            return res.status(404).json({
                success: false,
                error: 'Crop not found'
            });
        }

        // Check farm access
        const hasAccess = await checkFarmAccess(crop.farm_id, userId);
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
        const { 
            crop_type, 
            field_id, 
            variety, 
            planting_date, 
            expected_harvest_date, 
            planting_density, 
            seed_quantity, 
            expected_yield, 
            notes 
        } = req.body;
        const userId = req.user?.id || 1;

        // Validation
        if (!crop_type || !field_id || !planting_date) {
            return res.status(400).json({
                success: false,
                error: 'Missing required fields: crop_type, field_id, planting_date'
            });
        }

        // Check if field exists and user has access to the farm
        const fieldResult = await client.query(
            'SELECT farm_id FROM fields WHERE id = $1',
            [field_id]
        );
        
        if (fieldResult.rows.length === 0) {
            return res.status(404).json({
                success: false,
                error: 'Field not found'
            });
        }

        const farmId = fieldResult.rows[0].farm_id;
        const hasAccess = await checkFarmAccess(farmId, userId);
        if (!hasAccess) {
            return res.status(403).json({
                success: false,
                error: 'Access denied to this farm'
            });
        }

        // Validate dates
        const planting = new Date(planting_date);
        const now = new Date();

        if (isNaN(planting.getTime())) {
            return res.status(400).json({
                success: false,
                error: 'Invalid planting date format'
            });
        }

        if (expected_harvest_date) {
            const harvest = new Date(expected_harvest_date);
            if (isNaN(harvest.getTime())) {
                return res.status(400).json({
                    success: false,
                    error: 'Invalid expected harvest date format'
                });
            }
            if (harvest <= planting) {
                return res.status(400).json({
                    success: false,
                    error: 'Expected harvest date must be after planting date'
                });
            }
        }

        // Validate numeric fields
        if (planting_density && planting_density <= 0) {
            return res.status(400).json({
                success: false,
                error: 'Planting density must be positive'
            });
        }

        if (seed_quantity && seed_quantity <= 0) {
            return res.status(400).json({
                success: false,
                error: 'Seed quantity must be positive'
            });
        }

        if (expected_yield && expected_yield <= 0) {
            return res.status(400).json({
                success: false,
                error: 'Expected yield must be positive'
            });
        }

        const query = `
            INSERT INTO crops (crop_type, field_id, variety, planting_date, expected_harvest_date, 
                             planting_density, seed_quantity, expected_yield, actual_yield, 
                             quality_score, status, notes, is_active, created_at, updated_at)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, 'planted', $11, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
            RETURNING *
        `;
        
        const result = await client.query(query, [
            crop_type, field_id, variety || null, planting_date, expected_harvest_date || null,
            planting_density || null, seed_quantity || null, expected_yield || null, null,
            null, notes || null
        ]);
        
        if (result.rows.length === 0) {
            return res.status(500).json({
                success: false,
                error: 'Failed to create crop'
            });
        }

        res.status(201).json({
            success: true,
            message: 'Crop created successfully',
            data: result.rows[0]
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
        const { 
            crop_type, 
            variety, 
            planting_date, 
            expected_harvest_date, 
            actual_harvest_date,
            planting_density, 
            seed_quantity, 
            expected_yield, 
            actual_yield,
            quality_score,
            status,
            notes 
        } = req.body;
        const userId = req.user?.id || 1;

        // Check if crop exists
        const cropExists = await checkCropExists(id);
        if (!cropExists) {
            return res.status(404).json({
                success: false,
                error: 'Crop not found'
            });
        }

        // Get crop to check farm access
        const cropResult = await client.query(
            'SELECT c.*, f.farm_id FROM crops c LEFT JOIN fields f ON c.field_id = f.id WHERE c.id = $1',
            [id]
        );
        const crop = cropResult.rows[0];
        const hasAccess = await checkFarmAccess(crop.farm_id, userId);
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
        let paramCount = 0;

        if (crop_type !== undefined) {
            paramCount++;
            updates.push(` crop_type = $${paramCount}`);
            updateParams.push(crop_type);
        }
        if (variety !== undefined) {
            paramCount++;
            updates.push(` variety = $${paramCount}`);
            updateParams.push(variety);
        }
        if (planting_date !== undefined) {
            paramCount++;
            updates.push(` planting_date = $${paramCount}`);
            updateParams.push(planting_date);
        }
        if (expected_harvest_date !== undefined) {
            paramCount++;
            updates.push(` expected_harvest_date = $${paramCount}`);
            updateParams.push(expected_harvest_date);
        }
        if (actual_harvest_date !== undefined) {
            paramCount++;
            updates.push(` actual_harvest_date = $${paramCount}`);
            updateParams.push(actual_harvest_date);
        }
        if (planting_density !== undefined) {
            if (planting_density <= 0) {
                return res.status(400).json({
                    success: false,
                    error: 'Planting density must be positive'
                });
            }
            paramCount++;
            updates.push(` planting_density = $${paramCount}`);
            updateParams.push(planting_density);
        }
        if (seed_quantity !== undefined) {
            if (seed_quantity <= 0) {
                return res.status(400).json({
                    success: false,
                    error: 'Seed quantity must be positive'
                });
            }
            paramCount++;
            updates.push(` seed_quantity = $${paramCount}`);
            updateParams.push(seed_quantity);
        }
        if (expected_yield !== undefined) {
            if (expected_yield <= 0) {
                return res.status(400).json({
                    success: false,
                    error: 'Expected yield must be positive'
                });
            }
            paramCount++;
            updates.push(` expected_yield = $${paramCount}`);
            updateParams.push(expected_yield);
        }
        if (actual_yield !== undefined) {
            if (actual_yield < 0) {
                return res.status(400).json({
                    success: false,
                    error: 'Actual yield cannot be negative'
                });
            }
            paramCount++;
            updates.push(` actual_yield = $${paramCount}`);
            updateParams.push(actual_yield);
        }
        if (quality_score !== undefined) {
            if (quality_score < 0 || quality_score > 1) {
                return res.status(400).json({
                    success: false,
                    error: 'Quality score must be between 0 and 1'
                });
            }
            paramCount++;
            updates.push(` quality_score = $${paramCount}`);
            updateParams.push(quality_score);
        }
        if (status !== undefined) {
            paramCount++;
            updates.push(` status = $${paramCount}`);
            updateParams.push(status);
        }
        if (notes !== undefined) {
            paramCount++;
            updates.push(` notes = $${paramCount}`);
            updateParams.push(notes);
        }

        if (updates.length === 0) {
            return res.status(400).json({
                success: false,
                error: 'No fields provided for update'
            });
        }

        paramCount++;
        updateQuery += updates.join(',') + `, updated_at = CURRENT_TIMESTAMP WHERE id = $${paramCount}`;
        updateParams.push(id);

        const result = await client.query(updateQuery, updateParams);
        
        if (result.rowCount === 0) {
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
        const userId = req.user?.id || 1;

        // Check if crop exists
        const cropExists = await checkCropExists(id);
        if (!cropExists) {
            return res.status(404).json({
                success: false,
                error: 'Crop not found'
            });
        }

        // Get crop to check farm access
        const cropResult = await client.query(
            'SELECT c.*, f.farm_id FROM crops c LEFT JOIN fields f ON c.field_id = f.id WHERE c.id = $1',
            [id]
        );
        const crop = cropResult.rows[0];
        const hasAccess = await checkFarmAccess(crop.farm_id, userId);
        if (!hasAccess) {
            return res.status(403).json({
                success: false,
                error: 'Access denied to this crop'
            });
        }

        const result = await client.query('DELETE FROM crops WHERE id = $1', [id]);
        
        if (result.rowCount === 0) {
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
        const userId = req.user?.id || 1;

        // Validation
        if (!status) {
            return res.status(400).json({
                success: false,
                error: 'Status is required'
            });
        }

        const validStatuses = ['planted', 'germinated', 'growing', 'flowering', 'fruiting', 'harvesting', 'harvested', 'failed'];
        if (!validStatuses.includes(status.toLowerCase())) {
            return res.status(400).json({
                success: false,
                error: 'Invalid status. Must be one of: planted, germinated, growing, flowering, fruiting, harvesting, harvested, failed'
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
        const cropResult = await client.query(
            'SELECT c.*, f.farm_id FROM crops c LEFT JOIN fields f ON c.field_id = f.id WHERE c.id = $1',
            [id]
        );
        const crop = cropResult.rows[0];
        const hasAccess = await checkFarmAccess(crop.farm_id, userId);
        if (!hasAccess) {
            return res.status(403).json({
                success: false,
                error: 'Access denied to this crop'
            });
        }

        const updateQuery = `
            UPDATE crops 
            SET status = $1, notes = $2, updated_at = CURRENT_TIMESTAMP 
            WHERE id = $3
        `;
        
        const result = await client.query(updateQuery, [
            status.toLowerCase(), notes || null, id
        ]);
        
        if (result.rowCount === 0) {
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
        const userId = req.user?.id || 1;

        // Check if crop exists
        const cropExists = await checkCropExists(id);
        if (!cropExists) {
            return res.status(404).json({
                success: false,
                error: 'Crop not found'
            });
        }

        // Get crop to check farm access
        const cropResult = await client.query(
            'SELECT c.*, f.farm_id FROM crops c LEFT JOIN fields f ON c.field_id = f.id WHERE c.id = $1',
            [id]
        );
        const crop = cropResult.rows[0];
        const hasAccess = await checkFarmAccess(crop.farm_id, userId);
        if (!hasAccess) {
            return res.status(403).json({
                success: false,
                error: 'Access denied to this crop'
            });
        }

        // Get crop analytics
        const cropData = crop;
        
        // Calculate growth period
        const plantingDate = new Date(cropData.planting_date);
        const now = new Date();
        const growthDays = Math.floor((now - plantingDate) / (1000 * 60 * 60 * 24));
        
        // Calculate expected days to harvest
        let expectedDaysToHarvest = null;
        if (cropData.expected_harvest_date) {
            const harvestDate = new Date(cropData.expected_harvest_date);
            expectedDaysToHarvest = Math.floor((harvestDate - now) / (1000 * 60 * 60 * 24));
        }

        // Calculate yield efficiency if actual yield exists
        let yieldEfficiency = null;
        if (cropData.actual_yield && cropData.expected_yield) {
            yieldEfficiency = (cropData.actual_yield / cropData.expected_yield) * 100;
        }

        const analytics = {
            cropId: id,
            status: cropData.status,
            cropType: cropData.crop_type,
            variety: cropData.variety,
            growthDays: Math.max(0, growthDays),
            expectedDaysToHarvest: expectedDaysToHarvest,
            plantingDate: cropData.planting_date,
            expectedHarvestDate: cropData.expected_harvest_date,
            actualHarvestDate: cropData.actual_harvest_date,
            expectedYield: cropData.expected_yield,
            actualYield: cropData.actual_yield,
            yieldEfficiency: yieldEfficiency,
            qualityScore: cropData.quality_score,
            plantingDensity: cropData.planting_density
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
        const userId = req.user?.id || 1;

        // Get crop statistics
        const [totalResult, byTypeResult, byStatusResult, byVarietyResult, totalYieldResult] = await Promise.all([
            client.query('SELECT COUNT(*) as count FROM crops c JOIN fields f ON c.field_id = f.id JOIN farms farm ON f.farm_id = farm.id WHERE farm.user_id = $1', [userId]),
            client.query('SELECT crop_type as type, COUNT(*) as count FROM crops c JOIN fields f ON c.field_id = f.id JOIN farms farm ON f.farm_id = farm.id WHERE farm.user_id = $1 GROUP BY crop_type', [userId]),
            client.query('SELECT status, COUNT(*) as count FROM crops c JOIN fields f ON c.field_id = f.id JOIN farms farm ON f.farm_id = farm.id WHERE farm.user_id = $1 GROUP BY status', [userId]),
            client.query('SELECT variety, COUNT(*) as count FROM crops c JOIN fields f ON c.field_id = f.id JOIN farms farm ON f.farm_id = farm.id WHERE farm.user_id = $1 AND variety IS NOT NULL GROUP BY variety', [userId]),
            client.query('SELECT SUM(actual_yield) as total, SUM(expected_yield) as expected FROM crops c JOIN fields f ON c.field_id = f.id JOIN farms farm ON f.farm_id = farm.id WHERE farm.user_id = $1 AND actual_yield IS NOT NULL', [userId])
        ]);

        const stats = {
            overview: {
                total: parseInt(totalResult.rows[0]?.count || 0),
                totalActualYield: parseFloat(totalYieldResult.rows[0]?.total || 0),
                totalExpectedYield: parseFloat(totalYieldResult.rows[0]?.expected || 0),
                averageYieldEfficiency: totalYieldResult.rows[0]?.expected > 0 && totalYieldResult.rows[0]?.total > 0 ? 
                    ((parseFloat(totalYieldResult.rows[0].total) / parseFloat(totalYieldResult.rows[0].expected)) * 100) : 0
            },
            byType: byTypeResult.rows || [],
            byStatus: byStatusResult.rows || [],
            byVariety: byVarietyResult.rows || []
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
