package com.yourcompany.smartfarm.shared.services

import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.PendingIntent
import android.content.Context
import android.content.Intent
import android.graphics.BitmapFactory
import android.os.Build
import androidx.core.app.NotificationCompat
import androidx.core.app.NotificationManagerCompat
import com.google.firebase.messaging.FirebaseMessagingService
import com.google.firebase.messaging.RemoteMessage
import com.yourcompany.smartfarm.shared.MainActivity

/**
 * Android-specific notification service for push notifications and local notifications
 * Handles FCM messages, local notifications, and notification channels
 */
class AndroidNotificationService(private val context: Context) {
    
    companion object {
        const val CHANNEL_ID_ALERTS = "smartfarm_alerts"
        const val CHANNEL_ID_UPDATES = "smartfarm_updates"
        const val CHANNEL_ID_TASKS = "smartfarm_tasks"
        const val CHANNEL_ID_SYSTEM = "smartfarm_system"
        
        const val NOTIFICATION_ID_ALERT = 1001
        const val NOTIFICATION_ID_UPDATE = 1002
        const val NOTIFICATION_ID_TASK = 1003
        const val NOTIFICATION_ID_SYSTEM = 1004
    }
    
    private val notificationManager: NotificationManagerCompat = NotificationManagerCompat.from(context)
    
    init {
        createNotificationChannels()
    }
    
    /**
     * Create notification channels for Android 8.0+
     */
    private fun createNotificationChannels() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            
            // Alerts Channel (High Priority)
            val alertsChannel = NotificationChannel(
                CHANNEL_ID_ALERTS,
                "Farm Alerts",
                NotificationManager.IMPORTANCE_HIGH
            ).apply {
                description = "Critical farm alerts and warnings"
                enableLights(true)
                enableVibration(true)
                setShowBadge(true)
            }
            
            // Updates Channel (Default Priority)
            val updatesChannel = NotificationChannel(
                CHANNEL_ID_UPDATES,
                "Farm Updates",
                NotificationManager.IMPORTANCE_DEFAULT
            ).apply {
                description = "Farm status updates and sensor data"
                enableLights(false)
                enableVibration(false)
                setShowBadge(true)
            }
            
            // Tasks Channel (Default Priority)
            val tasksChannel = NotificationChannel(
                CHANNEL_ID_TASKS,
                "Farm Tasks",
                NotificationManager.IMPORTANCE_DEFAULT
            ).apply {
                description = "Task reminders and scheduling"
                enableLights(false)
                enableVibration(true)
                setShowBadge(true)
            }
            
            // System Channel (Low Priority)
            val systemChannel = NotificationChannel(
                CHANNEL_ID_SYSTEM,
                "System Notifications",
                NotificationManager.IMPORTANCE_LOW
            ).apply {
                description = "System updates and maintenance"
                enableLights(false)
                enableVibration(false)
                setShowBadge(false)
            }
            
            // Create all channels
            val channels = listOf(alertsChannel, updatesChannel, tasksChannel, systemChannel)
            channels.forEach { channel ->
                notificationManager.createNotificationChannel(channel)
            }
            
