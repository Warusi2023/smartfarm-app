package com.smartfarm.shared.ui

import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier

/**
 * Main entry point for SmartFarm app (shared between Android and iOS)
 * This is a placeholder - iOS will use the old SmartFarmApp() for now
 * Android uses MainNavigation from the app module
 */
@Composable
fun SmartFarmApp() {
    MaterialTheme {
        Surface(
            modifier = Modifier.fillMaxSize(),
            color = MaterialTheme.colorScheme.background
        ) {
            // Use legacy shared UI for iOS compatibility
            // TODO: Migrate iOS screens to use shared ViewModels
            com.yourcompany.smartfarm.shared.ui.SmartFarmApp()
        }
    }
}


