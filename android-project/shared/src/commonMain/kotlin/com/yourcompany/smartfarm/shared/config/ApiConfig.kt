package com.yourcompany.smartfarm.shared.config

/**
 * API Configuration for different environments
 * This allows easy switching between development, staging, and production
 */
object ApiConfig {
    
    // Environment selection
    enum class Environment {
        DEVELOPMENT, STAGING, PRODUCTION
    }
    
    // Current environment - change this to switch environments
    val currentEnvironment = Environment.PRODUCTION
    
    // Base URLs for different environments
    private val baseUrls = mapOf(
        Environment.DEVELOPMENT to "http://localhost:3000/api",
        Environment.STAGING to "https://staging-api.smartfarm.com/api",
        Environment.PRODUCTION to "https://api.smartfarm.com/api" // Production endpoint
    )
    
    // Get the current base URL
    val baseUrl: String
        get() = baseUrls[currentEnvironment] ?: baseUrls[Environment.DEVELOPMENT]!!
    
    // API Endpoints
    object Endpoints {
        // Authentication
        const val LOGIN = "/auth/login"
        const val REGISTER = "/auth/register"
        const val PROFILE = "/auth/profile"
        const val REFRESH_TOKEN = "/auth/refresh"
        
        // Core Resources
        const val FARMS = "/farms"
        const val CROPS = "/crops"
        const val LIVESTOCK = "/livestock"
        const val TASKS = "/tasks"
        const val USERS = "/users"
        const val INVENTORY = "/inventory"
        const val FINANCIAL = "/financial"
        
        // Analytics
        const val ANALYTICS = "/analytics"
        const val WEATHER = "/weather"
        const val DOCUMENTS = "/documents"
        
        // Health Check
        const val HEALTH = "/health"
        const val API_DOCS = "/docs"
    }
    
    // API Configuration
    object Settings {
        const val TIMEOUT_SECONDS = 30L
        const val RETRY_ATTEMPTS = 3
        const val CACHE_DURATION_MINUTES = 5L
        
        // Headers
        const val CONTENT_TYPE = "application/json"
        const val ACCEPT = "application/json"
        const val USER_AGENT = "SmartFarm-Mobile/1.0.0"
    }
    
    // Feature Flags
    object Features {
        const val ENABLE_CACHING = true
        const val ENABLE_OFFLINE_MODE = true
        const val ENABLE_REAL_TIME_UPDATES = true
        const val ENABLE_FILE_UPLOADS = true
        const val ENABLE_PUSH_NOTIFICATIONS = true
    }
    
    // Debug Information
    fun getDebugInfo(): Map<String, String> {
        return mapOf(
            "Environment" to currentEnvironment.name,
            "Base URL" to baseUrl,
            "Timeout" to "${Settings.TIMEOUT_SECONDS}s",
            "Retry Attempts" to Settings.RETRY_ATTEMPTS.toString(),
            "Caching Enabled" to Features.ENABLE_CACHING.toString(),
            "Offline Mode" to Features.ENABLE_OFFLINE_MODE.toString()
        )
    }
}
