# Error Handling and Reporting Guide

## Overview

The SmartFarm app implements a comprehensive error handling and reporting system that provides:

- **Firebase Crashlytics Integration**: Automatic crash reporting and analytics
- **Error Recovery Mechanisms**: Automatic retry and recovery strategies
- **User-Friendly Error Messages**: Clear, actionable error messages for users
- **Performance Monitoring**: Tracking of app performance issues
- **Comprehensive Logging**: Detailed error logging and categorization

## Architecture

### Core Components

1. **ErrorHandler** - Main error handling orchestrator
2. **CrashlyticsManager** - Firebase Crashlytics integration
3. **ErrorRecoveryManager** - Automatic error recovery and retry mechanisms
4. **UserFriendlyErrorMessages** - User-facing error message management

### Error Types

The system categorizes errors into the following types:

#### Network Errors
- `NETWORK_NO_INTERNET` - No internet connection
- `NETWORK_TIMEOUT` - Connection timeout
- `NETWORK_SERVER_ERROR` - Server-side errors
- `NETWORK_GENERAL` - General network issues

#### Database Errors
- `DATABASE_CORRUPTION` - Database corruption
- `DATABASE_FULL` - Storage full
- `DATABASE_GENERAL` - General database issues

#### Authentication Errors
- `AUTHENTICATION` - Authentication failures

#### Validation Errors
- `VALIDATION` - Input validation errors

#### System Errors
- `STORAGE` - Storage access issues
- `IO_ERROR` - File I/O errors
- `MEMORY_ERROR` - Out of memory errors
- `PERMISSION_ERROR` - Permission issues
- `UNKNOWN` - Unknown errors

### Error Severity Levels

- **LOW** - Minor issues, non-critical
- **MEDIUM** - Moderate issues, may affect functionality
- **HIGH** - Important issues, significant impact
- **CRITICAL** - Critical issues, app may be unusable

## Implementation

### 1. Firebase Crashlytics Integration

#### Setup
```kotlin
// Already configured in build.gradle.kts
plugins {
    id("com.google.gms.google-services")
    id("com.google.firebase.crashlytics")
}

dependencies {
    implementation(platform("com.google.firebase:firebase-bom:32.7.2"))
    implementation("com.google.firebase:firebase-analytics")
    implementation("com.google.firebase:firebase-crashlytics")
    implementation("com.google.firebase:firebase-perf")
}
```

#### Usage
```kotlin
// Inject CrashlyticsManager
@Inject
lateinit var crashlyticsManager: CrashlyticsManager

// Set user identifier
crashlyticsManager.setUserIdentifier(userId)

// Log app errors
crashlyticsManager.logAppError(appError)

// Log performance issues
crashlyticsManager.logPerformanceIssue("slow_operation", 5000L, 1000L)

// Log network errors
crashlyticsManager.logNetworkError("/api/weather", 500, "Server error")

// Log database errors
crashlyticsManager.logDatabaseError("INSERT", "users", "Constraint violation")
```

### 2. Error Recovery Mechanisms

#### Automatic Recovery
```kotlin
// Inject ErrorRecoveryManager
@Inject
lateinit var errorRecoveryManager: ErrorRecoveryManager

// Attempt recovery
val result = errorRecoveryManager.attemptRecovery(error)
when (result) {
    is RecoveryResult.Success -> {
        // Recovery successful
        showSuccessMessage(result.message)
    }
    is RecoveryResult.Failed -> {
        // Recovery failed
        showErrorMessage(result.reason)
    }
}

// Schedule automatic recovery
errorRecoveryManager.scheduleRecovery(error, 5000L)
```

#### Recovery Strategies

**Network Recovery**
- Exponential backoff retry (1s, 2s, 4s, up to 30s max)
- Network availability checking
- Automatic retry on connection restoration

**Database Recovery**
- Database connection reinitialization
- Cache clearing
- Storage space management

**Authentication Recovery**
- Token refresh attempts
- Session revalidation
- Automatic re-authentication

**Memory Recovery**
- Garbage collection
- Cache clearing
- Memory optimization

### 3. User-Friendly Error Messages

#### Message Generation
```kotlin
// Inject UserFriendlyErrorMessages
@Inject
lateinit var userFriendlyMessages: UserFriendlyErrorMessages

// Get user-friendly message
val message = userFriendlyMessages.getDetailedUserMessage(error)

// Get recovery suggestions
val suggestions = userFriendlyMessages.getRecoverySuggestions(error.type)

// Get action button text
val actionText = userFriendlyMessages.getActionButtonText(error.type)
```

#### Message Examples

**Network Error**
```
"No internet connection. Please check your Wi-Fi or mobile data connection and try again."
```

**Database Error**
```
"Data access error. Please try again. If the problem continues, restart the app."
```

**Authentication Error**
```
"Please log in again. Your session has expired. Please log in again to continue."
```

### 4. ErrorHandler Integration

