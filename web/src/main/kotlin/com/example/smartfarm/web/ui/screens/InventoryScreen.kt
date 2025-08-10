package com.example.smartfarm.web.ui.screens

import androidx.compose.runtime.*
import androidx.compose.web.css.*
import androidx.compose.web.dom.*
import com.example.smartfarm.web.ui.components.*

@Composable
fun InventoryScreen() {
    var selectedCategory by remember { mutableStateOf("supplies") }
    var showAddModal by remember { mutableStateOf(false) }
    var searchQuery by remember { mutableStateOf("") }
    
    Div({
        style {
            padding(24.px)
        }
    }) {
        // Header
        Div({
            style {
                display(DisplayStyle.Flex)
                justifyContent(JustifyContent.SpaceBetween)
                alignItems(Align.Center)
                marginBottom(32.px)
            }
        }) {
            H1({
                style {
                    fontSize(32.px)
                    fontWeight(700)
                    color(Color("#2C3E50"))
                    margin(0.px)
                }
            }) {
                Text("Inventory Management")
            }
            
            Button({
                style {
                    backgroundColor(Color("#4CAF50"))
                    color(Color.white)
                    border(none)
                    padding(12.px, 24.px)
                    borderRadius(8.px)
                    fontSize(16.px)
                    fontWeight(600)
                    cursor("pointer")
                    transition("all 0.2s ease")
                }
                onClick { showAddModal = true }
            }) {
                Text("+ Add Item")
            }
        }
        
        // Search and Filters
        Div({
            style {
                display(DisplayStyle.Flex)
                gap(16.px)
                marginBottom(24.px)
                flexWrap(FlexWrap.Wrap)
            }
        }) {
            // Search Bar
            Input({
                style {
                    flex(1)
                    minWidth(300.px)
                    padding(12.px, 16.px)
                    border(1.px, LineStyle.Solid, Color("#E0E0E0"))
                    borderRadius(8.px)
                    fontSize(16.px)
                }
                placeholder("Search inventory...")
                value(searchQuery)
                onInput { searchQuery = it.value }
            })
            
            // Category Filter
            Select({
                style {
                    padding(12.px, 16.px)
                    border(1.px, LineStyle.Solid, Color("#E0E0E0"))
                    borderRadius(8.px)
                    fontSize(16.px)
                    backgroundColor(Color.white)
                }
                value(selectedCategory)
                onChange { selectedCategory = it.value }
            }) {
                Option {
                    attrs { value("supplies") }
                    Text("Supplies")
                }
                Option {
                    attrs { value("equipment") }
                    Text("Equipment")
                }
                Option {
                    attrs { value("tools") }
                    Text("Tools")
                }
                Option {
                    attrs { value("machinery") }
                    Text("Machinery")
                }
            }
        }
        
        // Inventory Grid
        Div({
            style {
                display(DisplayStyle.Grid)
                gridTemplateColumns("repeat(auto-fill, minmax(350px, 1fr))")
                gap(24.px)
            }
        }) {
            // Sample Inventory Items
            InventoryCard(
                name = "Organic Fertilizer",
                category = "Supplies",
                quantity = "50 bags",
                location = "Storage Shed A",
                status = "In Stock",
                lastUpdated = "2024-01-15",
                lowStock = false
            )
            
            InventoryCard(
                name = "Tractor",
                category = "Machinery",
                quantity = "2 units",
                location = "Equipment Barn",
                status = "Available",
                lastUpdated = "2024-01-10",
                lowStock = false
            )
            
            InventoryCard(
                name = "Seeds - Corn",
                category = "Supplies",
                quantity = "5 bags",
                location = "Storage Shed B",
                status = "Low Stock",
                lastUpdated = "2024-01-12",
                lowStock = true
            )
            
            InventoryCard(
                name = "Irrigation System",
                category = "Equipment",
                quantity = "1 system",
                location = "Field 3",
                status = "In Use",
                lastUpdated = "2024-01-14",
                lowStock = false
            )
            
            InventoryCard(
                name = "Harvesting Tools",
                category = "Tools",
                quantity = "15 sets",
                location = "Tool Shed",
                status = "Available",
                lastUpdated = "2024-01-08",
                lowStock = false
            )
            
            InventoryCard(
                name = "Pesticides",
                category = "Supplies",
                quantity = "2 containers",
                location = "Chemical Storage",
                status = "Low Stock",
                lastUpdated = "2024-01-13",
                lowStock = true
            )
        }
        
        // Add Item Modal
        if (showAddModal) {
            AddInventoryModal(
                onClose = { showAddModal = false },
                onSave = { item ->
                    // Handle saving new item
                    showAddModal = false
                }
            )
        }
    }
}

