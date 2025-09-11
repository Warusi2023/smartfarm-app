# SmartFarm Railway Backend

Minimal backend API for Railway deployment.

## Features

- Health check endpoint
- User authentication (register/login)
- Farm management
- JWT token authentication
- CORS support

## API Endpoints

- `GET /` - Server status
- `GET /api/health` - Health check
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/farms` - Get farms (protected)
- `POST /api/farms` - Create farm (protected)

## Environment Variables

- `NODE_ENV` - Environment (production)
- `PORT` - Server port (3000)
- `JWT_SECRET` - JWT signing secret
- `CORS_ORIGIN` - CORS allowed origins

## Deployment

This backend is configured for Railway deployment with minimal dependencies.
