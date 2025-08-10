package com.example.smartfarm

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.smartfarm.data.model.*
import com.example.smartfarm.data.repository.WeatherRepository
import com.example.smartfarm.data.service.MockWeatherService
import androidx.compose.ui.text.style.TextAlign

@Composable
fun WeatherScreen(
    weatherViewModel: WeatherViewModel = remember {
        // For now, create a mock repository since we don't have dependency injection set up
        WeatherViewModel(
            WeatherRepository(
                weatherDao = FarmDatabase.getDatabase(LocalContext.current).weatherDao(),
                weatherService = MockWeatherService(),
                context = LocalContext.current
            )
        )
    }
) {
    val uiState by weatherViewModel.uiState.collectAsState()
    
    LazyColumn(
        modifier = Modifier
            .fillMaxSize()
            .background(MaterialTheme.colorScheme.surface)
            .padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        item {
            WeatherHeader(
                isLoading = uiState.isLoading,
                lastUpdated = uiState.lastUpdated,
                onRefresh = { weatherViewModel.refreshWeatherData() },
                weatherViewModel = weatherViewModel
            )
        }
        
        if (uiState.error != null) {
            item {
                ErrorCard(
                    error = uiState.error!!,
                    onDismiss = { weatherViewModel.clearError() }
                )
            }
        }
        
        if (uiState.currentWeather != null) {
            item {
                CurrentWeatherCard(weather = uiState.currentWeather!!, weatherViewModel = weatherViewModel)
            }
            
            item {
                FarmingImpactCard(weather = uiState.currentWeather!!, weatherViewModel = weatherViewModel)
            }
            
            item {
                WeatherDetailsCard(weather = uiState.currentWeather!!, weatherViewModel = weatherViewModel)
            }
        }
        
        if (uiState.weatherAlerts.isNotEmpty()) {
            item {
                Text(
                    text = "Weather Alerts",
                    style = MaterialTheme.typography.headlineSmall,
                    fontWeight = FontWeight.Bold
                )
            }
            
            items(uiState.weatherAlerts) { alert ->
                WeatherAlertCard(alert = alert, weatherViewModel = weatherViewModel)
            }
        }
        
        if (uiState.currentWeather?.recommendations?.isNotEmpty() == true) {
            item {
                RecommendationsCard(recommendations = uiState.currentWeather!!.recommendations)
            }
        }
    }
}

@Composable
fun WeatherHeader(
    isLoading: Boolean,
    lastUpdated: Long,
    onRefresh: () -> Unit,
    weatherViewModel: WeatherViewModel
) {
    Card(
        modifier = Modifier.fillMaxWidth(),
        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.primaryContainer)
    ) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(16.dp),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Column {
                Text(
                    text = "Farm Weather",
                    style = MaterialTheme.typography.headlineMedium,
                    fontWeight = FontWeight.Bold
                )
                if (lastUpdated > 0) {
                    Text(
                        text = "Last updated: ${weatherViewModel.formatTime(lastUpdated)}",
                        style = MaterialTheme.typography.bodySmall,
                        color = MaterialTheme.colorScheme.onSurfaceVariant
                    )
                }
            }
            
            IconButton(onClick = onRefresh) {
                if (isLoading) {
                    CircularProgressIndicator(
                        modifier = Modifier.size(24.dp),
                        strokeWidth = 2.dp
                    )
                } else {
                    Icon(Icons.Default.Refresh, contentDescription = "Refresh")
                }
            }
        }
    }
}

@Composable
fun ErrorCard(error: String, onDismiss: () -> Unit) {
    Card(
        modifier = Modifier.fillMaxWidth(),
        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.errorContainer)
    ) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(16.dp),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Expanded(
                child = Text(
                    text = error,
                    style = MaterialTheme.typography.bodyMedium,
                    color = MaterialTheme.colorScheme.onErrorContainer
                )
            )
            IconButton(onClick = onDismiss) {
                Icon(
                    Icons.Default.Close,
                    contentDescription = "Dismiss",
                    tint = MaterialTheme.colorScheme.onErrorContainer
                )
            }
        }
    }
}

