package com.smartfarm.ui.navigation

import androidx.compose.foundation.layout.padding
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.navigation.NavDestination.Companion.hierarchy
import androidx.navigation.NavGraph.Companion.findStartDestination
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.currentBackStackEntryAsState
import androidx.navigation.compose.rememberNavController
import androidx.navigation.navArgument
import com.smartfarm.ui.screens.*
import com.smartfarm.shared.ui.viewmodel.AuthViewModel
import org.koin.compose.viewmodel.viewModel

sealed class Screen(val route: String, val title: String, val icon: androidx.compose.ui.graphics.vector.ImageVector) {
    object Login : Screen("login", "Login", Icons.Default.Login)
    object Register : Screen("register", "Register", Icons.Default.PersonAdd)
    object Dashboard : Screen("dashboard", "Dashboard", Icons.Default.Home)
    object Crops : Screen("crops", "Crops", Icons.Default.Crop)
    object Livestock : Screen("livestock", "Livestock", Icons.Default.Pets)
    object Tasks : Screen("tasks", "Tasks", Icons.Default.CheckCircle)
    object Inventory : Screen("inventory", "Inventory", Icons.Default.Inventory)
    object Reports : Screen("reports", "Reports", Icons.Default.Analytics)
    object WeatherAlerts : Screen("weather_alerts", "Weather Alerts", Icons.Default.Warning)
    object WeatherAlertDetail : Screen("weather_alert_detail/{alertId}", "Alert Details", Icons.Default.Info) {
        fun createRoute(alertId: String) = "weather_alert_detail/$alertId"
    }
}

@Composable
fun MainNavigation() {
    val navController = rememberNavController()
    val authViewModel: AuthViewModel = viewModel()
    val isLoggedIn by authViewModel.isLoggedIn.collectAsState()
    
    // Determine start destination based on auth state
    val startDestination = if (isLoggedIn) {
        Screen.Dashboard.route
    } else {
        Screen.Login.route
    }
    
    LaunchedEffect(isLoggedIn) {
        if (isLoggedIn) {
            // Navigate to dashboard if logged in
            navController.navigate(Screen.Dashboard.route) {
                popUpTo(Screen.Login.route) { inclusive = true }
            }
        } else {
            // Navigate to login if logged out
            navController.navigate(Screen.Login.route) {
                popUpTo(0) { inclusive = true }
            }
        }
    }
    
    NavHost(
        navController = navController,
        startDestination = startDestination
    ) {
        composable(Screen.Login.route) {
            LoginScreen(
                onLoginSuccess = {
                    navController.navigate(Screen.Dashboard.route) {
                        popUpTo(Screen.Login.route) { inclusive = true }
                    }
                },
                onNavigateToRegister = {
                    navController.navigate(Screen.Register.route)
                }
            )
        }
        
        composable(Screen.Register.route) {
            RegisterScreen(
                onRegisterSuccess = {
                    navController.navigate(Screen.Dashboard.route) {
                        popUpTo(Screen.Register.route) { inclusive = true }
                    }
                },
                onNavigateToLogin = {
                    navController.popBackStack()
                }
            )
        }
        
        composable(Screen.Dashboard.route) {
            MainAppScaffold(navController = navController) {
                DashboardScreen(
                    onNavigateToAlerts = {
                        navController.navigate(Screen.WeatherAlerts.route)
                    }
                )
            }
        }
        
        composable(Screen.Crops.route) {
            MainAppScaffold(navController = navController) {
                CropsScreen()
            }
        }
        
        composable(Screen.Livestock.route) {
            MainAppScaffold(navController = navController) {
                LivestockScreen()
            }
        }
        
        composable(Screen.Tasks.route) {
            MainAppScaffold(navController = navController) {
                TasksScreen()
            }
        }
        
        composable(Screen.Inventory.route) {
            MainAppScaffold(navController = navController) {
                InventoryScreen()
            }
        }
        
        composable(Screen.Reports.route) {
            MainAppScaffold(navController = navController) {
                ReportsScreen()
            }
        }
        
        composable(Screen.WeatherAlerts.route) {
            MainAppScaffold(navController = navController) {
                WeatherAlertsScreen(
                    onAlertClick = { alertId ->
                        navController.navigate(Screen.WeatherAlertDetail.createRoute(alertId))
                    }
                )
            }
        }
        
        composable(
            route = Screen.WeatherAlertDetail.route,
            arguments = listOf(navArgument("alertId") { type = androidx.navigation.NavType.StringType })
        ) { backStackEntry ->
            val alertId = backStackEntry.arguments?.getString("alertId") ?: ""
            MainAppScaffold(navController = navController) {
                WeatherAlertDetailScreen(
                    alertId = alertId,
                    onBack = { navController.popBackStack() }
                )
            }
        }
    }
}

@Composable
private fun MainAppScaffold(
    navController: androidx.navigation.NavController,
    content: @Composable () -> Unit
) {
    val authViewModel: AuthViewModel = viewModel()
    
    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("SmartFarm") },
                actions = {
                    IconButton(onClick = { authViewModel.logout() }) {
                        Icon(Icons.Default.Logout, contentDescription = "Logout")
                    }
                }
            )
        },
        bottomBar = {
            NavigationBar {
                val navBackStackEntry by navController.currentBackStackEntryAsState()
                val currentDestination = navBackStackEntry?.destination
                
                val screens = listOf(
                    Screen.Dashboard,
                    Screen.Crops,
                    Screen.Livestock,
                    Screen.Tasks,
                    Screen.Reports
                )
                
                screens.forEach { screen ->
                    NavigationBarItem(
                        icon = { Icon(screen.icon, contentDescription = screen.title) },
                        label = { Text(screen.title) },
                        selected = currentDestination?.hierarchy?.any { it.route == screen.route } == true,
                        onClick = {
                            navController.navigate(screen.route) {
                                popUpTo(navController.graph.findStartDestination().id) {
                                    saveState = true
                                }
                                launchSingleTop = true
                                restoreState = true
                            }
                        }
                    )
                }
            }
        }
    ) { padding ->
        Box(modifier = Modifier.padding(padding)) {
            content()
        }
    }
}

