package com.smartfarm.shared.data.repository

import com.smartfarm.shared.data.model.dto.FarmDto
import com.smartfarm.shared.data.model.dto.LocationDto
import com.smartfarm.shared.data.util.Resource
// import com.smartfarm.shared.database.FarmDatabase // Removed - database not available
import com.smartfarm.shared.network.SmartFarmApi
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.flow
import kotlinx.coroutines.flow.map

/**
 * Shared Farm repository using SQLDelight and Ktor
 */
class FarmRepository(
    private val api: SmartFarmApi
    // private val database: FarmDatabase // Removed - database not available
) {
    
    /**
     * Get all farms - tries network first, falls back to cache
     */
    fun getFarms(): Flow<Resource<List<FarmDto>>> = flow {
        emit(Resource.Loading)
        
        try {
            // Try network first
            val networkResult = api.getFarms()
            when (networkResult) {
                is Resource.Success -> {
                    val farms = networkResult.data
                    // Cache the data - database not available, stubbed
                    // farms.forEach { farm ->
                    //     database.insertFarm(...)
                    // }
                    emit(Resource.Success(farms))
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
    
    /**
     * Observe farms from cache (for real-time updates)
     */
    fun observeFarms(): Flow<List<FarmDto>> {
        // Database not available - return empty flow
        return flow { emit(emptyList()) }
    }
    
    suspend fun createFarm(farm: FarmDto): Resource<FarmDto> {
        return try {
            val result = api.createFarm(farm)
            when (result) {
                is Resource.Success -> {
                    val created = result.data
                    // Database not available - stubbed
                    // database.insertFarm(...)
                    Resource.Success(created)
                }
                is Resource.Error -> result
                is Resource.Loading -> Resource.Error("Unexpected loading state", Exception("Unexpected loading state"))
            }
        } catch (e: Exception) {
            Resource.Error(e.message ?: "Error", e)
        }
    }
    
    suspend fun updateFarm(farm: FarmDto): Resource<FarmDto> {
        return try {
            val result = api.updateFarm(farm.id, farm)
            when (result) {
                is Resource.Success -> {
                    val updated = result.data
                    // Database not available - stubbed
                    // database.updateFarm(...)
                    Resource.Success(updated)
                }
                is Resource.Error -> result
                is Resource.Loading -> Resource.Error("Unexpected loading state", Exception("Unexpected loading state"))
            }
        } catch (e: Exception) {
            Resource.Error(e.message ?: "Error", e)
        }
    }
    
    suspend fun deleteFarm(farmId: String): Resource<Unit> {
        return try {
            val result = api.deleteFarm(farmId)
            when (result) {
                is Resource.Success -> {
                    // Database not available - stubbed
                    // database.deleteFarm(farmId)
                    Resource.Success(Unit)
                }
                is Resource.Error -> result
                is Resource.Loading -> Resource.Error("Unexpected loading state", Exception("Unexpected loading state"))
            }
        } catch (e: Exception) {
            Resource.Error(e.message ?: "Error", e)
        }
    }
    
    private suspend fun getAllFarmsFromCache(): List<FarmDto> {
        // Database not available - return empty list
        return emptyList()
    }
}

