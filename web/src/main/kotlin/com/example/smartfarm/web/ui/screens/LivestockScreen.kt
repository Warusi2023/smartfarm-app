package com.example.smartfarm.web.ui.screens

import androidx.compose.runtime.*
import androidx.compose.web.elements.*
import androidx.compose.web.css.*
import com.example.smartfarm.web.ui.theme.AppTheme

@Composable
fun LivestockScreen() {
    var showAddAnimal by remember { mutableStateOf(false) }
    var animals by remember { mutableStateOf(sampleAnimals) }
    var selectedAnimal by remember { mutableStateOf<Animal?>(null) }

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
                Text("🐄 Livestock Management")
            }
            
            Button({
                onClick { showAddAnimal = true }
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
                Text("+ Add Animal")
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
            StatCard("Total Animals", animals.size.toString(), "healthy")
            StatCard("Cattle", animals.count { it.type == "Cattle" }.toString(), "cows")
            StatCard("Poultry", animals.count { it.type == "Poultry" }.toString(), "chickens")
            StatCard("Pigs", animals.count { it.type == "Pig" }.toString(), "pigs")
        }

        // Animals List
        H2({
            style {
                color(AppTheme.textColor)
                fontSize(24.px)
                marginBottom(AppTheme.spacing.medium)
                fontWeight("bold")
            }
        }) {
            Text("Animal Inventory")
        }

        AnimalsList(animals, onAnimalClick = { selectedAnimal = it })
    }

    // Add Animal Modal
    if (showAddAnimal) {
        AddAnimalModal(
            onClose = { showAddAnimal = false },
            onAdd = { newAnimal ->
                animals = animals + newAnimal
                showAddAnimal = false
            }
        )
    }

    // Animal Details Modal
    selectedAnimal?.let { animal ->
        AnimalDetailsModal(
            animal = animal,
            onClose = { selectedAnimal = null },
            onUpdate = { updatedAnimal ->
                animals = animals.map { if (it.id == updatedAnimal.id) updatedAnimal else it }
                selectedAnimal = null
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
private fun AnimalsList(animals: List<Animal>, onAnimalClick: (Animal) -> Unit) {
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
                gridTemplateColumns("1fr 1fr 1fr 1fr 1fr 1fr")
                gap(AppTheme.spacing.medium)
                fontWeight("bold")
                color(AppTheme.textSecondaryColor)
                fontSize(14.px)
            }
        }) {
            Text("Name")
            Text("Type")
            Text("Breed")
            Text("Age")
            Text("Health")
            Text("Actions")
        }
        
        // Animal rows
        animals.forEach { animal ->
            AnimalRow(animal, onAnimalClick)
        }
    }
}

