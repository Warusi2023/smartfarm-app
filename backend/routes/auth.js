const express = require('express');
const router = express.Router();

// Mock user database (in production, this would be a real database)
let users = [
    {
        id: 1,
        email: 'admin@smartfarm.com',
        password: 'admin123', // In production, this would be hashed
        firstName: 'Admin',
        lastName: 'User',
        role: 'admin',
        phone: '+1234567890',
        permissions: ['user_management', 'farm_management', 'all'],
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
        status: 'active'
    },
    {
        id: 2,
        email: 'manager@smartfarm.com',
        password: 'manager123',
        firstName: 'Farm',
        lastName: 'Manager',
        role: 'manager',
        phone: '+1234567891',
        permissions: ['farm_management', 'task_management'],
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        lastLogin: new Date(Date.now() - 3600000).toISOString(),
        status: 'active'
    },
    {
        id: 3,
        email: 'farmer@smartfarm.com',
        password: 'farmer123',
        firstName: 'John',
        lastName: 'Farmer',
        role: 'farmer',
        phone: '+1234567892',
        permissions: ['basic_operations'],
        createdAt: new Date(Date.now() - 172800000).toISOString(),
        lastLogin: new Date(Date.now() - 7200000).toISOString(),
        status: 'active'
    }
];

// POST /api/auth/login - User login
router.post('/login', (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                error: 'Email and password are required'
            });
        }

        // Find user by email
        const user = users.find(u => u.email === email && u.status === 'active');

        if (!user) {
            return res.status(401).json({
                success: false,
                error: 'Invalid email or password'
            });
        }

        // Check password (in production, compare hashed passwords)
        if (user.password !== password) {
            return res.status(401).json({
                success: false,
                error: 'Invalid email or password'
            });
        }

        // Update last login
        user.lastLogin = new Date().toISOString();

        // Generate token (in production, use JWT)
        const token = `smartfarm_token_${user.id}_${Date.now()}`;

        // Return user data without password
        const { password: _, ...safeUser } = user;

        res.json({
            success: true,
            data: {
                user: safeUser,
                token: token
            },
            message: 'Login successful'
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
});

// POST /api/auth/register - User registration
router.post('/register', (req, res) => {
    try {
        const { email, password, firstName, lastName, phone } = req.body;

        // Validation
        if (!email || !password || !firstName || !lastName) {
            return res.status(400).json({
                success: false,
                error: 'Missing required fields: email, password, firstName, lastName'
            });
        }

        // Check if user already exists
        const existingUser = users.find(user => user.email === email);
        if (existingUser) {
            return res.status(409).json({
                success: false,
                error: 'User with this email already exists'
            });
        }

        // Password validation
        if (password.length < 8) {
            return res.status(400).json({
                success: false,
                error: 'Password must be at least 8 characters long'
            });
        }

        // Create new user
        const newUser = {
            id: users.length + 1,
            email,
            password, // In production, hash this password
            firstName,
            lastName,
            role: 'farmer', // Default role
            phone: phone || '',
            permissions: ['basic_operations'],
            createdAt: new Date().toISOString(),
            lastLogin: null,
            status: 'active'
        };

        users.push(newUser);

        // Generate token
        const token = `smartfarm_token_${newUser.id}_${Date.now()}`;

        // Return user without password
        const { password: _, ...safeUser } = newUser;

        res.status(201).json({
            success: true,
            data: {
                user: safeUser,
                token: token
            },
            message: 'Registration successful'
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
});

// GET /api/auth/profile - Get current user profile
router.get('/profile', (req, res) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({
                success: false,
                error: 'Access token required'
            });
        }

        // In production, verify JWT token and extract user ID
        // For now, we'll extract user ID from our mock token
        const tokenParts = token.split('_');
        if (tokenParts.length !== 4 || tokenParts[0] !== 'smartfarm' || tokenParts[1] !== 'token') {
            return res.status(401).json({
                success: false,
                error: 'Invalid token format'
            });
        }

        const userId = parseInt(tokenParts[2]);
        const user = users.find(u => u.id === userId && u.status === 'active');

        if (!user) {
            return res.status(401).json({
                success: false,
                error: 'User not found or inactive'
            });
        }

        // Return user without password
        const { password, ...safeUser } = user;

        res.json({
            success: true,
            data: safeUser
        });
    } catch (error) {
        console.error('Profile error:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
});

// POST /api/auth/logout - User logout
router.post('/logout', (req, res) => {
    try {
        // In production, you might want to blacklist the token
        // For now, we'll just return success
        res.json({
            success: true,
            message: 'Logout successful'
        });
    } catch (error) {
        console.error('Logout error:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
});

// PUT /api/auth/change-password - Change password
router.put('/change-password', (req, res) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({
                success: false,
                error: 'Access token required'
            });
        }

        // Extract user ID from token
        const tokenParts = token.split('_');
        if (tokenParts.length !== 4 || tokenParts[0] !== 'smartfarm' || tokenParts[1] !== 'token') {
            return res.status(401).json({
                success: false,
                error: 'Invalid token format'
            });
        }

        const userId = parseInt(tokenParts[2]);
        const userIndex = users.findIndex(u => u.id === userId && u.status === 'active');

        if (userIndex === -1) {
            return res.status(401).json({
                success: false,
                error: 'User not found or inactive'
            });
        }

        const { currentPassword, newPassword } = req.body;

        if (!currentPassword || !newPassword) {
            return res.status(400).json({
                success: false,
                error: 'Current password and new password are required'
            });
        }

        // Verify current password
        if (users[userIndex].password !== currentPassword) {
            return res.status(401).json({
                success: false,
                error: 'Current password is incorrect'
            });
        }

        // Password validation
        if (newPassword.length < 8) {
            return res.status(400).json({
                success: false,
                error: 'Password must be at least 8 characters long'
            });
        }

        // Update password
        users[userIndex].password = newPassword;

        res.json({
            success: true,
            message: 'Password changed successfully'
        });
    } catch (error) {
        console.error('Change password error:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
});

module.exports = router;
