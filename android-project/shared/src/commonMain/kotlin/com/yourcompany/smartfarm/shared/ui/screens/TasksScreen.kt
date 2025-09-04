package com.yourcompany.smartfarm.shared.ui.screens

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ArrowBack
import androidx.compose.material.icons.filled.Add
import androidx.compose.material.icons.filled.Star
import androidx.compose.material.icons.rounded.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.yourcompany.smartfarm.shared.models.*
import com.yourcompany.smartfarm.shared.services.DataService
import kotlinx.coroutines.launch
import kotlin.math.abs

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun TasksScreen(
    dataService: DataService,
    onNavigateBack: () -> Unit
) {
    var tasks by remember { mutableStateOf<List<Task>>(emptyList()) }
    var farms by remember { mutableStateOf<List<Farm>>(emptyList()) }
    var isLoading by remember { mutableStateOf(true) }
    var error by remember { mutableStateOf<String?>(null) }
    var showAddTaskDialog by remember { mutableStateOf(false) }
    var selectedTask by remember { mutableStateOf<Task?>(null) }
    var showTaskDetailsDialog by remember { mutableStateOf(false) }
    var selectedStatus by remember { mutableStateOf<TaskStatus?>(null) }
    
    val scope = rememberCoroutineScope()
    
    // Load data when component is created
    LaunchedEffect(Unit) {
        try {
            isLoading = true
            val loadedTasks = dataService.getTasks()
            val loadedFarms = dataService.getFarms()
            tasks = loadedTasks
            farms = loadedFarms
        } catch (e: Exception) {
            error = e.message
        } finally {
            isLoading = false
        }
    }
    
    // Filter tasks based on selected status
    val filteredTasks = if (selectedStatus != null) {
        tasks.filter { it.status == selectedStatus }
    } else {
        tasks
    }
    
    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp)
    ) {
        // Header
        Row(
            modifier = Modifier.fillMaxWidth(),
            verticalAlignment = Alignment.CenterVertically
        ) {
            IconButton(onClick = onNavigateBack) {
                Icon(Icons.Default.ArrowBack, contentDescription = "Back")
            }
            
            Text(
                text = "📋 Task Management",
                fontSize = 24.sp,
                fontWeight = FontWeight.Bold,
                modifier = Modifier.weight(1f)
            )
            
            Button(
                onClick = { showAddTaskDialog = true },
                colors = ButtonDefaults.buttonColors(
                    containerColor = MaterialTheme.colorScheme.primary
                )
            ) {
                Icon(Icons.Default.Add, contentDescription = "Add Task")
                Spacer(modifier = Modifier.width(4.dp))
                Text("Add Task")
            }
        }
        
        Spacer(modifier = Modifier.height(16.dp))
        
        // Status Filter
        LazyRow(
            horizontalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            item {
                FilterChip(
                    selected = selectedStatus == null,
                    onClick = { selectedStatus = null },
                    label = { Text("All") }
                )
            }
            
            items(TaskStatus.values()) { status ->
                FilterChip(
                    selected = selectedStatus == status,
                    onClick = { selectedStatus = status },
                    label = { Text(status.name) }
                )
            }
        }
        
        Spacer(modifier = Modifier.height(16.dp))
        
        if (isLoading) {
            Box(
                modifier = Modifier.fillMaxSize(),
                contentAlignment = Alignment.Center
            ) {
                CircularProgressIndicator()
            }
        } else if (error != null) {
            Card(
                modifier = Modifier.fillMaxWidth(),
                colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.errorContainer)
            ) {
                Text(
                    text = "Error: $error",
                    modifier = Modifier.padding(16.dp),
                    color = MaterialTheme.colorScheme.onErrorContainer
                )
            }
        } else {
            if (filteredTasks.isEmpty()) {
                EmptyState(
                    message = if (selectedStatus != null) "No ${selectedStatus!!.name.lowercase()} tasks" else "No tasks found",
                    actionText = "Add your first task",
                    onAction = { showAddTaskDialog = true }
                )
            } else {
                LazyColumn(
                    verticalArrangement = Arrangement.spacedBy(12.dp)
                ) {
                    items(filteredTasks) { task ->
                        TaskCard(
                            task = task,
                            farm = farms.find { it.id == task.farmId },
                            onClick = {
                                selectedTask = task
                                showTaskDetailsDialog = true
                            },
                            onStatusChange = { newStatus ->
                                scope.launch {
                                    try {
                                        val updatedTask = dataService.updateTaskStatus(task.id, newStatus)
                                        if (updatedTask != null) {
                                            tasks = tasks.map { if (it.id == task.id) updatedTask else it }
                                        }
                                    } catch (e: Exception) {
                                        error = e.message
                                    }
                                }
                            }
                        )
                    }
                }
            }
        }
    }
    
    // Add Task Dialog
    if (showAddTaskDialog) {
        AddTaskDialog(
            farms = farms,
            onDismiss = { showAddTaskDialog = false },
            onTaskAdded = { newTask ->
                scope.launch {
                    try {
                        val addedTask = dataService.createTask(newTask)
                        tasks = tasks + addedTask
                        showAddTaskDialog = false
                    } catch (e: Exception) {
                        error = e.message
                    }
                }
            }
        )
    }
    
    // Task Details Dialog
    if (showTaskDetailsDialog && selectedTask != null) {
        TaskDetailsDialog(
            task = selectedTask!!,
            farm = farms.find { it.id == selectedTask!!.farmId },
            onDismiss = { showTaskDetailsDialog = false },
            onEdit = { /* TODO: Implement edit functionality */ }
        )
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
private fun TaskCard(
    task: Task,
    farm: Farm?,
    onClick: () -> Unit,
    onStatusChange: (TaskStatus) -> Unit
) {
    Card(
        modifier = Modifier.fillMaxWidth(),
        elevation = CardDefaults.cardElevation(defaultElevation = 2.dp),
        onClick = onClick
    ) {
        Column(
            modifier = Modifier.padding(16.dp)
        ) {
            Row(
                modifier = Modifier.fillMaxWidth(),
                verticalAlignment = Alignment.CenterVertically
            ) {
                Icon(
                    imageVector = when (task.category) {
                        TaskCategory.PLANTING -> Icons.Default.Star
                        TaskCategory.HARVESTING -> Icons.Default.Star
                        TaskCategory.IRRIGATION -> Icons.Default.Star
                        TaskCategory.FERTILIZATION -> Icons.Default.Star
                        TaskCategory.PEST_CONTROL -> Icons.Default.Star
                        TaskCategory.LIVESTOCK_CARE -> Icons.Default.Star
                        TaskCategory.EQUIPMENT_MAINTENANCE -> Icons.Default.Star
                        TaskCategory.FINANCIAL -> Icons.Default.Star
                        TaskCategory.ADMINISTRATIVE -> Icons.Default.Star
                        TaskCategory.OTHER -> Icons.Default.Star
                    },
                    contentDescription = "Task Category",
                    tint = MaterialTheme.colorScheme.primary
                )
                
                Spacer(modifier = Modifier.width(12.dp))
                
                Column(modifier = Modifier.weight(1f)) {
                    Text(
                        text = task.title,
                        fontSize = 16.sp,
                        fontWeight = FontWeight.Bold
                    )
                    Text(
                        text = task.description,
                        fontSize = 14.sp,
                        color = MaterialTheme.colorScheme.onSurfaceVariant,
                        maxLines = 2
                    )
                }
                
                PriorityChip(priority = task.priority)
            }
            
            Spacer(modifier = Modifier.height(8.dp))
            
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Column {
                    farm?.let { farm ->
                        Text(
                            text = farm.name,
                            fontSize = 12.sp,
                            color = MaterialTheme.colorScheme.onSurfaceVariant
                        )
                    }
                    
                    Text(
                        text = "Due: ${formatDate(task.dueDate)}",
                        fontSize = 12.sp,
                        color = if (isOverdue(task)) MaterialTheme.colorScheme.error else MaterialTheme.colorScheme.onSurfaceVariant
                    )
                }
                
                StatusChip(
                    status = task.status,
                    onStatusChange = onStatusChange
                )
            }
            
            if (task.estimatedHours != null) {
                Spacer(modifier = Modifier.height(4.dp))
                Text(
                    text = "Estimated: ${task.estimatedHours} hours",
                    fontSize = 12.sp,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )
            }
        }
    }
}

