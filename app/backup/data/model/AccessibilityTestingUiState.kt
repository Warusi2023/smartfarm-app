package com.yourcompany.smartfarm.data.model

import kotlinx.serialization.Serializable

@Serializable
data class AccessibilityTestingUiState(
    val isLoading: Boolean = false,
    val accessibilityState: AccessibilityState = AccessibilityState(),
    val testResult: AccessibilityTestResult? = null,
    val recommendations: List<AccessibilityRecommendation> = emptyList(),
    val complianceLevel: AccessibilityComplianceLevel = AccessibilityComplianceLevel.AA,
    val error: String? = null,
    val isTestRunning: Boolean = false,
    val detailedReport: AccessibilityReport? = null
) 