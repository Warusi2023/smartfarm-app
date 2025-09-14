// Email configuration for SmartFarm
const nodemailer = require('nodemailer');

class EmailService {
  constructor() {
    this.transporter = null;
    this.isConfigured = false;
    this.initializeTransporter();
  }

  initializeTransporter() {
    const EMAIL_SERVICE = process.env.EMAIL_SERVICE || 'gmail';
    const EMAIL_USER = process.env.EMAIL_USER || '';
    const EMAIL_PASS = process.env.EMAIL_PASS || '';
    const SMTP_HOST = process.env.SMTP_HOST || 'smtp.gmail.com';
    const SMTP_PORT = parseInt(process.env.SMTP_PORT) || 587;
    const SMTP_SECURE = process.env.SMTP_SECURE === 'true';

    // Check if email credentials are provided
    if (!EMAIL_USER || !EMAIL_PASS) {
      console.log('⚠️ Email service not configured - EMAIL_USER and EMAIL_PASS required');
      return;
    }

    try {
      // Create transporter based on service
      if (EMAIL_SERVICE === 'gmail' || EMAIL_SERVICE === 'smtp') {
        this.transporter = nodemailer.createTransporter({
          host: SMTP_HOST,
          port: SMTP_PORT,
          secure: SMTP_SECURE, // true for 465, false for other ports
          auth: {
            user: EMAIL_USER,
            pass: EMAIL_PASS
          },
          tls: {
            rejectUnauthorized: false
          }
        });
      } else {
        // Use service-specific configuration
        this.transporter = nodemailer.createTransporter({
          service: EMAIL_SERVICE,
          auth: {
            user: EMAIL_USER,
            pass: EMAIL_PASS
          }
        });
      }

      this.isConfigured = true;
      console.log(`✅ Email service configured: ${EMAIL_USER}`);
    } catch (error) {
      console.error('❌ Failed to configure email service:', error);
    }
  }

  async verifyConnection() {
    if (!this.isConfigured || !this.transporter) {
      return false;
    }

    try {
      await this.transporter.verify();
      console.log('✅ Email service connection verified');
      return true;
    } catch (error) {
      console.error('❌ Email service connection failed:', error);
      return false;
    }
  }

  async sendVerificationEmail(email, token) {
    if (!this.isConfigured) {
      console.log('⚠️ Email service not configured - skipping verification email');
      return { success: false, message: 'Email service not configured' };
    }

    const EMAIL_FROM = process.env.EMAIL_FROM || 'noreply@smartfarm-app.com';
    const FRONTEND_URL = process.env.FRONTEND_URL || 'https://dulcet-sawine-92d6a8.netlify.app';
    const verificationUrl = `${FRONTEND_URL}/verify-email?token=${token}`;

    const mailOptions = {
      from: `SmartFarm <${EMAIL_FROM}>`,
      to: email,
      subject: 'Verify Your SmartFarm Account',
      html: this.generateVerificationEmailHTML(verificationUrl),
      text: this.generateVerificationEmailText(verificationUrl)
    };

    try {
      const result = await this.transporter.sendMail(mailOptions);
      console.log(`✅ Verification email sent to: ${email}`);
      return { 
        success: true, 
        messageId: result.messageId,
        email: email
      };
    } catch (error) {
      console.error('❌ Failed to send verification email:', error);
      return { 
        success: false, 
        error: error.message,
        email: email
      };
    }
  }

