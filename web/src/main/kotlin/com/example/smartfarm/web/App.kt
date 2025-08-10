package com.example.smartfarm.web

import androidx.compose.runtime.*
import androidx.compose.web.css.*
import androidx.compose.web.dom.*
import androidx.compose.web.renderComposable
import com.example.smartfarm.web.ui.navigation.Navigation
import com.example.smartfarm.web.ui.localization.LanguageSelector
import com.example.smartfarm.web.ui.screens.HomeScreen
import com.example.smartfarm.web.ui.screens.LivestockScreen
import com.example.smartfarm.web.ui.screens.CropsScreen
import com.example.smartfarm.web.ui.screens.WeatherScreen
import com.example.smartfarm.web.ui.screens.ReportsScreen
import com.example.smartfarm.web.ui.screens.SettingsScreen
import com.example.smartfarm.web.ui.screens.FinancialScreen
import com.example.smartfarm.web.ui.screens.TasksScreen
import com.example.smartfarm.web.ui.screens.ExpertChatScreen
import com.example.smartfarm.web.ui.screens.AnalyticsScreen
import com.example.smartfarm.web.ui.screens.InventoryScreen
import com.example.smartfarm.web.ui.screens.EmployeesScreen
import com.example.smartfarm.web.ui.screens.MarketPricesScreen
import com.example.smartfarm.web.ui.screens.DocumentManagementScreen
import com.example.smartfarm.web.ui.screens.AdvancedAnalyticsScreen

@Composable
fun App() {
    var currentScreen by remember { mutableStateOf("home") }
    
    Div({
        style {
            display(DisplayStyle.Flex)
            flexDirection(FlexDirection.Column)
            minHeight(100.vh)
            fontFamily("Inter", "system-ui", "sans-serif")
        }
    }) {
        // Header
        Header(currentScreen) { screen ->
            currentScreen = screen
        }
        
        // Main Content
        Main({
            style {
                flex(1)
                padding(32.px, 0.px)
                backgroundColor(Color("#F5F5F5"))
            }
        }) {
            when (currentScreen) {
                "home" -> HomeScreen()
                "livestock" -> LivestockScreen()
                "crops" -> CropsScreen()
                "weather" -> WeatherScreen()
                "reports" -> ReportsScreen()
                "settings" -> SettingsScreen()
                "financial" -> FinancialScreen()
                "tasks" -> TasksScreen()
                "expert-chat" -> ExpertChatScreen()
                "analytics" -> AnalyticsScreen()
                "advanced-analytics" -> AdvancedAnalyticsScreen()
                "inventory" -> InventoryScreen()
                "employees" -> EmployeesScreen()
                "market-prices" -> MarketPricesScreen()
                "documents" -> DocumentManagementScreen()
                else -> HomeScreen()
            }
        }
        
        // Footer
        Footer()
    }
}

@Composable
private fun Header(currentScreen: String, onScreenChange: (String) -> Unit) {
    Header({
        style {
            backgroundColor(Color("#FFFFFF"))
            borderBottom(1.px, LineStyle.Solid, Color("#E0E0E0"))
            padding(16.px, 0.px)
            position(Position.Sticky)
            top(0.px)
            zIndex(100)
            boxShadow(0.px, 2.px, 4.px, Color("rgba(0,0,0,0.1)"))
        }
    }) {
        Div({
            style {
                maxWidth(1200.px)
                margin(0.px, LinearDimension.auto)
                padding(0.px, 16.px)
                display(DisplayStyle.Flex)
                justifyContent(JustifyContent.SpaceBetween)
                alignItems(Align.Center)
            }
        }) {
            // Logo
            H1({
                style {
                    fontSize(24.px)
                    fontWeight(700)
                    color(Color("#4CAF50"))
                    margin(0.px)
                }
            }) {
                Text("SmartFarm")
            }
            
            // Navigation and Language Selector
            Div({
                style {
                    display(DisplayStyle.Flex)
                    alignItems(Align.Center)
                    gap(16.px)
                }
            }) {
                // Navigation
                Navigation(currentScreen, onScreenChange)
                
                // Language Selector
                LanguageSelector()
            }
        }
    }
}

@Composable
private fun Main(content: @Composable () -> Unit) {
    Main({
        style {
            flex(1)
            padding(32.px, 0.px)
            backgroundColor(Color("#F5F5F5"))
        }
    }) {
        Div({
            style {
                maxWidth(1200.px)
                margin(0.px, LinearDimension.auto)
                padding(0.px, 16.px)
            }
        }) {
            content()
        }
    }
}

@Composable
private fun Footer() {
    Footer({
        style {
            backgroundColor(Color("#F5F5F5"))
            padding(32.px, 0.px)
            marginTop(LinearDimension.auto)
            borderTop(1.px, LineStyle.Solid, Color("#E0E0E0"))
        }
    }) {
        Div({
            style {
                maxWidth(1200.px)
                margin(0.px, LinearDimension.auto)
                padding(0.px, 16.px)
                textAlign(TextAlign.Center)
                color(Color("#757575"))
            }
        }) {
            P {
                Text("© 2024 SmartFarm. All rights reserved.")
            }
            P {
                Text("Intelligent Farm Management Solution")
            }
        }
    }
} 