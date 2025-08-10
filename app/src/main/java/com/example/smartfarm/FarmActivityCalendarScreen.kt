package com.example.smartfarm.ui

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import com.example.smartfarm.data.model.FarmActivity
import com.example.smartfarm.data.model.FarmActivityViewModel
import com.example.smartfarm.data.model.ActivityType
import java.time.LocalDate
import java.time.YearMonth
import java.time.format.DateTimeFormatter
import com.example.smartfarm.util.GoogleCalendarHelper
import com.example.smartfarm.util.CalendarExportCallback
import android.app.Activity
import androidx.compose.ui.platform.LocalContext
import androidx.compose.material3.SnackbarHostState
import androidx.compose.material3.SnackbarHost
import androidx.compose.runtime.rememberCoroutineScope
import kotlinx.coroutines.launch
import com.google.api.services.calendar.model.Events
import com.google.api.services.calendar.model.Event
import java.time.ZoneId
import android.content.Context
import androidx.compose.ui.text.style.TextAlign
import com.google.android.gms.auth.api.signin.GoogleSignIn
import com.google.api.client.googleapis.extensions.android.gms.auth.GoogleAccountCredential
import com.google.api.client.extensions.android.http.AndroidHttp
import com.google.api.client.json.gson.GsonFactory
import com.google.api.services.calendar.Calendar
import com.google.api.services.calendar.CalendarScopes
import com.google.api.client.util.DateTime

// Color mapping for activity types
fun activityTypeColor(type: ActivityType): Color = when (type) {
    ActivityType.PLANTING -> Color(0xFF81C784)
    ActivityType.HARVESTING -> Color(0xFFFFB74D)
    ActivityType.IRRIGATION -> Color(0xFF64B5F6)
    ActivityType.FERTILIZING -> Color(0xFFDCE775)
    ActivityType.SPRAYING -> Color(0xFFBA68C8)
    ActivityType.MAINTENANCE -> Color(0xFFA1887F)
    ActivityType.OTHER -> Color(0xFF90A4AE)
}