@Composable
fun CurrentWeatherCard(
    weather: WeatherForecastEntity,
    weatherViewModel: WeatherViewModel
) {
    Card(
        modifier = Modifier.fillMaxWidth(),
        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant)
    ) {
        Column(
            modifier = Modifier.padding(16.dp)
        ) {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Column {
                    Text(
                        text = weatherViewModel.getWeatherIcon(weather.weatherCondition),
                        fontSize = 48.sp
                    )
                    Text(
                        text = weather.weatherCondition.name.lowercase().capitalize(),
                        style = MaterialTheme.typography.bodyMedium,
                        color = MaterialTheme.colorScheme.onSurfaceVariant
                    )
                }
                
                Column(horizontalAlignment = Alignment.End) {
                    Text(
                        text = "${weather.temperature.max.toInt()}°C",
                        style = MaterialTheme.typography.headlineLarge,
                        fontWeight = FontWeight.Bold
                    )
                    Text(
                        text = "Feels like ${weather.temperature.feelsLike.toInt()}°C",
                        style = MaterialTheme.typography.bodyMedium,
                        color = MaterialTheme.colorScheme.onSurfaceVariant
                    )
                    Text(
                        text = "Min: ${weather.temperature.min.toInt()}°C",
                        style = MaterialTheme.typography.bodySmall,
                        color = MaterialTheme.colorScheme.onSurfaceVariant
                    )
                }
            }
            
            Spacer(modifier = Modifier.height(16.dp))
            
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceEvenly
            ) {
                WeatherInfoItem(
                    icon = "💧",
                    label = "Humidity",
                    value = "${weather.humidity}%"
                )
                WeatherInfoItem(
                    icon = weatherViewModel.getWindDirectionIcon(weather.windDirection),
                    label = "Wind",
                    value = "${weather.windSpeed} km/h"
                )
                WeatherInfoItem(
                    icon = "🌧️",
                    label = "Rain",
                    value = "${weather.precipitationProbability}%"
                )
            }
        }
    }
}

@Composable
fun WeatherInfoItem(icon: String, label: String, value: String) {
    Column(horizontalAlignment = Alignment.CenterHorizontally) {
        Text(text = icon, fontSize = 24.sp)
        Text(
            text = label,
            style = MaterialTheme.typography.bodySmall,
            color = MaterialTheme.colorScheme.onSurfaceVariant
        )
        Text(
            text = value,
            style = MaterialTheme.typography.bodyMedium,
            fontWeight = FontWeight.Medium
        )
    }
}

@Composable
fun FarmingImpactCard(
    weather: WeatherForecastEntity,
    weatherViewModel: WeatherViewModel
) {
    Card(
        modifier = Modifier.fillMaxWidth(),
        colors = CardDefaults.cardColors(
            containerColor = weatherViewModel.getFarmingImpactColor(weather.farmingImpact).copy(alpha = 0.1f)
        )
    ) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(16.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Icon(
                when (weather.farmingImpact) {
                    FarmingImpact.POSITIVE -> Icons.Default.CheckCircle
                    FarmingImpact.NEUTRAL -> Icons.Default.Info
                    FarmingImpact.NEGATIVE -> Icons.Default.Warning
                    FarmingImpact.CRITICAL -> Icons.Default.Error
                },
                contentDescription = null,
                tint = weatherViewModel.getFarmingImpactColor(weather.farmingImpact),
                modifier = Modifier.size(32.dp)
            )
            
            Spacer(modifier = Modifier.width(12.dp))
            
            Column {
                Text(
                    text = "Farming Impact: ${weather.farmingImpact.name}",
                    style = MaterialTheme.typography.titleMedium,
                    fontWeight = FontWeight.Bold,
                    color = weatherViewModel.getFarmingImpactColor(weather.farmingImpact)
                )
                Text(
                    text = when (weather.farmingImpact) {
                        FarmingImpact.POSITIVE -> "Excellent conditions for farming activities"
                        FarmingImpact.NEUTRAL -> "Normal farming conditions"
                        FarmingImpact.NEGATIVE -> "Take precautions for farming activities"
                        FarmingImpact.CRITICAL -> "Avoid farming activities if possible"
                    },
                    style = MaterialTheme.typography.bodyMedium,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )
            }
        }
    }
}

@Composable
fun WeatherDetailsCard(
    weather: WeatherForecastEntity,
    weatherViewModel: WeatherViewModel
) {
    Card(
        modifier = Modifier.fillMaxWidth()
    ) {
        Column(
            modifier = Modifier.padding(16.dp)
        ) {
            Text(
                text = "Weather Details",
                style = MaterialTheme.typography.titleMedium,
                fontWeight = FontWeight.Bold
            )
            
            Spacer(modifier = Modifier.height(12.dp))
            
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween
            ) {
                DetailItem("UV Index", "${weather.uvIndex}")
                DetailItem("Pressure", "${weather.pressure} hPa")
                DetailItem("Visibility", "${weather.visibility} km")
            }
            
            Spacer(modifier = Modifier.height(8.dp))
            
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween
            ) {
                DetailItem("Sunrise", weatherViewModel.formatTime(weather.sunrise))
                DetailItem("Sunset", weatherViewModel.formatTime(weather.sunset))
            }
        }
    }
}

