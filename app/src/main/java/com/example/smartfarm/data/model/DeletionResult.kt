package com.example.smartfarm.data.model

import kotlinx.serialization.Serializable

@Serializable
sealed class DeletionResult {
    @Serializable
    data class Success(
        val deletedRecords: Int,
        val message: String = "Data deleted successfully"
    ) : DeletionResult()
    
    @Serializable
    data class Error(
        val message: String
    ) : DeletionResult()
} 