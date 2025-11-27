package com.smartfarm.data.repository

import com.smartfarm.data.database.dao.LivestockDao
import com.smartfarm.data.mapper.toDto
import com.smartfarm.data.mapper.toEntity
import com.smartfarm.data.model.LivestockDto
import com.smartfarm.data.util.Resource
import com.smartfarm.network.SmartFarmApi
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.catch
import kotlinx.coroutines.flow.first
import kotlinx.coroutines.flow.flow
import kotlinx.coroutines.flow.flowOn
import kotlinx.coroutines.flow.map
import javax.inject.Inject
import javax.inject.Singleton

@Singleton
class LivestockRepository @Inject constructor(
    private val api: SmartFarmApi,
    private val livestockDao: LivestockDao
) {
    
    fun getLivestock(farmId: String? = null): Flow<Resource<List<LivestockDto>>> = flow {
        emit(Resource.Loading)
        
        val response = api.getLivestock(farmId)
        if (response.isSuccessful && response.body() != null) {
            val livestock = response.body()!!
            livestockDao.insertAll(livestock.map { it.toEntity() })
            emit(Resource.Success(livestock))
        } else {
            emit(Resource.Error(Exception("Network error: ${response.message()}")))
        }
    }.catch { e ->
        try {
            val cachedFlow = if (farmId != null) {
                livestockDao.getLivestockByFarm(farmId)
            } else {
                livestockDao.getAllLivestock()
            }
            val snapshot = cachedFlow.first()
            if (snapshot.isNotEmpty()) {
                emit(Resource.Error(e, snapshot.map { it.toDto() }))
            } else {
                emit(Resource.Error(e))
            }
        } catch (cacheError: Exception) {
            emit(Resource.Error(e))
        }
    }.flowOn(Dispatchers.IO)
    
    fun observeLivestock(farmId: String? = null): Flow<List<LivestockDto>> {
        val sourceFlow = if (farmId != null) {
            livestockDao.getLivestockByFarm(farmId)
        } else {
            livestockDao.getAllLivestock()
        }
        return sourceFlow.map { entities ->
            entities.map { it.toDto() }
        }
    }
    
    suspend fun createLivestock(livestock: LivestockDto): Resource<LivestockDto> {
        return try {
            val response = api.createLivestock(livestock)
            if (response.isSuccessful && response.body() != null) {
                val created = response.body()!!
                livestockDao.insertLivestock(created.toEntity())
                Resource.Success(created)
            } else {
                Resource.Error(Exception("Failed to create livestock: ${response.message()}"))
            }
        } catch (e: Exception) {
            Resource.Error(e)
        }
    }
    
    suspend fun updateLivestock(livestock: LivestockDto): Resource<LivestockDto> {
        return try {
            val response = api.updateLivestock(livestock.id, livestock)
            if (response.isSuccessful && response.body() != null) {
                val updated = response.body()!!
                livestockDao.updateLivestock(updated.toEntity())
                Resource.Success(updated)
            } else {
                Resource.Error(Exception("Failed to update livestock: ${response.message()}"))
            }
        } catch (e: Exception) {
            Resource.Error(e)
        }
    }
    
    suspend fun deleteLivestock(livestockId: String): Resource<Unit> {
        return try {
            val response = api.deleteLivestock(livestockId)
            if (response.isSuccessful) {
                val entity = livestockDao.getLivestockById(livestockId)
                entity?.let { livestockDao.deleteLivestock(it) }
                Resource.Success(Unit)
            } else {
                Resource.Error(Exception("Failed to delete livestock: ${response.message()}"))
            }
        } catch (e: Exception) {
            Resource.Error(e)
        }
    }
}

