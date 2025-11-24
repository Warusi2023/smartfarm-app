# 🧪 Email Verification System Test Guide

## Quick Test

Run the comprehensive test suite:

```bash
cd backend
npm run test:email-verification
```

## Prerequisites

### 1. Database Setup

Ensure your database has the email verification columns:

```sql
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS verification_token VARCHAR(255),
ADD COLUMN IF NOT EXISTS verification_expires TIMESTAMP,
ADD COLUMN IF NOT EXISTS is_verified BOOLEAN DEFAULT FALSE;

CREATE INDEX IF NOT EXISTS idx_users_verification_token ON users(verification_token);
```

Or run the migration:
```bash
# In DBeaver or psql, run:
backend/database/migrations/add-email-verification.sql
```

### 2. Environment Variables

Create `backend/.env` file with:

```env
# Database
DATABASE_URL=postgresql://user:password@host:port/database

# Email Service (Optional - test will skip if not configured)
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM="SmartFarm <noreply@smartfarm.com>"
FRONTEND_URL=http://localhost:5500

# API Base URL (for login tests)
API_BASE_URL=http://localhost:3000/api
```

### 3. Start Backend Server (Optional)

For full testing including login endpoints:

```bash
cd backend
npm run dev
```

The server should run on `http://localhost:3000`

## Test Coverage

The test suite covers:

1. ✅ **Database Connection** - Verifies database connectivity and schema
2. ✅ **User Registration** - Tests user creation with verification token
3. ✅ **Email Service** - Tests email sending (skips if not configured)
4. ✅ **Login Before Verification** - Verifies login is blocked for unverified users
5. ✅ **Email Verification** - Tests token verification and user activation
6. ✅ **Login After Verification** - Verifies login works after verification
7. ✅ **Resend Verification** - Tests resend verification email functionality

## Expected Output

```
🧪 Email Verification System Test Suite
==========================================

============================================================
1. Testing Database Connection
============================================================
✅ Database connected successfully
   Database time: 2024-01-15 10:30:00
   PostgreSQL version: PostgreSQL 15.0
✅ Email verification columns exist in users table
   - is_verified: boolean
   - verification_expires: timestamp without time zone
   - verification_token: character varying

============================================================
2. Testing User Registration
============================================================
✅ Test user created successfully
   User ID: 123e4567-e89b-12d3-a456-426614174000
   Email: test-1234567890@smartfarm-test.com
   Verification Token: a1b2c3d4e5f6g7h8i9j0...
   Is Verified: false

============================================================
3. Testing Email Service
============================================================
   Email Service: gmail
   Email User: your-email@gmail.com
   Attempting to send verification email...
✅ Verification email sent successfully
   Verification link: http://localhost:5500/verify-email.html?token=...

============================================================
4. Testing Login Before Verification (Should Fail)
============================================================
✅ Login correctly blocked for unverified user
   Error code: EMAIL_NOT_VERIFIED
   Message: Email not verified. Please check your inbox or resend verification.

============================================================
5. Testing Email Verification
============================================================
✅ Email verified successfully
   User ID: 123e4567-e89b-12d3-a456-426614174000
   Email: test-1234567890@smartfarm-test.com
   Is Verified: true

============================================================
6. Testing Login After Verification (Should Succeed)
============================================================
✅ Login successful after email verification
   Token received: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

============================================================
7. Testing Resend Verification
============================================================
✅ Test user created for resend verification
   Email: resend-test-1234567890@smartfarm-test.com
✅ Resend verification email endpoint works
✅ Resend test user cleaned up

============================================================
8. Cleanup
============================================================
✅ Test user cleaned up
✅ All test users cleaned up
✅ Database connection closed

============================================================
Test Summary
============================================================
✅ database: PASSED
✅ registration: PASSED
✅ emailService: PASSED
✅ loginBeforeVerification: PASSED
✅ emailVerification: PASSED
✅ loginAfterVerification: PASSED
✅ resendVerification: PASSED

============================================================
Total: 7/7 tests passed
============================================================
```

## Manual Testing

### 1. Test Registration

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "TestPassword123!",
    "firstName": "Test",
    "lastName": "User"
  }'
```

Expected: `201 Created` with `isVerified: false`

### 2. Test Login Before Verification

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "TestPassword123!"
  }'
```

Expected: `403 Forbidden` with `code: "EMAIL_NOT_VERIFIED"`

### 3. Test Email Verification

Get token from database:
```sql
SELECT verification_token FROM users WHERE email = 'test@example.com';
```

Then verify:
```bash
curl -X POST http://localhost:3000/api/auth/verify-email/YOUR_TOKEN_HERE \
  -H "Content-Type: application/json"
```

Expected: `200 OK` with success message

### 4. Test Login After Verification

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "TestPassword123!"
  }'
```

Expected: `200 OK` with JWT token

### 5. Test Resend Verification

```bash
curl -X POST http://localhost:3000/api/auth/resend-verification \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com"
  }'
```

Expected: `200 OK` with success message

## Troubleshooting

### Database Connection Failed

**Error:** `Database connection failed`

**Solutions:**
1. Check `DATABASE_URL` is set in `.env` file
2. Verify database is running and accessible
3. Check database credentials are correct
4. For Railway: Get connection string from Railway dashboard

### Email Service Not Configured

**Warning:** `Email service not configured`

**Solutions:**
1. Set `EMAIL_SERVICE`, `EMAIL_USER`, `EMAIL_PASS` in `.env`
2. For Gmail: Use App Password (not regular password)
3. Test will continue but skip email sending

### Login Tests Fail

**Error:** `Could not test login (API might not be running)`

**Solutions:**
1. Start backend server: `cd backend && npm run dev`
2. Check `API_BASE_URL` in `.env` matches server URL
3. Verify server is accessible at the URL

### Verification Token Not Found

**Error:** `Token not found or expired`

**Solutions:**
1. Check token hasn't expired (24 hour limit)
2. Verify token matches database exactly
3. Check user exists and token is correct

## Test Results Interpretation

- ✅ **All tests passed** - Email verification system is working correctly
- ⚠️ **Some tests skipped** - Check configuration (email service, API server)
- ❌ **Tests failed** - Check error messages and troubleshoot

## Next Steps

After successful testing:

1. ✅ Verify email templates look correct
2. ✅ Test email delivery in production
3. ✅ Monitor email delivery rates
4. ✅ Set up email service monitoring
5. ✅ Configure email service for production

---

**Need Help?** Check:
- `EMAIL_VERIFICATION_SETUP.md` - Setup guide
- `EMAIL_VERIFICATION_IMPLEMENTATION_SUMMARY.md` - Implementation details
- `backend/utils/emailService.js` - Email service code

