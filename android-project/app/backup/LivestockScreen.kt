package com.yourcompany.smartfarm.ui

import android.content.Context
import android.content.Intent
import android.graphics.Paint
import android.graphics.Typeface
import android.graphics.pdf.PdfDocument
import android.net.Uri
import android.util.Patterns
import android.widget.Toast
import androidx.activity.compose.rememberLauncherForActivityResult
import androidx.activity.result.contract.ActivityResultContracts
import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.Canvas
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.material3.SnackbarHostState
import androidx.compose.material3.rememberSnackbarHostState
import androidx.compose.ui.draw.clip
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.geometry.Size
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.asImageBitmap
import androidx.compose.ui.graphics.drawscope.DrawScope
import androidx.compose.ui.graphics.drawscope.drawIntoCanvas
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.graphics.drawscope.translate
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.platform.ClipboardManager
import androidx.compose.ui.platform.LocalClipboardManager
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.platform.LocalUriHandler
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.AnnotatedString
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.TextFieldValue
import androidx.compose.ui.text.style.TextDecoration
import androidx.compose.ui.unit.dp
import androidx.compose.ui.window.Dialog
import androidx.core.content.ContextCompat.startActivity
import androidx.core.content.FileProvider
import coil.compose.AsyncImage
import com.yourcompany.smartfarm.data.database.FarmDatabase
import com.yourcompany.smartfarm.data.model.*
import com.yourcompany.smartfarm.data.repository.*
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.delay
import kotlinx.coroutines.flow.collectLatest
import kotlinx.coroutines.launch
import java.io.*
import java.text.SimpleDateFormat
import java.time.Instant
import java.time.LocalDate
import java.time.ZoneId
import java.time.format.DateTimeFormatter
import java.util.*
import kotlin.math.PI
import kotlin.math.cos
import kotlin.math.sin
import com.yourcompany.smartfarm.data.model.AnimalHealthRecordViewModelFactory
import com.yourcompany.smartfarm.data.repository.AnimalHealthRecordRepository
import com.yourcompany.smartfarm.data.model.YieldRecordViewModel
import com.yourcompany.smartfarm.data.model.YieldRecordViewModelFactory
import com.yourcompany.smartfarm.data.repository.YieldRecordRepository
import com.yourcompany.smartfarm.data.model.AnimalHealthRecord
import com.yourcompany.smartfarm.data.model.YieldRecord
import com.yourcompany.smartfarm.data.model.OutlierAcknowledgmentViewModel
import com.yourcompany.smartfarm.data.model.OutlierAcknowledgmentViewModelFactory
import com.yourcompany.smartfarm.data.repository.OutlierAcknowledgmentRepository
import com.yourcompany.smartfarm.data.model.OutlierAcknowledgment
import com.yourcompany.smartfarm.data.model.LivestockReminder
import com.yourcompany.smartfarm.ui.components.LoginDialog
import com.yourcompany.smartfarm.ui.components.HelpAboutDialog
import com.yourcompany.smartfarm.data.model.AlertStatus
import com.yourcompany.smartfarm.data.model.AlertSeverity
import com.yourcompany.smartfarm.data.model.PestDiseaseAlertEntity
import com.yourcompany.smartfarm.data.model.UserRole

data class PestDiseaseAlert(val id: Long = 0, val type: String, val name: String, val affected: String, val note: String, val timestamp: Long = System.currentTimeMillis())

data class CalculationRecord(
    val id: Long = System.currentTimeMillis(),
    val type: String, // "Herbicide" or "Fertilizer"
    val plant: String,
    val chemical: String,
    val dosageRate: String,
    val area: String,
    val result: String,
    val timestamp: Long = System.currentTimeMillis()
)

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun LivestockScreen(
    viewModel: LivestockViewModel,
    reminderViewModel: LivestockReminderViewModel,
    userViewModel: UserViewModel,
    plantNames: List<String>,
    plantList: List<Plant> = emptyList() // Pass full plant list for context-aware filtering
) {
    val uiState by viewModel.uiState.collectAsState()
    val livestockList = uiState.livestock
    val currentUser by userViewModel.currentUser.collectAsState()
    val allUsers by userViewModel.allUsers.collectAsState()
    var showLogin by remember { mutableStateOf(currentUser == null) }
    var showDialog by remember { mutableStateOf(false) }
    var editLivestock by remember { mutableStateOf<Livestock?>(null) }
    var deleteLivestock by remember { mutableStateOf<Livestock?>(null) }
    var detailsLivestock by remember { mutableStateOf<Livestock?>(null) }
    var showDashboard by remember { mutableStateOf(false) }
    var showRemindersFor by remember { mutableStateOf<Livestock?>(null) }
    val context = LocalContext.current
    val snackbarHostState = rememberSnackbarHostState()
    val scope = rememberCoroutineScope()
    var isSyncing by remember { mutableStateOf(false) }
    var isSynced by remember { mutableStateOf(true) }
    var showHelp by remember { mutableStateOf(false) }
    var showAlertDialog by remember { mutableStateOf(false) }
    var showCalculator by remember { mutableStateOf(false) }
    val pestList = listOf("Armyworm", "Locust", "Aphid") // TODO: Load from PestDao
    val diseaseList = listOf("Mastitis", "Foot and Mouth", "Anthrax") // TODO: Load from livestock/commonDiseases
    val allLivestockNames = livestockList.map { it.name }
    val allAffectedNames = allLivestockNames + plantNames + listOf("Farm 1", "Farm 2") // TODO: Load from FarmDao if available
    val alerts = remember { mutableStateListOf<PestDiseaseAlert>() }
    
    // Database access for alerts
    val database = FarmDatabase.getDatabase(context)
    val alertDao = database.pestDiseaseAlertDao()
    val dbAlerts = remember { mutableStateListOf<PestDiseaseAlertEntity>() }

    // Search/filter state
    var searchQuery by remember { mutableStateOf("") }
    var selectedCategory by remember { mutableStateOf<LivestockCategory?>(null) }
    var selectedBrand by remember { mutableStateOf("") }

    // Filtering logic
    val filteredList = livestockList.filter { livestock ->
        (searchQuery.isBlank() || livestock.name.contains(searchQuery, ignoreCase = true)) &&
        (selectedCategory == null || livestock.category == selectedCategory) &&
        (selectedBrand.isBlank() || (livestock.gpsDeviceBrand?.contains(selectedBrand, ignoreCase = true) == true))
    }

    // Export launcher
    val exportLauncher = rememberLauncherForActivityResult(ActivityResultContracts.CreateDocument("text/csv")) { uri ->
        if (uri != null) {
            scope.launch {
                try {
                    context.contentResolver.openOutputStream(uri)?.use { outStream ->
                        OutputStreamWriter(outStream).use { writer ->
                            writer.write("id,name,scientificName,category,subCategory,description,imageUrl,lifespan,gestationPeriod,incubationPeriod,weaningAge,maturityAge,breedingAge,averageWeight,diet,housingRequirements,spaceRequirement,temperatureRange,commonDiseases,vaccinationSchedule,careInstructions,products,marketValue,isActive,gpsLink,gpsDeviceBrand\n")
                            livestockList.forEach { l ->
                                writer.write("${l.id},${l.name},${l.scientificName},${l.category},${l.subCategory},${l.description},${l.imageUrl},${l.lifespan},${l.gestationPeriod},${l.incubationPeriod},${l.weaningAge},${l.maturityAge},${l.breedingAge},${l.averageWeight},${l.diet.joinToString(";")},${l.housingRequirements},${l.spaceRequirement},${l.temperatureRange},${l.commonDiseases.joinToString(";")},${l.vaccinationSchedule.joinToString(";")},${l.careInstructions},${l.products.joinToString(";")},${l.marketValue},${l.isActive},${l.gpsLink},${l.gpsDeviceBrand}\n")
                            }
                        }
                    }
                    snackbarHostState.showSnackbar("Export successful!")
                } catch (e: Exception) {
                    snackbarHostState.showSnackbar("Export failed: ${e.message}")
                }
            }
        }
    }
    // Import launcher
    val importLauncher = rememberLauncherForActivityResult(ActivityResultContracts.GetContent()) { uri ->
        if (uri != null) {
            scope.launch {
                try {
                    context.contentResolver.openInputStream(uri)?.use { inStream ->
                        BufferedReader(InputStreamReader(inStream)).use { reader ->
                            val lines = reader.readLines().drop(1) // skip header
                            lines.forEach { line ->
                                val cols = line.split(",")
                                if (cols.size >= 26) {
                                    val livestock = Livestock(
                                        id = 0,
                                        name = cols[1],
                                        scientificName = cols[2],
                                        category = LivestockCategory.valueOf(cols[3]),
                                        subCategory = cols[4],
                                        description = cols[5],
                                        imageUrl = cols[6],
                                        lifespan = cols[7],
                                        gestationPeriod = cols[8].toIntOrNull(),
                                        incubationPeriod = cols[9].toIntOrNull(),
                                        weaningAge = cols[10].toIntOrNull(),
                                        maturityAge = cols[11].toIntOrNull() ?: 0,
                                        breedingAge = cols[12].toIntOrNull() ?: 0,
                                        averageWeight = cols[13],
                                        diet = cols[14].split(";").filter { it.isNotBlank() },
                                        housingRequirements = cols[15],
                                        spaceRequirement = cols[16],
                                        temperatureRange = cols[17],
                                        commonDiseases = cols[18].split(";").filter { it.isNotBlank() },
                                        vaccinationSchedule = cols[19].split(";").filter { it.isNotBlank() },
                                        careInstructions = cols[20],
                                        products = cols[21].split(";").filter { it.isNotBlank() },
                                        marketValue = cols[22],
                                        isActive = cols[23].toBoolean(),
                                        gpsLink = cols[24].ifBlank { null },
                                        gpsDeviceBrand = cols[25].ifBlank { null },
                                        farmId = 1L
                                    )
                                    viewModel.insertLivestock(livestock)
                                }
                            }
                        }
                    }
                    snackbarHostState.showSnackbar("Import successful!")
                } catch (e: Exception) {
                    snackbarHostState.showSnackbar("Import failed: ${e.message}")
                }
            }
        }
    }

    if (showLogin) {
        LoginDialog(
            allUsers = allUsers,
            onLogin = { user ->
                userViewModel.selectUser(user)
                showLogin = false
            },
            onCreateUser = { name, role ->
                val user = User(name = name, role = role)
                userViewModel.insert(user)
            }
        )
        return
    }

    // Show current user, logout, sync, and help button
    Row(Modifier.fillMaxWidth().padding(8.dp), horizontalArrangement = Arrangement.SpaceBetween, verticalAlignment = Alignment.CenterVertically) {
        Text("Logged in as: ${currentUser?.name} (${currentUser?.role})", style = MaterialTheme.typography.bodyMedium)
        Row(verticalAlignment = Alignment.CenterVertically) {
            if (isSyncing) {
                CircularProgressIndicator(modifier = Modifier.size(24.dp).padding(end = 8.dp), strokeWidth = 2.dp)
            }
            Text(if (isSynced) "Synced" else "Not Synced", color = if (isSynced) Color(0xFF388E3C) else Color(0xFFD32F2F), modifier = Modifier.padding(end = 8.dp))
            Button(onClick = {
                scope.launch {
                    isSyncing = true
                    val success = syncWithBackend()
                    isSyncing = false
                    isSynced = success
                    snackbarHostState.showSnackbar(if (success) "Sync successful!" else "Sync failed.")
                }
            }, enabled = !isSyncing) { Text("Sync") }
            Button(onClick = { showHelp = true }, modifier = Modifier.padding(start = 8.dp)) { Text("Help/About") }
            Button(onClick = { userViewModel.selectUser(null); showLogin = true }) { Text("Logout") }
        }
    }
    if (showHelp) {
        HelpAboutDialog(onDismiss = { showHelp = false })
    }
    Scaffold(
        snackbarHost = { androidx.compose.material3.SnackbarHost(snackbarHostState) },
        floatingActionButton = {
            if (currentUser?.role == UserRole.ADMIN || currentUser?.role == UserRole.WORKER) {
                FloatingActionButton(onClick = {
                    editLivestock = null
                    showDialog = true
                }) {
                    Text("+")
                }
            }
        }
    ) { padding ->
        Column(modifier = Modifier.padding(padding).fillMaxSize()) {
            // Export/Import/Dashboard buttons
            Row(Modifier.fillMaxWidth().padding(8.dp), horizontalArrangement = Arrangement.End) {
                Button(onClick = { showDashboard = true }, modifier = Modifier.padding(end = 8.dp)) {
                    Text("Dashboard")
                }
                Button(onClick = { showCalculator = true }, modifier = Modifier.padding(end = 8.dp)) {
                    Text("Fertilizer/Chemical Calculator")
                }
                Button(onClick = { showAlertDialog = true }, modifier = Modifier.padding(end = 8.dp)) {
                    Icon(Icons.Default.Warning, contentDescription = null)
                    Spacer(Modifier.width(4.dp))
                    Text("Report Pest/Disease")
                }
                Button(onClick = { exportLauncher.launch("livestock_export.csv") }, modifier = Modifier.padding(end = 8.dp)) {
                    Text("Export")
                }
                Button(onClick = { importLauncher.launch("text/csv") }) {
                    Text("Import")
                }
            }
            if (showAlertDialog) {
                PestDiseaseAlertDialog(
                    livestockList = livestockList,
                    plantList = plantList,
                    onReport = { alert ->
                        scope.launch { alertDao.insert(alert) }
                        showAlertDialog = false
                        scope.launch { snackbarHostState.showSnackbar("${alert.type} alert reported: ${alert.name}") }
                    },
                    onDismiss = { showAlertDialog = false }
                )
            }
            if (dbAlerts.isNotEmpty()) {
                Column(Modifier.fillMaxWidth().padding(8.dp)) {
                    Text("Recent Pest/Disease Alerts:", style = MaterialTheme.typography.titleSmall, fontWeight = FontWeight.Bold)
                    dbAlerts.take(5).forEach { alert ->
                        Row(verticalAlignment = Alignment.CenterVertically) {
                            Icon(Icons.Default.Warning, contentDescription = null, tint = when(alert.severity) {
                                AlertSeverity.MINOR -> Color(0xFF388E3C)
                                AlertSeverity.MODERATE -> Color(0xFFFBC02D)
                                AlertSeverity.SEVERE -> Color(0xFFD32F2F)
                                AlertSeverity.EXTREME -> Color(0xFFD32F2F)
                            })
                            Spacer(Modifier.width(4.dp))
                            Text("${alert.type}: ${alert.name} - ${alert.affected}", style = MaterialTheme.typography.bodySmall)
                            if (alert.note.isNotBlank()) Text(" (${alert.note})", style = MaterialTheme.typography.bodySmall)
                            Text(" [${alert.severity}]", style = MaterialTheme.typography.bodySmall, color = Color.Gray)
                            if (alert.status == AlertStatus.ACTIVE) {
                                OutlinedButton(onClick = { scope.launch { alertDao.setAlertStatus(alert.id, AlertStatus.RESOLVED) } }, modifier = Modifier.padding(start = 8.dp)) {
                                    Text("Mark Resolved")
                                }
                            } else {
                                Text("Resolved", color = Color(0xFF388E3C), modifier = Modifier.padding(start = 8.dp))
                            }
                        }
                    }
                }
            }
            // Search/filter bar
            Row(
                Modifier
                    .fillMaxWidth()
                    .padding(8.dp),
                verticalAlignment = Alignment.CenterVertically
            ) {
                OutlinedTextField(
                    value = searchQuery,
                    onValueChange = { searchQuery = it },
                    label = { Text("Search by name") },
                    leadingIcon = { Icon(Icons.Default.Search, contentDescription = null) },
                    modifier = Modifier.weight(1f)
                )
                Spacer(Modifier.width(8.dp))
                DropdownMenuCategory(
                    selected = selectedCategory ?: LivestockCategory.CATTLE,
                    onSelected = { selectedCategory = if (it == selectedCategory) null else it },
                    showAllOption = true,
                    allLabel = "All Categories"
                )
                Spacer(Modifier.width(8.dp))
                OutlinedTextField(
                    value = selectedBrand,
                    onValueChange = { selectedBrand = it },
                    label = { Text("GPS Brand") },
                    modifier = Modifier.width(120.dp)
                )
            }
            Text("Livestock List", style = MaterialTheme.typography.titleLarge, modifier = Modifier.padding(16.dp))
            LazyColumn(modifier = Modifier.weight(1f)) {
                items(filteredList) { livestock ->
                    LivestockItem(
                        livestock = livestock,
                        onEdit = {
                            if (currentUser?.role == UserRole.ADMIN || currentUser?.role == UserRole.WORKER) {
                                editLivestock = livestock
                                showDialog = true
                            }
                        },
                        onDelete = {
                            if (currentUser?.role == UserRole.ADMIN) {
                                deleteLivestock = livestock
                            }
                        },
                        onDetails = { detailsLivestock = livestock },
                        canEdit = currentUser?.role == UserRole.ADMIN || currentUser?.role == UserRole.WORKER,
                        canDelete = currentUser?.role == UserRole.ADMIN
                    )
                }
            }
        }
        if (showDialog) {
            LivestockDialog(
                initial = editLivestock,
                onDismiss = { showDialog = false },
                onSave = { livestock ->
                    if (!livestock.gpsLink.isNullOrBlank() && !Patterns.WEB_URL.matcher(livestock.gpsLink).matches()) {
                        Toast.makeText(context, "Invalid GPS link URL", Toast.LENGTH_SHORT).show()
                        return@LivestockDialog
                    }
                    if (editLivestock == null) viewModel.insertLivestock(livestock)
                    else viewModel.updateLivestock(livestock)
                    showDialog = false
                }
            )
        }
        if (deleteLivestock != null) {
            AlertDialog(
                onDismissRequest = { deleteLivestock = null },
                title = { Text("Delete Livestock") },
                text = { Text("Are you sure you want to delete ${deleteLivestock?.name}?") },
                confirmButton = {
                    Button(onClick = {
                        viewModel.deleteLivestock(deleteLivestock!!)
                        deleteLivestock = null
                    }) { Text("Delete") }
                },
                dismissButton = {
                    OutlinedButton(onClick = { deleteLivestock = null }) { Text("Cancel") }
                }
            )
        }
        if (detailsLivestock != null) {
            LivestockDetailsDialog(
                livestock = detailsLivestock!!,
                onDismiss = { detailsLivestock = null },
                onEdit = {
                    editLivestock = detailsLivestock
                    detailsLivestock = null
                    showDialog = true
                },
                onReminders = { showRemindersFor = detailsLivestock }
            )
        }
        if (showRemindersFor != null) {
            RemindersDialog(
                livestock = showRemindersFor!!,
                reminderViewModel = reminderViewModel,
                onDismiss = { showRemindersFor = null }
            )
        }
        if (showDashboard) {
            DashboardDialog(livestockList = livestockList, onDismiss = { showDashboard = false })
        }
        if (showCalculator) {
            FertilizerChemicalCalculatorDialog(
                plantList = plantList,
                herbicides = herbicides,
                onDismiss = { showCalculator = false }
            )
        }
    }
}

