package com.example.smartfarm.web.ui.screens

import androidx.compose.runtime.*
import androidx.compose.web.css.*
import androidx.compose.web.dom.*
import com.example.smartfarm.web.ui.components.*

@Composable
fun DocumentManagementScreen() {
    var selectedCategory by remember { mutableStateOf("all") }
    var searchQuery by remember { mutableStateOf("") }
    var showUploadModal by remember { mutableStateOf(false) }
    var viewMode by remember { mutableStateOf("grid") }
    
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
                Text("Document Management")
            }
            
            Div({
                style {
                    display(DisplayStyle.Flex)
                    gap(12.px)
                }
            }) {
                Button({
                    style {
                        padding(8.px, 16.px)
                        border(1.px, LineStyle.Solid, Color("#E0E0E0"))
                        borderRadius(6.px)
                        backgroundColor(if (viewMode == "grid") Color("#4CAF50") else Color.white)
                        color(if (viewMode == "grid") Color.white else Color("#757575"))
                        fontSize(14.px)
                        cursor("pointer")
                    }
                    onClick { viewMode = "grid" }
                }) {
                    Text("📁 Grid")
                }
                
                Button({
                    style {
                        padding(8.px, 16.px)
                        border(1.px, LineStyle.Solid, Color("#E0E0E0"))
                        borderRadius(6.px)
                        backgroundColor(if (viewMode == "list") Color("#4CAF50") else Color.white)
                        color(if (viewMode == "list") Color.white else Color("#757575"))
                        fontSize(14.px)
                        cursor("pointer")
                    }
                    onClick { viewMode = "list" }
                }) {
                    Text("📋 List")
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
                    onClick { showUploadModal = true }
                }) {
                    Text("📤 Upload")
                }
            }
        }
        
        // Filters and Search
        Div({
            style {
                display(DisplayStyle.Flex)
                gap(16.px)
                marginBottom(24.px)
                flexWrap(FlexWrap.Wrap)
            }
        }) {
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
                Option { attrs { value("all") }; Text("All Documents") }
                Option { attrs { value("financial") }; Text("Financial Records") }
                Option { attrs { value("legal") }; Text("Legal Documents") }
                Option { attrs { value("operational") }; Text("Operational Manuals") }
                Option { attrs { value("compliance") }; Text("Compliance Reports") }
                Option { attrs { value("contracts") }; Text("Contracts") }
                Option { attrs { value("certificates") }; Text("Certificates") }
            }
            
            // Search
            Input({
                style {
                    flex(1)
                    minWidth(300.px)
                    padding(12.px, 16.px)
                    border(1.px, LineStyle.Solid, Color("#E0E0E0"))
                    borderRadius(8.px)
                    fontSize(16.px)
                }
                placeholder("Search documents...")
                value(searchQuery)
                onInput { searchQuery = it.value }
            })
        }
        
        // Document Stats
        Div({
            style {
                display(DisplayStyle.Grid)
                gridTemplateColumns("repeat(auto-fit, minmax(200px, 1fr))")
                gap(24.px)
                marginBottom(32.px)
            }
        }) {
            DocumentStatCard("Total Documents", "1,247", "+12 this month", true)
            DocumentStatCard("Storage Used", "2.4 GB", "of 10 GB", false)
            DocumentStatCard("Recent Uploads", "8", "today", true)
            DocumentStatCard("Pending Review", "3", "documents", false)
        }
        
        // Documents Grid/List
        if (viewMode == "grid") {
            DocumentsGrid()
        } else {
            DocumentsList()
        }
        
        // Upload Modal
        if (showUploadModal) {
            UploadDocumentModal(
                onClose = { showUploadModal = false },
                onUpload = { document ->
                    // Handle document upload
                    showUploadModal = false
                }
            )
        }
    }
}

@Composable
private fun DocumentStatCard(title: String, value: String, subtitle: String, isPositive: Boolean) {
    Div({
        style {
            backgroundColor(Color.white)
            borderRadius(12.px)
            padding(24.px)
            boxShadow(0.px, 4.px, 12.px, Color("rgba(0,0,0,0.1)"))
        }
    }) {
        Span({
            style {
                fontSize(14.px)
                color(Color("#757575"))
                fontWeight(500)
            }
        }) {
            Text(title)
        }
        
        Div({
            style {
                fontSize(28.px)
                fontWeight(700)
                color(Color("#2C3E50"))
                marginBottom(8.px)
            }
        }) {
            Text(value)
        }
        
        Span({
            style {
                fontSize(14.px)
                fontWeight(600)
                color(if (isPositive) Color("#4CAF50") else Color("#757575"))
            }
        }) {
            Text(subtitle)
        }
    }
}

