package com.yourcompany.smartfarm.data.model

import kotlinx.serialization.Serializable

@Serializable
data class AccessibilityState(
    val isScreenReaderEnabled: Boolean = false,
    val isHighContrastEnabled: Boolean = false,
    val isLargeTextEnabled: Boolean = false,
    val isReduceMotionEnabled: Boolean = false,
    val fontSizeScale: Float = 1.0f,
    val colorContrastRatio: Float = 4.5f
)

@Serializable
data class AccessibilityTestResult(
    val complianceLevel: AccessibilityComplianceLevel,
    val totalIssues: Int,
    val criticalIssues: Int,
    val warnings: Int,
    val passedTests: Int,
    val failedTests: Int,
    val isCompliant: Boolean = true,
    val issues: List<AccessibilityIssue> = emptyList(),
    val score: Float = 0f
)

@Serializable
data class AccessibilityRecommendation(
    val type: AccessibilityRecommendationType,
    val severity: AccessibilitySeverity,
    val title: String,
    val description: String,
    val suggestions: List<String>,
    val priority: Int = 1
)

@Serializable
data class AccessibilityReport(
    val complianceLevel: AccessibilityComplianceLevel,
    val totalIssues: Int,
    val criticalIssues: Int,
    val warnings: Int,
    val passedTests: Int,
    val failedTests: Int,
    val timestamp: Long = System.currentTimeMillis(),
    val state: AccessibilityState = AccessibilityState(),
    val testResult: AccessibilityTestResult? = null,
    val recommendations: List<AccessibilityRecommendation> = emptyList()
)

@Serializable
enum class AccessibilityComplianceLevel {
    A,
    AA,
    AAA,
    NON_COMPLIANT
}

@Serializable
enum class AccessibilitySeverity {
    LOW,
    MEDIUM,
    HIGH,
    CRITICAL
}

@Serializable
enum class AccessibilityIssueType {
    COLOR_CONTRAST,
    TOUCH_TARGET_SIZE,
    SCREEN_READER_SUPPORT,
    KEYBOARD_NAVIGATION,
    FOCUS_INDICATOR,
    TEXT_SCALING,
    MOTION_REDUCTION
}

@Serializable
enum class AccessibilityRecommendationType {
    COLOR_CONTRAST,
    TOUCH_TARGET_SIZE,
    SCREEN_READER_SUPPORT,
    KEYBOARD_NAVIGATION,
    FOCUS_INDICATOR,
    TEXT_SCALING,
    MOTION_REDUCTION
} 