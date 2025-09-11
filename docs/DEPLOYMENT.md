# 🚀 SmartFarm Deployment Guide

## 📋 Overview

This guide covers deploying SmartFarm across all platforms and environments.

## 🌐 Frontend Deployment (Netlify)

### Prerequisites
- Netlify account
- GitHub repository connected

### Steps
1. **Build the application**
   ```bash
   cd web-project
   npm run build
   ```

2. **Deploy to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Connect your GitHub repository
   - Set build command: `npm run build`
   - Set publish directory: `dist`

3. **Configure environment variables**
   ```bash
   VITE_API_URL=https://your-backend.railway.app
   VITE_APP_NAME=SmartFarm
   VITE_APP_VERSION=1.0.0
   ```

## 🖥️ Backend Deployment (Railway)

### Prerequisites
- Railway account
- GitHub repository connected

### Steps
1. **Connect to Railway**
   - Go to [railway.app](https://railway.app)
   - Click "New Project"
   - Connect your GitHub repository
   - Select the `railway-minimal` directory

2. **Configure environment variables**
   ```bash
   NODE_ENV=production
   PORT=3000
   JWT_SECRET=your-secret-key
   CORS_ORIGIN=https://your-frontend.netlify.app
   DATABASE_TYPE=memory
   API_VERSION=1.0.0
   API_NAME=SmartFarm API
   LOG_LEVEL=info
   HEALTH_CHECK_ENABLED=true
   ```

3. **Deploy**
   - Railway automatically deploys on push to main branch
   - Access your API at `https://your-app.railway.app`

## 📱 Android Deployment

### Prerequisites
- Android Studio
- Google Play Console account

### Steps
1. **Build release APK**
   ```bash
   cd android-project
   ./gradlew assembleRelease
   ```

2. **Sign the APK**
   - Generate signing key
   - Sign the APK with your key

3. **Upload to Google Play**
   - Go to Google Play Console
   - Create new release
   - Upload signed APK
   - Fill in store listing details

## 🔧 Environment Configuration

### Development
```bash
# Frontend
VITE_API_URL=http://localhost:3000
VITE_APP_NAME=SmartFarm Dev

# Backend
NODE_ENV=development
PORT=3000
CORS_ORIGIN=http://localhost:3001
```

### Staging
```bash
# Frontend
VITE_API_URL=https://staging-backend.railway.app
VITE_APP_NAME=SmartFarm Staging

# Backend
NODE_ENV=staging
PORT=3000
CORS_ORIGIN=https://staging-frontend.netlify.app
```

### Production
```bash
# Frontend
VITE_API_URL=https://smartfarm-backend.railway.app
VITE_APP_NAME=SmartFarm

# Backend
NODE_ENV=production
PORT=3000
CORS_ORIGIN=https://smartfarm.netlify.app
```

## 🐳 Docker Deployment (Optional)

### Dockerfile
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

### Docker Compose
```yaml
version: '3.8'
services:
  smartfarm-backend:
    build: ./railway-minimal
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - PORT=3000
```

## 🔒 Security Considerations

### HTTPS
- All production endpoints use HTTPS
- SSL certificates automatically managed by Railway/Netlify

### Environment Variables
- Never commit sensitive data to repository
- Use platform-specific secret management
- Rotate secrets regularly

### CORS
- Configure specific origins for production
- Avoid using `*` in production

## 📊 Monitoring

### Health Checks
- Backend: `https://your-app.railway.app/api/health`
- Frontend: Built-in PWA health checks

### Logs
- Railway: Built-in logging dashboard
- Netlify: Function logs in dashboard

### Analytics
- Google Analytics (frontend)
- Railway metrics (backend)

## 🚨 Troubleshooting

### Common Issues

#### Backend not starting
- Check environment variables
- Verify port configuration
- Check Railway logs

#### Frontend build failing
- Check Node.js version
- Verify build dependencies
- Check Netlify build logs

#### CORS errors
- Verify CORS_ORIGIN setting
- Check frontend URL configuration
- Ensure HTTPS in production

### Debug Commands
```bash
# Check backend health
curl https://your-app.railway.app/api/health

# Check frontend
curl https://your-app.netlify.app

# Local testing
npm run dev
npm start
```

## 🔄 CI/CD Pipeline

### GitHub Actions
- Automatic testing on pull requests
- Automatic deployment on main branch
- Security scanning
- Code quality checks

### Deployment Flow
1. Push to main branch
2. Tests run automatically
3. If tests pass, deploy to staging
4. Manual approval for production
5. Deploy to production

## 📈 Scaling

### Backend Scaling
- Railway auto-scaling
- Load balancing
- Database optimization

### Frontend Scaling
- CDN distribution
- Caching strategies
- Progressive Web App features

## 🆘 Support

- **Documentation**: This guide
- **Issues**: [GitHub Issues](https://github.com/Warusi2023/smartfarm-app/issues)
- **Email**: deploy@smartfarm.app

---

**Last Updated**: 2024-09-11  
**Version**: 1.0.0
