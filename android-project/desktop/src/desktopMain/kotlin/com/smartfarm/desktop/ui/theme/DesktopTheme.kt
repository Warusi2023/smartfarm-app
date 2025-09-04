package com.smartfarm.desktop.ui.theme

import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.darkColorScheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.Color

private val LightColorScheme = lightColorScheme(
    primary = Color(0xFF2E7D32),
    onPrimary = Color.White,
    primaryContainer = Color(0xFFB8F5B8),
    onPrimaryContainer = Color(0xFF002200),
    secondary = Color(0xFF4CAF50),
    onSecondary = Color.White,
    secondaryContainer = Color(0xFFB8F5B8),
    onSecondaryContainer = Color(0xFF002200),
    tertiary = Color(0xFF8BC34A),
    onTertiary = Color.White,
    tertiaryContainer = Color(0xFFB8F5B8),
    onTertiaryContainer = Color(0xFF002200),
    background = Color(0xFFF5F5F5),
    onBackground = Color(0xFF191C1A),
    surface = Color.White,
    onSurface = Color(0xFF191C1A),
    surfaceVariant = Color(0xFFDDE5DD),
    onSurfaceVariant = Color(0xFF414941),
    outline = Color(0xFF717971),
    outlineVariant = Color(0xFFC1C9C1)
)

private val DarkColorScheme = darkColorScheme(
    primary = Color(0xFF9CCC65),
    onPrimary = Color(0xFF003300),
    primaryContainer = Color(0xFF004D00),
    onPrimaryContainer = Color(0xFFB8F5B8),
    secondary = Color(0xFF9CCC65),
    onSecondary = Color(0xFF003300),
    secondaryContainer = Color(0xFF004D00),
    onSecondaryContainer = Color(0xFFB8F5B8),
    tertiary = Color(0xFF9CCC65),
    onTertiary = Color(0xFF003300),
    tertiaryContainer = Color(0xFF004D00),
    onTertiaryContainer = Color(0xFFB8F5B8),
    background = Color(0xFF191C1A),
    onBackground = Color(0xFFE0E3E0),
    surface = Color(0xFF191C1A),
    onSurface = Color(0xFFE0E3E0),
    surfaceVariant = Color(0xFF414941),
    onSurfaceVariant = Color(0xFFC1C9C1),
    outline = Color(0xFF8B938B),
    outlineVariant = Color(0xFF414941)
)

@Composable
fun DesktopTheme(
    darkTheme: Boolean = false,
    content: @Composable () -> Unit
) {
    val colorScheme = if (darkTheme) DarkColorScheme else LightColorScheme
    
    MaterialTheme(
        colorScheme = colorScheme,
        content = content
    )
}
