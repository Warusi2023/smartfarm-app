# 🚀 SmartFarm Production Deployment Guide

## 📋 **Overview**
This guide provides step-by-step instructions for deploying your SmartFarm app to production environments.

## 🔧 **Pre-Deployment Checklist**

### ✅ **Configuration Updates Required**
1. **API Endpoints**: Update production URLs in `ApiConfig.kt`
2. **Environment**: Switch to `Environment.PRODUCTION`
3. **Service Type**: Set to `ServiceType.REAL_API`
4. **Authentication**: Configure JWT tokens and security
5. **Database**: Ensure production database is ready

### ✅ **Security Requirements**
1. **HTTPS**: All API endpoints must use HTTPS
2. **Authentication**: JWT tokens properly configured
3. **CORS**: Cross-origin requests properly configured
4. **Rate Limiting**: API rate limiting implemented
5. **Input Validation**: All user inputs validated

## 🌐 **Production Environment Setup**

### **Step 1: Update API Configuration**
```kotlin
// In shared/src/commonMain/kotlin/com/yourcompany/smartfarm/shared/config/ApiConfig.kt

// Change environment to production
val currentEnvironment = Environment.PRODUCTION

// Update base URLs with your actual production endpoints
private val baseUrls = mapOf(
    Environment.DEVELOPMENT to "http://localhost:3000/api",
    Environment.STAGING to "https://staging-api.yourfarm.com/api",
    Environment.PRODUCTION to "https://api.yourfarm.com/api" // ← Your production URL
)
```

### **Step 2: Enable Real API Service**
```kotlin
// In shared/src/commonMain/kotlin/com/yourcompany/smartfarm/shared/services/ServiceFactory.kt

// Switch to real API service
val currentServiceType = ServiceType.REAL_API
```

### **Step 3: Configure Authentication**
```kotlin
// In your app initialization
val realApiService = RealApiService()
realApiService.setAuthToken("your-production-jwt-token")
```

## 📱 **Platform-Specific Deployment**

### **Android Deployment**
1. **Build Configuration**:
   ```gradle
   // In app/build.gradle.kts
   android {
       buildTypes {
           release {
               minifyEnabled true
               proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
               signingConfig signingConfigs.release
           }
       }
   }
   ```

2. **Signing Configuration**:
   ```gradle
   signingConfigs {
       release {
           storeFile file("keystore/release.keystore")
           storePassword System.getenv("KEYSTORE_PASSWORD")
           keyAlias System.getenv("KEY_ALIAS")
           keyPassword System.getenv("KEY_PASSWORD")
       }
   }
   ```

3. **Build Commands**:
   ```bash
   # Build release APK
   ./gradlew :app:assembleRelease
   
   # Build release bundle (for Play Store)
   ./gradlew :app:bundleRelease
   ```

### **Desktop Deployment**
1. **Build Configuration**:
   ```gradle
   // In shared/build.gradle.kts
   kotlin {
       jvm {
           compilations.all {
               kotlinOptions {
                   jvmTarget = "11"
               }
           }
       }
   }
   ```

2. **Build Commands**:
   ```bash
   # Build JAR file
   ./gradlew :shared:jar
   
   # Build with dependencies
   ./gradlew :shared:jvmJar
   ```

### **Web Deployment**
1. **Build Configuration**:
   ```gradle
   // In shared/build.gradle.kts
   kotlin {
       js(IR) {
           browser {
               commonWebpackConfig {
                   cssSupport {
                       enabled.set(true)
                   }
               }
           }
       }
   }
   ```

2. **Build Commands**:
   ```bash
   # Build web assets
   ./gradlew :shared:jsBrowserProductionWebpack
   
   # Deploy to web server
   cp -r shared/build/dist/js/productionExecutable/* /var/www/html/
   ```

## 🚀 **Deployment Options**

### **Option 1: Traditional Hosting**
1. **Web Server**: Apache/Nginx for web version
2. **Application Server**: Tomcat/Jetty for JAR deployment
3. **Mobile**: Google Play Store / Apple App Store
4. **Desktop**: Direct distribution or package managers

### **Option 2: Cloud Deployment**
1. **AWS**:
   - S3 for web assets
   - EC2 for backend API
   - RDS for database
   - CloudFront for CDN

2. **Google Cloud**:
   - Cloud Storage for web assets
   - Compute Engine for backend
   - Cloud SQL for database
   - Cloud CDN for distribution

