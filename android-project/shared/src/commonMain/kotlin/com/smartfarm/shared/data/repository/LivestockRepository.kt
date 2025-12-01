package com.smartfarm.shared.data.repository

import com.smartfarm.shared.data.model.dto.LivestockDto
import com.smartfarm.shared.data.util.Resource
// import com.smartfarm.shared.database.FarmDatabase // Removed - database not available
import com.smartfarm.shared.network.SmartFarmApi
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.flow
import kotlinx.coroutines.flow.map

/**
 * Shared Livestock repository using SQLDelight and Ktor
 */
class LivestockRepository(
    private val api: SmartFarmApi
    // private val database: FarmDatabase // Removed - database not available
) {
    
    fun getLivestock(farmId: String? = null): Flow<Resource<List<LivestockDto>>> = flow {
        emit(Resource.Loading)
        
        try {
            val networkResult = api.getLivestock(farmId)
            when (networkResult) {
                is Resource.Success -> {
                    val livestock = networkResult.data
                    // Cache the data - database not available, stubbed
                    // livestock.forEach { item ->
                    //     database.livestockDatabaseQueries.insertLivestock(...)
                    // }
                    emit(Resource.Success(livestock))
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
    
    fun observeLivestock(farmId: String? = null): Flow<List<LivestockDto>> {
        // Database not available - return empty flow
        return flow { emit(emptyList()) }
    }
    
    suspend fun createLivestock(livestock: LivestockDto): Resource<LivestockDto> {
        return try {
            val result = api.createLivestock(livestock)
            when (result) {
                is Resource.Success -> {
                    val created = result.data
                    // Database not available - stubbed
                    // database.livestockDatabaseQueries.insertLivestock(...)
                    Resource.Success(created)
                }
                is Resource.Error -> result
                is Resource.Loading -> Resource.Error("Unexpected loading state", Exception("Unexpected loading state"))
            }
        } catch (e: Exception) {
            Resource.Error(e.message ?: "Error", e)
        }
    }
    
    suspend fun updateLivestock(livestock: LivestockDto): Resource<LivestockDto> {
        return try {
            val result = api.updateLivestock(livestock.id, livestock)
            when (result) {
                is Resource.Success -> {
                    val updated = result.data
                    // Database not available - stubbed
                    // database.livestockDatabaseQueries.updateLivestock(...)
                    Resource.Success(updated)
                }
                is Resource.Error -> result
                is Resource.Loading -> Resource.Error("Unexpected loading state", Exception("Unexpected loading state"))
            }
        } catch (e: Exception) {
            Resource.Error(e.message ?: "Error", e)
        }
    }
    
    suspend fun deleteLivestock(livestockId: String): Resource<Unit> {
        return try {
            val result = api.deleteLivestock(livestockId)
            when (result) {
                is Resource.Success -> {
                    // Database not available - stubbed
                    // database.livestockDatabaseQueries.deleteLivestock(livestockId)
                    Resource.Success(Unit)
                }
                is Resource.Error -> result
                is Resource.Loading -> Resource.Error("Unexpected loading state", Exception("Unexpected loading state"))
            }
        } catch (e: Exception) {
            Resource.Error(e.message ?: "Error", e)
        }
    }
    
    private suspend fun getLivestockFromCache(farmId: String?): List<LivestockDto> {
        // Database not available - return empty list
        return emptyList()
    }
}

