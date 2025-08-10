package com.example.smartfarm.worker

import android.content.Context
import androidx.work.CoroutineWorker
import androidx.work.WorkerParameters
import com.example.smartfarm.data.database.FarmDatabase
import com.example.smartfarm.data.repository.AnimalHealthRecordRepository
import com.example.smartfarm.data.repository.YieldRecordRepository
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import android.app.NotificationChannel
import android.app.NotificationManager
import android.os.Build
import androidx.core.app.NotificationCompat
import android.content.Intent
import android.app.PendingIntent
import kotlinx.coroutines.flow.first

class OutlierAlertWorker(
    appContext: Context,
    workerParams: WorkerParameters
) : CoroutineWorker(appContext, workerParams) {
    override suspend fun doWork(): Result = withContext(Dispatchers.IO) {
        val context = applicationContext
        val db = FarmDatabase.getDatabase(context)
        val healthRepo = AnimalHealthRecordRepository(db.animalHealthRecordDao())
        val yieldRepo = YieldRecordRepository(db.yieldRecordDao())
        
        // Get all records
        val healthRecords = healthRepo.getAll().first() ?: emptyList()
        val yieldRecords = yieldRepo.getAll().first() ?: emptyList()
        
        // Outlier detection logic (simple):
        val yieldByAnimal = yieldRecords.groupBy { it.animalId }.mapValues { it.value.sumOf { r -> r.quantity } }
        val avgYield = yieldByAnimal.values.average().takeIf { yieldByAnimal.isNotEmpty() } ?: 0.0
        val yieldOutliers = yieldByAnimal.filter { (_, y) -> y < avgYield * 0.5 || y > avgYield * 1.5 }
        val healthByAnimal = healthRecords.groupBy { it.animalId }.mapValues { it.value.size }
        val healthOutliers = healthByAnimal.filter { (_, h) -> h > 5 }
        
        if (yieldOutliers.isNotEmpty() || healthOutliers.isNotEmpty()) {
            val channelId = "outlier_alert_channel"
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                val channel = NotificationChannel(
                    channelId, 
                    "Outlier Alerts", 
                    NotificationManager.IMPORTANCE_HIGH
                )
                val nm = context.getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager
                nm.createNotificationChannel(channel)
            }
            
            // Actions
            val acknowledgeIntent = Intent(context, javaClass).apply { 
                action = "ACKNOWLEDGE_OUTLIER" 
            }
            val acknowledgePendingIntent = PendingIntent.getService(
                context, 
                0, 
                acknowledgeIntent, 
                PendingIntent.FLAG_UPDATE_CURRENT or (if (Build.VERSION.SDK_INT >= 23) PendingIntent.FLAG_IMMUTABLE else 0)
            )
            
            // Outlier animal IDs
            val outlierAnimalIds = (yieldOutliers.keys + healthOutliers.keys).map { it.toLong() }.distinct()
            
            // Most severe for single view
            val mostSevereAnimalId = (yieldOutliers.minByOrNull { it.value }?.key ?: healthOutliers.maxByOrNull { it.value }?.key)?.toLong() ?: -1L
            val viewIntent = Intent(context, Class.forName("com.example.smartfarm.MainActivity")).apply {
                action = "VIEW_DASHBOARD"
                flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TOP
                if (mostSevereAnimalId > 0) putExtra("animalId", mostSevereAnimalId)
            }
            val viewPendingIntent = PendingIntent.getActivity(
                context, 
                1, 
                viewIntent, 
                PendingIntent.FLAG_UPDATE_CURRENT or (if (Build.VERSION.SDK_INT >= 23) PendingIntent.FLAG_IMMUTABLE else 0)
            )
            
            // Review all outliers
            val reviewAllIntent = Intent(context, Class.forName("com.example.smartfarm.MainActivity")).apply {
                action = "VIEW_DASHBOARD"
                flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TOP
                putExtra("outlierAnimalIds", outlierAnimalIds.toLongArray())
            }
            val reviewAllPendingIntent = PendingIntent.getActivity(
                context, 
                2, 
                reviewAllIntent, 
                PendingIntent.FLAG_UPDATE_CURRENT or (if (Build.VERSION.SDK_INT >= 23) PendingIntent.FLAG_IMMUTABLE else 0)
            )
            
            // Notification summary
            val yieldNames = yieldOutliers.keys.joinToString { it.toString() }
            val healthNames = healthOutliers.keys.joinToString { it.toString() }
            val summary = buildString {
                if (yieldOutliers.isNotEmpty()) append("Low yield: $yieldNames. ")
                if (healthOutliers.isNotEmpty()) append("High health events: $healthNames.")
            }
            
            val notification = NotificationCompat.Builder(context, channelId)
                .setContentTitle("Livestock Outlier Alert")
                .setContentText(summary)
                .setSmallIcon(android.R.drawable.ic_dialog_alert)
                .setAutoCancel(true)
                .addAction(android.R.drawable.ic_menu_close_clear_cancel, "Acknowledge", acknowledgePendingIntent)
                .addAction(android.R.drawable.ic_menu_view, "View Details", viewPendingIntent)
                .addAction(android.R.drawable.ic_menu_agenda, "Review All Outliers", reviewAllPendingIntent)
                .build()
            val nm = context.getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager
            nm.notify(1002, notification)
        }
        Result.success()
    }
} 