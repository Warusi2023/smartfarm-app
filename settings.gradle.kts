pluginManagement {
    repositories {
        google()
        mavenCentral()
        gradlePluginPortal()
    }
}

dependencyResolutionManagement {
    repositoriesMode.set(RepositoriesMode.PREFER_SETTINGS)
    repositories {
        google()
        mavenCentral()
        maven { url = uri("https://jitpack.io") } // For MPAndroidChart
        maven { url = uri("https://maven.pkg.jetbrains.space/public/p/compose/dev") }
        maven { url = uri("https://maven.pkg.jetbrains.space/kotlin/p/kotlin/dev") }
        ivy { url = uri("https://nodejs.org/dist") } // For Kotlin JS Node.js support
    }
}

rootProject.name = "SmartFarm"
include(":androidApp")
include(":shared")
include(":web")