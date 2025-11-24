# ⚡ Quick Email Service Setup

## 🚀 Fastest Way: Interactive Setup

```bash
cd backend
npm run setup:env
```

This will guide you through:
1. Database setup
2. **Email service configuration** ← Choose this!
3. JWT secret generation

---

## 📧 Gmail Setup (Recommended for Testing)

### Step 1: Get Gmail App Password

1. Go to [Google Account](https://myaccount.google.com)
2. **Security** → **2-Step Verification** → **Turn on** (if not already)
3. **Security** → **App Passwords** → **Generate**
4. Select:
   - App: **Mail**
   - Device: **Other (Custom name)**
   - Name: **SmartFarm**
5. **Generate** → Copy the 16-character password

### Step 2: Add to `.env` File

Edit `backend/.env` and add:

```env
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=abcdefghijklmnop
EMAIL_FROM="SmartFarm <noreply@smartfarm.com>"
FRONTEND_URL=https://smartfarm-app.netlify.app
```

**Important:** 
- Use the **App Password** (16 characters, no spaces)
- NOT your regular Gmail password

### Step 3: Test It

```bash
npm run test:email
```

Expected output:
```
✅ Email service is configured and ready!
✅ Test email sent successfully
```

---

## ✅ Verify It Works

### 1. Check Server Logs

When you start the server:
```bash
npm run dev
```

You should see:
```
✅ Email service configured successfully
```

### 2. Test Registration

When someone registers, you'll see:
```
✅ Verification email sent to user@example.com: <message-id>
```

### 3. Check Email

- User receives verification email
- Email contains verification link
- Link works correctly

---

## 🔧 Manual Configuration

If you prefer to edit `.env` manually:

```env
# Email Configuration
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-16-char-app-password
EMAIL_FROM="SmartFarm <noreply@smartfarm.com>"
FRONTEND_URL=https://smartfarm-app.netlify.app
```

Then test:
```bash
npm run test:email
```

---

## 🎯 What Happens When Someone Registers

1. ✅ User submits registration form
2. ✅ System creates user account (`is_verified = false`)
3. ✅ **Verification email is sent automatically**
4. ✅ User receives email with verification link
5. ✅ User clicks link → Account verified
6. ✅ User can now login

---

## 📋 Complete Example

Your `backend/.env` should look like:

```env
NODE_ENV=production
PORT=3000

DATABASE_URL=postgresql://postgres:password@host:port/railway

JWT_SECRET=your-secret-here-minimum-32-characters

EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=abcdefghijklmnop
EMAIL_FROM="SmartFarm <noreply@smartfarm.com>"
FRONTEND_URL=https://smartfarm-app.netlify.app
```

---

## 🧪 Testing Commands

```bash
# Test email configuration
npm run test:email

# Test full email verification flow
npm run test:email-verification

# Start server
npm run dev
```

---

## ❓ Troubleshooting

### "Email service not configured"
- ✅ Check `.env` file exists
- ✅ Verify `EMAIL_USER` and `EMAIL_PASS` are set
- ✅ Restart server after adding config

### "Authentication failed" (Gmail)
- ✅ Use App Password (not regular password)
- ✅ Ensure 2-Step Verification is enabled
- ✅ Remove spaces from App Password

### "Email not sending"
- ✅ Run `npm run test:email` to diagnose
- ✅ Check server logs for errors
- ✅ Verify credentials are correct

---

**Ready to configure?** Run: `npm run setup:env`

