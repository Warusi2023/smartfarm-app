package com.smartfarm.shared.network

import io.ktor.client.*
import io.ktor.client.plugins.contentnegotiation.*
import io.ktor.client.plugins.logging.*
import io.ktor.serialization.kotlinx.json.*
import kotlinx.serialization.json.Json

/**
 * Factory for creating configured Ktor HTTP clients with platform-specific engines
 */
expect fun createHttpClient(): HttpClient

/**
 * Creates a configured Ktor client with JSON serialization and logging
 * This wraps the platform-specific client with common configuration
 */
fun createConfiguredHttpClient(): HttpClient {
    val baseClient = createHttpClient()
    // Note: Configuration should be done in platform-specific implementations
    // This is a placeholder - actual configuration happens in Android/iOS implementations
    return baseClient
}

