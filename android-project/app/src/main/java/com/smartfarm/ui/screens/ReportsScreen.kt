package com.smartfarm.ui.screens

import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.smartfarm.ui.components.EmptyState
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Analytics

@Composable
fun ReportsScreen() {
    Scaffold(
        topBar = {
            TopAppBar(title = { Text("Reports & Analytics") })
        }
    ) { padding ->
        EmptyState(
            title = "Reports Coming Soon",
            message = "Analytics and reporting features will be available here",
            icon = Icons.Default.Analytics,
            modifier = Modifier.padding(padding)
        )
    }
}

