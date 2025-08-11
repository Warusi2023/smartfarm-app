# 🚀 SmartFarm Web Application Deployment Guide

## 📋 Prerequisites
- GitHub account with SmartFarm repository access
- Node.js 18+ (for build tools)
- Git installed locally

## 🌐 Deployment Options

### 1. **Netlify (Recommended - Free)**
**Step-by-step deployment:**

1. **Build the application:**
   ```powershell
   cd web
   .\build.ps1
   ```

2. **Deploy to Netlify:**
   - Go to [netlify.com](https://netlify.com)
   - Sign up/Login with GitHub
   - Click "New site from Git"
   - Choose GitHub → SmartFarm repository
   - Set build settings:
     - Build command: `cd web && .\build.ps1`
     - Publish directory: `web/dist`
   - Click "Deploy site"

3. **Custom domain (optional):**
   - Go to Site settings → Domain management
   - Add custom domain
   - Configure DNS records

**Continuous Deployment:**
- Netlify automatically deploys on every push to master
- Preview deployments for pull requests
- Rollback to previous versions

### 2. **Vercel (Alternative - Free)**
1. Go to [vercel.com](https://vercel.com)
2. Import GitHub repository
3. Set build settings:
   - Framework Preset: Other
   - Build Command: `cd web && .\build.ps1`
   - Output Directory: `web/dist`
4. Deploy

### 3. **GitHub Pages**
1. Go to repository Settings → Pages
2. Source: Deploy from a branch
3. Branch: master
4. Folder: `/web/dist`
5. Save

### 4. **AWS S3 + CloudFront**
1. Create S3 bucket
2. Enable static website hosting
3. Upload dist folder contents
4. Configure CloudFront for CDN

## 🔄 Continuous Deployment Setup

### GitHub Actions Workflow
Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy SmartFarm Web

on:
  push:
    branches: [ master ]
  pull_request:
    branches: [ master ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
    
    - name: Build Web Application
      run: |
        cd web
        .\build.ps1
    
    - name: Deploy to Netlify
      uses: nwtgck/actions-netlify@v2.0
      with:
        publish-dir: './web/dist'
        production-branch: master
        github-token: ${{ secrets.GITHUB_TOKEN }}
        deploy-message: "Deploy from GitHub Actions"
      env:
        NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
        NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

### Environment Variables
Set these in GitHub repository secrets:
- `NETLIFY_AUTH_TOKEN`: Get from Netlify user settings
- `NETLIFY_SITE_ID`: Get from Netlify site settings

## 📱 PWA Deployment Checklist

- [ ] HTTPS enabled (required for service worker)
- [ ] Service worker registered
- [ ] Manifest.json configured
- [ ] Icons in multiple sizes
- [ ] Offline functionality tested
- [ ] Install prompt working

## 🧪 Testing Deployment

1. **Local testing:**
   ```powershell
   cd web/dist
   python -m http.server 8000
   # Open http://localhost:8000
   ```

2. **Production testing:**
   - Test all features on deployed site
   - Verify PWA installation
   - Check mobile responsiveness
   - Test offline functionality

## 🔧 Troubleshooting

### Common Issues:
1. **Build fails:** Check PowerShell execution policy
2. **Files not copied:** Verify source paths
3. **Service worker not working:** Ensure HTTPS
4. **PWA not installable:** Check manifest.json

### Debug Commands:
```powershell
# Check execution policy
Get-ExecutionPolicy

# Set execution policy (if needed)
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

# Verify build files
Get-ChildItem dist -Recurse
```

## 📊 Performance Optimization

- Enable gzip compression
- Use CDN for external libraries
- Optimize images
- Minify CSS/JS in production
- Enable browser caching

## 🔒 Security Considerations

- HTTPS only
- Content Security Policy headers
- XSS protection
- Secure service worker scope
- Validate all inputs

## 📈 Monitoring

- Set up analytics (Google Analytics, Plausible)
- Monitor Core Web Vitals
- Track PWA installs
- Monitor offline usage
- Error tracking (Sentry)

---

**Next Steps:**
1. Choose deployment platform
2. Set up continuous deployment
3. Configure custom domain
4. Test thoroughly
5. Monitor performance

For support, check the main README.md or create an issue in the repository.
