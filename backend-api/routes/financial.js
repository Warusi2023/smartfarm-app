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

// Helper function to check financial record exists
async function checkFinancialRecordExists(recordId) {
    const record = await db.get('SELECT id FROM financial_records WHERE id = ?', [recordId]);
    return record !== null;
}

// Get all financial records with filtering and pagination
router.get('/', async (req, res) => {
    try {
        const { page = 1, limit = 10, farmId, type, category, startDate, endDate, search } = req.query;
        const offset = (page - 1) * limit;
        const userId = req.user.id;

        let whereClause = 'WHERE fr.farmId IN (SELECT id FROM farms WHERE ownerId = ?)';
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
            whereClause += ' AND fr.farmId = ?';
            params.push(farmId);
        }

        if (type) {
            whereClause += ' AND fr.type = ?';
            params.push(type);
        }

        if (category) {
            whereClause += ' AND fr.category = ?';
            params.push(category);
        }

        if (startDate) {
            whereClause += ' AND fr.date >= ?';
            params.push(startDate);
        }

        if (endDate) {
            whereClause += ' AND fr.date <= ?';
            params.push(endDate);
        }

        if (search) {
            whereClause += ' AND (fr.description LIKE ? OR fr.category LIKE ?)';
            const searchTerm = `%${search}%`;
            params.push(searchTerm, searchTerm);
        }

        // Get total count
        const countQuery = `
            SELECT COUNT(*) as total 
            FROM financial_records fr 
            ${whereClause}
        `;
        const countResult = await db.get(countQuery, params);
        const total = countResult ? countResult.total : 0;

        // Get financial records with pagination
        const query = `
            SELECT fr.*, f.name as farmName
            FROM financial_records fr
            LEFT JOIN farms f ON fr.farmId = f.id
            ${whereClause}
            ORDER BY fr.date DESC
            LIMIT ? OFFSET ?
        `;
        const queryParams = [...params, parseInt(limit), offset];
        const records = await db.all(query, queryParams);

        res.json({
            success: true,
            data: records,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total,
                totalPages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        console.error('Error fetching financial records:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
});

// Get financial record by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const query = `
            SELECT fr.*, f.name as farmName
            FROM financial_records fr
            LEFT JOIN farms f ON fr.farmId = f.id
            WHERE fr.id = ?
        `;
        
        const record = await db.get(query, [id]);
        
        if (!record) {
            return res.status(404).json({
                success: false,
                error: 'Financial record not found'
            });
        }

        // Check farm access
        const hasAccess = await checkFarmAccess(record.farmId, userId);
        if (!hasAccess) {
            return res.status(403).json({
                success: false,
                error: 'Access denied to this financial record'
            });
        }
        
        res.json({
            success: true,
            data: record
        });
    } catch (error) {
        console.error('Error fetching financial record:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
});

// Create new financial record
router.post('/', async (req, res) => {
    try {
        const { farmId, type, category, amount, date, description, reference } = req.body;
        const userId = req.user.id;

        // Validation
        if (!farmId || !type || !category || !amount || !date) {
            return res.status(400).json({
                success: false,
                error: 'Missing required fields: farmId, type, category, amount, date'
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

        // Validate amount
        if (typeof amount !== 'number' || amount <= 0) {
            return res.status(400).json({
                success: false,
                error: 'Amount must be a positive number'
            });
        }

        // Validate type
        const validTypes = ['INCOME', 'EXPENSE'];
        if (!validTypes.includes(type)) {
            return res.status(400).json({
                success: false,
                error: 'Invalid type. Must be one of: INCOME, EXPENSE'
            });
        }

        // Validate date
        const recordDate = new Date(date);
        const now = new Date();
        
        if (isNaN(recordDate.getTime())) {
            return res.status(400).json({
                success: false,
                error: 'Invalid date format'
            });
        }
        
        if (recordDate > now) {
            return res.status(400).json({
                success: false,
                error: 'Date cannot be in the future'
            });
        }

        const id = uuidv4();
        const createdAt = new Date().toISOString();
        
        const query = `
            INSERT INTO financial_records (id, farmId, type, category, amount, date, description, reference, createdAt, updatedAt)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        
        const result = await db.run(query, [
            id, farmId, type, category, amount, date, description || null, 
            reference || null, createdAt, createdAt
        ]);
        
        if (result.changes === 0) {
            return res.status(500).json({
                success: false,
                error: 'Failed to create financial record'
            });
        }

        // Get the created record
        const newRecord = await db.get('SELECT * FROM financial_records WHERE id = ?', [id]);
        
        res.status(201).json({
            success: true,
            message: 'Financial record created successfully',
            data: newRecord
        });
    } catch (error) {
        console.error('Error creating financial record:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
});

// Update financial record
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { type, category, amount, date, description, reference } = req.body;
        const userId = req.user.id;

        // Check if record exists
        const recordExists = await checkFinancialRecordExists(id);
        if (!recordExists) {
            return res.status(404).json({
                success: false,
                error: 'Financial record not found'
            });
        }

        // Get record to check farm access
        const record = await db.get('SELECT farmId FROM financial_records WHERE id = ?', [id]);
        const hasAccess = await checkFarmAccess(record.farmId, userId);
        if (!hasAccess) {
            return res.status(403).json({
                success: false,
                error: 'Access denied to this financial record'
            });
        }

        // Build update query dynamically
        let updateQuery = 'UPDATE financial_records SET';
        const updateParams = [];
        const updates = [];

        if (type !== undefined) {
            const validTypes = ['INCOME', 'EXPENSE'];
            if (!validTypes.includes(type)) {
                return res.status(400).json({
                    success: false,
                    error: 'Invalid type. Must be one of: INCOME, EXPENSE'
                });
            }
            updates.push(' type = ?');
            updateParams.push(type);
        }
        if (category !== undefined) {
            updates.push(' category = ?');
            updateParams.push(category);
        }
        if (amount !== undefined) {
            if (typeof amount !== 'number' || amount <= 0) {
                return res.status(400).json({
                    success: false,
                    error: 'Amount must be a positive number'
                });
            }
            updates.push(' amount = ?');
            updateParams.push(amount);
        }
        if (date !== undefined) {
            const recordDate = new Date(date);
            const now = new Date();
            if (recordDate > now) {
                return res.status(400).json({
                    success: false,
                    error: 'Date cannot be in the future'
                });
            }
            updates.push(' date = ?');
            updateParams.push(date);
        }
        if (description !== undefined) {
            updates.push(' description = ?');
            updateParams.push(description);
        }
        if (reference !== undefined) {
            updates.push(' reference = ?');
            updateParams.push(reference);
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
                error: 'Failed to update financial record'
            });
        }
        
        res.json({
            success: true,
            message: 'Financial record updated successfully'
        });
    } catch (error) {
        console.error('Error updating financial record:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
});

