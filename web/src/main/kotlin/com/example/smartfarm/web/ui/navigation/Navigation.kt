package com.example.smartfarm.web.ui.navigation

import androidx.compose.runtime.*
import androidx.compose.web.css.*
import androidx.compose.web.dom.*

@Composable
fun Navigation(currentScreen: String, onScreenChange: (String) -> Unit) {
    Nav({
        style {
            display(DisplayStyle.Flex)
            gap(8.px)
            alignItems(Align.Center)
        }
    }) {
        NavLink("home", "🏠 Home", currentScreen, onScreenChange)
        NavLink("livestock", "🐄 Livestock", currentScreen, onScreenChange)
        NavLink("crops", "🌾 Crops", currentScreen, onScreenChange)
        NavLink("weather", "🌤️ Weather", currentScreen, onScreenChange)
        NavLink("inventory", "📦 Inventory", currentScreen, onScreenChange)
        NavLink("employees", "👥 Employees", currentScreen, onScreenChange)
        NavLink("market-prices", "📈 Market Prices", currentScreen, onScreenChange)
        NavLink("documents", "📄 Documents", currentScreen, onScreenChange)
        NavLink("financial", "💰 Financial", currentScreen, onScreenChange)
        NavLink("tasks", "✅ Tasks", currentScreen, onScreenChange)
                       NavLink("reports", "📊 Reports", currentScreen, onScreenChange)
               NavLink("analytics", "📈 Analytics", currentScreen, onScreenChange)
               NavLink("advanced-analytics", "📊 Advanced Analytics", currentScreen, onScreenChange)
               NavLink("expert-chat", "🤖 Expert Chat", currentScreen, onScreenChange)
        NavLink("settings", "⚙️ Settings", currentScreen, onScreenChange)
    }
}

@Composable
private fun NavLink(
    screen: String,
    label: String,
    currentScreen: String,
    onScreenChange: (String) -> Unit
) {
    A({
        style {
            padding(8.px, 16.px)
            textDecoration("none")
            color(if (currentScreen == screen) Color("#4CAF50") else Color("#757575"))
            backgroundColor(if (currentScreen == screen) Color("#E8F5E8") else Color.transparent)
            borderRadius(8.px)
            fontSize(14.px)
            fontWeight(if (currentScreen == screen) 600 else 500)
            transition("all 0.2s ease")
            cursor("pointer")
        }
        onClick { onScreenChange(screen) }
    }) {
        Text(label)
    }
} 