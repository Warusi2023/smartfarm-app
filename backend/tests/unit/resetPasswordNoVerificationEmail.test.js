/**
 * Password reset must update the password and allow login without sending
 * a registration-style verification email.
 */

describe('resetPassword does not trigger verification email', () => {
    function mockRes() {
        const res = {
            statusCode: 200,
            body: null,
            status(code) {
                this.statusCode = code;
                return this;
            },
            json(payload) {
                this.body = payload;
                return this;
            }
        };
        return res;
    }

    it('updates password and marks verified without calling sendVerificationEmail', async () => {
        const AuthRoutes = require('../../routes/auth');
        const sendVerificationEmail = jest.fn();
        const sendPasswordResetEmail = jest.fn();
        const updateUser = jest.fn(async () => ({ id: 'u-reset-1' }));
        const user = {
            id: 'u-reset-1',
            email: 'sfarm663@gmail.com',
            isVerified: false,
            resetExpires: new Date(Date.now() + 60 * 60 * 1000).toISOString()
        };

        const handlerCtx = {
            dbHelpers: {
                findUserByResetToken: jest.fn(async () => user),
                updateUser
            },
            authService: {
                validatePassword: () => ({ isValid: true }),
                hashPassword: jest.fn(async (pw) => `hashed:${pw}`)
            },
            emailService: { sendVerificationEmail, sendPasswordResetEmail }
        };

        const req = { body: { token: 'reset-tok', newPassword: 'NewStrongPass123!' } };
        const res = mockRes();
        await AuthRoutes.prototype.resetPassword.call(handlerCtx, req, res);

        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.message).toMatch(/log in/i);
        expect(sendVerificationEmail).not.toHaveBeenCalled();
        expect(sendPasswordResetEmail).not.toHaveBeenCalled();
        expect(updateUser).toHaveBeenCalledWith(
            'u-reset-1',
            expect.objectContaining({
                passwordHash: 'hashed:NewStrongPass123!',
                resetToken: null,
                resetExpires: null,
                isVerified: true,
                verificationToken: null,
                verificationExpires: null
            })
        );
    });

    it('allows login after reset for a verified account without sending verification email', async () => {
        const AuthRoutes = require('../../routes/auth');
        const sendVerificationEmail = jest.fn();
        const verifiedUser = {
            id: 'u-reset-1',
            email: 'sfarm663@gmail.com',
            passwordHash: 'hashed:NewStrongPass123!',
            isVerified: true,
            isActive: true,
            firstName: 'Smoke',
            lastName: 'User',
            role: 'user'
        };

        const SubscriptionService = require('../../services/subscriptionService');
        const originalGet = SubscriptionService.prototype.getUserAccessStatus;
        SubscriptionService.prototype.getUserAccessStatus = jest.fn(async () => ({ valid: true }));

        const handlerCtx = {
            dbHelpers: {
                findUserByEmail: jest.fn(async () => verifiedUser),
                createUserSession: jest.fn(async () => undefined)
            },
            authService: {
                verifyPassword: jest.fn(async () => true),
                generateToken: jest.fn(() => 'access-token'),
                generateResetToken: jest.fn(() => 'refresh-token'),
                hashToken: jest.fn(() => 'refresh-hash'),
                getRefreshExpiryDate: jest.fn(() => new Date(Date.now() + 86400000))
            },
            emailService: { sendVerificationEmail },
            dbPool: {}
        };

        const req = { body: { email: 'sfarm663@gmail.com', password: 'NewStrongPass123!' } };
        const res = mockRes();
        try {
            await AuthRoutes.prototype.login.call(handlerCtx, req, res);
        } finally {
            SubscriptionService.prototype.getUserAccessStatus = originalGet;
        }

        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.data.token).toBe('access-token');
        expect(sendVerificationEmail).not.toHaveBeenCalled();
    });
});
