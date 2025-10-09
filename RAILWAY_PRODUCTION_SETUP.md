# 🚀 Railway Production Setup Guide

## 📋 **Prerequisites**

- [ ] Railway account with paid plan (to prevent auto-sleep)
- [ ] PostgreSQL database (Railway provides this)
- [ ] Custom domain (optional but recommended)
- [ ] Environment variables configured

---

## 🗄️ **Step 1: Database Setup**

### **1.1 Create PostgreSQL Database**
1. Go to Railway Dashboard
2. Click **"New Project"**
3. Select **"Provision PostgreSQL"**
4. Note the connection details

### **1.2 Database Connection String**
Railway will provide a connection string like:
```
postgresql://postgres:password@containers-us-west-xyz.railway.app:5432/railway
```

### **1.3 Run Database Migrations**
```bash
# Connect to your Railway database and run the schema
psql $DATABASE_URL -f backend/database/schema.sql
```

---

## ⚙️ **Step 2: Environment Variables**

### **2.1 Required Variables**
Add these to Railway → Your Service → Variables:

```
# Database
DATABASE_URL=postgresql://postgres:password@containers-us-west-xyz.railway.app:5432/railway

# API Configuration
NODE_ENV=production
PORT=3000
API_NAME=SmartFarm
API_VERSION=v1

# CORS Configuration
CORS_ORIGINS=https://smartfarmfiji.com,https://www.smartfarmfiji.com

# Authentication
JWT_SECRET=your-very-secure-jwt-secret-key-minimum-32-characters-long
JWT_EXPIRES_IN=7d
BCRYPT_ROUNDS=12

# External Services
STRIPE_SECRET_KEY=sk_live_your_stripe_live_secret_key
STRIPE_PUBLISHABLE_KEY=pk_live_your_stripe_live_publishable_key
SENTRY_DSN=https://your-sentry-dsn@sentry.io/project-id

# Email Configuration
EMAIL_SERVICE=sendgrid
EMAIL_FROM=noreply@smartfarmfiji.com
SENDGRID_API_KEY=your_sendgrid_api_key

# Logging
LOG_LEVEL=info
ENABLE_DEBUG_ROUTES=false
ENABLE_SWAGGER_DOCS=false
```

### **2.2 Security Notes**
- **JWT_SECRET**: Use a strong, random 32+ character string
- **DATABASE_URL**: Railway provides this automatically
- **CORS_ORIGINS**: Include your production domain
- **Stripe Keys**: Use live keys for production

---

## 🚀 **Step 3: Deploy Backend**

### **3.1 Update package.json**
Ensure your `backend/package.json` includes production dependencies:
```json
{
  "dependencies": {
    "express": "^4.19.2",
    "cors": "^2.8.5",
    "helmet": "^7.1.0",
    "bcrypt": "^5.1.1",
    "jsonwebtoken": "^9.0.2",
    "pg": "^8.11.3",
    "dotenv": "^16.3.1",
    "express-rate-limit": "^7.1.5",
    "compression": "^1.7.4",
    "morgan": "^1.10.0"
  }
}
```

### **3.2 Update Start Command**
In Railway → Your Service → Settings:
- **Start Command**: `node server-production.cjs`

### **3.3 Deploy**
1. Push your code to GitHub
2. Railway will auto-deploy
3. Check logs for successful startup

---

## 🌐 **Step 4: Custom Domain Setup**

### **4.1 Add Custom Domain**
1. Go to Railway → Your Service → Settings
2. Click **"Domains"**
3. Add your domain: `api.smartfarmfiji.com`
4. Configure DNS records as instructed

### **4.2 SSL Certificate**
Railway automatically provides SSL certificates for custom domains.

### **4.3 DNS Configuration**
Add these DNS records:
```
Type: CNAME
Name: api
Value: your-railway-service.railway.app
TTL: 300
```

---

## 📊 **Step 5: Monitoring Setup**

### **5.1 Railway Monitoring**
Railway provides built-in monitoring:
- CPU usage
- Memory usage
- Request logs
- Error logs

### **5.2 External Monitoring**
Set up external monitoring:
- **UptimeRobot**: Monitor API availability
- **Sentry**: Error tracking
- **PostHog**: User analytics

---

## 🔧 **Step 6: Production Optimizations**

### **6.1 Performance**
- Connection pooling (already configured)
- Compression middleware
- Rate limiting
- Caching headers

### **6.2 Security**
- Helmet security headers
- CORS properly configured
- Rate limiting
- Input validation
- SQL injection protection

### **6.3 Logging**
- Structured logging with Winston
- Error tracking with Sentry
- Request logging with Morgan

---

## 🧪 **Step 7: Testing Production**

### **7.1 Health Check**
```bash
curl https://api.smartfarmfiji.com/api/health
```

Expected response:
```json
{
  "ok": true,
  "service": "SmartFarm",
  "version": "v1",
  "environment": "production",
  "timestamp": 1760012345678,
  "database": "connected"
}
```

### **7.2 Authentication Test**
```bash
# Register a user
curl -X POST https://api.smartfarmfiji.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "SecurePass123!",
    "firstName": "Test",
    "lastName": "User"
  }'
```

### **7.3 Protected Route Test**
```bash
# Login
curl -X POST https://api.smartfarmfiji.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "SecurePass123!"
  }'

# Use the token from login response
curl -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  https://api.smartfarmfiji.com/api/farms
```

---

## 🔍 **Step 8: Troubleshooting**

### **8.1 Common Issues**

**Database Connection Failed**
- Check DATABASE_URL environment variable
- Verify PostgreSQL service is running
- Check firewall settings

**CORS Errors**
- Verify CORS_ORIGINS includes your domain
- Check that frontend is using correct API URL
- Ensure HTTPS is used in production

**Authentication Errors**
- Verify JWT_SECRET is set
- Check token expiration settings
- Ensure proper Authorization header format

**Rate Limiting**
- Adjust rate limit settings if needed
- Check if legitimate users are being blocked
- Monitor for abuse patterns

### **8.2 Logs**
Check Railway logs for:
- Database connection status
- Authentication failures
- API errors
- Performance issues

---

## 📈 **Step 9: Scaling Considerations**

### **9.1 Database Scaling**
- Monitor connection pool usage
- Consider read replicas for high traffic
- Implement database indexing optimization

### **9.2 Application Scaling**
- Monitor CPU and memory usage
- Consider horizontal scaling
- Implement caching strategies

### **9.3 Monitoring**
- Set up alerts for downtime
- Monitor response times
- Track error rates

---

## ✅ **Production Checklist**

- [ ] PostgreSQL database provisioned and migrated
- [ ] Environment variables configured
- [ ] Custom domain set up with SSL
- [ ] Authentication system working
- [ ] Health check endpoint responding
- [ ] CORS configured correctly
- [ ] Rate limiting active
- [ ] Security headers enabled
- [ ] Error tracking configured
- [ ] Monitoring set up
- [ ] Backup strategy in place

---

## 🎉 **Success Indicators**

Your production backend is ready when:
- ✅ Health check returns 200 OK
- ✅ Database connection shows "connected"
- ✅ Authentication endpoints work
- ✅ Protected routes require valid tokens
- ✅ CORS allows requests from your domain
- ✅ SSL certificate is valid
- ✅ No errors in Railway logs

**Your SmartFarm API is now production-ready! 🚀**
