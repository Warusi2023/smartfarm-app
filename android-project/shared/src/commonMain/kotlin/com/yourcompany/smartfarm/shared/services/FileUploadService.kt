package com.yourcompany.smartfarm.shared.services

import kotlinx.coroutines.*
import kotlinx.coroutines.flow.*
import kotlinx.serialization.Serializable
import kotlinx.serialization.json.Json
import kotlinx.serialization.encodeToString

/**
 * File upload service for SmartFarm
 * Supports multiple storage backends and file types
 */
@Serializable
data class FileInfo(
    val id: String,
    val name: String,
    val size: Long,
    val type: String,
    val url: String? = null,
    val thumbnailUrl: String? = null,
    val uploadedAt: Long = 0L,
    val farmId: String? = null,
    val category: FileCategory = FileCategory.OTHER,
    val metadata: Map<String, String> = emptyMap()
)

@Serializable
data class UploadProgress(
    val fileId: String,
    val fileName: String,
    val bytesUploaded: Long,
    val totalBytes: Long,
    val percentage: Double,
    val status: UploadStatus,
    val error: String? = null
)

@Serializable
data class UploadRequest(
    val file: ByteArray,
    val fileName: String,
    val fileType: String,
    val farmId: String? = null,
    val category: FileCategory = FileCategory.OTHER,
    val metadata: Map<String, String> = emptyMap()
)

enum class FileCategory {
    CROP_IMAGES, LIVESTOCK_PHOTOS, EQUIPMENT_DOCS, FINANCIAL_RECORDS, 
    WEATHER_DATA, SOIL_ANALYSIS, HARVEST_REPORTS, MAINTENANCE_LOGS,
    TRAINING_MATERIALS, RESEARCH_DATA, COMPLIANCE_DOCS, OTHER
}

enum class UploadStatus {
    PENDING, UPLOADING, COMPLETED, FAILED, CANCELLED
}

enum class StorageBackend {
    LOCAL, AWS_S3, GOOGLE_CLOUD, AZURE_BLOB, CUSTOM
}

class FileUploadService {
    
    private var currentBackend: StorageBackend = StorageBackend.LOCAL
    private var storageConfig: Map<String, String> = emptyMap()
    
    private val _uploadProgress = MutableStateFlow<Map<String, UploadProgress>>(emptyMap())
    val uploadProgress: StateFlow<Map<String, UploadProgress>> = _uploadProgress.asStateFlow()
    
    private val _uploadedFiles = MutableStateFlow<List<FileInfo>>(emptyList())
    val uploadedFiles: StateFlow<List<FileInfo>> = _uploadedFiles.asStateFlow()
    
    private val json = Json { ignoreUnknownKeys = true }
    private val uploadJobs = mutableMapOf<String, Job>()
    
    /**
     * Configure storage backend
     */
    fun configureStorage(backend: StorageBackend, config: Map<String, String>) {
        currentBackend = backend
        storageConfig = config
        println("⚙️ Storage configured: $backend")
    }
    
    /**
     * Upload a single file
     */
    suspend fun uploadFile(request: UploadRequest): FileInfo {
        val fileId = generateFileId()
        
        // Initialize upload progress
        val progress = UploadProgress(
            fileId = fileId,
            fileName = request.fileName,
            bytesUploaded = 0L,
            totalBytes = request.file.size.toLong(),
            percentage = 0.0,
            status = UploadStatus.PENDING
        )
        
        updateProgress(fileId, progress)
        
        return try {
            // Start upload job
            val uploadJob = CoroutineScope(Dispatchers.IO).launch {
                performUpload(fileId, request)
            }
            uploadJobs[fileId] = uploadJob
            
            // Wait for completion
            uploadJob.join()
            
            // Get final result
            val finalProgress = _uploadProgress.value[fileId]
            if (finalProgress?.status == UploadStatus.COMPLETED) {
                val fileInfo = FileInfo(
                    id = fileId,
                    name = request.fileName,
                    size = request.file.size.toLong(),
                    type = request.fileType,
                    url = finalProgress.fileId, // Use fileId as URL for now
                    uploadedAt = System.currentTimeMillis(),
                    farmId = request.farmId,
                    category = request.category,
                    metadata = request.metadata
                )
                
                addUploadedFile(fileInfo)
                fileInfo
            } else {
                throw Exception("Upload failed: ${finalProgress?.error}")
            }
            
        } catch (e: Exception) {
            updateProgress(fileId, progress.copy(
                status = UploadStatus.FAILED,
                error = e.message
            ))
            throw e
        }
    }
    
    /**
     * Upload multiple files
     */
    suspend fun uploadMultipleFiles(requests: List<UploadRequest>): List<FileInfo> {
        return requests.map { request ->
            uploadFile(request)
        }
    }
    
    /**
     * Cancel upload
     */
    fun cancelUpload(fileId: String) {
        uploadJobs[fileId]?.cancel()
        uploadJobs.remove(fileId)
        
        updateProgress(fileId, _uploadProgress.value[fileId]?.copy(
            status = UploadStatus.CANCELLED
        ))
        
        println("❌ Upload cancelled: $fileId")
    }
    
