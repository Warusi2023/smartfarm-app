package com.yourcompany.smartfarm.data.model

data class User(
    val id: Long = 0,
    val email: String,
    val firstName: String,
    val lastName: String,
    val role: UserRole,
    val createdAt: Long = System.currentTimeMillis(),
    val isActive: Boolean = true
)

enum class UserRole {
    FARMER,
    MANAGER,
    WORKER,
    ADMIN
}
