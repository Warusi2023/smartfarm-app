package com.smartfarm.ui.viewmodel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.smartfarm.data.model.LoginRequest
import com.smartfarm.data.model.RegisterRequest
import com.smartfarm.data.model.UserDto
import com.smartfarm.data.repository.AuthRepository
import com.smartfarm.data.util.Resource
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.*
import kotlinx.coroutines.launch
import javax.inject.Inject

data class AuthUiState(
    val isLoggedIn: Boolean = false,
    val isLoading: Boolean = false,
    val user: UserDto? = null,
    val error: String? = null
)

@HiltViewModel
class AuthViewModel @Inject constructor(
    private val authRepository: AuthRepository
) : ViewModel() {
    
    private val _uiState = MutableStateFlow(AuthUiState())
    val uiState: StateFlow<AuthUiState> = _uiState.asStateFlow()
    
    init {
        checkAuthState()
    }
    
    private fun checkAuthState() {
        viewModelScope.launch {
            authRepository.isLoggedIn().collect { isLoggedIn ->
                _uiState.update { it.copy(isLoggedIn = isLoggedIn) }
                
                if (isLoggedIn) {
                    // Try to load user profile
                    when (val result = authRepository.getCurrentUser()) {
                        is Resource.Success -> {
                            _uiState.update {
                                it.copy(user = result.data, isLoading = false)
                            }
                        }
                        is Resource.Error -> {
                            // If 401, token expired - try refresh
                            if (result.exception.message?.contains("401") == true) {
                                refreshToken()
                            } else {
                                _uiState.update {
                                    it.copy(error = result.exception.message, isLoading = false)
                                }
                            }
                        }
                        else -> {}
                    }
                }
            }
        }
    }
    
    fun login(email: String, password: String) {
        viewModelScope.launch {
            _uiState.update { it.copy(isLoading = true, error = null) }
            
            when (val result = authRepository.login(email, password)) {
                is Resource.Success -> {
                    _uiState.update {
                        it.copy(
                            isLoggedIn = true,
                            isLoading = false,
                            user = result.data.user,
                            error = null
                        )
                    }
                }
                is Resource.Error -> {
                    _uiState.update {
                        it.copy(
                            isLoading = false,
                            error = result.exception.message ?: "Login failed"
                        )
                    }
                }
                else -> {}
            }
        }
    }
    
    fun register(
        email: String,
        password: String,
        firstName: String,
        lastName: String,
        farmName: String? = null
    ) {
        viewModelScope.launch {
            _uiState.update { it.copy(isLoading = true, error = null) }
            
            val request = RegisterRequest(email, password, firstName, lastName, farmName)
            when (val result = authRepository.register(request)) {
                is Resource.Success -> {
                    _uiState.update {
                        it.copy(
                            isLoggedIn = true,
                            isLoading = false,
                            user = result.data.user,
                            error = null
                        )
                    }
                }
                is Resource.Error -> {
                    _uiState.update {
                        it.copy(
                            isLoading = false,
                            error = result.exception.message ?: "Registration failed"
                        )
                    }
                }
                else -> {}
            }
        }
    }
    
    fun logout() {
        viewModelScope.launch {
            authRepository.logout()
            _uiState.update {
                AuthUiState(isLoggedIn = false, user = null)
            }
        }
    }
    
    private fun refreshToken() {
        viewModelScope.launch {
            when (val result = authRepository.refreshToken()) {
                is Resource.Success -> {
                    // Retry getting user profile
                    when (val userResult = authRepository.getCurrentUser()) {
                        is Resource.Success -> {
                            _uiState.update {
                                it.copy(user = userResult.data, isLoading = false)
                            }
                        }
                        is Resource.Error -> {
                            _uiState.update {
                                it.copy(
                                    isLoggedIn = false,
                                    error = "Session expired. Please login again."
                                )
                            }
                        }
                        else -> {}
                    }
                }
                is Resource.Error -> {
                    _uiState.update {
                        it.copy(
                            isLoggedIn = false,
                            error = "Session expired. Please login again."
                        )
                    }
                }
                else -> {}
            }
        }
    }
}

