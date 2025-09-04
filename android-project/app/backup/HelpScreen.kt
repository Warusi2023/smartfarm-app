package com.yourcompany.smartfarm

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.LazyRow
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
import androidx.compose.ui.text.AnnotatedString
import androidx.compose.ui.text.buildAnnotatedString
import androidx.compose.ui.text.withStyle
import androidx.compose.ui.text.SpanStyle

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun HelpScreen(
    onNavigateBack: () -> Unit = {},
    onContactSupport: () -> Unit = {}
) {
    val context = LocalContext.current
    var searchQuery by remember { mutableStateOf("") }
    var selectedCategory by remember { mutableStateOf<HelpCategory?>(null) }
    var expandedFaq by remember { mutableStateOf<Int?>(null) }
    
    val filteredFaqs = remember(searchQuery, selectedCategory) {
        val allFaqs = getAllFaqs()
        allFaqs.filter { faq ->
            val matchesSearch = searchQuery.isEmpty() || 
                faq.question.contains(searchQuery, ignoreCase = true) ||
                faq.answer.contains(searchQuery, ignoreCase = true)
            val matchesCategory = selectedCategory == null || faq.category == selectedCategory
            matchesSearch && matchesCategory
        }
    }
    
    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Help & FAQ") },
                navigationIcon = {
                    IconButton(onClick = onNavigateBack) {
                        Icon(Icons.Default.ArrowBack, contentDescription = "Back")
                    }
                },
                actions = {
                    IconButton(onClick = onContactSupport) {
                        Icon(Icons.Default.Email, contentDescription = "Contact Support")
                    }
                }
            )
        }
    ) { paddingValues ->
        LazyColumn(
            modifier = Modifier
                .fillMaxSize()
                .padding(paddingValues)
                .padding(16.dp),
            verticalArrangement = Arrangement.spacedBy(16.dp)
        ) {
            // Search Bar
            item {
                SearchBar(
                    query = searchQuery,
                    onQueryChange = { searchQuery = it },
                    onSearch = { searchQuery = it },
                    active = false,
                    onActiveChange = { },
                    placeholder = { Text("Search help topics...") },
                    leadingIcon = { Icon(Icons.Default.Search, contentDescription = "Search") },
                    modifier = Modifier.fillMaxWidth()
                ) { }
            }
            
            // Quick Actions
            item {
                QuickActionsCard(
                    onContactSupport = onContactSupport,
                    onViewTutorial = { /* TODO: Navigate to tutorial */ },
                    onViewVideo = { /* TODO: Navigate to video guides */ },
                    onViewManual = { /* TODO: Navigate to manual */ }
                )
            }
            
            // Categories
            item {
                HelpSectionHeader("Categories")
            }
            
            item {
                CategoryChips(
                    selectedCategory = selectedCategory,
                    onCategorySelected = { selectedCategory = it }
                )
            }
            
            // FAQ Section
            item {
                HelpSectionHeader("Frequently Asked Questions")
            }
            
            if (filteredFaqs.isEmpty()) {
                item {
                    EmptySearchResult(searchQuery)
                }
            } else {
                itemsIndexed(filteredFaqs) { index, faq ->
                    FaqItem(
                        faq = faq,
                        isExpanded = expandedFaq == index,
                        onToggle = { 
                            expandedFaq = if (expandedFaq == index) null else index 
                        }
                    )
                }
            }
            
            // Contact Support
            item {
                ContactSupportCard(
                    onContactSupport = onContactSupport,
                    onEmailSupport = {
                        CommonFunctions.navigateToExternalEmail(
                            context,
                            "support@smartfarm.com",
                            "SmartFarm Support Request",
                            "Please describe your issue here..."
                        )
                    },
                    onCallSupport = {
                        CommonFunctions.navigateToExternalPhone(context, "+1-800-SMARTFARM")
                    },
                    onLiveChat = { /* TODO: Implement live chat */ }
                )
            }
            
            // App Information
            item {
                AppInfoCard()
            }
        }
    }
}

@Composable
private fun HelpSectionHeader(title: String) {
    Text(
        text = title,
        style = MaterialTheme.typography.titleMedium,
        fontWeight = FontWeight.Bold,
        color = MaterialTheme.colorScheme.primary,
        modifier = Modifier.padding(vertical = 8.dp)
    )
}

