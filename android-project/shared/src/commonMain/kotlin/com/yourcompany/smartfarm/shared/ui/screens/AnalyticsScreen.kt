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
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.background
import androidx.compose.foundation.Canvas
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.geometry.Size
import androidx.compose.ui.graphics.drawscope.DrawScope
import androidx.compose.ui.graphics.drawscope.Stroke
import kotlin.math.PI
import kotlin.math.cos
import kotlin.math.sin

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun AnalyticsScreen(dataService: DataService, onNavigateBack: () -> Unit) {
    var selectedFarmId by remember { mutableStateOf(1L) }
    var analyticsData by remember { mutableStateOf<Map<String, Any>>(emptyMap()) }
    
    LaunchedEffect(selectedFarmId) {
        analyticsData = dataService.getFarmStats(selectedFarmId)
    }
    
    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp)
    ) {
        // Header
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            IconButton(onClick = onNavigateBack) {
                Icon(Icons.Default.ArrowBack, contentDescription = "Back")
            }
            Text(
                text = "Analytics Dashboard",
                style = MaterialTheme.typography.headlineMedium
            )
            // Refresh button removed - icon not available
        }
        
        Spacer(modifier = Modifier.height(16.dp))
        
        // Farm Selection - simplified
        var farms by remember { mutableStateOf<List<Farm>>(emptyList()) }
        LaunchedEffect(Unit) {
            farms = dataService.getFarms()
        }
        
        if (farms.isNotEmpty()) {
            Card(
                modifier = Modifier.fillMaxWidth(),
                colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.secondaryContainer)
            ) {
                Column(modifier = Modifier.padding(16.dp)) {
                    Text("Select Farm", fontWeight = FontWeight.Bold)
                    Spacer(modifier = Modifier.height(8.dp))
                    farms.forEach { farm ->
                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            RadioButton(
                                selected = selectedFarmId == farm.id,
                                onClick = { selectedFarmId = farm.id }
                            )
                            Text(farm.name)
                        }
                    }
                }
            }
            Spacer(modifier = Modifier.height(16.dp))
        }
        
        Spacer(modifier = Modifier.height(24.dp))
        
        LazyColumn(
            verticalArrangement = Arrangement.spacedBy(16.dp)
        ) {
            // Production Analytics Cards
            item {
                Text(
                    text = "Production Analytics",
                    style = MaterialTheme.typography.titleLarge,
                    modifier = Modifier.padding(bottom = 8.dp)
                )
            }
            
            item {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.spacedBy(8.dp)
                ) {
                    AnalyticsCard(
                        title = "Total Plants",
                        value = "${analyticsData["totalPlants"] ?: 0}",
                        icon = "🌱",
                        modifier = Modifier.weight(1f)
                    )
                    AnalyticsCard(
                        title = "Total Flowers",
                        value = "${analyticsData["totalFlowers"] ?: 0}",
                        icon = "🌸",
                        modifier = Modifier.weight(1f)
                    )
                }
            }
            
            item {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.spacedBy(8.dp)
                ) {
                    AnalyticsCard(
                        title = "Total Trees",
                        value = "${analyticsData["totalTrees"] ?: 0}",
                        icon = "🌳",
                        modifier = Modifier.weight(1f)
                    )
                    AnalyticsCard(
                        title = "Total Aquatic",
                        value = "${analyticsData["totalAquatic"] ?: 0}",
                        icon = "🐟",
                        modifier = Modifier.weight(1f)
                    )
                }
            }
            
            item {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.spacedBy(8.dp)
                ) {
                    AnalyticsCard(
                        title = "Total Livestock",
                        value = "${analyticsData["totalLivestock"] ?: 0}",
                        icon = "🐄",
                        modifier = Modifier.weight(1f)
                    )
                    AnalyticsCard(
                        title = "Total Pets",
                        value = "${analyticsData["totalPets"] ?: 0}",
                        icon = "🐕",
                        modifier = Modifier.weight(1f)
                    )
                }
            }
            
            // Production Distribution Chart (Chart.js)
            item {
                Text(
                    text = "Production Distribution",
                    style = MaterialTheme.typography.titleMedium,
                    modifier = Modifier.padding(bottom = 8.dp)
                )
                
                Box(
                    modifier = Modifier
                        .fillMaxWidth()
                        .height(250.dp)
                        .background(
                            color = MaterialTheme.colorScheme.surfaceVariant,
                            shape = RoundedCornerShape(8.dp)
                        ),
                    contentAlignment = Alignment.Center
                ) {
                    // Chart.js will be rendered here
                    Text(
                        text = "Chart.js Production Chart",
                        color = MaterialTheme.colorScheme.onSurfaceVariant
                    )
                }
            }
            
            // Performance Metrics
            item {
                Text(
                    text = "Performance Metrics",
                    style = MaterialTheme.typography.titleLarge,
                    modifier = Modifier.padding(bottom = 8.dp)
                )
            }
            
            item {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.spacedBy(8.dp)
                ) {
                    AnalyticsCard(
                        title = "Efficiency",
                        value = "${(analyticsData["efficiency"] as? Double ?: 0.0).toInt()}%",
                        icon = "⚡",
                        modifier = Modifier.weight(1f)
                    )
                    AnalyticsCard(
                        title = "Growth Rate",
                        value = "${(analyticsData["growthRate"] as? Double ?: 0.0).toInt()}%",
                        icon = "📈",
                        modifier = Modifier.weight(1f)
                    )
                }
            }
            
            // Performance Chart (Chart.js)
            item {
                Text(
                    text = "Performance Trends",
                    style = MaterialTheme.typography.titleMedium,
                    modifier = Modifier.padding(bottom = 8.dp)
                )
                
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
                    // Chart.js will be rendered here
                    Text(
                        text = "Chart.js Performance Chart",
                        color = MaterialTheme.colorScheme.onSurfaceVariant
                    )
                }
            }
            
            // Equipment Status
            item {
                Text(
                    text = "Equipment Status",
                    style = MaterialTheme.typography.titleLarge,
                    modifier = Modifier.padding(bottom = 8.dp)
                )
            }
            
            item {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.spacedBy(8.dp)
                ) {
                    AnalyticsCard(
                        title = "Total Equipment",
                        value = "${analyticsData["totalEquipment"] ?: 0}",
                        icon = "🔧",
                        modifier = Modifier.weight(1f)
                    )
                    AnalyticsCard(
                        title = "Pending Maintenance",
                        value = "${analyticsData["pendingMaintenance"] ?: 0}",
                        icon = "🛠️",
                        modifier = Modifier.weight(1f)
                    )
                }
            }
            
            // Equipment Status Chart (Chart.js)
            item {
                Text(
                    text = "Equipment Overview",
                    style = MaterialTheme.typography.titleMedium,
                    modifier = Modifier.padding(bottom = 8.dp)
                )
                
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
                    // Chart.js will be rendered here
                    Text(
                        text = "Chart.js Equipment Chart",
                        color = MaterialTheme.colorScheme.onSurfaceVariant
                    )
                }
            }
        }
    }
}

