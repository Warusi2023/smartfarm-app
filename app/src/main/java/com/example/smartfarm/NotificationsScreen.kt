package com.example.smartfarm

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.lazy.itemsIndexed
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import com.example.smartfarm.util.*
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.foundation.clickable
import androidx.compose.ui.graphics.Color
import java.text.SimpleDateFormat
import java.util.*

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun NotificationsScreen(
    onNavigateBack: () -> Unit = {},
    onNavigateToLivestock: (Long) -> Unit = {},
    onNavigateToActivity: (Long) -> Unit = {},
    onNavigateToAlert: (Long) -> Unit = {}
) {
    val context = LocalContext.current
    var selectedFilter by remember { mutableStateOf<NotificationFilter>(NotificationFilter.ALL) }
    var showMarkAllRead by remember { mutableStateOf(false) }
    
    // Mock notifications data - in real app, this would come from a ViewModel
    val notifications = remember {
        generateMockNotifications()
    }
    
    val filteredNotifications = remember(notifications, selectedFilter) {
        when (selectedFilter) {
            NotificationFilter.ALL -> notifications
            NotificationFilter.UNREAD -> notifications.filter { !it.isRead }
            NotificationFilter.ALERTS -> notifications.filter { it.type == NotificationDisplayType.ALERT }
NotificationFilter.REMINDERS -> notifications.filter { it.type == NotificationDisplayType.REMINDER }
NotificationFilter.ACTIVITIES -> notifications.filter { it.type == NotificationDisplayType.ACTIVITY }
NotificationFilter.SYSTEM -> notifications.filter { it.type == NotificationDisplayType.SYSTEM }
        }
    }
    
    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Notifications") },
                navigationIcon = {
                    IconButton(onClick = onNavigateBack) {
                        Icon(Icons.Default.ArrowBack, contentDescription = "Back")
                    }
                },
                actions = {
                    IconButton(onClick = { showMarkAllRead = true }) {
                        Icon(Icons.Default.DoneAll, contentDescription = "Mark all read")
                    }
                    IconButton(onClick = { /* TODO: Open notification settings */ }) {
                        Icon(Icons.Default.Settings, contentDescription = "Settings")
                    }
                }
            )
        }
    ) { paddingValues ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(paddingValues)
        ) {
            // Filter chips
            NotificationFilters(
                selectedFilter = selectedFilter,
                onFilterSelected = { selectedFilter = it }
            )
            
            // Notifications list
            if (filteredNotifications.isEmpty()) {
                EmptyNotificationsState(selectedFilter)
            } else {
                LazyColumn(
                    modifier = Modifier.fillMaxSize(),
                    contentPadding = PaddingValues(16.dp),
                    verticalArrangement = Arrangement.spacedBy(8.dp)
                ) {
                    itemsIndexed(filteredNotifications) { index, notification ->
                        NotificationItem(
                            notification = notification,
                            onNotificationClick = {
                                when (notification.type) {
    NotificationDisplayType.LIVESTOCK -> notification.livestockId?.let { onNavigateToLivestock(it) }
    NotificationDisplayType.ACTIVITY -> notification.activityId?.let { onNavigateToActivity(it) }
    NotificationDisplayType.ALERT -> notification.alertId?.let { onNavigateToAlert(it) }
    else -> { /* Handle other types */ }
}
                            },
                            onMarkRead = { /* TODO: Mark as read */ },
                            onDelete = { /* TODO: Delete notification */ }
                        )
                    }
                }
            }
        }
    }
    
    // Mark all read dialog
    if (showMarkAllRead) {
        MarkAllReadDialog(
            onConfirm = {
                // TODO: Mark all notifications as read
                showMarkAllRead = false
            },
            onDismiss = { showMarkAllRead = false }
        )
    }
}

