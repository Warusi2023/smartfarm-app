package com.smartfarm.ui.screens

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
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import com.smartfarm.shared.data.model.dto.*
import com.smartfarm.shared.ui.viewmodel.BiologicalFarmingViewModel
import com.smartfarm.ui.components.EmptyState
import com.smartfarm.ui.components.ErrorState
import com.smartfarm.ui.components.LoadingState
import org.koin.compose.viewmodel.viewModel

@Composable
fun BiologicalFarmingScreen(
    viewModel: BiologicalFarmingViewModel = viewModel()
) {
    val beneficialInsectsState by viewModel.beneficialInsectsState.collectAsState()
    val harmfulPestsState by viewModel.harmfulPestsState.collectAsState()
    val cropGuidesState by viewModel.cropGuidesState.collectAsState()
    val selectedCropGuide by viewModel.selectedCropGuide.collectAsState()
    val selectedCropName by viewModel.selectedCropName.collectAsState()
    val cropRecommendations by viewModel.cropRecommendations.collectAsState()
    
    var selectedTab by remember { mutableStateOf(0) }
    var showBreedingGuideDialog by remember { mutableStateOf<BeneficialInsectDto?>(null) }
    
    LaunchedEffect(Unit) {
        viewModel.loadBeneficialInsects()
        viewModel.loadHarmfulPests()
        viewModel.loadCropGuides()
    }
    
    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Biological Farming") },
                actions = {
                    IconButton(onClick = { viewModel.refresh() }) {
                        Icon(Icons.Default.Refresh, contentDescription = "Refresh")
                    }
                }
            )
        }
    ) { padding ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(padding)
        ) {
            // Introduction Card
            Card(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(16.dp),
                colors = CardDefaults.cardColors(
                    containerColor = MaterialTheme.colorScheme.primaryContainer
                )
            ) {
                Column(
                    modifier = Modifier.padding(16.dp)
                ) {
                    Text(
                        text = "Biological Pest Control",
                        style = MaterialTheme.typography.headlineSmall,
                        fontWeight = FontWeight.Bold
                    )
                    Spacer(modifier = Modifier.height(8.dp))
                    Text(
                        text = "Use beneficial insects to naturally control harmful pests. Safe, affordable, and eco-friendly!",
                        style = MaterialTheme.typography.bodyMedium
                    )
                }
            }
            
            // Tabs
            TabRow(selectedTabIndex = selectedTab) {
                Tab(
                    selected = selectedTab == 0,
                    onClick = { selectedTab = 0 },
                    text = { Text("Good Insects") }
                )
                Tab(
                    selected = selectedTab == 1,
                    onClick = { selectedTab = 1 },
                    text = { Text("Bad Insects") }
                )
                Tab(
                    selected = selectedTab == 2,
                    onClick = { selectedTab = 2 },
                    text = { Text("Crop Guide") }
                )
            }
            
            // Tab Content
            when (selectedTab) {
                0 -> BeneficialInsectsTab(
                    state = beneficialInsectsState,
                    onBreedingGuideClick = { showBreedingGuideDialog = it },
                    onRefresh = { viewModel.refresh() }
                )
                1 -> HarmfulPestsTab(
                    state = harmfulPestsState,
                    onRefresh = { viewModel.refresh() }
                )
                2 -> CropGuideTab(
                    state = cropGuidesState,
                    selectedCropName = selectedCropName,
                    selectedCropGuide = selectedCropGuide,
                    cropRecommendations = cropRecommendations,
                    onCropSelected = { viewModel.loadCropGuide(it) },
                    onClearSelection = { viewModel.clearSelectedCrop() }
                )
            }
        }
    }
    
    // Breeding Guide Dialog
    showBreedingGuideDialog?.let { insect ->
        BreedingGuideDialog(
            insect = insect,
            onDismiss = { showBreedingGuideDialog = null }
        )
    }
}

