package com.example.smartfarm.auth

import android.content.Context
import android.content.SharedPreferences
import androidx.security.crypto.EncryptedSharedPreferences
import androidx.security.crypto.MasterKey
import com.example.smartfarm.data.database.UserDao
import com.example.smartfarm.data.model.User
import com.example.smartfarm.data.model.UserRole
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import java.security.SecureRandom
import java.util.*

class AuthenticationManager(
    private val context: Context,
    private val userDao: UserDao
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
    
    private val _currentUser = MutableStateFlow<User?>(null)
    val currentUser: StateFlow<User?> = _currentUser.asStateFlow()
    
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
     * Register a new user
     */
    suspend fun registerUser(
        username: String,
        email: String,
        password: String,
        firstName: String,
        lastName: String,
        role: UserRole = UserRole.FARMER
    ): AuthResult {
        return try {
            _isLoading.value = true
            
            // Validate input
            if (!User.validateEmail(email)) {
                return AuthResult.Error("Invalid email format")
            }
            
            if (!User.validatePassword(password)) {
                return AuthResult.Error("Password must be at least 8 characters with uppercase, lowercase, and number")
            }
            
            if (username.length < 3) {
                return AuthResult.Error("Username must be at least 3 characters")
            }
            
            // Check if username/email already exists
            if (userDao.isUsernameTaken(username) > 0) {
                return AuthResult.Error("Username already taken")
            }
            
            if (userDao.isEmailTaken(email) > 0) {
                return AuthResult.Error("Email already registered")
            }
            
            // Create user
            val passwordHash = User.hashPassword(password)
            val emailVerificationToken = generateSecureToken()
            val user = User(
                username = username,
                email = email,
                passwordHash = passwordHash,
                firstName = firstName,
                lastName = lastName,
                role = role,
                emailVerificationToken = emailVerificationToken,
                emailVerificationExpiresAt = System.currentTimeMillis() + TOKEN_EXPIRY_MS
            )
            
            val userId = userDao.insertUser(user)
            val createdUser = userDao.getUserById(userId)
            
            if (createdUser != null) {
                AuthResult.Success(createdUser, "Registration successful. Please verify your email.")
            } else {
                AuthResult.Error("Failed to create user")
            }
            
        } catch (e: Exception) {
            AuthResult.Error("Registration failed: ${e.message}")
        } finally {
            _isLoading.value = false
        }
    }
    
    /**
     * Login user
     */
    suspend fun loginUser(
        usernameOrEmail: String,
        password: String,
        rememberMe: Boolean = false
    ): AuthResult {
        return try {
            _isLoading.value = true
            
            val passwordHash = User.hashPassword(password)
            
            // Try to find user by username or email
            val user = userDao.getUserByUsername(usernameOrEmail) 
                ?: userDao.getUserByEmail(usernameOrEmail)
                ?: return AuthResult.Error("Invalid credentials")
            
            // Check if account is locked
            if (user.accountLockedUntil != null && user.accountLockedUntil!! > System.currentTimeMillis()) {
                val remainingTime = (user.accountLockedUntil!! - System.currentTimeMillis()) / 1000 / 60
                return AuthResult.Error("Account is locked. Try again in ${remainingTime} minutes")
            }
            
            // Verify password
            val authenticatedUser = userDao.authenticateUser(user.username, passwordHash)
                ?: userDao.authenticateUserByEmail(user.email, passwordHash)
                ?: run {
                    // Increment failed attempts
                    userDao.incrementFailedLoginAttempts(user.id)
                    
                    // Lock account if too many failed attempts
                    if (user.failedLoginAttempts + 1 >= MAX_FAILED_ATTEMPTS) {
                        userDao.lockAccount(user.id, System.currentTimeMillis() + LOCK_DURATION_MS)
                        return AuthResult.Error("Too many failed attempts. Account locked for 15 minutes")
                    }
                    
                    return AuthResult.Error("Invalid credentials")
                }
            
            // Reset failed attempts on successful login
            userDao.resetFailedLoginAttempts(authenticatedUser.id)
            
            // Update last login
            val loginTime = System.currentTimeMillis()
            userDao.updateLastLogin(authenticatedUser.id, loginTime)
            
            // Create session
            val sessionToken = generateSecureToken()
            createSession(authenticatedUser, sessionToken, rememberMe)
            
            AuthResult.Success(authenticatedUser, "Login successful")
            
        } catch (e: Exception) {
            AuthResult.Error("Login failed: ${e.message}")
        } finally {
            _isLoading.value = false
        }
    }
    
    /**
     * Logout user
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
            val currentUser = _currentUser.value ?: return AuthResult.Error("Not authenticated")
            
            if (!User.validatePassword(newPassword)) {
                return AuthResult.Error("New password must be at least 8 characters with uppercase, lowercase, and number")
            }
            
            val currentPasswordHash = User.hashPassword(currentPassword)
            val authenticatedUser = userDao.authenticateUser(currentUser.username, currentPasswordHash)
                ?: return AuthResult.Error("Current password is incorrect")
            
            val newPasswordHash = User.hashPassword(newPassword)
            val updatedUser = authenticatedUser.copy(
                passwordHash = newPasswordHash,
                updatedAt = System.currentTimeMillis()
            )
            
            userDao.updateUser(updatedUser)
            _currentUser.value = updatedUser
            
            AuthResult.Success(updatedUser, "Password changed successfully")
            
        } catch (e: Exception) {
            AuthResult.Error("Failed to change password: ${e.message}")
        }
    }
    
    /**
     * Request password reset
     */
    suspend fun requestPasswordReset(email: String): AuthResult {
        return try {
            val user = userDao.getUserByEmail(email) ?: return AuthResult.Error("Email not found")
            
            val resetToken = generateSecureToken()
            val updatedUser = user.copy(
                passwordResetToken = resetToken,
                passwordResetExpiresAt = System.currentTimeMillis() + TOKEN_EXPIRY_MS,
                updatedAt = System.currentTimeMillis()
            )
            
            userDao.updateUser(updatedUser)
            
            // TODO: Send email with reset token
            AuthResult.Success(user, "Password reset instructions sent to your email")
            
        } catch (e: Exception) {
            AuthResult.Error("Failed to request password reset: ${e.message}")
        }
    }
    
    /**
     * Reset password with token
     */
    suspend fun resetPassword(token: String, newPassword: String): AuthResult {
        return try {
            if (!User.validatePassword(newPassword)) {
                return AuthResult.Error("Password must be at least 8 characters with uppercase, lowercase, and number")
            }
            
            val user = userDao.getUserByResetToken(token, System.currentTimeMillis())
                ?: return AuthResult.Error("Invalid or expired reset token")
            
            val newPasswordHash = User.hashPassword(newPassword)
            val updatedUser = user.copy(
                passwordHash = newPasswordHash,
                passwordResetToken = null,
                passwordResetExpiresAt = null,
                updatedAt = System.currentTimeMillis()
            )
            
            userDao.updateUser(updatedUser)
            
            AuthResult.Success(updatedUser, "Password reset successfully")
            
        } catch (e: Exception) {
            AuthResult.Error("Failed to reset password: ${e.message}")
        }
    }
    
    /**
     * Verify email
     */
    suspend fun verifyEmail(token: String): AuthResult {
        return try {
            val user = userDao.getUserByVerificationToken(token, System.currentTimeMillis())
                ?: return AuthResult.Error("Invalid or expired verification token")
            
            val updatedUser = user.copy(
                isEmailVerified = true,
                emailVerificationToken = null,
                emailVerificationExpiresAt = null,
                updatedAt = System.currentTimeMillis()
            )
            
            userDao.updateUser(updatedUser)
            
            AuthResult.Success(updatedUser, "Email verified successfully")
            
        } catch (e: Exception) {
            AuthResult.Error("Failed to verify email: ${e.message}")
        }
    }
    
    /**
     * Check if user has required permission
     */
    fun hasPermission(requiredRole: UserRole): Boolean {
        val currentUser = _currentUser.value ?: return false
        return currentUser.role.ordinal <= requiredRole.ordinal
    }
    
    /**
     * Get current user role
     */
    fun getCurrentUserRole(): UserRole? {
        return _currentUser.value?.role
    }
    
    private fun createSession(user: User, sessionToken: String, rememberMe: Boolean) {
        encryptedPrefs.edit().apply {
            putLong(KEY_CURRENT_USER_ID, user.id)
            putString(KEY_SESSION_TOKEN, sessionToken)
            putBoolean(KEY_REMEMBER_ME, rememberMe)
        }.apply()
        
        _currentUser.value = user
        _isAuthenticated.value = true
    }
    
    private fun clearSession() {
        encryptedPrefs.edit().clear().apply()
    }
    
    private suspend fun restoreSession() {
        val userId = encryptedPrefs.getLong(KEY_CURRENT_USER_ID, -1)
        val sessionToken = encryptedPrefs.getString(KEY_SESSION_TOKEN, null)
        val rememberMe = encryptedPrefs.getBoolean(KEY_REMEMBER_ME, false)
        
        if (userId != -1L && sessionToken != null) {
            val user = userDao.getUserById(userId)
            if (user != null && user.isActive) {
                _currentUser.value = user
                _isAuthenticated.value = true
            } else {
                clearSession()
            }
        }
    }
    
    private fun generateSecureToken(): String {
        val bytes = ByteArray(32)
        secureRandom.nextBytes(bytes)
        return Base64.getUrlEncoder().withoutPadding().encodeToString(bytes)
    }
}

sealed class AuthResult {
    data class Success(val user: User, val message: String) : AuthResult()
    data class Error(val message: String) : AuthResult()
} 