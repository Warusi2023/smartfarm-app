package com.smartfarm.web

import androidx.compose.runtime.*
import com.smartfarm.web.ui.screens.DashboardScreen
import com.smartfarm.web.ui.theme.AppTheme
import org.jetbrains.compose.web.renderComposable
import org.jetbrains.compose.web.dom.*

fun main() {
    renderComposable(rootElementId = "root") {
        AppTheme {
            App()
        }
    }
}

@Composable
fun App() {
    var currentScreen by remember { mutableStateOf<Screen>(Screen.Dashboard) }
    
    Column {
        Header(
            currentScreen = currentScreen,
            onScreenChange = { screen -> currentScreen = screen }
        )
        
        when (currentScreen) {
            Screen.Dashboard -> DashboardScreen()
            Screen.Farms -> Text("Farms Screen")
            Screen.Crops -> Text("Crops Screen")
            Screen.Livestock -> Text("Livestock Screen")
            Screen.Analytics -> Text("Analytics Screen")
        }
    }
}

@Composable
fun Header(
    currentScreen: Screen,
    onScreenChange: (Screen) -> Unit
) {
    Header {
        Div(attrs = { classes("header") }) {
            H1(attrs = { classes("app-title") }) {
                Text("SmartFarm")
            }
            
            Nav(attrs = { classes("nav") }) {
                Ul(attrs = { classes("nav-list") }) {
                    Screen.values().forEach { screen ->
                        Li(attrs = { 
                            classes("nav-item", if (currentScreen == screen) "active" else "")
                        }) {
                            A(
                                attrs = { 
                                    classes("nav-link")
                                    onClick { onScreenChange(screen) }
                                }
                            ) {
                                Text(screen.title)
                            }
                        }
                    }
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