@Composable
fun FarmActivityCalendarScreen(viewModel: FarmActivityViewModel) {
    val today: LocalDate = remember { LocalDate.now() }
    var selectedDate: LocalDate by remember { mutableStateOf(today) }
    var selectedEditActivity by remember { mutableStateOf<FarmActivity?>(null) }
    val allActivities by viewModel.allActivities.collectAsState()
    // Expand recurring activities for the current month
    val expandedActivities = remember(allActivities) {
        val expanded = mutableListOf<FarmActivity>()
        val yearMonth = YearMonth.now()
        val daysInMonth = yearMonth.lengthOfMonth()
        allActivities.forEach { act ->
            if (act.recurrence == null) {
                expanded.add(act)
            } else {
                val startDate = try { LocalDate.parse(act.date) } catch (_: Exception) { null }
                if (startDate != null) {
                    val freq = act.recurrence?.frequency
                    val interval = act.recurrence?.interval
                    if (freq != null && interval != null) {
                        var d = startDate!!
                        while (d.month == yearMonth.month && d.year == yearMonth.year && d.dayOfMonth <= daysInMonth) {
                            if (!d.isBefore(yearMonth.atDay(1))) {
                                expanded.add(act.copy(date = d.toString()))
                            }
                            d = when (freq) {
                                com.example.smartfarm.data.model.RecurrenceFrequency.DAILY -> d.plusDays(interval.toLong())
                                com.example.smartfarm.data.model.RecurrenceFrequency.WEEKLY -> d.plusWeeks(interval.toLong())
                                com.example.smartfarm.data.model.RecurrenceFrequency.MONTHLY -> d.plusMonths(interval.toLong())
                                else -> break
                            }
                        }
                    }
                }
            }
        }
        expanded
    }
    val activitiesByDay = expandedActivities.groupBy { it.date }
    val yearMonth = remember { YearMonth.now() }
    val daysInMonth = yearMonth.lengthOfMonth()
    val firstDayOfWeek = yearMonth.atDay(1).dayOfWeek.value % 7 // 0=Sunday
    var showAddDialog by remember { mutableStateOf(false) }
    val context = LocalContext.current
    val snackbarHostState = remember { SnackbarHostState() }
    val scope = rememberCoroutineScope()
    var importKeyword by remember { mutableStateOf("") }

    Column(Modifier.fillMaxSize().padding(16.dp)) {
        Text("Farm Activity Calendar", style = MaterialTheme.typography.titleLarge, fontWeight = FontWeight.Bold)
        Spacer(Modifier.height(8.dp))
        // Calendar grid
        Row(Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
            listOf("Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat").forEach {
                Text(it, Modifier.weight(1f), textAlign = androidx.compose.ui.text.style.TextAlign.Center)
            }
        }
        val weeks = ((daysInMonth + firstDayOfWeek - 1) / 7) + 1
        Column {
            var day = 1 - firstDayOfWeek
            repeat(weeks) {
                Row(Modifier.fillMaxWidth()) {
                    repeat(7) {
                        val d = day
                        val dayDate = if (d > 0 && d <= daysInMonth) yearMonth.atDay(d).format(DateTimeFormatter.ISO_DATE) else null
                        val dayActivities = dayDate?.let { activitiesByDay[it] } ?: emptyList()
                        val bgColor = when {
                            d == today.dayOfMonth && yearMonth.month == today.month && yearMonth.year == today.year -> Color(0xFFE3F2FD)
                            d == selectedDate.dayOfMonth && yearMonth.month == selectedDate.month && yearMonth.year == selectedDate.year -> Color(0xFFBBDEFB)
                            dayActivities.isNotEmpty() -> activityTypeColor(dayActivities.first().type).copy(alpha = 0.3f)
                            else -> Color.Transparent
                        }
                        Box(
                            Modifier
                                .weight(1f)
                                .aspectRatio(1f)
                                .padding(2.dp)
                                .background(bgColor)
                                .clickable(enabled = d > 0 && d <= daysInMonth) {
                                    if (d > 0 && d <= daysInMonth) selectedDate = yearMonth.atDay(d)
                                },
                            contentAlignment = Alignment.Center
                        ) {
                            if (d > 0 && d <= daysInMonth) Text("$d")
                        }
                        day++
                    }
                }
            }
        }
        Spacer(Modifier.height(16.dp))
        Text("Activities on ${selectedDate}", style = MaterialTheme.typography.titleMedium)
        val selectedDateStr = selectedDate.format(DateTimeFormatter.ISO_DATE)
        val activities = activitiesByDay[selectedDateStr] ?: emptyList()
        if (activities.isEmpty()) {
            Text("No activities.", color = Color.Gray)
        } else {
            LazyColumn(Modifier.weight(1f, fill = false)) {
                items(activities) { activity ->
                    Card(Modifier.fillMaxWidth().padding(vertical = 4.dp).clickable { selectedEditActivity = activity }) {
                        Row(verticalAlignment = Alignment.CenterVertically) {
                            Box(Modifier.size(8.dp, 40.dp).background(activityTypeColor(activity.type)))
                            Spacer(Modifier.width(8.dp))
                            Column(Modifier.padding(8.dp)) {
                                Text(activity.title, fontWeight = FontWeight.Bold)
                                Text(activity.type.name)
                                if (!activity.notes.isNullOrBlank()) Text(activity.notes, style = MaterialTheme.typography.bodySmall)
                                if (activity.time != null) Text("Time: ${activity.time}", style = MaterialTheme.typography.bodySmall)
                            }
                        }
                    }
                }
            }
        }
        Spacer(Modifier.height(8.dp))
        Button(onClick = { showAddDialog = true }, modifier = Modifier.align(Alignment.End)) {
            Text("Add Activity")
        }
        if (showAddDialog) {
            AddEditFarmActivityDialog(
                onDismiss = { showAddDialog = false },
                onSave = { viewModel.insert(it); showAddDialog = false },
                initial = FarmActivity(title = "", type = ActivityType.OTHER, date = selectedDateStr, time = null, farmId = 1L)
            )
        }
        if (selectedEditActivity != null) {
            AddEditFarmActivityDialog(
                onDismiss = { selectedEditActivity = null },
                onSave = { viewModel.update(it); selectedEditActivity = null },
                onDelete = { viewModel.delete(it); selectedEditActivity = null },
                initial = selectedEditActivity!!,
                onExport = { activity ->
                    if (GoogleCalendarHelper.isSignedIn(context)) {
                        GoogleCalendarHelper.exportActivityToCalendar(context, activity, object : CalendarExportCallback {
                            override fun onExportResult(success: Boolean, message: String) {
                                scope.launch { snackbarHostState.showSnackbar(message) }
                            }
                        })
                    } else {
                        if (context is Activity) {
                            GoogleCalendarHelper.signIn(context) { signedIn ->
                                if (signedIn) {
                                    GoogleCalendarHelper.exportActivityToCalendar(context, activity, object : CalendarExportCallback {
                                        override fun onExportResult(success: Boolean, message: String) {
                                            scope.launch { snackbarHostState.showSnackbar(message) }
                                        }
                                    })
                                } else {
                                    scope.launch { snackbarHostState.showSnackbar("Google sign-in failed.") }
                                }
                            }
                        } else {
                            scope.launch { snackbarHostState.showSnackbar("Google sign-in not available.") }
                        }
                    }
                }
            )
        }
        // Import from Google Calendar button
        OutlinedTextField(
            value = importKeyword,
            onValueChange = { importKeyword = it },
            label = { Text("Import only events with keyword (optional)") },
            modifier = Modifier.fillMaxWidth().padding(bottom = 4.dp)
        )
        Button(onClick = {
            if (GoogleCalendarHelper.isSignedIn(context)) {
                scope.launch {
                    val imported = importFromGoogleCalendar(context, viewModel, importKeyword)
                    snackbarHostState.showSnackbar("Imported $imported events from Google Calendar.")
                }
            } else if (context is Activity) {
                GoogleCalendarHelper.signIn(context) { signedIn ->
                    if (signedIn) {
                        scope.launch {
                            val imported = importFromGoogleCalendar(context, viewModel, importKeyword)
                            snackbarHostState.showSnackbar("Imported $imported events from Google Calendar.")
                        }
                    } else {
                        scope.launch { snackbarHostState.showSnackbar("Google sign-in failed.") }
                    }
                }
            } else {
                scope.launch { snackbarHostState.showSnackbar("Google sign-in not available.") }
            }
        }, modifier = Modifier.padding(bottom = 8.dp)) {
            Text("Import from Google Calendar")
        }
    }
    Box(Modifier.fillMaxSize()) {
        SnackbarHost(hostState = snackbarHostState, modifier = Modifier.align(Alignment.BottomCenter))
    }
}

