package com.smartfarm.shared.ui.viewmodel

import com.smartfarm.shared.data.model.dto.FarmDto
import com.smartfarm.shared.data.repository.FarmRepository
import com.smartfarm.shared.data.util.Resource
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.SupervisorJob
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch

/**
 * Shared Farm ViewModel/State Holder
 */
class FarmViewModel(
    private val farmRepository: FarmRepository
) {
    private val viewModelScope = CoroutineScope(SupervisorJob() + Dispatchers.Main)
    
    private val _uiState = MutableStateFlow(FarmUiState(isLoading = true))
    val uiState: StateFlow<FarmUiState> = _uiState.asStateFlow()
    
    init {
        loadFarms()
    }
    
    fun loadFarms() {
        viewModelScope.launch {
            farmRepository.getFarms().collect { resource ->
                when (resource) {
                    is Resource.Loading -> {
                        _uiState.value = _uiState.value.copy(isLoading = true, error = null)
                    }
                    is Resource.Success -> {
                        _uiState.value = FarmUiState(
                            farms = resource.data ?: emptyList(),
                            isLoading = false,
                            error = null
                        )
                    }
                    is Resource.Error -> {
                        _uiState.value = FarmUiState(
                            farms = resource.data ?: emptyList(),
                            isLoading = false,
                            error = resource.exception?.message
                        )
                    }
                }
            }
        }
    }
    
    fun createFarm(farm: FarmDto) {
        viewModelScope.launch {
            _uiState.value = _uiState.value.copy(isLoading = true)
            when (val result = farmRepository.createFarm(farm)) {
                is Resource.Success -> {
                    loadFarms() // Reload to get updated list
                }
                is Resource.Error -> {
                    _uiState.value = _uiState.value.copy(
                        isLoading = false,
                        error = result.exception?.message
                    )
                }
                is Resource.Loading -> {}
            }
        }
    }
    
    fun updateFarm(farm: FarmDto) {
        viewModelScope.launch {
            _uiState.value = _uiState.value.copy(isLoading = true)
            when (val result = farmRepository.updateFarm(farm)) {
                is Resource.Success -> {
                    loadFarms() // Reload to get updated list
                }
                is Resource.Error -> {
                    _uiState.value = _uiState.value.copy(
                        isLoading = false,
                        error = result.exception?.message
                    )
                }
                is Resource.Loading -> {}
            }
        }
    }
    
    fun deleteFarm(farmId: String) {
        viewModelScope.launch {
            _uiState.value = _uiState.value.copy(isLoading = true)
            when (val result = farmRepository.deleteFarm(farmId)) {
                is Resource.Success -> {
                    loadFarms() // Reload to get updated list
                }
                is Resource.Error -> {
                    _uiState.value = _uiState.value.copy(
                        isLoading = false,
                        error = result.exception?.message
                    )
                }
                is Resource.Loading -> {}
            }
        }
    }
    
    fun refresh() {
        loadFarms()
    }
    
    fun clearError() {
        _uiState.value = _uiState.value.copy(error = null)
    }
}

data class FarmUiState(
    val farms: List<FarmDto> = emptyList(),
    val isLoading: Boolean = false,
    val error: String? = null
)

