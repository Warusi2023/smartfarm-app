# SmartFarm Source Code Structure Guide

This guide explains the complete source code structure for the SmartFarm multiplatform application.

## 🏗️ **Project Architecture**

The project follows a clean architecture pattern with clear separation of concerns:

```
SmartFarm/
├── shared/                          # Shared business logic
│   ├── domain/                     # Domain layer
│   │   ├── model/                  # Data models
│   │   ├── repository/             # Repository interfaces
│   │   └── usecase/                # Business logic use cases
│   ├── di/                         # Dependency injection
│   └── sqldelight/                 # Database schemas
├── web/                            # Web application
│   ├── ui/                         # User interface components
│   │   ├── screens/                # Screen components
│   │   └── theme/                  # Styling and themes
├── desktop/                        # Desktop application
│   ├── ui/                         # User interface components
│   │   ├── screens/                # Screen components
│   │   └── theme/                  # Styling and themes
└── ios/                            # iOS framework (structure only)
```

## 📱 **Shared Module (Core Business Logic)**

### **Domain Models**

#### **Farm.kt**
```kotlin
data class Farm(
    val id: String,
    val name: String,
    val location: Location,
    val size: Double,
    val type: FarmType,
    val status: FarmStatus,
    val createdAt: Long,
    val updatedAt: Long
)
```
- **Purpose**: Represents a farm entity with location, size, and status
- **Usage**: Core entity for farm management operations
- **Serialization**: Uses `@Serializable` for cross-platform data transfer

#### **Crop.kt**
```kotlin
data class Crop(
    val id: String,
    val farmId: String,
    val name: String,
    val variety: String,
    val type: CropType,
    val plantingDate: Long,
    val expectedHarvestDate: Long,
    val area: Double,
    val status: CropStatus,
    val health: CropHealth,
    val yield: Yield? = null
)
```
- **Purpose**: Manages crop information and lifecycle
- **Features**: Planting dates, harvest tracking, health monitoring
- **Relationships**: Linked to farms via `farmId`

#### **Livestock.kt**
```kotlin
data class Livestock(
    val id: String,
    val farmId: String,
    val tagNumber: String,
    val name: String?,
    val type: LivestockType,
    val breed: String,
    val birthDate: Long,
    val gender: Gender,
    val weight: Double,
    val status: LivestockStatus,
    val health: LivestockHealth
)
```
- **Purpose**: Tracks livestock inventory and health
- **Features**: Vaccination records, treatments, health monitoring
- **Relationships**: Linked to farms via `farmId`

### **Repository Interfaces**

#### **FarmRepository.kt**
```kotlin
interface FarmRepository {
    suspend fun getAllFarms(): List<Farm>
    suspend fun getFarmById(id: String): Farm?
    suspend fun getFarmsByType(type: FarmType): List<Farm>
    suspend fun getFarmsByStatus(status: FarmStatus): List<Farm>
    suspend fun searchFarms(query: String): List<Farm>
    suspend fun createFarm(farm: Farm): Farm
    suspend fun updateFarm(farm: Farm): Farm
    suspend fun deleteFarm(id: String): Boolean
    suspend fun getFarmsStream(): Flow<List<Farm>>
    suspend fun getFarmStream(id: String): Flow<Farm?>
}
```
- **Purpose**: Defines contract for farm data operations
- **Features**: CRUD operations, search, streaming data
- **Platform**: Repository implementations will be platform-specific

#### **CropRepository.kt** & **LivestockRepository.kt**
- Similar pattern to FarmRepository
- Platform-specific implementations for database access
- Streaming support for real-time updates

### **Use Cases**

#### **GetFarmsUseCase.kt**
```kotlin
class GetFarmsUseCase(
    private val farmRepository: FarmRepository
) {
    suspend operator fun invoke(): List<Farm>
    suspend operator fun invoke(id: String): Farm?
    suspend operator fun invoke(type: FarmType): List<Farm>
    suspend operator fun invoke(status: FarmStatus): List<Farm>
    suspend operator fun invoke(query: String): List<Farm>
    fun getFarmsStream(): Flow<List<Farm>>
    fun getFarmStream(id: String): Flow<Farm?>
}
```
- **Purpose**: Encapsulates business logic for farm retrieval
- **Features**: Multiple query patterns, streaming support
- **Usage**: Injected into ViewModels/ViewControllers

#### **ManageFarmUseCase.kt**
```kotlin
class ManageFarmUseCase(
    private val farmRepository: FarmRepository
) {
    suspend operator fun invoke(farm: Farm): Farm
    suspend fun createFarm(farm: Farm): Farm
    suspend fun updateFarm(farm: Farm): Farm
    suspend fun deleteFarm(id: String): Boolean
}
```
- **Purpose**: Handles farm creation, updates, and deletion
- **Features**: Smart CRUD operations with validation

### **Database Schema (SQLDelight)**

