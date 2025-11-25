# 🔧 Android Emulator Troubleshooting Guide

## Common Reasons Why App Won't Run on Emulator

Based on your Android Studio setup, here are the most likely issues and solutions:

---

## 🔴 **Issue 1: No Emulator Created/Started**

### Symptoms:
- "Running Devices" panel shows only icons (no actual device)
- No device appears in device dropdown
- Cannot select a device to run on

### Solution:

#### **Step 1: Create Virtual Device**
1. **Open Device Manager:**
   - **Tools** → **Device Manager**
   - OR click **Device Manager** icon in toolbar (phone icon)

2. **Create New Device:**
   - Click **Create Device** button (or **+** icon)
   - **Select Hardware:**
     - Choose **Pixel 5** (recommended for screenshots)
     - OR **Pixel 6** (newer, better performance)
   - Click **Next**

3. **Select System Image:**
   - Choose **API 34** (Android 14) - **Recommended**
   - OR **API 33** (Android 13)
   - If not installed, click **Download** (this may take 10-20 minutes)
   - Click **Next**

4. **Configure Device:**
   - **Device Name:** Pixel 5 API 34 (or your choice)
   - **Orientation:** Portrait
   - Click **Finish**

#### **Step 2: Start Emulator**
1. In **Device Manager**, find your created device
2. Click **▶ Play** button next to the device
3. Wait for emulator to boot (1-3 minutes)
4. Emulator window should open showing Android home screen

#### **Step 3: Verify Emulator is Running**
- ✅ Emulator window is open
- ✅ Android home screen is visible
- ✅ Device appears in Android Studio device dropdown (top toolbar)
- ✅ Device shows as "Online" in Device Manager

---

## 🟡 **Issue 2: Wrong Module Selected**

### Symptoms:
- Build succeeds but app doesn't launch
- "androidApp" selected but app module exists

### Solution:

#### **Check Which Module to Run:**

Your project has TWO modules:
1. **`androidApp`** - Main Kotlin Multiplatform app module ✅ **USE THIS**
2. **`app`** - Legacy/backup module (ignore)

#### **Verify Selection:**
1. In Android Studio toolbar, check dropdown shows: **androidApp**
2. If it shows "app", change it to **androidApp**
3. Device dropdown should show your emulator

---

## 🟡 **Issue 3: Build Configuration Issues**

### Symptoms:
- Build fails with errors
- Gradle sync issues
- Missing dependencies

### Solution:

#### **Step 1: Clean and Rebuild**
1. **Build** → **Clean Project**
2. Wait for clean to complete
3. **Build** → **Rebuild Project**
4. Wait for rebuild to complete

#### **Step 2: Sync Gradle**
1. **File** → **Sync Project with Gradle Files**
2. Wait for sync to complete
3. Check for any errors in **Build** tab

#### **Step 3: Invalidate Caches**
1. **File** → **Invalidate Caches...**
2. Check all options
3. Click **Invalidate and Restart**
4. Wait for Android Studio to restart

---

## 🟡 **Issue 4: Missing MainActivity or Entry Point**

### Symptoms:
- Build succeeds but app crashes on launch
- "No launcher activity found" error

### Solution:

#### **Check MainActivity Exists:**
1. Navigate to: `androidApp/src/main/java/` (or `kotlin/`)
2. Look for `MainActivity.kt` file
3. If missing, create it (see below)

#### **Verify AndroidManifest.xml:**
1. Open: `androidApp/src/main/AndroidManifest.xml`
2. Check for:
   ```xml
   <activity
       android:name=".MainActivity"
       android:exported="true">
       <intent-filter>
           <action android:name="android.intent.action.MAIN" />
           <category android:name="android.intent.category.LAUNCHER" />
       </intent-filter>
   </activity>
   ```

---

## 🟡 **Issue 5: Emulator Performance Issues**

### Symptoms:
- Emulator is very slow
- App takes forever to launch
- Emulator freezes

### Solution:

#### **Enable Hardware Acceleration:**
1. **Tools** → **SDK Manager**
2. **SDK Tools** tab
3. Check **Intel x86 Emulator Accelerator (HAXM installer)**
4. Click **Apply** and install
5. Restart Android Studio

#### **Use x86/x86_64 System Image:**
- When creating emulator, choose **x86_64** system image (not ARM)
- Much faster on Intel/AMD processors

#### **Reduce Emulator Resources:**
1. In Device Manager, click **Edit** (pencil icon) on your device
2. **Show Advanced Settings**
3. Reduce:
   - **RAM:** 2048 MB (instead of 4096)
   - **VM heap:** 256 MB
   - **Internal Storage:** 2048 MB

