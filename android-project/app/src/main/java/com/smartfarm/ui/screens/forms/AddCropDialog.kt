package com.smartfarm.ui.screens.forms

import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.smartfarm.shared.data.model.dto.CropDto
import com.smartfarm.ui.components.EntityFormDialog

@Composable
fun AddCropDialog(
    farmId: String,
    onDismiss: () -> Unit,
    onSave: (CropDto) -> Unit
) {
    var name by remember { mutableStateOf("") }
    var variety by remember { mutableStateOf("") }
    var area by remember { mutableStateOf("") }
    var status by remember { mutableStateOf("PLANTED") }
    var notes by remember { mutableStateOf("") }
    
    EntityFormDialog(
        title = "Add Crop",
        onDismiss = onDismiss,
        onSave = {
            if (name.isNotBlank()) {
                val crop = CropDto(
                    id = "",
                    name = name,
                    variety = variety.takeIf { it.isNotBlank() },
                    farmId = farmId,
                    area = area.toDoubleOrNull(),
                    status = status,
                    notes = notes.takeIf { it.isNotBlank() }
                )
                onSave(crop)
            }
        }
    ) {
        OutlinedTextField(
            value = name,
            onValueChange = { name = it },
            label = { Text("Crop Name *") },
            modifier = Modifier
                .fillMaxWidth()
                .padding(bottom = 16.dp),
            singleLine = true
        )
        
        OutlinedTextField(
            value = variety,
            onValueChange = { variety = it },
            label = { Text("Variety") },
            modifier = Modifier
                .fillMaxWidth()
                .padding(bottom = 16.dp),
            singleLine = true
        )
        
        OutlinedTextField(
            value = area,
            onValueChange = { area = it },
            label = { Text("Area (acres)") },
            modifier = Modifier
                .fillMaxWidth()
                .padding(bottom = 16.dp),
            singleLine = true
        )
        
        var statusExpanded by remember { mutableStateOf(false) }
        ExposedDropdownMenuBox(
            expanded = statusExpanded,
            onExpandedChange = { statusExpanded = !statusExpanded },
            modifier = Modifier
                .fillMaxWidth()
                .padding(bottom = 16.dp)
        ) {
            OutlinedTextField(
                value = status,
                onValueChange = {},
                readOnly = true,
                label = { Text("Status") },
                trailingIcon = { ExposedDropdownMenuDefaults.TrailingIcon(expanded = statusExpanded) },
                modifier = Modifier.menuAnchor()
            )
            ExposedDropdownMenu(
                expanded = statusExpanded,
                onDismissRequest = { statusExpanded = false }
            ) {
                listOf("PLANNED", "PLANTED", "GROWING", "READY_FOR_HARVEST", "HARVESTED", "FAILED").forEach { option ->
                    DropdownMenuItem(
                        text = { Text(option) },
                        onClick = {
                            status = option
                            statusExpanded = false
                        }
                    )
                }
            }
        }
        
        OutlinedTextField(
            value = notes,
            onValueChange = { notes = it },
            label = { Text("Notes") },
            modifier = Modifier
                .fillMaxWidth()
                .padding(bottom = 16.dp),
            maxLines = 3
        )
    }
}

