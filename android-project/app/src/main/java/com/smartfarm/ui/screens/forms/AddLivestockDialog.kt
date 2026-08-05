package com.smartfarm.ui.screens.forms

import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.DropdownMenuItem
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.ExposedDropdownMenuBox
import androidx.compose.material3.ExposedDropdownMenuDefaults
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.smartfarm.shared.data.model.dto.FarmDto
import com.smartfarm.shared.data.model.dto.LivestockDto
import com.smartfarm.ui.components.AnimalPhotoField
import com.smartfarm.ui.components.EntityFormDialog
import com.smartfarm.ui.util.LivestockPhotoCodec

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun AddLivestockDialog(
    farms: List<FarmDto> = emptyList(),
    onDismiss: () -> Unit,
    onSave: (LivestockDto) -> Unit,
    preferredFarmId: String? = null,
    /** When set, the dialog edits an existing animal (including its photo). */
    initialLivestock: LivestockDto? = null
) {
    val isEditing = initialLivestock != null && !initialLivestock.id.isBlank()

    fun initialFarmId(): String {
        val fromAnimal = initialLivestock?.farmId?.takeIf { id -> farms.any { it.id == id } }
        val preferred = preferredFarmId?.takeIf { id -> farms.any { it.id == id } }
        return fromAnimal ?: preferred ?: farms.firstOrNull()?.id.orEmpty()
    }

    var selectedFarmId by remember(preferredFarmId, farms.map { it.id }, initialLivestock?.id) {
        mutableStateOf(initialFarmId())
    }
    LaunchedEffect(farms, preferredFarmId, initialLivestock?.id) {
        if (selectedFarmId.isBlank() || farms.none { it.id == selectedFarmId }) {
            selectedFarmId = initialFarmId()
        }
    }

    var name by remember(initialLivestock?.id) {
        mutableStateOf(initialLivestock?.name.orEmpty())
    }
    var type by remember(initialLivestock?.id) {
        mutableStateOf(initialLivestock?.type?.takeIf { it.isNotBlank() } ?: "cattle")
    }
    var breed by remember(initialLivestock?.id) {
        mutableStateOf(initialLivestock?.breed.orEmpty())
    }
    var weight by remember(initialLivestock?.id) {
        mutableStateOf(initialLivestock?.weight?.toString().orEmpty())
    }
    var location by remember(initialLivestock?.id) {
        mutableStateOf(initialLivestock?.location.orEmpty())
    }
    var notes by remember(initialLivestock?.id) {
        mutableStateOf(
            initialLivestock?.notes
                ?: initialLivestock?.description
                ?: ""
        )
    }
    var photo by remember(initialLivestock?.id) {
        mutableStateOf(
            LivestockPhotoCodec.resolvePhoto(initialLivestock?.photo, initialLivestock?.photoUrl)
        )
    }

    EntityFormDialog(
        title = if (isEditing) "Edit Livestock" else "Add Livestock",
        onDismiss = onDismiss,
        onSave = {
            if (name.isNotBlank()) {
                val livestock = LivestockDto(
                    id = initialLivestock?.id.orEmpty(),
                    name = name.trim(),
                    type = type,
                    breed = breed.takeIf { it.isNotBlank() },
                    weight = weight.toDoubleOrNull(),
                    location = location.takeIf { it.isNotBlank() },
                    notes = notes.takeIf { it.isNotBlank() },
                    photo = photo,
                    photoUrl = photo,
                    healthStatus = initialLivestock?.healthStatus,
                    status = initialLivestock?.status,
                    tag = initialLivestock?.tag,
                    sex = initialLivestock?.sex,
                    purpose = initialLivestock?.purpose,
                    value = initialLivestock?.value,
                    birthDate = initialLivestock?.birthDate,
                    age = initialLivestock?.age,
                    // Client-side context only; create payload still omits farmId per backend contract.
                    farmId = selectedFarmId.takeIf { it.isNotBlank() }
                        ?: initialLivestock?.farmId
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
            label = { Text("Health Notes") },
            modifier = Modifier
                .fillMaxWidth()
                .padding(bottom = 16.dp),
            maxLines = 3
        )

        AnimalPhotoField(
            photoDataUrl = photo,
            onPhotoChange = { photo = it },
            modifier = Modifier.padding(bottom = 8.dp)
        )
    }
}
