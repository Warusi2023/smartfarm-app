package com.example.smartfarm.web.ui.screens

import androidx.compose.runtime.*
import androidx.compose.web.elements.*
import androidx.compose.web.css.*
import com.example.smartfarm.web.ui.theme.AppTheme

@Composable
fun WeatherScreen() {
    var currentWeather by remember { mutableStateOf(sampleCurrentWeather) }
    var forecast by remember { mutableStateOf(sampleForecast) }
    var alerts by remember { mutableStateOf(sampleAlerts) }

    Div({
        style {
            maxWidth(1200.px)
            margin(0.px, LinearDimension.auto)
            padding(AppTheme.spacing.large)
        }
    }) {
        // Header
        H1({
            style {
                color(AppTheme.textColor)
                fontSize(32.px)
                marginBottom(AppTheme.spacing.large)
                fontWeight("bold")
            }
        }) {
            Text("🌤️ Weather Forecast")
        }

        // Current Weather Card
        CurrentWeatherCard(currentWeather)

        // Weather Stats
        Div({
            style {
                display(DisplayStyle.Grid)
                gridTemplateColumns("repeat(auto-fit, minmax(200px, 1fr))")
                gap(AppTheme.spacing.large)
                marginBottom(AppTheme.spacing.xlarge)
            }
        }) {
            StatCard("Temperature", "${currentWeather.temperature}°C", "feels like ${currentWeather.feelsLike}°C")
            StatCard("Humidity", "${currentWeather.humidity}%", "moderate")
            StatCard("Wind Speed", "${currentWeather.windSpeed} km/h", "light breeze")
            StatCard("Rainfall", "${currentWeather.rainfall} mm", "none")
        }

        // Weather Alerts
        if (alerts.isNotEmpty()) {
            H2({
                style {
                    color(AppTheme.textColor)
                    fontSize(24.px)
                    marginBottom(AppTheme.spacing.medium)
                    fontWeight("bold")
                }
            }) {
                Text("Weather Alerts")
            }

            AlertsList(alerts)
        }

        // 7-Day Forecast
        H2({
            style {
                color(AppTheme.textColor)
                fontSize(24.px)
                marginTop(AppTheme.spacing.xlarge)
                marginBottom(AppTheme.spacing.medium)
                fontWeight("bold")
            }
        }) {
            Text("7-Day Forecast")
        }

        ForecastList(forecast)
    }
}

@Composable
private fun CurrentWeatherCard(weather: CurrentWeather) {
    Div({
        style {
            backgroundColor(AppTheme.surfaceColor)
            padding(AppTheme.spacing.xlarge)
            borderRadius(AppTheme.borderRadius)
            boxShadow(AppTheme.shadow)
            marginBottom(AppTheme.spacing.large)
            textAlign("center")
        }
    }) {
        Div({
            style {
                fontSize(64.px)
                marginBottom(AppTheme.spacing.medium)
            }
        }) {
            Text(weather.icon)
        }
        
        H2({
            style {
                fontSize(48.px)
                fontWeight("bold")
                color(AppTheme.textColor)
                margin(0.px, 0.px, AppTheme.spacing.small, 0.px)
            }
        }) {
            Text("${weather.temperature}°C")
        }
        
        Div({
            style {
                fontSize(20.px)
                color(AppTheme.textSecondaryColor)
                marginBottom(AppTheme.spacing.medium)
            }
        }) {
            Text(weather.condition)
        }
        
        Div({
            style {
                fontSize(16.px)
                color(AppTheme.textSecondaryColor)
            }
        }) {
            Text("Feels like ${weather.feelsLike}°C • Humidity ${weather.humidity}% • Wind ${weather.windSpeed} km/h")
        }
    }
}

@Composable
private fun StatCard(title: String, value: String, subtitle: String) {
    Div({
        style {
            backgroundColor(AppTheme.surfaceColor)
            padding(AppTheme.spacing.large)
            borderRadius(AppTheme.borderRadius)
            boxShadow(AppTheme.shadow)
            textAlign("center")
        }
    }) {
        H3({
            style {
                color(AppTheme.textSecondaryColor)
                fontSize(14.px)
                margin(0.px, 0.px, AppTheme.spacing.small, 0.px)
                textTransform("uppercase")
                letterSpacing(1.px)
            }
        }) {
            Text(title)
        }
        
        Div({
            style {
                fontSize(32.px)
                fontWeight("bold")
                color(AppTheme.primaryColor)
                marginBottom(AppTheme.spacing.small)
            }
        }) {
            Text(value)
        }
        
        Div({
            style {
                color(AppTheme.textSecondaryColor)
                fontSize(14.px)
            }
        }) {
            Text(subtitle)
        }
    }
}

@Composable
private fun AlertsList(alerts: List<WeatherAlert>) {
    Div({
        style {
            backgroundColor(AppTheme.surfaceColor)
            borderRadius(AppTheme.borderRadius)
            boxShadow(AppTheme.shadow)
            overflow("hidden")
            marginBottom(AppTheme.spacing.large)
        }
    }) {
        alerts.forEach { alert ->
            AlertRow(alert)
        }
    }
}

