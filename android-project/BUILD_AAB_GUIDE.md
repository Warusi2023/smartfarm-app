# 📦 Building Signed Release AAB for Google Play Store

This guide explains how to build a signed Android App Bundle (AAB) for uploading to Google Play Store.

---

## ✅ Prerequisites

1. **Keystore File:** `smartfarm-upload-key.jks` (already exists in project root)
2. **Keystore Passwords:** Configured in `app/local.properties`
3. **Gradle:** Installed and configured
4. **Android SDK:** Installed via Android Studio

---

## 🚀 Quick Start

### Windows:
```bash
cd android-project
build-release-aab.bat
```

### macOS/Linux:
```bash
cd android-project
chmod +x build-release-aab.sh
./build-release-aab.sh
```

---

## 📋 Manual Steps

If you prefer to build manually:

### 1. Verify Keystore Configuration

Check `app/local.properties` contains:
```properties
KEYSTORE_PATH=smartfarm-upload-key.jks
KEYSTORE_PASSWORD=your_keystore_password
KEY_ALIAS=smartfarm-upload-key
KEY_PASSWORD=your_key_password
```

### 2. Clean Previous Builds
```bash
./gradlew clean
```

### 3. Build Release AAB
```bash
./gradlew bundleRelease
```

### 4. Find Your AAB
The signed AAB will be located at:
```
app/build/outputs/bundle/release/app-release.aab
```

---

## 🔐 Keystore Management

### Create a New Keystore (if needed)
```bash
keytool -genkey -v -keystore smartfarm-upload-key.jks \
  -keyalg RSA -keysize 2048 -validity 10000 \
  -alias smartfarm-upload-key
```

**Important:** Keep your keystore file and passwords secure! You'll need them for all future app updates.

### Verify Keystore
```bash
keytool -list -v -keystore smartfarm-upload-key.jks
```

---

## 📤 Uploading to Google Play Console

1. **Go to Google Play Console**
   - Navigate to: [play.google.com/console](https://play.google.com/console)

2. **Select Your App**
   - If app doesn't exist, create it first

3. **Navigate to Release**
   - Go to: **Production** → **New Release**

4. **Upload AAB**
   - Click **Upload** button
   - Select: `app/build/outputs/bundle/release/app-release.aab`

5. **Add Release Notes**
   ```
   🎉 Welcome to SmartFarm 1.0.0!
   
   Initial release featuring:
   • Complete livestock management system
   • Crop planning and monitoring tools
   • Financial tracking and reporting
   • Weather integration and alerts
   • Activity planning and reminders
   • Secure data storage and backup
   • Offline functionality
   • Multi-language support
   ```

6. **Review and Submit**
   - Review all information
   - Click **Review release**
   - Submit for Google review

---

## ⚠️ Troubleshooting

### Error: "Keystore passwords not configured"
**Solution:** Update `app/local.properties` with your actual keystore passwords.

### Error: "Keystore file not found"
**Solution:** 
- Ensure `smartfarm-upload-key.jks` exists in project root
- Or update `KEYSTORE_PATH` in `local.properties` to correct path

### Error: "Signing config not found"
**Solution:** 
- Verify keystore file exists
- Check passwords are correct in `local.properties`
- Ensure keystore alias matches `KEY_ALIAS` value

### Error: "Gradle build failed"
**Solution:**
- Check Android SDK is installed
- Verify Gradle wrapper is working: `./gradlew --version`
- Check for dependency issues: `./gradlew dependencies`

### Build succeeds but AAB is unsigned
**Solution:**
- Verify release signing config in `app/build.gradle.kts`
- Check keystore passwords are correct
- Ensure keystore file is accessible

---

## 📊 Build Output

After successful build, you'll see:
```
✅ Build Successful!

📱 AAB Location:
   app/build/outputs/bundle/release/app-release.aab

📊 AAB Size: ~15-25 MB (varies)
```

---

## 🔄 Updating the App

For future updates:
1. Increment `versionCode` in `app/build.gradle.kts`
2. Update `versionName` (e.g., "1.0.1")
3. Build new AAB using same keystore
4. Upload to Play Console

**Example version update:**
```kotlin
versionCode = 2  // Increment by 1
versionName = "1.0.1"  // Update version string
```

---

## 📝 Release Notes Template

Use this template for release notes:

```
🎉 SmartFarm [VERSION]

What's New:
• [Feature 1]
• [Feature 2]
• [Bug fixes]

Improvements:
• [Improvement 1]
• [Improvement 2]

Bug Fixes:
• [Bug fix 1]
• [Bug fix 2]
```

---

## 🔒 Security Best Practices

1. **Never commit keystore files** to version control
2. **Never commit passwords** in `local.properties`
3. **Backup keystore** to secure location
4. **Use different keystores** for debug and release
5. **Store passwords securely** (password manager)

---

## 📚 Additional Resources

- [Google Play Console Help](https://support.google.com/googleplay/android-developer/)
- [Android App Bundle Guide](https://developer.android.com/guide/app-bundle)
- [App Signing Best Practices](https://developer.android.com/studio/publish/app-signing)

---

**Last Updated:** January 2025

