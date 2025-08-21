package com.smartfarm.shared.domain.repository

import com.smartfarm.shared.domain.model.Livestock
import com.smartfarm.shared.domain.model.LivestockStatus
import com.smartfarm.shared.domain.model.LivestockType

interface LivestockRepository {
    suspend fun getAllLivestock(): List<Livestock>
    suspend fun getLivestockById(id: String): Livestock?
    suspend fun getLivestockByFarmId(farmId: String): List<Livestock>
    suspend fun getLivestockByType(type: LivestockType): List<Livestock>
    suspend fun getLivestockByStatus(status: LivestockStatus): List<Livestock>
    suspend fun getLivestockByStatusAndFarmId(status: LivestockStatus, farmId: String): List<Livestock>
    suspend fun searchLivestock(query: String): List<Livestock>
    suspend fun createLivestock(livestock: Livestock): Livestock
    suspend fun updateLivestock(livestock: Livestock): Livestock
    suspend fun deleteLivestock(id: String): Boolean
}
