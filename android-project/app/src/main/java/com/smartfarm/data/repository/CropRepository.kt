package com.smartfarm.data.repository

import com.smartfarm.data.database.dao.CropDao
import com.smartfarm.data.mapper.toDto
import com.smartfarm.data.mapper.toEntity
import com.smartfarm.data.model.CropDto
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
class CropRepository @Inject constructor(
    private val api: SmartFarmApi,
    private val cropDao: CropDao
) {
    
    fun getCrops(farmId: String? = null): Flow<Resource<List<CropDto>>> = flow {
        emit(Resource.Loading)
        
        val response = api.getCrops(farmId)
        if (response.isSuccessful && response.body() != null) {
            val crops = response.body()!!
            cropDao.insertAll(crops.map { it.toEntity() })
            emit(Resource.Success(crops))
        } else {
            emit(Resource.Error(Exception("Network error: ${response.message()}")))
        }
    }.catch { e ->
        try {
            val cachedFlow = if (farmId != null) {
                cropDao.getCropsByFarm(farmId)
            } else {
                cropDao.getAllCrops()
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
    
    fun observeCrops(farmId: String? = null): Flow<List<CropDto>> {
        val sourceFlow = if (farmId != null) {
            cropDao.getCropsByFarm(farmId)
        } else {
            cropDao.getAllCrops()
        }
        return sourceFlow.map { entities ->
            entities.map { it.toDto() }
        }
    }
    
    suspend fun createCrop(crop: CropDto): Resource<CropDto> {
        return try {
            val response = api.createCrop(crop)
            if (response.isSuccessful && response.body() != null) {
                val created = response.body()!!
                cropDao.insertCrop(created.toEntity())
                Resource.Success(created)
            } else {
                Resource.Error(Exception("Failed to create crop: ${response.message()}"))
            }
        } catch (e: Exception) {
            Resource.Error(e)
        }
    }
    
    suspend fun updateCrop(crop: CropDto): Resource<CropDto> {
        return try {
            val response = api.updateCrop(crop.id, crop)
            if (response.isSuccessful && response.body() != null) {
                val updated = response.body()!!
                cropDao.updateCrop(updated.toEntity())
                Resource.Success(updated)
            } else {
                Resource.Error(Exception("Failed to update crop: ${response.message()}"))
            }
        } catch (e: Exception) {
            Resource.Error(e)
        }
    }
    
    suspend fun deleteCrop(cropId: String): Resource<Unit> {
        return try {
            val response = api.deleteCrop(cropId)
            if (response.isSuccessful) {
                val entity = cropDao.getCropById(cropId)
                entity?.let { cropDao.deleteCrop(it) }
                Resource.Success(Unit)
            } else {
                Resource.Error(Exception("Failed to delete crop: ${response.message()}"))
            }
        } catch (e: Exception) {
            Resource.Error(e)
        }
    }
}