            println("📱 Notification channels created successfully")
        }
    }
    
    /**
     * Show farm alert notification
     */
    fun showFarmAlert(
        title: String,
        message: String,
        alertType: String = "general",
        farmId: String? = null
    ) {
        val intent = Intent(context, MainActivity::class.java).apply {
            flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK
            putExtra("screen", "alerts")
            farmId?.let { putExtra("farmId", it) }
        }
        
        val pendingIntent = PendingIntent.getActivity(
            context, 0, intent,
            PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE
        )
        
        val notification = NotificationCompat.Builder(context, CHANNEL_ID_ALERTS)
            .setSmallIcon(android.R.drawable.ic_dialog_alert)
            .setContentTitle("🚨 $title")
            .setContentText(message)
            .setStyle(NotificationCompat.BigTextStyle().bigText(message))
            .setPriority(NotificationCompat.PRIORITY_HIGH)
            .setCategory(NotificationCompat.CATEGORY_ALARM)
            .setAutoCancel(true)
            .setContentIntent(pendingIntent)
            .build()
        
        notificationManager.notify(NOTIFICATION_ID_ALERT, notification)
        println("📱 Farm alert notification shown: $title")
    }
    
    /**
     * Show farm update notification
     */
    fun showFarmUpdate(
        title: String,
        message: String,
        updateType: String = "general",
        farmId: String? = null
    ) {
        val intent = Intent(context, MainActivity::class.java).apply {
            flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK
            putExtra("screen", "dashboard")
            farmId?.let { putExtra("farmId", it) }
        }
        
        val pendingIntent = PendingIntent.getActivity(
            context, 0, intent,
            PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE
        )
        
        val notification = NotificationCompat.Builder(context, CHANNEL_ID_UPDATES)
            .setSmallIcon(android.R.drawable.ic_dialog_info)
            .setContentTitle("📊 $title")
            .setContentText(message)
            .setStyle(NotificationCompat.BigTextStyle().bigText(message))
            .setPriority(NotificationCompat.PRIORITY_DEFAULT)
            .setCategory(NotificationCompat.CATEGORY_STATUS)
            .setAutoCancel(true)
            .setContentIntent(pendingIntent)
            .build()
        
        notificationManager.notify(NOTIFICATION_ID_UPDATE, notification)
        println("📱 Farm update notification shown: $title")
    }
    
    /**
     * Show task reminder notification
     */
    fun showTaskReminder(
        taskTitle: String,
        taskDescription: String,
        dueDate: String,
        taskId: String,
        farmId: String? = null
    ) {
        val intent = Intent(context, MainActivity::class.java).apply {
            flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK
            putExtra("screen", "tasks")
            putExtra("taskId", taskId)
            farmId?.let { putExtra("farmId", it) }
        }
        
        val pendingIntent = PendingIntent.getActivity(
            context, 0, intent,
            PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE
        )
        
        val notification = NotificationCompat.Builder(context, CHANNEL_ID_TASKS)
            .setSmallIcon(android.R.drawable.ic_menu_agenda)
            .setContentTitle("📋 Task Reminder: $taskTitle")
            .setContentText("Due: $dueDate")
            .setStyle(NotificationCompat.BigTextStyle().bigText(taskDescription))
            .setPriority(NotificationCompat.PRIORITY_DEFAULT)
            .setCategory(NotificationCompat.CATEGORY_REMINDER)
            .setAutoCancel(true)
            .setContentIntent(pendingIntent)
            .build()
        
        notificationManager.notify(NOTIFICATION_ID_TASK, notification)
        println("📱 Task reminder notification shown: $taskTitle")
    }
    
    /**
     * Show system notification
     */
    fun showSystemNotification(
        title: String,
        message: String,
        notificationType: String = "info"
    ) {
        val intent = Intent(context, MainActivity::class.java).apply {
            flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK
            putExtra("screen", "settings")
        }
        
        val pendingIntent = PendingIntent.getActivity(
            context, 0, intent,
            PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE
        )
        
        val notification = NotificationCompat.Builder(context, CHANNEL_ID_SYSTEM)
            .setSmallIcon(android.R.drawable.ic_menu_manage)
            .setContentTitle("⚙️ $title")
            .setContentText(message)
            .setStyle(NotificationCompat.BigTextStyle().bigText(message))
            .setPriority(NotificationCompat.PRIORITY_LOW)
            .setCategory(NotificationCompat.CATEGORY_SERVICE)
            .setAutoCancel(true)
            .setContentIntent(pendingIntent)
            .build()
        
        notificationManager.notify(NOTIFICATION_ID_SYSTEM, notification)
        println("📱 System notification shown: $title")
    }
    
    /**
     * Show sensor alert notification
     */
    fun showSensorAlert(
        sensorType: String,
        sensorValue: String,
        threshold: String,
        location: String,
        farmId: String? = null
    ) {
        val title = "Sensor Alert: $sensorType"
        val message = "$sensorType at $location: $sensorValue (Threshold: $threshold)"
        
        showFarmAlert(title, message, "sensor", farmId)
    }
    
    /**
     * Show equipment maintenance notification
     */
    fun showEquipmentMaintenance(
        equipmentName: String,
        maintenanceType: String,
        dueDate: String,
        farmId: String? = null
    ) {
        val title = "Equipment Maintenance Required"
        val message = "$equipmentName needs $maintenanceType by $dueDate"
        
        showTaskReminder(title, message, dueDate, "equipment_$equipmentName", farmId)
    }
    
    /**
     * Show weather warning notification
     */
    fun showWeatherWarning(
        warningType: String,
        severity: String,
        location: String,
        farmId: String? = null
    ) {
        val title = "Weather Warning: $warningType"
        val message = "$severity $warningType expected at $location"
        
        showFarmAlert(title, message, "weather", farmId)
    }
    
    /**
     * Show harvest reminder notification
     */
    fun showHarvestReminder(
        cropName: String,
        fieldLocation: String,
        estimatedYield: String,
        farmId: String? = null
    ) {
        val title = "Harvest Time: $cropName"
        val message = "Ready for harvest at $fieldLocation. Estimated yield: $estimatedYield"
        
        showTaskReminder(title, message, "Now", "harvest_$cropName", farmId)
    }
    
    /**
     * Show financial update notification
     */
    fun showFinancialUpdate(
        updateType: String,
        amount: String,
        period: String,
        farmId: String? = null
    ) {
        val title = "Financial Update: $updateType"
        val message = "$updateType: $amount for $period"
        
        showFarmUpdate(title, message, "financial", farmId)
    }
    
    /**
     * Cancel all notifications
     */
    fun cancelAllNotifications() {
        notificationManager.cancelAll()
        println("📱 All notifications cancelled")
    }
    
    /**
     * Cancel specific notification
     */
    fun cancelNotification(notificationId: Int) {
        notificationManager.cancel(notificationId)
        println("📱 Notification cancelled: $notificationId")
    }
    
    /**
     * Get notification channels info
     */
    fun getNotificationChannelsInfo(): Map<String, Any> {
        return if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val channels = notificationManager.notificationChannels
            channels.associate { channel ->
                channel.id to mapOf(
                    "name" to channel.name,
                    "importance" to channel.importance.toString(),
                    "description" to (channel.description ?: ""),
                    "lights" to channel.enableLights(),
                    "vibration" to channel.enableVibration(),
                    "badge" to channel.canShowBadge()
                )
            }
        } else {
            mapOf("channels" to "Not supported on this Android version")
        }
    }
    
    /**
     * Check if notifications are enabled
     */
    fun areNotificationsEnabled(): Boolean {
        return notificationManager.areNotificationsEnabled()
    }
    
    /**
     * Get notification permission status
     */
    fun getNotificationPermissionStatus(): Map<String, Any> {
        return mapOf(
            "notificationsEnabled" to areNotificationsEnabled(),
            "channelsCreated" to (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O),
            "androidVersion" to Build.VERSION.SDK_INT.toString()
        )
    }
}

