package com.smartfarm.shared.domain.repository

import com.smartfarm.shared.domain.model.Crop
import com.smartfarm.shared.domain.model.CropStatus
import com.smartfarm.shared.domain.model.CropType

interface CropRepository {
    suspend fun getAllCrops(): List<Crop>
    suspend fun getCropById(id: String): Crop?
    suspend fun getCropsByFarmId(farmId: String): List<Crop>
    suspend fun getCropsByType(type: CropType): List<Crop>
    suspend fun getCropsByStatus(status: CropStatus): List<Crop>
    suspend fun getCropsByStatusAndFarmId(status: CropStatus, farmId: String): List<Crop>
    suspend fun searchCrops(query: String): List<Crop>
    suspend fun createCrop(crop: Crop): Crop
    suspend fun updateCrop(crop: Crop): Crop
    suspend fun deleteCrop(id: String): Boolean
}