@Composable
private fun BeneficialInsectsTab(
    state: com.smartfarm.shared.ui.viewmodel.BiologicalFarmingUiState<List<BeneficialInsectDto>>,
    onBreedingGuideClick: (BeneficialInsectDto) -> Unit,
    onRefresh: () -> Unit
) {
    when (state) {
        is com.smartfarm.shared.ui.viewmodel.BiologicalFarmingUiState.Loading -> {
            LoadingState()
        }
        is com.smartfarm.shared.ui.viewmodel.BiologicalFarmingUiState.Error -> {
            ErrorState(
                message = state.message,
                onRetry = onRefresh
            )
        }
        is com.smartfarm.shared.ui.viewmodel.BiologicalFarmingUiState.Success -> {
            if (state.data.isEmpty()) {
                EmptyState(
                    title = "No Beneficial Insects",
                    message = "No beneficial insects found",
                    icon = Icons.Default.Bug
                )
            } else {
                LazyColumn(
                    modifier = Modifier.fillMaxSize(),
                    contentPadding = PaddingValues(16.dp),
                    verticalArrangement = Arrangement.spacedBy(12.dp)
                ) {
                    items(state.data) { insect ->
                        BeneficialInsectCard(
                            insect = insect,
                            onBreedingGuideClick = { onBreedingGuideClick(insect) }
                        )
                    }
                }
            }
        }
    }
}

@Composable
private fun BeneficialInsectCard(
    insect: BeneficialInsectDto,
    onBreedingGuideClick: () -> Unit
) {
    Card(
        modifier = Modifier.fillMaxWidth(),
        colors = CardDefaults.cardColors(
            containerColor = MaterialTheme.colorScheme.surfaceVariant
        )
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
                    text = "${insect.icon} ${insect.name}",
                    style = MaterialTheme.typography.titleMedium,
                    fontWeight = FontWeight.Bold
                )
            }
            Spacer(modifier = Modifier.height(8.dp))
            Text(
                text = insect.description,
                style = MaterialTheme.typography.bodyMedium
            )
            Spacer(modifier = Modifier.height(8.dp))
            Text(
                text = "Targets: ${insect.targets.joinToString(", ")}",
                style = MaterialTheme.typography.bodySmall,
                color = MaterialTheme.colorScheme.onSurfaceVariant
            )
            Spacer(modifier = Modifier.height(8.dp))
            Text(
                text = "Effectiveness: ${insect.effectiveness}",
                style = MaterialTheme.typography.bodySmall,
                color = MaterialTheme.colorScheme.primary
            )
            Spacer(modifier = Modifier.height(12.dp))
            Button(
                onClick = onBreedingGuideClick,
                modifier = Modifier.fillMaxWidth()
            ) {
                Icon(Icons.Default.Book, contentDescription = null)
                Spacer(modifier = Modifier.width(8.dp))
                Text("View Breeding Guide")
            }
        }
    }
}

@Composable
private fun HarmfulPestsTab(
    state: com.smartfarm.shared.ui.viewmodel.BiologicalFarmingUiState<List<HarmfulPestDto>>,
    onRefresh: () -> Unit
) {
    when (state) {
        is com.smartfarm.shared.ui.viewmodel.BiologicalFarmingUiState.Loading -> {
            LoadingState()
        }
        is com.smartfarm.shared.ui.viewmodel.BiologicalFarmingUiState.Error -> {
            ErrorState(
                message = state.message,
                onRetry = onRefresh
            )
        }
        is com.smartfarm.shared.ui.viewmodel.BiologicalFarmingUiState.Success -> {
            if (state.data.isEmpty()) {
                EmptyState(
                    title = "No Harmful Pests",
                    message = "No harmful pests found",
                    icon = Icons.Default.Warning
                )
            } else {
                LazyColumn(
                    modifier = Modifier.fillMaxSize(),
                    contentPadding = PaddingValues(16.dp),
                    verticalArrangement = Arrangement.spacedBy(12.dp)
                ) {
                    items(state.data) { pest ->
                        HarmfulPestCard(pest = pest)
                    }
                }
            }
        }
    }
}

@Composable
private fun HarmfulPestCard(pest: HarmfulPestDto) {
    Card(
        modifier = Modifier.fillMaxWidth(),
        colors = CardDefaults.cardColors(
            containerColor = MaterialTheme.colorScheme.errorContainer
        )
    ) {
        Column(
            modifier = Modifier.padding(16.dp)
        ) {
            Text(
                text = "${pest.icon} ${pest.name}",
                style = MaterialTheme.typography.titleMedium,
                fontWeight = FontWeight.Bold
            )
            Spacer(modifier = Modifier.height(8.dp))
            Text(
                text = pest.description,
                style = MaterialTheme.typography.bodyMedium
            )
            Spacer(modifier = Modifier.height(8.dp))
            Text(
                text = "Damage: ${pest.damage}",
                style = MaterialTheme.typography.bodySmall,
                color = MaterialTheme.colorScheme.onErrorContainer
            )
            Spacer(modifier = Modifier.height(8.dp))
            Text(
                text = "Affects: ${pest.cropsAffected.joinToString(", ")}",
                style = MaterialTheme.typography.bodySmall,
                color = MaterialTheme.colorScheme.onErrorContainer
            )
        }
    }
}

