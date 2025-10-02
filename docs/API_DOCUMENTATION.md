# SmartFarm API Documentation

## Overview

The SmartFarm API provides a comprehensive RESTful interface for managing agricultural data including farms, crops, livestock, and analytics.

**Base URL**: `https://smartfarm-backend.railway.app/api`

## Authentication

All API endpoints require authentication except for registration and login.

### Authentication Header
```
Authorization: Bearer <jwt_token>
```

### Getting a Token
1. Register a new user or login with existing credentials
2. Use the returned token in subsequent requests

## Response Format

All API responses follow this format:

### Success Response
```json
{
  "success": true,
  "data": {
    // Response data
  },
  "message": "Optional success message"
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error message",
  "errors": [
    // Validation errors (if applicable)
  ]
}
```

## Authentication Endpoints

### Register User
**POST** `/auth/register`

Register a new user account.

**Request Body:**
```json
{
  "username": "string (required, min: 3, max: 50)",
  "email": "string (required, valid email)",
  "password": "string (required, min: 8, must contain uppercase, lowercase, number, special char)",
  "firstName": "string (required, max: 50)",
  "lastName": "string (required, max: 50)"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "username": "string",
    "email": "string",
    "firstName": "string",
    "lastName": "string",
    "createdAt": "datetime"
  }
}
```

### Login
**POST** `/auth/login`

Authenticate user and return JWT token.

**Request Body:**
```json
{
  "username": "string (required)",
  "password": "string (required)"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "token": "jwt_token",
    "user": {
      "id": "uuid",
      "username": "string",
      "email": "string",
      "firstName": "string",
      "lastName": "string"
    }
  }
}
```

### Get User Profile
**GET** `/auth/profile`

Get current user's profile information.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "username": "string",
    "email": "string",
    "firstName": "string",
    "lastName": "string",
    "createdAt": "datetime",
    "updatedAt": "datetime"
  }
}
```

### Change Password
**POST** `/auth/change-password`

Change user's password.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "currentPassword": "string (required)",
  "newPassword": "string (required, min: 8, must contain uppercase, lowercase, number, special char)"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Password changed successfully"
}
```

## Farm Endpoints

### Get All Farms
**GET** `/farms`

Get all farms for the authenticated user.

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `search` (optional): Search term for farm name or location

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "name": "string",
      "location": "string",
      "size": "number",
      "type": "string",
      "description": "string",
      "userId": "uuid",
      "createdAt": "datetime",
      "updatedAt": "datetime"
    }
  ],
  "pagination": {
    "page": "number",
    "limit": "number",
    "total": "number",
    "pages": "number"
  }
}
```

### Get Farm by ID
**GET** `/farms/:id`

Get a specific farm by ID.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "string",
    "location": "string",
    "size": "number",
    "type": "string",
    "description": "string",
    "userId": "uuid",
    "createdAt": "datetime",
    "updatedAt": "datetime"
  }
}
```

### Create Farm
**POST** `/farms`

Create a new farm.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "name": "string (required, max: 100)",
  "location": "string (required, max: 200)",
  "size": "number (required, min: 0.1)",
  "type": "string (required, enum: ['Crop', 'Livestock', 'Mixed', 'Organic', 'Conventional'])",
  "description": "string (optional, max: 500)"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "string",
    "location": "string",
    "size": "number",
    "type": "string",
    "description": "string",
    "userId": "uuid",
    "createdAt": "datetime",
    "updatedAt": "datetime"
  }
}
```

### Update Farm
**PUT** `/farms/:id`

Update an existing farm.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "name": "string (optional, max: 100)",
  "location": "string (optional, max: 200)",
  "size": "number (optional, min: 0.1)",
  "type": "string (optional, enum: ['Crop', 'Livestock', 'Mixed', 'Organic', 'Conventional'])",
  "description": "string (optional, max: 500)"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "string",
    "location": "string",
    "size": "number",
    "type": "string",
    "description": "string",
    "userId": "uuid",
    "createdAt": "datetime",
    "updatedAt": "datetime"
  }
}
```

### Delete Farm
**DELETE** `/farms/:id`

Delete a farm and all associated data.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "message": "Farm deleted successfully"
}
```

### Get Farm Analytics
**GET** `/farms/analytics`

Get analytics data for all farms.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "totalFarms": "number",
    "totalArea": "number",
    "farmTypes": {
      "Crop": "number",
      "Livestock": "number",
      "Mixed": "number",
      "Organic": "number",
      "Conventional": "number"
    },
    "averageFarmSize": "number",
    "largestFarm": {
      "id": "uuid",
      "name": "string",
      "size": "number"
    }
  }
}
```

## Crop Endpoints

### Get All Crops
**GET** `/crops`

