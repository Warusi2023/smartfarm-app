package com.smartfarm.data.repository

import com.smartfarm.data.model.AnalyticsDto
import com.smartfarm.data.util.Resource
import com.smartfarm.network.SmartFarmApi
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.flow
import javax.inject.Inject
import javax.inject.Singleton

@Singleton
class AnalyticsRepository @Inject constructor(
    private val api: SmartFarmApi
) {
    
    fun getAnalytics(farmId: String? = null): Flow<Resource<AnalyticsDto>> = flow {
        emit(Resource.Loading)
        
        try {
            val response = api.getAnalytics(farmId)
            if (response.isSuccessful && response.body() != null) {
                emit(Resource.Success(response.body()!!))
            } else {
                emit(Resource.Error(Exception("Failed to fetch analytics: ${response.message()}")))
            }
        } catch (e: Exception) {
            emit(Resource.Error(e))
        }
    }
}