#### **Farm.sq**
```sql
CREATE TABLE Farm (
    id TEXT NOT NULL PRIMARY KEY,
    name TEXT NOT NULL,
    latitude REAL NOT NULL,
    longitude REAL NOT NULL,
    address TEXT,
    size REAL NOT NULL,
    type TEXT NOT NULL,
    status TEXT NOT NULL,
    createdAt INTEGER NOT NULL,
    updatedAt INTEGER NOT NULL
);
```
- **Purpose**: Defines farm data structure
- **Features**: Location coordinates, size tracking, status management
- **Queries**: Predefined SQL queries for common operations

#### **Crop.sq**
```sql
CREATE TABLE Crop (
    id TEXT NOT NULL PRIMARY KEY,
    farmId TEXT NOT NULL,
    name TEXT NOT NULL,
    variety TEXT NOT NULL,
    type TEXT NOT NULL,
    plantingDate INTEGER NOT NULL,
    expectedHarvestDate INTEGER NOT NULL,
    area REAL NOT NULL,
    status TEXT NOT NULL,
    health TEXT NOT NULL,
    -- ... additional fields
    FOREIGN KEY (farmId) REFERENCES Farm(id) ON DELETE CASCADE
);
```
- **Purpose**: Crop data storage with farm relationships
- **Features**: Foreign key constraints, cascade deletes
- **Queries**: Optimized queries for crop management

### **Dependency Injection**

#### **SharedModule.kt**
```kotlin
val sharedModule = module {
    single { GetFarmsUseCase(get()) }
    single { ManageFarmUseCase(get()) }
}
```
- **Purpose**: Provides shared dependencies across platforms
- **Features**: Use case injection, repository contracts
- **Platform**: Repository implementations provided by platform modules

## 🌐 **Web Module**

### **Main Application**

#### **App.kt**
```kotlin
@Composable
fun App() {
    var currentScreen by remember { mutableStateOf<Screen>(Screen.Dashboard) }
    
    Column {
        Header(currentScreen, onScreenChange = { screen -> currentScreen = screen })
        
        when (currentScreen) {
            Screen.Dashboard -> DashboardScreen()
            Screen.Farms -> Text("Farms Screen")
            Screen.Crops -> Text("Crops Screen")
            Screen.Livestock -> Text("Livestock Screen")
            Screen.Analytics -> Text("Analytics Screen")
        }
    }
}
```
- **Purpose**: Main web application entry point
- **Features**: Navigation, screen management, responsive layout
- **Technology**: Compose Web with Material Design

#### **DashboardScreen.kt**
```kotlin
@Composable
fun DashboardScreen() {
    Div(attrs = { classes("dashboard") }) {
        H2(attrs = { classes("screen-title") }) {
            Text("Farm Dashboard")
        }
        
        Div(attrs = { classes("dashboard-grid") }) {
            // Farm Overview Card
            // Recent Activity Card
            // Weather Card
            // Quick Actions Card
        }
    }
}
```
- **Purpose**: Main dashboard with farm overview
- **Features**: Grid layout, responsive cards, action buttons
- **Styling**: CSS classes for consistent theming

### **Theme System**

#### **AppTheme.kt**
```kotlin
@Composable
fun AppTheme(content: @Composable () -> Unit) {
    Style {
        unsafeCSS("""
            :root {
                --primary-color: #2E7D32;
                --secondary-color: #4CAF50;
                --accent-color: #8BC34A;
                --background-color: #F5F5F5;
                --surface-color: #FFFFFF;
                --text-primary: #212121;
                --text-secondary: #757575;
            }
            // ... additional CSS
        """)
    }
    content()
}
```
- **Purpose**: Consistent styling across web application
- **Features**: CSS custom properties, Material Design colors
- **Benefits**: Easy theming, responsive design support

## 🖥️ **Desktop Module**

### **Main Application**

#### **Main.kt**
```kotlin
fun main() = application {
    val windowState = rememberWindowState()
    
    Window(
        onCloseRequest = ::exitApplication,
        state = windowState,
        title = "SmartFarm Desktop"
    ) {
        DesktopTheme {
            App()
        }
    }
}
```
- **Purpose**: Desktop application entry point
- **Features**: Window management, native desktop experience
- **Technology**: Compose for Desktop with Material 3

#### **App.kt**
```kotlin
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun App() {
    var selectedScreen by remember { mutableStateOf(Screen.Dashboard) }
    
    Scaffold(
        topBar = { TopAppBar(title = { Text("SmartFarm Desktop") }) }
    ) { paddingValues ->
        Row {
            NavigationRail { /* Navigation items */ }
            Box { /* Content area */ }
        }
    }
}
```
- **Purpose**: Desktop application main interface
- **Features**: Navigation rail, top app bar, screen management
- **Layout**: Side navigation with content area

### **Screen Components**

#### **DashboardScreen.kt**
```kotlin
@Composable
fun DashboardScreen() {
    Column {
        Text("Farm Dashboard", style = MaterialTheme.typography.headlineMedium)
        
        LazyVerticalGrid(columns = GridCells.Fixed(2)) {
            item { DashboardCard(title = "Farm Overview", content = { /* Content */ }) }
            item { DashboardCard(title = "Recent Activity", content = { /* Content */ }) }
            item { DashboardCard(title = "Weather", content = { /* Content */ }) }
            item { DashboardCard(title = "Quick Actions", content = { /* Content */ }) }
        }
    }
}
```
- **Purpose**: Desktop dashboard with grid layout
- **Features**: Material 3 design, responsive grid, card components
- **Benefits**: Native desktop experience, consistent with web version

