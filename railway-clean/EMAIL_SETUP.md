# SmartFarm Email Configuration Guide

This guide explains how to set up email functionality for `noreply@smartfarm-app.com` to handle user registration and email verification.

## 📧 Email Service Overview

The SmartFarm API uses a comprehensive email service that handles:
- **User Registration Verification**: Sends verification emails to new users
- **Welcome Emails**: Sends welcome messages after successful verification
- **Professional Templates**: Beautiful HTML and plain text email templates
- **Error Handling**: Graceful fallbacks when email service is unavailable

## 🔧 Configuration

### Environment Variables

Set these environment variables for email functionality:

```bash
# Email Service Configuration
EMAIL_SERVICE=gmail                    # Email service provider (gmail, smtp, etc.)
EMAIL_USER=noreply@smartfarm-app.com  # Your email address
EMAIL_PASS=your-app-password          # App-specific password
EMAIL_FROM=noreply@smartfarm-app.com  # From address for emails

# SMTP Configuration (alternative to EMAIL_SERVICE)
SMTP_HOST=smtp.gmail.com              # SMTP server hostname
SMTP_PORT=587                         # SMTP server port
SMTP_SECURE=false                     # Use SSL/TLS (true for 465, false for 587)

# Frontend URL for email links
FRONTEND_URL=https://your-frontend-domain.com
```

### Gmail Setup (Recommended)

1. **Create a Gmail account** for `noreply@smartfarm-app.com`
2. **Enable 2-Factor Authentication**
3. **Generate an App Password**:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a password for "Mail"
   - Use this password as `EMAIL_PASS`

### Alternative Email Providers

#### Outlook/Hotmail
```bash
EMAIL_SERVICE=hotmail
EMAIL_USER=noreply@smartfarm-app.com
EMAIL_PASS=your-password
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
```

#### Custom SMTP
```bash
EMAIL_SERVICE=smtp
EMAIL_USER=noreply@smartfarm-app.com
EMAIL_PASS=your-password
SMTP_HOST=your-smtp-server.com
SMTP_PORT=587
SMTP_SECURE=false
```

## 🚀 Testing Email Functionality

### Quick Test
```bash
# Start the server
cd railway-clean
node server.js

# In another terminal, run the email test
node test-email-flow.js
```

### Manual Testing

1. **Register a new user**:
   ```bash
   curl -X POST http://localhost:3000/api/auth/register \
     -H "Content-Type: application/json" \
     -d '{
       "username": "testuser",
       "email": "your-email@example.com",
       "password": "password123",
       "firstName": "Test",
       "lastName": "User"
     }'
   ```

2. **Check your email** for the verification message from `noreply@smartfarm-app.com`

3. **Verify the email** (you'll need the token from the email):
   ```bash
   curl -X POST http://localhost:3000/api/auth/verify-email \
     -H "Content-Type: application/json" \
     -d '{"token": "your-verification-token"}'
   ```

4. **Check for welcome email** after successful verification

## 📋 Email Templates

### Verification Email Features
- **Professional Design**: Modern, responsive HTML template
- **Clear Call-to-Action**: Prominent verification button
- **Fallback Link**: Text version for accessibility
- **Security Notice**: Expiration information
- **Branding**: SmartFarm logo and colors

### Welcome Email Features
- **Personal Greeting**: Uses the user's name
- **Quick Start Guide**: Step-by-step onboarding
- **Feature Highlights**: Overview of SmartFarm capabilities
- **Dashboard Access**: Direct link to user dashboard

## 🔍 Troubleshooting

### Common Issues

#### "Email service not configured"
- **Cause**: Missing `EMAIL_USER` or `EMAIL_PASS`
- **Solution**: Set both environment variables

#### "Authentication failed"
- **Cause**: Incorrect email credentials
- **Solution**: 
  - For Gmail: Use App Password, not regular password
  - Check 2FA is enabled
  - Verify email address is correct

#### "Connection timeout"
- **Cause**: Network or SMTP server issues
- **Solution**: 
  - Check internet connection
  - Verify SMTP host and port
  - Try different SMTP settings

#### Emails not received
- **Cause**: Email might be in spam folder
- **Solution**: 
  - Check spam/junk folder
  - Add `noreply@smartfarm-app.com` to contacts
  - Check email service logs

### Debug Mode

Enable debug logging to see detailed email information:

```bash
LOG_LEVEL=debug node server.js
```

Look for these log messages:
- `✅ Email service configured: noreply@smartfarm-app.com`
- `✅ Verification email sent to: user@example.com`
- `✅ Welcome email sent to: user@example.com`

## 🔒 Security Best Practices

1. **Use App Passwords**: Never use your main email password
2. **Environment Variables**: Store credentials securely
3. **Rate Limiting**: Prevent email spam
4. **Token Expiration**: Verification tokens expire in 24 hours
5. **Input Validation**: Sanitize email addresses

## 📊 Monitoring

### Health Check
The server includes email service status in the health endpoint:

```bash
curl http://localhost:3000/api/health
```

### Email Metrics
Monitor email delivery success rates and failures in your logs.

## 🚀 Production Deployment

### Railway Deployment
1. Set environment variables in Railway dashboard
2. Deploy the application
3. Test email functionality with real domain

### Domain Setup
For production, consider:
- Using your own domain for email
- Setting up SPF/DKIM records
- Using a professional email service (SendGrid, Mailgun, etc.)

## 📞 Support

If you encounter issues:
1. Check the troubleshooting section above
2. Review server logs for error messages
3. Test with the provided test script
4. Verify email credentials and settings

---

**Email Service Status**: ✅ Configured for `noreply@smartfarm-app.com`
**Last Updated**: 2024-01-11
**Version**: 1.0.0
