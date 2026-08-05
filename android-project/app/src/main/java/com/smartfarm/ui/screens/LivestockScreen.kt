package com.smartfarm.ui.screens

import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Add
import androidx.compose.material.icons.filled.Edit
import androidx.compose.material.icons.filled.Pets
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.FloatingActionButton
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.ImageBitmap
import androidx.compose.ui.layout.ContentScale
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
import com.smartfarm.ui.util.LivestockPhotoCodec
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
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

    var showAddDialog by remember { mutableStateOf(false) }
    var editingLivestock by remember { mutableStateOf<LivestockDto?>(null) }

    Scaffold(
        containerColor = MaterialTheme.colorScheme.background,
        floatingActionButton = {
            FloatingActionButton(
                onClick = { showAddDialog = true },
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
                    LoadingState(modifier = Modifier.weight(1f))
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
                            LivestockCard(
                                livestock = livestock,
                                onEdit = { editingLivestock = livestock }
                            )
                        }
                    }
                }
            }
        }
    }

    if (showAddDialog) {
        AddLivestockDialog(
            farms = farmState.farms,
            preferredFarmId = selectedFarm?.id,
            onDismiss = { showAddDialog = false },
            onSave = { livestock ->
                viewModel.createLivestock(livestock)
                showAddDialog = false
            }
        )
    }

    editingLivestock?.let { animal ->
        AddLivestockDialog(
            farms = farmState.farms,
            preferredFarmId = selectedFarm?.id,
            initialLivestock = animal,
            onDismiss = { editingLivestock = null },
            onSave = { livestock ->
                viewModel.updateLivestock(livestock)
                editingLivestock = null
            }
        )
    }
}

@Composable
private fun LivestockCard(
    livestock: LivestockDto,
    onEdit: () -> Unit
) {
    val photoSource = remember(livestock.photo, livestock.photoUrl) {
        LivestockPhotoCodec.resolvePhoto(livestock.photo, livestock.photoUrl)
    }
    var photoBitmap by remember(photoSource) { mutableStateOf<ImageBitmap?>(null) }

    LaunchedEffect(photoSource) {
        photoBitmap = if (photoSource.isNullOrBlank()) {
            null
        } else {
            withContext(Dispatchers.IO) {
                LivestockPhotoCodec.toImageBitmap(photoSource)
            }
        }
    }

    Card(
        modifier = Modifier
            .fillMaxWidth()
            .clickable(onClick = onEdit),
        shape = MaterialTheme.shapes.medium,
        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
        elevation = CardDefaults.cardElevation(defaultElevation = 1.dp)
    ) {
        Row(
            modifier = Modifier.padding(SmartFarmSpacing.lg),
            verticalAlignment = Alignment.CenterVertically
        ) {
            val bitmap = photoBitmap
            if (bitmap != null) {
                Image(
                    bitmap = bitmap,
                    contentDescription = "Photo of ${livestock.name}",
                    contentScale = ContentScale.Crop,
                    modifier = Modifier
                        .size(72.dp)
                        .clip(RoundedCornerShape(10.dp))
                )
                Spacer(Modifier.width(SmartFarmSpacing.md))
            } else if (!photoSource.isNullOrBlank()) {
                // Photo exists but failed to decode — show neutral placeholder, not a crash.
                Box(
                    modifier = Modifier
                        .size(72.dp)
                        .clip(RoundedCornerShape(10.dp))
                        .background(MaterialTheme.colorScheme.surfaceVariant),
                    contentAlignment = Alignment.Center
                ) {
                    Icon(
                        imageVector = Icons.Default.Pets,
                        contentDescription = null,
                        tint = MaterialTheme.colorScheme.onSurfaceVariant
                    )
                }
                Spacer(Modifier.width(SmartFarmSpacing.md))
            }

            Column(modifier = Modifier.weight(1f)) {
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

            IconButton(onClick = onEdit) {
                Icon(
                    imageVector = Icons.Default.Edit,
                    contentDescription = "Edit ${livestock.name}"
                )
            }
        }
    }
}