suspend fun syncWithBackend(): Boolean {
    // TODO: Replace with real backend sync logic
    delay(1500) // Simulate network delay
    return true // Simulate success
}

@Composable
fun LivestockItem(
    livestock: Livestock,
    onEdit: () -> Unit,
    onDelete: () -> Unit,
    onDetails: () -> Unit,
    canEdit: Boolean,
    canDelete: Boolean
) {
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .padding(8.dp)
            .clickable { onDetails() },
        elevation = CardDefaults.cardElevation(4.dp)
    ) {
        Row(verticalAlignment = Alignment.CenterVertically) {
            // Placeholder for livestock image
            Box(
                modifier = Modifier
                    .size(64.dp)
                    .padding(8.dp),
                contentAlignment = Alignment.Center
            ) {
                // If you have imageUrl, use AsyncImage; else, show a placeholder
                if (!livestock.imageUrl.isNullOrBlank()) {
                    AsyncImage(
                        model = livestock.imageUrl,
                        contentDescription = "Livestock Image",
                        contentScale = ContentScale.Crop,
                        modifier = Modifier.size(56.dp)
                    )
                } else {
                    Icon(Icons.Default.Edit, contentDescription = "No Image", modifier = Modifier.size(40.dp))
                }
            }
            Column(modifier = Modifier.weight(1f).padding(8.dp)) {
                Text(text = livestock.name, style = MaterialTheme.typography.titleMedium.copy(fontWeight = FontWeight.Bold))
                Text(text = "Category: ${livestock.category}", style = MaterialTheme.typography.bodySmall)
                Text(text = "GPS Brand: ${livestock.gpsDeviceBrand ?: "N/A"}", style = MaterialTheme.typography.bodySmall)
                val uriHandler = LocalUriHandler.current
                if (!livestock.gpsLink.isNullOrBlank()) {
                    Text(
                        text = livestock.gpsLink,
                        color = Color(0xFF1976D2),
                        textDecoration = TextDecoration.Underline,
                        modifier = Modifier
                            .padding(top = 2.dp)
                            .clickable { uriHandler.openUri(livestock.gpsLink!!) },
                        style = MaterialTheme.typography.bodySmall
                    )
                } else {
                    Text(text = "GPS Link: N/A", style = MaterialTheme.typography.bodySmall)
                }
            }
            if (canEdit) {
                IconButton(onClick = onEdit) { Icon(Icons.Default.Edit, contentDescription = "Edit") }
            }
            if (canDelete) {
                IconButton(onClick = onDelete) { Icon(Icons.Default.Delete, contentDescription = "Delete") }
            }
        }
    }
}

@Composable
fun LivestockDialog(
    initial: Livestock?,
    onDismiss: () -> Unit,
    onSave: (Livestock) -> Unit
) {
    val context = LocalContext.current
    var name by remember { mutableStateOf(TextFieldValue(initial?.name ?: "")) }
    var category by remember { mutableStateOf(initial?.category ?: LivestockCategory.CATTLE) }
    var gpsLink by remember { mutableStateOf(TextFieldValue(initial?.gpsLink ?: "")) }
    var gpsBrand by remember { mutableStateOf(TextFieldValue(initial?.gpsDeviceBrand ?: "")) }
    var imageUri by remember { mutableStateOf<Uri?>(initial?.imageUrl?.let { Uri.parse(it) }) }

    val imagePickerLauncher = rememberLauncherForActivityResult(ActivityResultContracts.GetContent()) { uri: Uri? ->
        if (uri != null) imageUri = uri
    }

    AlertDialog(
        onDismissRequest = onDismiss,
        title = { Text(if (initial == null) "Add Livestock" else "Edit Livestock") },
        text = {
            Column {
                OutlinedTextField(value = name, onValueChange = { name = it }, label = { Text("Name") })
                Spacer(modifier = Modifier.height(8.dp))
                DropdownMenuCategory(selected = category, onSelected = { category = it })
                Spacer(modifier = Modifier.height(8.dp))
                OutlinedTextField(value = gpsBrand, onValueChange = { gpsBrand = it }, label = { Text("GPS Device Brand") })
                Spacer(modifier = Modifier.height(8.dp))
                OutlinedTextField(value = gpsLink, onValueChange = { gpsLink = it }, label = { Text("GPS Link") })
                Spacer(modifier = Modifier.height(8.dp))
                Row(verticalAlignment = Alignment.CenterVertically) {
                    if (imageUri != null) {
                        AsyncImage(
                            model = imageUri,
                            contentDescription = "Selected Image",
                            modifier = Modifier.size(64.dp)
                        )
                        Spacer(Modifier.width(8.dp))
                    }
                    Button(onClick = { imagePickerLauncher.launch("image/*") }) {
                        Text(if (imageUri == null) "Select Image" else "Change Image")
                    }
                }
            }
        },
        confirmButton = {
            Button(onClick = {
                val livestock = initial?.copy(
                    name = name.text,
                    category = category,
                    gpsLink = gpsLink.text.ifBlank { null },
                    gpsDeviceBrand = gpsBrand.text.ifBlank { null },
                    imageUrl = imageUri?.toString()
                ) ?: Livestock(
                    name = name.text,
                    scientificName = "",
                    category = category,
                    subCategory = "",
                    description = "",
                    imageUrl = imageUri?.toString() ?: "",
                    lifespan = "",
                    gestationPeriod = null,
                    incubationPeriod = null,
                    weaningAge = null,
                    maturityAge = 0,
                    breedingAge = 0,
                    averageWeight = "",
                    diet = emptyList(),
                    housingRequirements = "",
                    spaceRequirement = "",
                    temperatureRange = "",
                    commonDiseases = emptyList(),
                    vaccinationSchedule = emptyList(),
                    careInstructions = "",
                    products = emptyList(),
                    marketValue = "",
                    isActive = true,
                    gpsLink = gpsLink.text.ifBlank { null },
                    gpsDeviceBrand = gpsBrand.text.ifBlank { null },
                    farmId = 1L
                )
                onSave(livestock)
            }) {
                Text("Save")
            }
        },
        dismissButton = {
            OutlinedButton(onClick = onDismiss) { Text("Cancel") }
        }
    )
}

@Composable
fun DropdownMenuCategory(selected: LivestockCategory, onSelected: (LivestockCategory) -> Unit, showAllOption: Boolean = false, allLabel: String = "All") {
    var expanded by remember { mutableStateOf(false) }
    Box {
        OutlinedButton(onClick = { expanded = true }) {
            Text(if (showAllOption && selected == LivestockCategory.CATTLE) allLabel else selected.name)
        }
        DropdownMenu(expanded = expanded, onDismissRequest = { expanded = false }) {
            if (showAllOption) {
                DropdownMenuItem(onClick = {
                    onSelected(LivestockCategory.CATTLE)
                    expanded = false
                }, text = { Text(allLabel) })
            }
            LivestockCategory.values().forEach { cat ->
                DropdownMenuItem(onClick = {
                    onSelected(cat)
                    expanded = false
                }, text = { Text(cat.name) })
            }
        }
    }
}

