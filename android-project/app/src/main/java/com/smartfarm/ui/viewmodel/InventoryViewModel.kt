package com.smartfarm.ui.viewmodel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.smartfarm.data.model.InventoryItemDto
import com.smartfarm.data.repository.InventoryRepository
import com.smartfarm.data.util.Resource
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.*
import kotlinx.coroutines.launch
import javax.inject.Inject

data class InventoryUiState(
    val items: List<InventoryItemDto> = emptyList(),
    val isLoading: Boolean = false,
    val error: String? = null
)

@HiltViewModel
class InventoryViewModel @Inject constructor(
    private val inventoryRepository: InventoryRepository
) : ViewModel() {
    
    private val _uiState = MutableStateFlow(InventoryUiState(isLoading = true))
    val uiState: StateFlow<InventoryUiState> = _uiState.asStateFlow()
    
    fun loadInventory(farmId: String? = null) {
        viewModelScope.launch {
            inventoryRepository.getInventory(farmId).collect { resource ->
                when (resource) {
                    is Resource.Loading -> {
                        _uiState.update { it.copy(isLoading = true, error = null) }
                    }
                    is Resource.Success -> {
                        _uiState.update {
                            it.copy(
                                items = resource.data,
                                isLoading = false,
                                error = null
                            )
                        }
                    }
                    is Resource.Error -> {
                        _uiState.update {
                            it.copy(
                                items = resource.data ?: emptyList(),
                                isLoading = false,
                                error = resource.exception.message
                            )
                        }
                    }
                }
            }
        }
    }
    
    fun createInventoryItem(item: InventoryItemDto) {
        viewModelScope.launch {
            when (val result = inventoryRepository.createInventoryItem(item)) {
                is Resource.Success -> loadInventory()
                is Resource.Error -> {
                    _uiState.update { it.copy(error = result.exception.message) }
                }
                else -> {}
            }
        }
    }
    
    fun refresh(farmId: String? = null) {
        loadInventory(farmId)
    }
}

