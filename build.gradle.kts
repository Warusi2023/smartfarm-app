// Top-level build file where you can add configuration options common to all sub-projects/modules.
plugins {
    id("com.android.application") version "8.0.2" apply false
    id("org.jetbrains.kotlin.android") version "1.9.20" apply false
    id("org.jetbrains.kotlin.kapt") version "1.9.20" apply false
    id("com.google.devtools.ksp") version "1.9.20-1.0.14" apply false
    id("org.jetbrains.kotlin.plugin.parcelize") version "1.9.20" apply false
    id("com.google.gms.google-services") version "4.3.15" apply false
    id("com.google.firebase.crashlytics") version "2.9.9" apply false
    kotlin("multiplatform") version "1.9.20" apply false
    kotlin("plugin.serialization") version "1.9.20" apply false
    id("org.jetbrains.compose") version "1.5.11" apply false
}

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