Get all crops for the authenticated user.

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `farmId` (optional): Filter by farm ID
- `status` (optional): Filter by status (Planted, Growing, Harvested)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "name": "string",
      "type": "string",
      "farmId": "uuid",
      "plantedDate": "date",
      "expectedHarvestDate": "date",
      "area": "number",
      "status": "string",
      "description": "string",
      "createdAt": "datetime",
      "updatedAt": "datetime"
    }
  ],
  "pagination": {
    "page": "number",
    "limit": "number",
    "total": "number",
    "pages": "number"
  }
}
```

### Get Crop by ID
**GET** `/crops/:id`

Get a specific crop by ID.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "string",
    "type": "string",
    "farmId": "uuid",
    "plantedDate": "date",
    "expectedHarvestDate": "date",
    "area": "number",
    "status": "string",
    "description": "string",
    "createdAt": "datetime",
    "updatedAt": "datetime"
  }
}
```

### Create Crop
**POST** `/crops`

Create a new crop.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "name": "string (required, max: 100)",
  "type": "string (required, enum: ['Vegetable', 'Fruit', 'Grain', 'Herb', 'Flower'])",
  "farmId": "uuid (required)",
  "plantedDate": "date (required)",
  "expectedHarvestDate": "date (required)",
  "area": "number (required, min: 0.1)",
  "description": "string (optional, max: 500)"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "string",
    "type": "string",
    "farmId": "uuid",
    "plantedDate": "date",
    "expectedHarvestDate": "date",
    "area": "number",
    "status": "string",
    "description": "string",
    "createdAt": "datetime",
    "updatedAt": "datetime"
  }
}
```

### Update Crop
**PUT** `/crops/:id`

Update an existing crop.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "name": "string (optional, max: 100)",
  "type": "string (optional, enum: ['Vegetable', 'Fruit', 'Grain', 'Herb', 'Flower'])",
  "plantedDate": "date (optional)",
  "expectedHarvestDate": "date (optional)",
  "area": "number (optional, min: 0.1)",
  "description": "string (optional, max: 500)"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "string",
    "type": "string",
    "farmId": "uuid",
    "plantedDate": "date",
    "expectedHarvestDate": "date",
    "area": "number",
    "status": "string",
    "description": "string",
    "createdAt": "datetime",
    "updatedAt": "datetime"
  }
}
```

### Delete Crop
**DELETE** `/crops/:id`

Delete a crop.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "message": "Crop deleted successfully"
}
```

### Update Crop Status
**PATCH** `/crops/:id/status`

Update crop status.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "status": "string (required, enum: ['Planted', 'Growing', 'Harvested', 'Failed'])"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "status": "string",
    "updatedAt": "datetime"
  }
}
```

### Get Crop Analytics
**GET** `/crops/analytics`

Get analytics data for all crops.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "totalCrops": "number",
    "totalArea": "number",
    "cropTypes": {
      "Vegetable": "number",
      "Fruit": "number",
      "Grain": "number",
      "Herb": "number",
      "Flower": "number"
    },
    "statusDistribution": {
      "Planted": "number",
      "Growing": "number",
      "Harvested": "number",
      "Failed": "number"
    },
    "averageGrowthPeriod": "number"
  }
}
```

## Livestock Endpoints

### Get All Livestock
**GET** `/livestock`

Get all livestock for the authenticated user.

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `farmId` (optional): Filter by farm ID
- `type` (optional): Filter by livestock type

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "name": "string",
      "type": "string",
      "farmId": "uuid",
      "breed": "string",
      "birthDate": "date",
      "weight": "number",
      "status": "string",
      "description": "string",
      "createdAt": "datetime",
      "updatedAt": "datetime"
    }
  ],
  "pagination": {
    "page": "number",
    "limit": "number",
    "total": "number",
    "pages": "number"
  }
}
```

### Get Livestock by ID
**GET** `/livestock/:id`

Get a specific livestock by ID.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "string",
    "type": "string",
    "farmId": "uuid",
    "breed": "string",
    "birthDate": "date",
    "weight": "number",
    "status": "string",
    "description": "string",
    "createdAt": "datetime",
    "updatedAt": "datetime"
  }
}
```

### Create Livestock
**POST** `/livestock`

Create new livestock.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "name": "string (required, max: 100)",
  "type": "string (required, enum: ['Cattle', 'Sheep', 'Goat', 'Pig', 'Chicken', 'Duck', 'Horse'])",
  "farmId": "uuid (required)",
  "breed": "string (required, max: 100)",
  "birthDate": "date (required)",
  "weight": "number (optional, min: 0)",
  "description": "string (optional, max: 500)"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "string",
    "type": "string",
    "farmId": "uuid",
    "breed": "string",
    "birthDate": "date",
    "weight": "number",
    "status": "string",
    "description": "string",
    "createdAt": "datetime",
    "updatedAt": "datetime"
  }
}
```

### Update Livestock
**PUT** `/livestock/:id`

