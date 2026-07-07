import java.util.Properties
import java.io.FileInputStream

// Temporarily disable Hilt and KAPT for minimal build
// buildscript {
//     dependencies {
//         classpath("com.google.dagger:hilt-android-gradle-plugin:2.48")
//     }
// }

plugins {
    id("com.android.application")
    id("org.jetbrains.kotlin.android")
    // id("kotlin-kapt")
    // id("dagger.hilt.android.plugin")
    id("com.google.gms.google-services")
    id("com.google.firebase.crashlytics")
}

// Load local.properties for API keys and signing configuration
val localProperties = Properties()
val localPropertiesFile = file("local.properties")
if (localPropertiesFile.exists()) {
    localProperties.load(FileInputStream(localPropertiesFile))
}

android {
    namespace = "com.yourcompany.smartfarm"
    compileSdk = 34

    defaultConfig {
        applicationId = "com.yourcompany.smartfarm"
        minSdk = 24
        targetSdk = 34
        versionCode = 1
        versionName = "1.0.0"

        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
        vectorDrawables {
            useSupportLibrary = true
        }
        
        // Memory optimization settings
        multiDexEnabled = true
        
        buildConfigField("String", "MAPS_API_KEY", "\"${localProperties.getProperty("MAPS_API_KEY", "YOUR_MAPS_API_KEY_HERE")}\"")
        buildConfigField("String", "API_BASE_URL", "\"https://web-production-86d39.up.railway.app\"")
        
        // Manifest placeholders for API keys
        manifestPlaceholders["MAPS_API_KEY"] = localProperties.getProperty("MAPS_API_KEY", "YOUR_MAPS_API_KEY_HERE")
    }

    signingConfigs {
        create("release") {
            // CI: ANDROID_* env vars. Local: app/local.properties (see local.properties.example).
            fun signingValue(envKey: String, propertyKey: String, default: String = ""): String {
                return System.getenv(envKey)?.takeIf { it.isNotEmpty() }
                    ?: localProperties.getProperty(propertyKey, default)
            }

            val keystorePath = signingValue("ANDROID_KEYSTORE_PATH", "KEYSTORE_PATH", "smartfarm-upload-key.jks")
            val keystorePassword = signingValue("ANDROID_KEYSTORE_PASSWORD", "KEYSTORE_PASSWORD")
            val keyAlias = signingValue("ANDROID_KEY_ALIAS", "KEY_ALIAS", "smartfarm-upload-key")
            val keyPassword = signingValue("ANDROID_KEY_PASSWORD", "KEY_PASSWORD")

            val keystoreFile = file(keystorePath)
            if (keystoreFile.exists() && keystorePassword.isNotEmpty() && keyPassword.isNotEmpty()) {
                storeFile = keystoreFile
                storePassword = keystorePassword
                this.keyAlias = keyAlias
                this.keyPassword = keyPassword
            }
        }
    }

    buildTypes {
        release {
            isMinifyEnabled = false
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
            // Use release signing config if keystore is configured, otherwise fallback to debug
            val releaseSigningConfig = signingConfigs.getByName("release")
            if (releaseSigningConfig.storeFile != null && releaseSigningConfig.storeFile!!.exists()) {
                signingConfig = releaseSigningConfig
            } else {
                println("⚠️  WARNING: Release signing config not found. Using debug signing.")
                signingConfig = signingConfigs.getByName("debug")
            }
        }
        create("internal") {
            isDebuggable = true
            applicationIdSuffix = ".internal"
            versionNameSuffix = "-internal"
            isMinifyEnabled = false
            isShrinkResources = false
        }
        debug {
            isMinifyEnabled = false
            isShrinkResources = false
            applicationIdSuffix = ".debug"
            versionNameSuffix = "-debug"
        }
    }
    
    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }
    
    kotlinOptions {
        jvmTarget = "17"
        freeCompilerArgs += listOf(
            "-opt-in=androidx.compose.material3.ExperimentalMaterial3Api"
        )
    }
    
    buildFeatures {
        compose = true
        buildConfig = true
    }
    
    composeOptions {
        kotlinCompilerExtensionVersion = "1.5.14"
    }
    
    packaging {
        resources {
            excludes += "/META-INF/{AL2.0,LGPL2.1}"
            excludes += "META-INF/DEPENDENCIES"
            excludes += "META-INF/LICENSE"
            excludes += "META-INF/LICENSE.txt"
            excludes += "META-INF/NOTICE"
            excludes += "META-INF/NOTICE.txt"
        }
    }

      // Compile only the canonical Compose entry path for now.
    sourceSets.getByName("main").java.setSrcDirs(
        listOf(
            "src/main/java/com/yourcompany/smartfarm",
            "src/main/java/com/smartfarm/ui/navigation",
            "src/main/java/com/smartfarm/ui/screens",
            "src/main/java/com/smartfarm/ui/components"
        )
    )
}

