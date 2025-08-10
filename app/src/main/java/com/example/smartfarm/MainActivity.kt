package com.example.smartfarm

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import com.example.smartfarm.auth.AuthenticationManager
import com.example.smartfarm.auth.LoginScreen
import com.example.smartfarm.auth.LoginViewModel
import com.example.smartfarm.backup.DataBackupManager
import com.example.smartfarm.data.database.FarmDatabase
import com.example.smartfarm.error.ErrorHandler
import com.example.smartfarm.network.NetworkManager

import com.example.smartfarm.util.NavigationUtils
import kotlinx.coroutines.flow.collectAsState
import androidx.compose.ui.unit.dp

class MainActivity : ComponentActivity() {
    
    private lateinit var authenticationManager: AuthenticationManager
    private lateinit var networkManager: NetworkManager
    private lateinit var errorHandler: ErrorHandler
    private lateinit var backupManager: DataBackupManager
    private lateinit var database: FarmDatabase
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        
        // Initialize dependencies
        initializeDependencies()
        
        setContent {
            Surface(
                modifier = Modifier.fillMaxSize(),
                color = MaterialTheme.colorScheme.background
            ) {
                SmartFarmApp(
                    authenticationManager = authenticationManager,
                    networkManager = networkManager,
                    errorHandler = errorHandler,
                    backupManager = backupManager,
                    database = database
                )
            }
        }
    }
    
    private fun initializeDependencies() {
        // Initialize database
        database = FarmDatabase.getDatabase(applicationContext)
        
        // Initialize network manager first
        networkManager = NetworkManager(applicationContext, database)
        
        // Initialize error handler
        errorHandler = ErrorHandler(applicationContext, networkManager)
        
        // Initialize authentication manager
        authenticationManager = AuthenticationManager(applicationContext, database.userDao())
        
        // Initialize backup manager
        backupManager = DataBackupManager(applicationContext, database)
    }
    
    override fun onDestroy() {
        super.onDestroy()
        // Clean up network manager
        networkManager.unregisterNetworkCallback()
    }
}

@Composable
fun SmartFarmApp(
    authenticationManager: AuthenticationManager,
    networkManager: NetworkManager,
    errorHandler: ErrorHandler,
    backupManager: DataBackupManager,
    database: FarmDatabase
) {
    val navController = rememberNavController()
    val isAuthenticated by authenticationManager.isAuthenticated.collectAsState()
    val currentUser by authenticationManager.currentUser.collectAsState()
    
    // Observe network status
    val isOnline by networkManager.isOnline.collectAsState()
    val connectionType by networkManager.connectionType.collectAsState()
    
    // Show network status indicator
    if (!isOnline) {
        LaunchedEffect(Unit) {
            // Show offline notification
        }
    }
    
    NavHost(
        navController = navController,
        startDestination = if (isAuthenticated) "main" else "auth"
    ) {
        // Authentication flow
        composable("auth") {
            AuthScreen(
                onLoginSuccess = {
                    navController.navigate("main") {
                        popUpTo("auth") { inclusive = true }
                    }
                },
                onRegisterSuccess = {
                    navController.navigate("main") {
                        popUpTo("auth") { inclusive = true }
                    }
                },
                authenticationManager = authenticationManager,
                errorHandler = errorHandler
            )
        }
        
        // Main app flow
        composable("main") {
            MainAppScreen(
                currentUser = currentUser,
                onLogout = {
                    authenticationManager.logout()
                    navController.navigate("auth") {
                        popUpTo("main") { inclusive = true }
                    }
                },
                networkManager = networkManager,
                errorHandler = errorHandler,
                backupManager = backupManager,
                database = database
            )
        }
        
        // Settings and profile screens
        composable("settings") {
            SettingsScreen(
                currentUser = currentUser,
                onNavigateBack = { navController.popBackStack() },
                backupManager = backupManager,
                networkManager = networkManager
            )
        }
        
        composable("profile") {
            ProfileScreen(
                currentUser = currentUser,
                onNavigateBack = { navController.popBackStack() },
                authenticationManager = authenticationManager,
                errorHandler = errorHandler
            )
        }
        
        // Add other screens here
        // TODO: Add navigation routes for other screens
    }
}

