pluginManagement {
    repositories {
        google()
        mavenCentral()
        gradlePluginPortal()
        maven("https://maven.pkg.jetbrains.space/public/p/compose/dev")
    }
}

dependencyResolutionManagement {
    repositoriesMode.set(RepositoriesMode.FAIL_ON_PROJECT_REPOS)
    repositories {
        google()
        mavenCentral()
        maven("https://maven.pkg.jetbrains.space/public/p/compose/dev")
        maven(url = "https://jitpack.io")
        // Kotlin/Native Node.js downloads only — must not intercept Maven coordinates.
        exclusiveContent {
            forRepository {
                ivy {
                    name = "NodeJs"
                    url = uri("https://nodejs.org/dist")
                    patternLayout {
                        artifact("/v[revision]/[artifact](-v[revision]-[classifier]).[ext]")
                    }
                    metadataSources {
                        artifact()
                    }
                }
            }
            filter {
                includeGroup("org.nodejs")
            }
        }
    }
}

rootProject.name = "SmartFarm"

// Canonical shippable Android application (auth, navigation, Room, Retrofit).
include(":app")
// Experimental KMM shell — not used for release builds until explicit migration.
include(":androidApp")
include(":shared")
