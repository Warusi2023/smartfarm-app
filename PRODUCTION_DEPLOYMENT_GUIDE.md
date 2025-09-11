# 🚀 SmartFarm Production Deployment Guide

## 📋 Overview

This guide provides step-by-step instructions for deploying SmartFarm to production environments.

## 🎯 Deployment Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   Database      │
│   (Netlify)     │◄──►│   (Railway)     │◄──►│   (In-Memory)   │
│                 │    │                 │    │                 │
│ • PWA           │    │ • Express.js    │    │ • SQLite        │
│ • React/Vue     │    │ • REST API      │    │ • PostgreSQL    │
│ • Static Files  │    │ • JWT Auth      │    │ • Redis         │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🌐 Frontend Deployment (Netlify)

### Prerequisites
- Netlify account
- GitHub repository connected
- Domain name (optional)

### Step 1: Build Configuration
```bash
# In web-project directory
npm run build
```

### Step 2: Netlify Setup
1. **Connect Repository**
   - Go to [netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Connect GitHub repository
   - Select branch: `main`

2. **Build Settings**
   ```
   Base directory: web-project
   Build command: npm run build
   Publish directory: dist
   ```

3. **Environment Variables**
   ```bash
   VITE_API_URL=https://your-backend.railway.app
   VITE_APP_NAME=SmartFarm
   VITE_APP_VERSION=1.0.0
   VITE_GOOGLE_MAPS_API_KEY=your_maps_key
   VITE_OPENWEATHER_API_KEY=your_weather_key
   ```

### Step 3: Custom Domain (Optional)
1. Go to Site Settings → Domain Management
2. Add custom domain
3. Configure DNS records
4. Enable HTTPS

## 🖥️ Backend Deployment (Railway)

### Prerequisites
- Railway account
- GitHub repository connected

### Step 1: Railway Setup
1. **Create Project**
   - Go to [railway.app](https://railway.app)
   - Click "New Project"
   - Connect GitHub repository
   - Select `railway-clean` directory

2. **Environment Variables**
   ```bash
   NODE_ENV=production
   PORT=3000
   API_VERSION=1.0.0
   API_NAME=SmartFarm API
   LOG_LEVEL=info
   CORS_ORIGIN=https://your-frontend.netlify.app
   JWT_SECRET=your-super-secret-jwt-key
   DATABASE_TYPE=memory
   HEALTH_CHECK_ENABLED=true
   ```

### Step 2: Domain Configuration
1. Go to Settings → Domains
2. Add custom domain (optional)
3. Configure SSL certificate

### Step 3: Monitoring
1. Enable Railway metrics
2. Set up health checks
3. Configure alerts

## 📱 Android Deployment (Google Play)

### Prerequisites
- Google Play Console account
- Android Studio
- Signing key

### Step 1: Build Release APK
```bash
cd android-project
./gradlew assembleRelease
```

### Step 2: Sign APK
```bash
# Generate signing key
keytool -genkey -v -keystore smartfarm-release-key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias smartfarm

# Sign APK
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore smartfarm-release-key.jks app-release-unsigned.apk smartfarm
```

### Step 3: Upload to Google Play
1. Go to Google Play Console
2. Create new release
3. Upload signed APK
4. Fill store listing
5. Submit for review

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

## 🔒 Security Configuration

### HTTPS
- All production endpoints use HTTPS
- SSL certificates managed by platforms
- HSTS headers configured

### Environment Variables
- Never commit sensitive data
- Use platform secret management
- Rotate secrets regularly

### CORS
- Configure specific origins
- Avoid wildcard in production
- Validate all requests

## 📊 Monitoring & Analytics

### Health Checks
- Backend: `https://your-app.railway.app/api/health`
- Frontend: Built-in PWA health checks

### Logging
- Railway: Built-in logging dashboard
- Netlify: Function logs
- Application: Structured logging

### Analytics
- Google Analytics (frontend)
- Railway metrics (backend)
- Performance monitoring

## 🚨 Troubleshooting

### Common Issues

#### Backend Not Starting
```bash
# Check environment variables
curl https://your-app.railway.app/api/health

# Check Railway logs
# Go to Railway dashboard → Logs
```

#### Frontend Build Failing
```bash
# Check Node.js version
node --version

# Check dependencies
npm install

# Check build logs
# Go to Netlify dashboard → Deploys
```

#### CORS Errors
```bash
# Verify CORS_ORIGIN setting
echo $CORS_ORIGIN

# Check frontend URL
curl -H "Origin: https://your-frontend.netlify.app" https://your-backend.railway.app/api/health
```

### Debug Commands
```bash
# Test backend health
curl https://your-app.railway.app/api/health

# Test frontend
curl https://your-app.netlify.app

# Local testing
npm run dev
npm start
```

## 🔄 CI/CD Pipeline

### GitHub Actions
- Automatic testing on PRs
- Automatic deployment on main
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
- Caching strategies

### Frontend Scaling
- CDN distribution
- Static asset optimization
- Progressive Web App features
- Service worker caching

## 🆘 Support

- **Documentation**: This guide
- **Issues**: [GitHub Issues](https://github.com/Warusi2023/smartfarm-app/issues)
- **Email**: deploy@smartfarm.app

---

**Last Updated**: 2024-09-11  
**Version**: 1.0.0