package com.smartfarm.shared.data.repository

import com.smartfarm.shared.data.model.dto.InventoryItemDto
import com.smartfarm.shared.data.util.Resource
// import com.smartfarm.shared.database.FarmDatabase // Removed - database not available
import com.smartfarm.shared.network.SmartFarmApi
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.flow
import kotlinx.coroutines.flow.map

/**
 * Shared Inventory repository using SQLDelight and Ktor
 */
class InventoryRepository(
    private val api: SmartFarmApi
    // private val database: FarmDatabase // Removed - database not available
) {
    
    fun getInventory(farmId: String? = null): Flow<Resource<List<InventoryItemDto>>> = flow {
        emit(Resource.Loading)
        
        try {
            val networkResult = api.getInventory(farmId)
            when (networkResult) {
                is Resource.Success -> {
                    val items = networkResult.data
                    // Cache the data - database not available, stubbed
                    // items.forEach { item ->
                    //     database.inventoryItemDatabaseQueries.insertInventoryItem(...)
                    // }
                    emit(Resource.Success(items))
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
    
    fun observeInventory(farmId: String? = null): Flow<List<InventoryItemDto>> {
        // Database not available - return empty flow
        return flow { emit(emptyList()) }
    }
    
    suspend fun createInventoryItem(item: InventoryItemDto): Resource<InventoryItemDto> {
        return try {
            val result = api.createInventoryItem(item)
            when (result) {
                is Resource.Success -> {
                    val created = result.data
                    // Database not available - stubbed
                    // database.inventoryItemDatabaseQueries.insertInventoryItem(...)
                    Resource.Success(created)
                }
                is Resource.Error -> result
                is Resource.Loading -> Resource.Error("Unexpected loading state", Exception("Unexpected loading state"))
            }
        } catch (e: Exception) {
            Resource.Error(e.message ?: "Error", e)
        }
    }
    
    suspend fun updateInventoryItem(item: InventoryItemDto): Resource<InventoryItemDto> {
        return try {
            val result = api.updateInventoryItem(item.id, item)
            when (result) {
                is Resource.Success -> {
                    val updated = result.data
                    // Database not available - stubbed
                    // database.inventoryItemDatabaseQueries.updateInventoryItem(...)
                    Resource.Success(updated)
                }
                is Resource.Error -> result
                is Resource.Loading -> Resource.Error("Unexpected loading state", Exception("Unexpected loading state"))
            }
        } catch (e: Exception) {
            Resource.Error(e.message ?: "Error", e)
        }
    }
    
    suspend fun deleteInventoryItem(itemId: String): Resource<Unit> {
        return try {
            val result = api.deleteInventoryItem(itemId)
            when (result) {
                is Resource.Success -> {
                    // Database not available - stubbed
                    // database.inventoryItemDatabaseQueries.deleteInventoryItem(itemId)
                    Resource.Success(Unit)
                }
                is Resource.Error -> result
                is Resource.Loading -> Resource.Error("Unexpected loading state", Exception("Unexpected loading state"))
            }
        } catch (e: Exception) {
            Resource.Error(e.message ?: "Error", e)
        }
    }
    
    private suspend fun getInventoryFromCache(farmId: String?): List<InventoryItemDto> {
        // Database not available - return empty list
        return emptyList()
    }
}

