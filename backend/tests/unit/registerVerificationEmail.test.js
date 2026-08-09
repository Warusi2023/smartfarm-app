/**
 * Registration must not claim verification email delivery unless send succeeded.
 */

describe('register verification email honesty', () => {
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

    function buildRegisterCtx({ sendVerificationEmail }) {
        const AuthRoutes = require('../../routes/auth');
        return {
            handlerCtx: {
                dbHelpers: {
                    userExists: jest.fn(async () => false),
                    findUserByEmail: jest.fn(async () => null),
                    createUser: jest.fn(async () => 'user-new-1')
                },
                authService: {
                    validateEmail: () => true,
                    validatePassword: () => ({ isValid: true }),
                    hashPassword: jest.fn(async () => 'hashed')
                },
                emailService: {
                    generateVerificationToken: () => 'verify-token-xyz',
                    sendVerificationEmail
                },
                dbPool: null
            },
            register: AuthRoutes.prototype.register
        };
    }

    it('says check your email only when verification send succeeds', async () => {
        const sendVerificationEmail = jest.fn(async () => true);
        const { handlerCtx, register } = buildRegisterCtx({ sendVerificationEmail });
        const req = {
            body: {
                email: 'new@example.com',
                password: 'StrongPass123!',
                firstName: 'Pat',
                lastName: 'Farmer'
            }
        };
        const res = mockRes();
        await register.call(handlerCtx, req, res);

        expect(sendVerificationEmail).toHaveBeenCalled();
        expect(res.statusCode).toBe(201);
        expect(res.body.message).toMatch(/check your email/i);
        expect(res.body.data.verificationEmailSent).toBe(true);
        expect(res.body.code).toBeUndefined();
    });

    it('does not claim check your email when verification send fails', async () => {
        const sendVerificationEmail = jest.fn(async () => {
            const err = new Error('SMTP rejected');
            err.code = 'EAUTH';
            throw err;
        });
        const { handlerCtx, register } = buildRegisterCtx({ sendVerificationEmail });
        const req = {
            body: {
                email: 'new@example.com',
                password: 'StrongPass123!',
                firstName: 'Pat',
                lastName: 'Farmer'
            }
        };
        const res = mockRes();
        await register.call(handlerCtx, req, res);

        expect(res.statusCode).toBe(201);
        expect(res.body.code).toBe('VERIFICATION_EMAIL_FAILED');
        expect(res.body.data.verificationEmailSent).toBe(false);
        expect(res.body.message).not.toMatch(/check your email/i);
        expect(res.body.message).toMatch(/could not be sent/i);
        expect(res.body.message).toMatch(/Resend verification/i);
    });
});
