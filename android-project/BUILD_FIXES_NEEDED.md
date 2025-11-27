# Build Fixes Needed

## 1. SQLDelight Package Migration
SQLDelight 2.0 uses `app.cash.sqldelight` instead of `com.squareup.sqldelight`.

### Files to Update:
- `shared/src/commonMain/kotlin/com/smartfarm/shared/data/database/DatabaseDriverFactory.kt`
  - Change: `com.squareup.sqldelight.db.SqlDriver` → `app.cash.sqldelight.db.SqlDriver`
- `shared/src/androidMain/kotlin/com/smartfarm/shared/data/database/DatabaseDriverFactory.android.kt`
  - Change: `com.squareup.sqldelight.driver.android.AndroidSqliteDriver` → `app.cash.sqldelight.driver.android.AndroidSqliteDriver`
- `shared/src/iosMain/kotlin/com/smartfarm/shared/data/database/DatabaseDriverFactory.ios.kt`
  - Change: `com.squareup.sqldelight.driver.native.NativeSqliteDriver` → `app.cash.sqldelight.driver.native.NativeSqliteDriver`

## 2. SQLDelight Database Name
The database is configured as "FarmDatabase" in `shared/build.gradle.kts`, but SQLDelight generates classes based on this name. The generated class will be `FarmDatabase` in package `com.smartfarm.shared.database`.

## 3. SQLDelight Query Access Pattern
After first build, check the generated `FarmDatabase.kt` file to see the actual query access pattern. It might be:
- `database.getAllFarms()` (direct methods)
- `database.farmQueries.getAllFarms()` (queries object)

## 4. DTO Field Mappings
Check DTO fields match SQLDelight schema:
- `createdAt` and `updatedAt` might be `Long` in SQLDelight but `String` in DTOs
- Date fields might need conversion

## 5. Kotlin Native Dependency Issue
The build is trying to download Kotlin Native 1.9.24. This should resolve automatically, but if it fails, we may need to:
- Update Kotlin version
- Add explicit repository for Kotlin Native

## Next Steps:
1. Fix SQLDelight package imports
2. Build shared module to generate database code
3. Check generated `FarmDatabase.kt` for actual API
4. Update repository code to match generated API
5. Fix DTO field type mismatches