---

## 🟡 **Issue 6: ADB Connection Issues**

### Symptoms:
- Device shows as "Offline"
- "ADB not responding" error
- Device not detected

### Solution:

#### **Restart ADB:**
1. **Tools** → **SDK Manager**
2. **SDK Tools** tab
3. Find **Android SDK Platform-Tools**
4. In terminal (Android Studio → Terminal tab):
   ```bash
   adb kill-server
   adb start-server
   adb devices
   ```

#### **Check ADB Path:**
1. **File** → **Settings** → **Appearance & Behavior** → **System Settings** → **Android SDK**
2. Verify **Android SDK Location** is correct
3. Check **SDK Platform-Tools** is installed

---

## ✅ **Step-by-Step: Getting App to Run**

### **Complete Setup Process:**

1. **✅ Open Project**
   - File → Open → `E:\Document\SmartFarm\android-project`
   - Wait for Gradle sync

2. **✅ Create Emulator**
   - Tools → Device Manager
   - Create Device → Pixel 5 → API 34
   - Finish

3. **✅ Start Emulator**
   - Click ▶ Play button
   - Wait for boot (1-3 minutes)

4. **✅ Select Module**
   - In toolbar, select **androidApp** from module dropdown
   - Select your emulator from device dropdown

5. **✅ Run App**
   - Click **▶ Run** button (or `Shift+F10`)
   - Wait for build and install
   - App should launch on emulator

---

## 🔍 **Verify Everything is Ready**

### **Checklist:**

- [ ] Project opens without errors
- [ ] Gradle sync completes successfully
- [ ] Build succeeds (`BUILD SUCCESSFUL`)
- [ ] Emulator created in Device Manager
- [ ] Emulator is running (window open, Android home screen visible)
- [ ] Device appears in Android Studio device dropdown
- [ ] Module selected: **androidApp**
- [ ] No red errors in Build tab
- [ ] MainActivity exists in `androidApp/src/main/`

---

## 🚨 **If Still Not Working**

### **Check Logcat for Errors:**
1. **View** → **Tool Windows** → **Logcat**
2. Filter by: **Error** or **Exception**
3. Look for:
   - `ActivityNotFoundException`
   - `ClassNotFoundException`
   - `No launcher activity`
   - Build errors

### **Try Running from Terminal:**
```bash
cd android-project
./gradlew installDebug
adb shell am start -n com.yourcompany.smartfarm.android/.MainActivity
```

### **Check Run Configuration:**
1. **Run** → **Edit Configurations...**
2. Select **androidApp**
3. Verify:
   - **Module:** androidApp
   - **Launch:** Default Activity
   - **Target:** Your emulator

---

## 📝 **Quick Fixes**

### **Fix 1: Restart Everything**
1. Close Android Studio
2. Stop all emulators
3. Restart Android Studio
4. Open project
5. Start emulator
6. Run app

### **Fix 2: Recreate Emulator**
1. Delete existing emulator in Device Manager
2. Create new one (Pixel 5, API 34)
3. Start it
4. Run app

### **Fix 3: Clean Build**
1. Build → Clean Project
2. Build → Rebuild Project
3. File → Invalidate Caches → Restart
4. Run app

---

## 💡 **Best Practices**

1. **Always use x86_64 system images** (faster)
2. **Keep emulator running** between runs (faster)
3. **Use Pixel 5 or Pixel 6** (good for screenshots)
4. **Enable hardware acceleration** (much faster)
5. **Keep Android Studio updated**

---

## 🔗 **Useful Commands**

### **Check Connected Devices:**
```bash
adb devices
```

### **Install APK Manually:**
```bash
adb install app/build/outputs/apk/debug/app-debug.apk
```

### **Launch App Manually:**
```bash
adb shell am start -n com.yourcompany.smartfarm.android/.MainActivity
```

### **View Logs:**
```bash
adb logcat
```

---

## 📞 **Still Having Issues?**

### **Check These:**
1. Android Studio version (should be latest)
2. Android SDK installed (API 34)
3. Java/JDK version (should be JDK 17)
4. System requirements met (RAM, disk space)
5. Antivirus not blocking Android Studio

### **Common Error Messages:**

**"No target device found"**
→ Create and start emulator

**"ADB not responding"**
→ Restart ADB: `adb kill-server && adb start-server`

**"INSTALL_FAILED_INSUFFICIENT_STORAGE"**
→ Free up space on emulator or increase storage

**"Activity not found"**
→ Check AndroidManifest.xml has launcher activity

---

**Last Updated:** January 2025

