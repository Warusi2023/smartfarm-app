package com.yourcompany.smartfarm.data.repository

import com.yourcompany.smartfarm.data.database.FarmActivityDao
import com.yourcompany.smartfarm.data.model.FarmActivity
import kotlinx.coroutines.flow.Flow

class FarmActivityRepository(private val dao: FarmActivityDao) {
    suspend fun insert(activity: FarmActivity) = dao.insert(activity)
    suspend fun update(activity: FarmActivity) = dao.update(activity)
    suspend fun delete(activity: FarmActivity) = dao.delete(activity)
    suspend fun getById(id: Long) = dao.getById(id)
    fun getAll(): Flow<List<FarmActivity>> = dao.getAll()
    fun getByDate(date: String): Flow<List<FarmActivity>> = dao.getByDate(date)
} 