#### Basic Usage
```kotlin
// Inject ErrorHandler
@Inject
lateinit var errorHandler: ErrorHandler

// Handle error
val error = errorHandler.handleError(throwable, "WeatherScreen")

// Get user-friendly message
val userMessage = errorHandler.getUserFriendlyMessage(error)

// Get recovery suggestions
val suggestions = errorHandler.getRecoverySuggestions(error)

// Check if user can take action
val isActionable = errorHandler.isUserActionable(error)

// Attempt recovery
val recoveryResult = errorHandler.attemptRecovery(error)
```

#### Advanced Usage
```kotlin
// Log specific error types
errorHandler.logNetworkError("/api/weather", 500, "Server error")
errorHandler.logDatabaseError("SELECT", "users", "Table not found")
errorHandler.logAuthenticationError("login", "Invalid credentials")
errorHandler.logUIError("WeatherScreen", "refresh", "Failed to load data")

// Performance monitoring
errorHandler.logPerformanceIssue("weather_load", 3000L, 1000L, "WeatherScreen")

// Set user properties
errorHandler.setUserIdentifier(userId)
errorHandler.setUserProperty("user_type", "premium")
```

## Error UI Components

### Error Display
```kotlin
@Composable
fun ErrorDisplay(
    error: AppError,
    onRetry: () -> Unit,
    onDismiss: () -> Unit
) {
    val errorHandler = hiltViewModel<ErrorHandler>()
    val userMessage = errorHandler.getUserFriendlyMessage(error)
    val suggestions = errorHandler.getRecoverySuggestions(error)
    val actionText = errorHandler.getActionButtonText(error)
    val secondaryText = errorHandler.getSecondaryActionText(error)
    
    Card(
        modifier = Modifier.fillMaxWidth(),
        colors = CardDefaults.cardColors(
            containerColor = when (error.severity) {
                ErrorSeverity.LOW -> MaterialTheme.colorScheme.surface
                ErrorSeverity.MEDIUM -> MaterialTheme.colorScheme.surfaceVariant
                ErrorSeverity.HIGH -> MaterialTheme.colorScheme.errorContainer
                ErrorSeverity.CRITICAL -> MaterialTheme.colorScheme.error
            }
        )
    ) {
        Column(
            modifier = Modifier.padding(16.dp)
        ) {
            Text(
                text = userMessage,
                style = MaterialTheme.typography.bodyLarge,
                color = MaterialTheme.colorScheme.onSurface
            )
            
            if (suggestions.isNotEmpty()) {
                Spacer(modifier = Modifier.height(8.dp))
                Text(
                    text = "Suggestions:",
                    style = MaterialTheme.typography.labelMedium,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )
                suggestions.forEach { suggestion ->
                    Text(
                        text = "• $suggestion",
                        style = MaterialTheme.typography.bodySmall,
                        color = MaterialTheme.colorScheme.onSurfaceVariant
                    )
                }
            }
            
            Spacer(modifier = Modifier.height(16.dp))
            
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.End
            ) {
                if (errorHandler.isUserActionable(error)) {
                    Button(onClick = onRetry) {
                        Text(actionText)
                    }
                }
                
                secondaryText?.let { text ->
                    Spacer(modifier = Modifier.width(8.dp))
                    TextButton(onClick = onDismiss) {
                        Text(text)
                    }
                }
            }
        }
    }
}
```

### Error Snackbar
```kotlin
@Composable
fun ErrorSnackbar(
    error: AppError?,
    onDismiss: () -> Unit,
    onRetry: () -> Unit
) {
    error?.let { appError ->
        val errorHandler = hiltViewModel<ErrorHandler>()
        val userMessage = errorHandler.getUserFriendlyMessage(appError)
        val actionText = errorHandler.getActionButtonText(appError)
        
        Snackbar(
            onDismiss = onDismiss,
            action = {
                if (errorHandler.isUserActionable(appError)) {
                    TextButton(onClick = onRetry) {
                        Text(actionText)
                    }
                }
            }
        ) {
            Text(userMessage)
        }
    }
}
```

## Best Practices

### 1. Error Handling Strategy

**Always handle errors gracefully**
```kotlin
try {
    val result = performOperation()
    // Handle success
} catch (e: Exception) {
    val error = errorHandler.handleError(e, "OperationContext")
    // Show user-friendly error message
    showError(error)
}
```

**Use appropriate error types**
```kotlin
// Don't use generic exceptions
throw Exception("Something went wrong")

// Use specific error types
throw NetworkException("Connection failed")
throw ValidationException("Invalid email format", "Please enter a valid email address")
```

### 2. User Experience

**Provide actionable error messages**
```kotlin
// Bad: "Error occurred"
// Good: "No internet connection. Please check your Wi-Fi and try again."

// Bad: "Database error"
// Good: "Unable to save data. Please try again or restart the app."
```

**Offer recovery options**
```kotlin
// Always provide a way for users to recover
if (errorHandler.isUserActionable(error)) {
    showRetryButton(errorHandler.getActionButtonText(error))
}
```

