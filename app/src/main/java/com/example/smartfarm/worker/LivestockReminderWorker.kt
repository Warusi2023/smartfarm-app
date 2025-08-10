package com.example.smartfarm.worker

import android.app.NotificationChannel
import android.app.NotificationManager
import android.content.Context
import android.os.Build
import androidx.core.app.NotificationCompat
import androidx.core.app.NotificationManagerCompat
import androidx.work.CoroutineWorker
import androidx.work.WorkerParameters
import com.example.smartfarm.R
import com.example.smartfarm.data.database.FarmDatabase
import java.time.LocalDate
import java.time.format.DateTimeFormatter
import kotlinx.coroutines.flow.first

class LivestockReminderWorker(
    appContext: Context,
    workerParams: WorkerParameters
) : CoroutineWorker(appContext, workerParams) {
    override suspend fun doWork(): Result {
        val context = applicationContext
        val db = FarmDatabase.getDatabase(context)
        val reminderDao = db.livestockReminderDao()
        val livestockDao = db.livestockDao()
        val today = LocalDate.now().format(DateTimeFormatter.ISO_DATE)
        
        // Get all reminders
        val reminders = reminderDao.getAllReminders().first() ?: emptyList()
        
        reminders.filter { it.date == today }.forEach { reminder ->
            val livestock = livestockDao.getLivestockById(reminder.livestockId)
            val title = "${livestock?.name ?: "Livestock"} - ${reminder.type} Reminder"
            val message = reminder.note.ifBlank { "You have a ${reminder.type} scheduled today." }
            showNotification(context, title, message)
        }
        
        return Result.success()
    }

    private fun showNotification(context: Context, title: String, message: String) {
        val channelId = "livestock_reminder_channel"
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val channel = NotificationChannel(
                channelId, 
                "Livestock Reminders", 
                NotificationManager.IMPORTANCE_DEFAULT
            )
            val manager = context.getSystemService(NotificationManager::class.java)
            manager.createNotificationChannel(channel)
        }
        
        val notification = NotificationCompat.Builder(context, channelId)
            .setSmallIcon(android.R.drawable.ic_dialog_info)
            .setContentTitle(title)
            .setContentText(message)
            .setPriority(NotificationCompat.PRIORITY_DEFAULT)
            .build()
        NotificationManagerCompat.from(context).notify(System.currentTimeMillis().toInt(), notification)
    }
} 