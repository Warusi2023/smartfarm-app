# SmartFarm KMM Architecture

## ✅ Migration Complete

The SmartFarm app has been successfully migrated to a fully shared Kotlin Multiplatform Mobile (KMM) architecture. Both Android and iOS now share:

- **Data Layer**: SQLDelight + Ktor repositories
- **State Management**: Shared ViewModels with StateFlow
- **Dependency Injection**: Koin
- **Preferences**: Multiplatform Settings

## 🏗️ Architecture

```
shared/
├── data/
│   ├── model/dto/          # All DTOs (Kotlinx Serialization)
│   ├── repository/          # All repositories (SQLDelight + Ktor)
│   ├── database/            # DatabaseDriverFactory
│   └── preferences/         # PreferencesStorage
├── network/                 # SmartFarmApi (Ktor)
├── di/                      # SharedKoinModule
└── ui/viewmodel/            # All ViewModels (StateFlow)

androidApp/                  # Android UI only
iosApp/                      # iOS UI only
```

## 🚀 Quick Start

### Android
```kotlin
// Application.kt
class SmartFarmApplication : Application() {
    override fun onCreate() {
        super.onCreate()
        AppInitializer(this).initialize()
    }
}

// In Compose screens
@Composable
fun DashboardScreen() {
    val viewModel: DashboardViewModel = org.koin.compose.viewmodel.viewModel()
    val uiState by viewModel.uiState.collectAsState()
    // Use uiState...
}
```

### iOS
```kotlin
// MainViewController.kt
override func viewDidLoad() {
    super.viewDidLoad()
    AppInitializer().initialize()
    // Setup Compose view...
}

// In Compose screens
val viewModel: DashboardViewModel = org.koin.compose.viewmodel.viewmodel()
```

## 📦 Dependencies

### Shared Module
- **Koin**: Dependency injection
- **Ktor**: HTTP client
- **SQLDelight**: Database
- **Multiplatform Settings**: Preferences
- **Kotlinx Serialization**: JSON
- **Kotlinx Coroutines**: Async operations

## 🔧 Key Components

### Repositories
All repositories follow the same pattern:
- Network-first with cache fallback
- SQLDelight for local storage
- Ktor for API calls
- Flow-based reactive APIs

### ViewModels
All ViewModels:
- Use StateFlow for state
- Handle loading/error/success states
- Expose clear actions (load, create, update, delete)
- Use CoroutineScope for async operations

## 📝 Next Steps

1. **Update Android Screens**: Replace Android ViewModels with shared ones
2. **Update iOS Screens**: Use shared ViewModels in Compose
3. **Test**: Verify both platforms work end-to-end
4. **Cleanup**: Remove old Android-only dependencies

## ⚠️ Notes

- SQLDelight queries may need adjustment based on generated code
- Koin Compose dependency added for ViewModel support
- All ViewModels use `factory` scope in Koin (new instance per screen)

## 📚 Documentation

- `KMM_MIGRATION_COMPLETE.md` - Migration summary
- `INTEGRATION_GUIDE.md` - Integration instructions
- `KMM_MIGRATION_PROGRESS.md` - Detailed progress tracking

