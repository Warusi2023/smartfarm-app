package com.smartfarm.ui.screens.forms

import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.smartfarm.shared.data.model.dto.FarmDto
import com.smartfarm.shared.data.model.dto.InventoryItemDto
import com.smartfarm.ui.components.EntityFormDialog

@Composable
fun AddInventoryDialog(
    farms: List<FarmDto>,
    onDismiss: () -> Unit,
    onSave: (InventoryItemDto) -> Unit,
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
    var category by remember { mutableStateOf("SUPPLIES") }
    var quantity by remember { mutableStateOf("") }
    var unit by remember { mutableStateOf("kg") }
    var cost by remember { mutableStateOf("") }
    var location by remember { mutableStateOf("") }

    EntityFormDialog(
        title = "Add Inventory Item",
        onDismiss = onDismiss,
        onSave = {
            if (name.isNotBlank() && quantity.isNotBlank() && selectedFarmId.isNotBlank()) {
                val item = InventoryItemDto(
                    id = "",
                    name = name.trim(),
                    category = category,
                    quantity = quantity.toDoubleOrNull() ?: 0.0,
                    unit = unit,
                    farmId = selectedFarmId,
                    cost = cost.toDoubleOrNull(),
                    location = location.takeIf { it.isNotBlank() }
                )
                onSave(item)
            }
        }
    ) {
        if (farms.isEmpty()) {
            Text(
                text = "Create a farm first before adding inventory.",
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
            label = { Text("Item Name *") },
            modifier = Modifier
                .fillMaxWidth()
                .padding(bottom = 16.dp),
            singleLine = true
        )

        var categoryExpanded by remember { mutableStateOf(false) }
        ExposedDropdownMenuBox(
            expanded = categoryExpanded,
            onExpandedChange = { categoryExpanded = !categoryExpanded },
            modifier = Modifier
                .fillMaxWidth()
                .padding(bottom = 16.dp)
        ) {
            OutlinedTextField(
                value = category,
                onValueChange = {},
                readOnly = true,
                label = { Text("Category") },
                trailingIcon = { ExposedDropdownMenuDefaults.TrailingIcon(expanded = categoryExpanded) },
                modifier = Modifier.menuAnchor().fillMaxWidth()
            )
            ExposedDropdownMenu(
                expanded = categoryExpanded,
                onDismissRequest = { categoryExpanded = false }
            ) {
                listOf("SUPPLIES", "FEED", "SEEDS", "FERTILIZER", "EQUIPMENT", "OTHER").forEach { option ->
                    DropdownMenuItem(
                        text = { Text(option) },
                        onClick = {
                            category = option
                            categoryExpanded = false
                        }
                    )
                }
            }
        }

        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(bottom = 16.dp),
            horizontalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            OutlinedTextField(
                value = quantity,
                onValueChange = { quantity = it },
                label = { Text("Quantity *") },
                modifier = Modifier.weight(2f),
                singleLine = true
            )

            var unitExpanded by remember { mutableStateOf(false) }
            ExposedDropdownMenuBox(
                expanded = unitExpanded,
                onExpandedChange = { unitExpanded = !unitExpanded },
                modifier = Modifier.weight(1f)
            ) {
                OutlinedTextField(
                    value = unit,
                    onValueChange = {},
                    readOnly = true,
                    label = { Text("Unit") },
                    trailingIcon = { ExposedDropdownMenuDefaults.TrailingIcon(expanded = unitExpanded) },
                    modifier = Modifier.menuAnchor().fillMaxWidth()
                )
                ExposedDropdownMenu(
                    expanded = unitExpanded,
                    onDismissRequest = { unitExpanded = false }
                ) {
                    listOf("kg", "g", "L", "mL", "pieces", "bags").forEach { option ->
                        DropdownMenuItem(
                            text = { Text(option) },
                            onClick = {
                                unit = option
                                unitExpanded = false
                            }
                        )
                    }
                }
            }
        }

        OutlinedTextField(
            value = cost,
            onValueChange = { cost = it },
            label = { Text("Cost") },
            modifier = Modifier
                .fillMaxWidth()
                .padding(bottom = 16.dp),
            singleLine = true
        )

        OutlinedTextField(
            value = location,
            onValueChange = { location = it },
            label = { Text("Storage Location") },
            modifier = Modifier
                .fillMaxWidth()
                .padding(bottom = 16.dp),
            singleLine = true
        )
    }
}
