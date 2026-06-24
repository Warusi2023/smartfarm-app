/**
 * Shared user profile payload for GET /api/auth/me and GET /api/auth/profile.
 */

function formatUserProfile(user) {
    if (!user) {
        return null;
    }
    return {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        country: user.country,
        isVerified: user.isVerified,
        role: user.role || 'user'
    };
}

module.exports = { formatUserProfile };
