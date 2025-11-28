package com.smartfarm.shared.data.model.dto

import kotlinx.serialization.Serializable

@Serializable
data class DailyTipDto(
    val tip: String,
    val category: String? = null,
    val date: String? = null,
    val isPersonalized: Boolean = false,
    val basedOn: BasedOnDto? = null
)

@Serializable
data class BasedOnDto(
    val crops: Int = 0,
    val livestock: Int = 0
)

@Serializable
data class DailyTipResponse(
    val success: Boolean,
    val tip: DailyTipDto,
    val date: String? = null,
    val error: String? = null
)

