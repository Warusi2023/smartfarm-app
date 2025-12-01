package com.smartfarm.shared.data.repository

import com.smartfarm.shared.data.model.dto.CropDto
import com.smartfarm.shared.data.util.Resource
// import com.smartfarm.shared.database.FarmDatabase // Removed - database not available
import com.smartfarm.shared.network.SmartFarmApi
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.flow
import kotlinx.coroutines.flow.map

/**
 * Shared Crop repository using SQLDelight and Ktor
 */
class CropRepository(
    private val api: SmartFarmApi
    // private val database: FarmDatabase // Removed - database not available
) {
    
    fun getCrops(farmId: String? = null): Flow<Resource<List<CropDto>>> = flow {
        emit(Resource.Loading)
        
        try {
            val networkResult = api.getCrops(farmId)
            when (networkResult) {
                is Resource.Success -> {
                    val crops = networkResult.data
                    // Cache the data - database not available, stubbed
                    // crops.forEach { crop ->
                    //     database.cropDatabaseQueries.insertCrop(...)
                    // }
                    emit(Resource.Success(crops))
                }
                is Resource.Error -> {
                    // Cache not available - stubbed
                    emit(networkResult)
                }
                is Resource.Loading -> emit(Resource.Loading)
            }
        } catch (e: Exception) {
            // Cache not available - stubbed
            emit(Resource.Error(e.message ?: "Error", e))
        }
    }
    
    fun observeCrops(farmId: String? = null): Flow<List<CropDto>> {
        // Database not available - return empty flow
        return flow { emit(emptyList()) }
        // val query = if (farmId != null) {
        //     database.cropDatabaseQueries.getCropsByFarmId(farmId)
        // } else {
        //     database.cropDatabaseQueries.getAllCrops()
        // }
        
    }
    
    suspend fun createCrop(crop: CropDto): Resource<CropDto> {
        return try {
            val result = api.createCrop(crop)
            when (result) {
                is Resource.Success -> {
                    val created = result.data
                    // Database not available - stubbed
                    // database.cropDatabaseQueries.insertCrop(...)
                    Resource.Success(created)
                }
                is Resource.Error -> result
                is Resource.Loading -> Resource.Error("Unexpected loading state", Exception("Unexpected loading state"))
            }
        } catch (e: Exception) {
            Resource.Error(e.message ?: "Error", e)
        }
    }
    
    suspend fun updateCrop(crop: CropDto): Resource<CropDto> {
        return try {
            val result = api.updateCrop(crop.id, crop)
            when (result) {
                is Resource.Success -> {
                    val updated = result.data
                    // Database not available - stubbed
                    // database.cropDatabaseQueries.updateCrop(...)
                    Resource.Success(updated)
                }
                is Resource.Error -> result
                is Resource.Loading -> Resource.Error("Unexpected loading state", Exception("Unexpected loading state"))
            }
        } catch (e: Exception) {
            Resource.Error(e.message ?: "Error", e)
        }
    }
    
    suspend fun deleteCrop(cropId: String): Resource<Unit> {
        return try {
            val result = api.deleteCrop(cropId)
            when (result) {
                is Resource.Success -> {
                    // Database not available - stubbed
                    // database.cropDatabaseQueries.deleteCrop(cropId)
                    Resource.Success(Unit)
                }
                is Resource.Error -> result
                is Resource.Loading -> Resource.Error("Unexpected loading state", Exception("Unexpected loading state"))
            }
        } catch (e: Exception) {
            Resource.Error(e.message ?: "Error", e)
        }
    }
    
    private suspend fun getCropsFromCache(farmId: String?): List<CropDto> {
        // Database not available - return empty list
        return emptyList()
    }
}

