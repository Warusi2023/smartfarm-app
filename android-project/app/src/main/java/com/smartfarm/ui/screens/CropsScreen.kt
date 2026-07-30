package com.smartfarm.ui.screens

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Add
import androidx.compose.material.icons.filled.Crop
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.smartfarm.ui.components.CurrentFarmBanner
import com.smartfarm.ui.components.EmptyState
import com.smartfarm.ui.components.ErrorState
import com.smartfarm.ui.components.LoadingState
import com.smartfarm.shared.data.farm.SelectedFarmStore
import com.smartfarm.shared.ui.viewmodel.CropViewModel
import com.smartfarm.shared.ui.viewmodel.FarmViewModel
import com.smartfarm.shared.data.model.dto.CropDto
import com.smartfarm.ui.theme.SmartFarmSpacing
import org.koin.compose.koinInject

@Composable
fun CropsScreen(
    viewModel: CropViewModel = koinInject(),
    farmViewModel: FarmViewModel = koinInject(),
    selectedFarmStore: SelectedFarmStore = koinInject()
) {
    val uiState by viewModel.uiState.collectAsState()
    val farmState by farmViewModel.uiState.collectAsState()
    val selectedFarm by selectedFarmStore.selectedFarm.collectAsState()

    LaunchedEffect(Unit) {
        viewModel.loadCrops()
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
                Icon(Icons.Default.Add, contentDescription = "Add Crop")
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
                uiState.error != null && uiState.crops.isEmpty() -> {
                    ErrorState(
                        message = uiState.error ?: "Unknown error",
                        onRetry = { viewModel.refresh() },
                        modifier = Modifier.weight(1f)
                    )
                }
                uiState.crops.isEmpty() -> {
                    EmptyState(
                        title = "No crops yet",
                        message = "Add a crop to start tracking planting and harvest on this farm.",
                        icon = Icons.Default.Crop,
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
                        items(uiState.crops, key = { it.id }) { crop ->
                            CropCard(crop = crop)
                        }
                    }
                }
            }
        }
    }

    if (showDialog) {
        com.smartfarm.ui.screens.forms.AddCropDialog(
            farms = farmState.farms,
            preferredFarmId = selectedFarm?.id,
            onDismiss = { showDialog = false },
            onSave = { crop ->
                viewModel.createCrop(crop)
                showDialog = false
            }
        )
    }
}

@Composable
private fun CropCard(crop: CropDto) {
    Card(
        modifier = Modifier.fillMaxWidth(),
        shape = MaterialTheme.shapes.medium,
        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
        elevation = CardDefaults.cardElevation(defaultElevation = 1.dp)
    ) {
        Column(modifier = Modifier.padding(SmartFarmSpacing.lg)) {
            Text(
                text = crop.name,
                style = MaterialTheme.typography.titleMedium
            )
            val variety = crop.variety
            if (!variety.isNullOrBlank()) {
                Text(
                    text = variety,
                    style = MaterialTheme.typography.bodyMedium,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )
            }
            val status = crop.status
            if (!status.isNullOrBlank()) {
                Spacer(Modifier.height(SmartFarmSpacing.xs))
                AssistChip(
                    onClick = {},
                    enabled = false,
                    label = { Text(status.replace('_', ' ')) }
                )
            }
        }
    }
}
