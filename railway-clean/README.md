# SmartFarm Railway Clean Deployment

This is a clean, minimal Railway deployment for SmartFarm backend API.

## Features
- Express.js server
- CORS enabled
- Health check endpoint
- Test endpoint
- Environment variable support
- Error handling

## Environment Variables
- `PORT` - Server port (default: 3000)
- `NODE_ENV` - Environment (default: production)
- `API_VERSION` - API version (default: 1.0.0)
- `API_NAME` - API name (default: SmartFarm API)
- `LOG_LEVEL` - Log level (default: info)
- `CORS_ORIGIN` - CORS origin (default: *)

## Endpoints
- `GET /` - Root endpoint
- `GET /api/health` - Health check
- `GET /api/test` - Test endpoint

## Deployment
This directory is configured for Railway deployment with minimal dependencies.