// Delete financial record
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        // Check if record exists
        const recordExists = await checkFinancialRecordExists(id);
        if (!recordExists) {
            return res.status(404).json({
                success: false,
                error: 'Financial record not found'
            });
        }

        // Get record to check farm access
        const record = await db.get('SELECT farmId FROM financial_records WHERE id = ?', [id]);
        const hasAccess = await checkFarmAccess(record.farmId, userId);
        if (!hasAccess) {
            return res.status(403).json({
                success: false,
                error: 'Access denied to this financial record'
            });
        }

        const result = await db.run('DELETE FROM financial_records WHERE id = ?', [id]);
        
        if (result.changes === 0) {
            return res.status(500).json({
                success: false,
                error: 'Failed to delete financial record'
            });
        }
        
        res.json({
            success: true,
            message: 'Financial record deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting financial record:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
});

// Get financial analytics
router.get('/:id/analytics', async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        // Check if record exists
        const recordExists = await checkFinancialRecordExists(id);
        if (!recordExists) {
            return res.status(404).json({
                success: false,
                error: 'Financial record not found'
            });
        }

        // Get record to check farm access
        const record = await db.get('SELECT farmId FROM financial_records WHERE id = ?', [id]);
        const hasAccess = await checkFarmAccess(record.farmId, userId);
        if (!hasAccess) {
            return res.status(403).json({
                success: false,
                error: 'Access denied to this financial record'
            });
        }

        // Get record analytics
        const recordData = await db.get('SELECT * FROM financial_records WHERE id = ?', [id]);
        
        // Calculate days since record
        const recordDate = new Date(recordData.date);
        const now = new Date();
        const daysSince = Math.floor((now - recordDate) / (1000 * 60 * 60 * 24));

        const analytics = {
            recordId: id,
            type: recordData.type,
            category: recordData.category,
            amount: recordData.amount,
            date: recordData.date,
            daysSince: Math.max(0, daysSince),
            isRecent: daysSince <= 30,
            isOld: daysSince > 365
        };

        res.json({
            success: true,
            data: analytics
        });
    } catch (error) {
        console.error('Error fetching financial analytics:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
});

