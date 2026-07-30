package com.smartfarm.ui.screens

import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Add
import androidx.compose.material.icons.filled.Agriculture
import androidx.compose.material.icons.filled.Check
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.smartfarm.shared.data.farm.SelectedFarmStore
import com.smartfarm.shared.data.model.dto.FarmDto
import com.smartfarm.shared.ui.viewmodel.FarmViewModel
import com.smartfarm.ui.components.CurrentFarmBanner
import com.smartfarm.ui.components.EmptyState
import com.smartfarm.ui.components.ErrorState
import com.smartfarm.ui.components.LoadingState
import com.smartfarm.ui.screens.forms.AddFarmDialog
import com.smartfarm.ui.theme.SmartFarmSpacing
import org.koin.compose.koinInject

@Composable
fun FarmsScreen(
    viewModel: FarmViewModel = koinInject(),
    selectedFarmStore: SelectedFarmStore = koinInject()
) {
    val uiState by viewModel.uiState.collectAsState()
    val selectedFarm by selectedFarmStore.selectedFarm.collectAsState()
    var showDialog by remember { mutableStateOf(false) }
    val snackbarHostState = remember { SnackbarHostState() }

    LaunchedEffect(Unit) {
        viewModel.loadFarms()
    }

    LaunchedEffect(uiState.farms) {
        selectedFarmStore.syncWithAvailableFarms(
            uiState.farms.map { it.id to it.name }
        )
    }

    // Surface create/list errors without dumping the whole list when farms already exist.
    LaunchedEffect(uiState.error, uiState.farms) {
        val message = uiState.error
        if (!message.isNullOrBlank() && uiState.farms.isNotEmpty()) {
            snackbarHostState.showSnackbar(
                message = friendlyFarmError(message),
                withDismissAction = true
            )
            viewModel.clearError()
        }
    }

    Scaffold(
        containerColor = MaterialTheme.colorScheme.background,
        snackbarHost = { SnackbarHost(snackbarHostState) },
        floatingActionButton = {
            FloatingActionButton(
                onClick = { showDialog = true },
                containerColor = MaterialTheme.colorScheme.primary,
                contentColor = MaterialTheme.colorScheme.onPrimary
            ) {
                Icon(Icons.Default.Add, contentDescription = "Add Farm")
            }
        }
    ) { padding ->
        when {
            uiState.isLoading && uiState.farms.isEmpty() -> {
                LoadingState(Modifier.padding(padding))
            }
            uiState.error != null && uiState.farms.isEmpty() -> {
                ErrorState(
                    message = friendlyFarmError(uiState.error ?: "Unknown error"),
                    onRetry = { viewModel.refresh() },
                    modifier = Modifier.padding(padding)
                )
            }
            uiState.farms.isEmpty() -> {
                EmptyState(
                    title = "No farms yet",
                    message = "Create a farm to manage crops, livestock, and farm-team tasks in one place.",
                    icon = Icons.Default.Agriculture,
                    modifier = Modifier.padding(padding)
                )
            }
            else -> {
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
                    LazyColumn(
                        modifier = Modifier
                            .fillMaxSize()
                            .padding(horizontal = SmartFarmSpacing.lg)
                            .padding(bottom = SmartFarmSpacing.lg),
                        verticalArrangement = Arrangement.spacedBy(SmartFarmSpacing.sm)
                    ) {
                        items(uiState.farms, key = { it.id }) { farm ->
                            FarmCard(
                                farm = farm,
                                isCurrent = farm.id == selectedFarm?.id,
                                onSelectAsCurrent = {
                                    selectedFarmStore.select(farm.id, farm.name)
                                }
                            )
                        }
                    }
                }
            }
        }
    }

    if (showDialog) {
        AddFarmDialog(
            onDismiss = { showDialog = false },
            onSave = { farm ->
                viewModel.createFarm(farm)
                showDialog = false
            }
        )
    }
}

@Composable
private fun FarmCard(
    farm: FarmDto,
    isCurrent: Boolean,
    onSelectAsCurrent: () -> Unit
) {
    Card(
        modifier = Modifier.fillMaxWidth(),
        shape = MaterialTheme.shapes.medium,
        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
        elevation = CardDefaults.cardElevation(defaultElevation = if (isCurrent) 2.dp else 1.dp),
        border = if (isCurrent) {
            BorderStroke(1.5.dp, MaterialTheme.colorScheme.primary)
        } else {
            null
        }
    ) {
        Column(modifier = Modifier.padding(SmartFarmSpacing.lg)) {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.Top
            ) {
                Text(
                    text = farm.name,
                    style = MaterialTheme.typography.titleMedium,
                    modifier = Modifier.weight(1f)
                )
                Row(horizontalArrangement = Arrangement.spacedBy(SmartFarmSpacing.xs)) {
                    if (isCurrent) {
                        AssistChip(
                            onClick = {},
                            enabled = false,
                            leadingIcon = {
                                Icon(
                                    Icons.Default.Check,
                                    contentDescription = null,
                                    modifier = Modifier.size(16.dp)
                                )
                            },
                            label = { Text("Current") }
                        )
                    }
                    if (!farm.isActive) {
                        AssistChip(
                            onClick = {},
                            enabled = false,
                            label = { Text("Inactive") }
                        )
                    }
                }
            }

            val location = farm.location
            if (!location.isNullOrBlank()) {
                Spacer(Modifier.height(SmartFarmSpacing.xs))
                Text(
                    text = location,
                    style = MaterialTheme.typography.bodyMedium,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )
            }

            Spacer(Modifier.height(SmartFarmSpacing.sm))
            Row(
                horizontalArrangement = Arrangement.spacedBy(SmartFarmSpacing.sm),
                verticalAlignment = Alignment.CenterVertically
            ) {
                farm.farmType?.takeIf { it.isNotBlank() }?.let { type ->
                    AssistChip(
                        onClick = {},
                        enabled = false,
                        label = { Text(formatFarmType(type)) }
                    )
                }
                farm.areaHectares?.let { area ->
                    Text(
                        text = formatArea(area),
                        style = MaterialTheme.typography.labelLarge,
                        color = MaterialTheme.colorScheme.primary
                    )
                }
            }

            if (!isCurrent) {
                Spacer(Modifier.height(SmartFarmSpacing.md))
                TextButton(
                    onClick = onSelectAsCurrent,
                    modifier = Modifier.align(Alignment.End)
                ) {
                    Text("Use as current farm")
                }
            }
        }
    }
}

private fun formatFarmType(type: String): String =
    type.replace('_', ' ')
        .lowercase()
        .replaceFirstChar { it.uppercase() }

private fun formatArea(hectares: Double): String {
    val formatted = if (hectares % 1.0 == 0.0) {
        hectares.toInt().toString()
    } else {
        String.format("%.1f", hectares)
    }
    return "$formatted ha"
}

private fun friendlyFarmError(raw: String): String {
    val lower = raw.lowercase()
    return when {
        "subscription" in lower || "pro" in lower ->
            "An active Pro subscription is required to create a farm."
        "farm limit" in lower || "maxfarms" in lower || "limit" in lower && "farm" in lower ->
            "You've reached your farm limit for this plan."
        "areahectares" in lower || "area" in lower && "positive" in lower ->
            "Area must be greater than zero (hectares)."
        else -> raw.lineSequence().firstOrNull()?.take(180) ?: "Couldn't complete that farm action."
    }
}