@Composable
private fun QuickActionsCard(
    onContactSupport: () -> Unit,
    onViewTutorial: () -> Unit,
    onViewVideo: () -> Unit,
    onViewManual: () -> Unit
) {
    Card(
        modifier = Modifier.fillMaxWidth()
    ) {
        Column(
            modifier = Modifier.padding(16.dp)
        ) {
            Text(
                text = "Quick Actions",
                style = MaterialTheme.typography.titleSmall,
                fontWeight = FontWeight.Medium
            )
            
            Spacer(modifier = Modifier.height(12.dp))
            
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceEvenly
            ) {
                HelpQuickActionButton(
                    icon = Icons.Default.Support,
                    label = "Support",
                    onClick = onContactSupport
                )
                HelpQuickActionButton(
                    icon = Icons.Default.School,
                    label = "Tutorial",
                    onClick = onViewTutorial
                )
                HelpQuickActionButton(
                    icon = Icons.Default.VideoLibrary,
                    label = "Videos",
                    onClick = onViewVideo
                )
                HelpQuickActionButton(
                    icon = Icons.Default.MenuBook,
                    label = "Manual",
                    onClick = onViewManual
                )
            }
        }
    }
}

@Composable
private fun HelpQuickActionButton(
    icon: androidx.compose.ui.graphics.vector.ImageVector,
    label: String,
    onClick: () -> Unit
) {
    Column(
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        IconButton(
            onClick = onClick,
            modifier = Modifier.size(48.dp)
        ) {
            Icon(
                icon,
                contentDescription = label,
                tint = MaterialTheme.colorScheme.primary
            )
        }
        Text(
            text = label,
            style = MaterialTheme.typography.bodySmall,
            textAlign = TextAlign.Center
        )
    }
}

@Composable
private fun CategoryChips(
    selectedCategory: HelpCategory?,
    onCategorySelected: (HelpCategory?) -> Unit
) {
    LazyRow(
        horizontalArrangement = Arrangement.spacedBy(8.dp)
    ) {
        item {
            FilterChip(
                selected = selectedCategory == null,
                onClick = { onCategorySelected(null) },
                label = { Text("All") }
            )
        }
        
        items(HelpCategory.values()) { category ->
            FilterChip(
                selected = selectedCategory == category,
                onClick = { onCategorySelected(category) },
                label = { Text(category.displayName) }
            )
        }
    }
}

@Composable
private fun FaqItem(
    faq: FaqItem,
    isExpanded: Boolean,
    onToggle: () -> Unit
) {
    Card(
        modifier = Modifier.fillMaxWidth()
    ) {
        Column(
            modifier = Modifier.padding(16.dp)
        ) {
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .clickable { onToggle() },
                verticalAlignment = Alignment.CenterVertically
            ) {
                Icon(
                    getCategoryIcon(faq.category),
                    contentDescription = null,
                    tint = MaterialTheme.colorScheme.primary,
                    modifier = Modifier.size(20.dp)
                )
                
                Spacer(modifier = Modifier.width(12.dp))
                
                Text(
                    text = faq.question,
                    style = MaterialTheme.typography.titleSmall,
                    fontWeight = FontWeight.Medium,
                    modifier = Modifier.weight(1f)
                )
                
                Icon(
                    if (isExpanded) Icons.Default.ExpandLess else Icons.Default.ExpandMore,
                    contentDescription = if (isExpanded) "Collapse" else "Expand",
                    tint = MaterialTheme.colorScheme.onSurfaceVariant
                )
            }
            
            if (isExpanded) {
                Spacer(modifier = Modifier.height(12.dp))
                Text(
                    text = faq.answer,
                    style = MaterialTheme.typography.bodyMedium,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )
                
                if (faq.steps.isNotEmpty()) {
                    Spacer(modifier = Modifier.height(8.dp))
                    Text(
                        text = "Steps:",
                        style = MaterialTheme.typography.bodySmall,
                        fontWeight = FontWeight.Medium
                    )
                    faq.steps.forEachIndexed { index, step ->
                        Text(
                            text = "${index + 1}. $step",
                            style = MaterialTheme.typography.bodySmall,
                            color = MaterialTheme.colorScheme.onSurfaceVariant
                        )
                    }
                }
            }
        }
    }
}