@Composable
fun LivestockDetailsDialog(livestock: Livestock, onDismiss: () -> Unit, onEdit: () -> Unit, onReminders: () -> Unit) {
    val context = LocalContext.current
    val db = remember(context) { FarmDatabase.getDatabase(context) }
    val healthRepo = remember { AnimalHealthRecordRepository(db.animalHealthRecordDao()) }
    val healthViewModel: AnimalHealthRecordViewModel = androidx.lifecycle.viewmodel.compose.viewModel(factory = AnimalHealthRecordViewModelFactory(healthRepo))
    val yieldRepo = remember { YieldRecordRepository(db.yieldRecordDao()) }
    val yieldViewModel: YieldRecordViewModel = androidx.lifecycle.viewmodel.compose.viewModel(factory = YieldRecordViewModelFactory(yieldRepo))
    var selectedTab by remember { mutableStateOf(0) }
    val tabTitles = listOf("General Info", "Health Records", "Yield Records")
    val clipboardManager: ClipboardManager = LocalClipboardManager.current
    LaunchedEffect(livestock.id) {
        healthViewModel.loadForAnimal(livestock.id)
        yieldViewModel.loadForAnimal(livestock.id)
    }
    Dialog(onDismissRequest = onDismiss) {
        Surface(shape = MaterialTheme.shapes.medium, tonalElevation = 8.dp) {
            Column(modifier = Modifier.padding(24.dp).widthIn(min = 320.dp, max = 480.dp)) {
                Text(livestock.name, style = MaterialTheme.typography.titleLarge, fontWeight = FontWeight.Bold)
                Spacer(Modifier.height(8.dp))
                TabRow(selectedTabIndex = selectedTab) {
                    tabTitles.forEachIndexed { i, title ->
                        Tab(selected = selectedTab == i, onClick = { selectedTab = i }, text = { Text(title) })
                    }
                }
                Spacer(Modifier.height(8.dp))
                when (selectedTab) {
                    0 -> {
                        // ... existing General Info UI ...
                        if (!livestock.imageUrl.isNullOrBlank()) {
                            AsyncImage(
                                model = livestock.imageUrl,
                                contentDescription = "Livestock Image",
                                contentScale = ContentScale.Crop,
                                modifier = Modifier.fillMaxWidth().height(160.dp)
                            )
                        }
                        Spacer(Modifier.height(8.dp))
                        SectionHeader("General Info")
                        InfoRow("Scientific Name", livestock.scientificName)
                        InfoRow("Subcategory", livestock.subCategory)
                        InfoRow("Category", livestock.category.name)
                        InfoRow("Lifespan", livestock.lifespan)
                        InfoRow("Average Weight", livestock.averageWeight)
                        InfoRow("Maturity Age", "${livestock.maturityAge} days")
                        InfoRow("Breeding Age", "${livestock.breedingAge} days")
                        Spacer(Modifier.height(8.dp))
                        if (!livestock.diet.isNullOrEmpty()) {
                            SectionHeader("Diet")
                            FlowRowChips(livestock.diet)
                        }
                        if (!livestock.commonDiseases.isNullOrEmpty()) {
                            SectionHeader("Diseases")
                            FlowRowChips(livestock.commonDiseases)
                        }
                        if (!livestock.products.isNullOrEmpty()) {
                            SectionHeader("Products")
                            FlowRowChips(livestock.products)
                        }
                        Spacer(Modifier.height(8.dp))
                        SectionHeader("GPS & Location")
                        InfoRow("GPS Brand", livestock.gpsDeviceBrand ?: "N/A")
                        if (!livestock.gpsLink.isNullOrBlank()) {
                            val mapUrl = getStaticMapUrl(livestock.gpsLink)
                            val mapIntentUrl = getMapIntentUrl(livestock.gpsLink)
                            if (mapUrl != null) {
                                AsyncImage(
                                    model = mapUrl,
                                    contentDescription = "Map Preview",
                                    modifier = Modifier.fillMaxWidth().height(160.dp)
                                )
                                Spacer(Modifier.height(4.dp))
                                val uriHandler = LocalUriHandler.current
                                Button(onClick = { uriHandler.openUri(mapIntentUrl) }, modifier = Modifier.fillMaxWidth()) {
                                    Text("View on Map")
                                }
                            } else {
                                val uriHandler = LocalUriHandler.current
                                Button(onClick = { uriHandler.openUri(mapIntentUrl) }, modifier = Modifier.fillMaxWidth()) {
                                    Text("Open GPS Link")
                                }
                            }
                            val coordRegex = Regex("^-?\\d+\\.\\d+,-?\\d+\\.\\d+$")
                            if (coordRegex.matches(livestock.gpsLink.trim())) {
                                Row(verticalAlignment = Alignment.CenterVertically) {
                                    Text("Coordinates: ${livestock.gpsLink}", style = MaterialTheme.typography.bodySmall)
                                    IconButton(onClick = {
                                        clipboardManager.setText(AnnotatedString(livestock.gpsLink))
                                    }) {
                                        Icon(Icons.Default.ContentCopy, contentDescription = "Copy Coordinates")
                                    }
                                }
                            }
                        }
                        Spacer(Modifier.height(8.dp))
                        SectionHeader("Description")
                        Text(livestock.description, style = MaterialTheme.typography.bodySmall)
                    }
                    1 -> {
                        // Health Records Tab
                        HealthRecordsTab(livestockId = livestock.id, viewModel = healthViewModel)
                    }
                    2 -> {
                        // Yield Records Tab
                        YieldRecordsTab(livestockId = livestock.id, viewModel = yieldViewModel)
                    }
                }
                Spacer(Modifier.height(16.dp))
                Row(Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
                    OutlinedButton(onClick = onDismiss) { Text("Close") }
                    Button(onClick = onEdit) { Text("Edit") }
                    IconButton(onClick = onReminders) { Icon(Icons.Default.Notifications, contentDescription = "Reminders") }
                }
            }
        }
    }
}

@Composable
fun HealthRecordsTab(livestockId: Long, viewModel: AnimalHealthRecordViewModel) {
    val records by viewModel.records.collectAsState()
    var showDialog by remember { mutableStateOf(false) }
    var editRecord by remember { mutableStateOf<AnimalHealthRecord?>(null) }
    var searchQuery by remember { mutableStateOf("") }
    var typeFilter by remember { mutableStateOf<String?>(null) }
    var startDate by remember { mutableStateOf("") }
    var endDate by remember { mutableStateOf("") }
    val dateFormat = SimpleDateFormat("yyyy-MM-dd")
    val filtered = records.filter {
        (typeFilter == null || it.eventType.equals(typeFilter, true)) &&
        (searchQuery.isBlank() || it.eventType.contains(searchQuery, true) || it.notes.contains(searchQuery, true) || it.vet.contains(searchQuery, true) || it.medication.contains(searchQuery, true)) &&
        (startDate.isBlank() || runCatching { dateFormat.parse(it.date) >= dateFormat.parse(startDate) }.getOrDefault(true)) &&
        (endDate.isBlank() || runCatching { dateFormat.parse(it.date) <= dateFormat.parse(endDate) }.getOrDefault(true))
    }
    // Analytics
    val total = filtered.size
    val byType = filtered.groupingBy { it.eventType }.eachCount()
    val mostRecent = filtered.maxByOrNull { it.date }
    val mostFrequent = byType.maxByOrNull { it.value }?.key
    val monthFormatter = DateTimeFormatter.ofPattern("yyyy-MM").withZone(ZoneId.systemDefault())
    val byMonth = filtered.groupingBy { it.date.take(7) }.eachCount().toSortedMap()
    // Longest healthy streak (days since last illness)
    val illnessDates = filtered.filter { it.eventType.contains("ill", true) }.mapNotNull { runCatching { dateFormat.parse(it.date) }.getOrNull() }.sorted()
    val lastIllness = illnessDates.lastOrNull()
    val healthyStreak = if (lastIllness != null) ((Date().time - lastIllness.time) / (1000 * 60 * 60 * 24)) else null
    // UI
    Row(Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
        Text("Total: $total", style = MaterialTheme.typography.bodySmall)
        if (byType.isNotEmpty()) Text("By Type: " + byType.entries.joinToString { "${it.key}(${it.value})" }, style = MaterialTheme.typography.bodySmall)
        if (mostRecent != null) Text("Most Recent: ${mostRecent.date}", style = MaterialTheme.typography.bodySmall)
    }
    Row(Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
        if (mostFrequent != null) Text("Most Frequent: $mostFrequent", style = MaterialTheme.typography.bodySmall)
        if (healthyStreak != null) Text("Healthy Streak: $healthyStreak days", style = MaterialTheme.typography.bodySmall)
    }
    Row(Modifier.fillMaxWidth(), verticalAlignment = Alignment.CenterVertically) {
        OutlinedTextField(value = searchQuery, onValueChange = { searchQuery = it }, label = { Text("Search...") }, modifier = Modifier.weight(1f))
        Spacer(Modifier.width(8.dp))
        DropdownMenuField(label = typeFilter ?: "Type", options = listOf("All") + records.map { it.eventType }.distinct(), selected = typeFilter ?: "All", onSelected = { typeFilter = if (it == "All") null else it })
    }
    Row(Modifier.fillMaxWidth(), verticalAlignment = Alignment.CenterVertically) {
        OutlinedTextField(value = startDate, onValueChange = { startDate = it }, label = { Text("Start Date (yyyy-MM-dd)") }, modifier = Modifier.weight(1f))
        Spacer(Modifier.width(8.dp))
        OutlinedTextField(value = endDate, onValueChange = { endDate = it }, label = { Text("End Date (yyyy-MM-dd)") }, modifier = Modifier.weight(1f))
    }
    // Charts
    if (byType.isNotEmpty()) {
        Text("Events by Type:", style = MaterialTheme.typography.bodySmall)
        BarChart(data = byType)
    }
    if (byMonth.isNotEmpty()) {
        Text("Events per Month:", style = MaterialTheme.typography.bodySmall)
        LineChart(data = byMonth)
    }
    Row(Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.End) {
        Button(onClick = {
            // Export analytics CSV
            val csv = buildString {
                append("type,count\n")
                byType.forEach { (k, v) -> append("$k,$v\n") }
            }
            val context = LocalContext.current
            val shareIntent = Intent(Intent.ACTION_SEND).apply {
                type = "text/csv"
                putExtra(Intent.EXTRA_TEXT, csv)
                putExtra(Intent.EXTRA_SUBJECT, "Health Analytics Export")
            }
            startActivity(context, Intent.createChooser(shareIntent, "Export Health Analytics"), null)
        }) { Text("Export Analytics CSV") }
        Spacer(Modifier.width(8.dp))
        Button(onClick = {
            // Export analytics PDF
            val context = LocalContext.current
            val pdfDoc = PdfDocument()
            val paint = android.graphics.Paint().apply { textSize = 12f }
            val page = pdfDoc.startPage(PdfDocument.PageInfo.Builder(595, 842, 1).create())
            val canvas = page.canvas
            var y = 40f
            canvas.drawText("Health Events by Type", 20f, y, paint); y += 20f
            byType.forEach { (k, v) -> canvas.drawText("$k: $v", 40f, y, paint); y += 18f }
            y += 20f
            canvas.drawText("Events per Month", 20f, y, paint); y += 20f
            byMonth.forEach { (k, v) -> canvas.drawText("$k: $v", 40f, y, paint); y += 18f }
            pdfDoc.finishPage(page)
            val file = File(context.cacheDir, "health_analytics.pdf")
            pdfDoc.writeTo(file.outputStream())
            pdfDoc.close()
            val uri = FileProvider.getUriForFile(context, context.packageName + ".provider", file)
            val shareIntent = Intent(Intent.ACTION_SEND).apply {
                type = "application/pdf"
                putExtra(Intent.EXTRA_STREAM, uri)
                addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION)
            }
            startActivity(context, Intent.createChooser(shareIntent, "Export Health Analytics PDF"), null)
        }) { Text("Export Analytics PDF") }
    }
    // ... rest of HealthRecordsTab ...
}

