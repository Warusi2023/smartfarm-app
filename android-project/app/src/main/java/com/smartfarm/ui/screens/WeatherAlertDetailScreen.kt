package com.smartfarm.ui.screens

import androidx.compose.foundation.layout.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import com.smartfarm.shared.data.model.dto.WeatherAlertDto
import com.smartfarm.shared.ui.viewmodel.WeatherAlertsUiState
import com.smartfarm.shared.ui.viewmodel.WeatherAlertsViewModel
import com.smartfarm.ui.components.ErrorState
import com.smartfarm.ui.components.LoadingState
import kotlinx.coroutines.launch
import org.koin.compose.koinInject

@Composable
fun WeatherAlertDetailScreen(
    alertId: String,
    viewModel: WeatherAlertsViewModel = koinInject(),
    onBack: () -> Unit
) {
    val uiState by viewModel.uiState.collectAsState()
    val scope = rememberCoroutineScope()
    val state = uiState

    LaunchedEffect(alertId) {
        viewModel.getAlert(alertId)
    }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Alert Details") },
                navigationIcon = {
                    IconButton(onClick = onBack) {
                        Icon(Icons.Default.ArrowBack, contentDescription = "Back")
                    }
                }
            )
        }
    ) { padding ->
        when (state) {
            is WeatherAlertsUiState.Loading -> {
                LoadingState(Modifier.padding(padding))
            }
            is WeatherAlertsUiState.Error -> {
                ErrorState(
                    message = state.message,
                    onRetry = { scope.launch { viewModel.getAlert(alertId) } },
                    modifier = Modifier.padding(padding)
                )
            }
            is WeatherAlertsUiState.Success -> {
                val alert = state.alerts.firstOrNull { it.id == alertId }
                if (alert != null) {
                    AlertDetailContent(
                        alert = alert,
                        onMarkAsRead = { scope.launch { viewModel.markAsRead(it) } },
                        onDismiss = { scope.launch { viewModel.dismiss(it) } },
                        onActionTaken = { scope.launch { viewModel.markActionTaken(it) } },
                        modifier = Modifier.padding(padding)
                    )
                } else {
                    LaunchedEffect(alertId) {
                        viewModel.getAlert(alertId)
                    }
                    ErrorState(
                        message = "Loading alert details...",
                        onRetry = { scope.launch { viewModel.getAlert(alertId) } },
                        modifier = Modifier.padding(padding)
                    )
                }
            }
        }
    }
}