suspend fun importFromGoogleCalendar(context: Context, viewModel: FarmActivityViewModel, keyword: String = ""): Int {
    return kotlinx.coroutines.withContext(kotlinx.coroutines.Dispatchers.IO) {
        val account = GoogleSignIn.getLastSignedInAccount(context)
        if (account == null) return@withContext 0
        val credential = GoogleAccountCredential.usingOAuth2(context, listOf(CalendarScopes.CALENDAR))
        credential.selectedAccount = account.account
        val service = Calendar.Builder(
            AndroidHttp.newCompatibleTransport(),
            GsonFactory.getDefaultInstance(),
            credential
        ).setApplicationName("SmartFarm").build()
        val now = java.time.LocalDate.now()
        val yearMonth = java.time.YearMonth.now()
        val start = yearMonth.atDay(1).atStartOfDay(ZoneId.systemDefault()).toInstant().toEpochMilli()
        val end = yearMonth.atEndOfMonth().atTime(23, 59).atZone(ZoneId.systemDefault()).toInstant().toEpochMilli()
        val events: Events = service.events().list("primary")
            .setTimeMin(DateTime(start))
            .setTimeMax(DateTime(end))
            .setOrderBy("startTime")
            .setSingleEvents(true)
            .execute()
        var count = 0
        for (event in events.items) {
            val startDateTime = event.start?.dateTime ?: event.start?.date
            val dateStr = startDateTime?.toStringRfc3339()?.substring(0, 10) ?: continue
            val timeStr = startDateTime?.toStringRfc3339()?.substring(11, 16)
            val title = event.summary ?: "Imported Event"
            val notes = event.description ?: ""
            if (keyword.isNotBlank() && !title.contains(keyword, ignoreCase = true)) continue
            val activity = com.example.smartfarm.data.model.FarmActivity(
                title = title,
                type = com.example.smartfarm.data.model.ActivityType.OTHER,
                date = dateStr,
                time = timeStr,
                notes = notes,
                farmId = 1L
            )
            viewModel.insert(activity)
            count++
        }
        count
    }
}



