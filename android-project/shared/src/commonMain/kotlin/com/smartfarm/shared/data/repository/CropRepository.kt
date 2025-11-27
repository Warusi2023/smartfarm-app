package com.smartfarm.shared.data.repository

import com.smartfarm.shared.data.model.dto.CropDto
import com.smartfarm.shared.data.util.Resource
import com.smartfarm.shared.database.FarmDatabase
import com.smartfarm.shared.network.SmartFarmApi
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.flow
import kotlinx.coroutines.flow.map

/**
 * Shared Crop repository using SQLDelight and Ktor
 */
class CropRepository(
    private val api: SmartFarmApi,
    private val database: FarmDatabase
) {
    
    fun getCrops(farmId: String? = null): Flow<Resource<List<CropDto>>> = flow {
        emit(Resource.Loading)
        
        try {
            val networkResult = api.getCrops(farmId)
            when (networkResult) {
                is Resource.Success -> {
                    val crops = networkResult.data
                    // Cache the data
                    crops.forEach { crop ->
                        database.cropDatabaseQueries.insertCrop(
                            id = crop.id,
                            farmId = crop.farmId,
                            name = crop.name,
                            variety = crop.variety ?: "",
                            type = "", // Not in DTO, using empty string
                            plantingDate = crop.plantedDate?.toLongOrNull() ?: System.currentTimeMillis(),
                            expectedHarvestDate = crop.expectedHarvestDate?.toLongOrNull() ?: System.currentTimeMillis(),
                            area = crop.area ?: 0.0,
                            status = crop.status ?: "ACTIVE",
                            health = "GOOD", // Default value
                            yieldQuantity = null,
                            yieldUnit = null,
                            yieldQuality = null,
                            harvestDate = null,
                            createdAt = crop.createdAt?.toLongOrNull() ?: System.currentTimeMillis(),
                            updatedAt = crop.updatedAt?.toLongOrNull() ?: System.currentTimeMillis()
                        )
                    }
                    emit(Resource.Success(crops))
                }
                is Resource.Error -> {
                    val cached = getCropsFromCache(farmId)
                    if (cached.isNotEmpty()) {
                        emit(Resource.Error(networkResult.exception, cached))
                    } else {
                        emit(networkResult)
                    }
                }
                is Resource.Loading -> emit(Resource.Loading)
            }
        } catch (e: Exception) {
            val cached = getCropsFromCache(farmId)
            if (cached.isNotEmpty()) {
                emit(Resource.Error(e, cached))
            } else {
                emit(Resource.Error(e))
            }
        }
    }
    
    fun observeCrops(farmId: String? = null): Flow<List<CropDto>> {
        val query = if (farmId != null) {
            database.cropDatabaseQueries.getCropsByFarmId(farmId)
        } else {
            database.cropDatabaseQueries.getAllCrops()
        }
        
        return query.asFlow().map { queryResult ->
            queryResult.executeAsList().map { row ->
                CropDto(
                    id = row.id,
                    name = row.name,
                    variety = row.variety,
                    farmId = row.farmId,
                    plantedDate = row.plantingDate.toString(),
                    expectedHarvestDate = row.expectedHarvestDate.toString(),
                    area = row.area,
                    status = row.status,
                    notes = null, // Not in SQLDelight schema
                    createdAt = row.createdAt.toString(),
                    updatedAt = row.updatedAt.toString()
                )
            }
        }
    }
    
    suspend fun createCrop(crop: CropDto): Resource<CropDto> {
        return try {
            val result = api.createCrop(crop)
            when (result) {
                is Resource.Success -> {
                    val created = result.data
                    database.cropDatabaseQueries.insertCrop(
                        id = created.id,
                        farmId = created.farmId,
                        name = created.name,
                        variety = created.variety ?: "",
                        type = "",
                        plantingDate = created.plantedDate?.toLongOrNull() ?: System.currentTimeMillis(),
                        expectedHarvestDate = created.expectedHarvestDate?.toLongOrNull() ?: System.currentTimeMillis(),
                        area = created.area ?: 0.0,
                        status = created.status ?: "ACTIVE",
                        health = "GOOD",
                        yieldQuantity = null,
                        yieldUnit = null,
                        yieldQuality = null,
                        harvestDate = null,
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
    
    suspend fun updateCrop(crop: CropDto): Resource<CropDto> {
        return try {
            val result = api.updateCrop(crop.id, crop)
            when (result) {
                is Resource.Success -> {
                    val updated = result.data
                    database.cropDatabaseQueries.updateCrop(
                        farmId = updated.farmId,
                        name = updated.name,
                        variety = updated.variety ?: "",
                        type = "",
                        plantingDate = updated.plantedDate?.toLongOrNull() ?: System.currentTimeMillis(),
                        expectedHarvestDate = updated.expectedHarvestDate?.toLongOrNull() ?: System.currentTimeMillis(),
                        area = updated.area ?: 0.0,
                        status = updated.status ?: "ACTIVE",
                        health = "GOOD",
                        yieldQuantity = null,
                        yieldUnit = null,
                        yieldQuality = null,
                        harvestDate = null,
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
    
    suspend fun deleteCrop(cropId: String): Resource<Unit> {
        return try {
            val result = api.deleteCrop(cropId)
            when (result) {
                is Resource.Success -> {
                    database.cropDatabaseQueries.deleteCrop(cropId)
                    Resource.Success(Unit)
                }
                is Resource.Error -> result
                is Resource.Loading -> Resource.Error(Exception("Unexpected loading state"))
            }
        } catch (e: Exception) {
            Resource.Error(e)
        }
    }
    
    private suspend fun getCropsFromCache(farmId: String?): List<CropDto> {
        val query = if (farmId != null) {
            database.cropDatabaseQueries.getCropsByFarmId(farmId)
        } else {
            database.cropDatabaseQueries.getAllCrops()
        }
        
        return query.executeAsList().map { row ->
            CropDto(
                id = row.id,
                name = row.name,
                variety = row.variety,
                farmId = row.farmId,
                plantedDate = row.plantingDate.toString(),
                expectedHarvestDate = row.expectedHarvestDate.toString(),
                area = row.area,
                status = row.status,
                notes = null,
                createdAt = row.createdAt.toString(),
                updatedAt = row.updatedAt.toString()
            )
        }
    }
}

