package com.yourcompany.smartfarm.util

import androidx.compose.runtime.*
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.launch

/**
 * UI State management for the SmartFarm app
 */
sealed class UIState<out T> {
    object Loading : UIState<Nothing>()
    data class Success<T>(val data: T) : UIState<T>()
    data class Error(val message: String, val isRetryable: Boolean = true) : UIState<Nothing>()
    object Empty : UIState<Nothing>()
}

/**
 * UI State Manager for handling common UI states
 */
class UIStateManager {
    private val _isLoading = mutableStateOf(false)
    val isLoading: State<Boolean> = _isLoading
    
    private val _errorMessage = mutableStateOf<String?>(null)
    val errorMessage: State<String?> = _errorMessage
    
    private val _successMessage = mutableStateOf<String?>(null)
    val successMessage: State<String?> = _successMessage
    
    private val _isRefreshing = mutableStateOf(false)
    val isRefreshing: State<Boolean> = _isRefreshing
    
    /**
     * Set loading state
     */
    fun setLoading(loading: Boolean) {
        _isLoading.value = loading
    }
    
    /**
     * Set error message
     */
    fun setError(message: String?) {
        _errorMessage.value = message
        if (message != null) {
            _isLoading.value = false
        }
    }
    
    /**
     * Set success message
     */
    fun setSuccess(message: String?) {
        _successMessage.value = message
        if (message != null) {
            _isLoading.value = false
        }
    }
    
    /**
     * Set refreshing state
     */
    fun setRefreshing(refreshing: Boolean) {
        _isRefreshing.value = refreshing
    }
    
    /**
     * Clear all states
     */
    fun clearStates() {
        _isLoading.value = false
        _errorMessage.value = null
        _successMessage.value = null
        _isRefreshing.value = false
    }
    
    /**
     * Clear error message
     */
    fun clearError() {
        _errorMessage.value = null
    }
    
    /**
     * Clear success message
     */
    fun clearSuccess() {
        _successMessage.value = null
    }
}

/**
 * Composable function to remember UI state manager
 */
@Composable
fun rememberUIStateManager(): UIStateManager {
    return remember { UIStateManager() }
}

/**
 * Generic UI state handler for async operations
 */
@Composable
fun <T> rememberUIState(): State<UIState<T>> {
    return remember { mutableStateOf<UIState<T>>(UIState.Loading) }
}

/**
 * Extension function to handle async operations with UI state
 */
fun <T> CoroutineScope.handleAsyncOperation(
    uiState: MutableState<UIState<T>>,
    onError: (String) -> Unit = {},
    operation: suspend () -> T
) {
    launch {
        uiState.value = UIState.Loading
        try {
            val result = operation()
            uiState.value = UIState.Success(result)
        } catch (e: Exception) {
            val errorMessage = e.message ?: "An unexpected error occurred"
            uiState.value = UIState.Error(errorMessage)
            onError(errorMessage)
        }
    }
}

/**
 * Extension function to handle async operations with retry capability
 */
fun <T> CoroutineScope.handleAsyncOperationWithRetry(
    uiState: MutableState<UIState<T>>,
    onError: (String) -> Unit = {},
    maxRetries: Int = 3,
    operation: suspend () -> T
) {
    launch {
        uiState.value = UIState.Loading
        var retryCount = 0
        
        while (retryCount < maxRetries) {
            try {
                val result = operation()
                uiState.value = UIState.Success(result)
                return@launch
            } catch (e: Exception) {
                retryCount++
                val errorMessage = e.message ?: "An unexpected error occurred"
                
                if (retryCount >= maxRetries) {
                    uiState.value = UIState.Error(errorMessage, isRetryable = true)
                    onError(errorMessage)
                } else {
                    // Wait before retrying
                    kotlinx.coroutines.delay(1000L * retryCount)
                }
            }
        }
    }
}

/**
 * Extension function to handle data refresh
 */
fun <T> CoroutineScope.handleRefresh(
    uiState: MutableState<UIState<T>>,
    onError: (String) -> Unit = {},
    operation: suspend () -> T
) {
    launch {
        try {
            val result = operation()
            uiState.value = UIState.Success(result)
        } catch (e: Exception) {
            val errorMessage = e.message ?: "Failed to refresh data"
            onError(errorMessage)
            // Don't change the UI state on refresh error, just show the error
        }
    }
}

/**
 * Extension function to handle data loading with empty state
 */
fun <T> CoroutineScope.handleDataLoading(
    uiState: MutableState<UIState<T>>,
    onError: (String) -> Unit = {},
    operation: suspend () -> T
) {
    launch {
        uiState.value = UIState.Loading
        try {
            val result = operation()
            uiState.value = if (result != null) {
                UIState.Success(result)
            } else {
                UIState.Empty
            }
        } catch (e: Exception) {
            val errorMessage = e.message ?: "Failed to load data"
            uiState.value = UIState.Error(errorMessage)
            onError(errorMessage)
        }
    }
}

/**
 * Extension function to handle form submission
 */
