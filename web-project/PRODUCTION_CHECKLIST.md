# Production Deployment Checklist

Quick reference checklist for deploying SmartFarm web to production.

## Pre-Deployment

### Code Quality
- [ ] All tests pass locally
- [ ] No console errors in development
- [ ] Code is committed and pushed to GitHub
- [ ] No sensitive data in code (API keys, secrets)

### Build Verification
- [ ] `npm run build` completes successfully
- [ ] `dist/` folder contains all necessary files
- [ ] No build warnings or errors
- [ ] Bundle size is reasonable (< 500KB gzipped)

---

## Deployment Steps

### 1. Cloud Platform Setup
- [ ] Account created (Netlify/Vercel)
- [ ] Repository connected
- [ ] Build settings configured:
  - [ ] Base directory: `web-project`
  - [ ] Build command: `npm install && npm run build`
  - [ ] Publish directory: `web-project/dist`
- [ ] Initial deployment successful
- [ ] Production URL obtained

### 2. Environment Variables
- [ ] `VITE_API_BASE_URL` - Backend API URL
- [ ] `VITE_API_URL` - Backend API URL (duplicate)
- [ ] `VITE_APP_NAME` - App name
- [ ] `VITE_APP_VERSION` - Version number
- [ ] `NODE_ENV` - Set to `production`
- [ ] `VITE_OPENWEATHER_API_KEY` - Weather API key
- [ ] `VITE_MAPS_API_KEY` - Google Maps API key
- [ ] `VITE_GOOGLE_ANALYTICS_ID` - Analytics ID (optional)

### 3. Backend Configuration
- [ ] PostgreSQL database provisioned
- [ ] Database migrations run
- [ ] Backend environment variables set:
  - [ ] `DATABASE_URL`
  - [ ] `JWT_SECRET`
  - [ ] `JWT_REFRESH_SECRET`
  - [ ] `GOOGLE_MAPS_API_KEY`
  - [ ] `OPENWEATHER_API_KEY`
  - [ ] `OPENAI_API_KEY` (if using AI features)
  - [ ] `CORS_ORIGIN` (includes frontend URL)
- [ ] Backend health check passes
- [ ] Backend accessible from frontend

### 4. API Keys Obtained
- [ ] Google Maps API key created and restricted
- [ ] OpenWeather API key obtained
- [ ] OpenAI API key obtained (if needed)
- [ ] All keys added to environment variables

---

## Post-Deployment Testing

### Functional Testing
- [ ] Site loads at production URL
- [ ] No console errors
- [ ] Authentication flow works:
  - [ ] Registration
  - [ ] Login
  - [ ] Logout
  - [ ] Session persistence
- [ ] Dashboard loads with data
- [ ] Navigation works
- [ ] CRUD operations work:
  - [ ] Create entities
  - [ ] Read/list entities
  - [ ] Update entities
  - [ ] Delete entities
- [ ] Maps load correctly
- [ ] Weather data displays
- [ ] Reports generate correctly

### Performance Testing
- [ ] Lighthouse Performance score ≥ 80
- [ ] Lighthouse Accessibility score ≥ 90
- [ ] Lighthouse Best Practices score ≥ 80
- [ ] Lighthouse SEO score ≥ 80
- [ ] Core Web Vitals:
  - [ ] LCP < 2.5s
  - [ ] FID < 100ms
  - [ ] CLS < 0.1
- [ ] Page load time < 3s
- [ ] Bundle size < 500KB (gzipped)

### Security Testing
- [ ] HTTPS enabled and working
- [ ] No API keys exposed in client code
- [ ] Protected routes require authentication
- [ ] CORS configured correctly
- [ ] Security headers present:
  - [ ] X-Frame-Options
  - [ ] X-XSS-Protection
  - [ ] X-Content-Type-Options
  - [ ] Content-Security-Policy
- [ ] Rate limiting implemented
- [ ] Input validation working
- [ ] No sensitive data in logs

### Cross-Browser Testing
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile browsers (iOS Safari, Chrome Mobile)

### Responsive Design
- [ ] Desktop (1920x1080)
- [ ] Tablet (768x1024)
- [ ] Mobile (375x667)
- [ ] Navigation works on all sizes
- [ ] Forms are usable on mobile

---

## Monitoring Setup

- [ ] Error tracking configured (Sentry/LogRocket)
- [ ] Analytics configured (Google Analytics)
- [ ] Uptime monitoring set up (UptimeRobot/Pingdom)
- [ ] Performance monitoring configured
- [ ] Log aggregation set up
- [ ] Alert notifications configured

---

## Documentation

- [ ] Production URL documented
- [ ] Environment variables documented
- [ ] API endpoints documented
- [ ] Deployment process documented
- [ ] Rollback procedure documented
- [ ] Contact information for issues

---

## Final Verification

- [ ] All checklist items completed
- [ ] Team notified of deployment
- [ ] Monitoring dashboards checked
- [ ] Backup strategy in place
- [ ] Rollback plan ready

---

## Quick Commands

```bash
# Build locally
cd web-project
npm install
npm run build

# Test build locally
npm run preview

# Check bundle size
npm run build && du -sh dist/

# Audit dependencies
npm audit

# Test production build
npm run build && npm run preview
```

---

## Emergency Contacts

- **Backend Issues**: [Backend Team Contact]
- **Frontend Issues**: [Frontend Team Contact]
- **Infrastructure**: [DevOps Contact]
- **Security Issues**: [Security Team Contact]

---

## Rollback Procedure

If deployment fails:

1. **Netlify**: Go to Deploys → Select previous successful deploy → Publish deploy
2. **Vercel**: Go to Deployments → Select previous deployment → Promote to Production
3. **Verify**: Check that rollback was successful
4. **Investigate**: Review logs to identify issue
5. **Fix**: Address issue before redeploying

---

**Last Updated**: [Date]
**Deployed By**: [Name]
**Production URL**: [URL]

