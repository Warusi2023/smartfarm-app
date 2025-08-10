package com.example.smartfarm.data.model

import com.example.smartfarm.performance.PerformanceRecommendation
import com.example.smartfarm.performance.PerformanceReport
import kotlinx.serialization.Serializable

@Serializable
data class PerformanceTestingUiState(
    val isLoading: Boolean = false,
    val performanceStats: PerformanceStats? = null,
    val memoryStats: MemoryStatistics? = null,
    val recommendations: List<PerformanceRecommendation> = emptyList(),
    val error: String? = null,
    val isTestRunning: Boolean = false,
    val testProgress: Float = 0f,
    val testResults: List<PerformanceTestResult> = emptyList(),
    val performanceState: PerformanceState = PerformanceState(),
    val performanceReport: PerformanceReport? = null,
    val memoryUsage: Long = 0L,
    val totalMemory: Long = 0L,
    val memoryUsagePercent: Double = 0.0,
    val isMemoryOptimized: Boolean = false,
    val cpuUsage: Float = 0f,
    val isCpuOptimized: Boolean = false,
    val screenRenderStats: Map<String, Long> = emptyMap(),
    val networkStats: Map<String, Long> = emptyMap(),
    val databaseStats: Map<String, Long> = emptyMap(),
    val startupTime: Long = 0L
)

@Serializable
data class PerformanceState(
    val lastUpdate: Long = System.currentTimeMillis()
)

@Serializable
data class PerformanceTestResult(
    val testName: String,
    val result: String,
    val duration: Long,
    val success: Boolean,
    val details: String = ""
) 