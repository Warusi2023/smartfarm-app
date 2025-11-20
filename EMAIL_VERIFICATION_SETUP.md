# 📧 Email Verification Setup Guide

## Overview

SmartFarm now has a complete email verification system that requires users to verify their email address before they can log in. This guide will help you set up and configure email verification.

## ✅ What's Been Implemented

### Backend Features
- ✅ Email service module with Nodemailer
- ✅ Verification email sending
- ✅ Welcome email after verification
- ✅ Email verification endpoint
- ✅ Resend verification endpoint
- ✅ Login restriction for unverified accounts
- ✅ Beautiful HTML email templates

### Database Schema
- ✅ `verification_token` field added to users table
- ✅ `verification_expires` field added to users table
- ✅ `is_verified` field (already existed)

---

## 🔧 Setup Instructions

### 1. Install Dependencies

```bash
cd backend
npm install nodemailer
```

### 2. Run Database Migration

Run the migration to add verification fields to your database:

```bash
# Connect to your PostgreSQL database and run:
psql $DATABASE_URL -f backend/database/migrations/add-email-verification.sql
```

Or manually run:
```sql
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS verification_token VARCHAR(255),
ADD COLUMN IF NOT EXISTS verification_expires TIMESTAMP;

CREATE INDEX IF NOT EXISTS idx_users_verification_token ON users(verification_token);
```

### 3. Configure Email Service

#### Option A: Gmail (Recommended for Development)

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate App Password**:
   - Go to [Google Account Settings](https://myaccount.google.com/)
   - Security → 2-Step Verification → App passwords
   - Generate password for "Mail"
   - Copy the 16-character password

3. **Set Environment Variables**:
```env
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-16-character-app-password
EMAIL_FROM=SmartFarm <noreply@smartfarm.com>
FRONTEND_URL=https://your-frontend-domain.com
```

#### Option B: SendGrid (Recommended for Production)

1. **Sign up for SendGrid** at https://sendgrid.com
2. **Create API Key**:
   - Go to Settings → API Keys
   - Create API Key with "Mail Send" permissions
   - Copy the API key

3. **Set Environment Variables**:
```env
EMAIL_SERVICE=sendgrid
EMAIL_USER=apikey
EMAIL_PASS=your-sendgrid-api-key
EMAIL_FROM=SmartFarm <noreply@smartfarm.com>
FRONTEND_URL=https://your-frontend-domain.com
```

#### Option C: AWS SES

1. **Set up AWS SES** in your AWS account
2. **Create SMTP credentials**
3. **Set Environment Variables**:
```env
EMAIL_SERVICE=ses
EMAIL_USER=your-aws-smtp-username
EMAIL_PASS=your-aws-smtp-password
SMTP_HOST=email-smtp.us-east-1.amazonaws.com
SMTP_PORT=587
EMAIL_FROM=SmartFarm <noreply@smartfarm.com>
FRONTEND_URL=https://your-frontend-domain.com
```

#### Option D: Custom SMTP

```env
EMAIL_SERVICE=smtp
EMAIL_USER=your-smtp-username
EMAIL_PASS=your-smtp-password
SMTP_HOST=smtp.your-provider.com
SMTP_PORT=587
SMTP_SECURE=false
EMAIL_FROM=SmartFarm <noreply@smartfarm.com>
FRONTEND_URL=https://your-frontend-domain.com
```

---

## 🚀 How It Works

### Registration Flow

1. **User registers** → `POST /api/auth/register`
2. **System creates user** with `is_verified = false`
3. **Verification token generated** (32-character hex string)
4. **Verification email sent** with link: `${FRONTEND_URL}/verify-email.html?token=...`
5. **User clicks link** → Frontend calls `POST /api/auth/verify-email/:token`
6. **Email verified** → User can now log in

### Login Flow

1. **User attempts login** → `POST /api/auth/login`
2. **System checks** `is_verified` status
3. **If not verified** → Returns error: "Email not verified"
4. **If verified** → Login succeeds

### Resend Verification

1. **User requests resend** → `POST /api/auth/resend-verification`
2. **System generates new token**
3. **New verification email sent**

---

## 📋 API Endpoints

### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePass123!",
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+6791234567",
  "country": "Fiji"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Registration successful! Please check your email to verify your account.",
  "data": {
    "user": {
      "id": "user_123",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "isVerified": false
    },
    "emailSent": true,
    "requiresVerification": true
  }
}
```

### Verify Email
```http
POST /api/auth/verify-email/:token
```

**Response:**
```json
{
  "success": true,
  "message": "Email verified successfully! You can now log in to your account.",
  "data": {
    "userId": "user_123",
    "email": "user@example.com",
    "isVerified": true
  }
}
```

### Resend Verification
```http
POST /api/auth/resend-verification
Content-Type: application/json