@Composable
fun HealthRecordDialog(initial: AnimalHealthRecord?, livestockId: Long, onDismiss: () -> Unit, onSave: (AnimalHealthRecord) -> Unit) {
    var date by remember { mutableStateOf(initial?.date ?: "") }
    var eventType by remember { mutableStateOf(initial?.eventType ?: "") }
    var notes by remember { mutableStateOf(initial?.notes ?: "") }
    var vet by remember { mutableStateOf(initial?.vet ?: "") }
    var medication by remember { mutableStateOf(initial?.medication ?: "") }
    AlertDialog(
        onDismissRequest = onDismiss,
        title = { Text(if (initial == null) "Add Health Record" else "Edit Health Record") },
        text = {
            Column {
                OutlinedTextField(value = date, onValueChange = { date = it }, label = { Text("Date (YYYY-MM-DD)") })
                OutlinedTextField(value = eventType, onValueChange = { eventType = it }, label = { Text("Event Type") })
                OutlinedTextField(value = notes, onValueChange = { notes = it }, label = { Text("Notes") })
                OutlinedTextField(value = vet, onValueChange = { vet = it }, label = { Text("Vet") })
                OutlinedTextField(value = medication, onValueChange = { medication = it }, label = { Text("Medication") })
            }
        },
        confirmButton = {
            Button(onClick = {
                onSave(
                    AnimalHealthRecord(
                        id = initial?.id ?: 0,
                        animalId = livestockId,
                        date = date,
                        eventType = eventType,
                        notes = notes,
                        vet = vet,
                        medication = medication
                    )
                )
            }) { Text("Save") }
        },
        dismissButton = {
            OutlinedButton(onClick = onDismiss) { Text("Cancel") }
        }
    )
}

@Composable
fun YieldRecordsTab(livestockId: Long, viewModel: YieldRecordViewModel) {
    val records by viewModel.records.collectAsState()
    var showDialog by remember { mutableStateOf(false) }
    var editRecord by remember { mutableStateOf<YieldRecord?>(null) }
    var searchQuery by remember { mutableStateOf("") }
    var typeFilter by remember { mutableStateOf<String?>(null) }
    var startDate by remember { mutableStateOf("") }
    var endDate by remember { mutableStateOf("") }
    val dateFormat = SimpleDateFormat("yyyy-MM-dd")
    val filtered = records.filter {
        (typeFilter == null || it.yieldType.equals(typeFilter, true)) &&
        (searchQuery.isBlank() || it.yieldType.contains(searchQuery, true) || it.notes.contains(searchQuery, true)) &&
        (startDate.isBlank() || runCatching { dateFormat.parse(it.date) >= dateFormat.parse(startDate) }.getOrDefault(true)) &&
        (endDate.isBlank() || runCatching { dateFormat.parse(it.date) <= dateFormat.parse(endDate) }.getOrDefault(true))
    }
    // Analytics
    val total = filtered.size
    val byType = filtered.groupingBy { it.yieldType }.eachCount()
    val totalYield = filtered.sumOf { it.quantity }
    val avgYield = if (filtered.isNotEmpty()) totalYield / filtered.size else 0.0
    val bestDay = filtered.maxByOrNull { it.quantity }
    val monthFormatter = DateTimeFormatter.ofPattern("yyyy-MM").withZone(ZoneId.systemDefault())
    val byMonth = filtered.groupingBy { it.date.take(7) }.eachCount().toSortedMap()
    val byTypeQty = filtered.groupBy { it.yieldType }.mapValues { it.value.sumOf { r -> r.quantity } }
    val bestMonth = byMonth.maxByOrNull { it.value }?.key
    val worstMonth = byMonth.minByOrNull { it.value }?.key
    val topType = byTypeQty.maxByOrNull { it.value }?.key
    // UI
    Row(Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
        Text("Total: $total", style = MaterialTheme.typography.bodySmall)
        if (byType.isNotEmpty()) Text("By Type: " + byType.entries.joinToString { "${it.key}(${it.value})" }, style = MaterialTheme.typography.bodySmall)
        Text("Total Yield: ${"%.2f".format(totalYield)}", style = MaterialTheme.typography.bodySmall)
        Text("Avg: ${"%.2f".format(avgYield)}", style = MaterialTheme.typography.bodySmall)
        if (bestDay != null) Text("Best: ${bestDay.date} ${bestDay.quantity} ${bestDay.unit}", style = MaterialTheme.typography.bodySmall)
    }
    Row(Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
        if (bestMonth != null) Text("Best Month: $bestMonth", style = MaterialTheme.typography.bodySmall)
        if (worstMonth != null) Text("Worst Month: $worstMonth", style = MaterialTheme.typography.bodySmall)
        if (topType != null) Text("Top Type: $topType", style = MaterialTheme.typography.bodySmall)
    }
    Row(Modifier.fillMaxWidth(), verticalAlignment = Alignment.CenterVertically) {
        OutlinedTextField(value = searchQuery, onValueChange = { searchQuery = it }, label = { Text("Search...") }, modifier = Modifier.weight(1f))
        Spacer(Modifier.width(8.dp))
        DropdownMenuField(label = typeFilter ?: "Type", options = listOf("All") + records.map { it.yieldType }.distinct(), selected = typeFilter ?: "All", onSelected = { typeFilter = if (it == "All") null else it })
    }
    Row(Modifier.fillMaxWidth(), verticalAlignment = Alignment.CenterVertically) {
        OutlinedTextField(value = startDate, onValueChange = { startDate = it }, label = { Text("Start Date (yyyy-MM-dd)") }, modifier = Modifier.weight(1f))
        Spacer(Modifier.width(8.dp))
        OutlinedTextField(value = endDate, onValueChange = { endDate = it }, label = { Text("End Date (yyyy-MM-dd)") }, modifier = Modifier.weight(1f))
    }
    // Charts
    if (byTypeQty.isNotEmpty()) {
        Text("Yield by Type:", style = MaterialTheme.typography.bodySmall)
        BarChartDbl(data = byTypeQty)
    }
    if (byMonth.isNotEmpty()) {
        Text("Yield Events per Month:", style = MaterialTheme.typography.bodySmall)
        LineChart(data = byMonth)
    }
    if (byTypeQty.isNotEmpty()) {
        Text("Yield Type Distribution:", style = MaterialTheme.typography.bodySmall)
        PieChartDbl(data = byTypeQty)
    }
    Row(Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.End) {
        Button(onClick = {
            // Export analytics CSV
            val csv = buildString {
                append("type,quantity\n")
                byTypeQty.forEach { (k, v) -> append("$k,$v\n") }
            }
            val context = LocalContext.current
            val shareIntent = Intent(Intent.ACTION_SEND).apply {
                type = "text/csv"
                putExtra(Intent.EXTRA_TEXT, csv)
                putExtra(Intent.EXTRA_SUBJECT, "Yield Analytics Export")
            }
            startActivity(context, Intent.createChooser(shareIntent, "Export Yield Analytics"), null)
        }) { Text("Export Analytics CSV") }
        Spacer(Modifier.width(8.dp))
        Button(onClick = {
            // Export analytics PDF
            val context = LocalContext.current
            val pdfDoc = PdfDocument()
            val paint = android.graphics.Paint().apply { textSize = 12f }
            val page = pdfDoc.startPage(PdfDocument.PageInfo.Builder(595, 842, 1).create())
            val canvas = page.canvas
            var y = 40f
            canvas.drawText("Yield by Type", 20f, y, paint); y += 20f
            byTypeQty.forEach { (k, v) -> canvas.drawText("$k: $v", 40f, y, paint); y += 18f }
            y += 20f
            canvas.drawText("Yield Events per Month", 20f, y, paint); y += 20f
            byMonth.forEach { (k, v) -> canvas.drawText("$k: $v", 40f, y, paint); y += 18f }
            pdfDoc.finishPage(page)
            val file = File(context.cacheDir, "yield_analytics.pdf")
            pdfDoc.writeTo(file.outputStream())
            pdfDoc.close()
            val uri = FileProvider.getUriForFile(context, context.packageName + ".provider", file)
            val shareIntent = Intent(Intent.ACTION_SEND).apply {
                type = "application/pdf"
                putExtra(Intent.EXTRA_STREAM, uri)
                addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION)
            }
            startActivity(context, Intent.createChooser(shareIntent, "Export Yield Analytics PDF"), null)
        }) { Text("Export Analytics PDF") }
    }
    // ... rest of YieldRecordsTab ...
}

@Composable
fun YieldRecordDialog(initial: YieldRecord?, livestockId: Long, onDismiss: () -> Unit, onSave: (YieldRecord) -> Unit) {
    var date by remember { mutableStateOf(initial?.date ?: "") }
    var yieldType by remember { mutableStateOf(initial?.yieldType ?: "") }
    var quantity by remember { mutableStateOf(initial?.quantity?.toString() ?: "") }
    var unit by remember { mutableStateOf(initial?.unit ?: "") }
    var notes by remember { mutableStateOf(initial?.notes ?: "") }
    AlertDialog(
        onDismissRequest = onDismiss,
        title = { Text(if (initial == null) "Add Yield Record" else "Edit Yield Record") },
        text = {
            Column {
                OutlinedTextField(value = date, onValueChange = { date = it }, label = { Text("Date (YYYY-MM-DD)") })
                OutlinedTextField(value = yieldType, onValueChange = { yieldType = it }, label = { Text("Yield Type") })
                OutlinedTextField(value = quantity, onValueChange = { quantity = it }, label = { Text("Quantity") })
                OutlinedTextField(value = unit, onValueChange = { unit = it }, label = { Text("Unit") })
                OutlinedTextField(value = notes, onValueChange = { notes = it }, label = { Text("Notes") })
            }
        },
        confirmButton = {
            Button(onClick = {
                onSave(
                    YieldRecord(
                        id = initial?.id ?: 0,
                        animalId = livestockId,
                        date = date,
                        yieldType = yieldType,
                        quantity = quantity.toDoubleOrNull() ?: 0.0,
                        unit = unit,
                        notes = notes
                    )
                )
            }) { Text("Save") }
        },
        dismissButton = {
            OutlinedButton(onClick = onDismiss) { Text("Cancel") }
        }
    )
}

@Composable
fun SectionHeader(text: String) {
    Text(text, style = MaterialTheme.typography.titleSmall.copy(fontWeight = FontWeight.SemiBold), modifier = Modifier.padding(vertical = 4.dp))
}

@Composable
fun InfoRow(label: String, value: String) {
    Row(Modifier.fillMaxWidth().padding(vertical = 2.dp), horizontalArrangement = Arrangement.SpaceBetween) {
        Text(label + ":", style = MaterialTheme.typography.bodySmall, fontWeight = FontWeight.Medium)
        Text(value, style = MaterialTheme.typography.bodySmall)
    }
}

@Composable
fun FlowRowChips(items: List<String>) {
    Row(Modifier.fillMaxWidth().padding(bottom = 4.dp)) {
        items.forEach { item ->
            AssistChip(
                onClick = {},
                label = { Text(item) },
                modifier = Modifier.padding(end = 4.dp, bottom = 2.dp),
                colors = AssistChipDefaults.assistChipColors()
            )
        }
    }
}

fun getStaticMapUrl(gpsLink: String): String? {
    val coordRegex = Regex("^-?\\d+\\.\\d+,-?\\d+\\.\\d+$")
    return when {
        coordRegex.matches(gpsLink.trim()) -> {
            val coords = gpsLink.trim()
            // Google Static Maps preview for coordinates
            "https://maps.googleapis.com/maps/api/staticmap?center=$coords&zoom=15&size=400x200&markers=color:red|$coords&key=YOUR_API_KEY"
        }
        gpsLink.contains("maps.google.com") -> {
            val match = Regex("@(-?\\d+\\.\\d+),(-?\\d+\\.\\d+)").find(gpsLink)
            if (match != null) {
                val (lat, lng) = match.destructured
                "https://maps.googleapis.com/maps/api/staticmap?center=$lat,$lng&zoom=15&size=400x200&markers=color:red|$lat,$lng&key=YOUR_API_KEY"
            } else null
        }
        gpsLink.contains("openstreetmap.org") -> {
            // Try to extract coordinates from OSM URL
            val match = Regex("#map=\\d+/(-?\\d+\\.\\d+)/(-?\\d+\\.\\d+)").find(gpsLink)
            if (match != null) {
                val (lat, lng) = match.destructured.drop(1)
                "https://staticmap.openstreetmap.de/staticmap.php?center=$lat,$lng&zoom=15&size=400x200&markers=$lat,$lng,red-pushpin"
            } else null
        }
        gpsLink.contains("bing.com/maps") -> {
            // Bing Maps does not provide a free static map API, so just return null
            null
        }
        gpsLink.contains("apple.com/maps") -> {
            // Apple Maps does not provide a public static map API, so just return null
            null
        }
        else -> null
    }
}

fun getMapIntentUrl(gpsLink: String): String {
    val coordRegex = Regex("^-?\\d+\\.\\d+,-?\\d+\\.\\d+$")
    return when {
        coordRegex.matches(gpsLink.trim()) -> {
            val coords = gpsLink.trim()
            // Prefer Google Maps, but also support OSM and Apple Maps
            "https://maps.google.com/?q=$coords"
        }
        gpsLink.contains("maps.google.com") -> gpsLink
        gpsLink.contains("openstreetmap.org") -> gpsLink
        gpsLink.contains("bing.com/maps") -> gpsLink
        gpsLink.contains("apple.com/maps") -> gpsLink
        else -> gpsLink
    }
}

