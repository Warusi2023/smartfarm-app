package com.smartfarm.shared.data.model.dto

import kotlinx.serialization.Serializable

@Serializable
data class LoginRequest(
    val email: String,
    val password: String
)

/**
 * Backend auth envelope:
 * success: { success: true, data: { token, refreshToken, user } }
 * failure: { success: false, error: "...", code: "...", message?: "..." }
 */
@Serializable
data class LoginResponse(
    val success: Boolean,
    val message: String? = null,
    val error: String? = null,
    val code: String? = null,
    val data: AuthSessionData? = null,
    // Legacy flat fields (older/demo payloads)
    val token: String? = null,
    val user: UserDto? = null
) {
    fun resolvedToken(): String? = data?.token ?: token
    fun resolvedRefreshToken(): String? = data?.refreshToken
    fun resolvedUser(): UserDto? = data?.user?.toUserDto() ?: user
    fun resolvedMessage(): String? = message ?: error
}

@Serializable
data class AuthSessionData(
    val token: String? = null,
    val refreshToken: String? = null,
    val user: AuthUserPayload? = null,
    val requiresSubscription: Boolean? = null,
    val subscriptionStatus: String? = null,
    val upgradeUrl: String? = null,
    val trialEnd: String? = null
)

@Serializable
data class AuthUserPayload(
    val id: String,
    val email: String,
    val firstName: String? = null,
    val lastName: String? = null,
    val role: String? = null,
    val farmId: String? = null,
    val phone: String? = null,
    val country: String? = null
) {
    fun toUserDto(): UserDto = UserDto(
        id = id,
        email = email,
        firstName = firstName.orEmpty(),
        lastName = lastName.orEmpty(),
        role = role ?: "user",
        farmId = farmId
    )
}

@Serializable
data class RegisterRequest(
    val email: String,
    val password: String,
    val firstName: String,
    val lastName: String,
    val farmName: String? = null
)

@Serializable
data class RegisterResponse(
    val success: Boolean,
    val message: String? = null,
    val error: String? = null,
    val code: String? = null,
    val data: AuthSessionData? = null,
    val token: String? = null,
    val user: UserDto? = null
) {
    fun resolvedToken(): String? = data?.token ?: token
    fun resolvedRefreshToken(): String? = data?.refreshToken
    fun resolvedUser(): UserDto? = data?.user?.toUserDto() ?: user
    fun resolvedMessage(): String? = message ?: error
}

@Serializable
data class RefreshTokenRequest(
    val refreshToken: String
)

@Serializable
data class UserDto(
    val id: String,
    val email: String,
    val firstName: String,
    val lastName: String,
    val role: String,
    val farmId: String? = null
)

@Serializable
data class HealthResponse(
    val status: String,
    val timestamp: String
)
