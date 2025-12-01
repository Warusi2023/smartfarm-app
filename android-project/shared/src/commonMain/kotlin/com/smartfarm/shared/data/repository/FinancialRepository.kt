package com.smartfarm.shared.data.repository

import com.smartfarm.shared.data.model.dto.FinancialRecordDto
import com.smartfarm.shared.data.util.Resource
// import com.smartfarm.shared.database.FarmDatabase // Removed - database not available
import com.smartfarm.shared.network.SmartFarmApi
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.flow
import kotlinx.coroutines.flow.map

/**
 * Shared Financial repository using SQLDelight and Ktor
 */
class FinancialRepository(
    private val api: SmartFarmApi
    // private val database: FarmDatabase // Removed - database not available
) {
    
    fun getFinancialRecords(farmId: String? = null): Flow<Resource<List<FinancialRecordDto>>> = flow {
        emit(Resource.Loading)
        
        try {
            val networkResult = api.getFinancialRecords(farmId)
            when (networkResult) {
                is Resource.Success -> {
                    val records = networkResult.data
                    // Cache the data - database not available, stubbed
                    // records.forEach { record ->
                    //     database.financialRecordDatabaseQueries.insertFinancialRecord(...)
                    // }
                    emit(Resource.Success(records))
                }
                is Resource.Error -> {
                    // Cache not available - stubbed
                    emit(networkResult)
                }
                is Resource.Loading -> emit(Resource.Loading)
            }
        } catch (e: Exception) {
            // Cache not available - stubbed
            emit(Resource.Error(e.message ?: "Error", e))
        }
    }
    
    fun observeFinancialRecords(farmId: String? = null): Flow<List<FinancialRecordDto>> {
        // Database not available - return empty flow
        return flow { emit(emptyList()) }
    }
    
    suspend fun createFinancialRecord(record: FinancialRecordDto): Resource<FinancialRecordDto> {
        return try {
            val result = api.createFinancialRecord(record)
            when (result) {
                is Resource.Success -> {
                    val created = result.data
                    // Database not available - stubbed
                    // database.financialRecordDatabaseQueries.insertFinancialRecord(...)
                    Resource.Success(created)
                }
                is Resource.Error -> result
                is Resource.Loading -> Resource.Error("Unexpected loading state", Exception("Unexpected loading state"))
            }
        } catch (e: Exception) {
            Resource.Error(e.message ?: "Error", e)
        }
    }
    
    suspend fun updateFinancialRecord(record: FinancialRecordDto): Resource<FinancialRecordDto> {
        return try {
            val result = api.updateFinancialRecord(record.id, record)
            when (result) {
                is Resource.Success -> {
                    val updated = result.data
                    // Database not available - stubbed
                    // database.financialRecordDatabaseQueries.updateFinancialRecord(...)
                    Resource.Success(updated)
                }
                is Resource.Error -> result
                is Resource.Loading -> Resource.Error("Unexpected loading state", Exception("Unexpected loading state"))
            }
        } catch (e: Exception) {
            Resource.Error(e.message ?: "Error", e)
        }
    }
    
    suspend fun deleteFinancialRecord(recordId: String): Resource<Unit> {
        return try {
            val result = api.deleteFinancialRecord(recordId)
            when (result) {
                is Resource.Success -> {
                    // Database not available - stubbed
                    // database.financialRecordDatabaseQueries.deleteFinancialRecord(recordId)
                    Resource.Success(Unit)
                }
                is Resource.Error -> result
                is Resource.Loading -> Resource.Error("Unexpected loading state", Exception("Unexpected loading state"))
            }
        } catch (e: Exception) {
            Resource.Error(e.message ?: "Error", e)
        }
    }
    
    private suspend fun getFinancialRecordsFromCache(farmId: String?): List<FinancialRecordDto> {
        // Database not available - return empty list
        return emptyList()
    }
}