{
  "email": "user@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Verification email sent successfully. Please check your inbox.",
  "data": {
    "emailSent": true
  }
}
```

### Login (Restricted)
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePass123!"
}
```

**If email not verified:**
```json
{
  "success": false,
  "error": "Email not verified. Please check your inbox or resend verification.",
  "code": "EMAIL_NOT_VERIFIED"
}
```

---

## 🎨 Frontend Integration

### Verification Page

Create a frontend page at `/verify-email.html`:

```html
<!DOCTYPE html>
<html>
<head>
    <title>Verify Email - SmartFarm</title>
</head>
<body>
    <div id="verification-status">
        <p>Verifying your email...</p>
    </div>

    <script>
        // Get token from URL
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');

        if (token) {
            // Call verification endpoint
            fetch(`/api/auth/verify-email/${token}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    document.getElementById('verification-status').innerHTML = 
                        '<h2>✅ Email Verified!</h2><p>You can now log in to your account.</p>';
                } else {
                    document.getElementById('verification-status').innerHTML = 
                        `<h2>❌ Verification Failed</h2><p>${data.error}</p>`;
                }
            })
            .catch(err => {
                document.getElementById('verification-status').innerHTML = 
                    '<h2>❌ Error</h2><p>Something went wrong. Please try again.</p>';
            });
        } else {
            document.getElementById('verification-status').innerHTML = 
                '<h2>❌ Invalid Link</h2><p>No verification token found.</p>';
        }
    </script>
</body>
</html>
```

### Resend Verification Form

```html
<form id="resend-form">
    <input type="email" id="email" placeholder="Your email" required>
    <button type="submit">Resend Verification Email</button>
</form>

<script>
document.getElementById('resend-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    
    const res = await fetch('/api/auth/resend-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
    });
    
    const data = await res.json();
    alert(data.message);
});
</script>
```

---

## 🔒 Security Features

### Token Security
- ✅ 32-character random hex tokens (cryptographically secure)
- ✅ 24-hour expiration
- ✅ Single-use tokens (cleared after verification)
- ✅ Tokens stored hashed in database (recommended)

### Email Security
- ✅ HTTPS-only links
- ✅ No sensitive data in email
- ✅ Clear expiration warnings
- ✅ Resend protection (rate limiting recommended)

### Account Security
- ✅ Login blocked until verification
- ✅ Prevents unauthorized account creation
- ✅ Email ownership verification

---

## 🧪 Testing

### Test Email Configuration

```bash
# Check if email service is configured
curl http://localhost:3000/api/health

# Should show email service status
```

### Test Registration Flow

```bash
# 1. Register user
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test123!@#",
    "firstName": "Test",
    "lastName": "User"
  }'

# 2. Check email inbox for verification link

# 3. Verify email (replace TOKEN with actual token)
curl -X POST http://localhost:3000/api/auth/verify-email/TOKEN

# 4. Try to login (should fail before verification)
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test123!@#"
  }'

# 5. After verification, login should succeed
```

---

## 🐛 Troubleshooting

### Email Not Sending

**Check:**
1. Environment variables are set correctly
2. Email service credentials are valid
3. Check server logs for errors
4. Verify SMTP port is not blocked by firewall

**Gmail Issues:**
- Make sure you're using App Password, not regular password
- Enable "Less secure app access" (not recommended) or use App Password
- Check if 2FA is enabled

**SendGrid Issues:**
- Verify API key has "Mail Send" permissions
- Check SendGrid account status
- Verify sender email is verified in SendGrid

### Verification Token Not Working

**Check:**
1. Token hasn't expired (24 hours)
2. Token matches exactly (case-sensitive)
3. User exists in database
4. Database migration was run

### Login Still Works Without Verification

**Check:**
1. Database migration was run
2. `is_verified` field exists
3. Login endpoint checks `is_verified` status
4. User was created with `is_verified = false`

---

## 📊 Environment Variables Summary

```env
# Required
EMAIL_SERVICE=gmail                    # Email service provider
EMAIL_USER=your-email@gmail.com        # Email or API key
EMAIL_PASS=your-app-password          # Password or API key
EMAIL_FROM=SmartFarm <noreply@smartfarm.com>
FRONTEND_URL=https://your-domain.com

# Optional (for custom SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
```

---

## ✅ Checklist

- [ ] Nodemailer installed
- [ ] Database migration run
- [ ] Environment variables configured
- [ ] Email service tested
- [ ] Frontend verification page created
- [ ] Resend verification form created
- [ ] Login restriction tested
- [ ] Email templates reviewed

---

## 📞 Support

If you encounter issues:
1. Check server logs for error messages
2. Verify email service configuration
3. Test email sending manually
4. Check database schema matches migration

---

**Last Updated:** January 2024  
**Status:** Production Ready

