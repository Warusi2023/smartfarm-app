package com.example.smartfarm

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import com.example.smartfarm.util.*
import com.example.smartfarm.data.model.User
import com.example.smartfarm.data.model.UserViewModel
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.window.Dialog
import kotlinx.coroutines.launch

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun SettingsScreen(
    userViewModel: UserViewModel,
    onNavigateToProfile: () -> Unit = {},
    onNavigateToPrivacyPolicy: () -> Unit = {},
    onNavigateToTermsOfService: () -> Unit = {},
    onNavigateToHelp: () -> Unit = {},
    onNavigateToAbout: () -> Unit = {},
    onLogout: () -> Unit = {}
) {
    val context = LocalContext.current
    val scope = rememberCoroutineScope()
    val uiStateManager = rememberUIStateManager()
    val errorHandler = rememberErrorHandler()
    
    var showLogoutDialog by remember { mutableStateOf(false) }
    var showClearDataDialog by remember { mutableStateOf(false) }
    var showExportDialog by remember { mutableStateOf(false) }
    var showImportDialog by remember { mutableStateOf(false) }
    
    // Settings state
    var notificationsEnabled by remember { mutableStateOf(true) }
    var locationEnabled by remember { mutableStateOf(true) }
    var autoSyncEnabled by remember { mutableStateOf(true) }
    var darkModeEnabled by remember { mutableStateOf(false) }
    var language by remember { mutableStateOf("English") }
    var units by remember { mutableStateOf("Metric") }
    
    val currentUser by userViewModel.currentUser.collectAsState()
    
    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Settings") },
                navigationIcon = {
                    IconButton(onClick = { /* Navigate back */ }) {
                        Icon(Icons.Default.ArrowBack, contentDescription = "Back")
                    }
                }
            )
        }
    ) { paddingValues ->
        LazyColumn(
            modifier = Modifier
                .fillMaxSize()
                .padding(paddingValues)
                .padding(16.dp),
            verticalArrangement = Arrangement.spacedBy(16.dp)
        ) {
            // Account Section
            item {
                SettingsSectionHeader("Account")
            }
            
            item {
                AccountCard(
                    user = currentUser,
                    onEditProfile = onNavigateToProfile
                )
            }
            
            // Preferences Section
            item {
                SettingsSectionHeader("Preferences")
            }
            
            item {
                PreferenceCard(
                    title = "Notifications",
                    subtitle = "Receive alerts and reminders",
                    icon = Icons.Default.Notifications,
                    isEnabled = notificationsEnabled,
                    onToggle = { notificationsEnabled = it }
                )
            }
            
            item {
                PreferenceCard(
                    title = "Location Services",
                    subtitle = "Use GPS for weather and mapping",
                    icon = Icons.Default.LocationOn,
                    isEnabled = locationEnabled,
                    onToggle = { locationEnabled = it }
                )
            }
            
            item {
                PreferenceCard(
                    title = "Auto Sync",
                    subtitle = "Automatically sync data with cloud",
                    icon = Icons.Default.Sync,
                    isEnabled = autoSyncEnabled,
                    onToggle = { autoSyncEnabled = it }
                )
            }
            
            item {
                PreferenceCard(
                    title = "Dark Mode",
                    subtitle = "Use dark theme",
                    icon = Icons.Default.DarkMode,
                    isEnabled = darkModeEnabled,
                    onToggle = { darkModeEnabled = it }
                )
            }
            
            // Language and Units
            item {
                LanguageUnitsCard(
                    language = language,
                    units = units,
                    onLanguageChange = { language = it },
                    onUnitsChange = { units = it }
                )
            }
            
            // Data Management Section
            item {
                SettingsSectionHeader("Data Management")
            }
            
            item {
                DataManagementCard(
                    onExport = { showExportDialog = true },
                    onImport = { showImportDialog = true },
                    onClearData = { showClearDataDialog = true },
                    onSync = {
                        scope.launch {
                            uiStateManager.setLoading(true)
                            try {
                                // TODO: Implement sync logic
                                kotlinx.coroutines.delay(2000) // Simulate sync
                                uiStateManager.setSuccess("Data synced successfully")
                            } catch (e: Exception) {
                                val error = ErrorHandler.handleException(e)
                                errorHandler.showErrorToast(error)
                            } finally {
                                uiStateManager.setLoading(false)
                            }
                        }
                    }
                )
            }
            
            // Support Section
            item {
                SettingsSectionHeader("Support")
            }
            
            item {
                SupportCard(
                    onHelp = onNavigateToHelp,
                    onAbout = onNavigateToAbout,
                    onPrivacyPolicy = onNavigateToPrivacyPolicy,
                    onTermsOfService = onNavigateToTermsOfService,
                    onContactSupport = {
                        CommonFunctions.navigateToExternalEmail(
                            context,
                            "support@smartfarm.com",
                            "SmartFarm Support Request",
                            "Please describe your issue here..."
                        )
                    }
                )
            }
            
            // Logout Section
            item {
                SettingsSectionHeader("Account")
            }
            
            item {
                LogoutCard(
                    onLogout = { showLogoutDialog = true }
                )
            }
            
            // App Info
            item {
                AppInfoCard()
            }
        }
    }
    
    // Dialogs
    if (showLogoutDialog) {
        LogoutDialog(
            onConfirm = {
                showLogoutDialog = false
                onLogout()
            },
            onDismiss = { showLogoutDialog = false }
        )
    }
    
    if (showClearDataDialog) {
        ClearDataDialog(
            onConfirm = {
                showClearDataDialog = false
                scope.launch {
                    uiStateManager.setLoading(true)
                    try {
                        // TODO: Implement clear data logic
                        kotlinx.coroutines.delay(1000)
                        uiStateManager.setSuccess("Data cleared successfully")
                    } catch (e: Exception) {
                        val error = ErrorHandler.handleException(e)
                        errorHandler.showErrorToast(error)
                    } finally {
                        uiStateManager.setLoading(false)
                    }
                }
            },
            onDismiss = { showClearDataDialog = false }
        )
    }
    
    if (showExportDialog) {
        ExportDialog(
            onExport = { format ->
                showExportDialog = false
                scope.launch {
                    uiStateManager.setLoading(true)
                    try {
                        // TODO: Implement export logic
                        kotlinx.coroutines.delay(2000)
                        uiStateManager.setSuccess("Data exported successfully")
                    } catch (e: Exception) {
                        val error = ErrorHandler.handleException(e)
                        errorHandler.showErrorToast(error)
                    } finally {
                        uiStateManager.setLoading(false)
                    }
                }
            },
            onDismiss = { showExportDialog = false }
        )
    }
    
    if (showImportDialog) {
        ImportDialog(
            onImport = { filePath ->
                showImportDialog = false
                scope.launch {
                    uiStateManager.setLoading(true)
                    try {
                        // TODO: Implement import logic
                        kotlinx.coroutines.delay(2000)
                        uiStateManager.setSuccess("Data imported successfully")
                    } catch (e: Exception) {
                        val error = ErrorHandler.handleException(e)
                        errorHandler.showErrorToast(error)
                    } finally {
                        uiStateManager.setLoading(false)
                    }
                }
            },
            onDismiss = { showImportDialog = false }
        )
    }
    
    // Loading and error states
    if (uiStateManager.isLoading.value) {
        LoadingStates.FullScreenLoading("Processing...")
    }
    
    uiStateManager.successMessage.value?.let { message ->
        LaunchedEffect(message) {
            kotlinx.coroutines.delay(3000)
            uiStateManager.clearSuccess()
        }
    }
}

