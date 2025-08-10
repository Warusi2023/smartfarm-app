package com.example.smartfarm.data.repository

import com.example.smartfarm.data.database.CropDao
import com.example.smartfarm.data.model.Crop
import kotlinx.coroutines.flow.Flow

class CropRepository(private val dao: CropDao) {
    suspend fun insertCrop(crop: Crop) = dao.insertCrop(crop)
    fun getAllCrops(): Flow<List<Crop>> = dao.getAllCrops()
}
