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
4. **Email send must succeed.** Misconfigured SMTP / provider failure throws and the route returns **500** `EMAIL_ERROR` (not a false success). Logs include `userId`, provider, `from`, recipient domain, and `messageId` — never passwords, app passwords, reset tokens, or full reset URLs.
5. Reset link is built from `PUBLIC_FRONTEND_URL` (or fallback) → `/reset-password.html?token=…`.

**Shared mail transport:** Confirmation (`sendVerificationEmail`) and password-reset (`sendPasswordResetEmail`) both send through `backend/utils/mailTransport.js` → one nodemailer transporter, one `EMAIL_*` config, one `EMAIL_FROM` sender. Auth routes use `getEmailService()` singleton. See `backend/EMAIL_SERVICE_SETUP.md`.

**Registration / confirmation honesty:** After account creation, verification email is sent via the shared transport. The API only says “Please check your email…” when send **succeeded** (`verificationEmailSent: true`). If send fails, response is still **201** (account exists) with `code: "VERIFICATION_EMAIL_FAILED"` and an actionable message to use **Resend verification** — it does **not** silently claim inbox delivery.

**Railway env required for real delivery:**
| Variable | Notes |
|----------|--------|
| `EMAIL_SERVICE` | `gmail` (or `sendgrid` / `mailgun` / `smtp`) |
| `EMAIL_USER` | Full Gmail address when using Gmail |
| `EMAIL_PASS` | Google **App Password** (16 chars; spaces stripped automatically). Not the Google account login password. Requires 2-Step Verification. |
| `EMAIL_FROM` | e.g. `SmartFarm <sfarm663@gmail.com>` |
| `PUBLIC_FRONTEND_URL` | Single origin, e.g. `https://www.smartfarm-app.com` |

Unit coverage: `forgotPasswordEmail.test.js`, `sharedMailTransport.test.js`, `registerVerificationEmail.test.js`.

### Post-deploy operator checklist (email)

1. Set Railway Backend `EMAIL_PASS` to a **newly generated** Google Gmail [App Password](https://support.google.com/mail/answer/185833?hl=en) (2-Step Verification required). Never commit the secret.
2. Redeploy Railway Backend (or wait for auto-redeploy after variable change).
3. Confirm logs show `Email service configured successfully provider=… from=…` (no `535 BadCredentials` / `EAUTH`).
4. Confirm a **verification** email arrives (register or resend-verification for smoke account).
5. Confirm **forgot-password** returns **200** (not `EMAIL_ERROR`) and the reset email arrives.
6. Complete reset → log in with Remember-me → confirm refresh **200**, then protected API calls **200**.

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

**Behavior:** Completing reset via the emailed link proves mailbox ownership. The account is marked **verified** (`isVerified: true`) and verification tokens are cleared. **No verification email is sent** as part of password reset — registration / resend-verification remain separate flows. The user can log in immediately with the new password.

Unit coverage: `backend/tests/unit/resetPasswordNoVerificationEmail.test.js`.

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

