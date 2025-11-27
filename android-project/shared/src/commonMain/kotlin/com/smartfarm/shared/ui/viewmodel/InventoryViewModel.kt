package com.smartfarm.shared.ui.viewmodel

import com.smartfarm.shared.data.model.dto.InventoryItemDto
import com.smartfarm.shared.data.repository.InventoryRepository
import com.smartfarm.shared.data.util.Resource
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.SupervisorJob
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch

class InventoryViewModel(
    private val inventoryRepository: InventoryRepository
) {
    private val viewModelScope = CoroutineScope(SupervisorJob() + Dispatchers.Main)
    
    private val _uiState = MutableStateFlow(InventoryUiState(isLoading = true))
    val uiState: StateFlow<InventoryUiState> = _uiState.asStateFlow()
    
    fun loadInventory(farmId: String? = null) {
        viewModelScope.launch {
            inventoryRepository.getInventory(farmId).collect { resource ->
                when (resource) {
                    is Resource.Loading -> {
                        _uiState.value = _uiState.value.copy(isLoading = true, error = null)
                    }
                    is Resource.Success -> {
                        _uiState.value = InventoryUiState(
                            items = resource.data ?: emptyList(),
                            isLoading = false,
                            error = null
                        )
                    }
                    is Resource.Error -> {
                        _uiState.value = InventoryUiState(
                            items = resource.data ?: emptyList(),
                            isLoading = false,
                            error = resource.exception?.message
                        )
                    }
                }
            }
        }
    }
    
    fun createItem(item: InventoryItemDto) {
        viewModelScope.launch {
            _uiState.value = _uiState.value.copy(isLoading = true)
            when (val result = inventoryRepository.createInventoryItem(item)) {
                is Resource.Success -> loadInventory(item.farmId)
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
    
    fun updateItem(item: InventoryItemDto) {
        viewModelScope.launch {
            _uiState.value = _uiState.value.copy(isLoading = true)
            when (val result = inventoryRepository.updateInventoryItem(item)) {
                is Resource.Success -> loadInventory(item.farmId)
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
    
    fun deleteItem(itemId: String, farmId: String?) {
        viewModelScope.launch {
            _uiState.value = _uiState.value.copy(isLoading = true)
            when (val result = inventoryRepository.deleteInventoryItem(itemId)) {
                is Resource.Success -> loadInventory(farmId)
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
    
    fun refresh(farmId: String? = null) {
        loadInventory(farmId)
    }
    
    fun clearError() {
        _uiState.value = _uiState.value.copy(error = null)
    }
}

data class InventoryUiState(
    val items: List<InventoryItemDto> = emptyList(),
    val isLoading: Boolean = false,
    val error: String? = null
)

