package com.yourcompany.smartfarm.error

import android.content.Context
import javax.inject.Inject
import javax.inject.Singleton

@Singleton
class UserFriendlyErrorMessages @Inject constructor(
    private val context: Context
) {
    
    /**
     * Get user-friendly error message for error type
     */
    fun getUserFriendlyMessage(errorType: ErrorType): String {
        return when (errorType) {
            ErrorType.NETWORK_CONNECTION_ERROR -> "No internet connection"
            ErrorType.NETWORK_TIMEOUT_ERROR -> "Connection timed out"
            ErrorType.NETWORK_NO_INTERNET -> "No internet connection"
            ErrorType.NETWORK_SERVER_ERROR -> "Server is temporarily unavailable"
            ErrorType.NETWORK_GENERAL -> "Network connection problem"
            ErrorType.API_ERROR -> "API error occurred"
            ErrorType.SERVER_ERROR -> "Server error occurred"
            ErrorType.DATABASE_ERROR -> "Database error occurred"
            ErrorType.DATABASE_CONNECTION_ERROR -> "Database connection error"
            ErrorType.DATA_CORRUPTION_ERROR -> "Data corruption detected"
            ErrorType.DATABASE_CORRUPTION -> "Data storage error"
            ErrorType.DATABASE_FULL -> "Storage is full"
            ErrorType.DATABASE_GENERAL -> "Data access error"
            ErrorType.AUTHENTICATION_ERROR -> "Authentication failed"
            ErrorType.AUTHORIZATION_ERROR -> "Access denied"
            ErrorType.SESSION_EXPIRED_ERROR -> "Session expired"
            ErrorType.AUTHENTICATION -> "Please log in again"
            ErrorType.DATA_VALIDATION_ERROR -> "Invalid data"
            ErrorType.DATA_NOT_FOUND_ERROR -> "Data not found"
            ErrorType.DATA_SYNC_ERROR -> "Data sync error"
            ErrorType.VALIDATION -> "Please check your input"
            ErrorType.MEMORY_ERROR -> "App ran out of memory"
            ErrorType.STORAGE_ERROR -> "Storage error"
            ErrorType.PERMISSION_ERROR -> "Permission required"
            ErrorType.STORAGE -> "Storage access problem"
            ErrorType.IO_ERROR -> "File access error"
            ErrorType.INVALID_OPERATION_ERROR -> "Invalid operation"
            ErrorType.BUSINESS_RULE_VIOLATION_ERROR -> "Operation not allowed"
            ErrorType.CONFIGURATION_ERROR -> "Configuration error"
            ErrorType.WEATHER_SERVICE_ERROR -> "Weather service error"
            ErrorType.LOCATION_SERVICE_ERROR -> "Location service error"
            ErrorType.NOTIFICATION_SERVICE_ERROR -> "Notification service error"
            ErrorType.UNKNOWN_ERROR -> "An unexpected error occurred"
            ErrorType.UNKNOWN -> "An unexpected error occurred"
        }
    }
    
    /**
     * Get detailed user-friendly message with context
     */
    fun getDetailedUserMessage(error: AppError): String {
        val baseMessage = getUserFriendlyMessage(error.type)
        
        return when (error.type) {
            ErrorType.NETWORK_CONNECTION_ERROR -> {
                "$baseMessage. Please check your Wi-Fi or mobile data connection and try again."
            }
            ErrorType.NETWORK_TIMEOUT_ERROR -> {
                "$baseMessage. The request took too long to complete. Please try again."
            }
            ErrorType.NETWORK_NO_INTERNET -> {
                "$baseMessage. Please check your Wi-Fi or mobile data connection and try again."
            }
            ErrorType.NETWORK_SERVER_ERROR -> {
                "$baseMessage. Our servers are experiencing issues. Please try again in a few minutes."
            }
            ErrorType.NETWORK_GENERAL -> {
                "$baseMessage. Please check your internet connection and try again."
            }
            ErrorType.API_ERROR -> {
                "$baseMessage. Please try again later."
            }
            ErrorType.SERVER_ERROR -> {
                "$baseMessage. Please try again later."
            }
            ErrorType.DATABASE_ERROR -> {
                "$baseMessage. Please restart the app."
            }
            ErrorType.DATABASE_CONNECTION_ERROR -> {
                "$baseMessage. Please restart the app."
            }
            ErrorType.DATA_CORRUPTION_ERROR -> {
                "$baseMessage. Please restart the app."
            }
            ErrorType.DATABASE_CORRUPTION -> {
                "$baseMessage. Please contact support if this problem persists."
            }
            ErrorType.DATABASE_FULL -> {
                "$baseMessage. Please free up some space on your device and try again."
            }
            ErrorType.DATABASE_GENERAL -> {
                "$baseMessage. Please try again. If the problem continues, restart the app."
            }
            ErrorType.AUTHENTICATION_ERROR -> {
                "$baseMessage. Please log in again to continue."
            }
            ErrorType.AUTHORIZATION_ERROR -> {
                "$baseMessage. Please check your permissions."
            }
            ErrorType.SESSION_EXPIRED_ERROR -> {
                "$baseMessage. Please log in again to continue."
            }
            ErrorType.AUTHENTICATION -> {
                "$baseMessage. Your session has expired. Please log in again to continue."
            }
            ErrorType.DATA_VALIDATION_ERROR -> {
                "$baseMessage. Please review the information you entered and try again."
            }
            ErrorType.DATA_NOT_FOUND_ERROR -> {
                "$baseMessage. Please try again."
            }
            ErrorType.DATA_SYNC_ERROR -> {
                "$baseMessage. Please try again."
            }
            ErrorType.VALIDATION -> {
                "$baseMessage. Please review the information you entered and try again."
            }
            ErrorType.MEMORY_ERROR -> {
                "$baseMessage. Please close other apps and restart SmartFarm."
            }
            ErrorType.STORAGE_ERROR -> {
                "$baseMessage. Please check available space."
            }
            ErrorType.PERMISSION_ERROR -> {
                "$baseMessage. Please grant the requested permission in your device settings."
            }
            ErrorType.STORAGE -> {
                "$baseMessage. Please check that the app has permission to access storage."
            }
            ErrorType.IO_ERROR -> {
                "$baseMessage. Please try again. If the problem continues, restart the app."
            }
            ErrorType.INVALID_OPERATION_ERROR -> {
                "$baseMessage. Please try again."
            }
            ErrorType.BUSINESS_RULE_VIOLATION_ERROR -> {
                "$baseMessage. Please check requirements."
            }
            ErrorType.CONFIGURATION_ERROR -> {
                "$baseMessage. Please restart the app."
            }
            ErrorType.WEATHER_SERVICE_ERROR -> {
                "$baseMessage. Please try again later."
            }
            ErrorType.LOCATION_SERVICE_ERROR -> {
                "$baseMessage. Please check location permissions."
            }
            ErrorType.NOTIFICATION_SERVICE_ERROR -> {
                "$baseMessage. Please check notification settings."
            }
            ErrorType.UNKNOWN_ERROR -> {
                "$baseMessage. Please try again. If the problem continues, contact support."
            }
            ErrorType.UNKNOWN -> {
                "$baseMessage. Please try again. If the problem continues, contact support."
            }
        }
    }
    
    /**
     * Get recovery suggestions for error type
     */
    fun getRecoverySuggestions(errorType: ErrorType): List<String> {
        return when (errorType) {
            ErrorType.NETWORK_CONNECTION_ERROR -> listOf(
                "Check your Wi-Fi connection",
                "Check your mobile data connection",
                "Try turning airplane mode on and off",
                "Move to an area with better signal"
            )
            ErrorType.NETWORK_TIMEOUT_ERROR -> listOf(
                "Check your internet connection",
                "Try again in a few moments",
                "Close other apps using the internet",
                "Try using Wi-Fi instead of mobile data"
            )
            ErrorType.NETWORK_NO_INTERNET -> listOf(
                "Check your Wi-Fi connection",
                "Check your mobile data connection",
                "Try turning airplane mode on and off",
                "Move to an area with better signal"
            )
            ErrorType.NETWORK_SERVER_ERROR -> listOf(
                "Wait a few minutes and try again",
                "Check if the service is down",
                "Try again later",
                "Contact support if the problem persists"
            )
            ErrorType.NETWORK_GENERAL -> listOf(
                "Check your internet connection",
                "Restart your router",
                "Try using a different network",
                "Contact your internet provider"
            )
            ErrorType.API_ERROR -> listOf(
                "Try again later",
                "Check your internet connection",
                "Contact support if the problem persists"
            )
            ErrorType.SERVER_ERROR -> listOf(
                "Try again later",
                "Check your internet connection",
                "Contact support if the problem persists"
            )
            ErrorType.DATABASE_ERROR -> listOf(
                "Restart the app",
                "Clear app cache",
                "Contact support if the problem persists"
            )
            ErrorType.DATABASE_CONNECTION_ERROR -> listOf(
                "Restart the app",
                "Clear app cache",
                "Contact support if the problem persists"
            )
            ErrorType.DATA_CORRUPTION_ERROR -> listOf(
                "Restart the app",
                "Clear app data and cache",
                "Contact support immediately"
            )
            ErrorType.DATABASE_CORRUPTION -> listOf(
                "Restart the app",
                "Clear app data and cache",
                "Reinstall the app",
                "Contact support immediately"
            )
            ErrorType.DATABASE_FULL -> listOf(
                "Delete unnecessary files",
                "Clear app cache",
                "Move photos to cloud storage",
                "Uninstall unused apps"
            )
            ErrorType.DATABASE_GENERAL -> listOf(
                "Restart the app",
                "Clear app cache",
                "Check available storage",
                "Try again in a few moments"
            )
            ErrorType.AUTHENTICATION_ERROR -> listOf(
                "Enter your credentials again",
                "Check your username and password",
                "Reset your password if needed",
                "Contact support if you can't log in"
            )
            ErrorType.AUTHORIZATION_ERROR -> listOf(
                "Check your account permissions",
                "Contact support for access",
                "Try logging in again"
            )
            ErrorType.SESSION_EXPIRED_ERROR -> listOf(
                "Log in again",
                "Check your credentials",
                "Contact support if needed"
            )
            ErrorType.AUTHENTICATION -> listOf(
                "Enter your credentials again",
                "Check your username and password",
                "Reset your password if needed",
                "Contact support if you can't log in"
            )
            ErrorType.DATA_VALIDATION_ERROR -> listOf(
                "Check all required fields",
                "Ensure email format is correct",
                "Use a stronger password",
                "Check character limits"
            )
            ErrorType.DATA_NOT_FOUND_ERROR -> listOf(
                "Try refreshing the data",
                "Check your search criteria",
                "Contact support if needed"
            )
            ErrorType.DATA_SYNC_ERROR -> listOf(
                "Check your internet connection",
                "Try syncing again",
                "Contact support if needed"
            )
            ErrorType.VALIDATION -> listOf(
                "Check all required fields",
                "Ensure email format is correct",
                "Use a stronger password",
                "Check character limits"
            )
            ErrorType.MEMORY_ERROR -> listOf(
                "Close other apps",
                "Restart your device",
                "Clear app cache",
                "Free up device memory"
            )
            ErrorType.STORAGE_ERROR -> listOf(
                "Check available storage space",
                "Clear app cache",
                "Delete unnecessary files"
            )
            ErrorType.PERMISSION_ERROR -> listOf(
                "Go to device settings",
                "Find SmartFarm in app permissions",
                "Grant the requested permission",
                "Restart the app after granting permission"
            )
            ErrorType.STORAGE -> listOf(
                "Grant storage permission",
                "Check available storage space",
                "Clear app cache",
                "Restart the app"
            )
            ErrorType.IO_ERROR -> listOf(
                "Restart the app",
                "Clear app cache",
                "Check file permissions",
                "Try again in a few moments"
            )
            ErrorType.INVALID_OPERATION_ERROR -> listOf(
                "Try a different approach",
                "Check the requirements",
                "Contact support if needed"
            )
            ErrorType.BUSINESS_RULE_VIOLATION_ERROR -> listOf(
                "Check the requirements",
                "Try a different approach",
                "Contact support if needed"
            )
            ErrorType.CONFIGURATION_ERROR -> listOf(
                "Restart the app",
                "Clear app cache",
                "Contact support if needed"
            )
            ErrorType.WEATHER_SERVICE_ERROR -> listOf(
                "Try again later",
                "Check your internet connection",
                "Contact support if needed"
            )
            ErrorType.LOCATION_SERVICE_ERROR -> listOf(
                "Enable location services",
                "Grant location permission",
                "Check GPS settings"
            )
            ErrorType.NOTIFICATION_SERVICE_ERROR -> listOf(
                "Enable notifications",
                "Check notification settings",
                "Restart the app"
            )
            ErrorType.UNKNOWN_ERROR -> listOf(
                "Restart the app",
                "Clear app cache",
                "Check for app updates",
                "Contact support with error details"
            )
            ErrorType.UNKNOWN -> listOf(
                "Restart the app",
                "Clear app cache",
                "Check for app updates",
                "Contact support with error details"
            )
        }
    }
    
    /**
     * Get severity description
     */
    fun getSeverityDescription(severity: ErrorSeverity): String {
        return when (severity) {
            ErrorSeverity.LOW -> "Minor issue"
            ErrorSeverity.MEDIUM -> "Moderate issue"
            ErrorSeverity.HIGH -> "Important issue"
            ErrorSeverity.CRITICAL -> "Critical issue"
        }
    }
    
    /**
     * Get action button text for error type
     */
    fun getActionButtonText(errorType: ErrorType): String {
        return when (errorType) {
            ErrorType.NETWORK_CONNECTION_ERROR -> "Check Connection"
            ErrorType.NETWORK_TIMEOUT_ERROR -> "Try Again"
            ErrorType.NETWORK_NO_INTERNET -> "Check Connection"
            ErrorType.NETWORK_SERVER_ERROR -> "Retry"
            ErrorType.NETWORK_GENERAL -> "Retry"
            ErrorType.API_ERROR -> "Retry"
            ErrorType.SERVER_ERROR -> "Retry"
            ErrorType.DATABASE_ERROR -> "Retry"
            ErrorType.DATABASE_CONNECTION_ERROR -> "Retry"
            ErrorType.DATA_CORRUPTION_ERROR -> "Contact Support"
            ErrorType.DATABASE_CORRUPTION -> "Contact Support"
            ErrorType.DATABASE_FULL -> "Free Space"
            ErrorType.DATABASE_GENERAL -> "Retry"
            ErrorType.AUTHENTICATION_ERROR -> "Log In"
            ErrorType.AUTHORIZATION_ERROR -> "Contact Support"
            ErrorType.SESSION_EXPIRED_ERROR -> "Log In"
            ErrorType.AUTHENTICATION -> "Log In"
            ErrorType.DATA_VALIDATION_ERROR -> "Fix Input"
            ErrorType.DATA_NOT_FOUND_ERROR -> "Retry"
            ErrorType.DATA_SYNC_ERROR -> "Retry"
            ErrorType.VALIDATION -> "Fix Input"
            ErrorType.MEMORY_ERROR -> "Restart App"
            ErrorType.STORAGE_ERROR -> "Free Space"
            ErrorType.PERMISSION_ERROR -> "Settings"
            ErrorType.STORAGE -> "Grant Permission"
            ErrorType.IO_ERROR -> "Retry"
            ErrorType.INVALID_OPERATION_ERROR -> "Try Again"
            ErrorType.BUSINESS_RULE_VIOLATION_ERROR -> "Check Requirements"
            ErrorType.CONFIGURATION_ERROR -> "Restart App"
            ErrorType.WEATHER_SERVICE_ERROR -> "Retry"
            ErrorType.LOCATION_SERVICE_ERROR -> "Enable Location"
            ErrorType.NOTIFICATION_SERVICE_ERROR -> "Enable Notifications"
            ErrorType.UNKNOWN_ERROR -> "Try Again"
            ErrorType.UNKNOWN -> "Try Again"
        }
    }
    
    /**
     * Get secondary action button text
     */
    fun getSecondaryActionText(errorType: ErrorType): String? {
        return when (errorType) {
            ErrorType.NETWORK_CONNECTION_ERROR -> "Offline Mode"
            ErrorType.NETWORK_TIMEOUT_ERROR -> "Cancel"
            ErrorType.NETWORK_NO_INTERNET -> "Offline Mode"
            ErrorType.NETWORK_SERVER_ERROR -> "Report Issue"
            ErrorType.NETWORK_GENERAL -> "Cancel"
            ErrorType.API_ERROR -> "Cancel"
            ErrorType.SERVER_ERROR -> "Report Issue"
            ErrorType.DATABASE_ERROR -> "Cancel"
            ErrorType.DATABASE_CONNECTION_ERROR -> "Cancel"
            ErrorType.DATA_CORRUPTION_ERROR -> "Backup Data"
            ErrorType.DATABASE_CORRUPTION -> "Backup Data"
            ErrorType.DATABASE_FULL -> "Clear Cache"
            ErrorType.DATABASE_GENERAL -> "Cancel"
            ErrorType.AUTHENTICATION_ERROR -> "Forgot Password"
            ErrorType.AUTHORIZATION_ERROR -> "Contact Support"
            ErrorType.SESSION_EXPIRED_ERROR -> "Cancel"
            ErrorType.AUTHENTICATION -> "Forgot Password"
            ErrorType.DATA_VALIDATION_ERROR -> "Cancel"
            ErrorType.DATA_NOT_FOUND_ERROR -> "Cancel"
            ErrorType.DATA_SYNC_ERROR -> "Cancel"
            ErrorType.VALIDATION -> "Cancel"
            ErrorType.MEMORY_ERROR -> "Close Apps"
            ErrorType.STORAGE_ERROR -> "Clear Cache"
            ErrorType.PERMISSION_ERROR -> "Cancel"
            ErrorType.STORAGE -> "Cancel"
            ErrorType.IO_ERROR -> "Cancel"
            ErrorType.INVALID_OPERATION_ERROR -> "Cancel"
            ErrorType.BUSINESS_RULE_VIOLATION_ERROR -> "Contact Support"
            ErrorType.CONFIGURATION_ERROR -> "Cancel"
            ErrorType.WEATHER_SERVICE_ERROR -> "Cancel"
            ErrorType.LOCATION_SERVICE_ERROR -> "Cancel"
            ErrorType.NOTIFICATION_SERVICE_ERROR -> "Cancel"
            ErrorType.UNKNOWN_ERROR -> "Report Bug"
            ErrorType.UNKNOWN -> "Report Bug"
        }
    }
    
    /**
     * Get error icon description for accessibility
     */
    fun getErrorIconDescription(errorType: ErrorType): String {
        return when (errorType) {
            ErrorType.NETWORK_CONNECTION_ERROR -> "No internet connection icon"
            ErrorType.NETWORK_TIMEOUT_ERROR -> "Connection timeout icon"
            ErrorType.NETWORK_NO_INTERNET -> "No internet connection icon"
            ErrorType.NETWORK_SERVER_ERROR -> "Server error icon"
            ErrorType.NETWORK_GENERAL -> "Network error icon"
            ErrorType.API_ERROR -> "API error icon"
            ErrorType.SERVER_ERROR -> "Server error icon"
            ErrorType.DATABASE_ERROR -> "Database error icon"
            ErrorType.DATABASE_CONNECTION_ERROR -> "Database connection error icon"
            ErrorType.DATA_CORRUPTION_ERROR -> "Data corruption warning icon"
            ErrorType.DATABASE_CORRUPTION -> "Data corruption warning icon"
            ErrorType.DATABASE_FULL -> "Storage full icon"
            ErrorType.DATABASE_GENERAL -> "Database error icon"
            ErrorType.AUTHENTICATION_ERROR -> "Authentication error icon"
            ErrorType.AUTHORIZATION_ERROR -> "Authorization error icon"
            ErrorType.SESSION_EXPIRED_ERROR -> "Session expired icon"
            ErrorType.AUTHENTICATION -> "Authentication error icon"
            ErrorType.DATA_VALIDATION_ERROR -> "Input validation error icon"
            ErrorType.DATA_NOT_FOUND_ERROR -> "Data not found icon"
            ErrorType.DATA_SYNC_ERROR -> "Data sync error icon"
            ErrorType.VALIDATION -> "Input validation error icon"
            ErrorType.MEMORY_ERROR -> "Memory error icon"
            ErrorType.STORAGE_ERROR -> "Storage error icon"
            ErrorType.PERMISSION_ERROR -> "Permission error icon"
            ErrorType.STORAGE -> "Storage error icon"
            ErrorType.IO_ERROR -> "File access error icon"
            ErrorType.INVALID_OPERATION_ERROR -> "Invalid operation icon"
            ErrorType.BUSINESS_RULE_VIOLATION_ERROR -> "Business rule violation icon"
            ErrorType.CONFIGURATION_ERROR -> "Configuration error icon"
            ErrorType.WEATHER_SERVICE_ERROR -> "Weather service error icon"
            ErrorType.LOCATION_SERVICE_ERROR -> "Location service error icon"
            ErrorType.NOTIFICATION_SERVICE_ERROR -> "Notification service error icon"
            ErrorType.UNKNOWN_ERROR -> "Unknown error icon"
            ErrorType.UNKNOWN -> "Unknown error icon"
        }
    }
    
    /**
     * Get error category for grouping
     */
    fun getErrorCategory(errorType: ErrorType): String {
        return when (errorType) {
            ErrorType.NETWORK_CONNECTION_ERROR,
            ErrorType.NETWORK_TIMEOUT_ERROR,
            ErrorType.NETWORK_NO_INTERNET,
            ErrorType.NETWORK_SERVER_ERROR,
            ErrorType.NETWORK_GENERAL,
            ErrorType.API_ERROR,
            ErrorType.SERVER_ERROR -> "Network"
            
            ErrorType.DATABASE_ERROR,
            ErrorType.DATABASE_CONNECTION_ERROR,
            ErrorType.DATA_CORRUPTION_ERROR,
            ErrorType.DATABASE_CORRUPTION,
            ErrorType.DATABASE_FULL,
            ErrorType.DATABASE_GENERAL,
            ErrorType.DATA_VALIDATION_ERROR,
            ErrorType.DATA_NOT_FOUND_ERROR,
            ErrorType.DATA_SYNC_ERROR -> "Data"
            
            ErrorType.AUTHENTICATION_ERROR,
            ErrorType.AUTHORIZATION_ERROR,
            ErrorType.SESSION_EXPIRED_ERROR,
            ErrorType.AUTHENTICATION -> "Authentication"
            
            ErrorType.VALIDATION -> "Input"
            
            ErrorType.STORAGE_ERROR,
            ErrorType.STORAGE -> "Storage"
            
            ErrorType.MEMORY_ERROR,
            ErrorType.IO_ERROR,
            ErrorType.INVALID_OPERATION_ERROR,
            ErrorType.BUSINESS_RULE_VIOLATION_ERROR,
            ErrorType.CONFIGURATION_ERROR -> "System"
            
            ErrorType.PERMISSION_ERROR -> "Permissions"
            
            ErrorType.WEATHER_SERVICE_ERROR,
            ErrorType.LOCATION_SERVICE_ERROR,
            ErrorType.NOTIFICATION_SERVICE_ERROR -> "Services"
            
            ErrorType.UNKNOWN_ERROR,
            ErrorType.UNKNOWN -> "Unknown"
        }
    }
    
    /**
     * Check if error is user-actionable
     */
    fun isUserActionable(errorType: ErrorType): Boolean {
        return when (errorType) {
            ErrorType.NETWORK_CONNECTION_ERROR,
            ErrorType.NETWORK_TIMEOUT_ERROR,
            ErrorType.NETWORK_NO_INTERNET,
            ErrorType.NETWORK_SERVER_ERROR,
            ErrorType.NETWORK_GENERAL,
            ErrorType.API_ERROR,
            ErrorType.SERVER_ERROR,
            ErrorType.DATABASE_ERROR,
            ErrorType.DATABASE_CONNECTION_ERROR,
            ErrorType.DATABASE_FULL,
            ErrorType.DATABASE_GENERAL,
            ErrorType.AUTHENTICATION_ERROR,
            ErrorType.AUTHORIZATION_ERROR,
            ErrorType.SESSION_EXPIRED_ERROR,
            ErrorType.AUTHENTICATION,
            ErrorType.DATA_VALIDATION_ERROR,
            ErrorType.DATA_NOT_FOUND_ERROR,
            ErrorType.DATA_SYNC_ERROR,
            ErrorType.VALIDATION,
            ErrorType.STORAGE_ERROR,
            ErrorType.STORAGE,
            ErrorType.IO_ERROR,
            ErrorType.MEMORY_ERROR,
            ErrorType.PERMISSION_ERROR,
            ErrorType.INVALID_OPERATION_ERROR,
            ErrorType.BUSINESS_RULE_VIOLATION_ERROR,
            ErrorType.CONFIGURATION_ERROR,
            ErrorType.WEATHER_SERVICE_ERROR,
            ErrorType.LOCATION_SERVICE_ERROR,
            ErrorType.NOTIFICATION_SERVICE_ERROR -> true
            
            ErrorType.DATA_CORRUPTION_ERROR,
            ErrorType.DATABASE_CORRUPTION,
            ErrorType.UNKNOWN_ERROR,
            ErrorType.UNKNOWN -> false
        }
    }
    
    /**
     * Check if error requires immediate attention
     */
    fun requiresImmediateAttention(errorType: ErrorType): Boolean {
        return when (errorType) {
            ErrorType.DATA_CORRUPTION_ERROR,
            ErrorType.DATABASE_CORRUPTION,
            ErrorType.MEMORY_ERROR -> true
            
            else -> false
        }
    }
    
    /**
     * Get error priority for display order
     */
    fun getErrorPriority(errorType: ErrorType): Int {
        return when (errorType) {
            ErrorType.DATA_CORRUPTION_ERROR -> 1
            ErrorType.DATABASE_CORRUPTION -> 2
            ErrorType.MEMORY_ERROR -> 3
            ErrorType.AUTHENTICATION_ERROR -> 4
            ErrorType.AUTHENTICATION -> 5
            ErrorType.NETWORK_CONNECTION_ERROR -> 6
            ErrorType.NETWORK_NO_INTERNET -> 7
            ErrorType.NETWORK_SERVER_ERROR -> 8
            ErrorType.DATABASE_FULL -> 9
            ErrorType.PERMISSION_ERROR -> 10
            ErrorType.STORAGE_ERROR -> 11
            ErrorType.STORAGE -> 12
            ErrorType.NETWORK_TIMEOUT_ERROR -> 13
            ErrorType.NETWORK_GENERAL -> 14
            ErrorType.IO_ERROR -> 15
            ErrorType.DATABASE_ERROR -> 16
            ErrorType.DATABASE_GENERAL -> 17
            ErrorType.DATA_VALIDATION_ERROR -> 18
            ErrorType.VALIDATION -> 19
            ErrorType.UNKNOWN_ERROR -> 20
            ErrorType.UNKNOWN -> 21
            else -> 22
        }
    }
} 