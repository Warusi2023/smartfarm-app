package com.example.smartfarm.util

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material.icons.filled.Block
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp

/**
 * Reusable loading states for the SmartFarm app
 */
object LoadingStates {
    
    /**
     * Full screen loading state
     */
    @Composable
    fun FullScreenLoading(
        message: String = "Loading...",
        showProgress: Boolean = true
    ) {
        Box(
            modifier = Modifier.fillMaxSize(),
            contentAlignment = Alignment.Center
        ) {
            Column(
                horizontalAlignment = Alignment.CenterHorizontally
            ) {
                if (showProgress) {
                    CircularProgressIndicator(
                        modifier = Modifier.size(48.dp)
                    )
                    Spacer(modifier = Modifier.height(16.dp))
                }
                Text(
                    text = message,
                    style = MaterialTheme.typography.bodyLarge,
                    textAlign = TextAlign.Center
                )
            }
        }
    }
    
    /**
     * Card loading state
     */
    @Composable
    fun CardLoading(
        message: String = "Loading...",
        modifier: Modifier = Modifier
    ) {
        Card(
            modifier = modifier.fillMaxWidth()
        ) {
            Column(
                modifier = Modifier.padding(24.dp),
                horizontalAlignment = Alignment.CenterHorizontally
            ) {
                CircularProgressIndicator(
                    modifier = Modifier.size(32.dp)
                )
                Spacer(modifier = Modifier.height(12.dp))
                Text(
                    text = message,
                    style = MaterialTheme.typography.bodyMedium,
                    textAlign = TextAlign.Center
                )
            }
        }
    }
    
    /**
     * List item loading state
     */
    @Composable
    fun ListItemLoading(
        modifier: Modifier = Modifier
    ) {
        Card(
            modifier = modifier.fillMaxWidth()
        ) {
            Row(
                modifier = Modifier.padding(16.dp),
                verticalAlignment = Alignment.CenterVertically
            ) {
                CircularProgressIndicator(
                    modifier = Modifier.size(24.dp)
                )
                Spacer(modifier = Modifier.width(16.dp))
                Column {
                    LinearProgressIndicator(
                        modifier = Modifier.width(200.dp)
                    )
                    Spacer(modifier = Modifier.height(8.dp))
                    LinearProgressIndicator(
                        modifier = Modifier.width(150.dp)
                    )
                }
            }
        }
    }
    
    /**
     * Button loading state
     */
    @Composable
    fun ButtonLoading(
        text: String = "Loading...",
        modifier: Modifier = Modifier
    ) {
        Button(
            onClick = { },
            enabled = false,
            modifier = modifier
        ) {
            CircularProgressIndicator(
                modifier = Modifier.size(16.dp),
                color = MaterialTheme.colorScheme.onPrimary
            )
            Spacer(modifier = Modifier.width(8.dp))
            Text(text = text)
        }
    }
    
    /**
     * Skeleton loading for livestock items
     */
    @Composable
    fun LivestockSkeletonLoading(
        modifier: Modifier = Modifier
    ) {
        Card(
            modifier = modifier.fillMaxWidth()
        ) {
            Row(
                modifier = Modifier.padding(16.dp),
                verticalAlignment = Alignment.CenterVertically
            ) {
                // Avatar skeleton
                Box(
                    modifier = Modifier
                        .size(48.dp)
                        .background(
                            color = MaterialTheme.colorScheme.surfaceVariant,
                            shape = MaterialTheme.shapes.medium
                        )
                )
                
                Spacer(modifier = Modifier.width(16.dp))
                
                Column(modifier = Modifier.weight(1f)) {
                    // Name skeleton
                    LinearProgressIndicator(
                        modifier = Modifier.width(120.dp)
                    )
                    Spacer(modifier = Modifier.height(8.dp))
                    // Type skeleton
                    LinearProgressIndicator(
                        modifier = Modifier.width(80.dp)
                    )
                    Spacer(modifier = Modifier.height(8.dp))
                    // Health status skeleton
                    LinearProgressIndicator(
                        modifier = Modifier.width(100.dp)
                    )
                }
            }
        }
    }
    
