/**
 * SmartFarm transactional email service.
 *
 * Confirmation (verification) and password-reset both send through the same
 * shared nodemailer transport from mailTransport.js — one provider config,
 * one sender identity, one authenticated SMTP session factory.
 */

const crypto = require('crypto');
const { resolvePublicFrontendUrl, buildPublicFrontendUrl } = require('./frontendUrl');
const {
    getSharedMailTransport,
    __resetSharedMailTransportForTests,
    __setSharedMailTransportForTests
} = require('./mailTransport');

let emailServiceSingleton = null;

function recipientDomain(email) {
    const parts = String(email || '').split('@');
    return parts.length === 2 ? parts[1] : 'invalid';
}

class EmailService {
    /**
     * @param {{ mail?: object }|undefined} options - optional injected mail bundle for tests
     */
    constructor(options = {}) {
        this._mail = options.mail || getSharedMailTransport();
        console.log(`📧 Email links will use frontend origin: ${resolvePublicFrontendUrl()}`);
    }

    get transporter() {
        return this._mail.transporter;
    }

    set transporter(value) {
        this._mail.transporter = value;
    }

    get isConfigured() {
        return Boolean(this._mail.isConfigured);
    }

    set isConfigured(value) {
        this._mail.isConfigured = Boolean(value);
    }

    get fromEmail() {
        return this._mail.from;
    }

    getPublicFrontendOrigin() {
        return resolvePublicFrontendUrl();
    }

    /**
     * Shared send path for all transactional mail (verify, reset, invite, welcome).
     * Throws on misconfiguration or provider failure — never silently succeeds.
     *
     * @param {{ to: string, subject: string, html: string, text: string, kind?: string }} options
     * @returns {Promise<{ messageId: string, to: string }>}
     */
    async sendMail(options) {
        const { to, subject, html, text, kind = 'transactional' } = options;

        if (!this._mail.transporter) {
            const err = new Error(
                'Email transporter is not configured (set EMAIL_USER and EMAIL_PASS)'
            );
            err.code = 'EMAIL_NOT_CONFIGURED';
            throw err;
        }

        try {
            const info = await this._mail.transporter.sendMail({
                from: this._mail.from,
                to,
                subject,
                html,
                text
            });

            this._mail.isConfigured = true;
            this._mail.configError = null;
            console.log(
                `✅ Email sent kind=${kind} provider=${this._mail.provider} from=${this._mail.from} ` +
                    `toDomain=${recipientDomain(to)} messageId=${info.messageId || 'n/a'}`
            );
            return { messageId: info.messageId || '', to };
        } catch (error) {
            const category = error.code || 'EMAIL_SEND_FAILED';
            console.error(
                `❌ Email send failed kind=${kind} provider=${this._mail.provider} from=${this._mail.from} ` +
                    `toDomain=${recipientDomain(to)} code=${category} message=${error.message}`
            );
            const sendErr = new Error(`Failed to send email: ${error.message}`);
            sendErr.code = category;
            throw sendErr;
        }
    }

    /**
     * Account confirmation / verification email (registration + resend).
     * Uses the same shared transport as password reset.
     */
    async sendVerificationEmail(email, token, firstName = 'User') {
        let verificationUrl;
        try {
            verificationUrl = buildPublicFrontendUrl('/verify-email.html', { token });
        } catch (err) {
            const buildErr = new Error(`Failed to build verification link: ${err.message}`);
            buildErr.code = 'EMAIL_LINK_BUILD_FAILED';
            throw buildErr;
        }

        const emailHtml = this.getVerificationEmailTemplate(firstName, verificationUrl);
        await this.sendMail({
            to: email,
            subject: 'Verify Your SmartFarm Account',
            html: emailHtml,
            text: `Welcome to SmartFarm! Please verify your email address by clicking this link: ${verificationUrl}`,
            kind: 'verification'
        });
        return true;
    }

