# Fixes to Apply After First Successful Build

## Step 1: Check Generated SQLDelight Code

**Location:** `shared/build/generated/sqldelight/code/Database/FarmDatabase.kt`

**What to Look For:**

1. **Query Access Pattern** - Check how queries are accessed:
   ```kotlin
   // Pattern A (most likely for SQLDelight 2.0):
   class FarmDatabase {
       fun getAllFarms(): Query<Farm>
       fun insertFarm(...)
   }
   
   // Pattern B:
   class FarmDatabase {
       val farmQueries: FarmQueries
   }
   class FarmQueries {
       fun getAllFarms(): Query<Farm>
   }
   ```

2. **Query Return Type** - Check if queries return:
   - `Query<Farm>` (needs `.executeAsList()`)
   - Direct `List<Farm>` (unlikely)

3. **Flow Support** - Check if `.asFlow()` is available:
   ```kotlin
   database.getAllFarms().asFlow()  // Should work
   ```

## Step 2: Update Repository Code

### If Pattern A (Direct Methods):

**Current Code (needs update):**
```kotlin
database.getAllFarms()
    .asFlow()
    .map { queryResult ->
        queryResult.executeAsList().map { ... }
    }
```

**Should Work As-Is** - No changes needed!

### If Pattern B (Queries Object):

**Update to:**
```kotlin
database.farmQueries.getAllFarms()
    .asFlow()
    .map { queryResult ->
        queryResult.executeAsList().map { ... }
    }
```

**Files to Update:**
- `FarmRepository.kt` - Change `database.getAllFarms()` → `database.farmQueries.getAllFarms()`
- `LivestockRepository.kt` - Change `database.getAllLivestock()` → `database.livestockQueries.getAllLivestock()`
- `CropRepository.kt` - Change `database.getAllCrops()` → `database.cropQueries.getAllCrops()`
- `TaskRepository.kt` - Change `database.getAllTasks()` → `database.taskQueries.getAllTasks()`
- `InventoryRepository.kt` - Change `database.getAllInventoryItems()` → `database.inventoryItemQueries.getAllInventoryItems()`
- `FinancialRepository.kt` - Change `database.getAllFinancialRecords()` → `database.financialRecordQueries.getAllFinancialRecords()`

## Step 3: Fix DTO Type Mismatches

### Timestamp Fields

**Issue:** SQLDelight uses `Long` (INTEGER), DTOs use `String?`

**Current Code (already correct):**
```kotlin
// When reading from database:
FarmDto(
    createdAt = farmRow.createdAt.toString(),
    updatedAt = farmRow.updatedAt.toString()
)

// When writing to database:
database.insertFarm(
    createdAt = farm.createdAt?.toLongOrNull() ?: System.currentTimeMillis(),
    updatedAt = farm.updatedAt?.toLongOrNull() ?: System.currentTimeMillis()
)
```

**Status:** ✅ Already handled correctly in repositories

### Nullable Fields

**Check these fields match between SQLDelight schema and DTOs:**

1. **FarmDto:**
   - `address` - SQLDelight: `TEXT`, DTO: `String` ✅
   - `createdAt`/`updatedAt` - Already handled ✅

2. **LivestockDto:**
   - `breed`, `birthDate`, `weight`, `status`, `location`, `description` - Check nullable status
   - SQLDelight schema uses `TEXT` (nullable), DTOs use `String?` ✅

3. **CropDto:**
   - `variety`, `area`, `status`, `notes` - Check nullable status
   - SQLDelight uses `TEXT NOT NULL` for some, DTOs may be nullable

**Action:** After build, verify each field's nullability matches

## Step 4: Fix Import Issues

**Check these imports in repository files:**

```kotlin
// Should be:
import app.cash.sqldelight.db.SqlDriver
import com.smartfarm.shared.database.FarmDatabase

// Not:
import com.squareup.sqldelight.db.SqlDriver  // ❌ Old package
```

**Status:** ✅ Already fixed

## Step 5: Build Android App

```bash
./gradlew :app:assembleDebug
```

**Common Errors to Fix:**

1. **Missing imports** - Add missing imports
2. **Type mismatches** - Fix DTO conversions
3. **Query access** - Update to match generated pattern
4. **Koin injection** - Verify ViewModels are injected correctly

## Step 6: Build iOS

**In Xcode:**
1. Open `ios/iosApp/iosApp.xcworkspace`
2. Build project
3. Fix any framework linking issues

## Step 7: Test Both Platforms

**Android:**
- Launch app
- Test login
- Test data loading
- Test CRUD operations

**iOS:**
- Launch app
- Test login
- Test data loading
- Test CRUD operations

## Step 8: Cleanup Legacy Code

**Remove from `app/build.gradle.kts`:**
```kotlin
// Remove Hilt
implementation("com.google.dagger:hilt-android:2.48")
kapt("com.google.dagger:hilt-android-compiler:2.48")
implementation("androidx.hilt:hilt-navigation-compose:1.1.0")

// Remove Room
implementation("androidx.room:room-runtime:2.6.1")
implementation("androidx.room:room-ktx:2.6.1")
kapt("androidx.room:room-compiler:2.6.1")

// Remove DataStore
implementation("androidx.datastore:datastore-preferences:1.0.0")

// Remove Retrofit
implementation("com.squareup.retrofit2:retrofit:2.9.0")
implementation("com.squareup.retrofit2:converter-gson:2.9.0")
implementation("com.squareup.okhttp3:okhttp:4.12.0")
implementation("com.squareup.okhttp3:logging-interceptor:4.12.0")
```

**Remove from `build.gradle.kts`:**
```kotlin
id("com.google.dagger.hilt.android") version "2.48" apply false
```

**Delete directories:**
- `app/src/main/java/com/smartfarm/data/database/` (Room)
- `app/src/main/java/com/smartfarm/data/repository/` (old repositories)
- `app/src/main/java/com/smartfarm/ui/viewmodel/` (old ViewModels)
- `app/src/main/java/com/smartfarm/network/` (Retrofit)

## Quick Fix Checklist

After first successful build:

- [ ] Check `shared/build/generated/sqldelight/code/Database/FarmDatabase.kt`
- [ ] Update repository query access patterns if needed
- [ ] Verify DTO field types match SQLDelight schema
- [ ] Fix any import errors
- [ ] Build Android app
- [ ] Fix Android compilation errors
- [ ] Build iOS
- [ ] Fix iOS compilation errors
- [ ] Test both platforms
- [ ] Remove legacy dependencies
- [ ] Update BUILD_*.md docs