@Composable
private fun PriorityChip(priority: TaskPriority) {
    val color = when (priority) {
        TaskPriority.LOW -> MaterialTheme.colorScheme.primary
        TaskPriority.MEDIUM -> MaterialTheme.colorScheme.secondary
        TaskPriority.HIGH -> MaterialTheme.colorScheme.tertiary
        TaskPriority.URGENT -> MaterialTheme.colorScheme.error
    }
    
    SuggestionChip(
        onClick = { },
        label = { Text(priority.name) },
        colors = SuggestionChipDefaults.suggestionChipColors(
            containerColor = color.copy(alpha = 0.1f)
        )
    )
}

@Composable
private fun StatusChip(
    status: TaskStatus,
    onStatusChange: (TaskStatus) -> Unit
) {
    var showStatusMenu by remember { mutableStateOf(false) }
    
    Box {
        SuggestionChip(
            onClick = { showStatusMenu = true },
            label = { Text(status.name) },
            colors = SuggestionChipDefaults.suggestionChipColors(
                containerColor = when (status) {
                    TaskStatus.PENDING -> MaterialTheme.colorScheme.secondaryContainer
                    TaskStatus.IN_PROGRESS -> MaterialTheme.colorScheme.primaryContainer
                    TaskStatus.COMPLETED -> MaterialTheme.colorScheme.tertiaryContainer
                    TaskStatus.CANCELLED -> MaterialTheme.colorScheme.errorContainer
                    TaskStatus.OVERDUE -> MaterialTheme.colorScheme.errorContainer
                }
            )
        )
        
        DropdownMenu(
            expanded = showStatusMenu,
            onDismissRequest = { showStatusMenu = false }
        ) {
            TaskStatus.values().forEach { newStatus ->
                DropdownMenuItem(
                    text = { Text(newStatus.name) },
                    onClick = {
                        onStatusChange(newStatus)
                        showStatusMenu = false
                    }
                )
            }
        }
    }
}

