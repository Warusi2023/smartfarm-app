package com.example.smartfarm.data.model

import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import androidx.lifecycle.viewModelScope
import com.example.smartfarm.data.repository.LivestockRepository
import kotlinx.coroutines.flow.*
import kotlinx.coroutines.launch
import java.util.*

data class LivestockUiState(
    val livestock: List<Livestock> = emptyList(),
    val filteredLivestock: List<Livestock> = emptyList(),
    val categories: List<LivestockCategory> = emptyList(),
    val selectedCategory: LivestockCategory? = null,
    val searchQuery: String = "",
    val isLoading: Boolean = false,
    val error: String? = null,
    val showAddDialog: Boolean = false,
    val showEditDialog: Boolean = false,
    val selectedLivestock: Livestock? = null,
    val totalCount: Int = 0,
    val healthAlerts: List<Livestock> = emptyList(),
    val breedingAlerts: List<Livestock> = emptyList(),
    val vaccinationAlerts: List<Livestock> = emptyList()
)

class LivestockViewModel(private val repository: LivestockRepository) : ViewModel() {
    
    private val _uiState = MutableStateFlow(LivestockUiState())
    val uiState: StateFlow<LivestockUiState> = _uiState.asStateFlow()
    
    init {
        loadLivestock()
        loadCategories()
        observeLivestock()
    }
    
    private fun observeLivestock() {
        viewModelScope.launch {
            repository.getAllLivestock().collect { livestock ->
                val currentState = _uiState.value
                val filtered = filterLivestock(livestock, currentState.searchQuery, currentState.selectedCategory)
                val alerts = generateAlerts(livestock)
                
                _uiState.value = currentState.copy(
                    livestock = livestock,
                    filteredLivestock = filtered,
                    totalCount = livestock.size,
                    healthAlerts = alerts.healthAlerts,
                    breedingAlerts = alerts.breedingAlerts,
                    vaccinationAlerts = alerts.vaccinationAlerts
                )
            }
        }
    }
    
    private fun loadLivestock() {
        viewModelScope.launch {
            _uiState.value = _uiState.value.copy(isLoading = true, error = null)
            try {
                // Livestock is loaded via Flow observation
            } catch (e: Exception) {
                _uiState.value = _uiState.value.copy(
                    isLoading = false,
                    error = "Failed to load livestock: ${e.message}"
                )
            }
        }
    }
    
    private fun loadCategories() {
        viewModelScope.launch {
            try {
                repository.getAllCategories().collect { categories ->
                    _uiState.value = _uiState.value.copy(categories = categories)
                }
            } catch (e: Exception) {
                _uiState.value = _uiState.value.copy(
                    error = "Failed to load categories: ${e.message}"
                )
            }
        }
    }
    
    fun updateSearchQuery(query: String) {
        val currentState = _uiState.value
        val filtered = filterLivestock(currentState.livestock, query, currentState.selectedCategory)
        
        _uiState.value = currentState.copy(
            searchQuery = query,
            filteredLivestock = filtered
        )
    }
    
    fun updateSelectedCategory(category: LivestockCategory?) {
        val currentState = _uiState.value
        val filtered = filterLivestock(currentState.livestock, currentState.searchQuery, category)
        
        _uiState.value = currentState.copy(
            selectedCategory = category,
            filteredLivestock = filtered
        )
    }
    
    private fun filterLivestock(
        livestock: List<Livestock>,
        query: String,
        category: LivestockCategory?
    ): List<Livestock> {
        return livestock.filter { animal ->
            val matchesQuery = query.isEmpty() || 
                animal.name.contains(query, ignoreCase = true) ||
                animal.scientificName.contains(query, ignoreCase = true) ||
                animal.breed.contains(query, ignoreCase = true)
            
            val matchesCategory = category == null || animal.category == category
            
            matchesQuery && matchesCategory
        }
    }
    
    fun addLivestock(livestock: Livestock) {
        viewModelScope.launch {
            try {
                _uiState.value = _uiState.value.copy(isLoading = true, error = null)
                repository.insertLivestock(livestock)
                _uiState.value = _uiState.value.copy(
                    isLoading = false,
                    showAddDialog = false
                )
            } catch (e: Exception) {
                _uiState.value = _uiState.value.copy(
                    isLoading = false,
                    error = "Failed to add livestock: ${e.message}"
                )
            }
        }
    }
    