  generateVerificationEmailHTML(verificationUrl) {
    const currentYear = new Date().getFullYear();
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Verify Your SmartFarm Account</title>
        <style>
          @media only screen and (max-width: 600px) {
            .container { width: 100% !important; }
            .header { padding: 20px 15px !important; }
            .content { padding: 20px 15px !important; }
            .button { padding: 12px 24px !important; font-size: 16px !important; }
          }
        </style>
      </head>
      <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, Arial, sans-serif; background-color: #f8f9fa; line-height: 1.6;">
        <div style="max-width: 600px; margin: 0 auto; background-color: white; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #28a745, #20c997); padding: 40px 30px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 32px; font-weight: bold; text-shadow: 0 2px 4px rgba(0,0,0,0.3);">🌱 SmartFarm</h1>
            <p style="color: white; margin: 10px 0 0 0; font-size: 18px; opacity: 0.9; font-weight: 300;">Intelligent Farm Management Platform</p>
          </div>
          
          <!-- Main Content -->
          <div style="padding: 40px 30px;">
            <h2 style="color: #28a745; margin-bottom: 25px; font-size: 24px;">Welcome to SmartFarm!</h2>
            
            <p style="color: #333; font-size: 16px; line-height: 1.6; margin-bottom: 25px;">
              Thank you for registering with SmartFarm! To complete your registration and start managing your farm with our advanced AI-powered platform, please verify your email address.
            </p>
            
            <!-- Verification Button -->
            <div style="text-align: center; margin: 35px 0;">
              <a href="${verificationUrl}" 
                 style="background: #28a745; color: white; padding: 16px 32px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block; font-size: 18px; transition: background-color 0.3s;">
                ✅ Verify My Email Address
              </a>
            </div>
            
            <!-- Alternative Link -->
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 25px 0;">
              <p style="color: #666; font-size: 14px; line-height: 1.5; margin: 0;">
                <strong>Having trouble with the button?</strong><br>
                Copy and paste this link into your browser:
              </p>
              <p style="margin: 10px 0 0 0;">
                <a href="${verificationUrl}" style="color: #28a745; word-break: break-all; font-size: 12px;">${verificationUrl}</a>
              </p>
            </div>
            
            <!-- Features Section -->
            <div style="margin: 35px 0; padding: 25px; background: #e9ecef; border-radius: 8px;">
              <h3 style="color: #28a745; margin-top: 0; margin-bottom: 20px; font-size: 20px;">🚀 What's Next?</h3>
              <ul style="color: #333; line-height: 1.8; margin: 0; padding-left: 20px;">
                <li><strong>Real-time Analytics:</strong> Monitor your farm with live data and insights</li>
                <li><strong>AI Predictions:</strong> Get crop health and yield forecasts powered by machine learning</li>
                <li><strong>IoT Integration:</strong> Connect smart sensors and devices for automated monitoring</li>
                <li><strong>Blockchain Traceability:</strong> Track your products from farm to table with complete transparency</li>
                <li><strong>Smart Irrigation:</strong> Optimize water usage with intelligent irrigation systems</li>
                <li><strong>Crop Management:</strong> Plan, plant, and harvest with data-driven decisions</li>
              </ul>
            </div>
            
            <!-- Security Notice -->
            <div style="background: #fff3cd; border: 1px solid #ffeaa7; padding: 20px; border-radius: 8px; margin: 25px 0;">
              <p style="color: #856404; font-size: 14px; line-height: 1.5; margin: 0;">
                <strong>🔒 Security Notice:</strong> This verification link will expire in 24 hours for your security. 
                If you didn't create a SmartFarm account, please ignore this email and your email address will not be used.
              </p>
            </div>
          </div>
          
          <!-- Footer -->
          <div style="background: #343a40; padding: 30px; text-align: center; border-radius: 0 0 8px 8px;">
            <p style="color: #fff; margin: 0 0 10px 0; font-size: 16px; font-weight: bold;">SmartFarm</p>
            <p style="color: #adb5bd; margin: 0; font-size: 14px;">
              Revolutionary Agricultural Technology for the Modern Farmer
            </p>
            <div style="margin: 20px 0;">
              <a href="mailto:support@smartfarm-app.com" style="color: #20c997; text-decoration: none; margin: 0 15px; font-size: 14px;">📧 Support</a>
              <a href="https://smartfarm-app.com" style="color: #20c997; text-decoration: none; margin: 0 15px; font-size: 14px;">🌐 Website</a>
              <a href="https://docs.smartfarm-app.com" style="color: #20c997; text-decoration: none; margin: 0 15px; font-size: 14px;">📚 Docs</a>
            </div>
            <p style="color: #6c757d; margin: 15px 0 0 0; font-size: 12px;">
              © ${currentYear} SmartFarm. All rights reserved.
            </p>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  generateVerificationEmailText(verificationUrl) {
    return `
SmartFarm - Verify Your Account

Welcome to SmartFarm!

Thank you for registering with SmartFarm! To complete your registration and start managing your farm with our advanced AI-powered platform, please verify your email address.

Click the link below to verify your account:
${verificationUrl}

What's Next?
- Real-time Analytics: Monitor your farm with live data
- AI Predictions: Get crop health and yield forecasts
- IoT Integration: Connect smart sensors and devices
- Blockchain Traceability: Track your products from farm to table
- Smart Irrigation: Optimize water usage
- Crop Management: Plan, plant, and harvest with data-driven decisions

Security Notice: This verification link will expire in 24 hours. If you didn't create a SmartFarm account, please ignore this email.

© 2024 SmartFarm - Revolutionary Agricultural Technology
    `;
  }

  async sendWelcomeEmail(email, username) {
    if (!this.isConfigured) {
      console.log('⚠️ Email service not configured - skipping welcome email');
      return { success: false, message: 'Email service not configured' };
    }

    const EMAIL_FROM = process.env.EMAIL_FROM || 'noreply@smartfarm-app.com';

    const mailOptions = {
      from: `SmartFarm <${EMAIL_FROM}>`,
      to: email,
      subject: 'Welcome to SmartFarm - Your Account is Verified!',
      html: this.generateWelcomeEmailHTML(username),
      text: this.generateWelcomeEmailText(username)
    };

    try {
      const result = await this.transporter.sendMail(mailOptions);
      console.log(`✅ Welcome email sent to: ${email}`);
      return { 
        success: true, 
        messageId: result.messageId,
        email: email
      };
    } catch (error) {
      console.error('❌ Failed to send welcome email:', error);
      return { 
        success: false, 
        error: error.message,
        email: email
      };
    }
  }

  generateWelcomeEmailHTML(username) {
    const currentYear = new Date().getFullYear();
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to SmartFarm!</title>
        <style>
          @media only screen and (max-width: 600px) {
            .container { width: 100% !important; }
            .header { padding: 20px 15px !important; }
            .content { padding: 20px 15px !important; }
            .button { padding: 12px 24px !important; font-size: 16px !important; }
          }
        </style>
      </head>
      <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, Arial, sans-serif; background-color: #f8f9fa; line-height: 1.6;">
        <div style="max-width: 600px; margin: 0 auto; background-color: white; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #28a745, #20c997); padding: 40px 30px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 32px; font-weight: bold; text-shadow: 0 2px 4px rgba(0,0,0,0.3);">🌱 SmartFarm</h1>
            <p style="color: white; margin: 10px 0 0 0; font-size: 18px; opacity: 0.9; font-weight: 300;">Welcome to the Future of Farming!</p>
          </div>
          
          <!-- Main Content -->
          <div style="padding: 40px 30px;">
            <h2 style="color: #28a745; margin-bottom: 25px; font-size: 24px;">🎉 Congratulations, ${username}!</h2>
            
            <p style="color: #333; font-size: 16px; line-height: 1.6; margin-bottom: 25px;">
              Your SmartFarm account has been successfully verified! You now have access to our comprehensive farm management platform.
            </p>
            
            <!-- Getting Started Button -->
            <div style="text-align: center; margin: 35px 0;">
              <a href="${process.env.FRONTEND_URL || 'https://dulcet-sawine-92d6a8.netlify.app'}/dashboard" 
                 style="background: #28a745; color: white; padding: 16px 32px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block; font-size: 18px;">
                🚀 Access Your Dashboard
              </a>
            </div>
            
            <!-- Quick Start Guide -->
            <div style="margin: 35px 0; padding: 25px; background: #e9ecef; border-radius: 8px;">
              <h3 style="color: #28a745; margin-top: 0; margin-bottom: 20px; font-size: 20px;">📋 Quick Start Guide</h3>
              <ol style="color: #333; line-height: 1.8; margin: 0; padding-left: 20px;">
                <li><strong>Set up your farm profile:</strong> Add your farm details and location</li>
                <li><strong>Connect IoT devices:</strong> Link sensors and monitoring equipment</li>
                <li><strong>Configure alerts:</strong> Set up notifications for important events</li>
                <li><strong>Explore analytics:</strong> View real-time data and insights</li>
                <li><strong>Plan your crops:</strong> Use AI recommendations for optimal planting</li>
              </ol>
            </div>
          </div>
          
          <!-- Footer -->
          <div style="background: #343a40; padding: 30px; text-align: center; border-radius: 0 0 8px 8px;">
            <p style="color: #fff; margin: 0 0 10px 0; font-size: 16px; font-weight: bold;">SmartFarm</p>
            <p style="color: #adb5bd; margin: 0 0 20px 0; font-size: 14px;">
              Need help? Contact our support team at support@smartfarm-app.com
            </p>
            <div style="margin: 20px 0;">
              <a href="mailto:support@smartfarm-app.com" style="color: #20c997; text-decoration: none; margin: 0 15px; font-size: 14px;">📧 Support</a>
              <a href="https://smartfarm-app.com" style="color: #20c997; text-decoration: none; margin: 0 15px; font-size: 14px;">🌐 Website</a>
              <a href="https://docs.smartfarm-app.com" style="color: #20c997; text-decoration: none; margin: 0 15px; font-size: 14px;">📚 Docs</a>
            </div>
            <p style="color: #6c757d; margin: 15px 0 0 0; font-size: 12px;">
              © ${currentYear} SmartFarm. All rights reserved.
            </p>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  generateWelcomeEmailText(username) {
    return `
Welcome to SmartFarm, ${username}!

Your SmartFarm account has been successfully verified! You now have access to our comprehensive farm management platform.

Quick Start Guide:
1. Set up your farm profile: Add your farm details and location
2. Connect IoT devices: Link sensors and monitoring equipment
3. Configure alerts: Set up notifications for important events
4. Explore analytics: View real-time data and insights
5. Plan your crops: Use AI recommendations for optimal planting

Access your dashboard: ${process.env.FRONTEND_URL || 'https://dulcet-sawine-92d6a8.netlify.app'}/dashboard

Need help? Contact our support team at support@smartfarm-app.com

© 2024 SmartFarm - Revolutionary Agricultural Technology
    `;
  }
}

module.exports = EmailService;
