package com.yourcompany.smartfarm.data.database

import androidx.room.*
import com.yourcompany.smartfarm.data.model.WeatherForecastEntity
import com.yourcompany.smartfarm.data.model.WeatherAlert
import kotlinx.coroutines.flow.Flow

/**
 * Data Access Object for weather-related database operations
 */
@Dao
interface WeatherDao {
    
    // Weather Forecast Operations
    @Query("SELECT * FROM weather_forecasts ORDER BY date DESC")
    fun getAllWeatherForecasts(): Flow<List<WeatherForecastEntity>>
    
    @Query("SELECT * FROM weather_forecasts WHERE userId = :userId ORDER BY date DESC")
    suspend fun getWeatherByUserId(userId: Long): List<WeatherForecastEntity>
    
    @Query("SELECT * FROM weather_forecasts WHERE farmId = :farmId ORDER BY date DESC")
    fun getWeatherForecastsByFarm(farmId: Long): Flow<List<WeatherForecastEntity>>
    
    @Query("SELECT * FROM weather_forecasts WHERE date >= :startDate AND date <= :endDate ORDER BY date ASC")
    fun getWeatherForecastsByDateRange(startDate: Long, endDate: Long): Flow<List<WeatherForecastEntity>>
    
    @Query("SELECT * FROM weather_forecasts WHERE farmId = :farmId ORDER BY date DESC LIMIT 1")
    fun getCurrentWeather(farmId: Long = 1L): Flow<WeatherForecastEntity?>
    
    @Query("SELECT * FROM weather_forecasts WHERE farmId = :farmId ORDER BY date DESC LIMIT 1")
    suspend fun getCurrentWeatherSync(farmId: Long = 1L): WeatherForecastEntity?
    
    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertWeatherForecast(forecast: WeatherForecastEntity): Long
    
    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertWeatherForecasts(forecasts: List<WeatherForecastEntity>)
    
    @Update
    suspend fun updateWeatherForecast(forecast: WeatherForecastEntity)
    
    @Delete
    suspend fun deleteWeatherForecast(forecast: WeatherForecastEntity)
    
    @Query("DELETE FROM weather_forecasts WHERE date < :cutoffDate")
    suspend fun deleteOldWeatherData(cutoffDate: Long)
    
    // Weather Alert Operations
    @Query("SELECT * FROM weather_alerts ORDER BY startTime DESC")
    fun getAllWeatherAlerts(): Flow<List<WeatherAlert>>
    
    @Query("SELECT * FROM weather_alerts WHERE farmId = :farmId ORDER BY startTime DESC")
    fun getWeatherAlertsByFarm(farmId: Long): Flow<List<WeatherAlert>>
    
    @Query("SELECT * FROM weather_alerts WHERE startTime >= :startTime AND endTime <= :endTime ORDER BY startTime ASC")
    fun getWeatherAlertsByTimeRange(startTime: Long, endTime: Long): Flow<List<WeatherAlert>>
    
    @Query("SELECT * FROM weather_alerts WHERE severity = :severity ORDER BY startTime DESC")
    fun getWeatherAlertsBySeverity(severity: String): Flow<List<WeatherAlert>>
    
    @Query("SELECT * FROM weather_alerts WHERE isActive = 1 ORDER BY startTime DESC")
    fun getActiveWeatherAlerts(): Flow<List<WeatherAlert>>
    
    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertWeatherAlert(alert: WeatherAlert): Long
    
    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertWeatherAlerts(alerts: List<WeatherAlert>)
    
    @Update
    suspend fun updateWeatherAlert(alert: WeatherAlert)
    
    @Delete
    suspend fun deleteWeatherAlert(alert: WeatherAlert)
    
    @Query("DELETE FROM weather_alerts WHERE endTime < :cutoffTime")
    suspend fun deleteExpiredAlerts(cutoffTime: Long)
    
    // Weather Statistics and Analytics
    @Query("SELECT AVG(temperature_min) as avgMin, AVG(temperature_max) as avgMax, AVG(humidity) as avgHumidity FROM weather_forecasts WHERE farmId = :farmId AND date >= :startDate AND date <= :endDate")
    suspend fun getWeatherStats(farmId: Long, startDate: Long, endDate: Long): WeatherStats?
    
    @Query("SELECT COUNT(*) FROM weather_alerts WHERE farmId = :farmId AND startTime >= :startTime")
    suspend fun getAlertCount(farmId: Long, startTime: Long): Int
    
    @Query("SELECT * FROM weather_forecasts WHERE farmId = :farmId AND farmingImpact != 'NEUTRAL' ORDER BY date DESC LIMIT :limit")
    fun getSignificantWeatherEvents(farmId: Long, limit: Int = 10): Flow<List<WeatherForecastEntity>>
    
    // Data Management
    @Query("SELECT COUNT(*) FROM weather_forecasts")
    suspend fun getWeatherForecastCount(): Int
    
    @Query("SELECT COUNT(*) FROM weather_alerts")
    suspend fun getWeatherAlertCount(): Int
    
    @Query("DELETE FROM weather_forecasts")
    suspend fun clearAllWeatherForecasts()
    
    @Query("DELETE FROM weather_alerts")
    suspend fun clearAllWeatherAlerts()
    
    @Transaction
    suspend fun clearAllWeatherData() {
        clearAllWeatherForecasts()
        clearAllWeatherAlerts()
    }
}

/**
 * Data class for weather statistics
 */
data class WeatherStats(
    val avgMin: Double?,
    val avgMax: Double?,
    val avgHumidity: Double?
) 