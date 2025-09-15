package com.smartfarm.auth

import android.content.Context
import android.content.SharedPreferences
import androidx.security.crypto.EncryptedSharedPreferences
import androidx.security.crypto.MasterKey
import com.smartfarm.data.model.*
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import java.security.SecureRandom
import java.util.*

class AuthenticationManager(
    private val context: Context
) {
    
    companion object {
        private const val PREFS_NAME = "auth_prefs"
        private const val KEY_CURRENT_USER_ID = "current_user_id"
        private const val KEY_SESSION_TOKEN = "session_token"
        private const val KEY_REMEMBER_ME = "remember_me"
        private const val MAX_FAILED_ATTEMPTS = 5
        private const val LOCK_DURATION_MS = 15 * 60 * 1000L // 15 minutes
        private const val TOKEN_EXPIRY_MS = 24 * 60 * 60 * 1000L // 24 hours
    }
    
    private val masterKey = MasterKey.Builder(context)
        .setKeyScheme(MasterKey.KeyScheme.AES256_GCM)
        .build()
    
    private val encryptedPrefs: SharedPreferences = EncryptedSharedPreferences.create(
        context,
        PREFS_NAME,
        masterKey,
        EncryptedSharedPreferences.PrefKeyEncryptionScheme.AES256_SIV,
        EncryptedSharedPreferences.PrefValueEncryptionScheme.AES256_GCM
    )
    
    private val _currentUser = MutableStateFlow<FarmerData?>(null)
    val currentUser: StateFlow<FarmerData?> = _currentUser.asStateFlow()
    
    private val _isAuthenticated = MutableStateFlow(false)
    val isAuthenticated: StateFlow<Boolean> = _isAuthenticated.asStateFlow()
    
    private val _isLoading = MutableStateFlow(false)
    val isLoading: StateFlow<Boolean> = _isLoading.asStateFlow()
    
    private val secureRandom = SecureRandom()
    private val coroutineScope = CoroutineScope(Dispatchers.IO)
    
    init {
        // Try to restore session on app start
        coroutineScope.launch {
            restoreSession()
        }
    }
    
    /**
     * Register a new farmer with comprehensive data
     */
    suspend fun registerFarmer(
        farmerData: FarmerData,
        password: String
    ): AuthResult {
        return try {
            _isLoading.value = true
            
            // Validate input
            if (!isValidEmail(farmerData.email)) {
                return AuthResult.Error("Invalid email format")
            }
            
            if (!isValidPassword(password)) {
                return AuthResult.Error("Password must be at least 8 characters with uppercase, lowercase, and number")
            }
            
            if (farmerData.username.length < 3) {
                return AuthResult.Error("Username must be at least 3 characters")
            }
            
            // TODO: Check if username/email already exists in backend
            // This would typically involve an API call to your backend
            
            // TODO: Send registration data to backend API
            // For now, we'll simulate a successful registration
            val registrationResult = registerFarmerWithBackend(farmerData, password)
            
            if (registrationResult.isSuccess) {
                // Store farmer data locally
                storeFarmerData(farmerData)
                AuthResult.Success(farmerData, "Registration successful! Please check your email to verify your account.")
            } else {
                AuthResult.Error(registrationResult.getOrNull() ?: "Registration failed")
            }
            
        } catch (e: Exception) {
            AuthResult.Error("Registration failed: ${e.message}")
        } finally {
            _isLoading.value = false
        }
    }
    
    /**
     * Login farmer
     */
    suspend fun loginFarmer(
        usernameOrEmail: String,
        password: String,
        rememberMe: Boolean = false
    ): AuthResult {
        return try {
            _isLoading.value = true
            
            // TODO: Authenticate with backend API
            val loginResult = authenticateFarmerWithBackend(usernameOrEmail, password)
            
            if (loginResult.isSuccess) {
                val farmerData = loginResult.getOrNull()
                if (farmerData != null) {
                    createSession(farmerData, rememberMe)
                    AuthResult.Success(farmerData, "Login successful")
                } else {
                    AuthResult.Error("Invalid credentials")
                }
            } else {
                AuthResult.Error(loginResult.getOrNull() ?: "Login failed")
            }
            
        } catch (e: Exception) {
            AuthResult.Error("Login failed: ${e.message}")
        } finally {
            _isLoading.value = false
        }
    }
    
    /**
     * Logout farmer
     */
    fun logout() {
        clearSession()
        _currentUser.value = null
        _isAuthenticated.value = false
    }
    
    /**
     * Change password
     */
    suspend fun changePassword(
        currentPassword: String,
        newPassword: String
    ): AuthResult {
        return try {
            val currentFarmer = _currentUser.value ?: return AuthResult.Error("Not authenticated")
            
            if (!isValidPassword(newPassword)) {
                return AuthResult.Error("New password must be at least 8 characters with uppercase, lowercase, and number")
            }
            
            // TODO: Change password via backend API
            val changeResult = changePasswordWithBackend(currentFarmer.email, currentPassword, newPassword)
            
            if (changeResult.isSuccess) {
                AuthResult.Success(currentFarmer, "Password changed successfully")
            } else {
                AuthResult.Error(changeResult.getOrNull() ?: "Failed to change password")
            }
            
        } catch (e: Exception) {
            AuthResult.Error("Failed to change password: ${e.message}")
        }
    }
    
    /**
     * Request password reset
     */
    suspend fun requestPasswordReset(email: String): AuthResult {
        return try {
            // TODO: Request password reset via backend API
            val resetResult = requestPasswordResetWithBackend(email)
            
            if (resetResult.isSuccess) {
                AuthResult.Success(null, "Password reset instructions sent to your email")
            } else {
                AuthResult.Error(resetResult.getOrNull() ?: "Failed to request password reset")
            }
            
        } catch (e: Exception) {
            AuthResult.Error("Failed to request password reset: ${e.message}")
        }
    }
    
    /**
     * Reset password with token
     */
    suspend fun resetPassword(token: String, newPassword: String): AuthResult {
        return try {
            if (!isValidPassword(newPassword)) {
                return AuthResult.Error("Password must be at least 8 characters with uppercase, lowercase, and number")
            }
            
            // TODO: Reset password via backend API
            val resetResult = resetPasswordWithBackend(token, newPassword)
            
            if (resetResult.isSuccess) {
                AuthResult.Success(null, "Password reset successfully")
            } else {
                AuthResult.Error(resetResult.getOrNull() ?: "Failed to reset password")
            }
            
        } catch (e: Exception) {
            AuthResult.Error("Failed to reset password: ${e.message}")
        }
    }
    
    /**
     * Verify email
     */
    suspend fun verifyEmail(token: String): AuthResult {
        return try {
            // TODO: Verify email via backend API
            val verifyResult = verifyEmailWithBackend(token)
            
            if (verifyResult.isSuccess) {
                AuthResult.Success(null, "Email verified successfully")
            } else {
                AuthResult.Error(verifyResult.getOrNull() ?: "Failed to verify email")
            }
            
        } catch (e: Exception) {
            AuthResult.Error("Failed to verify email: ${e.message}")
        }
    }
    
    /**
     * Update farmer profile
     */
    suspend fun updateFarmerProfile(updatedFarmerData: FarmerData): AuthResult {
        return try {
            val currentFarmer = _currentUser.value ?: return AuthResult.Error("Not authenticated")
            
            // TODO: Update profile via backend API
            val updateResult = updateFarmerProfileWithBackend(updatedFarmerData)
            
            if (updateResult.isSuccess) {
                _currentUser.value = updatedFarmerData
                AuthResult.Success(updatedFarmerData, "Profile updated successfully")
            } else {
                AuthResult.Error(updateResult.getOrNull() ?: "Failed to update profile")
            }
            
        } catch (e: Exception) {
            AuthResult.Error("Failed to update profile: ${e.message}")
        }
    }
    
    private fun createSession(farmerData: FarmerData, rememberMe: Boolean) {
        encryptedPrefs.edit().apply {
            putString(KEY_CURRENT_USER_ID, farmerData.email)
            putString(KEY_SESSION_TOKEN, generateSecureToken())
            putBoolean(KEY_REMEMBER_ME, rememberMe)
        }.apply()
        
        _currentUser.value = farmerData
        _isAuthenticated.value = true
    }
    
    private fun clearSession() {
        encryptedPrefs.edit().clear().apply()
    }
    
    private suspend fun restoreSession() {
        val userEmail = encryptedPrefs.getString(KEY_CURRENT_USER_ID, null)
        val sessionToken = encryptedPrefs.getString(KEY_SESSION_TOKEN, null)
        
        if (userEmail != null && sessionToken != null) {
            // TODO: Validate session with backend and restore farmer data
            // For now, we'll just clear the session
            clearSession()
        }
    }
    
    private fun storeFarmerData(farmerData: FarmerData) {
        // Store farmer data in local preferences for offline access
        encryptedPrefs.edit().apply {
            putString("farmer_data", serializeFarmerData(farmerData))
        }.apply()
    }
    
    private fun serializeFarmerData(farmerData: FarmerData): String {
        // Simple JSON serialization - in production, use proper JSON library
        return """
        {
            "firstName": "${farmerData.firstName}",
            "lastName": "${farmerData.lastName}",
            "email": "${farmerData.email}",
            "phone": "${farmerData.phone}",
            "username": "${farmerData.username}",
            "country": "${farmerData.country}",
            "region": "${farmerData.region}",
            "district": "${farmerData.district}",
            "village": "${farmerData.village}",
            "farmName": "${farmerData.farmName}",
            "farmSize": ${farmerData.farmSize},
            "farmType": "${farmerData.farmType}",
            "experience": "${farmerData.experience}",
            "crops": "${farmerData.crops}",
            "irrigation": "${farmerData.irrigation}",
            "education": "${farmerData.education}",
            "income": "${farmerData.income}",
            "marketing": "${farmerData.marketing}",
            "technology": "${farmerData.technology}",
            "challenges": "${farmerData.challenges}",
            "goals": "${farmerData.goals}",
            "newsletter": ${farmerData.newsletter}
        }
        """.trimIndent()
    }
    
    // Backend API integration methods (to be implemented)
    private suspend fun registerFarmerWithBackend(farmerData: FarmerData, password: String): Result<String> {
        // TODO: Implement actual backend API call
        // For now, return success
        return Result.success("Registration successful")
    }
    
    private suspend fun authenticateFarmerWithBackend(usernameOrEmail: String, password: String): Result<FarmerData> {
        // TODO: Implement actual backend API call
        // For now, return a mock farmer data
        val mockFarmerData = FarmerData(
            firstName = "John",
            lastName = "Doe",
            email = usernameOrEmail,
            username = "johndoe",
            farmName = "Sample Farm"
        )
        return Result.success(mockFarmerData)
    }
    
    private suspend fun changePasswordWithBackend(email: String, currentPassword: String, newPassword: String): Result<String> {
        // TODO: Implement actual backend API call
        return Result.success("Password changed successfully")
    }
    
    private suspend fun requestPasswordResetWithBackend(email: String): Result<String> {
        // TODO: Implement actual backend API call
        return Result.success("Password reset instructions sent")
    }
    
    private suspend fun resetPasswordWithBackend(token: String, newPassword: String): Result<String> {
        // TODO: Implement actual backend API call
        return Result.success("Password reset successfully")
    }
    
    private suspend fun verifyEmailWithBackend(token: String): Result<String> {
        // TODO: Implement actual backend API call
        return Result.success("Email verified successfully")
    }
    
    private suspend fun updateFarmerProfileWithBackend(farmerData: FarmerData): Result<String> {
        // TODO: Implement actual backend API call
        return Result.success("Profile updated successfully")
    }
    
    // Validation helper methods
    private fun isValidEmail(email: String): Boolean {
        return android.util.Patterns.EMAIL_ADDRESS.matcher(email).matches()
    }
    
    private fun isValidPassword(password: String): Boolean {
        return password.length >= 8 &&
                password.any { it.isUpperCase() } &&
                password.any { it.isLowerCase() } &&
                password.any { it.isDigit() }
    }
    
    private fun generateSecureToken(): String {
        val bytes = ByteArray(32)
        secureRandom.nextBytes(bytes)
        return Base64.getUrlEncoder().withoutPadding().encodeToString(bytes)
    }
}

sealed class AuthResult {
    data class Success(val farmerData: FarmerData?, val message: String) : AuthResult()
    data class Error(val message: String) : AuthResult()
}
