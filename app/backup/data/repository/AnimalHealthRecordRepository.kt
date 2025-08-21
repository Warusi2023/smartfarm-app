package com.yourcompany.smartfarm.data.repository

import com.yourcompany.smartfarm.data.database.AnimalHealthRecordDao
import com.yourcompany.smartfarm.data.model.AnimalHealthRecord
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext

class AnimalHealthRecordRepository(private val dao: AnimalHealthRecordDao) {
    suspend fun insert(record: AnimalHealthRecord) = withContext(Dispatchers.IO) { dao.insert(record) }
    suspend fun getForAnimal(animalId: Long) = withContext(Dispatchers.IO) { dao.getForAnimal(animalId) }
    suspend fun getAll() = withContext(Dispatchers.IO) { dao.getAll() }
    suspend fun update(record: AnimalHealthRecord) = withContext(Dispatchers.IO) { dao.update(record) }
    suspend fun delete(record: AnimalHealthRecord) = withContext(Dispatchers.IO) { dao.delete(record) }
} 