@Composable
private fun DocumentsGrid() {
    Div({
        style {
            display(DisplayStyle.Grid)
            gridTemplateColumns("repeat(auto-fill, minmax(300px, 1fr))")
            gap(24.px)
        }
    }) {
        DocumentCard(
            name = "Annual Financial Report 2024",
            category = "Financial Records",
            size = "2.4 MB",
            uploadDate = "2024-01-15",
            fileType = "PDF",
            isImportant = true
        )
        
        DocumentCard(
            name = "Farm Equipment Manual",
            category = "Operational Manuals",
            size = "1.8 MB",
            uploadDate = "2024-01-12",
            fileType = "PDF",
            isImportant = false
        )
        
        DocumentCard(
            name = "Land Lease Agreement",
            category = "Contracts",
            size = "856 KB",
            uploadDate = "2024-01-10",
            fileType = "DOCX",
            isImportant = true
        )
        
        DocumentCard(
            name = "Organic Certification",
            category = "Certificates",
            size = "1.2 MB",
            uploadDate = "2024-01-08",
            fileType = "PDF",
            isImportant = true
        )
        
        DocumentCard(
            name = "Safety Compliance Report",
            category = "Compliance Reports",
            size = "3.1 MB",
            uploadDate = "2024-01-05",
            fileType = "PDF",
            isImportant = false
        )
        
        DocumentCard(
            name = "Employee Handbook",
            category = "Operational Manuals",
            size = "2.7 MB",
            uploadDate = "2024-01-03",
            fileType = "PDF",
            isImportant = false
        )
    }
}

