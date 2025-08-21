package com.yourcompany.smartfarm

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.lazy.itemsIndexed
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import com.yourcompany.smartfarm.util.*
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.foundation.clickable
import androidx.compose.ui.graphics.Color
import androidx.compose.foundation.ExperimentalFoundationApi
import androidx.compose.foundation.pager.HorizontalPager
import androidx.compose.foundation.pager.rememberPagerState
import androidx.compose.ui.draw.clip
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.res.painterResource

@OptIn(ExperimentalFoundationApi::class, ExperimentalMaterial3Api::class)
@Composable
fun TutorialScreen(
    onNavigateBack: () -> Unit = {},
    onCompleteTutorial: () -> Unit = {},
    onSkipTutorial: () -> Unit = {}
) {
    val context = LocalContext.current
    var currentStep by remember { mutableStateOf(0) }
    var showFeatureDetails by remember { mutableStateOf<FeatureDetail?>(null) }
    
    val primaryColor = MaterialTheme.colorScheme.primary
    
    val tutorialSteps = remember(primaryColor) {
        listOf(
            TutorialStep(
                title = "Welcome to SmartFarm",
                description = "Your comprehensive farm management solution",
                icon = Icons.Default.Agriculture,
                color = primaryColor
            ),
            TutorialStep(
                title = "Livestock Management",
                description = "Track health, breeding, and performance of all your animals",
                icon = Icons.Default.Pets,
                color = Color(0xFF4CAF50)
            ),
            TutorialStep(
                title = "Weather Monitoring",
                description = "Get real-time weather updates and forecasts for your farm",
                icon = Icons.Default.WbSunny,
                color = Color(0xFF2196F3)
            ),
            TutorialStep(
                title = "Activity Scheduling",
                description = "Plan and track farm activities with reminders",
                icon = Icons.Default.Schedule,
                color = Color(0xFFFF9800)
            ),
            TutorialStep(
                title = "Financial Tracking",
                description = "Monitor income, expenses, and profitability",
                icon = Icons.Default.AttachMoney,
                color = Color(0xFF9C27B0)
            ),
            TutorialStep(
                title = "Expert Support",
                description = "Get help from agricultural experts anytime",
                icon = Icons.Default.Support,
                color = Color(0xFF607D8B)
            )
        )
    }
    
    val pagerState = rememberPagerState(pageCount = { tutorialSteps.size })
    
    LaunchedEffect(pagerState.currentPage) {
        currentStep = pagerState.currentPage
    }
    
    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Tutorial") },
                navigationIcon = {
                    IconButton(onClick = onNavigateBack) {
                        Icon(Icons.Default.ArrowBack, contentDescription = "Back")
                    }
                },
                actions = {
                    TextButton(onClick = onSkipTutorial) {
                        Text("Skip")
                    }
                }
            )
        }
    ) { paddingValues ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(paddingValues)
        ) {
            // Progress indicator
            LinearProgressIndicator(
                progress = (currentStep + 1).toFloat() / tutorialSteps.size,
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(16.dp)
            )
            
            // Step counter
            Text(
                text = "Step ${currentStep + 1} of ${tutorialSteps.size}",
                style = MaterialTheme.typography.bodySmall,
                color = MaterialTheme.colorScheme.onSurfaceVariant,
                textAlign = TextAlign.Center,
                modifier = Modifier.fillMaxWidth()
            )
            
            // Tutorial content
            HorizontalPager(
                state = pagerState,
                modifier = Modifier.weight(1f)
            ) { page ->
                TutorialStepContent(
                    step = tutorialSteps[page],
                    onFeatureClick = { showFeatureDetails = it }
                )
            }
            
            // Navigation buttons
            TutorialNavigation(
                currentStep = currentStep,
                totalSteps = tutorialSteps.size,
                onNext = {
                    if (currentStep < tutorialSteps.size - 1) {
                        currentStep++
                    } else {
                        onCompleteTutorial()
                    }
                },
                onPrevious = {
                    if (currentStep > 0) {
                        currentStep--
                    }
                },
                onComplete = onCompleteTutorial
            )
        }
    }
    
    // Feature details dialog
    showFeatureDetails?.let { feature ->
        FeatureDetailsDialog(
            feature = feature,
            onDismiss = { showFeatureDetails = null }
        )
    }
}

