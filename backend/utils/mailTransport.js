/**
 * Shared mail transport factory — single source of truth for SMTP / provider config.
 *
 * Used by verification (confirmation), password-reset, invitations, and welcome mail.
 * Do not create additional nodemailer transports elsewhere in the app.
 *
 * Railway / env (Gmail):
 *   EMAIL_SERVICE=gmail
 *   EMAIL_USER=<full Gmail address>
 *   EMAIL_PASS=<Google App Password, 16 chars; spaces stripped>
 *   EMAIL_FROM=SmartFarm <same-or-alias@gmail.com>
 *   PUBLIC_FRONTEND_URL=https://www.smartfarm-app.com
 */

const nodemailer = require('nodemailer');

let sharedState = null;

function normalizeAppPassword(raw) {
    return raw ? String(raw).replace(/\s+/g, '') : '';
}

/**
 * Read provider config from env (no secrets logged).
 * @returns {{ provider: string, user: string, pass: string, from: string, configured: boolean }}
 */
function getMailConfig() {
    const provider = String(process.env.EMAIL_SERVICE || 'gmail').toLowerCase();
    const user = String(process.env.EMAIL_USER || '').trim();
    const pass = normalizeAppPassword(process.env.EMAIL_PASS);
    const from = process.env.EMAIL_FROM || (user ? `SmartFarm <${user}>` : 'SmartFarm <noreply@smartfarm.com>');
    return {
        provider,
        user,
        pass,
        from,
        configured: Boolean(user && pass)
    };
}

function createNodemailerTransport(config) {
    const { provider, user, pass } = config;

    switch (provider) {
        case 'gmail':
            return nodemailer.createTransport({
                service: 'gmail',
                auth: { user, pass }
            });
        case 'sendgrid':
            return nodemailer.createTransport({
                host: 'smtp.sendgrid.net',
                port: 587,
                secure: false,
                auth: { user: 'apikey', pass }
            });
        case 'mailgun':
            return nodemailer.createTransport({
                host: process.env.SMTP_HOST || 'smtp.mailgun.org',
                port: parseInt(process.env.SMTP_PORT || '587', 10),
                secure: false,
                auth: { user, pass }
            });
        case 'ses':
        case 'aws':
            return nodemailer.createTransport({
                host:
                    process.env.SMTP_HOST ||
                    `email-smtp.${process.env.AWS_REGION || 'us-east-1'}.amazonaws.com`,
                port: parseInt(process.env.SMTP_PORT || '587', 10),
                secure: false,
                auth: { user, pass }
            });
        case 'smtp':
        default:
            return nodemailer.createTransport({
                host: process.env.SMTP_HOST || 'smtp.gmail.com',
                port: parseInt(process.env.SMTP_PORT || '587', 10),
                secure: process.env.SMTP_SECURE === 'true',
                auth: { user, pass }
            });
    }
}

/**
 * Returns the process-wide mail transport bundle (created once).
 * @returns {{
 *   transporter: import('nodemailer').Transporter|null,
 *   from: string,
 *   provider: string,
 *   user: string,
 *   isConfigured: boolean,
 *   configError: string|null
 * }}
 */
function getSharedMailTransport() {
    if (sharedState) {
        return sharedState;
    }

    const config = getMailConfig();

    if (!config.configured) {
        console.warn('⚠️ Email service not configured - EMAIL_USER and EMAIL_PASS required');
        console.warn('   Transactional email (verify / reset) disabled until configured');
        sharedState = {
            transporter: null,
            from: config.from,
            provider: config.provider,
            user: config.user,
            isConfigured: false,
            configError: 'EMAIL_USER and EMAIL_PASS required'
        };
        return sharedState;
    }

    try {
        const transporter = createNodemailerTransport(config);
        sharedState = {
            transporter,
            from: config.from,
            provider: config.provider,
            user: config.user,
            // Optimistic: allow sends even while async verify() is pending.
            // verify() updates isConfigured; send failures still surface to callers.
            isConfigured: true,
            configError: null
        };

        transporter.verify((error) => {
            if (!sharedState || sharedState.transporter !== transporter) {
                return;
            }
            if (error) {
                const category = error.code || 'VERIFY_FAILED';
                console.error(
                    `❌ Email transporter verification failed provider=${config.provider} ` +
                        `from=${config.from} code=${category} message=${error.message}`
                );
                // Keep transporter so send can still be attempted / report real SMTP errors.
                sharedState.isConfigured = false;
                sharedState.configError = category;
            } else {
                console.log(
                    `✅ Email service configured successfully provider=${config.provider} from=${config.from}`
                );
                sharedState.isConfigured = true;
                sharedState.configError = null;
            }
        });

        return sharedState;
    } catch (error) {
        console.error('❌ Failed to initialize email transporter:', error.message);
        sharedState = {
            transporter: null,
            from: config.from,
            provider: config.provider,
            user: config.user,
            isConfigured: false,
            configError: error.message
        };
        return sharedState;
    }
}

/** @internal test helper */
function __resetSharedMailTransportForTests() {
    sharedState = null;
}

/** @internal test helper — inject a mock transporter without env SMTP */
function __setSharedMailTransportForTests(partial) {
    sharedState = {
        transporter: partial.transporter ?? null,
        from: partial.from || 'SmartFarm <test@example.com>',
        provider: partial.provider || 'test',
        user: partial.user || 'test@example.com',
        isConfigured: partial.isConfigured !== undefined ? partial.isConfigured : Boolean(partial.transporter),
        configError: partial.configError || null
    };
    return sharedState;
}

module.exports = {
    getMailConfig,
    getSharedMailTransport,
    normalizeAppPassword,
    __resetSharedMailTransportForTests,
    __setSharedMailTransportForTests
};
