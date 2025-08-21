package com.smartfarm.desktop.ui.screens

import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

@Composable
fun DashboardScreen() {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp)
    ) {
        Text(
            text = "Farm Dashboard",
            style = MaterialTheme.typography.headlineMedium,
            modifier = Modifier.padding(bottom = 24.dp)
        )
        
        LazyVerticalGrid(
            columns = GridCells.Fixed(2),
            horizontalArrangement = Arrangement.spacedBy(16.dp),
            verticalArrangement = Arrangement.spacedBy(16.dp),
            modifier = Modifier.fillMaxSize()
        ) {
            item {
                DashboardCard(
                    title = "Farm Overview",
                    content = {
                        Column {
                            Text("Total Farms: 5")
                            Text("Active Crops: 12")
                            Text("Livestock Count: 150")
                        }
                    }
                )
            }
            
            item {
                DashboardCard(
                    title = "Recent Activity",
                    content = {
                        Column {
                            Text("Crop planted: Corn - Field A")
                            Text("Livestock vaccinated: Cattle herd")
                            Text("Harvest completed: Wheat field")
                        }
                    }
                )
            }
            
            item {
                DashboardCard(
                    title = "Weather",
                    content = {
                        Column {
                            Text("Temperature: 22°C")
                            Text("Humidity: 65%")
                            Text("Forecast: Sunny")
                        }
                    }
                )
            }
            
            item {
                DashboardCard(
                    title = "Quick Actions",
                    content = {
                        Column(
                            horizontalAlignment = Alignment.Start,
                            verticalArrangement = Arrangement.spacedBy(8.dp)
                        ) {
                            Button(onClick = { /* TODO */ }) {
                                Text("Add New Farm")
                            }
                            Button(onClick = { /* TODO */ }) {
                                Text("Record Crop Activity")
                            }
                            Button(onClick = { /* TODO */ }) {
                                Text("Schedule Maintenance")
                            }
                        }
                    }
                )
            }
        }
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun DashboardCard(
    title: String,
    content: @Composable () -> Unit
) {
    Card(
        modifier = Modifier.fillMaxWidth(),
        elevation = CardDefaults.cardElevation(defaultElevation = 4.dp)
    ) {
        Column(
            modifier = Modifier.padding(16.dp)
        ) {
            Text(
                text = title,
                style = MaterialTheme.typography.titleMedium,
                modifier = Modifier.padding(bottom = 12.dp)
            )
            content()
        }
    }
}
