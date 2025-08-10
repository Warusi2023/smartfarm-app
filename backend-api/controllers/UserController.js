const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

// Database connection
const dbPath = path.join(__dirname, '../database/smartfarm.db');
const db = new sqlite3.Database(dbPath);

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
            
            db.get(countQuery, params, (err, countResult) => {
                if (err) {
                    console.error('Error counting users:', err);
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
                
                db.all(query, queryParams, (err, users) => {
                    if (err) {
                        console.error('Error fetching users:', err);
                        return res.status(500).json({
                            success: false,
                            error: 'Failed to fetch users'
                        });
                    }
                    
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
                });
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
            
            db.get(query, [id], (err, user) => {
                if (err) {
                    console.error('Error fetching user:', err);
                    return res.status(500).json({
                        success: false,
                        error: 'Failed to fetch user'
                    });
                }
                
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
            const { email, password, firstName, lastName, role = 'farmer', status = 'active' } = req.body;
            
            // Validation
            if (!email || !password || !firstName || !lastName) {
                return res.status(400).json({
                    success: false,
                    error: 'All required fields must be provided'
                });
            }
            
            if (password.length < 6) {
                return res.status(400).json({
                    success: false,
                    error: 'Password must be at least 6 characters long'
                });
            }
            
            // Check if user already exists
            db.get('SELECT id FROM users WHERE email = ?', [email], async (err, existingUser) => {
                if (err) {
                    console.error('Database error:', err);
                    return res.status(500).json({
                        success: false,
                        error: 'Database error'
                    });
                }
                
                if (existingUser) {
                    return res.status(409).json({
                        success: false,
                        error: 'User with this email already exists'
                    });
                }
                
                // Hash password
                const saltRounds = 10;
                const hashedPassword = await bcrypt.hash(password, saltRounds);
                
                // Create user
                const userId = uuidv4();
                const query = `
                    INSERT INTO users (id, email, password, firstName, lastName, role, status, createdAt, updatedAt)
                    VALUES (?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
                `;
                
                db.run(query, [userId, email, hashedPassword, firstName, lastName, role, status], function(err) {
                    if (err) {
                        console.error('Error creating user:', err);
                        return res.status(500).json({
                            success: false,
                            error: 'Failed to create user'
                        });
                    }
                    
                    res.status(201).json({
                        success: true,
                        message: 'User created successfully',
                        data: {
                            id: userId,
                            email,
                            firstName,
                            lastName,
                            role,
                            status
                        }
                    });
                });
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
            const { email, firstName, lastName, role, status } = req.body;
            
            // Validation
            if (!firstName || !lastName || !email) {
                return res.status(400).json({
                    success: false,
                    error: 'Required fields must be provided'
                });
            }
            
            // Check if user exists
            db.get('SELECT id FROM users WHERE id = ?', [id], (err, user) => {
                if (err) {
                    console.error('Database error:', err);
                    return res.status(500).json({
                        success: false,
                        error: 'Database error'
                    });
                }
                
                if (!user) {
                    return res.status(404).json({
                        success: false,
                        error: 'User not found'
                    });
                }
                
                // Check if email is already taken by another user
                db.get('SELECT id FROM users WHERE email = ? AND id != ?', [email, id], (err, existingUser) => {
                    if (err) {
                        console.error('Database error:', err);
                        return res.status(500).json({
                            success: false,
                            error: 'Database error'
                        });
                    }
                    
                    if (existingUser) {
                        return res.status(409).json({
                            success: false,
                            error: 'Email already taken by another user'
                        });
                    }
                    
                    // Update user
                    const query = `
                        UPDATE users 
                        SET email = ?, firstName = ?, lastName = ?, role = ?, status = ?, updatedAt = CURRENT_TIMESTAMP
                        WHERE id = ?
                    `;
                    
                    db.run(query, [email, firstName, lastName, role, status, id], function(err) {
                        if (err) {
                            console.error('Error updating user:', err);
                            return res.status(500).json({
                                success: false,
                                error: 'Failed to update user'
                            });
                        }
                        
                        res.json({
                            success: true,
                            message: 'User updated successfully',
                            data: {
                                id,
                                email,
                                firstName,
                                lastName,
                                role,
                                status
                            }
                        });
                    });
                });
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
            db.get('SELECT id FROM users WHERE id = ?', [id], (err, user) => {
                if (err) {
                    console.error('Database error:', err);
                    return res.status(500).json({
                        success: false,
                        error: 'Database error'
                    });
                }
                
                if (!user) {
                    return res.status(404).json({
                        success: false,
                        error: 'User not found'
                    });
                }
                
                // Check if user owns any farms
                db.get('SELECT COUNT(*) as count FROM farms WHERE ownerId = ?', [id], (err, farmCount) => {
                    if (err) {
                        console.error('Database error:', err);
                        return res.status(500).json({
                            success: false,
                            error: 'Database error'
                        });
                    }
                    
                    if (farmCount.count > 0) {
                        return res.status(400).json({
                            success: false,
                            error: 'Cannot delete user who owns farms. Transfer ownership first.'
                        });
                    }
                    
                    // Delete user
                    db.run('DELETE FROM users WHERE id = ?', [id], function(err) {
                        if (err) {
                            console.error('Error deleting user:', err);
                            return res.status(500).json({
                                success: false,
                                error: 'Failed to delete user'
                            });
                        }
                        
                        res.json({
                            success: true,
                            message: 'User deleted successfully'
                        });
                    });
                });
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
            const stats = {};
            
            // Total users
            db.get('SELECT COUNT(*) as total FROM users', (err, totalResult) => {
                if (err) {
                    console.error('Error getting total users:', err);
                    return res.status(500).json({
                        success: false,
                        error: 'Failed to get user statistics'
                    });
                }
                
                stats.total = totalResult.total;
                
                // Users by role
                db.all('SELECT role, COUNT(*) as count FROM users GROUP BY role', (err, roleStats) => {
                    if (err) {
                        console.error('Error getting role statistics:', err);
                        return res.status(500).json({
                            success: false,
                            error: 'Failed to get user statistics'
                        });
                    }
                    
                    stats.byRole = roleStats;
                    
                    // Users by status
                    db.all('SELECT status, COUNT(*) as count FROM users GROUP BY status', (err, statusStats) => {
                        if (err) {
                            console.error('Error getting status statistics:', err);
                            return res.status(500).json({
                                success: false,
                                error: 'Failed to get user statistics'
                            });
                        }
                        
                        stats.byStatus = statusStats;
                        
                        // Recent registrations (last 30 days)
                        db.get(`
                            SELECT COUNT(*) as count 
                            FROM users 
                            WHERE createdAt >= datetime('now', '-30 days')
                        `, (err, recentResult) => {
                            if (err) {
                                console.error('Error getting recent registrations:', err);
                                return res.status(500).json({
                                    success: false,
                                    error: 'Failed to get user statistics'
                                });
                            }
                            
                            stats.recentRegistrations = recentResult.count;
                            
                            // Active users (logged in last 7 days)
                            db.get(`
                                SELECT COUNT(*) as count 
                                FROM users 
                                WHERE lastLoginAt >= datetime('now', '-7 days')
                            `, (err, activeResult) => {
                                if (err) {
                                    console.error('Error getting active users:', err);
                                    return res.status(500).json({
                                        success: false,
                                        error: 'Failed to get user statistics'
                                    });
                                }
                                
                                stats.activeUsers = activeResult.count;
                                
                                res.json({
                                    success: true,
                                    data: stats
                                });
                            });
                        });
                    });
                });
            });
        } catch (error) {
            console.error('Get user stats error:', error);
            res.status(500).json({
                success: false,
                error: 'Internal server error'
            });
        }
    }
    
    // Reset user password (admin function)
    static async resetUserPassword(req, res) {
        try {
            const { id } = req.params;
            const { newPassword } = req.body;
            
            if (!newPassword || newPassword.length < 6) {
                return res.status(400).json({
                    success: false,
                    error: 'New password must be at least 6 characters long'
                });
            }
            
            // Check if user exists
            db.get('SELECT id FROM users WHERE id = ?', [id], async (err, user) => {
                if (err) {
                    console.error('Database error:', err);
                    return res.status(500).json({
                        success: false,
                        error: 'Database error'
                    });
                }
                
                if (!user) {
                    return res.status(404).json({
                        success: false,
                        error: 'User not found'
                    });
                }
                
                // Hash new password
                const saltRounds = 10;
                const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
                
                // Update password
                db.run('UPDATE users SET password = ?, updatedAt = CURRENT_TIMESTAMP WHERE id = ?', 
                    [hashedPassword, id], function(err) {
                    if (err) {
                        console.error('Error resetting password:', err);
                        return res.status(500).json({
                            success: false,
                            error: 'Failed to reset password'
                        });
                    }
                    
                    res.json({
                        success: true,
                        message: 'Password reset successfully'
                    });
                });
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