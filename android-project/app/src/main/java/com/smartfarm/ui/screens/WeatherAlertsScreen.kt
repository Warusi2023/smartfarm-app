package com.smartfarm.ui.screens

import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import com.smartfarm.shared.data.model.dto.WeatherAlertDto
import com.smartfarm.shared.ui.viewmodel.WeatherAlertsViewModel
import com.smartfarm.ui.components.EmptyState
import com.smartfarm.ui.components.ErrorState
import com.smartfarm.ui.components.LoadingState
import org.koin.compose.viewmodel.viewModel

@Composable
fun WeatherAlertsScreen(
    viewModel: WeatherAlertsViewModel = viewModel(),
    onAlertClick: (String) -> Unit
) {
    val uiState by viewModel.uiState.collectAsState()
    val statsState by viewModel.statsState.collectAsState()
    
    LaunchedEffect(Unit) {
        viewModel.loadAlerts()
        viewModel.loadStats()
    }
    
    Scaffold(
        topBar = {
            TopAppBar(
                title = { 
                    Row(
                        verticalAlignment = androidx.compose.ui.Alignment.CenterVertically,
                        horizontalArrangement = Arrangement.spacedBy(8.dp)
                    ) {
                        Text("Weather Alerts")
                        if ((statsState?.unread ?: 0) > 0) {
                            Badge {
                                Text("${statsState?.unread}")
                            }
                        }
                    }
                },
                actions = {
                    IconButton(onClick = { viewModel.refresh() }) {
                        Icon(Icons.Default.Refresh, contentDescription = "Refresh")
                    }
                }
            )
        }
    ) { padding ->
        when (uiState) {
            is com.smartfarm.shared.ui.viewmodel.WeatherAlertsUiState.Loading -> {
                LoadingState(Modifier.padding(padding))
            }
            is com.smartfarm.shared.ui.viewmodel.WeatherAlertsUiState.Error -> {
                ErrorState(
                    message = uiState.message,
                    onRetry = { viewModel.refresh() },
                    modifier = Modifier.padding(padding)
                )
            }
            is com.smartfarm.shared.ui.viewmodel.WeatherAlertsUiState.Success -> {
                if (uiState.alerts.isEmpty()) {
                    EmptyState(
                        title = "No Weather Alerts",
                        message = "You'll be notified when important weather events are detected",
                        icon = Icons.Default.WbSunny,
                        modifier = Modifier.padding(padding)
                    )
                } else {
                    // Statistics cards
                    Column(
                        modifier = Modifier
                            .fillMaxSize()
                            .padding(padding)
                            .padding(16.dp)
                    ) {
                        // Stats row
                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            horizontalArrangement = Arrangement.spacedBy(8.dp)
                        ) {
                            StatCard(
                                title = "Total",
                                value = "${statsState?.total ?: 0}",
                                modifier = Modifier.weight(1f)
                            )
                            StatCard(
                                title = "Critical",
                                value = "${statsState?.critical ?: 0}",
                                color = MaterialTheme.colorScheme.error,
                                modifier = Modifier.weight(1f)
                            )
                            StatCard(
                                title = "High",
                                value = "${statsState?.high ?: 0}",
                                color = MaterialTheme.colorScheme.tertiary,
                                modifier = Modifier.weight(1f)
                            )
                        }
                        
                        Spacer(Modifier.height(16.dp))
                        
                        // Alerts list
                        LazyColumn(
                            verticalArrangement = Arrangement.spacedBy(8.dp)
                        ) {
                            items(uiState.alerts) { alert ->
                                AlertCard(
                                    alert = alert,
                                    onClick = { onAlertClick(alert.id) },
                                    onMarkRead = { viewModel.markAsRead(alert.id) },
                                    onDismiss = { viewModel.dismiss(alert.id) }
                                )
                            }
                        }
                    }
                }
            }
        }
    }
}

@Composable
private fun StatCard(
    title: String,
    value: String,
    color: androidx.compose.ui.graphics.Color = MaterialTheme.colorScheme.primary,
    modifier: Modifier = Modifier
) {
    Card(
        modifier = modifier,
        colors = CardDefaults.cardColors(
            containerColor = color.copy(alpha = 0.1f)
        )
    ) {
        Column(
            modifier = Modifier.padding(12.dp),
            horizontalAlignment = androidx.compose.ui.Alignment.CenterHorizontally
        ) {
            Text(
                text = value,
                style = MaterialTheme.typography.headlineSmall,
                fontWeight = FontWeight.Bold,
                color = color
            )
            Text(
                text = title,
                style = MaterialTheme.typography.bodySmall,
                color = MaterialTheme.colorScheme.onSurfaceVariant
            )
        }
    }
}