@Composable
fun DetailItem(label: String, value: String) {
    Column {
        Text(
            text = label,
            style = MaterialTheme.typography.bodySmall,
            color = MaterialTheme.colorScheme.onSurfaceVariant
        )
        Text(
            text = value,
            style = MaterialTheme.typography.bodyMedium,
            fontWeight = FontWeight.Medium
        )
    }
}

@Composable
fun WeatherAlertCard(
    alert: WeatherAlert,
    weatherViewModel: WeatherViewModel
) {
    Card(
        modifier = Modifier.fillMaxWidth(),
        colors = CardDefaults.cardColors(
            containerColor = weatherViewModel.getAlertSeverityColor(alert.severity).copy(alpha = 0.1f)
        )
    ) {
        Column(
            modifier = Modifier.padding(16.dp)
        ) {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Icon(
                        when (alert.alertType) {
                            AlertType.FROST_WARNING -> Icons.Default.AcUnit
                            AlertType.HEAT_WAVE -> Icons.Default.WbSunny
                            AlertType.FLOOD_WARNING -> Icons.Default.WaterDrop
                            AlertType.WIND_WARNING -> Icons.Default.Air
                            else -> Icons.Default.Warning
                        },
                        contentDescription = null,
                        tint = weatherViewModel.getAlertSeverityColor(alert.severity),
                        modifier = Modifier.size(24.dp)
                    )
                    
                    Spacer(modifier = Modifier.width(8.dp))
                    
                    Column {
                        Text(
                            text = alert.title,
                            style = MaterialTheme.typography.titleMedium,
                            fontWeight = FontWeight.Bold,
                            color = weatherViewModel.getAlertSeverityColor(alert.severity)
                        )
                        Text(
                            text = alert.severity.name,
                            style = MaterialTheme.typography.bodySmall,
                            color = weatherViewModel.getAlertSeverityColor(alert.severity)
                        )
                    }
                }
                
                AssistChip(
                    onClick = { },
                    label = {
                        Text(
                            text = alert.alertType.name.replace("_", " "),
                            style = MaterialTheme.typography.bodySmall,
                            color = Color.White
                        )
                    },
                    colors = AssistChipDefaults.assistChipColors(
                        containerColor = weatherViewModel.getAlertSeverityColor(alert.severity)
                    )
                )
            }
            
            Spacer(modifier = Modifier.height(8.dp))
            
            Text(
                text = alert.description,
                style = MaterialTheme.typography.bodyMedium,
                color = MaterialTheme.colorScheme.onSurfaceVariant
            )
            
            if (alert.mitigationSteps.isNotEmpty()) {
                Spacer(modifier = Modifier.height(8.dp))
                Text(
                    text = "Mitigation Steps:",
                    style = MaterialTheme.typography.bodySmall,
                    fontWeight = FontWeight.Bold,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )
                alert.mitigationSteps.forEach { step ->
                    Text(
                        text = "• $step",
                        style = MaterialTheme.typography.bodySmall,
                        color = MaterialTheme.colorScheme.onSurfaceVariant
                    )
                }
            }
        }
    }
}

@Composable
fun RecommendationsCard(recommendations: List<String>) {
    Card(
        modifier = Modifier.fillMaxWidth(),
        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.secondaryContainer)
    ) {
        Column(
            modifier = Modifier.padding(16.dp)
        ) {
            Row(
                verticalAlignment = Alignment.CenterVertically
            ) {
                Icon(
                    Icons.Default.Lightbulb,
                    contentDescription = null,
                    tint = MaterialTheme.colorScheme.onSecondaryContainer,
                    modifier = Modifier.size(24.dp)
                )
                
                Spacer(modifier = Modifier.width(8.dp))
                
                Text(
                    text = "Farming Recommendations",
                    style = MaterialTheme.typography.titleMedium,
                    fontWeight = FontWeight.Bold,
                    color = MaterialTheme.colorScheme.onSecondaryContainer
                )
            }
            
            Spacer(modifier = Modifier.height(12.dp))
            
            recommendations.forEach { recommendation ->
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    verticalAlignment = Alignment.Top
                ) {
                    Text(
                        text = "•",
                        style = MaterialTheme.typography.bodyMedium,
                        color = MaterialTheme.colorScheme.onSecondaryContainer,
                        modifier = Modifier.padding(top = 2.dp)
                    )
                    
                    Spacer(modifier = Modifier.width(8.dp))
                    
                    Text(
                        text = recommendation,
                        style = MaterialTheme.typography.bodyMedium,
                        color = MaterialTheme.colorScheme.onSecondaryContainer,
                        modifier = Modifier.weight(1f)
                    )
                }
                
                Spacer(modifier = Modifier.height(4.dp))
            }
        }
    }
}

private fun String.capitalize(): String {
    return this.replaceFirstChar { if (it.isLowerCase()) it.titlecase() else it.toString() }
} 