    /**
     * Skeleton loading for weather card
     */
    @Composable
    fun WeatherSkeletonLoading(
        modifier: Modifier = Modifier
    ) {
        Card(
            modifier = modifier.fillMaxWidth()
        ) {
            Column(
                modifier = Modifier.padding(16.dp)
            ) {
                // Title skeleton
                LinearProgressIndicator(
                    modifier = Modifier.width(140.dp)
                )
                Spacer(modifier = Modifier.height(16.dp))
                
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween
                ) {
                    Column {
                        // Temperature skeleton
                        LinearProgressIndicator(
                            modifier = Modifier.width(80.dp)
                        )
                        Spacer(modifier = Modifier.height(8.dp))
                        // Condition skeleton
                        LinearProgressIndicator(
                            modifier = Modifier.width(100.dp)
                        )
                    }
                    Column(horizontalAlignment = Alignment.End) {
                        // Humidity skeleton
                        LinearProgressIndicator(
                            modifier = Modifier.width(100.dp)
                        )
                        Spacer(modifier = Modifier.height(8.dp))
                        // Wind skeleton
                        LinearProgressIndicator(
                            modifier = Modifier.width(80.dp)
                        )
                    }
                }
            }
        }
    }
    
    /**
     * Empty state component
     */
    @Composable
    fun EmptyState(
        icon: androidx.compose.ui.graphics.vector.ImageVector = Icons.Default.Inbox,
        title: String = "No Data",
        message: String = "There's nothing here yet",
        actionText: String? = null,
        onAction: (() -> Unit)? = null,
        modifier: Modifier = Modifier
    ) {
        Column(
            modifier = modifier.fillMaxSize(),
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.Center
        ) {
            Icon(
                icon,
                contentDescription = null,
                modifier = Modifier.size(64.dp),
                tint = MaterialTheme.colorScheme.onSurfaceVariant
            )
            Spacer(modifier = Modifier.height(16.dp))
            Text(
                text = title,
                style = MaterialTheme.typography.headlineSmall,
                textAlign = TextAlign.Center
            )
            Spacer(modifier = Modifier.height(8.dp))
            Text(
                text = message,
                style = MaterialTheme.typography.bodyMedium,
                textAlign = TextAlign.Center,
                color = MaterialTheme.colorScheme.onSurfaceVariant
            )
            if (actionText != null && onAction != null) {
                Spacer(modifier = Modifier.height(16.dp))
                Button(onClick = onAction) {
                    Text(text = actionText)
                }
            }
        }
    }
    
    /**
     * Error state component
     */
    @Composable
    fun ErrorState(
        icon: androidx.compose.ui.graphics.vector.ImageVector = Icons.Default.Error,
        title: String = "Error",
        message: String = "Something went wrong",
        retryText: String = "Retry",
        onRetry: (() -> Unit)? = null,
        modifier: Modifier = Modifier
    ) {
        Column(
            modifier = modifier.fillMaxSize(),
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.Center
        ) {
            Icon(
                icon,
                contentDescription = null,
                modifier = Modifier.size(64.dp),
                tint = MaterialTheme.colorScheme.error
            )
            Spacer(modifier = Modifier.height(16.dp))
            Text(
                text = title,
                style = MaterialTheme.typography.headlineSmall,
                textAlign = TextAlign.Center,
                color = MaterialTheme.colorScheme.error
            )
            Spacer(modifier = Modifier.height(8.dp))
            Text(
                text = message,
                style = MaterialTheme.typography.bodyMedium,
                textAlign = TextAlign.Center,
                color = MaterialTheme.colorScheme.onSurfaceVariant
            )
            if (onRetry != null) {
                Spacer(modifier = Modifier.height(16.dp))
                Button(onClick = onRetry) {
                    Text(text = retryText)
                }
            }
        }
    }
    
    /**
     * No internet state
     */
    @Composable
    fun NoInternetState(
        onRetry: () -> Unit,
        modifier: Modifier = Modifier
    ) {
        ErrorState(
            icon = Icons.Default.WifiOff,
            title = "No Internet Connection",
            message = "Please check your connection and try again",
            retryText = "Retry",
            onRetry = onRetry,
            modifier = modifier
        )
    }
    
    /**
     * Permission denied state
     */
    @Composable
    fun PermissionDeniedState(
        permission: String,
        onRequestPermission: () -> Unit,
        modifier: Modifier = Modifier
    ) {
        ErrorState(
            icon = Icons.Default.Block,
            title = "Permission Required",
            message = "This feature requires $permission permission",
            retryText = "Grant Permission",
            onRetry = onRequestPermission,
            modifier = modifier
        )
    }
}

/**
 * Extension function to show loading state in composables
 */
@Composable
fun rememberLoadingState(): LoadingState {
    return remember { mutableStateOf(false) }
}

/**
 * Loading state holder
 */
typealias LoadingState = androidx.compose.runtime.MutableState<Boolean> 