@Composable
private fun AddEditFarmActivityDialog(
    onDismiss: () -> Unit,
    onSave: (FarmActivity) -> Unit,
    initial: FarmActivity,
    onDelete: ((FarmActivity) -> Unit)? = null,
    onExport: ((FarmActivity) -> Unit)? = null
) {
    var title by remember { mutableStateOf(initial.title) }
    var type by remember { mutableStateOf(initial.type) }
    var date by remember { mutableStateOf(initial.date) }
    var time by remember { mutableStateOf(initial.time ?: "") }
    var notes by remember { mutableStateOf(initial.notes) }
    var reminderMinutes by remember { mutableStateOf(initial.reminderMinutesBefore?.toString() ?: "") }
    var recurrenceFreq by remember { mutableStateOf(initial.recurrence?.frequency ?: com.example.smartfarm.data.model.RecurrenceFrequency.NONE) }
    var recurrenceInterval by remember { mutableStateOf(initial.recurrence?.interval?.toString() ?: "1") }
    
    AlertDialog(
        onDismissRequest = onDismiss,
        title = { Text(if (initial.id == 0L) "Add Farm Activity" else "Edit Farm Activity") },
        text = {
            Column {
                OutlinedTextField(value = title, onValueChange = { title = it }, label = { Text("Title") })
                Spacer(Modifier.height(8.dp))
                DropdownMenuField(label = type.name, options = ActivityType.values().map { it.name }, selected = type.name, onSelected = { type = ActivityType.valueOf(it) })
                Spacer(Modifier.height(8.dp))
                OutlinedTextField(value = date, onValueChange = { date = it }, label = { Text("Date (yyyy-MM-dd)") })
                Spacer(Modifier.height(8.dp))
                OutlinedTextField(value = time, onValueChange = { time = it }, label = { Text("Time (HH:mm)") })
                Spacer(Modifier.height(8.dp))
                OutlinedTextField(value = notes, onValueChange = { notes = it }, label = { Text("Notes") })
                Spacer(Modifier.height(8.dp))
                OutlinedTextField(
                    value = reminderMinutes,
                    onValueChange = { reminderMinutes = it.filter { c -> c.isDigit() } },
                    label = { Text("Reminder (minutes before)") },
                    placeholder = { Text("e.g. 30") },
                    singleLine = true
                )
                Spacer(Modifier.height(8.dp))
                // Recurrence fields
                DropdownMenuField(
                    label = "Repeat",
                    options = com.example.smartfarm.data.model.RecurrenceFrequency.values().map { it.name },
                    selected = recurrenceFreq.name,
                    onSelected = { recurrenceFreq = com.example.smartfarm.data.model.RecurrenceFrequency.valueOf(it) }
                )
                if (recurrenceFreq != com.example.smartfarm.data.model.RecurrenceFrequency.NONE) {
                    Spacer(Modifier.height(8.dp))
                    OutlinedTextField(
                        value = recurrenceInterval,
                        onValueChange = { recurrenceInterval = it.filter { c -> c.isDigit() }.ifBlank { "1" } },
                        label = { Text("Repeat every N ${recurrenceFreq.name.lowercase().removeSuffix("ly")}${if (recurrenceInterval == "1") "" else "s"}") },
                        singleLine = true
                    )
                }
            }
        },
        confirmButton = {
            Button(onClick = {
                onSave(
                    initial.copy(
                        title = title,
                        type = type,
                        date = date,
                        time = time.ifBlank { null },
                        notes = notes,
                        reminderMinutesBefore = reminderMinutes.toIntOrNull(),
                        recurrence = if (recurrenceFreq == com.example.smartfarm.data.model.RecurrenceFrequency.NONE) null else com.example.smartfarm.data.model.Recurrence(
                            frequency = recurrenceFreq,
                            interval = recurrenceInterval.toIntOrNull() ?: 1
                        )
                    )
                )
            }) { Text("Save") }
        },
        dismissButton = {
            Row {
                if (onExport != null && initial.id != 0L) {
                    OutlinedButton(onClick = { onExport(initial) }) { Text("Export to Google Calendar") }
                    Spacer(Modifier.width(8.dp))
                }
                if (onDelete != null && initial.id != 0L) {
                    OutlinedButton(onClick = { onDelete(initial) }, colors = ButtonDefaults.outlinedButtonColors(contentColor = Color.Red)) { Text("Delete") }
                    Spacer(Modifier.width(8.dp))
                }
                OutlinedButton(onClick = onDismiss) { Text("Cancel") }
            }
        }
    )
}

@Composable
private fun DropdownMenuField(label: String, options: List<String>, selected: String, onSelected: (String) -> Unit) {
    var expanded by remember { mutableStateOf(false) }
    Box {
        OutlinedTextField(
            value = selected,
            onValueChange = {},
            label = { Text(label) },
            readOnly = true,
            modifier = Modifier.clickable { expanded = true }
        )
        DropdownMenu(expanded = expanded, onDismissRequest = { expanded = false }) {
            options.forEach {
                DropdownMenuItem(text = { Text(it) }, onClick = { onSelected(it); expanded = false })
            }
        }
    }
} 