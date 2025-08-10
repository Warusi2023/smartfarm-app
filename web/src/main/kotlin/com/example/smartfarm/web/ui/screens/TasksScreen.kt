package com.example.smartfarm.web.ui.screens

import androidx.compose.runtime.*
import androidx.compose.web.elements.*
import androidx.compose.web.css.*
import com.example.smartfarm.web.ui.theme.AppTheme

@Composable
fun TasksScreen() {
    var showAddTask by remember { mutableStateOf(false) }
    var tasks by remember { mutableStateOf(sampleTasks) }
    var selectedTask by remember { mutableStateOf<Task?>(null) }
    var filterStatus by remember { mutableStateOf("all") }

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
                Text("📋 Task Management")
            }
            
            Button({
                onClick { showAddTask = true }
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
                Text("+ Add Task")
            }
        }

        // Task Stats
        Div({
            style {
                display(DisplayStyle.Grid)
                gridTemplateColumns("repeat(auto-fit, minmax(200px, 1fr))")
                gap(AppTheme.spacing.large)
                marginBottom(AppTheme.spacing.xlarge)
            }
        }) {
            val totalTasks = tasks.size
            val completedTasks = tasks.count { it.status == "Completed" }
            val pendingTasks = tasks.count { it.status == "Pending" }
            val overdueTasks = tasks.count { it.status == "Overdue" }
            
            StatCard("Total Tasks", totalTasks.toString(), "tasks", Color("#2196F3"))
            StatCard("Completed", completedTasks.toString(), "done", Color("#4CAF50"))
            StatCard("Pending", pendingTasks.toString(), "to do", Color("#FF9800"))
            StatCard("Overdue", overdueTasks.toString(), "late", Color("#F44336"))
        }

        // Filter Controls
        Div({
            style {
                display(DisplayStyle.Flex)
                gap(AppTheme.spacing.medium)
                marginBottom(AppTheme.spacing.large)
                flexWrap("wrap")
            }
        }) {
            FilterButton("All", "all", filterStatus) { filterStatus = it }
            FilterButton("Pending", "pending", filterStatus) { filterStatus = it }
            FilterButton("In Progress", "in-progress", filterStatus) { filterStatus = it }
            FilterButton("Completed", "completed", filterStatus) { filterStatus = it }
            FilterButton("Overdue", "overdue", filterStatus) { filterStatus = it }
        }

        // Tasks List
        TasksList(
            tasks = tasks.filter { 
                when (filterStatus) {
                    "pending" -> it.status == "Pending"
                    "in-progress" -> it.status == "In Progress"
                    "completed" -> it.status == "Completed"
                    "overdue" -> it.status == "Overdue"
                    else -> true
                }
            },
            onTaskClick = { selectedTask = it },
            onStatusChange = { taskId, newStatus ->
                tasks = tasks.map { if (it.id == taskId) it.copy(status = newStatus) else it }
            }
        )
    }

    // Add Task Modal
    if (showAddTask) {
        AddTaskModal(
            onClose = { showAddTask = false },
            onAdd = { newTask ->
                tasks = listOf(newTask) + tasks
                showAddTask = false
            }
        )
    }

    // Task Details Modal
    selectedTask?.let { task ->
        TaskDetailsModal(
            task = task,
            onClose = { selectedTask = null },
            onUpdate = { updatedTask ->
                tasks = tasks.map { if (it.id == updatedTask.id) updatedTask else it }
                selectedTask = null
            }
        )
    }
}

