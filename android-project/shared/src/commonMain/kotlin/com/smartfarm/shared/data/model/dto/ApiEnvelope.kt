package com.smartfarm.shared.data.model.dto

import kotlinx.serialization.Serializable

/**
 * Standard SmartFarm API list envelope:
 * { "success": true, "data": [ ... ] }
 * { "success": false, "error": "...", "code": "..." }
 */
@Serializable
data class ApiListResponse<T>(
    val success: Boolean,
    val data: List<T>? = null,
    val error: String? = null,
    val code: String? = null,
    val message: String? = null
) {
    fun resolvedMessage(): String? = message ?: error
}

/**
 * Standard SmartFarm API item envelope:
 * { "success": true, "data": { ... } }
 */
@Serializable
data class ApiItemResponse<T>(
    val success: Boolean,
    val data: T? = null,
    val error: String? = null,
    val code: String? = null,
    val message: String? = null
) {
    fun resolvedMessage(): String? = message ?: error
}
