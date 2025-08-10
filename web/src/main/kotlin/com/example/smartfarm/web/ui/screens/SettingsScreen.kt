package com.example.smartfarm.web.ui.screens

import androidx.compose.runtime.*
import androidx.compose.web.elements.*
import androidx.compose.web.css.*
import com.example.smartfarm.web.ui.theme.AppTheme

@Composable
fun SettingsScreen() {
    var activeTab by remember { mutableStateOf("profile") }
    var settings by remember { mutableStateOf(sampleSettings) }

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
            Text("⚙️ Settings")
        }

        // Settings Layout
        Div({
            style {
                display(DisplayStyle.Flex)
                gap(AppTheme.spacing.large)
            }
        }) {
            // Sidebar Navigation
            Div({
                style {
                    width(250.px)
                    backgroundColor(AppTheme.surfaceColor)
                    borderRadius(AppTheme.borderRadius)
                    boxShadow(AppTheme.shadow)
                    padding(AppTheme.spacing.medium)
                }
            }) {
                SettingsNavItem("Profile", "👤", "profile", activeTab) { activeTab = it }
                SettingsNavItem("API Configuration", "🔑", "api", activeTab) { activeTab = it }
                SettingsNavItem("Data Management", "💾", "data", activeTab) { activeTab = it }
                SettingsNavItem("Notifications", "🔔", "notifications", activeTab) { activeTab = it }
                SettingsNavItem("App Preferences", "🎨", "preferences", activeTab) { activeTab = it }
                SettingsNavItem("About", "ℹ️", "about", activeTab) { activeTab = it }
            }

            // Main Content
            Div({
                style {
                    flex(1)
                    backgroundColor(AppTheme.surfaceColor)
                    borderRadius(AppTheme.borderRadius)
                    boxShadow(AppTheme.shadow)
                    padding(AppTheme.spacing.large)
                }
            }) {
                when (activeTab) {
                    "profile" -> ProfileSettings(settings, onUpdate = { settings = it })
                    "api" -> ApiSettings(settings, onUpdate = { settings = it })
                    "data" -> DataSettings(settings, onUpdate = { settings = it })
                    "notifications" -> NotificationSettings(settings, onUpdate = { settings = it })
                    "preferences" -> PreferenceSettings(settings, onUpdate = { settings = it })
                    "about" -> AboutSettings()
                }
            }
        }
    }
}

@Composable
private fun SettingsNavItem(
    title: String,
    icon: String,
    tab: String,
    activeTab: String,
    onSelect: (String) -> Unit
) {
    val isActive = activeTab == tab
    Button({
        onClick { onSelect(tab) }
        style {
            backgroundColor(if (isActive) AppTheme.primaryColor else Color.transparent)
            color(if (isActive) Color.white else AppTheme.textColor)
            border(0.px)
            padding(AppTheme.spacing.medium)
            borderRadius(AppTheme.borderRadius)
            cursor("pointer")
            textAlign("left")
            width(100.percent)
            marginBottom(AppTheme.spacing.small)
            transition("all 0.2s ease")
            
            hover {
                backgroundColor(if (isActive) AppTheme.primaryColor else AppTheme.backgroundColor)
            }
        }
    }) {
        Div({
            style {
                display(DisplayStyle.Flex)
                alignItems(Align.Center)
                gap(AppTheme.spacing.small)
            }
        }) {
            Div({ style { fontSize(20.px) } }) { Text(icon) }
            Text(title)
        }
    }
}

