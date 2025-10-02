# SmartFarm Deployment Guide

## Overview
This guide covers the complete deployment process for SmartFarm from development to production using GitHub Actions, Railway (backend), and Netlify (frontend).

## Prerequisites

### 1. GitHub Repository Setup
- Repository must be public or have GitHub Actions enabled
- Required secrets must be configured (see Secrets Configuration section)

### 2. Railway Account Setup
- Create account at [railway.app](https://railway.app)
- Create new project for SmartFarm backend
- Generate Railway token for API access

### 3. Netlify Account Setup
- Create account at [netlify.com](https://netlify.com)
- Create new site for SmartFarm frontend
- Generate Netlify auth token

## Secrets Configuration

### GitHub Secrets Required

#### Backend Secrets
```
RAILWAY_TOKEN=your_railway_token_here
RAILWAY_PRODUCTION_URL=https://your-backend.railway.app
RAILWAY_MIGRATION_TOKEN=your_migration_token_here
```

#### Frontend Secrets
```
NETLIFY_AUTH_TOKEN=your_netlify_token_here
NETLIFY_SITE_ID=your_site_id_here
NETLIFY_SITE_ID_STAGING=your_staging_site_id_here
NETLIFY_PRODUCTION_URL=https://your-site.netlify.app
```

#### Optional Secrets
```
SNYK_TOKEN=your_snyk_token_here (for security scanning)
SLACK_WEBHOOK=your_slack_webhook_url (for notifications)
```

## Deployment Process

### 1. Backend Deployment (Railway)

#### Staging Environment
- Triggered on push to `develop` branch
- Deploys to Railway staging service
- Runs all tests before deployment
- Includes security scanning

#### Production Environment
- Triggered on push to `main` branch
- Deploys to Railway production service
- Runs database migrations
- Performs health checks

### 2. Frontend Deployment (Netlify)

#### Staging Environment
- Triggered on push to `develop` branch
- Deploys to Netlify staging site
- Runs E2E tests and accessibility checks
- Includes performance testing

#### Production Environment
- Triggered on push to `main` branch
- Deploys to Netlify production site
- Runs Lighthouse audits
- Optimizes images automatically

## Environment Variables

### Backend Environment Variables (Railway)
```
NODE_ENV=production
DATABASE_URL=postgresql://user:password@host:port/database
JWT_SECRET=your_jwt_secret_here
PORT=3000
CORS_ORIGIN=https://your-frontend.netlify.app
```

### Frontend Environment Variables (Netlify)
```
VITE_API_BASE_URL=https://your-backend.railway.app/api
VITE_OPENWEATHER_API_KEY=your_openweather_api_key
VITE_APP_VERSION=1.0.0
VITE_ENVIRONMENT=production
```

## Database Setup

### Production Database
1. Create PostgreSQL database on Railway
2. Update `DATABASE_URL` environment variable
3. Run migrations: `npm run migrate`
4. Seed initial data: `npm run seed`

### Database Migrations
- Automatically run on production deployment
- Manual migration endpoint: `POST /api/migrate`
- Requires `RAILWAY_MIGRATION_TOKEN` for security

## Monitoring and Health Checks

### Health Check Endpoints
- Backend: `GET /api/health`
- Frontend: Root URL accessibility check

### Monitoring Setup
1. Railway provides built-in monitoring
2. Netlify provides analytics and monitoring
3. GitHub Actions provide deployment status
4. Optional: Slack notifications for deployments

## Rollback Procedures

### Backend Rollback
1. Revert to previous commit
2. Push to `main` branch
3. GitHub Actions will redeploy automatically

### Frontend Rollback
1. Revert to previous commit
2. Push to `main` branch
3. Netlify will redeploy automatically

### Database Rollback
1. Access Railway dashboard
2. Restore from backup
3. Or manually run rollback migrations

## Security Considerations

### API Security
- JWT tokens for authentication
- CORS configuration
- Input validation and sanitization
- SQL injection prevention
- Rate limiting

### Frontend Security
- HTTPS enforcement
- Content Security Policy
- XSS protection
- Secure headers

## Performance Optimization

### Backend Optimization
- Database indexing
- Query optimization
- Caching strategies
- Connection pooling

### Frontend Optimization
- Image optimization
- Code splitting
- Lazy loading
- Service worker caching
- CDN usage

## Troubleshooting

### Common Issues

#### Deployment Failures
1. Check GitHub Actions logs
2. Verify secrets configuration
3. Check environment variables
4. Review error messages

#### Database Issues
1. Check connection string
2. Verify database permissions
3. Check migration status
4. Review database logs

#### Frontend Issues
1. Check build logs
2. Verify environment variables
3. Check browser console
4. Review network requests

### Support Channels
- GitHub Issues for bug reports
- Slack channel for team communication
- Documentation for common questions

## Maintenance

### Regular Tasks
- Monitor deployment status
- Review performance metrics
- Update dependencies
- Backup database
- Review security logs

### Updates
- Dependencies: Weekly
- Security patches: Immediately
- Feature updates: As needed
- Database migrations: With deployments

## Backup and Recovery

### Database Backups
- Automated daily backups on Railway
- Manual backup before major changes
- Test restore procedures regularly

### Code Backups
- Git repository serves as primary backup
- GitHub provides repository backup
- Local development copies

## Scaling Considerations

### Backend Scaling
- Railway auto-scaling
- Database connection pooling
- Caching layer implementation
- Load balancing

### Frontend Scaling
- Netlify CDN
- Image optimization
- Code splitting
- Service worker caching

## Cost Optimization

### Railway Costs
- Monitor resource usage
- Optimize database queries
- Use appropriate instance sizes
- Implement caching

### Netlify Costs
- Optimize build times
- Use CDN effectively
- Monitor bandwidth usage
- Implement image optimization

## Compliance and Security

### Data Protection
- GDPR compliance
- Data encryption
- Secure data transmission
- Access controls

### Security Audits
- Regular dependency updates
- Security scanning
- Penetration testing
- Code reviews

## Documentation Updates

### Keeping Documentation Current
- Update with each deployment
- Document configuration changes
- Maintain troubleshooting guides
- Update API documentation

### Version Control
- Document version changes
- Maintain changelog
- Tag releases
- Document breaking changes