### 3. Performance Monitoring

**Track performance issues**
```kotlin
val startTime = System.currentTimeMillis()
try {
    performOperation()
} finally {
    val duration = System.currentTimeMillis() - startTime
    if (duration > 1000L) {
        errorHandler.logPerformanceIssue("slow_operation", duration, 1000L)
    }
}
```

**Monitor critical operations**
```kotlin
// Track app startup time
errorHandler.logPerformanceIssue("app_startup", startupTime, 3000L)

// Track memory usage
val runtime = Runtime.getRuntime()
val usedMemory = runtime.totalMemory() - runtime.freeMemory()
val maxMemory = runtime.maxMemory()
errorHandler.logMemoryUsage(usedMemory, maxMemory)
```

### 4. Testing

**Test error scenarios**
```kotlin
@Test
fun testNetworkErrorHandling() {
    // Simulate network error
    val error = errorHandler.handleError(
        NoInternetException(),
        "TestContext"
    )
    
    assertEquals(ErrorType.NETWORK_NO_INTERNET, error.type)
    assertTrue(error.isRecoverable)
    assertTrue(errorHandler.isUserActionable(error))
}

@Test
fun testErrorRecovery() {
    val error = AppError(
        type = ErrorType.NETWORK_TIMEOUT,
        message = "Test timeout",
        userMessage = "Test user message",
        context = "Test",
        throwable = null,
        severity = ErrorSeverity.MEDIUM,
        isRecoverable = true
    )
    
    val result = runTest {
        errorRecoveryManager.attemptRecovery(error)
    }
    
    assertTrue(result is RecoveryResult.Success || result is RecoveryResult.Failed)
}
```

## Configuration

### Firebase Setup

1. **Add google-services.json** to app directory
2. **Configure Crashlytics** in Firebase Console
3. **Enable Analytics** for better insights
4. **Set up Performance Monitoring** for app performance tracking

### Error Reporting Configuration

```kotlin
// Enable/disable crash reporting
errorHandler.setCrashlyticsCollectionEnabled(BuildConfig.DEBUG.not())

// Set user properties
errorHandler.setUserProperty("app_version", BuildConfig.VERSION_NAME)
errorHandler.setUserProperty("build_type", BuildConfig.BUILD_TYPE)
```

### ProGuard Configuration

Ensure ProGuard rules preserve error handling classes:

```proguard
# Keep error handling classes
-keep class com.example.smartfarm.error.** { *; }

# Keep Firebase Crashlytics
-keep class com.google.firebase.crashlytics.** { *; }
-keep class com.google.firebase.analytics.** { *; }
```

## Monitoring and Analytics

### Firebase Console

1. **Crashlytics Dashboard** - View crash reports and trends
2. **Analytics Dashboard** - Monitor user behavior and app usage
3. **Performance Dashboard** - Track app performance metrics

### Key Metrics to Monitor

- **Crash-free user rate** - Should be > 99%
- **Error frequency by type** - Identify most common issues
- **Recovery success rate** - Monitor automatic recovery effectiveness
- **User action rates** - Track how users respond to errors

### Error Reporting

```kotlin
// Generate error report
val statistics = errorHandler.getErrorStatistics()
val mostCommonError = statistics.mostCommonError
val totalErrors = statistics.totalErrors

// Log to Crashlytics
crashlyticsManager.setCustomKey("total_errors", totalErrors)
crashlyticsManager.setCustomKey("most_common_error", mostCommonError?.first?.name ?: "none")
```

## Troubleshooting

### Common Issues

1. **Crashlytics not reporting**
   - Check google-services.json configuration
   - Verify internet connectivity
   - Check ProGuard rules

2. **Error recovery not working**
   - Verify error type categorization
   - Check recovery strategy implementation
   - Monitor recovery logs

3. **User messages not displaying**
   - Check string resources
   - Verify error type mapping
   - Test UI components

### Debug Mode

```kotlin
if (BuildConfig.DEBUG) {
    // Enable detailed logging
    errorHandler.setCrashlyticsCollectionEnabled(true)
    
    // Log all errors to logcat
    errorHandler.currentError.collect { error ->
        Log.d("ErrorHandler", "Current error: $error")
    }
}
```

## Future Enhancements

1. **Machine Learning Integration** - Predict and prevent errors
2. **Advanced Analytics** - User behavior analysis during errors
3. **A/B Testing** - Test different error message strategies
4. **Automated Testing** - Comprehensive error scenario testing
5. **Error Prediction** - Proactive error prevention

## Conclusion

The comprehensive error handling system provides:

- **Reliability**: Automatic error recovery and retry mechanisms
- **User Experience**: Clear, actionable error messages
- **Monitoring**: Detailed crash reporting and analytics
- **Maintainability**: Modular, testable architecture
- **Scalability**: Extensible design for future enhancements

This system ensures the SmartFarm app provides a robust, user-friendly experience even when errors occur. 