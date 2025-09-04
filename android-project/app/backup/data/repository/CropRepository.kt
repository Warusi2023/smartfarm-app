package com.yourcompany.smartfarm.data.repository

import com.yourcompany.smartfarm.data.database.CropDao
import com.yourcompany.smartfarm.data.model.Crop
import kotlinx.coroutines.flow.Flow

class CropRepository(private val dao: CropDao) {
    suspend fun insertCrop(crop: Crop) = dao.insertCrop(crop)
    fun getAllCrops(): Flow<List<Crop>> = dao.getAllCrops()
}