@Composable
private fun TutorialStepContent(
    step: TutorialStep,
    onFeatureClick: (FeatureDetail) -> Unit
) {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(32.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center
    ) {
        // Icon
        Surface(
            modifier = Modifier.size(120.dp),
            shape = MaterialTheme.shapes.large,
            color = step.color.copy(alpha = 0.1f)
        ) {
            Box(
                modifier = Modifier.fillMaxSize(),
                contentAlignment = Alignment.Center
            ) {
                Icon(
                    step.icon,
                    contentDescription = null,
                    tint = step.color,
                    modifier = Modifier.size(64.dp)
                )
            }
        }
        
        Spacer(modifier = Modifier.height(32.dp))
        
        // Title
        Text(
            text = step.title,
            style = MaterialTheme.typography.headlineMedium,
            fontWeight = FontWeight.Bold,
            textAlign = TextAlign.Center
        )
        
        Spacer(modifier = Modifier.height(16.dp))
        
        // Description
        Text(
            text = step.description,
            style = MaterialTheme.typography.bodyLarge,
            textAlign = TextAlign.Center,
            color = MaterialTheme.colorScheme.onSurfaceVariant
        )
        
        Spacer(modifier = Modifier.height(32.dp))
        
        // Feature highlights
        FeatureHighlights(
            step = step,
            onFeatureClick = onFeatureClick
        )
    }
}

@Composable
private fun FeatureHighlights(
    step: TutorialStep,
    onFeatureClick: (FeatureDetail) -> Unit
) {
    val features = when (step.title) {
        "Livestock Management" -> listOf(
            FeatureDetail("Health Tracking", "Monitor vital signs and health status", Icons.Default.HealthAndSafety),
            FeatureDetail("Breeding Records", "Track breeding cycles and genetics", Icons.Default.FamilyRestroom),
            FeatureDetail("Performance Metrics", "Analyze growth and productivity", Icons.Default.Analytics)
        )
        "Weather Monitoring" -> listOf(
            FeatureDetail("Real-time Updates", "Get current weather conditions", Icons.Default.Refresh),
            FeatureDetail("Forecasts", "Plan activities with weather predictions", Icons.Default.Timeline),
            FeatureDetail("Alerts", "Receive weather warnings and notifications", Icons.Default.Warning)
        )
        "Activity Scheduling" -> listOf(
            FeatureDetail("Task Management", "Create and organize farm tasks", Icons.Default.CheckCircle),
            FeatureDetail("Reminders", "Never miss important activities", Icons.Default.Notifications),
            FeatureDetail("Calendar View", "Visualize your farm schedule", Icons.Default.CalendarToday)
        )
        "Financial Tracking" -> listOf(
            FeatureDetail("Income Tracking", "Record all farm revenue", Icons.Default.TrendingUp),
            FeatureDetail("Expense Management", "Monitor costs and budgets", Icons.Default.AccountBalance),
            FeatureDetail("Reports", "Generate financial insights", Icons.Default.Assessment)
        )
        "Expert Support" -> listOf(
            FeatureDetail("Live Chat", "Connect with agricultural experts", Icons.Default.Chat),
            FeatureDetail("Knowledge Base", "Access farming guides and tips", Icons.Default.MenuBook),
            FeatureDetail("Community", "Connect with other farmers", Icons.Default.People)
        )
        else -> emptyList()
    }
    
    if (features.isNotEmpty()) {
        Text(
            text = "Key Features",
            style = MaterialTheme.typography.titleMedium,
            fontWeight = FontWeight.Medium
        )
        
        Spacer(modifier = Modifier.height(16.dp))
        
        features.forEach { feature ->
            FeatureCard(
                feature = feature,
                onClick = { onFeatureClick(feature) }
            )
            Spacer(modifier = Modifier.height(8.dp))
        }
    }
}

@Composable
private fun FeatureCard(
    feature: FeatureDetail,
    onClick: () -> Unit
) {
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .clickable { onClick() }
    ) {
        Row(
            modifier = Modifier.padding(16.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Icon(
                feature.icon,
                contentDescription = null,
                tint = MaterialTheme.colorScheme.primary,
                modifier = Modifier.size(24.dp)
            )
            
            Spacer(modifier = Modifier.width(12.dp))
            
            Column(modifier = Modifier.weight(1f)) {
                Text(
                    text = feature.title,
                    style = MaterialTheme.typography.titleSmall,
                    fontWeight = FontWeight.Medium
                )
                Text(
                    text = feature.description,
                    style = MaterialTheme.typography.bodySmall,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )
            }
            
            Icon(
                Icons.Default.ChevronRight,
                contentDescription = null,
                tint = MaterialTheme.colorScheme.onSurfaceVariant
            )
        }
    }
}

