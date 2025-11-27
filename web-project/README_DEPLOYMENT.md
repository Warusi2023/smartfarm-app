# SmartFarm Web - Production Deployment

Your SmartFarm web application is ready for production deployment. Follow these guides to deploy to Netlify.

## 🚀 Quick Start

**Start here**: [DEPLOY_NOW.md](./DEPLOY_NOW.md)

This guide provides step-by-step instructions for deploying to Netlify with the correct configuration.

## 📚 Documentation Guide

### For Quick Deployment
- **[DEPLOY_NOW.md](./DEPLOY_NOW.md)** - Step-by-step Netlify deployment (START HERE)
- **[PRODUCTION_QUICK_START.md](./PRODUCTION_QUICK_START.md)** - 5-step quick deployment guide

### For Complete Setup
- **[PRODUCTION_DEPLOYMENT_GUIDE.md](./PRODUCTION_DEPLOYMENT_GUIDE.md)** - Comprehensive deployment guide
  - Cloud platform deployment
  - Backend configuration
  - API key setup
  - Performance testing
  - Security review

### For Reference
- **[PRODUCTION_CHECKLIST.md](./PRODUCTION_CHECKLIST.md)** - Complete deployment checklist

## 🛠️ Preparation

Before deploying, run the preparation script:

```powershell
cd web-project
.\scripts\prepare-netlify-deploy.ps1
```

This will:
- Verify your build works locally
- Check that `dist/` folder exists
- Display deployment instructions

## ⚙️ Netlify Configuration

**Critical Settings** (must be set in Netlify dashboard):

```
Base directory:     web-project
Build command:       npm install && npm run build
Publish directory:   web-project/dist
Node version:        18 or 20
```

**Required Environment Variables** (set BEFORE first deploy):

```
VITE_API_BASE_URL=https://smartfarm-app-production.up.railway.app
VITE_API_URL=https://smartfarm-app-production.up.railway.app
VITE_APP_NAME=SmartFarm
VITE_APP_VERSION=1.0.0
NODE_ENV=production
```

## ✅ Verification After Deployment

After deployment, verify everything works:

```powershell
# Verify deployment
.\scripts\verify-production.ps1 -ProductionUrl "https://your-site.netlify.app"

# Test performance
.\scripts\test-lighthouse.ps1 -Url "https://your-site.netlify.app"
```

## 📋 Deployment Checklist

- [ ] Local build works (`npm run build`)
- [ ] Netlify account created
- [ ] Repository connected to Netlify
- [ ] Build settings configured correctly
- [ ] Environment variables set (BEFORE first deploy)
- [ ] Site deployed successfully
- [ ] Deployment verified with script
- [ ] Performance tested with Lighthouse
- [ ] Core features tested manually
- [ ] Backend configured (if not already done)
- [ ] API keys added (if needed)
- [ ] Security review completed
- [ ] Monitoring set up

## 🔧 Troubleshooting

### Build Fails
- Check Netlify build logs
- Verify base directory is `web-project`
- Ensure build command is correct
- Check Node version (18 or 20)

### Environment Variables Not Working
- Variables must start with `VITE_` prefix
- Redeploy after adding variables
- Check variable names are exact (case-sensitive)

### API Calls Fail
- Verify `VITE_API_BASE_URL` is set correctly
- Check backend is running
- Verify CORS is configured on backend

See [DEPLOY_NOW.md](./DEPLOY_NOW.md) for detailed troubleshooting.

## 📞 Next Steps

After successful deployment:

1. **Custom Domain** - Configure in Netlify Domain settings
2. **Monitoring** - Set up error tracking (Sentry) and analytics
3. **Performance** - Optimize based on Lighthouse results
4. **Security** - Complete security review checklist
5. **CI/CD** - Automatic deployments are already enabled

## 📖 Additional Resources

- **Backend Setup**: See PRODUCTION_DEPLOYMENT_GUIDE.md Section 2
- **API Keys**: See PRODUCTION_DEPLOYMENT_GUIDE.md Section 2.3
- **Security**: See PRODUCTION_DEPLOYMENT_GUIDE.md Section 4
- **Performance**: See PRODUCTION_DEPLOYMENT_GUIDE.md Section 3

---

**Ready to deploy?** Start with [DEPLOY_NOW.md](./DEPLOY_NOW.md)

