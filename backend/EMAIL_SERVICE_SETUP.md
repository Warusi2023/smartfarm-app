# 📧 Email Service Configuration Guide

## Quick Setup

Run the interactive setup:

```bash
cd backend
npm run setup:env
```

This will guide you through:
1. Database configuration
2. Email service configuration
3. JWT secret generation

---

## Manual Email Configuration

### Step 1: Add to `.env` file

Edit `backend/.env` and add:

```env
# Email Configuration
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM="SmartFarm <noreply@smartfarm.com>"
PUBLIC_FRONTEND_URL=https://www.smartfarm-app.com
```

Use **one** canonical public URL for `PUBLIC_FRONTEND_URL`. Do not copy comma-separated `CORS_ORIGINS` into email link variables. Details: `EMAIL_LINKS_PRODUCTION.md`.

### Step 2: Choose Email Provider

#### Option 1: Gmail (Recommended for Testing)

**Setup Steps:**
1. Go to [Google Account](https://myaccount.google.com)
2. Security → 2-Step Verification → Turn on
3. Security → App Passwords → Generate
4. Select "Mail" and "Other (Custom name)"
5. Enter "SmartFarm"
6. Copy the 16-character password

**`.env` Configuration:**
```env
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=abcdefghijklmnop  # 16 chars, no spaces
EMAIL_FROM="SmartFarm <noreply@smartfarm.com>"
PUBLIC_FRONTEND_URL=https://www.smartfarm-app.com
```

#### Option 2: SendGrid (Production)

**Setup Steps:**
1. Sign up at [SendGrid](https://sendgrid.com)
2. Settings → API Keys → Create API Key
3. Select "Mail Send" permissions
4. Copy the API key

**`.env` Configuration:**
```env
EMAIL_SERVICE=sendgrid
EMAIL_USER=apikey
EMAIL_PASS=your-sendgrid-api-key
EMAIL_FROM="SmartFarm <noreply@smartfarm.com>"
PUBLIC_FRONTEND_URL=https://www.smartfarm-app.com
```

#### Option 3: Mailgun (Production)

**Setup Steps:**
1. Sign up at [Mailgun](https://www.mailgun.com)
2. Sending → Domain Settings → SMTP credentials
3. Copy username and password

**`.env` Configuration:**
```env
EMAIL_SERVICE=mailgun
EMAIL_USER=your-mailgun-smtp-username
EMAIL_PASS=your-mailgun-smtp-password
SMTP_HOST=smtp.mailgun.org
SMTP_PORT=587
EMAIL_FROM="SmartFarm <noreply@smartfarm.com>"
PUBLIC_FRONTEND_URL=https://www.smartfarm-app.com
```

#### Option 4: AWS SES (Production)

**Setup Steps:**
1. Go to AWS SES Console
2. SMTP Settings → Create SMTP Credentials
3. Copy username and password

**`.env` Configuration:**
```env
EMAIL_SERVICE=ses
EMAIL_USER=your-aws-ses-smtp-username
EMAIL_PASS=your-aws-ses-smtp-password
SMTP_HOST=email-smtp.us-east-1.amazonaws.com
SMTP_PORT=587
AWS_REGION=us-east-1
EMAIL_FROM="SmartFarm <noreply@smartfarm.com>"
PUBLIC_FRONTEND_URL=https://www.smartfarm-app.com
```

---

## Test Email Configuration

After configuring, test it:

```bash
cd backend
npm run test:email
```

This will:
- ✅ Check configuration
- ✅ Test email service connection
- ✅ Send a test verification email

---

## Verify It's Working

### 1. Check Server Logs

When server starts, you should see:
```
✅ Email service configured successfully
```

### 2. Test Registration

When someone registers, you should see:
```
✅ Verification email sent to user@example.com: <message-id>
```

### 3. Check Email Delivery

- Check user's inbox
- Check spam folder
- Verify email contains verification link

---

## Email Verification Flow

1. **User Registers** → System generates verification token
2. **Email Sent** → Verification email with link sent to user
3. **User Clicks Link** → Opens `verify-email.html?token=...`
4. **Token Verified** → User account activated (`is_verified = true`)
5. **Welcome Email** → Optional welcome email sent
6. **User Can Login** → Login now works

---

## Troubleshooting

### "Email service not configured"

**Solution:**
- Check `.env` file exists
- Verify `EMAIL_USER` and `EMAIL_PASS` are set
- Restart server after adding config

### "Authentication failed" (Gmail)

**Solutions:**
- Use App Password (not regular password)
- Ensure 2-Step Verification is enabled
- Remove spaces from App Password

### "Email not sending"

**Solutions:**
1. Test with `npm run test:email`
2. Check server logs for errors
3. Verify credentials are correct
4. Check spam folder
5. For Gmail: Ensure "Less secure app access" is not needed (use App Password instead)

### "Connection timeout"

**Solutions:**
- Check firewall settings
- Verify SMTP host and port
- For Railway: Ensure outbound SMTP is allowed

---

## Production Recommendations

### For Production:

1. **Use SendGrid or Mailgun** (not Gmail)
   - Higher delivery rates
   - Better analytics
   - Professional reputation

2. **Set up SPF/DKIM records**
   - Improves email deliverability
   - Reduces spam classification

3. **Monitor email delivery**
   - Track bounce rates
   - Monitor spam complaints
   - Set up alerts

4. **Use environment variables in Railway**
   - Don't commit `.env` to Git
   - Set variables in Railway dashboard
   - Use Railway's variable management

---

## Railway Production Setup

### Set Environment Variables in Railway:

1. Go to Railway Dashboard
2. Select your backend service
3. Go to "Variables" tab
4. Add:
   - `EMAIL_SERVICE`
   - `EMAIL_USER`
   - `EMAIL_PASS`
   - `EMAIL_FROM`
   - `PUBLIC_FRONTEND_URL` (single canonical origin)
   - `CORS_ORIGINS` (comma-separated — separate from email links)

### Example Railway Variables:

```
EMAIL_SERVICE=sendgrid
EMAIL_USER=apikey
EMAIL_PASS=SG.xxxxxxxxxxxxx
EMAIL_FROM=SmartFarm <noreply@smartfarm.com>
PUBLIC_FRONTEND_URL=https://www.smartfarm-app.com
CORS_ORIGINS=https://www.smartfarm-app.com,https://smartfarm-app.com,https://smartfarm-app.netlify.app
```

---

## Email Templates

The system uses HTML email templates for:
- ✅ Verification emails
- ✅ Welcome emails (after verification)
- ✅ Resend verification emails

Templates are in `backend/utils/emailService.js` and can be customized.

---

## Security Notes

⚠️ **Never commit `.env` file to Git!**

- `.env` is in `.gitignore`
- Use Railway variables for production
- Rotate email passwords regularly
- Use App Passwords (not regular passwords)

---

## Next Steps

After configuring email:

1. ✅ Test with `npm run test:email`
2. ✅ Restart server: `npm run dev`
3. ✅ Test registration flow
4. ✅ Verify emails are received
5. ✅ Check email links work correctly

---

**Need Help?** See:
- `EMAIL_VERIFICATION_TEST_GUIDE.md` - Testing guide
- `EMAIL_VERIFICATION_SETUP.md` - Full setup guide
- `LOCAL_DEVELOPMENT_SETUP.md` - Development setup

