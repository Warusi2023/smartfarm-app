package com.yourcompany.smartfarm.shared.ui.screens

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ArrowBack
import androidx.compose.material.icons.filled.Add
import androidx.compose.material.icons.filled.Star
import androidx.compose.material.icons.filled.Home
import androidx.compose.material.icons.rounded.*
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
fun FarmsScreen(
    dataService: DataService,
    onNavigateBack: () -> Unit
) {
    var farms by remember { mutableStateOf<List<Farm>>(emptyList()) }
    var isLoading by remember { mutableStateOf(true) }
    var error by remember { mutableStateOf<String?>(null) }
    var showAddFarmDialog by remember { mutableStateOf(false) }
    var selectedFarm by remember { mutableStateOf<Farm?>(null) }
    var showFarmDetailsDialog by remember { mutableStateOf(false) }
    
    val scope = rememberCoroutineScope()
    
    // Load farms when component is created
    LaunchedEffect(Unit) {
        try {
            isLoading = true
            val loadedFarms = dataService.getFarms()
            farms = loadedFarms
        } catch (e: Exception) {
            error = e.message
        } finally {
            isLoading = false
        }
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
                text = "🏡 Farm Management",
                fontSize = 24.sp,
                fontWeight = FontWeight.Bold,
                modifier = Modifier.weight(1f)
            )
            
            Button(
                onClick = { showAddFarmDialog = true },
                colors = ButtonDefaults.buttonColors(
                    containerColor = MaterialTheme.colorScheme.primary
                )
            ) {
                Icon(Icons.Default.Add, contentDescription = "Add Farm")
                Spacer(modifier = Modifier.width(4.dp))
                Text("Add Farm")
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
            if (farms.isEmpty()) {
                EmptyState(
                    message = "No farms found",
                    actionText = "Add your first farm",
                    onAction = { showAddFarmDialog = true }
                )
            } else {
                LazyColumn(
                    verticalArrangement = Arrangement.spacedBy(12.dp)
                ) {
                    items(farms) { farm ->
                        FarmCard(
                            farm = farm,
                            onClick = {
                                selectedFarm = farm
                                showFarmDetailsDialog = true
                            }
                        )
                    }
                }
            }
        }
    }
    
    // Add Farm Dialog
    if (showAddFarmDialog) {
        AddFarmDialog(
            onDismiss = { showAddFarmDialog = false },
            onFarmAdded = { newFarm ->
                scope.launch {
                    try {
                        val addedFarm = dataService.createFarm(newFarm)
                        farms = farms + addedFarm
                        showAddFarmDialog = false
                    } catch (e: Exception) {
                        error = e.message
                    }
                }
            }
        )
    }
    
    // Farm Details Dialog
    if (showFarmDetailsDialog && selectedFarm != null) {
        FarmDetailsDialog(
            farm = selectedFarm!!,
            onDismiss = { showFarmDetailsDialog = false },
            onEdit = { /* TODO: Implement edit functionality */ }
        )
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
private fun FarmCard(
    farm: Farm,
    onClick: () -> Unit
) {
    Card(
        modifier = Modifier.fillMaxWidth(),
        elevation = CardDefaults.cardElevation(defaultElevation = 2.dp),
        onClick = onClick
    ) {
        Column(
            modifier = Modifier.padding(16.dp)
        ) {
            Row(
                modifier = Modifier.fillMaxWidth(),
                verticalAlignment = Alignment.CenterVertically
            ) {
                Icon(
                    imageVector = when (farm.type) {
                        FarmType.CROP -> Icons.Default.Star
                        FarmType.LIVESTOCK -> Icons.Default.Star
                        FarmType.MIXED -> Icons.Default.Star
                        FarmType.DAIRY -> Icons.Default.Star
                        FarmType.POULTRY -> Icons.Default.Star
                        FarmType.AQUACULTURE -> Icons.Default.Star
                    },
                    contentDescription = "Farm Type",
                    tint = MaterialTheme.colorScheme.primary
                )
                
                Spacer(modifier = Modifier.width(12.dp))
                
                Column(modifier = Modifier.weight(1f)) {
                    Text(
                        text = farm.name,
                        fontSize = 18.sp,
                        fontWeight = FontWeight.Bold
                    )
                    Text(
                        text = farm.location.address,
                        fontSize = 14.sp,
                        color = MaterialTheme.colorScheme.onSurfaceVariant
                    )
                }
                
                SuggestionChip(
                    onClick = { },
                    label = { Text(farm.type.name) },
                    colors = SuggestionChipDefaults.suggestionChipColors(
                        containerColor = MaterialTheme.colorScheme.secondaryContainer
                    )
                )
            }
            
            Spacer(modifier = Modifier.height(8.dp))
            
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween
            ) {
                Text(
                    text = "Size: ${farm.size} acres",
                    fontSize = 14.sp,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )
                
                Text(
                    text = "Status: ${farm.status.name}",
                    fontSize = 14.sp,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )
            }
        }
    }
}

