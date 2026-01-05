package com.smartfarm.shared.data.repository

import com.smartfarm.shared.data.model.dto.*
import com.smartfarm.shared.data.util.Resource
import com.smartfarm.shared.network.SmartFarmApi
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.asStateFlow

/**
 * Biological Farming Repository
 * Shared repository for managing beneficial insects, pests, and crop guides
 */
class BiologicalFarmingRepository(
    private val api: SmartFarmApi
) {
    private val _beneficialInsects = MutableStateFlow<List<BeneficialInsectDto>>(emptyList())
    val beneficialInsects: Flow<List<BeneficialInsectDto>> = _beneficialInsects.asStateFlow()
    
    private val _harmfulPests = MutableStateFlow<List<HarmfulPestDto>>(emptyList())
    val harmfulPests: Flow<List<HarmfulPestDto>> = _harmfulPests.asStateFlow()
    
    private val _cropGuides = MutableStateFlow<Map<String, CropGuideDto>>(emptyMap())
    val cropGuides: Flow<Map<String, CropGuideDto>> = _cropGuides.asStateFlow()
    
    /**
     * Fetch all beneficial insects
     */
    suspend fun getBeneficialInsects(): Resource<List<BeneficialInsectDto>> {
        val result = api.getBeneficialInsects()
        return when (result) {
            is Resource.Success -> {
                _beneficialInsects.value = result.data
                result
            }
            else -> result
        }
    }
    
    /**
     * Get a specific beneficial insect by ID
     */
    suspend fun getBeneficialInsect(id: Int): Resource<BeneficialInsectDto> {
        return api.getBeneficialInsect(id)
    }
    
    /**
     * Fetch all harmful pests
     */
    suspend fun getHarmfulPests(): Resource<List<HarmfulPestDto>> {
        val result = api.getHarmfulPests()
        return when (result) {
            is Resource.Success -> {
                _harmfulPests.value = result.data
                result
            }
            else -> result
        }
    }
    
    /**
     * Get a specific harmful pest by ID
     */
    suspend fun getHarmfulPest(id: Int): Resource<HarmfulPestDto> {
        return api.getHarmfulPest(id)
    }
    
    /**
     * Fetch all crop guides
     */
    suspend fun getCropGuides(): Resource<Map<String, CropGuideDto>> {
        val result = api.getCropGuides()
        return when (result) {
            is Resource.Success -> {
                _cropGuides.value = result.data
                result
            }
            else -> result
        }
    }
    
    /**
     * Get crop guide for a specific crop
     */
    suspend fun getCropGuide(cropName: String): Resource<CropGuideDto> {
        return api.getCropGuide(cropName)
    }
    
    /**
     * Match beneficial insects for a specific pest
     */
    suspend fun matchBeneficialInsectsForPest(pestName: String): Resource<List<MatchingInsectDto>> {
        return api.matchBeneficialInsectsForPest(pestName)
    }
    
    /**
     * Get recommendations for a specific crop
     */
    suspend fun getCropRecommendations(cropName: String): Resource<CropRecommendationsResponse> {
        return api.getCropRecommendations(cropName)
    }
    
    /**
     * Refresh all data
     */
    suspend fun refresh() {
        getBeneficialInsects()
        getHarmfulPests()
        getCropGuides()
    }
}

