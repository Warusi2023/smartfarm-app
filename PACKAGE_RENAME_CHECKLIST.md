# SmartFarm Package Rename Verification Checklist

## ✅ **Package Rename Verification Checklist**

After running the package rename script, use this checklist to verify everything was updated correctly.

---

## **1. Build Configuration Files**

### **app/build.gradle.kts**
- [ ] `namespace = "com.yourcompany.smartfarm"`
- [ ] `applicationId = "com.yourcompany.smartfarm"`

### **shared/build.gradle.kts**
- [ ] `namespace = "com.yourcompany.smartfarm.shared"`

---

## **2. Directory Structure**

### **Main App Source**
- [ ] `app/src/main/java/com/yourcompany/smartfarm/` exists
- [ ] `app/src/main/java/com/example/smartfarm/` removed
- [ ] All source files moved to new location

### **Test Source**
- [ ] `app/src/test/java/com/yourcompany/smartfarm/` exists
- [ ] `app/src/androidTest/java/com/yourcompany/smartfarm/` exists
- [ ] All test files moved to new location

### **Shared Module**
- [ ] `shared/src/main/java/com/yourcompany/smartfarm/` exists
- [ ] All shared files moved to new location

---

## **3. Package Declarations**

### **Main Activity**
- [ ] `package com.yourcompany.smartfarm` in MainActivity.kt
- [ ] `package com.yourcompany.smartfarm` in SmartFarmApplication.kt

### **All Source Files**
- [ ] Check 5-10 random Kotlin files for correct package declaration
- [ ] No files still contain `package com.example.smartfarm`

---

## **4. Import Statements**

### **Internal Imports**
- [ ] All `import com.example.smartfarm.*` changed to `import com.yourcompany.smartfarm.*`
- [ ] No import errors in IDE

### **Cross-Module Imports**
- [ ] Shared module imports updated correctly
- [ ] Main app imports from shared module updated

---

## **5. AndroidManifest.xml**

### **Package References**
- [ ] All `com.example.smartfarm` references changed to `com.yourcompany.smartfarm`
- [ ] Activity names updated correctly
- [ ] Service names updated correctly

---

## **6. ProGuard Rules**

### **Keep Rules**
- [ ] `app/proguard-rules.pro` updated
- [ ] All `com.example.smartfarm` references changed to `com.yourcompany.smartfarm`

---

## **7. Documentation Files**

### **Markdown Files**
- [ ] All `.md` files updated with new package name
- [ ] No references to old package name remain

---

## **8. Build and Test**

### **Clean Build**
- [ ] Run `./gradlew clean`
- [ ] Run `./gradlew build`
- [ ] No build errors related to package names

### **App Functionality**
- [ ] App launches without crashes
- [ ] All screens load correctly
- [ ] Navigation works properly
- [ ] Database operations work

---

## **9. IDE Verification**

### **Android Studio/IntelliJ**
- [ ] No red underlines for package references
- [ ] Auto-completion works for new package
- [ ] Refactoring tools recognize new package structure

---

## **10. Final Verification**

### **Release Build**
- [ ] `./gradlew assembleRelease` succeeds
- [ ] Generated APK/AAB has correct package name
- [ ] App installs and runs on device

---

## **🚨 Common Issues to Watch For**

1. **Import Statement Errors**
   - Some files might have missed updates
   - Check for red underlines in IDE

2. **Package Declaration Mismatch**
   - File location doesn't match package declaration
   - Move files to correct directory if needed

3. **Build Configuration Issues**
   - Gradle sync might fail initially
   - Clean and rebuild project

4. **Database Migration Issues**
   - If using Room, might need to update database name
   - Check for database-related crashes

---

## **🔧 Troubleshooting Commands**

```bash
# Clean project
./gradlew clean

# Build project
./gradlew build

# Check for any remaining old package references
grep -r "com.example.smartfarm" app/ shared/

# Check new package structure
find app/src -name "*.kt" | head -10
find shared/src -name "*.kt" | head -5
```

---

## **📱 Play Store Readiness**

After completing this checklist:

- [ ] Package name is production-ready (`com.yourcompany.smartfarm`)
- [ ] App builds successfully
- [ ] All functionality works correctly
- [ ] No development/testing package references remain

**Your app will now be ready for Play Store upload! 🎉**
