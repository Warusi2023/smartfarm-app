package com.example.smartfarm

import android.content.Intent
import android.net.Uri
import androidx.activity.compose.rememberLauncherForActivityResult
import androidx.activity.result.contract.ActivityResultContracts
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.smartfarm.data.model.*
import com.example.smartfarm.util.DataExportManager
import com.example.smartfarm.util.SearchManager
import kotlinx.coroutines.launch
import java.text.SimpleDateFormat
import java.util.*

@Composable
fun ReportsScreen(
    exportManager: DataExportManager = remember { 
        DataExportManager(LocalContext.current, FarmDatabase.getDatabase(LocalContext.current)) 
    },
    searchManager: SearchManager = remember { 
        SearchManager(LocalContext.current, FarmDatabase.getDatabase(LocalContext.current)) 
    }
) {
    val context = LocalContext.current
    val scope = rememberCoroutineScope()
    
    var selectedReportType by remember { mutableStateOf(ReportType.OVERVIEW) }
    var selectedDateRange by remember { mutableStateOf(DateRange.LAST_30_DAYS) }
    var selectedExportFormat by remember { mutableStateOf(ExportFormat.PDF) }
    var isGeneratingReport by remember { mutableStateOf(false) }
    var reportData by remember { mutableStateOf<ReportData?>(null) }
    var showExportDialog by remember { mutableStateOf(false) }
    var showShareDialog by remember { mutableStateOf(false) }
    
    // File export launcher
    val exportLauncher = rememberLauncherForActivityResult(
        contract = ActivityResultContracts.CreateDocument("application/pdf")
    ) { uri ->
        uri?.let { exportUri ->
            scope.launch {
                try {
                    val exportResult = exportManager.exportData(
                        format = selectedExportFormat,
                        dataTypes = getDataTypesForReport(selectedReportType),
                        dateRange = getDateRangeForExport(selectedDateRange)
                    )
                    
                    when (exportResult) {
                        is ExportResult.Success -> {
                            // Handle successful export
                        }
                        is ExportResult.Error -> {
                            // Handle export error
                        }
                    }
                } catch (e: Exception) {
                    // Handle exception
                }
            }
        }
    }
    
    // Share launcher
    val shareLauncher = rememberLauncherForActivityResult(
        contract = ActivityResultContracts.StartActivityForResult()
    ) { result ->
        // Handle share result
    }
    
    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(MaterialTheme.colorScheme.surface)
            .padding(16.dp)
    ) {
        // Header
        Text(
            text = "Reports & Analytics",
            style = MaterialTheme.typography.headlineMedium,
            fontWeight = FontWeight.Bold,
            modifier = Modifier.padding(bottom = 16.dp)
        )
        
        // Report Type Selection
        Card(
            modifier = Modifier.fillMaxWidth(),
            colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.primaryContainer)
        ) {
            Column(
                modifier = Modifier.padding(16.dp)
            ) {
                Text(
                    text = "Report Type",
                    style = MaterialTheme.typography.titleMedium,
                    fontWeight = FontWeight.Bold
                )
                
                Spacer(modifier = Modifier.height(8.dp))
                
                LazyColumn(
                    horizontalArrangement = Arrangement.spacedBy(8.dp)
                ) {
                    items(ReportType.values()) { reportType ->
                        FilterChip(
                            selected = selectedReportType == reportType,
                            onClick = { selectedReportType = reportType },
                            label = { Text(reportType.displayName) },
                            leadingIcon = {
                                Icon(
                                    imageVector = reportType.icon,
                                    contentDescription = null
                                )
                            }
                        )
                    }
                }
            }
        }
        
        Spacer(modifier = Modifier.height(16.dp))
        
        // Date Range Selection
        Card(
            modifier = Modifier.fillMaxWidth()
        ) {
            Column(
                modifier = Modifier.padding(16.dp)
            ) {
                Text(
                    text = "Date Range",
                    style = MaterialTheme.typography.titleMedium,
                    fontWeight = FontWeight.Bold
                )
                
                Spacer(modifier = Modifier.height(8.dp))
                
                LazyColumn(
                    horizontalArrangement = Arrangement.spacedBy(8.dp)
                ) {
                    items(DateRange.values()) { dateRange ->
                        FilterChip(
                            selected = selectedDateRange == dateRange,
                            onClick = { selectedDateRange = dateRange },
                            label = { Text(dateRange.displayName) }
                        )
                    }
                }
            }
        }
        
        Spacer(modifier = Modifier.height(16.dp))
        
        // Action Buttons
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            Button(
                onClick = {
                    scope.launch {
                        isGeneratingReport = true
                        try {
                            reportData = generateReport(selectedReportType, selectedDateRange, searchManager)
                        } finally {
                            isGeneratingReport = false
                        }
                    }
                },
                modifier = Modifier.weight(1f),
                enabled = !isGeneratingReport
            ) {
                if (isGeneratingReport) {
                    CircularProgressIndicator(
                        modifier = Modifier.size(16.dp),
                        strokeWidth = 2.dp
                    )
                } else {
                    Icon(Icons.Default.Refresh, contentDescription = null)
                }
                Spacer(modifier = Modifier.width(8.dp))
                Text("Generate Report")
            }
            
            Button(
                onClick = { showExportDialog = true },
                modifier = Modifier.weight(1f),
                enabled = reportData != null
            ) {
                Icon(Icons.Default.Download, contentDescription = null)
                Spacer(modifier = Modifier.width(8.dp))
                Text("Export")
            }
            
            Button(
                onClick = { showShareDialog = true },
                modifier = Modifier.weight(1f),
                enabled = reportData != null
            ) {
                Icon(Icons.Default.Share, contentDescription = null)
                Spacer(modifier = Modifier.width(8.dp))
                Text("Share")
            }
        }
        
        Spacer(modifier = Modifier.height(16.dp))
        
        // Report Content
        reportData?.let { data ->
            Card(
                modifier = Modifier.fillMaxWidth()
            ) {
                Column(
                    modifier = Modifier.padding(16.dp)
                ) {
                    Text(
                        text = data.title,
                        style = MaterialTheme.typography.headlineSmall,
                        fontWeight = FontWeight.Bold
                    )
                    
                    Spacer(modifier = Modifier.height(8.dp))
                    
                    Text(
                        text = "Generated: ${formatDate(data.generatedAt)}",
                        style = MaterialTheme.typography.bodySmall,
                        color = MaterialTheme.colorScheme.onSurfaceVariant
                    )
                    
                    Spacer(modifier = Modifier.height(16.dp))
                    
                    // Summary Statistics
                    data.summaryStatistics.forEach { stat ->
                        Row(
                            modifier = Modifier
                                .fillMaxWidth()
                                .padding(vertical = 4.dp),
                            horizontalArrangement = Arrangement.SpaceBetween
                        ) {
                            Text(stat.label)
                            Text(
                                text = stat.value,
                                fontWeight = FontWeight.Medium
                            )
                        }
                    }
                    
                    Spacer(modifier = Modifier.height(16.dp))
                    
                    // Detailed Data
                    data.detailedData.forEach { section ->
                        Text(
                            text = section.title,
                            style = MaterialTheme.typography.titleMedium,
                            fontWeight = FontWeight.Bold,
                            modifier = Modifier.padding(vertical = 8.dp)
                        )
                        
                        section.items.forEach { item ->
                            Row(
                                modifier = Modifier
                                    .fillMaxWidth()
                                    .padding(vertical = 2.dp),
                                horizontalArrangement = Arrangement.SpaceBetween
                            ) {
                                Text(item.label)
                                Text(
                                    text = item.value,
                                    fontWeight = FontWeight.Medium
                                )
                            }
                        }
                        
                        Spacer(modifier = Modifier.height(8.dp))
                    }
                }
            }
        }
    }
    
    // Export Dialog
    if (showExportDialog) {
        ExportDialog(
            selectedFormat = selectedExportFormat,
            onFormatSelected = { selectedExportFormat = it },
            onExport = {
                showExportDialog = false
                val fileName = "smartfarm_report_${selectedReportType.name.lowercase()}_${System.currentTimeMillis()}.${selectedExportFormat.extension}"
                exportLauncher.launch(fileName)
            },
            onDismiss = { showExportDialog = false }
        )
    }
    
    // Share Dialog
    if (showShareDialog) {
        ShareDialog(
            onShare = { shareType ->
                showShareDialog = false
                shareReport(reportData, shareType, context, shareLauncher)
            },
            onDismiss = { showShareDialog = false }
        )
    }
}

