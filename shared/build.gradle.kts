plugins {
    kotlin("multiplatform")
    kotlin("plugin.serialization")
    id("org.jetbrains.compose")
    id("com.android.library")
}

android {
    namespace = "com.smartfarm.shared"
    compileSdk = 34
    defaultConfig {
        minSdk = 24
    }
    
    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_11
        targetCompatibility = JavaVersion.VERSION_11
    }
}

kotlin {
    // Android target
    androidTarget {
        compilations.all {
            kotlinOptions {
                jvmTarget = "11"
            }
        }
    }
    
    // iOS targets
    listOf(
        iosX64(),
        iosArm64(),
        iosSimulatorArm64()
    ).forEach {
        it.binaries.framework {
            baseName = "shared"
            isStatic = true
        }
    }
    
    // Web target
    js(IR) {
        browser {
            commonWebpackConfig {
                cssSupport {
                    enabled.set(true)
                }
            }
        }
        binaries.executable()
    }
    
    // JVM target
    jvm() {
        compilations.all {
            kotlinOptions {
                jvmTarget = "11"
            }
        }
    }
    
    sourceSets {
        val commonMain by getting {
            dependencies {
                // Kotlin
                implementation("org.jetbrains.kotlin:kotlin-stdlib-common")
                implementation("org.jetbrains.kotlinx:kotlinx-coroutines-core:1.7.3")
                implementation("org.jetbrains.kotlinx:kotlinx-serialization-json:1.6.0")
                
                // Compose
                implementation(compose.runtime)
                implementation(compose.foundation)
                implementation(compose.material3)
                implementation(compose.ui)
                @OptIn(org.jetbrains.compose.ExperimentalComposeLibrary::class)
                implementation(compose.components.resources)
                
                // Additional Compose components
                implementation(compose.material)
                implementation(compose.animation)
                
                // Date/Time
                implementation("org.jetbrains.kotlinx:kotlinx-datetime:0.4.1")
                
                // Logging
                implementation("io.github.aakira:napier:2.6.1")
            }
        }
        
        val commonTest by getting {
            dependencies {
                implementation(kotlin("test"))
                // Coroutines Testing
                implementation("org.jetbrains.kotlinx:kotlinx-coroutines-test:1.7.3")
            }
        }
        
        val androidMain by getting {
            dependencies {
                // Android-specific dependencies can be added here later
            }
        }
        
        val androidUnitTest by getting {
            dependencies {
                implementation("junit:junit:4.13.2")
                // Compose Testing - use correct dependency names
                implementation(compose.desktop.uiTestJUnit4)
                // Android Testing
                implementation("androidx.test:runner:1.5.2")
                implementation("androidx.test:rules:1.5.0")
                implementation("androidx.test.ext:junit:1.1.5")
                // MockK for mocking
                implementation("io.mockk:mockk:1.13.8")
                // Coroutines Testing
                implementation("org.jetbrains.kotlinx:kotlinx-coroutines-test:1.7.3")
            }
        }
        
        val iosX64Main by getting
        val iosArm64Main by getting
        val iosSimulatorArm64Main by getting
        val iosMain by creating {
            dependsOn(commonMain)
            iosX64Main.dependsOn(this)
            iosArm64Main.dependsOn(this)
            iosSimulatorArm64Main.dependsOn(this)
            
            dependencies {
                // iOS-specific dependencies can be added here later
            }
        }
        
        val jsMain by getting {
            dependencies {
                // Web-specific dependencies can be added here later
            }
        }
        
        val jsTest by getting {
            dependencies {
                implementation(kotlin("test-js"))
            }
        }
        
        val jvmMain by getting {
            dependencies {
                implementation("org.jetbrains.kotlin:kotlin-stdlib")
                implementation("org.jetbrains.kotlinx:kotlinx-coroutines-core-jvm:1.7.3")
                implementation("org.jetbrains.kotlinx:kotlinx-serialization-json-jvm:1.6.0")
                
                // Compose Desktop
                implementation(compose.desktop.currentOs)
                implementation(compose.desktop.uiTestJUnit4)
            }
        }
        
        val jvmTest by getting {
            dependencies {
                implementation(kotlin("test"))
                implementation(compose.desktop.uiTestJUnit4)
                implementation("io.mockk:mockk:1.13.8")
                implementation("org.jetbrains.kotlinx:kotlinx-coroutines-test:1.7.3")
            }
        }
    }
} 