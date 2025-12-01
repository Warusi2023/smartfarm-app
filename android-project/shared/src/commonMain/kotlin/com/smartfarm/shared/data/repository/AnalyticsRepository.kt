package com.smartfarm.shared.data.repository

import com.smartfarm.shared.data.model.dto.AnalyticsDto
import com.smartfarm.shared.data.util.Resource
import com.smartfarm.shared.network.SmartFarmApi
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.flow

/**
 * Shared Analytics repository using Ktor
 */
class AnalyticsRepository(
    private val api: SmartFarmApi
) {
    
    fun getAnalytics(farmId: String? = null): Flow<Resource<AnalyticsDto>> = flow {
        emit(Resource.Loading)
        
        try {
            val result = api.getAnalytics(farmId)
            emit(result)
        } catch (e: Exception) {
                emit(Resource.Error(e.message ?: "Error", e))
        }
    }
}

