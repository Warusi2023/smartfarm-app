package com.example.smartfarm.data.repository

import com.example.smartfarm.data.database.YieldRecordDao
import com.example.smartfarm.data.model.YieldRecord
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext

class YieldRecordRepository(private val dao: YieldRecordDao) {
    suspend fun insert(record: YieldRecord) = withContext(Dispatchers.IO) { dao.insert(record) }
    suspend fun getForAnimal(animalId: Long) = withContext(Dispatchers.IO) { dao.getForAnimal(animalId) }
    suspend fun getAll() = withContext(Dispatchers.IO) { dao.getAll() }
    suspend fun update(record: YieldRecord) = withContext(Dispatchers.IO) { dao.update(record) }
    suspend fun delete(record: YieldRecord) = withContext(Dispatchers.IO) { dao.delete(record) }
} 