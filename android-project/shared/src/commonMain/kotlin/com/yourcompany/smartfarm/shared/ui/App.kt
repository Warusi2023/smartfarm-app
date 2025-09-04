package com.yourcompany.smartfarm.shared.ui

import androidx.compose.foundation.layout.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ArrowBack
import androidx.compose.material.icons.filled.Star
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.yourcompany.smartfarm.shared.services.ServiceFactory
import com.yourcompany.smartfarm.shared.services.DataService
import com.yourcompany.smartfarm.shared.services.WebSocketService
import com.yourcompany.smartfarm.shared.services.CacheService
import com.yourcompany.smartfarm.shared.services.FileUploadService
import com.yourcompany.smartfarm.shared.ui.screens.DashboardScreen
import com.yourcompany.smartfarm.shared.ui.screens.FarmsScreen
import com.yourcompany.smartfarm.shared.ui.screens.CropsScreen
import com.yourcompany.smartfarm.shared.ui.screens.LivestockScreen
import com.yourcompany.smartfarm.shared.ui.screens.TasksScreen
import com.yourcompany.smartfarm.shared.ui.screens.FinanceScreen
import com.yourcompany.smartfarm.shared.ui.screens.AnalyticsScreen

@Composable
fun App() {
    val navigationState = rememberNavigationState()
    
    // Get services from factory
    val dataService = remember { ServiceFactory.getDataService() }
    val webSocketService = remember { ServiceFactory.getWebSocketService() }
    val cacheService = remember { ServiceFactory.getCacheService() }
    val fileUploadService = remember { ServiceFactory.getFileUploadService() }
    
    // Service information for debugging
    LaunchedEffect(Unit) {
        println("🚀 SmartFarm App Starting...")
        println("📱 Service Configuration:")
        ServiceFactory.getServiceInfo().forEach { (key, value) ->
            println("   $key: $value")
        }
        
        // Test services
        val testResults = ServiceFactory.testAllServices()
        println("🧪 Service Test Results:")
        testResults.forEach { (service, status) ->
            println("   $service: ${if (status) "✅" else "❌"}")
        }
    }
    
    MaterialTheme {
        when (navigationState.currentScreen) {
            is Screen.Dashboard -> {
                DashboardScreen(
                    dataService = dataService,
                    onNavigateToFarms = { navigationState.navigateTo(Screen.Farms) },
                    onNavigateToCrops = { navigationState.navigateTo(Screen.Crops) },
                    onNavigateToLivestock = { navigationState.navigateTo(Screen.Livestock) },
                    onNavigateToTasks = { navigationState.navigateTo(Screen.Tasks) },
                    onNavigateToFinance = { navigationState.navigateTo(Screen.Finance) },
                    onNavigateToAnalytics = { navigationState.navigateToAnalytics() }
                )
            }
            
            is Screen.Farms -> {
                FarmsScreen(
                    dataService = dataService,
                    onNavigateBack = { navigationState.goBack() }
                )
            }
            
            is Screen.Crops -> {
                CropsScreen(
                    dataService = dataService,
                    onNavigateBack = { navigationState.goBack() }
                )
            }
            
            is Screen.Livestock -> {
                LivestockScreen(
                    dataService = dataService,
                    onNavigateBack = { navigationState.goBack() }
                )
            }
            
            is Screen.Tasks -> {
                TasksScreen(
                    dataService = dataService,
                    onNavigateBack = { navigationState.goBack() }
                )
            }
            
            is Screen.Finance -> {
                FinanceScreen(
                    dataService = dataService,
                    onNavigateBack = { navigationState.goBack() }
                )
            }
            
            is Screen.Analytics -> {
                AnalyticsScreen(
                    dataService = dataService,
                    onNavigateBack = { navigationState.goBack() }
                )
            }
            
            is Screen.Settings -> {
                // TODO: Implement SettingsScreen
                PlaceholderScreen(
                    title = "⚙️ Settings",
                    message = "Settings and preferences coming soon!",
                    onNavigateBack = { navigationState.navigateTo(Screen.Dashboard) }
                )
            }
        }
    }
}

@Composable
private fun PlaceholderScreen(
    title: String,
    message: String,
    onNavigateBack: () -> Unit
) {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp)
    ) {
        // Header with back button
        Row(
            modifier = Modifier.fillMaxWidth(),
            verticalAlignment = Alignment.CenterVertically
        ) {
            IconButton(onClick = onNavigateBack) {
                Icon(
                    Icons.Default.ArrowBack,
                    contentDescription = "Back"
                )
            }
            
            Text(
                text = title,
                fontSize = 24.sp,
                fontWeight = FontWeight.Bold,
                modifier = Modifier.weight(1f)
            )
        }
        
        Spacer(modifier = Modifier.height(32.dp))
        
        // Placeholder content
        Box(
            modifier = Modifier.fillMaxSize(),
            contentAlignment = Alignment.Center
        ) {
            Column(
                horizontalAlignment = Alignment.CenterHorizontally
            ) {
                Icon(
                    Icons.Default.Star,
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
                
                Button(
                    onClick = onNavigateBack
                ) {
                    Text("Back to Dashboard")
                }
            }
        }
    }
}

@Composable
fun SmartFarmApp() {
    App()
}
