package com.example.smartfarm.accessibility

import android.content.Context
import android.content.res.Configuration
import android.graphics.Color
import android.view.accessibility.AccessibilityManager
import androidx.compose.runtime.*
import androidx.compose.ui.graphics.toArgb
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.platform.LocalDensity
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import javax.inject.Inject
import javax.inject.Singleton

/**
 * Accessibility manager for SmartFarm app
 * Handles accessibility features, testing, and compliance
 */
@Singleton
class AccessibilityManager @Inject constructor(
    private val context: Context
) {
    
    private val _accessibilityState = MutableStateFlow(AccessibilityState())
    val accessibilityState: StateFlow<AccessibilityState> = _accessibilityState.asStateFlow()
    
    private val accessibilityManager = context.getSystemService(Context.ACCESSIBILITY_SERVICE) as AccessibilityManager
    
    init {
        updateAccessibilityState()
    }
    
    /**
     * Update accessibility state based on system settings
     */
    fun updateAccessibilityState() {
        val currentState = _accessibilityState.value
        
        val newState = currentState.copy(
            isScreenReaderEnabled = accessibilityManager.isEnabled,
            isTouchExplorationEnabled = accessibilityManager.isTouchExplorationEnabled,
            isHighContrastEnabled = isHighContrastEnabled(),
            isLargeTextEnabled = isLargeTextEnabled(),
            isReduceMotionEnabled = isReduceMotionEnabled(),
            isColorBlindModeEnabled = isColorBlindModeEnabled(),
            fontSizeScale = getFontSizeScale(),
            contrastRatio = getCurrentContrastRatio()
        )
        
        _accessibilityState.value = newState
    }
    
    /**
     * Check if high contrast mode is enabled
     */
    private fun isHighContrastEnabled(): Boolean {
        val configuration = context.resources.configuration
        return configuration.uiMode and Configuration.UI_MODE_NIGHT_MASK == Configuration.UI_MODE_NIGHT_YES
    }
    
    /**
     * Check if large text is enabled
     */
    private fun isLargeTextEnabled(): Boolean {
        val fontScale = context.resources.configuration.fontScale
        return fontScale > 1.0f
    }
    
    /**
     * Check if reduce motion is enabled
     */
    private fun isReduceMotionEnabled(): Boolean {
        // This would typically check system settings
        // For now, return false as default
        return false
    }
    
    /**
     * Check if color blind mode is enabled
     */
    private fun isColorBlindModeEnabled(): Boolean {
        // This would typically check system settings
        // For now, return false as default
        return false
    }
    
    /**
     * Get current font size scale
     */
    private fun getFontSizeScale(): Float {
        return context.resources.configuration.fontScale
    }
    
    /**
     * Get current contrast ratio
     */
    private fun getCurrentContrastRatio(): Double {
        // This would calculate the actual contrast ratio
        // For now, return a default value
        return 4.5
    }
    
    /**
     * Test accessibility compliance
     */
    fun testAccessibilityCompliance(): AccessibilityTestResult {
        val state = _accessibilityState.value
        val issues = mutableListOf<AccessibilityIssue>()
        
        // Test touch target sizes
        if (!hasMinimumTouchTargets()) {
            issues.add(
                AccessibilityIssue(
                    type = AccessibilityIssueType.TOUCH_TARGET_SIZE,
                    severity = AccessibilityIssueSeverity.HIGH,
                    description = "Some touch targets are smaller than 48dp"
                )
            )
        }
        
        // Test color contrast
        if (state.contrastRatio < AccessibilityConstants.MIN_CONTRAST_RATIO) {
            issues.add(
                AccessibilityIssue(
                    type = AccessibilityIssueType.COLOR_CONTRAST,
                    severity = AccessibilityIssueSeverity.HIGH,
                    description = "Color contrast ratio is below WCAG AA standard"
                )
            )
        }
        
        // Test content descriptions
        if (!hasContentDescriptions()) {
            issues.add(
                AccessibilityIssue(
                    type = AccessibilityIssueType.CONTENT_DESCRIPTION,
                    severity = AccessibilityIssueSeverity.MEDIUM,
                    description = "Some UI elements lack content descriptions"
                )
            )
        }
        
        // Test screen reader compatibility
        if (!isScreenReaderCompatible()) {
            issues.add(
                AccessibilityIssue(
                    type = AccessibilityIssueType.SCREEN_READER,
                    severity = AccessibilityIssueSeverity.HIGH,
                    description = "App is not fully compatible with screen readers"
                )
            )
        }
        
        return AccessibilityTestResult(
            isCompliant = issues.isEmpty(),
            issues = issues,
            score = calculateAccessibilityScore(issues)
        )
    }
    
    /**
     * Check if app has minimum touch targets
     */
    private fun hasMinimumTouchTargets(): Boolean {
        // This would check all touch targets in the app
        // For now, return true as default
        return true
    }
    
    /**
     * Check if app has content descriptions
     */
    private fun hasContentDescriptions(): Boolean {
        // This would check all UI elements for content descriptions
        // For now, return true as default
        return true
    }
    
    /**
     * Check if app is screen reader compatible
     */
    private fun isScreenReaderCompatible(): Boolean {
        // This would test screen reader compatibility
        // For now, return true as default
        return true
    }
    
    /**
     * Calculate accessibility score
     */
    private fun calculateAccessibilityScore(issues: List<AccessibilityIssue>): Int {
        val totalIssues = issues.size
        val highSeverityIssues = issues.count { it.severity == AccessibilityIssueSeverity.HIGH }
        val mediumSeverityIssues = issues.count { it.severity == AccessibilityIssueSeverity.MEDIUM }
        val lowSeverityIssues = issues.count { it.severity == AccessibilityIssueSeverity.LOW }
        
        val score = 100 - (highSeverityIssues * 20) - (mediumSeverityIssues * 10) - (lowSeverityIssues * 5)
        return score.coerceIn(0, 100)
    }
    
    /**
     * Get accessibility recommendations
     */
    fun getAccessibilityRecommendations(): List<AccessibilityRecommendation> {
        val recommendations = mutableListOf<AccessibilityRecommendation>()
        
        val state = _accessibilityState.value
        
        if (!state.isScreenReaderEnabled) {
            recommendations.add(
                AccessibilityRecommendation(
                    type = AccessibilityRecommendationType.SCREEN_READER,
                    title = "Enable Screen Reader",
                    description = "Consider enabling TalkBack for better accessibility",
                    priority = AccessibilityRecommendationPriority.HIGH
                )
            )
        }
        
        if (!state.isLargeTextEnabled) {
            recommendations.add(
                AccessibilityRecommendation(
                    type = AccessibilityRecommendationType.LARGE_TEXT,
                    title = "Use Large Text",
                    description = "Enable large text for better readability",
                    priority = AccessibilityRecommendationPriority.MEDIUM
                )
            )
        }
        
        if (state.contrastRatio < AccessibilityConstants.MIN_CONTRAST_RATIO) {
            recommendations.add(
                AccessibilityRecommendation(
                    type = AccessibilityRecommendationType.COLOR_CONTRAST,
                    title = "Improve Color Contrast",
                    description = "Increase color contrast for better visibility",
                    priority = AccessibilityRecommendationPriority.HIGH
                )
            )
        }
        
        return recommendations
    }
    
    /**
     * Generate accessibility report
     */
    fun generateAccessibilityReport(): AccessibilityReport {
        val testResult = testAccessibilityCompliance()
        val recommendations = getAccessibilityRecommendations()
        val state = _accessibilityState.value
        
        return AccessibilityReport(
            timestamp = System.currentTimeMillis(),
            state = state,
            testResult = testResult,
            recommendations = recommendations,
            complianceLevel = getComplianceLevel(testResult.score)
        )
    }
    
    /**
     * Get compliance level based on score
     */
    private fun getComplianceLevel(score: Int): AccessibilityComplianceLevel {
        return when {
            score >= 90 -> AccessibilityComplianceLevel.EXCELLENT
            score >= 80 -> AccessibilityComplianceLevel.GOOD
            score >= 70 -> AccessibilityComplianceLevel.FAIR
            score >= 60 -> AccessibilityComplianceLevel.POOR
            else -> AccessibilityComplianceLevel.UNACCEPTABLE
        }
    }
}

