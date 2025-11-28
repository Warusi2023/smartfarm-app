// Top-level build file where you can add configuration options common to all sub-projects/modules.
plugins {
    id("com.android.application") version "8.9.2" apply false
    id("org.jetbrains.kotlin.android") version "1.9.24" apply false
    id("org.jetbrains.kotlin.kapt") version "1.9.24" apply false
    id("org.jetbrains.kotlin.plugin.parcelize") version "1.9.24" apply false
    id("com.google.gms.google-services") version "4.4.3" apply false
    id("com.google.firebase.crashlytics") version "2.9.9" apply false
    id("com.google.dagger.hilt.android") version "2.48" apply false
    
    // Kotlin Multiplatform
    kotlin("multiplatform") version "1.9.24" apply false
    kotlin("plugin.serialization") version "1.9.24" apply false
    
    // Compose Multiplatform
    id("org.jetbrains.compose") version "1.7.0" apply false
    
    // iOS Support
    id("org.jetbrains.kotlin.native.cocoapods") version "1.9.24" apply false
    
    // Web Support
    id("org.jetbrains.kotlin.js") version "1.9.24" apply false
    
    // Desktop Support
    id("org.jetbrains.kotlin.jvm") version "1.9.24" apply false
    
    // SQLDelight
    id("app.cash.sqldelight") version "2.0.0" apply false
}

// Project-wide configuration removed - repositories are now managed in settings.gradle.kts

// Cross-platform dependencies versions
extra["compose.version"] = "1.7.0"
extra["kotlin.version"] = "1.9.24"
extra["coroutines.version"] = "1.7.3"
extra["serialization.version"] = "1.6.0"
extra["ktor.version"] = "2.3.7"

// Multiplatform specific configurations
extra["android.minSdk"] = "24"
extra["android.targetSdk"] = "34"
extra["android.compileSdk"] = "34"
extra["android.buildTools"] = "34.0.0"

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

// Multiplatform build tasks
tasks.register("buildAll") {
    dependsOn(":shared:build")
    dependsOn(":web:build")
    doLast {
        println("All platforms built successfully!")
    }
}

tasks.register("testAll") {
    dependsOn(":shared:test")
    dependsOn(":web:test")
    doLast {
        println("All tests completed!")
    }
}

tasks.register("cleanAll") {
    dependsOn(":shared:clean")
    dependsOn(":web:clean")
    doLast {
        println("All projects cleaned!")
    }
} 