    fun updateLivestock(livestock: Livestock) {
        viewModelScope.launch {
            try {
                _uiState.value = _uiState.value.copy(isLoading = true, error = null)
                repository.updateLivestock(livestock)
                _uiState.value = _uiState.value.copy(
                    isLoading = false,
                    showEditDialog = false,
                    selectedLivestock = null
                )
            } catch (e: Exception) {
                _uiState.value = _uiState.value.copy(
                    isLoading = false,
                    error = "Failed to update livestock: ${e.message}"
                )
            }
        }
    }
    
    fun insertLivestock(livestock: Livestock) {
        viewModelScope.launch {
            try {
                _uiState.value = _uiState.value.copy(isLoading = true, error = null)
                repository.insertLivestock(livestock)
                _uiState.value = _uiState.value.copy(isLoading = false)
            } catch (e: Exception) {
                _uiState.value = _uiState.value.copy(
                    isLoading = false,
                    error = "Failed to insert livestock: ${e.message}"
                )
            }
        }
    }
    
    fun deleteLivestock(livestock: Livestock) {
        viewModelScope.launch {
            try {
                _uiState.value = _uiState.value.copy(isLoading = true, error = null)
                repository.deleteLivestock(livestock)
                _uiState.value = _uiState.value.copy(isLoading = false)
            } catch (e: Exception) {
                _uiState.value = _uiState.value.copy(
                    isLoading = false,
                    error = "Failed to delete livestock: ${e.message}"
                )
            }
        }
    }
    
    fun getLivestockById(id: Long): Livestock? {
        return _uiState.value.livestock.find { it.id == id }
    }
    
    fun showAddDialog() {
        _uiState.value = _uiState.value.copy(showAddDialog = true)
    }
    
    fun hideAddDialog() {
        _uiState.value = _uiState.value.copy(showAddDialog = false)
    }
    
    fun showEditDialog(livestock: Livestock) {
        _uiState.value = _uiState.value.copy(
            showEditDialog = true,
            selectedLivestock = livestock
        )
    }
    
    fun hideEditDialog() {
        _uiState.value = _uiState.value.copy(
            showEditDialog = false,
            selectedLivestock = null
        )
    }
    
    fun clearError() {
        _uiState.value = _uiState.value.copy(error = null)
    }
    
    private fun generateAlerts(livestock: List<Livestock>): Alerts {
        val currentTime = System.currentTimeMillis()
        val thirtyDaysFromNow = currentTime + (30 * 24 * 60 * 60 * 1000L)
        
        val healthAlerts = livestock.filter { animal ->
            animal.lastHealthCheck != null && 
            (currentTime - animal.lastHealthCheck!!) > (90 * 24 * 60 * 60 * 1000L) // 90 days
        }
        
        val breedingAlerts = livestock.filter { animal ->
            animal.breedingStatus == "Ready" && 
            animal.nextBreedingDate != null && 
            animal.nextBreedingDate!! <= thirtyDaysFromNow
        }
        
        val vaccinationAlerts = livestock.filter { animal ->
            animal.lastVaccination != null && 
            (currentTime - animal.lastVaccination!!) > (365 * 24 * 60 * 60 * 1000L) // 1 year
        }
        
        return Alerts(healthAlerts, breedingAlerts, vaccinationAlerts)
    }
    
    fun getLivestockByCategory(category: LivestockCategory): Flow<List<Livestock>> =
        repository.getLivestockByCategory(category)
    
    fun searchLivestock(query: String): Flow<List<Livestock>> =
        repository.searchLivestock(query)
    
    fun getAllCategories(): Flow<List<LivestockCategory>> =
        repository.getAllCategories()
    
    data class Alerts(
        val healthAlerts: List<Livestock>,
        val breedingAlerts: List<Livestock>,
        val vaccinationAlerts: List<Livestock>
    )
}

class LivestockViewModelFactory(private val repository: LivestockRepository) : ViewModelProvider.Factory {
    override fun <T : ViewModel> create(modelClass: Class<T>): T {
        if (modelClass.isAssignableFrom(LivestockViewModel::class.java)) {
            @Suppress("UNCHECKED_CAST")
            return LivestockViewModel(repository) as T
        }
        throw IllegalArgumentException("Unknown ViewModel class")
    }
} 