@Composable
private fun NotificationFilters(
    selectedFilter: NotificationFilter,
    onFilterSelected: (NotificationFilter) -> Unit
) {
    LazyRow(
        contentPadding = PaddingValues(horizontal = 16.dp, vertical = 8.dp),
        horizontalArrangement = Arrangement.spacedBy(8.dp)
    ) {
        items(NotificationFilter.values()) { filter ->
            FilterChip(
                selected = selectedFilter == filter,
                onClick = { onFilterSelected(filter) },
                label = { Text(filter.displayName) },
                leadingIcon = {
                    Icon(
                        getFilterIcon(filter),
                        contentDescription = null,
                        modifier = Modifier.size(16.dp)
                    )
                }
            )
        }
    }
}

@Composable
private fun NotificationItem(
    notification: NotificationItem,
    onNotificationClick: () -> Unit,
    onMarkRead: () -> Unit,
    onDelete: () -> Unit
) {
    Card(
        modifier = Modifier.fillMaxWidth(),
        colors = CardDefaults.cardColors(
            containerColor = if (notification.isRead) 
                MaterialTheme.colorScheme.surface 
            else 
                MaterialTheme.colorScheme.primaryContainer.copy(alpha = 0.1f)
        )
    ) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(16.dp),
            verticalAlignment = Alignment.Top
        ) {
            // Notification icon
            Surface(
                modifier = Modifier.size(40.dp),
                shape = MaterialTheme.shapes.medium,
                color = getNotificationColor(notification.type)
            ) {
                Box(
                    modifier = Modifier.fillMaxSize(),
                    contentAlignment = Alignment.Center
                ) {
                    Icon(
                        getNotificationIcon(notification.type),
                        contentDescription = null,
                        tint = Color.White,
                        modifier = Modifier.size(20.dp)
                    )
                }
            }
            
            Spacer(modifier = Modifier.width(12.dp))
            
            // Notification content
            Column(
                modifier = Modifier.weight(1f)
            ) {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.Top
                ) {
                    Text(
                        text = notification.title,
                        style = MaterialTheme.typography.titleSmall,
                        fontWeight = if (notification.isRead) FontWeight.Normal else FontWeight.Medium,
                        modifier = Modifier.weight(1f)
                    )
                    
                    Text(
                        text = formatNotificationTime(notification.timestamp),
                        style = MaterialTheme.typography.bodySmall,
                        color = MaterialTheme.colorScheme.onSurfaceVariant
                    )
                }
                
                Spacer(modifier = Modifier.height(4.dp))
                
                Text(
                    text = notification.message,
                    style = MaterialTheme.typography.bodyMedium,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )
                
                if (notification.actionText != null) {
                    Spacer(modifier = Modifier.height(8.dp))
                    TextButton(
                        onClick = onNotificationClick,
                        contentPadding = PaddingValues(horizontal = 0.dp, vertical = 0.dp)
                    ) {
                        Text(notification.actionText)
                    }
                }
            }
            
            // Action buttons
            Column {
                if (!notification.isRead) {
                    IconButton(
                        onClick = onMarkRead,
                        modifier = Modifier.size(32.dp)
                    ) {
                        Icon(
                            Icons.Default.Done,
                            contentDescription = "Mark as read",
                            tint = MaterialTheme.colorScheme.primary,
                            modifier = Modifier.size(16.dp)
                        )
                    }
                }
                
                IconButton(
                    onClick = onDelete,
                    modifier = Modifier.size(32.dp)
                ) {
                    Icon(
                        Icons.Default.Delete,
                        contentDescription = "Delete",
                        tint = MaterialTheme.colorScheme.error,
                        modifier = Modifier.size(16.dp)
                    )
                }
            }
        }
    }
}