fun <T> CoroutineScope.handleFormSubmission(
    uiState: MutableState<UIState<T>>,
    onSuccess: (T) -> Unit = {},
    onError: (String) -> Unit = {},
    operation: suspend () -> T
) {
    launch {
        uiState.value = UIState.Loading
        try {
            val result = operation()
            uiState.value = UIState.Success(result)
            onSuccess(result)
        } catch (e: Exception) {
            val errorMessage = e.message ?: "Failed to submit form"
            uiState.value = UIState.Error(errorMessage, isRetryable = false)
            onError(errorMessage)
        }
    }
}

/**
 * Extension function to handle data deletion
 */
fun CoroutineScope.handleDeletion(
    uiState: MutableState<UIState<Boolean>>,
    onSuccess: () -> Unit = {},
    onError: (String) -> Unit = {},
    operation: suspend () -> Boolean
) {
    launch {
        uiState.value = UIState.Loading
        try {
            val result = operation()
            if (result) {
                uiState.value = UIState.Success(true)
                onSuccess()
            } else {
                uiState.value = UIState.Error("Failed to delete item", isRetryable = true)
                onError("Failed to delete item")
            }
        } catch (e: Exception) {
            val errorMessage = e.message ?: "Failed to delete item"
            uiState.value = UIState.Error(errorMessage, isRetryable = true)
            onError(errorMessage)
        }
    }
}

/**
 * Extension function to handle data saving
 */
fun <T> CoroutineScope.handleSave(
    uiState: MutableState<UIState<T>>,
    onSuccess: (T) -> Unit = {},
    onError: (String) -> Unit = {},
    operation: suspend () -> T
) {
    launch {
        uiState.value = UIState.Loading
        try {
            val result = operation()
            uiState.value = UIState.Success(result)
            onSuccess(result)
        } catch (e: Exception) {
            val errorMessage = e.message ?: "Failed to save data"
            uiState.value = UIState.Error(errorMessage, isRetryable = true)
            onError(errorMessage)
        }
    }
}

/**
 * Extension function to handle data update
 */
fun <T> CoroutineScope.handleUpdate(
    uiState: MutableState<UIState<T>>,
    onSuccess: (T) -> Unit = {},
    onError: (String) -> Unit = {},
    operation: suspend () -> T
) {
    launch {
        uiState.value = UIState.Loading
        try {
            val result = operation()
            uiState.value = UIState.Success(result)
            onSuccess(result)
        } catch (e: Exception) {
            val errorMessage = e.message ?: "Failed to update data"
            uiState.value = UIState.Error(errorMessage, isRetryable = true)
            onError(errorMessage)
        }
    }
}

/**
 * Extension function to handle search operations
 */
fun <T> CoroutineScope.handleSearch(
    uiState: MutableState<UIState<T>>,
    onError: (String) -> Unit = {},
    operation: suspend () -> T
) {
    launch {
        uiState.value = UIState.Loading
        try {
            val result = operation()
            uiState.value = if (result != null) {
                UIState.Success(result)
            } else {
                UIState.Empty
            }
        } catch (e: Exception) {
            val errorMessage = e.message ?: "Search failed"
            uiState.value = UIState.Error(errorMessage, isRetryable = true)
            onError(errorMessage)
        }
    }
}

/**
 * Extension function to handle file operations
 */
fun CoroutineScope.handleFileOperation(
    uiState: MutableState<UIState<String>>,
    onSuccess: (String) -> Unit = {},
    onError: (String) -> Unit = {},
    operation: suspend () -> String
) {
    launch {
        uiState.value = UIState.Loading
        try {
            val result = operation()
            uiState.value = UIState.Success(result)
            onSuccess(result)
        } catch (e: Exception) {
            val errorMessage = e.message ?: "File operation failed"
            uiState.value = UIState.Error(errorMessage, isRetryable = true)
            onError(errorMessage)
        }
    }
}

/**
 * Extension function to handle network operations
 */
fun <T> CoroutineScope.handleNetworkOperation(
    uiState: MutableState<UIState<T>>,
    onSuccess: (T) -> Unit = {},
    onError: (String) -> Unit = {},
    operation: suspend () -> T
) {
    launch {
        uiState.value = UIState.Loading
        try {
            val result = operation()
            uiState.value = UIState.Success(result)
            onSuccess(result)
        } catch (e: Exception) {
            val errorMessage = when (e) {
                is java.net.UnknownHostException -> "No internet connection"
                is java.net.SocketTimeoutException -> "Request timed out"
                is java.io.IOException -> "Network error"
                else -> e.message ?: "Network operation failed"
            }
            uiState.value = UIState.Error(errorMessage, isRetryable = true)
            onError(errorMessage)
        }
    }
}

/**
 * Extension function to handle database operations
 */
fun <T> CoroutineScope.handleDatabaseOperation(
    uiState: MutableState<UIState<T>>,
    onSuccess: (T) -> Unit = {},
    onError: (String) -> Unit = {},
    operation: suspend () -> T
) {
    launch {
        uiState.value = UIState.Loading
        try {
            val result = operation()
            uiState.value = UIState.Success(result)
            onSuccess(result)
        } catch (e: Exception) {
            val errorMessage = e.message ?: "Database operation failed"
            uiState.value = UIState.Error(errorMessage, isRetryable = true)
            onError(errorMessage)
        }
    }
} 