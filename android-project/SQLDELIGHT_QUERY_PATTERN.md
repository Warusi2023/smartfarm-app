# SQLDelight Query Access Pattern

## Note
SQLDelight generates query methods based on the `.sq` file names and query names. The actual generated API may differ from what's currently in the code.

## Expected Pattern
After building, SQLDelight will generate:
- `FarmDatabase` class with query methods
- Methods like `getAllFarms()`, `insertFarm()`, etc.

## Current Code Assumes
```kotlin
database.farmDatabaseQueries.getAllFarms()
database.farmDatabaseQueries.insertFarm(...)
```

## Actual SQLDelight 2.0 Pattern
SQLDelight 2.0 generates queries directly on the database object:
```kotlin
database.getAllFarms()
database.insertFarm(...)
```

## Fix Required
After first build, check the generated `FarmDatabase.kt` file and update repository code to match the actual generated API.

## Location of Generated Code
- Android: `shared/build/generated/sqldelight/code/Database/FarmDatabase.kt`
- iOS: Similar location in build output

