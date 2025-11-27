# SmartFarm Web - Production Deployment Guide

This guide walks you through deploying the SmartFarm web application to a production environment with proper configuration, testing, and security measures.

## Table of Contents

1. [Deploy to Cloud Platform](#1-deploy-to-cloud-platform)
2. [Configure Production Backend & Keys](#2-configure-production-backend--keys)
3. [End-to-End and Performance Testing](#3-end-to-end-and-performance-testing)
4. [Security Review](#4-security-review)

---

## 1. Deploy to Cloud Platform

### Option A: Netlify (Recommended for Static Sites)

#### Prerequisites
- GitHub repository connected
- Netlify account (free tier available)

#### Step 1.1: Connect Repository to Netlify

1. Go to [Netlify Dashboard](https://app.netlify.com)
2. Click **"Add new site"** → **"Import an existing project"**
3. Connect your GitHub repository
4. Select the repository: `smartfarm-app`

#### Step 1.2: Configure Build Settings

In Netlify dashboard, configure:

- **Base directory**: `web-project`
- **Build command**: `npm install && npm run build`
- **Publish directory**: `web-project/dist`
- **Node version**: `18` (or `20`)

#### Step 1.3: Set Environment Variables

Go to **Site Settings** → **Environment variables** and add:

```bash
# API Configuration
VITE_API_BASE_URL=https://smartfarm-app-production.up.railway.app
VITE_API_URL=https://smartfarm-app-production.up.railway.app

# App Configuration
VITE_APP_NAME=SmartFarm
VITE_APP_VERSION=1.0.0
NODE_ENV=production

# External API Keys (see Section 2 for obtaining these)
VITE_OPENWEATHER_API_KEY=your_openweather_api_key
VITE_MAPS_API_KEY=your_google_maps_api_key
VITE_GOOGLE_ANALYTICS_ID=your_ga_id

# Feature Flags
VITE_FEATURE_PAYMENTS=true
VITE_FEATURE_ANALYTICS=true
VITE_FEATURE_EMAIL_VERIFICATION=true
```

#### Step 1.4: Deploy

1. Click **"Deploy site"**
2. Wait for build to complete (2-5 minutes)
3. Your site will be live at: `https://your-site-name.netlify.app`

#### Step 1.5: Configure Custom Domain (Optional)

1. Go to **Domain settings**
2. Click **"Add custom domain"**
3. Follow DNS configuration instructions
4. Enable HTTPS (automatic with Netlify)

---

### Option B: Vercel (Alternative)

#### Step 1.1: Connect Repository

1. Go to [Vercel Dashboard](https://vercel.com)
2. Click **"Add New Project"**
3. Import your GitHub repository

#### Step 1.2: Configure Project

- **Framework Preset**: Vite
- **Root Directory**: `web-project`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`

#### Step 1.3: Set Environment Variables

Add the same environment variables as listed in Netlify section above.

#### Step 1.4: Deploy

Click **"Deploy"** and wait for completion.

---

### Verify Deployment

After deployment, verify:

- ✅ Site loads at production URL
- ✅ All static assets load correctly
- ✅ No console errors in browser DevTools
- ✅ API calls are working (check Network tab)
- ✅ Navigation works correctly

---

## 2. Configure Production Backend & Keys

### 2.1: Provision PostgreSQL Database

#### Option A: Railway (Recommended)

1. Go to [Railway Dashboard](https://railway.app)
2. Create new project → **"New"** → **"Database"** → **"Add PostgreSQL"**
3. Note the connection details:
   - `DATABASE_URL` (automatically set)
   - `PGHOST`, `PGPORT`, `PGUSER`, `PGPASSWORD`, `PGDATABASE`

#### Option B: Supabase (Free Tier Available)

1. Go to [Supabase Dashboard](https://supabase.com)
2. Create new project
3. Go to **Settings** → **Database** → Copy connection string
4. Format: `postgresql://postgres:[PASSWORD]@[HOST]:5432/postgres`

#### Option C: Neon (Serverless PostgreSQL)

1. Go to [Neon Dashboard](https://neon.tech)
2. Create new project
3. Copy connection string from dashboard

### 2.2: Configure Backend Environment Variables

In your backend hosting platform (Railway/Heroku/etc.), set:

```bash
# Database
DATABASE_URL=postgresql://user:password@host:5432/dbname

# Server Configuration
NODE_ENV=production
PORT=3000
JWT_SECRET=your_super_secret_jwt_key_min_32_chars
JWT_REFRESH_SECRET=your_refresh_token_secret_min_32_chars

# API Keys
GOOGLE_MAPS_API_KEY=your_google_maps_api_key
OPENWEATHER_API_KEY=your_openweather_api_key
OPENAI_API_KEY=your_openai_api_key

# CORS Configuration
CORS_ORIGIN=https://your-site-name.netlify.app,https://your-custom-domain.com

# Email Configuration (if using email verification)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password

# File Upload (if using cloud storage)
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_S3_BUCKET=your_bucket_name
AWS_REGION=us-east-1
```

### 2.3: Obtain API Keys

#### Google Maps API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create new project or select existing
3. Enable **Maps JavaScript API**
4. Go to **Credentials** → **Create Credentials** → **API Key**
5. Restrict the key:
   - **Application restrictions**: HTTP referrers
   - **Website restrictions**: Add your domain (`https://your-site.netlify.app/*`)
   - **API restrictions**: Restrict to **Maps JavaScript API** only
6. Copy the API key

#### OpenWeather API Key

1. Go to [OpenWeatherMap](https://openweathermap.org/api)
2. Sign up for free account
3. Go to **API keys** tab
4. Copy your API key
5. Free tier: 1,000 calls/day, 60 calls/minute

#### OpenAI API Key (Optional - for AI features)

1. Go to [OpenAI Platform](https://platform.openai.com)
2. Create account and add payment method
3. Go to **API keys** → **Create new secret key**
4. Set usage limits in **Usage** → **Limits**
5. Copy the key (shown only once)

### 2.4: Run Database Migrations

After setting up the database, run migrations:

```bash
# If using Railway CLI
railway run npm run setup-db

# If using Heroku CLI
heroku run npm run setup-db

# Or SSH into your server and run
npm run setup-db
```

### 2.5: Verify Backend Connection

Test your backend API:

```bash
# Health check
curl https://your-backend-url.com/api/health

# Database status
curl https://your-backend-url.com/api/database/status
```

---

## 3. End-to-End and Performance Testing

### 3.1: End-to-End User Flow Testing

Test the following user journeys:

#### Authentication Flow
- [ ] User registration
- [ ] Email verification (if enabled)
- [ ] User login
- [ ] Password reset
- [ ] Logout
- [ ] Session persistence (refresh page)

#### Dashboard & Navigation
- [ ] Dashboard loads with data
- [ ] All navigation links work
- [ ] Responsive design on mobile/tablet/desktop
- [ ] Breadcrumbs work correctly

#### Data CRUD Operations
- [ ] Create farm
- [ ] View farms list
- [ ] Edit farm
- [ ] Delete farm
- [ ] Create livestock
- [ ] View livestock list
- [ ] Edit livestock
- [ ] Delete livestock
- [ ] Create crop
- [ ] View crops list
- [ ] Edit crop
- [ ] Delete crop
- [ ] Create task
- [ ] View tasks list
- [ ] Mark task complete
- [ ] Delete task
- [ ] Create inventory item
- [ ] View inventory list
- [ ] Edit inventory item
- [ ] Delete inventory item

#### Maps & Location Features
- [ ] Map loads correctly
- [ ] Location picker works
- [ ] Geocoding works (address → coordinates)
- [ ] Reverse geocoding works (coordinates → address)

#### Reports & Analytics
- [ ] Reports page loads
- [ ] Charts render correctly
- [ ] Data filters work
- [ ] Export functionality works

### 3.2: Performance Testing with Lighthouse

#### Run Lighthouse Audit

1. Open Chrome DevTools (F12)
2. Go to **Lighthouse** tab
3. Select:
   - ✅ Performance
   - ✅ Accessibility
   - ✅ Best Practices
   - ✅ SEO
4. Select **"Desktop"** or **"Mobile"**
5. Click **"Generate report"**

#### Target Scores

- **Performance**: ≥ 80
- **Accessibility**: ≥ 90
- **Best Practices**: ≥ 80
- **SEO**: ≥ 80

#### Performance Optimization Checklist

- [ ] **Images**: Optimize images (WebP format, lazy loading)
- [ ] **Code Splitting**: Implement route-based code splitting
- [ ] **Caching**: Configure proper cache headers (already in `netlify.toml`)
- [ ] **Bundle Size**: Keep JavaScript bundle < 500KB (gzipped)
- [ ] **Fonts**: Use `font-display: swap` for web fonts
- [ ] **Third-party Scripts**: Load analytics scripts asynchronously

#### Core Web Vitals Targets

- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1

### 3.3: Load Testing (Optional)

For high-traffic scenarios, use tools like:

- **k6**: `k6 run load-test.js`
- **Apache Bench**: `ab -n 1000 -c 10 https://your-site.netlify.app/`
- **Artillery**: `artillery quick --count 100 --num 10 https://your-site.netlify.app/`

---

## 4. Security Review

### 4.1: HTTPS Verification

- ✅ Verify site loads over HTTPS only
- ✅ Check SSL certificate is valid (green padlock in browser)
- ✅ Ensure HTTP redirects to HTTPS (Netlify/Vercel do this automatically)

### 4.2: Authentication Security

- [ ] **JWT Tokens**: Verify tokens are stored securely (httpOnly cookies preferred over localStorage)
- [ ] **Password Policy**: Enforce strong passwords (min 8 chars, mixed case, numbers)
- [ ] **Rate Limiting**: Implement rate limiting on login/register endpoints
- [ ] **CSRF Protection**: Verify CSRF tokens are used for state-changing operations
- [ ] **Session Management**: Verify sessions expire correctly

### 4.3: Protected Routes

Verify all protected routes require authentication:

- [ ] `/dashboard` - Requires auth
- [ ] `/livestock` - Requires auth
- [ ] `/crops` - Requires auth
- [ ] `/tasks` - Requires auth
- [ ] `/inventory` - Requires auth
- [ ] `/reports` - Requires auth

Test by:
1. Logging out
2. Manually navigating to protected routes
3. Verifying redirect to login page

### 4.4: Sensitive Data Exposure

#### Client-Side Checks

- [ ] **No API Keys**: Verify no API keys are exposed in client-side code
- [ ] **No Secrets**: Check browser DevTools → Sources for any hardcoded secrets
- [ ] **Environment Variables**: Verify only `VITE_*` variables are exposed (not server-side secrets)

#### Server-Side Checks

- [ ] **Database Credentials**: Never exposed in logs or error messages
- [ ] **JWT Secrets**: Stored only in environment variables
- [ ] **API Keys**: Stored only in environment variables

### 4.5: CORS Configuration

Verify CORS is correctly configured:

```javascript
// Backend CORS should only allow your frontend domain
CORS_ORIGIN=https://your-site.netlify.app,https://your-custom-domain.com
```

Test:
- [ ] Requests from your domain succeed
- [ ] Requests from other domains are blocked
- [ ] Preflight OPTIONS requests work correctly

### 4.6: Rate Limiting & Bot Protection

#### Implement Rate Limiting

**Backend (Express example):**

```javascript
const rateLimit = require('express-rate-limit');

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/', apiLimiter);

// Stricter limits for auth endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5 // 5 login attempts per 15 minutes
});

app.use('/api/auth/login', authLimiter);
app.use('/api/auth/register', authLimiter);
```

#### Bot Protection Options

- **Cloudflare**: Enable bot fight mode (free tier)
- **reCAPTCHA**: Add to login/register forms
- **hCaptcha**: Privacy-friendly alternative

### 4.7: Security Headers

Verify security headers are set (already configured in `netlify.toml`):

- ✅ `X-Frame-Options: DENY`
- ✅ `X-XSS-Protection: 1; mode=block`
- ✅ `X-Content-Type-Options: nosniff`
- ✅ `Referrer-Policy: strict-origin-when-cross-origin`
- ✅ `Content-Security-Policy` (configured)
- ✅ `Permissions-Policy` (configured)

Test using: https://securityheaders.com

### 4.8: Input Validation

Verify all user inputs are validated:

- [ ] **SQL Injection**: Use parameterized queries (already using ORM)
- [ ] **XSS**: Sanitize user inputs before rendering
- [ ] **File Uploads**: Validate file types and sizes
- [ ] **Email Validation**: Verify email format
- [ ] **Phone Validation**: Verify phone number format

### 4.9: Dependency Security

Regularly check for vulnerable dependencies:

```bash
# Using npm audit
cd web-project
npm audit

# Fix vulnerabilities
npm audit fix

# Using Snyk (more comprehensive)
npx snyk test
```

### 4.10: Monitoring & Logging

Set up monitoring:

- [ ] **Error Tracking**: Configure Sentry or similar
- [ ] **Logging**: Set up structured logging (Winston, Pino)
- [ ] **Uptime Monitoring**: Use UptimeRobot or Pingdom
- [ ] **Performance Monitoring**: Use New Relic or Datadog

---

## Post-Deployment Checklist

After completing all sections:

- [ ] Site is live and accessible
- [ ] All environment variables are set
- [ ] Database is connected and migrations run
- [ ] API keys are configured and working
- [ ] End-to-end tests pass
- [ ] Lighthouse scores meet targets
- [ ] Security review completed
- [ ] Monitoring is set up
- [ ] Documentation is updated

---

## Troubleshooting

### Build Fails

- Check build logs in Netlify/Vercel dashboard
- Verify Node version matches (18 or 20)
- Ensure all dependencies are in `package.json`

### API Calls Fail

- Verify `VITE_API_BASE_URL` is set correctly
- Check CORS configuration on backend
- Verify backend is running and accessible

### Environment Variables Not Working

- Ensure variables start with `VITE_` prefix for Vite
- Rebuild after adding new variables
- Check variable names match exactly (case-sensitive)

### Database Connection Issues

- Verify `DATABASE_URL` is correct
- Check database is accessible from backend server
- Ensure firewall allows connections

---

## Next Steps

After production deployment:

1. **Set up CI/CD**: Automate deployments on git push
2. **Configure Monitoring**: Set up alerts for errors and downtime
3. **Plan Scaling**: Prepare for increased traffic
4. **Regular Updates**: Keep dependencies updated
5. **Backup Strategy**: Set up automated database backups

---

## Support

For issues or questions:
- Check logs in hosting platform dashboard
- Review error tracking (Sentry)
- Consult documentation in `/docs` folder

