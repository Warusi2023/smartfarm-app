# SmartFarm Web Version Setup Guide

## 🎯 **Web Version Overview**

### **Benefits of Web Version**
- **Cross-platform**: Works on Windows, Mac, Linux, Chrome OS
- **No installation**: Access via browser
- **Progressive Web App (PWA)**: Can be installed like a native app
- **Real-time updates**: Instant deployment of new features
- **Shared codebase**: Reuse existing business logic

### **Technology Stack**
- **Kotlin Multiplatform**: Share code between Android and Web
- **Compose for Web**: Declarative UI framework
- **Kotlin/JS**: JavaScript compilation
- **Gradle**: Build system
- **Webpack**: Module bundling

## 🔧 **1. Project Structure Setup**

### **Step 1: Create Web Module**
```kotlin
// settings.gradle.kts
include(":app")
include(":shared")
include(":web")
```

### **Step 2: Web Module Structure**
```
web/
├── build.gradle.kts
├── src/
│   └── main/
│       ├── kotlin/
│       │   └── com/example/smartfarm/web/
│       │       ├── Main.kt
│       │       ├── App.kt
│       │       ├── ui/
│       │       │   ├── components/
│       │       │   ├── screens/
│       │       │   └── theme/
│       │       └── utils/
│       └── resources/
│           ├── index.html
│           ├── styles.css
│           └── assets/
└── webpack.config.js
```

## 📦 **2. Dependencies Configuration**

### **Step 1: Root build.gradle.kts**
```kotlin
// build.gradle.kts (root)
plugins {
    kotlin("multiplatform") version "1.9.0" apply false
    kotlin("plugin.serialization") version "1.9.0" apply false
    id("org.jetbrains.compose") version "1.5.0" apply false
}

allprojects {
    repositories {
        google()
        mavenCentral()
        maven("https://maven.pkg.jetbrains.space/public/p/compose/dev")
    }
}
```

### **Step 2: Shared Module**
```kotlin
// shared/build.gradle.kts
plugins {
    kotlin("multiplatform")
    kotlin("plugin.serialization")
    id("org.jetbrains.compose")
}

kotlin {
    jvm("android")
    js("web") {
        browser {
            commonWebpackConfig {
                cssSupport {
                    enabled.set(true)
                }
            }
        }
        binaries.executable()
    }
    
    sourceSets {
        val commonMain by getting {
            dependencies {
                implementation(compose.runtime)
                implementation(compose.foundation)
                implementation(compose.material3)
                implementation(compose.ui)
                implementation("org.jetbrains.kotlinx:kotlinx-serialization-json:1.5.1")
                implementation("org.jetbrains.kotlinx:kotlinx-coroutines-core:1.7.3")
            }
        }
        
        val androidMain by getting {
            dependencies {
                // Android-specific dependencies
            }
        }
        
        val webMain by getting {
            dependencies {
                implementation(compose.web.core)
                implementation(compose.web.svg)
                implementation(compose.runtime)
            }
        }
    }
}
```

### **Step 3: Web Module**
```kotlin
// web/build.gradle.kts
plugins {
    kotlin("multiplatform")
    id("org.jetbrains.compose")
}

kotlin {
    js("web") {
        browser {
            commonWebpackConfig {
                cssSupport {
                    enabled.set(true)
                }
            }
        }
        binaries.executable()
    }
    
    sourceSets {
        val webMain by getting {
            dependencies {
                implementation(project(":shared"))
                implementation(compose.web.core)
                implementation(compose.web.svg)
                implementation(compose.runtime)
            }
        }
    }
}
```

## 🌐 **3. Web Application Setup**

### **Step 1: Main Entry Point**
```kotlin
// web/src/main/kotlin/com/example/smartfarm/web/Main.kt
package com.example.smartfarm.web

import org.jetbrains.compose.web.renderComposable
import com.example.smartfarm.web.App

fun main() {
    renderComposable(rootElementId = "root") {
        App()
    }
}
```