@Composable
private fun EmptyNotificationsState(filter: NotificationFilter) {
    Box(
        modifier = Modifier.fillMaxSize(),
        contentAlignment = Alignment.Center
    ) {
        Column(
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            Icon(
                when (filter) {
                    NotificationFilter.UNREAD -> Icons.Default.NotificationsOff
                    NotificationFilter.ALERTS -> Icons.Default.Warning
                    NotificationFilter.REMINDERS -> Icons.Default.Schedule
                    NotificationFilter.ACTIVITIES -> Icons.Default.Event
                    NotificationFilter.SYSTEM -> Icons.Default.Info
                    else -> Icons.Default.NotificationsNone
                },
                contentDescription = null,
                modifier = Modifier.size(64.dp),
                tint = MaterialTheme.colorScheme.onSurfaceVariant
            )
            
            Spacer(modifier = Modifier.height(16.dp))
            
            Text(
                text = when (filter) {
                    NotificationFilter.UNREAD -> "No unread notifications"
                    NotificationFilter.ALERTS -> "No alerts"
                    NotificationFilter.REMINDERS -> "No reminders"
                    NotificationFilter.ACTIVITIES -> "No activity notifications"
                    NotificationFilter.SYSTEM -> "No system notifications"
                    else -> "No notifications"
                },
                style = MaterialTheme.typography.titleMedium,
                fontWeight = FontWeight.Medium
            )
            
            Text(
                text = when (filter) {
                    NotificationFilter.UNREAD -> "All caught up! Check back later for new notifications."
                    NotificationFilter.ALERTS -> "No health alerts or urgent notifications at the moment."
                    NotificationFilter.REMINDERS -> "No scheduled reminders or tasks due."
                    NotificationFilter.ACTIVITIES -> "No farm activity notifications."
                    NotificationFilter.SYSTEM -> "No system updates or maintenance notifications."
                    else -> "You're all caught up with your notifications."
                },
                style = MaterialTheme.typography.bodyMedium,
                color = MaterialTheme.colorScheme.onSurfaceVariant,
                textAlign = TextAlign.Center
            )
        }
    }
}

@Composable
private fun MarkAllReadDialog(
    onConfirm: () -> Unit,
    onDismiss: () -> Unit
) {
    AlertDialog(
        onDismissRequest = onDismiss,
        title = { Text("Mark All as Read") },
        text = { Text("Are you sure you want to mark all notifications as read?") },
        confirmButton = {
            TextButton(onClick = onConfirm) {
                Text("Mark All Read")
            }
        },
        dismissButton = {
            TextButton(onClick = onDismiss) {
                Text("Cancel")
            }
        }
    )
}

// Helper functions
@Composable
private fun getFilterIcon(filter: NotificationFilter): androidx.compose.ui.graphics.vector.ImageVector {
    return when (filter) {
        NotificationFilter.ALL -> Icons.Default.AllInbox
        NotificationFilter.UNREAD -> Icons.Default.MarkEmailUnread
        NotificationFilter.ALERTS -> Icons.Default.Warning
        NotificationFilter.REMINDERS -> Icons.Default.Schedule
        NotificationFilter.ACTIVITIES -> Icons.Default.Event
        NotificationFilter.SYSTEM -> Icons.Default.Info
    }
}

@Composable
private fun getNotificationIcon(type: NotificationDisplayType): androidx.compose.ui.graphics.vector.ImageVector {
    return when (type) {
        NotificationDisplayType.LIVESTOCK -> Icons.Default.Pets
        NotificationDisplayType.ACTIVITY -> Icons.Default.Schedule
        NotificationDisplayType.ALERT -> Icons.Default.Warning
        NotificationDisplayType.REMINDER -> Icons.Default.Notifications
        NotificationDisplayType.SYSTEM -> Icons.Default.Info
        NotificationDisplayType.WEATHER -> Icons.Default.WbSunny
        NotificationDisplayType.FINANCIAL -> Icons.Default.AttachMoney
    }
}

@Composable
private fun getNotificationColor(type: NotificationDisplayType): Color {
    return when (type) {
        NotificationDisplayType.LIVESTOCK -> MaterialTheme.colorScheme.primary
        NotificationDisplayType.ACTIVITY -> MaterialTheme.colorScheme.secondary
        NotificationDisplayType.ALERT -> MaterialTheme.colorScheme.error
        NotificationDisplayType.REMINDER -> MaterialTheme.colorScheme.tertiary
        NotificationDisplayType.SYSTEM -> MaterialTheme.colorScheme.surfaceVariant
        NotificationDisplayType.WEATHER -> Color(0xFF2196F3) // Blue
        NotificationDisplayType.FINANCIAL -> Color(0xFF4CAF50) // Green
    }
}

