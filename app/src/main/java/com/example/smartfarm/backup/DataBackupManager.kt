// Temporarily disabled to focus on core features (Weather, Monetization, User Management)
/*
package com.example.smartfarm.backup

import android.content.Context
import android.net.Uri
import com.example.smartfarm.data.database.FarmDatabase
import com.example.smartfarm.data.model.*
import com.google.gson.Gson
import com.google.gson.GsonBuilder
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.flow
import kotlinx.coroutines.withContext
import java.io.*
import java.security.MessageDigest
import java.text.SimpleDateFormat
import java.util.*
import java.util.zip.ZipEntry
import java.util.zip.ZipInputStream
import java.util.zip.ZipOutputStream
import javax.crypto.Cipher
import javax.crypto.SecretKey
import javax.crypto.spec.GCMParameterSpec
import javax.crypto.spec.SecretKeySpec
import android.util.Log

class DataBackupManager(
    private val context: Context,
    private val database: FarmDatabase
) {
    
    companion object {
        private const val BACKUP_FILE_PREFIX = "smartfarm_backup"
        private const val BACKUP_FILE_EXTENSION = ".sfb"
        private const val ENCRYPTION_ALGORITHM = "AES/GCM/NoPadding"
        private const val GCM_IV_LENGTH = 12
        private const val GCM_TAG_LENGTH = 16
        private const val BUFFER_SIZE = 8192
        private const val TAG = "DataBackupManager"
    }
    
    private val gson: Gson = GsonBuilder()
        .setDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
        .setPrettyPrinting()
        .create()
    
    private val dateFormat = SimpleDateFormat("yyyy-MM-dd_HH-mm-ss", Locale.US)
    
    /**
     * Create a complete backup of all farm data
     */
    suspend fun createCompleteBackup(includeImages: Boolean = true): BackupResult {
        return withContext(Dispatchers.IO) {
            try {
                val timestamp = SimpleDateFormat("yyyy-MM-dd_HH-mm-ss", Locale.getDefault()).format(Date())
                val backupDir = createBackupDirectory()
                val backupFile = File(backupDir, "smartfarm_backup_$timestamp.zip")
                
                ZipOutputStream(backupFile.outputStream()).use { zipOut ->
                    
                    // Backup database
                    backupDatabase(zipOut, timestamp)
                    
                    // Backup user preferences
                    backupUserPreferences(zipOut, timestamp)
                    
                    // Backup images if requested
                    if (includeImages) {
                        backupImages(zipOut, timestamp)
                    }
                    
                    // Backup configuration files
                    backupConfiguration(zipOut, timestamp)
                    
                    // Create backup manifest
                    createBackupManifest(zipOut, timestamp, includeImages)
                }
                
                // Update user's last backup date
                updateLastBackupDate()
                
                BackupResult.Success(backupFile.absolutePath)
                
            } catch (e: Exception) {
                Log.e(TAG, "Backup failed", e)
                BackupResult.Error("Backup failed: ${e.message}")
            }
        }
    }
    
    /**
     * Restore data from backup file
     */
    suspend fun restoreFromBackup(backupFilePath: String, restoreOptions: RestoreOptions): RestoreResult {
        return withContext(Dispatchers.IO) {
            try {
                val backupFile = File(backupFilePath)
                if (!backupFile.exists()) {
                    return@withContext RestoreResult.Error("Backup file not found")
                }
                
                // Validate backup file
                val validationResult = validateBackupFile(backupFile)
                if (validationResult is ValidationResult.Invalid) {
                    return@withContext RestoreResult.Error("Invalid backup file: ${validationResult.reason}")
                }
                
                // Extract backup
                val tempDir = createTempDirectory()
                extractBackup(backupFile, tempDir)
                
                // Read backup manifest
                val manifest = readBackupManifest(tempDir)
                
                // Perform restore based on options
                if (restoreOptions.restoreDatabase) {
                    restoreDatabase(tempDir, manifest)
                }
                
                if (restoreOptions.restorePreferences) {
                    restoreUserPreferences(tempDir, manifest)
                }
                
                if (restoreOptions.restoreImages) {
                    restoreImages(tempDir, manifest)
                }
                
                if (restoreOptions.restoreConfiguration) {
                    restoreConfiguration(tempDir, manifest)
                }
                
                // Clean up temp directory
                tempDir.deleteRecursively()
                
                // Update user's last restore date
                updateLastRestoreDate()
                
                RestoreResult.Success("Restore completed successfully")
                
            } catch (e: Exception) {
                Log.e(TAG, "Restore failed", e)
                RestoreResult.Error("Restore failed: ${e.message}")
            }
        }
    }
    
    /**
     * List available backups
     */
    suspend fun listBackups(): List<BackupInfo> = withContext(Dispatchers.IO) {
        val backupDir = getBackupDirectory()
        if (!backupDir.exists()) return@withContext emptyList()
        
        backupDir.listFiles { file ->
            file.name.endsWith(BACKUP_FILE_EXTENSION)
        }?.map { file ->
            BackupInfo(
                fileName = file.name,
                filePath = file.absolutePath,
                fileSize = file.length(),
                lastModified = file.lastModified(),
                isEncrypted = isBackupEncrypted(file)
            )
        }?.sortedByDescending { it.lastModified } ?: emptyList()
    }
    
    /**
     * Delete backup file
     */
    suspend fun deleteBackup(backupFile: File): Boolean = withContext(Dispatchers.IO) {
        try {
            backupFile.delete()
        } catch (e: Exception) {
            false
        }
    }
    
    /**
     * Export backup to external storage
     */
    suspend fun exportBackup(backupFile: File, destinationUri: Uri): Boolean = withContext(Dispatchers.IO) {
        try {
            context.contentResolver.openOutputStream(destinationUri)?.use { outputStream ->
                FileInputStream(backupFile).use { inputStream ->
                    inputStream.copyTo(outputStream)
                }
            }
            true
        } catch (e: Exception) {
            false
        }
    }
    
    /**
     * Import backup from external storage
     */
    suspend fun importBackup(sourceUri: Uri): File? = withContext(Dispatchers.IO) {
        try {
            val backupFile = createBackupFile()
            context.contentResolver.openInputStream(sourceUri)?.use { inputStream ->
                FileOutputStream(backupFile).use { outputStream ->
                    inputStream.copyTo(outputStream)
                }
            }
            backupFile
        } catch (e: Exception) {
            null
        }
    }
    
    /**
     * Backup database
     */
    private suspend fun backupDatabase(zipOut: ZipOutputStream, timestamp: String) {
        val databaseFile = context.getDatabasePath("farm_database")
        if (databaseFile.exists()) {
            val entry = ZipEntry("database/farm_database_$timestamp.db")
            zipOut.putNextEntry(entry)
            
            databaseFile.inputStream().use { input ->
                input.copyTo(zipOut)
            }
            zipOut.closeEntry()
        }
    }
    
    /**
     * Backup user preferences
     */
    private suspend fun backupUserPreferences(zipOut: ZipOutputStream, timestamp: String) {
        val prefsDir = File(context.filesDir, "shared_prefs")
        if (prefsDir.exists()) {
            prefsDir.listFiles()?.forEach { prefFile ->
                val entry = ZipEntry("preferences/${prefFile.name}")
                zipOut.putNextEntry(entry)
                
                prefFile.inputStream().use { input ->
                    input.copyTo(zipOut)
                }
                zipOut.closeEntry()
            }
        }
    }
    
    /**
     * Backup images
     */
    private suspend fun backupImages(zipOut: ZipOutputStream, timestamp: String) {
        val imagesDir = File(context.filesDir, "images")
        if (imagesDir.exists()) {
            backupDirectoryRecursively(imagesDir, zipOut, "images")
        }
    }
    
    /**
     * Backup configuration files
     */
    private suspend fun backupConfiguration(zipOut: ZipOutputStream, timestamp: String) {
        // Backup local.properties (without sensitive data)
        val localProperties = File(context.filesDir.parentFile, "local.properties")
        if (localProperties.exists()) {
            val sanitizedContent = sanitizeLocalProperties(localProperties.readText())
            val entry = ZipEntry("config/local.properties")
            zipOut.putNextEntry(entry)
            zipOut.write(sanitizedContent.toByteArray())
            zipOut.closeEntry()
        }
        
        // Backup other configuration files
        val configDir = File(context.filesDir, "config")
        if (configDir.exists()) {
            backupDirectoryRecursively(configDir, zipOut, "config")
        }
    }
    
    /**
     * Create backup manifest
     */
    private suspend fun createBackupManifest(zipOut: ZipOutputStream, timestamp: String, includeImages: Boolean) {
        val manifest = buildString {
            appendLine("SmartFarm Backup Manifest")
            appendLine("Generated: $timestamp")
            appendLine("Version: 1.0")
            appendLine("Include Images: $includeImages")
            appendLine()
            appendLine("Database:")
            appendLine("- farm_database.db")
            appendLine()
            appendLine("Preferences:")
            appendLine("- All shared preferences")
            appendLine()
            if (includeImages) {
                appendLine("Images:")
                appendLine("- All farm images")
                appendLine()
            }
            appendLine("Configuration:")
            appendLine("- local.properties (sanitized)")
            appendLine("- Other config files")
            appendLine()
            appendLine("Statistics:")
            appendLine("- Total Records: ${getTotalRecordCount()}")
            appendLine("- Database Size: ${getDatabaseSize()}")
            appendLine("- Images Count: ${if (includeImages) getImagesCount() else 0}")
        }
        
        val entry = ZipEntry("manifest.txt")
        zipOut.putNextEntry(entry)
        zipOut.write(manifest.toByteArray())
        zipOut.closeEntry()
    }
    
    /**
     * Validate backup file
     */
    private fun validateBackupFile(backupFile: File): ValidationResult {
        return try {
            // Check if it's a valid ZIP file
            ZipInputStream(backupFile.inputStream()).use { zipIn ->
                var entry = zipIn.nextEntry
                var hasManifest = false
                var hasDatabase = false
                
                while (entry != null) {
                    when {
                        entry.name == "manifest.txt" -> hasManifest = true
                        entry.name.startsWith("database/") -> hasDatabase = true
                    }
                    entry = zipIn.nextEntry
                }
                
                when {
                    !hasManifest -> ValidationResult.Invalid("Missing backup manifest")
                    !hasDatabase -> ValidationResult.Invalid("Missing database backup")
                    else -> ValidationResult.Valid
                }
            }
        } catch (e: Exception) {
            ValidationResult.Invalid("Invalid ZIP file: ${e.message}")
        }
    }
    
    /**
     * Extract backup file
     */
    private fun extractBackup(backupFile: File, tempDir: File) {
        ZipInputStream(backupFile.inputStream()).use { zipIn ->
            var entry = zipIn.nextEntry
            while (entry != null) {
                val file = File(tempDir, entry.name)
                file.parentFile?.mkdirs()
                
                if (!entry.isDirectory) {
                    file.outputStream().use { output ->
                        zipIn.copyTo(output)
                    }
                }
                
                entry = zipIn.nextEntry
            }
        }
    }
    
    /**
     * Read backup manifest
     */
    private fun readBackupManifest(tempDir: File): BackupManifest {
        val manifestFile = File(tempDir, "manifest.txt")
        val content = manifestFile.readText()
        
        return BackupManifest(
            generatedDate = extractFromManifest(content, "Generated: "),
            version = extractFromManifest(content, "Version: "),
            includeImages = extractFromManifest(content, "Include Images: ").toBoolean(),
            totalRecords = extractFromManifest(content, "Total Records: ").toIntOrNull() ?: 0,
            databaseSize = extractFromManifest(content, "Database Size: "),
            imagesCount = extractFromManifest(content, "Images Count: ").toIntOrNull() ?: 0
        )
    }
    
    /**
     * Restore database
     */
    private suspend fun restoreDatabase(tempDir: File, manifest: BackupManifest) {
        val databaseDir = File(tempDir, "database")
        val databaseFiles = databaseDir.listFiles { file -> file.name.endsWith(".db") }
        
        databaseFiles?.forEach { dbFile ->
            val targetFile = context.getDatabasePath(dbFile.nameWithoutExtension)
            targetFile.parentFile?.mkdirs()
            
            dbFile.copyTo(targetFile, overwrite = true)
        }
        
        // Reopen database connection
        database.close()
        // Note: In a real implementation, you would need to properly handle database reopening
    }
    
    /**
     * Restore user preferences
     */
    private suspend fun restoreUserPreferences(tempDir: File, manifest: BackupManifest) {
        val prefsDir = File(tempDir, "preferences")
        if (prefsDir.exists()) {
            prefsDir.listFiles()?.forEach { prefFile ->
                val targetFile = File(context.filesDir, "shared_prefs/${prefFile.name}")
                targetFile.parentFile?.mkdirs()
                prefFile.copyTo(targetFile, overwrite = true)
            }
        }
    }
    
    /**
     * Restore images
     */
    private suspend fun restoreImages(tempDir: File, manifest: BackupManifest) {
        val imagesDir = File(tempDir, "images")
        if (imagesDir.exists()) {
            val targetDir = File(context.filesDir, "images")
            imagesDir.copyRecursively(targetDir, overwrite = true)
        }
    }
    
    /**
     * Restore configuration
     */
    private suspend fun restoreConfiguration(tempDir: File, manifest: BackupManifest) {
        val configDir = File(tempDir, "config")
        if (configDir.exists()) {
            val targetDir = File(context.filesDir, "config")
            configDir.copyRecursively(targetDir, overwrite = true)
        }
    }
    
    /**
     * Backup directory recursively
     */
    private fun backupDirectoryRecursively(dir: File, zipOut: ZipOutputStream, basePath: String) {
        dir.listFiles()?.forEach { file ->
            val entryPath = "$basePath/${file.name}"
            
            if (file.isDirectory) {
                backupDirectoryRecursively(file, zipOut, entryPath)
            } else {
                val entry = ZipEntry(entryPath)
                zipOut.putNextEntry(entry)
                
                file.inputStream().use { input ->
                    input.copyTo(zipOut)
                }
                zipOut.closeEntry()
            }
        }
    }
    
    /**
     * Sanitize local.properties to remove sensitive data
     */
    private fun sanitizeLocalProperties(content: String): String {
        return content.lines().map { line ->
            when {
                line.contains("API_KEY") -> "# API_KEY=***REMOVED***"
                line.contains("PASSWORD") -> "# PASSWORD=***REMOVED***"
                line.contains("SECRET") -> "# SECRET=***REMOVED***"
                else -> line
            }
        }.joinToString("\n")
    }
    
    /**
     * Extract value from manifest content
     */
    private fun extractFromManifest(content: String, prefix: String): String {
        val line = content.lines().find { it.startsWith(prefix) }
        return line?.substringAfter(prefix) ?: ""
    }
    
    /**
     * Get total record count
     */
    private suspend fun getTotalRecordCount(): Int {
        return try {
            val livestockCount = database.livestockDao().getAllLivestock().size
            val cropsCount = database.cropDao().getAllCrops().size
            val activitiesCount = database.farmActivityDao().getAllActivities().size
            val usersCount = database.userDao().getAllUsers().size
            val farmsCount = database.farmDao().getAllFarms().size
            
            livestockCount + cropsCount + activitiesCount + usersCount + farmsCount
        } catch (e: Exception) {
            0
        }
    }
    
    /**
     * Get database size
     */
    private fun getDatabaseSize(): String {
        val dbFile = context.getDatabasePath("farm_database")
        return if (dbFile.exists()) {
            "${dbFile.length() / 1024} KB"
        } else {
            "0 KB"
        }
    }
    
    /**
     * Get images count
     */
    private fun getImagesCount(): Int {
        val imagesDir = File(context.filesDir, "images")
        return if (imagesDir.exists()) {
            imagesDir.walkTopDown().filter { it.isFile }.count()
        } else {
            0
        }
    }
    
    /**
     * Update last backup date
     */
    private suspend fun updateLastBackupDate() {
        try {
            val userDao = database.userDao()
            val currentUser = userDao.getCurrentUser()
            currentUser?.let { user ->
                val updatedUser = user.copy(lastBackupDate = System.currentTimeMillis())
                userDao.update(updatedUser)
            }
        } catch (e: Exception) {
            Log.w(TAG, "Failed to update last backup date", e)
        }
    }
    
    /**
     * Update last restore date
     */
    private suspend fun updateLastRestoreDate() {
        try {
            val userDao = database.userDao()
            val currentUser = userDao.getCurrentUser()
            currentUser?.let { user ->
                val updatedUser = user.copy(lastSyncDate = System.currentTimeMillis())
                userDao.update(updatedUser)
            }
        } catch (e: Exception) {
            Log.w(TAG, "Failed to update last restore date", e)
        }
    }
    
    /**
     * Create temporary directory
     */
    private fun createTempDirectory(): File {
        val tempDir = File(context.cacheDir, "backup_restore_${System.currentTimeMillis()}")
        tempDir.mkdirs()
        return tempDir
    }
    
    private val gson: Gson = GsonBuilder()
        .setDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
        .setPrettyPrinting()
        .create()
    
    private val dateFormat = SimpleDateFormat("yyyy-MM-dd_HH-mm-ss", Locale.US)
    
    /**
     * Create a complete backup of all data
     */
    suspend fun createBackup(
        password: String? = null,
        includeMedia: Boolean = true
    ): Flow<BackupProgress> = flow {
        try {
            emit(BackupProgress.Started)
            
            val backupData = withContext(Dispatchers.IO) {
                collectAllData()
            }
            
            emit(BackupProgress.DataCollected(backupData.size))
            
            val backupFile = createBackupFile()
            val outputStream = if (password != null) {
                createEncryptedOutputStream(backupFile, password)
            } else {
                FileOutputStream(backupFile)
            }
            
            ZipOutputStream(BufferedOutputStream(outputStream)).use { zipOut ->
                // Add metadata
                val metadata = BackupMetadata(
                    version = "1.0",
                    timestamp = System.currentTimeMillis(),
                    deviceInfo = getDeviceInfo(),
                    dataSize = backupData.size,
                    isEncrypted = password != null
                )
                
                addToZip(zipOut, "metadata.json", gson.toJson(metadata))
                emit(BackupProgress.MetadataAdded)
                
                // Add data files
                backupData.forEach { (tableName, data) ->
                    val jsonData = gson.toJson(data)
                    addToZip(zipOut, "data/$tableName.json", jsonData)
                    emit(BackupProgress.DataAdded(tableName, data.size))
                }
                
                // Add media files if requested
                if (includeMedia) {
                    val mediaFiles = collectMediaFiles()
                    mediaFiles.forEach { (fileName, filePath) ->
                        val file = File(filePath)
                        if (file.exists()) {
                            addFileToZip(zipOut, "media/$fileName", file)
                            emit(BackupProgress.MediaAdded(fileName))
                        }
                    }
                }
            }
            
            val fileSize = backupFile.length()
            val checksum = calculateChecksum(backupFile)
            
            emit(BackupProgress.Completed(backupFile.absolutePath, fileSize, checksum))
            
        } catch (e: Exception) {
            emit(BackupProgress.Error(e.message ?: "Backup failed"))
        }
    }
    
    /**
     * Restore data from backup file
     */
    suspend fun restoreBackup(
        backupFile: File,
        password: String? = null,
        restoreOptions: RestoreOptions = RestoreOptions()
    ): Flow<RestoreProgress> = flow {
        try {
            emit(RestoreProgress.Started)
            
            val inputStream = if (password != null) {
                createEncryptedInputStream(backupFile, password)
            } else {
                FileInputStream(backupFile)
            }
            
            ZipInputStream(BufferedInputStream(inputStream)).use { zipIn ->
                var entry: ZipEntry?
                
                while (zipIn.nextEntry.also { entry = it } != null) {
                    val zipEntry = entry!!
                    
                    when {
                        zipEntry.name == "metadata.json" -> {
                            val metadata = gson.fromJson(
                                zipIn.reader().readText(),
                                BackupMetadata::class.java
                            )
                            emit(RestoreProgress.MetadataRead(metadata))
                        }
                        
                        zipEntry.name.startsWith("data/") -> {
                            val tableName = zipEntry.name.substring(5, zipEntry.name.length - 5)
                            if (restoreOptions.tablesToRestore.isEmpty() || 
                                restoreOptions.tablesToRestore.contains(tableName)) {
                                
                                val jsonData = zipIn.reader().readText()
                                restoreTableData(tableName, jsonData)
                                emit(RestoreProgress.DataRestored(tableName))
                            }
                        }
                        
                        zipEntry.name.startsWith("media/") -> {
                            if (restoreOptions.includeMedia) {
                                val fileName = zipEntry.name.substring(6)
                                restoreMediaFile(zipIn, fileName)
                                emit(RestoreProgress.MediaRestored(fileName))
                            }
                        }
                    }
                }
            }
            
            emit(RestoreProgress.Completed)
            
        } catch (e: Exception) {
            emit(RestoreProgress.Error(e.message ?: "Restore failed"))
        }
    }
    
    private suspend fun collectAllData(): Map<String, List<Any>> = withContext(Dispatchers.IO) {
        val data = mutableMapOf<String, List<Any>>()
        
        // Collect data from all tables
        data["farms"] = database.farmDao().getAllFarms().first()
        data["livestock"] = database.livestockDao().getAllLivestock().first()
        data["animal_health_records"] = database.animalHealthRecordDao().getAll().first()
        data["yield_records"] = database.yieldRecordDao().getAll().first()
        data["farm_activities"] = database.farmActivityDao().getAll().first()
        data["users"] = database.userDao().getAllActiveUsers().first()
        data["livestock_reminders"] = database.livestockReminderDao().getAllReminders().first()
        data["outlier_acknowledgments"] = database.outlierAcknowledgmentDao().getAll().first()
        
        data
    }
    
    private suspend fun restoreTableData(tableName: String, jsonData: String) = withContext(Dispatchers.IO) {
        when (tableName) {
            "farms" -> {
                val farms = gson.fromJson(jsonData, Array<Farm>::class.java).toList()
                farms.forEach { database.farmDao().insertFarm(it) }
            }
            "livestock" -> {
                val livestock = gson.fromJson(jsonData, Array<Livestock>::class.java).toList()
                livestock.forEach { database.livestockDao().insertLivestock(it) }
            }
            "animal_health_records" -> {
                val records = gson.fromJson(jsonData, Array<AnimalHealthRecord>::class.java).toList()
                records.forEach { database.animalHealthRecordDao().insert(it) }
            }
            "yield_records" -> {
                val records = gson.fromJson(jsonData, Array<YieldRecord>::class.java).toList()
                records.forEach { database.yieldRecordDao().insert(it) }
            }
            "farm_activities" -> {
                val activities = gson.fromJson(jsonData, Array<FarmActivity>::class.java).toList()
                activities.forEach { database.farmActivityDao().insert(it) }
            }
            "users" -> {
                val users = gson.fromJson(jsonData, Array<User>::class.java).toList()
                users.forEach { database.userDao().insertUser(it) }
            }
            "livestock_reminders" -> {
                val reminders = gson.fromJson(jsonData, Array<LivestockReminder>::class.java).toList()
                reminders.forEach { database.livestockReminderDao().insert(it) }
            }
            "outlier_acknowledgments" -> {
                val acknowledgments = gson.fromJson(jsonData, Array<OutlierAcknowledgment>::class.java).toList()
                acknowledgments.forEach { database.outlierAcknowledgmentDao().insert(it) }
            }
        }
    }
    
    private fun createBackupFile(): File {
        val timestamp = dateFormat.format(Date())
        val fileName = "${BACKUP_FILE_PREFIX}_$timestamp$BACKUP_FILE_EXTENSION"
        return File(getBackupDirectory(), fileName)
    }
    
    private fun getBackupDirectory(): File {
        val backupDir = File(context.filesDir, "backups")
        if (!backupDir.exists()) {
            backupDir.mkdirs()
        }
        return backupDir
    }
    
    private fun addToZip(zipOut: ZipOutputStream, fileName: String, content: String) {
        val entry = ZipEntry(fileName)
        zipOut.putNextEntry(entry)
        zipOut.write(content.toByteArray())
        zipOut.closeEntry()
    }
    
    private fun addFileToZip(zipOut: ZipOutputStream, fileName: String, file: File) {
        val entry = ZipEntry(fileName)
        zipOut.putNextEntry(entry)
        FileInputStream(file).use { input ->
            input.copyTo(zipOut)
        }
        zipOut.closeEntry()
    }
    
    private fun createEncryptedOutputStream(file: File, password: String): OutputStream {
        val key = generateKeyFromPassword(password)
        val cipher = Cipher.getInstance(ENCRYPTION_ALGORITHM)
        val iv = generateIV()
        cipher.init(Cipher.ENCRYPT_MODE, key, GCMParameterSpec(GCM_TAG_LENGTH * 8, iv))
        
        val outputStream = FileOutputStream(file)
        outputStream.write(iv) // Write IV at the beginning
        
        return object : OutputStream() {
            override fun write(b: Int) {
                val encrypted = cipher.update(byteArrayOf(b.toByte()))
                if (encrypted != null) outputStream.write(encrypted)
            }
            
            override fun write(b: ByteArray, off: Int, len: Int) {
                val encrypted = cipher.update(b, off, len)
                if (encrypted != null) outputStream.write(encrypted)
            }
            
            override fun close() {
                val finalBlock = cipher.doFinal()
                outputStream.write(finalBlock)
                outputStream.close()
            }
        }
    }
    
    private fun createEncryptedInputStream(file: File, password: String): InputStream {
        val key = generateKeyFromPassword(password)
        val inputStream = FileInputStream(file)
        
        // Read IV from the beginning
        val iv = ByteArray(GCM_IV_LENGTH)
        inputStream.read(iv)
        
        val cipher = Cipher.getInstance(ENCRYPTION_ALGORITHM)
        cipher.init(Cipher.DECRYPT_MODE, key, GCMParameterSpec(GCM_TAG_LENGTH * 8, iv))
        
        return object : InputStream() {
            private val buffer = ByteArray(BUFFER_SIZE)
            private var bufferPos = 0
            private var bufferSize = 0
            private var isFinished = false
            
            override fun read(): Int {
                if (bufferPos >= bufferSize) {
                    bufferSize = inputStream.read(buffer)
                    if (bufferSize == -1) {
                        if (!isFinished) {
                            val finalBlock = cipher.doFinal()
                            return if (finalBlock.isNotEmpty()) finalBlock[0].toInt() else -1
                        }
                        return -1
                    }
                    val decrypted = cipher.update(buffer, 0, bufferSize)
                    bufferSize = decrypted.size
                    System.arraycopy(decrypted, 0, buffer, 0, bufferSize)
                    bufferPos = 0
                }
                return buffer[bufferPos++].toInt()
            }
        }
    }
    
    private fun generateKeyFromPassword(password: String): SecretKey {
        val digest = MessageDigest.getInstance("SHA-256")
        val hash = digest.digest(password.toByteArray())
        return SecretKeySpec(hash, "AES")
    }
    
    private fun generateIV(): ByteArray {
        val iv = ByteArray(GCM_IV_LENGTH)
        java.security.SecureRandom().nextBytes(iv)
        return iv
    }
    
    private fun calculateChecksum(file: File): String {
        val digest = MessageDigest.getInstance("SHA-256")
        FileInputStream(file).use { input ->
            val buffer = ByteArray(BUFFER_SIZE)
            var bytesRead: Int
            while (input.read(buffer).also { bytesRead = it } != -1) {
                digest.update(buffer, 0, bytesRead)
            }
        }
        return digest.digest().joinToString("") { "%02x".format(it) }
    }
    
    private fun isBackupEncrypted(file: File): Boolean {
        // Simple heuristic: check if file starts with known IV pattern
        return try {
            FileInputStream(file).use { input ->
                val header = ByteArray(GCM_IV_LENGTH)
                input.read(header)
                // Check if it looks like random bytes (not JSON)
                header.any { it < 32 || it > 126 }
            }
        } catch (e: Exception) {
            false
        }
    }
    
    private fun getDeviceInfo(): DeviceInfo {
        return DeviceInfo(
            manufacturer = android.os.Build.MANUFACTURER,
            model = android.os.Build.MODEL,
            androidVersion = android.os.Build.VERSION.RELEASE,
            appVersion = "1.0.0" // TODO: Get from BuildConfig
        )
    }
    
    private fun collectMediaFiles(): Map<String, String> {
        // TODO: Implement media file collection
        return emptyMap()
    }
    
    private fun restoreMediaFile(inputStream: InputStream, fileName: String) {
        // TODO: Implement media file restoration
    }
}

