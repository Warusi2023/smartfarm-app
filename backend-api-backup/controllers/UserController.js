const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const db = require('../database/init');

class UserController {
    // Get all users (with pagination and filtering)
    static async getUsers(req, res) {
        try {
            const { page = 1, limit = 10, role, status, search } = req.query;
            const offset = (page - 1) * limit;
            
            let whereClause = 'WHERE 1=1';
            const params = [];
            
            if (role) {
                whereClause += ' AND role = ?';
                params.push(role);
            }
            
            if (status) {
                whereClause += ' AND status = ?';
                params.push(status);
            }
            
            if (search) {
                whereClause += ' AND (firstName LIKE ? OR lastName LIKE ? OR email LIKE ?)';
                const searchTerm = `%${search}%`;
                params.push(searchTerm, searchTerm, searchTerm);
            }
            
            // Get total count
            const countQuery = `SELECT COUNT(*) as total FROM users ${whereClause}`;
            const countResult = await db.get(countQuery, params);
            
            if (!countResult) {
                return res.status(500).json({
                    success: false,
                    error: 'Failed to count users'
                });
            }
            
            const total = countResult.total;
            const totalPages = Math.ceil(total / limit);
            
            // Get users with pagination
            const query = `
                SELECT id, email, firstName, lastName, role, status, 
                       lastLoginAt, createdAt, updatedAt
                FROM users 
                ${whereClause}
                ORDER BY createdAt DESC
                LIMIT ? OFFSET ?
            `;
            
            const queryParams = [...params, parseInt(limit), offset];
            const users = await db.all(query, queryParams);
            
            res.json({
                success: true,
                data: users,
                pagination: {
                    page: parseInt(page),
                    limit: parseInt(limit),
                    total,
                    totalPages
                }
            });
        } catch (error) {
            console.error('Get users error:', error);
            res.status(500).json({
                success: false,
                error: 'Internal server error'
            });
        }
    }
    
    // Get user by ID
    static async getUserById(req, res) {
        try {
            const { id } = req.params;
            
            const query = `
                SELECT id, email, firstName, lastName, role, status, 
                       lastLoginAt, createdAt, updatedAt
                FROM users 
                WHERE id = ?
            `;
            
            const user = await db.get(query, [id]);
            
            if (!user) {
                return res.status(404).json({
                    success: false,
                    error: 'User not found'
                });
            }
            
            res.json({
                success: true,
                data: user
            });
        } catch (error) {
            console.error('Get user by ID error:', error);
            res.status(500).json({
                success: false,
                error: 'Internal server error'
            });
        }
    }
    
    // Create new user
    static async createUser(req, res) {
        try {
            const { email, password, firstName, lastName, role = 'farmer' } = req.body;
            
            // Validation
            if (!email || !password || !firstName || !lastName) {
                return res.status(400).json({
                    success: false,
                    error: 'Missing required fields: email, password, firstName, lastName'
                });
            }
            
            if (password.length < 6) {
                return res.status(400).json({
                    success: false,
                    error: 'Password must be at least 6 characters long'
                });
            }
            
            // Check if user already exists
            const existingUser = await db.get('SELECT id FROM users WHERE email = ?', [email]);
            if (existingUser) {
                return res.status(409).json({
                    success: false,
                    error: 'User with this email already exists'
                });
            }
            
            // Hash password
            const hashedPassword = await bcrypt.hash(password, 10);
            const userId = uuidv4();
            const now = new Date().toISOString();
            
            const insertQuery = `
                INSERT INTO users (id, email, password, firstName, lastName, role, status, createdAt, updatedAt)
                VALUES (?, ?, ?, ?, ?, ?, 'active', ?, ?)
            `;
            
            const result = await db.run(insertQuery, [
                userId, email, hashedPassword, firstName, lastName, role, now, now
            ]);
            
            if (result.changes === 0) {
                return res.status(500).json({
                    success: false,
                    error: 'Failed to create user'
                });
            }
            
            // Get the created user (without password)
            const newUser = await db.get(
                'SELECT id, email, firstName, lastName, role, status, createdAt FROM users WHERE id = ?',
                [userId]
            );
            
            res.status(201).json({
                success: true,
                message: 'User created successfully',
                data: newUser
            });
        } catch (error) {
            console.error('Create user error:', error);
            res.status(500).json({
                success: false,
                error: 'Internal server error'
            });
        }
    }
    
