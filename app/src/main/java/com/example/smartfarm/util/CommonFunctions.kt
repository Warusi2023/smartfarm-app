package com.example.smartfarm.util

import android.content.Context
import android.content.Intent
import android.net.Uri
import androidx.compose.runtime.*
import androidx.compose.ui.platform.LocalContext
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.launch
import java.io.File
import java.io.FileOutputStream
import java.text.SimpleDateFormat
import java.util.*

/**
 * Common utility functions used across the SmartFarm app
 */
object CommonFunctions {
    
    /**
     * Navigate to external map application
     */
    fun openMap(context: Context, latitude: Double, longitude: Double, label: String = "") {
        val gmmIntentUri = Uri.parse("geo:$latitude,$longitude?q=$latitude,$longitude($label)")
        val mapIntent = Intent(Intent.ACTION_VIEW, gmmIntentUri)
        mapIntent.setPackage("com.google.android.apps.maps")
        
        if (mapIntent.resolveActivity(context.packageManager) != null) {
            context.startActivity(mapIntent)
        } else {
            // Fallback to any map app
            val fallbackIntent = Intent(Intent.ACTION_VIEW, gmmIntentUri)
            context.startActivity(fallbackIntent)
        }
    }
    
    /**
     * Navigate to external map application (alias for openMap)
     */
    fun navigateToExternalMap(context: Context, latitude: Double, longitude: Double, label: String = "") {
        openMap(context, latitude, longitude, label)
    }
    
    /**
     * Navigate to external browser
     */
    fun navigateToExternalBrowser(context: Context, url: String) {
        val intent = Intent(Intent.ACTION_VIEW, Uri.parse(url))
        context.startActivity(intent)
    }
    
    /**
     * Navigate to external email application
     */
    fun navigateToExternalEmail(context: Context, email: String, subject: String = "", body: String = "") {
        val intent = Intent(Intent.ACTION_SENDTO).apply {
            data = Uri.parse("mailto:$email")
            putExtra(Intent.EXTRA_SUBJECT, subject)
            putExtra(Intent.EXTRA_TEXT, body)
        }
        context.startActivity(intent)
    }
    
    /**
     * Navigate to external phone application
     */
    fun navigateToExternalPhone(context: Context, phoneNumber: String) {
        val intent = Intent(Intent.ACTION_DIAL).apply {
            data = Uri.parse("tel:$phoneNumber")
        }
        context.startActivity(intent)
    }
    
    /**
     * Share text content
     */
    fun shareText(context: Context, subject: String, text: String) {
        val intent = Intent(Intent.ACTION_SEND).apply {
            type = "text/plain"
            putExtra(Intent.EXTRA_SUBJECT, subject)
            putExtra(Intent.EXTRA_TEXT, text)
        }
        context.startActivity(Intent.createChooser(intent, "Share via"))
    }
    