@Composable
private fun TutorialNavigation(
    currentStep: Int,
    totalSteps: Int,
    onNext: () -> Unit,
    onPrevious: () -> Unit,
    onComplete: () -> Unit
) {
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .padding(16.dp),
        horizontalArrangement = Arrangement.SpaceBetween,
        verticalAlignment = Alignment.CenterVertically
    ) {
        // Previous button
        if (currentStep > 0) {
            TextButton(onClick = onPrevious) {
                Icon(Icons.Default.ArrowBack, contentDescription = null)
                Spacer(modifier = Modifier.width(4.dp))
                Text("Previous")
            }
        } else {
            Spacer(modifier = Modifier.width(80.dp))
        }
        
        // Step indicators
        Row(
            horizontalArrangement = Arrangement.spacedBy(4.dp)
        ) {
            repeat(totalSteps) { index ->
                Surface(
                    modifier = Modifier.size(8.dp),
                    shape = MaterialTheme.shapes.small,
                    color = if (index == currentStep) 
                        MaterialTheme.colorScheme.primary 
                    else 
                        MaterialTheme.colorScheme.onSurfaceVariant
                ) { }
            }
        }
        
        // Next/Complete button
        Button(
            onClick = if (currentStep == totalSteps - 1) onComplete else onNext
        ) {
            Text(if (currentStep == totalSteps - 1) "Get Started" else "Next")
            Spacer(modifier = Modifier.width(4.dp))
            Icon(
                if (currentStep == totalSteps - 1) Icons.Default.Check else Icons.Default.ArrowForward,
                contentDescription = null
            )
        }
    }
}

