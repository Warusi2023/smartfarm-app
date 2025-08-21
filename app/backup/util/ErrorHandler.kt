package com.yourcompany.smartfarm.util

import android.content.Context
import android.widget.Toast
import androidx.compose.runtime.Composable
import androidx.compose.runtime.remember
import androidx.compose.ui.platform.LocalContext
import kotlinx.coroutines.CancellationException
import java.io.IOException
import java.net.SocketTimeoutException
import java.net.UnknownHostException

/**
 * Centralized error handling for the SmartFarm app
 */
object ErrorHandler {
    
    /**
     * Common error types that can occur in the app
     */
    sealed class AppError(
        val message: String,
        val userFriendlyMessage: String,
        val isRetryable: Boolean = true
    ) {
        object NetworkError : AppError(
            message = "Network connection failed",
            userFriendlyMessage = "Please check your internet connection and try again",
            isRetryable = true
        )
        
        object DatabaseError : AppError(
            message = "Database operation failed",
            userFriendlyMessage = "Unable to save or load data. Please try again",
            isRetryable = true
        )
        
        object WeatherApiError : AppError(
            message = "Weather service unavailable",
            userFriendlyMessage = "Weather information is temporarily unavailable",
            isRetryable = true
        )
        
        object ValidationError : AppError(
            message = "Invalid input data",
            userFriendlyMessage = "Please check your input and try again",
            isRetryable = false
        )
        
        object PermissionError : AppError(
            message = "Required permission not granted",
            userFriendlyMessage = "This feature requires location permission",
            isRetryable = false
        )
        
        object UnknownError : AppError(
            message = "An unexpected error occurred",
            userFriendlyMessage = "Something went wrong. Please try again",
            isRetryable = true
        )
        
        data class CustomError(
            val customMessage: String,
            val customUserFriendlyMessage: String,
            val customIsRetryable: Boolean = true
        ) : AppError(customMessage, customUserFriendlyMessage, customIsRetryable)
    }
    
    /**
     * Convert exceptions to AppError types
     */
    fun handleException(exception: Throwable): AppError {
        return when (exception) {
            is CancellationException -> throw exception // Don't handle coroutine cancellations
            is UnknownHostException -> AppError.NetworkError
            is SocketTimeoutException -> AppError.NetworkError
            is IOException -> AppError.NetworkError
            is IllegalArgumentException -> AppError.ValidationError
            is SecurityException -> AppError.PermissionError
            else -> AppError.UnknownError
        }
    }
    
    /**
     * Show error toast message
     */
    fun showErrorToast(context: Context, error: AppError) {
        Toast.makeText(context, error.userFriendlyMessage, Toast.LENGTH_LONG).show()
    }
    
    /**
     * Log error for debugging
     */
    fun logError(tag: String, error: AppError, exception: Throwable? = null) {
        // In a real app, you would use a proper logging library like Timber
        android.util.Log.e(tag, "Error: ${error.message}", exception)
    }
}

/**
 * Composable wrapper for error handling
 */
@Composable
fun rememberErrorHandler(): ErrorHandler {
    return ErrorHandler
}

/**
 * Extension function for safe API calls
 */
/*
suspend fun <T> safeApiCall(
    errorHandler: ErrorHandler,
    tag: String = "API",
    apiCall: suspend () -> T
): Result<T> {
    return try {
        Result.success(apiCall())
    } catch (exception: Throwable) {
        val error = ErrorHandler.handleException(exception)
        ErrorHandler.logError(tag, error, exception)
        errorHandler.showErrorToast(error)
        Result.failure(exception)
    }
}
*/

/**
 * Extension function for safe database operations
 */
/*
suspend fun <T> safeDatabaseCall(
    errorHandler: ErrorHandler,
    tag: String = "Database",
    dbCall: suspend () -> T
): Result<T> {
    return try {
        Result.success(dbCall())
    } catch (exception: Throwable) {
        val error = ErrorHandler.AppError.DatabaseError
        ErrorHandler.logError(tag, error, exception)
        errorHandler.showErrorToast(error)
        Result.failure(exception)
    }
}
*/

/**
 * Common error messages for different scenarios
 */
object ErrorMessages {
    const val NETWORK_ERROR = "Please check your internet connection and try again"
    const val DATABASE_ERROR = "Unable to save or load data. Please try again"
    const val WEATHER_ERROR = "Weather information is temporarily unavailable"
    const val VALIDATION_ERROR = "Please check your input and try again"
    const val PERMISSION_ERROR = "This feature requires location permission"
    const val UNKNOWN_ERROR = "Something went wrong. Please try again"
    
    // Livestock specific errors
    const val LIVESTOCK_NOT_FOUND = "Livestock not found"
    const val LIVESTOCK_SAVE_ERROR = "Unable to save livestock information"
    const val LIVESTOCK_DELETE_ERROR = "Unable to delete livestock"
    
    // Weather specific errors
    const val WEATHER_FETCH_ERROR = "Unable to fetch weather data"
    const val LOCATION_ERROR = "Unable to get your location"
    
    // File specific errors
    const val FILE_SAVE_ERROR = "Unable to save file"
    const val FILE_READ_ERROR = "Unable to read file"
    const val EXPORT_ERROR = "Unable to export data"
    
    // Calendar specific errors
    const val CALENDAR_ERROR = "Unable to access calendar"
    const val EVENT_SAVE_ERROR = "Unable to save calendar event"
} 