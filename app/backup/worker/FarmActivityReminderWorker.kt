package com.yourcompany.smartfarm.worker

import android.app.NotificationChannel
import android.app.NotificationManager
import android.content.Context
import android.os.Build
import androidx.core.app.NotificationCompat
import androidx.core.app.NotificationManagerCompat
import androidx.work.CoroutineWorker
import androidx.work.WorkerParameters
import com.yourcompany.smartfarm.R
import com.yourcompany.smartfarm.data.database.FarmDatabase
import com.yourcompany.smartfarm.data.model.RecurrenceFrequency
import com.yourcompany.smartfarm.data.model.Recurrence
import com.yourcompany.smartfarm.data.model.FarmActivity
import java.time.LocalDateTime
import java.time.format.DateTimeFormatter
import kotlinx.coroutines.flow.first

class FarmActivityReminderWorker(
    appContext: Context,
    workerParams: WorkerParameters
) : CoroutineWorker(appContext, workerParams) {
    override suspend fun doWork(): Result {
        val context = applicationContext
        val db = FarmDatabase.getDatabase(context)
        val dao = db.farmActivityDao()
        val now = LocalDateTime.now()
        val formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm")
        
        // Get all activities
        val activities = dao.getAll().first() ?: emptyList()
        
        // Expand recurring activities for today and tomorrow
        val expanded = mutableListOf<FarmActivity>()
        val daysToCheck = listOf(now.toLocalDate(), now.toLocalDate().plusDays(1))
        
        activities.forEach { act ->
            if (act.recurrence == null) {
                expanded.add(act)
            } else {
                val startDate = try { 
                    java.time.LocalDate.parse(act.date) 
                } catch (_: Exception) { 
                    null 
                }
                
                if (startDate != null) {
                    val freq = act.recurrence.frequency
                    val interval = act.recurrence.interval
                    
                    for (day in daysToCheck) {
                        var d = startDate!!
                        while (!d.isAfter(day)) {
                            if (d == day) {
                                expanded.add(act.copy(date = d.toString()))
                            }
                            d = when (freq) {
                                RecurrenceFrequency.DAILY -> d.plusDays(interval.toLong())
                                RecurrenceFrequency.WEEKLY -> d.plusWeeks(interval.toLong())
                                RecurrenceFrequency.MONTHLY -> d.plusMonths(interval.toLong())
                                else -> break
                            }
                        }
                    }
                }
            }
        }
        
        val upcoming = expanded.filter { act ->
            act.reminderMinutesBefore != null && act.time != null &&
            runCatching {
                val activityTime = LocalDateTime.parse("${act.date} ${act.time}", formatter)
                val reminderTime = activityTime.minusMinutes(act.reminderMinutesBefore.toLong())
                val diff = java.time.Duration.between(now, reminderTime).toMinutes()
                diff in 0..60
            }.getOrDefault(false)
        }
        
        if (upcoming.isNotEmpty()) {
            val channelId = "farm_activity_reminders"
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                val channel = NotificationChannel(
                    channelId, 
                    "Farm Activity Reminders", 
                    NotificationManager.IMPORTANCE_HIGH
                )
                val nm = context.getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager
                nm.createNotificationChannel(channel)
            }
            
            upcoming.forEach { act ->
                            val notification = NotificationCompat.Builder(context, channelId)
                .setContentTitle("Upcoming Activity: ${act.title}")
                .setContentText("${act.type} at ${act.time} on ${act.date}")
                .setSmallIcon(android.R.drawable.ic_dialog_info)
                .setAutoCancel(true)
                .build()
                NotificationManagerCompat.from(context).notify(act.id.toInt(), notification)
            }
        }
        
        return Result.success()
    }
} 