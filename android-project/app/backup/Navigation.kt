package com.yourcompany.smartfarm

import androidx.compose.foundation.layout.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.yourcompany.smartfarm.data.model.*

enum class Screen {
    LIVESTOCK,
    WEATHER,
    MAP,
    WEED_HERBICIDE,
    SPONSORSHIPS,
    MARKETPLACE,
    SUBSCRIPTIONS,
    EARNINGS
}

@Composable
fun SmartFarmApp(
    livestockViewModel: LivestockViewModel,
    reminderViewModel: LivestockReminderViewModel,
    userViewModel: UserViewModel,
    plantNames: List<String>,
    weeds: List<Weed>,
    herbicides: List<Herbicide>
) {
    var currentScreen by remember { mutableStateOf(Screen.LIVESTOCK) }
    
    Scaffold(
        bottomBar = {
            NavigationBar {
                NavigationBarItem(
                    icon = { Icon(Icons.Default.Pets, contentDescription = "Livestock") },
                    label = { Text("Livestock") },
                    selected = currentScreen == Screen.LIVESTOCK,
                    onClick = { currentScreen = Screen.LIVESTOCK }
                )
                NavigationBarItem(
                    icon = { Icon(Icons.Default.WbSunny, contentDescription = "Weather") },
                    label = { Text("Weather") },
                    selected = currentScreen == Screen.WEATHER,
                    onClick = { currentScreen = Screen.WEATHER }
                )
                NavigationBarItem(
                    icon = { Icon(Icons.Default.Map, contentDescription = "Map") },
                    label = { Text("Map") },
                    selected = currentScreen == Screen.MAP,
                    onClick = { currentScreen = Screen.MAP }
                )
                NavigationBarItem(
                    icon = { Icon(Icons.Default.LocalFlorist, contentDescription = "Weeds") },
                    label = { Text("Weeds") },
                    selected = currentScreen == Screen.WEED_HERBICIDE,
                    onClick = { currentScreen = Screen.WEED_HERBICIDE }
                )
                NavigationBarItem(
                    icon = { Icon(Icons.Default.MonetizationOn, contentDescription = "Monetization") },
                    label = { Text("Earn") },
                    selected = currentScreen in listOf(Screen.SPONSORSHIPS, Screen.MARKETPLACE, Screen.SUBSCRIPTIONS, Screen.EARNINGS),
                    onClick = { currentScreen = Screen.SPONSORSHIPS }
                )
            }
        }
    ) { paddingValues ->
        Box(
            modifier = Modifier
                .fillMaxSize()
                .padding(paddingValues)
        ) {
            when (currentScreen) {
                Screen.LIVESTOCK -> {
                    LivestockScreen(
                        viewModel = livestockViewModel,
                        reminderViewModel = reminderViewModel,
                        userViewModel = userViewModel,
                        plantNames = plantNames
                    )
                }
                Screen.WEATHER -> {
                    WeatherScreen()
                }
                Screen.MAP -> {
                    FarmLocationMapScreen()
                }
                Screen.WEED_HERBICIDE -> {
                    // TODO: Implement WeedHerbicideList screen
                    Box(
                        modifier = Modifier.fillMaxSize(),
                        contentAlignment = androidx.compose.ui.Alignment.Center
                    ) {
                        Text("Weed & Herbicide Management - Coming Soon")
                    }
                }
                Screen.SPONSORSHIPS -> {
                    SponsorshipScreen()
                }
                Screen.MARKETPLACE -> {
                    AffiliateMarketplaceScreen()
                }
                Screen.SUBSCRIPTIONS -> {
                    SubscriptionScreen()
                }
                Screen.EARNINGS -> {
                    EarningsScreen()
                }
            }
        }
    }
} 