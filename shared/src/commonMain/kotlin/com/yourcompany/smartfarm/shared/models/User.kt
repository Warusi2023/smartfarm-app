package com.yourcompany.smartfarm.shared.models

data class User(
    val id: Long = 0,
    val email: String,
    val firstName: String,
    val lastName: String,
    val role: UserRole,
    val farmId: Long? = null,
    val createdAt: Long = 0L,
    val isActive: Boolean = true
)

enum class UserRole {
    FARMER,
    MANAGER,
    WORKER,
    ADMIN
}