    // Update user
    static async updateUser(req, res) {
        try {
            const { id } = req.params;
            const { firstName, lastName, role, status } = req.body;
            
            // Validation
            if (!firstName && !lastName && !role && !status) {
                return res.status(400).json({
                    success: false,
                    error: 'At least one field must be provided for update'
                });
            }
            
            // Check if user exists
            const existingUser = await db.get('SELECT id FROM users WHERE id = ?', [id]);
            if (!existingUser) {
                return res.status(404).json({
                    success: false,
                    error: 'User not found'
                });
            }
            
            // Build update query dynamically
            let updateQuery = 'UPDATE users SET';
            const updateParams = [];
            const updates = [];
            
            if (firstName) {
                updates.push(' firstName = ?');
                updateParams.push(firstName);
            }
            if (lastName) {
                updates.push(' lastName = ?');
                updateParams.push(lastName);
            }
            if (role) {
                updates.push(' role = ?');
                updateParams.push(role);
            }
            if (status) {
                updates.push(' status = ?');
                updateParams.push(status);
            }
            
            updateQuery += updates.join(',') + ', updatedAt = ? WHERE id = ?';
            updateParams.push(new Date().toISOString(), id);
            
            const result = await db.run(updateQuery, updateParams);
            
            if (result.changes === 0) {
                return res.status(500).json({
                    success: false,
                    error: 'Failed to update user'
                });
            }
            
            res.json({
                success: true,
                message: 'User updated successfully'
            });
        } catch (error) {
            console.error('Update user error:', error);
            res.status(500).json({
                success: false,
                error: 'Internal server error'
            });
        }
    }
    
    // Delete user
    static async deleteUser(req, res) {
        try {
            const { id } = req.params;
            
            // Check if user exists
            const existingUser = await db.get('SELECT id FROM users WHERE id = ?', [id]);
            if (!existingUser) {
                return res.status(404).json({
                    success: false,
                    error: 'User not found'
                });
            }
            
            // Check if user has farms (prevent deletion)
            const userFarms = await db.get('SELECT COUNT(*) as count FROM farms WHERE ownerId = ?', [id]);
            if (userFarms && userFarms.count > 0) {
                return res.status(400).json({
                    success: false,
                    error: 'Cannot delete user with associated farms'
                });
            }
            
            const result = await db.run('DELETE FROM users WHERE id = ?', [id]);
            
            if (result.changes === 0) {
                return res.status(500).json({
                    success: false,
                    error: 'Failed to delete user'
                });
            }
            
            res.json({
                success: true,
                message: 'User deleted successfully'
            });
        } catch (error) {
            console.error('Delete user error:', error);
            res.status(500).json({
                success: false,
                error: 'Internal server error'
            });
        }
    }
    
    // Get user statistics
    static async getUserStats(req, res) {
        try {
            // Get total users
            const totalResult = await db.get('SELECT COUNT(*) as total FROM users');
            const total = totalResult ? totalResult.total : 0;
            
            // Get active users
            const activeResult = await db.get('SELECT COUNT(*) as count FROM users WHERE status = "active"');
            const activeUsers = activeResult ? activeResult.count : 0;
            
            // Get users by role
            const rolesResult = await db.all(`
                SELECT role, COUNT(*) as count 
                FROM users 
                GROUP BY role 
                ORDER BY count DESC
            `);
            
            // Get users by status
            const statusResult = await db.all(`
                SELECT status, COUNT(*) as count 
                FROM users 
                GROUP BY status 
                ORDER BY count DESC
            `);
            
            // Get recent registrations (last 30 days)
            const recentResult = await db.all(`
                SELECT COUNT(*) as count 
                FROM users 
                WHERE createdAt >= datetime('now', '-30 days')
            `);
            const recentRegistrations = recentResult && recentResult[0] ? recentResult[0].count : 0;
            
            res.json({
                success: true,
                data: {
                    total,
                    activeUsers,
                    byRole: rolesResult || [],
                    byStatus: statusResult || [],
                    recentRegistrations
                }
            });
        } catch (error) {
            console.error('Get user stats error:', error);
            res.status(500).json({
                success: false,
                error: 'Internal server error'
            });
        }
    }
    
    // Reset user password
    static async resetUserPassword(req, res) {
        try {
            const { id } = req.params;
            const { newPassword } = req.body;
            
            // Validation
            if (!newPassword) {
                return res.status(400).json({
                    success: false,
                    error: 'New password is required'
                });
            }
            
            if (newPassword.length < 6) {
                return res.status(400).json({
                    success: false,
                    error: 'Password must be at least 6 characters long'
                });
            }
            
            // Check if user exists
            const existingUser = await db.get('SELECT id FROM users WHERE id = ?', [id]);
            if (!existingUser) {
                return res.status(404).json({
                    success: false,
                    error: 'User not found'
                });
            }
            
            // Hash new password
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            
            const result = await db.run(
                'UPDATE users SET password = ?, updatedAt = ? WHERE id = ?',
                [hashedPassword, new Date().toISOString(), id]
            );
            
            if (result.changes === 0) {
                return res.status(500).json({
                    success: false,
                    error: 'Failed to reset password'
                });
            }
            
            res.json({
                success: true,
                message: 'Password reset successfully'
            });
        } catch (error) {
            console.error('Reset password error:', error);
            res.status(500).json({
                success: false,
                error: 'Internal server error'
            });
        }
    }
}

module.exports = UserController; 