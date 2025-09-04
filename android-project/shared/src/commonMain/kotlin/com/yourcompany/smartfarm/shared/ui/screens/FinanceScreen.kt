package com.yourcompany.smartfarm.shared.ui.screens

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ArrowBack
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
import androidx.compose.foundation.background
import androidx.compose.foundation.shape.RoundedCornerShape

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun FinanceScreen(
    dataService: DataService,
    onNavigateBack: () -> Unit
) {
    var farms by remember { mutableStateOf<List<Farm>>(emptyList()) }
    var selectedFarmId by remember { mutableStateOf<Long?>(null) }
    var financialData by remember { mutableStateOf<Map<String, Any>>(emptyMap()) }
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
                financialData = stats
            }
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
                text = "💰 Financial Overview",
                fontSize = 24.sp,
                fontWeight = FontWeight.Bold,
                modifier = Modifier.weight(1f)
            )
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
            LazyColumn(
                verticalArrangement = Arrangement.spacedBy(16.dp),
                modifier = Modifier.fillMaxWidth()
            ) {
                // Farm Selector
                if (farms.isNotEmpty()) {
                    item {
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
                                                text = "${farm.location.address} • ${farm.size} acres",
                                                fontSize = 12.sp,
                                                color = MaterialTheme.colorScheme.onSurfaceVariant
                                            )
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                
                // Financial Summary Cards
                item {
                    Text(
                        text = "Financial Summary",
                        fontSize = 20.sp,
                        fontWeight = FontWeight.Bold
                    )
                }
                
                // First row of financial cards
                item {
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.spacedBy(16.dp)
                    ) {
                        FinancialCard(
                            title = "Net Profit",
                            value = formatCurrency(financialData["netProfit"] as? Double ?: 0.0),
                            icon = "💰",
                            modifier = Modifier.weight(1f)
                        )
                        FinancialCard(
                            title = "Total Revenue",
                            value = formatCurrency(financialData["totalRevenue"] as? Double ?: 0.0),
                            icon = "📈",
                            modifier = Modifier.weight(1f)
                        )
                    }
                }
                
                // Second row of financial cards
                item {
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.spacedBy(16.dp)
                    ) {
                        FinancialCard(
                            title = "Total Expenses",
                            value = formatCurrency(financialData["totalExpenses"] as? Double ?: 0.0),
                            icon = "📉",
                            modifier = Modifier.weight(1f)
                        )
                        FinancialCard(
                            title = "Profit Margin",
                            value = "${financialData["profitMargin"] as? Double ?: 0.0}%",
                            icon = "📊",
                            modifier = Modifier.weight(1f)
                        )
                    }
                }
                
                // Monthly Breakdown Section
                item {
                    Text(
                        text = "Monthly Breakdown",
                        fontSize = 20.sp,
                        fontWeight = FontWeight.Bold
                    )
                }
                
                item {
                    Card(
                        modifier = Modifier.fillMaxWidth()
                    ) {
                        Column(
                            modifier = Modifier.padding(16.dp)
                        ) {
                            Text(
                                text = "Monthly Financial Overview",
                                fontSize = 16.sp,
                                fontWeight = FontWeight.Medium
                            )
                            
                            Spacer(modifier = Modifier.height(16.dp))
                            
                            // Placeholder for monthly chart
                            Box(
                                modifier = Modifier
                                    .fillMaxWidth()
                                    .height(200.dp)
                                    .background(
                                        color = MaterialTheme.colorScheme.surfaceVariant,
                                        shape = RoundedCornerShape(8.dp)
                                    ),
                                contentAlignment = Alignment.Center
                            ) {
                                Text(
                                    text = "Monthly Chart Coming Soon",
                                    color = MaterialTheme.colorScheme.onSurfaceVariant
                                )
                            }
                        }
                    }
                }
            }
        }
    }
}

@Composable
private fun FinancialCard(
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
                fontSize = 20.sp,
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

// Platform-agnostic currency formatting
private fun formatCurrency(amount: Double): String {
    return amount.toInt().toString()
}
