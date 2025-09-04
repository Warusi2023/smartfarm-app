# SmartFarm Project Structure Overview

## 🎯 Project Organization
The SmartFarm project has been reorganized into clear, separate modules to avoid confusion and improve development workflow.

## 📁 Main Directories

### 🚀 `android-project/` - Mobile Application
**Purpose**: Complete Android/iOS/Desktop application
**Contents**:
- Android app source code
- iOS app source code  
- Desktop app source code
- Shared Kotlin business logic
- Gradle build configuration
- App signing keys
- Project configuration files

**Quick Start**:
```bash
cd android-project
# Open in Android Studio or run: ./gradlew assembleDebug
```

### 🌐 `web-project/` - Web Application
**Purpose**: Web interface and landing page
**Contents**:
- Main landing page (index.html)
- Web application source code
- Static assets and resources
- Deployment configurations (Netlify, Vercel, Firebase)
- Kotlin JS store implementation

**Quick Start**:
```bash
cd web-project
# Open index.html in browser or use local server
python -m http.server 8000
```

### 🔧 `backend-api/` - Backend Services
**Purpose**: Server-side API and services
**Contents**:
- API endpoints and services
- Database management
- IoT device integration
- Analytics and reporting services

### 📱 `app-store-assets/` - Marketing Materials
**Purpose**: App store listing assets
**Contents**:
- App icons and banners
- Screenshots and promotional images
- Marketing copy and descriptions
- Store listing materials

### 📸 `screenshots/` - Application Screenshots
**Purpose**: Documentation and marketing screenshots
**Contents**:
- UI screenshots from all platforms
- Feature demonstrations
- Various device orientations

### 🔑 `keystore-backups/` - Security Keys
**Purpose**: App signing and security
**Contents**:
- Backup keystore files
- Signing key backups
- Security certificates

### 🚀 `launch-prep/` - Launch Materials
**Purpose**: Launch preparation and marketing
**Contents**:
- Launch checklists
- Marketing materials
- Press releases
- Launch strategies

### 📚 `advanced-features/` - Advanced Implementations
**Purpose**: Advanced feature development
**Contents**:
- Advanced feature implementations
- Experimental features
- Research and development

## 🔄 Development Workflow

### For Mobile Developers
1. Work in `android-project/` directory
2. Use Android Studio for development
3. Follow Android development best practices
4. Test on multiple platforms (Android, iOS, Desktop)

### For Web Developers
1. Work in `web-project/` directory
2. Use any modern code editor
3. Test in multiple browsers
4. Deploy to preferred hosting platform

### For Backend Developers
1. Work in `backend-api/` directory
2. Follow API design best practices
3. Ensure cross-platform compatibility
4. Maintain API documentation

## 📋 File Organization Rules

### ✅ What Goes Where
- **Android-specific**: `android-project/`
- **Web-specific**: `web-project/`
- **Backend-specific**: `backend-api/`
- **Marketing**: `app-store-assets/`
- **Documentation**: Root level or specific module
- **Scripts**: Root level (if cross-module) or specific module

### ❌ What NOT to Do
- Don't mix Android and web code in the same directory
- Don't place build artifacts in source directories
- Don't commit sensitive information (keys, passwords)
- Don't place temporary files in organized directories

## 🚀 Getting Started

### First Time Setup
1. **Clone the repository**
2. **Choose your development path**:
   - Mobile: `cd android-project`
   - Web: `cd web-project`
   - Backend: `cd backend-api`
3. **Follow module-specific README files**
4. **Set up development environment**

### Daily Development
1. **Navigate to your module directory**
2. **Make changes within your module**
3. **Test your changes**
4. **Commit and push changes**
5. **Update documentation if needed**

## 🔍 Finding Files

### Common File Locations
- **Android app**: `android-project/androidApp/`
- **Web app**: `web-project/web/`
- **Shared code**: `android-project/shared/`
- **Build files**: `android-project/build/`
- **Assets**: `web-project/public/`
- **Configuration**: Module root directories

### Search Tips
- Use your IDE's search functionality
- Check module-specific directories first
- Look for README files in each module
- Use the main README.md for overview

## 📚 Documentation

### Available Guides
- **Main README.md**: Overall project overview
- **Module READMEs**: Specific setup and usage
- **Project Structure**: This file for navigation
- **API Documentation**: In backend-api directory
- **User Guides**: In respective module directories

### Keeping Documentation Updated
- Update README files when making changes
- Document new features and configurations
- Keep setup instructions current
- Add troubleshooting guides for common issues

## 🆘 Need Help?

### Where to Look
1. **Module README files** for specific issues
2. **Main README.md** for overall guidance
3. **Project structure** for file locations
4. **Git history** for recent changes
5. **Issue tracker** for known problems

### Common Issues
- **Build errors**: Check module-specific setup
- **Missing files**: Verify file organization
- **Configuration issues**: Check module READMEs
- **Dependency problems**: Follow setup instructions

---

**Remember**: Each module is self-contained with its own setup and development workflow. Stay within your module directory to avoid confusion and maintain clean project organization.
