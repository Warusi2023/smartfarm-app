package com.yourcompany.smartfarm.worker

import android.content.Context
import androidx.work.CoroutineWorker
import androidx.work.WorkerParameters
import com.yourcompany.smartfarm.data.database.FarmDatabase
import com.yourcompany.smartfarm.util.NotificationHelper

class TaskNotificationWorker(
    context: Context,
    workerParams: WorkerParameters
) : CoroutineWorker(context, workerParams) {

    override suspend fun doWork(): Result {
        val db = FarmDatabase.getDatabase(applicationContext)
        val dueTasks = db.taskDao().getDueTasks(System.currentTimeMillis())
        dueTasks.forEach { task ->
            NotificationHelper.showTaskNotification(
                applicationContext,
                "Task Reminder: ${'$'}{task.title}",
                "Scheduled for today: ${'$'}{task.description}",
                task.id.toInt()
            )
        }
        return Result.success()
    }
} 