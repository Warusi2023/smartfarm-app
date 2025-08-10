package com.example.smartfarm.web.ui.screens

import androidx.compose.runtime.*
import androidx.compose.web.elements.*
import androidx.compose.web.css.*
import com.example.smartfarm.web.ui.theme.AppTheme

@Composable
fun CropsScreen() {
    var showAddCrop by remember { mutableStateOf(false) }
    var crops by remember { mutableStateOf(sampleCrops) }
    var selectedCrop by remember { mutableStateOf<Crop?>(null) }

    Div({
        style {
            maxWidth(1200.px)
            margin(0.px, LinearDimension.auto)
            padding(AppTheme.spacing.large)
        }
    }) {
        // Header
        Div({
            style {
                display(DisplayStyle.Flex)
                justifyContent(JustifyContent.SpaceBetween)
                alignItems(Align.Center)
                marginBottom(AppTheme.spacing.large)
            }
        }) {
            H1({
                style {
                    color(AppTheme.textColor)
                    fontSize(32.px)
                    fontWeight("bold")
                    margin(0.px)
                }
            }) {
                Text("🌱 Crop Management")
            }
            
            Button({
                onClick { showAddCrop = true }
                style {
                    backgroundColor(AppTheme.primaryColor)
                    color(Color.white)
                    border(0.px)
                    padding(AppTheme.spacing.medium, AppTheme.spacing.large)
                    borderRadius(AppTheme.borderRadius)
                    cursor("pointer")
                    fontSize(16.px)
                    fontWeight("bold")
                }
            }) {
                Text("+ Add Crop")
            }
        }

        // Stats Overview
        Div({
            style {
                display(DisplayStyle.Grid)
                gridTemplateColumns("repeat(auto-fit, minmax(200px, 1fr))")
                gap(AppTheme.spacing.large)
                marginBottom(AppTheme.spacing.xlarge)
            }
        }) {
            StatCard("Active Crops", crops.size.toString(), "growing")
            StatCard("Harvest Ready", crops.count { it.status == "Ready for Harvest" }.toString(), "ready")
            StatCard("Total Yield", crops.sumOf { it.expectedYield }.toString(), "kg")
            StatCard("Field Area", crops.sumOf { it.fieldSize }.toString(), "acres")
        }

        // Crops List
        H2({
            style {
                color(AppTheme.textColor)
                fontSize(24.px)
                marginBottom(AppTheme.spacing.medium)
                fontWeight("bold")
            }
        }) {
            Text("Crop Inventory")
        }

        CropsList(crops, onCropClick = { selectedCrop = it })
    }

    // Add Crop Modal
    if (showAddCrop) {
        AddCropModal(
            onClose = { showAddCrop = false },
            onAdd = { newCrop ->
                crops = crops + newCrop
                showAddCrop = false
            }
        )
    }

    // Crop Details Modal
    selectedCrop?.let { crop ->
        CropDetailsModal(
            crop = crop,
            onClose = { selectedCrop = null },
            onUpdate = { updatedCrop ->
                crops = crops.map { if (it.id == updatedCrop.id) updatedCrop else it }
                selectedCrop = null
            }
        )
    }
}

@Composable
private fun StatCard(title: String, value: String, subtitle: String) {
    Div({
        style {
            backgroundColor(AppTheme.surfaceColor)
            padding(AppTheme.spacing.large)
            borderRadius(AppTheme.borderRadius)
            boxShadow(AppTheme.shadow)
            textAlign("center")
        }
    }) {
        H3({
            style {
                color(AppTheme.textSecondaryColor)
                fontSize(14.px)
                margin(0.px, 0.px, AppTheme.spacing.small, 0.px)
                textTransform("uppercase")
                letterSpacing(1.px)
            }
        }) {
            Text(title)
        }
        
        Div({
            style {
                fontSize(32.px)
                fontWeight("bold")
                color(AppTheme.primaryColor)
                marginBottom(AppTheme.spacing.small)
            }
        }) {
            Text(value)
        }
        
        Div({
            style {
                color(AppTheme.textSecondaryColor)
                fontSize(14.px)
            }
        }) {
            Text(subtitle)
        }
    }
}