@Composable
private fun StatCard(title: String, value: String, subtitle: String, color: Color) {
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
                color(color)
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
private fun FilterButton(text: String, filter: String, activeFilter: String, onSelect: (String) -> Unit) {
    val isActive = activeFilter == filter
    Button({
        onClick { onSelect(filter) }
        style {
            backgroundColor(if (isActive) AppTheme.primaryColor else AppTheme.surfaceColor)
            color(if (isActive) Color.white else AppTheme.textColor)
            border(1.px, LineStyle.Solid, if (isActive) AppTheme.primaryColor else AppTheme.backgroundColor)
            padding(AppTheme.spacing.small, AppTheme.spacing.medium)
            borderRadius(AppTheme.borderRadius)
            cursor("pointer")
            fontSize(14.px)
            fontWeight(if (isActive) "bold" else "normal")
        }
    }) {
        Text(text)
    }
}

@Composable
private fun TasksList(
    tasks: List<Task>,
    onTaskClick: (Task) -> Unit,
    onStatusChange: (Int, String) -> Unit
) {
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
                gridTemplateColumns("2fr 1fr 1fr 1fr 1fr 1fr")
                gap(AppTheme.spacing.medium)
                fontWeight("bold")
                color(AppTheme.textSecondaryColor)
                fontSize(14.px)
            }
        }) {
            Text("Task")
            Text("Priority")
            Text("Due Date")
            Text("Status")
            Text("Assigned To")
            Text("Actions")
        }
        
        // Task rows
        tasks.forEach { task ->
            TaskRow(task, onTaskClick, onStatusChange)
        }
    }
}

