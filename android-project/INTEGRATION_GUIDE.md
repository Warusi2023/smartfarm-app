# Android & iOS Integration Guide

## ✅ Completed Migration

All repositories and ViewModels have been migrated to the shared module. Both Android and iOS can now use the same data layer and state management.

## Android Integration

### 1. Application Class Updated
`SmartFarmApplication.kt` now initializes Koin instead of Hilt:
```kotlin
class SmartFarmApplication : Application() {
    override fun onCreate() {
        super.onCreate()
        AppInitializer(this).initialize()
    }
}
```

### 2. Using Shared ViewModels in Android Screens

Example: Using DashboardViewModel in a Compose screen:

```kotlin
@Composable
fun DashboardScreen() {
    val viewModel: DashboardViewModel = org.koin.compose.viewmodel.viewModel()
    val uiState by viewModel.uiState.collectAsState()
    
    when {
        uiState.isLoading -> LoadingIndicator()
        uiState.error != null -> ErrorMessage(uiState.error)
        else -> DashboardContent(uiState)
    }
}
```

### 3. Dependency Injection
All dependencies are now provided via Koin:
- Repositories: `FarmRepository`, `LivestockRepository`, etc.
- ViewModels: `DashboardViewModel`, `FarmViewModel`, etc.
- API: `SmartFarmApi`
- Database: `FarmDatabase`

## iOS Integration

### 1. Initialize Koin in iOS App

Update `ios/iosApp/iosApp/MainViewController.kt`:

```kotlin
import com.smartfarm.shared.AppInitializer

class MainViewController: UIViewController {
    override func viewDidLoad() {
        super.viewDidLoad()
        
        // Initialize shared KMM app
        AppInitializer().initialize()
        
        let composeView = ComposeView()
        composeView.setContent {
            SmartFarmApp()
        }
        
        view.addSubview(composeView)
        // ... constraints
    }
}
```

### 2. Using Shared ViewModels in iOS

In Compose Multiplatform screens, use Koin to get ViewModels:

```kotlin
@Composable
fun DashboardScreen() {
    val viewModel: DashboardViewModel = org.koin.compose.viewmodel.viewModel()
    val uiState by viewModel.uiState.collectAsState()
    
    // Use uiState in your UI
}
```

## Next Steps

1. **Update Android Screens**: Replace Android ViewModels with shared ViewModels
2. **Update iOS Screens**: Use shared ViewModels in Compose screens
3. **Test Both Platforms**: Verify navigation, data loading, and auth flows
4. **Remove Old Code**: Clean up Hilt, Room, DataStore, Retrofit dependencies

## Testing Checklist

- [ ] Android app builds and runs
- [ ] iOS app builds and runs
- [ ] Login flow works on both platforms
- [ ] Dashboard loads data on both platforms
- [ ] CRUD operations work (create, read, update, delete)
- [ ] Offline caching works (network failure shows cached data)
- [ ] Navigation works correctly

## Migration Status

✅ **Completed:**
- All repositories migrated to SQLDelight + Ktor
- All ViewModels created in shared module
- Koin DI module configured
- Android/iOS initialization code created

⏳ **Remaining:**
- Update Android screens to use shared ViewModels
- Update iOS screens to use shared ViewModels
- Remove old Android-only dependencies
- End-to-end testing

