const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const { authenticateToken, authorizeRole } = require('./auth');

// Apply authentication middleware to all routes
router.use(authenticateToken);

// Get all users (admin only)
router.get('/', authorizeRole(['admin']), UserController.getUsers);

// Get user by ID (admin or own profile)
router.get('/:id', (req, res, next) => {
    // Allow users to access their own profile or admins to access any profile
    if (req.user.role === 'admin' || req.user.userId === req.params.id) {
        next();
    } else {
        res.status(403).json({
            success: false,
            error: 'Insufficient permissions'
        });
    }
}, UserController.getUserById);

// Create new user (admin only)
router.post('/', authorizeRole(['admin']), UserController.createUser);

// Update user (admin or own profile)
router.put('/:id', (req, res, next) => {
    // Allow users to update their own profile or admins to update any profile
    if (req.user.role === 'admin' || req.user.userId === req.params.id) {
        next();
    } else {
        res.status(403).json({
            success: false,
            error: 'Insufficient permissions'
        });
    }
}, UserController.updateUser);

// Delete user (admin only)
router.delete('/:id', authorizeRole(['admin']), UserController.deleteUser);

// Get user statistics (admin only)
router.get('/stats/overview', authorizeRole(['admin']), UserController.getUserStats);

// Reset user password (admin only)
router.put('/:id/reset-password', authorizeRole(['admin']), UserController.resetUserPassword);

module.exports = router; 