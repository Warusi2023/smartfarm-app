# SmartFarm Backend API Documentation

## Overview

The SmartFarm Backend API is a RESTful service built with Node.js, Express, and SQLite. It provides comprehensive farm management functionality including user authentication, farm operations, livestock tracking, crop management, financial records, and advanced analytics.

## Base URL

```
http://localhost:3000/api
```

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

### Token Expiry
- JWT tokens expire after 24 hours
- Refresh tokens are not currently implemented

## Response Format

All API responses follow a consistent format:

```json
{
  "success": true|false,
  "data": {...},
  "message": "Optional message",
  "error": "Error description if success is false"
}
```

## Endpoints

### Authentication

#### POST /auth/register
Register a new user account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe",
  "role": "farmer"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "id": "user-uuid",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "farmer"
  },
  "token": "jwt-token"
}
```

#### POST /auth/login
Authenticate user and receive JWT token.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "id": "user-uuid",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "farmer"
  },
  "token": "jwt-token"
}
```

#### GET /auth/profile
Get current user's profile (requires authentication).

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "user-uuid",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "farmer",
    "lastLoginAt": "2024-01-15T10:30:00Z",
    "createdAt": "2024-01-01T00:00:00Z"
  }
}
```

#### PUT /auth/profile
Update current user's profile (requires authentication).

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Smith",
  "email": "john.smith@example.com"
}
```

#### PUT /auth/change-password
Change current user's password (requires authentication).

**Request Body:**
```json
{
  "currentPassword": "oldpassword",
  "newPassword": "newpassword123"
}
```

### User Management (Admin Only)

#### GET /users
Get all users with pagination and filtering.

**Query Parameters:**
- `page` (number): Page number (default: 1)
- `limit` (number): Items per page (default: 10)
- `role` (string): Filter by role
- `status` (string): Filter by status
- `search` (string): Search in name and email

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "user-uuid",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "role": "farmer",
      "status": "active",
      "lastLoginAt": "2024-01-15T10:30:00Z",
      "createdAt": "2024-01-01T00:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "totalPages": 3
  }
}
```

#### GET /users/:id
Get user by ID (admin or own profile).

#### POST /users
Create new user (admin only).

**Request Body:**
```json
{
  "email": "newuser@example.com",
  "password": "password123",
  "firstName": "Jane",
  "lastName": "Smith",
  "role": "manager",
  "status": "active"
}
```

#### PUT /users/:id
Update user (admin or own profile).

#### DELETE /users/:id
Delete user (admin only).

#### GET /users/stats/overview
Get user statistics (admin only).

**Response:**
```json
{
  "success": true,
  "data": {
    "total": 25,
    "byRole": [
      {"role": "farmer", "count": 20},
      {"role": "manager", "count": 3},
      {"role": "admin", "count": 2}
    ],
    "byStatus": [
      {"status": "active", "count": 23},
      {"status": "inactive", "count": 2}
    ],
    "recentRegistrations": 5,
    "activeUsers": 18
  }
}
```

#### PUT /users/:id/reset-password
Reset user password (admin only).

**Request Body:**
```json
{
  "newPassword": "newpassword123"
}
```

### Farm Management

#### GET /farms
Get all farms for the authenticated user.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "farm-uuid",
      "name": "Green Acres Farm",
      "description": "Main farm location",
      "location": "Springfield, IL",
      "size": 500.0,
      "type": "mixed",
      "status": "active",
      "ownerId": "user-uuid",
      "managerId": "manager-uuid",
      "createdAt": "2024-01-01T00:00:00Z"
    }
  ],
  "count": 1
}
```

#### GET /farms/:id
Get farm by ID.

#### POST /farms
Create new farm.

**Request Body:**
```json
{
  "name": "New Farm",
  "description": "Farm description",
  "location": "Farm Location",
  "size": 100.0,
  "type": "crop",
  "parentFarmId": "parent-farm-uuid"
}
```

#### PUT /farms/:id
Update farm.

#### DELETE /farms/:id
Delete farm.

#### GET /farms/:id/stats
Get farm statistics.

**Response:**
```json
{
  "success": true,
  "data": {
    "totalLivestock": 75,
    "totalCrops": 3,
    "totalInventory": 15,
    "totalEmployees": 5,
    "monthlyRevenue": 15000.00,
    "monthlyExpenses": 7500.00
  }
}
```

### Livestock Management

#### GET /livestock
Get all livestock for user's farms.

#### POST /livestock
Add new livestock.

**Request Body:**
```json
{
  "farmId": "farm-uuid",
  "type": "Cattle",
  "breed": "Angus",
  "quantity": 50,
  "healthStatus": "healthy",
  "weight": 500.0,
  "age": 2.5,
  "gender": "mixed",
  "notes": "Main herd"
}
```

#### PUT /livestock/:id
Update livestock.

#### DELETE /livestock/:id
Delete livestock.

### Crop Management

#### GET /crops
Get all crops for user's farms.

#### POST /crops
Add new crop.

**Request Body:**
```json
{
  "farmId": "farm-uuid",
  "name": "Corn",
  "variety": "Sweet Corn",
  "plantedDate": "2024-04-15",
  "expectedHarvestDate": "2024-08-15",
  "status": "growing",
  "notes": "Field A"
}
```

#### PUT /crops/:id
Update crop.

#### DELETE /crops/:id
Delete crop.

### Inventory Management

#### GET /inventory
Get all inventory items for user's farms.