@Composable
private fun AnimalRow(animal: Animal, onAnimalClick: (Animal) -> Unit) {
    Div({
        style {
            padding(AppTheme.spacing.medium)
            borderBottom(1.px, LineStyle.Solid, AppTheme.backgroundColor)
            display(DisplayStyle.Grid)
            gridTemplateColumns("1fr 1fr 1fr 1fr 1fr 1fr")
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
            Text(animal.name)
        }
        
        Div({ style { color(AppTheme.textColor) } }) {
            Text(animal.type)
        }
        
        Div({ style { color(AppTheme.textColor) } }) {
            Text(animal.breed)
        }
        
        Div({ style { color(AppTheme.textColor) } }) {
            Text("${animal.age} years")
        }
        
        Div({
            style {
                backgroundColor(when(animal.health) {
                    "Healthy" -> Color("#4CAF50")
                    "Sick" -> Color("#F44336")
                    "Recovering" -> Color("#FF9800")
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
            Text(animal.health)
        }
        
        Button({
            onClick { onAnimalClick(animal) }
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
private fun AddAnimalModal(onClose: () -> Unit, onAdd: (Animal) -> Unit) {
    var name by remember { mutableStateOf("") }
    var type by remember { mutableStateOf("Cattle") }
    var breed by remember { mutableStateOf("") }
    var age by remember { mutableStateOf("") }
    var health by remember { mutableStateOf("Healthy") }

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
                Text("Add New Animal")
            }

            Div({ style { marginBottom(AppTheme.spacing.medium) } }) {
                Label({ style { display(DisplayStyle.Block); marginBottom(AppTheme.spacing.small) } }) {
                    Text("Name")
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
                    Text("Type")
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
                    Option { Text("Cattle") }
                    Option { Text("Poultry") }
                    Option { Text("Pig") }
                    Option { Text("Sheep") }
                    Option { Text("Goat") }
                }
            }

            Div({ style { marginBottom(AppTheme.spacing.medium) } }) {
                Label({ style { display(DisplayStyle.Block); marginBottom(AppTheme.spacing.small) } }) {
                    Text("Breed")
                }
                Input({
                    value = breed
                    onInput { breed = it.value }
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
                    Text("Age (years)")
                }
                Input({
                    type = InputType.Number
                    value = age
                    onInput { age = it.value }
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
                    Text("Health Status")
                }
                Select({
                    value = health
                    onChange { health = it.value }
                    style {
                        width(100.percent)
                        padding(AppTheme.spacing.small)
                        border(1.px, LineStyle.Solid, AppTheme.backgroundColor)
                        borderRadius(AppTheme.borderRadius)
                    }
                }) {
                    Option { Text("Healthy") }
                    Option { Text("Sick") }
                    Option { Text("Recovering") }
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
                        if (name.isNotBlank() && breed.isNotBlank() && age.isNotBlank()) {
                            onAdd(Animal(
                                id = (sampleAnimals.maxOfOrNull { it.id } ?: 0) + 1,
                                name = name,
                                type = type,
                                breed = breed,
                                age = age.toIntOrNull() ?: 0,
                                health = health
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
                    Text("Add Animal")
                }
            }
        }
    }
}

@Composable
private fun AnimalDetailsModal(
    animal: Animal,
    onClose: () -> Unit,
    onUpdate: (Animal) -> Unit
) {
    var name by remember { mutableStateOf(animal.name) }
    var type by remember { mutableStateOf(animal.type) }
    var breed by remember { mutableStateOf(animal.breed) }
    var age by remember { mutableStateOf(animal.age.toString()) }
    var health by remember { mutableStateOf(animal.health) }

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
                Text("Animal Details")
            }

            Div({ style { marginBottom(AppTheme.spacing.medium) } }) {
                Label({ style { display(DisplayStyle.Block); marginBottom(AppTheme.spacing.small) } }) {
                    Text("Name")
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
                    Text("Type")
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
                    Option { Text("Cattle") }
                    Option { Text("Poultry") }
                    Option { Text("Pig") }
                    Option { Text("Sheep") }
                    Option { Text("Goat") }
                }
            }

            Div({ style { marginBottom(AppTheme.spacing.medium) } }) {
                Label({ style { display(DisplayStyle.Block); marginBottom(AppTheme.spacing.small) } }) {
                    Text("Breed")
                }
                Input({
                    value = breed
                    onInput { breed = it.value }
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
                    Text("Age (years)")
                }
                Input({
                    type = InputType.Number
                    value = age
                    onInput { age = it.value }
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
                    Text("Health Status")
                }
                Select({
                    value = health
                    onChange { health = it.value }
                    style {
                        width(100.percent)
                        padding(AppTheme.spacing.small)
                        border(1.px, LineStyle.Solid, AppTheme.backgroundColor)
                        borderRadius(AppTheme.borderRadius)
                    }
                }) {
                    Option { Text("Healthy") }
                    Option { Text("Sick") }
                    Option { Text("Recovering") }
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
                        if (name.isNotBlank() && breed.isNotBlank() && age.isNotBlank()) {
                            onUpdate(animal.copy(
                                name = name,
                                type = type,
                                breed = breed,
                                age = age.toIntOrNull() ?: animal.age,
                                health = health
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

data class Animal(
    val id: Int,
    val name: String,
    val type: String,
    val breed: String,
    val age: Int,
    val health: String
)

private val sampleAnimals = listOf(
    Animal(1, "Bessie", "Cattle", "Holstein", 5, "Healthy"),
    Animal(2, "Daisy", "Cattle", "Jersey", 3, "Healthy"),
    Animal(3, "Cluck", "Poultry", "Rhode Island Red", 2, "Healthy"),
    Animal(4, "Wilbur", "Pig", "Yorkshire", 1, "Recovering"),
    Animal(5, "Henrietta", "Poultry", "Leghorn", 1, "Healthy"),
    Animal(6, "Moo", "Cattle", "Angus", 4, "Sick")
) 