### **Step 2: Main App Component**
```kotlin
// web/src/main/kotlin/com/example/smartfarm/web/App.kt
package com.example.smartfarm.web

import androidx.compose.runtime.*
import com.example.smartfarm.web.ui.theme.AppTheme
import com.example.smartfarm.web.ui.screens.HomeScreen
import com.example.smartfarm.web.ui.navigation.Navigation

@Composable
fun App() {
    AppTheme {
        Navigation()
    }
}
```

### **Step 3: HTML Template**
```html
<!-- web/src/main/resources/index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SmartFarm</title>
    <link rel="stylesheet" href="styles.css">
    <link rel="manifest" href="manifest.json">
    <meta name="theme-color" content="#4CAF50">
</head>
<body>
    <div id="root"></div>
    <script src="SmartFarm-web.js"></script>
</body>
</html>
```

### **Step 4: CSS Styles**
```css
/* web/src/main/resources/styles.css */
body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background-color: #f5f5f5;
}

#root {
    min-height: 100vh;
}

/* PWA Styles */
.app-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
}

/* Responsive Design */
@media (max-width: 768px) {
    .app-container {
        padding: 10px;
    }
}
```

## 🎨 **4. UI Components**

### **Step 1: Theme Setup**
```kotlin
// web/src/main/kotlin/com/example/smartfarm/web/ui/theme/Theme.kt
package com.example.smartfarm.web.ui.theme

import androidx.compose.runtime.*
import androidx.compose.web.css.*

object AppTheme {
    val primaryColor = Color("#4CAF50")
    val secondaryColor = Color("#8BC34A")
    val backgroundColor = Color("#F5F5F5")
    val surfaceColor = Color("#FFFFFF")
    val textColor = Color("#212121")
    val textSecondaryColor = Color("#757575")
    
    val spacing = object {
        val small = 8.px
        val medium = 16.px
        val large = 24.px
        val xlarge = 32.px
    }
    
    val borderRadius = 8.px
    val shadow = "0 2px 4px rgba(0,0,0,0.1)"
}

@Composable
fun AppTheme(content: @Composable () -> Unit) {
    content()
}
```

### **Step 2: Navigation Component**
```kotlin
// web/src/main/kotlin/com/example/smartfarm/web/ui/navigation/Navigation.kt
package com.example.smartfarm.web.ui.navigation

import androidx.compose.runtime.*
import androidx.compose.web.elements.*
import androidx.compose.web.css.*
import com.example.smartfarm.web.ui.screens.*

@Composable
fun Navigation() {
    var currentRoute by remember { mutableStateOf("home") }
    
    Div({
        style {
            display(DisplayStyle.Flex)
            flexDirection(FlexDirection.Column)
            minHeight(100.vh)
        }
    }) {
        TopNavigation(
            currentRoute = currentRoute,
            onRouteChange = { currentRoute = it }
        )
        
        MainContent(currentRoute = currentRoute)
    }
}

@Composable
private fun TopNavigation(
    currentRoute: String,
    onRouteChange: (String) -> Unit
) {
    Nav({
        style {
            backgroundColor(AppTheme.surfaceColor)
            boxShadow(AppTheme.shadow)
            padding(AppTheme.spacing.medium)
        }
    }) {
        Div({
            style {
                display(DisplayStyle.Flex)
                justifyContent(JustifyContent.SpaceBetween)
                alignItems(Align.Center)
                maxWidth(1200.px)
                margin(0.px, LinearDimension.auto)
            }
        }) {
            // Logo
            H1({
                style {
                    color(AppTheme.primaryColor)
                    margin(0.px)
                    fontSize(24.px)
                }
            }) {
                Text("SmartFarm")
            }
            
            // Navigation Links
            Div({
                style {
                    display(DisplayStyle.Flex)
                    gap(AppTheme.spacing.medium)
                }
            }) {
                NavigationLink("Home", "home", currentRoute, onRouteChange)
                NavigationLink("Livestock", "livestock", currentRoute, onRouteChange)
                NavigationLink("Weather", "weather", currentRoute, onRouteChange)
                NavigationLink("Dashboard", "dashboard", currentRoute, onRouteChange)
                NavigationLink("Settings", "settings", currentRoute, onRouteChange)
            }
        }
    }
}

@Composable
private fun NavigationLink(
    text: String,
    route: String,
    currentRoute: String,
    onRouteChange: (String) -> Unit
) {
    val isActive = currentRoute == route
    
    Button({
        onClick { onRouteChange(route) }
        style {
            backgroundColor(if (isActive) AppTheme.primaryColor else Color.transparent)
            color(if (isActive) Color.white else AppTheme.textColor)
            border(0.px)
            padding(AppTheme.spacing.small, AppTheme.spacing.medium)
            borderRadius(AppTheme.borderRadius)
            cursor("pointer")
            fontSize(14.px)
            
            hover {
                backgroundColor(if (isActive) AppTheme.primaryColor else AppTheme.backgroundColor)
            }
        }
    }) {
        Text(text)
    }
}

@Composable
private fun MainContent(currentRoute: String) {
    Div({
        style {
            flex(1)
            padding(AppTheme.spacing.large)
        }
    }) {
        when (currentRoute) {
            "home" -> HomeScreen()
            "livestock" -> LivestockScreen()
            "weather" -> WeatherScreen()
            "dashboard" -> DashboardScreen()
            "settings" -> SettingsScreen()
            else -> HomeScreen()
        }
    }
}
```

