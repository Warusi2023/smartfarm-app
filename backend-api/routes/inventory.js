const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const { authenticateToken, authorizeRole } = require('./auth');
const db = require('../database/init');

// Apply authentication middleware to all routes
router.use(authenticateToken);

/**
 * @route   GET /api/inventory
 * @desc    Get all inventory items for a farm or all inventory for user
 * @access  Private
 */
router.get('/', async (req, res) => {
    try {
        const { farmId, category, supplier, lowStock, page = 1, limit = 20 } = req.query;
        const userId = req.user.id;
        const userRole = req.user.role;

        let query = `
            SELECT 
                i.*,
                f.name as farmName
            FROM inventory i
            LEFT JOIN farms f ON i.farmId = f.id
            WHERE 1=1
        `;
        const params = [];

        // Filter by farm if specified
        if (farmId) {
            query += ` AND i.farmId = ?`;
            params.push(farmId);
        } else if (userRole !== 'admin') {
            // Non-admin users can only see inventory from their farms
            query += ` AND i.farmId IN (SELECT id FROM farms WHERE ownerId = ?)`;
            params.push(userId);
        }

        // Apply additional filters
        if (category) {
            query += ` AND i.category = ?`;
            params.push(category);
        }
        if (supplier) {
            query += ` AND i.supplier LIKE ?`;
            params.push(`%${supplier}%`);
        }
        if (lowStock === 'true') {
            query += ` AND i.quantity <= i.lowStockThreshold`;
        }

        // Add ordering
        query += ` ORDER BY i.quantity ASC, i.name ASC`;

        // Get total count for pagination
        const countQuery = query.replace(/SELECT.*FROM/, 'SELECT COUNT(*) as total FROM');
        const countResult = await db.get(countQuery, params);
        const total = countResult.total;

        // Add pagination
        const offset = (page - 1) * limit;
        query += ` LIMIT ? OFFSET ?`;
        params.push(parseInt(limit), offset);

        const inventory = await db.all(query, params);

        res.json({
            success: true,
            data: inventory,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total,
                pages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        console.error('Error fetching inventory:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch inventory',
            message: error.message
        });
    }
});

/**
 * @route   GET /api/inventory/:id
 * @desc    Get inventory item by ID
 * @access  Private
 */
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;
        const userRole = req.user.role;

        const query = `
            SELECT 
                i.*,
                f.name as farmName
            FROM inventory i
            LEFT JOIN farms f ON i.farmId = f.id
            WHERE i.id = ?
        `;

        const item = await db.get(query, [id]);

        if (!item) {
            return res.status(404).json({
                success: false,
                error: 'Inventory item not found'
            });
        }

        // Check if user has access to this inventory item
        if (userRole !== 'admin') {
            const farmAccess = await db.get(
                'SELECT id FROM farms WHERE id = ? AND ownerId = ?',
                [item.farmId, userId]
            );
            if (!farmAccess) {
                return res.status(403).json({
                    success: false,
                    error: 'Access denied to this inventory item'
                });
            }
        }

        res.json({
            success: true,
            data: item
        });
    } catch (error) {
        console.error('Error fetching inventory item:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch inventory item',
            message: error.message
        });
    }
});

/**
 * @route   POST /api/inventory
 * @desc    Create a new inventory item
 * @access  Private
 */
