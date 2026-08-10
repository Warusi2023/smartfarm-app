/**
 * Resend verification: shared EmailService path, enumeration-safe unknown emails,
 * EMAIL_ERROR honesty, and per-email/IP rate limiting.
 */

const {
    checkResendVerificationLimit,
    recordResendVerificationAttempt,
    __resetResendVerificationRateLimitForTests
} = require('../../utils/resendVerificationRateLimit');

describe('resendVerification endpoint', () => {
    beforeEach(() => {
        __resetResendVerificationRateLimitForTests();
    });

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

    function buildCtx({ user, sendVerificationEmail }) {
        const AuthRoutes = require('../../routes/auth');
        return {
            handlerCtx: {
                dbHelpers: {
                    findUserByEmail: jest.fn(async () => user),
                    updateUser: jest.fn(async () => user)
                },
                emailService: {
                    generateVerificationToken: () => 'verify-token-test',
                    sendVerificationEmail:
                        sendVerificationEmail || jest.fn(async () => true)
                }
            },
            resendVerification: AuthRoutes.prototype.resendVerification
        };
    }

    it('sends via shared EmailService.sendVerificationEmail for unverified users', async () => {
        const sendVerificationEmail = jest.fn(async () => true);
        const user = {
            id: 'u-1',
            email: 'unverified@example.com',
            isVerified: false
        };
        const { handlerCtx, resendVerification } = buildCtx({ user, sendVerificationEmail });
        const req = {
            body: { email: 'unverified@example.com' },
            ip: '203.0.113.10',
            headers: {}
        };
        const res = mockRes();

        await resendVerification.call(handlerCtx, req, res);

        expect(sendVerificationEmail).toHaveBeenCalledWith(
            'unverified@example.com',
            'verify-token-test'
        );
        expect(handlerCtx.dbHelpers.updateUser).toHaveBeenCalledWith(
            'u-1',
            expect.objectContaining({
                verificationToken: 'verify-token-test'
            })
        );
        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.code).toBe('VERIFICATION_EMAIL_SENT');
        expect(res.body.message).toMatch(/sent/i);
    });

    it('returns generic success for unknown email without calling the mailer', async () => {
        const sendVerificationEmail = jest.fn();
        const { handlerCtx, resendVerification } = buildCtx({
            user: null,
            sendVerificationEmail
        });
        const req = { body: { email: 'nobody@example.com' }, ip: '203.0.113.11', headers: {} };
        const res = mockRes();

        await resendVerification.call(handlerCtx, req, res);

        expect(sendVerificationEmail).not.toHaveBeenCalled();
        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.code).toBe('VERIFICATION_EMAIL_SENT');
        expect(res.body.message).toMatch(/if an account/i);
    });

    it('returns ALREADY_VERIFIED without sending mail', async () => {
        const sendVerificationEmail = jest.fn();
        const { handlerCtx, resendVerification } = buildCtx({
            user: { id: 'u-2', email: 'ok@example.com', isVerified: true },
            sendVerificationEmail
        });
        const req = { body: { email: 'ok@example.com' }, ip: '203.0.113.12', headers: {} };
        const res = mockRes();

        await resendVerification.call(handlerCtx, req, res);

        expect(sendVerificationEmail).not.toHaveBeenCalled();
        expect(res.body.code).toBe('ALREADY_VERIFIED');
        expect(res.body.success).toBe(true);
    });

    it('returns EMAIL_ERROR when delivery fails for a known unverified user', async () => {
        const sendVerificationEmail = jest.fn(async () => {
            const err = new Error('SMTP rejected');
            err.code = 'EAUTH';
            throw err;
        });
        const { handlerCtx, resendVerification } = buildCtx({
            user: { id: 'u-3', email: 'fail@example.com', isVerified: false },
            sendVerificationEmail
        });
        const req = { body: { email: 'fail@example.com' }, ip: '203.0.113.13', headers: {} };
        const res = mockRes();

        await resendVerification.call(handlerCtx, req, res);

        expect(res.statusCode).toBe(500);
        expect(res.body.code).toBe('EMAIL_ERROR');
        expect(res.body.success).toBe(false);
        expect(res.body.message).toMatch(/could not send/i);
        expect(JSON.stringify(res.body)).not.toMatch(/EAUTH|SMTP|App Password/i);
    });

    it('rate limits repeated resend attempts for the same email', async () => {
        const sendVerificationEmail = jest.fn(async () => true);
        const user = { id: 'u-4', email: 'limit@example.com', isVerified: false };
        const { handlerCtx, resendVerification } = buildCtx({ user, sendVerificationEmail });

        for (let i = 0; i < 3; i++) {
            const res = mockRes();
            await resendVerification.call(
                handlerCtx,
                { body: { email: 'limit@example.com' }, ip: `198.51.100.${i}`, headers: {} },
                res
            );
            expect(res.statusCode).toBe(200);
        }

        const blocked = mockRes();
        await resendVerification.call(
            handlerCtx,
            { body: { email: 'limit@example.com' }, ip: '198.51.100.99', headers: {} },
            blocked
        );

        expect(blocked.statusCode).toBe(429);
        expect(blocked.body.code).toBe('RATE_LIMITED');
        expect(typeof blocked.body.retryAfter).toBe('number');
        expect(sendVerificationEmail).toHaveBeenCalledTimes(3);
    });
});

describe('resendVerificationRateLimit helper', () => {
    beforeEach(() => {
        __resetResendVerificationRateLimitForTests();
    });

    it('enforces per-IP limits independently of email', () => {
        const now = Date.now();
        for (let i = 0; i < 10; i++) {
            const check = checkResendVerificationLimit({
                email: `user${i}@example.com`,
                ip: '192.0.2.50',
                now,
                maxPerEmail: 3,
                maxPerIp: 10
            });
            expect(check.allowed).toBe(true);
            recordResendVerificationAttempt({
                email: `user${i}@example.com`,
                ip: '192.0.2.50',
                now
            });
        }

        const blocked = checkResendVerificationLimit({
            email: 'another@example.com',
            ip: '192.0.2.50',
            now,
            maxPerEmail: 3,
            maxPerIp: 10
        });
        expect(blocked.allowed).toBe(false);
        expect(blocked.scope).toBe('ip');
    });
});
