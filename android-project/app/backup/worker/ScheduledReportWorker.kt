package com.yourcompany.smartfarm.worker

import android.content.Context
import androidx.work.CoroutineWorker
import androidx.work.WorkerParameters
import com.yourcompany.smartfarm.data.database.FarmDatabase
import com.yourcompany.smartfarm.data.repository.AnimalHealthRecordRepository
import com.yourcompany.smartfarm.data.repository.YieldRecordRepository
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import java.io.File
import android.content.Intent
import androidx.core.content.FileProvider
import android.app.NotificationChannel
import android.app.NotificationManager
import android.os.Build
import androidx.core.app.NotificationCompat
import android.app.PendingIntent
import kotlinx.coroutines.flow.first

class ScheduledReportWorker(
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
        
        // Generate a simple CSV report
        val csv = buildString {
            append("type,animalId,date,eventType,notes,vet,medication\n")
            healthRecords.forEach { r ->
                append("health,${r.animalId},${r.date},${r.eventType},${r.notes},${r.vet},${r.medication}\n")
            }
            append("type,animalId,date,yieldType,quantity,unit,notes\n")
            yieldRecords.forEach { r ->
                append("yield,${r.animalId},${r.date},${r.yieldType},${r.quantity},${r.unit},${r.notes}\n")
            }
        }
        
        val file = File(context.cacheDir, "scheduled_report.csv")
        file.writeText(csv)
        
        // (Stub) Email or share the report
        // In a real app, use an email API or backend
        // For now, send a notification with a share intent
        val uri = FileProvider.getUriForFile(context, context.packageName + ".provider", file)
        val intent = Intent(Intent.ACTION_SEND).apply {
            type = "text/csv"
            putExtra(Intent.EXTRA_STREAM, uri)
            addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION)
        }
        
        val pendingIntent = PendingIntent.getActivity(
            context, 
            0, 
            Intent.createChooser(intent, "Share Scheduled Report"), 
            PendingIntent.FLAG_UPDATE_CURRENT or (if (Build.VERSION.SDK_INT >= 23) PendingIntent.FLAG_IMMUTABLE else 0)
        )
        
        val channelId = "scheduled_report_channel"
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val channel = NotificationChannel(
                channelId, 
                "Scheduled Reports", 
                NotificationManager.IMPORTANCE_DEFAULT
            )
            val nm = context.getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager
            nm.createNotificationChannel(channel)
        }
        
        val notification = NotificationCompat.Builder(context, channelId)
            .setContentTitle("Scheduled Report Ready")
            .setContentText("Tap to share or email your scheduled report.")
            .setSmallIcon(android.R.drawable.ic_menu_save)
            .setContentIntent(pendingIntent)
            .setAutoCancel(true)
            .build()
        val nm = context.getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager
        nm.notify(1001, notification)
        Result.success()
    }
} 