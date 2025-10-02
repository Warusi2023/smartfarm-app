const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User, Farm } = require('../database/models');
const { authenticateToken, requireRole } = require('../middleware/auth');
const { validateUserManagement } = require('../middleware/validation');
const logger = require('../lib/logger');

// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET || 'smartfarm-secret-key-2024';

/**
 * USER MANAGEMENT SYSTEM
 * Handles user roles, groups, premium tiers, and approvals
 */

// Get all users (Admin only)
router.get('/users', authenticateToken, requireRole(['admin']), async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: { exclude: ['password'] },
            include: [{
                model: Farm,
                as: 'ownedFarms',
                attributes: ['id', 'name', 'status']
            }],
            order: [['createdAt', 'DESC']]
        });

        logger.audit('Users list accessed', 'users', { 
            userId: req.user.id, 
            count: users.length,
            requestId: req.requestId 
        });

        res.json({
            success: true,
            data: users,
            count: users.length
        });
    } catch (error) {
        logger.error('Error fetching users', { error: error.message, requestId: req.requestId });
        res.status(500).json({
            success: false,
            error: 'Failed to fetch users'
        });
    }
});

// Get user by ID
router.get('/users/:id', authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const currentUser = req.user;

        // Users can only view their own profile unless they're admin
        if (currentUser.role !== 'admin' && currentUser.id !== id) {
            return res.status(403).json({
                success: false,
                error: 'Access denied'
            });
        }

        const user = await User.findByPk(id, {
            attributes: { exclude: ['password'] },
            include: [{
                model: Farm,
                as: 'ownedFarms',
                attributes: ['id', 'name', 'status', 'type']
            }]
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                error: 'User not found'
            });
        }

        logger.audit('User profile accessed', 'users', { 
            userId: req.user.id, 
            targetUserId: id,
            requestId: req.requestId 
        });

        res.json({
            success: true,
            data: user
        });
    } catch (error) {
        logger.error('Error fetching user', { error: error.message, requestId: req.requestId });
        res.status(500).json({
            success: false,
            error: 'Failed to fetch user'
        });
    }
});

// Create new user (Admin only)
router.post('/users', authenticateToken, requireRole(['admin']), validateUserManagement.create, async (req, res) => {
    try {
        const { email, password, firstName, lastName, role = 'farmer', phone, permissions = [] } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(409).json({
                success: false,
                error: 'User already exists'
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create user
        const user = await User.create({
            email,
            password: hashedPassword,
            firstName,
            lastName,
            role,
            phone,
            permissions,
            status: 'active'
        });

        logger.audit('User created', 'users', { 
            userId: req.user.id, 
            newUserId: user.id,
            newUserEmail: email,
            newUserRole: role,
            requestId: req.requestId 
        });

        // Return user without password
        const userResponse = user.toJSON();
        delete userResponse.password;

        res.status(201).json({
            success: true,
            data: userResponse,
            message: 'User created successfully'
        });
    } catch (error) {
        logger.error('Error creating user', { error: error.message, requestId: req.requestId });
        res.status(500).json({
            success: false,
            error: 'Failed to create user'
        });
    }
});

// Update user role/permissions (Admin only)
router.put('/users/:id/role', authenticateToken, requireRole(['admin']), validateUserManagement.updateRole, async (req, res) => {
    try {
        const { id } = req.params;
        const { role, permissions, status } = req.body;

        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({
                success: false,
                error: 'User not found'
            });
        }

        // Update user
        await user.update({
            role,
            permissions,
            status
        });

        logger.audit('User role updated', 'users', { 
            userId: req.user.id, 
            targetUserId: id,
            oldRole: user.role,
            newRole: role,
            requestId: req.requestId 
        });

        res.json({
            success: true,
            data: user,
            message: 'User role updated successfully'
        });
    } catch (error) {
        logger.error('Error updating user role', { error: error.message, requestId: req.requestId });
        res.status(500).json({
            success: false,
            error: 'Failed to update user role'
        });
    }
});

// Assign user to farm group
router.post('/users/:id/assign-farm', authenticateToken, requireRole(['admin', 'manager']), async (req, res) => {
    try {
        const { id } = req.params;
        const { farmId, role } = req.body;

        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({
                success: false,
                error: 'User not found'
            });
        }

        const farm = await Farm.findByPk(farmId);
        if (!farm) {
            return res.status(404).json({
                success: false,
                error: 'Farm not found'
            });
        }

        // Update farm manager if role is manager
        if (role === 'manager') {
            await farm.update({ managerId: id });
        }

        logger.audit('User assigned to farm', 'users', { 
            userId: req.user.id, 
            targetUserId: id,
            farmId: farmId,
            role: role,
            requestId: req.requestId 
        });

        res.json({
            success: true,
            message: 'User assigned to farm successfully'
        });
    } catch (error) {
        logger.error('Error assigning user to farm', { error: error.message, requestId: req.requestId });
        res.status(500).json({
            success: false,
            error: 'Failed to assign user to farm'
        });
    }
});