@Composable
fun DashboardDialog(livestockList: List<Livestock>, onDismiss: () -> Unit, highlightAnimalIds: List<Long>? = null) {
    val context = LocalContext.current
    val db = remember(context) { FarmDatabase.getDatabase(context) }
    val healthRepo = remember { AnimalHealthRecordRepository(db.animalHealthRecordDao()) }
    val healthViewModel: AnimalHealthRecordViewModel = androidx.lifecycle.viewmodel.compose.viewModel(factory = AnimalHealthRecordViewModelFactory(healthRepo))
    val yieldRepo = remember { YieldRecordRepository(db.yieldRecordDao()) }
    val yieldViewModel: YieldRecordViewModel = androidx.lifecycle.viewmodel.compose.viewModel(factory = YieldRecordViewModelFactory(yieldRepo))
    val ackRepo = remember { OutlierAcknowledgmentRepository(db.outlierAcknowledgmentDao()) }
    val ackViewModel: OutlierAcknowledgmentViewModel = androidx.lifecycle.viewmodel.compose.viewModel(factory = OutlierAcknowledgmentViewModelFactory(ackRepo))
    val acks by ackViewModel.acks.collectAsState()
    LaunchedEffect(Unit) { ackViewModel.loadAll() }
    val healthRecords by healthViewModel.records.collectAsState()
    val yieldRecords by yieldViewModel.records.collectAsState()
    // Tag assignment
    var tagAssignments by remember { mutableStateOf(mutableMapOf<Long, MutableSet<String>>()) }
    val allTags = tagAssignments.values.flatten().toSet().toList() + listOf("Breeding", "Sick", "High Yield")
    var selectedTag by remember { mutableStateOf<String?>(null) }
    val tagLivestock = if (selectedTag == null) livestockList else livestockList.filter { tagAssignments[it.id]?.contains(selectedTag) == true }
    // Group selector
    val allSubcategories = tagLivestock.map { it.subCategory }.distinct().filter { it.isNotBlank() }
    var selectedGroup by remember { mutableStateOf<String?>(null) }
    val groupLivestock = if (selectedGroup == null) tagLivestock else tagLivestock.filter { it.subCategory == selectedGroup }
    val highlighted = highlightAnimalIds?.toSet() ?: emptySet()
    val groupByCategory = groupLivestock.groupBy { it.category.name }
    val groupStats = groupByCategory.mapValues { (cat, animals) ->
        val ids = animals.map { it.id }
        val health = healthRecords.filter { it.animalId in ids }
        val yieldR = yieldRecords.filter { it.animalId in ids }
        val totalYield = yieldR.sumOf { it.quantity }
        val avgYield = if (yieldR.isNotEmpty()) totalYield / yieldR.size else 0.0
        val healthEvents = health.size
        val yieldByType = yieldR.groupBy { it.yieldType }.mapValues { it.value.sumOf { r -> r.quantity } }
        DashboardGroupStats(
            totalYield = totalYield,
            avgYield = avgYield,
            healthEvents = healthEvents,
            yieldByType = yieldByType
        )
    }
    // Outlier detection
    val yieldByAnimal = groupLivestock.associateWith { l -> yieldRecords.filter { it.animalId == l.id }.sumOf { it.quantity } }
    val healthByAnimal = groupLivestock.associateWith { l -> healthRecords.count { it.animalId == l.id } }
    val avgYield = yieldByAnimal.values.average().takeIf { yieldByAnimal.isNotEmpty() } ?: 0.0
    val yieldOutliers = yieldByAnimal.filter { (l, y) -> y < avgYield * 0.5 || y > avgYield * 1.5 }
    val healthOutliers = healthByAnimal.filter { (l, h) -> h > 5 }
    // Per-animal comparison
    var selectedAnimals by remember { mutableStateOf(setOf<Long>()) }
    val animalOptions = groupLivestock.map { it.id to it.name }
    val comparisonYields = selectedAnimals.map { id ->
        val animal = livestockList.find { it.id == id }
        val yields = yieldRecords.filter { it.animalId == id }.groupBy { it.date.take(7) }.mapValues { it.value.sumOf { r -> r.quantity } }
        animal?.name to yields
    }
    val comparisonHealth = selectedAnimals.map { id ->
        val animal = livestockList.find { it.id == id }
        val health = healthRecords.filter { it.animalId == id }.groupBy { it.date.take(7) }.mapValues { it.value.size }
        animal?.name to health
    }
    val topAnimal = groupLivestock.maxByOrNull { id -> yieldRecords.filter { it.animalId == id.id }.sumOf { it.quantity } }
    val bottomAnimal = groupLivestock.minByOrNull { id -> yieldRecords.filter { it.animalId == id.id }.sumOf { it.quantity } }
    val noRecentYield = groupLivestock.filter { l -> yieldRecords.none { it.animalId == l.id && it.date.take(7) == SimpleDateFormat("yyyy-MM").format(Date()) } }
    var showScheduleDialog by remember { mutableStateOf(false) }
    val acknowledged = acks.map { it.animalId }.toSet()
    Dialog(onDismissRequest = onDismiss) {
        Surface(shape = MaterialTheme.shapes.medium, tonalElevation = 8.dp) {
            Column(Modifier.padding(24.dp).widthIn(min = 340.dp, max = 600.dp)) {
                Text("Dashboard", style = MaterialTheme.typography.titleLarge, fontWeight = FontWeight.Bold)
                Spacer(Modifier.height(8.dp))
                // Tag selector
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Text("Tag:", style = MaterialTheme.typography.bodySmall)
                    Spacer(Modifier.width(8.dp))
                    DropdownMenuField(label = selectedTag ?: "All", options = listOf("All") + allTags, selected = selectedTag ?: "All", onSelected = { selectedTag = if (it == "All") null else it })
                }
                Spacer(Modifier.height(8.dp))
                // Tag assignment UI
                Text("Assign Tags:", style = MaterialTheme.typography.labelSmall)
                FlowRow {
                    livestockList.forEach { animal ->
                        Row(verticalAlignment = Alignment.CenterVertically, modifier = Modifier.padding(end = 8.dp, bottom = 2.dp)) {
                            Text(animal.name, style = MaterialTheme.typography.bodySmall)
                            allTags.forEach { tag ->
                                Checkbox(
                                    checked = tagAssignments[animal.id]?.contains(tag) == true,
                                    onCheckedChange = { checked ->
                                        tagAssignments = tagAssignments.toMutableMap().apply {
                                            val set = getOrPut(animal.id) { mutableSetOf() }
                                            if (checked) set.add(tag) else set.remove(tag)
                                        }
                                    }
                                )
                                Text(tag, style = MaterialTheme.typography.labelSmall)
                            }
                        }
                    }
                }
                Spacer(Modifier.height(8.dp))
                // Group selector
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Text("Group:", style = MaterialTheme.typography.bodySmall)
                    Spacer(Modifier.width(8.dp))
                    DropdownMenuField(label = selectedGroup ?: "All", options = listOf("All") + allSubcategories, selected = selectedGroup ?: "All", onSelected = { selectedGroup = if (it == "All") null else it })
                }
                Spacer(Modifier.height(8.dp))
                // Outlier alert widgets
                Row(Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
                    Column(Modifier.weight(1f)) {
                        Text("Yield Outliers", style = MaterialTheme.typography.labelSmall, color = Color.Red)
                        Text(yieldOutliers.keys.joinToString { it.name }, fontWeight = FontWeight.Bold, maxLines = 1)
                    }
                    Column(Modifier.weight(1f)) {
                        Text("Health Outliers", style = MaterialTheme.typography.labelSmall, color = Color.Red)
                        Text(healthOutliers.keys.joinToString { it.name }, fontWeight = FontWeight.Bold, maxLines = 1)
                    }
                }
                Spacer(Modifier.height(8.dp))
                // Dashboard widgets
                Row(Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
                    Column(Modifier.weight(1f)) {
                        Text("Top Producer", style = MaterialTheme.typography.labelSmall)
                        Text(topAnimal?.name ?: "-", fontWeight = FontWeight.Bold, color = when {
                            topAnimal?.id in acknowledged -> Color.Green
                            topAnimal?.id in highlighted -> Color.Red
                            else -> Color.Unspecified
                        })
                    }
                    Column(Modifier.weight(1f)) {
                        Text("Lowest Producer", style = MaterialTheme.typography.labelSmall)
                        Text(bottomAnimal?.name ?: "-", fontWeight = FontWeight.Bold, color = when {
                            bottomAnimal?.id in acknowledged -> Color.Green
                            bottomAnimal?.id in highlighted -> Color.Red
                            else -> Color.Unspecified
                        })
                    }
                    Column(Modifier.weight(1f)) {
                        Text("No Recent Yield", style = MaterialTheme.typography.labelSmall)
                        Text(noRecentYield.joinToString { it.name }, fontWeight = FontWeight.Bold, maxLines = 1, color = when {
                            noRecentYield.any { it.id in acknowledged } -> Color.Green
                            noRecentYield.any { it.id in highlighted } -> Color.Red
                            else -> Color.Unspecified
                        })
                    }
                }
                Spacer(Modifier.height(8.dp))
                Text("Group Analytics", style = MaterialTheme.typography.titleSmall, fontWeight = FontWeight.Bold)
                groupStats.forEach { (cat, stats) ->
                    Text("$cat: Total Yield: ${"%.1f".format(stats.totalYield)}, Avg: ${"%.1f".format(stats.avgYield)}, Health Events: ${stats.healthEvents}", style = MaterialTheme.typography.bodySmall)
                    if (stats.yieldByType.isNotEmpty()) BarChartDbl(stats.yieldByType)
                }
                Spacer(Modifier.height(8.dp))
                // Per-animal comparison selector
                Text("Compare Animals:", style = MaterialTheme.typography.titleSmall)
                FlowRow {
                    animalOptions.forEach { (id, name) ->
                        AssistChip(
                            onClick = {
                                selectedAnimals = if (selectedAnimals.contains(id)) selectedAnimals - id else selectedAnimals + id
                            },
                            label = { Text(name) },
                            leadingIcon = if (selectedAnimals.contains(id)) { { Icon(Icons.Default.Check, contentDescription = null) } } else null,
                            modifier = Modifier.padding(end = 4.dp, bottom = 2.dp),
                            colors = when {
                                id in acknowledged -> AssistChipDefaults.assistChipColors(containerColor = Color.Green.copy(alpha = 0.2f))
                                id in highlighted -> AssistChipDefaults.assistChipColors(containerColor = Color.Red.copy(alpha = 0.2f))
                                else -> AssistChipDefaults.assistChipColors()
                            }
                        )
                    }
                }
                if (selectedAnimals.isNotEmpty()) {
                    Text("Yield Comparison", style = MaterialTheme.typography.bodySmall)
                    ComparisonLineChart(comparisonYields)
                    Text("Health Events Comparison", style = MaterialTheme.typography.bodySmall)
                    ComparisonLineChart(comparisonHealth)
                }
                Spacer(Modifier.height(8.dp))
                Row(Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.End) {
                    Button(onClick = { showScheduleDialog = true }) { Text("Schedule Report") }
                    Spacer(Modifier.width(8.dp))
                    Button(onClick = {
                        // Export dashboard CSV
                        val csv = buildString {
                            append("category,totalYield,avgYield,healthEvents\n")
                            groupStats.forEach { (cat, stats) ->
                                append("$cat,${stats.totalYield},${stats.avgYield},${stats.healthEvents}\n")
                            }
                        }
                        val shareIntent = Intent(Intent.ACTION_SEND).apply {
                            type = "text/csv"
                            putExtra(Intent.EXTRA_TEXT, csv)
                            putExtra(Intent.EXTRA_SUBJECT, "Dashboard Analytics Export")
                        }
                        startActivity(context, Intent.createChooser(shareIntent, "Export Dashboard Analytics"), null)
                    }) { Text("Export CSV") }
                    Spacer(Modifier.width(8.dp))
                    Button(onClick = {
                        // Export dashboard PDF
                        val pdfDoc = PdfDocument()
                        val paint = android.graphics.Paint().apply { textSize = 12f }
                        val page = pdfDoc.startPage(PdfDocument.PageInfo.Builder(595, 842, 1).create())
                        val canvas = page.canvas
                        var y = 40f
                        canvas.drawText("Dashboard Group Analytics", 20f, y, paint); y += 20f
                        groupStats.forEach { (cat, stats) ->
                            canvas.drawText("$cat: Total Yield: ${"%.1f".format(stats.totalYield)}, Avg: ${"%.1f".format(stats.avgYield)}, Health Events: ${stats.healthEvents}", 40f, y, paint); y += 18f
                        }
                        y += 20f
                        canvas.drawText("Top Animal: ${topAnimal?.name ?: "-"}", 20f, y, paint); y += 18f
                        canvas.drawText("Bottom Animal: ${bottomAnimal?.name ?: "-"}", 20f, y, paint); y += 18f
                        pdfDoc.finishPage(page)
                        val file = File(context.cacheDir, "dashboard_analytics.pdf")
                        pdfDoc.writeTo(file.outputStream())
                        pdfDoc.close()
                        val uri = FileProvider.getUriForFile(context, context.packageName + ".provider", file)
                        val shareIntent = Intent(Intent.ACTION_SEND).apply {
                            type = "application/pdf"
                            putExtra(Intent.EXTRA_STREAM, uri)
                            addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION)
                        }
                        startActivity(context, Intent.createChooser(shareIntent, "Export Dashboard Analytics PDF"), null)
                    }) { Text("Export PDF") }
                }
                if (showScheduleDialog) {
                    ScheduledReportDialog(onDismiss = { showScheduleDialog = false })
                }
                Spacer(Modifier.height(8.dp))
                OutlinedButton(onClick = onDismiss, modifier = Modifier.align(Alignment.End)) { Text("Close") }
                // Outlier review dialog
                var showOutlierReview by remember { mutableStateOf(highlightAnimalIds?.isNotEmpty() == true) }
                // Manual review button
                Button(onClick = { showOutlierReview = true }, modifier = Modifier.padding(vertical = 8.dp)) {
                    Text("Review Outliers")
                }
                // Export acknowledgment logs
                Button(onClick = {
                    val csv = buildString {
                        append("animalId,note,timestamp\n")
                        acks.forEach { ack ->
                            append("${ack.animalId},${ack.note.replace(",", ";")},${ack.timestamp}\n")
                        }
                    }
                    val context = LocalContext.current
                    val shareIntent = Intent(Intent.ACTION_SEND).apply {
                        type = "text/csv"
                        putExtra(Intent.EXTRA_TEXT, csv)
                        putExtra(Intent.EXTRA_SUBJECT, "Outlier Acknowledgments Export")
                    }
                    startActivity(context, Intent.createChooser(shareIntent, "Export Outlier Acknowledgments"), null)
                }, modifier = Modifier.padding(vertical = 8.dp)) {
                    Text("Export Outlier Acknowledgments")
                }
                if (showOutlierReview) {
                    OutlierReviewDialog(
                        animalIds = livestockList.map { it.id }, // All livestock for manual review
                        livestockList = livestockList,
                        acknowledged = acknowledged,
                        onAcknowledge = { animalId, note -> ackViewModel.insert(OutlierAcknowledgment(animalId = animalId, note = note)) },
                        onDismiss = { showOutlierReview = false },
                        filterUnacknowledged = true
                    )
                }
                if (showOutlierReview && highlightAnimalIds != null && highlightAnimalIds.isNotEmpty()) {
                    OutlierReviewDialog(
                        animalIds = highlightAnimalIds,
                        livestockList = livestockList,
                        acknowledged = acknowledged,
                        onAcknowledge = { animalId, note -> ackViewModel.insert(OutlierAcknowledgment(animalId = animalId, note = note)) },
                        onDismiss = { showOutlierReview = false },
                        filterUnacknowledged = true
                    )
                }
            }
        }
    }
}

