package com.smartfarm.ui.util

import android.content.Context
import android.graphics.Bitmap
import android.graphics.BitmapFactory
import android.net.Uri
import android.util.Base64
import androidx.compose.ui.graphics.ImageBitmap
import androidx.compose.ui.graphics.asImageBitmap
import java.io.ByteArrayOutputStream
import java.net.HttpURLConnection
import java.net.URL
import kotlin.math.max

/**
 * Encode / decode livestock photos for the API (base64 data URLs) and Compose previews.
 * Failures return null so a bad image never crashes the livestock list.
 */
object LivestockPhotoCodec {

    private const val MAX_DIMENSION = 1280
    private const val JPEG_QUALITY = 80
    private const val MAX_ENCODED_BYTES = 3_500_000 // keep under the 10mb JSON body limit

    fun resolvePhoto(photo: String?, photoUrl: String?): String? {
        val url = photoUrl?.trim()?.takeIf { it.isNotEmpty() }
        if (url != null) return url
        return photo?.trim()?.takeIf { it.isNotEmpty() }
    }

    fun uriToDataUrl(context: Context, uri: Uri): String? {
        return try {
            val bitmap = context.contentResolver.openInputStream(uri)?.use { input ->
                BitmapFactory.decodeStream(input)
            } ?: return null
            bitmapToDataUrl(bitmap)
        } catch (_: Exception) {
            null
        }
    }

    fun bitmapToDataUrl(source: Bitmap): String? {
        return try {
            val scaled = scaleDown(source, MAX_DIMENSION)
            var quality = JPEG_QUALITY
            var bytes: ByteArray
            do {
                val stream = ByteArrayOutputStream()
                scaled.compress(Bitmap.CompressFormat.JPEG, quality, stream)
                bytes = stream.toByteArray()
                quality -= 10
            } while (bytes.size > MAX_ENCODED_BYTES && quality >= 40)

            if (scaled !== source) {
                scaled.recycle()
            }
            if (bytes.size > MAX_ENCODED_BYTES) return null

            val encoded = Base64.encodeToString(bytes, Base64.NO_WRAP)
            "data:image/jpeg;base64,$encoded"
        } catch (_: Exception) {
            null
        }
    }

    fun toImageBitmap(photoOrUrl: String?): ImageBitmap? {
        val value = photoOrUrl?.trim().orEmpty()
        if (value.isEmpty()) return null
        return try {
            when {
                value.startsWith("data:image", ignoreCase = true) -> decodeDataUrl(value)
                value.startsWith("http://", ignoreCase = true) ||
                    value.startsWith("https://", ignoreCase = true) -> decodeHttpUrl(value)
                else -> null
            }?.asImageBitmap()
        } catch (_: Exception) {
            null
        }
    }

    private fun decodeDataUrl(dataUrl: String): Bitmap? {
        val comma = dataUrl.indexOf(',')
        if (comma < 0) return null
        val payload = dataUrl.substring(comma + 1)
        val bytes = Base64.decode(payload, Base64.DEFAULT)
        return BitmapFactory.decodeByteArray(bytes, 0, bytes.size)
    }

    private fun decodeHttpUrl(url: String): Bitmap? {
        var connection: HttpURLConnection? = null
        return try {
            connection = (URL(url).openConnection() as HttpURLConnection).apply {
                connectTimeout = 8_000
                readTimeout = 8_000
                doInput = true
            }
            connection.inputStream.use { BitmapFactory.decodeStream(it) }
        } catch (_: Exception) {
            null
        } finally {
            connection?.disconnect()
        }
    }

    private fun scaleDown(source: Bitmap, maxDimension: Int): Bitmap {
        val largest = max(source.width, source.height)
        if (largest <= maxDimension) return source
        val scale = maxDimension.toFloat() / largest.toFloat()
        val width = max(1, (source.width * scale).toInt())
        val height = max(1, (source.height * scale).toInt())
        return Bitmap.createScaledBitmap(source, width, height, true)
    }
}