@Composable
private fun TaskRow(
    task: Task,
    onTaskClick: (Task) -> Unit,
    onStatusChange: (Int, String) -> Unit
) {
    Div({
        style {
            padding(AppTheme.spacing.medium)
            borderBottom(1.px, LineStyle.Solid, AppTheme.backgroundColor)
            display(DisplayStyle.Grid)
            gridTemplateColumns("2fr 1fr 1fr 1fr 1fr 1fr")
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
            Text(task.title)
        }
        
        Div({
            style {
                backgroundColor(when(task.priority) {
                    "High" -> Color("#F44336")
                    "Medium" -> Color("#FF9800")
                    "Low" -> Color("#4CAF50")
                    else -> Color("#757575")
                })
                color(Color.white)
                padding(2.px, 8.px)
                borderRadius(4.px)
                fontSize(12.px)
                textAlign("center")
                width("fit-content")
            }
        }) {
            Text(task.priority)
        }
        
        Div({
            style {
                color(AppTheme.textColor)
            }
        }) {
            Text(task.dueDate)
        }
        
        Div({
            style {
                backgroundColor(when(task.status) {
                    "Completed" -> Color("#4CAF50")
                    "In Progress" -> Color("#2196F3")
                    "Pending" -> Color("#FF9800")
                    "Overdue" -> Color("#F44336")
                    else -> Color("#757575")
                })
                color(Color.white)
                padding(2.px, 8.px)
                borderRadius(4.px)
                fontSize(12.px)
                textAlign("center")
                width("fit-content")
            }
        }) {
            Text(task.status)
        }
        
        Div({
            style {
                color(AppTheme.textColor)
            }
        }) {
            Text(task.assignedTo)
        }
        
        Div({
            style {
                display(DisplayStyle.Flex)
                gap(AppTheme.spacing.small)
            }
        }) {
            Button({
                onClick { onTaskClick(task) }
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
            
            Select({
                value = task.status
                onChange { onStatusChange(task.id, it.value) }
                style {
                    backgroundColor(AppTheme.secondaryColor)
                    color(Color.white)
                    border(0.px)
                    padding(4.px, 8.px)
                    borderRadius(4.px)
                    cursor("pointer")
                    fontSize(12.px)
                }
            }) {
                Option { Text("Pending") }
                Option { Text("In Progress") }
                Option { Text("Completed") }
                Option { Text("Overdue") }
            }
        }
    }
}

@Composable
private fun AddTaskModal(onClose: () -> Unit, onAdd: (Task) -> Unit) {
    var title by remember { mutableStateOf("") }
    var description by remember { mutableStateOf("") }
    var priority by remember { mutableStateOf("Medium") }
    var dueDate by remember { mutableStateOf("") }
    var assignedTo by remember { mutableStateOf("") }
    var category by remember { mutableStateOf("General") }

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
                Text("Add New Task")
            }

            Div({ style { marginBottom(AppTheme.spacing.medium) } }) {
                Label({ style { display(DisplayStyle.Block); marginBottom(AppTheme.spacing.small) } }) {
                    Text("Task Title")
                }
                Input({
                    value = title
                    onInput { title = it.value }
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
                    Text("Description")
                }
                TextArea({
                    value = description
                    onInput { description = it.value }
                    style {
                        width(100.percent)
                        padding(AppTheme.spacing.small)
                        border(1.px, LineStyle.Solid, AppTheme.backgroundColor)
                        borderRadius(AppTheme.borderRadius)
                        minHeight(80.px)
                        resize("vertical")
                    }
                })
            }

            Div({ style { marginBottom(AppTheme.spacing.medium) } }) {
                Label({ style { display(DisplayStyle.Block); marginBottom(AppTheme.spacing.small) } }) {
                    Text("Priority")
                }
                Select({
                    value = priority
                    onChange { priority = it.value }
                    style {
                        width(100.percent)
                        padding(AppTheme.spacing.small)
                        border(1.px, LineStyle.Solid, AppTheme.backgroundColor)
                        borderRadius(AppTheme.borderRadius)
                    }
                }) {
                    Option { Text("Low") }
                    Option { Text("Medium") }
                    Option { Text("High") }
                }
            }

            Div({ style { marginBottom(AppTheme.spacing.medium) } }) {
                Label({ style { display(DisplayStyle.Block); marginBottom(AppTheme.spacing.small) } }) {
                    Text("Category")
                }
                Select({
                    value = category
                    onChange { category = it.value }
                    style {
                        width(100.percent)
                        padding(AppTheme.spacing.small)
                        border(1.px, LineStyle.Solid, AppTheme.backgroundColor)
                        borderRadius(AppTheme.borderRadius)
                    }
                }) {
                    Option { Text("General") }
                    Option { Text("Livestock") }
                    Option { Text("Crops") }
                    Option { Text("Equipment") }
                    Option { Text("Maintenance") }
                    Option { Text("Harvest") }
                }
            }

            Div({ style { marginBottom(AppTheme.spacing.medium) } }) {
                Label({ style { display(DisplayStyle.Block); marginBottom(AppTheme.spacing.small) } }) {
                    Text("Due Date")
                }
                Input({
                    type = InputType.Date
                    value = dueDate
                    onInput { dueDate = it.value }
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
                    Text("Assigned To")
                }
                Input({
                    value = assignedTo
                    onInput { assignedTo = it.value }
                    style {
                        width(100.percent)
                        padding(AppTheme.spacing.small)
                        border(1.px, LineStyle.Solid, AppTheme.backgroundColor)
                        borderRadius(AppTheme.borderRadius)
                    }
                })
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
                        if (title.isNotBlank() && dueDate.isNotBlank()) {
                            onAdd(Task(
                                id = (sampleTasks.maxOfOrNull { it.id } ?: 0) + 1,
                                title = title,
                                description = description,
                                priority = priority,
                                category = category,
                                dueDate = dueDate,
                                assignedTo = assignedTo,
                                status = "Pending"
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
                    Text("Add Task")
                }
            }
        }
    }
}

@Composable
private fun TaskDetailsModal(
    task: Task,
    onClose: () -> Unit,
    onUpdate: (Task) -> Unit
) {
    var title by remember { mutableStateOf(task.title) }
    var description by remember { mutableStateOf(task.description) }
    var priority by remember { mutableStateOf(task.priority) }
    var dueDate by remember { mutableStateOf(task.dueDate) }
    var assignedTo by remember { mutableStateOf(task.assignedTo) }
    var category by remember { mutableStateOf(task.category) }
    var status by remember { mutableStateOf(task.status) }

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
                Text("Task Details")
            }

            Div({ style { marginBottom(AppTheme.spacing.medium) } }) {
                Label({ style { display(DisplayStyle.Block); marginBottom(AppTheme.spacing.small) } }) {
                    Text("Task Title")
                }
                Input({
                    value = title
                    onInput { title = it.value }
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
                    Text("Description")
                }
                TextArea({
                    value = description
                    onInput { description = it.value }
                    style {
                        width(100.percent)
                        padding(AppTheme.spacing.small)
                        border(1.px, LineStyle.Solid, AppTheme.backgroundColor)
                        borderRadius(AppTheme.borderRadius)
                        minHeight(80.px)
                        resize("vertical")
                    }
                })
            }

            Div({ style { marginBottom(AppTheme.spacing.medium) } }) {
                Label({ style { display(DisplayStyle.Block); marginBottom(AppTheme.spacing.small) } }) {
                    Text("Priority")
                }
                Select({
                    value = priority
                    onChange { priority = it.value }
                    style {
                        width(100.percent)
                        padding(AppTheme.spacing.small)
                        border(1.px, LineStyle.Solid, AppTheme.backgroundColor)
                        borderRadius(AppTheme.borderRadius)
                    }
                }) {
                    Option { Text("Low") }
                    Option { Text("Medium") }
                    Option { Text("High") }
                }
            }

            Div({ style { marginBottom(AppTheme.spacing.medium) } }) {
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
                    Option { Text("Pending") }
                    Option { Text("In Progress") }
                    Option { Text("Completed") }
                    Option { Text("Overdue") }
                }
            }

            Div({ style { marginBottom(AppTheme.spacing.medium) } }) {
                Label({ style { display(DisplayStyle.Block); marginBottom(AppTheme.spacing.small) } }) {
                    Text("Category")
                }
                Select({
                    value = category
                    onChange { category = it.value }
                    style {
                        width(100.percent)
                        padding(AppTheme.spacing.small)
                        border(1.px, LineStyle.Solid, AppTheme.backgroundColor)
                        borderRadius(AppTheme.borderRadius)
                    }
                }) {
                    Option { Text("General") }
                    Option { Text("Livestock") }
                    Option { Text("Crops") }
                    Option { Text("Equipment") }
                    Option { Text("Maintenance") }
                    Option { Text("Harvest") }
                }
            }

            Div({ style { marginBottom(AppTheme.spacing.medium) } }) {
                Label({ style { display(DisplayStyle.Block); marginBottom(AppTheme.spacing.small) } }) {
                    Text("Due Date")
                }
                Input({
                    type = InputType.Date
                    value = dueDate
                    onInput { dueDate = it.value }
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
                    Text("Assigned To")
                }
                Input({
                    value = assignedTo
                    onInput { assignedTo = it.value }
                    style {
                        width(100.percent)
                        padding(AppTheme.spacing.small)
                        border(1.px, LineStyle.Solid, AppTheme.backgroundColor)
                        borderRadius(AppTheme.borderRadius)
                    }
                })
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
                        if (title.isNotBlank() && dueDate.isNotBlank()) {
                            onUpdate(task.copy(
                                title = title,
                                description = description,
                                priority = priority,
                                category = category,
                                dueDate = dueDate,
                                assignedTo = assignedTo,
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

data class Task(
    val id: Int,
    val title: String,
    val description: String,
    val priority: String,
    val category: String,
    val dueDate: String,
    val assignedTo: String,
    val status: String
)

private val sampleTasks = listOf(
    Task(1, "Feed Livestock", "Morning feeding for all animals", "High", "Livestock", "2024-01-15", "John", "Completed"),
    Task(2, "Harvest Wheat", "Harvest wheat field A", "High", "Crops", "2024-01-20", "Mike", "In Progress"),
    Task(3, "Equipment Maintenance", "Service tractor and irrigation system", "Medium", "Equipment", "2024-01-25", "Sarah", "Pending"),
    Task(4, "Veterinary Check", "Annual health check for cattle", "Medium", "Livestock", "2024-01-18", "Dr. Smith", "Pending"),
    Task(5, "Plant Corn", "Plant corn in field B", "High", "Crops", "2024-01-12", "John", "Overdue"),
    Task(6, "Fence Repair", "Fix broken fence in north pasture", "Low", "Maintenance", "2024-01-30", "Mike", "Pending")
) 