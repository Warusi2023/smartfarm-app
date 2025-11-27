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
import com.smartfarm.shared.ui.viewmodel.LivestockViewModel
import com.smartfarm.shared.data.model.dto.LivestockDto
import org.koin.compose.viewmodel.viewModel

@Composable
fun LivestockScreen(
    viewModel: LivestockViewModel = viewModel()
) {
    val uiState by viewModel.uiState.collectAsState()
    
    LaunchedEffect(Unit) {
        viewModel.loadLivestock()
    }
    
    Scaffold(
        topBar = {
            TopAppBar(title = { Text("Livestock") })
        },
        floatingActionButton = {
            var showDialog by remember { mutableStateOf(false) }
            FloatingActionButton(onClick = { showDialog = true }) {
                Icon(Icons.Default.Add, contentDescription = "Add Livestock")
            }
            
            if (showDialog) {
                com.smartfarm.ui.screens.forms.AddLivestockDialog(
                    farmId = "", // TODO: Get from selected farm
                    onDismiss = { showDialog = false },
                    onSave = { livestock ->
                        viewModel.createLivestock(livestock)
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
            uiState.error != null && uiState.livestock.isEmpty() -> {
                ErrorState(
                    message = uiState.error ?: "Unknown error",
                    onRetry = { viewModel.refresh() },
                    modifier = Modifier.padding(padding)
                )
            }
            uiState.livestock.isEmpty() -> {
                EmptyState(
                    title = "No Livestock",
                    message = "Tap + to add your first animal",
                    icon = Icons.Default.Pets,
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
                    items(uiState.livestock) { livestock ->
                        LivestockCard(livestock = livestock)
                    }
                }
            }
        }
    }
}

@Composable
private fun LivestockCard(livestock: LivestockDto) {
    Card(
        modifier = Modifier.fillMaxWidth(),
        elevation = CardDefaults.cardElevation(defaultElevation = 2.dp)
    ) {
        Column(
            modifier = Modifier.padding(16.dp)
        ) {
            Text(
                text = livestock.name,
                style = MaterialTheme.typography.titleMedium
            )
            if (livestock.breed != null) {
                Text(
                    text = livestock.breed,
                    style = MaterialTheme.typography.bodyMedium,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )
            }
            if (livestock.type != null) {
                Text(
                    text = "Type: ${livestock.type}",
                    style = MaterialTheme.typography.bodySmall,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )
            }
        }
    }
}