@Composable
private fun AlertCard(
    alert: WeatherAlertDto,
    onClick: () -> Unit,
    onMarkRead: () -> Unit,
    onDismiss: () -> Unit
) {
    val severityColor = when (alert.severity) {
        "critical" -> MaterialTheme.colorScheme.error
        "high" -> MaterialTheme.colorScheme.tertiary
        "medium" -> MaterialTheme.colorScheme.primary
        else -> MaterialTheme.colorScheme.secondary
    }
    
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .clickable { onClick() },
        elevation = CardDefaults.cardElevation(
            defaultElevation = if (!alert.is_read) 4.dp else 2.dp
        ),
        colors = CardDefaults.cardColors(
            containerColor = if (!alert.is_read) {
                severityColor.copy(alpha = 0.1f)
            } else {
                MaterialTheme.colorScheme.surface
            }
        )
    ) {
        Row(
            modifier = Modifier.padding(16.dp)
        ) {
            // Severity indicator
            Box(
                modifier = Modifier
                    .width(4.dp)
                    .fillMaxHeight()
                    .padding(end = 12.dp)
            ) {
                Divider(
                    color = severityColor,
                    thickness = 4.dp,
                    modifier = Modifier.fillMaxHeight()
                )
            }
            
            Column(modifier = Modifier.weight(1f)) {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = androidx.compose.ui.Alignment.CenterVertically
                ) {
                    Text(
                        text = alert.title,
                        style = MaterialTheme.typography.titleMedium,
                        fontWeight = if (!alert.is_read) FontWeight.Bold else FontWeight.Normal
                    )
                    
                    // Severity badge
                    Badge(
                        containerColor = severityColor
                    ) {
                        Text(
                            text = alert.severity.uppercase(),
                            style = MaterialTheme.typography.labelSmall
                        )
                    }
                }
                
                Spacer(Modifier.height(4.dp))
                
                Text(
                    text = alert.message,
                    style = MaterialTheme.typography.bodyMedium,
                    color = MaterialTheme.colorScheme.onSurfaceVariant,
                    maxLines = 2
                )
                
                Spacer(Modifier.height(8.dp))
                
                // Meta info
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween
                ) {
                    Text(
                        text = alert.farm_name ?: alert.location_name ?: "Farm",
                        style = MaterialTheme.typography.bodySmall,
                        color = MaterialTheme.colorScheme.primary
                    )
                    
                    Text(
                        text = formatExpectedTime(alert.expected_time),
                        style = MaterialTheme.typography.bodySmall,
                        color = MaterialTheme.colorScheme.onSurfaceVariant
                    )
                }
                
                // Actions
                if (!alert.is_read || !alert.is_dismissed) {
                    Spacer(Modifier.height(8.dp))
                    Row(
                        horizontalArrangement = Arrangement.spacedBy(8.dp)
                    ) {
                        if (!alert.is_read) {
                            TextButton(onClick = onMarkRead) {
                                Icon(Icons.Default.Check, contentDescription = null, modifier = Modifier.size(16.dp))
                                Spacer(Modifier.width(4.dp))
                                Text("Mark Read")
                            }
                        }
                        if (!alert.is_dismissed) {
                            TextButton(onClick = onDismiss) {
                                Icon(Icons.Default.Close, contentDescription = null, modifier = Modifier.size(16.dp))
                                Spacer(Modifier.width(4.dp))
                                Text("Dismiss")
                            }
                        }
                    }
                }
            }
        }
    }
}

private fun formatExpectedTime(expectedTime: String): String {
    return try {
        val date = java.time.Instant.parse(expectedTime)
        val now = java.time.Instant.now()
        val diff = java.time.Duration.between(now, date)
        
        if (diff.isNegative) {
            "Past"
        } else {
            val hours = diff.toHours()
            when {
                hours < 1 -> "Within 1 hour"
                hours < 24 -> "In $hours hours"
                else -> "In ${hours / 24} days"
            }
        }
    } catch (e: Exception) {
        expectedTime
    }
}