private fun formatNotificationTime(timestamp: Long): String {
    val now = System.currentTimeMillis()
    val diff = now - timestamp
    
    return when {
        diff < 60000 -> "Just now"
        diff < 3600000 -> "${diff / 60000}m ago"
        diff < 86400000 -> "${diff / 3600000}h ago"
        else -> {
            val date = Date(timestamp)
            val formatter = SimpleDateFormat("MMM dd", Locale.getDefault())
            formatter.format(date)
        }
    }
}

// Data classes and enums
enum class NotificationFilter(val displayName: String) {
    ALL("All"),
    UNREAD("Unread"),
    ALERTS("Alerts"),
    REMINDERS("Reminders"),
    ACTIVITIES("Activities"),
    SYSTEM("System")
}

enum class NotificationDisplayType {
    LIVESTOCK,
    ACTIVITY,
    ALERT,
    REMINDER,
    SYSTEM,
    WEATHER,
    FINANCIAL
}

data class NotificationItem(
    val id: Long,
    val title: String,
    val message: String,
    val type: NotificationDisplayType,
    val timestamp: Long,
    val isRead: Boolean = false,
    val actionText: String? = null,
    val livestockId: Long? = null,
    val activityId: Long? = null,
    val alertId: Long? = null
)

fun generateMockNotifications(): List<NotificationItem> {
    val now = System.currentTimeMillis()
    val oneHour = 3600000L
    val oneDay = 86400000L
    
    return listOf(
        NotificationItem(
            id = 1,
            title = "Health Alert: Daisy needs attention",
            message = "Daisy's health status has changed to 'Poor'. Please check her condition.",
            type = NotificationDisplayType.ALERT,
            timestamp = now - oneHour,
            isRead = false,
            actionText = "View Details",
            livestockId = 1L
        ),
        NotificationItem(
            id = 2,
            title = "Vaccination Reminder",
            message = "Time to vaccinate the cattle herd. Schedule vaccination for next week.",
            type = NotificationDisplayType.REMINDER,
            timestamp = now - 2 * oneHour,
            isRead = false,
            actionText = "Schedule Now"
        ),
        NotificationItem(
            id = 3,
            title = "Weather Alert",
            message = "Heavy rain expected tomorrow. Secure livestock and equipment.",
            type = NotificationDisplayType.WEATHER,
            timestamp = now - 3 * oneHour,
            isRead = true
        ),
        NotificationItem(
            id = 4,
            title = "Activity Completed",
            message = "Morning feeding completed successfully for all livestock.",
            type = NotificationDisplayType.ACTIVITY,
            timestamp = now - 4 * oneHour,
            isRead = true,
            activityId = 1L
        ),
        NotificationItem(
            id = 5,
            title = "System Update",
            message = "SmartFarm app has been updated to version 1.0.1 with bug fixes.",
            type = NotificationDisplayType.SYSTEM,
            timestamp = now - oneDay,
            isRead = true
        ),
        NotificationItem(
            id = 6,
            title = "Financial Report",
            message = "Monthly financial report is ready. Review your farm's performance.",
            type = NotificationDisplayType.FINANCIAL,
            timestamp = now - 2 * oneDay,
            isRead = true,
            actionText = "View Report"
        ),
        NotificationItem(
            id = 7,
            title = "New Livestock Added",
            message = "Calf 'Buddy' has been added to your livestock records.",
            type = NotificationDisplayType.LIVESTOCK,
            timestamp = now - 3 * oneDay,
            isRead = true,
            livestockId = 2L
        ),
        NotificationItem(
            id = 8,
            title = "Feed Inventory Low",
            message = "Cattle feed inventory is running low. Consider reordering soon.",
            type = NotificationDisplayType.REMINDER,
            timestamp = now - 4 * oneDay,
            isRead = true,
            actionText = "Order Feed"
        )
    )
} 