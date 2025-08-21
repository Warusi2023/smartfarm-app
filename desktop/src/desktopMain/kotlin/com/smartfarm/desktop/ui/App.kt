package com.smartfarm.desktop.ui

import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.smartfarm.desktop.ui.screens.DashboardScreen
import com.smartfarm.desktop.ui.screens.FarmsScreen
import com.smartfarm.desktop.ui.screens.CropsScreen
import com.smartfarm.desktop.ui.screens.LivestockScreen
import com.smartfarm.desktop.ui.screens.AnalyticsScreen

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun App() {
    var selectedScreen by remember { mutableStateOf(Screen.Dashboard) }
    
    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("SmartFarm Desktop") },
                colors = TopAppBarDefaults.topAppBarColors(
                    containerColor = MaterialTheme.colorScheme.primaryContainer
                )
            )
        }
    ) { paddingValues ->
        Row(
            modifier = Modifier
                .fillMaxSize()
                .padding(paddingValues)
        ) {
            // Navigation Drawer
            NavigationRail(
                modifier = Modifier.fillMaxHeight(),
                containerColor = MaterialTheme.colorScheme.surfaceVariant
            ) {
                Screen.values().forEach { screen ->
                    NavigationRailItem(
                        selected = selectedScreen == screen,
                        onClick = { selectedScreen = screen },
                        icon = { 
                            // You can add icons here later
                            Text(screen.title.first().toString())
                        },
                        label = { Text(screen.title) }
                    )
                }
            }
            
            // Content Area
            Box(
                modifier = Modifier
                    .fillMaxSize()
                    .padding(16.dp)
            ) {
                when (selectedScreen) {
                    Screen.Dashboard -> DashboardScreen()
                    Screen.Farms -> FarmsScreen()
                    Screen.Crops -> CropsScreen()
                    Screen.Livestock -> LivestockScreen()
                    Screen.Analytics -> AnalyticsScreen()
                }
            }
        }
    }
}

enum class Screen(val title: String) {
    Dashboard("Dashboard"),
    Farms("Farms"),
    Crops("Crops"),
    Livestock("Livestock"),
    Analytics("Analytics")
}
