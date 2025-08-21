package com.yourcompany.smartfarm.data.model

import kotlinx.serialization.Serializable

@Serializable
data class PrivacySettingsUiState(
    val isLoading: Boolean = false,
    val privacySettings: PrivacySettings? = null,
    val exportResult: ExportResult? = null,
    val deletionResult: DeletionResult? = null,
    val error: String? = null,
    val isExporting: Boolean = false,
    val isDeleting: Boolean = false,
    val showDeleteConfirmation: Boolean = false,
    val dataProcessingConsent: Boolean = false,
    val locationConsent: Boolean = false,
    val notificationsConsent: Boolean = false,
    val analyticsConsent: Boolean = false,
    val marketingConsent: Boolean = false,
    val dataSummary: Map<String, Int> = emptyMap()
)

@Serializable
data class PrivacySettings(
    val dataProcessing: Boolean = false,
    val locationServices: Boolean = false,
    val notifications: Boolean = false,
    val analytics: Boolean = false,
    val crashReporting: Boolean = false,
    val personalizedAds: Boolean = false
)

// ConsentType enum is defined in Consent.kt to avoid duplication 