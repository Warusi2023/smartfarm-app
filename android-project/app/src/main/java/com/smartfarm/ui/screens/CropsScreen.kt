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
import com.smartfarm.shared.ui.viewmodel.CropViewModel
import com.smartfarm.shared.data.model.dto.CropDto
import org.koin.compose.viewmodel.viewModel

@Composable
fun CropsScreen(
    viewModel: CropViewModel = viewModel()
) {
    val uiState by viewModel.uiState.collectAsState()
    
    LaunchedEffect(Unit) {
        viewModel.loadCrops()
    }
    
    Scaffold(
        topBar = {
            TopAppBar(title = { Text("Crops") })
        },
        floatingActionButton = {
            var showDialog by remember { mutableStateOf(false) }
            FloatingActionButton(onClick = { showDialog = true }) {
                Icon(Icons.Default.Add, contentDescription = "Add Crop")
            }
            
            if (showDialog) {
                com.smartfarm.ui.screens.forms.AddCropDialog(
                    farmId = "", // TODO: Get from selected farm
                    onDismiss = { showDialog = false },
                    onSave = { crop ->
                        viewModel.createCrop(crop)
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
            uiState.error != null && uiState.crops.isEmpty() -> {
                ErrorState(
                    message = uiState.error ?: "Unknown error",
                    onRetry = { viewModel.refresh() },
                    modifier = Modifier.padding(padding)
                )
            }
            uiState.crops.isEmpty() -> {
                EmptyState(
                    title = "No Crops",
                    message = "Tap + to add your first crop",
                    icon = Icons.Default.Crop,
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
                    items(uiState.crops) { crop ->
                        CropCard(crop = crop)
                    }
                }
            }
        }
    }
}

@Composable
private fun CropCard(crop: CropDto) {
    Card(
        modifier = Modifier.fillMaxWidth(),
        elevation = CardDefaults.cardElevation(defaultElevation = 2.dp)
    ) {
        Column(
            modifier = Modifier.padding(16.dp)
        ) {
            Text(
                text = crop.name,
                style = MaterialTheme.typography.titleMedium
            )
            if (crop.variety != null) {
                Text(
                    text = crop.variety,
                    style = MaterialTheme.typography.bodyMedium,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )
            }
            if (crop.status != null) {
                Text(
                    text = "Status: ${crop.status}",
                    style = MaterialTheme.typography.bodySmall,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )
            }
        }
    }
}

