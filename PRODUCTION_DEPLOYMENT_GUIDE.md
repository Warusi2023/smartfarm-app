# 🚀 Production Deployment Guide for SmartFarm Ads

This guide will help you deploy SmartFarm with ads integration to production on Railway (backend) and Netlify (frontend).

---

## 📋 **Pre-Deployment Checklist**

### ✅ **Backend (Railway) Requirements**
- [ ] Railway account created
- [ ] GitHub repository connected
- [ ] Environment variables configured
- [ ] Database migrations ready
- [ ] API endpoints tested

### ✅ **Frontend (Netlify) Requirements**
- [ ] Netlify account created
- [ ] GitHub repository connected
- [ ] Build settings configured
- [ ] Environment variables set
- [ ] Custom domain configured (optional)

### ✅ **Ads Configuration**
- [ ] AdSense account approved
- [ ] Affiliate programs set up
- [ ] API keys obtained
- [ ] Test ads working

---

## 🔧 **Backend Deployment (Railway)**

### **Step 1: Connect GitHub Repository**

1. **Login to Railway**
   - Go to [https://railway.app/](https://railway.app/)
   - Sign in with GitHub

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your SmartFarm repository
   - Select the `backend-api` folder as root directory

### **Step 2: Configure Environment Variables**

In Railway dashboard, go to your project → Variables tab and add:

```bash
# Server Configuration
NODE_ENV=production
PORT=3000
HOST=0.0.0.0
LOG_LEVEL=info

# Database
DB_TYPE=sqlite
DB_PATH=/app/database/smartfarm.db

# Security
JWT_SECRET=your-super-secure-jwt-secret-key-here
JWT_EXPIRES_IN=24h

# CORS
CORS_ORIGIN=https://your-netlify-domain.netlify.app,https://smartfarm-app.com
CORS_CREDENTIALS=true

# External APIs
WEATHER_API_KEY=your-openweathermap-api-key
MAPS_API_KEY=your-google-maps-api-key
OPENAI_API_KEY=your-openai-api-key

# Feature Flags
FEATURE_GEOFENCING=true
FEATURE_AI_ADVISORY=true
FEATURE_BYPRODUCTS=true
FEATURE_SUBSCRIPTIONS=true
FEATURE_ADS=true

# Ads Configuration
ADSENSE_ENABLED=true
ADSENSE_CLIENT_ID=ca-pub-xxxxxxxxxxxxxxxx
AFFILIATE_ENABLED=true
AFFILIATE_TAG=smartfarm-20

# Rate Limiting
RATE_LIMIT_ENABLED=true
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# File Uploads
MAX_FILE_SIZE=10485760
UPLOAD_PATH=/app/uploads
```

### **Step 3: Configure Build Settings**

In Railway, go to Settings → Build:

```json
{
  "buildCommand": "npm install && npm run build",
  "startCommand": "npm start",
  "healthcheckPath": "/api/health"
}
```

### **Step 4: Deploy**

1. **Trigger Deployment**
   - Railway will automatically deploy when you push to main branch
   - Or manually trigger from the dashboard

2. **Monitor Deployment**
   - Check the deployment logs
   - Verify all services are running
   - Test the health endpoint

3. **Get Backend URL**
   - Copy the Railway-provided URL
   - Example: `https://smartfarm-backend-production.up.railway.app`

---

## 🌐 **Frontend Deployment (Netlify)**

### **Step 1: Connect GitHub Repository**

1. **Login to Netlify**
   - Go to [https://netlify.com/](https://netlify.com/)
   - Sign in with GitHub

2. **Create New Site**
   - Click "New site from Git"
   - Choose your SmartFarm repository
   - Select the `web-project` folder as base directory

### **Step 2: Configure Build Settings**

In Netlify dashboard, go to Site settings → Build & deploy:

```yaml
# Build settings
Build command: echo "Static site - no build needed"
Publish directory: public
```

### **Step 3: Set Environment Variables**

In Netlify dashboard, go to Site settings → Environment variables:

```bash
# Backend API URL
VITE_API_URL=https://smartfarm-backend-production.up.railway.app

# Ads Configuration
VITE_ADSENSE_CLIENT_ID=ca-pub-xxxxxxxxxxxxxxxx
VITE_ADSENSE_ENABLED=true
VITE_AFFILIATE_ENABLED=true
VITE_AFFILIATE_TAG=smartfarm-20

# External APIs (if needed by frontend)
VITE_WEATHER_API_KEY=your-openweathermap-api-key
VITE_MAPS_API_KEY=your-google-maps-api-key
```

### **Step 4: Configure Custom Domain (Optional)**

1. **Add Custom Domain**
   - Go to Site settings → Domain management
   - Add your custom domain (e.g., `smartfarm-app.com`)
   - Configure DNS settings

2. **SSL Certificate**
   - Netlify automatically provides SSL certificates
   - Ensure HTTPS is enabled

### **Step 5: Deploy**

1. **Trigger Deployment**
   - Netlify will automatically deploy when you push to main branch
   - Or manually trigger from the dashboard

2. **Verify Deployment**
   - Check the site is accessible
   - Test all functionality
   - Verify ads are working

---

## 🧪 **Testing in Production**

### **Step 1: Health Checks**

Test all critical endpoints:

```bash
# Backend health check
curl https://smartfarm-backend-production.up.railway.app/api/health

# Ads configuration
curl https://smartfarm-backend-production.up.railway.app/api/ads/config

# Affiliate products
curl https://smartfarm-backend-production.up.railway.app/api/ads/affiliate/seeds
```

### **Step 2: Frontend Testing**

1. **Load the website**
   - Visit your Netlify URL
   - Check all pages load correctly
   - Verify navigation works

2. **Test Ads**
   - Check if AdSense ads appear
   - Verify affiliate products load
   - Test click tracking

3. **Test Core Features**
   - User registration/login
   - Dashboard functionality
   - Weather integration
   - QR code generation

### **Step 3: Performance Testing**

```bash
# Test page load times
curl -w "@curl-format.txt" -o /dev/null -s "https://your-site.netlify.app"

# Test API response times
curl -w "@curl-format.txt" -o /dev/null -s "https://smartfarm-backend-production.up.railway.app/api/health"
```

---

## 📊 **Monitoring and Analytics**

### **Step 1: Set Up Monitoring**

#### **Railway Monitoring**
- Built-in metrics and logs
- Set up alerts for errors
- Monitor resource usage

#### **Netlify Analytics**
- Enable Netlify Analytics
- Monitor page views and performance
- Track form submissions

### **Step 2: Google Analytics**

Add Google Analytics to your site:

```html
<!-- Add to your HTML head -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### **Step 3: Error Tracking**

Set up error tracking with Sentry:

```javascript
// Add to your frontend
import * as Sentry from "@sentry/browser";

Sentry.init({
  dsn: "YOUR_SENTRY_DSN",
  environment: "production"
});
```

---

## 🔒 **Security Configuration**

### **Step 1: CORS Configuration**

Ensure CORS is properly configured:

```javascript
// In backend-api/config/environment.js
CORS_ORIGIN: [
  'https://your-site.netlify.app',
  'https://smartfarm-app.com',
  'https://www.smartfarm-app.com'
]
```

### **Step 2: Content Security Policy**

The `netlify.toml` file already includes CSP headers, but verify they're working:

```bash
# Check CSP headers
curl -I https://your-site.netlify.app | grep -i content-security-policy
```

### **Step 3: API Security**

Ensure your API endpoints are secure:

```javascript
// Add rate limiting
app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
}));

