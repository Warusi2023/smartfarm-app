package com.smartfarm.ui.screens

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Add
import androidx.compose.material.icons.filled.Pets
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.smartfarm.shared.data.farm.SelectedFarmStore
import com.smartfarm.shared.data.model.dto.LivestockDto
import com.smartfarm.shared.ui.viewmodel.FarmViewModel
import com.smartfarm.shared.ui.viewmodel.LivestockViewModel
import com.smartfarm.ui.components.CurrentFarmBanner
import com.smartfarm.ui.components.EmptyState
import com.smartfarm.ui.components.ErrorState
import com.smartfarm.ui.components.LoadingState
import com.smartfarm.ui.screens.forms.AddLivestockDialog
import com.smartfarm.ui.theme.SmartFarmSpacing
import org.koin.compose.koinInject

@Composable
fun LivestockScreen(
    viewModel: LivestockViewModel = koinInject(),
    farmViewModel: FarmViewModel = koinInject(),
    selectedFarmStore: SelectedFarmStore = koinInject()
) {
    val uiState by viewModel.uiState.collectAsState()
    val farmState by farmViewModel.uiState.collectAsState()
    val selectedFarm by selectedFarmStore.selectedFarm.collectAsState()

    LaunchedEffect(Unit) {
        viewModel.loadLivestock()
        farmViewModel.loadFarms()
    }

    LaunchedEffect(farmState.farms) {
        selectedFarmStore.syncWithAvailableFarms(
            farmState.farms.map { it.id to it.name }
        )
    }

    var showDialog by remember { mutableStateOf(false) }

    Scaffold(
        containerColor = MaterialTheme.colorScheme.background,
        floatingActionButton = {
            FloatingActionButton(
                onClick = { showDialog = true },
                containerColor = MaterialTheme.colorScheme.primary,
                contentColor = MaterialTheme.colorScheme.onPrimary
            ) {
                Icon(Icons.Default.Add, contentDescription = "Add Livestock")
            }
        }
    ) { padding ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(padding)
        ) {
            CurrentFarmBanner(
                farmName = selectedFarm?.name,
                modifier = Modifier.padding(
                    horizontal = SmartFarmSpacing.lg,
                    vertical = SmartFarmSpacing.sm
                )
            )

            when {
                uiState.isLoading -> {
                    LoadingState(Modifier.weight(1f))
                }
                uiState.error != null && uiState.livestock.isEmpty() -> {
                    ErrorState(
                        message = uiState.error ?: "Unknown error",
                        onRetry = { viewModel.refresh() },
                        modifier = Modifier.weight(1f)
                    )
                }
                uiState.livestock.isEmpty() -> {
                    EmptyState(
                        title = "No livestock yet",
                        message = "Add animals to keep herd records in sync with your farm operations.",
                        icon = Icons.Default.Pets,
                        modifier = Modifier.weight(1f)
                    )
                }
                else -> {
                    LazyColumn(
                        modifier = Modifier
                            .weight(1f)
                            .padding(horizontal = SmartFarmSpacing.lg)
                            .padding(bottom = SmartFarmSpacing.lg),
                        verticalArrangement = Arrangement.spacedBy(SmartFarmSpacing.sm)
                    ) {
                        items(uiState.livestock, key = { it.id }) { livestock ->
                            LivestockCard(livestock = livestock)
                        }
                    }
                }
            }
        }
    }

    if (showDialog) {
        AddLivestockDialog(
            farms = farmState.farms,
            preferredFarmId = selectedFarm?.id,
            onDismiss = { showDialog = false },
            onSave = { livestock ->
                viewModel.createLivestock(livestock)
                showDialog = false
            }
        )
    }
}

@Composable
private fun LivestockCard(livestock: LivestockDto) {
    Card(
        modifier = Modifier.fillMaxWidth(),
        shape = MaterialTheme.shapes.medium,
        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
        elevation = CardDefaults.cardElevation(defaultElevation = 1.dp)
    ) {
        Column(modifier = Modifier.padding(SmartFarmSpacing.lg)) {
            Text(
                text = livestock.name,
                style = MaterialTheme.typography.titleMedium
            )
            val breed = livestock.breed
            if (!breed.isNullOrBlank()) {
                Text(
                    text = breed,
                    style = MaterialTheme.typography.bodyMedium,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )
            }
            Spacer(Modifier.height(SmartFarmSpacing.xs))
            Text(
                text = livestock.type.replaceFirstChar { it.uppercase() },
                style = MaterialTheme.typography.labelLarge,
                color = MaterialTheme.colorScheme.primary
            )
        }
    }
}