@Composable
private fun InventoryCard(
    name: String,
    category: String,
    quantity: String,
    location: String,
    status: String,
    lastUpdated: String,
    lowStock: Boolean
) {
    Div({
        style {
            backgroundColor(Color.white)
            borderRadius(12.px)
            padding(24.px)
            boxShadow(0.px, 4.px, 12.px, Color("rgba(0,0,0,0.1)"))
            border(if (lowStock) 2.px else 1.px, LineStyle.Solid, if (lowStock) Color("#FF9800") else Color("#E0E0E0"))
            transition("all 0.2s ease")
            cursor("pointer")
        }
        onMouseEnter {
            it.target.style.boxShadow = "0 8px 24px rgba(0,0,0,0.15)"
        }
        onMouseLeave {
            it.target.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)"
        }
    }) {
        // Header
        Div({
            style {
                display(DisplayStyle.Flex)
                justifyContent(JustifyContent.SpaceBetween)
                alignItems(Align.Center)
                marginBottom(16.px)
            }
        }) {
            H3({
                style {
                    fontSize(20.px)
                    fontWeight(600)
                    color(Color("#2C3E50"))
                    margin(0.px)
                }
            }) {
                Text(name)
            }
            
            Span({
                style {
                    padding(4.px, 8.px)
                    borderRadius(4.px)
                    fontSize(12.px)
                    fontWeight(600)
                    backgroundColor(if (lowStock) Color("#FFF3E0") else Color("#E8F5E8"))
                    color(if (lowStock) Color("#E65100") else Color("#2E7D32"))
                }
            }) {
                Text(if (lowStock) "Low Stock" else "In Stock")
            }
        }
        
        // Details
        Div({
            style {
                display(DisplayStyle.Grid)
                gridTemplateColumns("1fr 1fr")
                gap(12.px)
                marginBottom(16.px)
            }
        }) {
            DetailItem("Category", category)
            DetailItem("Quantity", quantity)
            DetailItem("Location", location)
            DetailItem("Status", status)
        }
        
        // Footer
        Div({
            style {
                display(DisplayStyle.Flex)
                justifyContent(JustifyContent.SpaceBetween)
                alignItems(Align.Center)
                paddingTop(16.px)
                borderTop(1.px, LineStyle.Solid, Color("#F0F0F0"))
            }
        }) {
            Span({
                style {
                    fontSize(14.px)
                    color(Color("#757575"))
                }
            }) {
                Text("Updated: $lastUpdated")
            }
            
            Div({
                style {
                    display(DisplayStyle.Flex)
                    gap(8.px)
                }
            }) {
                Button({
                    style {
                        padding(6.px, 12.px)
                        border(1.px, LineStyle.Solid, Color("#4CAF50"))
                        borderRadius(4.px)
                        backgroundColor(Color.white)
                        color(Color("#4CAF50"))
                        fontSize(14.px)
                        cursor("pointer")
                    }
                }) {
                    Text("Edit")
                }
                
                Button({
                    style {
                        padding(6.px, 12.px)
                        border(1.px, LineStyle.Solid, Color("#F44336"))
                        borderRadius(4.px)
                        backgroundColor(Color.white)
                        color(Color("#F44336"))
                        fontSize(14.px)
                        cursor("pointer")
                    }
                }) {
                    Text("Delete")
                }
            }
        }
    }
}

@Composable
private fun DetailItem(label: String, value: String) {
    Div({
        style {
            display(DisplayStyle.Flex)
            flexDirection(FlexDirection.Column)
            gap(4.px)
        }
    }) {
        Span({
            style {
                fontSize(12.px)
                color(Color("#757575"))
                fontWeight(500)
            }
        }) {
            Text(label)
        }
        Span({
            style {
                fontSize(14.px)
                color(Color("#2C3E50"))
                fontWeight(600)
            }
        }) {
            Text(value)
        }
    }
}

