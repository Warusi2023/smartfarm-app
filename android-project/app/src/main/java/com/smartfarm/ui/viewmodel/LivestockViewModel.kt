package com.smartfarm.ui.viewmodel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.smartfarm.data.model.LivestockDto
import com.smartfarm.data.repository.LivestockRepository
import com.smartfarm.data.util.Resource
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.*
import kotlinx.coroutines.launch
import javax.inject.Inject

data class LivestockUiState(
    val livestock: List<LivestockDto> = emptyList(),
    val isLoading: Boolean = false,
    val error: String? = null
)

@HiltViewModel
class LivestockViewModel @Inject constructor(
    private val livestockRepository: LivestockRepository
) : ViewModel() {
    
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
                        _uiState.value = _uiState.value.copy(
                            livestock = resource.data,
                            isLoading = false,
                            error = null
                        )
                    }
                    is Resource.Error -> {
                        _uiState.value = _uiState.value.copy(
                            livestock = resource.data ?: emptyList(),
                            isLoading = false,
                            error = resource.exception.message
                        )
                    }
                }
            }
        }
    }
    
    fun createLivestock(livestock: LivestockDto) {
        viewModelScope.launch {
            when (val result = livestockRepository.createLivestock(livestock)) {
                is Resource.Success -> loadLivestock()
                is Resource.Error -> {
                    _uiState.value = _uiState.value.copy(error = result.exception.message)
                }
                else -> {}
            }
        }
    }
    
    fun refresh(farmId: String? = null) {
        loadLivestock(farmId)
    }
}

