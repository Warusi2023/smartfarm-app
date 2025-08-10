package com.example.smartfarm.web.ui.theme

import androidx.compose.runtime.*
import androidx.compose.web.css.*

object AppTheme {
    val primaryColor = Color("#4CAF50")
    val secondaryColor = Color("#8BC34A")
    val backgroundColor = Color("#F5F5F5")
    val surfaceColor = Color("#FFFFFF")
    val textColor = Color("#212121")
    val textSecondaryColor = Color("#757575")
    val borderRadius = 8.px
    val shadow = "0 2px 4px rgba(0,0,0,0.1)"
    val shadowLarge = "0 4px 8px rgba(0,0,0,0.15)"
    val spacing = object {
        val small = 8.px
        val medium = 16.px
        val large = 24.px
        val xlarge = 32.px
    }
}

@Composable
fun AppTheme(content: @Composable () -> Unit) {
    content()
} 