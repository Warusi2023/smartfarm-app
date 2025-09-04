plugins {
    kotlin("multiplatform")
    kotlin("plugin.serialization")
    id("org.jetbrains.compose")
    id("org.jetbrains.kotlin.native.cocoapods")
}

kotlin {
    // iOS targets
    listOf(
        iosX64(),
        iosArm64(),
        iosSimulatorArm64()
    ).forEach {
        it.binaries.framework {
            baseName = "SmartFarmIOS"
            isStatic = true
        }
    }
    
    // CocoaPods configuration
    cocoapods {
        summary = "SmartFarm iOS Module"
        homepage = "https://github.com/yourcompany/smartfarm"
        version = "1.0.0"
        ios.deploymentTarget = "14.1"
        podfile = project.file("Podfile")
        framework {
            baseName = "SmartFarmIOS"
            isStatic = true
        }
        extraSpecAttributes["swift_version"] = "5.0"
    }
    
    sourceSets {
        val iosMain by getting {
            dependencies {
                implementation(project(":shared"))
                implementation(compose.runtime)
                implementation(compose.foundation)
                implementation(compose.material3)
                implementation(compose.ui)
                
                // Date/Time
                implementation("org.jetbrains.kotlinx:kotlinx-datetime:0.4.1")
                
                // Logging
                implementation("io.github.aakira:napier:2.6.1")
            }
        }
        
        val iosTest by getting {
            dependencies {
                implementation(kotlin("test"))
            }
        }
    }
}

// iOS-specific tasks
tasks.register("buildIOS") {
    dependsOn("linkReleaseFrameworkIosArm64")
    doLast {
        println("iOS framework built successfully!")
    }
}

tasks.register("podInstall") {
    doLast {
        exec {
            workingDir = project.file(".")
            commandLine("pod", "install")
        }
        println("CocoaPods dependencies installed!")
    }
}
