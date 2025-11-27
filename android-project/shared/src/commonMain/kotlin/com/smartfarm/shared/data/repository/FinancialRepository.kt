package com.smartfarm.shared.data.repository

import com.smartfarm.shared.data.model.dto.FinancialRecordDto
import com.smartfarm.shared.data.util.Resource
import com.smartfarm.shared.database.FarmDatabase
import com.smartfarm.shared.network.SmartFarmApi
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.flow
import kotlinx.coroutines.flow.map

/**
 * Shared Financial repository using SQLDelight and Ktor
 */
class FinancialRepository(
    private val api: SmartFarmApi,
    private val database: FarmDatabase
) {
    
    fun getFinancialRecords(farmId: String? = null): Flow<Resource<List<FinancialRecordDto>>> = flow {
        emit(Resource.Loading)
        
        try {
            val networkResult = api.getFinancialRecords(farmId)
            when (networkResult) {
                is Resource.Success -> {
                    val records = networkResult.data
                    // Cache the data
                    records.forEach { record ->
                        database.financialRecordDatabaseQueries.insertFinancialRecord(
                            id = record.id,
                            farmId = record.farmId,
                            type = record.type,
                            category = record.category,
                            amount = record.amount,
                            description = record.description,
                            date = record.date,
                            createdAt = record.createdAt,
                            updatedAt = record.updatedAt
                        )
                    }
                    emit(Resource.Success(records))
                }
                is Resource.Error -> {
                    val cached = getFinancialRecordsFromCache(farmId)
                    if (cached.isNotEmpty()) {
                        emit(Resource.Error(networkResult.exception, cached))
                    } else {
                        emit(networkResult)
                    }
                }
                is Resource.Loading -> emit(Resource.Loading)
            }
        } catch (e: Exception) {
            val cached = getFinancialRecordsFromCache(farmId)
            if (cached.isNotEmpty()) {
                emit(Resource.Error(e, cached))
            } else {
                emit(Resource.Error(e))
            }
        }
    }
    
    fun observeFinancialRecords(farmId: String? = null): Flow<List<FinancialRecordDto>> {
        val query = if (farmId != null) {
            database.financialRecordDatabaseQueries.getFinancialRecordsByFarmId(farmId)
        } else {
            database.financialRecordDatabaseQueries.getAllFinancialRecords()
        }
        
        return query.asFlow().map { queryResult ->
            queryResult.executeAsList().map { row ->
                FinancialRecordDto(
                    id = row.id,
                    type = row.type,
                    category = row.category,
                    amount = row.amount,
                    farmId = row.farmId,
                    description = row.description,
                    date = row.date,
                    createdAt = row.createdAt,
                    updatedAt = row.updatedAt
                )
            }
        }
    }
    
    suspend fun createFinancialRecord(record: FinancialRecordDto): Resource<FinancialRecordDto> {
        return try {
            val result = api.createFinancialRecord(record)
            when (result) {
                is Resource.Success -> {
                    val created = result.data
                    database.financialRecordDatabaseQueries.insertFinancialRecord(
                        id = created.id,
                        farmId = created.farmId,
                        type = created.type,
                        category = created.category,
                        amount = created.amount,
                        description = created.description,
                        date = created.date,
                        createdAt = created.createdAt,
                        updatedAt = created.updatedAt
                    )
                    Resource.Success(created)
                }
                is Resource.Error -> result
                is Resource.Loading -> Resource.Error(Exception("Unexpected loading state"))
            }
        } catch (e: Exception) {
            Resource.Error(e)
        }
    }
    
    suspend fun updateFinancialRecord(record: FinancialRecordDto): Resource<FinancialRecordDto> {
        return try {
            val result = api.updateFinancialRecord(record.id, record)
            when (result) {
                is Resource.Success -> {
                    val updated = result.data
                    database.financialRecordDatabaseQueries.updateFinancialRecord(
                        farmId = updated.farmId,
                        type = updated.type,
                        category = updated.category,
                        amount = updated.amount,
                        description = updated.description,
                        date = updated.date,
                        updatedAt = updated.updatedAt,
                        id = updated.id
                    )
                    Resource.Success(updated)
                }
                is Resource.Error -> result
                is Resource.Loading -> Resource.Error(Exception("Unexpected loading state"))
            }
        } catch (e: Exception) {
            Resource.Error(e)
        }
    }
    
    suspend fun deleteFinancialRecord(recordId: String): Resource<Unit> {
        return try {
            val result = api.deleteFinancialRecord(recordId)
            when (result) {
                is Resource.Success -> {
                    database.financialRecordDatabaseQueries.deleteFinancialRecord(recordId)
                    Resource.Success(Unit)
                }
                is Resource.Error -> result
                is Resource.Loading -> Resource.Error(Exception("Unexpected loading state"))
            }
        } catch (e: Exception) {
            Resource.Error(e)
        }
    }
    
    private suspend fun getFinancialRecordsFromCache(farmId: String?): List<FinancialRecordDto> {
        val query = if (farmId != null) {
            database.financialRecordDatabaseQueries.getFinancialRecordsByFarmId(farmId)
        } else {
            database.financialRecordDatabaseQueries.getAllFinancialRecords()
        }
        
        return query.executeAsList().map { row ->
            FinancialRecordDto(
                id = row.id,
                type = row.type,
                category = row.category,
                amount = row.amount,
                farmId = row.farmId,
                description = row.description,
                date = row.date,
                createdAt = row.createdAt,
                updatedAt = row.updatedAt
            )
        }
    }
}

