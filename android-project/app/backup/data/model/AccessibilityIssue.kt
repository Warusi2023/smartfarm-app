package com.yourcompany.smartfarm.data.model

import kotlinx.serialization.Serializable

@Serializable
data class AccessibilityIssue(
    val type: AccessibilityIssueType,
    val severity: AccessibilitySeverity,
    val description: String,
    val location: String,
    val impact: String,
    val timestamp: Long = System.currentTimeMillis()
) 