@Composable
fun AuthScreen(
    onLoginSuccess: () -> Unit,
    onRegisterSuccess: () -> Unit,
    authenticationManager: AuthenticationManager,
    errorHandler: ErrorHandler
) {
    var showLogin by remember { mutableStateOf(true) }
    
    if (showLogin) {
        val loginViewModel: LoginViewModel = viewModel()
        LoginScreen(
            viewModel = loginViewModel,
            onNavigateToRegister = { showLogin = false },
            onNavigateToMain = onLoginSuccess
        )
    } else {
        // TODO: Implement RegisterScreen
        Text("Register screen not implemented yet")
    }
}

@Composable
fun MainAppScreen(
    currentUser: com.example.smartfarm.data.model.User?,
    onLogout: () -> Unit,
    networkManager: NetworkManager,
    errorHandler: ErrorHandler,
    backupManager: DataBackupManager,
    database: FarmDatabase
) {
    // Main app content - this will be your existing app screens
    // For now, showing a simple dashboard
    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp)
    ) {
        Text(
            text = "Welcome, ${currentUser?.firstName ?: "User"}!",
            style = MaterialTheme.typography.headlineMedium
        )
        
        Spacer(modifier = Modifier.height(16.dp))
        
        // Network status
        val isOnline by networkManager.isOnline.collectAsState()
        val connectionType by networkManager.connectionType.collectAsState()
        
        Card(
            modifier = Modifier.fillMaxWidth()
        ) {
            Column(
                modifier = Modifier.padding(16.dp)
            ) {
                Text(
                    text = "Network Status",
                    style = MaterialTheme.typography.titleMedium
                )
                Text(
                    text = if (isOnline) "Online (${connectionType.name})" else "Offline",
                    color = if (isOnline) MaterialTheme.colorScheme.primary else MaterialTheme.colorScheme.error
                )
            }
        }
        
        Spacer(modifier = Modifier.height(16.dp))
        
        // Logout button
        Button(
            onClick = onLogout,
            modifier = Modifier.fillMaxWidth()
        ) {
            Text("Logout")
        }
    }
}

@Composable
fun SettingsScreen(
    currentUser: com.example.smartfarm.data.model.User?,
    onNavigateBack: () -> Unit,
    backupManager: DataBackupManager,
    networkManager: NetworkManager
) {
    // Settings screen implementation
    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp)
    ) {
        Text(
            text = "Settings",
            style = MaterialTheme.typography.headlineMedium
        )
        
        Spacer(modifier = Modifier.height(16.dp))
        
        // Backup settings
        Card(
            modifier = Modifier.fillMaxWidth()
        ) {
            Column(
                modifier = Modifier.padding(16.dp)
            ) {
                Text(
                    text = "Backup & Restore",
                    style = MaterialTheme.typography.titleMedium
                )
                
                Spacer(modifier = Modifier.height(8.dp))
                
                Button(
                    onClick = {
                        // TODO: Implement backup
                    }
                ) {
                    Text("Create Backup")
                }
                
                Spacer(modifier = Modifier.height(8.dp))
                
                Button(
                    onClick = {
                        // TODO: Implement restore
                    }
                ) {
                    Text("Restore from Backup")
                }
            }
        }
        
        Spacer(modifier = Modifier.height(16.dp))
        
        // Back button
        Button(
            onClick = onNavigateBack
        ) {
            Text("Back")
        }
    }
}

@Composable
fun ProfileScreen(
    currentUser: com.example.smartfarm.data.model.User?,
    onNavigateBack: () -> Unit,
    authenticationManager: AuthenticationManager,
    errorHandler: ErrorHandler
) {
    // Profile screen implementation
    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp)
    ) {
        Text(
            text = "Profile",
            style = MaterialTheme.typography.headlineMedium
        )
        
        Spacer(modifier = Modifier.height(16.dp))
        
        currentUser?.let { user ->
            Card(
                modifier = Modifier.fillMaxWidth()
            ) {
                Column(
                    modifier = Modifier.padding(16.dp)
                ) {
                    Text(
                        text = "${user.firstName} ${user.lastName}",
                        style = MaterialTheme.typography.titleLarge
                    )
                    
                    Text(
                        text = user.email,
                        style = MaterialTheme.typography.bodyMedium
                    )
                    
                    Text(
                        text = "Role: ${user.role.name}",
                        style = MaterialTheme.typography.bodyMedium
                    )
                }
            }
        }
        
        Spacer(modifier = Modifier.height(16.dp))
        
        // Back button
        Button(
            onClick = onNavigateBack
        ) {
            Text("Back")
        }
    }
}
