const jwt = require('jsonwebtoken');

class AuthHelper {
    static generateTestToken(userId = 'test-user-1', role = 'farmer') {
        return jwt.sign(
            { 
                id: userId, 
                role: role,
                email: 'test@example.com'
            },
            process.env.JWT_SECRET || 'test-secret-key',
            { expiresIn: '1h' }
        );
    }

    static generateAdminToken() {
        return this.generateTestToken('test-user-2', 'admin');
    }

    static generateFarmerToken() {
        return this.generateTestToken('test-user-1', 'farmer');
    }

    static getAuthHeaders(token) {
        return {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        };
    }

    static getAdminHeaders() {
        return this.getAuthHeaders(this.generateAdminToken());
    }

    static getFarmerHeaders() {
        return this.getAuthHeaders(this.generateFarmerToken());
    }
}

module.exports = AuthHelper;
