package com.yourcompany.smartfarm.data.model

import kotlinx.serialization.Serializable

@Serializable
data class PerformanceStats(
    val memoryUsage: Long,
    val cpuUsage: Float,
    val batteryLevel: Int,
    val networkLatency: Long,
    val databaseQueryTime: Long,
    val screenRenderTime: Long,
    val appStartupTime: Long,
    val crashCount: Int,
    val errorCount: Int
) 