@Composable
private fun CropsList(crops: List<Crop>, onCropClick: (Crop) -> Unit) {
    Div({
        style {
            backgroundColor(AppTheme.surfaceColor)
            borderRadius(AppTheme.borderRadius)
            boxShadow(AppTheme.shadow)
            overflow("hidden")
        }
    }) {
        // Header
        Div({
            style {
                padding(AppTheme.spacing.medium)
                backgroundColor(AppTheme.backgroundColor)
                borderBottom(1.px, LineStyle.Solid, AppTheme.backgroundColor)
                display(DisplayStyle.Grid)
                gridTemplateColumns("1fr 1fr 1fr 1fr 1fr 1fr 1fr")
                gap(AppTheme.spacing.medium)
                fontWeight("bold")
                color(AppTheme.textSecondaryColor)
                fontSize(14.px)
            }
        }) {
            Text("Crop Name")
            Text("Type")
            Text("Field Size")
            Text("Planting Date")
            Text("Expected Yield")
            Text("Status")
            Text("Actions")
        }
        
        // Crop rows
        crops.forEach { crop ->
            CropRow(crop, onCropClick)
        }
    }
}

@Composable
private fun CropRow(crop: Crop, onCropClick: (Crop) -> Unit) {
    Div({
        style {
            padding(AppTheme.spacing.medium)
            borderBottom(1.px, LineStyle.Solid, AppTheme.backgroundColor)
            display(DisplayStyle.Grid)
            gridTemplateColumns("1fr 1fr 1fr 1fr 1fr 1fr 1fr")
            gap(AppTheme.spacing.medium)
            alignItems(Align.Center)
            
            lastChild {
                borderBottom(0.px, LineStyle.Solid, Color.transparent)
            }
            
            hover {
                backgroundColor(AppTheme.backgroundColor)
            }
        }
    }) {
        Div({
            style {
                fontWeight("bold")
                color(AppTheme.textColor)
            }
        }) {
            Text(crop.name)
        }
        
        Div({ style { color(AppTheme.textColor) } }) {
            Text(crop.type)
        }
        
        Div({ style { color(AppTheme.textColor) } }) {
            Text("${crop.fieldSize} acres")
        }
        
        Div({ style { color(AppTheme.textColor) } }) {
            Text(crop.plantingDate)
        }
        
        Div({ style { color(AppTheme.textColor) } }) {
            Text("${crop.expectedYield} kg")
        }
        
        Div({
            style {
                backgroundColor(when(crop.status) {
                    "Growing" -> Color("#4CAF50")
                    "Ready for Harvest" -> Color("#FF9800")
                    "Harvested" -> Color("#2196F3")
                    "Diseased" -> Color("#F44336")
                    else -> Color("#757575")
                })
                color(Color.white)
                padding(4.px, 8.px)
                borderRadius(4.px)
                fontSize(12.px)
                textAlign("center")
                width("fit-content")
            }
        }) {
            Text(crop.status)
        }
        
        Button({
            onClick { onCropClick(crop) }
            style {
                backgroundColor(AppTheme.primaryColor)
                color(Color.white)
                border(0.px)
                padding(4.px, 8.px)
                borderRadius(4.px)
                cursor("pointer")
                fontSize(12.px)
            }
        }) {
            Text("View")
        }
    }
}

