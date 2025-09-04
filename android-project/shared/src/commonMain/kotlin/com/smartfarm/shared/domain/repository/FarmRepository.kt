package com.smartfarm.shared.domain.repository

import com.smartfarm.shared.domain.model.Farm

interface FarmRepository {
    suspend fun getAllFarms(): List<Farm>
    suspend fun getFarmById(id: String): Farm?
    suspend fun getFarmsByType(type: com.smartfarm.shared.domain.model.FarmType): List<Farm>
    suspend fun getFarmsByStatus(status: com.smartfarm.shared.domain.model.FarmStatus): List<Farm>
    suspend fun searchFarms(query: String): List<Farm>
    suspend fun createFarm(farm: Farm): Farm
    suspend fun updateFarm(farm: Farm): Farm
    suspend fun deleteFarm(id: String): Boolean
}