@Composable
fun ScheduledReportDialog(onDismiss: () -> Unit) {
    var email by remember { mutableStateOf("") }
    var frequency by remember { mutableStateOf("Weekly") }
    Dialog(onDismissRequest = onDismiss) {
        Surface(shape = MaterialTheme.shapes.medium, tonalElevation = 8.dp) {
            Column(Modifier.padding(24.dp).widthIn(min = 320.dp, max = 400.dp)) {
                Text("Schedule Report (Stub)", style = MaterialTheme.typography.titleLarge, fontWeight = FontWeight.Bold)
                Spacer(Modifier.height(8.dp))
                OutlinedTextField(value = email, onValueChange = { email = it }, label = { Text("Email Address") })
                Spacer(Modifier.height(8.dp))
                DropdownMenuField(label = frequency, options = listOf("Daily", "Weekly", "Monthly"), selected = frequency, onSelected = { frequency = it })
                Spacer(Modifier.height(16.dp))
                Text("(This is a stub. In a real app, this would schedule a backend job to email reports.)", style = MaterialTheme.typography.bodySmall, color = Color.Gray)
                Spacer(Modifier.height(16.dp))
                OutlinedButton(onClick = onDismiss, modifier = Modifier.align(Alignment.End)) { Text("Close") }
            }
        }
    }
}

@Composable
fun ComparisonLineChart(data: List<Pair<String?, Map<String, Int>>>) {
    val months = data.flatMap { it.second.keys }.distinct().sorted()
    val colors = listOf(Color(0xFF1976D2), Color(0xFF388E3C), Color(0xFFFBC02D), Color(0xFFD32F2F), Color(0xFF7B1FA2), Color(0xFF0097A7))
    Canvas(Modifier.width((months.size * 40).dp).height(120.dp)) {
        data.forEachIndexed { idx, (name, map) ->
            val points = months.mapIndexed { i, m -> Offset(i * 40f + 20f, 100f - (map[m] ?: 0) * 80f / (data.flatMap { it.second.values }.maxOrNull() ?: 1).coerceAtLeast(1)) }
            for (i in 1 until points.size) {
                drawLine(colors[idx % colors.size], points[i - 1], points[i], strokeWidth = 4f)
            }
            points.forEachIndexed { i, p ->
                drawCircle(colors[idx % colors.size], radius = 6f, center = p)
                drawContext.canvas.nativeCanvas.apply {
                    drawText(months.getOrNull(i) ?: "", p.x - 10, 110f, android.graphics.Paint().apply { textSize = 12f })
                    drawText((map[months.getOrNull(i)] ?: 0).toString(), p.x - 10, p.y - 10, android.graphics.Paint().apply { textSize = 12f })
                }
            }
        }
    }
    Row(Modifier.fillMaxWidth()) {
        data.forEachIndexed { idx, (name, _) ->
            Box(Modifier.size(12.dp).background(colors[idx % colors.size], shape = MaterialTheme.shapes.small))
            Spacer(Modifier.width(4.dp))
            Text(name ?: "-", style = MaterialTheme.typography.labelSmall)
            Spacer(Modifier.width(8.dp))
        }
    }
}

data class DashboardGroupStats(
    val totalYield: Double,
    val avgYield: Double,
    val healthEvents: Int,
    val yieldByType: Map<String, Double>
)