@Composable
private fun EmptyState(
    message: String,
    actionText: String,
    onAction: () -> Unit
) {
    Column(
        modifier = Modifier.fillMaxSize(),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center
    ) {
        Icon(
            imageVector = Icons.Default.Home,
            contentDescription = null,
            modifier = Modifier.size(64.dp),
            tint = MaterialTheme.colorScheme.onSurfaceVariant
        )
        
        Spacer(modifier = Modifier.height(16.dp))
        
        Text(
            text = message,
            fontSize = 18.sp,
            color = MaterialTheme.colorScheme.onSurfaceVariant
        )
        
        Spacer(modifier = Modifier.height(16.dp))
        
        Button(onClick = onAction) {
            Text(actionText)
        }
    }
}

@Composable
private fun AddFarmDialog(
    onDismiss: () -> Unit,
    onFarmAdded: (Farm) -> Unit
) {
    var name by remember { mutableStateOf("") }
    var address by remember { mutableStateOf("") }
    var latitude by remember { mutableStateOf("") }
    var longitude by remember { mutableStateOf("") }
    var size by remember { mutableStateOf("") }
    var type by remember { mutableStateOf(FarmType.MIXED) }
    var isFormValid by remember { mutableStateOf(false) }
    
    // Validate form
    LaunchedEffect(name, address, size) {
        isFormValid = name.isNotBlank() && address.isNotBlank() && size.isNotBlank()
    }
    
    AlertDialog(
        onDismissRequest = onDismiss,
        title = { Text("Add New Farm") },
        text = {
            Column(
                verticalArrangement = Arrangement.spacedBy(16.dp)
            ) {
                OutlinedTextField(
                    value = name,
                    onValueChange = { name = it },
                    label = { Text("Farm Name") },
                    modifier = Modifier.fillMaxWidth()
                )
                
                OutlinedTextField(
                    value = address,
                    onValueChange = { address = it },
                    label = { Text("Address") },
                    modifier = Modifier.fillMaxWidth()
                )
                
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.spacedBy(8.dp)
                ) {
                    OutlinedTextField(
                        value = latitude,
                        onValueChange = { latitude = it },
                        label = { Text("Latitude") },
                        modifier = Modifier.weight(1f)
                    )
                    
                    OutlinedTextField(
                        value = longitude,
                        onValueChange = { longitude = it },
                        label = { Text("Longitude") },
                        modifier = Modifier.weight(1f)
                    )
                }
                
                OutlinedTextField(
                    value = size,
                    onValueChange = { size = it },
                    label = { Text("Size (acres)") },
                    modifier = Modifier.fillMaxWidth()
                )
                
                // Farm Type Selection
                Text("Farm Type:", fontWeight = FontWeight.Medium)
                FarmType.values().forEach { farmType ->
                    Row(
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        RadioButton(
                            selected = type == farmType,
                            onClick = { type = farmType }
                        )
                        Text(farmType.name)
                    }
                }
            }
        },
        confirmButton = {
            Button(
                onClick = {
                    val farm = Farm(
                        name = name,
                        location = Location(
                            latitude = latitude.toDoubleOrNull() ?: 0.0,
                            longitude = longitude.toDoubleOrNull() ?: 0.0,
                            address = address
                        ),
                        size = size.toDoubleOrNull() ?: 0.0,
                        type = type,
                        status = FarmStatus.ACTIVE,
                        ownerId = 1 // TODO: Get from user context
                    )
                    onFarmAdded(farm)
                },
                enabled = isFormValid
            ) {
                Text("Add Farm")
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
private fun FarmDetailsDialog(
    farm: Farm,
    onDismiss: () -> Unit,
    onEdit: () -> Unit
) {
    AlertDialog(
        onDismissRequest = onDismiss,
        title = { Text(farm.name) },
        text = {
            Column(
                verticalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                DetailRow("Address", farm.location.address)
                DetailRow("Coordinates", "${farm.location.latitude}, ${farm.location.longitude}")
                DetailRow("Size", "${farm.size} acres")
                DetailRow("Type", farm.type.name)
                DetailRow("Status", farm.status.name)
            }
        },
        confirmButton = {
            Row {
                TextButton(onClick = onEdit) {
                    Text("Edit")
                }
                TextButton(onClick = onDismiss) {
                    Text("Close")
                }
            }
        }
    )
}

@Composable
private fun DetailRow(
    label: String,
    value: String
) {
    Row(
        modifier = Modifier.fillMaxWidth(),
        horizontalArrangement = Arrangement.SpaceBetween
    ) {
        Text(
            text = label,
            fontWeight = FontWeight.Medium
        )
        Text(
            text = value,
            color = MaterialTheme.colorScheme.onSurfaceVariant
        )
    }
}