/**
 * Firebase Cloud Messaging service for push notifications
 */
class SmartFarmFirebaseMessagingService : FirebaseMessagingService() {
    
    private lateinit var notificationService: AndroidNotificationService
    
    override fun onCreate() {
        super.onCreate()
        notificationService = AndroidNotificationService(this)
    }
    
    override fun onMessageReceived(remoteMessage: RemoteMessage) {
        super.onMessageReceived(remoteMessage)
        
        println("📱 FCM message received: ${remoteMessage.messageId}")
        
        // Extract message data
        val title = remoteMessage.data["title"] ?: "SmartFarm Update"
        val message = remoteMessage.data["message"] ?: "You have a new notification"
        val type = remoteMessage.data["type"] ?: "general"
        val farmId = remoteMessage.data["farmId"]
        
        // Show appropriate notification based on type
        when (type) {
            "alert" -> notificationService.showFarmAlert(title, message, "fcm", farmId)
            "update" -> notificationService.showFarmUpdate(title, message, "fcm", farmId)
            "task" -> notificationService.showTaskReminder(title, message, "Now", "fcm_task", farmId)
            "system" -> notificationService.showSystemNotification(title, message, "fcm")
            else -> notificationService.showFarmUpdate(title, message, "fcm", farmId)
        }
    }
    
    override fun onNewToken(token: String) {
        super.onNewToken(token)
        println("📱 New FCM token: $token")
        
        // TODO: Send token to your server
        // sendTokenToServer(token)
    }
    
    override fun onMessageSent(msgId: String) {
        super.onMessageSent(msgId)
        println("📱 FCM message sent: $msgId")
    }
    
    override fun onSendError(msgId: String, exception: Exception) {
        super.onSendError(msgId, exception)
        println("❌ FCM send error: $msgId - ${exception.message}")
    }
}
