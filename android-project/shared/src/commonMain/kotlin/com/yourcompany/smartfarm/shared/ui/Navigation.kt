package com.yourcompany.smartfarm.shared.ui

import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import androidx.compose.runtime.remember

sealed class Screen {
    object Dashboard : Screen()
    object Farms : Screen()
    object Crops : Screen()
    object Livestock : Screen()
    object Tasks : Screen()
    object Finance : Screen()
    object Analytics : Screen()
    object Settings : Screen()
}

class NavigationState {
    var currentScreen by mutableStateOf<Screen>(Screen.Dashboard)
        private set
    
    fun navigateTo(screen: Screen) {
        currentScreen = screen
    }
    
    fun goBack() {
        // For now, just go to dashboard
        // In a real app, you'd maintain a navigation stack
        currentScreen = Screen.Dashboard
    }
    
    fun navigateToAnalytics() {
        currentScreen = Screen.Analytics
    }
}

@Composable
fun rememberNavigationState(): NavigationState {
    return remember { NavigationState() }
}
