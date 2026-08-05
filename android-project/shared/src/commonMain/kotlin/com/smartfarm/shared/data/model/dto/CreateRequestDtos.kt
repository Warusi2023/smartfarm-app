package com.smartfarm.shared.data.model.dto

import kotlinx.serialization.Serializable

/**
 * Body for POST /api/farms (farms.create Zod / web createFarm payload).
 * Required: name, location, areaHectares (>0), farmType.
 */
@Serializable
data class CreateFarmRequest(
    val name: String,
    val location: String,
    val areaHectares: Double,
    val farmType: String,
    val description: String? = null,
    val latitude: Double? = null,
    val longitude: Double? = null
)

/**
 * Body for POST /api/farms/{farmId}/tasks (farmTeam.createTask).
 * farmId is path-only; status is server-assigned ("open").
 */
@Serializable
data class CreateTaskRequest(
    val title: String,
    val description: String? = null,
    val category: String? = null,
    /** Backend enum: low | medium | high | urgent */
    val priority: String? = null,
    val assignedToUserId: String? = null,
    /** ISO-8601 datetime when provided */
    val dueAt: String? = null,
    val sourceType: String? = null,
    val sourceId: String? = null
)

/**
 * Body for POST /api/crops (aligned with web dashboard createCrop payload).
 */
@Serializable
data class CreateCropRequest(
    val name: String,
    val type: String? = null,
    val farmId: String? = null,
    val plantedDate: String? = null,
    val expectedHarvestDate: String? = null,
    val area: Double? = null,
    val description: String? = null,
    val variety: String? = null,
    val status: String? = null,
    val notes: String? = null
)

/**
 * Body for PUT /api/crops/{id} (crops.update Zod schema — all optional).
 */
@Serializable
data class UpdateCropRequest(
    val name: String? = null,
    val type: String? = null,
    val farmId: String? = null,
    val plantedDate: String? = null,
    val expectedHarvestDate: String? = null,
    val area: Double? = null,
    val description: String? = null,
    val variety: String? = null,
    val status: String? = null,
    val notes: String? = null
)

/**
 * Body for POST /api/livestock (livestock.create Zod schema).
 * Unknown keys are stripped by the backend validator.
 */
@Serializable
data class CreateLivestockRequest(
    val type: String,
    val name: String,
    val breed: String? = null,
    val age: Int? = null,
    val weight: Double? = null,
    val healthStatus: String? = null,
    val location: String? = null,
    val notes: String? = null,
    val photo: String? = null,
    val sex: String? = null,
    val birthDate: String? = null,
    val purpose: String? = null,
    val value: Double? = null,
    val tag: String? = null
)

/**
 * Body for PUT /api/livestock/{id} (livestock.update Zod schema — all optional).
 */
@Serializable
data class UpdateLivestockRequest(
    val type: String? = null,
    val name: String? = null,
    val breed: String? = null,
    val age: Int? = null,
    val weight: Double? = null,
    val healthStatus: String? = null,
    val location: String? = null,
    val notes: String? = null,
    val photo: String? = null,
    val sex: String? = null,
    val birthDate: String? = null,
    val purpose: String? = null,
    val value: Double? = null,
    val tag: String? = null
)

/**
 * Body for PATCH /api/farms/{farmId}/tasks/{taskId} (farmTeam.updateTask).
 * Backend has no DELETE for tasks; cancel via status = "cancelled".
 */
@Serializable
data class UpdateTaskRequest(
    val title: String? = null,
    val description: String? = null,
    val category: String? = null,
    /** Backend enum: open | in_progress | done | cancelled */
    val status: String? = null,
    /** Backend enum: low | medium | high | urgent */
    val priority: String? = null,
    val assignedToUserId: String? = null,
    val dueAt: String? = null
)

/** Empty JSON object body for POST endpoints that require no fields (e.g. task complete). */
@Serializable
class EmptyRequest
