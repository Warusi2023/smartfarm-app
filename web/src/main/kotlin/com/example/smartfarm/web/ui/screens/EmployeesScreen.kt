package com.example.smartfarm.web.ui.screens

import androidx.compose.runtime.*
import androidx.compose.web.css.*
import androidx.compose.web.dom.*
import com.example.smartfarm.web.ui.components.*

@Composable
fun EmployeesScreen() {
    var selectedView by remember { mutableStateOf("employees") }
    var showAddModal by remember { mutableStateOf(false) }
    var searchQuery by remember { mutableStateOf("") }
    var selectedRole by remember { mutableStateOf("all") }
    
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
                Text("Employee Management")
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
                Text("+ Add Employee")
            }
        }
        
        // View Tabs
        Div({
            style {
                display(DisplayStyle.Flex)
                gap(8.px)
                marginBottom(24.px)
                borderBottom(1.px, LineStyle.Solid, Color("#E0E0E0"))
            }
        }) {
            TabButton("Employees", selectedView == "employees") {
                selectedView = "employees"
            }
            TabButton("Schedule", selectedView == "schedule") {
                selectedView = "schedule"
            }
            TabButton("Roles", selectedView == "roles") {
                selectedView = "roles"
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
            Input({
                style {
                    flex(1)
                    minWidth(300.px)
                    padding(12.px, 16.px)
                    border(1.px, LineStyle.Solid, Color("#E0E0E0"))
                    borderRadius(8.px)
                    fontSize(16.px)
                }
                placeholder("Search employees...")
                value(searchQuery)
                onInput { searchQuery = it.value }
            })
            
            Select({
                style {
                    padding(12.px, 16.px)
                    border(1.px, LineStyle.Solid, Color("#E0E0E0"))
                    borderRadius(8.px)
                    fontSize(16.px)
                    backgroundColor(Color.white)
                }
                value(selectedRole)
                onChange { selectedRole = it.value }
            }) {
                Option { attrs { value("all") }; Text("All Roles") }
                Option { attrs { value("manager") }; Text("Manager") }
                Option { attrs { value("worker") }; Text("Worker") }
                Option { attrs { value("specialist") }; Text("Specialist") }
                Option { attrs { value("supervisor") }; Text("Supervisor") }
            }
        }
        
        // Content based on selected view
        when (selectedView) {
            "employees" -> EmployeesList()
            "schedule" -> ScheduleView()
            "roles" -> RolesView()
        }
        
        // Add Employee Modal
        if (showAddModal) {
            AddEmployeeModal(
                onClose = { showAddModal = false },
                onSave = { employee ->
                    // Handle saving new employee
                    showAddModal = false
                }
            )
        }
    }
}

@Composable
private fun TabButton(text: String, isActive: Boolean, onClick: () -> Unit) {
    Button({
        style {
            padding(12.px, 24.px)
            border(none)
            backgroundColor(if (isActive) Color("#4CAF50") else Color.transparent)
            color(if (isActive) Color.white else Color("#757575"))
            fontSize(16.px)
            fontWeight(if (isActive) 600 else 500)
            cursor("pointer")
            borderBottom(if (isActive) 2.px else 0.px, LineStyle.Solid, if (isActive) Color("#4CAF50") else Color.transparent)
            transition("all 0.2s ease")
        }
        onClick { onClick() }
    }) {
        Text(text)
    }
}

@Composable
private fun EmployeesList() {
    Div({
        style {
            display(DisplayStyle.Grid)
            gridTemplateColumns("repeat(auto-fill, minmax(400px, 1fr))")
            gap(24.px)
        }
    }) {
        EmployeeCard(
            name = "John Smith",
            role = "Farm Manager",
            email = "john.smith@smartfarm.com",
            phone = "+1 (555) 123-4567",
            status = "Active",
            department = "Management",
            hireDate = "2023-01-15",
            avatar = "JS"
        )
        
        EmployeeCard(
            name = "Maria Garcia",
            role = "Livestock Specialist",
            email = "maria.garcia@smartfarm.com",
            phone = "+1 (555) 234-5678",
            status = "Active",
            department = "Livestock",
            hireDate = "2023-03-20",
            avatar = "MG"
        )
        
        EmployeeCard(
            name = "David Chen",
            role = "Crop Specialist",
            email = "david.chen@smartfarm.com",
            phone = "+1 (555) 345-6789",
            status = "On Leave",
            department = "Crops",
            hireDate = "2022-11-10",
            avatar = "DC"
        )
        
        EmployeeCard(
            name = "Sarah Johnson",
            role = "Equipment Operator",
            email = "sarah.johnson@smartfarm.com",
            phone = "+1 (555) 456-7890",
            status = "Active",
            department = "Equipment",
            hireDate = "2023-06-05",
            avatar = "SJ"
        )
        
        EmployeeCard(
            name = "Michael Brown",
            role = "Field Worker",
            email = "michael.brown@smartfarm.com",
            phone = "+1 (555) 567-8901",
            status = "Active",
            department = "Operations",
            hireDate = "2023-08-12",
            avatar = "MB"
        )
        
        EmployeeCard(
            name = "Lisa Wilson",
            role = "Quality Control",
            email = "lisa.wilson@smartfarm.com",
            phone = "+1 (555) 678-9012",
            status = "Active",
            department = "Quality",
            hireDate = "2023-02-28",
            avatar = "LW"
        )
    }
}

