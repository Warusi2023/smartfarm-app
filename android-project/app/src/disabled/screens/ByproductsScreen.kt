package com.smartfarm.ui.screens

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Recycling
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.smartfarm.shared.services.ByproductsService
import com.smartfarm.shared.domain.model.Byproduct
import com.smartfarm.ui.components.EmptyState
import kotlinx.coroutines.launch

@Composable
fun ByproductsScreen() {
    var byproducts by remember { mutableStateOf<List<Byproduct>>(emptyList()) }
    var selectedByproduct by remember { mutableStateOf<Byproduct?>(null) }
    var isLoading by remember { mutableStateOf(true) }
    var error by remember { mutableStateOf<String?>(null) }
    
    LaunchedEffect(Unit) {
        // Load byproducts from shared KMM module
        val service = ByproductsService()
        service.getAllByproducts().fold(
            onSuccess = { result ->
                byproducts = result
                isLoading = false
            },
            onFailure = { exception ->
                error = exception.message
                isLoading = false
            }
        )
    }
    
    Scaffold(
        topBar = {
            TopAppBar(title = { Text("Farm-to-Table Byproducts") })
        }
    ) { padding ->
        when {
            isLoading -> {
                com.smartfarm.ui.components.LoadingState(Modifier.padding(padding))
            }
            error != null -> {
                com.smartfarm.ui.components.ErrorState(
                    message = error ?: "Unknown error",
                    onRetry = {
                        isLoading = true
                        error = null
                        // Retry loading
                    },
                    modifier = Modifier.padding(padding)
                )
            }
            byproducts.isEmpty() -> {
                EmptyState(
                    title = "No Byproducts",
                    message = "Byproduct processing guides will appear here",
                    icon = Icons.Default.Recycling,
                    modifier = Modifier.padding(padding)
                )
            }
            else -> {
            LazyColumn(
                modifier = Modifier
                    .fillMaxSize()
                    .padding(padding)
                    .padding(16.dp),
                verticalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                items(byproducts) { byproduct ->
            ByproductCard(
                byproduct = byproduct,
                onClick = { selectedByproduct = byproduct }
            )
        }
            }
        }
        
        // Show details dialog
        selectedByproduct?.let { byproduct ->
            ByproductDetailsDialog(
                byproduct = byproduct,
                onDismiss = { selectedByproduct = null }
            )
        }
    }
}

@Composable
private fun ByproductCard(
    byproduct: Byproduct,
    onClick: () -> Unit
) {
    Card(
        modifier = Modifier.fillMaxWidth(),
        onClick = onClick,
        elevation = CardDefaults.cardElevation(defaultElevation = 2.dp)
    ) {
        Column(
            modifier = Modifier.padding(16.dp)
        ) {
            Text(
                text = byproduct.name,
                style = MaterialTheme.typography.titleMedium
            )
            if (byproduct.description != null) {
                Text(
                    text = byproduct.description,
                    style = MaterialTheme.typography.bodyMedium,
                    color = MaterialTheme.colorScheme.onSurfaceVariant,
                    modifier = Modifier.padding(top = 4.dp)
                )
            }
            if (byproduct.equipment.isNotEmpty()) {
                Text(
                    text = "Equipment: ${byproduct.equipment.joinToString(", ")}",
                    style = MaterialTheme.typography.bodySmall,
                    color = MaterialTheme.colorScheme.primary,
                    modifier = Modifier.padding(top = 8.dp)
                )
            }
        }
    }
}

@Composable
private fun ByproductDetailsDialog(
    byproduct: Byproduct,
    onDismiss: () -> Unit
) {
    AlertDialog(
        onDismissRequest = onDismiss,
        title = { Text(byproduct.name) },
        text = {
            Column {
                if (byproduct.description != null) {
                    Text(
                        text = byproduct.description,
                        style = MaterialTheme.typography.bodyMedium,
                        modifier = Modifier.padding(bottom = 16.dp)
                    )
                }
                
                Text(
                    text = "Processing Method:",
                    style = MaterialTheme.typography.titleSmall,
                    modifier = Modifier.padding(bottom = 8.dp)
                )
                Text(
                    text = byproduct.processingMethod,
                    style = MaterialTheme.typography.bodySmall,
                    modifier = Modifier.padding(bottom = 8.dp)
                )
                
                if (byproduct.equipment.isNotEmpty()) {
                    Text(
                        text = "Required Equipment:",
                        style = MaterialTheme.typography.titleSmall,
                        modifier = Modifier.padding(bottom = 8.dp)
                    )
                    byproduct.equipment.forEach { equipment ->
                        Text(
                            text = "• $equipment",
                            style = MaterialTheme.typography.bodySmall,
                            modifier = Modifier.padding(bottom = 4.dp)
                        )
                    }
                }
                
                Text(
                    text = "Market Value: $${byproduct.marketValue}",
                    style = MaterialTheme.typography.titleSmall,
                    modifier = Modifier.padding(top = 8.dp)
                )
                Text(
                    text = "Target Market: ${byproduct.targetMarket}",
                    style = MaterialTheme.typography.bodySmall,
                    modifier = Modifier.padding(top = 4.dp)
                )
            }
        },
        confirmButton = {
            TextButton(onClick = onDismiss) {
                Text("Close")
            }
        }
    )
}
