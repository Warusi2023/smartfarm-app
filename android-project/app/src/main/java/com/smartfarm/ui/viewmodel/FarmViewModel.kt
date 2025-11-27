package com.smartfarm.ui.viewmodel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.smartfarm.data.model.FarmDto
import com.smartfarm.data.repository.FarmRepository
import com.smartfarm.data.util.Resource
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.*
import kotlinx.coroutines.launch
import javax.inject.Inject

data class FarmUiState(
    val farms: List<FarmDto> = emptyList(),
    val isLoading: Boolean = false,
    val error: String? = null
)

@HiltViewModel
class FarmViewModel @Inject constructor(
    private val farmRepository: FarmRepository
) : ViewModel() {
    
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
                        _uiState.update { it.copy(isLoading = true, error = null) }
                    }
                    is Resource.Success -> {
                        _uiState.update {
                            it.copy(
                                farms = resource.data,
                                isLoading = false,
                                error = null
                            )
                        }
                    }
                    is Resource.Error -> {
                        _uiState.update {
                            it.copy(
                                farms = resource.data ?: emptyList(),
                                isLoading = false,
                                error = resource.exception.message
                            )
                        }
                    }
                }
            }
        }
    }
    
    fun createFarm(farm: FarmDto) {
        viewModelScope.launch {
            when (val result = farmRepository.createFarm(farm)) {
                is Resource.Success -> loadFarms()
                is Resource.Error -> {
                    _uiState.update { it.copy(error = result.exception.message) }
                }
                else -> {}
            }
        }
    }
    
    fun refresh() {
        loadFarms()
    }
}