Update existing livestock.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "name": "string (optional, max: 100)",
  "type": "string (optional, enum: ['Cattle', 'Sheep', 'Goat', 'Pig', 'Chicken', 'Duck', 'Horse'])",
  "breed": "string (optional, max: 100)",
  "birthDate": "date (optional)",
  "weight": "number (optional, min: 0)",
  "description": "string (optional, max: 500)"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "string",
    "type": "string",
    "farmId": "uuid",
    "breed": "string",
    "birthDate": "date",
    "weight": "number",
    "status": "string",
    "description": "string",
    "createdAt": "datetime",
    "updatedAt": "datetime"
  }
}
```

### Delete Livestock
**DELETE** `/livestock/:id`

Delete livestock.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "message": "Livestock deleted successfully"
}
```

### Update Livestock Status
**PATCH** `/livestock/:id/status`

Update livestock status.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "status": "string (required, enum: ['Active', 'Sold', 'Deceased', 'Transferred'])"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "status": "string",
    "updatedAt": "datetime"
  }
}
```

### Get Livestock Analytics
**GET** `/livestock/analytics`

Get analytics data for all livestock.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "totalLivestock": "number",
    "livestockTypes": {
      "Cattle": "number",
      "Sheep": "number",
      "Goat": "number",
      "Pig": "number",
      "Chicken": "number",
      "Duck": "number",
      "Horse": "number"
    },
    "statusDistribution": {
      "Active": "number",
      "Sold": "number",
      "Deceased": "number",
      "Transferred": "number"
    },
    "averageWeight": "number",
    "totalWeight": "number"
  }
}
```

## Health Check

### Get Health Status
**GET** `/health`

Get application health status.

**Response:**
```json
{
  "uptime": "number",
  "message": "OK",
  "timestamp": "datetime",
  "database": "connected"
}
```

## Error Codes

| Code | Description |
|------|-------------|
| 400 | Bad Request - Invalid input data |
| 401 | Unauthorized - Invalid or missing token |
| 403 | Forbidden - Insufficient permissions |
| 404 | Not Found - Resource not found |
| 409 | Conflict - Resource already exists |
| 422 | Unprocessable Entity - Validation errors |
| 500 | Internal Server Error - Server error |

## Rate Limiting

API requests are rate limited to prevent abuse:
- **Limit**: 100 requests per 15 minutes per IP
- **Headers**: Rate limit information is included in response headers

## Examples

### Complete Workflow Example

1. **Register User**
```bash
curl -X POST https://smartfarm-backend.railway.app/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "farmer123",
    "email": "farmer@example.com",
    "password": "SecurePass123!",
    "firstName": "John",
    "lastName": "Doe"
  }'
```

2. **Login**
```bash
curl -X POST https://smartfarm-backend.railway.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "farmer123",
    "password": "SecurePass123!"
  }'
```

3. **Create Farm**
```bash
curl -X POST https://smartfarm-backend.railway.app/api/farms \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "name": "My Farm",
    "location": "123 Farm Road",
    "size": 100.5,
    "type": "Mixed",
    "description": "A mixed farm with crops and livestock"
  }'
```

4. **Add Crop**
```bash
curl -X POST https://smartfarm-backend.railway.app/api/crops \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "name": "Tomatoes",
    "type": "Vegetable",
    "farmId": "<farm_id>",
    "plantedDate": "2024-01-15",
    "expectedHarvestDate": "2024-04-15",
    "area": 25.0,
    "description": "Organic tomatoes"
  }'
```

5. **Add Livestock**
```bash
curl -X POST https://smartfarm-backend.railway.app/api/livestock \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "name": "Bessie",
    "type": "Cattle",
    "farmId": "<farm_id>",
    "breed": "Holstein",
    "birthDate": "2020-05-15",
    "weight": 600,
    "description": "Healthy dairy cow"
  }'
```

## SDKs and Libraries

### JavaScript/Node.js
```javascript
const SmartFarmAPI = require('smartfarm-api-client');

const client = new SmartFarmAPI({
  baseURL: 'https://smartfarm-backend.railway.app/api',
  token: 'your-jwt-token'
});

// Create a farm
const farm = await client.farms.create({
  name: 'My Farm',
  location: '123 Farm Road',
  size: 100.5,
  type: 'Mixed'
});
```

### Python
```python
import requests

class SmartFarmAPI:
    def __init__(self, base_url, token):
        self.base_url = base_url
        self.headers = {
            'Authorization': f'Bearer {token}',
            'Content-Type': 'application/json'
        }
    
    def create_farm(self, data):
        response = requests.post(
            f'{self.base_url}/farms',
            json=data,
            headers=self.headers
        )
        return response.json()

# Usage
api = SmartFarmAPI('https://smartfarm-backend.railway.app/api', 'your-token')
farm = api.create_farm({
    'name': 'My Farm',
    'location': '123 Farm Road',
    'size': 100.5,
    'type': 'Mixed'
})
```

## Support

For API support and questions:
- GitHub Issues: [Report bugs or request features](https://github.com/your-username/smartfarm/issues)
- Documentation: [Full documentation](https://docs.smartfarm-app.com)
- Email: api-support@smartfarm-app.com
