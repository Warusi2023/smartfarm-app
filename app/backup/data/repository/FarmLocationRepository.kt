package com.yourcompany.smartfarm.data.repository

import com.yourcompany.smartfarm.data.database.FarmLocationDao
import com.yourcompany.smartfarm.data.model.FarmLocation
import kotlinx.coroutines.flow.Flow

class FarmLocationRepository(private val dao: FarmLocationDao) {
    suspend fun upsert(location: FarmLocation) = dao.upsert(location)
    fun getFarmLocation(): Flow<FarmLocation?> = dao.getFarmLocation()
    suspend fun deleteAll() = dao.deleteAll()
} 