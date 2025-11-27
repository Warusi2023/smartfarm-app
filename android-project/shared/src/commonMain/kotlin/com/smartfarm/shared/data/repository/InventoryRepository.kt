package com.smartfarm.shared.data.repository

import com.smartfarm.shared.data.model.dto.InventoryItemDto
import com.smartfarm.shared.data.util.Resource
import com.smartfarm.shared.database.FarmDatabase
import com.smartfarm.shared.network.SmartFarmApi
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.flow
import kotlinx.coroutines.flow.map

/**
 * Shared Inventory repository using SQLDelight and Ktor
 */
class InventoryRepository(
    private val api: SmartFarmApi,
    private val database: FarmDatabase
) {
    
    fun getInventory(farmId: String? = null): Flow<Resource<List<InventoryItemDto>>> = flow {
        emit(Resource.Loading)
        
        try {
            val networkResult = api.getInventory(farmId)
            when (networkResult) {
                is Resource.Success -> {
                    val items = networkResult.data
                    // Cache the data
                    items.forEach { item ->
                        database.inventoryItemDatabaseQueries.insertInventoryItem(
                            id = item.id,
                            farmId = item.farmId,
                            name = item.name,
                            category = item.category,
                            quantity = item.quantity,
                            unit = item.unit,
                            cost = item.cost,
                            supplier = item.supplier,
                            expiryDate = item.expiryDate,
                            location = item.location,
                            notes = item.notes,
                            createdAt = item.createdAt,
                            updatedAt = item.updatedAt
                        )
                    }
                    emit(Resource.Success(items))
                }
                is Resource.Error -> {
                    val cached = getInventoryFromCache(farmId)
                    if (cached.isNotEmpty()) {
                        emit(Resource.Error(networkResult.exception, cached))
                    } else {
                        emit(networkResult)
                    }
                }
                is Resource.Loading -> emit(Resource.Loading)
            }
        } catch (e: Exception) {
            val cached = getInventoryFromCache(farmId)
            if (cached.isNotEmpty()) {
                emit(Resource.Error(e, cached))
            } else {
                emit(Resource.Error(e))
            }
        }
    }
    
    fun observeInventory(farmId: String? = null): Flow<List<InventoryItemDto>> {
        val query = if (farmId != null) {
            database.inventoryItemDatabaseQueries.getInventoryItemsByFarmId(farmId)
        } else {
            database.inventoryItemDatabaseQueries.getAllInventoryItems()
        }
        
        return query.asFlow().map { queryResult ->
            queryResult.executeAsList().map { row ->
                InventoryItemDto(
                    id = row.id,
                    name = row.name,
                    category = row.category,
                    quantity = row.quantity,
                    unit = row.unit,
                    farmId = row.farmId,
                    cost = row.cost,
                    supplier = row.supplier,
                    expiryDate = row.expiryDate,
                    location = row.location,
                    notes = row.notes,
                    createdAt = row.createdAt,
                    updatedAt = row.updatedAt
                )
            }
        }
    }
    
    suspend fun createInventoryItem(item: InventoryItemDto): Resource<InventoryItemDto> {
        return try {
            val result = api.createInventoryItem(item)
            when (result) {
                is Resource.Success -> {
                    val created = result.data
                    database.inventoryItemDatabaseQueries.insertInventoryItem(
                        id = created.id,
                        farmId = created.farmId,
                        name = created.name,
                        category = created.category,
                        quantity = created.quantity,
                        unit = created.unit,
                        cost = created.cost,
                        supplier = created.supplier,
                        expiryDate = created.expiryDate,
                        location = created.location,
                        notes = created.notes,
                        createdAt = created.createdAt,
                        updatedAt = created.updatedAt
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
    
    suspend fun updateInventoryItem(item: InventoryItemDto): Resource<InventoryItemDto> {
        return try {
            val result = api.updateInventoryItem(item.id, item)
            when (result) {
                is Resource.Success -> {
                    val updated = result.data
                    database.inventoryItemDatabaseQueries.updateInventoryItem(
                        farmId = updated.farmId,
                        name = updated.name,
                        category = updated.category,
                        quantity = updated.quantity,
                        unit = updated.unit,
                        cost = updated.cost,
                        supplier = updated.supplier,
                        expiryDate = updated.expiryDate,
                        location = updated.location,
                        notes = updated.notes,
                        updatedAt = updated.updatedAt,
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
    
    suspend fun deleteInventoryItem(itemId: String): Resource<Unit> {
        return try {
            val result = api.deleteInventoryItem(itemId)
            when (result) {
                is Resource.Success -> {
                    database.inventoryItemDatabaseQueries.deleteInventoryItem(itemId)
                    Resource.Success(Unit)
                }
                is Resource.Error -> result
                is Resource.Loading -> Resource.Error(Exception("Unexpected loading state"))
            }
        } catch (e: Exception) {
            Resource.Error(e)
        }
    }
    
    private suspend fun getInventoryFromCache(farmId: String?): List<InventoryItemDto> {
        val query = if (farmId != null) {
            database.inventoryItemDatabaseQueries.getInventoryItemsByFarmId(farmId)
        } else {
            database.inventoryItemDatabaseQueries.getAllInventoryItems()
        }
        
        return query.executeAsList().map { row ->
            InventoryItemDto(
                id = row.id,
                name = row.name,
                category = row.category,
                quantity = row.quantity,
                unit = row.unit,
                farmId = row.farmId,
                cost = row.cost,
                supplier = row.supplier,
                expiryDate = row.expiryDate,
                location = row.location,
                notes = row.notes,
                createdAt = row.createdAt,
                updatedAt = row.updatedAt
            )
        }
    }
}