@Composable
private fun ProfileSettings(settings: AppSettings, onUpdate: (AppSettings) -> Unit) {
    var name by remember { mutableStateOf(settings.userName) }
    var email by remember { mutableStateOf(settings.userEmail) }
    var farmName by remember { mutableStateOf(settings.farmName) }
    var farmSize by remember { mutableStateOf(settings.farmSize.toString()) }

    Div {
        H2({
            style {
                color(AppTheme.textColor)
                fontSize(24.px)
                marginBottom(AppTheme.spacing.large)
                fontWeight("bold")
            }
        }) {
            Text("Profile Settings")
        }

        Div({
            style {
                display(DisplayStyle.Grid)
                gridTemplateColumns("repeat(auto-fit, minmax(300px, 1fr))")
                gap(AppTheme.spacing.large)
            }
        }) {
            Div {
                Label({ style { display(DisplayStyle.Block); marginBottom(AppTheme.spacing.small) } }) {
                    Text("Full Name")
                }
                Input({
                    value = name
                    onInput { name = it.value }
                    style {
                        width(100.percent)
                        padding(AppTheme.spacing.small)
                        border(1.px, LineStyle.Solid, AppTheme.backgroundColor)
                        borderRadius(AppTheme.borderRadius)
                    }
                })
            }

            Div {
                Label({ style { display(DisplayStyle.Block); marginBottom(AppTheme.spacing.small) } }) {
                    Text("Email")
                }
                Input({
                    type = InputType.Email
                    value = email
                    onInput { email = it.value }
                    style {
                        width(100.percent)
                        padding(AppTheme.spacing.small)
                        border(1.px, LineStyle.Solid, AppTheme.backgroundColor)
                        borderRadius(AppTheme.borderRadius)
                    }
                })
            }

            Div {
                Label({ style { display(DisplayStyle.Block); marginBottom(AppTheme.spacing.small) } }) {
                    Text("Farm Name")
                }
                Input({
                    value = farmName
                    onInput { farmName = it.value }
                    style {
                        width(100.percent)
                        padding(AppTheme.spacing.small)
                        border(1.px, LineStyle.Solid, AppTheme.backgroundColor)
                        borderRadius(AppTheme.borderRadius)
                    }
                })
            }

            Div {
                Label({ style { display(DisplayStyle.Block); marginBottom(AppTheme.spacing.small) } }) {
                    Text("Farm Size (acres)")
                }
                Input({
                    type = InputType.Number
                    value = farmSize
                    onInput { farmSize = it.value }
                    style {
                        width(100.percent)
                        padding(AppTheme.spacing.small)
                        border(1.px, LineStyle.Solid, AppTheme.backgroundColor)
                        borderRadius(AppTheme.borderRadius)
                    }
                })
            }
        }

        Button({
            onClick = {
                onUpdate(settings.copy(
                    userName = name,
                    userEmail = email,
                    farmName = farmName,
                    farmSize = farmSize.toIntOrNull() ?: settings.farmSize
                ))
            }
            style {
                backgroundColor(AppTheme.primaryColor)
                color(Color.white)
                border(0.px)
                padding(AppTheme.spacing.medium, AppTheme.spacing.large)
                borderRadius(AppTheme.borderRadius)
                cursor("pointer")
                marginTop(AppTheme.spacing.large)
            }
        }) {
            Text("Save Changes")
        }
    }
}

@Composable
private fun ApiSettings(settings: AppSettings, onUpdate: (AppSettings) -> Unit) {
    var weatherApiKey by remember { mutableStateOf(settings.weatherApiKey) }
    var mapsApiKey by remember { mutableStateOf(settings.mapsApiKey) }
    var openaiApiKey by remember { mutableStateOf(settings.openaiApiKey) }

    Div {
        H2({
            style {
                color(AppTheme.textColor)
                fontSize(24.px)
                marginBottom(AppTheme.spacing.large)
                fontWeight("bold")
            }
        }) {
            Text("API Configuration")
        }

        Div({
            style {
                display(DisplayStyle.Flex)
                flexDirection(FlexDirection.Column)
                gap(AppTheme.spacing.large)
            }
        }) {
            Div {
                Label({ style { display(DisplayStyle.Block); marginBottom(AppTheme.spacing.small) } }) {
                    Text("Weather API Key")
                }
                Input({
                    type = InputType.Password
                    value = weatherApiKey
                    onInput { weatherApiKey = it.value }
                    style {
                        width(100.percent)
                        padding(AppTheme.spacing.small)
                        border(1.px, LineStyle.Solid, AppTheme.backgroundColor)
                        borderRadius(AppTheme.borderRadius)
                    }
                })
            }

            Div {
                Label({ style { display(DisplayStyle.Block); marginBottom(AppTheme.spacing.small) } }) {
                    Text("Google Maps API Key")
                }
                Input({
                    type = InputType.Password
                    value = mapsApiKey
                    onInput { mapsApiKey = it.value }
                    style {
                        width(100.percent)
                        padding(AppTheme.spacing.small)
                        border(1.px, LineStyle.Solid, AppTheme.backgroundColor)
                        borderRadius(AppTheme.borderRadius)
                    }
                })
            }

            Div {
                Label({ style { display(DisplayStyle.Block); marginBottom(AppTheme.spacing.small) } }) {
                    Text("OpenAI API Key")
                }
                Input({
                    type = InputType.Password
                    value = openaiApiKey
                    onInput { openaiApiKey = it.value }
                    style {
                        width(100.percent)
                        padding(AppTheme.spacing.small)
                        border(1.px, LineStyle.Solid, AppTheme.backgroundColor)
                        borderRadius(AppTheme.borderRadius)
                    }
                })
            }
        }

        Button({
            onClick = {
                onUpdate(settings.copy(
                    weatherApiKey = weatherApiKey,
                    mapsApiKey = mapsApiKey,
                    openaiApiKey = openaiApiKey
                ))
            }
            style {
                backgroundColor(AppTheme.primaryColor)
                color(Color.white)
                border(0.px)
                padding(AppTheme.spacing.medium, AppTheme.spacing.large)
                borderRadius(AppTheme.borderRadius)
                cursor("pointer")
                marginTop(AppTheme.spacing.large)
            }
        }) {
            Text("Save API Keys")
        }
    }
}

