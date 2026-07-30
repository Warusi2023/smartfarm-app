package com.smartfarm.ui.screens.forms

import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.smartfarm.shared.data.model.dto.CropDto
import com.smartfarm.shared.data.model.dto.FarmDto
import com.smartfarm.ui.components.EntityFormDialog

@Composable
fun AddCropDialog(
    farms: List<FarmDto>,
    onDismiss: () -> Unit,
    onSave: (CropDto) -> Unit
) {
    var selectedFarmId by remember {
        mutableStateOf(farms.firstOrNull()?.id.orEmpty())
    }
    LaunchedEffect(farms) {
        if (selectedFarmId.isBlank() && farms.isNotEmpty()) {
            selectedFarmId = farms.first().id
        }
    }
    var name by remember { mutableStateOf("") }
    var variety by remember { mutableStateOf("") }
    var type by remember { mutableStateOf("") }
    var area by remember { mutableStateOf("") }
    var status by remember { mutableStateOf("planted") }
    var notes by remember { mutableStateOf("") }

    EntityFormDialog(
        title = "Add Crop",
        onDismiss = onDismiss,
        onSave = {
            if (name.isNotBlank() && selectedFarmId.isNotBlank()) {
                val crop = CropDto(
                    id = "",
                    name = name.trim(),
                    variety = variety.takeIf { it.isNotBlank() },
                    type = type.takeIf { it.isNotBlank() },
                    farmId = selectedFarmId,
                    area = area.toDoubleOrNull(),
                    status = status,
                    notes = notes.takeIf { it.isNotBlank() }
                )
                onSave(crop)
            }
        }
    ) {
        if (farms.isEmpty()) {
            Text(
                text = "Create a farm first before adding crops.",
                color = MaterialTheme.colorScheme.error,
                modifier = Modifier.padding(bottom = 16.dp)
            )
        } else {
            var farmExpanded by remember { mutableStateOf(false) }
            val selectedFarmName = farms.firstOrNull { it.id == selectedFarmId }?.name
                ?: "Select farm"
            ExposedDropdownMenuBox(
                expanded = farmExpanded,
                onExpandedChange = { farmExpanded = !farmExpanded },
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(bottom = 16.dp)
            ) {
                OutlinedTextField(
                    value = selectedFarmName,
                    onValueChange = {},
                    readOnly = true,
                    label = { Text("Farm *") },
                    trailingIcon = { ExposedDropdownMenuDefaults.TrailingIcon(expanded = farmExpanded) },
                    modifier = Modifier.menuAnchor().fillMaxWidth()
                )
                ExposedDropdownMenu(
                    expanded = farmExpanded,
                    onDismissRequest = { farmExpanded = false }
                ) {
                    farms.forEach { farm ->
                        DropdownMenuItem(
                            text = { Text(farm.name) },
                            onClick = {
                                selectedFarmId = farm.id
                                farmExpanded = false
                            }
                        )
                    }
                }
            }
        }

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
            value = type,
            onValueChange = { type = it },
            label = { Text("Type / category") },
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
            label = { Text("Area") },
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
                modifier = Modifier.menuAnchor().fillMaxWidth()
            )
            ExposedDropdownMenu(
                expanded = statusExpanded,
                onDismissRequest = { statusExpanded = false }
            ) {
                listOf("planned", "planted", "growing", "ready_for_harvest", "harvested", "failed").forEach { option ->
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
