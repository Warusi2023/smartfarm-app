package com.example.smartfarm.data.database

import androidx.room.*
import com.example.smartfarm.data.model.Consent
import com.example.smartfarm.data.model.ConsentType
import kotlinx.coroutines.flow.Flow

@Dao
interface ConsentDao {
    
    @Query("SELECT * FROM consent WHERE userId = :userId ORDER BY timestamp DESC")
    fun getConsentsByUserId(userId: Long): Flow<List<Consent>>
    
    @Query("SELECT * FROM consent WHERE userId = :userId AND consentType = :consentType AND isActive = 1 ORDER BY timestamp DESC LIMIT 1")
    suspend fun getActiveConsent(userId: Long, consentType: ConsentType): Consent?
    
    @Query("SELECT EXISTS(SELECT 1 FROM consent WHERE userId = :userId AND consentType = :consentType AND granted = 1 AND isActive = 1)")
    suspend fun hasActiveConsent(userId: Long, consentType: ConsentType): Boolean
    
    @Query("SELECT * FROM consent WHERE userId = :userId AND isActive = 1")
    suspend fun getAllActiveConsents(userId: Long): List<Consent>
    
    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insert(consent: Consent)
    
    @Update
    suspend fun update(consent: Consent)
    
    @Query("UPDATE consent SET isActive = 0 WHERE userId = :userId AND consentType = :consentType AND isActive = 1")
    suspend fun revokeConsent(userId: Long, consentType: ConsentType)
    
    @Query("DELETE FROM consent WHERE userId = :userId")
    suspend fun deleteConsentsByUserId(userId: Long)
    
    @Query("DELETE FROM consent WHERE userId = :userId AND consentType = :consentType")
    suspend fun deleteConsentByUserIdAndType(userId: Long, consentType: ConsentType)
    
    @Query("SELECT COUNT(*) FROM consent WHERE userId = :userId AND consentType = :consentType")
    suspend fun getConsentCount(userId: Long, consentType: ConsentType): Int
    
    @Query("SELECT * FROM consent WHERE userId = :userId AND consentType = :consentType ORDER BY timestamp DESC")
    suspend fun getConsentHistory(userId: Long, consentType: ConsentType): List<Consent>
    
    @Query("SELECT DISTINCT consentType FROM consent WHERE userId = :userId AND granted = 1 AND isActive = 1")
    suspend fun getGrantedConsentTypes(userId: Long): List<ConsentType>
    
    @Query("SELECT DISTINCT consentType FROM consent WHERE userId = :userId AND granted = 0 OR isActive = 0")
    suspend fun getRevokedConsentTypes(userId: Long): List<ConsentType>
} 