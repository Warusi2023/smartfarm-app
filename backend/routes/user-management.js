const express = require('express');
const router = express.Router();

// Mock user database (in production, this would be a real database)
let users = [
    {
        id: 1,
        email: 'admin@smartfarm.com',
        firstName: 'Admin',
        lastName: 'User',
        role: 'admin',
        phone: '+1234567890',
        permissions: ['user_management', 'farm_management', 'all'],
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
        status: 'active',
        farms: []
    },
    {
        id: 2,
        email: 'manager@smartfarm.com',
        firstName: 'Farm',
        lastName: 'Manager',
        role: 'manager',
        phone: '+1234567891',
        permissions: ['farm_management', 'task_management'],
        createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
        lastLogin: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
        status: 'active',
        farms: [1, 2]
    },
    {
        id: 3,
        email: 'farmer@smartfarm.com',
        firstName: 'John',
        lastName: 'Farmer',
        role: 'farmer',
        phone: '+1234567892',
        permissions: ['basic_operations'],
        createdAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
        lastLogin: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
        status: 'active',
        farms: [1]
    }
];

let nextUserId = 4;

// Authentication middleware
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ success: false, error: 'Access token required' });
    }

    // In production, verify JWT token here
    // For now, we'll accept any token as valid
    req.user = { id: 1, role: 'admin' }; // Mock authenticated user
    next();
};

// Admin authorization middleware
const requireAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ success: false, error: 'Admin access required' });
    }
    next();
};