#### **Other Screens**
- **FarmsScreen.kt**: Farm management interface
- **CropsScreen.kt**: Crop management interface
- **LivestockScreen.kt**: Livestock management interface
- **AnalyticsScreen.kt**: Analytics and reporting interface

### **Theme System**

#### **DesktopTheme.kt**
```kotlin
@Composable
fun DesktopTheme(
    darkTheme: Boolean = false,
    content: @Composable () -> Unit
) {
    val colorScheme = if (darkTheme) DarkColorScheme else LightColorScheme
    
    MaterialTheme(
        colorScheme = colorScheme,
        content = content
    )
}
```
- **Purpose**: Material 3 theming for desktop
- **Features**: Light/dark theme support, consistent color scheme
- **Benefits**: Native Material Design experience

## 🔧 **How to Use**

### **1. Adding New Features**

#### **Step 1: Define Domain Model**
```kotlin
@Serializable
data class NewFeature(
    val id: String,
    val name: String,
    val description: String,
    val createdAt: Long
)
```

#### **Step 2: Create Repository Interface**
```kotlin
interface NewFeatureRepository {
    suspend fun getAll(): List<NewFeature>
    suspend fun create(feature: NewFeature): NewFeature
    suspend fun update(feature: NewFeature): NewFeature
    suspend fun delete(id: String): Boolean
}
```

#### **Step 3: Implement Use Cases**
```kotlin
class GetNewFeaturesUseCase(
    private val repository: NewFeatureRepository
) {
    suspend operator fun invoke(): List<NewFeature> = repository.getAll()
}
```

#### **Step 4: Add to Dependency Injection**
```kotlin
val sharedModule = module {
    single { GetNewFeaturesUseCase(get()) }
}
```

#### **Step 5: Create UI Components**
```kotlin
@Composable
fun NewFeatureScreen() {
    // UI implementation
}
```

### **2. Platform-Specific Implementations**

#### **Android (app module)**
- Implement repository interfaces with Room database
- Use Android-specific UI components
- Handle platform-specific permissions

#### **iOS (ios module)**
- Implement repository interfaces with Core Data
- Use SwiftUI for native iOS experience
- Handle iOS-specific features

#### **Web (web module)**
- Implement repository interfaces with IndexedDB/API
- Use Compose Web components
- Handle browser-specific features

#### **Desktop (desktop module)**
- Implement repository interfaces with SQLite
- Use Compose for Desktop components
- Handle desktop-specific features

### **3. Testing Strategy**

#### **Unit Tests**
```kotlin
@Test
fun `should return farms when getting all farms`() = runTest {
    // Given
    val mockRepository = mockk<FarmRepository>()
    val useCase = GetFarmsUseCase(mockRepository)
    
    // When
    coEvery { mockRepository.getAllFarms() } returns listOf(farm1, farm2)
    val result = useCase()
    
    // Then
    assertEquals(2, result.size)
}
```

#### **Integration Tests**
- Test repository implementations
- Test use case interactions
- Test database operations

#### **Platform Tests**
- Android: Instrumented tests
- iOS: XCTest framework
- Web: Browser testing
- Desktop: UI testing

## 📚 **Best Practices**

### **1. Architecture**
- Keep business logic in shared module
- Platform-specific code in respective modules
- Use dependency injection for loose coupling
- Follow single responsibility principle

### **2. Data Management**
- Use SQLDelight for database operations
- Implement repository pattern consistently
- Use Kotlin Flow for reactive data
- Handle errors gracefully

### **3. UI Development**
- Reuse components across platforms when possible
- Follow Material Design guidelines
- Implement responsive layouts
- Use consistent theming

### **4. Testing**
- Write tests for all business logic
- Mock external dependencies
- Test error scenarios
- Maintain high test coverage

## 🚀 **Next Steps**

1. **Implement Repository Classes**: Create platform-specific repository implementations
2. **Add More Use Cases**: Expand business logic for additional features
3. **Enhance UI Components**: Add more screens and interactive elements
4. **Implement Real Data**: Connect to actual databases and APIs
5. **Add Authentication**: Implement user management and security
6. **Performance Optimization**: Add caching and optimization strategies
7. **Error Handling**: Implement comprehensive error handling
8. **Logging and Monitoring**: Add logging and analytics

## 📖 **Additional Resources**

- [Kotlin Multiplatform Documentation](https://kotlinlang.org/docs/multiplatform.html)
- [Compose Multiplatform Guide](https://www.jetbrains.com/lp/compose-multiplatform/)
- [SQLDelight Documentation](https://cashapp.github.io/sqldelight/)
- [Koin Documentation](https://insert-koin.io/)
- [Material Design Guidelines](https://material.io/design)

This structure provides a solid foundation for building a scalable, maintainable multiplatform application with clear separation of concerns and consistent patterns across all platforms.
