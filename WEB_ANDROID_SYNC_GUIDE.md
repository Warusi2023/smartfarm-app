# Web-to-Android Synchronization Guide

This guide explains how to keep the web and Android projects synchronized so that users can access their accounts seamlessly from both platforms.

## 🎯 Overview

The synchronization system ensures that:
- API endpoints are identical across web and Android
- Authentication flows work the same way
- Data models stay in sync
- Configuration changes propagate automatically

## 📁 Key Files

### Shared Configuration
- **`shared-api-config.json`** - Single source of truth for all API endpoints and configuration
- **`sync-web-to-android.ps1`** - Main synchronization script
- **`generate-api-code.ps1`** - Code generator from shared config

### Web Project Files
- `web-project/public/js/api-config.js` - Web API configuration (auto-generated)
- `web-project/public/js/api-service.js` - Web API service implementation

### Android Project Files
- `android-project/shared/src/commonMain/kotlin/com/smartfarm/shared/di/SharedKoinModule.kt` - Android shared API base URL
- `android-project/shared/src/commonMain/kotlin/com/smartfarm/shared/network/SmartFarmApi.kt` - Android shared API client
- `android-project/app/src/main/java/com/smartfarm/network/SmartFarmApi.kt` - Android app API interface
- `android-project/app/build.gradle.kts` - Android build configuration

## 🚀 Quick Start

### 1. Initial Setup

```powershell
# Generate API code from shared configuration
.\generate-api-code.ps1

# Sync web changes to Android
.\sync-web-to-android.ps1
```

### 2. Making Changes

**When you change API endpoints in the web project:**

1. Update `shared-api-config.json` with the new endpoint
2. Run `.\generate-api-code.ps1` to regenerate code
3. Run `.\sync-web-to-android.ps1` to sync to Android

**Or use watch mode for automatic syncing:**

```powershell
# Watch for changes and auto-sync
.\sync-web-to-android.ps1 -Watch
```

## 📝 Workflow

### Standard Workflow

1. **Make changes in web project** (e.g., add new API endpoint)
2. **Update shared configuration** (`shared-api-config.json`)
3. **Generate code** (`.\generate-api-code.ps1`)
4. **Sync to Android** (`.\sync-web-to-android.ps1`)
5. **Test both platforms**

### Watch Mode Workflow

1. **Start watch mode** (`.\sync-web-to-android.ps1 -Watch`)
2. **Make changes in web project**
3. **Changes automatically sync to Android**

## 🔧 Configuration

### Shared API Configuration

Edit `shared-api-config.json` to change API endpoints:

```json
{
  "api": {
    "production": {
      "baseUrl": "https://smartfarm-app-production.up.railway.app",
      "endpoints": {
        "auth": {
          "login": "/api/auth/login",
          "register": "/api/auth/register"
        }
      }
    }
  }
}
```

### What Gets Synced

The synchronization script automatically updates:

1. **API Base URLs**
   - Android shared module (`SharedKoinModule.kt`)
   - Android app build config (`build.gradle.kts`)

2. **API Endpoints**
   - Android shared API client (`SmartFarmApi.kt`)
   - Android app API interface (`SmartFarmApi.kt`)

3. **Web API Configuration**
   - Web API config (`api-config.js`)

## 📋 Manual Synchronization Checklist

When making significant changes, verify these are synced:

- [ ] API base URL matches in both projects
- [ ] All authentication endpoints are identical
- [ ] All resource endpoints (farms, crops, livestock, etc.) match
- [ ] Request/response formats are compatible
- [ ] Error handling is consistent
- [ ] Authentication tokens work on both platforms

## 🔍 Verification

### Check API Configuration

**Web:**
```javascript
// In browser console
window.SmartFarmApiConfig.debug()
```

**Android:**
```kotlin
// Check SharedKoinModule.kt
const val API_BASE_URL = "https://smartfarm-app-production.up.railway.app"
```

### Test Synchronization

1. **Change API endpoint in web project**
2. **Run sync script**
3. **Verify Android project updated**
4. **Test both platforms**

## 🐛 Troubleshooting

### Sync Script Not Working

1. **Check file paths** - Ensure web-project and android-project directories exist
2. **Check permissions** - Ensure script has write permissions
3. **Check configuration** - Verify `shared-api-config.json` is valid JSON

### API Endpoints Don't Match

1. **Regenerate code**: `.\generate-api-code.ps1`
2. **Force sync**: `.\sync-web-to-android.ps1 -Force`
3. **Check manually**: Compare endpoint definitions in both projects

### Android Build Errors After Sync

1. **Clean build**: `cd android-project && ./gradlew clean`
2. **Rebuild**: `./gradlew build`
3. **Check syntax**: Verify generated Kotlin code is valid

## 📚 Best Practices

1. **Always update shared config first** - Don't edit generated files directly
2. **Test after syncing** - Verify both platforms work after changes
3. **Use watch mode during development** - Automatically sync changes
4. **Commit shared config** - Keep `shared-api-config.json` in version control
5. **Document API changes** - Update API documentation when endpoints change

## 🔄 CI/CD Integration

### GitHub Actions Example

```yaml
name: Sync Web to Android

on:
  push:
    paths:
      - 'web-project/**'
      - 'shared-api-config.json'

jobs:
  sync:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Generate API Code
        run: pwsh ./generate-api-code.ps1
      - name: Sync to Android
        run: pwsh ./sync-web-to-android.ps1
      - name: Commit Changes
        run: |
          git config user.name "Sync Bot"
          git config user.email "sync@smartfarm.com"
          git add android-project/
          git commit -m "Sync API changes from web to Android" || exit 0
          git push
```

## 📞 Support

If you encounter issues:

1. Check this guide first
2. Review the sync script logs
3. Verify shared configuration is valid
4. Test manually by comparing files

## 🎉 Benefits

With this synchronization system:

- ✅ **Single source of truth** - One config file for all platforms
- ✅ **Automatic syncing** - Changes propagate automatically
- ✅ **Consistent APIs** - Both platforms always match
- ✅ **Easy maintenance** - Update once, sync everywhere
- ✅ **Seamless user experience** - Users can switch between web and mobile seamlessly

---

**Remember**: Always test both platforms after syncing to ensure everything works correctly!