@Composable
fun ExportDialog(
    selectedFormat: ExportFormat,
    onFormatSelected: (ExportFormat) -> Unit,
    onExport: () -> Unit,
    onDismiss: () -> Unit
) {
    AlertDialog(
        onDismissRequest = onDismiss,
        title = { Text("Export Report") },
        text = {
            Column {
                Text("Select export format:")
                Spacer(modifier = Modifier.height(8.dp))
                
                ExportFormat.values().forEach { format ->
                    Row(
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(vertical = 4.dp),
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        RadioButton(
                            selected = selectedFormat == format,
                            onClick = { onFormatSelected(format) }
                        )
                        Spacer(modifier = Modifier.width(8.dp))
                        Text(format.displayName)
                    }
                }
            }
        },
        confirmButton = {
            Button(onClick = onExport) {
                Text("Export")
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
fun ShareDialog(
    onShare: (ShareType) -> Unit,
    onDismiss: () -> Unit
) {
    AlertDialog(
        onDismissRequest = onDismiss,
        title = { Text("Share Report") },
        text = {
            Column {
                ShareType.values().forEach { shareType ->
                    Button(
                        onClick = { onShare(shareType) },
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(vertical = 4.dp)
                    ) {
                        Icon(shareType.icon, contentDescription = null)
                        Spacer(modifier = Modifier.width(8.dp))
                        Text(shareType.displayName)
                    }
                }
            }
        },
        confirmButton = {
            TextButton(onClick = onDismiss) {
                Text("Cancel")
            }
        }
    )
}

// Data Classes and Enums
enum class ReportType(val displayName: String, val icon: androidx.compose.ui.graphics.vector.ImageVector) {
    OVERVIEW("Overview", Icons.Default.Dashboard),
    LIVESTOCK("Livestock", Icons.Default.Pets),
    CROPS("Crops", Icons.Default.LocalFlorist),
    ACTIVITIES("Activities", Icons.Default.Assignment),
    FINANCIAL("Financial", Icons.Default.AccountBalance),
    WEATHER("Weather", Icons.Default.WbSunny),
    HEALTH("Health Records", Icons.Default.LocalHospital),
    PERFORMANCE("Performance", Icons.Default.TrendingUp)
}

enum class DateRange(val displayName: String) {
    LAST_7_DAYS("Last 7 Days"),
    LAST_30_DAYS("Last 30 Days"),
    LAST_90_DAYS("Last 90 Days"),
    THIS_YEAR("This Year"),
    LAST_YEAR("Last Year"),
    CUSTOM("Custom Range")
}

enum class ExportFormat(val displayName: String, val extension: String) {
    PDF("PDF Document", "pdf"),
    EXCEL("Excel Spreadsheet", "xlsx"),
    CSV("CSV File", "csv"),
    JSON("JSON Data", "json")
}

enum class ShareType(val displayName: String, val icon: androidx.compose.ui.graphics.vector.ImageVector) {
    EMAIL("Email", Icons.Default.Email),
    WHATSAPP("WhatsApp", Icons.Default.Share),
    DRIVE("Google Drive", Icons.Default.CloudUpload),
    PRINT("Print", Icons.Default.Print)
}

data class ReportData(
    val title: String,
    val generatedAt: Long,
    val summaryStatistics: List<Statistic>,
    val detailedData: List<DataSection>
)

data class Statistic(
    val label: String,
    val value: String
)

data class DataSection(
    val title: String,
    val items: List<DataItem>
)

data class DataItem(
    val label: String,
    val value: String
)

// Helper Functions
private suspend fun generateReport(
    reportType: ReportType,
    dateRange: DateRange,
    searchManager: SearchManager
): ReportData {
    return when (reportType) {
        ReportType.OVERVIEW -> generateOverviewReport(dateRange, searchManager)
        ReportType.LIVESTOCK -> generateLivestockReport(dateRange, searchManager)
        ReportType.CROPS -> generateCropsReport(dateRange, searchManager)
        ReportType.ACTIVITIES -> generateActivitiesReport(dateRange, searchManager)
        ReportType.FINANCIAL -> generateFinancialReport(dateRange, searchManager)
        ReportType.WEATHER -> generateWeatherReport(dateRange, searchManager)
        ReportType.HEALTH -> generateHealthReport(dateRange, searchManager)
        ReportType.PERFORMANCE -> generatePerformanceReport(dateRange, searchManager)
    }
}

private suspend fun generateOverviewReport(dateRange: DateRange, searchManager: SearchManager): ReportData {
    val searchResult = searchManager.searchAll("", SearchFilters())
    val results = if (searchResult is SearchResult.Success) searchResult.results else emptyList()
    
    val livestockCount = results.count { it.type == SearchItemType.LIVESTOCK }
    val cropCount = results.count { it.type == SearchItemType.CROP }
    val activityCount = results.count { it.type == SearchItemType.ACTIVITY }
    val farmCount = results.count { it.type == SearchItemType.FARM }
    
    return ReportData(
        title = "Farm Overview Report",
        generatedAt = System.currentTimeMillis(),
        summaryStatistics = listOf(
            Statistic("Total Livestock", livestockCount.toString()),
            Statistic("Active Crops", cropCount.toString()),
            Statistic("Recent Activities", activityCount.toString()),
            Statistic("Farms", farmCount.toString())
        ),
        detailedData = listOf(
            DataSection(
                "Livestock Summary",
                listOf(
                    DataItem("Healthy Animals", "85%"),
                    DataItem("Breeding Animals", "12"),
                    DataItem("Average Age", "3.2 years")
                )
            ),
            DataSection(
                "Crop Summary",
                listOf(
                    DataItem("Active Crops", cropCount.toString()),
                    DataItem("Harvest Ready", "3"),
                    DataItem("Average Yield", "85%")
                )
            )
        )
    )
}

private suspend fun generateLivestockReport(dateRange: DateRange, searchManager: SearchManager): ReportData {
    val searchResult = searchManager.searchLivestock("", SearchFilters())
    
    return ReportData(
        title = "Livestock Report",
        generatedAt = System.currentTimeMillis(),
        summaryStatistics = listOf(
            Statistic("Total Animals", searchResult.size.toString()),
            Statistic("Healthy", "85%"),
            Statistic("Breeding", "12"),
            Statistic("Vaccinated", "92%")
        ),
        detailedData = listOf(
            DataSection(
                "Health Status",
                listOf(
                    DataItem("Excellent", "45%"),
                    DataItem("Good", "40%"),
                    DataItem("Fair", "10%"),
                    DataItem("Poor", "5%")
                )
            ),
            DataSection(
                "Breeding Status",
                listOf(
                    DataItem("Active Breeding", "12"),
                    DataItem("Pregnant", "8"),
                    DataItem("Not Breeding", "25"),
                    DataItem("Recently Bred", "5")
                )
            )
        )
    )
}

private suspend fun generateCropsReport(dateRange: DateRange, searchManager: SearchManager): ReportData {
    val searchResult = searchManager.searchCrops("", SearchFilters())
    
    return ReportData(
        title = "Crops Report",
        generatedAt = System.currentTimeMillis(),
        summaryStatistics = listOf(
            Statistic("Active Crops", searchResult.size.toString()),
            Statistic("Harvest Ready", "3"),
            Statistic("Growing Well", "85%"),
            Statistic("Needs Attention", "2")
        ),
        detailedData = listOf(
            DataSection(
                "Crop Status",
                listOf(
                    DataItem("Growing", "15"),
                    DataItem("Flowering", "8"),
                    DataItem("Fruiting", "5"),
                    DataItem("Harvest Ready", "3")
                )
            ),
            DataSection(
                "Yield Projection",
                listOf(
                    DataItem("Above Average", "60%"),
                    DataItem("Average", "30%"),
                    DataItem("Below Average", "10%")
                )
            )
        )
    )
}

private suspend fun generateActivitiesReport(dateRange: DateRange, searchManager: SearchManager): ReportData {
    val searchResult = searchManager.searchActivities("", SearchFilters())
    
    return ReportData(
        title = "Activities Report",
        generatedAt = System.currentTimeMillis(),
        summaryStatistics = listOf(
            Statistic("Total Activities", searchResult.size.toString()),
            Statistic("Completed", "85%"),
            Statistic("In Progress", "10%"),
            Statistic("Pending", "5%")
        ),
        detailedData = listOf(
            DataSection(
                "Activity Types",
                listOf(
                    DataItem("Planting", "25"),
                    DataItem("Harvesting", "18"),
                    DataItem("Maintenance", "32"),
                    DataItem("Health Check", "15")
                )
            ),
            DataSection(
                "Completion Rate",
                listOf(
                    DataItem("On Time", "75%"),
                    DataItem("Delayed", "15%"),
                    DataItem("Overdue", "10%")
                )
            )
        )
    )
}

private suspend fun generateFinancialReport(dateRange: DateRange, searchManager: SearchManager): ReportData {
    return ReportData(
        title = "Financial Report",
        generatedAt = System.currentTimeMillis(),
        summaryStatistics = listOf(
            Statistic("Total Revenue", "$12,450"),
            Statistic("Total Expenses", "$8,230"),
            Statistic("Net Profit", "$4,220"),
            Statistic("Profit Margin", "34%")
        ),
        detailedData = listOf(
            DataSection(
                "Revenue Breakdown",
                listOf(
                    DataItem("Crop Sales", "$8,200"),
                    DataItem("Livestock Sales", "$3,500"),
                    DataItem("Other Income", "$750")
                )
            ),
            DataSection(
                "Expense Breakdown",
                listOf(
                    DataItem("Feed & Supplies", "$3,200"),
                    DataItem("Equipment", "$2,100"),
                    DataItem("Labor", "$1,800"),
                    DataItem("Other", "$1,130")
                )
            )
        )
    )
}

private suspend fun generateWeatherReport(dateRange: DateRange, searchManager: SearchManager): ReportData {
    return ReportData(
        title = "Weather Report",
        generatedAt = System.currentTimeMillis(),
        summaryStatistics = listOf(
            Statistic("Average Temperature", "22°C"),
            Statistic("Total Rainfall", "45mm"),
            Statistic("Sunny Days", "18"),
            Statistic("Weather Alerts", "2")
        ),
        detailedData = listOf(
            DataSection(
                "Temperature Trends",
                listOf(
                    DataItem("High", "28°C"),
                    DataItem("Low", "15°C"),
                    DataItem("Average", "22°C"),
                    DataItem("Variation", "±5°C")
                )
            ),
            DataSection(
                "Precipitation",
                listOf(
                    DataItem("Total Rainfall", "45mm"),
                    DataItem("Rainy Days", "8"),
                    DataItem("Humidity", "65%"),
                    DataItem("Drought Risk", "Low")
                )
            )
        )
    )
}

private suspend fun generateHealthReport(dateRange: DateRange, searchManager: SearchManager): ReportData {
    val searchResult = searchManager.searchHealthRecords("", SearchFilters())
    
    return ReportData(
        title = "Health Records Report",
        generatedAt = System.currentTimeMillis(),
        summaryStatistics = listOf(
            Statistic("Total Records", searchResult.size.toString()),
            Statistic("Healthy Animals", "92%"),
            Statistic("Under Treatment", "5"),
            Statistic("Recovered", "15")
        ),
        detailedData = listOf(
            DataSection(
                "Health Status",
                listOf(
                    DataItem("Excellent", "60%"),
                    DataItem("Good", "25%"),
                    DataItem("Fair", "10%"),
                    DataItem("Poor", "5%")
                )
            ),
            DataSection(
                "Common Issues",
                listOf(
                    DataItem("Minor Injuries", "8"),
                    DataItem("Parasites", "3"),
                    DataItem("Respiratory", "2"),
                    DataItem("Digestive", "1")
                )
            )
        )
    )
}

private suspend fun generatePerformanceReport(dateRange: DateRange, searchManager: SearchManager): ReportData {
    return ReportData(
        title = "Performance Report",
        generatedAt = System.currentTimeMillis(),
        summaryStatistics = listOf(
            Statistic("Overall Score", "85%"),
            Statistic("Efficiency", "78%"),
            Statistic("Productivity", "82%"),
            Statistic("Quality", "88%")
        ),
        detailedData = listOf(
            DataSection(
                "Key Metrics",
                listOf(
                    DataItem("Crop Yield", "+15%"),
                    DataItem("Livestock Growth", "+8%"),
                    DataItem("Cost Efficiency", "+12%"),
                    DataItem("Time Management", "+20%")
                )
            ),
            DataSection(
                "Areas for Improvement",
                listOf(
                    DataItem("Water Management", "Needs attention"),
                    DataItem("Pest Control", "Good"),
                    DataItem("Equipment Maintenance", "Excellent"),
                    DataItem("Record Keeping", "Good")
                )
            )
        )
    )
}

private fun getDataTypesForReport(reportType: ReportType): List<ExportDataType> {
    return when (reportType) {
        ReportType.OVERVIEW -> ExportDataType.values().toList()
        ReportType.LIVESTOCK -> listOf(ExportDataType.LIVESTOCK, ExportDataType.HEALTH_RECORDS)
        ReportType.CROPS -> listOf(ExportDataType.CROPS)
        ReportType.ACTIVITIES -> listOf(ExportDataType.ACTIVITIES)
        ReportType.FINANCIAL -> listOf(ExportDataType.FINANCIAL)
        ReportType.WEATHER -> listOf(ExportDataType.WEATHER)
        ReportType.HEALTH -> listOf(ExportDataType.HEALTH_RECORDS)
        ReportType.PERFORMANCE -> ExportDataType.values().toList()
    }
}

private fun getDateRangeForExport(dateRange: DateRange): com.example.smartfarm.util.DateRange? {
    val currentTime = System.currentTimeMillis()
    val dayInMillis = 24 * 60 * 60 * 1000L
    
    return when (dateRange) {
        DateRange.LAST_7_DAYS -> com.example.smartfarm.util.DateRange(
            currentTime - (7 * dayInMillis),
            currentTime
        )
        DateRange.LAST_30_DAYS -> com.example.smartfarm.util.DateRange(
            currentTime - (30 * dayInMillis),
            currentTime
        )
        DateRange.LAST_90_DAYS -> com.example.smartfarm.util.DateRange(
            currentTime - (90 * dayInMillis),
            currentTime
        )
        DateRange.THIS_YEAR -> {
            val calendar = Calendar.getInstance()
            calendar.set(Calendar.MONTH, Calendar.JANUARY)
            calendar.set(Calendar.DAY_OF_MONTH, 1)
            calendar.set(Calendar.HOUR_OF_DAY, 0)
            calendar.set(Calendar.MINUTE, 0)
            calendar.set(Calendar.SECOND, 0)
            com.example.smartfarm.util.DateRange(calendar.timeInMillis, currentTime)
        }
        DateRange.LAST_YEAR -> {
            val calendar = Calendar.getInstance()
            calendar.add(Calendar.YEAR, -1)
            calendar.set(Calendar.MONTH, Calendar.JANUARY)
            calendar.set(Calendar.DAY_OF_MONTH, 1)
            val startOfLastYear = calendar.timeInMillis
            
            calendar.add(Calendar.YEAR, 1)
            calendar.add(Calendar.DAY_OF_YEAR, -1)
            val endOfLastYear = calendar.timeInMillis
            
            com.example.smartfarm.util.DateRange(startOfLastYear, endOfLastYear)
        }
        DateRange.CUSTOM -> null // Handle custom date range separately
    }
}

private fun shareReport(reportData: ReportData?, shareType: ShareType, context: android.content.Context, launcher: androidx.activity.result.ActivityResultLauncher<Intent>) {
    reportData?.let { data ->
        val shareText = buildString {
            appendLine("SmartFarm Report: ${data.title}")
            appendLine("Generated: ${formatDate(data.generatedAt)}")
            appendLine()
            appendLine("Summary:")
            data.summaryStatistics.forEach { stat ->
                appendLine("• ${stat.label}: ${stat.value}")
            }
            appendLine()
            appendLine("Detailed Data:")
            data.detailedData.forEach { section ->
                appendLine("${section.title}:")
                section.items.forEach { item ->
                    appendLine("  • ${item.label}: ${item.value}")
                }
            }
        }
        
        when (shareType) {
            ShareType.EMAIL -> {
                val intent = Intent(Intent.ACTION_SEND).apply {
                    type = "text/plain"
                    putExtra(Intent.EXTRA_SUBJECT, "SmartFarm Report: ${data.title}")
                    putExtra(Intent.EXTRA_TEXT, shareText)
                }
                launcher.launch(Intent.createChooser(intent, "Share via Email"))
            }
            ShareType.WHATSAPP -> {
                val intent = Intent(Intent.ACTION_SEND).apply {
                    type = "text/plain"
                    putExtra(Intent.EXTRA_TEXT, shareText)
                    setPackage("com.whatsapp")
                }
                launcher.launch(intent)
            }
            ShareType.DRIVE -> {
                // Handle Google Drive upload
                val intent = Intent(Intent.ACTION_SEND).apply {
                    type = "text/plain"
                    putExtra(Intent.EXTRA_TEXT, shareText)
                }
                launcher.launch(Intent.createChooser(intent, "Share to Drive"))
            }
            ShareType.PRINT -> {
                // Handle printing
                val intent = Intent(Intent.ACTION_SEND).apply {
                    type = "text/plain"
                    putExtra(Intent.EXTRA_TEXT, shareText)
                }
                launcher.launch(Intent.createChooser(intent, "Print Report"))
            }
        }
    }
}

private fun formatDate(timestamp: Long): String {
    val dateFormat = SimpleDateFormat("MMM dd, yyyy HH:mm", Locale.getDefault())
    return dateFormat.format(Date(timestamp))
} 