    /**
     * Password reset email.
     * Same transport/from as verification. Throws so /forgot-password can return EMAIL_ERROR.
     *
     * @returns {Promise<{ messageId: string, to: string }>}
     */
    async sendPasswordResetEmail(email, resetToken, firstName = 'User') {
        let resetUrl;
        try {
            resetUrl = buildPublicFrontendUrl('/reset-password.html', { token: resetToken });
        } catch (err) {
            const buildErr = new Error(`Failed to build password reset link: ${err.message}`);
            buildErr.code = 'EMAIL_LINK_BUILD_FAILED';
            throw buildErr;
        }

        const emailHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Your Password - SmartFarm</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
    <h2 style="color: #2e7d32;">Password Reset Request</h2>
    <p>Hello ${firstName},</p>
    <p>We received a request to reset your SmartFarm account password.</p>
    <p>Click the link below to set a new password:</p>
    <p>
        <a href="${resetUrl}" style="display: inline-block; padding: 12px 20px; background-color: #2e7d32; color: #fff; text-decoration: none; border-radius: 4px;">
            Reset Password
        </a>
    </p>
    <p>If the button does not work, copy and paste this URL into your browser:</p>
    <p style="word-break: break-all;">${resetUrl}</p>
    <p><strong>This link expires in 1 hour.</strong></p>
    <p>If you did not request this change, you can safely ignore this email.</p>
    <p style="font-size: 12px; color: #666;">SmartFarm Security Team</p>
</body>
</html>`;

        return this.sendMail({
            to: email,
            subject: 'Reset Your SmartFarm Password',
            html: emailHtml,
            text: `We received a request to reset your SmartFarm password. Use this link (valid for 1 hour): ${resetUrl}`,
            kind: 'password-reset'
        });
    }

    /**
     * Farm team invitation — same shared transport.
     * Returns false on failure (invite flow is best-effort).
     */
    async sendFarmInvitationEmail({
        email,
        farmName,
        role,
        inviteToken,
        invitedByName = 'A farm owner',
        isResend = false
    }) {
        let acceptUrl;
        try {
            acceptUrl = buildPublicFrontendUrl('/dashboard.html', { farmInvite: inviteToken });
        } catch (err) {
            console.error(`❌ Failed to build farm invite link: ${err.message}`);
            return false;
        }

        const roleLabel = role ? String(role).charAt(0).toUpperCase() + String(role).slice(1) : 'Member';
        const subject = isResend
            ? `Updated invitation to join ${farmName} on SmartFarm`
            : `You're invited to join ${farmName} on SmartFarm`;
        const intro = isResend
            ? `${invitedByName} refreshed your invitation to join <strong>${farmName}</strong> as <strong>${roleLabel}</strong>.`
            : `${invitedByName} invited you to join <strong>${farmName}</strong> as <strong>${roleLabel}</strong>.`;
        const emailHtml = `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><title>Farm Team Invitation</title></head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
    <h2 style="color: #2e7d32;">Farm team invitation</h2>
    <p>Hello,</p>
    <p>${intro}</p>
    <p>Log in with this email address, then accept the invitation:</p>
    <p>
        <a href="${acceptUrl}" style="display: inline-block; padding: 12px 20px; background-color: #2e7d32; color: #fff; text-decoration: none; border-radius: 4px;">
            Accept invitation
        </a>
    </p>
    <p>If the button does not work, copy and paste this URL into your browser:</p>
    <p style="word-break: break-all;">${acceptUrl}</p>
    <p><strong>This link expires in 7 days.</strong></p>
    <p style="font-size: 12px; color: #666;">SmartFarm Team</p>
</body>
</html>`;

        try {
            await this.sendMail({
                to: email,
                subject,
                html: emailHtml,
                text: `${invitedByName} invited you to join ${farmName} as ${roleLabel}. Accept (7-day link): ${acceptUrl}`,
                kind: 'farm-invite'
            });
            return true;
        } catch (error) {
            return false;
        }
    }

    /**
     * Welcome email after verification — same shared transport.
     */
    async sendWelcomeEmail(email, firstName = 'User') {
        try {
            const emailHtml = this.getWelcomeEmailTemplate(firstName);
            await this.sendMail({
                to: email,
                subject: 'Welcome to SmartFarm!',
                html: emailHtml,
                text: `Welcome to SmartFarm, ${firstName}! Your account has been verified and you're ready to start managing your farm.`,
                kind: 'welcome'
            });
            return true;
        } catch (error) {
            return false;
        }
    }

