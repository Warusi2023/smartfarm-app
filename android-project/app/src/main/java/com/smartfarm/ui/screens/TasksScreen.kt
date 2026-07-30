package com.smartfarm.ui.screens

import androidx.compose.foundation.horizontalScroll
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.rememberScrollState
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Add
import androidx.compose.material.icons.filled.CheckCircle
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import com.smartfarm.shared.data.farm.SelectedFarmStore
import com.smartfarm.shared.data.model.dto.TaskDto
import com.smartfarm.shared.ui.viewmodel.AuthViewModel
import com.smartfarm.shared.ui.viewmodel.FarmViewModel
import com.smartfarm.shared.ui.viewmodel.TaskListFilter
import com.smartfarm.shared.ui.viewmodel.TaskViewModel
import com.smartfarm.ui.components.CurrentFarmBanner
import com.smartfarm.ui.components.EmptyState
import com.smartfarm.ui.components.ErrorState
import com.smartfarm.ui.components.LoadingState
import com.smartfarm.ui.theme.SmartFarmColors
import com.smartfarm.ui.theme.SmartFarmSpacing
import org.koin.compose.koinInject

@Composable
fun TasksScreen(
    viewModel: TaskViewModel = koinInject(),
    farmViewModel: FarmViewModel = koinInject(),
    authViewModel: AuthViewModel = koinInject(),
    selectedFarmStore: SelectedFarmStore = koinInject()
) {
    val uiState by viewModel.uiState.collectAsState()
    val farmState by farmViewModel.uiState.collectAsState()
    val authState by authViewModel.uiState.collectAsState()
    val selectedFarm by selectedFarmStore.selectedFarm.collectAsState()
    val currentUserId = authState.user?.id
    val farmNames = remember(farmState.farms) {
        farmState.farms.associateBy({ it.id }, { it.name })
    }
    val visibleTasks = remember(uiState.tasks, uiState.filter, currentUserId) {
        uiState.visibleTasks(currentUserId)
    }

    var showDialog by remember { mutableStateOf(false) }
    val snackbarHostState = remember { SnackbarHostState() }

    LaunchedEffect(Unit) {
        viewModel.loadTasks()
        farmViewModel.loadFarms()
    }

    LaunchedEffect(farmState.farms) {
        selectedFarmStore.syncWithAvailableFarms(
            farmState.farms.map { it.id to it.name }
        )
    }

    LaunchedEffect(uiState.actionError) {
        val message = uiState.actionError
        if (!message.isNullOrBlank()) {
            snackbarHostState.showSnackbar(
                message = friendlyTaskError(message),
                withDismissAction = true
            )
            viewModel.clearActionError()
        }
    }

    Scaffold(
        containerColor = MaterialTheme.colorScheme.background,
        snackbarHost = { SnackbarHost(snackbarHostState) },
        floatingActionButton = {
            FloatingActionButton(
                onClick = { showDialog = true },
                containerColor = MaterialTheme.colorScheme.primary,
                contentColor = MaterialTheme.colorScheme.onPrimary
            ) {
                Icon(Icons.Default.Add, contentDescription = "Add Task")
            }
        }
    ) { padding ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(padding)
        ) {
            CurrentFarmBanner(
                farmName = selectedFarm?.name,
                hint = "Current farm",
                modifier = Modifier.padding(
                    horizontal = SmartFarmSpacing.lg,
                    vertical = SmartFarmSpacing.sm
                )
            )
            TaskFilterRow(
                selected = uiState.filter,
                showMine = !currentUserId.isNullOrBlank(),
                onSelect = viewModel::setFilter,
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(horizontal = SmartFarmSpacing.lg, vertical = SmartFarmSpacing.sm)
            )

            when {
                uiState.isLoading && uiState.tasks.isEmpty() -> {
                    LoadingState(Modifier.weight(1f))
                }
                uiState.error != null && uiState.tasks.isEmpty() -> {
                    ErrorState(
                        message = friendlyTaskError(uiState.error ?: "Unknown error"),
                        onRetry = { viewModel.refresh() },
                        modifier = Modifier.weight(1f)
                    )
                }
                uiState.tasks.isEmpty() -> {
                    EmptyState(
                        title = "No farm tasks yet",
                        message = "Create a task for your farm team — same board used in the browser.",
                        icon = Icons.Default.CheckCircle,
                        modifier = Modifier.weight(1f)
                    )
                }
                visibleTasks.isEmpty() -> {
                    EmptyState(
                        title = "No tasks in this filter",
                        message = "Try another filter, or create a new farm task.",
                        icon = Icons.Default.CheckCircle,
                        modifier = Modifier.weight(1f)
                    )
                }
                else -> {
                    LazyColumn(
                        modifier = Modifier
                            .weight(1f)
                            .padding(horizontal = SmartFarmSpacing.lg),
                        verticalArrangement = Arrangement.spacedBy(SmartFarmSpacing.sm),
                        contentPadding = PaddingValues(bottom = SmartFarmSpacing.xxl)
                    ) {
                        items(visibleTasks, key = { it.id }) { task ->
                            TaskCard(
                                task = task,
                                farmName = farmNames[task.farmId],
                                onComplete = { viewModel.completeTask(task) },
                                onCancel = { viewModel.cancelTask(task) }
                            )
                        }
                    }
                }
            }
        }
    }

    if (showDialog) {
        com.smartfarm.ui.screens.forms.AddTaskDialog(
            farms = farmState.farms,
            preferredFarmId = selectedFarm?.id,
            onDismiss = { showDialog = false },
            onSave = { task ->
                viewModel.createTask(task)
                showDialog = false
            }
        )
    }
}

