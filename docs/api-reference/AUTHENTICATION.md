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

### Reset Password
`POST /api/auth/reset-password`

Reset password using reset token.

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