@Composable
private fun EmptySearchResult(searchQuery: String) {
    Card(
        modifier = Modifier.fillMaxWidth()
    ) {
        Column(
            modifier = Modifier.padding(24.dp),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            Icon(
                Icons.Default.SearchOff,
                contentDescription = null,
                modifier = Modifier.size(48.dp),
                tint = MaterialTheme.colorScheme.onSurfaceVariant
            )
            Spacer(modifier = Modifier.height(16.dp))
            Text(
                text = "No results found",
                style = MaterialTheme.typography.titleMedium,
                fontWeight = FontWeight.Medium
            )
            Text(
                text = "Try searching with different keywords or browse categories",
                style = MaterialTheme.typography.bodyMedium,
                color = MaterialTheme.colorScheme.onSurfaceVariant,
                textAlign = TextAlign.Center
            )
        }
    }
}

@Composable
private fun ContactSupportCard(
    onContactSupport: () -> Unit,
    onEmailSupport: () -> Unit,
    onCallSupport: () -> Unit,
    onLiveChat: () -> Unit
) {
    Card(
        modifier = Modifier.fillMaxWidth()
    ) {
        Column(
            modifier = Modifier.padding(16.dp)
        ) {
            Text(
                text = "Contact Support",
                style = MaterialTheme.typography.titleSmall,
                fontWeight = FontWeight.Medium
            )
            
            Spacer(modifier = Modifier.height(12.dp))
            
            SupportContactItem(
                icon = Icons.Default.Email,
                title = "Email Support",
                subtitle = "support@smartfarm.com",
                onClick = onEmailSupport
            )
            
            SupportContactItem(
                icon = Icons.Default.Phone,
                title = "Phone Support",
                subtitle = "+1-800-SMARTFARM",
                onClick = onCallSupport
            )
            
            SupportContactItem(
                icon = Icons.Default.Chat,
                title = "Live Chat",
                subtitle = "Available 24/7",
                onClick = onLiveChat
            )
            
            Spacer(modifier = Modifier.height(12.dp))
            
            Text(
                text = "Support Hours: Monday - Friday, 9 AM - 6 PM EST",
                style = MaterialTheme.typography.bodySmall,
                color = MaterialTheme.colorScheme.onSurfaceVariant,
                textAlign = TextAlign.Center,
                modifier = Modifier.fillMaxWidth()
            )
        }
    }
}

