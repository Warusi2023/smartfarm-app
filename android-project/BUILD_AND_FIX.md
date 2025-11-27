# Build and Fix Process

## Current Status

✅ **Fixed:**
- SQLDelight plugin ID: `app.cash.sqldelight` (version 2.0.0)
- All SQLDelight imports updated to `app.cash.sqldelight.*`
- Android screens wired to shared ViewModels
- iOS initialization added

⚠️ **Blocking Issue:**
- Kotlin Native 1.9.24 download (192MB) - This is a one-time download that happens during first build
- SQLDelight warning: "no databases set up" - May be false positive, need to verify after build

## Step-by-Step Build Process

### Step 1: Wait for Kotlin Native Download (or skip iOS temporarily)

**Option A: Wait for download** (Recommended)
- The download happens automatically on first build
- Once complete, it's cached for future builds
- Just wait ~2-5 minutes for the download to complete

**Option B: Temporarily disable iOS targets** (If you want to build Android only)
- Comment out iOS targets in `shared/build.gradle.kts`:
```kotlin
// iOS targets - Temporarily disabled for Android-only build
// listOf(
//     iosX64(),
//     iosArm64(),
//     iosSimulatorArm64()
// ).forEach { ... }
```

### Step 2: Build Shared Module (Android)

```bash
cd android-project
./gradlew :shared:compileKotlinAndroid
```

**Expected Output:**
- SQLDelight code generation in `shared/build/generated/sqldelight/`
- Generated `FarmDatabase.kt` file

### Step 3: Check Generated SQLDelight Code

**Location:** `shared/build/generated/sqldelight/code/Database/FarmDatabase.kt`

**What to Check:**
1. **Query Access Pattern:**
   - May be: `database.getAllFarms()` (direct methods)
   - Or: `database.farmQueries.getAllFarms()` (queries object)
   - Or: `database.farmDatabaseQueries.getAllFarms()` (old pattern)

2. **Return Types:**
   - Check if queries return `Query` objects or direct results
   - Check if `.asFlow()` is available or needs different approach

3. **Field Types:**
   - `createdAt`/`updatedAt` should be `Long` (INTEGER in SQL)
   - Check nullable fields match DTOs

### Step 4: Fix Repository Code

**Files to Update:**
- `shared/src/commonMain/kotlin/com/smartfarm/shared/data/repository/FarmRepository.kt`
- `shared/src/commonMain/kotlin/com/smartfarm/shared/data/repository/LivestockRepository.kt`
- `shared/src/commonMain/kotlin/com/smartfarm/shared/data/repository/CropRepository.kt`
- `shared/src/commonMain/kotlin/com/smartfarm/shared/data/repository/TaskRepository.kt`
- `shared/src/commonMain/kotlin/com/smartfarm/shared/data/repository/InventoryRepository.kt`
- `shared/src/commonMain/kotlin/com/smartfarm/shared/data/repository/FinancialRepository.kt`

**Common Fixes:**
1. Update query access pattern to match generated code
2. Fix timestamp conversions (`Long` ↔ `String`)
3. Handle nullable fields correctly
4. Update `.asFlow()` usage if needed

### Step 5: Fix DTO Type Mismatches

**Common Issues:**
- `createdAt`/`updatedAt`: SQLDelight uses `Long`, DTOs may use `String`
- Nullable fields: SQLDelight schema vs DTO definitions

**Fix Pattern:**
```kotlin
// In repository, convert Long to String for DTO
FarmDto(
    createdAt = farmRow.createdAt.toString(),
    updatedAt = farmRow.updatedAt.toString()
)

// When saving, convert String to Long
database.insertFarm(
    createdAt = farm.createdAt?.toLongOrNull() ?: System.currentTimeMillis(),
    updatedAt = farm.updatedAt?.toLongOrNull() ?: System.currentTimeMillis()
)
```

### Step 6: Build Android App

```bash
./gradlew :app:assembleDebug
```

**Fix any compilation errors:**
- Import issues
- Type mismatches
- Missing dependencies

### Step 7: Build iOS

**In Xcode:**
1. Open `ios/iosApp/iosApp.xcworkspace` (or `.xcodeproj`)
2. Build the project
3. Fix any iOS-specific issues

**Common iOS Issues:**
- Framework linking
- CocoaPods dependencies
- Swift/Kotlin interop

### Step 8: End-to-End Testing

**Android:**
- [ ] App launches
- [ ] Login works
- [ ] Dashboard loads data
- [ ] CRUD operations work (create, read, update, delete)
- [ ] Navigation works
- [ ] Offline caching works

**iOS:**
- [ ] App launches
- [ ] Login works
- [ ] Dashboard loads data
- [ ] CRUD operations work
- [ ] Navigation works
- [ ] Offline caching works

### Step 9: Remove Legacy Dependencies

**Files to Update:**
- `app/build.gradle.kts` - Remove Hilt, Room, DataStore, Retrofit
- `build.gradle.kts` - Remove Hilt plugin
- Delete old Android-only code:
  - `app/src/main/java/com/smartfarm/data/database/` (Room entities/DAOs)
  - `app/src/main/java/com/smartfarm/data/repository/` (old repositories)
  - `app/src/main/java/com/smartfarm/ui/viewmodel/` (old ViewModels)
  - `app/src/main/java/com/smartfarm/network/` (Retrofit interfaces)

**Dependencies to Remove:**
```kotlin
// Remove these from app/build.gradle.kts:
- implementation("com.google.dagger:hilt-android:2.48")
- kapt("com.google.dagger:hilt-android-compiler:2.48")
- implementation("androidx.hilt:hilt-navigation-compose:1.1.0")
- implementation("com.squareup.retrofit2:retrofit:2.9.0")
- implementation("com.squareup.retrofit2:converter-gson:2.9.0")
- implementation("androidx.room:room-runtime:2.6.1")
- implementation("androidx.room:room-ktx:2.6.1")
- kapt("androidx.room:room-compiler:2.6.1")
- implementation("androidx.datastore:datastore-preferences:1.0.0")
```

## Quick Reference: SQLDelight Query Patterns

### Pattern 1: Direct Methods (SQLDelight 2.0)
```kotlin
database.getAllFarms()
database.insertFarm(...)
database.updateFarm(...)
database.deleteFarm(id)
```

### Pattern 2: Queries Object
```kotlin
database.farmQueries.getAllFarms()
database.farmQueries.insertFarm(...)
```

### Pattern 3: Old Pattern (unlikely)
```kotlin
database.farmDatabaseQueries.getAllFarms()
```

### Flow Pattern
```kotlin
database.getAllFarms()
    .asFlow()
    .map { queryResult ->
        queryResult.executeAsList().map { row -> ... }
    }
```

## Notes

- SQLDelight 2.0 uses `app.cash.sqldelight` package
- Generated code location: `shared/build/generated/sqldelight/`
- Database class: `FarmDatabase` in package `com.smartfarm.shared.database`
- Schema files: `shared/src/commonMain/sqldelight/com/smartfarm/db/*.sq`

