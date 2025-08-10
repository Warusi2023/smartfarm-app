package com.example.smartfarm.data.model

sealed class ImageAnalysisResult {
    data class Success(
        val analysis: String,
        val confidence: Float,
        val recommendations: List<String> = emptyList()
    ) : ImageAnalysisResult()
    
    data class Error(val message: String) : ImageAnalysisResult()
}

data class CropDisease(
    val diseaseName: String,
    val confidence: Float,
    val severity: String,
    val treatment: String
)

data class PestIdentification(
    val pestName: String,
    val confidence: Float,
    val threatLevel: String,
    val controlMethods: List<String>
)

data class SoilAnalysis(
    val soilType: String,
    val phLevel: Float,
    val nutrients: Map<String, Float>,
    val recommendations: List<String>
) 