    /**
     * Get verification email HTML template
     */
    getVerificationEmailTemplate(firstName, verificationUrl) {
        return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify Your Email - SmartFarm</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f4f4f4;
        }
        .container {
            background-color: white;
            border-radius: 10px;
            padding: 30px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .header {
            background: linear-gradient(135deg, #2e7d32, #4caf50);
            color: white;
            padding: 30px;
            text-align: center;
            border-radius: 10px 10px 0 0;
            margin: -30px -30px 30px -30px;
        }
        .header h1 {
            margin: 0;
            font-size: 28px;
        }
        .content {
            margin: 30px 0;
        }
        .button {
            display: inline-block;
            padding: 15px 30px;
            background-color: #2e7d32;
            color: white;
            text-decoration: none;
            border-radius: 5px;
            margin: 20px 0;
            font-weight: bold;
            text-align: center;
        }
        .button:hover {
            background-color: #1b5e20;
        }
        .token-box {
            background-color: #f8f9fa;
            border: 1px solid #dee2e6;
            border-radius: 5px;
            padding: 15px;
            margin: 20px 0;
            font-family: monospace;
            word-break: break-all;
            font-size: 12px;
        }
        .footer {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #dee2e6;
            font-size: 12px;
            color: #6c757d;
            text-align: center;
        }
        .features {
            margin: 20px 0;
        }
        .feature-item {
            padding: 10px 0;
            border-bottom: 1px solid #e9ecef;
        }
        .feature-item:last-child {
            border-bottom: none;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>ðŸŒ± SmartFarm</h1>
            <p style="margin: 10px 0 0 0;">Verify Your Email Address</p>
        </div>
        
        <div class="content">
            <h2>Hello ${firstName}!</h2>
            <p>Thank you for registering with SmartFarm. To complete your registration and activate your account, please verify your email address by clicking the button below:</p>
            
            <div style="text-align: center;">
                <a href="${verificationUrl}" class="button">Verify My Email Address</a>
            </div>
            
            <p><strong>This verification link will expire in 24 hours.</strong></p>
            
            <p>If the button doesn't work, you can copy and paste this link into your browser:</p>
            <div class="token-box">${verificationUrl}</div>
            
            <div class="features">
                <h3>What you'll get after verification:</h3>
                <div class="feature-item">âœ… Complete farm management tools</div>
                <div class="feature-item">âœ… Crop and livestock tracking</div>
                <div class="feature-item">âœ… Weather integration and forecasts</div>
                <div class="feature-item">âœ… Financial tracking and analytics</div>
                <div class="feature-item">âœ… AI-powered insights and recommendations</div>
            </div>
            
            <p>If you didn't create an account with SmartFarm, please ignore this email.</p>
        </div>
        
        <div class="footer">
            <p>This is an automated email from SmartFarm. Please do not reply to this email.</p>
            <p>If you have questions, contact us at support@smartfarm.com</p>
            <p>&copy; ${new Date().getFullYear()} SmartFarm. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
        `;
    }

    /**
     * Get welcome email HTML template
     */
    getWelcomeEmailTemplate(firstName) {
        return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to SmartFarm</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f4f4f4;
        }
        .container {
            background-color: white;
            border-radius: 10px;
            padding: 30px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .header {
            background: linear-gradient(135deg, #2e7d32, #4caf50);
            color: white;
            padding: 30px;
            text-align: center;
            border-radius: 10px 10px 0 0;
            margin: -30px -30px 30px -30px;
        }
        .header h1 {
            margin: 0;
            font-size: 28px;
        }
        .content {
            margin: 30px 0;
        }
        .button {
            display: inline-block;
            padding: 15px 30px;
            background-color: #2e7d32;
            color: white;
            text-decoration: none;
            border-radius: 5px;
            margin: 20px 0;
            font-weight: bold;
            text-align: center;
        }
        .features {
            margin: 20px 0;
        }
        .feature-item {
            padding: 10px 0;
            border-bottom: 1px solid #e9ecef;
        }
        .footer {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #dee2e6;
            font-size: 12px;
            color: #6c757d;
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>ðŸŒ± Welcome to SmartFarm!</h1>
        </div>
        
        <div class="content">
            <h2>Hello ${firstName}!</h2>
            <p>Your email has been successfully verified. Your SmartFarm account is now active and ready to use!</p>
            
            <div style="text-align: center;">
                <a href="${buildPublicFrontendUrl('/dashboard.html')}" class="button">Go to Dashboard</a>
            </div>
            
            <div class="features">
                <h3>Get started with SmartFarm:</h3>
                <div class="feature-item">ðŸ“Š <strong>Dashboard:</strong> View your farm overview and key metrics</div>
                <div class="feature-item">ðŸŒ¾ <strong>Crop Management:</strong> Track planting, growth, and harvest</div>
                <div class="feature-item">ðŸ„ <strong>Livestock:</strong> Monitor animal health and breeding</div>
                <div class="feature-item">ðŸŒ¤ï¸ <strong>Weather:</strong> Get real-time forecasts and alerts</div>
                <div class="feature-item">ðŸ’° <strong>Finance:</strong> Track income, expenses, and profits</div>
                <div class="feature-item">ðŸ“ˆ <strong>Analytics:</strong> AI-powered insights and recommendations</div>
            </div>
            
            <p>If you have any questions or need help getting started, don't hesitate to contact our support team.</p>
        </div>
        
        <div class="footer">
            <p>Happy farming!</p>
            <p>The SmartFarm Team</p>
            <p>&copy; ${new Date().getFullYear()} SmartFarm. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
        `;
    }

    /**
     * Generate secure verification token
     */
    generateVerificationToken() {
        return crypto.randomBytes(32).toString('hex');
    }

    /**
     * Check if email service has a transport (env credentials present).
     */
    isEmailConfigured() {
        return Boolean(this._mail.transporter);
    }
}

function getEmailService() {
    if (!emailServiceSingleton) {
        emailServiceSingleton = new EmailService();
    }
    return emailServiceSingleton;
}

function __resetEmailServiceForTests() {
    emailServiceSingleton = null;
    __resetSharedMailTransportForTests();
}

module.exports = EmailService;
module.exports.EmailService = EmailService;
module.exports.getEmailService = getEmailService;
module.exports.__resetEmailServiceForTests = __resetEmailServiceForTests;
module.exports.__setSharedMailTransportForTests = __setSharedMailTransportForTests;
module.exports.__resetSharedMailTransportForTests = __resetSharedMailTransportForTests;

