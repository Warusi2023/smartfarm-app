package com.smartfarm.data.repository

import com.smartfarm.data.database.dao.InventoryDao
import com.smartfarm.data.mapper.toDto
import com.smartfarm.data.mapper.toEntity
import com.smartfarm.data.model.InventoryItemDto
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
class InventoryRepository @Inject constructor(
    private val api: SmartFarmApi,
    private val inventoryDao: InventoryDao
) {
    
    fun getInventory(farmId: String? = null): Flow<Resource<List<InventoryItemDto>>> = flow {
        emit(Resource.Loading)
        
        val response = api.getInventory(farmId)
        if (response.isSuccessful && response.body() != null) {
            val items = response.body()!!
            inventoryDao.insertAll(items.map { it.toEntity() })
            emit(Resource.Success(items))
        } else {
            emit(Resource.Error(Exception("Network error: ${response.message()}")))
        }
    }.catch { e ->
        try {
            val cachedFlow = if (farmId != null) {
                inventoryDao.getInventoryByFarm(farmId)
            } else {
                inventoryDao.getAllInventory()
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
    
    fun observeInventory(farmId: String? = null): Flow<List<InventoryItemDto>> {
        val sourceFlow = if (farmId != null) {
            inventoryDao.getInventoryByFarm(farmId)
        } else {
            inventoryDao.getAllInventory()
        }
        return sourceFlow.map { entities ->
            entities.map { it.toDto() }
        }
    }
    
    suspend fun createInventoryItem(item: InventoryItemDto): Resource<InventoryItemDto> {
        return try {
            val response = api.createInventoryItem(item)
            if (response.isSuccessful && response.body() != null) {
                val created = response.body()!!
                inventoryDao.insertInventoryItem(created.toEntity())
                Resource.Success(created)
            } else {
                Resource.Error(Exception("Failed to create inventory item: ${response.message()}"))
            }
        } catch (e: Exception) {
            Resource.Error(e)
        }
    }
    
    suspend fun updateInventoryItem(item: InventoryItemDto): Resource<InventoryItemDto> {
        return try {
            val response = api.updateInventoryItem(item.id, item)
            if (response.isSuccessful && response.body() != null) {
                val updated = response.body()!!
                inventoryDao.updateInventoryItem(updated.toEntity())
                Resource.Success(updated)
            } else {
                Resource.Error(Exception("Failed to update inventory item: ${response.message()}"))
            }
        } catch (e: Exception) {
            Resource.Error(e)
        }
    }
    
    suspend fun deleteInventoryItem(itemId: String): Resource<Unit> {
        return try {
            val response = api.deleteInventoryItem(itemId)
            if (response.isSuccessful) {
                val entity = inventoryDao.getInventoryById(itemId)
                entity?.let { inventoryDao.deleteInventoryItem(it) }
                Resource.Success(Unit)
            } else {
                Resource.Error(Exception("Failed to delete inventory item: ${response.message()}"))
            }
        } catch (e: Exception) {
            Resource.Error(e)
        }
    }
}

