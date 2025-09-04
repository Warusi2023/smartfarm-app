package com.yourcompany.smartfarm.shared.services

import android.Manifest
import android.app.Activity
import android.content.Context
import android.content.Intent
import android.content.pm.PackageManager
import android.graphics.Bitmap
import android.graphics.BitmapFactory
import android.net.Uri
import android.provider.MediaStore
import androidx.activity.result.ActivityResultLauncher
import androidx.activity.result.contract.ActivityResultContracts
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat
import androidx.core.content.FileProvider
import java.io.File
import java.io.FileOutputStream
import java.io.IOException
import java.text.SimpleDateFormat
import java.util.*

/**
 * Android-specific camera service for photo capture and uploads
 * Handles camera permissions, photo capture, and file management
 */
class AndroidCameraService(private val context: Context) {
    
    private var photoFile: File? = null
    private var onPhotoCaptured: ((File) -> Unit)? = null
    private var onPhotoSelected: ((File) -> Unit)? = null
    
    companion object {
        private const val CAMERA_PERMISSION_REQUEST = 100
        private const val STORAGE_PERMISSION_REQUEST = 101
        private const val PHOTO_FILE_PREFIX = "SMARTFARM_"
        private const val PHOTO_FILE_SUFFIX = ".jpg"
        private const val PHOTO_QUALITY = 85
    }
    
    /**
     * Check if camera permission is granted
     */
    fun hasCameraPermission(): Boolean {
        return ContextCompat.checkSelfPermission(
            context,
            Manifest.permission.CAMERA
        ) == PackageManager.PERMISSION_GRANTED
    }
    
    /**
     * Check if storage permission is granted
     */
    fun hasStoragePermission(): Boolean {
        return ContextCompat.checkSelfPermission(
            context,
            Manifest.permission.WRITE_EXTERNAL_STORAGE
        ) == PackageManager.PERMISSION_GRANTED
    }
    
    /**
     * Request camera permission
     */
    fun requestCameraPermission(activity: Activity) {
        if (!hasCameraPermission()) {
            ActivityCompat.requestPermissions(
                activity,
                arrayOf(Manifest.permission.CAMERA),
                CAMERA_PERMISSION_REQUEST
            )
        }
    }
    
    /**
     * Request storage permission
     */
    fun requestStoragePermission(activity: Activity) {
        if (!hasStoragePermission()) {
            ActivityCompat.requestPermissions(
                activity,
                arrayOf(Manifest.permission.WRITE_EXTERNAL_STORAGE),
                STORAGE_PERMISSION_REQUEST
            )
        }
    }
    
    /**
     * Create camera intent launcher
     */
    fun createCameraLauncher(
        onPhotoCaptured: (File) -> Unit
    ): ActivityResultLauncher<Intent> {
        this.onPhotoCaptured = onPhotoCaptured
        
        return ActivityResultLauncher<Intent> { result ->
            if (result.resultCode == Activity.RESULT_OK) {
                photoFile?.let { file ->
                    onPhotoCaptured(file)
                }
            }
        }
    }
    
    /**
     * Create gallery intent launcher
     */
    fun createGalleryLauncher(
        onPhotoSelected: (File) -> Unit
    ): ActivityResultLauncher<Intent> {
        this.onPhotoSelected = onPhotoSelected
        
        return ActivityResultLauncher<Intent> { result ->
            if (result.resultCode == Activity.RESULT_OK) {
                result.data?.data?.let { uri ->
                    val file = createFileFromUri(uri)
                    onPhotoSelected(file)
                }
            }
        }
    }
    
    /**
     * Launch camera to capture photo
     */
    fun launchCamera(launcher: ActivityResultLauncher<Intent>) {
        if (!hasCameraPermission()) {
            println("❌ Camera permission not granted")
            return
        }
        
        try {
            // Create photo file
            photoFile = createImageFile()
            
            // Create camera intent
            val cameraIntent = Intent(MediaStore.ACTION_IMAGE_CAPTURE)
            
            // Get file URI using FileProvider
            val photoUri = FileProvider.getUriForFile(
                context,
                "${context.packageName}.fileprovider",
                photoFile!!
            )
            
            cameraIntent.putExtra(MediaStore.EXTRA_OUTPUT, photoUri)
            
            // Launch camera
            launcher.launch(cameraIntent)
            
        } catch (e: Exception) {
            println("❌ Failed to launch camera: ${e.message}")
        }
    }
    