@Composable
private fun AnalyticsCard(
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

@Composable
private fun ProductionChart(
    plants: Int,
    flowers: Int,
    trees: Int,
    aquatic: Int,
    livestock: Int,
    pets: Int
) {
    val maxValue = maxOf(plants, flowers, trees, aquatic, livestock, pets, 1)
    
    Column(
        modifier = Modifier.fillMaxWidth(),
        verticalArrangement = Arrangement.spacedBy(8.dp)
    ) {
        ChartBar("🌱 Plants", plants, maxValue, MaterialTheme.colorScheme.primary)
        ChartBar("🌸 Flowers", flowers, maxValue, MaterialTheme.colorScheme.secondary)
        ChartBar("🌳 Trees", trees, maxValue, MaterialTheme.colorScheme.tertiary)
        ChartBar("🐟 Aquatic", aquatic, maxValue, MaterialTheme.colorScheme.primary)
        ChartBar("🐄 Livestock", livestock, maxValue, MaterialTheme.colorScheme.secondary)
        ChartBar("🐕 Pets", pets, maxValue, MaterialTheme.colorScheme.tertiary)
    }
}

@Composable
private fun EnhancedProductionChart(
    plants: Int,
    flowers: Int,
    trees: Int,
    aquatic: Int,
    livestock: Int,
    pets: Int
) {
    val maxValue = maxOf(plants, flowers, trees, aquatic, livestock, pets, 1)
    
    Column(
        modifier = Modifier.fillMaxWidth(),
        verticalArrangement = Arrangement.spacedBy(8.dp)
    ) {
        ChartBar("🌱 Plants", plants, maxValue, MaterialTheme.colorScheme.primary)
        ChartBar("🌸 Flowers", flowers, maxValue, MaterialTheme.colorScheme.secondary)
        ChartBar("🌳 Trees", trees, maxValue, MaterialTheme.colorScheme.tertiary)
        ChartBar("🐟 Aquatic", aquatic, maxValue, MaterialTheme.colorScheme.primary)
        ChartBar("🐄 Livestock", livestock, maxValue, MaterialTheme.colorScheme.secondary)
        ChartBar("🐕 Pets", pets, maxValue, MaterialTheme.colorScheme.tertiary)
    }
}

@Composable
private fun ProductionPieChart(
    plants: Int,
    flowers: Int,
    trees: Int,
    aquatic: Int,
    livestock: Int,
    pets: Int
) {
    val total = plants + flowers + trees + aquatic + livestock + pets
    val data = listOf(
        PieChartData("🌱 Plants", plants, MaterialTheme.colorScheme.primary),
        PieChartData("🌸 Flowers", flowers, MaterialTheme.colorScheme.secondary),
        PieChartData("🌳 Trees", trees, MaterialTheme.colorScheme.tertiary),
        PieChartData("🐟 Aquatic", aquatic, MaterialTheme.colorScheme.primary),
        PieChartData("🐄 Livestock", livestock, MaterialTheme.colorScheme.secondary),
        PieChartData("🐕 Pets", pets, MaterialTheme.colorScheme.tertiary)
    )

    Column(
        modifier = Modifier.fillMaxWidth(),
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Text(
            text = "Production Overview (Total: $total)",
            fontSize = 18.sp,
            fontWeight = FontWeight.Bold
        )
        Spacer(modifier = Modifier.height(16.dp))
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .height(200.dp)
        ) {
            PieChart(data = data)
        }
    }
}

