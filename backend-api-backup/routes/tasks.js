const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const { authenticateToken, authorizeRole } = require('./auth');
const db = require('../database/init');

// Apply authentication middleware to all routes
router.use(authenticateToken);

/**
 * @route   GET /api/tasks
 * @desc    Get all tasks for a farm or all tasks for user
 * @access  Private
 */
router.get('/', async (req, res) => {
    try {
        const { farmId, status, priority, category, assignedTo, dueDate, page = 1, limit = 20 } = req.query;
        const userId = req.user.id;
        const userRole = req.user.role;

        let query = `
            SELECT 
                t.*,
                f.name as farmName,
                u.firstName as assignedToFirstName,
                u.lastName as assignedToLastName
            FROM tasks t
            LEFT JOIN farms f ON t.farmId = f.id
            LEFT JOIN users u ON t.assignedTo = u.id
            WHERE 1=1
        `;
        const params = [];

        // Filter by farm if specified
        if (farmId) {
            query += ` AND t.farmId = ?`;
            params.push(farmId);
        } else if (userRole !== 'admin') {
            // Non-admin users can only see tasks from their farms
            query += ` AND t.farmId IN (SELECT id FROM farms WHERE ownerId = ?)`;
            params.push(userId);
        }

        // Apply additional filters
        if (status) {
            query += ` AND t.status = ?`;
            params.push(status);
        }
        if (priority) {
            query += ` AND t.priority = ?`;
            params.push(priority);
        }
        if (category) {
            query += ` AND t.category = ?`;
            params.push(category);
        }
        if (assignedTo) {
            query += ` AND t.assignedTo = ?`;
            params.push(assignedTo);
        }
        if (dueDate) {
            query += ` AND DATE(t.dueDate) = DATE(?)`;
            params.push(dueDate);
        }

        // Add ordering and pagination
        query += ` ORDER BY 
            CASE 
                WHEN t.priority = 'URGENT' THEN 1
                WHEN t.priority = 'HIGH' THEN 2
                WHEN t.priority = 'MEDIUM' THEN 3
                WHEN t.priority = 'LOW' THEN 4
            END,
            t.dueDate ASC
        `;

        // Get total count for pagination
        const countQuery = query.replace(/SELECT.*FROM/, 'SELECT COUNT(*) as total FROM');
        const countResult = await db.get(countQuery, params);
        const total = countResult.total;

        // Add pagination
        const offset = (page - 1) * limit;
        query += ` LIMIT ? OFFSET ?`;
        params.push(parseInt(limit), offset);

        const tasks = await db.all(query, params);

        res.json({
            success: true,
            data: tasks,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total,
                pages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch tasks',
            message: error.message
        });
    }
});

/**
 * @route   GET /api/tasks/:id
 * @desc    Get task by ID
 * @access  Private
 */
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;
        const userRole = req.user.role;

        const query = `
            SELECT 
                t.*,
                f.name as farmName,
                u.firstName as assignedToFirstName,
                u.lastName as assignedToLastName
            FROM tasks t
            LEFT JOIN farms f ON t.farmId = f.id
            LEFT JOIN users u ON t.assignedTo = u.id
            WHERE t.id = ?
        `;

        const task = await db.get(query, [id]);

        if (!task) {
            return res.status(404).json({
                success: false,
                error: 'Task not found'
            });
        }

        // Check if user has access to this task
        if (userRole !== 'admin') {
            const farmAccess = await db.get(
                'SELECT id FROM farms WHERE id = ? AND ownerId = ?',
                [task.farmId, userId]
            );
            if (!farmAccess) {
                return res.status(403).json({
                    success: false,
                    error: 'Access denied to this task'
                });
            }
        }

        res.json({
            success: true,
            data: task
        });
    } catch (error) {
        console.error('Error fetching task:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch task',
            message: error.message
        });
    }
});

/**
 * @route   POST /api/tasks
 * @desc    Create a new task
 * @access  Private
 */
