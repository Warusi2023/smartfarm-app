/**
 * Mock User Management API Service
 * This provides offline functionality for user management when the backend is not available
 */

class MockUserAPI {
    constructor() {
        this.users = [
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
                createdAt: new Date(Date.now() - 86400000).toISOString(),
                lastLogin: new Date(Date.now() - 3600000).toISOString(),
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
                createdAt: new Date(Date.now() - 172800000).toISOString(),
                lastLogin: new Date(Date.now() - 7200000).toISOString(),
                status: 'active',
                farms: [1]
            }
        ];
        
        this.nextUserId = 4;
        this.currentUser = this.users[0]; // Default to admin
    }

    // Simulate API delay
    async delay(ms = 500) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Mock authentication
    async authenticate() {
        await this.delay(200);
        return {
            success: true,
            data: {
                user: this.currentUser,
                token: `mock_token_${this.currentUser.id}_${Date.now()}`
            }
        };
    }

    // Mock get current user profile
    async getCurrentUser() {
        await this.delay(200);
        return {
            success: true,
            data: this.currentUser
        };
    }

    // Mock get all users
    async getUsers() {
        await this.delay(300);
        return {
            success: true,
            data: this.users.map(user => {
                const { password, ...safeUser } = user;
                return safeUser;
            }),
            total: this.users.length
        };
    }

    // Mock create user
    async createUser(userData) {
        await this.delay(400);
        
        // Validation
        if (!userData.email || !userData.password || !userData.firstName || !userData.lastName || !userData.role) {
            throw new Error('Missing required fields: email, password, firstName, lastName, role');
        }

        // Check if user already exists
        const existingUser = this.users.find(user => user.email === userData.email);
        if (existingUser) {
            throw new Error('User with this email already exists');
        }

        // Password validation
        if (userData.password.length < 8) {
            throw new Error('Password must be at least 8 characters long');
        }

        // Create new user
        const newUser = {
            id: this.nextUserId++,
            email: userData.email,
            password: userData.password, // In production, this would be hashed
            firstName: userData.firstName,
            lastName: userData.lastName,
            role: userData.role.toLowerCase(),
            phone: userData.phone || '',
            permissions: userData.permissions || [],
            createdAt: new Date().toISOString(),
            lastLogin: null,
            status: 'active',
            farms: []
        };

        this.users.push(newUser);

        // Return user without password
        const { password, ...safeUser } = newUser;

        return {
            success: true,
            data: safeUser,
            message: 'User created successfully'
        };
    }

    // Mock update user
    async updateUser(userId, userData) {
        await this.delay(400);
        
        const userIndex = this.users.findIndex(u => u.id === userId);
        if (userIndex === -1) {
            throw new Error('User not found');
        }

        // Update user fields
        if (userData.firstName) this.users[userIndex].firstName = userData.firstName;
        if (userData.lastName) this.users[userIndex].lastName = userData.lastName;
        if (userData.role) this.users[userIndex].role = userData.role.toLowerCase();
        if (userData.phone !== undefined) this.users[userIndex].phone = userData.phone;
        if (userData.permissions) this.users[userIndex].permissions = userData.permissions;
        if (userData.status) this.users[userIndex].status = userData.status;

        // Return updated user without password
        const { password, ...safeUser } = this.users[userIndex];

        return {
            success: true,
            data: safeUser,
            message: 'User updated successfully'
        };
    }

    // Mock change password
    async changePassword(userId, currentPassword, newPassword) {
        await this.delay(400);
        
        const userIndex = this.users.findIndex(u => u.id === userId);
        if (userIndex === -1) {
            throw new Error('User not found');
        }

        // Verify current password
        if (this.users[userIndex].password !== currentPassword) {
            throw new Error('Current password is incorrect');
        }

        // Password validation
        if (newPassword.length < 8) {
            throw new Error('Password must be at least 8 characters long');
        }

        // Update password
        this.users[userIndex].password = newPassword;

        return {
            success: true,
            message: 'Password changed successfully'
        };
    }

    // Mock delete user
    async deleteUser(userId) {
        await this.delay(400);
        
        const userIndex = this.users.findIndex(u => u.id === userId);
        if (userIndex === -1) {
            throw new Error('User not found');
        }

        // Prevent deleting yourself
        if (this.currentUser.id === userId) {
            throw new Error('You cannot delete your own account');
        }

        // Remove user
        const deletedUser = this.users.splice(userIndex, 1)[0];

        return {
            success: true,
            message: 'User deleted successfully',
            data: {
                id: deletedUser.id,
                email: deletedUser.email,
                name: `${deletedUser.firstName} ${deletedUser.lastName}`
            }
        };
    }
}

// Export for use in user management
window.MockUserAPI = MockUserAPI;