@Composable
private fun DataSettings(settings: AppSettings, onUpdate: (AppSettings) -> Unit) {
    var autoBackup by remember { mutableStateOf(settings.autoBackup) }
    var syncEnabled by remember { mutableStateOf(settings.syncEnabled) }

    Div {
        H2({
            style {
                color(AppTheme.textColor)
                fontSize(24.px)
                marginBottom(AppTheme.spacing.large)
                fontWeight("bold")
            }
        }) {
            Text("Data Management")
        }

        Div({
            style {
                display(DisplayStyle.Flex)
                flexDirection(FlexDirection.Column)
                gap(AppTheme.spacing.large)
            }
        }) {
            Div({
                style {
                    display(DisplayStyle.Flex)
                    justifyContent(JustifyContent.SpaceBetween)
                    alignItems(Align.Center)
                    padding(AppTheme.spacing.medium)
                    backgroundColor(AppTheme.backgroundColor)
                    borderRadius(AppTheme.borderRadius)
                }
            }) {
                Div {
                    H3({
                        style {
                            color(AppTheme.textColor)
                            fontSize(16.px)
                            marginBottom(AppTheme.spacing.small)
                        }
                    }) {
                        Text("Automatic Backup")
                    }
                    Div({
                        style {
                            color(AppTheme.textSecondaryColor)
                            fontSize(14.px)
                        }
                    }) {
                        Text("Automatically backup your data daily")
                    }
                }
                Input({
                    type = InputType.Checkbox
                    checked = autoBackup
                    onChange { autoBackup = it.checked }
                    style {
                        width(20.px)
                        height(20.px)
                    }
                })
            }

            Div({
                style {
                    display(DisplayStyle.Flex)
                    justifyContent(JustifyContent.SpaceBetween)
                    alignItems(Align.Center)
                    padding(AppTheme.spacing.medium)
                    backgroundColor(AppTheme.backgroundColor)
                    borderRadius(AppTheme.borderRadius)
                }
            }) {
                Div {
                    H3({
                        style {
                            color(AppTheme.textColor)
                            fontSize(16.px)
                            marginBottom(AppTheme.spacing.small)
                        }
                    }) {
                        Text("Cloud Sync")
                    }
                    Div({
                        style {
                            color(AppTheme.textSecondaryColor)
                            fontSize(14.px)
                        }
                    }) {
                        Text("Sync data across devices")
                    }
                }
                Input({
                    type = InputType.Checkbox
                    checked = syncEnabled
                    onChange { syncEnabled = it.checked }
                    style {
                        width(20.px)
                        height(20.px)
                    }
                })
            }
        }

        Div({
            style {
                display(DisplayStyle.Flex)
                gap(AppTheme.spacing.medium)
                marginTop(AppTheme.spacing.large)
            }
        }) {
            Button({
                style {
                    backgroundColor(AppTheme.primaryColor)
                    color(Color.white)
                    border(0.px)
                    padding(AppTheme.spacing.medium, AppTheme.spacing.large)
                    borderRadius(AppTheme.borderRadius)
                    cursor("pointer")
                }
            }) {
                Text("Export Data")
            }
            
            Button({
                style {
                    backgroundColor(AppTheme.secondaryColor)
                    color(Color.white)
                    border(0.px)
                    padding(AppTheme.spacing.medium, AppTheme.spacing.large)
                    borderRadius(AppTheme.borderRadius)
                    cursor("pointer")
                }
            }) {
                Text("Import Data")
            }
        }
    }
}