    /**
     * Launch gallery to select photo
     */
    fun launchGallery(launcher: ActivityResultLauncher<Intent>) {
        if (!hasStoragePermission()) {
            println("❌ Storage permission not granted")
            return
        }
        
        try {
            val galleryIntent = Intent(Intent.ACTION_PICK, MediaStore.Images.Media.EXTERNAL_CONTENT_URI)
            galleryIntent.type = "image/*"
            
            launcher.launch(galleryIntent)
            
        } catch (e: Exception) {
            println("❌ Failed to launch gallery: ${e.message}")
        }
    }
    
    /**
     * Create image file for camera capture
     */
    private fun createImageFile(): File {
        val timeStamp = SimpleDateFormat("yyyyMMdd_HHmmss", Locale.getDefault()).format(Date())
        val imageFileName = "${PHOTO_FILE_PREFIX}${timeStamp}_"
        
        val storageDir = context.getExternalFilesDir("SmartFarm/Photos")
        if (!storageDir?.exists()!!) {
            storageDir.mkdirs()
        }
        
        return File.createTempFile(imageFileName, PHOTO_FILE_SUFFIX, storageDir)
    }
    
    /**
     * Create file from gallery URI
     */
    private fun createFileFromUri(uri: Uri): File {
        val inputStream = context.contentResolver.openInputStream(uri)
        val timeStamp = SimpleDateFormat("yyyyMMdd_HHmmss", Locale.getDefault()).format(Date())
        val fileName = "${PHOTO_FILE_PREFIX}${timeStamp}_gallery${PHOTO_FILE_SUFFIX}"
        
        val storageDir = context.getExternalFilesDir("SmartFarm/Photos")
        if (!storageDir?.exists()!!) {
            storageDir.mkdirs()
        }
        
        val file = File(storageDir, fileName)
        val outputStream = FileOutputStream(file)
        
        inputStream?.use { input ->
            outputStream.use { output ->
                input.copyTo(output)
            }
        }
        
        return file
    }
    
    /**
     * Compress image file
     */
    fun compressImage(inputFile: File, maxSizeKB: Int = 500): File {
        try {
            // Load bitmap
            val bitmap = BitmapFactory.decodeFile(inputFile.absolutePath)
            
            // Calculate compression quality
            val quality = calculateCompressionQuality(inputFile.length(), maxSizeKB * 1024L)
            
            // Create compressed file
            val compressedFile = File(
                inputFile.parent,
                "${inputFile.nameWithoutExtension}_compressed${inputFile.extension}"
            )
            
            val outputStream = FileOutputStream(compressedFile)
            bitmap.compress(Bitmap.CompressFormat.JPEG, quality, outputStream)
            outputStream.close()
            
            println("📸 Image compressed: ${inputFile.length() / 1024}KB -> ${compressedFile.length() / 1024}KB")
            
            return compressedFile
            
        } catch (e: Exception) {
            println("❌ Failed to compress image: ${e.message}")
            return inputFile
        }
    }
    
    /**
     * Resize image to specified dimensions
     */
    fun resizeImage(inputFile: File, maxWidth: Int, maxHeight: Int): File {
        try {
            // Load bitmap
            val bitmap = BitmapFactory.decodeFile(inputFile.absolutePath)
            
            // Calculate new dimensions
            val (newWidth, newHeight) = calculateDimensions(
                bitmap.width, bitmap.height, maxWidth, maxHeight
            )
            
            // Resize bitmap
            val resizedBitmap = Bitmap.createScaledBitmap(bitmap, newWidth, newHeight, true)
            
            // Create resized file
            val resizedFile = File(
                inputFile.parent,
                "${inputFile.nameWithoutExtension}_${newWidth}x${newHeight}${inputFile.extension}"
            )
            
            val outputStream = FileOutputStream(resizedFile)
            resizedBitmap.compress(Bitmap.CompressFormat.JPEG, PHOTO_QUALITY, outputStream)
            outputStream.close()
            
            println("📸 Image resized: ${bitmap.width}x${bitmap.height} -> ${newWidth}x${newHeight}")
            
            return resizedFile
            
        } catch (e: Exception) {
            println("❌ Failed to resize image: ${e.message}")
            return inputFile
        }
    }
    
