// Simple authentication middleware for demo purposes
// In production, this should use proper JWT authentication

function authenticate(req, res, next) {
    // For demo purposes, we'll use a simple user ID
    // In production, this should verify JWT tokens
    req.user = {
        id: 1, // Default user ID for demo
        username: 'demo_user'
    };
    next();
}

module.exports = { authenticate };