@Composable
private fun DocumentCard(
    name: String,
    category: String,
    size: String,
    uploadDate: String,
    fileType: String,
    isImportant: Boolean
) {
    Div({
        style {
            backgroundColor(Color.white)
            borderRadius(12.px)
            padding(24.px)
            boxShadow(0.px, 4.px, 12.px, Color("rgba(0,0,0,0.1)"))
            border(if (isImportant) 2.px else 1.px, LineStyle.Solid, if (isImportant) Color("#FF9800") else Color("#E0E0E0"))
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
            Div({
                style {
                    width(48.px)
                    height(48.px)
                    borderRadius(8.px)
                    backgroundColor(getFileTypeColor(fileType))
                    display(DisplayStyle.Flex)
                    alignItems(Align.Center)
                    justifyContent(JustifyContent.Center)
                    color(Color.white)
                    fontSize(20.px)
                    fontWeight(600)
                }
            }) {
                Text(getFileTypeIcon(fileType))
            }
            
            if (isImportant) {
                Span({
                    style {
                        fontSize(16.px)
                        color(Color("#FF9800"))
                    }
                }) {
                    Text("⭐")
                }
            }
        }
        
        // Document Info
        H3({
            style {
                fontSize(18.px)
                fontWeight(600)
                color(Color("#2C3E50"))
                margin(0.px, 0.px, 8.px, 0.px)
                lineHeight(1.4)
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
                backgroundColor(Color("#E8F5E8"))
                color(Color("#2E7D32"))
                marginBottom(12.px)
                display(DisplayStyle.InlineBlock)
            }
        }) {
            Text(category)
        }
        
        // Details
        Div({
            style {
                display(DisplayStyle.Flex)
                flexDirection(FlexDirection.Column)
                gap(8.px)
                marginBottom(16.px)
            }
        }) {
            DetailRow("📏", "Size", size)
            DetailRow("📅", "Uploaded", uploadDate)
            DetailRow("📄", "Type", fileType.uppercase())
        }
        
        // Actions
        Div({
            style {
                display(DisplayStyle.Flex)
                gap(8.px)
                paddingTop(16.px)
                borderTop(1.px, LineStyle.Solid, Color("#F0F0F0"))
            }
        }) {
            Button({
                style {
                    flex(1)
                    padding(8.px, 16.px)
                    border(1.px, LineStyle.Solid, Color("#4CAF50"))
                    borderRadius(6.px)
                    backgroundColor(Color.white)
                    color(Color("#4CAF50"))
                    fontSize(14.px)
                    cursor("pointer")
                }
            }) {
                Text("Download")
            }
            
            Button({
                style {
                    flex(1)
                    padding(8.px, 16.px)
                    border(1.px, LineStyle.Solid, Color("#2196F3"))
                    borderRadius(6.px)
                    backgroundColor(Color.white)
                    color(Color("#2196F3"))
                    fontSize(14.px)
                    cursor("pointer")
                }
            }) {
                Text("Share")
            }
            
            Button({
                style {
                    padding(8.px, 12.px)
                    border(1.px, LineStyle.Solid, Color("#757575"))
                    borderRadius(6.px)
                    backgroundColor(Color.white)
                    color(Color("#757575"))
                    fontSize(14.px)
                    cursor("pointer")
                }
            }) {
                Text("⋮")
            }
        }
    }
}

@Composable
private fun DocumentsList() {
    Div({
        style {
            backgroundColor(Color.white)
            borderRadius(12.px)
            padding(24.px)
            boxShadow(0.px, 4.px, 12.px, Color("rgba(0,0,0,0.1)"))
        }
    }) {
        // Header
        Div({
            style {
                display(DisplayStyle.Grid)
                gridTemplateColumns("1fr 1fr 100px 120px 100px 120px")
                gap(16.px)
                padding(16.px, 0.px)
                borderBottom(1.px, LineStyle.Solid, Color("#E0E0E0"))
                fontWeight(600)
                color(Color("#2C3E50"))
            }
        }) {
            Text("Document Name")
            Text("Category")
            Text("Size")
            Text("Upload Date")
            Text("Type")
            Text("Actions")
        }
        
        // Document Rows
        DocumentRow(
            name = "Annual Financial Report 2024",
            category = "Financial Records",
            size = "2.4 MB",
            uploadDate = "2024-01-15",
            fileType = "PDF",
            isImportant = true
        )
        
        DocumentRow(
            name = "Farm Equipment Manual",
            category = "Operational Manuals",
            size = "1.8 MB",
            uploadDate = "2024-01-12",
            fileType = "PDF",
            isImportant = false
        )
        
        DocumentRow(
            name = "Land Lease Agreement",
            category = "Contracts",
            size = "856 KB",
            uploadDate = "2024-01-10",
            fileType = "DOCX",
            isImportant = true
        )
        
        DocumentRow(
            name = "Organic Certification",
            category = "Certificates",
            size = "1.2 MB",
            uploadDate = "2024-01-08",
            fileType = "PDF",
            isImportant = true
        )
    }
}

@Composable
private fun DocumentRow(
    name: String,
    category: String,
    size: String,
    uploadDate: String,
    fileType: String,
    isImportant: Boolean
) {
    Div({
        style {
            display(DisplayStyle.Grid)
            gridTemplateColumns("1fr 1fr 100px 120px 100px 120px")
            gap(16.px)
            padding(16.px, 0.px)
            borderBottom(1.px, LineStyle.Solid, Color("#F0F0F0"))
            alignItems(Align.Center)
        }
    }) {
        Div({
            style {
                display(DisplayStyle.Flex)
                alignItems(Align.Center)
                gap(12.px)
            }
        }) {
            if (isImportant) {
                Span({
                    style {
                        fontSize(16.px)
                        color(Color("#FF9800"))
                    }
                }) {
                    Text("⭐")
                }
            }
            Span({
                style {
                    fontSize(16.px)
                    fontWeight(600)
                    color(Color("#2C3E50"))
                }
            }) {
                Text(name)
            }
        }
        
        Span({
            style {
                padding(4.px, 8.px)
                borderRadius(4.px)
                fontSize(12.px)
                fontWeight(600)
                backgroundColor(Color("#E8F5E8"))
                color(Color("#2E7D32"))
                width("fit-content")
            }
        }) {
            Text(category)
        }
        
        Span({
            style {
                fontSize(14.px)
                color(Color("#757575"))
            }
        }) {
            Text(size)
        }
        
        Span({
            style {
                fontSize(14.px)
                color(Color("#757575"))
            }
        }) {
            Text(uploadDate)
        }
        
        Span({
            style {
                fontSize(14.px)
                fontWeight(600)
                color(Color("#2C3E50"))
            }
        }) {
            Text(fileType.uppercase())
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
                    fontSize(12.px)
                    cursor("pointer")
                }
            }) {
                Text("Download")
            }
            
            Button({
                style {
                    padding(6.px, 12.px)
                    border(1.px, LineStyle.Solid, Color("#757575"))
                    borderRadius(4.px)
                    backgroundColor(Color.white)
                    color(Color("#757575"))
                    fontSize(12.px)
                    cursor("pointer")
                }
            }) {
                Text("⋮")
            }
        }
    }
}

