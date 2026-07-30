package com.smartfarm.ui.screens.forms

import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.smartfarm.shared.data.model.dto.FarmDto
import com.smartfarm.shared.data.model.dto.TaskDto
import com.smartfarm.ui.components.EntityFormDialog

@Composable
fun AddTaskDialog(
    farms: List<FarmDto>,
    onDismiss: () -> Unit,
    onSave: (TaskDto) -> Unit
) {
    var selectedFarmId by remember {
        mutableStateOf(farms.firstOrNull()?.id.orEmpty())
    }
    LaunchedEffect(farms) {
        if (selectedFarmId.isBlank() && farms.isNotEmpty()) {
            selectedFarmId = farms.first().id
        }
    }
    var title by remember { mutableStateOf("") }
    var description by remember { mutableStateOf("") }
    // Backend farmTeam.createTask priority enum
    var priority by remember { mutableStateOf("medium") }

    EntityFormDialog(
        title = "Add Task",
        onDismiss = onDismiss,
        onSave = {
            if (title.isNotBlank() && selectedFarmId.isNotBlank()) {
                val task = TaskDto(
                    id = "",
                    title = title.trim(),
                    description = description.takeIf { it.isNotBlank() },
                    farmId = selectedFarmId,
                    // Status is assigned by the server on create ("open"); kept for DTO shape only.
                    status = "open",
                    priority = priority
                )
                onSave(task)
            }
        }
    ) {
        if (farms.isEmpty()) {
            Text(
                text = "Create a farm first before adding tasks.",
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
            value = title,
            onValueChange = { title = it },
            label = { Text("Title *") },
            modifier = Modifier
                .fillMaxWidth()
                .padding(bottom = 16.dp),
            singleLine = true
        )

        OutlinedTextField(
            value = description,
            onValueChange = { description = it },
            label = { Text("Description") },
            modifier = Modifier
                .fillMaxWidth()
                .padding(bottom = 16.dp),
            maxLines = 4
        )

        var priorityExpanded by remember { mutableStateOf(false) }
        ExposedDropdownMenuBox(
            expanded = priorityExpanded,
            onExpandedChange = { priorityExpanded = !priorityExpanded },
            modifier = Modifier.fillMaxWidth()
        ) {
            OutlinedTextField(
                value = priority,
                onValueChange = {},
                readOnly = true,
                label = { Text("Priority") },
                trailingIcon = { ExposedDropdownMenuDefaults.TrailingIcon(expanded = priorityExpanded) },
                modifier = Modifier.menuAnchor().fillMaxWidth()
            )
            ExposedDropdownMenu(
                expanded = priorityExpanded,
                onDismissRequest = { priorityExpanded = false }
            ) {
                listOf("low", "medium", "high", "urgent").forEach { option ->
                    DropdownMenuItem(
                        text = { Text(option) },
                        onClick = {
                            priority = option
                            priorityExpanded = false
                        }
                    )
                }
            }
        }
    }
}
