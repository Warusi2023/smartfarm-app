package com.smartfarm.ui.screens.forms

import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.smartfarm.shared.data.model.dto.FarmDto
import com.smartfarm.shared.data.model.dto.LivestockDto
import com.smartfarm.ui.components.EntityFormDialog

@Composable
fun AddLivestockDialog(
    farms: List<FarmDto> = emptyList(),
    onDismiss: () -> Unit,
    onSave: (LivestockDto) -> Unit,
    preferredFarmId: String? = null
) {
    fun initialFarmId(): String {
        val preferred = preferredFarmId?.takeIf { id -> farms.any { it.id == id } }
        return preferred ?: farms.firstOrNull()?.id.orEmpty()
    }

    var selectedFarmId by remember(preferredFarmId, farms.map { it.id }) {
        mutableStateOf(initialFarmId())
    }
    LaunchedEffect(farms, preferredFarmId) {
        if (selectedFarmId.isBlank() || farms.none { it.id == selectedFarmId }) {
            selectedFarmId = initialFarmId()
        }
    }

    var name by remember { mutableStateOf("") }
    // Backend livestock.create: type + name required; notes (not description). farmId is not in create schema.
    var type by remember { mutableStateOf("cattle") }
    var breed by remember { mutableStateOf("") }
    var weight by remember { mutableStateOf("") }
    var location by remember { mutableStateOf("") }
    var notes by remember { mutableStateOf("") }

    EntityFormDialog(
        title = "Add Livestock",
        onDismiss = onDismiss,
        onSave = {
            if (name.isNotBlank()) {
                val livestock = LivestockDto(
                    id = "",
                    name = name.trim(),
                    type = type,
                    breed = breed.takeIf { it.isNotBlank() },
                    weight = weight.toDoubleOrNull(),
                    location = location.takeIf { it.isNotBlank() },
                    notes = notes.takeIf { it.isNotBlank() },
                    // Client-side context only; create payload still omits farmId per backend contract.
                    farmId = selectedFarmId.takeIf { it.isNotBlank() }
                )
                onSave(livestock)
            }
        }
    ) {
        if (farms.isEmpty()) {
            Text(
                text = "No farms yet — animal will be saved without a farm link.",
                color = MaterialTheme.colorScheme.onSurfaceVariant,
                style = MaterialTheme.typography.bodySmall,
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
                    label = { Text("Farm") },
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
            label = { Text("Name *") },
            modifier = Modifier
                .fillMaxWidth()
                .padding(bottom = 16.dp),
            singleLine = true
        )

        var typeExpanded by remember { mutableStateOf(false) }
        ExposedDropdownMenuBox(
            expanded = typeExpanded,
            onExpandedChange = { typeExpanded = !typeExpanded },
            modifier = Modifier
                .fillMaxWidth()
                .padding(bottom = 16.dp)
        ) {
            OutlinedTextField(
                value = type,
                onValueChange = {},
                readOnly = true,
                label = { Text("Type *") },
                trailingIcon = { ExposedDropdownMenuDefaults.TrailingIcon(expanded = typeExpanded) },
                modifier = Modifier.menuAnchor().fillMaxWidth()
            )
            ExposedDropdownMenu(
                expanded = typeExpanded,
                onDismissRequest = { typeExpanded = false }
            ) {
                listOf("cattle", "sheep", "goats", "pigs", "chickens", "horses", "fish", "other").forEach { option ->
                    DropdownMenuItem(
                        text = { Text(option) },
                        onClick = {
                            type = option
                            typeExpanded = false
                        }
                    )
                }
            }
        }

        OutlinedTextField(
            value = breed,
            onValueChange = { breed = it },
            label = { Text("Breed") },
            modifier = Modifier
                .fillMaxWidth()
                .padding(bottom = 16.dp),
            singleLine = true
        )

        OutlinedTextField(
            value = weight,
            onValueChange = { weight = it },
            label = { Text("Weight (kg)") },
            modifier = Modifier
                .fillMaxWidth()
                .padding(bottom = 16.dp),
            singleLine = true
        )

        OutlinedTextField(
            value = location,
            onValueChange = { location = it },
            label = { Text("Location") },
            modifier = Modifier
                .fillMaxWidth()
                .padding(bottom = 16.dp),
            singleLine = true
        )

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
