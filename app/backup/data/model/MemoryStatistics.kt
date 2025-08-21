package com.yourcompany.smartfarm.data.model

import kotlinx.serialization.Serializable

@Serializable
data class MemoryStatistics(
    val usedMemory: Long,
    val totalMemory: Long,
    val availableMemory: Long,
    val memoryUsagePercent: Double,
    val imageCacheSize: Int,
    val dataCacheSize: Int,
    val weakReferenceCount: Int,
    val isLowMemory: Boolean
) 