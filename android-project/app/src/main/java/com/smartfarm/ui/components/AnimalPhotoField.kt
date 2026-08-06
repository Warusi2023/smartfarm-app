package com.smartfarm.ui.components

import android.Manifest
import android.content.pm.PackageManager
import android.net.Uri
import androidx.activity.compose.rememberLauncherForActivityResult
import androidx.activity.result.PickVisualMediaRequest
import androidx.activity.result.contract.ActivityResultContracts
import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.AddAPhoto
import androidx.compose.material.icons.filled.Close
import androidx.compose.material.icons.filled.PhotoCamera
import androidx.compose.material.icons.filled.PhotoLibrary
import androidx.compose.material3.DropdownMenu
import androidx.compose.material3.DropdownMenuItem
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.ImageBitmap
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.unit.dp
import androidx.core.content.ContextCompat
import androidx.core.content.FileProvider
import com.smartfarm.ui.util.LivestockPhotoCodec
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import java.io.File

/**
 * Animal photo selector with gallery/camera pick, thumbnail preview, and clear action.
 *
 * Camera: requests CAMERA runtime permission (required on API 23+), then TakePicture via FileProvider
 * cache path `livestock_photos/`. Gallery uses PickVisualMedia (no storage permission needed).
 * Both paths encode to a JPEG data URL for the livestock API, same as web.
 */
@Composable
fun AnimalPhotoField(
    photoDataUrl: String?,
    onPhotoChange: (String?) -> Unit,
    modifier: Modifier = Modifier
) {
    val context = LocalContext.current
    var menuExpanded by remember { mutableStateOf(false) }
    var encodeError by remember { mutableStateOf<String?>(null) }
    var pendingCameraUri by remember { mutableStateOf<Uri?>(null) }
    var preview by remember(photoDataUrl) { mutableStateOf<ImageBitmap?>(null) }

    LaunchedEffect(photoDataUrl) {
        preview = withContext(Dispatchers.IO) {
            LivestockPhotoCodec.toImageBitmap(photoDataUrl)
        }
    }

    val galleryLauncher = rememberLauncherForActivityResult(
        contract = ActivityResultContracts.PickVisualMedia()
    ) { uri ->
        if (uri == null) return@rememberLauncherForActivityResult
        val encoded = LivestockPhotoCodec.uriToDataUrl(context, uri)
        if (encoded == null) {
            encodeError = "Could not read that image. Try another photo."
        } else {
            encodeError = null
            onPhotoChange(encoded)
        }
    }

    val cameraLauncher = rememberLauncherForActivityResult(
        contract = ActivityResultContracts.TakePicture()
    ) { success ->
        val uri = pendingCameraUri
        pendingCameraUri = null
        if (!success || uri == null) {
            if (!success) {
                encodeError = "Camera capture was cancelled."
            }
            return@rememberLauncherForActivityResult
        }
        val encoded = LivestockPhotoCodec.uriToDataUrl(context, uri)
        if (encoded == null) {
            encodeError = "Could not capture that photo. Please try again."
        } else {
            encodeError = null
            onPhotoChange(encoded)
        }
    }

    fun launchCameraCapture() {
        try {
            val photosDir = File(context.cacheDir, "livestock_photos").apply { mkdirs() }
            val file = File(photosDir, "animal_${System.currentTimeMillis()}.jpg")
            val uri = FileProvider.getUriForFile(
                context,
                "${context.packageName}.fileprovider",
                file
            )
            pendingCameraUri = uri
            cameraLauncher.launch(uri)
        } catch (ex: Exception) {
            encodeError = "Camera is unavailable: ${ex.message ?: "unknown error"}"
        }
    }

    val cameraPermissionLauncher = rememberLauncherForActivityResult(
        contract = ActivityResultContracts.RequestPermission()
    ) { granted ->
        if (granted) {
            launchCameraCapture()
        } else {
            encodeError = "Camera permission is required to take a photo. Enable it in system settings."
        }
    }

    fun launchCamera() {
        val granted = ContextCompat.checkSelfPermission(
            context,
            Manifest.permission.CAMERA
        ) == PackageManager.PERMISSION_GRANTED
        if (granted) {
            launchCameraCapture()
        } else {
            cameraPermissionLauncher.launch(Manifest.permission.CAMERA)
        }
    }

    Column(modifier = modifier.fillMaxWidth()) {
        Text(
            text = "Animal Photo",
            style = MaterialTheme.typography.titleSmall,
            color = MaterialTheme.colorScheme.onSurface
        )
        Text(
            text = "Choose from gallery or take a photo with the camera (optional).",
            style = MaterialTheme.typography.bodySmall,
            color = MaterialTheme.colorScheme.onSurfaceVariant,
            modifier = Modifier.padding(top = 4.dp, bottom = 8.dp)
        )

        Row(
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.spacedBy(12.dp),
            modifier = Modifier.fillMaxWidth()
        ) {
            Box(
                modifier = Modifier
                    .size(88.dp)
                    .clip(RoundedCornerShape(12.dp))
                    .background(MaterialTheme.colorScheme.surfaceVariant),
                contentAlignment = Alignment.Center
            ) {
                val bitmap = preview
                if (bitmap != null) {
                    Image(
                        bitmap = bitmap,
                        contentDescription = "Animal photo preview",
                        contentScale = ContentScale.Crop,
                        modifier = Modifier.size(88.dp)
                    )
                } else {
                    Icon(
                        imageVector = Icons.Default.AddAPhoto,
                        contentDescription = null,
                        tint = MaterialTheme.colorScheme.onSurfaceVariant
                    )
                }
            }

            Column(modifier = Modifier.weight(1f)) {
                Box {
                    OutlinedButton(onClick = { menuExpanded = true }) {
                        Text(if (photoDataUrl.isNullOrBlank()) "Choose Photo" else "Change Photo")
                    }
                    DropdownMenu(
                        expanded = menuExpanded,
                        onDismissRequest = { menuExpanded = false }
                    ) {
                        DropdownMenuItem(
                            text = { Text("Gallery") },
                            leadingIcon = {
                                Icon(Icons.Default.PhotoLibrary, contentDescription = null)
                            },
                            onClick = {
                                menuExpanded = false
                                galleryLauncher.launch(
                                    PickVisualMediaRequest(
                                        ActivityResultContracts.PickVisualMedia.ImageOnly
                                    )
                                )
                            }
                        )
                        DropdownMenuItem(
                            text = { Text("Camera") },
                            leadingIcon = {
                                Icon(Icons.Default.PhotoCamera, contentDescription = null)
                            },
                            onClick = {
                                menuExpanded = false
                                launchCamera()
                            }
                        )
                    }
                }

                if (!photoDataUrl.isNullOrBlank()) {
                    TextButton(onClick = {
                        encodeError = null
                        onPhotoChange(null)
                    }) {
                        Icon(
                            imageVector = Icons.Default.Close,
                            contentDescription = null,
                            modifier = Modifier.size(16.dp)
                        )
                        Spacer(modifier.width(4.dp))
                        Text("Remove photo")
                    }
                }
            }
        }

        if (encodeError != null) {
            Spacer(modifier.height(6.dp))
            Text(
                text = encodeError.orEmpty(),
                style = MaterialTheme.typography.bodySmall,
                color = MaterialTheme.colorScheme.error
            )
        }
    }
}
