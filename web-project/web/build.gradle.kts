plugins {
    kotlin("multiplatform")
    kotlin("plugin.serialization")
    id("org.jetbrains.compose")
}

// Disable Node.js setup to avoid repository issues
kotlin.targets.withType<org.jetbrains.kotlin.gradle.targets.js.KotlinJsTarget> {
    compilations.all {
        kotlinOptions.freeCompilerArgs += listOf("-Xskip-prerelease-check")
    }
}

kotlin {
    js(IR) {
        browser {
            commonWebpackConfig {
                cssSupport {
                    enabled.set(true)
                }
            }
            webpackTask {
                mainOutputFileName = "smartfarm.js"
                cssSupport {
                    enabled.set(true)
                }
            }
            testTask {
                useKarma {
                    useChromeHeadless()
                }
            }
        }
        binaries.executable()
    }
    
    sourceSets {
        val jsMain by getting {
            dependencies {
                implementation(project(":shared"))
                implementation(compose.runtime)
                implementation(compose.html.core)
                implementation(compose.html.svg)
                
                // Date/Time
                implementation("org.jetbrains.kotlinx:kotlinx-datetime:0.4.1")
                
                // Logging
                implementation("io.github.aakira:napier:2.6.1")
            }
        }
        
        val jsTest by getting {
            dependencies {
                implementation(kotlin("test-js"))
            }
        }
    }
}

// Web-specific tasks
tasks.register("buildWeb") {
    dependsOn("browserProductionWebpack")
    doLast {
        println("Web version built successfully!")
        println("Open http://localhost:8080 to view the app")
    }
}

tasks.register("runWebDev") {
    dependsOn("browserDevelopmentRun")
    doLast {
        println("Web development server started!")
        println("Open http://localhost:8080 to view the app")
    }
}

tasks.register("testWeb") {
    dependsOn("browserTest")
    doLast {
        println("Web tests completed!")
    }
} 