// Get financial overview
router.get('/overview', async (req, res) => {
    try {
        const { farmId, startDate, endDate } = req.query;
        const userId = req.user.id;

        let whereClause = 'WHERE fr.farmId IN (SELECT id FROM farms WHERE ownerId = ?)';
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
            whereClause += ' AND fr.farmId = ?';
            params.push(farmId);
        }

        if (startDate) {
            whereClause += ' AND fr.date >= ?';
            params.push(startDate);
        }

        if (endDate) {
            whereClause += ' AND fr.date <= ?';
            params.push(endDate);
        }

        // Get financial overview
        const [totalIncome, totalExpenses, byCategory, byType] = await Promise.all([
            db.get(`SELECT SUM(amount) as total FROM financial_records fr ${whereClause} AND fr.type = 'INCOME'`, params),
            db.get(`SELECT SUM(amount) as total FROM financial_records fr ${whereClause} AND fr.type = 'EXPENSE'`, params),
            db.all(`SELECT category, SUM(amount) as total FROM financial_records fr ${whereClause} GROUP BY category`, params),
            db.all(`SELECT type, SUM(amount) as total FROM financial_records fr ${whereClause} GROUP BY type`, params)
        ]);

        const overview = {
            totalIncome: totalIncome ? totalIncome.total : 0,
            totalExpenses: totalExpenses ? totalExpenses.total : 0,
            netProfit: (totalIncome ? totalIncome.total : 0) - (totalExpenses ? totalExpenses.total : 0),
            byCategory: byCategory || [],
            byType: byType || []
        };

        res.json({
            success: true,
            data: overview
        });
    } catch (error) {
        console.error('Error fetching financial overview:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
});

// Get profit and loss statement
router.get('/profit-loss', async (req, res) => {
    try {
        const { farmId, startDate, endDate } = req.query;
        const userId = req.user.id;

        let whereClause = 'WHERE fr.farmId IN (SELECT id FROM farms WHERE ownerId = ?)';
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
            whereClause += ' AND fr.farmId = ?';
            params.push(farmId);
        }

        if (startDate) {
            whereClause += ' AND fr.date >= ?';
            params.push(startDate);
        }

        if (endDate) {
            whereClause += ' AND fr.date <= ?';
            params.push(endDate);
        }

        // Get profit and loss data
        const [incomeByCategory, expenseByCategory, totalIncome, totalExpenses] = await Promise.all([
            db.all(`SELECT category, SUM(amount) as total FROM financial_records fr ${whereClause} AND fr.type = 'INCOME' GROUP BY category`, params),
            db.all(`SELECT category, SUM(amount) as total FROM financial_records fr ${whereClause} AND fr.type = 'EXPENSE' GROUP BY category`, params),
            db.get(`SELECT SUM(amount) as total FROM financial_records fr ${whereClause} AND fr.type = 'INCOME'`, params),
            db.get(`SELECT SUM(amount) as total FROM financial_records fr ${whereClause} AND fr.type = 'EXPENSE'`, params)
        ]);

        const profitLoss = {
            period: {
                startDate: startDate || 'All time',
                endDate: endDate || 'All time'
            },
            income: {
                total: totalIncome ? totalIncome.total : 0,
                byCategory: incomeByCategory || []
            },
            expenses: {
                total: totalExpenses ? totalExpenses.total : 0,
                byCategory: expenseByCategory || []
            },
            netProfit: (totalIncome ? totalIncome.total : 0) - (totalExpenses ? totalExpenses.total : 0)
        };

        res.json({
            success: true,
            data: profitLoss
        });
    } catch (error) {
        console.error('Error fetching profit and loss:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
});

// Get cash flow statement
router.get('/cash-flow', async (req, res) => {
    try {
        const { farmId, startDate, endDate } = req.query;
        const userId = req.user.id;

        let whereClause = 'WHERE fr.farmId IN (SELECT id FROM farms WHERE ownerId = ?)';
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
            whereClause += ' AND fr.farmId = ?';
            params.push(farmId);
        }

        if (startDate) {
            whereClause += ' AND fr.date >= ?';
            params.push(startDate);
        }

        if (endDate) {
            whereClause += ' AND fr.date <= ?';
            params.push(endDate);
        }

        // Get cash flow data
        const [monthlyIncome, monthlyExpenses] = await Promise.all([
            db.all(`SELECT strftime('%Y-%m', date) as month, SUM(amount) as total FROM financial_records fr ${whereClause} AND fr.type = 'INCOME' GROUP BY month ORDER BY month`, params),
            db.all(`SELECT strftime('%Y-%m', date) as month, SUM(amount) as total FROM financial_records fr ${whereClause} AND fr.type = 'EXPENSE' GROUP BY month ORDER BY month`, params)
        ]);

        // Combine monthly data
        const months = new Set([
            ...(monthlyIncome || []).map(item => item.month),
            ...(monthlyExpenses || []).map(item => item.month)
        ]);

        const cashFlow = Array.from(months).sort().map(month => {
            const income = (monthlyIncome || []).find(item => item.month === month)?.total || 0;
            const expenses = (monthlyExpenses || []).find(item => item.month === month)?.total || 0;
            return {
                month,
                income,
                expenses,
                netCashFlow: income - expenses
            };
        });

        res.json({
            success: true,
            data: cashFlow
        });
    } catch (error) {
        console.error('Error fetching cash flow:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
});

// Get financial statistics overview
router.get('/stats/overview', async (req, res) => {
    try {
        const { farmId, startDate, endDate } = req.query;
        const userId = req.user.id;

        let whereClause = 'WHERE fr.farmId IN (SELECT id FROM farms WHERE ownerId = ?)';
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
            whereClause += ' AND fr.farmId = ?';
            params.push(farmId);
        }

        if (startDate) {
            whereClause += ' AND fr.date >= ?';
            params.push(startDate);
        }

        if (endDate) {
            whereClause += ' AND fr.date <= ?';
            params.push(endDate);
        }

        // Get financial statistics
        const [totalRecords, totalIncome, totalExpenses, byCategory, byType] = await Promise.all([
            db.get(`SELECT COUNT(*) as count FROM financial_records fr ${whereClause}`, params),
            db.get(`SELECT SUM(amount) as total FROM financial_records fr ${whereClause} AND fr.type = 'INCOME'`, params),
            db.get(`SELECT SUM(amount) as total FROM financial_records fr ${whereClause} AND fr.type = 'EXPENSE'`, params),
            db.all(`SELECT category, SUM(amount) as total FROM financial_records fr ${whereClause} GROUP BY category`, params),
            db.all(`SELECT type, SUM(amount) as total FROM financial_records fr ${whereClause} GROUP BY type`, params)
        ]);

        const stats = {
            overview: {
                totalRecords: totalRecords ? totalRecords.count : 0,
                totalIncome: totalIncome ? totalIncome.total : 0,
                totalExpenses: totalExpenses ? totalExpenses.total : 0,
                netProfit: (totalIncome ? totalIncome.total : 0) - (totalExpenses ? totalExpenses.total : 0)
            },
            byCategory: byCategory || [],
            byType: byType || []
        };

        res.json({
            success: true,
            data: stats
        });
    } catch (error) {
        console.error('Error fetching financial statistics:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
});

// Get profit and loss statement (alias for profit-loss)
router.get('/stats/profit-loss', async (req, res) => {
    try {
        const { farmId, startDate, endDate } = req.query;
        const userId = req.user.id;

        let whereClause = 'WHERE fr.farmId IN (SELECT id FROM farms WHERE ownerId = ?)';
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
            whereClause += ' AND fr.farmId = ?';
            params.push(farmId);
        }

        if (startDate) {
            whereClause += ' AND fr.date >= ?';
            params.push(startDate);
        }

        if (endDate) {
            whereClause += ' AND fr.date <= ?';
            params.push(endDate);
        }

        // Get profit and loss data
        const [incomeByCategory, expenseByCategory, totalIncome, totalExpenses] = await Promise.all([
            db.all(`SELECT category, SUM(amount) as total FROM financial_records fr ${whereClause} AND fr.type = 'INCOME' GROUP BY category`, params),
            db.all(`SELECT category, SUM(amount) as total FROM financial_records fr ${whereClause} AND fr.type = 'EXPENSE' GROUP BY category`, params),
            db.get(`SELECT SUM(amount) as total FROM financial_records fr ${whereClause} AND fr.type = 'INCOME'`, params),
            db.get(`SELECT SUM(amount) as total FROM financial_records fr ${whereClause} AND fr.type = 'EXPENSE'`, params)
        ]);

        const profitLoss = {
            period: {
                startDate: startDate || 'All time',
                endDate: endDate || 'All time'
            },
            income: {
                total: totalIncome ? totalIncome.total : 0,
                byCategory: incomeByCategory || []
            },
            expenses: {
                total: totalExpenses ? totalExpenses.total : 0,
                byCategory: expenseByCategory || []
            },
            netProfit: (totalIncome ? totalIncome.total : 0) - (totalExpenses ? totalExpenses.total : 0)
        };

        res.json({
            success: true,
            data: profitLoss
        });
    } catch (error) {
        console.error('Error fetching profit and loss:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
});

// Get cash flow statement (alias for cash-flow)
router.get('/stats/cash-flow', async (req, res) => {
    try {
        const { farmId, startDate, endDate } = req.query;
        const userId = req.user.id;

        let whereClause = 'WHERE fr.farmId IN (SELECT id FROM farms WHERE ownerId = ?)';
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
            whereClause += ' AND fr.farmId = ?';
            params.push(farmId);
        }

        if (startDate) {
            whereClause += ' AND fr.date >= ?';
            params.push(startDate);
        }

        if (endDate) {
            whereClause += ' AND fr.date <= ?';
            params.push(endDate);
        }

        // Get cash flow data
        const [monthlyIncome, monthlyExpenses] = await Promise.all([
            db.all(`SELECT strftime('%Y-%m', date) as month, SUM(amount) as total FROM financial_records fr ${whereClause} AND fr.type = 'INCOME' GROUP BY month ORDER BY month`, params),
            db.all(`SELECT strftime('%Y-%m', date) as month, SUM(amount) as total FROM financial_records fr ${whereClause} AND fr.type = 'EXPENSE' GROUP BY month ORDER BY month`, params)
        ]);

        // Combine monthly data
        const months = new Set([
            ...(monthlyIncome || []).map(item => item.month),
            ...(monthlyExpenses || []).map(item => item.month)
        ]);

        const cashFlow = Array.from(months).sort().map(month => {
            const income = (monthlyIncome || []).find(item => item.month === month)?.total || 0;
            const expenses = (monthlyExpenses || []).find(item => item.month === month)?.total || 0;
            return {
                month,
                income,
                expenses,
                netCashFlow: income - expenses
            };
        });

        res.json({
            success: true,
            data: cashFlow
        });
    } catch (error) {
        console.error('Error fetching cash flow:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
});

module.exports = router; 