// GET /api/user-management/users - Get all users
router.get('/users', authenticateToken, (req, res) => {
    try {
        // Filter out sensitive data
        const safeUsers = users.map(user => ({
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
            phone: user.phone,
            permissions: user.permissions,
            createdAt: user.createdAt,
            lastLogin: user.lastLogin,
            status: user.status,
            farms: user.farms
        }));

        res.json({
            success: true,
            data: safeUsers,
            total: safeUsers.length
        });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
});

// POST /api/user-management/users - Create new user
router.post('/users', authenticateToken, requireAdmin, (req, res) => {
    try {
        const { email, password, firstName, lastName, role, phone, permissions } = req.body;

        // Validation
        if (!email || !password || !firstName || !lastName || !role) {
            return res.status(400).json({
                success: false,
                error: 'Missing required fields: email, password, firstName, lastName, role'
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
            id: nextUserId++,
            email,
            password, // In production, hash this password
            firstName,
            lastName,
            role: role.toLowerCase(),
            phone: phone || '',
            permissions: permissions || [],
            createdAt: new Date().toISOString(),
            lastLogin: null,
            status: 'active',
            farms: []
        };

        users.push(newUser);

        // Return user without password
        const { password: _, ...safeUser } = newUser;

        res.status(201).json({
            success: true,
            data: safeUser,
            message: 'User created successfully'
        });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
});

// GET /api/user-management/users/:id - Get user by ID
router.get('/users/:id', authenticateToken, (req, res) => {
    try {
        const userId = parseInt(req.params.id);
        const user = users.find(u => u.id === userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                error: 'User not found'
            });
        }

        // Return user without password
        const { password, ...safeUser } = user;

        res.json({
            success: true,
            data: safeUser
        });
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
});

// PUT /api/user-management/users/:id - Update user
router.put('/users/:id', authenticateToken, (req, res) => {
    try {
        const userId = parseInt(req.params.id);
        const userIndex = users.findIndex(u => u.id === userId);

        if (userIndex === -1) {
            return res.status(404).json({
                success: false,
                error: 'User not found'
            });
        }

        // Check if user is trying to update themselves or is admin
        if (req.user.id !== userId && req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                error: 'You can only update your own profile'
            });
        }

        const { firstName, lastName, role, phone, permissions, status } = req.body;

        // Update user fields
        if (firstName) users[userIndex].firstName = firstName;
        if (lastName) users[userIndex].lastName = lastName;
        if (role && req.user.role === 'admin') users[userIndex].role = role.toLowerCase();
        if (phone !== undefined) users[userIndex].phone = phone;
        if (permissions && req.user.role === 'admin') users[userIndex].permissions = permissions;
        if (status && req.user.role === 'admin') users[userIndex].status = status;

        // Return updated user without password
        const { password, ...safeUser } = users[userIndex];

        res.json({
            success: true,
            data: safeUser,
            message: 'User updated successfully'
        });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
});

// PUT /api/user-management/users/:id/password - Change user password
router.put('/users/:id/password', authenticateToken, (req, res) => {
    try {
        const userId = parseInt(req.params.id);
        const userIndex = users.findIndex(u => u.id === userId);

        if (userIndex === -1) {
            return res.status(404).json({
                success: false,
                error: 'User not found'
            });
        }

        // Check if user is changing their own password or is admin
        if (req.user.id !== userId && req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                error: 'You can only change your own password'
            });
        }

        const { currentPassword, newPassword } = req.body;

        if (!newPassword) {
            return res.status(400).json({
                success: false,
                error: 'New password is required'
            });
        }

        // Password validation
        if (newPassword.length < 8) {
            return res.status(400).json({
                success: false,
                error: 'Password must be at least 8 characters long'
            });
        }

        // In production, verify current password and hash new password
        // For now, we'll just update it
        users[userIndex].password = newPassword;

        res.json({
            success: true,
            message: 'Password updated successfully'
        });
    } catch (error) {
        console.error('Error updating password:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
});

// DELETE /api/user-management/users/:id - Delete user (Admin only)
router.delete('/users/:id', authenticateToken, requireAdmin, (req, res) => {
    try {
        const userId = parseInt(req.params.id);
        const userIndex = users.findIndex(u => u.id === userId);

        if (userIndex === -1) {
            return res.status(404).json({
                success: false,
                error: 'User not found'
            });
        }

        // Prevent deleting yourself
        if (req.user.id === userId) {
            return res.status(400).json({
                success: false,
                error: 'You cannot delete your own account'
            });
        }

        // Remove user
        const deletedUser = users.splice(userIndex, 1)[0];

        res.json({
            success: true,
            message: 'User deleted successfully',
            data: {
                id: deletedUser.id,
                email: deletedUser.email,
                name: `${deletedUser.firstName} ${deletedUser.lastName}`
            }
        });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
});

// GET /api/user-management/farms - Get all farms
router.get('/farms', authenticateToken, (req, res) => {
    try {
        // Mock farms data
        const farms = [
            { id: 1, name: 'Main Farm', location: 'California, USA', size: '100 acres', status: 'active' },
            { id: 2, name: 'Secondary Farm', location: 'Texas, USA', size: '50 acres', status: 'active' },
            { id: 3, name: 'Research Farm', location: 'Oregon, USA', size: '25 acres', status: 'maintenance' }
        ];

        res.json({
            success: true,
            data: farms
        });
    } catch (error) {
        console.error('Error fetching farms:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
});

// POST /api/user-management/users/:id/assign-farm - Assign user to farm
router.post('/users/:id/assign-farm', authenticateToken, requireAdmin, (req, res) => {
    try {
        const userId = parseInt(req.params.id);
        const userIndex = users.findIndex(u => u.id === userId);

        if (userIndex === -1) {
            return res.status(404).json({
                success: false,
                error: 'User not found'
            });
        }

        const { farmId, role } = req.body;

        if (!farmId) {
            return res.status(400).json({
                success: false,
                error: 'Farm ID is required'
            });
        }

        // Add farm to user's farms list if not already assigned
        if (!users[userIndex].farms.includes(farmId)) {
            users[userIndex].farms.push(farmId);
        }

        res.json({
            success: true,
            message: 'User assigned to farm successfully',
            data: {
                userId,
                farmId,
                role: role || 'farmer'
            }
        });
    } catch (error) {
        console.error('Error assigning user to farm:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
});

module.exports = router;