### **Step 3: Home Screen**
```kotlin
// web/src/main/kotlin/com/example/smartfarm/web/ui/screens/HomeScreen.kt
package com.example.smartfarm.web.ui.screens

import androidx.compose.runtime.*
import androidx.compose.web.elements.*
import androidx.compose.web.css.*
import com.example.smartfarm.web.ui.components.*

@Composable
fun HomeScreen() {
    Div({
        style {
            maxWidth(1200.px)
            margin(0.px, LinearDimension.auto)
        }
    }) {
        // Header
        H1({
            style {
                color(AppTheme.textColor)
                fontSize(32.px)
                marginBottom(AppTheme.spacing.large)
                textAlign("center")
            }
        }) {
            Text("Welcome to SmartFarm")
        }
        
        // Quick Stats Grid
        Div({
            style {
                display(DisplayStyle.Grid)
                gridTemplateColumns("repeat(auto-fit, minmax(250px, 1fr))")
                gap(AppTheme.spacing.large)
                marginBottom(AppTheme.spacing.xlarge)
            }
        }) {
            StatCard("Total Livestock", "24", "animals")
            StatCard("Active Alerts", "3", "warnings")
            StatCard("Today's Tasks", "8", "tasks")
            StatCard("Weather", "22°C", "sunny")
        }
        
        // Recent Activity
        H2({
            style {
                color(AppTheme.textColor)
                fontSize(24.px)
                marginBottom(AppTheme.spacing.medium)
            }
        }) {
            Text("Recent Activity")
        }
        
        ActivityList()
    }
}

@Composable
private fun StatCard(title: String, value: String, subtitle: String) {
    Div({
        style {
            backgroundColor(AppTheme.surfaceColor)
            padding(AppTheme.spacing.large)
            borderRadius(AppTheme.borderRadius)
            boxShadow(AppTheme.shadow)
            textAlign("center")
        }
    }) {
        H3({
            style {
                color(AppTheme.textSecondaryColor)
                fontSize(14.px)
                margin(0.px, 0.px, AppTheme.spacing.small, 0.px)
                textTransform("uppercase")
                letterSpacing(1.px)
            }
        }) {
            Text(title)
        }
        
        Div({
            style {
                fontSize(32.px)
                fontWeight("bold")
                color(AppTheme.primaryColor)
                marginBottom(AppTheme.spacing.small)
            }
        }) {
            Text(value)
        }
        
        Div({
            style {
                color(AppTheme.textSecondaryColor)
                fontSize(14.px)
            }
        }) {
            Text(subtitle)
        }
    }
}

@Composable
private fun ActivityList() {
    Div({
        style {
            backgroundColor(AppTheme.surfaceColor)
            borderRadius(AppTheme.borderRadius)
            boxShadow(AppTheme.shadow)
            overflow("hidden")
        }
    }) {
        val activities = listOf(
            "Added new cow: Bessie",
            "Scheduled vaccination for tomorrow",
            "Weather alert: Rain expected",
            "Completed daily feeding routine"
        )
        
        activities.forEach { activity ->
            Div({
                style {
                    padding(AppTheme.spacing.medium)
                    borderBottom(1.px, LineStyle.Solid, AppTheme.backgroundColor)
                    
                    lastChild {
                        borderBottom(0.px, LineStyle.Solid, Color.transparent)
                    }
                }
            }) {
                Text(activity)
            }
        }
    }
}
```