@Composable
private fun EmptyState(
    message: String,
    actionText: String,
    onAction: () -> Unit
) {
    Column(
        modifier = Modifier.fillMaxSize(),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center
    ) {
        Icon(
            imageVector = Icons.Default.Star,
            contentDescription = null,
            modifier = Modifier.size(64.dp),
            tint = MaterialTheme.colorScheme.onSurfaceVariant
        )
        
        Spacer(modifier = Modifier.height(16.dp))
        
        Text(
            text = message,
            fontSize = 18.sp,
            color = MaterialTheme.colorScheme.onSurfaceVariant
        )
        
        Spacer(modifier = Modifier.height(16.dp))
        
        Button(onClick = onAction) {
            Text(actionText)
        }
    }
}

@Composable
private fun AddTaskDialog(
    farms: List<Farm>,
    onDismiss: () -> Unit,
    onTaskAdded: (Task) -> Unit
) {
    var title by remember { mutableStateOf("") }
    var description by remember { mutableStateOf("") }
    var selectedFarmId by remember { mutableStateOf<Long?>(null) }
    var priority by remember { mutableStateOf(TaskPriority.MEDIUM) }
    var category by remember { mutableStateOf(TaskCategory.OTHER) }
    var dueDate by remember { mutableStateOf("") }
    var estimatedHours by remember { mutableStateOf("") }
    var isFormValid by remember { mutableStateOf(false) }
    
    // Validate form
    LaunchedEffect(title, description, selectedFarmId, dueDate) {
        isFormValid = title.isNotBlank() && description.isNotBlank() && selectedFarmId != null && dueDate.isNotBlank()
    }
    
    AlertDialog(
        onDismissRequest = onDismiss,
        title = { Text("Add New Task") },
        text = {
            Column(
                verticalArrangement = Arrangement.spacedBy(16.dp)
            ) {
                OutlinedTextField(
                    value = title,
                    onValueChange = { title = it },
                    label = { Text("Task Title") },
                    modifier = Modifier.fillMaxWidth()
                )
                
                OutlinedTextField(
                    value = description,
                    onValueChange = { description = it },
                    label = { Text("Description") },
                    modifier = Modifier.fillMaxWidth(),
                    minLines = 3
                )
                
                // Farm Selection
                Text("Farm:", fontWeight = FontWeight.Medium)
                farms.forEach { farm ->
                    Row(
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        RadioButton(
                            selected = selectedFarmId == farm.id,
                            onClick = { selectedFarmId = farm.id }
                        )
                        Text(farm.name)
                    }
                }
                
                // Priority Selection
                Text("Priority:", fontWeight = FontWeight.Medium)
                TaskPriority.values().forEach { priorityOption ->
                    Row(
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        RadioButton(
                            selected = priority == priorityOption,
                            onClick = { priority = priorityOption }
                        )
                        Text(priorityOption.name)
                    }
                }
                
                // Category Selection
                Text("Category:", fontWeight = FontWeight.Medium)
                TaskCategory.values().forEach { categoryOption ->
                    Row(
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        RadioButton(
                            selected = category == categoryOption,
                            onClick = { category = categoryOption }
                        )
                        Text(categoryOption.name)
                    }
                }
                
                OutlinedTextField(
                    value = dueDate,
                    onValueChange = { dueDate = it },
                    label = { Text("Due Date (days from now)") },
                    modifier = Modifier.fillMaxWidth()
                )
                
                OutlinedTextField(
                    value = estimatedHours,
                    onValueChange = { estimatedHours = it },
                    label = { Text("Estimated Hours (optional)") },
                    modifier = Modifier.fillMaxWidth()
                )
            }
        },
        confirmButton = {
            Button(
                onClick = {
                    val task = Task(
                        title = title,
                        description = description,
                        farmId = selectedFarmId!!,
                        assignedTo = null, // TODO: Get from user context
                        priority = priority,
                        status = TaskStatus.PENDING,
                        dueDate = getCurrentTimeMillis() + (dueDate.toIntOrNull() ?: 0) * 24 * 60 * 60 * 1000,
                        category = category,
                        estimatedHours = estimatedHours.toDoubleOrNull()
                    )
                    onTaskAdded(task)
                },
                enabled = isFormValid
            ) {
                Text("Add Task")
            }
        },
        dismissButton = {
            TextButton(onClick = onDismiss) {
                Text("Cancel")
            }
        }
    )
}

