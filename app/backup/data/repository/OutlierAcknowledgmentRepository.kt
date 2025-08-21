package com.yourcompany.smartfarm.data.repository

import com.yourcompany.smartfarm.data.database.OutlierAcknowledgmentDao
import com.yourcompany.smartfarm.data.model.OutlierAcknowledgment
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext

class OutlierAcknowledgmentRepository(private val dao: OutlierAcknowledgmentDao) {
    suspend fun insert(ack: OutlierAcknowledgment) = withContext(Dispatchers.IO) { dao.insert(ack) }
    suspend fun getForAnimal(animalId: Long) = withContext(Dispatchers.IO) { dao.getForAnimal(animalId) }
    suspend fun getAll() = withContext(Dispatchers.IO) { dao.getAll() }
    suspend fun delete(ack: OutlierAcknowledgment) = withContext(Dispatchers.IO) { dao.delete(ack) }
} 