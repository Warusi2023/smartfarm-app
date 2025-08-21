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
fun LivestockScreen(
    dataService: DataService,
    onNavigateBack: () -> Unit
) {
    var livestock by remember { mutableStateOf<List<Livestock>>(emptyList()) }
    var farms by remember { mutableStateOf<List<Farm>>(emptyList()) }
    var isLoading by remember { mutableStateOf(true) }
    var error by remember { mutableStateOf<String?>(null) }
    var showAddLivestockDialog by remember { mutableStateOf(false) }
    var selectedLivestock by remember { mutableStateOf<Livestock?>(null) }
    var showLivestockDetailsDialog by remember { mutableStateOf(false) }
    var selectedFarmId by remember { mutableStateOf<Long?>(null) }
    
    val scope = rememberCoroutineScope()
    
    // Load data when component is created
    LaunchedEffect(Unit) {
        try {
            isLoading = true
            val loadedLivestock = dataService.getLivestock()
            val loadedFarms = dataService.getFarms()
            livestock = loadedLivestock
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
    
    // Filter livestock based on selected farm
    val filteredLivestock = if (selectedFarmId != null) {
        livestock.filter { it.farmId == selectedFarmId }
    } else {
        livestock
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
                text = "🐄 Livestock Management",
                fontSize = 24.sp,
                fontWeight = FontWeight.Bold,
                modifier = Modifier.weight(1f)
            )
            
            Button(
                onClick = { showAddLivestockDialog = true },
                colors = ButtonDefaults.buttonColors(
                    containerColor = MaterialTheme.colorScheme.primary
                )
            ) {
                Icon(Icons.Default.Add, contentDescription = "Add Livestock")
                Spacer(modifier = Modifier.width(4.dp))
                Text("Add Livestock")
            }
        }
        
        Spacer(modifier = Modifier.height(16.dp))
        
        // Farm Selector
        if (farms.isNotEmpty()) {
            Card(
                modifier = Modifier.fillMaxWidth(),
                colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.secondaryContainer)
            ) {
                Column(
                    modifier = Modifier.padding(16.dp)
                ) {
                    Text(
                        text = "Select Farm",
                        fontSize = 16.sp,
                        fontWeight = FontWeight.Medium
                    )
                    
                    Spacer(modifier = Modifier.height(8.dp))
                    
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
                }
            }
            
            Spacer(modifier = Modifier.height(16.dp))
        }
        
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
            // Livestock List
            LazyColumn(
                verticalArrangement = Arrangement.spacedBy(12.dp)
            ) {
                item {
                    Text(
                        text = "Livestock (${filteredLivestock.size})",
                        fontSize = 18.sp,
                        fontWeight = FontWeight.Bold
                    )
                }
                
                if (filteredLivestock.isEmpty()) {
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
                                    text = "No livestock found",
                                    fontSize = 18.sp,
                                    color = MaterialTheme.colorScheme.onSurfaceVariant
                                )
                                
                                Text(
                                    text = "Add your first livestock to get started",
                                    fontSize = 14.sp,
                                    color = MaterialTheme.colorScheme.onSurfaceVariant
                                )
                            }
                        }
                    }
                } else {
                    items(filteredLivestock) { livestock ->
                        LivestockCard(
                            livestock = livestock,
                            onClick = {
                                selectedLivestock = livestock
                                showLivestockDetailsDialog = true
                            }
                        )
                    }
                }
            }
        }
    }
    
    // Add Livestock Dialog
    if (showAddLivestockDialog) {
        AddLivestockDialog(
            farms = farms,
            onDismiss = { showAddLivestockDialog = false },
            onConfirm = { name, type, farmId ->
                scope.launch {
                    try {
                        val newLivestock = Livestock(
                            name = name,
                            type = type,
                            breed = "Unknown",
                            farmId = farmId,
                            birthDate = "2024-01-01",
                            weight = 0.0,
                            status = LivestockStatus.ACTIVE,
                            location = "Farm",
                            notes = ""
                        )
                        dataService.addLivestock(newLivestock)
                        val updatedLivestock = dataService.getLivestock()
                        livestock = updatedLivestock
                        showAddLivestockDialog = false
                    } catch (e: Exception) {
                        error = e.message
                    }
                }
            }
        )
    }
    
    // Livestock Details Dialog
    if (showLivestockDetailsDialog && selectedLivestock != null) {
        LivestockDetailsDialog(
            livestock = selectedLivestock!!,
            onDismiss = { 
                showLivestockDetailsDialog = false
                selectedLivestock = null
            },
            onDelete = {
                scope.launch {
                    try {
                        dataService.deleteLivestock(selectedLivestock!!.id)
                        val updatedLivestock = dataService.getLivestock()
                        livestock = updatedLivestock
                        showLivestockDetailsDialog = false
                        selectedLivestock = null
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
private fun LivestockCard(
    livestock: Livestock,
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
                    text = livestock.name,
                    fontSize = 16.sp,
                    fontWeight = FontWeight.Medium
                )
                
                Text(
                    text = "${livestock.type.name} • ${livestock.breed}",
                    fontSize = 14.sp,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )
                
                Text(
                    text = "Status: ${livestock.status.name}",
                    fontSize = 12.sp,
                    color = when (livestock.status) {
                        LivestockStatus.ACTIVE -> MaterialTheme.colorScheme.primary
                        LivestockStatus.UNDER_TREATMENT -> MaterialTheme.colorScheme.error
                        LivestockStatus.INACTIVE -> MaterialTheme.colorScheme.tertiary
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
private fun AddLivestockDialog(
    farms: List<Farm>,
    onDismiss: () -> Unit,
    onConfirm: (name: String, type: LivestockType, farmId: Long) -> Unit
) {
    var name by remember { mutableStateOf("") }
    var selectedType by remember { mutableStateOf(LivestockType.CATTLE) }
    var selectedFarmId by remember { mutableStateOf<Long?>(null) }
    
    if (farms.isNotEmpty() && selectedFarmId == null) {
        selectedFarmId = farms.first().id
    }
    
    AlertDialog(
        onDismissRequest = onDismiss,
        title = { Text("Add New Livestock") },
        text = {
            Column(
                verticalArrangement = Arrangement.spacedBy(16.dp)
            ) {
                OutlinedTextField(
                    value = name,
                    onValueChange = { name = it },
                    label = { Text("Name") },
                    modifier = Modifier.fillMaxWidth()
                )
                
                Text("Type", fontSize = 14.sp, fontWeight = FontWeight.Medium)
                LazyRow(
                    horizontalArrangement = Arrangement.spacedBy(8.dp)
                ) {
                    items(LivestockType.values()) { type ->
                        FilterChip(
                            selected = selectedType == type,
                            onClick = { selectedType = type },
                            label = { Text(type.name) }
                        )
                    }
                }
                
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
                    if (name.isNotBlank() && selectedFarmId != null) {
                        onConfirm(name, selectedType, selectedFarmId!!)
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
private fun LivestockDetailsDialog(
    livestock: Livestock,
    onDismiss: () -> Unit,
    onDelete: () -> Unit
) {
    AlertDialog(
        onDismissRequest = onDismiss,
        title = { Text(livestock.name) },
        text = {
            Column(
                verticalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                Text("Type: ${livestock.type.name}")
                Text("Breed: ${livestock.breed}")
                Text("Status: ${livestock.status.name}")
                Text("Farm ID: ${livestock.farmId}")
                Text("Weight: ${livestock.weight} kg")
                Text("Birth Date: ${livestock.birthDate}")
                if (livestock.notes.isNotBlank()) {
                    Text("Notes: ${livestock.notes}")
                }
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