    /**
     * Delete uploaded file
     */
    suspend fun deleteFile(fileId: String): Boolean {
        return try {
            when (currentBackend) {
                StorageBackend.LOCAL -> deleteLocalFile(fileId)
                StorageBackend.AWS_S3 -> deleteS3File(fileId)
                StorageBackend.GOOGLE_CLOUD -> deleteGoogleCloudFile(fileId)
                StorageBackend.AZURE_BLOB -> deleteAzureFile(fileId)
                StorageBackend.CUSTOM -> deleteCustomFile(fileId)
            }
            
            // Remove from uploaded files list
            val currentFiles = _uploadedFiles.value.toMutableList()
            currentFiles.removeAll { it.id == fileId }
            _uploadedFiles.value = currentFiles
            
            println("🗑️ File deleted: $fileId")
            true
            
        } catch (e: Exception) {
            println("❌ Failed to delete file: ${e.message}")
            false
        }
    }
    
    /**
     * Get file by ID
     */
    fun getFile(fileId: String): FileInfo? {
        return _uploadedFiles.value.find { it.id == fileId }
    }
    
    /**
     * Get files by category
     */
    fun getFilesByCategory(category: FileCategory): List<FileInfo> {
        return _uploadedFiles.value.filter { it.category == category }
    }
    
    /**
     * Get files by farm
     */
    fun getFilesByFarm(farmId: String): List<FileInfo> {
        return _uploadedFiles.value.filter { it.farmId == farmId }
    }
    
    /**
     * Generate thumbnail for image file
     */
    suspend fun generateThumbnail(fileId: String, maxSize: Int = 200): String? {
        return try {
            val file = getFile(fileId)
            if (file?.type?.startsWith("image/") == true) {
                // Generate thumbnail based on backend
                when (currentBackend) {
                    StorageBackend.LOCAL -> generateLocalThumbnail(fileId, maxSize)
                    StorageBackend.AWS_S3 -> generateS3Thumbnail(fileId, maxSize)
                    StorageBackend.GOOGLE_CLOUD -> generateGoogleCloudThumbnail(fileId, maxSize)
                    StorageBackend.AZURE_BLOB -> generateAzureThumbnail(fileId, maxSize)
                    StorageBackend.CUSTOM -> generateCustomThumbnail(fileId, maxSize)
                }
            } else {
                null
            }
        } catch (e: Exception) {
            println("❌ Failed to generate thumbnail: ${e.message}")
            null
        }
    }
    
    /**
     * Get storage statistics
     */
    fun getStorageStats(): Map<String, Any> {
        val files = _uploadedFiles.value
        val totalSize = files.sumOf { it.size }
        val categoryCounts = FileCategory.values().associateWith { category ->
            files.count { it.category == category }
        }
        
        return mapOf(
            "totalFiles" to files.size,
            "totalSize" to totalSize,
            "categoryCounts" to categoryCounts,
            "backend" to currentBackend.name,
            "activeUploads" to uploadJobs.size
        )
    }
    
    /**
     * Perform the actual upload based on backend
     */
    private suspend fun performUpload(fileId: String, request: UploadRequest) {
        try {
            updateProgress(fileId, _uploadProgress.value[fileId]?.copy(
                status = UploadStatus.UPLOADING
            ))
            
            // Simulate upload progress
            val chunkSize = 1024L // 1KB chunks
            var uploadedBytes = 0L
            
            while (uploadedBytes < request.file.size) {
                delay(100) // Simulate network delay
                
                val nextChunk = minOf(chunkSize, request.file.size - uploadedBytes)
                uploadedBytes += nextChunk
                
                val percentage = (uploadedBytes.toDouble() / request.file.size) * 100
                updateProgress(fileId, _uploadProgress.value[fileId]?.copy(
                    bytesUploaded = uploadedBytes,
                    percentage = percentage
                ))
            }
            
            // Upload completed
            updateProgress(fileId, _uploadProgress.value[fileId]?.copy(
                status = UploadStatus.COMPLETED,
                percentage = 100.0
            ))
            
            println("✅ Upload completed: ${request.fileName}")
            
        } catch (e: Exception) {
            updateProgress(fileId, _uploadProgress.value[fileId]?.copy(
                status = UploadStatus.FAILED,
                error = e.message
            ))
            throw e
        }
    }
    
    /**
     * Update upload progress
     */
    private fun updateProgress(fileId: String, progress: UploadProgress?) {
        progress?.let {
            val currentProgress = _uploadProgress.value.toMutableMap()
            currentProgress[fileId] = it
            _uploadProgress.value = currentProgress
        }
    }
    
    /**
     * Add uploaded file to list
     */
    private fun addUploadedFile(fileInfo: FileInfo) {
        val currentFiles = _uploadedFiles.value.toMutableList()
        currentFiles.add(fileInfo)
        _uploadedFiles.value = currentFiles
    }
    
    /**
     * Generate unique file ID
     */
    private fun generateFileId(): String {
        return "file_${System.currentTimeMillis()}_${kotlin.random.Random.nextInt(1000, 9999)}"
    }
    
    // Platform-specific implementations
    private expect suspend fun deleteLocalFile(fileId: String): Boolean
    private expect suspend fun deleteS3File(fileId: String): Boolean
    private expect suspend fun deleteGoogleCloudFile(fileId: String): Boolean
    private expect suspend fun deleteAzureFile(fileId: String): Boolean
    private expect suspend fun deleteCustomFile(fileId: String): Boolean
    
    private expect suspend fun generateLocalThumbnail(fileId: String, maxSize: Int): String?
    private expect suspend fun generateS3Thumbnail(fileId: String, maxSize: Int): String?
    private expect suspend fun generateGoogleCloudThumbnail(fileId: String, maxSize: Int): String?
    private expect suspend fun generateAzureThumbnail(fileId: String, maxSize: Int): String?
    private expect suspend fun generateCustomThumbnail(fileId: String, maxSize: Int): String?
}