@Composable
private fun ChartBar(
    label: String,
    value: Int,
    maxValue: Int,
    color: androidx.compose.ui.graphics.Color
) {
    Row(
        modifier = Modifier.fillMaxWidth(),
        verticalAlignment = Alignment.CenterVertically
    ) {
        Text(
            text = label,
            modifier = Modifier.width(80.dp),
            fontSize = 12.sp
        )
        
        Spacer(modifier = Modifier.width(8.dp))
        
        Box(
            modifier = Modifier
                .weight(1f)
                .height(20.dp)
                .background(
                    color = color.copy(alpha = 0.2f),
                    shape = RoundedCornerShape(4.dp)
                )
        ) {
            Box(
                modifier = Modifier
                    .fillMaxHeight()
                    .fillMaxWidth(fraction = if (maxValue > 0) value.toFloat() / maxValue else 0f)
                    .background(
                        color = color,
                        shape = RoundedCornerShape(4.dp)
                    )
            )
        }
        
        Spacer(modifier = Modifier.width(8.dp))
        
        Text(
            text = value.toString(),
            fontSize = 12.sp,
            fontWeight = FontWeight.Bold
        )
    }
}

@Composable
private fun PerformanceChart(
    efficiency: Double,
    growthRate: Double
) {
    Column(
        modifier = Modifier.fillMaxWidth(),
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        // Efficiency Gauge
        PerformanceGauge(
            label = "Efficiency",
            value = efficiency,
            color = MaterialTheme.colorScheme.primary
        )
        
        // Growth Rate Gauge
        PerformanceGauge(
            label = "Growth Rate",
            value = growthRate,
            color = MaterialTheme.colorScheme.secondary
        )
    }
}