@Composable
private fun NotificationSettings(settings: AppSettings, onUpdate: (AppSettings) -> Unit) {
    var weatherAlerts by remember { mutableStateOf(settings.weatherAlerts) }
    var healthAlerts by remember { mutableStateOf(settings.healthAlerts) }
    var taskReminders by remember { mutableStateOf(settings.taskReminders) }

    Div {
        H2({
            style {
                color(AppTheme.textColor)
                fontSize(24.px)
                marginBottom(AppTheme.spacing.large)
                fontWeight("bold")
            }
        }) {
            Text("Notification Preferences")
        }

        Div({
            style {
                display(DisplayStyle.Flex)
                flexDirection(FlexDirection.Column)
                gap(AppTheme.spacing.large)
            }
        }) {
            Div({
                style {
                    display(DisplayStyle.Flex)
                    justifyContent(JustifyContent.SpaceBetween)
                    alignItems(Align.Center)
                    padding(AppTheme.spacing.medium)
                    backgroundColor(AppTheme.backgroundColor)
                    borderRadius(AppTheme.borderRadius)
                }
            }) {
                Div {
                    H3({
                        style {
                            color(AppTheme.textColor)
                            fontSize(16.px)
                            marginBottom(AppTheme.spacing.small)
                        }
                    }) {
                        Text("Weather Alerts")
                    }
                    Div({
                        style {
                            color(AppTheme.textSecondaryColor)
                            fontSize(14.px)
                        }
                    }) {
                        Text("Get notified about weather changes")
                    }
                }
                Input({
                    type = InputType.Checkbox
                    checked = weatherAlerts
                    onChange { weatherAlerts = it.checked }
                    style {
                        width(20.px)
                        height(20.px)
                    }
                })
            }

            Div({
                style {
                    display(DisplayStyle.Flex)
                    justifyContent(JustifyContent.SpaceBetween)
                    alignItems(Align.Center)
                    padding(AppTheme.spacing.medium)
                    backgroundColor(AppTheme.backgroundColor)
                    borderRadius(AppTheme.borderRadius)
                }
            }) {
                Div {
                    H3({
                        style {
                            color(AppTheme.textColor)
                            fontSize(16.px)
                            marginBottom(AppTheme.spacing.small)
                        }
                    }) {
                        Text("Health Alerts")
                    }
                    Div({
                        style {
                            color(AppTheme.textSecondaryColor)
                            fontSize(14.px)
                        }
                    }) {
                        Text("Animal health notifications")
                    }
                }
                Input({
                    type = InputType.Checkbox
                    checked = healthAlerts
                    onChange { healthAlerts = it.checked }
                    style {
                        width(20.px)
                        height(20.px)
                    }
                })
            }

            Div({
                style {
                    display(DisplayStyle.Flex)
                    justifyContent(JustifyContent.SpaceBetween)
                    alignItems(Align.Center)
                    padding(AppTheme.spacing.medium)
                    backgroundColor(AppTheme.backgroundColor)
                    borderRadius(AppTheme.borderRadius)
                }
            }) {
                Div {
                    H3({
                        style {
                            color(AppTheme.textColor)
                            fontSize(16.px)
                            marginBottom(AppTheme.spacing.small)
                        }
                    }) {
                        Text("Task Reminders")
                    }
                    Div({
                        style {
                            color(AppTheme.textSecondaryColor)
                            fontSize(14.px)
                        }
                    }) {
                        Text("Daily task reminders")
                    }
                }
                Input({
                    type = InputType.Checkbox
                    checked = taskReminders
                    onChange { taskReminders = it.checked }
                    style {
                        width(20.px)
                        height(20.px)
                    }
                })
            }
        }
    }
}