@Composable
fun FertilizerChemicalCalculatorDialog(
    plantList: List<Plant>,
    herbicides: List<Herbicide>,
    onDismiss: () -> Unit
) {
    val context = LocalContext.current
    val db = remember(context) { FarmDatabase.getDatabase(context) }
    val repository = remember { CalculationRepository(db.calculationDao()) }
    val viewModel: CalculationRecordViewModel = androidx.lifecycle.viewmodel.compose.viewModel(
        factory = CalculationRecordViewModelFactory(repository)
    )
    val records by viewModel.records.collectAsState()
    LaunchedEffect(Unit) { viewModel.loadRecords() }
    val fertilizerList = listOf("NPK 20-10-10", "Urea", "DAP", "Compost")
    var selectedType by remember { mutableStateOf("Herbicide") }
    var selectedPlant by remember { mutableStateOf<Plant?>(null) }
    var selectedHerbicide by remember { mutableStateOf<Herbicide?>(null) }
    var selectedFertilizer by remember { mutableStateOf("") }
    var area by remember { mutableStateOf("") }
    var customDosage by remember { mutableStateOf("") }
    var result by remember { mutableStateOf("") }
    Dialog(onDismissRequest = onDismiss) {
        Surface(shape = MaterialTheme.shapes.medium, tonalElevation = 8.dp) {
            Column(Modifier.padding(24.dp).widthIn(min = 300.dp, max = 400.dp)) {
                Text("Fertilizer/Chemical Usage Calculator", style = MaterialTheme.typography.titleLarge, fontWeight = FontWeight.Bold)
                Spacer(Modifier.height(8.dp))
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Text("Type:")
                    Spacer(Modifier.width(8.dp))
                    listOf("Herbicide", "Fertilizer").forEach {
                        OutlinedButton(onClick = { selectedType = it }, enabled = selectedType != it, modifier = Modifier.padding(end = 4.dp)) { Text(it) }
                    }
                }
                Spacer(Modifier.height(8.dp))
                DropdownMenuField(label = "Plant/Crop", options = plantList.map { it.name }, selected = selectedPlant?.name ?: "", onSelected = { name -> selectedPlant = plantList.find { it.name == name } })
                Spacer(Modifier.height(8.dp))
                if (selectedType == "Herbicide") {
                    DropdownMenuField(label = "Herbicide", options = herbicides.map { it.name } + listOf("Manual Entry"), selected = selectedHerbicide?.name ?: if (customDosage.isNotBlank()) "Manual Entry" else "", onSelected = { name ->
                        selectedHerbicide = herbicides.find { it.name == name }
                        if (name == "Manual Entry") selectedHerbicide = null
                    })
                } else {
                    DropdownMenuField(label = "Fertilizer", options = fertilizerList + listOf("Manual Entry"), selected = selectedFertilizer, onSelected = { selectedFertilizer = it })
                }
                Spacer(Modifier.height(8.dp))
                if ((selectedType == "Herbicide" && selectedHerbicide == null) || (selectedType == "Fertilizer" && (selectedFertilizer == "Manual Entry" || selectedFertilizer.isBlank()))) {
                    OutlinedTextField(value = customDosage, onValueChange = { customDosage = it }, label = { Text("Dosage Rate (e.g. 2L per hectare)") })
                } else if (selectedType == "Herbicide") {
                    Text("Dosage Rate: ${selectedHerbicide?.dosageRate ?: "-"}", style = MaterialTheme.typography.bodySmall)
                } else if (selectedType == "Fertilizer") {
                    Text("Dosage Rate: e.g. 50kg per hectare", style = MaterialTheme.typography.bodySmall)
                }
                Spacer(Modifier.height(8.dp))
                OutlinedTextField(value = area, onValueChange = { area = it }, label = { Text("Area (hectares)") }, singleLine = true)
                Spacer(Modifier.height(8.dp))
                Button(onClick = {
                    val rate = if (selectedType == "Herbicide") selectedHerbicide?.dosageRate ?: customDosage else customDosage.ifBlank { "50kg per hectare" }
                    val areaVal = area.toDoubleOrNull() ?: 0.0
                    val regex = Regex("([\d.]+)\\s*([a-zA-Z]+) per hectare")
                    val match = regex.find(rate)
                    if (match != null && areaVal > 0) {
                        val (amount, unit) = match.destructured
                        val total = amount.toDoubleOrNull()?.times(areaVal)
                        if (total != null) {
                            result = "Apply ${"%.2f".format(total)} $unit for $areaVal hectare(s)."
                        } else {
                            result = "Invalid dosage rate."
                        }
                    } else {
                        result = "Please enter a valid dosage rate and area."
                    }
                }, modifier = Modifier.fillMaxWidth()) {
                    Text("Calculate")
                }
                Spacer(Modifier.height(8.dp))
                if (result.isNotBlank()) {
                    Text(result, style = MaterialTheme.typography.bodyMedium, color = Color(0xFF1976D2))
                    Spacer(Modifier.height(8.dp))
                    Row(Modifier.fillMaxWidth()) {
                        Button(onClick = {
                            val record = com.yourcompany.smartfarm.data.model.CalculationRecord(
                                type = selectedType,
                                plant = selectedPlant?.name ?: "",
                                chemical = if (selectedType == "Herbicide") selectedHerbicide?.name ?: "Manual Entry" else selectedFertilizer,
                                dosageRate = if (selectedType == "Herbicide") selectedHerbicide?.dosageRate ?: customDosage else customDosage.ifBlank { "50kg per hectare" },
                                area = area,
                                result = result
                            )
                            viewModel.insert(record)
                        }, modifier = Modifier.weight(1f)) { Text("Save Calculation") }
                        Spacer(Modifier.width(8.dp))
                        Button(onClick = {
                            // Export/share result as text
                            val shareIntent = Intent(Intent.ACTION_SEND).apply {
                                type = "text/plain"
                                putExtra(Intent.EXTRA_TEXT, result)
                            }
                            startActivity(context, Intent.createChooser(shareIntent, "Share Calculation"), null)
                        }, modifier = Modifier.weight(1f)) { Text("Export/Share") }
                    }
                }
                if (records.isNotEmpty()) {
                    Spacer(Modifier.height(12.dp))
                    // Date range filter
                    var startDate by remember { mutableStateOf("") }
                    var endDate by remember { mutableStateOf("") }
                    Row(Modifier.fillMaxWidth(), verticalAlignment = Alignment.CenterVertically) {
                        OutlinedTextField(
                            value = startDate,
                            onValueChange = { startDate = it },
                            label = { Text("Start Date (yyyy-MM-dd)") },
                            modifier = Modifier.weight(1f)
                        )
                        Spacer(Modifier.width(8.dp))
                        OutlinedTextField(
                            value = endDate,
                            onValueChange = { endDate = it },
                            label = { Text("End Date (yyyy-MM-dd)") },
                            modifier = Modifier.weight(1f)
                        )
                    }
                    val dateFormat = SimpleDateFormat("yyyy-MM-dd")
                    val filteredByDate = records.filter {
                        val d = Date(it.timestamp)
                        val afterStart = startDate.isBlank() || runCatching { d >= dateFormat.parse(startDate) }.getOrDefault(true)
                        val beforeEnd = endDate.isBlank() || runCatching { d <= dateFormat.parse(endDate) }.getOrDefault(true)
                        afterStart && beforeEnd
                    }
                    // Analytics summary
                    val total = filteredByDate.size
                    val byType = filteredByDate.groupingBy { it.type }.eachCount()
                    val byPlant = filteredByDate.groupingBy { it.plant }.eachCount().filterKeys { it.isNotBlank() }
                    val avgArea = filteredByDate.mapNotNull { it.area.toDoubleOrNull() }.average().takeIf { !it.isNaN() }
                    Text("Total: $total | Herbicides: ${byType["Herbicide"] ?: 0} | Fertilizers: ${byType["Fertilizer"] ?: 0}", style = MaterialTheme.typography.bodySmall)
                    if (avgArea != null) Text("Average Area: ${"%.2f".format(avgArea)} ha", style = MaterialTheme.typography.bodySmall)
                    if (byPlant.isNotEmpty()) Text("Top Plant: ${byPlant.maxByOrNull { it.value }?.key}", style = MaterialTheme.typography.bodySmall)
                    // Simple bar chart for type frequency
                    Row(Modifier.fillMaxWidth().padding(vertical = 4.dp), verticalAlignment = Alignment.CenterVertically) {
                        byType.forEach { (type, count) ->
                            Box(Modifier.height(24.dp).width((count * 24).dp).background(if (type == "Herbicide") Color(0xFF1976D2) else Color(0xFF388E3C)))
                            Spacer(Modifier.width(4.dp))
                            Text("$type ($count)", style = MaterialTheme.typography.bodySmall)
                            Spacer(Modifier.width(8.dp))
                        }
                    }
                    // CSV import
                    val importLauncher = rememberLauncherForActivityResult(ActivityResultContracts.GetContent()) { uri ->
                        if (uri != null) {
                            context.contentResolver.openInputStream(uri)?.use { inStream ->
                                BufferedReader(InputStreamReader(inStream)).use { reader ->
                                    val lines = reader.readLines().drop(1) // skip header
                                    lines.forEach { line ->
                                        val cols = line.split(",")
                                        if (cols.size >= 7) {
                                            val record = com.yourcompany.smartfarm.data.model.CalculationRecord(
                                                type = cols[0].trim('"'),
                                                plant = cols[1].trim('"'),
                                                chemical = cols[2].trim('"'),
                                                dosageRate = cols[3].trim('"'),
                                                area = cols[4].trim('"'),
                                                result = cols[5].trim('"'),
                                                timestamp = cols.getOrNull(6)?.toLongOrNull() ?: System.currentTimeMillis()
                                            )
                                            // Avoid duplicates by timestamp+plant+chemical+area
                                            if (filteredByDate.none { it.timestamp == record.timestamp && it.plant == record.plant && it.chemical == record.chemical && it.area == record.area }) {
                                                viewModel.insert(record)
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    Row(Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.End) {
                        Button(onClick = { importLauncher.launch("text/csv") }) { Text("Import CSV") }
                    }
                    Spacer(Modifier.height(8.dp))
                    var searchQuery by remember { mutableStateOf("") }
                    var typeFilter by remember { mutableStateOf<String?>(null) }
                    var sortDescending by remember { mutableStateOf(true) }
                    Row(Modifier.fillMaxWidth(), verticalAlignment = Alignment.CenterVertically) {
                        OutlinedTextField(
                            value = searchQuery,
                            onValueChange = { searchQuery = it },
                            label = { Text("Search saved...") },
                            modifier = Modifier.weight(1f)
                        )
                        Spacer(Modifier.width(8.dp))
                        DropdownMenuField(
                            label = typeFilter ?: "Type",
                            options = listOf("All", "Herbicide", "Fertilizer"),
                            selected = typeFilter ?: "All",
                            onSelected = { typeFilter = if (it == "All") null else it }
                        )
                        Spacer(Modifier.width(8.dp))
                        OutlinedButton(onClick = { sortDescending = !sortDescending }) {
                            Text(if (sortDescending) "Newest" else "Oldest")
                        }
                    }
                    Row(Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween, verticalAlignment = Alignment.CenterVertically) {
                        Text("Saved Calculations:", style = MaterialTheme.typography.titleSmall)
                        Button(onClick = {
                            // PDF export with multipage and formatting
                            val pdfDoc = PdfDocument()
                            val paint = Paint().apply { textSize = 12f; typeface = Typeface.MONOSPACE }
                            val headerPaint = Paint().apply { textSize = 13f; typeface = Typeface.DEFAULT_BOLD }
                            val pageInfo = PdfDocument.PageInfo.Builder(595, 842, 1).create() // A4 size
                            val headers = listOf("Type", "Plant", "Chemical", "Dosage", "Area", "Result", "Timestamp")
                            val colWidths = listOf(60, 60, 80, 60, 40, 120, 100)
                            val rowHeight = 18f
                            val marginTop = 60f
                            val marginLeft = 20f
                            val maxRowsPerPage = ((800 - marginTop) / rowHeight).toInt() - 2
                            val title = "Calculation Records Export"
                            val recordsToExport = filteredByDate
                            var pageNum = 1
                            var i = 0
                            while (i < recordsToExport.size) {
                                val page = pdfDoc.startPage(PdfDocument.PageInfo.Builder(595, 842, pageNum).create())
                                val canvas = page.canvas
                                // Title
                                canvas.drawText(title, marginLeft, 30f, headerPaint)
                                // Page number
                                canvas.drawText("Page $pageNum", 500f, 30f, paint)
                                // Header
                                var x = marginLeft
                                var y = marginTop
                                headers.forEachIndexed { idx, h ->
                                    canvas.drawText(h, x, y, headerPaint)
                                    x += colWidths[idx]
                                }
                                y += rowHeight
                                // Rows
                                for (rowIdx in 0 until maxRowsPerPage) {
                                    if (i >= recordsToExport.size) break
                                    x = marginLeft
                                    val r = recordsToExport[i]
                                    val row = listOf(r.type, r.plant, r.chemical, r.dosageRate, r.area, r.result, r.timestamp.toString())
                                    // Alternate row background
                                    if (rowIdx % 2 == 1) {
                                        val bgPaint = Paint().apply { setARGB(20, 0, 0, 0) }
                                        canvas.drawRect(x, y - rowHeight + 4, x + colWidths.sum(), y + 4, bgPaint)
                                    }
                                    row.forEachIndexed { idx, v ->
                                        canvas.drawText(v.take((colWidths[idx]/7).toInt()), x, y, paint)
                                        x += colWidths[idx]
                                    }
                                    y += rowHeight
                                    i++
                                }
                                pdfDoc.finishPage(page)
                                pageNum++
                            }
                            val file = File(context.cacheDir, "calculation_export.pdf")
                            pdfDoc.writeTo(file.outputStream())
                            pdfDoc.close()
                            val uri = FileProvider.getUriForFile(context, context.packageName + ".provider", file)
                            val shareIntent = Intent(Intent.ACTION_SEND).apply {
                                type = "application/pdf"
                                putExtra(Intent.EXTRA_STREAM, uri)
                                addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION)
                            }
                            startActivity(context, Intent.createChooser(shareIntent, "Export as PDF"), null)
                        }) { Text("Export as PDF") }
                        Button(onClick = { viewModel.deleteAll() }) { Text("Delete All") }
                    }
                    val filtered = filteredByDate
                        .filter { (typeFilter == null || it.type == typeFilter) &&
                            (searchQuery.isBlank() ||
                                it.plant.contains(searchQuery, true) ||
                                it.chemical.contains(searchQuery, true) ||
                                it.result.contains(searchQuery, true)) }
                        .let { if (sortDescending) it.sortedByDescending { it.timestamp } else it.sortedBy { it.timestamp } }
                    filtered.take(5).forEach { record ->
                        Row(verticalAlignment = Alignment.CenterVertically) {
                            Text("${record.type}: ${record.plant} - ${record.chemical} (${record.area} ha): ${record.result}", style = MaterialTheme.typography.bodySmall, modifier = Modifier.weight(1f))
                            IconButton(onClick = { viewModel.delete(record) }) {
                                Icon(Icons.Default.Delete, contentDescription = "Delete Calculation")
                            }
                        }
                    }
                }
                Spacer(Modifier.height(16.dp))
                OutlinedButton(onClick = onDismiss, modifier = Modifier.align(Alignment.End)) { Text("Close") }
            }
        }
    }
}

@Composable
fun PestDiseaseAlertDialog(
    livestockList: List<Livestock>,
    plantList: List<Plant>,
    onReport: (PestDiseaseAlertEntity) -> Unit,
    onDismiss: () -> Unit
) {
    var type by remember { mutableStateOf("Pest") }
    var affected by remember { mutableStateOf("") }
    var name by remember { mutableStateOf("") }
    var note by remember { mutableStateOf("") }
    var severity by remember { mutableStateOf(AlertSeverity.MODERATE) }
    val allAffected = livestockList.map { it.name } + plantList.map { it.name } + listOf("Farm 1", "Farm 2")
    val contextAwareOptions = when {
        affected in plantList.map { it.name } -> {
            val plant = plantList.find { it.name == affected }
            if (type == "Pest") plant?.commonPests?.ifEmpty { null } ?: listOf("No pests listed")
            else plant?.commonDiseases?.ifEmpty { null } ?: listOf("No diseases listed")
        }
        affected in livestockList.map { it.name } -> {
            val livestock = livestockList.find { it.name == affected }
            if (type == "Pest") listOf("General livestock pests")
            else livestock?.commonDiseases?.ifEmpty { null } ?: listOf("No diseases listed")
        }
        else -> if (type == "Pest") listOf("General farm pests") else listOf("General farm diseases")
    }
    Dialog(onDismissRequest = onDismiss) {
        Surface(shape = MaterialTheme.shapes.medium, tonalElevation = 8.dp) {
            Column(Modifier.padding(24.dp).widthIn(min = 300.dp, max = 400.dp)) {
                Text("Report Pest/Disease Alert", style = MaterialTheme.typography.titleLarge, fontWeight = FontWeight.Bold)
                Spacer(Modifier.height(8.dp))
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Text("Type:")
                    Spacer(Modifier.width(8.dp))
                    listOf("Pest", "Disease").forEach {
                        OutlinedButton(onClick = { type = it }, enabled = type != it, modifier = Modifier.padding(end = 4.dp)) { Text(it) }
                    }
                }
                Spacer(Modifier.height(8.dp))
                DropdownMenuField(label = "Affected", options = allAffected, selected = affected, onSelected = { affected = it })
                Spacer(Modifier.height(8.dp))
                DropdownMenuField(label = "Name", options = contextAwareOptions, selected = name, onSelected = { name = it })
                Spacer(Modifier.height(8.dp))
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Text("Severity:")
                    Spacer(Modifier.width(8.dp))
                    AlertSeverity.values().forEach {
                        OutlinedButton(onClick = { severity = it }, enabled = severity != it, modifier = Modifier.padding(end = 4.dp)) { Text(it.name) }
                    }
                }
                Spacer(Modifier.height(8.dp))
                OutlinedTextField(value = note, onValueChange = { note = it }, label = { Text("Note (optional)") })
                Spacer(Modifier.height(16.dp))
                Row(Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.End) {
                    OutlinedButton(onClick = onDismiss) { Text("Cancel") }
                    Spacer(Modifier.width(8.dp))
                    Button(onClick = {
                        if (name.isNotBlank() && affected.isNotBlank()) {
                            onReport(PestDiseaseAlertEntity(
                                type = type,
                                name = name,
                                affected = affected,
                                note = note,
                                severity = severity
                            ))
                        }
                    }) { Text("Report") }
                }
            }
        }
    }
}

@Composable
private fun DropdownMenuField(label: String, options: List<String>, selected: String, onSelected: (String) -> Unit) {
    var expanded by remember { mutableStateOf(false) }
    Box {
        OutlinedButton(onClick = { expanded = true }) {
            Text(if (selected.isBlank()) label else selected)
        }
        DropdownMenu(expanded = expanded, onDismissRequest = { expanded = false }) {
            options.forEach { option ->
                DropdownMenuItem(onClick = {
                    onSelected(option)
                    expanded = false
                }, text = { Text(option) })
            }
        }
    }
}

// PieChart composable
@Composable
fun PieChart(data: Map<String, Int>) {
    val total = data.values.sum().toFloat().takeIf { it > 0 } ?: 1f
    val colors = listOf(Color(0xFF1976D2), Color(0xFF388E3C), Color(0xFFFBC02D), Color(0xFFD32F2F), Color(0xFF7B1FA2), Color(0xFF0097A7))
    Canvas(Modifier.size(120.dp)) {
        var startAngle = -90f
        data.entries.forEachIndexed { i, entry ->
            val sweep = 360f * (entry.value / total)
            drawArc(
                color = colors[i % colors.size],
                startAngle = startAngle,
                sweepAngle = sweep,
                useCenter = true
            )
            startAngle += sweep
        }
    }
    Row(Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.Center) {
        data.keys.forEachIndexed { i, label ->
            Box(Modifier.size(12.dp).background(colors[i % colors.size], shape = MaterialTheme.shapes.small))
            Spacer(Modifier.width(4.dp))
            Text(label, style = MaterialTheme.typography.labelSmall)
            Spacer(Modifier.width(8.dp))
        }
    }
}

// LineChart composable
@Composable
fun LineChart(data: Map<String, Int>) {
    val points = data.values.mapIndexed { i, v -> Offset(i * 40f + 20f, 100f - v * 80f / (data.values.maxOrNull() ?: 1).coerceAtLeast(1)) }
    Canvas(Modifier.width((data.size * 40).dp).height(120.dp)) {
        for (i in 1 until points.size) {
            drawLine(Color(0xFF1976D2), points[i - 1], points[i], strokeWidth = 4f)
        }
        points.forEach { p ->
            drawCircle(Color(0xFF1976D2), radius = 6f, center = p)
        }
    }
    Row(Modifier.fillMaxWidth()) {
        data.keys.forEachIndexed { i, label ->
            Text(label.takeLast(2), style = MaterialTheme.typography.labelSmall, modifier = Modifier.width(40.dp))
        }
    }
}

@Composable
fun BarChart(data: Map<String, Int>) {
    val max = (data.values.maxOrNull() ?: 1).toFloat()
    val barWidth = 32.dp
    val chartHeight = 80.dp
    Row(Modifier.fillMaxWidth().height(chartHeight).padding(top = 8.dp), verticalAlignment = Alignment.Bottom) {
        data.entries.forEach { (label, value) ->
            Column(horizontalAlignment = Alignment.CenterHorizontally) {
                Box(
                    Modifier
                        .height((value / max * chartHeight.value).dp)
                        .width(barWidth)
                        .background(Color(0xFF1976D2), shape = MaterialTheme.shapes.small)
                )
                Text("$value", style = MaterialTheme.typography.labelSmall)
                Text(label.take(6), style = MaterialTheme.typography.labelSmall, modifier = Modifier.width(barWidth).padding(top = 2.dp), maxLines = 1)
            }
            Spacer(Modifier.width(8.dp))
        }
    }
}



@Composable
fun BarChartDbl(data: Map<String, Double>) {
    val max = (data.values.maxOrNull() ?: 1.0).toFloat()
    val barWidth = 32.dp
    val chartHeight = 80.dp
    Row(Modifier.fillMaxWidth().height(chartHeight).padding(top = 8.dp), verticalAlignment = Alignment.Bottom) {
        data.entries.forEach { (label, value) ->
            Column(horizontalAlignment = Alignment.CenterHorizontally) {
                Box(
                    Modifier
                        .height((value / max * chartHeight.value).dp)
                        .width(barWidth)
                        .background(Color(0xFF388E3C), shape = MaterialTheme.shapes.small)
                )
                Text("${"%.1f".format(value)}", style = MaterialTheme.typography.labelSmall)
                Text(label.take(6), style = MaterialTheme.typography.labelSmall, modifier = Modifier.width(barWidth).padding(top = 2.dp), maxLines = 1)
            }
            Spacer(Modifier.width(8.dp))
        }
    }
}

@Composable
fun PieChartDbl(data: Map<String, Double>) {
    val total = data.values.sum().toFloat().takeIf { it > 0 } ?: 1f
    val colors = listOf(Color(0xFF1976D2), Color(0xFF388E3C), Color(0xFFFBC02D), Color(0xFFD32F2F), Color(0xFF7B1FA2), Color(0xFF0097A7))
    Canvas(Modifier.size(120.dp)) {
        var startAngle = -90f
        data.entries.forEachIndexed { i, entry ->
            val sweep = 360f * (entry.value / total)
            drawArc(
                color = colors[i % colors.size],
                startAngle = startAngle,
                sweepAngle = sweep,
                useCenter = true
            )
            startAngle += sweep
        }
    }
    Row(Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.Center) {
        data.keys.forEachIndexed { i, label ->
            Box(Modifier.size(12.dp).background(colors[i % colors.size], shape = MaterialTheme.shapes.small))
            Spacer(Modifier.width(4.dp))
            Text(label, style = MaterialTheme.typography.labelSmall)
            Spacer(Modifier.width(8.dp))
        }
    }
}

@Composable
fun OutlierReviewDialog(
    animalIds: List<Long>,
    livestockList: List<Livestock>,
    acknowledged: Set<Long>,
    onAcknowledge: (Long, String) -> Unit,
    onDismiss: () -> Unit,
    filterUnacknowledged: Boolean = false
) {
    val filteredIds = if (filterUnacknowledged) animalIds.filter { it !in acknowledged } else animalIds
    var index by remember { mutableStateOf(0) }
    var note by remember { mutableStateOf("") }
    val animal = livestockList.find { it.id == filteredIds.getOrNull(index) }
    val isAcknowledged = animal?.id in acknowledged
    if (filteredIds.isEmpty()) {
        AlertDialog(
            onDismissRequest = onDismiss,
            title = { Text("No Unacknowledged Outliers") },
            text = { Text("All outliers have been acknowledged.") },
            confirmButton = { Button(onClick = onDismiss) { Text("Close") } }
        )
        return
    }
    AlertDialog(
        onDismissRequest = onDismiss,
        title = { Text("Review Outlier (${index + 1}/${filteredIds.size})") },
        text = {
            Column {
                if (animal != null) {
                    Text("Name: ${animal.name}", fontWeight = FontWeight.Bold)
                    Text("Category: ${animal.category}")
                    Text("Subcategory: ${animal.subCategory}")
                    Text("ID: ${animal.id}")
                }
                if (isAcknowledged) Text("Already acknowledged", color = Color.Green)
                OutlinedTextField(value = note, onValueChange = { note = it }, label = { Text("Remediation Note") })
            }
        },
        confirmButton = {
            Row {
                if (index > 0) OutlinedButton(onClick = { index-- }) { Text("Previous") }
                Spacer(Modifier.width(8.dp))
                if (index < filteredIds.size - 1) OutlinedButton(onClick = { index++ }) { Text("Next") }
                Spacer(Modifier.width(8.dp))
                Button(onClick = {
                    if (animal != null && !isAcknowledged) onAcknowledge(animal.id, note)
                    if (index < filteredIds.size - 1) { index++; note = "" } else onDismiss()
                }, enabled = !isAcknowledged) { Text("Acknowledge") }
            }
        },
        dismissButton = {
            OutlinedButton(onClick = onDismiss) { Text("Close") }
        }
    )
}

@Composable
fun RemindersDialog(
    livestock: Livestock,
    reminderViewModel: LivestockReminderViewModel,
    onDismiss: () -> Unit
) {
    val reminders by reminderViewModel.getRemindersForLivestock(livestock.id).collectAsState()
    var showAddReminder by remember { mutableStateOf(false) }
    var editReminder by remember { mutableStateOf<LivestockReminder?>(null) }
    
    Dialog(onDismissRequest = onDismiss) {
        Surface(
            shape = MaterialTheme.shapes.medium,
            tonalElevation = 8.dp,
            modifier = Modifier
                .fillMaxWidth()
                .fillMaxHeight(0.8f)
        ) {
            Column(
                modifier = Modifier.padding(16.dp)
            ) {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Text(
                        text = "Reminders for ${livestock.name}",
                        style = MaterialTheme.typography.titleLarge,
                        fontWeight = FontWeight.Bold
                    )
                    IconButton(onClick = onDismiss) {
                        Icon(Icons.Default.Close, contentDescription = "Close")
                    }
                }
                
                Spacer(modifier = Modifier.height(16.dp))
                
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.End
                ) {
                    Button(onClick = { showAddReminder = true }) {
                        Icon(Icons.Default.Add, contentDescription = null)
                        Spacer(modifier = Modifier.width(4.dp))
                        Text("Add Reminder")
                    }
                }
                
                Spacer(modifier = Modifier.height(16.dp))
                
                LazyColumn(
                    verticalArrangement = Arrangement.spacedBy(8.dp)
                ) {
                    items(reminders) { reminder ->
                        ReminderItem(
                            reminder = reminder,
                            onEdit = { editReminder = reminder },
                            onDelete = { reminderViewModel.deleteReminder(reminder) }
                        )
                    }
                }
            }
        }
    }
    
    if (showAddReminder) {
        AddEditReminderDialog(
            livestockId = livestock.id,
            reminderViewModel = reminderViewModel,
            onDismiss = { showAddReminder = false }
        )
    }
    
    if (editReminder != null) {
        AddEditReminderDialog(
            livestockId = livestock.id,
            reminder = editReminder,
            reminderViewModel = reminderViewModel,
            onDismiss = { editReminder = null }
        )
    }
}

@Composable
fun ReminderItem(
    reminder: LivestockReminder,
    onEdit: () -> Unit,
    onDelete: () -> Unit
) {
    Card(
        modifier = Modifier.fillMaxWidth(),
        elevation = CardDefaults.cardElevation(2.dp)
    ) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(12.dp),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Column(modifier = Modifier.weight(1f)) {
                Text(
                    text = reminder.title,
                    style = MaterialTheme.typography.titleMedium,
                    fontWeight = FontWeight.Medium
                )
                Text(
                    text = reminder.description,
                    style = MaterialTheme.typography.bodyMedium,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )
                Text(
                    text = "Due: ${reminder.dueDate}",
                    style = MaterialTheme.typography.bodySmall,
                    color = MaterialTheme.colorScheme.primary
                )
            }
            
            Row {
                IconButton(onClick = onEdit) {
                    Icon(Icons.Default.Edit, contentDescription = "Edit")
                }
                IconButton(onClick = onDelete) {
                    Icon(Icons.Default.Delete, contentDescription = "Delete")
                }
            }
        }
    }
}