@Composable
private fun PerformanceGauge(
    label: String,
    value: Double,
    color: androidx.compose.ui.graphics.Color
) {
    Column(
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Text(
            text = label,
            fontSize = 14.sp,
            fontWeight = FontWeight.Medium
        )
        
        Spacer(modifier = Modifier.height(8.dp))
        
        Box(
            modifier = Modifier
                .size(80.dp)
                .background(
                    color = color.copy(alpha = 0.1f),
                    shape = androidx.compose.foundation.shape.CircleShape
                ),
            contentAlignment = Alignment.Center
        ) {
            Text(
                text = "${value.toInt()}%",
                fontSize = 18.sp,
                fontWeight = FontWeight.Bold,
                color = color
            )
        }
    }
}

@Composable
private fun EquipmentStatusChart(
    totalEquipment: Int,
    pendingMaintenance: Int
) {
    val operational = totalEquipment - pendingMaintenance
    
    Row(
        modifier = Modifier.fillMaxWidth(),
        horizontalArrangement = Arrangement.SpaceEvenly
    ) {
        EquipmentStatusItem(
            label = "Operational",
            count = operational,
            color = MaterialTheme.colorScheme.primary,
            icon = "✅"
        )
        
        EquipmentStatusItem(
            label = "Maintenance",
            count = pendingMaintenance,
            color = MaterialTheme.colorScheme.error,
            icon = "🔧"
        )
    }
}

@Composable
private fun EquipmentStatusItem(
    label: String,
    count: Int,
    color: androidx.compose.ui.graphics.Color,
    icon: String
) {
    Column(
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Text(
            text = icon,
            fontSize = 32.sp
        )
        
        Text(
            text = count.toString(),
            fontSize = 24.sp,
            fontWeight = FontWeight.Bold,
            color = color
        )
        
        Text(
            text = label,
            fontSize = 12.sp,
            color = MaterialTheme.colorScheme.onSurfaceVariant
        )
    }
}

// Data class for pie chart
data class PieChartData(
    val label: String,
    val value: Int,
    val color: androidx.compose.ui.graphics.Color
)

@Composable
private fun PieChart(data: List<PieChartData>) {
    val total = data.sumOf { it.value }
    if (total == 0) {
        Box(
            modifier = Modifier.fillMaxSize(),
            contentAlignment = Alignment.Center
        ) {
            Text("No data available")
        }
        return
    }

    Canvas(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp)
    ) {
        val center = Offset(size.width / 2, size.height / 2)
        val radius = minOf(size.width, size.height) / 2 * 0.8f
        var startAngle = 0f

        data.forEach { pieData ->
            val sweepAngle = (pieData.value.toFloat() / total) * 2 * PI.toFloat()
            
            // Draw pie slice
            drawArc(
                color = pieData.color,
                startAngle = startAngle,
                sweepAngle = sweepAngle,
                useCenter = true,
                topLeft = Offset(center.x - radius, center.y - radius),
                size = Size(radius * 2, radius * 2)
            )
            
            // Draw border
            drawArc(
                color = androidx.compose.ui.graphics.Color.Black,
                startAngle = startAngle,
                sweepAngle = sweepAngle,
                useCenter = true,
                topLeft = Offset(center.x - radius, center.y - radius),
                size = Size(radius * 2, radius * 2),
                style = Stroke(width = 2f)
            )
            
            startAngle += sweepAngle
        }
    }

    // Legend
    Column(
        modifier = Modifier.padding(16.dp)
    ) {
        data.forEach { pieData ->
            Row(
                modifier = Modifier.fillMaxWidth(),
                verticalAlignment = Alignment.CenterVertically
            ) {
                Box(
                    modifier = Modifier
                        .size(16.dp)
                        .background(
                            color = pieData.color,
                            shape = RoundedCornerShape(4.dp)
                        )
                )
                Spacer(modifier = Modifier.width(8.dp))
                Text(
                    text = "${pieData.label}: ${pieData.value}",
                    fontSize = 12.sp
                )
            }
            Spacer(modifier = Modifier.height(4.dp))
        }
    }
}