router.post('/', async (req, res) => {
    try {
        const {
            title,
            description,
            farmId,
            assignedTo,
            priority = 'MEDIUM',
            status = 'PENDING',
            dueDate,
            category,
            estimatedHours,
            notes
        } = req.body;

        const userId = req.user.id;
        const userRole = req.user.role;

        // Validation
        if (!title || !description || !farmId || !dueDate || !category) {
            return res.status(400).json({
                success: false,
                error: 'Missing required fields: title, description, farmId, dueDate, category'
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

        // Validate assigned user if specified
        if (assignedTo) {
            const userExists = await db.get('SELECT id FROM users WHERE id = ?', [assignedTo]);
            if (!userExists) {
                return res.status(400).json({
                    success: false,
                    error: 'Assigned user not found'
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

        const taskId = uuidv4();
        const now = new Date().toISOString();

        const insertQuery = `
            INSERT INTO tasks (
                id, title, description, farmId, assignedTo, priority, status,
                dueDate, category, estimatedHours, notes, createdAt, updatedAt
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const result = await db.run(insertQuery, [
            taskId,
            title,
            description,
            farmId,
            assignedTo || null,
            priority,
            status,
            dueDate,
            category,
            estimatedHours || null,
            notes || '',
            now,
            now
        ]);

        // Fetch the created task
        const newTask = await db.get(
            'SELECT * FROM tasks WHERE id = ?',
            [taskId]
        );

        res.status(201).json({
            success: true,
            message: 'Task created successfully',
            data: newTask
        });
    } catch (error) {
        console.error('Error creating task:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to create task',
            message: error.message
        });
    }
});

/**
 * @route   PUT /api/tasks/:id
 * @desc    Update a task
 * @access  Private
 */
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const {
            title,
            description,
            farmId,
            assignedTo,
            priority,
            status,
            dueDate,
            category,
            estimatedHours,
            actualHours,
            notes
        } = req.body;

        const userId = req.user.id;
        const userRole = req.user.role;

        // Check if task exists and user has access
        const existingTask = await db.get('SELECT * FROM tasks WHERE id = ?', [id]);
        if (!existingTask) {
            return res.status(404).json({
                success: false,
                error: 'Task not found'
            });
        }

        // Check access permissions
        if (userRole !== 'admin') {
            const farmAccess = await db.get(
                'SELECT id FROM farms WHERE id = ? AND ownerId = ?',
                [existingTask.farmId, userId]
            );
            if (!farmAccess) {
                return res.status(403).json({
                    success: false,
                    error: 'Access denied to this task'
                });
            }
        }

        // Validate farm access if farmId is being changed
        if (farmId && farmId !== existingTask.farmId) {
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

        // Validate assigned user if specified
        if (assignedTo && assignedTo !== existingTask.assignedTo) {
            const userExists = await db.get('SELECT id FROM users WHERE id = ?', [assignedTo]);
            if (!userExists) {
                return res.status(400).json({
                    success: false,
                    error: 'Assigned user not found'
                });
            }
        }

        const updateQuery = `
            UPDATE tasks SET
                title = COALESCE(?, title),
                description = COALESCE(?, description),
                farmId = COALESCE(?, farmId),
                assignedTo = COALESCE(?, assignedTo),
                priority = COALESCE(?, priority),
                status = COALESCE(?, status),
                dueDate = COALESCE(?, dueDate),
                category = COALESCE(?, category),
                estimatedHours = COALESCE(?, estimatedHours),
                actualHours = COALESCE(?, actualHours),
                notes = COALESCE(?, notes),
                updatedAt = ?
            WHERE id = ?
        `;

        const result = await db.run(updateQuery, [
            title || null,
            description || null,
            farmId || null,
            assignedTo || null,
            priority || null,
            status || null,
            dueDate || null,
            category || null,
            estimatedHours || null,
            actualHours || null,
            notes || null,
            new Date().toISOString(),
            id
        ]);

        // Fetch the updated task
        const updatedTask = await db.get('SELECT * FROM tasks WHERE id = ?', [id]);

        res.json({
            success: true,
            message: 'Task updated successfully',
            data: updatedTask
        });
    } catch (error) {
        console.error('Error updating task:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to update task',
            message: error.message
        });
    }
});

/**
 * @route   DELETE /api/tasks/:id
 * @desc    Delete a task
 * @access  Private
 */
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;
        const userRole = req.user.role;

        // Check if task exists and user has access
        const existingTask = await db.get('SELECT * FROM tasks WHERE id = ?', [id]);
        if (!existingTask) {
            return res.status(404).json({
                success: false,
                error: 'Task not found'
            });
        }

        // Check access permissions
        if (userRole !== 'admin') {
            const farmAccess = await db.get(
                'SELECT id FROM farms WHERE id = ? AND ownerId = ?',
                [existingTask.farmId, userId]
            );
            if (!farmAccess) {
                return res.status(403).json({
                    success: false,
                    error: 'Access denied to this task'
                });
            }
        }

        const result = await db.run('DELETE FROM tasks WHERE id = ?', [id]);

        res.json({
            success: true,
            message: 'Task deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting task:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to delete task',
            message: error.message
        });
    }
});

/**
 * @route   PATCH /api/tasks/:id/status
 * @desc    Update task status
 * @access  Private
 */
router.patch('/:id/status', async (req, res) => {
    try {
        const { id } = req.params;
        const { status, completedDate, actualHours, notes } = req.body;

        const userId = req.user.id;
        const userRole = req.user.role;

        // Check if task exists and user has access
        const existingTask = await db.get('SELECT * FROM tasks WHERE id = ?', [id]);
        if (!existingTask) {
            return res.status(404).json({
                success: false,
                error: 'Task not found'
            });
        }

        // Check access permissions
        if (userRole !== 'admin') {
            const farmAccess = await db.get(
                'SELECT id FROM farms WHERE id = ? AND ownerId = ?',
                [existingTask.farmId, userId]
            );
            if (!farmAccess) {
                return res.status(403).json({
                    success: false,
                    error: 'Access denied to this task'
                });
            }
        }

        // Validate status
        const validStatuses = ['PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED', 'OVERDUE'];
        if (status && !validStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                error: 'Invalid status. Must be one of: ' + validStatuses.join(', ')
            });
        }

        const updateQuery = `
            UPDATE tasks SET
                status = COALESCE(?, status),
                completedDate = COALESCE(?, completedDate),
                actualHours = COALESCE(?, actualHours),
                notes = COALESCE(?, notes),
                updatedAt = ?
            WHERE id = ?
        `;

        const result = await db.run(updateQuery, [
            status || null,
            completedDate || null,
            actualHours || null,
            notes || null,
            new Date().toISOString(),
            id
        ]);

        // Fetch the updated task
        const updatedTask = await db.get('SELECT * FROM tasks WHERE id = ?', [id]);

        res.json({
            success: true,
            message: 'Task status updated successfully',
            data: updatedTask
        });
    } catch (error) {
        console.error('Error updating task status:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to update task status',
            message: error.message
        });
    }
});

/**
 * @route   GET /api/tasks/:id/analytics
 * @desc    Get task analytics
 * @access  Private
 */
router.get('/:id/analytics', async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;
        const userRole = req.user.role;

        // Check if task exists and user has access
        const existingTask = await db.get('SELECT * FROM tasks WHERE id = ?', [id]);
        if (!existingTask) {
            return res.status(404).json({
                success: false,
                error: 'Task not found'
            });
        }

        // Check access permissions
        if (userRole !== 'admin') {
            const farmAccess = await db.get(
                'SELECT id FROM farms WHERE id = ? AND ownerId = ?',
                [existingTask.farmId, userId]
            );
            if (!farmAccess) {
                return res.status(403).json({
                    success: false,
                    error: 'Access denied to this task'
                });
            }
        }

        // Calculate task analytics
        const analytics = {
            taskId: id,
            title: existingTask.title,
            status: existingTask.status,
            priority: existingTask.priority,
            category: existingTask.category,
            dueDate: existingTask.dueDate,
            isOverdue: new Date(existingTask.dueDate) < new Date() && existingTask.status !== 'COMPLETED',
            daysUntilDue: Math.ceil((new Date(existingTask.dueDate) - new Date()) / (1000 * 60 * 60 * 24)),
            estimatedHours: existingTask.estimatedHours,
            actualHours: existingTask.actualHours,
            efficiency: existingTask.estimatedHours && existingTask.actualHours 
                ? ((existingTask.estimatedHours - existingTask.actualHours) / existingTask.estimatedHours * 100).toFixed(2)
                : null,
            completionTime: existingTask.completedDate && existingTask.createdAt
                ? Math.ceil((new Date(existingTask.completedDate) - new Date(existingTask.createdAt)) / (1000 * 60 * 60 * 24))
                : null
        };

        res.json({
            success: true,
            data: analytics
        });
    } catch (error) {
        console.error('Error fetching task analytics:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch task analytics',
            message: error.message
        });
    }
});

/**
 * @route   GET /api/tasks/stats/overview
 * @desc    Get task statistics overview
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

        // Get task statistics
        const statsQuery = `
            SELECT 
                COUNT(*) as totalTasks,
                SUM(CASE WHEN status = 'PENDING' THEN 1 ELSE 0 END) as pendingTasks,
                SUM(CASE WHEN status = 'IN_PROGRESS' THEN 1 ELSE 0 END) as inProgressTasks,
                SUM(CASE WHEN status = 'COMPLETED' THEN 1 ELSE 0 END) as completedTasks,
                SUM(CASE WHEN status = 'CANCELLED' THEN 1 ELSE 0 END) as cancelledTasks,
                SUM(CASE WHEN status = 'OVERDUE' THEN 1 ELSE 0 END) as overdueTasks,
                SUM(CASE WHEN priority = 'URGENT' THEN 1 ELSE 0 END) as urgentTasks,
                SUM(CASE WHEN priority = 'HIGH' THEN 1 ELSE 0 END) as highPriorityTasks,
                AVG(estimatedHours) as avgEstimatedHours,
                AVG(actualHours) as avgActualHours
            FROM tasks
            ${farmFilter}
        `;

        const stats = await db.get(statsQuery, params);

        // Get tasks by category
        const categoryQuery = `
            SELECT 
                category,
                COUNT(*) as count
            FROM tasks
            ${farmFilter}
            GROUP BY category
            ORDER BY count DESC
        `;

        const categories = await db.all(categoryQuery, params);

        // Get tasks by priority
        const priorityQuery = `
            SELECT 
                priority,
                COUNT(*) as count
            FROM tasks
            ${farmFilter}
            GROUP BY priority
            ORDER BY 
                CASE 
                    WHEN priority = 'URGENT' THEN 1
                    WHEN priority = 'HIGH' THEN 2
                    WHEN priority = 'MEDIUM' THEN 3
                    WHEN priority = 'LOW' THEN 4
                END
        `;

        const priorities = await db.all(priorityQuery, params);

        res.json({
            success: true,
            data: {
                overview: stats,
                byCategory: categories,
                byPriority: priorities
            }
        });
    } catch (error) {
        console.error('Error fetching task statistics:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch task statistics',
            message: error.message
        });
    }
});

module.exports = router;