@Composable
private fun AlertDetailContent(
    alert: WeatherAlertDto,
    onMarkAsRead: (String) -> Unit,
    onDismiss: (String) -> Unit,
    onActionTaken: (String) -> Unit,
    modifier: Modifier = Modifier
) {
    val severityColor = when (alert.severity) {
        "critical" -> MaterialTheme.colorScheme.error
        "high" -> MaterialTheme.colorScheme.tertiary
        "medium" -> MaterialTheme.colorScheme.primary
        else -> MaterialTheme.colorScheme.secondary
    }

    Column(
        modifier = modifier
            .fillMaxSize()
            .padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        Card(
            modifier = Modifier.fillMaxWidth(),
            colors = CardDefaults.cardColors(
                containerColor = severityColor.copy(alpha = 0.1f)
            )
        ) {
            Column(
                modifier = Modifier.padding(16.dp)
            ) {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = androidx.compose.ui.Alignment.CenterVertically
                ) {
                    Text(
                        text = alert.title,
                        style = MaterialTheme.typography.headlineSmall,
                        fontWeight = FontWeight.Bold
                    )

                    Badge(
                        containerColor = severityColor
                    ) {
                        Text(
                            text = alert.severity.uppercase(),
                            style = MaterialTheme.typography.labelSmall
                        )
                    }
                }

                Spacer(Modifier.height(8.dp))

                Text(
                    text = alert.message,
                    style = MaterialTheme.typography.bodyLarge
                )
            }
        }

        Card(
            modifier = Modifier.fillMaxWidth()
        ) {
            Column(
                modifier = Modifier.padding(16.dp),
                verticalArrangement = Arrangement.spacedBy(12.dp)
            ) {
                DetailRow(
                    label = "Alert Type",
                    value = alert.alert_type.replace("_", " ").replaceFirstChar { it.uppercase() }
                )

                DetailRow(
                    label = "Expected Time",
                    value = formatExpectedTime(alert.expected_time)
                )

                val farmName = alert.farm_name
                if (farmName != null) {
                    DetailRow(label = "Farm", value = farmName)
                }

                val locationName = alert.location_name
                if (locationName != null) {
                    DetailRow(label = "Location", value = locationName)
                }

                val weatherData = alert.weather_data
                if (weatherData != null && weatherData.isNotEmpty()) {
                    Divider()
                    Text(
                        text = "Weather Data",
                        style = MaterialTheme.typography.titleSmall,
                        fontWeight = FontWeight.Bold
                    )
                    weatherData.forEach { (key, value) ->
                        DetailRow(
                            label = key.replace("_", " ").replaceFirstChar { it.uppercase() },
                            value = value
                        )
                    }
                }
            }
        }

        if (alert.action_taken) {
            Card(
                modifier = Modifier.fillMaxWidth(),
                colors = CardDefaults.cardColors(
                    containerColor = MaterialTheme.colorScheme.primaryContainer
                )
            ) {
                Column(
                    modifier = Modifier.padding(16.dp)
                ) {
                    Row(
                        verticalAlignment = androidx.compose.ui.Alignment.CenterVertically,
                        horizontalArrangement = Arrangement.spacedBy(8.dp)
                    ) {
                        Icon(
                            Icons.Default.CheckCircle,
                            contentDescription = null,
                            tint = MaterialTheme.colorScheme.primary
                        )
                        Text(
                            text = "Action Taken",
                            style = MaterialTheme.typography.titleMedium,
                            fontWeight = FontWeight.Bold
                        )
                    }

                    val actionNotes = alert.action_notes
                    if (actionNotes != null) {
                        Spacer(Modifier.height(8.dp))
                        Text(
                            text = actionNotes,
                            style = MaterialTheme.typography.bodyMedium
                        )
                    }
                }
            }
        }

        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            if (!alert.is_read) {
                Button(
                    onClick = { onMarkAsRead(alert.id) },
                    modifier = Modifier.weight(1f)
                ) {
                    Icon(Icons.Default.Check, contentDescription = null)
                    Spacer(Modifier.width(4.dp))
                    Text("Mark as Read")
                }
            }

            if (!alert.is_dismissed) {
                OutlinedButton(
                    onClick = { onDismiss(alert.id) },
                    modifier = Modifier.weight(1f)
                ) {
                    Icon(Icons.Default.Close, contentDescription = null)
                    Spacer(Modifier.width(4.dp))
                    Text("Dismiss")
                }
            }

            if (!alert.action_taken) {
                OutlinedButton(
                    onClick = { onActionTaken(alert.id) },
                    modifier = Modifier.weight(1f)
                ) {
                    Icon(Icons.Default.Done, contentDescription = null)
                    Spacer(Modifier.width(4.dp))
                    Text("Action Taken")
                }
            }
        }
    }
}

@Composable
private fun DetailRow(
    label: String,
    value: String
) {
    Row(
        modifier = Modifier.fillMaxWidth(),
        horizontalArrangement = Arrangement.SpaceBetween
    ) {
        Text(
            text = label,
            style = MaterialTheme.typography.bodyMedium,
            color = MaterialTheme.colorScheme.onSurfaceVariant,
            modifier = Modifier.weight(1f)
        )
        Text(
            text = value,
            style = MaterialTheme.typography.bodyMedium,
            fontWeight = FontWeight.Medium,
            modifier = Modifier.weight(1f)
        )
    }
}

private fun formatExpectedTime(expectedTime: String): String {
    return try {
        val date = java.time.Instant.parse(expectedTime)
        val formatter = java.time.format.DateTimeFormatter.ofPattern("MMM dd, yyyy 'at' HH:mm")
            .withZone(java.time.ZoneId.systemDefault())
        formatter.format(date)
    } catch (e: Exception) {
        expectedTime
    }
}