@Composable
private fun TaskDetailsDialog(
    task: Task,
    farm: Farm?,
    onDismiss: () -> Unit,
    onEdit: () -> Unit
) {
    AlertDialog(
        onDismissRequest = onDismiss,
        title = { Text(task.title) },
        text = {
            Column(
                verticalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                DetailRow("Description", task.description)
                farm?.let { DetailRow("Farm", it.name) }
                DetailRow("Priority", task.priority.name)
                DetailRow("Status", task.status.name)
                DetailRow("Category", task.category.name)
                DetailRow("Due Date", formatDate(task.dueDate))
                task.estimatedHours?.let { DetailRow("Estimated Hours", "$it hours") }
                if (task.actualHours != null) DetailRow("Actual Hours", "${task.actualHours} hours") 
            }
        },
        confirmButton = {
            Row {
                TextButton(onClick = onEdit) {
                    Text("Edit")
                }
                TextButton(onClick = onDismiss) {
                    Text("Close")
                }
            }
        }
    )
}

@Composable
private fun DetailRow(
    label: String,
    value: String
) {
    Row(
        modifier = Modifier.fillMaxWidth(),
        horizontalArrangement = Arrangement.SpaceBetween
    ) {
        Text(
            text = label,
            fontWeight = FontWeight.Medium
        )
        Text(
            text = value,
            color = MaterialTheme.colorScheme.onSurfaceVariant
        )
    }
}

private fun formatDate(timestamp: Long): String {
    val days = (timestamp - getCurrentTimeMillis()) / (24 * 60 * 60 * 1000)
    return when {
        days < 0 -> "${abs(days)} days overdue"
        days == 0L -> "Today"
        days == 1L -> "Tomorrow"
        else -> "In $days days"
    }
}

private fun isOverdue(task: Task): Boolean {
    return task.status != TaskStatus.COMPLETED && task.dueDate < getCurrentTimeMillis()
}

// Platform-agnostic time function
internal expect fun getCurrentTimeMillis(): Long
