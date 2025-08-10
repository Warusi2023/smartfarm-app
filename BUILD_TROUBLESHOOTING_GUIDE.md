# Build Troubleshooting Guide

## 🚨 Current Issue: Kotlin Compilation Error

### **Error Details**
```
> Task :app:kaptGenerateStubsReleaseKotlin FAILED
e: Could not load module <Error module>
```

### **Root Cause Analysis**
The error indicates a Kotlin compilation issue during the kapt (Kotlin Annotation Processing Tool) phase, specifically when processing Hilt annotations for the release build.

## 🔧 Troubleshooting Steps

### **Step 1: Clean and Rebuild**
```bash
# Clean the project
.\gradlew.bat clean

# Clear Gradle cache
.\gradlew.bat cleanBuildCache

# Rebuild
.\gradlew.bat assembleDebug
```

### **Step 2: Check Java Version**
The error message mentioned "Please set the JAVA_HOME variable". Ensure you have:
- **Java 8 or 11** (recommended for Android development)
- **JAVA_HOME** environment variable set correctly

```bash
# Check Java version
java -version

# Check JAVA_HOME
echo $env:JAVA_HOME
```

### **Step 3: Verify Hilt Configuration**

#### **Check build.gradle.kts**
```kotlin
// Ensure these are present
buildscript {
    dependencies {
        classpath("com.google.dagger:hilt-android-gradle-plugin:2.47")
    }
}

plugins {
    id("org.jetbrains.kotlin.kapt")
}

apply(plugin = "dagger.hilt.android.plugin")

dependencies {
    implementation("com.google.dagger:hilt-android:2.47")
    kapt("com.google.dagger:hilt-android-compiler:2.47")
    implementation("androidx.hilt:hilt-navigation-compose:1.1.0")
}
```

#### **Check Application Class**
```kotlin
@HiltAndroidApp
class SmartFarmApplication : Application() {
    // ...
}
```

#### **Check AndroidManifest.xml**
```xml
<application
    android:name=".SmartFarmApplication"
    ...>
```

### **Step 4: Check for Circular Dependencies**

#### **Common Issues**
1. **Circular Dependencies**: Classes injecting each other
2. **Missing @Inject Constructor**: Classes used in @Inject without proper constructor
3. **Missing @Provides Methods**: Dependencies not provided in modules

#### **Check These Files**
- `SmartFarmApplication.kt`
- `AppModule.kt`
- All ViewModels with @HiltViewModel
- All classes with @Inject constructor

### **Step 5: Alternative Build Approaches**

#### **Option A: Build Debug First**
```bash
# Try debug build first
.\gradlew.bat assembleDebug

# If successful, then try release
.\gradlew.bat assembleRelease
```

#### **Option B: Build Without Optimization**
```bash
# Temporarily disable optimization
.\gradlew.bat assembleRelease -PdisableOptimization=true
```

#### **Option C: Build with Verbose Output**
```bash
# Get detailed error information
.\gradlew.bat assembleRelease --info --stacktrace
```

## 🛠️ Quick Fix Script

### **Create build-fix.ps1**
```powershell
# SmartFarm Build Fix Script
Write-Host "Fixing build issues..." -ForegroundColor Green

# Step 1: Clean everything
Write-Host "Cleaning project..." -ForegroundColor Yellow
.\gradlew.bat clean
.\gradlew.bat cleanBuildCache

# Step 2: Check Java
Write-Host "Checking Java..." -ForegroundColor Yellow
java -version
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Java not found. Please install Java 8 or 11" -ForegroundColor Red
    exit 1
}

# Step 3: Try debug build first
Write-Host "Building debug version..." -ForegroundColor Yellow
.\gradlew.bat assembleDebug
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Debug build successful" -ForegroundColor Green
    
    # Step 4: Try release build
    Write-Host "Building release version..." -ForegroundColor Yellow
    .\gradlew.bat assembleRelease
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Release build successful!" -ForegroundColor Green
    } else {
        Write-Host "❌ Release build failed" -ForegroundColor Red
    }
} else {
    Write-Host "❌ Debug build failed" -ForegroundColor Red
}
```

## 🔍 Common Solutions

### **Solution 1: Update Hilt Version**
```kotlin
// In build.gradle.kts
buildscript {
    dependencies {
        classpath("com.google.dagger:hilt-android-gradle-plugin:2.48")
    }
}

dependencies {
    implementation("com.google.dagger:hilt-android:2.48")
    kapt("com.google.dagger:hilt-android-compiler:2.48")
}
```

### **Solution 2: Fix Circular Dependencies**
```kotlin
// Instead of this (circular dependency):
class A @Inject constructor(private val b: B)
class B @Inject constructor(private val a: A)

// Do this (use @Lazy or @AssistedInject):
class A @Inject constructor(@Lazy private val b: B)
class B @Inject constructor(@Lazy private val a: A)
```

### **Solution 3: Add Missing @Provides**
```kotlin
@Module
@InstallIn(SingletonComponent::class)
object AppModule {
    @Provides
    @Singleton
    fun provideMissingDependency(): MissingDependency {
        return MissingDependency()
    }
}
```

### **Solution 4: Fix Import Issues**
```kotlin
// Ensure all imports are correct
import dagger.hilt.android.HiltAndroidApp
import dagger.hilt.android.lifecycle.HiltViewModel
import javax.inject.Inject
import javax.inject.Singleton
```

## 📋 Verification Checklist

### **Before Building**
- [ ] Java 8 or 11 installed and JAVA_HOME set
- [ ] All Hilt annotations are correct
- [ ] No circular dependencies
- [ ] All @Inject constructors are properly defined
- [ ] All dependencies are provided in modules

### **After Fixing**
- [ ] Debug build succeeds
- [ ] Release build succeeds
- [ ] ProGuard mapping is generated
- [ ] APK is created successfully
- [ ] App installs and runs correctly

## 🚀 Next Steps After Fix

### **1. Test the Release Build**
```bash
# Build release APK
.\gradlew.bat assembleRelease

# Check APK location
ls app/build/outputs/apk/release/
```

### **2. Install and Test**
```bash
# Install on device
adb install app/build/outputs/apk/release/app-release.apk

# Test functionality
# - App launches
# - All screens work
# - Database operations
# - Network calls
# - Google services
```

### **3. Check ProGuard Output**
```bash
# Verify mapping file
ls app/build/outputs/mapping/release/mapping.txt

# Check APK size
ls -la app/build/outputs/apk/release/app-release.apk
```

## 📞 Support Resources

- **Hilt Documentation**: https://dagger.dev/hilt/
- **Kotlin Kapt**: https://kotlinlang.org/docs/kapt.html
- **Android Gradle Plugin**: https://developer.android.com/studio/build
- **ProGuard Documentation**: https://www.guardsquare.com/proguard

---

**Status**: 🔧 **TROUBLESHOOTING REQUIRED** - Build compilation error needs to be resolved before proceeding with release testing. 