@Composable
private fun FeatureDetailsDialog(
    feature: FeatureDetail,
    onDismiss: () -> Unit
) {
    AlertDialog(
        onDismissRequest = onDismiss,
        title = {
            Row(
                verticalAlignment = Alignment.CenterVertically
            ) {
                Icon(
                    feature.icon,
                    contentDescription = null,
                    tint = MaterialTheme.colorScheme.primary
                )
                Spacer(modifier = Modifier.width(8.dp))
                Text(feature.title)
            }
        },
        text = {
            Column {
                Text(
                    text = feature.description,
                    style = MaterialTheme.typography.bodyMedium
                )
                
                Spacer(modifier = Modifier.height(16.dp))
                
                // Additional details based on feature
                when (feature.title) {
                    "Health Tracking" -> {
                        Text(
                            text = "• Monitor vital signs like temperature, heart rate, and weight\n• Track vaccination schedules and medical history\n• Receive alerts for health issues\n• Generate health reports for veterinary visits",
                            style = MaterialTheme.typography.bodySmall,
                            color = MaterialTheme.colorScheme.onSurfaceVariant
                        )
                    }
                    "Breeding Records" -> {
                        Text(
                            text = "• Record breeding dates and partners\n• Track pregnancy progress and due dates\n• Monitor genetic information and pedigrees\n• Plan breeding programs for optimal results",
                            style = MaterialTheme.typography.bodySmall,
                            color = MaterialTheme.colorScheme.onSurfaceVariant
                        )
                    }
                    "Performance Metrics" -> {
                        Text(
                            text = "• Track growth rates and weight gain\n• Monitor feed conversion ratios\n• Analyze productivity and yield data\n• Compare performance across animals",
                            style = MaterialTheme.typography.bodySmall,
                            color = MaterialTheme.colorScheme.onSurfaceVariant
                        )
                    }
                    "Real-time Updates" -> {
                        Text(
                            text = "• Get current temperature, humidity, and wind conditions\n• Monitor rainfall and precipitation\n• Track UV index and solar radiation\n• Receive weather alerts and warnings",
                            style = MaterialTheme.typography.bodySmall,
                            color = MaterialTheme.colorScheme.onSurfaceVariant
                        )
                    }
                    "Forecasts" -> {
                        Text(
                            text = "• 7-day weather forecasts for planning\n• Hourly predictions for daily activities\n• Seasonal outlooks for long-term planning\n• Weather-based activity recommendations",
                            style = MaterialTheme.typography.bodySmall,
                            color = MaterialTheme.colorScheme.onSurfaceVariant
                        )
                    }
                    "Alerts" -> {
                        Text(
                            text = "• Severe weather warnings\n• Frost and freeze alerts\n• Drought and heat stress notifications\n• Weather-based farming recommendations",
                            style = MaterialTheme.typography.bodySmall,
                            color = MaterialTheme.colorScheme.onSurfaceVariant
                        )
                    }
                    "Task Management" -> {
                        Text(
                            text = "• Create and organize farm tasks\n• Set priorities and deadlines\n• Assign tasks to team members\n• Track completion status",
                            style = MaterialTheme.typography.bodySmall,
                            color = MaterialTheme.colorScheme.onSurfaceVariant
                        )
                    }
                    "Reminders" -> {
                        Text(
                            text = "• Customizable notification settings\n• Time-based and location-based reminders\n• Recurring task scheduling\n• Integration with calendar apps",
                            style = MaterialTheme.typography.bodySmall,
                            color = MaterialTheme.colorScheme.onSurfaceVariant
                        )
                    }
                    "Calendar View" -> {
                        Text(
                            text = "• Monthly, weekly, and daily views\n• Color-coded activity categories\n• Drag-and-drop task scheduling\n• Export calendar to other apps",
                            style = MaterialTheme.typography.bodySmall,
                            color = MaterialTheme.colorScheme.onSurfaceVariant
                        )
                    }
                    "Income Tracking" -> {
                        Text(
                            text = "• Record sales of livestock and crops\n• Track government subsidies and grants\n• Monitor rental income and services\n• Categorize income sources",
                            style = MaterialTheme.typography.bodySmall,
                            color = MaterialTheme.colorScheme.onSurfaceVariant
                        )
                    }
                    "Expense Management" -> {
                        Text(
                            text = "• Track feed, veterinary, and equipment costs\n• Monitor labor and utility expenses\n• Set budgets and spending limits\n• Analyze cost trends over time",
                            style = MaterialTheme.typography.bodySmall,
                            color = MaterialTheme.colorScheme.onSurfaceVariant
                        )
                    }
                    "Reports" -> {
                        Text(
                            text = "• Generate profit and loss statements\n• Create cash flow reports\n• Analyze expense breakdowns\n• Export financial data for tax purposes",
                            style = MaterialTheme.typography.bodySmall,
                            color = MaterialTheme.colorScheme.onSurfaceVariant
                        )
                    }
                    "Live Chat" -> {
                        Text(
                            text = "• Connect with agricultural experts 24/7\n• Get instant answers to farming questions\n• Share photos and videos for diagnosis\n• Schedule follow-up consultations",
                            style = MaterialTheme.typography.bodySmall,
                            color = MaterialTheme.colorScheme.onSurfaceVariant
                        )
                    }
                    "Knowledge Base" -> {
                        Text(
                            text = "• Access comprehensive farming guides\n• Learn about livestock care and management\n• Get tips for crop cultivation\n• Stay updated with industry best practices",
                            style = MaterialTheme.typography.bodySmall,
                            color = MaterialTheme.colorScheme.onSurfaceVariant
                        )
                    }
                    "Community" -> {
                        Text(
                            text = "• Connect with other farmers in your area\n• Share experiences and best practices\n• Join discussion forums and groups\n• Participate in local farming events",
                            style = MaterialTheme.typography.bodySmall,
                            color = MaterialTheme.colorScheme.onSurfaceVariant
                        )
                    }
                    else -> {
                        Text(
                            text = "This feature helps you manage your farm more efficiently and make data-driven decisions.",
                            style = MaterialTheme.typography.bodySmall,
                            color = MaterialTheme.colorScheme.onSurfaceVariant
                        )
                    }
                }
            }
        },
        confirmButton = {
            TextButton(onClick = onDismiss) {
                Text("Got it")
            }
        }
    )
}

// Data classes
data class TutorialStep(
    val title: String,
    val description: String,
    val icon: androidx.compose.ui.graphics.vector.ImageVector,
    val color: Color
)

data class FeatureDetail(
    val title: String,
    val description: String,
    val icon: androidx.compose.ui.graphics.vector.ImageVector
) 