@Composable
private fun CropGuideTab(
    state: com.smartfarm.shared.ui.viewmodel.BiologicalFarmingUiState<Map<String, CropGuideDto>>,
    selectedCropName: String?,
    selectedCropGuide: CropGuideDto?,
    cropRecommendations: CropRecommendationsResponse?,
    onCropSelected: (String) -> Unit,
    onClearSelection: () -> Unit
) {
    when (state) {
        is com.smartfarm.shared.ui.viewmodel.BiologicalFarmingUiState.Loading -> {
            LoadingState()
        }
        is com.smartfarm.shared.ui.viewmodel.BiologicalFarmingUiState.Error -> {
            ErrorState(message = state.message)
        }
        is com.smartfarm.shared.ui.viewmodel.BiologicalFarmingUiState.Success -> {
            LazyColumn(
                modifier = Modifier.fillMaxSize(),
                contentPadding = PaddingValues(16.dp),
                verticalArrangement = Arrangement.spacedBy(16.dp)
            ) {
                item {
                    Text(
                        text = "Select Your Crop",
                        style = MaterialTheme.typography.titleLarge,
                        fontWeight = FontWeight.Bold
                    )
                }
                
                item {
                    if (selectedCropGuide == null) {
                        // Crop selector
                        state.data.keys.forEach { cropName ->
                            Card(
                                modifier = Modifier
                                    .fillMaxWidth()
                                    .clickable { onCropSelected(cropName) },
                                colors = CardDefaults.cardColors(
                                    containerColor = MaterialTheme.colorScheme.primaryContainer
                                )
                            ) {
                                Text(
                                    text = cropName,
                                    modifier = Modifier.padding(16.dp),
                                    style = MaterialTheme.typography.titleMedium
                                )
                            }
                            Spacer(modifier = Modifier.height(8.dp))
                        }
                    } else {
                        // Show crop guide details
                        CropGuideDetails(
                            cropName = selectedCropName ?: "",
                            guide = selectedCropGuide,
                            recommendations = cropRecommendations,
                            onBack = onClearSelection
                        )
                    }
                }
            }
        }
    }
}