router.post('/', async (req, res) => {
    try {
        const {
            name,
            category,
            quantity,
            unit,
            cost,
            supplier,
            notes,
            farmId,
            lowStockThreshold = 10
        } = req.body;

        const userId = req.user.id;
        const userRole = req.user.role;

        // Validation
        if (!name || !category || !quantity || !unit || !cost || !farmId) {
            return res.status(400).json({
                success: false,
                error: 'Missing required fields: name, category, quantity, unit, cost, farmId'
            });
        }

        // Validate farm access
        if (userRole !== 'admin') {
            const farmAccess = await db.get(
                'SELECT id FROM farms WHERE id = ? AND ownerId = ?',
                [farmId, userId]
            );
            if (!farmAccess) {
                return res.status(403).json({
                    success: false,
                    error: 'Access denied to this farm'
                });
            }
        }

        // Validate farm exists
        const farmExists = await db.get('SELECT id FROM farms WHERE id = ?', [farmId]);
        if (!farmExists) {
            return res.status(400).json({
                success: false,
                error: 'Farm not found'
            });
        }

        // Validate quantity and cost
        if (quantity < 0) {
            return res.status(400).json({
                success: false,
                error: 'Quantity cannot be negative'
            });
        }

        if (cost < 0) {
            return res.status(400).json({
                success: false,
                error: 'Cost cannot be negative'
            });
        }

        const itemId = uuidv4();
        const now = new Date().toISOString();

        const insertQuery = `
            INSERT INTO inventory (
                id, name, category, quantity, unit, cost, supplier, notes,
                farmId, lowStockThreshold, createdAt, updatedAt
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const result = await db.run(insertQuery, [
            itemId,
            name,
            category,
            quantity,
            unit,
            cost,
            supplier || null,
            notes || '',
            farmId,
            lowStockThreshold,
            now,
            now
        ]);

        // Fetch the created item
        const newItem = await db.get(
            'SELECT * FROM inventory WHERE id = ?',
            [itemId]
        );

        res.status(201).json({
            success: true,
            message: 'Inventory item created successfully',
            data: newItem
        });
    } catch (error) {
        console.error('Error creating inventory item:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to create inventory item',
            message: error.message
        });
    }
});

/**
 * @route   PUT /api/inventory/:id
 * @desc    Update an inventory item
 * @access  Private
 */
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const {
            name,
            category,
            quantity,
            unit,
            cost,
            supplier,
            notes,
            farmId,
            lowStockThreshold
        } = req.body;

        const userId = req.user.id;
        const userRole = req.user.role;

        // Check if item exists and user has access
        const existingItem = await db.get('SELECT * FROM inventory WHERE id = ?', [id]);
        if (!existingItem) {
            return res.status(404).json({
                success: false,
                error: 'Inventory item not found'
            });
        }

        // Check access permissions
        if (userRole !== 'admin') {
            const farmAccess = await db.get(
                'SELECT id FROM farms WHERE id = ? AND ownerId = ?',
                [existingItem.farmId, userId]
            );
            if (!farmAccess) {
                return res.status(403).json({
                    success: false,
                    error: 'Access denied to this inventory item'
                });
            }
        }

        // Validate farm access if farmId is being changed
        if (farmId && farmId !== existingItem.farmId) {
            if (userRole !== 'admin') {
                const farmAccess = await db.get(
                    'SELECT id FROM farms WHERE id = ? AND ownerId = ?',
                    [farmId, userId]
                );
                if (!farmAccess) {
                    return res.status(403).json({
                        success: false,
                        error: 'Access denied to the new farm'
                    });
                }
            }
        }

        // Validate quantity and cost if provided
        if (quantity !== undefined && quantity < 0) {
            return res.status(400).json({
                success: false,
                error: 'Quantity cannot be negative'
            });
        }

        if (cost !== undefined && cost < 0) {
            return res.status(400).json({
                success: false,
                error: 'Cost cannot be negative'
            });
        }

        const updateQuery = `
            UPDATE inventory SET
                name = COALESCE(?, name),
                category = COALESCE(?, category),
                quantity = COALESCE(?, quantity),
                unit = COALESCE(?, unit),
                cost = COALESCE(?, cost),
                supplier = COALESCE(?, supplier),
                notes = COALESCE(?, notes),
                farmId = COALESCE(?, farmId),
                lowStockThreshold = COALESCE(?, lowStockThreshold),
                updatedAt = ?
            WHERE id = ?
        `;

        const result = await db.run(updateQuery, [
            name || null,
            category || null,
            quantity !== undefined ? quantity : null,
            unit || null,
            cost !== undefined ? cost : null,
            supplier || null,
            notes || null,
            farmId || null,
            lowStockThreshold !== undefined ? lowStockThreshold : null,
            new Date().toISOString(),
            id
        ]);

        // Fetch the updated item
        const updatedItem = await db.get('SELECT * FROM inventory WHERE id = ?', [id]);

        res.json({
            success: true,
            message: 'Inventory item updated successfully',
            data: updatedItem
        });
    } catch (error) {
        console.error('Error updating inventory item:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to update inventory item',
            message: error.message
        });
    }
});

/**
 * @route   DELETE /api/inventory/:id
 * @desc    Delete an inventory item
 * @access  Private
 */
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;
        const userRole = req.user.role;

        // Check if item exists and user has access
        const existingItem = await db.get('SELECT * FROM inventory WHERE id = ?', [id]);
        if (!existingItem) {
            return res.status(404).json({
                success: false,
                error: 'Inventory item not found'
            });
        }

        // Check access permissions
        if (userRole !== 'admin') {
            const farmAccess = await db.get(
                'SELECT id FROM farms WHERE id = ? AND ownerId = ?',
                [existingItem.farmId, userId]
            );
            if (!farmAccess) {
                return res.status(403).json({
                    success: false,
                    error: 'Access denied to this inventory item'
                });
            }
        }

        const result = await db.run('DELETE FROM inventory WHERE id = ?', [id]);

        res.json({
            success: true,
            message: 'Inventory item deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting inventory item:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to delete inventory item',
            message: error.message
        });
    }
});

/**
 * @route   PATCH /api/inventory/:id/quantity
 * @desc    Update inventory quantity (for stock adjustments)
 * @access  Private
 */
router.patch('/:id/quantity', async (req, res) => {
    try {
        const { id } = req.params;
        const { quantity, adjustment, reason, notes } = req.body;

        const userId = req.user.id;
        const userRole = req.user.role;

        // Check if item exists and user has access
        const existingItem = await db.get('SELECT * FROM inventory WHERE id = ?', [id]);
        if (!existingItem) {
            return res.status(404).json({
                success: false,
                error: 'Inventory item not found'
            });
        }

        // Check access permissions
        if (userRole !== 'admin') {
            const farmAccess = await db.get(
                'SELECT id FROM farms WHERE id = ? AND ownerId = ?',
                [existingItem.farmId, userId]
            );
            if (!farmAccess) {
                return res.status(403).json({
                    success: false,
                    error: 'Access denied to this inventory item'
                });
            }
        }

        let newQuantity;
        if (quantity !== undefined) {
            newQuantity = quantity;
        } else if (adjustment !== undefined) {
            newQuantity = existingItem.quantity + adjustment;
        } else {
            return res.status(400).json({
                success: false,
                error: 'Either quantity or adjustment must be provided'
            });
        }

        if (newQuantity < 0) {
            return res.status(400).json({
                success: false,
                error: 'Quantity cannot be negative'
            });
        }

        const updateQuery = `
            UPDATE inventory SET
                quantity = ?,
                notes = COALESCE(?, notes),
                updatedAt = ?
            WHERE id = ?
        `;

        const result = await db.run(updateQuery, [
            newQuantity,
            notes || null,
            new Date().toISOString(),
            id
        ]);

        // Fetch the updated item
        const updatedItem = await db.get('SELECT * FROM inventory WHERE id = ?', [id]);

        res.json({
            success: true,
            message: 'Inventory quantity updated successfully',
            data: updatedItem
        });
    } catch (error) {
        console.error('Error updating inventory quantity:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to update inventory quantity',
            message: error.message
        });
    }
});

/**
 * @route   GET /api/inventory/:id/analytics
 * @desc    Get inventory item analytics
 * @access  Private
 */
router.get('/:id/analytics', async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;
        const userRole = req.user.role;

        // Check if item exists and user has access
        const existingItem = await db.get('SELECT * FROM inventory WHERE id = ?', [id]);
        if (!existingItem) {
            return res.status(404).json({
                success: false,
                error: 'Inventory item not found'
            });
        }

        // Check access permissions
        if (userRole !== 'admin') {
            const farmAccess = await db.get(
                'SELECT id FROM farms WHERE id = ? AND ownerId = ?',
                [existingItem.farmId, userId]
            );
            if (!farmAccess) {
                return res.status(403).json({
                    success: false,
                    error: 'Access denied to this inventory item'
                });
            }
        }

        // Calculate inventory analytics
        const analytics = {
            itemId: id,
            name: existingItem.name,
            category: existingItem.category,
            currentQuantity: existingItem.quantity,
            unit: existingItem.unit,
            cost: existingItem.cost,
            totalValue: existingItem.quantity * existingItem.cost,
            lowStockThreshold: existingItem.lowStockThreshold,
            isLowStock: existingItem.quantity <= existingItem.lowStockThreshold,
            stockLevel: existingItem.quantity > existingItem.lowStockThreshold * 2 ? 'HIGH' : 
                       existingItem.quantity > existingItem.lowStockThreshold ? 'MEDIUM' : 'LOW',
            daysUntilStockout: existingItem.quantity > 0 ? Math.ceil(existingItem.quantity / 1) : 0, // Assuming 1 unit per day usage
            supplier: existingItem.supplier,
            lastUpdated: existingItem.updatedAt
        };

        res.json({
            success: true,
            data: analytics
        });
    } catch (error) {
        console.error('Error fetching inventory analytics:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch inventory analytics',
            message: error.message
        });
    }
});

/**
 * @route   GET /api/inventory/stats/overview
 * @desc    Get inventory statistics overview
 * @access  Private
 */
router.get('/stats/overview', async (req, res) => {
    try {
        const { farmId } = req.query;
        const userId = req.user.id;
        const userRole = req.user.role;

        let farmFilter = '';
        const params = [];

        if (farmId) {
            farmFilter = 'WHERE farmId = ?';
            params.push(farmId);
        } else if (userRole !== 'admin') {
            farmFilter = 'WHERE farmId IN (SELECT id FROM farms WHERE ownerId = ?)';
            params.push(userId);
        }

        // Get inventory statistics
        const statsQuery = `
            SELECT 
                COUNT(*) as totalItems,
                SUM(quantity) as totalQuantity,
                SUM(quantity * cost) as totalValue,
                AVG(cost) as avgCost,
                SUM(CASE WHEN quantity <= lowStockThreshold THEN 1 ELSE 0 END) as lowStockItems,
                SUM(CASE WHEN quantity = 0 THEN 1 ELSE 0 END) as outOfStockItems
            FROM inventory
            ${farmFilter}
        `;

        const stats = await db.get(statsQuery, params);

        // Get inventory by category
        const categoryQuery = `
            SELECT 
                category,
                COUNT(*) as count,
                SUM(quantity) as totalQuantity,
                SUM(quantity * cost) as totalValue
            FROM inventory
            ${farmFilter}
            GROUP BY category
            ORDER BY totalValue DESC
        `;

        const categories = await db.all(categoryQuery, params);

        // Get low stock items
        const lowStockQuery = `
            SELECT 
                name,
                category,
                quantity,
                lowStockThreshold,
                supplier
            FROM inventory
            ${farmFilter} AND quantity <= lowStockThreshold
            ORDER BY quantity ASC
            LIMIT 10
        `;

        const lowStockItems = await db.all(lowStockQuery, params);

        res.json({
            success: true,
            data: {
                overview: stats,
                byCategory: categories,
                lowStockItems
            }
        });
    } catch (error) {
        console.error('Error fetching inventory statistics:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch inventory statistics',
            message: error.message
        });
    }
});

module.exports = router; 