/**
 * Accessibility state data class
 */
data class AccessibilityState(
    val isScreenReaderEnabled: Boolean = false,
    val isTouchExplorationEnabled: Boolean = false,
    val isHighContrastEnabled: Boolean = false,
    val isLargeTextEnabled: Boolean = false,
    val isReduceMotionEnabled: Boolean = false,
    val isColorBlindModeEnabled: Boolean = false,
    val fontSizeScale: Float = 1.0f,
    val contrastRatio: Double = 4.5
)

/**
 * Accessibility test result data class
 */
data class AccessibilityTestResult(
    val isCompliant: Boolean,
    val issues: List<AccessibilityIssue>,
    val score: Int
)

/**
 * Accessibility issue data class
 */
data class AccessibilityIssue(
    val type: AccessibilityIssueType,
    val severity: AccessibilityIssueSeverity,
    val description: String,
    val elementId: String? = null,
    val suggestion: String? = null
)

/**
 * Accessibility issue types
 */
enum class AccessibilityIssueType {
    TOUCH_TARGET_SIZE,
    COLOR_CONTRAST,
    CONTENT_DESCRIPTION,
    SCREEN_READER,
    KEYBOARD_NAVIGATION,
    FOCUS_MANAGEMENT,
    TEXT_SCALING,
    MOTION_REDUCTION
}

