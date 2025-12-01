package com.smartfarm.shared.ui.viewmodel

import com.smartfarm.shared.data.model.dto.LivestockDto
import com.smartfarm.shared.data.repository.LivestockRepository
import com.smartfarm.shared.data.util.Resource
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.SupervisorJob
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch

/**
 * Shared Livestock ViewModel/State Holder
 */
class LivestockViewModel(
    private val livestockRepository: LivestockRepository
) {
    private val viewModelScope = CoroutineScope(SupervisorJob() + Dispatchers.Main)
    
    private val _uiState = MutableStateFlow(LivestockUiState(isLoading = true))
    val uiState: StateFlow<LivestockUiState> = _uiState.asStateFlow()
    
    fun loadLivestock(farmId: String? = null) {
        viewModelScope.launch {
            livestockRepository.getLivestock(farmId).collect { resource ->
                when (resource) {
                    is Resource.Loading -> {
                        _uiState.value = _uiState.value.copy(isLoading = true, error = null)
                    }
                    is Resource.Success -> {
                        _uiState.value = LivestockUiState(
                            livestock = resource.data,
                            isLoading = false,
                            error = null
                        )
                    }
                    is Resource.Error -> {
                        _uiState.value = LivestockUiState(
                            livestock = emptyList(),
                            isLoading = false,
                            error = resource.message
                        )
                    }
                }
            }
        }
    }
    
    fun createLivestock(livestock: LivestockDto) {
        viewModelScope.launch {
            _uiState.value = _uiState.value.copy(isLoading = true)
            when (val result = livestockRepository.createLivestock(livestock)) {
                is Resource.Success -> {
                    loadLivestock(livestock.farmId)
                }
                is Resource.Error -> {
                    _uiState.value = _uiState.value.copy(
                        isLoading = false,
                        error = result.message
                    )
                }
                is Resource.Loading -> {}
            }
        }
    }
    
    fun updateLivestock(livestock: LivestockDto) {
        viewModelScope.launch {
            _uiState.value = _uiState.value.copy(isLoading = true)
            when (val result = livestockRepository.updateLivestock(livestock)) {
                is Resource.Success -> {
                    loadLivestock(livestock.farmId)
                }
                is Resource.Error -> {
                    _uiState.value = _uiState.value.copy(
                        isLoading = false,
                        error = result.message
                    )
                }
                is Resource.Loading -> {}
            }
        }
    }
    
    fun deleteLivestock(livestockId: String, farmId: String?) {
        viewModelScope.launch {
            _uiState.value = _uiState.value.copy(isLoading = true)
            when (val result = livestockRepository.deleteLivestock(livestockId)) {
                is Resource.Success -> {
                    loadLivestock(farmId)
                }
                is Resource.Error -> {
                    _uiState.value = _uiState.value.copy(
                        isLoading = false,
                        error = result.message
                    )
                }
                is Resource.Loading -> {}
            }
        }
    }
    
    fun refresh(farmId: String? = null) {
        loadLivestock(farmId)
    }
    
    fun clearError() {
        _uiState.value = _uiState.value.copy(error = null)
    }
}

data class LivestockUiState(
    val livestock: List<LivestockDto> = emptyList(),
    val isLoading: Boolean = false,
    val error: String? = null
)

