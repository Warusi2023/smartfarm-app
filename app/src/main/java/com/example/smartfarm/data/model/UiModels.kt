package com.example.smartfarm.data.model

import kotlinx.serialization.Serializable

@Serializable
data class AnalyticsReport(
    val userEngagement: UserEngagementMetrics,
    val featureUsage: FeatureUsageMetrics,
    val performanceMetrics: PerformanceMetrics,
    val errorMetrics: ErrorMetrics
)

@Serializable
data class UserEngagementMetrics(
    val dailyActiveUsers: Int,
    val weeklyActiveUsers: Int,
    val monthlyActiveUsers: Int,
    val averageSessionDuration: Long,
    val retentionRate: Double
)

@Serializable
data class FeatureUsageMetrics(
    val mostUsedFeatures: List<FeatureUsage>,
    val featureAdoptionRate: Map<String, Double>
)

@Serializable
data class FeatureUsage(
    val name: String,
    val totalUsage: Int,
    val uniqueUsers: Int
)

@Serializable
data class PerformanceMetrics(
    val averageStartupTime: Long,
    val averageScreenLoadTime: Long,
    val memoryUsage: Int,
    val crashRate: Double
)

@Serializable
data class ErrorMetrics(
    val totalErrors: Int,
    val errorRate: Double,
    val mostCommonErrors: List<ErrorOccurrence>
)

@Serializable
data class ErrorOccurrence(
    val errorType: String,
    val count: Int,
    val percentage: Double
)

@Serializable
data class RealTimeMetrics(
    val activeUsers: Int,
    val currentSessionDuration: Long,
    val errorRate: Double,
    val performanceScore: Double
)

@Serializable
data class SystemInfo(
    val appVersion: String,
    val buildType: String,
    val deviceModel: String,
    val androidVersion: String,
    val memoryUsage: Int,
    val availableMemory: Int
) 