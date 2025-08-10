# SmartFarm Production Deployment Guide

## 🚀 **Production Deployment Options**

SmartFarm is ready for production deployment. Choose one of the following platforms:

### **Option 1: Netlify (Recommended)**
**Best for:** Static hosting with automatic deployments, custom domains, and SSL

#### **Step-by-Step Netlify Deployment:**

1. **Create Netlify Account**
   - Go to [netlify.com](https://netlify.com)
   - Sign up with GitHub, GitLab, or email

2. **Deploy from Git (Recommended)**
   ```bash
   # Connect your GitHub repository
   1. Click "New site from Git"
   2. Choose your SmartFarm repository
   3. Set build settings:
      - Build command: ./gradlew :web:build
      - Publish directory: web/build/distributions/web
   4. Click "Deploy site"
   ```

3. **Deploy from Files (Alternative)**
   ```bash
   # Build the application first
   ./gradlew :web:build
   
   # Upload the build files
   1. Go to Netlify dashboard
   2. Drag and drop the 'web/build/distributions/web' folder
   3. Site will be deployed automatically
   ```

4. **Configure Environment Variables**
   ```bash
   # In Netlify dashboard > Site settings > Environment variables
   GOOGLE_MAPS_API_KEY=your_google_maps_api_key
   OPENWEATHER_API_KEY=your_openweather_api_key
   OPENAI_API_KEY=your_openai_api_key
   ```

5. **Custom Domain (Optional)**
   - Go to Site settings > Domain management
   - Add your custom domain
   - SSL certificate will be provided automatically

---

### **Option 2: Vercel**
**Best for:** Fast deployments, serverless functions, edge computing

#### **Step-by-Step Vercel Deployment:**

1. **Create Vercel Account**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub, GitLab, or email

2. **Deploy from Git**
   ```bash
   # Connect your repository
   1. Click "New Project"
   2. Import your SmartFarm repository
   3. Configure build settings:
      - Framework Preset: Other
      - Build Command: ./gradlew :web:build
      - Output Directory: web/build/distributions/web
   4. Click "Deploy"
   ```

3. **Configure Environment Variables**
   ```bash
   # In Vercel dashboard > Project settings > Environment variables
   GOOGLE_MAPS_API_KEY=your_google_maps_api_key
   OPENWEATHER_API_KEY=your_openweather_api_key
   OPENAI_API_KEY=your_openai_api_key
   ```

---

### **Option 3: GitHub Pages**
**Best for:** Free hosting, direct integration with GitHub

#### **Step-by-Step GitHub Pages Deployment:**

1. **Enable GitHub Pages**
   ```bash
   # In your GitHub repository
   1. Go to Settings > Pages
   2. Source: Deploy from a branch
   3. Branch: main (or your preferred branch)
   4. Folder: / (root)
   5. Click "Save"
   ```

2. **Create GitHub Actions Workflow**
   Create `.github/workflows/deploy.yml`:
   ```yaml
   name: Deploy to GitHub Pages
   
   on:
     push:
       branches: [ main ]
   
   jobs:
     build-and-deploy:
       runs-on: ubuntu-latest
       steps:
       - uses: actions/checkout@v3
       
       - name: Set up JDK
         uses: actions/setup-java@v3
         with:
           java-version: '11'
           distribution: 'temurin'
       
       - name: Build with Gradle
         run: ./gradlew :web:build
       
       - name: Deploy to GitHub Pages
         uses: peaceiris/actions-gh-pages@v3
         with:
           github_token: ${{ secrets.GITHUB_TOKEN }}
           publish_dir: ./web/build/distributions/web
   ```

3. **Configure Environment Variables**
   ```bash
   # In GitHub repository > Settings > Secrets and variables > Actions
   GOOGLE_MAPS_API_KEY=your_google_maps_api_key
   OPENWEATHER_API_KEY=your_openweather_api_key
   OPENAI_API_KEY=your_openai_api_key
   ```

---

## 🗄️ **Production Database Setup**

### **PostgreSQL Database Configuration**

1. **Choose Database Provider**
   - **Heroku Postgres** (Free tier available)
   - **Supabase** (Free tier available)
   - **Railway** (Free tier available)
   - **AWS RDS** (Paid, enterprise)

2. **Database Setup Steps**
   ```bash
   # 1. Create database instance
   # 2. Get connection details
   # 3. Update environment variables
   
   # Environment variables for production:
   DB_USER=your_db_user
   DB_PASSWORD=your_db_password
   DB_NAME=your_db_name
   DB_HOST=your_db_host
   DB_PORT=5432
   NODE_ENV=production
   ```

3. **Run Database Migrations**
   ```bash
   # In your backend deployment
   npm run db:migrate
   npm run db:seed
   ```

---

## 🔑 **API Keys Configuration**

### **Required API Keys**

1. **Google Maps API**
   - Go to [Google Cloud Console](https://console.cloud.google.com)
   - Create new project or select existing
   - Enable Maps JavaScript API
   - Create API key
   - Restrict key to your domain

2. **OpenWeather API**
   - Go to [OpenWeatherMap](https://openweathermap.org/api)
   - Sign up for free account
   - Get API key
   - No domain restrictions needed

3. **OpenAI API**
   - Go to [OpenAI Platform](https://platform.openai.com)
   - Create account
   - Get API key
   - Set usage limits

### **Environment Variables Setup**
```bash
# Add these to your hosting platform's environment variables
GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
OPENWEATHER_API_KEY=your_openweather_api_key_here
OPENAI_API_KEY=your_openai_api_key_here
```

---

## 🧪 **Testing Deployed Application**

### **Pre-Deployment Testing Checklist**

- [ ] **Build Test**
  ```bash
  ./gradlew :web:build
  # Verify build completes without errors
  ```

- [ ] **Local Testing**
  ```bash
  # Test locally first
  ./gradlew :web:run
  # Open http://localhost:8080
  ```

- [ ] **Feature Testing**
  - [ ] Home dashboard loads
  - [ ] Navigation works
  - [ ] All 14 feature modules accessible
  - [ ] Multi-language switching works
  - [ ] Responsive design on mobile

### **Post-Deployment Testing**

- [ ] **Production URL Testing**
  - [ ] Application loads correctly
  - [ ] All features functional
  - [ ] API integrations work
  - [ ] PWA features work

- [ ] **Performance Testing**
  - [ ] Page load times < 3 seconds
  - [ ] Mobile performance good
  - [ ] Lighthouse score > 90

- [ ] **Cross-Browser Testing**
  - [ ] Chrome/Chromium
  - [ ] Firefox
  - [ ] Safari
  - [ ] Edge

---

## 📊 **Monitoring and Analytics**

### **Recommended Tools**

1. **Google Analytics**
   - Track user behavior
   - Monitor performance
   - Set up conversion tracking

2. **Sentry (Error Monitoring)**
   - Track JavaScript errors
   - Monitor performance issues
   - Get real-time alerts

3. **Uptime Monitoring**
   - Pingdom
   - UptimeRobot
   - StatusCake

---

## 🔒 **Security Checklist**

- [ ] **HTTPS Enabled**
  - All platforms provide SSL certificates
  - Verify HTTPS redirects work

- [ ] **API Key Security**
  - Keys are in environment variables
  - Keys are not exposed in client-side code
  - Keys have appropriate restrictions

- [ ] **Content Security Policy**
  - Add CSP headers
  - Restrict external resources

- [ ] **CORS Configuration**
  - Configure CORS for your domain
  - Restrict to necessary origins

---

## 🚀 **Quick Deployment Commands**

### **For Netlify (CLI)**
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build and deploy
./gradlew :web:build
netlify deploy --dir=web/build/distributions/web --prod
```

### **For Vercel (CLI)**
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

### **For GitHub Pages**
```bash
# Push to GitHub with GitHub Actions workflow
git add .
git commit -m "Deploy to production"
git push origin main
```

---

## 📞 **Support and Troubleshooting**

### **Common Issues**

1. **Build Failures**
   - Check Gradle version compatibility
   - Verify all dependencies are available
   - Check Java version (requires Java 11+)

2. **API Key Issues**
   - Verify keys are correctly set in environment variables
   - Check API key restrictions
   - Verify billing is enabled (for Google Maps)

3. **Database Connection Issues**
   - Verify database credentials
   - Check network connectivity
   - Ensure database is accessible from deployment platform

### **Getting Help**

- **Documentation:** Check project documentation files
- **Issues:** Create GitHub issue with detailed error information
- **Community:** Post in relevant forums or communities

---

## 🎉 **Deployment Success Checklist**

- [ ] Application deployed successfully
- [ ] Custom domain configured (if applicable)
- [ ] SSL certificate active
- [ ] Environment variables configured
- [ ] Database connected and migrated
- [ ] API keys working
- [ ] All features tested
- [ ] Performance optimized
- [ ] Monitoring set up
- [ ] Documentation updated

---

**SmartFarm is ready for production! Choose your deployment platform and follow the steps above. 🌾🚀** 