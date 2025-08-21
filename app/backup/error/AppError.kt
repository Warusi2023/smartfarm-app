package com.yourcompany.smartfarm.error

import kotlinx.serialization.Serializable

@Serializable
data class AppError(
    val type: ErrorType,
    val message: String,
    val details: String? = null,
    val severity: ErrorSeverity = ErrorSeverity.MEDIUM,
    val timestamp: Long = System.currentTimeMillis(),
    val userId: Long? = null,
    val farmId: Long? = null,
    val stackTrace: String? = null,
    val recoverable: Boolean = true
)

enum class ErrorType {
    // Network Errors
    NETWORK_CONNECTION_ERROR,
    NETWORK_TIMEOUT_ERROR,
    NETWORK_NO_INTERNET,
    NETWORK_SERVER_ERROR,
    NETWORK_GENERAL,
    API_ERROR,
    SERVER_ERROR,
    
    // Database Errors
    DATABASE_ERROR,
    DATABASE_CONNECTION_ERROR,
    DATA_CORRUPTION_ERROR,
    DATABASE_CORRUPTION,
    DATABASE_FULL,
    DATABASE_GENERAL,
    
    // Authentication Errors
    AUTHENTICATION_ERROR,
    AUTHORIZATION_ERROR,
    SESSION_EXPIRED_ERROR,
    AUTHENTICATION,
    
    // Data Errors
    DATA_VALIDATION_ERROR,
    DATA_NOT_FOUND_ERROR,
    DATA_SYNC_ERROR,
    VALIDATION,
    
    // System Errors
    MEMORY_ERROR,
    STORAGE_ERROR,
    PERMISSION_ERROR,
    STORAGE,
    IO_ERROR,
    
    // Business Logic Errors
    INVALID_OPERATION_ERROR,
    BUSINESS_RULE_VIOLATION_ERROR,
    CONFIGURATION_ERROR,
    
    // External Service Errors
    WEATHER_SERVICE_ERROR,
    LOCATION_SERVICE_ERROR,
    NOTIFICATION_SERVICE_ERROR,
    
    // Unknown Error
    UNKNOWN_ERROR,
    UNKNOWN
}

enum class ErrorSeverity {
    LOW,
    MEDIUM,
    HIGH,
    CRITICAL
}
