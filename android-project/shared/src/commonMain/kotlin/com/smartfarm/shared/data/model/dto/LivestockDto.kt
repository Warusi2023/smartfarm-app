package com.smartfarm.shared.data.model.dto

import kotlinx.serialization.Serializable

/**
 * Livestock list/item shape from GET/POST /api/livestock.
 * Create body uses [CreateLivestockRequest] (no farmId; notes/healthStatus not description/status).
 */
@Serializable
data class LivestockDto(
    @Serializable(with = FlexibleStringSerializer::class)
    val id: String,
    val name: String,
    val type: String,
    val breed: String? = null,
    val farmId: String? = null,
    val birthDate: String? = null,
    val age: Int? = null,
    val weight: Double? = null,
    val status: String? = null,
    val healthStatus: String? = null,
    val location: String? = null,
    val description: String? = null,
    val notes: String? = null,
    val tag: String? = null,
    val sex: String? = null,
    val purpose: String? = null,
    val value: Double? = null,
    /** Base64 data URL or remote image URL returned by the livestock API. */
    val photo: String? = null,
    val photoUrl: String? = null,
    val createdAt: String? = null,
    val updatedAt: String? = null
)
