const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// Database connection
const dbPath = path.join(__dirname, '../database/smartfarm.db');
const db = new sqlite3.Database(dbPath);

// JWT Secret (in production, use environment variable)
const JWT_SECRET = process.env.JWT_SECRET || 'smartfarm-secret-key-2024';

// User registration
router.post('/register', async (req, res) => {
    try {
        const { email, password, firstName, lastName, role = 'farmer' } = req.body;

        // Validation
        if (!email || !password || !firstName || !lastName) {
            return res.status(400).json({
                success: false,
                error: 'All fields are required'
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                error: 'Password must be at least 6 characters long'
            });
        }

        // Check if user already exists
        db.get('SELECT id FROM users WHERE email = ?', [email], async (err, row) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({
                    success: false,
                    error: 'Database error'
                });
            }

            if (row) {
                return res.status(409).json({
                    success: false,
                    error: 'User already exists'
                });
            }

            // Hash password
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            // Create user
            const userId = uuidv4();
            const query = `
                INSERT INTO users (id, email, password, firstName, lastName, role, createdAt, updatedAt)
                VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
            `;

            db.run(query, [userId, email, hashedPassword, firstName, lastName, role], function(err) {
                if (err) {
                    console.error('Error creating user:', err);
                    return res.status(500).json({
                        success: false,
                        error: 'Failed to create user'
                    });
                }

                // Generate JWT token
                const token = jwt.sign(
                    { userId, email, role },
                    JWT_SECRET,
                    { expiresIn: '24h' }
                );

                res.status(201).json({
                    success: true,
                    message: 'User registered successfully',
                    data: {
                        id: userId,
                        email,
                        firstName,
                        lastName,
                        role
                    },
                    token
                });
            });
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
});

// User login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                error: 'Email and password are required'
            });
        }

        // Find user
        db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({
                    success: false,
                    error: 'Database error'
                });
            }

            if (!user) {
                return res.status(401).json({
                    success: false,
                    error: 'Invalid credentials'
                });
            }

            // Check password
            const isValidPassword = await bcrypt.compare(password, user.password);
            if (!isValidPassword) {
                return res.status(401).json({
                    success: false,
                    error: 'Invalid credentials'
                });
            }

            // Update last login
            db.run('UPDATE users SET lastLoginAt = CURRENT_TIMESTAMP WHERE id = ?', [user.id]);

            // Generate JWT token
            const token = jwt.sign(
                { userId: user.id, email: user.email, role: user.role },
                JWT_SECRET,
                { expiresIn: '24h' }
            );

            res.json({
                success: true,
                message: 'Login successful',
                data: {
                    id: user.id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    role: user.role
                },
                token
            });
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
});

// Get current user profile
router.get('/profile', authenticateToken, (req, res) => {
    const userId = req.user.userId;

    db.get('SELECT id, email, firstName, lastName, role, createdAt, lastLoginAt FROM users WHERE id = ?', 
        [userId], (err, user) => {
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

        res.json({
            success: true,
            data: user
        });
    });
});

// Update user profile
router.put('/profile', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.userId;
        const { firstName, lastName, email } = req.body;

        // Validation
        if (!firstName || !lastName || !email) {
            return res.status(400).json({
                success: false,
                error: 'All fields are required'
            });
        }

        // Check if email is already taken by another user
        db.get('SELECT id FROM users WHERE email = ? AND id != ?', [email, userId], (err, row) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({
                    success: false,
                    error: 'Database error'
                });
            }

            if (row) {
                return res.status(409).json({
                    success: false,
                    error: 'Email already taken'
                });
            }

            // Update user
            const query = `
                UPDATE users 
                SET firstName = ?, lastName = ?, email = ?, updatedAt = CURRENT_TIMESTAMP
                WHERE id = ?
            `;

            db.run(query, [firstName, lastName, email, userId], function(err) {
                if (err) {
                    console.error('Error updating user:', err);
                    return res.status(500).json({
                        success: false,
                        error: 'Failed to update user'
                    });
                }

                res.json({
                    success: true,
                    message: 'Profile updated successfully',
                    data: {
                        id: userId,
                        email,
                        firstName,
                        lastName
                    }
                });
            });
        });
    } catch (error) {
        console.error('Profile update error:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
});

// Change password
router.put('/change-password', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.userId;
        const { currentPassword, newPassword } = req.body;

        // Validation
        if (!currentPassword || !newPassword) {
            return res.status(400).json({
                success: false,
                error: 'Current and new password are required'
            });
        }

        if (newPassword.length < 6) {
            return res.status(400).json({
                success: false,
                error: 'New password must be at least 6 characters long'
            });
        }

        // Get current user
        db.get('SELECT password FROM users WHERE id = ?', [userId], async (err, user) => {
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

            // Verify current password
            const isValidPassword = await bcrypt.compare(currentPassword, user.password);
            if (!isValidPassword) {
                return res.status(401).json({
                    success: false,
                    error: 'Current password is incorrect'
                });
            }

            // Hash new password
            const saltRounds = 10;
            const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);

            // Update password
            db.run('UPDATE users SET password = ?, updatedAt = CURRENT_TIMESTAMP WHERE id = ?', 
                [hashedNewPassword, userId], function(err) {
                if (err) {
                    console.error('Error updating password:', err);
                    return res.status(500).json({
                        success: false,
                        error: 'Failed to update password'
                    });
                }

                res.json({
                    success: true,
                    message: 'Password changed successfully'
                });
            });
        });
    } catch (error) {
        console.error('Password change error:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
});

// JWT Authentication Middleware
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
        return res.status(401).json({
            success: false,
            error: 'Access token required'
        });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({
                success: false,
                error: 'Invalid or expired token'
            });
        }
        req.user = user;
        next();
    });
}

// Role-based authorization middleware
function authorizeRole(roles) {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                error: 'Authentication required'
            });
        }

        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                error: 'Insufficient permissions'
            });
        }

        next();
    };
}

module.exports = { router, authenticateToken, authorizeRole }; 