@Composable
private fun DetailRow(icon: String, label: String, value: String) {
    Div({
        style {
            display(DisplayStyle.Flex)
            alignItems(Align.Center)
            gap(8.px)
        }
    }) {
        Span({
            style {
                fontSize(14.px)
            }
        }) {
            Text(icon)
        }
        Span({
            style {
                fontSize(12.px)
                color(Color("#757575"))
                minWidth(60.px)
            }
        }) {
            Text(label)
        }
        Span({
            style {
                fontSize(14.px)
                color(Color("#2C3E50"))
                fontWeight(500)
            }
        }) {
            Text(value)
        }
    }
}

@Composable
private fun UploadDocumentModal(onClose: () -> Unit, onUpload: (Map<String, String>) -> Unit) {
    var fileName by remember { mutableStateOf("") }
    var selectedCategory by remember { mutableStateOf("financial") }
    var description by remember { mutableStateOf("") }
    var isImportant by remember { mutableStateOf(false) }
    
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
                    Text("Upload Document")
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
            
            // Upload Area
            Div({
                style {
                    border(2.px, LineStyle.Dashed, Color("#E0E0E0"))
                    borderRadius(12.px)
                    padding(48.px, 24.px)
                    textAlign(TextAlign.Center)
                    marginBottom(24.px)
                    backgroundColor(Color("#F8F9FA"))
                    transition("all 0.2s ease")
                    cursor("pointer")
                }
                onMouseEnter {
                    it.target.style.borderColor = "#4CAF50"
                    it.target.style.backgroundColor = "#E8F5E8"
                }
                onMouseLeave {
                    it.target.style.borderColor = "#E0E0E0"
                    it.target.style.backgroundColor = "#F8F9FA"
                }
            }) {
                Div({
                    style {
                        fontSize(48.px)
                        marginBottom(16.px)
                    }
                }) {
                    Text("📁")
                }
                
                H3({
                    style {
                        fontSize(18.px)
                        fontWeight(600)
                        color(Color("#2C3E50"))
                        margin(0.px, 0.px, 8.px, 0.px)
                    }
                }) {
                    Text("Drop files here or click to upload")
                }
                
                P({
                    style {
                        fontSize(14.px)
                        color(Color("#757575"))
                        margin(0.px)
                    }
                }) {
                    Text("Supports PDF, DOCX, XLSX, JPG, PNG (Max 10MB)")
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
                FormField("Document Name", fileName) { fileName = it }
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
                        value(selectedCategory)
                        onChange { selectedCategory = it.value }
                    }) {
                        Option { attrs { value("financial") }; Text("Financial Records") }
                        Option { attrs { value("legal") }; Text("Legal Documents") }
                        Option { attrs { value("operational") }; Text("Operational Manuals") }
                        Option { attrs { value("compliance") }; Text("Compliance Reports") }
                        Option { attrs { value("contracts") }; Text("Contracts") }
                        Option { attrs { value("certificates") }; Text("Certificates") }
                    }
                }
                
                // Important Flag
                Div({
                    style {
                        display(DisplayStyle.Flex)
                        alignItems(Align.Center)
                        gap(12.px)
                    }
                }) {
                    Input({
                        type = InputType.Checkbox
                        checked(isImportant)
                        onChange { isImportant = it.checked }
                        style {
                            width(20.px)
                            height(20.px)
                        }
                    })
                    Label({
                        style {
                            fontSize(16.px)
                            color(Color("#2C3E50"))
                            cursor("pointer")
                        }
                    }) {
                        Text("Mark as important document")
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
                        onUpload(mapOf(
                            "name" to fileName,
                            "category" to selectedCategory,
                            "description" to description,
                            "important" to isImportant.toString()
                        ))
                    }
                }) {
                    Text("Upload Document")
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

private fun getFileTypeColor(fileType: String): Color {
    return when (fileType.uppercase()) {
        "PDF" -> Color("#F44336")
        "DOCX" -> Color("#2196F3")
        "XLSX" -> Color("#4CAF50")
        "JPG", "PNG" -> Color("#FF9800")
        else -> Color("#757575")
    }
}

private fun getFileTypeIcon(fileType: String): String {
    return when (fileType.uppercase()) {
        "PDF" -> "📄"
        "DOCX" -> "📝"
        "XLSX" -> "📊"
        "JPG", "PNG" -> "🖼️"
        else -> "📄"
    }
} 