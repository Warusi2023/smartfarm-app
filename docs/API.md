# 📡 SmartFarm API Documentation

## 🌐 Base URL
- **Production**: `https://smartfarm-backend.railway.app`
- **Development**: `http://localhost:3000`

## 🔐 Authentication

All protected endpoints require a valid JWT token in the Authorization header:

```http
Authorization: Bearer <your-jwt-token>
```

## 📋 Endpoints

### 🏥 Health Check

#### GET /api/health
Check if the API is running and healthy.

**Response:**
```json
{
  "status": "success",
  "message": "SmartFarm API is running",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "environment": "production",
  "version": "1.0.0",
  "port": 3000,
  "logLevel": "info",
  "database": "In-Memory",
  "corsOrigin": "*"
}
```

### 🏠 Root Endpoint

#### GET /
Get basic API information.

**Response:**
```json
{
  "message": "SmartFarm API",
  "status": "running",
  "version": "1.0.0",
  "environment": "production",
  "endpoints": {
    "health": "/api/health",
    "root": "/"
  }
}
```

## 🔧 Environment Variables

### Required Variables
```bash
NODE_ENV=production
PORT=3000
JWT_SECRET=your-secret-key
CORS_ORIGIN=*
DATABASE_TYPE=memory
API_VERSION=1.0.0
API_NAME=SmartFarm API
LOG_LEVEL=info
HEALTH_CHECK_ENABLED=true
```

### Optional Variables
```bash
WEATHER_API_KEY=your_openweather_api_key
MAPS_API_KEY=your_google_maps_api_key
OPENAI_API_KEY=your_openai_api_key
```

## 🚀 Deployment

### Railway Deployment
1. Push code to GitHub
2. Railway automatically deploys
3. Set environment variables in Railway dashboard
4. Access your API at `https://your-app.railway.app`

### Local Development
```bash
cd railway-minimal
npm install
npm start
```

## 🧪 Testing

### Health Check Test
```bash
curl https://your-app.railway.app/api/health
```

### Root Endpoint Test
```bash
curl https://your-app.railway.app/
```

## 📊 Status Codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 500 | Internal Server Error |

## 🔒 Security

- **HTTPS**: All production endpoints use HTTPS
- **CORS**: Configurable CORS origins
- **JWT**: Secure token-based authentication
- **Input Validation**: All inputs are validated
- **Rate Limiting**: API rate limiting (coming soon)

## 📈 Monitoring

- **Health Checks**: Built-in health monitoring
- **Logging**: Comprehensive logging system
- **Metrics**: Performance metrics (coming soon)
- **Alerts**: Automated alerting (coming soon)

## 🆘 Support

- **Documentation**: This file
- **Issues**: [GitHub Issues](https://github.com/Warusi2023/smartfarm-app/issues)
- **Email**: api@smartfarm.app

---

**API Version**: 1.0.0  
**Last Updated**: 2024-09-11
