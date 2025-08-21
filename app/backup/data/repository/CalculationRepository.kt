package com.yourcompany.smartfarm.data.repository

import com.yourcompany.smartfarm.data.database.CalculationDao
import com.yourcompany.smartfarm.data.model.CalculationRecord
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext

class CalculationRepository(private val dao: CalculationDao) {
    suspend fun insert(record: CalculationRecord) = withContext(Dispatchers.IO) { dao.insert(record) }
    suspend fun getAll(): List<CalculationRecord> = withContext(Dispatchers.IO) { dao.getAll() }
    suspend fun delete(record: CalculationRecord) = withContext(Dispatchers.IO) { dao.delete(record) }
    suspend fun deleteAll() = withContext(Dispatchers.IO) { dao.deleteAll() }
} 