@Composable
private fun SupportContactItem(
    icon: androidx.compose.ui.graphics.vector.ImageVector,
    title: String,
    subtitle: String,
    onClick: () -> Unit
) {
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .padding(vertical = 8.dp)
            .clickable { onClick() },
        verticalAlignment = Alignment.CenterVertically
    ) {
        Icon(
            icon,
            contentDescription = null,
            tint = MaterialTheme.colorScheme.primary,
            modifier = Modifier.size(20.dp)
        )
        
        Spacer(modifier = Modifier.width(12.dp))
        
        Column(modifier = Modifier.weight(1f)) {
            Text(
                text = title,
                style = MaterialTheme.typography.bodyMedium,
                fontWeight = FontWeight.Medium
            )
            Text(
                text = subtitle,
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

@Composable
private fun AppInfoCard() {
    Card(
        modifier = Modifier.fillMaxWidth()
    ) {
        Column(
            modifier = Modifier.padding(16.dp),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            Text(
                text = "SmartFarm App",
                style = MaterialTheme.typography.titleMedium,
                fontWeight = FontWeight.Bold
            )
            Text(
                text = "Version 1.0.0",
                style = MaterialTheme.typography.bodySmall,
                color = MaterialTheme.colorScheme.onSurfaceVariant
            )
            Text(
                text = "© 2024 SmartFarm. All rights reserved.",
                style = MaterialTheme.typography.bodySmall,
                color = MaterialTheme.colorScheme.onSurfaceVariant,
                textAlign = TextAlign.Center
            )
        }
    }
}

@Composable
private fun getCategoryIcon(category: HelpCategory): androidx.compose.ui.graphics.vector.ImageVector {
    return when (category) {
        HelpCategory.GETTING_STARTED -> Icons.Default.PlayArrow
        HelpCategory.LIVESTOCK -> Icons.Default.Pets
        HelpCategory.WEATHER -> Icons.Default.WbSunny
        HelpCategory.MONETIZATION -> Icons.Default.AttachMoney
        HelpCategory.TECHNICAL -> Icons.Default.Build
        HelpCategory.ACCOUNT -> Icons.Default.Person
        HelpCategory.DATA -> Icons.Default.Storage
        HelpCategory.FEATURES -> Icons.Default.Star
    }
}

// Data classes and enums
enum class HelpCategory(val displayName: String) {
    GETTING_STARTED("Getting Started"),
    LIVESTOCK("Livestock"),
    WEATHER("Weather"),
    MONETIZATION("Monetization"),
    TECHNICAL("Technical"),
    ACCOUNT("Account"),
    DATA("Data Management"),
    FEATURES("Features")
}

data class FaqItem(
    val question: String,
    val answer: String,
    val category: HelpCategory,
    val steps: List<String> = emptyList()
)

fun getAllFaqs(): List<FaqItem> {
    return listOf(
        FaqItem(
            question = "How do I add my first livestock?",
            answer = "To add your first livestock, navigate to the Livestock section and tap the '+' button. Fill in the required information including name, type, breed, and health status.",
            category = HelpCategory.GETTING_STARTED,
            steps = listOf(
                "Go to Livestock section",
                "Tap the '+' button",
                "Fill in livestock details",
                "Save the information"
            )
        ),
        FaqItem(
            question = "How do I track livestock health?",
            answer = "You can track livestock health by adding health records, setting reminders for vaccinations, and monitoring weight and other vital signs.",
            category = HelpCategory.LIVESTOCK
        ),
        FaqItem(
            question = "How accurate is the weather forecast?",
            answer = "Our weather forecasts are sourced from reliable weather services and are typically accurate within 24-48 hours. For longer forecasts, accuracy may vary.",
            category = HelpCategory.WEATHER
        ),
        FaqItem(
            question = "How do I export my farm data?",
            answer = "Go to Settings > Data Management > Export. You can choose from CSV, JSON, PDF, or Excel formats.",
            category = HelpCategory.DATA,
            steps = listOf(
                "Open Settings",
                "Go to Data Management",
                "Tap Export",
                "Choose format",
                "Select export location"
            )
        ),
        FaqItem(
            question = "How do I change my password?",
            answer = "Go to Profile > Account > Change Password. Enter your current password and the new password twice.",
            category = HelpCategory.ACCOUNT
        ),
        FaqItem(
            question = "How do I sync data across devices?",
            answer = "Enable Auto Sync in Settings > Preferences. Your data will automatically sync when you have an internet connection.",
            category = HelpCategory.DATA
        ),
        FaqItem(
            question = "How do I set up notifications?",
            answer = "Go to Settings > Preferences and toggle on Notifications. You can customize which types of notifications you receive.",
            category = HelpCategory.FEATURES
        ),
        FaqItem(
            question = "How do I calculate feed requirements?",
            answer = "Use the Calculator feature in the app. Enter your livestock type, weight, and activity level to get accurate feed recommendations.",
            category = HelpCategory.LIVESTOCK
        ),
        FaqItem(
            question = "How do I track farm expenses?",
            answer = "Use the Monetization section to record income and expenses. You can categorize transactions and generate reports.",
            category = HelpCategory.MONETIZATION
        ),
        FaqItem(
            question = "How do I backup my data?",
            answer = "Go to Profile > Account > Backup Data. Your data will be securely backed up to the cloud.",
            category = HelpCategory.DATA
        ),
        FaqItem(
            question = "How do I add farm activities?",
            answer = "Navigate to Farm Activity section and tap the '+' button. You can schedule activities and set reminders.",
            category = HelpCategory.FEATURES
        ),
        FaqItem(
            question = "How do I use the expert chat feature?",
            answer = "Go to Expert Chat section and start a conversation. Our agricultural experts are available to help with farming questions.",
            category = HelpCategory.FEATURES
        ),
        FaqItem(
            question = "How do I reset the app?",
            answer = "Go to Settings > Data Management > Clear Data. This will remove all your data and reset the app to initial state.",
            category = HelpCategory.TECHNICAL
        ),
        FaqItem(
            question = "How do I update the app?",
            answer = "App updates are available through the Google Play Store. You'll receive a notification when updates are available.",
            category = HelpCategory.TECHNICAL
        ),
        FaqItem(
            question = "How do I report a bug?",
            answer = "Contact support through the Help section or email us directly at support@smartfarm.com with details about the issue.",
            category = HelpCategory.TECHNICAL
        )
    )
} 