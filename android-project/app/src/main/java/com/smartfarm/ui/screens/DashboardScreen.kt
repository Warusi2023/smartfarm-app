package com.smartfarm.ui.screens

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.grid.GridCells
import androidx.compose.foundation.lazy.grid.LazyVerticalGrid
import androidx.compose.foundation.lazy.grid.items
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.smartfarm.ui.components.EmptyState
import com.smartfarm.ui.components.ErrorState
import com.smartfarm.ui.components.LoadingState
import com.smartfarm.ui.components.DailyTipsCard
import com.smartfarm.ui.components.WeatherAlertsWidget
import com.smartfarm.shared.ui.viewmodel.DashboardViewModel
import org.koin.compose.viewmodel.viewModel

@Composable
fun DashboardScreen(
    viewModel: DashboardViewModel = viewModel(),
    onNavigateToAlerts: () -> Unit = {}
) {
    val uiState by viewModel.uiState.collectAsState()
    
    when {
        uiState.isLoading -> {
            LoadingState()
        }
        uiState.error != null && uiState.farms.isEmpty() -> {
            ErrorState(
                message = uiState.error ?: "Unknown error",
                onRetry = { viewModel.refresh() }
            )
        }
        else -> {
            DashboardContent(uiState = uiState, onNavigateToAlerts = onNavigateToAlerts)
        }
    }
}

@Composable
private fun DashboardContent(
    uiState: com.smartfarm.shared.ui.viewmodel.DashboardUiState,
    onNavigateToAlerts: () -> Unit
) {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp)
    ) {
        Text(
            text = "SmartFarm Dashboard",
            style = MaterialTheme.typography.headlineMedium,
            modifier = Modifier.padding(bottom = 16.dp)
        )
        
        // Weather Alerts Widget
        WeatherAlertsWidget(
            onViewAll = onNavigateToAlerts,
            modifier = Modifier.fillMaxWidth()
        )
        
        Spacer(Modifier.height(16.dp))
        
        LazyVerticalGrid(
            columns = GridCells.Fixed(2),
            horizontalArrangement = Arrangement.spacedBy(16.dp),
            verticalArrangement = Arrangement.spacedBy(16.dp)
        ) {
            item {
                StatCard(
                    title = "Farms",
                    value = uiState.farms.size.toString(),
                    icon = Icons.Default.Home
                )
            }
            item {
                StatCard(
                    title = "Livestock",
                    value = uiState.livestock.size.toString(),
                    icon = Icons.Default.Pets
                )
            }
            item {
                StatCard(
                    title = "Crops",
                    value = uiState.crops.size.toString(),
                    icon = Icons.Default.Crop
                )
            }
            item {
                StatCard(
                    title = "Tasks",
                    value = uiState.tasks.size.toString(),
                    icon = Icons.Default.CheckCircle
                )
            }
        }
        
        Spacer(Modifier.height(16.dp))
        
        DailyTipsCard(
            dailyTip = uiState.dailyTip,
            modifier = Modifier.fillMaxWidth()
        )
        
        if (uiState.error != null && uiState.farms.isNotEmpty()) {
            Spacer(Modifier.height(16.dp))
            Card(
                colors = CardDefaults.cardColors(
                    containerColor = MaterialTheme.colorScheme.errorContainer
                )
            ) {
                Text(
                    text = "Warning: ${uiState.error}",
                    modifier = Modifier.padding(16.dp),
                    color = MaterialTheme.colorScheme.onErrorContainer
                )
            }
        }
    }
}

@Composable
private fun StatCard(
    title: String,
    value: String,
    icon: androidx.compose.ui.graphics.vector.ImageVector
) {
    Card(
        modifier = Modifier.fillMaxWidth(),
        elevation = CardDefaults.cardElevation(defaultElevation = 4.dp)
    ) {
        Column(
            modifier = Modifier.padding(16.dp)
        ) {
            Icon(
                imageVector = icon,
                contentDescription = title,
                modifier = Modifier.size(32.dp),
                tint = MaterialTheme.colorScheme.primary
            )
            Spacer(Modifier.height(8.dp))
            Text(
                text = value,
                style = MaterialTheme.typography.headlineMedium
            )
            Text(
                text = title,
                style = MaterialTheme.typography.bodyMedium,
                color = MaterialTheme.colorScheme.onSurfaceVariant
            )
        }
    }
}

