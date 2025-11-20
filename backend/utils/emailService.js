/**
 * Email Service for SmartFarm
 * Handles sending verification emails, welcome emails, and other transactional emails
 */

const nodemailer = require('nodemailer');
const crypto = require('crypto');

class EmailService {
    constructor() {
        this.transporter = null;
        this.fromEmail = process.env.EMAIL_FROM || 'SmartFarm <noreply@smartfarm.com>';
        this.frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
        this.isConfigured = false;
        
        this.initializeTransporter();
    }

    /**
     * Initialize email transporter based on EMAIL_SERVICE environment variable
     */
    initializeTransporter() {
        const emailService = process.env.EMAIL_SERVICE || 'gmail';
        const emailUser = process.env.EMAIL_USER;
        const emailPass = process.env.EMAIL_PASS;

        if (!emailUser || !emailPass) {
            console.warn('⚠️ Email service not configured - EMAIL_USER and EMAIL_PASS required');
            console.warn('   Email verification will be disabled until configured');
            return;
        }

        try {
            switch (emailService.toLowerCase()) {
                case 'gmail':
                    this.transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                            user: emailUser,
                            pass: emailPass
                        }
                    });
                    break;

                case 'sendgrid':
                    this.transporter = nodemailer.createTransport({
                        host: 'smtp.sendgrid.net',
                        port: 587,
                        secure: false,
                        auth: {
                            user: 'apikey',
                            pass: emailPass
                        }
                    });
                    break;

                case 'mailgun':
                    this.transporter = nodemailer.createTransport({
                        host: process.env.SMTP_HOST || 'smtp.mailgun.org',
                        port: parseInt(process.env.SMTP_PORT || '587', 10),
                        secure: false,
                        auth: {
                            user: emailUser,
                            pass: emailPass
                        }
                    });
                    break;

                case 'ses':
                case 'aws':
                    this.transporter = nodemailer.createTransport({
                        host: process.env.SMTP_HOST || `email-smtp.${process.env.AWS_REGION || 'us-east-1'}.amazonaws.com`,
                        port: parseInt(process.env.SMTP_PORT || '587', 10),
                        secure: false,
                        auth: {
                            user: emailUser,
                            pass: emailPass
                        }
                    });
                    break;

                case 'smtp':
                default:
                    this.transporter = nodemailer.createTransport({
                        host: process.env.SMTP_HOST || 'smtp.gmail.com',
                        port: parseInt(process.env.SMTP_PORT || '587', 10),
                        secure: process.env.SMTP_SECURE === 'true',
                        auth: {
                            user: emailUser,
                            pass: emailPass
                        }
                    });
                    break;
            }

            // Verify transporter configuration
            this.transporter.verify((error, success) => {
                if (error) {
                    console.error('❌ Email transporter verification failed:', error.message);
                    this.isConfigured = false;
                } else {
                    console.log('✅ Email service configured successfully');
                    this.isConfigured = true;
                }
            });

        } catch (error) {
            console.error('❌ Failed to initialize email transporter:', error.message);
            this.isConfigured = false;
        }
    }

    /**
     * Send verification email
     */
    async sendVerificationEmail(email, token, firstName = 'User') {
        if (!this.isConfigured || !this.transporter) {
            console.warn('⚠️ Email service not configured, skipping verification email');
            return false;
        }

        const verificationUrl = `${this.frontendUrl}/verify-email.html?token=${token}`;
        const emailHtml = this.getVerificationEmailTemplate(firstName, verificationUrl, token);

        try {
            const info = await this.transporter.sendMail({
                from: this.fromEmail,
                to: email,
                subject: 'Verify Your SmartFarm Account',
                html: emailHtml,
                text: `Welcome to SmartFarm! Please verify your email address by clicking this link: ${verificationUrl}`
            });

            console.log(`✅ Verification email sent to ${email}:`, info.messageId);
            return true;
        } catch (error) {
            console.error(`❌ Failed to send verification email to ${email}:`, error.message);
            return false;
        }
    }

    /**
     * Send welcome email (after verification)
     */
    async sendWelcomeEmail(email, firstName = 'User') {
        if (!this.isConfigured || !this.transporter) {
            return false;
        }

        const emailHtml = this.getWelcomeEmailTemplate(firstName);

        try {
            const info = await this.transporter.sendMail({
                from: this.fromEmail,
                to: email,
                subject: 'Welcome to SmartFarm!',
                html: emailHtml,
                text: `Welcome to SmartFarm, ${firstName}! Your account has been verified and you're ready to start managing your farm.`
            });

            console.log(`✅ Welcome email sent to ${email}:`, info.messageId);
            return true;
        } catch (error) {
            console.error(`❌ Failed to send welcome email to ${email}:`, error.message);
            return false;
        }
    }

    /**
     * Get verification email HTML template
     */
    getVerificationEmailTemplate(firstName, verificationUrl, token) {
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
            <h1>🌱 SmartFarm</h1>
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
                <div class="feature-item">✅ Complete farm management tools</div>
                <div class="feature-item">✅ Crop and livestock tracking</div>
                <div class="feature-item">✅ Weather integration and forecasts</div>
                <div class="feature-item">✅ Financial tracking and analytics</div>
                <div class="feature-item">✅ AI-powered insights and recommendations</div>
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
            <h1>🌱 Welcome to SmartFarm!</h1>
        </div>
        
        <div class="content">
            <h2>Hello ${firstName}!</h2>
            <p>Your email has been successfully verified. Your SmartFarm account is now active and ready to use!</p>
            
            <div style="text-align: center;">
                <a href="${this.frontendUrl}/dashboard.html" class="button">Go to Dashboard</a>
            </div>
            
            <div class="features">
                <h3>Get started with SmartFarm:</h3>
                <div class="feature-item">📊 <strong>Dashboard:</strong> View your farm overview and key metrics</div>
                <div class="feature-item">🌾 <strong>Crop Management:</strong> Track planting, growth, and harvest</div>
                <div class="feature-item">🐄 <strong>Livestock:</strong> Monitor animal health and breeding</div>
                <div class="feature-item">🌤️ <strong>Weather:</strong> Get real-time forecasts and alerts</div>
                <div class="feature-item">💰 <strong>Finance:</strong> Track income, expenses, and profits</div>
                <div class="feature-item">📈 <strong>Analytics:</strong> AI-powered insights and recommendations</div>
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
     * Check if email service is configured
     */
    isEmailConfigured() {
        return this.isConfigured && this.transporter !== null;
    }
}

module.exports = EmailService;