// Data classes for backup system
data class BackupMetadata(
    val version: String,
    val timestamp: Long,
    val deviceInfo: DeviceInfo,
    val dataSize: Int,
    val isEncrypted: Boolean
)

data class DeviceInfo(
    val manufacturer: String,
    val model: String,
    val androidVersion: String,
    val appVersion: String
)

data class BackupInfo(
    val fileName: String,
    val filePath: String,
    val fileSize: Long,
    val lastModified: Long,
    val isEncrypted: Boolean
)

data class RestoreOptions(
    val tablesToRestore: Set<String> = emptySet(),
    val includeMedia: Boolean = true,
    val overwriteExisting: Boolean = false
)

// Progress tracking
sealed class BackupProgress {
    object Started : BackupProgress()
    data class DataCollected(val size: Int) : BackupProgress()
    object MetadataAdded : BackupProgress()
    data class DataAdded(val tableName: String, val recordCount: Int) : BackupProgress()
    data class MediaAdded(val fileName: String) : BackupProgress()
    data class Completed(val filePath: String, val fileSize: Long, val checksum: String) : BackupProgress()
    data class Error(val message: String) : BackupProgress()
}

sealed class RestoreProgress {
    object Started : RestoreProgress()
    data class MetadataRead(val metadata: BackupMetadata) : RestoreProgress()
    data class DataRestored(val tableName: String) : RestoreProgress()
    data class MediaRestored(val fileName: String) : RestoreProgress()
    object Completed : RestoreProgress()
    data class Error(val message: String) : RestoreProgress()
}
*/ 