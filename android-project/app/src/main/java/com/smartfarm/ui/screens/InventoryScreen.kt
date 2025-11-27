package com.smartfarm.ui.screens

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Add
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.smartfarm.ui.components.EmptyState
import com.smartfarm.ui.components.ErrorState
import com.smartfarm.ui.components.LoadingState
import com.smartfarm.shared.ui.viewmodel.InventoryViewModel
import com.smartfarm.shared.data.model.dto.InventoryItemDto
import org.koin.compose.viewmodel.viewModel

@Composable
fun InventoryScreen(
    viewModel: InventoryViewModel = viewModel()
) {
    val uiState by viewModel.uiState.collectAsState()
    
    LaunchedEffect(Unit) {
        viewModel.loadInventory()
    }
    
    Scaffold(
        topBar = {
            TopAppBar(title = { Text("Inventory") })
        },
        floatingActionButton = {
            var showDialog by remember { mutableStateOf(false) }
            FloatingActionButton(onClick = { showDialog = true }) {
                Icon(Icons.Default.Add, contentDescription = "Add Item")
            }
            
            if (showDialog) {
                com.smartfarm.ui.screens.forms.AddInventoryDialog(
                    farmId = "", // TODO: Get from selected farm
                    onDismiss = { showDialog = false },
                    onSave = { item ->
                        viewModel.createInventoryItem(item)
                        showDialog = false
                    }
                )
            }
        }
    ) { padding ->
        when {
            uiState.isLoading -> {
                LoadingState(Modifier.padding(padding))
            }
            uiState.error != null && uiState.items.isEmpty() -> {
                ErrorState(
                    message = uiState.error ?: "Unknown error",
                    onRetry = { viewModel.refresh() },
                    modifier = Modifier.padding(padding)
                )
            }
            uiState.items.isEmpty() -> {
                EmptyState(
                    title = "No Inventory Items",
                    message = "Tap + to add your first inventory item",
                    icon = Icons.Default.Inventory,
                    modifier = Modifier.padding(padding)
                )
            }
            else -> {
                LazyColumn(
                    modifier = Modifier
                        .fillMaxSize()
                        .padding(padding)
                        .padding(16.dp),
                    verticalArrangement = Arrangement.spacedBy(8.dp)
                ) {
                    items(uiState.items) { item ->
                        InventoryCard(item = item)
                    }
                }
            }
        }
    }
}

@Composable
private fun InventoryCard(item: InventoryItemDto) {
    Card(
        modifier = Modifier.fillMaxWidth(),
        elevation = CardDefaults.cardElevation(defaultElevation = 2.dp)
    ) {
        Column(
            modifier = Modifier.padding(16.dp)
        ) {
            Text(
                text = item.name,
                style = MaterialTheme.typography.titleMedium
            )
            Text(
                text = "${item.quantity} ${item.unit}",
                style = MaterialTheme.typography.bodyMedium,
                color = MaterialTheme.colorScheme.onSurfaceVariant
            )
            if (item.category != null) {
                Text(
                    text = "Category: ${item.category}",
                    style = MaterialTheme.typography.bodySmall,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )
            }
        }
    }
}