@Composable
private fun PreferenceSettings(settings: AppSettings, onUpdate: (AppSettings) -> Unit) {
    var theme by remember { mutableStateOf(settings.theme) }
    var language by remember { mutableStateOf(settings.language) }

    Div {
        H2({
            style {
                color(AppTheme.textColor)
                fontSize(24.px)
                marginBottom(AppTheme.spacing.large)
                fontWeight("bold")
            }
        }) {
            Text("App Preferences")
        }

        Div({
            style {
                display(DisplayStyle.Grid)
                gridTemplateColumns("repeat(auto-fit, minmax(300px, 1fr))")
                gap(AppTheme.spacing.large)
            }
        }) {
            Div {
                Label({ style { display(DisplayStyle.Block); marginBottom(AppTheme.spacing.small) } }) {
                    Text("Theme")
                }
                Select({
                    value = theme
                    onChange { theme = it.value }
                    style {
                        width(100.percent)
                        padding(AppTheme.spacing.small)
                        border(1.px, LineStyle.Solid, AppTheme.backgroundColor)
                        borderRadius(AppTheme.borderRadius)
                    }
                }) {
                    Option { Text("Light") }
                    Option { Text("Dark") }
                    Option { Text("Auto") }
                }
            }

            Div {
                Label({ style { display(DisplayStyle.Block); marginBottom(AppTheme.spacing.small) } }) {
                    Text("Language")
                }
                Select({
                    value = language
                    onChange { language = it.value }
                    style {
                        width(100.percent)
                        padding(AppTheme.spacing.small)
                        border(1.px, LineStyle.Solid, AppTheme.backgroundColor)
                        borderRadius(AppTheme.borderRadius)
                    }
                }) {
                    Option { Text("English") }
                    Option { Text("Spanish") }
                    Option { Text("French") }
                    Option { Text("German") }
                }
            }
        }
    }
}

@Composable
private fun AboutSettings() {
    Div {
        H2({
            style {
                color(AppTheme.textColor)
                fontSize(24.px)
                marginBottom(AppTheme.spacing.large)
                fontWeight("bold")
            }
        }) {
            Text("About SmartFarm")
        }

        Div({
            style {
                backgroundColor(AppTheme.backgroundColor)
                padding(AppTheme.spacing.large)
                borderRadius(AppTheme.borderRadius)
            }
        }) {
            H3({
                style {
                    color(AppTheme.textColor)
                    fontSize(18.px)
                    marginBottom(AppTheme.spacing.medium)
                }
            }) {
                Text("Version 1.0.0")
            }
            
            Div({
                style {
                    color(AppTheme.textSecondaryColor)
                    fontSize(14.px)
                    lineHeight(1.6)
                    marginBottom(AppTheme.spacing.medium)
                }
            }) {
                Text("SmartFarm is a comprehensive farm management application designed to help farmers track livestock, crops, weather, and farm activities efficiently.")
            }
            
            Div({
                style {
                    color(AppTheme.textSecondaryColor)
                    fontSize(14.px)
                    lineHeight(1.6)
                }
            }) {
                Text("© 2024 SmartFarm. All rights reserved.")
            }
        }
    }
}

data class AppSettings(
    val userName: String,
    val userEmail: String,
    val farmName: String,
    val farmSize: Int,
    val weatherApiKey: String,
    val mapsApiKey: String,
    val openaiApiKey: String,
    val autoBackup: Boolean,
    val syncEnabled: Boolean,
    val weatherAlerts: Boolean,
    val healthAlerts: Boolean,
    val taskReminders: Boolean,
    val theme: String,
    val language: String
)

private val sampleSettings = AppSettings(
    userName = "John Farmer",
    userEmail = "john@smartfarm.com",
    farmName = "Green Acres Farm",
    farmSize = 150,
    weatherApiKey = "••••••••••••••••",
    mapsApiKey = "••••••••••••••••",
    openaiApiKey = "••••••••••••••••",
    autoBackup = true,
    syncEnabled = true,
    weatherAlerts = true,
    healthAlerts = true,
    taskReminders = false,
    theme = "Light",
    language = "English"
)