@Composable
private fun SettingsSectionHeader(title: String) {
    Text(
        text = title,
        style = MaterialTheme.typography.titleMedium,
        fontWeight = FontWeight.Bold,
        color = MaterialTheme.colorScheme.primary,
        modifier = Modifier.padding(vertical = 8.dp)
    )
}

@Composable
private fun AccountCard(
    user: User?,
    onEditProfile: () -> Unit
) {
    Card(
        modifier = Modifier.fillMaxWidth()
    ) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(16.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            // Avatar
            Surface(
                modifier = Modifier.size(48.dp),
                shape = MaterialTheme.shapes.medium,
                color = MaterialTheme.colorScheme.primaryContainer
            ) {
                Box(
                    modifier = Modifier.fillMaxSize(),
                    contentAlignment = Alignment.Center
                ) {
                    Icon(
                        Icons.Default.Person,
                        contentDescription = "Profile",
                        tint = MaterialTheme.colorScheme.onPrimaryContainer
                    )
                }
            }
            
            Spacer(modifier = Modifier.width(16.dp))
            
            // User info
            Column(modifier = Modifier.weight(1f)) {
                Text(
                    text = "${user?.firstName ?: ""} ${user?.lastName ?: ""}".trim().ifEmpty { "Guest User" },
                    style = MaterialTheme.typography.titleMedium,
                    fontWeight = FontWeight.Medium
                )
                Text(
                    text = user?.email ?: "guest@smartfarm.com",
                    style = MaterialTheme.typography.bodyMedium,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )
                Text(
                    text = user?.role?.name ?: "User",
                    style = MaterialTheme.typography.bodySmall,
                    color = MaterialTheme.colorScheme.primary
                )
            }
            
            IconButton(onClick = onEditProfile) {
                Icon(Icons.Default.Edit, contentDescription = "Edit Profile")
            }
        }
    }
}

