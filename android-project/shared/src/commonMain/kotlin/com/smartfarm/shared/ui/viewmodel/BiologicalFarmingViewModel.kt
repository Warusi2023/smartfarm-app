package com.smartfarm.shared.ui.viewmodel

import com.smartfarm.shared.data.model.dto.*
import com.smartfarm.shared.data.repository.BiologicalFarmingRepository
import com.smartfarm.shared.data.util.Resource
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow

/**
 * Biological Farming ViewModel
 * Shared ViewModel for managing biological farming UI state
 */
class BiologicalFarmingViewModel(
    private val repository: BiologicalFarmingRepository
) {
    private val _beneficialInsectsState = MutableStateFlow<BiologicalFarmingUiState<List<BeneficialInsectDto>>>(
        BiologicalFarmingUiState.Loading
    )
    val beneficialInsectsState: StateFlow<BiologicalFarmingUiState<List<BeneficialInsectDto>>> = 
        _beneficialInsectsState.asStateFlow()
    
    private val _harmfulPestsState = MutableStateFlow<BiologicalFarmingUiState<List<HarmfulPestDto>>>(
        BiologicalFarmingUiState.Loading
    )
    val harmfulPestsState: StateFlow<BiologicalFarmingUiState<List<HarmfulPestDto>>> = 
        _harmfulPestsState.asStateFlow()
    
    private val _cropGuidesState = MutableStateFlow<BiologicalFarmingUiState<Map<String, CropGuideDto>>>(
        BiologicalFarmingUiState.Loading
    )
    val cropGuidesState: StateFlow<BiologicalFarmingUiState<Map<String, CropGuideDto>>> = 
        _cropGuidesState.asStateFlow()
    
    private val _selectedCropGuide = MutableStateFlow<CropGuideDto?>(null)
    val selectedCropGuide: StateFlow<CropGuideDto?> = _selectedCropGuide.asStateFlow()
    
    private val _selectedCropName = MutableStateFlow<String?>(null)
    val selectedCropName: StateFlow<String?> = _selectedCropName.asStateFlow()
    
    private val _cropRecommendations = MutableStateFlow<CropRecommendationsResponse?>(null)
    val cropRecommendations: StateFlow<CropRecommendationsResponse?> = _cropRecommendations.asStateFlow()
    
    private val _pestMatches = MutableStateFlow<List<MatchingInsectDto>>(emptyList())
    val pestMatches: StateFlow<List<MatchingInsectDto>> = _pestMatches.asStateFlow()
    
    /**
     * Load beneficial insects
     */
    suspend fun loadBeneficialInsects() {
        _beneficialInsectsState.value = BiologicalFarmingUiState.Loading
        val result = repository.getBeneficialInsects()
        _beneficialInsectsState.value = when (result) {
            is Resource.Success -> BiologicalFarmingUiState.Success(result.data)
            is Resource.Error -> BiologicalFarmingUiState.Error(result.message ?: "Failed to load beneficial insects")
            is Resource.Loading -> BiologicalFarmingUiState.Loading
        }
    }
    
    /**
     * Load harmful pests
     */
    suspend fun loadHarmfulPests() {
        _harmfulPestsState.value = BiologicalFarmingUiState.Loading
        val result = repository.getHarmfulPests()
        _harmfulPestsState.value = when (result) {
            is Resource.Success -> BiologicalFarmingUiState.Success(result.data)
            is Resource.Error -> BiologicalFarmingUiState.Error(result.message ?: "Failed to load harmful pests")
            is Resource.Loading -> BiologicalFarmingUiState.Loading
        }
    }
    
    /**
     * Load crop guides
     */
    suspend fun loadCropGuides() {
        _cropGuidesState.value = BiologicalFarmingUiState.Loading
        val result = repository.getCropGuides()
        _cropGuidesState.value = when (result) {
            is Resource.Success -> BiologicalFarmingUiState.Success(result.data)
            is Resource.Error -> BiologicalFarmingUiState.Error(result.message ?: "Failed to load crop guides")
            is Resource.Loading -> BiologicalFarmingUiState.Loading
        }
    }
    
    /**
     * Load crop guide for a specific crop
     */
    suspend fun loadCropGuide(cropName: String) {
        _selectedCropName.value = cropName
        val result = repository.getCropGuide(cropName)
        if (result is Resource.Success) {
            _selectedCropGuide.value = result.data
            // Also load recommendations
            loadCropRecommendations(cropName)
        }
    }
    
    /**
     * Load crop recommendations
     */
    suspend fun loadCropRecommendations(cropName: String) {
        val result = repository.getCropRecommendations(cropName)
        if (result is Resource.Success) {
            _cropRecommendations.value = result.data
        }
    }
    
    /**
     * Match beneficial insects for a pest
     */
    suspend fun matchInsectsForPest(pestName: String) {
        val result = repository.matchBeneficialInsectsForPest(pestName)
        if (result is Resource.Success) {
            _pestMatches.value = result.data
        }
    }
    
    /**
     * Refresh all data
     */
    suspend fun refresh() {
        repository.refresh()
        loadBeneficialInsects()
        loadHarmfulPests()
        loadCropGuides()
    }
    
    /**
     * Clear selected crop
     */
    fun clearSelectedCrop() {
        _selectedCropName.value = null
        _selectedCropGuide.value = null
        _cropRecommendations.value = null
    }
}

/**
 * UI State for Biological Farming
 */
sealed class BiologicalFarmingUiState<out T> {
    object Loading : BiologicalFarmingUiState<Nothing>()
    data class Success<T>(val data: T) : BiologicalFarmingUiState<T>()
    data class Error(val message: String) : BiologicalFarmingUiState<Nothing>()
}

