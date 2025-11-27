package com.smartfarm.ui.viewmodel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.smartfarm.data.model.CropDto
import com.smartfarm.data.repository.CropRepository
import com.smartfarm.data.util.Resource
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.*
import kotlinx.coroutines.launch
import javax.inject.Inject

data class CropUiState(
    val crops: List<CropDto> = emptyList(),
    val isLoading: Boolean = false,
    val error: String? = null
)

@HiltViewModel
class CropViewModel @Inject constructor(
    private val cropRepository: CropRepository
) : ViewModel() {
    
    private val _uiState = MutableStateFlow(CropUiState(isLoading = true))
    val uiState: StateFlow<CropUiState> = _uiState.asStateFlow()
    
    fun loadCrops(farmId: String? = null) {
        viewModelScope.launch {
            cropRepository.getCrops(farmId).collect { resource ->
                when (resource) {
                    is Resource.Loading -> {
                        _uiState.update { it.copy(isLoading = true, error = null) }
                    }
                    is Resource.Success -> {
                        _uiState.update {
                            it.copy(
                                crops = resource.data,
                                isLoading = false,
                                error = null
                            )
                        }
                    }
                    is Resource.Error -> {
                        _uiState.update {
                            it.copy(
                                crops = resource.data ?: emptyList(),
                                isLoading = false,
                                error = resource.exception.message
                            )
                        }
                    }
                }
            }
        }
    }
    
    fun createCrop(crop: CropDto) {
        viewModelScope.launch {
            when (val result = cropRepository.createCrop(crop)) {
                is Resource.Success -> loadCrops()
                is Resource.Error -> {
                    _uiState.update { it.copy(error = result.exception.message) }
                }
                else -> {}
            }
        }
    }
    
    fun refresh(farmId: String? = null) {
        loadCrops(farmId)
    }
}