    /**
     * Generate thumbnail from image
     */
    fun generateThumbnail(inputFile: File, thumbnailSize: Int = 200): File {
        try {
            // Load bitmap
            val bitmap = BitmapFactory.decodeFile(inputFile.absolutePath)
            
            // Calculate thumbnail dimensions
            val (thumbnailWidth, thumbnailHeight) = calculateDimensions(
                bitmap.width, bitmap.height, thumbnailSize, thumbnailSize
            )
            
            // Create thumbnail bitmap
            val thumbnailBitmap = Bitmap.createScaledBitmap(
                bitmap, thumbnailWidth, thumbnailHeight, true
            )
            
            // Create thumbnail file
            val thumbnailFile = File(
                inputFile.parent,
                "${inputFile.nameWithoutExtension}_thumb${inputFile.extension}"
            )
            
            val outputStream = FileOutputStream(thumbnailFile)
            thumbnailBitmap.compress(Bitmap.CompressFormat.JPEG, PHOTO_QUALITY, outputStream)
            outputStream.close()
            
            println("📸 Thumbnail generated: ${thumbnailWidth}x${thumbnailHeight}")
            
            return thumbnailFile
            
        } catch (e: Exception) {
            println("❌ Failed to generate thumbnail: ${e.message}")
            return inputFile
        }
    }
    
    /**
     * Calculate compression quality based on target size
     */
    private fun calculateCompressionQuality(currentSize: Long, targetSize: Long): Int {
        val ratio = targetSize.toDouble() / currentSize.toDouble()
        return (ratio * 100).toInt().coerceIn(10, 100)
    }
    
    /**
     * Calculate new dimensions maintaining aspect ratio
     */
    private fun calculateDimensions(
        currentWidth: Int,
        currentHeight: Int,
        maxWidth: Int,
        maxHeight: Int
    ): Pair<Int, Int> {
        val aspectRatio = currentWidth.toFloat() / currentHeight.toFloat()
        
        return if (currentWidth > currentHeight) {
            // Landscape
            val newWidth = maxWidth
            val newHeight = (maxWidth / aspectRatio).toInt()
            Pair(newWidth, newHeight)
        } else {
            // Portrait
            val newHeight = maxHeight
            val newWidth = (maxHeight * aspectRatio).toInt()
            Pair(newWidth, newHeight)
        }
    }
    
    /**
     * Get photo file info
     */
    fun getPhotoFileInfo(file: File): Map<String, Any> {
        return mapOf(
            "name" to file.name,
            "size" to file.length(),
            "sizeKB" to file.length() / 1024,
            "path" to file.absolutePath,
            "exists" to file.exists(),
            "lastModified" to file.lastModified()
        )
    }
    
    /**
     * Clean up temporary files
     */
    fun cleanupTempFiles() {
        try {
            val storageDir = context.getExternalFilesDir("SmartFarm/Photos")
            storageDir?.listFiles()?.forEach { file ->
                if (file.name.contains("temp") || file.name.contains("_compressed") || file.name.contains("_thumb")) {
                    file.delete()
                    println("🗑️ Cleaned up temp file: ${file.name}")
                }
            }
        } catch (e: Exception) {
            println("❌ Failed to cleanup temp files: ${e.message}")
        }
    }
    
    /**
     * Get camera and storage permissions status
     */
    fun getPermissionsStatus(): Map<String, Boolean> {
        return mapOf(
            "camera" to hasCameraPermission(),
            "storage" to hasStoragePermission()
        )
    }
}