@Composable
private fun EmployeeCard(
    name: String,
    role: String,
    email: String,
    phone: String,
    status: String,
    department: String,
    hireDate: String,
    avatar: String
) {
    Div({
        style {
            backgroundColor(Color.white)
            borderRadius(12.px)
            padding(24.px)
            boxShadow(0.px, 4.px, 12.px, Color("rgba(0,0,0,0.1)"))
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
        // Header with Avatar
        Div({
            style {
                display(DisplayStyle.Flex)
                alignItems(Align.Center)
                gap(16.px)
                marginBottom(20.px)
            }
        }) {
            // Avatar
            Div({
                style {
                    width(60.px)
                    height(60.px)
                    borderRadius(50.percent)
                    backgroundColor(Color("#4CAF50"))
                    display(DisplayStyle.Flex)
                    alignItems(Align.Center)
                    justifyContent(JustifyContent.Center)
                    color(Color.white)
                    fontSize(20.px)
                    fontWeight(600)
                }
            }) {
                Text(avatar)
            }
            
            // Employee Info
            Div({
                style {
                    flex(1)
                }
            }) {
                H3({
                    style {
                        fontSize(20.px)
                        fontWeight(600)
                        color(Color("#2C3E50"))
                        margin(0.px, 0.px, 4.px, 0.px)
                    }
                }) {
                    Text(name)
                }
                
                P({
                    style {
                        fontSize(16.px)
                        color(Color("#757575"))
                        margin(0.px, 0.px, 8.px, 0.px)
                    }
                }) {
                    Text(role)
                }
                
                Span({
                    style {
                        padding(4.px, 8.px)
                        borderRadius(4.px)
                        fontSize(12.px)
                        fontWeight(600)
                        backgroundColor(if (status == "Active") Color("#E8F5E8") else Color("#FFF3E0"))
                        color(if (status == "Active") Color("#2E7D32") else Color("#E65100"))
                    }
                }) {
                    Text(status)
                }
            }
        }
        
        // Contact Info
        Div({
            style {
                display(DisplayStyle.Flex)
                flexDirection(FlexDirection.Column)
                gap(12.px)
                marginBottom(20.px)
            }
        }) {
            ContactItem("📧", email)
            ContactItem("📞", phone)
            ContactItem("🏢", department)
            ContactItem("📅", "Hired: $hireDate")
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
                Text("Edit")
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
                Text("Schedule")
            }
            
            Button({
                style {
                    flex(1)
                    padding(8.px, 16.px)
                    border(1.px, LineStyle.Solid, Color("#F44336"))
                    borderRadius(6.px)
                    backgroundColor(Color.white)
                    color(Color("#F44336"))
                    fontSize(14.px)
                    cursor("pointer")
                }
            }) {
                Text("Remove")
            }
        }
    }
}

@Composable
private fun ContactItem(icon: String, text: String) {
    Div({
        style {
            display(DisplayStyle.Flex)
            alignItems(Align.Center)
            gap(8.px)
        }
    }) {
        Span({
            style {
                fontSize(16.px)
            }
        }) {
            Text(icon)
        }
        Span({
            style {
                fontSize(14.px)
                color(Color("#2C3E50"))
            }
        }) {
            Text(text)
        }
    }
}

@Composable
private fun ScheduleView() {
    Div({
        style {
            backgroundColor(Color.white)
            borderRadius(12.px)
            padding(24.px)
            boxShadow(0.px, 4.px, 12.px, Color("rgba(0,0,0,0.1)"))
        }
    }) {
        H2({
            style {
                fontSize(24.px)
                fontWeight(600)
                color(Color("#2C3E50"))
                margin(0.px, 0.px, 24.px, 0.px)
            }
        }) {
            Text("Weekly Schedule")
        }
        
        // Schedule Grid
        Div({
            style {
                display(DisplayStyle.Grid)
                gridTemplateColumns("120px repeat(7, 1fr)"
            }
        }) {
            // Header row
            ScheduleHeader("Employee", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun")
            
            // Schedule rows
            ScheduleRow("John Smith", "8-5", "8-5", "8-5", "8-5", "8-5", "Off", "Off")
            ScheduleRow("Maria Garcia", "7-4", "7-4", "7-4", "7-4", "7-4", "8-2", "Off")
            ScheduleRow("David Chen", "9-6", "9-6", "Off", "9-6", "9-6", "Off", "Off")
            ScheduleRow("Sarah Johnson", "6-3", "6-3", "6-3", "6-3", "6-3", "Off", "Off")
            ScheduleRow("Michael Brown", "7-4", "7-4", "7-4", "7-4", "7-4", "8-2", "Off")
        }
    }
}

@Composable
private fun ScheduleHeader(vararg headers: String) {
    headers.forEach { header ->
        Div({
            style {
                padding(12.px, 8.px)
                backgroundColor(Color("#F5F5F5"))
                border(1.px, LineStyle.Solid, Color("#E0E0E0"))
                fontSize(14.px)
                fontWeight(600)
                textAlign(TextAlign.Center)
                color(Color("#2C3E50"))
            }
        }) {
            Text(header)
        }
    }
}

@Composable
private fun ScheduleRow(employee: String, vararg shifts: String) {
    Div({
        style {
            padding(12.px, 8.px)
            border(1.px, LineStyle.Solid, Color("#E0E0E0"))
            fontSize(14.px)
            fontWeight(600)
            color(Color("#2C3E50"))
        }
    }) {
        Text(employee)
    }
    
    shifts.forEach { shift ->
        Div({
            style {
                padding(12.px, 8.px)
                border(1.px, LineStyle.Solid, Color("#E0E0E0"))
                fontSize(14.px)
                textAlign(TextAlign.Center)
                backgroundColor(if (shift == "Off") Color("#FFF3E0") else Color("#E8F5E8"))
                color(if (shift == "Off") Color("#E65100") else Color("#2E7D32"))
            }
        }) {
            Text(shift)
        }
    }
}

@Composable
private fun RolesView() {
    Div({
        style {
            display(DisplayStyle.Grid)
            gridTemplateColumns("repeat(auto-fill, minmax(300px, 1fr))")
            gap(24.px)
        }
    }) {
        RoleCard(
            title = "Farm Manager",
            description = "Oversees all farm operations and manages staff",
            responsibilities = listOf(
                "Strategic planning and decision making",
                "Staff management and supervision",
                "Budget and resource allocation",
                "Quality control and compliance"
            ),
            requirements = listOf(
                "Bachelor's degree in Agriculture",
                "5+ years farm management experience",
                "Strong leadership skills",
                "Knowledge of modern farming practices"
            ),
            salary = "$60,000 - $80,000"
        )
        
        RoleCard(
            title = "Livestock Specialist",
            description = "Manages animal health, breeding, and care programs",
            responsibilities = listOf(
                "Animal health monitoring",
                "Breeding program management",
                "Feed and nutrition planning",
                "Veterinary coordination"
            ),
            requirements = listOf(
                "Degree in Animal Science or related field",
                "3+ years livestock experience",
                "Knowledge of animal behavior",
                "Veterinary certification preferred"
            ),
            salary = "$45,000 - $60,000"
        )
        
        RoleCard(
            title = "Crop Specialist",
            description = "Manages crop production and field operations",
            responsibilities = listOf(
                "Crop planning and rotation",
                "Soil health management",
                "Pest and disease control",
                "Harvest planning and execution"
            ),
            requirements = listOf(
                "Degree in Agronomy or Crop Science",
                "3+ years crop management experience",
                "Knowledge of sustainable practices",
                "Equipment operation skills"
            ),
            salary = "$40,000 - $55,000"
        )
    }
}

@Composable
private fun RoleCard(
    title: String,
    description: String,
    responsibilities: List<String>,
    requirements: List<String>,
    salary: String
) {
    Div({
        style {
            backgroundColor(Color.white)
            borderRadius(12.px)
            padding(24.px)
            boxShadow(0.px, 4.px, 12.px, Color("rgba(0,0,0,0.1)"))
        }
    }) {
        H3({
            style {
                fontSize(20.px)
                fontWeight(600)
                color(Color("#2C3E50"))
                margin(0.px, 0.px, 8.px, 0.px)
            }
        }) {
            Text(title)
        }
        
        P({
            style {
                fontSize(14.px)
                color(Color("#757575"))
                margin(0.px, 0.px, 16.px, 0.px)
            }
        }) {
            Text(description)
        }
        
        Div({
            style {
                marginBottom(16.px)
            }
        }) {
            H4({
                style {
                    fontSize(16.px)
                    fontWeight(600)
                    color(Color("#2C3E50"))
                    margin(0.px, 0.px, 8.px, 0.px)
                }
            }) {
                Text("Responsibilities:")
            }
            Ul {
                responsibilities.forEach { responsibility ->
                    Li({
                        style {
                            fontSize(14.px)
                            color(Color("#2C3E50"))
                            marginBottom(4.px)
                        }
                    }) {
                        Text(responsibility)
                    }
                }
            }
        }
        
        Div({
            style {
                marginBottom(16.px)
            }
        }) {
            H4({
                style {
                    fontSize(16.px)
                    fontWeight(600)
                    color(Color("#2C3E50"))
                    margin(0.px, 0.px, 8.px, 0.px)
                }
            }) {
                Text("Requirements:")
            }
            Ul {
                requirements.forEach { requirement ->
                    Li({
                        style {
                            fontSize(14.px)
                            color(Color("#2C3E50"))
                            marginBottom(4.px)
                        }
                    }) {
                        Text(requirement)
                    }
                }
            }
        }
        
        Div({
            style {
                padding(12.px, 16.px)
                backgroundColor(Color("#E8F5E8"))
                borderRadius(8.px)
                textAlign(TextAlign.Center)
            }
        }) {
            Span({
                style {
                    fontSize(16.px)
                    fontWeight(600)
                    color(Color("#2E7D32"))
                }
            }) {
                Text("Salary: $salary")
            }
        }
    }
}

@Composable
private fun AddEmployeeModal(onClose: () -> Unit, onSave: (Map<String, String>) -> Unit) {
    var name by remember { mutableStateOf("") }
    var email by remember { mutableStateOf("") }
    var phone by remember { mutableStateOf("") }
    var role by remember { mutableStateOf("worker") }
    var department by remember { mutableStateOf("operations") }
    var hireDate by remember { mutableStateOf("") }
    
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
                    Text("Add New Employee")
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
                FormField("Full Name", name) { name = it }
                FormField("Email", email) { email = it }
                FormField("Phone", phone) { phone = it }
                FormField("Hire Date", hireDate) { hireDate = it }
                
                // Role Select
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
                        Text("Role")
                    }
                    Select({
                        style {
                            padding(12.px, 16.px)
                            border(1.px, LineStyle.Solid, Color("#E0E0E0"))
                            borderRadius(8.px)
                            fontSize(16.px)
                        }
                        value(role)
                        onChange { role = it.value }
                    }) {
                        Option { attrs { value("manager") }; Text("Manager") }
                        Option { attrs { value("specialist") }; Text("Specialist") }
                        Option { attrs { value("supervisor") }; Text("Supervisor") }
                        Option { attrs { value("worker") }; Text("Worker") }
                    }
                }
                
                // Department Select
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
                        Text("Department")
                    }
                    Select({
                        style {
                            padding(12.px, 16.px)
                            border(1.px, LineStyle.Solid, Color("#E0E0E0"))
                            borderRadius(8.px)
                            fontSize(16.px)
                        }
                        value(department)
                        onChange { department = it.value }
                    }) {
                        Option { attrs { value("management") }; Text("Management") }
                        Option { attrs { value("livestock") }; Text("Livestock") }
                        Option { attrs { value("crops") }; Text("Crops") }
                        Option { attrs { value("equipment") }; Text("Equipment") }
                        Option { attrs { value("operations") }; Text("Operations") }
                        Option { attrs { value("quality") }; Text("Quality") }
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
                            "email" to email,
                            "phone" to phone,
                            "role" to role,
                            "department" to department,
                            "hireDate" to hireDate
                        ))
                    }
                }) {
                    Text("Add Employee")
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