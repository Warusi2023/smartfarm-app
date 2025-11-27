package com.smartfarm.shared.data.repository

import com.smartfarm.shared.data.model.dto.FarmDto
import com.smartfarm.shared.data.model.dto.LocationDto
import com.smartfarm.shared.data.util.Resource
import com.smartfarm.shared.database.FarmDatabase
import com.smartfarm.shared.network.SmartFarmApi
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.flow
import kotlinx.coroutines.flow.map

/**
 * Shared Farm repository using SQLDelight and Ktor
 */
class FarmRepository(
    private val api: SmartFarmApi,
    private val database: FarmDatabase
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
                    // Cache the data
                    farms.forEach { farm ->
                        database.insertFarm(
                            id = farm.id,
                            name = farm.name,
                            latitude = farm.location.latitude,
                            longitude = farm.location.longitude,
                            address = farm.location.address,
                            size = farm.size,
                            type = farm.type,
                            status = farm.status,
                            createdAt = farm.createdAt?.toLongOrNull() ?: System.currentTimeMillis(),
                            updatedAt = farm.updatedAt?.toLongOrNull() ?: System.currentTimeMillis()
                        )
                    }
                    emit(Resource.Success(farms))
                }
                is Resource.Error -> {
                    // Fallback to cache
                    val cached = getAllFarmsFromCache()
                    if (cached.isNotEmpty()) {
                        emit(Resource.Error(networkResult.exception, cached))
                    } else {
                        emit(networkResult)
                    }
                }
                is Resource.Loading -> emit(Resource.Loading)
            }
        } catch (e: Exception) {
            // On exception, try cache
            val cached = getAllFarmsFromCache()
            if (cached.isNotEmpty()) {
                emit(Resource.Error(e, cached))
            } else {
                emit(Resource.Error(e))
            }
        }
    }
    
    /**
     * Observe farms from cache (for real-time updates)
     */
    fun observeFarms(): Flow<List<FarmDto>> {
        return database.getAllFarms()
            .asFlow()
            .map { queryResult ->
                queryResult.executeAsList().map { farmRow ->
                    FarmDto(
                        id = farmRow.id,
                        name = farmRow.name,
                        location = LocationDto(
                            latitude = farmRow.latitude,
                            longitude = farmRow.longitude,
                            address = farmRow.address ?: ""
                        ),
                        size = farmRow.size,
                        type = farmRow.type,
                        status = farmRow.status,
                        ownerId = "", // Not in SQLDelight schema yet
                        createdAt = farmRow.createdAt.toString(),
                        updatedAt = farmRow.updatedAt.toString()
                    )
                }
            }
    }
    
    suspend fun createFarm(farm: FarmDto): Resource<FarmDto> {
        return try {
            val result = api.createFarm(farm)
            when (result) {
                is Resource.Success -> {
                    val created = result.data
                    // Cache the created farm
                    database.insertFarm(
                        id = created.id,
                        name = created.name,
                        latitude = created.location.latitude,
                        longitude = created.location.longitude,
                        address = created.location.address,
                        size = created.size,
                        type = created.type,
                        status = created.status,
                        createdAt = created.createdAt?.toLongOrNull() ?: System.currentTimeMillis(),
                        updatedAt = created.updatedAt?.toLongOrNull() ?: System.currentTimeMillis()
                    )
                    Resource.Success(created)
                }
                is Resource.Error -> result
                is Resource.Loading -> Resource.Error(Exception("Unexpected loading state"))
            }
        } catch (e: Exception) {
            Resource.Error(e)
        }
    }
    
    suspend fun updateFarm(farm: FarmDto): Resource<FarmDto> {
        return try {
            val result = api.updateFarm(farm.id, farm)
            when (result) {
                is Resource.Success -> {
                    val updated = result.data
                    // Update cache
                    database.updateFarm(
                        name = updated.name,
                        latitude = updated.location.latitude,
                        longitude = updated.location.longitude,
                        address = updated.location.address,
                        size = updated.size,
                        type = updated.type,
                        status = updated.status,
                        updatedAt = updated.updatedAt?.toLongOrNull() ?: System.currentTimeMillis(),
                        id = updated.id
                    )
                    Resource.Success(updated)
                }
                is Resource.Error -> result
                is Resource.Loading -> Resource.Error(Exception("Unexpected loading state"))
            }
        } catch (e: Exception) {
            Resource.Error(e)
        }
    }
    
    suspend fun deleteFarm(farmId: String): Resource<Unit> {
        return try {
            val result = api.deleteFarm(farmId)
            when (result) {
                is Resource.Success -> {
                    // Remove from cache
                    database.deleteFarm(farmId)
                    Resource.Success(Unit)
                }
                is Resource.Error -> result
                is Resource.Loading -> Resource.Error(Exception("Unexpected loading state"))
            }
        } catch (e: Exception) {
            Resource.Error(e)
        }
    }
    
    private suspend fun getAllFarmsFromCache(): List<FarmDto> {
        return try {
            database.getAllFarms()
                .executeAsList()
                .map { farmRow ->
                    FarmDto(
                        id = farmRow.id,
                        name = farmRow.name,
                        location = LocationDto(
                            latitude = farmRow.latitude,
                            longitude = farmRow.longitude,
                            address = farmRow.address ?: ""
                        ),
                        size = farmRow.size,
                        type = farmRow.type,
                        status = farmRow.status,
                        ownerId = "",
                        createdAt = farmRow.createdAt.toString(),
                        updatedAt = farmRow.updatedAt.toString()
                    )
                }
        } catch (e: Exception) {
            emptyList()
        }
    }
}

