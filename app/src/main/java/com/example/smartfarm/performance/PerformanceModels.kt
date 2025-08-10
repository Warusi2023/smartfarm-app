package com.example.smartfarm.performance

import kotlinx.serialization.Serializable

@Serializable
data class PerformanceRecommendation(
    val id: String,
    val title: String,
    val description: String,
    val issueType: PerformanceIssueType,
    val severity: PerformanceSeverity,
    val impact: String,
    val solution: String,
    val estimatedImprovement: String,
    val priority: Int,
    val category: String,
    val timestamp: Long = System.currentTimeMillis()
)

@Serializable
data class PerformanceReport(
    val id: String,
    val timestamp: Long = System.currentTimeMillis(),
    val overallScore: Int,
    val recommendations: List<PerformanceRecommendation>,
    val issues: List<PerformanceIssue>,
    val metrics: PerformanceMetrics,
    val summary: String
)

@Serializable
data class PerformanceIssue(
    val id: String,
    val type: PerformanceIssueType,
    val severity: PerformanceSeverity,
    val description: String,
    val impact: String,
    val location: String? = null,
    val timestamp: Long = System.currentTimeMillis()
)

@Serializable
data class PerformanceMetrics(
    val startupTime: Long,
    val memoryUsage: Long,
    val cpuUsage: Double,
    val networkLatency: Long,
    val databaseQueryTime: Long,
    val uiRenderTime: Long
)

@Serializable
data class StartupPerformanceReport(
    val id: String,
    val timestamp: Long = System.currentTimeMillis(),
    val totalStartupTime: Long,
    val coldStartTime: Long,
    val warmStartTime: Long,
    val hotStartTime: Long,
    val initializationSteps: List<StartupStep>,
    val bottlenecks: List<String>,
    val recommendations: List<String>
)

@Serializable
data class StartupStep(
    val name: String,
    val duration: Long,
    val isCritical: Boolean = false,
    val dependencies: List<String> = emptyList()
)

enum class PerformanceIssueType {
    MEMORY_LEAK,
    SLOW_STARTUP,
    UI_FREEZE,
    NETWORK_TIMEOUT,
    DATABASE_SLOW_QUERY,
    EXCESSIVE_CPU_USAGE,
    BATTERY_DRAIN,
    STORAGE_ISSUE,
    PERMISSION_DELAY,
    BACKGROUND_PROCESS
}

enum class PerformanceSeverity {
    LOW,
    MEDIUM,
    HIGH,
    CRITICAL
}
