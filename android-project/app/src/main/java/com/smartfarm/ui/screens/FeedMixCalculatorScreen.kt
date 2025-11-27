package com.smartfarm.ui.screens

import androidx.compose.foundation.layout.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Calculate
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.smartfarm.ui.components.EmptyState

@Composable
fun FeedMixCalculatorScreen() {
    Scaffold(
        topBar = {
            TopAppBar(title = { Text("Feed Mix Calculator") })
        }
    ) { padding ->
        EmptyState(
            title = "Feed Calculator Coming Soon",
            message = "Calculate optimal feed mixes for your livestock based on nutritional requirements",
            icon = Icons.Default.Calculate,
            modifier = Modifier.padding(padding)
        )
    }
}