3. **Azure**:
   - Blob Storage for web assets
   - App Service for backend
   - SQL Database for data
   - CDN for content delivery

### **Option 3: Container Deployment**
1. **Docker**:
   ```dockerfile
   FROM openjdk:11-jre-slim
   COPY shared/build/libs/shared-jvm.jar app.jar
   EXPOSE 8080
   ENTRYPOINT ["java", "-jar", "/app.jar"]
   ```

2. **Kubernetes**:
   ```yaml
   apiVersion: apps/v1
   kind: Deployment
   metadata:
     name: smartfarm-app
   spec:
     replicas: 3
     selector:
       matchLabels:
         app: smartfarm
     template:
       metadata:
         labels:
           app: smartfarm
       spec:
         containers:
         - name: smartfarm
           image: your-registry/smartfarm:latest
           ports:
           - containerPort: 8080
   ```

## 🔐 **Security Configuration**

### **JWT Configuration**
```kotlin
// In your production environment
val jwtSecret = System.getenv("JWT_SECRET") ?: "your-super-secure-secret"
val jwtExpiration = 24 * 60 * 60 * 1000L // 24 hours

// Configure JWT in your backend
app.use(jwt({
    secret: jwtSecret,
    algorithms: ['HS256']
}))
```

### **CORS Configuration**
```javascript
// In your backend server
app.use(cors({
    origin: [
        'https://yourfarm.com',
        'https://app.yourfarm.com',
        'https://admin.yourfarm.com'
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))
```

### **Rate Limiting**
```javascript
// In your backend server
const rateLimit = require('express-rate-limit');

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.'
});

app.use('/api/', apiLimiter);
```

## 📊 **Monitoring & Logging**

### **Application Monitoring**
1. **Performance Metrics**:
   - Response times
   - Error rates
   - User activity
   - API usage

2. **Health Checks**:
   ```kotlin
   // Health check endpoint
   app.get('/api/health') { req, res ->
       res.json({
           status: 'OK',
           timestamp: System.currentTimeMillis(),
           version: '1.0.0',
           uptime: process.uptime()
       })
   }
   ```

### **Logging Configuration**
```kotlin
// Configure logging levels for production
logging {
    level {
        root = "INFO"
        com.yourcompany.smartfarm = "DEBUG"
    }
}
```

## 🧪 **Testing Production Deployment**

### **Pre-Launch Testing**
1. **Smoke Tests**: Basic functionality verification
2. **Load Tests**: Performance under stress
3. **Security Tests**: Vulnerability assessment
4. **Integration Tests**: End-to-end workflow testing

### **Post-Launch Monitoring**
1. **Error Tracking**: Monitor for crashes and errors
2. **Performance Monitoring**: Track response times and throughput
3. **User Analytics**: Monitor user behavior and engagement
4. **System Health**: Monitor server resources and database performance

## 🚨 **Rollback Plan**

### **Emergency Rollback**
1. **Database Backup**: Ensure recent backups are available
2. **Previous Version**: Keep previous stable version ready
3. **Rollback Scripts**: Automated rollback procedures
4. **Communication Plan**: Notify users of maintenance

### **Rollback Commands**
```bash
# Revert to previous version
git revert HEAD
./gradlew clean build

# Restore previous database
pg_restore -d smartfarm_prod backup_$(date -d '1 day ago' +%Y%m%d).sql
```

## 📋 **Deployment Checklist**

### **Pre-Deployment**
- [ ] All tests passing
- [ ] Security audit completed
- [ ] Performance testing completed
- [ ] Database migration tested
- [ ] Backup procedures verified
- [ ] Monitoring configured
- [ ] Rollback plan ready

### **Deployment**
- [ ] Production environment configured
- [ ] Database migrated
- [ ] Application deployed
- [ ] Health checks passing
- [ ] Monitoring active
- [ ] Smoke tests completed

### **Post-Deployment**
- [ ] Performance monitoring active
- [ ] Error tracking configured
- [ ] User feedback collected
- [ ] System metrics reviewed
- [ ] Documentation updated

## 🎉 **Production Ready!**

Your SmartFarm app is now configured for production deployment with:
- ✅ **Multi-platform support** (Android, Desktop, Web)
- ✅ **Production API configuration** (HTTPS, JWT, CORS)
- ✅ **Security hardening** (Rate limiting, Input validation)
- ✅ **Monitoring & logging** (Health checks, Performance metrics)
- ✅ **Rollback procedures** (Emergency recovery plan)

**Ready to deploy and serve real farmers!** 🚀🌾
