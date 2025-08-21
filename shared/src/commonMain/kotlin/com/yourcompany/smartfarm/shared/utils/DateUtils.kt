package com.yourcompany.smartfarm.shared.utils

object DateUtils {
    
    fun formatRelativeDate(timestamp: Long): String {
        val now = getCurrentTimeMillis()
        val diff = timestamp - now
        val days = diff / (24 * 60 * 60 * 1000)
        
        return when {
            days < 0 -> "${kotlin.math.abs(days)} days ago"
            days == 0L -> "Today"
            days == 1L -> "Tomorrow"
            days < 7 -> "In $days days"
            days < 30 -> "In ${days / 7} weeks"
            days < 365 -> "In ${days / 30} months"
            else -> "In ${days / 365} years"
        }
    }
    
    fun formatDate(timestamp: Long): String {
        val now = getCurrentTimeMillis()
        val diff = timestamp - now
        val days = diff / (24 * 60 * 60 * 1000)
        
        return when {
            days < 0 -> "${kotlin.math.abs(days)} days overdue"
            days == 0L -> "Today"
            days == 1L -> "Tomorrow"
            else -> "In $days days"
        }
    }
    
    fun isOverdue(timestamp: Long): Boolean {
        return timestamp < getCurrentTimeMillis()
    }
    
    fun getDaysUntil(timestamp: Long): Int {
        val now = getCurrentTimeMillis()
        val diff = timestamp - now
        return (diff / (24 * 60 * 60 * 1000)).toInt()
    }
}

// Platform-agnostic time function
internal expect fun getCurrentTimeMillis(): Long