// Get farm group members
router.get('/farms/:farmId/members', authenticateToken, async (req, res) => {
    try {
        const { farmId } = req.params;
        const currentUser = req.user;

        const farm = await Farm.findByPk(farmId, {
            include: [{
                model: User,
                as: 'owner',
                attributes: { exclude: ['password'] }
            }, {
                model: User,
                as: 'manager',
                attributes: { exclude: ['password'] }
            }]
        });

        if (!farm) {
            return res.status(404).json({
                success: false,
                error: 'Farm not found'
            });
        }

        // Check if user has access to this farm
        const hasAccess = currentUser.role === 'admin' || 
                         farm.ownerId === currentUser.id || 
                         farm.managerId === currentUser.id;

        if (!hasAccess) {
            return res.status(403).json({
                success: false,
                error: 'Access denied'
            });
        }

        const members = [];
        if (farm.owner) members.push({ ...farm.owner.toJSON(), role: 'owner' });
        if (farm.manager) members.push({ ...farm.manager.toJSON(), role: 'manager' });

        logger.audit('Farm members accessed', 'farms', { 
            userId: req.user.id, 
            farmId: farmId,
            memberCount: members.length,
            requestId: req.requestId 
        });

        res.json({
            success: true,
            data: members,
            count: members.length
        });
    } catch (error) {
        logger.error('Error fetching farm members', { error: error.message, requestId: req.requestId });
        res.status(500).json({
            success: false,
            error: 'Failed to fetch farm members'
        });
    }
});

// Approve task (Admin/Manager only)
router.post('/tasks/:taskId/approve', authenticateToken, requireRole(['admin', 'manager']), async (req, res) => {
    try {
        const { taskId } = req.params;
        const { approved, notes } = req.body;

        // This would integrate with your task system
        // For now, we'll log the approval request
        logger.audit('Task approval processed', 'tasks', { 
            userId: req.user.id, 
            taskId: taskId,
            approved: approved,
            notes: notes,
            requestId: req.requestId 
        });

        res.json({
            success: true,
            message: approved ? 'Task approved successfully' : 'Task rejected',
            data: {
                taskId,
                approved,
                approvedBy: req.user.id,
                approvedAt: new Date().toISOString(),
                notes
            }
        });
    } catch (error) {
        logger.error('Error approving task', { error: error.message, requestId: req.requestId });
        res.status(500).json({
            success: false,
            error: 'Failed to process task approval'
        });
    }
});

// Get user's farms and permissions
router.get('/my-farms', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.id;

        const ownedFarms = await Farm.findAll({
            where: { ownerId: userId },
            attributes: ['id', 'name', 'status', 'type', 'location']
        });

        const managedFarms = await Farm.findAll({
            where: { managerId: userId },
            attributes: ['id', 'name', 'status', 'type', 'location']
        });

        logger.audit('User farms accessed', 'farms', { 
            userId: userId, 
            ownedCount: ownedFarms.length,
            managedCount: managedFarms.length,
            requestId: req.requestId 
        });

        res.json({
            success: true,
            data: {
                ownedFarms,
                managedFarms,
                totalFarms: ownedFarms.length + managedFarms.length,
                userRole: req.user.role,
                permissions: req.user.permissions || []
            }
        });
    } catch (error) {
        logger.error('Error fetching user farms', { error: error.message, requestId: req.requestId });
        res.status(500).json({
            success: false,
            error: 'Failed to fetch user farms'
        });
    }
});

// Update user profile
router.put('/profile', authenticateToken, validateUserManagement.updateProfile, async (req, res) => {
    try {
        const userId = req.user.id;
        const { firstName, lastName, phone, notificationPreferences } = req.body;

        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                error: 'User not found'
            });
        }

        await user.update({
            firstName,
            lastName,
            phone,
            notificationPreferences
        });

        logger.audit('User profile updated', 'users', { 
            userId: userId, 
            requestId: req.requestId 
        });

        const userResponse = user.toJSON();
        delete userResponse.password;

        res.json({
            success: true,
            data: userResponse,
            message: 'Profile updated successfully'
        });
    } catch (error) {
        logger.error('Error updating profile', { error: error.message, requestId: req.requestId });
        res.status(500).json({
            success: false,
            error: 'Failed to update profile'
        });
    }
});

// Change password
router.put('/change-password', authenticateToken, validateUserManagement.changePassword, async (req, res) => {
    try {
        const userId = req.user.id;
        const { currentPassword, newPassword } = req.body;

        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                error: 'User not found'
            });
        }

        // Verify current password
        const isValidPassword = await bcrypt.compare(currentPassword, user.password);
        if (!isValidPassword) {
            return res.status(400).json({
                success: false,
                error: 'Current password is incorrect'
            });
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(newPassword, 12);

        // Update password
        await user.update({ password: hashedPassword });

        logger.audit('Password changed', 'users', { 
            userId: userId, 
            requestId: req.requestId 
        });

        res.json({
            success: true,
            message: 'Password changed successfully'
        });
    } catch (error) {
        logger.error('Error changing password', { error: error.message, requestId: req.requestId });
        res.status(500).json({
            success: false,
            error: 'Failed to change password'
        });
    }
});

module.exports = router;