@Composable
private fun PreferenceCard(
    title: String,
    subtitle: String,
    icon: androidx.compose.ui.graphics.vector.ImageVector,
    isEnabled: Boolean,
    onToggle: (Boolean) -> Unit
) {
    Card(
        modifier = Modifier.fillMaxWidth()
    ) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(16.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Icon(
                icon,
                contentDescription = null,
                tint = MaterialTheme.colorScheme.primary,
                modifier = Modifier.size(24.dp)
            )
            
            Spacer(modifier = Modifier.width(16.dp))
            
            Column(modifier = Modifier.weight(1f)) {
                Text(
                    text = title,
                    style = MaterialTheme.typography.titleSmall,
                    fontWeight = FontWeight.Medium
                )
                Text(
                    text = subtitle,
                    style = MaterialTheme.typography.bodySmall,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )
            }
            
            Switch(
                checked = isEnabled,
                onCheckedChange = onToggle
            )
        }
    }
}

@Composable
private fun LanguageUnitsCard(
    language: String,
    units: String,
    onLanguageChange: (String) -> Unit,
    onUnitsChange: (String) -> Unit
) {
    Card(
        modifier = Modifier.fillMaxWidth()
    ) {
        Column(
            modifier = Modifier.padding(16.dp)
        ) {
            Text(
                text = "Language & Units",
                style = MaterialTheme.typography.titleSmall,
                fontWeight = FontWeight.Medium
            )
            
            Spacer(modifier = Modifier.height(12.dp))
            
            // Language
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Text(
                    text = "Language",
                    style = MaterialTheme.typography.bodyMedium
                )
                DropdownMenu(
                    expanded = false,
                    onDismissRequest = { },
                    modifier = Modifier.width(120.dp)
                ) {
                    listOf("English", "Spanish", "French", "German").forEach { lang ->
                        DropdownMenuItem(
                            text = { Text(lang) },
                            onClick = { onLanguageChange(lang) }
                        )
                    }
                }
            }
            
            Spacer(modifier = Modifier.height(8.dp))
            
            // Units
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Text(
                    text = "Units",
                    style = MaterialTheme.typography.bodyMedium
                )
                DropdownMenu(
                    expanded = false,
                    onDismissRequest = { },
                    modifier = Modifier.width(120.dp)
                ) {
                    listOf("Metric", "Imperial").forEach { unit ->
                        DropdownMenuItem(
                            text = { Text(unit) },
                            onClick = { onUnitsChange(unit) }
                        )
                    }
                }
            }
        }
    }
}