// Add request validation
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
```

---

## 📈 **Performance Optimization**

### **Step 1: Frontend Optimization**

1. **Enable Compression**
   - Netlify automatically enables gzip compression
   - Verify in Network tab of browser dev tools

2. **Optimize Images**
   - Use WebP format where possible
   - Implement lazy loading
   - Compress images before upload

3. **Minify Assets**
   - Minify CSS and JavaScript
   - Remove unused code
   - Use CDN for static assets

### **Step 2: Backend Optimization**

1. **Database Optimization**
   - Add indexes for frequently queried fields
   - Implement connection pooling
   - Use prepared statements

2. **Caching**
   - Implement Redis for session storage
   - Cache API responses
   - Use CDN for static files

### **Step 3: CDN Configuration**

Set up CloudFlare or similar CDN:

```javascript
// Add CloudFlare headers
app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'public, max-age=31536000');
  next();
});
```

---

## 🚨 **Troubleshooting**

### **Common Issues**

#### **1. Ads Not Showing**
```bash
# Check environment variables
echo $VITE_ADSENSE_ENABLED
echo $VITE_ADSENSE_CLIENT_ID

# Check browser console for errors
# Verify AdSense approval status
```

#### **2. API Connection Issues**
```bash
# Test API connectivity
curl https://smartfarm-backend-production.up.railway.app/api/health

# Check CORS configuration
# Verify environment variables
```

#### **3. Database Issues**
```bash
# Check database connection
# Verify migrations ran successfully
# Check Railway logs for errors
```

### **Debug Commands**

```bash
# Check Railway logs
railway logs

# Check Netlify build logs
# Go to Netlify dashboard → Deploys → View logs

# Test API endpoints
curl -X GET https://smartfarm-backend-production.up.railway.app/api/ads/config
```

---

## 📋 **Post-Deployment Checklist**

### ✅ **Functionality Tests**
- [ ] User registration/login works
- [ ] Dashboard loads correctly
- [ ] Weather data displays
- [ ] QR codes generate
- [ ] Ads appear and are clickable
- [ ] Affiliate products load
- [ ] All forms submit successfully

### ✅ **Performance Tests**
- [ ] Page load times < 3 seconds
- [ ] API response times < 500ms
- [ ] Mobile responsiveness works
- [ ] No console errors
- [ ] All images load

### ✅ **Security Tests**
- [ ] HTTPS enabled
- [ ] CORS configured correctly
- [ ] No sensitive data exposed
- [ ] Rate limiting working
- [ ] Input validation working

### ✅ **Ads Tests**
- [ ] AdSense ads display
- [ ] Affiliate products show
- [ ] Click tracking works
- [ ] Revenue tracking active
- [ ] Analytics collecting data

---

## 🎯 **Success Metrics**

### **Key Performance Indicators**
- **Uptime**: Target 99.9%
- **Page Load Time**: Target < 3 seconds
- **API Response Time**: Target < 500ms
- **Ad Click-Through Rate**: Target 2-5%
- **Conversion Rate**: Target 3-8%

### **Monthly Monitoring**
- Review performance metrics
- Analyze ad performance
- Check error logs
- Update dependencies
- Optimize based on data

---

## 🚀 **Next Steps After Deployment**

1. **Monitor Performance** - Set up alerts and regular checks
2. **Optimize Ads** - A/B test different placements
3. **Scale Infrastructure** - Add more resources as needed
4. **Add Features** - Implement new functionality based on user feedback
5. **Marketing** - Promote your platform to farmers

---

**Your SmartFarm platform is now live and ready to generate revenue! 🎉**