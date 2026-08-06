/**
 * Forgot-password email dispatch must invoke the mailer for known users.
 */

describe('forgotPassword email dispatch', () => {
    function buildAuthRoutes({ user, emailService }) {
        const AuthRoutes = require('../../routes/auth');
        // Avoid constructing full AuthRoutes (needs JWT/DB). Exercise handler in isolation.
        const handlerCtx = {
            dbHelpers: {
                findUserByEmail: jest.fn(async () => user),
                updateUser: jest.fn(async () => ({ id: user && user.id }))
            },
            authService: {
                generateResetToken: () => 'test-reset-token-abc'
            },
            emailService
        };
        const { forgotPassword } = require('../../routes/auth').prototype
            ? { forgotPassword: AuthRoutes.prototype.forgotPassword }
            : {};
        return { handlerCtx, forgotPassword: AuthRoutes.prototype.forgotPassword };
    }

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

    it('calls sendPasswordResetEmail with the user email when the account exists', async () => {
        const sendPasswordResetEmail = jest.fn(async (email, token) => ({
            messageId: 'msg-1',
            to: email,
            token
        }));
        const { handlerCtx, forgotPassword } = buildAuthRoutes({
            user: { id: 'u-1', email: 'sfarm663@gmail.com', firstName: 'Smoke' },
            emailService: { sendPasswordResetEmail }
        });

        const req = { body: { email: 'sfarm663@gmail.com' } };
        const res = mockRes();
        await forgotPassword.call(handlerCtx, req, res);

        expect(sendPasswordResetEmail).toHaveBeenCalledTimes(1);
        expect(sendPasswordResetEmail).toHaveBeenCalledWith(
            'sfarm663@gmail.com',
            'test-reset-token-abc',
            'Smoke'
        );
        expect(handlerCtx.dbHelpers.updateUser).toHaveBeenCalledWith(
            'u-1',
            expect.objectContaining({ resetToken: 'test-reset-token-abc' })
        );
        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
    });

    it('returns EMAIL_ERROR when the mailer throws instead of a false success', async () => {
        const sendPasswordResetEmail = jest.fn(async () => {
            const err = new Error('SMTP rejected');
            err.code = 'EMAIL_SEND_FAILED';
            throw err;
        });
        const { handlerCtx, forgotPassword } = buildAuthRoutes({
            user: { id: 'u-1', email: 'sfarm663@gmail.com' },
            emailService: { sendPasswordResetEmail }
        });

        const req = { body: { email: 'sfarm663@gmail.com' } };
        const res = mockRes();
        await forgotPassword.call(handlerCtx, req, res);

        expect(res.statusCode).toBe(500);
        expect(res.body.code).toBe('EMAIL_ERROR');
        expect(res.body.success).toBe(false);
    });

    it('does not call the mailer for unknown emails (privacy 200)', async () => {
        const sendPasswordResetEmail = jest.fn();
        const { handlerCtx, forgotPassword } = buildAuthRoutes({
            user: null,
            emailService: { sendPasswordResetEmail }
        });

        const req = { body: { email: 'missing@example.com' } };
        const res = mockRes();
        await forgotPassword.call(handlerCtx, req, res);

        expect(sendPasswordResetEmail).not.toHaveBeenCalled();
        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
    });
});

describe('EmailService.sendPasswordResetEmail', () => {
    const originalEnv = { ...process.env };

    afterEach(() => {
        process.env = { ...originalEnv };
        jest.resetModules();
    });

    it('throws when transporter is missing instead of silently returning false', async () => {
        process.env.PUBLIC_FRONTEND_URL = 'https://www.smartfarm-app.com';
        process.env.EMAIL_USER = '';
        process.env.EMAIL_PASS = '';
        const EmailService = require('../../utils/emailService');
        const service = new EmailService();
        service.transporter = null;
        service.isConfigured = false;

        await expect(service.sendPasswordResetEmail('a@b.com', 'tok')).rejects.toMatchObject({
            code: 'EMAIL_NOT_CONFIGURED'
        });
    });

    it('invokes transporter.sendMail with the recipient address', async () => {
        process.env.PUBLIC_FRONTEND_URL = 'https://www.smartfarm-app.com';
        const EmailService = require('../../utils/emailService');
        const service = new EmailService();
        service.transporter = {
            sendMail: jest.fn(async () => ({ messageId: 'mid-99' }))
        };
        service.isConfigured = false;

        const result = await service.sendPasswordResetEmail('user@example.com', 'reset-tok');
        expect(service.transporter.sendMail).toHaveBeenCalledWith(
            expect.objectContaining({
                to: 'user@example.com',
                subject: expect.stringMatching(/reset/i)
            })
        );
        expect(result).toEqual({ messageId: 'mid-99', to: 'user@example.com' });
    });
});