## 🚀 **5. Build and Run**

### **Step 1: Build Script**
```kotlin
// build.gradle.kts (root)
tasks.register("buildWeb") {
    dependsOn(":web:build")
    doLast {
        println("Web version built successfully!")
        println("Open http://localhost:8080 to view the app")
    }
}

tasks.register("runWeb") {
    dependsOn(":web:build")
    doLast {
        exec {
            commandLine("python", "-m", "http.server", "8080", "-d", "web/build/distributions")
        }
    }
}
```

### **Step 2: Development Server**
```bash
# Run development server
./gradlew :web:run

# Or build and serve
./gradlew buildWeb
python -m http.server 8080 -d web/build/distributions
```

### **Step 3: Production Build**
```bash
# Build for production
./gradlew :web:build

# The built files will be in web/build/distributions/
```

## 📱 **6. Progressive Web App (PWA)**

### **Step 1: Manifest File**
```json
// web/src/main/resources/manifest.json
{
  "name": "SmartFarm",
  "short_name": "SmartFarm",
  "description": "Smart farming management application",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#4CAF50",
  "theme_color": "#4CAF50",
  "icons": [
    {
      "src": "assets/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "assets/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

### **Step 2: Service Worker**
```javascript
// web/src/main/resources/sw.js
const CACHE_NAME = 'smartfarm-v1';
const urlsToCache = [
  '/',
  '/styles.css',
  '/SmartFarm-web.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
```

## 🔧 **7. Deployment Options**

### **Option 1: GitHub Pages**
```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-java@v2
        with:
          java-version: '17'
      - run: ./gradlew :web:build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./web/build/distributions
```

### **Option 2: Netlify**
```toml
# netlify.toml
[build]
  publish = "web/build/distributions"
  command = "./gradlew :web:build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### **Option 3: Vercel**
```json
// vercel.json
{
  "buildCommand": "./gradlew :web:build",
  "outputDirectory": "web/build/distributions",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

## 📊 **8. Performance Optimization**

### **Step 1: Bundle Optimization**
```kotlin
// web/build.gradle.kts
kotlin {
    js("web") {
        browser {
            commonWebpackConfig {
                cssSupport {
                    enabled.set(true)
                }
                optimization {
                    splitChunks {
                        chunks.set("all")
                    }
                }
            }
        }
    }
}
```

### **Step 2: Lazy Loading**
```kotlin
@Composable
fun LazyLoadedScreen() {
    var isLoaded by remember { mutableStateOf(false) }
    
    LaunchedEffect(Unit) {
        // Load heavy components on demand
        isLoaded = true
    }
    
    if (isLoaded) {
        HeavyComponent()
    } else {
        LoadingSpinner()
    }
}
```

## 🎯 **9. Next Steps**

### **Phase 1: Basic Web Version**
- [ ] Set up project structure
- [ ] Create basic UI components
- [ ] Implement navigation
- [ ] Add core screens

### **Phase 2: Feature Parity**
- [ ] Implement livestock management
- [ ] Add weather integration
- [ ] Create dashboard
- [ ] Add settings

### **Phase 3: Advanced Features**
- [ ] Real-time updates
- [ ] Offline support
- [ ] Push notifications
- [ ] Data synchronization

### **Phase 4: Production Ready**
- [ ] Performance optimization
- [ ] Security hardening
- [ ] Analytics integration
- [ ] User feedback system

---

**Ready to start?** Let me know if you'd like me to:
1. **Set up the initial project structure**
2. **Create the first web components**
3. **Configure the build system**
4. **Deploy to a hosting service** 