@Composable
private fun TaskFilterRow(
    selected: TaskListFilter,
    showMine: Boolean,
    onSelect: (TaskListFilter) -> Unit,
    modifier: Modifier = Modifier
) {
    val filters = buildList {
        add(TaskListFilter.ALL to "All")
        add(TaskListFilter.OPEN to "Open")
        add(TaskListFilter.IN_PROGRESS to "In progress")
        add(TaskListFilter.DONE to "Done")
        add(TaskListFilter.CANCELLED to "Cancelled")
        if (showMine) add(TaskListFilter.MINE to "Mine")
    }

    Row(
        modifier = modifier.horizontalScroll(rememberScrollState()),
        horizontalArrangement = Arrangement.spacedBy(SmartFarmSpacing.sm)
    ) {
        filters.forEach { (filter, label) ->
            FilterChip(
                selected = selected == filter,
                onClick = { onSelect(filter) },
                label = { Text(label) }
            )
        }
    }
}

@Composable
private fun TaskCard(
    task: TaskDto,
    farmName: String?,
    onComplete: () -> Unit,
    onCancel: () -> Unit
) {
    val status = task.status.lowercase()
    val actionable = status == "open" || status == "in_progress"
    val assigneeLabel = task.assigneeName?.takeIf { it.isNotBlank() }
        ?: task.assigneeEmail?.takeIf { it.isNotBlank() }
        ?: task.assignedTo?.takeIf { it.isNotBlank() }

    Card(
        modifier = Modifier.fillMaxWidth(),
        shape = MaterialTheme.shapes.medium,
        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
        elevation = CardDefaults.cardElevation(defaultElevation = 1.dp)
    ) {
        Column(modifier = Modifier.padding(SmartFarmSpacing.lg)) {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.Top
            ) {
                Text(
                    text = task.title,
                    style = MaterialTheme.typography.titleMedium,
                    modifier = Modifier.weight(1f),
                    maxLines = 2,
                    overflow = TextOverflow.Ellipsis
                )
                task.priority?.takeIf { it.isNotBlank() }?.let { priority ->
                    PriorityBadge(priority = priority)
                }
            }

            if (!farmName.isNullOrBlank()) {
                Spacer(Modifier.height(SmartFarmSpacing.xs))
                Text(
                    text = farmName,
                    style = MaterialTheme.typography.labelLarge,
                    color = MaterialTheme.colorScheme.primary
                )
            }

            val description = task.description
            if (!description.isNullOrBlank()) {
                Spacer(Modifier.height(SmartFarmSpacing.xs))
                Text(
                    text = description,
                    style = MaterialTheme.typography.bodyMedium,
                    color = MaterialTheme.colorScheme.onSurfaceVariant,
                    maxLines = 3,
                    overflow = TextOverflow.Ellipsis
                )
            }

            Spacer(Modifier.height(SmartFarmSpacing.sm))
            Row(
                horizontalArrangement = Arrangement.spacedBy(SmartFarmSpacing.sm),
                verticalAlignment = Alignment.CenterVertically
            ) {
                AssistChip(
                    onClick = {},
                    enabled = false,
                    label = { Text(formatStatus(task.status)) }
                )
                val due = task.dueAt ?: task.dueDate
                if (!due.isNullOrBlank()) {
                    Text(
                        text = "Due ${formatDue(due)}",
                        style = MaterialTheme.typography.bodySmall,
                        color = MaterialTheme.colorScheme.onSurfaceVariant
                    )
                }
            }

            if (!assigneeLabel.isNullOrBlank()) {
                Spacer(Modifier.height(SmartFarmSpacing.xs))
                Text(
                    text = "Assigned to $assigneeLabel",
                    style = MaterialTheme.typography.bodySmall,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )
            } else if (!task.assignedToUserId.isNullOrBlank()) {
                Spacer(Modifier.height(SmartFarmSpacing.xs))
                Text(
                    text = "Assigned",
                    style = MaterialTheme.typography.bodySmall,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )
            }

            if (actionable) {
                Spacer(Modifier.height(SmartFarmSpacing.md))
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.spacedBy(SmartFarmSpacing.sm),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Button(
                        onClick = onComplete,
                        modifier = Modifier.weight(1f)
                    ) {
                        Text("Complete")
                    }
                    OutlinedButton(
                        onClick = onCancel,
                        modifier = Modifier.weight(1f)
                    ) {
                        Text("Cancel task")
                    }
                }
            }
        }
    }
}

