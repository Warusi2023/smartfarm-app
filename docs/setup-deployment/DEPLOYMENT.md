# Deployment Guide

Complete guide for deploying SmartFarm to production.

## Overview

SmartFarm consists of three main components:
1. **Backend API** - Node.js/Express (Railway)
2. **Web Application** - Static site (Netlify)
3. **Android App** - Native app (Google Play)

## Backend Deployment (Railway)

### Prerequisites
- Railway account
- PostgreSQL database
- Environment variables configured

### Steps

1. **Connect Repository**
   - Go to Railway dashboard
   - Create new project
   - Connect GitHub repository
   - Select `backend/` directory

2. **Configure Environment Variables**
   ```env
   NODE_ENV=production
   PORT=3000
   DATABASE_URL=postgresql://...
   JWT_SECRET=your-secret-key
   EMAIL_USER=your-email@example.com
   EMAIL_PASS=your-password
   WEATHER_API_KEY=your-api-key
   ```

3. **Deploy**
   - Railway automatically deploys on push to main branch
   - Check deployment logs for errors
   - Verify health endpoint: `https://your-api.railway.app/api/health`

### Database Setup

1. **Create PostgreSQL Database**
   - Use Railway's PostgreSQL service
   - Copy connection string to `DATABASE_URL`

2. **Run Migrations**
   ```bash
   npm run setup:db
   ```

3. **Verify Connection**
   ```bash
   npm run test:db
   ```

## Frontend Deployment (Netlify)

### Prerequisites
- Netlify account
- Backend API URL

### Steps

1. **Connect Repository**
   - Go to Netlify dashboard
   - Create new site
   - Connect GitHub repository
   - Select `web-project/` directory

2. **Configure Build Settings**
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: `18.x`

3. **Set Environment Variables**
   ```env
   VITE_API_BASE_URL=https://your-api.railway.app/api
   ```

4. **Deploy**
   - Netlify automatically deploys on push
   - Check deployment logs
   - Verify site is accessible

## Android Deployment (Google Play)

### Prerequisites
- Google Play Developer account
- Signed APK/AAB

### Steps

1. **Build Release**
   ```bash
   cd android-project
   ./gradlew assembleRelease
   ```

2. **Sign APK/AAB**
   - Use your signing key
   - Follow [Android Signing Guide](../feature-modules/android/SIGNING.md)

3. **Upload to Play Console**
   - Create new app or update existing
   - Upload signed bundle
   - Complete store listing
   - Submit for review

## CI/CD

### GitHub Actions

Tests run automatically on push and pull requests:
- Backend tests (`backend/`)
- Test coverage reporting
- Automatic deployment on merge to main

### Manual Deployment

If needed, deployments can be triggered manually:
- Railway: Redeploy from dashboard
- Netlify: Trigger deploy from dashboard

## Post-Deployment

### Verification Checklist

- [ ] Backend health check returns 200
- [ ] Frontend loads correctly
- [ ] API endpoints respond
- [ ] Database connection works
- [ ] Email service configured
- [ ] Environment variables set
- [ ] SSL certificates valid
- [ ] CORS configured correctly

### Monitoring

- Check Railway logs for backend errors
- Monitor Netlify build logs
- Set up error tracking (optional)
- Monitor API response times

## Troubleshooting

### Backend Issues
- Check Railway logs
- Verify environment variables
- Test database connection
- Check API health endpoint

### Frontend Issues
- Check Netlify build logs
- Verify API URL configuration
- Check browser console for errors
- Verify CORS settings

### Database Issues
- Verify connection string
- Check database migrations
- Verify database permissions
- Test connection manually

## Rollback

### Backend Rollback
- Use Railway's deployment history
- Select previous deployment
- Click "Redeploy"

### Frontend Rollback
- Use Netlify's deploy history
- Select previous deployment
- Click "Publish deploy"

## Security Checklist

- [ ] Environment variables secured
- [ ] JWT secret is strong
- [ ] Database credentials secure
- [ ] SSL/TLS enabled
- [ ] CORS configured correctly
- [ ] Rate limiting enabled
- [ ] Security headers configured

