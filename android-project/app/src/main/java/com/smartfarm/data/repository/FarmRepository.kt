package com.smartfarm.data.repository

import com.smartfarm.data.database.dao.FarmDao
import com.smartfarm.data.mapper.toDto
import com.smartfarm.data.mapper.toEntity
import com.smartfarm.data.model.FarmDto
import com.smartfarm.data.util.Resource
import com.smartfarm.network.SmartFarmApi
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.catch
import kotlinx.coroutines.flow.first
import kotlinx.coroutines.flow.flow
import kotlinx.coroutines.flow.flowOn
import kotlinx.coroutines.flow.map
import kotlinx.coroutines.Dispatchers
import javax.inject.Inject
import javax.inject.Singleton

@Singleton
class FarmRepository @Inject constructor(
    private val api: SmartFarmApi,
    private val farmDao: FarmDao
) {
    
    fun getFarms(): Flow<Resource<List<FarmDto>>> = flow {
        emit(Resource.Loading)
        
        // Try to fetch from network
        val response = api.getFarms()
        if (response.isSuccessful && response.body() != null) {
            val farms = response.body()!!
            // Cache the data
            farmDao.insertAll(farms.map { it.toEntity() })
            emit(Resource.Success(farms))
        } else {
            // Network error - emit error with null data
            emit(Resource.Error(Exception("Network error: ${response.message()}")))
        }
    }.catch { e ->
        // On exception, try to load from cache synchronously
        try {
            val cachedEntities = farmDao.getAllFarms()
            // Use first() to get a single snapshot
            val snapshot = cachedEntities.first()
            if (snapshot.isNotEmpty()) {
                emit(Resource.Error(e, snapshot.map { it.toDto() }))
            } else {
                emit(Resource.Error(e))
            }
        } catch (cacheError: Exception) {
            emit(Resource.Error(e))
        }
    }.flowOn(Dispatchers.IO)
    
    // Also provide a Flow that observes cache changes
    fun observeFarms(): Flow<List<FarmDto>> {
        return farmDao.getAllFarms().map { entities ->
            entities.map { it.toDto() }
        }
    }
    
    suspend fun createFarm(farm: FarmDto): Resource<FarmDto> {
        return try {
            val response = api.createFarm(farm)
            if (response.isSuccessful && response.body() != null) {
                val created = response.body()!!
                farmDao.insertFarm(created.toEntity())
                Resource.Success(created)
            } else {
                Resource.Error(Exception("Failed to create farm: ${response.message()}"))
            }
        } catch (e: Exception) {
            Resource.Error(e)
        }
    }
    
    suspend fun updateFarm(farm: FarmDto): Resource<FarmDto> {
        return try {
            val response = api.updateFarm(farm.id, farm)
            if (response.isSuccessful && response.body() != null) {
                val updated = response.body()!!
                farmDao.updateFarm(updated.toEntity())
                Resource.Success(updated)
            } else {
                Resource.Error(Exception("Failed to update farm: ${response.message()}"))
            }
        } catch (e: Exception) {
            Resource.Error(e)
        }
    }
    
    suspend fun deleteFarm(farmId: String): Resource<Unit> {
        return try {
            val response = api.deleteFarm(farmId)
            if (response.isSuccessful) {
                val entity = farmDao.getFarmById(farmId)
                entity?.let { farmDao.deleteFarm(it) }
                Resource.Success(Unit)
            } else {
                Resource.Error(Exception("Failed to delete farm: ${response.message()}"))
            }
        } catch (e: Exception) {
            Resource.Error(e)
        }
    }
}

