# Setup & Deployment Documentation

## Quick Start

### Prerequisites
- Node.js 18+ and npm 8+
- PostgreSQL (for production)
- Git

### Local Development Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd SmartFarm
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   cp env.example .env
   # Edit .env with your configuration
   npm run setup:db
   npm run dev
   ```

3. **Web Application Setup**
   ```bash
   cd web-project
   npm install
   npm run dev
   ```

4. **Android Setup**
   See [Android Setup Guide](../feature-modules/android/README.md)

## Deployment

### Backend Deployment (Railway)
See [Backend Deployment Guide](./BACKEND_DEPLOYMENT.md)

### Frontend Deployment (Netlify)
See [Frontend Deployment Guide](./FRONTEND_DEPLOYMENT.md)

### Environment Configuration
See [Environment Variables Guide](./ENVIRONMENT_VARIABLES.md)

## Database Setup

### Development
- SQLite (default)
- Automatic schema creation

### Production
- PostgreSQL
- Migration scripts
- Connection pooling

See [Database Setup Guide](./DATABASE_SETUP.md)

## CI/CD

- GitHub Actions for automated testing
- Automated deployments on push
- Test coverage reporting

See [CI/CD Configuration](../.github/workflows/README.md)