@Composable
fun AddEditReminderDialog(
    livestockId: Long,
    reminder: LivestockReminder? = null,
    reminderViewModel: LivestockReminderViewModel,
    onDismiss: () -> Unit
) {
    var title by remember { mutableStateOf(reminder?.title ?: "") }
    var description by remember { mutableStateOf(reminder?.description ?: "") }
    var dueDate by remember { mutableStateOf(reminder?.dueDate ?: "") }
    var priority by remember { mutableStateOf(reminder?.priority ?: "Medium") }
    
    Dialog(onDismissRequest = onDismiss) {
        Surface(
            shape = MaterialTheme.shapes.medium,
            tonalElevation = 8.dp,
            modifier = Modifier
                .fillMaxWidth()
                .widthIn(max = 400.dp)
        ) {
            Column(
                modifier = Modifier.padding(24.dp)
            ) {
                Text(
                    text = if (reminder == null) "Add Reminder" else "Edit Reminder",
                    style = MaterialTheme.typography.titleLarge,
                    fontWeight = FontWeight.Bold
                )
                
                Spacer(modifier = Modifier.height(16.dp))
                
                OutlinedTextField(
                    value = title,
                    onValueChange = { title = it },
                    label = { Text("Title") },
                    modifier = Modifier.fillMaxWidth()
                )
                
                Spacer(modifier = Modifier.height(8.dp))
                
                OutlinedTextField(
                    value = description,
                    onValueChange = { description = it },
                    label = { Text("Description") },
                    modifier = Modifier.fillMaxWidth(),
                    minLines = 2
                )
                
                Spacer(modifier = Modifier.height(8.dp))
                
                OutlinedTextField(
                    value = dueDate,
                    onValueChange = { dueDate = it },
                    label = { Text("Due Date (yyyy-MM-dd)") },
                    modifier = Modifier.fillMaxWidth()
                )
                
                Spacer(modifier = Modifier.height(8.dp))
                
                Row(
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Text("Priority: ", style = MaterialTheme.typography.bodyMedium)
                    Spacer(modifier = Modifier.width(8.dp))
                    listOf("Low", "Medium", "High").forEach { priorityOption ->
                        OutlinedButton(
                            onClick = { priority = priorityOption },
                            enabled = priority != priorityOption,
                            modifier = Modifier.padding(end = 4.dp)
                        ) {
                            Text(priorityOption)
                        }
                    }
                }
                
                Spacer(modifier = Modifier.height(24.dp))
                
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.End
                ) {
                    OutlinedButton(onClick = onDismiss) {
                        Text("Cancel")
                    }
                    Spacer(modifier = Modifier.width(8.dp))
                    Button(
                        onClick = {
                            if (title.isNotBlank() && dueDate.isNotBlank()) {
                                val newReminder = LivestockReminder(
                                    id = reminder?.id ?: 0,
                                    livestockId = livestockId,
                                    title = title,
                                    description = description,
                                    dueDate = dueDate,
                                    priority = priority,
                                    isCompleted = reminder?.isCompleted ?: false
                                )
                                
                                if (reminder == null) {
                                    reminderViewModel.addReminder(newReminder)
                                } else {
                                    reminderViewModel.updateReminder(newReminder)
                                }
                                onDismiss()
                            }
                        },
                        enabled = title.isNotBlank() && dueDate.isNotBlank()
                    ) {
                        Text(if (reminder == null) "Add" else "Update")
                    }
                }
            }
        }
    }
} 