#### POST /inventory
Add new inventory item.

**Request Body:**
```json
{
  "farmId": "farm-uuid",
  "name": "Fertilizer",
  "category": "Supplies",
  "quantity": 1000,
  "unit": "kg",
  "cost": 2.50,
  "supplier": "AgroSupply Co.",
  "expiryDate": "2024-12-31",
  "notes": "NPK 10-10-10"
}
```

#### PUT /inventory/:id
Update inventory item.

#### DELETE /inventory/:id
Delete inventory item.

### Financial Records

#### GET /financial
Get all financial records for user's farms.

#### POST /financial
Add new financial record.

**Request Body:**
```json
{
  "farmId": "farm-uuid",
  "type": "income",
  "category": "Crop Sales",
  "amount": 15000.00,
  "description": "Corn harvest sale",
  "date": "2024-08-20",
  "paymentMethod": "bank_transfer",
  "reference": "INV-001"
}
```

#### PUT /financial/:id
Update financial record.

#### DELETE /financial/:id
Delete financial record.

### Employee Management

#### GET /employees
Get all employees for user's farms.

#### POST /employees
Add new employee.

**Request Body:**
```json
{
  "farmId": "farm-uuid",
  "firstName": "Sarah",
  "lastName": "Johnson",
  "email": "sarah@farm.com",
  "phone": "+1-555-0101",
  "position": "Farm Manager",
  "hireDate": "2023-01-15",
  "salary": 45000.00,
  "status": "active",
  "notes": "Experienced farm manager"
}
```

#### PUT /employees/:id
Update employee.

#### DELETE /employees/:id
Delete employee.

### Weather Data

#### GET /weather
Get weather data for user's farms.

#### POST /weather
Add weather data.

**Request Body:**
```json
{
  "farmId": "farm-uuid",
  "date": "2024-08-20",
  "temperature": 25.5,
  "humidity": 65.0,
  "precipitation": 0.0,
  "windSpeed": 12.0,
  "windDirection": "NW",
  "pressure": 1013.25,
  "visibility": 10.0,
  "notes": "Clear day"
}
```

### Document Management

#### GET /documents
Get all documents for user's farms.

#### POST /documents
Upload document.

**Request Body:**
```json
{
  "farmId": "farm-uuid",
  "name": "Farm Insurance Policy",
  "category": "Legal",
  "filePath": "/documents/insurance.pdf",
  "fileSize": 1024000,
  "mimeType": "application/pdf",
  "description": "Annual insurance policy",
  "tags": "insurance,legal,annual"
}
```

#### PUT /documents/:id
Update document.

#### DELETE /documents/:id
Delete document.

### Analytics

#### GET /analytics/farm/:farmId
Get general analytics for a farm.

#### GET /analytics/yield-predictions/:farmId
Get AI-powered yield predictions.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "crop": "Corn",
      "currentYield": 4.2,
      "predictedYield": 5.1,
      "confidence": 0.85,
      "factors": ["Weather conditions", "Soil quality", "Historical data"]
    }
  ],
  "generatedAt": "2024-01-15T10:30:00Z"
}
```

#### GET /analytics/revenue-analysis/:farmId
Get revenue analysis.

#### GET /analytics/cost-breakdown/:farmId
Get cost breakdown analysis.

#### GET /analytics/weather-impact/:farmId
Get weather impact analysis.

#### GET /analytics/efficiency/:farmId
Get efficiency metrics.

## Error Codes

- `400` - Bad Request (invalid input)
- `401` - Unauthorized (missing or invalid token)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found (resource doesn't exist)
- `409` - Conflict (resource already exists)
- `500` - Internal Server Error

## Rate Limiting

Currently, no rate limiting is implemented. Consider implementing rate limiting for production use.

## CORS

CORS is enabled for all origins. Configure appropriately for production.

## Security Headers

The API uses Helmet.js to set security headers:
- Content Security Policy
- X-Frame-Options
- X-Content-Type-Options
- X-XSS-Protection
- Strict-Transport-Security

## Database Schema

The API uses SQLite with the following main tables:
- `users` - User accounts and authentication
- `farms` - Farm information and ownership
- `livestock` - Livestock tracking
- `crops` - Crop management
- `inventory` - Inventory items
- `financial_records` - Financial transactions
- `weather_data` - Weather information
- `documents` - Document storage
- `analytics_data` - Analytics metrics
- `employees` - Employee management
- `tasks` - Task management

## Migration System

The API includes a migration system for database schema changes:
- Automatic migration on startup
- Version tracking
- Rollback support
- Checksum validation

## Health Check

#### GET /api/health
Check API health and status.

**Response:**
```json
{
  "status": "OK",
  "timestamp": "2024-01-15T10:30:00Z",
  "version": "1.0.0",
  "environment": "development",
  "database": "SQLite",
  "features": [
    "User Authentication (JWT)",
    "Farm Management",
    "Livestock Tracking",
    "Crop Management",
    "Weather Data",
    "Inventory Management",
    "Employee Management",
    "Financial Records",
    "Advanced Analytics",
    "Document Management"
  ]
}
```

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set environment variables:
   ```bash
   JWT_SECRET=your-secret-key
   NODE_ENV=development
   PORT=3000
   ```

3. Start the server:
   ```bash
   npm start
   ```

4. The API will automatically initialize the database and run migrations.

## Testing

Use the provided sample data or create your own test data through the API endpoints.

## Support

For API support and questions, refer to the project documentation or contact the development team. 