# Authentication API

## Endpoints

### Register User
`POST /api/auth/register`

Register a new user account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "StrongPass123!",
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+1234567890",
  "country": "USA"
}
```

**Response:** `201 Created`
```json
{
  "success": true,
  "data": {
    "id": "user-123",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "isVerified": false
  }
}
```

### Login
`POST /api/auth/login`

Authenticate user and receive JWT token.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "StrongPass123!"
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "token": "jwt-token-here",
    "refreshToken": "refresh-token-here",
    "user": {
      "id": "user-123",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe"
    }
  }
}
```

### Get Profile
`GET /api/auth/me`

Get current user profile. Requires authentication.

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "id": "user-123",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "phone": "+1234567890",
    "country": "USA"
  }
}
```

### Update Profile
`PUT /api/auth/profile`

Update user profile. Requires authentication.

**Request Body:**
```json
{
  "firstName": "Jane",
  "lastName": "Smith",
  "phone": "+9876543210"
}
```

### Change Password
`PUT /api/auth/password`

Change user password. Requires authentication.

**Request Body:**
```json
{
  "currentPassword": "OldPass123!",
  "newPassword": "NewPass123!"
}
```

### Forgot Password
`POST /api/auth/forgot-password`

Request password reset email.

**Request Body:**
```json
{
  "email": "user@example.com"
}
```

**Flow (production):**
1. Normalize email (`trim` + lowercase) and look up the user (`LOWER(TRIM(email))`).
2. **Unknown email:** still returns **200** with a generic message (privacy — no enumeration).
3. **Known user:** generate a reset token, persist `resetToken` / `resetExpires` (1 hour), then call `EmailService.sendPasswordResetEmail`.
4. **Email send must succeed.** Misconfigured SMTP / provider failure throws and the route returns **500** `EMAIL_ERROR` (not a false success). Logs include `userId` and `messageId` only — never passwords or full tokens.
5. Reset link is built from `PUBLIC_FRONTEND_URL` (or fallback) → `/reset-password.html?token=…`.

**Railway env required for real delivery:** `EMAIL_SERVICE`, `EMAIL_USER`, `EMAIL_PASS`, `EMAIL_FROM` (and `PUBLIC_FRONTEND_URL`). Unit coverage: `backend/tests/unit/forgotPasswordEmail.test.js`.

### Reset Password
`POST /api/auth/reset-password`

Reset password using reset token from the email link.

**Request Body:**
```json
{
  "token": "reset-token",
  "newPassword": "NewPass123!"
}
```

### Verify Email
`POST /api/auth/verify-email/:token`

Verify user email address.

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Email verified successfully"
}
```

### Resend Verification
`POST /api/auth/resend-verification`

Resend email verification.

**Request Body:**
```json
{
  "email": "user@example.com"
}
```