@Composable
private fun AlertRow(alert: WeatherAlert) {
    Div({
        style {
            padding(AppTheme.spacing.medium)
            borderBottom(1.px, LineStyle.Solid, AppTheme.backgroundColor)
            display(DisplayStyle.Flex)
            alignItems(Align.Center)
            gap(AppTheme.spacing.medium)
            
            lastChild {
                borderBottom(0.px, LineStyle.Solid, Color.transparent)
            }
        }
    }) {
        Div({
            style {
                fontSize(24.px)
                marginRight(AppTheme.spacing.small)
            }
        }) {
            Text(alert.icon)
        }
        
        Div({
            style {
                flex(1)
            }
        }) {
            Div({
                style {
                    fontWeight("bold")
                    color(AppTheme.textColor)
                    marginBottom(AppTheme.spacing.small)
                }
            }) {
                Text(alert.title)
            }
            
            Div({
                style {
                    color(AppTheme.textSecondaryColor)
                    fontSize(14.px)
                }
            }) {
                Text(alert.description)
            }
        }
        
        Div({
            style {
                backgroundColor(when(alert.severity) {
                    "High" -> Color("#F44336")
                    "Medium" -> Color("#FF9800")
                    "Low" -> Color("#4CAF50")
                    else -> Color("#757575")
                })
                color(Color.white)
                padding(4.px, 8.px)
                borderRadius(4.px)
                fontSize(12.px)
                fontWeight("bold")
            }
        }) {
            Text(alert.severity)
        }
    }
}

@Composable
private fun ForecastList(forecast: List<ForecastDay>) {
    Div({
        style {
            backgroundColor(AppTheme.surfaceColor)
            borderRadius(AppTheme.borderRadius)
            boxShadow(AppTheme.shadow)
            overflow("hidden")
        }
    }) {
        // Header
        Div({
            style {
                padding(AppTheme.spacing.medium)
                backgroundColor(AppTheme.backgroundColor)
                borderBottom(1.px, LineStyle.Solid, AppTheme.backgroundColor)
                display(DisplayStyle.Grid)
                gridTemplateColumns("1fr 1fr 1fr 1fr 1fr 1fr")
                gap(AppTheme.spacing.medium)
                fontWeight("bold")
                color(AppTheme.textSecondaryColor)
                fontSize(14.px)
            }
        }) {
            Text("Day")
            Text("")
            Text("High")
            Text("Low")
            Text("Condition")
            Text("Rain Chance")
        }
        
        // Forecast rows
        forecast.forEach { day ->
            ForecastRow(day)
        }
    }
}

@Composable
private fun ForecastRow(forecast: ForecastDay) {
    Div({
        style {
            padding(AppTheme.spacing.medium)
            borderBottom(1.px, LineStyle.Solid, AppTheme.backgroundColor)
            display(DisplayStyle.Grid)
            gridTemplateColumns("1fr 1fr 1fr 1fr 1fr 1fr")
            gap(AppTheme.spacing.medium)
            alignItems(Align.Center)
            
            lastChild {
                borderBottom(0.px, LineStyle.Solid, Color.transparent)
            }
            
            hover {
                backgroundColor(AppTheme.backgroundColor)
            }
        }
    }) {
        Div({
            style {
                fontWeight("bold")
                color(AppTheme.textColor)
            }
        }) {
            Text(forecast.day)
        }
        
        Div({
            style {
                fontSize(24.px)
                textAlign("center")
            }
        }) {
            Text(forecast.icon)
        }
        
        Div({
            style {
                fontSize(18.px)
                fontWeight("bold")
                color(AppTheme.textColor)
            }
        }) {
            Text("${forecast.high}°C")
        }
        
        Div({
            style {
                fontSize(16.px)
                color(AppTheme.textSecondaryColor)
            }
        }) {
            Text("${forecast.low}°C")
        }
        
        Div({
            style {
                color(AppTheme.textSecondaryColor)
                fontSize(14.px)
            }
        }) {
            Text(forecast.condition)
        }
        
        Div({
            style {
                color(AppTheme.textSecondaryColor)
                fontSize(14.px)
            }
        }) {
            Text("${forecast.rainChance}%")
        }
    }
}

data class CurrentWeather(
    val temperature: Int,
    val feelsLike: Int,
    val humidity: Int,
    val windSpeed: Int,
    val rainfall: Int,
    val condition: String,
    val icon: String
)

data class WeatherAlert(
    val title: String,
    val description: String,
    val severity: String,
    val icon: String
)

data class ForecastDay(
    val day: String,
    val icon: String,
    val high: Int,
    val low: Int,
    val condition: String,
    val rainChance: Int
)

private val sampleCurrentWeather = CurrentWeather(
    temperature = 22,
    feelsLike = 24,
    humidity = 65,
    windSpeed = 12,
    rainfall = 0,
    condition = "Sunny",
    icon = "☀️"
)

private val sampleAlerts = listOf(
    WeatherAlert(
        "Rain Expected",
        "Light rain expected tomorrow morning. Consider adjusting irrigation schedules.",
        "Medium",
        "🌧️"
    ),
    WeatherAlert(
        "High Winds",
        "Strong winds expected this evening. Secure loose equipment.",
        "Low",
        "💨"
    )
)

private val sampleForecast = listOf(
    ForecastDay("Today", "☀️", 22, 15, "Sunny", 0),
    ForecastDay("Tomorrow", "⛅", 20, 14, "Partly Cloudy", 30),
    ForecastDay("Wednesday", "🌧️", 18, 12, "Light Rain", 80),
    ForecastDay("Thursday", "🌤️", 21, 13, "Partly Sunny", 20),
    ForecastDay("Friday", "☀️", 24, 16, "Sunny", 0),
    ForecastDay("Saturday", "⛅", 22, 15, "Partly Cloudy", 10),
    ForecastDay("Sunday", "🌧️", 19, 11, "Rain", 70)
) 