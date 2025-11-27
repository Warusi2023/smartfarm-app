package com.smartfarm.shared.data.repository

import com.smartfarm.shared.data.model.dto.LivestockDto
import com.smartfarm.shared.data.util.Resource
import com.smartfarm.shared.database.FarmDatabase
import com.smartfarm.shared.network.SmartFarmApi
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.flow
import kotlinx.coroutines.flow.map

/**
 * Shared Livestock repository using SQLDelight and Ktor
 */
class LivestockRepository(
    private val api: SmartFarmApi,
    private val database: FarmDatabase
) {
    
    fun getLivestock(farmId: String? = null): Flow<Resource<List<LivestockDto>>> = flow {
        emit(Resource.Loading)
        
        try {
            val networkResult = api.getLivestock(farmId)
            when (networkResult) {
                is Resource.Success -> {
                    val livestock = networkResult.data
                    // Cache the data
                    livestock.forEach { item ->
                        database.livestockDatabaseQueries.insertLivestock(
                            id = item.id,
                            farmId = item.farmId,
                            name = item.name,
                            type = item.type,
                            breed = item.breed,
                            birthDate = item.birthDate,
                            weight = item.weight,
                            status = item.status,
                            location = item.location,
                            description = item.description,
                            tag = item.tag,
                            sex = item.sex,
                            purpose = item.purpose,
                            value = item.value,
                            createdAt = item.createdAt,
                            updatedAt = item.updatedAt
                        )
                    }
                    emit(Resource.Success(livestock))
                }
                is Resource.Error -> {
                    val cached = getLivestockFromCache(farmId)
                    if (cached.isNotEmpty()) {
                        emit(Resource.Error(networkResult.exception, cached))
                    } else {
                        emit(networkResult)
                    }
                }
                is Resource.Loading -> emit(Resource.Loading)
            }
        } catch (e: Exception) {
            val cached = getLivestockFromCache(farmId)
            if (cached.isNotEmpty()) {
                emit(Resource.Error(e, cached))
            } else {
                emit(Resource.Error(e))
            }
        }
    }
    
    fun observeLivestock(farmId: String? = null): Flow<List<LivestockDto>> {
        val query = if (farmId != null) {
            database.livestockDatabaseQueries.getLivestockByFarmId(farmId)
        } else {
            database.livestockDatabaseQueries.getAllLivestock()
        }
        
        return query.asFlow().map { queryResult ->
            queryResult.executeAsList().map { row ->
                LivestockDto(
                    id = row.id,
                    name = row.name,
                    type = row.type,
                    breed = row.breed,
                    farmId = row.farmId,
                    birthDate = row.birthDate,
                    weight = row.weight,
                    status = row.status,
                    location = row.location,
                    description = row.description,
                    tag = row.tag,
                    sex = row.sex,
                    purpose = row.purpose,
                    value = row.value,
                    createdAt = row.createdAt,
                    updatedAt = row.updatedAt
                )
            }
        }
    }
    
    suspend fun createLivestock(livestock: LivestockDto): Resource<LivestockDto> {
        return try {
            val result = api.createLivestock(livestock)
            when (result) {
                is Resource.Success -> {
                    val created = result.data
                    database.livestockDatabaseQueries.insertLivestock(
                        id = created.id,
                        farmId = created.farmId,
                        name = created.name,
                        type = created.type,
                        breed = created.breed,
                        birthDate = created.birthDate,
                        weight = created.weight,
                        status = created.status,
                        location = created.location,
                        description = created.description,
                        tag = created.tag,
                        sex = created.sex,
                        purpose = created.purpose,
                        value = created.value,
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
    
    suspend fun updateLivestock(livestock: LivestockDto): Resource<LivestockDto> {
        return try {
            val result = api.updateLivestock(livestock.id, livestock)
            when (result) {
                is Resource.Success -> {
                    val updated = result.data
                    database.livestockDatabaseQueries.updateLivestock(
                        farmId = updated.farmId,
                        name = updated.name,
                        type = updated.type,
                        breed = updated.breed,
                        birthDate = updated.birthDate,
                        weight = updated.weight,
                        status = updated.status,
                        location = updated.location,
                        description = updated.description,
                        tag = updated.tag,
                        sex = updated.sex,
                        purpose = updated.purpose,
                        value = updated.value,
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
    
    suspend fun deleteLivestock(livestockId: String): Resource<Unit> {
        return try {
            val result = api.deleteLivestock(livestockId)
            when (result) {
                is Resource.Success -> {
                    database.livestockDatabaseQueries.deleteLivestock(livestockId)
                    Resource.Success(Unit)
                }
                is Resource.Error -> result
                is Resource.Loading -> Resource.Error(Exception("Unexpected loading state"))
            }
        } catch (e: Exception) {
            Resource.Error(e)
        }
    }
    
    private suspend fun getLivestockFromCache(farmId: String?): List<LivestockDto> {
        val query = if (farmId != null) {
            database.livestockDatabaseQueries.getLivestockByFarmId(farmId)
        } else {
            database.livestockDatabaseQueries.getAllLivestock()
        }
        
        return query.executeAsList().map { row ->
            LivestockDto(
                id = row.id,
                name = row.name,
                type = row.type,
                breed = row.breed,
                farmId = row.farmId,
                birthDate = row.birthDate,
                weight = row.weight,
                status = row.status,
                location = row.location,
                description = row.description,
                tag = row.tag,
                sex = row.sex,
                purpose = row.purpose,
                value = row.value,
                createdAt = row.createdAt,
                updatedAt = row.updatedAt
            )
        }
    }
}

