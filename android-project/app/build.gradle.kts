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
        
        // Manifest placeholders for API keys
        manifestPlaceholders["MAPS_API_KEY"] = localProperties.getProperty("MAPS_API_KEY", "YOUR_MAPS_API_KEY_HERE")
    }

    signingConfigs {
        create("release") {
            // Load signing configuration from environment variables or local.properties
            val keystorePath = localProperties.getProperty("KEYSTORE_PATH", "smartfarm-upload-key.jks")
            val keystorePassword = localProperties.getProperty("KEYSTORE_PASSWORD", "")
            val keyAlias = localProperties.getProperty("KEY_ALIAS", "smartfarm-upload-key")
            val keyPassword = localProperties.getProperty("KEY_PASSWORD", "")
            
            // Only create signing config if keystore exists and passwords are provided
            if (file(keystorePath).exists() && keystorePassword.isNotEmpty() && keyPassword.isNotEmpty()) {
                storeFile = file(keystorePath)
                storePassword = keystorePassword
                this.keyAlias = keyAlias
                this.keyPassword = keyPassword
            } else {
                // Fallback for development builds
                // Note: Custom property not supported in this context
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
            signingConfig = signingConfigs.getByName("debug")
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
    }
    
    buildFeatures {
        compose = true
        buildConfig = true
    }
    
    composeOptions {
        kotlinCompilerExtensionVersion = "1.5.4"
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
}

dependencies {
    // Shared Module
    implementation(project(":shared"))
    
    // Android-specific dependencies
    implementation("androidx.core:core-ktx:1.12.0")
    implementation("androidx.lifecycle:lifecycle-runtime-ktx:2.7.0")
    implementation("androidx.activity:activity-compose:1.8.2")
    
    // MultiDex support for large apps
    implementation("androidx.multidex:multidex:2.0.1")
    
    // Compose
    implementation(platform("androidx.compose:compose-bom:2024.02.00"))
    implementation("androidx.compose.ui:ui")
    implementation("androidx.compose.ui:ui-graphics")
    implementation("androidx.compose.ui:ui-tooling-preview")
    implementation("androidx.compose.material3:material3")
    implementation("androidx.compose.material:material-icons-core")
    implementation("androidx.compose.material:material-icons-extended")
    
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
    androidTestImplementation("androidx.test.ext:junit:1.1.5")
    androidTestImplementation("androidx.test.espresso:espresso-core:3.5.1")
    androidTestImplementation(platform("androidx.compose:compose-bom:2024.02.00"))
    androidTestImplementation("androidx.compose.ui:ui-test-junit4")
    debugImplementation("androidx.compose.ui:ui-tooling")
    debugImplementation("androidx.compose.ui:ui-test-manifest")
}
