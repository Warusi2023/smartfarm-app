package com.smartfarm.shared.ui.viewmodel

import com.smartfarm.shared.data.model.dto.CropDto
import com.smartfarm.shared.data.repository.CropRepository
import com.smartfarm.shared.data.util.Resource
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.SupervisorJob
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch

class CropViewModel(
    private val cropRepository: CropRepository
) {
    private val viewModelScope = CoroutineScope(SupervisorJob() + Dispatchers.Main)
    
    private val _uiState = MutableStateFlow(CropUiState(isLoading = true))
    val uiState: StateFlow<CropUiState> = _uiState.asStateFlow()
    
    fun loadCrops(farmId: String? = null) {
        viewModelScope.launch {
            cropRepository.getCrops(farmId).collect { resource ->
                when (resource) {
                    is Resource.Loading -> {
                        _uiState.value = _uiState.value.copy(isLoading = true, error = null)
                    }
                    is Resource.Success -> {
                        _uiState.value = CropUiState(
                            crops = resource.data ?: emptyList(),
                            isLoading = false,
                            error = null
                        )
                    }
                    is Resource.Error -> {
                        _uiState.value = CropUiState(
                            crops = emptyList(),
                            isLoading = false,
                            error = resource.message
                        )
                    }
                }
            }
        }
    }
    
    fun createCrop(crop: CropDto) {
        viewModelScope.launch {
            _uiState.value = _uiState.value.copy(isLoading = true)
            when (val result = cropRepository.createCrop(crop)) {
                is Resource.Success -> loadCrops(crop.farmId)
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
    
    fun updateCrop(crop: CropDto) {
        viewModelScope.launch {
            _uiState.value = _uiState.value.copy(isLoading = true)
            when (val result = cropRepository.updateCrop(crop)) {
                is Resource.Success -> loadCrops(crop.farmId)
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
    
    fun deleteCrop(cropId: String, farmId: String?) {
        viewModelScope.launch {
            _uiState.value = _uiState.value.copy(isLoading = true)
            when (val result = cropRepository.deleteCrop(cropId)) {
                is Resource.Success -> loadCrops(farmId)
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
        loadCrops(farmId)
    }
    
    fun clearError() {
        _uiState.value = _uiState.value.copy(error = null)
    }
}

data class CropUiState(
    val crops: List<CropDto> = emptyList(),
    val isLoading: Boolean = false,
    val error: String? = null
)

