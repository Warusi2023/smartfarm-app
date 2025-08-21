plugins {
    kotlin("multiplatform")
    kotlin("plugin.serialization")
    id("org.jetbrains.compose")
}

kotlin {
    jvm("desktop") {
        compilations.all {
            kotlinOptions {
                jvmTarget = "11"
            }
        }
    }
    
    sourceSets {
        val desktopMain by getting {
            dependencies {
                implementation(project(":shared"))
                implementation(compose.desktop.currentOs)
                implementation(compose.desktop.linux_x64)
                implementation(compose.desktop.macos_x64)
                implementation(compose.desktop.macos_arm64)
                implementation(compose.desktop.windows_x64)
                
                // Date/Time
                implementation("org.jetbrains.kotlinx:kotlinx-datetime:0.4.1")
                
                // Logging
                implementation("io.github.aakira:napier:2.6.1")
            }
        }
        
        val desktopTest by getting {
            dependencies {
                implementation(kotlin("test"))
            }
        }
    }
}

// Desktop-specific tasks
tasks.register("runDesktop") {
    dependsOn("desktopRun")
    doLast {
        println("Desktop application started!")
    }
}

tasks.register("packageDesktop") {
    dependsOn("desktopDistributable")
    doLast {
        println("Desktop application packaged successfully!")
    }
}

tasks.register("testDesktop") {
    dependsOn("desktopTest")
    doLast {
        println("Desktop tests completed!")
    }
}