/**
 * Accessibility issue severity levels
 */
enum class AccessibilityIssueSeverity {
    LOW,
    MEDIUM,
    HIGH,
    CRITICAL
}

/**
 * Accessibility recommendation data class
 */
data class AccessibilityRecommendation(
    val type: AccessibilityRecommendationType,
    val title: String,
    val description: String,
    val priority: AccessibilityRecommendationPriority,
    val action: String? = null
)

/**
 * Accessibility recommendation types
 */
enum class AccessibilityRecommendationType {
    SCREEN_READER,
    LARGE_TEXT,
    COLOR_CONTRAST,
    TOUCH_TARGETS,
    CONTENT_DESCRIPTIONS,
    KEYBOARD_NAVIGATION,
    FOCUS_INDICATORS,
    MOTION_REDUCTION
}

/**
 * Accessibility recommendation priority levels
 */
enum class AccessibilityRecommendationPriority {
    LOW,
    MEDIUM,
    HIGH,
    CRITICAL
}

/**
 * Accessibility compliance levels
 */
enum class AccessibilityComplianceLevel {
    EXCELLENT,
    GOOD,
    FAIR,
    POOR,
    UNACCEPTABLE
}

/**
 * Accessibility report data class
 */
data class AccessibilityReport(
    val timestamp: Long,
    val state: AccessibilityState,
    val testResult: AccessibilityTestResult,
    val recommendations: List<AccessibilityRecommendation>,
    val complianceLevel: AccessibilityComplianceLevel
)

/**
 * Composable function to observe accessibility state
 */
@Composable
fun rememberAccessibilityState(): State<AccessibilityState> {
    val context = LocalContext.current
    val accessibilityManager = remember { AccessibilityManager(context) }
    
    return accessibilityManager.accessibilityState.collectAsState()
}

/**
 * Composable function to get accessibility-aware font size
 */
@Composable
fun rememberAccessibilityFontSize(baseSize: Int): State<Int> {
    val accessibilityState = rememberAccessibilityState()
    val density = LocalDensity.current
    
    return remember(accessibilityState.value.fontSizeScale) {
        derivedStateOf {
            (baseSize * accessibilityState.value.fontSizeScale).toInt()
        }
    }
}

/**
 * Composable function to get accessibility-aware spacing
 */
@Composable
fun rememberAccessibilitySpacing(baseSpacing: Int): State<Int> {
    val accessibilityState = rememberAccessibilityState()
    
    return remember(accessibilityState.value.isLargeTextEnabled) {
        derivedStateOf {
            if (accessibilityState.value.isLargeTextEnabled) {
                (baseSpacing * 1.2).toInt()
            } else {
                baseSpacing
            }
        }
    }
}

/**
 * Composable function to check if motion should be reduced
 */
@Composable
fun rememberShouldReduceMotion(): State<Boolean> {
    val accessibilityState = rememberAccessibilityState()
    return remember { derivedStateOf { accessibilityState.value.isReduceMotionEnabled } }
}

/**
 * Composable function to get accessibility-aware color scheme
 */
@Composable
fun rememberAccessibilityColorScheme(): State<AccessibilityColorScheme> {
    val accessibilityState = rememberAccessibilityState()
    
    return remember(
        accessibilityState.value.isHighContrastEnabled,
        accessibilityState.value.isColorBlindModeEnabled
    ) {
        derivedStateOf {
            when {
                accessibilityState.value.isHighContrastEnabled -> AccessibilityColorScheme.HIGH_CONTRAST
                accessibilityState.value.isColorBlindModeEnabled -> AccessibilityColorScheme.COLOR_BLIND_FRIENDLY
                else -> AccessibilityColorScheme.STANDARD
            }
        }
    }
}

/**
 * Accessibility color scheme enum
 */
enum class AccessibilityColorScheme {
    STANDARD,
    HIGH_CONTRAST,
    COLOR_BLIND_FRIENDLY
} 