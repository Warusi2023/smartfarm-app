# Swagger/OpenAPI Documentation

## Overview

SmartFarm API uses Swagger/OpenAPI for auto-generated API documentation. Documentation is generated from JSDoc comments in the code, ensuring it stays in sync with the implementation.

## Accessing Documentation

### Development
```
http://localhost:3000/api-docs
```

### Production
```
https://your-api-domain.com/api-docs
```

(Only available if `ENABLE_SWAGGER=true` is set)

## How It Works

### Auto-Generation
- Documentation is generated from JSDoc comments in route files
- Uses `swagger-jsdoc` to parse comments
- Uses `swagger-ui-express` to serve interactive UI

### Documentation Structure
- **JSDoc Comments** - Added directly above route handlers
- **Schemas** - Defined in `backend/config/swagger.js`
- **Responses** - Documented with examples
- **Authentication** - Documented with security schemes

## Adding Documentation

### Example Route Documentation

```javascript
/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Authenticate user and receive JWT token
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthToken'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.post('/login', validate('auth.login'), handler);
```

## Documented Endpoints

### Authentication
- ✅ POST /api/auth/register
- ✅ POST /api/auth/login
- ✅ POST /api/auth/logout
- ✅ POST /api/auth/refresh
- ✅ POST /api/auth/forgot-password
- ✅ POST /api/auth/reset-password
- ✅ POST /api/auth/verify-email/:token
- ✅ POST /api/auth/resend-verification
- ✅ GET /api/auth/me
- ✅ PUT /api/auth/profile
- ✅ PUT /api/auth/password
- ✅ DELETE /api/auth/account

### Health
- ✅ GET /api/health

### Other Endpoints
- ⏳ Additional endpoints can be documented by adding JSDoc comments

## Features

### Interactive Testing
- Try out endpoints directly from the UI
- Test with authentication tokens
- See request/response examples

### Schema Validation
- Request schemas match Zod validation
- Response schemas documented
- Error responses included

### Authentication
- Bearer token authentication documented
- Security schemes configured
- Token usage examples

## Configuration

### Environment Variables

```env
# Enable Swagger in production (optional)
ENABLE_SWAGGER=true

# API base URL for documentation
API_BASE_URL=https://your-api-domain.com
```

### Swagger Config

Located in `backend/config/swagger.js`:
- API information
- Server URLs
- Common schemas
- Security schemes
- Response templates

## Benefits

1. **Auto-Generated** - Documentation stays in sync with code
2. **Interactive** - Test endpoints directly from docs
3. **Complete** - Request/response schemas documented
4. **Standard** - OpenAPI 3.0 standard
5. **No Duplication** - Single source of truth

## Maintenance

- Add JSDoc comments when creating new routes
- Update comments when routes change
- Keep schemas in sync with Zod validation
- Review documentation regularly