dependencies {
    // Shared Module
    implementation(project(":shared"))
    
    // Android-specific dependencies
    implementation("androidx.core:core-ktx:1.12.0")
    implementation("androidx.appcompat:appcompat:1.6.1")
    implementation("com.google.android.material:material:1.11.0")
    implementation("androidx.lifecycle:lifecycle-runtime-ktx:2.7.0")
    implementation("androidx.activity:activity-compose:1.8.2")
    
    // MultiDex support for large apps
    implementation("androidx.multidex:multidex:2.0.1")
    
    // Compose
    implementation(platform("androidx.compose:compose-bom:2024.05.00"))
    implementation("androidx.compose.ui:ui")
    implementation("androidx.compose.ui:ui-graphics")
    implementation("androidx.compose.ui:ui-tooling-preview")
    implementation("androidx.compose.material3:material3")
    implementation("androidx.compose.material:material-icons-core")
    implementation("androidx.compose.material:material-icons-extended")
    
    // Dependency Injection - Koin (Compose screens) + Hilt (legacy app-layer modules)
    implementation("io.insert-koin:koin-android:3.5.0")
    implementation("io.insert-koin:koin-compose:1.1.0")
    
    // Networking - Retrofit & OkHttp
    implementation("com.squareup.retrofit2:retrofit:2.9.0")
    implementation("com.squareup.retrofit2:converter-gson:2.9.0")
    implementation("com.squareup.okhttp3:okhttp:4.12.0")
    implementation("com.squareup.okhttp3:logging-interceptor:4.12.0")
    
    // Persistence - Room & DataStore
    implementation("androidx.datastore:datastore-preferences:1.0.0")
    
    // ViewModel & Lifecycle
    implementation("androidx.lifecycle:lifecycle-viewmodel-compose:2.7.0")
    implementation("androidx.lifecycle:lifecycle-runtime-compose:2.7.0")
    
    // Navigation Compose
    implementation("androidx.navigation:navigation-compose:2.7.6")
    
    // Firebase and Crashlytics
    implementation(platform("com.google.firebase:firebase-bom:32.7.0"))
    implementation("com.google.firebase:firebase-analytics")
    implementation("com.google.firebase:firebase-crashlytics")
    // Temporarily disabled problematic Firebase dependencies
    // implementation("com.google.firebase:firebase-perf")
    // implementation("com.google.firebase:firebase-messaging")
    // implementation("com.google.firebase:firebase-config")
    // implementation("com.google.firebase:firebase-auth")
    // implementation("com.google.firebase:firebase-firestore")
    // implementation("com.google.firebase:firebase-storage")
    // implementation("com.google.firebase:firebase-functions")
    
    // Google Maps
    implementation("com.google.android.gms:play-services-maps:18.2.0")
    implementation("com.google.android.gms:play-services-location:21.0.1")
    
    // Testing
    testImplementation("junit:junit:4.13.2")
    testImplementation("org.mockito.kotlin:mockito-kotlin:5.1.0")
    testImplementation("org.jetbrains.kotlinx:kotlinx-coroutines-test:1.7.3")
    testImplementation("androidx.arch.core:core-testing:2.2.0")
    androidTestImplementation("androidx.test.ext:junit:1.1.5")
    androidTestImplementation("androidx.test.espresso:espresso-core:3.5.1")
    androidTestImplementation(platform("androidx.compose:compose-bom:2024.05.00"))
    androidTestImplementation("androidx.compose.ui:ui-test-junit4")
    debugImplementation("androidx.compose.ui:ui-tooling")
    debugImplementation("androidx.compose.ui:ui-test-manifest")
}
