package com.yourcompany.smartfarm.data.database

import androidx.room.*
import com.yourcompany.smartfarm.data.model.User
import com.yourcompany.smartfarm.data.model.UserRole
import kotlinx.coroutines.flow.Flow

@Dao
interface UserDao {
    
    // Authentication queries
    @Query("SELECT * FROM users WHERE username = :username AND isActive = 1")
    suspend fun getUserByUsername(username: String): User?
    
    @Query("SELECT * FROM users WHERE email = :email AND isActive = 1")
    suspend fun getUserByEmail(email: String): User?
    
    @Query("SELECT * FROM users WHERE username = :username AND passwordHash = :passwordHash AND isActive = 1")
    suspend fun authenticateUser(username: String, passwordHash: String): User?
    
    @Query("SELECT * FROM users WHERE email = :email AND passwordHash = :passwordHash AND isActive = 1")
    suspend fun authenticateUserByEmail(email: String, passwordHash: String): User?
    
    // User management queries
    @Query("SELECT * FROM users WHERE isActive = 1 ORDER BY firstName, lastName ASC")
    fun getAllActiveUsers(): Flow<List<User>>
    
    @Query("SELECT * FROM users WHERE role = :role AND isActive = 1 ORDER BY firstName, lastName ASC")
    fun getUsersByRole(role: UserRole): Flow<List<User>>
    
    @Query("SELECT * FROM users WHERE id = :id")
    suspend fun getUserById(id: Long): User?
    
    @Query("SELECT COUNT(*) FROM users WHERE username = :username")
    suspend fun isUsernameTaken(username: String): Int
    
    @Query("SELECT COUNT(*) FROM users WHERE email = :email")
    suspend fun isEmailTaken(email: String): Int
    
    // Password reset and email verification
    @Query("SELECT * FROM users WHERE passwordResetToken = :token AND passwordResetExpiresAt > :currentTime")
    suspend fun getUserByResetToken(token: String, currentTime: Long): User?
    
    @Query("SELECT * FROM users WHERE emailVerificationToken = :token AND emailVerificationExpiresAt > :currentTime")
    suspend fun getUserByVerificationToken(token: String, currentTime: Long): User?
    
    // Account security
    @Query("UPDATE users SET failedLoginAttempts = failedLoginAttempts + 1 WHERE id = :userId")
    suspend fun incrementFailedLoginAttempts(userId: Long)
    
    @Query("UPDATE users SET failedLoginAttempts = 0, accountLockedUntil = NULL WHERE id = :userId")
    suspend fun resetFailedLoginAttempts(userId: Long)
    
    @Query("UPDATE users SET accountLockedUntil = :lockUntil WHERE id = :userId")
    suspend fun lockAccount(userId: Long, lockUntil: Long)
    
    @Query("SELECT * FROM users WHERE accountLockedUntil > :currentTime")
    suspend fun getLockedAccounts(currentTime: Long): List<User>
    
    // Login tracking
    @Query("UPDATE users SET lastLoginAt = :loginTime WHERE id = :userId")
    suspend fun updateLastLogin(userId: Long, loginTime: Long)
    
    // CRUD operations
    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertUser(user: User): Long
    
    @Update
    suspend fun updateUser(user: User)
    
    @Delete
    suspend fun deleteUser(user: User)
    
    @Query("UPDATE users SET isActive = 0 WHERE id = :userId")
    suspend fun softDeleteUser(userId: Long)
    
    // Search and filtering
    @Query("SELECT * FROM users WHERE (firstName LIKE '%' || :query || '%' OR lastName LIKE '%' || :query || '%' OR username LIKE '%' || :query || '%') AND isActive = 1 ORDER BY firstName, lastName ASC")
    fun searchUsers(query: String): Flow<List<User>>
    
    @Query("SELECT COUNT(*) FROM users WHERE isActive = 1")
    suspend fun getActiveUserCount(): Int
    
    @Query("SELECT COUNT(*) FROM users WHERE role = :role AND isActive = 1")
    suspend fun getUserCountByRole(role: UserRole): Int
    
    // Recent activity
    @Query("SELECT * FROM users WHERE lastLoginAt IS NOT NULL ORDER BY lastLoginAt DESC LIMIT :limit")
    fun getRecentlyActiveUsers(limit: Int = 10): Flow<List<User>>
    
    // Bulk operations
    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertUsers(users: List<User>)
    
    @Query("DELETE FROM users WHERE isActive = 0")
    suspend fun deleteInactiveUsers()
    
    // Add missing method for utility classes
    @Query("SELECT * FROM users WHERE isActive = 1")
    suspend fun getAllUsers(): List<User>
    
    // Add missing method for utility classes
    @Query("SELECT * FROM users WHERE isActive = 1 LIMIT 1")
    suspend fun getCurrentUser(): User?
} 