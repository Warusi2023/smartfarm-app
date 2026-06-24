const { formatUserProfile } = require('../../utils/authProfile');

describe('formatUserProfile', () => {
    it('maps user fields for me/profile responses', () => {
        const profile = formatUserProfile({
            id: 'u1',
            email: 'farmer@example.com',
            firstName: 'Ada',
            lastName: 'Lovelace',
            phone: '+6790000000',
            country: 'FJ',
            isVerified: true,
            role: 'user'
        });
        expect(profile).toEqual({
            id: 'u1',
            email: 'farmer@example.com',
            firstName: 'Ada',
            lastName: 'Lovelace',
            phone: '+6790000000',
            country: 'FJ',
            isVerified: true,
            role: 'user'
        });
    });

    it('defaults role to user', () => {
        const profile = formatUserProfile({ id: 'u2', email: 'x@y.com' });
        expect(profile.role).toBe('user');
    });

    it('returns null for missing user', () => {
        expect(formatUserProfile(null)).toBeNull();
    });
});
