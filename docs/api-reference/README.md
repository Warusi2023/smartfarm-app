# API Reference

Complete API documentation for the SmartFarm backend.

## Base URL

- **Development**: `http://localhost:3000`
- **Production**: `https://your-api-domain.com`

## Authentication

Most endpoints require authentication via JWT token in the Authorization header:

```
Authorization: Bearer <token>
```

## Endpoints

### Authentication
- [Authentication Endpoints](./AUTHENTICATION.md)

### Farms
- [Farm Management](./FARMS.md)

### Crops
- [Crop Management](./CROPS.md)

### Livestock
- [Livestock Management](./LIVESTOCK.md)

### Weather Alerts
- [Weather Alerts](./WEATHER_ALERTS.md)

### AI Advisory
- [AI Advisory](./AI_ADVISORY.md)

### Subscriptions
- [Subscription Management](./SUBSCRIPTIONS.md)

### Daily Tips
- [Daily Tips](./DAILY_TIPS.md)

### Biological Farming
- [Biological Farming](./BIOLOGICAL_FARMING.md)

## Response Format

### Success Response
```json
{
  "success": true,
  "data": { ... }
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error message",
  "code": "ERROR_CODE",
  "details": { ... }
}
```

## Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `409` - Conflict
- `500` - Internal Server Error

## Rate Limiting

API requests are rate-limited. Check response headers for rate limit information.

## Pagination

List endpoints support pagination:
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 20)

## Filtering & Sorting

Many endpoints support filtering and sorting via query parameters.