@Composable
private fun DataManagementCard(
    onExport: () -> Unit,
    onImport: () -> Unit,
    onClearData: () -> Unit,
    onSync: () -> Unit
) {
    Card(
        modifier = Modifier.fillMaxWidth()
    ) {
        Column(
            modifier = Modifier.padding(16.dp)
        ) {
            Text(
                text = "Data Management",
                style = MaterialTheme.typography.titleSmall,
                fontWeight = FontWeight.Medium
            )
            
            Spacer(modifier = Modifier.height(12.dp))
            
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceEvenly
            ) {
                DataActionButton(
                    icon = Icons.Default.Upload,
                    label = "Export",
                    onClick = onExport
                )
                DataActionButton(
                    icon = Icons.Default.Download,
                    label = "Import",
                    onClick = onImport
                )
                DataActionButton(
                    icon = Icons.Default.Sync,
                    label = "Sync",
                    onClick = onSync
                )
                DataActionButton(
                    icon = Icons.Default.Delete,
                    label = "Clear",
                    onClick = onClearData
                )
            }
        }
    }
}

@Composable
private fun DataActionButton(
    icon: androidx.compose.ui.graphics.vector.ImageVector,
    label: String,
    onClick: () -> Unit
) {
    Column(
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        IconButton(
            onClick = onClick,
            modifier = Modifier.size(48.dp)
        ) {
            Icon(
                icon,
                contentDescription = label,
                tint = MaterialTheme.colorScheme.primary
            )
        }
        Text(
            text = label,
            style = MaterialTheme.typography.bodySmall,
            textAlign = TextAlign.Center
        )
    }
}

@Composable
private fun SupportCard(
    onHelp: () -> Unit,
    onAbout: () -> Unit,
    onPrivacyPolicy: () -> Unit,
    onTermsOfService: () -> Unit,
    onContactSupport: () -> Unit
) {
    Card(
        modifier = Modifier.fillMaxWidth()
    ) {
        Column(
            modifier = Modifier.padding(16.dp)
        ) {
            SupportItem(
                icon = Icons.Default.Help,
                title = "Help & FAQ",
                onClick = onHelp
            )
            SupportItem(
                icon = Icons.Default.Info,
                title = "About SmartFarm",
                onClick = onAbout
            )
            SupportItem(
                icon = Icons.Default.PrivacyTip,
                title = "Privacy Policy",
                onClick = onPrivacyPolicy
            )
            SupportItem(
                icon = Icons.Default.Description,
                title = "Terms of Service",
                onClick = onTermsOfService
            )
            SupportItem(
                icon = Icons.Default.Email,
                title = "Contact Support",
                onClick = onContactSupport
            )
        }
    }
}

@Composable
private fun SupportItem(
    icon: androidx.compose.ui.graphics.vector.ImageVector,
    title: String,
    onClick: () -> Unit
) {
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .padding(vertical = 8.dp),
        verticalAlignment = Alignment.CenterVertically
    ) {
        Icon(
            icon,
            contentDescription = null,
            tint = MaterialTheme.colorScheme.primary,
            modifier = Modifier.size(20.dp)
        )
        
        Spacer(modifier = Modifier.width(12.dp))
        
        Text(
            text = title,
            style = MaterialTheme.typography.bodyMedium,
            modifier = Modifier.weight(1f)
        )
        
        Icon(
            Icons.Default.ChevronRight,
            contentDescription = null,
            tint = MaterialTheme.colorScheme.onSurfaceVariant
        )
    }
}

