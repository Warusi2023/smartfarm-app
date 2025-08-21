package com.yourcompany.smartfarm.auth

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.yourcompany.smartfarm.auth.AuthenticationManager
import com.yourcompany.smartfarm.auth.AuthResult
import com.yourcompany.smartfarm.data.model.UserRole
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch

data class RegisterUiState(
    val username: String = "",
    val email: String = "",
    val password: String = "",
    val confirmPassword: String = "",
    val firstName: String = "",
    val lastName: String = "",
    val role: UserRole = UserRole.FARMER,
    val isLoading: Boolean = false,
    val error: String? = null,
    val isRegistered: Boolean = false,
    val showPassword: Boolean = false,
    val showConfirmPassword: Boolean = false,
    val acceptTerms: Boolean = false
)

class RegisterViewModel(
    private val authenticationManager: AuthenticationManager
) : ViewModel() {
    
    private val _uiState = MutableStateFlow(RegisterUiState())
    val uiState: StateFlow<RegisterUiState> = _uiState.asStateFlow()
    
    fun updateUsername(username: String) {
        _uiState.value = _uiState.value.copy(username = username, error = null)
    }
    
    fun updateEmail(email: String) {
        _uiState.value = _uiState.value.copy(email = email, error = null)
    }
    
    fun updatePassword(password: String) {
        _uiState.value = _uiState.value.copy(password = password, error = null)
    }
    
    fun updateConfirmPassword(confirmPassword: String) {
        _uiState.value = _uiState.value.copy(confirmPassword = confirmPassword, error = null)
    }
    
    fun updateFirstName(firstName: String) {
        _uiState.value = _uiState.value.copy(firstName = firstName, error = null)
    }
    
    fun updateLastName(lastName: String) {
        _uiState.value = _uiState.value.copy(lastName = lastName, error = null)
    }
    
    fun updateRole(role: UserRole) {
        _uiState.value = _uiState.value.copy(role = role)
    }
    
    fun togglePasswordVisibility() {
        _uiState.value = _uiState.value.copy(showPassword = !_uiState.value.showPassword)
    }
    
    fun toggleConfirmPasswordVisibility() {
        _uiState.value = _uiState.value.copy(showConfirmPassword = !_uiState.value.showConfirmPassword)
    }
    
    fun updateAcceptTerms(accept: Boolean) {
        _uiState.value = _uiState.value.copy(acceptTerms = accept)
    }
    
    fun register() {
        val currentState = _uiState.value
        
        // Validate input
        val validationError = validateInput(currentState)
        if (validationError != null) {
            _uiState.value = currentState.copy(error = validationError)
            return
        }
        
        viewModelScope.launch {
            _uiState.value = currentState.copy(isLoading = true, error = null)
            
            val result = authenticationManager.registerUser(
                username = currentState.username.trim(),
                email = currentState.email.trim(),
                password = currentState.password,
                firstName = currentState.firstName.trim(),
                lastName = currentState.lastName.trim(),
                role = currentState.role
            )
            
            when (result) {
                is AuthResult.Success -> {
                    _uiState.value = currentState.copy(
                        isLoading = false,
                        isRegistered = true,
                        error = null
                    )
                }
                is AuthResult.Error -> {
                    _uiState.value = currentState.copy(
                        isLoading = false,
                        error = result.message
                    )
                }
            }
        }
    }
    
    private fun validateInput(state: RegisterUiState): String? {
        if (state.username.isBlank()) {
            return "Username is required"
        }
        
        if (state.username.length < 3) {
            return "Username must be at least 3 characters"
        }
        
        if (state.email.isBlank()) {
            return "Email is required"
        }
        
        if (!android.util.Patterns.EMAIL_ADDRESS.matcher(state.email).matches()) {
            return "Invalid email format"
        }
        
        if (state.password.isBlank()) {
            return "Password is required"
        }
        
        if (state.password.length < 8) {
            return "Password must be at least 8 characters"
        }
        
        if (!state.password.any { it.isUpperCase() }) {
            return "Password must contain at least one uppercase letter"
        }
        
        if (!state.password.any { it.isLowerCase() }) {
            return "Password must contain at least one lowercase letter"
        }
        
        if (!state.password.any { it.isDigit() }) {
            return "Password must contain at least one number"
        }
        
        if (state.password != state.confirmPassword) {
            return "Passwords do not match"
        }
        
        if (state.firstName.isBlank()) {
            return "First name is required"
        }
        
        if (state.lastName.isBlank()) {
            return "Last name is required"
        }
        
        if (!state.acceptTerms) {
            return "You must accept the terms and conditions"
        }
        
        return null
    }
    
    fun clearError() {
        _uiState.value = _uiState.value.copy(error = null)
    }
    
    fun resetState() {
        _uiState.value = RegisterUiState()
    }
} 