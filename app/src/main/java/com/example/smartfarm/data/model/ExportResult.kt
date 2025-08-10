package com.example.smartfarm.data.model

import kotlinx.serialization.Serializable

@Serializable
sealed class ExportResult {
    @Serializable
    data class Success(
        val filePath: String,
        val fileSize: Long = 0L
    ) : ExportResult()
    
    @Serializable
    data class Error(
        val message: String
    ) : ExportResult()
} 