@Composable
private fun PriorityBadge(priority: String) {
    val normalized = priority.lowercase()
    val container = when (normalized) {
        "urgent" -> SmartFarmColors.ErrorContainer
        "high" -> SmartFarmColors.TertiaryContainer
        "medium" -> SmartFarmColors.PrimaryContainer
        else -> MaterialTheme.colorScheme.surfaceVariant
    }
    val content = when (normalized) {
        "urgent" -> SmartFarmColors.OnErrorContainer
        "high" -> SmartFarmColors.OnTertiaryContainer
        "medium" -> SmartFarmColors.OnPrimaryContainer
        else -> MaterialTheme.colorScheme.onSurfaceVariant
    }
    Surface(
        shape = MaterialTheme.shapes.small,
        color = container
    ) {
        Text(
            text = normalized.replaceFirstChar { it.uppercase() },
            style = MaterialTheme.typography.labelMedium,
            color = content,
            modifier = Modifier.padding(horizontal = 8.dp, vertical = 4.dp)
        )
    }
}

private fun formatStatus(status: String): String =
    status.replace('_', ' ').lowercase().replaceFirstChar { it.uppercase() }

private fun formatDue(raw: String): String {
    // Keep ISO readable without heavy date libs: prefer YYYY-MM-DD portion.
    return raw.take(10)
}

private fun friendlyTaskError(raw: String): String {
    val lower = raw.lowercase()
    return when {
        "permission" in lower || "forbidden" in lower || "insufficient" in lower ->
            "You don't have permission to update this task."
        "farmid" in lower || "farm id" in lower ->
            "Select a farm before managing this task."
        else -> raw.lineSequence().firstOrNull()?.take(180)
            ?: "Couldn't update that task. Please try again."
    }
}
