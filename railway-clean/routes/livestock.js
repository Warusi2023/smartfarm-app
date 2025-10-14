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

// Helper function to check livestock exists
async function checkLivestockExists(livestockId) {
    const result = await client.query('SELECT id FROM livestock WHERE id = $1', [livestockId]);
    return result.rows.length > 0;
}

// Apply authentication middleware to all routes
router.use(authenticate);

// Get all livestock with filtering and pagination
router.get('/', async (req, res) => {
    try {
        const { page = 1, limit = 10, farm_id, category, health_status, search } = req.query;
        const offset = (page - 1) * limit;
        const userId = req.user?.id || 1; // Default user for demo

        let whereClause = 'WHERE l.farm_id IN (SELECT id FROM farms WHERE user_id = $1)';
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
            whereClause += ` AND l.farm_id = $${paramCount}`;
            params.push(farm_id);
        }

        if (category) {
            paramCount++;
            whereClause += ` AND l.category = $${paramCount}`;
            params.push(category);
        }

        if (health_status) {
            paramCount++;
            whereClause += ` AND l.health_status = $${paramCount}`;
            params.push(health_status);
        }

        if (search) {
            paramCount++;
            whereClause += ` AND (l.name ILIKE $${paramCount} OR l.notes ILIKE $${paramCount})`;
            const searchTerm = `%${search}%`;
            params.push(searchTerm, searchTerm);
        }

        // Get total count
        const countQuery = `
            SELECT COUNT(*) as total 
            FROM livestock l 
            ${whereClause}
        `;
        const countResult = await client.query(countQuery, params);
        const total = countResult.rows[0]?.total || 0;

        // Get livestock with pagination
        const query = `
            SELECT l.*, f.name as farm_name
            FROM livestock l
            LEFT JOIN farms f ON l.farm_id = f.id
            ${whereClause}
            ORDER BY l.created_at DESC
            LIMIT $${paramCount + 1} OFFSET $${paramCount + 2}
        `;
        const queryParams = [...params, parseInt(limit), offset];
        const livestockResult = await client.query(query, queryParams);

        res.json({
            success: true,
            data: livestockResult.rows,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total: parseInt(total),
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
        const userId = req.user?.id || 1;

        const query = `
            SELECT l.*, f.name as farm_name
            FROM livestock l
            LEFT JOIN farms f ON l.farm_id = f.id
            WHERE l.id = $1
        `;
        
        const result = await client.query(query, [id]);
        const livestock = result.rows[0];
        
        if (!livestock) {
            return res.status(404).json({
                success: false,
                error: 'Livestock not found'
            });
        }

        // Check farm access
        const hasAccess = await checkFarmAccess(livestock.farm_id, userId);
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
        const { name, category, farm_id, breed, birth_date, weight, gender, identification_tag, notes } = req.body;
        const userId = req.user?.id || 1;

        // Validation
        if (!name || !category || !farm_id || !breed || !birth_date) {
            return res.status(400).json({
                success: false,
                error: 'Missing required fields: name, category, farm_id, breed, birth_date'
            });
        }

        // Check farm access
        const hasAccess = await checkFarmAccess(farm_id, userId);
        if (!hasAccess) {
            return res.status(403).json({
                success: false,
                error: 'Access denied to this farm'
            });
        }

        // Validate dates
        const birth = new Date(birth_date);
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

        const query = `
            INSERT INTO livestock (name, category, farm_id, breed, birth_date, weight, health_status, gender, identification_tag, notes, is_active, created_at, updated_at)
            VALUES ($1, $2, $3, $4, $5, $6, 'healthy', $7, $8, $9, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
            RETURNING *
        `;
        
        const result = await client.query(query, [
            name, category, farm_id, breed, birth_date, weight || null, 
            gender || null, identification_tag || null, notes || null
        ]);
        
        if (result.rows.length === 0) {
            return res.status(500).json({
                success: false,
                error: 'Failed to create livestock'
            });
        }

        res.status(201).json({
            success: true,
            message: 'Livestock created successfully',
            data: result.rows[0]
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
        const { name, category, breed, birth_date, weight, health_status, gender, identification_tag, notes } = req.body;
        const userId = req.user?.id || 1;

        // Check if livestock exists
        const livestockExists = await checkLivestockExists(id);
        if (!livestockExists) {
            return res.status(404).json({
                success: false,
                error: 'Livestock not found'
            });
        }

        // Get livestock to check farm access
        const livestockResult = await client.query('SELECT farm_id FROM livestock WHERE id = $1', [id]);
        const livestock = livestockResult.rows[0];
        const hasAccess = await checkFarmAccess(livestock.farm_id, userId);
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
        let paramCount = 0;

        if (name !== undefined) {
            paramCount++;
            updates.push(` name = $${paramCount}`);
            updateParams.push(name);
        }
        if (category !== undefined) {
            paramCount++;
            updates.push(` category = $${paramCount}`);
            updateParams.push(category);
        }
        if (breed !== undefined) {
            paramCount++;
            updates.push(` breed = $${paramCount}`);
            updateParams.push(breed);
        }
        if (birth_date !== undefined) {
            paramCount++;
            updates.push(` birth_date = $${paramCount}`);
            updateParams.push(birth_date);
        }
        if (weight !== undefined) {
            if (weight <= 0) {
                return res.status(400).json({
                    success: false,
                    error: 'Weight must be positive'
                });
            }
            paramCount++;
            updates.push(` weight = $${paramCount}`);
            updateParams.push(weight);
        }
        if (health_status !== undefined) {
            paramCount++;
            updates.push(` health_status = $${paramCount}`);
            updateParams.push(health_status);
        }
        if (gender !== undefined) {
            paramCount++;
            updates.push(` gender = $${paramCount}`);
            updateParams.push(gender);
        }
        if (identification_tag !== undefined) {
            paramCount++;
            updates.push(` identification_tag = $${paramCount}`);
            updateParams.push(identification_tag);
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
        const userId = req.user?.id || 1;

        // Check if livestock exists
        const livestockExists = await checkLivestockExists(id);
        if (!livestockExists) {
            return res.status(404).json({
                success: false,
                error: 'Livestock not found'
            });
        }

        // Get livestock to check farm access
        const livestockResult = await client.query('SELECT farm_id FROM livestock WHERE id = $1', [id]);
        const livestock = livestockResult.rows[0];
        const hasAccess = await checkFarmAccess(livestock.farm_id, userId);
        if (!hasAccess) {
            return res.status(403).json({
                success: false,
                error: 'Access denied to this livestock'
            });
        }

        const result = await client.query('DELETE FROM livestock WHERE id = $1', [id]);
        
        if (result.rowCount === 0) {
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
        const userId = req.user?.id || 1;

        // Validation
        if (!status) {
            return res.status(400).json({
                success: false,
                error: 'Status is required'
            });
        }

        const validStatuses = ['healthy', 'sick', 'injured', 'recovering', 'quarantined', 'sold', 'deceased'];
        if (!validStatuses.includes(status.toLowerCase())) {
            return res.status(400).json({
                success: false,
                error: 'Invalid status. Must be one of: healthy, sick, injured, recovering, quarantined, sold, deceased'
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
        const livestockResult = await client.query('SELECT farm_id FROM livestock WHERE id = $1', [id]);
        const livestock = livestockResult.rows[0];
        const hasAccess = await checkFarmAccess(livestock.farm_id, userId);
        if (!hasAccess) {
            return res.status(403).json({
                success: false,
                error: 'Access denied to this livestock'
            });
        }

        const updateQuery = `
            UPDATE livestock 
            SET health_status = $1, notes = $2, updated_at = CURRENT_TIMESTAMP 
            WHERE id = $3
        `;
        
        const result = await client.query(updateQuery, [
            status.toLowerCase(), notes || null, id
        ]);
        
        if (result.rowCount === 0) {
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
        const userId = req.user?.id || 1;

        // Check if livestock exists
        const livestockExists = await checkLivestockExists(id);
        if (!livestockExists) {
            return res.status(404).json({
                success: false,
                error: 'Livestock not found'
            });
        }

        // Get livestock to check farm access
        const livestockResult = await client.query('SELECT farm_id FROM livestock WHERE id = $1', [id]);
        const livestock = livestockResult.rows[0];
        const hasAccess = await checkFarmAccess(livestock.farm_id, userId);
        if (!hasAccess) {
            return res.status(403).json({
                success: false,
                error: 'Access denied to this livestock'
            });
        }

        // Get livestock analytics
        const livestockDataResult = await client.query('SELECT * FROM livestock WHERE id = $1', [id]);
        const livestockData = livestockDataResult.rows[0];
        
        // Calculate age
        const birthDate = new Date(livestockData.birth_date);
        const now = new Date();
        const ageInDays = Math.floor((now - birthDate) / (1000 * 60 * 60 * 24));
        const ageInYears = ageInDays / 365.25;

        const analytics = {
            livestockId: id,
            status: livestockData.health_status,
            category: livestockData.category,
            breed: livestockData.breed,
            ageInDays: Math.max(0, ageInDays),
            ageInYears: Math.round(ageInYears * 100) / 100,
            currentWeight: livestockData.weight || 0,
            birthDate: livestockData.birth_date
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
        const userId = req.user?.id || 1;

        // Get livestock statistics
        const [totalResult, byTypeResult, byStatusResult, byBreedResult, totalWeightResult] = await Promise.all([
            client.query('SELECT COUNT(*) as count FROM livestock l JOIN farms f ON l.farm_id = f.id WHERE f.user_id = $1', [userId]),
            client.query('SELECT category as type, COUNT(*) as count FROM livestock l JOIN farms f ON l.farm_id = f.id WHERE f.user_id = $1 GROUP BY category', [userId]),
            client.query('SELECT health_status as status, COUNT(*) as count FROM livestock l JOIN farms f ON l.farm_id = f.id WHERE f.user_id = $1 GROUP BY health_status', [userId]),
            client.query('SELECT breed, COUNT(*) as count FROM livestock l JOIN farms f ON l.farm_id = f.id WHERE f.user_id = $1 GROUP BY breed', [userId]),
            client.query('SELECT SUM(weight) as total FROM livestock l JOIN farms f ON l.farm_id = f.id WHERE f.user_id = $1 AND weight IS NOT NULL', [userId])
        ]);

        const stats = {
            overview: {
                total: parseInt(totalResult.rows[0]?.count || 0),
                totalWeight: parseFloat(totalWeightResult.rows[0]?.total || 0),
                averageWeight: totalResult.rows[0]?.count > 0 && totalWeightResult.rows[0]?.total ? 
                    (parseFloat(totalWeightResult.rows[0].total) / parseInt(totalResult.rows[0].count)) : 0
            },
            byType: byTypeResult.rows || [],
            byStatus: byStatusResult.rows || [],
            byBreed: byBreedResult.rows || []
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
