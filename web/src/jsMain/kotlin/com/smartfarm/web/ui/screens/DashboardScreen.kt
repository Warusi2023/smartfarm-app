package com.smartfarm.web.ui.screens

import androidx.compose.runtime.*
import org.jetbrains.compose.web.dom.*

@Composable
fun DashboardScreen() {
    Div(attrs = { classes("dashboard") }) {
        H2(attrs = { classes("screen-title") }) {
            Text("Farm Dashboard")
        }
        
        Div(attrs = { classes("dashboard-grid") }) {
            // Farm Overview Card
            Div(attrs = { classes("dashboard-card") }) {
                H3 { Text("Farm Overview") }
                Div(attrs = { classes("card-content") }) {
                    P { Text("Total Farms: 5") }
                    P { Text("Active Crops: 12") }
                    P { Text("Livestock Count: 150") }
                }
            }
            
            // Recent Activity Card
            Div(attrs = { classes("dashboard-card") }) {
                H3 { Text("Recent Activity") }
                Div(attrs = { classes("card-content") }) {
                    P { Text("Crop planted: Corn - Field A") }
                    P { Text("Livestock vaccinated: Cattle herd") }
                    P { Text("Harvest completed: Wheat field") }
                }
            }
            
            // Weather Card
            Div(attrs = { classes("dashboard-card") }) {
                H3 { Text("Weather") }
                Div(attrs = { classes("card-content") }) {
                    P { Text("Temperature: 22°C") }
                    P { Text("Humidity: 65%") }
                    P { Text("Forecast: Sunny") }
                }
            }
            
            // Quick Actions Card
            Div(attrs = { classes("dashboard-card") }) {
                H3 { Text("Quick Actions") }
                Div(attrs = { classes("card-content") }) {
                    Button(attrs = { classes("action-btn") }) {
                        Text("Add New Farm")
                    }
                    Button(attrs = { classes("action-btn") }) {
                        Text("Record Crop Activity")
                    }
                    Button(attrs = { classes("action-btn") }) {
                        Text("Schedule Maintenance")
                    }
                }
            }
        }
    }
}