@Composable
private fun LogoutCard(
    onLogout: () -> Unit
) {
    Card(
        modifier = Modifier.fillMaxWidth(),
        colors = CardDefaults.cardColors(
            containerColor = MaterialTheme.colorScheme.errorContainer
        )
    ) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(16.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Icon(
                Icons.Default.Logout,
                contentDescription = null,
                tint = MaterialTheme.colorScheme.error,
                modifier = Modifier.size(24.dp)
            )
            
            Spacer(modifier = Modifier.width(16.dp))
            
            Text(
                text = "Logout",
                style = MaterialTheme.typography.titleMedium,
                fontWeight = FontWeight.Medium,
                color = MaterialTheme.colorScheme.error,
                modifier = Modifier.weight(1f)
            )
            
            IconButton(onClick = onLogout) {
                Icon(
                    Icons.Default.ChevronRight,
                    contentDescription = "Logout",
                    tint = MaterialTheme.colorScheme.error
                )
            }
        }
    }
}

@Composable
private fun AppInfoCard() {
    Card(
        modifier = Modifier.fillMaxWidth()
    ) {
        Column(
            modifier = Modifier.padding(16.dp),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            Text(
                text = "SmartFarm",
                style = MaterialTheme.typography.titleMedium,
                fontWeight = FontWeight.Bold
            )
            Text(
                text = "Version 1.0.0",
                style = MaterialTheme.typography.bodySmall,
                color = MaterialTheme.colorScheme.onSurfaceVariant
            )
            Text(
                text = "© 2024 SmartFarm. All rights reserved.",
                style = MaterialTheme.typography.bodySmall,
                color = MaterialTheme.colorScheme.onSurfaceVariant,
                textAlign = TextAlign.Center
            )
        }
    }
}

@Composable
private fun LogoutDialog(
    onConfirm: () -> Unit,
    onDismiss: () -> Unit
) {
    AlertDialog(
        onDismissRequest = onDismiss,
        title = { Text("Logout") },
        text = { Text("Are you sure you want to logout?") },
        confirmButton = {
            TextButton(onClick = onConfirm) {
                Text("Logout")
            }
        },
        dismissButton = {
            TextButton(onClick = onDismiss) {
                Text("Cancel")
            }
        }
    )
}

@Composable
private fun ClearDataDialog(
    onConfirm: () -> Unit,
    onDismiss: () -> Unit
) {
    AlertDialog(
        onDismissRequest = onDismiss,
        title = { Text("Clear All Data") },
        text = { Text("This will permanently delete all your farm data. This action cannot be undone.") },
        confirmButton = {
            TextButton(
                onClick = onConfirm,
                colors = ButtonDefaults.textButtonColors(
                    contentColor = MaterialTheme.colorScheme.error
                )
            ) {
                Text("Clear Data")
            }
        },
        dismissButton = {
            TextButton(onClick = onDismiss) {
                Text("Cancel")
            }
        }
    )
}

@Composable
private fun ExportDialog(
    onExport: (String) -> Unit,
    onDismiss: () -> Unit
) {
    var selectedFormat by remember { mutableStateOf("CSV") }
    
    AlertDialog(
        onDismissRequest = onDismiss,
        title = { Text("Export Data") },
        text = {
            Column {
                Text("Choose export format:")
                Spacer(modifier = Modifier.height(8.dp))
                listOf("CSV", "JSON", "PDF", "Excel").forEach { format ->
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        RadioButton(
                            selected = selectedFormat == format,
                            onClick = { selectedFormat = format }
                        )
                        Text(format)
                    }
                }
            }
        },
        confirmButton = {
            TextButton(onClick = { onExport(selectedFormat) }) {
                Text("Export")
            }
        },
        dismissButton = {
            TextButton(onClick = onDismiss) {
                Text("Cancel")
            }
        }
    )
}

@Composable
private fun ImportDialog(
    onImport: (String) -> Unit,
    onDismiss: () -> Unit
) {
    AlertDialog(
        onDismissRequest = onDismiss,
        title = { Text("Import Data") },
        text = { Text("Select a file to import your farm data.") },
        confirmButton = {
            TextButton(onClick = { onImport("") }) {
                Text("Select File")
            }
        },
        dismissButton = {
            TextButton(onClick = onDismiss) {
                Text("Cancel")
            }
        }
    )
} 