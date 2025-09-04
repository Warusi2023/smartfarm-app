package com.yourcompany.smartfarm.data.database

import androidx.room.*
import com.yourcompany.smartfarm.data.model.PestDiseaseAlertEntity
import com.yourcompany.smartfarm.data.model.AlertStatus
import kotlinx.coroutines.flow.Flow

@Dao
interface PestDiseaseAlertDao {
    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insert(alert: PestDiseaseAlertEntity): Long

    @Update
    suspend fun update(alert: PestDiseaseAlertEntity)

    @Query("SELECT * FROM pest_disease_alert ORDER BY timestamp DESC")
    fun getAllAlerts(): Flow<List<PestDiseaseAlertEntity>>

    @Query("SELECT * FROM pest_disease_alert WHERE status = :status ORDER BY timestamp DESC")
    fun getAlertsByStatus(status: AlertStatus): Flow<List<PestDiseaseAlertEntity>>

    @Query("UPDATE pest_disease_alert SET status = :status WHERE id = :id")
    suspend fun setAlertStatus(id: Long, status: AlertStatus)
} 