package com.yourcompany.smartfarm.shared.ui.screens

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ArrowBack
import androidx.compose.material.icons.filled.Add
import androidx.compose.material.icons.filled.Star
import androidx.compose.material.icons.filled.Home
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.yourcompany.smartfarm.shared.models.*
import com.yourcompany.smartfarm.shared.services.DataService
import kotlinx.coroutines.launch

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun CropsScreen(
    dataService: DataService,
    onNavigateBack: () -> Unit
) {
    var crops by remember { mutableStateOf<List<Crop>>(emptyList()) }
    var farms by remember { mutableStateOf<List<Farm>>(emptyList()) }
    var isLoading by remember { mutableStateOf(true) }
    var error by remember { mutableStateOf<String?>(null) }
    var showAddCropDialog by remember { mutableStateOf(false) }
    var selectedCrop by remember { mutableStateOf<Crop?>(null) }
    var showCropDetailsDialog by remember { mutableStateOf(false) }
    var selectedFarmId by remember { mutableStateOf<Long?>(null) }
    var selectedStatus by remember { mutableStateOf<CropStatus?>(null) }
    
    val scope = rememberCoroutineScope()
    
    // Load data when component is created
    LaunchedEffect(Unit) {
        try {
            isLoading = true
            val loadedCrops = dataService.getCrops()
            val loadedFarms = dataService.getFarms()
            crops = loadedCrops
            farms = loadedFarms
            if (loadedFarms.isNotEmpty()) {
                selectedFarmId = loadedFarms.first().id
            }
        } catch (e: Exception) {
            error = e.message
        } finally {
            isLoading = false
        }
    }
    
    // Filter crops based on selected farm and status
    val filteredCrops = crops.filter { crop ->
        (selectedFarmId == null || crop.farmId == selectedFarmId) &&
        (selectedStatus == null || crop.status == selectedStatus)
    }
    
    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp)
    ) {
        // Header
        Row(
            modifier = Modifier.fillMaxWidth(),
            verticalAlignment = Alignment.CenterVertically
        ) {
            IconButton(onClick = onNavigateBack) {
                Icon(Icons.Default.ArrowBack, contentDescription = "Back")
            }
            
            Text(
                text = "🌱 Crop Management",
                fontSize = 24.sp,
                fontWeight = FontWeight.Bold,
                modifier = Modifier.weight(1f)
            )
            
            Button(
                onClick = { showAddCropDialog = true },
                colors = ButtonDefaults.buttonColors(
                    containerColor = MaterialTheme.colorScheme.primary
                )
            ) {
                Icon(Icons.Default.Add, contentDescription = "Add Crop")
                Spacer(modifier = Modifier.width(4.dp))
                Text("Add Crop")
            }
        }
        
        Spacer(modifier = Modifier.height(16.dp))
        
        // Filters
        Card(
            modifier = Modifier.fillMaxWidth(),
            colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.secondaryContainer)
        ) {
            Column(
                modifier = Modifier.padding(16.dp)
            ) {
                Text(
                    text = "Filters",
                    fontSize = 16.sp,
                    fontWeight = FontWeight.Medium
                )
                
                Spacer(modifier = Modifier.height(12.dp))
                
                // Farm Filter
                if (farms.isNotEmpty()) {
                    Text("Farm", fontSize = 14.sp, fontWeight = FontWeight.Medium)
                    LazyRow(
                        horizontalArrangement = Arrangement.spacedBy(8.dp)
                    ) {
                        item {
                            FilterChip(
                                selected = selectedFarmId == null,
                                onClick = { selectedFarmId = null },
                                label = { Text("All Farms") }
                            )
                        }
                        
                        items(farms) { farm ->
                            FilterChip(
                                selected = selectedFarmId == farm.id,
                                onClick = { selectedFarmId = farm.id },
                                label = { Text(farm.name) }
                            )
                        }
                    }
                    
                    Spacer(modifier = Modifier.height(12.dp))
                }
                
                // Status Filter
                Text("Status", fontSize = 14.sp, fontWeight = FontWeight.Medium)
                LazyRow(
                    horizontalArrangement = Arrangement.spacedBy(8.dp)
                ) {
                    item {
                        FilterChip(
                            selected = selectedStatus == null,
                            onClick = { selectedStatus = null },
                            label = { Text("All Statuses") }
                        )
                    }
                    
                    items(CropStatus.values()) { status ->
                        FilterChip(
                            selected = selectedStatus == status,
                            onClick = { selectedStatus = status },
                            label = { Text(status.name) }
                        )
                    }
                }
            }
        }
        
        Spacer(modifier = Modifier.height(16.dp))
        
        if (isLoading) {
            Box(
                modifier = Modifier.fillMaxSize(),
                contentAlignment = Alignment.Center
            ) {
                CircularProgressIndicator()
            }
        } else if (error != null) {
            Card(
                modifier = Modifier.fillMaxWidth(),
                colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.errorContainer)
            ) {
                Text(
                    text = "Error: $error",
                    modifier = Modifier.padding(16.dp),
                    color = MaterialTheme.colorScheme.onErrorContainer
                )
            }
        } else {
            // Crops List
            LazyColumn(
                verticalArrangement = Arrangement.spacedBy(12.dp)
            ) {
                item {
                    Text(
                        text = "Crops (${filteredCrops.size})",
                        fontSize = 18.sp,
                        fontWeight = FontWeight.Bold
                    )
                }
                
                if (filteredCrops.isEmpty()) {
                    item {
                        Card(
                            modifier = Modifier.fillMaxWidth(),
                            colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant)
                        ) {
                            Column(
                                modifier = Modifier.padding(32.dp),
                                horizontalAlignment = Alignment.CenterHorizontally
                            ) {
                                Icon(
                                    Icons.Default.Home,
                                    contentDescription = null,
                                    modifier = Modifier.size(64.dp),
                                    tint = MaterialTheme.colorScheme.onSurfaceVariant
                                )
                                
                                Spacer(modifier = Modifier.height(16.dp))
                                
                                Text(
                                    text = "No crops found",
                                    fontSize = 18.sp,
                                    color = MaterialTheme.colorScheme.onSurfaceVariant
                                )
                                
                                Text(
                                    text = "Add your first crop to get started",
                                    fontSize = 14.sp,
                                    color = MaterialTheme.colorScheme.onSurfaceVariant
                                )
                            }
                        }
                    }
                } else {
                    items(filteredCrops) { crop ->
                        CropCard(
                            crop = crop,
                            onClick = {
                                selectedCrop = crop
                                showCropDetailsDialog = true
                            }
                        )
                    }
                }
            }
        }
    }
    
    // Add Crop Dialog
    if (showAddCropDialog) {
        AddCropDialog(
            farms = farms,
            onDismiss = { showAddCropDialog = false },
            onConfirm = { name, variety, farmId, area, plantedDate, expectedHarvestDate ->
                scope.launch {
                    try {
                        val newCrop = Crop(
                            name = name,
                            variety = variety,
                            farmId = farmId,
                            plantedDate = plantedDate,
                            expectedHarvestDate = expectedHarvestDate,
                            area = area,
                            status = CropStatus.GROWING
                        )
                        dataService.addCrop(newCrop)
                        val updatedCrops = dataService.getCrops()
                        crops = updatedCrops
                        showAddCropDialog = false
                    } catch (e: Exception) {
                        error = e.message
                    }
                }
            }
        )
    }
    
    // Crop Details Dialog
    if (showCropDetailsDialog && selectedCrop != null) {
        CropDetailsDialog(
            crop = selectedCrop!!,
            onDismiss = { 
                showCropDetailsDialog = false
                selectedCrop = null
            },
            onDelete = {
                scope.launch {
                    try {
                        dataService.deleteCrop(selectedCrop!!.id)
                        val updatedCrops = dataService.getCrops()
                        crops = updatedCrops
                        showCropDetailsDialog = false
                        selectedCrop = null
                    } catch (e: Exception) {
                        error = e.message
                    }
                }
            }
        )
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
private fun CropCard(
    crop: Crop,
    onClick: () -> Unit
) {
    Card(
        modifier = Modifier.fillMaxWidth(),
        onClick = onClick
    ) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(16.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Icon(
                Icons.Default.Home,
                contentDescription = null,
                modifier = Modifier.size(40.dp),
                tint = MaterialTheme.colorScheme.primary
            )
            
            Spacer(modifier = Modifier.width(16.dp))
            
            Column(
                modifier = Modifier.weight(1f)
            ) {
                Text(
                    text = crop.name,
                    fontSize = 16.sp,
                    fontWeight = FontWeight.Medium
                )
                
                Text(
                    text = "${crop.variety} • ${crop.area} acres",
                    fontSize = 14.sp,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )
                
                Text(
                    text = "Planted: ${crop.plantedDate} • Harvest: ${crop.expectedHarvestDate}",
                    fontSize = 12.sp,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )
                
                Text(
                    text = "Status: ${crop.status.name}",
                    fontSize = 12.sp,
                    color = when (crop.status) {
                        CropStatus.GROWING -> MaterialTheme.colorScheme.primary
                        CropStatus.READY_FOR_HARVEST -> MaterialTheme.colorScheme.tertiary
                        CropStatus.HARVESTED -> MaterialTheme.colorScheme.secondary
                        else -> MaterialTheme.colorScheme.onSurfaceVariant
                    }
                )
            }
            
            Icon(
                Icons.Default.Star,
                contentDescription = null,
                modifier = Modifier.size(20.dp),
                tint = MaterialTheme.colorScheme.primary
            )
        }
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
private fun AddCropDialog(
    farms: List<Farm>,
    onDismiss: () -> Unit,
    onConfirm: (name: String, variety: String, farmId: Long, area: Double, plantedDate: String, expectedHarvestDate: String) -> Unit
) {
    var name by remember { mutableStateOf("") }
    var variety by remember { mutableStateOf("") }
    var selectedFarmId by remember { mutableStateOf<Long?>(null) }
    var area by remember { mutableStateOf("") }
    var plantedDate by remember { mutableStateOf("") }
    var expectedHarvestDate by remember { mutableStateOf("") }
    
    if (farms.isNotEmpty() && selectedFarmId == null) {
        selectedFarmId = farms.first().id
    }
    
    AlertDialog(
        onDismissRequest = onDismiss,
        title = { Text("Add New Crop") },
        text = {
            Column(
                verticalArrangement = Arrangement.spacedBy(16.dp)
            ) {
                OutlinedTextField(
                    value = name,
                    onValueChange = { name = it },
                    label = { Text("Crop Name") },
                    modifier = Modifier.fillMaxWidth()
                )
                
                OutlinedTextField(
                    value = variety,
                    onValueChange = { variety = it },
                    label = { Text("Variety") },
                    modifier = Modifier.fillMaxWidth()
                )
                
                OutlinedTextField(
                    value = area,
                    onValueChange = { area = it },
                    label = { Text("Area (acres)") },
                    modifier = Modifier.fillMaxWidth()
                )
                
                OutlinedTextField(
                    value = plantedDate,
                    onValueChange = { plantedDate = it },
                    label = { Text("Planted Date (YYYY-MM-DD)") },
                    modifier = Modifier.fillMaxWidth()
                )
                
                OutlinedTextField(
                    value = expectedHarvestDate,
                    onValueChange = { expectedHarvestDate = it },
                    label = { Text("Expected Harvest Date (YYYY-MM-DD)") },
                    modifier = Modifier.fillMaxWidth()
                )
                
                if (farms.isNotEmpty()) {
                    Text("Farm", fontSize = 14.sp, fontWeight = FontWeight.Medium)
                    LazyRow(
                        horizontalArrangement = Arrangement.spacedBy(8.dp)
                    ) {
                        items(farms) { farm ->
                            FilterChip(
                                selected = selectedFarmId == farm.id,
                                onClick = { selectedFarmId = farm.id },
                                label = { Text(farm.name) }
                            )
                        }
                    }
                }
            }
        },
        confirmButton = {
            TextButton(
                onClick = {
                    val areaValue = area.toDoubleOrNull() ?: 0.0
                    if (name.isNotBlank() && variety.isNotBlank() && selectedFarmId != null && 
                        plantedDate.isNotBlank() && expectedHarvestDate.isNotBlank()) {
                        onConfirm(name, variety, selectedFarmId!!, areaValue, plantedDate, expectedHarvestDate)
                    }
                }
            ) {
                Text("Add")
            }
        },
        dismissButton = {
            TextButton(onClick = onDismiss) {
                Text("Cancel")
            }
        }
    )
}

@Composable
private fun CropDetailsDialog(
    crop: Crop,
    onDismiss: () -> Unit,
    onDelete: () -> Unit
) {
    AlertDialog(
        onDismissRequest = onDismiss,
        title = { Text(crop.name) },
        text = {
            Column(
                verticalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                Text("Variety: ${crop.variety}")
                Text("Area: ${crop.area} acres")
                Text("Status: ${crop.status.name}")
                Text("Planted: ${crop.plantedDate}")
                Text("Expected Harvest: ${crop.expectedHarvestDate}")
                Text("Farm ID: ${crop.farmId}")
            }
        },
        confirmButton = {
            TextButton(onClick = onDismiss) {
                Text("Close")
            }
        },
        dismissButton = {
            TextButton(
                onClick = onDelete,
                colors = ButtonDefaults.textButtonColors(
                    contentColor = MaterialTheme.colorScheme.error
                )
            ) {
                Text("Delete")
            }
        }
    )
}