@Composable
private fun AddInventoryModal(onClose: () -> Unit, onSave: (Map<String, String>) -> Unit) {
    var name by remember { mutableStateOf("") }
    var category by remember { mutableStateOf("supplies") }
    var quantity by remember { mutableStateOf("") }
    var location by remember { mutableStateOf("") }
    var description by remember { mutableStateOf("") }
    
    Div({
        style {
            position(Position.Fixed)
            top(0.px)
            left(0.px)
            width(100.vw)
            height(100.vh)
            backgroundColor(Color("rgba(0,0,0,0.5)"))
            display(DisplayStyle.Flex)
            justifyContent(JustifyContent.Center)
            alignItems(Align.Center)
            zIndex(1000)
        }
    }) {
        Div({
            style {
                backgroundColor(Color.white)
                borderRadius(12.px)
                padding(32.px)
                width(500.px)
                maxWidth(90.vw)
                maxHeight(90.vh)
                overflow("auto")
            }
        }) {
            // Header
            Div({
                style {
                    display(DisplayStyle.Flex)
                    justifyContent(JustifyContent.SpaceBetween)
                    alignItems(Align.Center)
                    marginBottom(24.px)
                }
            }) {
                H2({
                    style {
                        fontSize(24.px)
                        fontWeight(600)
                        color(Color("#2C3E50"))
                        margin(0.px)
                    }
                }) {
                    Text("Add Inventory Item")
                }
                
                Button({
                    style {
                        background("none")
                        border(none)
                        fontSize(24.px)
                        cursor("pointer")
                        color(Color("#757575"))
                    }
                    onClick { onClose() }
                }) {
                    Text("×")
                }
            }
            
            // Form
            Div({
                style {
                    display(DisplayStyle.Flex)
                    flexDirection(FlexDirection.Column)
                    gap(20.px)
                }
            }) {
                FormField("Item Name", name) { name = it }
                FormField("Quantity", quantity) { quantity = it }
                FormField("Location", location) { location = it }
                FormField("Description", description) { description = it }
                
                // Category Select
                Div({
                    style {
                        display(DisplayStyle.Flex)
                        flexDirection(FlexDirection.Column)
                        gap(8.px)
                    }
                }) {
                    Label({
                        style {
                            fontSize(14.px)
                            fontWeight(500)
                            color(Color("#2C3E50"))
                        }
                    }) {
                        Text("Category")
                    }
                    Select({
                        style {
                            padding(12.px, 16.px)
                            border(1.px, LineStyle.Solid, Color("#E0E0E0"))
                            borderRadius(8.px)
                            fontSize(16.px)
                        }
                        value(category)
                        onChange { category = it.value }
                    }) {
                        Option { attrs { value("supplies") }; Text("Supplies") }
                        Option { attrs { value("equipment") }; Text("Equipment") }
                        Option { attrs { value("tools") }; Text("Tools") }
                        Option { attrs { value("machinery") }; Text("Machinery") }
                    }
                }
            }
            
            // Actions
            Div({
                style {
                    display(DisplayStyle.Flex)
                    justifyContent(JustifyContent.End)
                    gap(12.px)
                    marginTop(32.px)
                    paddingTop(24.px)
                    borderTop(1.px, LineStyle.Solid, Color("#F0F0F0"))
                }
            }) {
                Button({
                    style {
                        padding(12.px, 24.px)
                        border(1.px, LineStyle.Solid, Color("#E0E0E0"))
                        borderRadius(8.px)
                        backgroundColor(Color.white)
                        color(Color("#757575"))
                        fontSize(16.px)
                        cursor("pointer")
                    }
                    onClick { onClose() }
                }) {
                    Text("Cancel")
                }
                
                Button({
                    style {
                        padding(12.px, 24.px)
                        border(none)
                        borderRadius(8.px)
                        backgroundColor(Color("#4CAF50"))
                        color(Color.white)
                        fontSize(16.px)
                        fontWeight(600)
                        cursor("pointer")
                    }
                    onClick {
                        onSave(mapOf(
                            "name" to name,
                            "category" to category,
                            "quantity" to quantity,
                            "location" to location,
                            "description" to description
                        ))
                    }
                }) {
                    Text("Save Item")
                }
            }
        }
    }
}

@Composable
private fun FormField(label: String, value: String, onValueChange: (String) -> Unit) {
    Div({
        style {
            display(DisplayStyle.Flex)
            flexDirection(FlexDirection.Column)
            gap(8.px)
        }
    }) {
        Label({
            style {
                fontSize(14.px)
                fontWeight(500)
                color(Color("#2C3E50"))
            }
        }) {
            Text(label)
        }
        Input({
            style {
                padding(12.px, 16.px)
                border(1.px, LineStyle.Solid, Color("#E0E0E0"))
                borderRadius(8.px)
                fontSize(16.px)
            }
            value(value)
            onInput { onValueChange(it.value) }
        })
    }
} 