@Composable
private fun CropGuideDetails(
    cropName: String,
    guide: CropGuideDto,
    recommendations: CropRecommendationsResponse?,
    onBack: () -> Unit
) {
    Column(
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        // Back button
        Button(onClick = onBack) {
            Icon(Icons.Default.ArrowBack, contentDescription = null)
            Spacer(modifier = Modifier.width(8.dp))
            Text("Back to Crops")
        }
        
        // Crop name
        Text(
            text = cropName,
            style = MaterialTheme.typography.headlineMedium,
            fontWeight = FontWeight.Bold
        )
        
        // Bad Insects
        Card(
            modifier = Modifier.fillMaxWidth(),
            colors = CardDefaults.cardColors(
                containerColor = MaterialTheme.colorScheme.errorContainer
            )
        ) {
            Column(modifier = Modifier.padding(16.dp)) {
                Text(
                    text = "Bad Insects (Pests)",
                    style = MaterialTheme.typography.titleMedium,
                    fontWeight = FontWeight.Bold
                )
                Spacer(modifier = Modifier.height(8.dp))
                guide.badInsects.forEach { pest ->
                    Text(
                        text = "• $pest",
                        modifier = Modifier.padding(vertical = 4.dp)
                    )
                }
            }
        }
        
        // Good Insects
        Card(
            modifier = Modifier.fillMaxWidth(),
            colors = CardDefaults.cardColors(
                containerColor = MaterialTheme.colorScheme.primaryContainer
            )
        ) {
            Column(modifier = Modifier.padding(16.dp)) {
                Text(
                    text = "Good Insects (Beneficial)",
                    style = MaterialTheme.typography.titleMedium,
                    fontWeight = FontWeight.Bold
                )
                Spacer(modifier = Modifier.height(8.dp))
                guide.goodInsects.forEach { insect ->
                    Text(
                        text = "• $insect",
                        modifier = Modifier.padding(vertical = 4.dp)
                    )
                }
            }
        }
        
        // Release Timing
        Card(
            modifier = Modifier.fillMaxWidth(),
            colors = CardDefaults.cardColors(
                containerColor = MaterialTheme.colorScheme.secondaryContainer
            )
        ) {
            Column(modifier = Modifier.padding(16.dp)) {
                Text(
                    text = "Release Timing",
                    style = MaterialTheme.typography.titleMedium,
                    fontWeight = FontWeight.Bold
                )
                Spacer(modifier = Modifier.height(8.dp))
                Text(text = guide.releaseTiming)
            }
        }
        
        // Notes
        if (guide.notes.isNotEmpty()) {
            Card(
                modifier = Modifier.fillMaxWidth(),
                colors = CardDefaults.cardColors(
                    containerColor = MaterialTheme.colorScheme.tertiaryContainer
                )
            ) {
                Column(modifier = Modifier.padding(16.dp)) {
                    Text(
                        text = "Notes",
                        style = MaterialTheme.typography.titleMedium,
                        fontWeight = FontWeight.Bold
                    )
                    Spacer(modifier = Modifier.height(8.dp))
                    Text(text = guide.notes)
                }
            }
        }
        
        // Recommendations if available
        recommendations?.let { rec ->
            if (rec.recommendedInsects.isNotEmpty()) {
                Card(
                    modifier = Modifier.fillMaxWidth(),
                    colors = CardDefaults.cardColors(
                        containerColor = MaterialTheme.colorScheme.surfaceVariant
                    )
                ) {
                    Column(modifier = Modifier.padding(16.dp)) {
                        Text(
                            text = "Recommended Insects",
                            style = MaterialTheme.typography.titleMedium,
                            fontWeight = FontWeight.Bold
                        )
                        Spacer(modifier = Modifier.height(8.dp))
                        rec.recommendedInsects.forEach { insect ->
                            Text(
                                text = "${insect.icon} ${insect.name}",
                                modifier = Modifier.padding(vertical = 4.dp),
                                style = MaterialTheme.typography.bodyMedium
                            )
                        }
                    }
                }
            }
        }
    }
}

@Composable
private fun BreedingGuideDialog(
    insect: BeneficialInsectDto,
    onDismiss: () -> Unit
) {
    AlertDialog(
        onDismissRequest = onDismiss,
        title = {
            Text("${insect.icon} ${insect.name} - Breeding Guide")
        },
        text = {
            LazyColumn(
                verticalArrangement = Arrangement.spacedBy(12.dp)
            ) {
                item {
                    Text(
                        text = insect.description,
                        style = MaterialTheme.typography.bodyMedium
                    )
                }
                item {
                    Text(
                        text = "Target Pests:",
                        style = MaterialTheme.typography.titleSmall,
                        fontWeight = FontWeight.Bold
                    )
                    insect.targets.forEach { target ->
                        Text(
                            text = "• $target",
                            modifier = Modifier.padding(start = 16.dp)
                        )
                    }
                }
                item {
                    Text(
                        text = "Breeding Tips:",
                        style = MaterialTheme.typography.titleSmall,
                        fontWeight = FontWeight.Bold
                    )
                    insect.breedingTips.forEach { tip ->
                        Text(
                            text = "• $tip",
                            modifier = Modifier.padding(start = 16.dp)
                        )
                    }
                }
                item {
                    Text(
                        text = "Release Timing:",
                        style = MaterialTheme.typography.titleSmall,
                        fontWeight = FontWeight.Bold
                    )
                    Text(
                        text = insect.releaseTiming,
                        modifier = Modifier.padding(start = 16.dp)
                    )
                }
                item {
                    Text(
                        text = "Effectiveness:",
                        style = MaterialTheme.typography.titleSmall,
                        fontWeight = FontWeight.Bold
                    )
                    Text(
                        text = insect.effectiveness,
                        modifier = Modifier.padding(start = 16.dp)
                    )
                }
            }
        },
        confirmButton = {
            TextButton(onClick = onDismiss) {
                Text("Close")
            }
        }
    )
}

