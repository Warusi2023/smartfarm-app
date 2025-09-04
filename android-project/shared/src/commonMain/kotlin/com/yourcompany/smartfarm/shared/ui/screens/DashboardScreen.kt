package com.yourcompany.smartfarm.shared.ui.screens

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
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

@Composable
fun DashboardScreen(
    dataService: DataService,
    onNavigateToFarms: () -> Unit,
    onNavigateToCrops: () -> Unit,
    onNavigateToLivestock: () -> Unit,
    onNavigateToTasks: () -> Unit,
    onNavigateToFinance: () -> Unit,
    onNavigateToAnalytics: () -> Unit
) {
    var farms by remember { mutableStateOf<List<Farm>>(emptyList()) }
    var selectedFarmId by remember { mutableStateOf<Long?>(null) }
    var farmStats by remember { mutableStateOf<Map<String, Any>>(emptyMap()) }
    var isLoading by remember { mutableStateOf(true) }
    var error by remember { mutableStateOf<String?>(null) }
    
    // Load data when component is created
    LaunchedEffect(Unit) {
        try {
            isLoading = true
            val loadedFarms = dataService.getFarms()
            farms = loadedFarms
            if (loadedFarms.isNotEmpty()) {
                selectedFarmId = loadedFarms.first().id
                val stats = dataService.getFarmStats(loadedFarms.first().id)
                farmStats = stats
            }
        } catch (e: Exception) {
            error = e.message
        } finally {
            isLoading = false
        }
    }
    
    // Reload stats when farm selection changes
    LaunchedEffect(selectedFarmId) {
        selectedFarmId?.let { farmId ->
            try {
                val stats = dataService.getFarmStats(farmId)
                farmStats = stats
            } catch (e: Exception) {
                error = e.message
            }
        }
    }
    
    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp)
    ) {
        // Header
        Text(
            text = "🌾 Farm Dashboard",
            fontSize = 28.sp,
            fontWeight = FontWeight.Bold,
            color = MaterialTheme.colorScheme.primary
        )
        
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
                            fontSize = 18.sp,
                            fontWeight = FontWeight.Bold
                        )
                        
                        Spacer(modifier = Modifier.height(12.dp))
                        
                        farms.forEach { farm ->
                            Row(
                                modifier = Modifier.fillMaxWidth(),
                                verticalAlignment = Alignment.CenterVertically
                            ) {
                                RadioButton(
                                    selected = selectedFarmId == farm.id,
                                    onClick = { selectedFarmId = farm.id }
                                )
                                Column {
                                    Text(
                                        text = farm.name,
                                        fontWeight = FontWeight.Medium
                                    )
                                    Text(
                                        text = "${farm.location.address} • ${farm.size} acres • ${farm.type.name}",
                                        fontSize = 12.sp,
                                        color = MaterialTheme.colorScheme.onSurfaceVariant
                                    )
                                }
                            }
                        }
                    }
                }
                
                Spacer(modifier = Modifier.height(16.dp))
            }
            
            // Quick Stats
            if (farmStats.isNotEmpty()) {
                LazyColumn(
                    verticalArrangement = Arrangement.spacedBy(16.dp)
                ) {
                    item {
                        Text(
                            text = "Quick Overview",
                            fontSize = 20.sp,
                            fontWeight = FontWeight.Bold
                        )
                    }
                    
                    // First row of stats
                    item {
                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            horizontalArrangement = Arrangement.spacedBy(16.dp)
                        ) {
                            StatCard(
                                title = "Plants",
                                value = "${farmStats["totalPlants"] ?: 0}",
                                icon = "🌱",
                                modifier = Modifier.weight(1f)
                            )
                            StatCard(
                                title = "Flowers",
                                value = "${farmStats["totalFlowers"] ?: 0}",
                                icon = "🌸",
                                modifier = Modifier.weight(1f)
                            )
                            StatCard(
                                title = "Trees",
                                value = "${farmStats["totalTrees"] ?: 0}",
                                icon = "🌳",
                                modifier = Modifier.weight(1f)
                            )
                        }
                    }
                    
                    // Second row of stats
                    item {
                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            horizontalArrangement = Arrangement.spacedBy(16.dp)
                        ) {
                            StatCard(
                                title = "Fishes & Clams",
                                value = "${farmStats["totalAquatic"] ?: 0}",
                                icon = "🐟",
                                modifier = Modifier.weight(1f)
                            )
                            StatCard(
                                title = "Livestock",
                                value = "${farmStats["totalLivestock"] ?: 0}",
                                icon = "🐄",
                                modifier = Modifier.weight(1f)
                            )
                            StatCard(
                                title = "Pets",
                                value = "${farmStats["totalPets"] ?: 0}",
                                icon = "🐕",
                                modifier = Modifier.weight(1f)
                            )
                        }
                    }
                    
                    // Third row of stats
                    item {
                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            horizontalArrangement = Arrangement.spacedBy(16.dp)
                        ) {
                            StatCard(
                                title = "Equipment",
                                value = "${farmStats["totalEquipment"] ?: 0}",
                                icon = "🔧",
                                modifier = Modifier.weight(1f)
                            )
                            StatCard(
                                title = "Maintenance",
                                value = "${farmStats["pendingMaintenance"] ?: 0}",
                                icon = "🛠️",
                                modifier = Modifier.weight(1f)
                            )
                            StatCard(
                                title = "Total Crops",
                                value = "${farmStats["totalCrops"] ?: 0}",
                                icon = "🌾",
                                modifier = Modifier.weight(1f)
                            )
                        }
                    }
                    
                    item {
                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            horizontalArrangement = Arrangement.spacedBy(16.dp)
                        ) {
                            StatCard(
                                title = "Pending Tasks",
                                value = "${farmStats["pendingTasks"] ?: 0}",
                                icon = "📋",
                                modifier = Modifier.weight(1f)
                            )
                            StatCard(
                                title = "Net Profit",
                                value = "$${formatCurrency(farmStats["netProfit"] as? Double ?: 0.0)}",
                                icon = "💰",
                                modifier = Modifier.weight(1f)
                            )
                        }
                    }
                    
                    // Action Buttons
                    item {
                        Text(
                            text = "Quick Actions",
                            fontSize = 20.sp,
                            fontWeight = FontWeight.Bold
                        )
                    }
                    
                    // First row of action buttons
                    item {
                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            horizontalArrangement = Arrangement.spacedBy(16.dp)
                        ) {
                            ActionButton(
                                text = "Plants & Crops",
                                onClick = onNavigateToCrops,
                                modifier = Modifier.weight(1f)
                            )
                            ActionButton(
                                text = "Flowers & Trees",
                                onClick = onNavigateToCrops,
                                modifier = Modifier.weight(1f)
                            )
                        }
                    }
                    
                    // Second row of action buttons
                    item {
                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            horizontalArrangement = Arrangement.spacedBy(16.dp)
                        ) {
                            ActionButton(
                                text = "Fishes & Clams",
                                onClick = onNavigateToLivestock,
                                modifier = Modifier.weight(1f)
                            )
                            ActionButton(
                                text = "Livestock & Pets",
                                onClick = onNavigateToLivestock,
                                modifier = Modifier.weight(1f)
                            )
                        }
                    }
                    
                    // Third row of action buttons
                    item {
                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            horizontalArrangement = Arrangement.spacedBy(16.dp)
                        ) {
                            ActionButton(
                                text = "Equipment",
                                onClick = onNavigateToTasks,
                                modifier = Modifier.weight(1f)
                            )
                            ActionButton(
                                text = "Maintenance",
                                onClick = onNavigateToTasks,
                                modifier = Modifier.weight(1f)
                            )
                        }
                    }
                    
                    // Fourth row of action buttons (Finance & Analytics)
                    item {
                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            horizontalArrangement = Arrangement.spacedBy(16.dp)
                        ) {
                            ActionButton(
                                text = "💰 Finance",
                                onClick = onNavigateToFinance,
                                modifier = Modifier.weight(1f)
                            )
                            ActionButton(
                                text = "📊 Analytics",
                                onClick = onNavigateToAnalytics,
                                modifier = Modifier.weight(1f)
                            )
                        }
                    }
                    
                    // Additional action buttons
                    item {
                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            horizontalArrangement = Arrangement.spacedBy(16.dp)
                        ) {
                            ActionButton(
                                text = "🏡 Farms",
                                onClick = onNavigateToFarms,
                                modifier = Modifier.weight(1f)
                            )
                            ActionButton(
                                text = "📋 Tasks",
                                onClick = onNavigateToTasks,
                                modifier = Modifier.weight(1f)
                            )
                        }
                    }
                }
            }
        }
    }
}

@Composable
private fun StatCard(
    title: String,
    value: String,
    icon: String,
    modifier: Modifier = Modifier
) {
    Card(
        modifier = modifier,
        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface)
    ) {
        Column(
            modifier = Modifier.padding(16.dp),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            Text(
                text = icon,
                fontSize = 32.sp
            )
            
            Spacer(modifier = Modifier.height(8.dp))
            
            Text(
                text = value,
                fontSize = 24.sp,
                fontWeight = FontWeight.Bold
            )
            
            Text(
                text = title,
                fontSize = 14.sp,
                color = MaterialTheme.colorScheme.onSurfaceVariant
            )
        }
    }
}

@Composable
private fun ActionButton(
    text: String,
    onClick: () -> Unit,
    modifier: Modifier = Modifier
) {
    Button(
        onClick = onClick,
        modifier = modifier,
        colors = ButtonDefaults.buttonColors(
            containerColor = MaterialTheme.colorScheme.primary
        )
    ) {
        Text(text)
    }
}

// Platform-agnostic currency formatting
private fun formatCurrency(amount: Double): String {
    return amount.toInt().toString()
}