@Composable
private fun AddCropModal(onClose: () -> Unit, onAdd: (Crop) -> Unit) {
    var name by remember { mutableStateOf("") }
    var type by remember { mutableStateOf("Corn") }
    var fieldSize by remember { mutableStateOf("") }
    var plantingDate by remember { mutableStateOf("") }
    var expectedYield by remember { mutableStateOf("") }
    var status by remember { mutableStateOf("Growing") }

    Div({
        style {
            position(Position.Fixed)
            top(0.px)
            left(0.px)
            right(0.px)
            bottom(0.px)
            backgroundColor(Color("rgba(0,0,0,0.5)"))
            display(DisplayStyle.Flex)
            justifyContent(JustifyContent.Center)
            alignItems(Align.Center)
            zIndex(1000)
        }
    }) {
        Div({
            style {
                backgroundColor(AppTheme.surfaceColor)
                padding(AppTheme.spacing.xlarge)
                borderRadius(AppTheme.borderRadius)
                boxShadow(AppTheme.shadowLarge)
                maxWidth(500.px)
                width(100.percent)
            }
        }) {
            H2({
                style {
                    margin(0.px, 0.px, AppTheme.spacing.large, 0.px)
                    color(AppTheme.textColor)
                }
            }) {
                Text("Add New Crop")
            }

            Div({ style { marginBottom(AppTheme.spacing.medium) } }) {
                Label({ style { display(DisplayStyle.Block); marginBottom(AppTheme.spacing.small) } }) {
                    Text("Crop Name")
                }
                Input({
                    value = name
                    onInput { name = it.value }
                    style {
                        width(100.percent)
                        padding(AppTheme.spacing.small)
                        border(1.px, LineStyle.Solid, AppTheme.backgroundColor)
                        borderRadius(AppTheme.borderRadius)
                    }
                })
            }

            Div({ style { marginBottom(AppTheme.spacing.medium) } }) {
                Label({ style { display(DisplayStyle.Block); marginBottom(AppTheme.spacing.small) } }) {
                    Text("Crop Type")
                }
                Select({
                    value = type
                    onChange { type = it.value }
                    style {
                        width(100.percent)
                        padding(AppTheme.spacing.small)
                        border(1.px, LineStyle.Solid, AppTheme.backgroundColor)
                        borderRadius(AppTheme.borderRadius)
                    }
                }) {
                    Option { Text("Corn") }
                    Option { Text("Wheat") }
                    Option { Text("Soybeans") }
                    Option { Text("Rice") }
                    Option { Text("Cotton") }
                    Option { Text("Vegetables") }
                    Option { Text("Fruits") }
                }
            }

            Div({ style { marginBottom(AppTheme.spacing.medium) } }) {
                Label({ style { display(DisplayStyle.Block); marginBottom(AppTheme.spacing.small) } }) {
                    Text("Field Size (acres)")
                }
                Input({
                    type = InputType.Number
                    value = fieldSize
                    onInput { fieldSize = it.value }
                    style {
                        width(100.percent)
                        padding(AppTheme.spacing.small)
                        border(1.px, LineStyle.Solid, AppTheme.backgroundColor)
                        borderRadius(AppTheme.borderRadius)
                    }
                })
            }

            Div({ style { marginBottom(AppTheme.spacing.medium) } }) {
                Label({ style { display(DisplayStyle.Block); marginBottom(AppTheme.spacing.small) } }) {
                    Text("Planting Date")
                }
                Input({
                    type = InputType.Date
                    value = plantingDate
                    onInput { plantingDate = it.value }
                    style {
                        width(100.percent)
                        padding(AppTheme.spacing.small)
                        border(1.px, LineStyle.Solid, AppTheme.backgroundColor)
                        borderRadius(AppTheme.borderRadius)
                    }
                })
            }

            Div({ style { marginBottom(AppTheme.spacing.medium) } }) {
                Label({ style { display(DisplayStyle.Block); marginBottom(AppTheme.spacing.small) } }) {
                    Text("Expected Yield (kg)")
                }
                Input({
                    type = InputType.Number
                    value = expectedYield
                    onInput { expectedYield = it.value }
                    style {
                        width(100.percent)
                        padding(AppTheme.spacing.small)
                        border(1.px, LineStyle.Solid, AppTheme.backgroundColor)
                        borderRadius(AppTheme.borderRadius)
                    }
                })
            }

            Div({ style { marginBottom(AppTheme.spacing.large) } }) {
                Label({ style { display(DisplayStyle.Block); marginBottom(AppTheme.spacing.small) } }) {
                    Text("Status")
                }
                Select({
                    value = status
                    onChange { status = it.value }
                    style {
                        width(100.percent)
                        padding(AppTheme.spacing.small)
                        border(1.px, LineStyle.Solid, AppTheme.backgroundColor)
                        borderRadius(AppTheme.borderRadius)
                    }
                }) {
                    Option { Text("Growing") }
                    Option { Text("Ready for Harvest") }
                    Option { Text("Harvested") }
                    Option { Text("Diseased") }
                }
            }

            Div({
                style {
                    display(DisplayStyle.Flex)
                    gap(AppTheme.spacing.medium)
                    justifyContent(JustifyContent.End)
                }
            }) {
                Button({
                    onClick = onClose
                    style {
                        backgroundColor(Color.transparent)
                        color(AppTheme.textColor)
                        border(1.px, LineStyle.Solid, AppTheme.backgroundColor)
                        padding(AppTheme.spacing.medium, AppTheme.spacing.large)
                        borderRadius(AppTheme.borderRadius)
                        cursor("pointer")
                    }
                }) {
                    Text("Cancel")
                }
                
                Button({
                    onClick = {
                        if (name.isNotBlank() && fieldSize.isNotBlank() && plantingDate.isNotBlank() && expectedYield.isNotBlank()) {
                            onAdd(Crop(
                                id = (sampleCrops.maxOfOrNull { it.id } ?: 0) + 1,
                                name = name,
                                type = type,
                                fieldSize = fieldSize.toIntOrNull() ?: 0,
                                plantingDate = plantingDate,
                                expectedYield = expectedYield.toIntOrNull() ?: 0,
                                status = status
                            ))
                        }
                    }
                    style {
                        backgroundColor(AppTheme.primaryColor)
                        color(Color.white)
                        border(0.px)
                        padding(AppTheme.spacing.medium, AppTheme.spacing.large)
                        borderRadius(AppTheme.borderRadius)
                        cursor("pointer")
                    }
                }) {
                    Text("Add Crop")
                }
            }
        }
    }
}

