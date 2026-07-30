package com.smartfarm.ui.theme

import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Shapes
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.ui.unit.dp

private val SmartFarmLightScheme = lightColorScheme(
    primary = SmartFarmColors.Primary,
    onPrimary = SmartFarmColors.OnPrimary,
    primaryContainer = SmartFarmColors.PrimaryContainer,
    onPrimaryContainer = SmartFarmColors.OnPrimaryContainer,
    secondary = SmartFarmColors.Secondary,
    onSecondary = SmartFarmColors.OnSecondary,
    secondaryContainer = SmartFarmColors.SecondaryContainer,
    onSecondaryContainer = SmartFarmColors.OnSecondaryContainer,
    tertiary = SmartFarmColors.Tertiary,
    onTertiary = SmartFarmColors.OnTertiary,
    tertiaryContainer = SmartFarmColors.TertiaryContainer,
    onTertiaryContainer = SmartFarmColors.OnTertiaryContainer,
    background = SmartFarmColors.Background,
    onBackground = SmartFarmColors.OnBackground,
    surface = SmartFarmColors.Surface,
    onSurface = SmartFarmColors.OnSurface,
    surfaceVariant = SmartFarmColors.SurfaceVariant,
    onSurfaceVariant = SmartFarmColors.OnSurfaceVariant,
    outline = SmartFarmColors.Outline,
    error = SmartFarmColors.Error,
    onError = SmartFarmColors.OnError,
    errorContainer = SmartFarmColors.ErrorContainer,
    onErrorContainer = SmartFarmColors.OnErrorContainer
)

val SmartFarmShapes = Shapes(
    extraSmall = RoundedCornerShape(6.dp),
    small = RoundedCornerShape(8.dp),
    medium = RoundedCornerShape(12.dp),
    large = RoundedCornerShape(16.dp),
    extraLarge = RoundedCornerShape(24.dp)
)

@Composable
fun SmartFarmTheme(content: @Composable () -> Unit) {
    MaterialTheme(
        colorScheme = SmartFarmLightScheme,
        typography = SmartFarmTypography,
        shapes = SmartFarmShapes,
        content = content
    )
}
