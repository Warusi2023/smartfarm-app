package com.smartfarm.ui.components

import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Warning
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import com.smartfarm.shared.data.model.dto.WeatherAlertDto
import com.smartfarm.shared.ui.viewmodel.WeatherAlertsViewModel
import org.koin.compose.viewmodel.viewModel

/**
 * Weather Alerts Widget for Dashboard
 * Displays latest alerts and unread count
 */
@Composable
fun WeatherAlertsWidget(
    viewModel: WeatherAlertsViewModel = viewModel(),
    onViewAll: () -> Unit,
    modifier: Modifier = Modifier
) {
    val uiState by viewModel.uiState.collectAsState()
    val statsState by viewModel.statsState.collectAsState()
    
    // Load alerts on first composition
    LaunchedEffect(Unit) {
        viewModel.loadAlerts(unreadOnly = true, limit = 3)
        viewModel.loadStats()
    }
    
    Card(
        modifier = modifier
            .fillMaxWidth()
            .clickable { onViewAll() },
        elevation = CardDefaults.cardElevation(defaultElevation = 4.dp),
        colors = CardDefaults.cardColors(
            containerColor = when {
                statsState?.critical ?: 0 > 0 -> MaterialTheme.colorScheme.errorContainer
                statsState?.high ?: 0 > 0 -> MaterialTheme.colorScheme.tertiaryContainer
                else -> MaterialTheme.colorScheme.surfaceVariant
            }
        )
    ) {
        Column(
            modifier = Modifier.padding(16.dp)
        ) {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Row(
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.spacedBy(8.dp)
                ) {
                    Icon(
                        imageVector = Icons.Default.Warning,
                        contentDescription = "Weather Alerts",
                        tint = when {
                            statsState?.critical ?: 0 > 0 -> MaterialTheme.colorScheme.error
                            statsState?.high ?: 0 > 0 -> MaterialTheme.colorScheme.tertiary
                            else -> MaterialTheme.colorScheme.primary
                        }
                    )
                    Text(
                        text = "Weather Alerts",
                        style = MaterialTheme.typography.titleMedium,
                        fontWeight = FontWeight.Bold
                    )
                }
                
                // Unread badge
                if ((statsState?.unread ?: 0) > 0) {
                    Badge {
                        Text(
                            text = "${statsState?.unread ?: 0}",
                            style = MaterialTheme.typography.labelSmall
                        )
                    }
                }
            }
            
            Spacer(Modifier.height(12.dp))
            
            when (uiState) {
                is com.smartfarm.shared.ui.viewmodel.WeatherAlertsUiState.Loading -> {
                    CircularProgressIndicator(
                        modifier = Modifier.size(24.dp),
                        strokeWidth = 2.dp
                    )
                }
                is com.smartfarm.shared.ui.viewmodel.WeatherAlertsUiState.Error -> {
                    Text(
                        text = uiState.message,
                        style = MaterialTheme.typography.bodySmall,
                        color = MaterialTheme.colorScheme.error
                    )
                }
                is com.smartfarm.shared.ui.viewmodel.WeatherAlertsUiState.Success -> {
                    if (uiState.alerts.isEmpty()) {
                        Text(
                            text = "No weather alerts",
                            style = MaterialTheme.typography.bodyMedium,
                            color = MaterialTheme.colorScheme.onSurfaceVariant
                        )
                    } else {
                        // Show latest 1-3 alerts
                        uiState.alerts.take(3).forEach { alert ->
                            AlertItemCompact(alert = alert)
                            if (alert != uiState.alerts.take(3).last()) {
                                Spacer(Modifier.height(8.dp))
                            }
                        }
                        
                        if (uiState.alerts.size > 3) {
                            Spacer(Modifier.height(8.dp))
                            Text(
                                text = "And ${uiState.alerts.size - 3} more...",
                                style = MaterialTheme.typography.bodySmall,
                                color = MaterialTheme.colorScheme.primary,
                                modifier = Modifier.fillMaxWidth()
                            )
                        }
                    }
                }
            }
            
            Spacer(Modifier.height(8.dp))
            
            // View All button
            TextButton(
                onClick = { onViewAll() },
                modifier = Modifier.fillMaxWidth()
            ) {
                Text("View All Alerts")
            }
        }
    }
}

@Composable
private fun AlertItemCompact(alert: WeatherAlertDto) {
    Row(
        modifier = Modifier.fillMaxWidth(),
        verticalAlignment = Alignment.Top
    ) {
        // Severity indicator
        Box(
            modifier = Modifier
                .width(4.dp)
                .fillMaxHeight()
                .padding(end = 8.dp),
            contentAlignment = Alignment.TopCenter
        ) {
            Box(
                modifier = Modifier
                    .fillMaxHeight(0.5f)
                    .fillMaxWidth(),
                contentAlignment = Alignment.Center
            ) {
                val severityColor = when (alert.severity) {
                    "critical" -> MaterialTheme.colorScheme.error
                    "high" -> MaterialTheme.colorScheme.tertiary
                    "medium" -> MaterialTheme.colorScheme.primary
                    else -> MaterialTheme.colorScheme.secondary
                }
                Box(
                    modifier = Modifier
                        .fillMaxWidth()
                        .height(24.dp),
                    contentAlignment = Alignment.Center
                ) {
                    Divider(
                        color = severityColor,
                        thickness = 4.dp,
                        modifier = Modifier.fillMaxHeight()
                    )
                }
            }
        }
        
        Column(modifier = Modifier.weight(1f)) {
            Text(
                text = alert.title,
                style = MaterialTheme.typography.bodyMedium,
                fontWeight = FontWeight.Medium,
                maxLines = 1
            )
            Text(
                text = alert.message,
                style = MaterialTheme.typography.bodySmall,
                color = MaterialTheme.colorScheme.onSurfaceVariant,
                maxLines = 2
            )
        }
    }
}