    /**
     * Share file
     */
    fun shareFile(context: Context, file: File, mimeType: String, subject: String) {
        val uri = androidx.core.content.FileProvider.getUriForFile(
            context,
            "${context.packageName}.fileprovider",
            file
        )
        
        val intent = Intent(Intent.ACTION_SEND).apply {
            type = mimeType
            putExtra(Intent.EXTRA_SUBJECT, subject)
            putExtra(Intent.EXTRA_STREAM, uri)
            addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION)
        }
        context.startActivity(Intent.createChooser(intent, "Share via"))
    }
    
    /**
     * Format date for display
     */
    fun formatDate(date: Date, pattern: String = "MMM dd, yyyy"): String {
        val formatter = SimpleDateFormat(pattern, Locale.getDefault())
        return formatter.format(date)
    }
    
    /**
     * Format date for database storage
     */
    fun formatDateForDatabase(date: Date): String {
        return formatDate(date, "yyyy-MM-dd")
    }
    
    /**
     * Parse date from string
     */
    fun parseDate(dateString: String, pattern: String = "yyyy-MM-dd"): Date? {
        return try {
            val formatter = SimpleDateFormat(pattern, Locale.getDefault())
            formatter.parse(dateString)
        } catch (e: Exception) {
            null
        }
    }
    
    /**
     * Get current date as string
     */
    fun getCurrentDateString(): String {
        return formatDateForDatabase(Date())
    }
    
    /**
     * Validate email format
     */
    fun isValidEmail(email: String): Boolean {
        return android.util.Patterns.EMAIL_ADDRESS.matcher(email).matches()
    }
    
    /**
     * Validate phone number format
     */
    fun isValidPhoneNumber(phone: String): Boolean {
        return android.util.Patterns.PHONE.matcher(phone).matches()
    }
    
    /**
     * Generate unique ID
     */
    fun generateUniqueId(): Long {
        return System.currentTimeMillis()
    }
    
    /**
     * Calculate age from birth date
     */
    fun calculateAge(birthDate: Date): Int {
        val today = Calendar.getInstance()
        val birth = Calendar.getInstance().apply { time = birthDate }
        
        var age = today.get(Calendar.YEAR) - birth.get(Calendar.YEAR)
        if (today.get(Calendar.DAY_OF_YEAR) < birth.get(Calendar.DAY_OF_YEAR)) {
            age--
        }
        return age
    }
    
    /**
     * Format file size
     */
    fun formatFileSize(bytes: Long): String {
        return when {
            bytes < 1024 -> "$bytes B"
            bytes < 1024 * 1024 -> "${bytes / 1024} KB"
            bytes < 1024 * 1024 * 1024 -> "${bytes / (1024 * 1024)} MB"
            else -> "${bytes / (1024 * 1024 * 1024)} GB"
        }
    }
    
    /**
     * Check if file exists and is readable
     */
    fun isFileReadable(filePath: String): Boolean {
        val file = File(filePath)
        return file.exists() && file.canRead()
    }
    
    /**
     * Create directory if it doesn't exist
     */
    fun ensureDirectoryExists(directoryPath: String): Boolean {
        val directory = File(directoryPath)
        return if (!directory.exists()) {
            directory.mkdirs()
        } else {
            true
        }
    }
    
    /**
     * Delete file safely
     */
    fun deleteFileSafely(filePath: String): Boolean {
        return try {
            val file = File(filePath)
            if (file.exists()) {
                file.delete()
            } else {
                true
            }
        } catch (e: Exception) {
            false
        }
    }
    
    /**
     * Copy file
     */
    fun copyFile(sourcePath: String, destinationPath: String): Boolean {
        return try {
            val sourceFile = File(sourcePath)
            val destFile = File(destinationPath)
            
            if (!sourceFile.exists()) return false
            
            sourceFile.inputStream().use { input ->
                destFile.outputStream().use { output ->
                    input.copyTo(output)
                }
            }
            true
        } catch (e: Exception) {
            false
        }
    }
    
    /**
     * Get file extension
     */
    fun getFileExtension(fileName: String): String {
        return if (fileName.contains(".")) {
            fileName.substringAfterLast(".", "")
        } else {
            ""
        }
    }
    
    /**
     * Get file name without extension
     */
    fun getFileNameWithoutExtension(fileName: String): String {
        return if (fileName.contains(".")) {
            fileName.substringBeforeLast(".")
        } else {
            fileName
        }
    }
    
    /**
     * Check if string is numeric
     */
    fun isNumeric(str: String): Boolean {
        return str.matches(Regex("-?\\d+(\\.\\d+)?"))
    }
    
    /**
     * Safe string to double conversion
     */
    fun safeStringToDouble(str: String, defaultValue: Double = 0.0): Double {
        return try {
            str.toDouble()
        } catch (e: NumberFormatException) {
            defaultValue
        }
    }
    
    /**
     * Safe string to int conversion
     */
    fun safeStringToInt(str: String, defaultValue: Int = 0): Int {
        return try {
            str.toInt()
        } catch (e: NumberFormatException) {
            defaultValue
        }
    }
    
    /**
     * Safe string to long conversion
     */
    fun safeStringToLong(str: String, defaultValue: Long = 0L): Long {
        return try {
            str.toLong()
        } catch (e: NumberFormatException) {
            defaultValue
        }
    }
    
    /**
     * Capitalize first letter of each word
     */
    fun capitalizeWords(str: String): String {
        return str.split(" ").joinToString(" ") { word ->
            if (word.isNotEmpty()) {
                word[0].uppercase() + word.substring(1).lowercase()
            } else {
                word
            }
        }
    }
    
    /**
     * Truncate text with ellipsis
     */
    fun truncateText(text: String, maxLength: Int): String {
        return if (text.length <= maxLength) {
            text
        } else {
            text.substring(0, maxLength - 3) + "..."
        }
    }
    
    /**
     * Remove special characters from string
     */
    fun removeSpecialCharacters(str: String): String {
        return str.replace(Regex("[^a-zA-Z0-9\\s]"), "")
    }
    
    /**
     * Generate random string
     */
    fun generateRandomString(length: Int): String {
        val allowedChars = ('A'..'Z') + ('a'..'z') + ('0'..'9')
        return (1..length)
            .map { allowedChars.random() }
            .joinToString("")
    }
    
    /**
     * Check if device has internet connection
     */
    fun hasInternetConnection(context: Context): Boolean {
        val connectivityManager = context.getSystemService(Context.CONNECTIVITY_SERVICE) as android.net.ConnectivityManager
        val network = connectivityManager.activeNetwork
        val capabilities = connectivityManager.getNetworkCapabilities(network)
        return capabilities != null && (
            capabilities.hasTransport(android.net.NetworkCapabilities.TRANSPORT_WIFI) ||
            capabilities.hasTransport(android.net.NetworkCapabilities.TRANSPORT_CELLULAR)
        )
    }
    
    /**
     * Get device screen density
     */
    fun getScreenDensity(context: Context): Float {
        return context.resources.displayMetrics.density
    }
    
    /**
     * Convert dp to pixels
     */
    fun dpToPx(context: Context, dp: Float): Int {
        return (dp * getScreenDensity(context)).toInt()
    }
    
    /**
     * Convert pixels to dp
     */
    fun pxToDp(context: Context, px: Float): Int {
        return (px / getScreenDensity(context)).toInt()
    }
}

/**
 * Composable wrapper for common functions
 */
@Composable
fun rememberCommonFunctions(): CommonFunctions {
    return remember {
        CommonFunctions
    }
}

/**
 * Extension function for safe coroutine launches
 */
fun CoroutineScope.safeLaunch(
    onError: (Throwable) -> Unit = { /* Default error handling */ },
    block: suspend CoroutineScope.() -> Unit
) {
    launch {
        try {
            block()
        } catch (e: Throwable) {
            onError(e)
        }
    }
} 