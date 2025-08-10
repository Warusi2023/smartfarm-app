package com.example.smartfarm

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.foundation.clickable
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.ImeAction
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.text.input.PasswordVisualTransformation
import androidx.compose.ui.text.input.VisualTransformation
import androidx.compose.ui.unit.dp
import com.example.smartfarm.util.*
import com.example.smartfarm.data.model.User
import com.example.smartfarm.data.model.UserViewModel
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.style.TextAlign
import kotlinx.coroutines.launch

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun ProfileScreen(
    userViewModel: UserViewModel,
    onNavigateBack: () -> Unit = {},
    onNavigateToSettings: () -> Unit = {}
) {
    val context = LocalContext.current
    val scope = rememberCoroutineScope()
    val uiStateManager = rememberUIStateManager()
    val errorHandler = rememberErrorHandler()
    val validationUtils = remember { ValidationUtils }
    
    var showEditMode by remember { mutableStateOf(false) }
    var showChangePasswordDialog by remember { mutableStateOf(false) }
    var showDeleteAccountDialog by remember { mutableStateOf(false) }
    var showAvatarPicker by remember { mutableStateOf(false) }
    
    val currentUser by userViewModel.currentUser.collectAsState()
    
    // Form state
    var firstName by remember { mutableStateOf(currentUser?.firstName ?: "") }
    var lastName by remember { mutableStateOf(currentUser?.lastName ?: "") }
    var email by remember { mutableStateOf(currentUser?.email ?: "") }
    var phone by remember { mutableStateOf(currentUser?.phoneNumber ?: "") }
    var farmName by remember { mutableStateOf("") }
    var farmSize by remember { mutableStateOf("") }
    var location by remember { mutableStateOf("") }
    
    // Validation state
    var firstNameError by remember { mutableStateOf<String?>(null) }
    var lastNameError by remember { mutableStateOf<String?>(null) }
    var emailError by remember { mutableStateOf<String?>(null) }
    var phoneError by remember { mutableStateOf<String?>(null) }
    var farmNameError by remember { mutableStateOf<String?>(null) }
    var farmSizeError by remember { mutableStateOf<String?>(null) }
    
    LaunchedEffect(currentUser) {
        currentUser?.let { user ->
            firstName = user.firstName ?: ""
            lastName = user.lastName ?: ""
            email = user.email ?: ""
            phone = user.phoneNumber ?: ""
            // Load farm information from user model
            farmName = user.farmName ?: ""
            farmSize = user.farmSize?.toString() ?: ""
            location = user.farmLocation ?: ""
        }
    }
    
    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Profile") },
                navigationIcon = {
                    IconButton(onClick = onNavigateBack) {
                        Icon(Icons.Default.ArrowBack, contentDescription = "Back")
                    }
                },
                actions = {
                    if (showEditMode) {
                        IconButton(
                            onClick = {
                                // Validate and save
                                val firstNameValidation = validationUtils.validateRequired(firstName, "First Name")
                                val lastNameValidation = validationUtils.validateRequired(lastName, "Last Name")
                                val emailValidation = validationUtils.validateEmail(email)
                                val phoneValidation = validationUtils.validatePhoneNumber(phone)
                                val farmNameValidation = validationUtils.validateRequired(farmName, "Farm Name")
                                val farmSizeValidation = validationUtils.validatePositiveNumber(farmSize, "Farm Size")
                                
                                firstNameError = validationUtils.getErrorMessage(firstNameValidation)
                                lastNameError = validationUtils.getErrorMessage(lastNameValidation)
                                emailError = validationUtils.getErrorMessage(emailValidation)
                                phoneError = validationUtils.getErrorMessage(phoneValidation)
                                farmNameError = validationUtils.getErrorMessage(farmNameValidation)
                                farmSizeError = validationUtils.getErrorMessage(farmSizeValidation)
                                
                                if (validationUtils.isSuccess(firstNameValidation) &&
                                    validationUtils.isSuccess(lastNameValidation) &&
                                    validationUtils.isSuccess(emailValidation) &&
                                    validationUtils.isSuccess(phoneValidation) &&
                                    validationUtils.isSuccess(farmNameValidation) &&
                                    validationUtils.isSuccess(farmSizeValidation)
                                ) {
                                    scope.launch {
                                        uiStateManager.setLoading(true)
                                        try {
                                            val updatedUser = currentUser?.copy(
                                                firstName = firstName,
                                                lastName = lastName,
                                                email = email,
                                                phoneNumber = phone,
                                                farmName = farmName,
                                                farmSize = farmSize.toDoubleOrNull(),
                                                farmLocation = location
                                            )
                                            updatedUser?.let { user ->
                                                userViewModel.updateUser(user)
                                            }
                                            uiStateManager.setSuccess("Profile updated successfully")
                                            showEditMode = false
                                        } catch (e: Exception) {
                                            val error = ErrorHandler.handleException(e)
                                            errorHandler.showErrorToast(error)
                                        } finally {
                                            uiStateManager.setLoading(false)
                                        }
                                    }
                                }
                            }
                        ) {
                            Icon(Icons.Default.Check, contentDescription = "Save")
                        }
                    } else {
                        IconButton(onClick = { showEditMode = true }) {
                            Icon(Icons.Default.Edit, contentDescription = "Edit")
                        }
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
            // Profile Header
            item {
                ProfileHeader(
                    user = currentUser,
                    showEditMode = showEditMode,
                    onAvatarClick = { showAvatarPicker = true }
                )
            }
            
            // Personal Information
            item {
                ProfileSectionHeader("Personal Information")
            }
            
            item {
                ProfileField(
                    label = "First Name",
                    value = firstName,
                    onValueChange = { 
                        firstName = it
                        firstNameError = null
                    },
                    error = firstNameError,
                    enabled = showEditMode,
                    icon = Icons.Default.Person,
                    keyboardOptions = KeyboardOptions(
                        keyboardType = KeyboardType.Text,
                        imeAction = ImeAction.Next
                    )
                )
            }
            
            item {
                ProfileField(
                    label = "Last Name",
                    value = lastName,
                    onValueChange = { 
                        lastName = it
                        lastNameError = null
                    },
                    error = lastNameError,
                    enabled = showEditMode,
                    icon = Icons.Default.Person,
                    keyboardOptions = KeyboardOptions(
                        keyboardType = KeyboardType.Text,
                        imeAction = ImeAction.Next
                    )
                )
            }
            
            item {
                ProfileField(
                    label = "Email",
                    value = email,
                    onValueChange = { 
                        email = it
                        emailError = null
                    },
                    error = emailError,
                    enabled = showEditMode,
                    icon = Icons.Default.Email,
                    keyboardOptions = KeyboardOptions(
                        keyboardType = KeyboardType.Email,
                        imeAction = ImeAction.Next
                    )
                )
            }
            
            item {
                ProfileField(
                    label = "Phone Number",
                    value = phone,
                    onValueChange = { 
                        phone = it
                        phoneError = null
                    },
                    error = phoneError,
                    enabled = showEditMode,
                    icon = Icons.Default.Phone,
                    keyboardOptions = KeyboardOptions(
                        keyboardType = KeyboardType.Phone,
                        imeAction = ImeAction.Next
                    )
                )
            }
            
            // Farm Information
            item {
                ProfileSectionHeader("Farm Information")
            }
            
            item {
                ProfileField(
                    label = "Farm Name",
                    value = farmName,
                    onValueChange = { 
                        farmName = it
                        farmNameError = null
                    },
                    error = farmNameError,
                    enabled = showEditMode,
                    icon = Icons.Default.Home,
                    keyboardOptions = KeyboardOptions(
                        keyboardType = KeyboardType.Text,
                        imeAction = ImeAction.Next
                    )
                )
            }
            
            item {
                ProfileField(
                    label = "Farm Size (acres)",
                    value = farmSize,
                    onValueChange = { 
                        farmSize = it
                        farmSizeError = null
                    },
                    error = farmSizeError,
                    enabled = showEditMode,
                    icon = Icons.Default.AreaChart,
                    keyboardOptions = KeyboardOptions(
                        keyboardType = KeyboardType.Number,
                        imeAction = ImeAction.Next
                    )
                )
            }
            
            item {
                ProfileField(
                    label = "Location",
                    value = location,
                    onValueChange = { location = it },
                    enabled = showEditMode,
                    icon = Icons.Default.LocationOn,
                    keyboardOptions = KeyboardOptions(
                        keyboardType = KeyboardType.Text,
                        imeAction = ImeAction.Done
                    )
                )
            }
            
            // Account Actions
            item {
                ProfileSectionHeader("Account")
            }
            
            item {
                AccountActionCard(
                    onChangePassword = { showChangePasswordDialog = true },
                    onDeleteAccount = { showDeleteAccountDialog = true },
                    onExportData = {
                        scope.launch {
                            uiStateManager.setLoading(true)
                            try {
                                val exportManager = DataExportManager(LocalContext.current)
                                val exportResult = exportManager.exportUserData(currentUser)
                                uiStateManager.setSuccess("Data exported successfully to ${exportResult.filePath}")
                            } catch (e: Exception) {
                                val error = ErrorHandler.handleException(e)
                                errorHandler.showErrorToast(error)
                            } finally {
                                uiStateManager.setLoading(false)
                            }
                        }
                    },
                    onBackupData = {
                        scope.launch {
                            uiStateManager.setLoading(true)
                            try {
                                val backupManager = DataBackupManager(LocalContext.current)
                                val backupResult = backupManager.createBackup()
                                uiStateManager.setSuccess("Data backed up successfully to ${backupResult.filePath}")
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
            
            // Statistics
            item {
                ProfileSectionHeader("Statistics")
            }
            
            item {
                StatisticsCard(
                    totalLivestock = currentUser?.totalLivestock ?: 0,
                    totalCrops = currentUser?.totalCrops ?: 0,
                    totalActivities = currentUser?.totalActivities ?: 0,
                    memberSince = currentUser?.createdAt?.toString() ?: "Unknown"
                )
            }
        }
    }
    
    // Dialogs
    if (showChangePasswordDialog) {
        ChangePasswordDialog(
            onConfirm = { oldPassword, newPassword, confirmPassword ->
                showChangePasswordDialog = false
                scope.launch {
                    uiStateManager.setLoading(true)
                    try {
                        // TODO: Implement password change logic
                        kotlinx.coroutines.delay(2000)
                        uiStateManager.setSuccess("Password changed successfully")
                    } catch (e: Exception) {
                        val error = ErrorHandler.handleException(e)
                        errorHandler.showErrorToast(error)
                    } finally {
                        uiStateManager.setLoading(false)
                    }
                }
            },
            onDismiss = { showChangePasswordDialog = false }
        )
    }
    
    if (showDeleteAccountDialog) {
        DeleteAccountDialog(
            onConfirm = {
                showDeleteAccountDialog = false
                scope.launch {
                    uiStateManager.setLoading(true)
                    try {
                        // TODO: Implement account deletion logic
                        kotlinx.coroutines.delay(2000)
                        uiStateManager.setSuccess("Account deleted successfully")
                    } catch (e: Exception) {
                        val error = ErrorHandler.handleException(e)
                        errorHandler.showErrorToast(error)
                    } finally {
                        uiStateManager.setLoading(false)
                    }
                }
            },
            onDismiss = { showDeleteAccountDialog = false }
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
private fun ProfileHeader(
    user: User?,
    showEditMode: Boolean,
    onAvatarClick: () -> Unit
) {
    Card(
        modifier = Modifier.fillMaxWidth()
    ) {
        Column(
            modifier = Modifier.padding(24.dp),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            // Avatar
            Surface(
                modifier = Modifier
                    .size(80.dp)
                    .clickable(enabled = showEditMode, onClick = onAvatarClick),
                shape = MaterialTheme.shapes.medium,
                color = MaterialTheme.colorScheme.primaryContainer
            ) {
                Box(
                    modifier = Modifier.fillMaxSize(),
                    contentAlignment = Alignment.Center
                ) {
                    if (showEditMode) {
                        Icon(
                            Icons.Default.CameraAlt,
                            contentDescription = "Change Avatar",
                            tint = MaterialTheme.colorScheme.onPrimaryContainer,
                            modifier = Modifier.size(32.dp)
                        )
                    } else {
                        Icon(
                            Icons.Default.Person,
                            contentDescription = "Profile",
                            tint = MaterialTheme.colorScheme.onPrimaryContainer,
                            modifier = Modifier.size(48.dp)
                        )
                    }
                }
            }
            
            Spacer(modifier = Modifier.height(16.dp))
            
            // User info
            Text(
                text = "${user?.firstName ?: ""} ${user?.lastName ?: ""}".trim().ifEmpty { "Guest User" },
                style = MaterialTheme.typography.headlineSmall,
                fontWeight = FontWeight.Bold
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
            
            if (showEditMode) {
                Spacer(modifier = Modifier.height(8.dp))
                Text(
                    text = "Tap avatar to change photo",
                    style = MaterialTheme.typography.bodySmall,
                    color = MaterialTheme.colorScheme.onSurfaceVariant,
                    textAlign = TextAlign.Center
                )
            }
        }
    }
}

@Composable
private fun ProfileSectionHeader(title: String) {
    Text(
        text = title,
        style = MaterialTheme.typography.titleMedium,
        fontWeight = FontWeight.Bold,
        color = MaterialTheme.colorScheme.primary,
        modifier = Modifier.padding(vertical = 8.dp)
    )
}

@Composable
private fun ProfileField(
    label: String,
    value: String,
    onValueChange: (String) -> Unit,
    error: String? = null,
    enabled: Boolean = true,
    icon: androidx.compose.ui.graphics.vector.ImageVector,
    keyboardOptions: KeyboardOptions = KeyboardOptions.Default,
    visualTransformation: VisualTransformation = VisualTransformation.None
) {
    Card(
        modifier = Modifier.fillMaxWidth()
    ) {
        Column(
            modifier = Modifier.padding(16.dp)
        ) {
            Row(
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
                    text = label,
                    style = MaterialTheme.typography.titleSmall,
                    fontWeight = FontWeight.Medium
                )
            }
            
            Spacer(modifier = Modifier.height(8.dp))
            
            OutlinedTextField(
                value = value,
                onValueChange = onValueChange,
                enabled = enabled,
                keyboardOptions = keyboardOptions,
                visualTransformation = visualTransformation,
                isError = error != null,
                supportingText = error?.let { { Text(it) } },
                modifier = Modifier.fillMaxWidth(),
                singleLine = true
            )
        }
    }
}

@Composable
private fun AccountActionCard(
    onChangePassword: () -> Unit,
    onDeleteAccount: () -> Unit,
    onExportData: () -> Unit,
    onBackupData: () -> Unit
) {
    Card(
        modifier = Modifier.fillMaxWidth()
    ) {
        Column(
            modifier = Modifier.padding(16.dp)
        ) {
            AccountActionItem(
                icon = Icons.Default.Lock,
                title = "Change Password",
                subtitle = "Update your account password",
                onClick = onChangePassword
            )
            
            AccountActionItem(
                icon = Icons.Default.Download,
                title = "Export Data",
                subtitle = "Download your farm data",
                onClick = onExportData
            )
            
            AccountActionItem(
                icon = Icons.Default.Backup,
                title = "Backup Data",
                subtitle = "Create a backup of your data",
                onClick = onBackupData
            )
            
            AccountActionItem(
                icon = Icons.Default.Delete,
                title = "Delete Account",
                subtitle = "Permanently delete your account",
                onClick = onDeleteAccount,
                isDestructive = true
            )
        }
    }
}

@Composable
private fun AccountActionItem(
    icon: androidx.compose.ui.graphics.vector.ImageVector,
    title: String,
    subtitle: String,
    onClick: () -> Unit,
    isDestructive: Boolean = false
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
            tint = if (isDestructive) MaterialTheme.colorScheme.error else MaterialTheme.colorScheme.primary,
            modifier = Modifier.size(20.dp)
        )
        
        Spacer(modifier = Modifier.width(12.dp))
        
        Column(modifier = Modifier.weight(1f)) {
            Text(
                text = title,
                style = MaterialTheme.typography.bodyMedium,
                fontWeight = FontWeight.Medium,
                color = if (isDestructive) MaterialTheme.colorScheme.error else MaterialTheme.colorScheme.onSurface
            )
            Text(
                text = subtitle,
                style = MaterialTheme.typography.bodySmall,
                color = MaterialTheme.colorScheme.onSurfaceVariant
            )
        }
        
        Icon(
            Icons.Default.ChevronRight,
            contentDescription = null,
            tint = MaterialTheme.colorScheme.onSurfaceVariant
        )
    }
}

@Composable
private fun StatisticsCard(
    totalLivestock: Int,
    totalCrops: Int,
    totalActivities: Int,
    memberSince: String
) {
    Card(
        modifier = Modifier.fillMaxWidth()
    ) {
        Column(
            modifier = Modifier.padding(16.dp)
        ) {
            Text(
                text = "Farm Statistics",
                style = MaterialTheme.typography.titleSmall,
                fontWeight = FontWeight.Medium
            )
            
            Spacer(modifier = Modifier.height(12.dp))
            
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceEvenly
            ) {
                StatItem(
                    icon = Icons.Default.Pets,
                    label = "Livestock",
                    value = totalLivestock.toString()
                )
                StatItem(
                    icon = Icons.Default.Grass,
                    label = "Crops",
                    value = totalCrops.toString()
                )
                StatItem(
                    icon = Icons.Default.Schedule,
                    label = "Activities",
                    value = totalActivities.toString()
                )
            }
            
            Spacer(modifier = Modifier.height(12.dp))
            
            Text(
                text = "Member since: $memberSince",
                style = MaterialTheme.typography.bodySmall,
                color = MaterialTheme.colorScheme.onSurfaceVariant,
                textAlign = TextAlign.Center,
                modifier = Modifier.fillMaxWidth()
            )
        }
    }
}

@Composable
private fun StatItem(
    icon: androidx.compose.ui.graphics.vector.ImageVector,
    label: String,
    value: String
) {
    Column(
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Icon(
            icon,
            contentDescription = label,
            modifier = Modifier.size(24.dp),
            tint = MaterialTheme.colorScheme.primary
        )
        Spacer(modifier = Modifier.height(4.dp))
        Text(
            text = value,
            style = MaterialTheme.typography.headlineSmall,
            fontWeight = FontWeight.Bold
        )
        Text(
            text = label,
            style = MaterialTheme.typography.bodySmall,
            color = MaterialTheme.colorScheme.onSurfaceVariant
        )
    }
}

@Composable
private fun ChangePasswordDialog(
    onConfirm: (String, String, String) -> Unit,
    onDismiss: () -> Unit
) {
    var oldPassword by remember { mutableStateOf("") }
    var newPassword by remember { mutableStateOf("") }
    var confirmPassword by remember { mutableStateOf("") }
    var oldPasswordError by remember { mutableStateOf<String?>(null) }
    var newPasswordError by remember { mutableStateOf<String?>(null) }
    var confirmPasswordError by remember { mutableStateOf<String?>(null) }
    
    AlertDialog(
        onDismissRequest = onDismiss,
        title = { Text("Change Password") },
        text = {
            Column {
                OutlinedTextField(
                    value = oldPassword,
                    onValueChange = { 
                        oldPassword = it
                        oldPasswordError = null
                    },
                    label = { Text("Current Password") },
                    visualTransformation = PasswordVisualTransformation(),
                    isError = oldPasswordError != null,
                    supportingText = oldPasswordError?.let { { Text(it) } },
                    modifier = Modifier.fillMaxWidth()
                )
                
                Spacer(modifier = Modifier.height(8.dp))
                
                OutlinedTextField(
                    value = newPassword,
                    onValueChange = { 
                        newPassword = it
                        newPasswordError = null
                    },
                    label = { Text("New Password") },
                    visualTransformation = PasswordVisualTransformation(),
                    isError = newPasswordError != null,
                    supportingText = newPasswordError?.let { { Text(it) } },
                    modifier = Modifier.fillMaxWidth()
                )
                
                Spacer(modifier = Modifier.height(8.dp))
                
                OutlinedTextField(
                    value = confirmPassword,
                    onValueChange = { 
                        confirmPassword = it
                        confirmPasswordError = null
                    },
                    label = { Text("Confirm New Password") },
                    visualTransformation = PasswordVisualTransformation(),
                    isError = confirmPasswordError != null,
                    supportingText = confirmPasswordError?.let { { Text(it) } },
                    modifier = Modifier.fillMaxWidth()
                )
            }
        },
        confirmButton = {
            TextButton(
                onClick = {
                    // Validate
                    val oldValidation = ValidationUtils.validateRequired(oldPassword, "Current Password")
                    val newValidation = ValidationUtils.validatePassword(newPassword)
                    val confirmValidation = ValidationUtils.validatePasswordConfirmation(newPassword, confirmPassword)
                    
                    oldPasswordError = ValidationUtils.getErrorMessage(oldValidation)
                    newPasswordError = ValidationUtils.getErrorMessage(newValidation)
                    confirmPasswordError = ValidationUtils.getErrorMessage(confirmValidation)
                    
                    if (ValidationUtils.isSuccess(oldValidation) &&
                        ValidationUtils.isSuccess(newValidation) &&
                        ValidationUtils.isSuccess(confirmValidation)
                    ) {
                        onConfirm(oldPassword, newPassword, confirmPassword)
                    }
                }
            ) {
                Text("Change Password")
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
private fun DeleteAccountDialog(
    onConfirm: () -> Unit,
    onDismiss: () -> Unit
) {
    AlertDialog(
        onDismissRequest = onDismiss,
        title = { Text("Delete Account") },
        text = { 
            Text("Are you sure you want to permanently delete your account? This action cannot be undone and all your data will be lost.")
        },
        confirmButton = {
            TextButton(
                onClick = onConfirm,
                colors = ButtonDefaults.textButtonColors(
                    contentColor = MaterialTheme.colorScheme.error
                )
            ) {
                Text("Delete Account")
            }
        },
        dismissButton = {
            TextButton(onClick = onDismiss) {
                Text("Cancel")
            }
        }
    )
} 