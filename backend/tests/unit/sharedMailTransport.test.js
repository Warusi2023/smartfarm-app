/**
 * Confirmation + password-reset share one mail transport (mailTransport.js).
 */

describe('shared mail transport for verification and reset', () => {
    const originalEnv = { ...process.env };

    afterEach(() => {
        process.env = { ...originalEnv };
        jest.resetModules();
    });

    it('verification and password-reset both call the same shared transporter.sendMail', async () => {
        process.env.PUBLIC_FRONTEND_URL = 'https://www.smartfarm-app.com';
        process.env.EMAIL_SERVICE = 'gmail';
        process.env.EMAIL_USER = 'sfarm663@gmail.com';
        process.env.EMAIL_PASS = 'abcd efgh ijkl mnop';
        process.env.EMAIL_FROM = 'SmartFarm <sfarm663@gmail.com>';

        jest.resetModules();
        const { normalizeAppPassword, getMailConfig } = require('../../utils/mailTransport');
        expect(normalizeAppPassword('abcd efgh ijkl mnop')).toBe('abcdefghijklmnop');
        expect(getMailConfig().pass).toBe('abcdefghijklmnop');

        const {
            EmailService,
            getEmailService,
            __resetEmailServiceForTests,
            __setSharedMailTransportForTests
        } = require('../../utils/emailService');

        __resetEmailServiceForTests();
        const sendMail = jest.fn(async () => ({ messageId: 'shared-mid-1' }));
        __setSharedMailTransportForTests({
            transporter: { sendMail, verify: jest.fn() },
            from: 'SmartFarm <sfarm663@gmail.com>',
            provider: 'gmail',
            user: 'sfarm663@gmail.com',
            isConfigured: true
        });

        const serviceA = getEmailService();
        const serviceB = new EmailService();
        expect(serviceA.transporter).toBe(serviceB.transporter);

        await serviceA.sendVerificationEmail('user@example.com', 'verify-token', 'Ada');
        await serviceB.sendPasswordResetEmail('user@example.com', 'reset-token', 'Ada');

        expect(sendMail).toHaveBeenCalledTimes(2);
        expect(sendMail.mock.calls[0][0]).toEqual(
            expect.objectContaining({
                from: 'SmartFarm <sfarm663@gmail.com>',
                to: 'user@example.com',
                subject: expect.stringMatching(/verify/i)
            })
        );
        expect(sendMail.mock.calls[1][0]).toEqual(
            expect.objectContaining({
                from: 'SmartFarm <sfarm663@gmail.com>',
                to: 'user@example.com',
                subject: expect.stringMatching(/reset/i)
            })
        );
    });

    it('getEmailService returns a process-wide singleton', () => {
        process.env.PUBLIC_FRONTEND_URL = 'https://www.smartfarm-app.com';
        jest.resetModules();
        const {
            getEmailService,
            __resetEmailServiceForTests,
            __setSharedMailTransportForTests
        } = require('../../utils/emailService');
        __resetEmailServiceForTests();
        __setSharedMailTransportForTests({
            transporter: { sendMail: jest.fn() },
            from: 'SmartFarm <test@example.com>',
            provider: 'test',
            isConfigured: true
        });
        expect(getEmailService()).toBe(getEmailService());
    });
});