@Composable
private fun CropDetailsModal(
    crop: Crop,
    onClose: () -> Unit,
    onUpdate: (Crop) -> Unit
) {
    var name by remember { mutableStateOf(crop.name) }
    var type by remember { mutableStateOf(crop.type) }
    var fieldSize by remember { mutableStateOf(crop.fieldSize.toString()) }
    var plantingDate by remember { mutableStateOf(crop.plantingDate) }
    var expectedYield by remember { mutableStateOf(crop.expectedYield.toString()) }
    var status by remember { mutableStateOf(crop.status) }

    Div({
        style {
            position(Position.Fixed)
            top(0.px)
            left(0.px)
            right(0.px)
            bottom(0.px)
            backgroundColor(Color("rgba(0,0,0,0.5)"))
            display(DisplayStyle.Flex)
            justifyContent(JustifyContent.Center)
            alignItems(Align.Center)
            zIndex(1000)
        }
    }) {
        Div({
            style {
                backgroundColor(AppTheme.surfaceColor)
                padding(AppTheme.spacing.xlarge)
                borderRadius(AppTheme.borderRadius)
                boxShadow(AppTheme.shadowLarge)
                maxWidth(500.px)
                width(100.percent)
            }
        }) {
            H2({
                style {
                    margin(0.px, 0.px, AppTheme.spacing.large, 0.px)
                    color(AppTheme.textColor)
                }
            }) {
                Text("Crop Details")
            }

            Div({ style { marginBottom(AppTheme.spacing.medium) } }) {
                Label({ style { display(DisplayStyle.Block); marginBottom(AppTheme.spacing.small) } }) {
                    Text("Crop Name")
                }
                Input({
                    value = name
                    onInput { name = it.value }
                    style {
                        width(100.percent)
                        padding(AppTheme.spacing.small)
                        border(1.px, LineStyle.Solid, AppTheme.backgroundColor)
                        borderRadius(AppTheme.borderRadius)
                    }
                })
            }

            Div({ style { marginBottom(AppTheme.spacing.medium) } }) {
                Label({ style { display(DisplayStyle.Block); marginBottom(AppTheme.spacing.small) } }) {
                    Text("Crop Type")
                }
                Select({
                    value = type
                    onChange { type = it.value }
                    style {
                        width(100.percent)
                        padding(AppTheme.spacing.small)
                        border(1.px, LineStyle.Solid, AppTheme.backgroundColor)
                        borderRadius(AppTheme.borderRadius)
                    }
                }) {
                    Option { Text("Corn") }
                    Option { Text("Wheat") }
                    Option { Text("Soybeans") }
                    Option { Text("Rice") }
                    Option { Text("Cotton") }
                    Option { Text("Vegetables") }
                    Option { Text("Fruits") }
                }
            }

            Div({ style { marginBottom(AppTheme.spacing.medium) } }) {
                Label({ style { display(DisplayStyle.Block); marginBottom(AppTheme.spacing.small) } }) {
                    Text("Field Size (acres)")
                }
                Input({
                    type = InputType.Number
                    value = fieldSize
                    onInput { fieldSize = it.value }
                    style {
                        width(100.percent)
                        padding(AppTheme.spacing.small)
                        border(1.px, LineStyle.Solid, AppTheme.backgroundColor)
                        borderRadius(AppTheme.borderRadius)
                    }
                })
            }

            Div({ style { marginBottom(AppTheme.spacing.medium) } }) {
                Label({ style { display(DisplayStyle.Block); marginBottom(AppTheme.spacing.small) } }) {
                    Text("Planting Date")
                }
                Input({
                    type = InputType.Date
                    value = plantingDate
                    onInput { plantingDate = it.value }
                    style {
                        width(100.percent)
                        padding(AppTheme.spacing.small)
                        border(1.px, LineStyle.Solid, AppTheme.backgroundColor)
                        borderRadius(AppTheme.borderRadius)
                    }
                })
            }

            Div({ style { marginBottom(AppTheme.spacing.medium) } }) {
                Label({ style { display(DisplayStyle.Block); marginBottom(AppTheme.spacing.small) } }) {
                    Text("Expected Yield (kg)")
                }
                Input({
                    type = InputType.Number
                    value = expectedYield
                    onInput { expectedYield = it.value }
                    style {
                        width(100.percent)
                        padding(AppTheme.spacing.small)
                        border(1.px, LineStyle.Solid, AppTheme.backgroundColor)
                        borderRadius(AppTheme.borderRadius)
                    }
                })
            }

            Div({ style { marginBottom(AppTheme.spacing.large) } }) {
                Label({ style { display(DisplayStyle.Block); marginBottom(AppTheme.spacing.small) } }) {
                    Text("Status")
                }
                Select({
                    value = status
                    onChange { status = it.value }
                    style {
                        width(100.percent)
                        padding(AppTheme.spacing.small)
                        border(1.px, LineStyle.Solid, AppTheme.backgroundColor)
                        borderRadius(AppTheme.borderRadius)
                    }
                }) {
                    Option { Text("Growing") }
                    Option { Text("Ready for Harvest") }
                    Option { Text("Harvested") }
                    Option { Text("Diseased") }
                }
            }

            Div({
                style {
                    display(DisplayStyle.Flex)
                    gap(AppTheme.spacing.medium)
                    justifyContent(JustifyContent.End)
                }
            }) {
                Button({
                    onClick = onClose
                    style {
                        backgroundColor(Color.transparent)
                        color(AppTheme.textColor)
                        border(1.px, LineStyle.Solid, AppTheme.backgroundColor)
                        padding(AppTheme.spacing.medium, AppTheme.spacing.large)
                        borderRadius(AppTheme.borderRadius)
                        cursor("pointer")
                    }
                }) {
                    Text("Cancel")
                }
                
                Button({
                    onClick = {
                        if (name.isNotBlank() && fieldSize.isNotBlank() && plantingDate.isNotBlank() && expectedYield.isNotBlank()) {
                            onUpdate(crop.copy(
                                name = name,
                                type = type,
                                fieldSize = fieldSize.toIntOrNull() ?: crop.fieldSize,
                                plantingDate = plantingDate,
                                expectedYield = expectedYield.toIntOrNull() ?: crop.expectedYield,
                                status = status
                            ))
                        }
                    }
                    style {
                        backgroundColor(AppTheme.primaryColor)
                        color(Color.white)
                        border(0.px)
                        padding(AppTheme.spacing.medium, AppTheme.spacing.large)
                        borderRadius(AppTheme.borderRadius)
                        cursor("pointer")
                    }
                }) {
                    Text("Update")
                }
            }
        }
    }
}

data class Crop(
    val id: Int,
    val name: String,
    val type: String,
    val fieldSize: Int,
    val plantingDate: String,
    val expectedYield: Int,
    val status: String
)

private val sampleCrops = listOf(
    Crop(1, "Field Corn", "Corn", 50, "2024-04-15", 25000, "Growing"),
    Crop(2, "Winter Wheat", "Wheat", 30, "2023-10-01", 12000, "Ready for Harvest"),
    Crop(3, "Soybean Field", "Soybeans", 25, "2024-05-01", 8000, "Growing"),
    Crop(4, "Rice Paddy", "Rice", 20, "2024-03-20", 15000, "Growing"),
    Crop(5, "Cotton Field", "Cotton", 15, "2024-04-10", 5000, "Growing"),
    Crop(6, "Tomato Garden", "Vegetables", 5, "2024-03-01", 2000, "Ready for Harvest")
) 