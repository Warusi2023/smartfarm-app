package com.example.smartfarm

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
import com.example.smartfarm.util.*
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.foundation.clickable
import androidx.compose.foundation.text.KeyboardActions
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.ui.text.input.ImeAction
import androidx.compose.ui.text.input.KeyboardType
import com.example.smartfarm.data.model.*

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun SearchScreen(
    livestockViewModel: LivestockViewModel,
    onNavigateBack: () -> Unit = {},
    onNavigateToLivestock: (Long) -> Unit = {},
    onNavigateToActivity: (Long) -> Unit = {},
    onNavigateToRecord: (Long) -> Unit = {}
) {
    val context = LocalContext.current
    var searchQuery by remember { mutableStateOf("") }
    var selectedCategory by remember { mutableStateOf<SearchCategory?>(null) }
    var showFilters by remember { mutableStateOf(false) }
    var searchHistory by remember { mutableStateOf(listOf<String>()) }
    var isSearching by remember { mutableStateOf(false) }
    
    val uiState by livestockViewModel.uiState.collectAsState()
    val livestockList = uiState.livestock
    
    // Search results
    val searchResults = remember(searchQuery, selectedCategory, livestockList) {
        if (searchQuery.isEmpty()) {
            emptyList()
        } else {
            performSearch(searchQuery, selectedCategory, livestockList)
        }
    }
    
    // Filter options
    var selectedStatus by remember { mutableStateOf<LivestockStatus?>(null) }
    var selectedType by remember { mutableStateOf<LivestockCategory?>(null) }
    var dateRange by remember { mutableStateOf<SearchDateRange?>(null) }
    
    LaunchedEffect(searchQuery) {
        if (searchQuery.isNotEmpty() && !searchHistory.contains(searchQuery)) {
            searchHistory = (listOf(searchQuery) + searchHistory).take(10)
        }
    }
    
    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Search") },
                navigationIcon = {
                    IconButton(onClick = onNavigateBack) {
                        Icon(Icons.Default.ArrowBack, contentDescription = "Back")
                    }
                },
                actions = {
                    IconButton(onClick = { showFilters = !showFilters }) {
                        Icon(
                            if (showFilters) Icons.Default.FilterListOff else Icons.Default.FilterList,
                            contentDescription = "Filters"
                        )
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
            // Search Bar
            SearchBar(
                query = searchQuery,
                onQueryChange = { 
                    searchQuery = it
                    isSearching = it.isNotEmpty()
                },
                onSearch = { 
                    searchQuery = it
                    isSearching = false
                },
                active = false,
                onActiveChange = { },
                placeholder = { Text("Search livestock, activities, records...") },
                leadingIcon = { Icon(Icons.Default.Search, contentDescription = "Search") },
                trailingIcon = {
                    if (searchQuery.isNotEmpty()) {
                        IconButton(onClick = { searchQuery = "" }) {
                            Icon(Icons.Default.Clear, contentDescription = "Clear")
                        }
                    }
                },
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(16.dp)
            ) { }
            
            // Filters
            if (showFilters) {
                SearchFiltersCard(
                    selectedCategory = selectedCategory,
                    onCategoryChange = { selectedCategory = it },
                    selectedStatus = selectedStatus,
                    onStatusChange = { selectedStatus = it },
                    selectedType = selectedType,
                    onTypeChange = { selectedType = it },
                    dateRange = dateRange,
                    onDateRangeChange = { dateRange = it }
                )
            }
            
            // Content
            if (searchQuery.isEmpty()) {
                // Search suggestions and history
                SearchSuggestions(
                    searchHistory = searchHistory,
                    onSearchHistoryClick = { searchQuery = it },
                    onClearHistory = { searchHistory = emptyList() }
                )
            } else if (isSearching) {
                // Loading state
                Box(
                    modifier = Modifier.fillMaxSize(),
                    contentAlignment = Alignment.Center
                ) {
                    LoadingStates.FullScreenLoading("Searching...")
                }
            } else {
                // Search results
                SearchResults(
                    results = searchResults,
                    onLivestockClick = onNavigateToLivestock,
                    onActivityClick = onNavigateToActivity,
                    onRecordClick = onNavigateToRecord
                )
            }
        }
    }
}

@Composable
private fun SearchFiltersCard(
    selectedCategory: SearchCategory?,
    onCategoryChange: (SearchCategory?) -> Unit,
    selectedStatus: LivestockStatus?,
    onStatusChange: (LivestockStatus?) -> Unit,
    selectedType: LivestockCategory?,
    onTypeChange: (LivestockCategory?) -> Unit,
    dateRange: SearchDateRange?,
onDateRangeChange: (SearchDateRange?) -> Unit
) {
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .padding(horizontal = 16.dp, vertical = 8.dp)
    ) {
        Column(
            modifier = Modifier.padding(16.dp)
        ) {
            Text(
                text = "Filters",
                style = MaterialTheme.typography.titleSmall,
                fontWeight = FontWeight.Medium
            )
            
            Spacer(modifier = Modifier.height(12.dp))
            
            // Category filter
            Text(
                text = "Category",
                style = MaterialTheme.typography.bodySmall,
                color = MaterialTheme.colorScheme.onSurfaceVariant
            )
            LazyRow(
                horizontalArrangement = Arrangement.spacedBy(8.dp),
                modifier = Modifier.padding(vertical = 4.dp)
            ) {
                item {
                    FilterChip(
                        selected = selectedCategory == null,
                        onClick = { onCategoryChange(null) },
                        label = { Text("All") }
                    )
                }
                items(SearchCategory.values()) { category ->
                    FilterChip(
                        selected = selectedCategory == category,
                        onClick = { onCategoryChange(category) },
                        label = { Text(category.displayName) }
                    )
                }
            }
            
            Spacer(modifier = Modifier.height(12.dp))
            
            // Status filter (for livestock)
            if (selectedCategory == SearchCategory.LIVESTOCK || selectedCategory == null) {
                Text(
                    text = "Status",
                    style = MaterialTheme.typography.bodySmall,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )
                LazyRow(
                    horizontalArrangement = Arrangement.spacedBy(8.dp),
                    modifier = Modifier.padding(vertical = 4.dp)
                ) {
                    item {
                        FilterChip(
                            selected = selectedStatus == null,
                            onClick = { onStatusChange(null) },
                            label = { Text("All") }
                        )
                    }
                    items(LivestockStatus.values()) { status ->
                        FilterChip(
                            selected = selectedStatus == status,
                            onClick = { onStatusChange(status) },
                            label = { Text(status.displayName) }
                        )
                    }
                }
                
                Spacer(modifier = Modifier.height(12.dp))
            }
            
            // Type filter (for livestock)
            if (selectedCategory == SearchCategory.LIVESTOCK || selectedCategory == null) {
                Text(
                    text = "Type",
                    style = MaterialTheme.typography.bodySmall,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )
                LazyRow(
                    horizontalArrangement = Arrangement.spacedBy(8.dp),
                    modifier = Modifier.padding(vertical = 4.dp)
                ) {
                    item {
                        FilterChip(
                            selected = selectedType == null,
                            onClick = { onTypeChange(null) },
                            label = { Text("All") }
                        )
                    }
                    items(LivestockCategory.values()) { type ->
                        FilterChip(
                            selected = selectedType == type,
                            onClick = { onTypeChange(type) },
                            label = { Text(type.displayName) }
                        )
                    }
                }
            }
        }
    }
}

@Composable
private fun SearchSuggestions(
    searchHistory: List<String>,
    onSearchHistoryClick: (String) -> Unit,
    onClearHistory: () -> Unit
) {
    LazyColumn(
        modifier = Modifier.fillMaxSize(),
        contentPadding = PaddingValues(16.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        // Quick search suggestions
        item {
            QuickSearchSuggestions(
                onSuggestionClick = onSearchHistoryClick
            )
        }
        
        // Search history
        if (searchHistory.isNotEmpty()) {
            item {
                SearchHistorySection(
                    searchHistory = searchHistory,
                    onHistoryClick = onSearchHistoryClick,
                    onClearHistory = onClearHistory
                )
            }
        }
        
        // Popular searches
        item {
            PopularSearchesSection(
                onSuggestionClick = onSearchHistoryClick
            )
        }
    }
}

@Composable
private fun QuickSearchSuggestions(
    onSuggestionClick: (String) -> Unit
) {
    Card(
        modifier = Modifier.fillMaxWidth()
    ) {
        Column(
            modifier = Modifier.padding(16.dp)
        ) {
            Text(
                text = "Quick Search",
                style = MaterialTheme.typography.titleSmall,
                fontWeight = FontWeight.Medium
            )
            
            Spacer(modifier = Modifier.height(12.dp))
            
            val suggestions = listOf(
                "Healthy livestock",
                "Sick animals",
                "Recent activities",
                "Weather alerts",
                "Financial reports",
                "Vaccination due",
                "Feed inventory",
                "Breeding records"
            )
            
            suggestions.chunked(2).forEach { row ->
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.spacedBy(8.dp)
                ) {
                    row.forEach { suggestion ->
                        SuggestionChip(
                            onClick = { onSuggestionClick(suggestion) },
                            label = { Text(suggestion) },
                            modifier = Modifier.weight(1f)
                        )
                    }
                }
                if (row != suggestions.chunked(2).last()) {
                    Spacer(modifier = Modifier.height(8.dp))
                }
            }
        }
    }
}

@Composable
private fun SearchHistorySection(
    searchHistory: List<String>,
    onHistoryClick: (String) -> Unit,
    onClearHistory: () -> Unit
) {
    Card(
        modifier = Modifier.fillMaxWidth()
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
                    text = "Recent Searches",
                    style = MaterialTheme.typography.titleSmall,
                    fontWeight = FontWeight.Medium
                )
                TextButton(onClick = onClearHistory) {
                    Text("Clear")
                }
            }
            
            Spacer(modifier = Modifier.height(8.dp))
            
            searchHistory.forEach { query ->
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .clickable { onHistoryClick(query) }
                        .padding(vertical = 8.dp),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Icon(
                        Icons.Default.History,
                        contentDescription = null,
                        tint = MaterialTheme.colorScheme.onSurfaceVariant,
                        modifier = Modifier.size(20.dp)
                    )
                    Spacer(modifier = Modifier.width(12.dp))
                    Text(
                        text = query,
                        style = MaterialTheme.typography.bodyMedium
                    )
                }
            }
        }
    }
}

@Composable
private fun PopularSearchesSection(
    onSuggestionClick: (String) -> Unit
) {
    Card(
        modifier = Modifier.fillMaxWidth()
    ) {
        Column(
            modifier = Modifier.padding(16.dp)
        ) {
            Text(
                text = "Popular Searches",
                style = MaterialTheme.typography.titleSmall,
                fontWeight = FontWeight.Medium
            )
            
            Spacer(modifier = Modifier.height(12.dp))
            
            val popularSearches = listOf(
                "Cattle health",
                "Pig feeding",
                "Chicken vaccination",
                "Weather forecast",
                "Farm expenses",
                "Crop yields",
                "Equipment maintenance",
                "Veterinary visits"
            )
            
            popularSearches.forEach { search ->
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .clickable { onSuggestionClick(search) }
                        .padding(vertical = 8.dp),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Icon(
                        Icons.Default.TrendingUp,
                        contentDescription = null,
                        tint = MaterialTheme.colorScheme.primary,
                        modifier = Modifier.size(20.dp)
                    )
                    Spacer(modifier = Modifier.width(12.dp))
                    Text(
                        text = search,
                        style = MaterialTheme.typography.bodyMedium
                    )
                }
            }
        }
    }
}

@Composable
private fun SearchResults(
    results: List<SearchResult>,
    onLivestockClick: (Long) -> Unit,
    onActivityClick: (Long) -> Unit,
    onRecordClick: (Long) -> Unit
) {
    LazyColumn(
        modifier = Modifier.fillMaxSize(),
        contentPadding = PaddingValues(16.dp),
        verticalArrangement = Arrangement.spacedBy(8.dp)
    ) {
        if (results.isEmpty()) {
            item {
                EmptySearchResult()
            }
        } else {
            itemsIndexed(results) { index, result ->
                SearchResultItem(
                    result = result,
                    onLivestockClick = onLivestockClick,
                    onActivityClick = onActivityClick,
                    onRecordClick = onRecordClick
                )
            }
        }
    }
}

@Composable
private fun SearchResultItem(
    result: SearchResult,
    onLivestockClick: (Long) -> Unit,
    onActivityClick: (Long) -> Unit,
    onRecordClick: (Long) -> Unit
) {
    Card(
        modifier = Modifier.fillMaxWidth()
    ) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(16.dp)
                .clickable {
                    when (result) {
                        is SearchResult.Livestock -> onLivestockClick(result.livestock.id)
                        is SearchResult.Activity -> onActivityClick(result.activity.id)
                        is SearchResult.Record -> onRecordClick(result.record.id)
                    }
                },
            verticalAlignment = Alignment.CenterVertically
        ) {
            // Icon based on result type
            Surface(
                modifier = Modifier.size(40.dp),
                shape = MaterialTheme.shapes.medium,
                color = when (result) {
                    is SearchResult.Livestock -> MaterialTheme.colorScheme.primaryContainer
                    is SearchResult.Activity -> MaterialTheme.colorScheme.secondaryContainer
                    is SearchResult.Record -> MaterialTheme.colorScheme.tertiaryContainer
                }
            ) {
                Box(
                    modifier = Modifier.fillMaxSize(),
                    contentAlignment = Alignment.Center
                ) {
                    Icon(
                        when (result) {
                            is SearchResult.Livestock -> Icons.Default.Pets
                            is SearchResult.Activity -> Icons.Default.Schedule
                            is SearchResult.Record -> Icons.Default.Description
                        },
                        contentDescription = null,
                        tint = when (result) {
                            is SearchResult.Livestock -> MaterialTheme.colorScheme.onPrimaryContainer
                            is SearchResult.Activity -> MaterialTheme.colorScheme.onSecondaryContainer
                            is SearchResult.Record -> MaterialTheme.colorScheme.onTertiaryContainer
                        },
                        modifier = Modifier.size(20.dp)
                    )
                }
            }
            
            Spacer(modifier = Modifier.width(12.dp))
            
            // Content
            Column(modifier = Modifier.weight(1f)) {
                Text(
                    text = when (result) {
                        is SearchResult.Livestock -> result.livestock.name
                        is SearchResult.Activity -> result.activity.title
                        is SearchResult.Record -> result.record.title
                    },
                    style = MaterialTheme.typography.titleSmall,
                    fontWeight = FontWeight.Medium
                )
                Text(
                    text = when (result) {
                        is SearchResult.Livestock -> "${result.livestock.breed} • ${result.livestock.healthStatus}"
                        is SearchResult.Activity -> result.activity.description
                        is SearchResult.Record -> result.record.description
                    },
                    style = MaterialTheme.typography.bodySmall,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )
                Text(
                    text = when (result) {
                        is SearchResult.Livestock -> "Livestock"
                        is SearchResult.Activity -> "Activity"
                        is SearchResult.Record -> "Record"
                    },
                    style = MaterialTheme.typography.bodySmall,
                    color = MaterialTheme.colorScheme.primary
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
private fun EmptySearchResult() {
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
                text = "Try adjusting your search terms or filters",
                style = MaterialTheme.typography.bodyMedium,
                color = MaterialTheme.colorScheme.onSurfaceVariant,
                textAlign = TextAlign.Center
            )
        }
    }
}

// Data classes and enums
enum class SearchCategory(val displayName: String) {
    ALL("All"),
    LIVESTOCK("Livestock"),
    ACTIVITIES("Activities"),
    RECORDS("Records"),
    WEATHER("Weather"),
    FINANCIAL("Financial")
}

enum class LivestockStatus(val displayName: String) {
    EXCELLENT("Excellent"),
    GOOD("Good"),
    FAIR("Fair"),
    POOR("Poor"),
    CRITICAL("Critical")
}

data class SearchDateRange(
    val startDate: String,
    val endDate: String
)

sealed class SearchResult {
    data class Livestock(val livestock: Livestock) : SearchResult()
    data class Activity(val activity: FarmActivity) : SearchResult()
    data class Record(val record: AnimalHealthRecord) : SearchResult()
}

fun performSearch(
    query: String,
    category: SearchCategory?,
    livestockList: List<Livestock>
): List<SearchResult> {
    val results = mutableListOf<SearchResult>()
    
    if (category == null || category == SearchCategory.ALL || category == SearchCategory.LIVESTOCK) {
        // Search livestock
        livestockList.forEach { livestock ->
            if (livestock.name.contains(query, ignoreCase = true) ||
                livestock.breed.contains(query, ignoreCase = true) ||
                livestock.healthStatus.contains(query, ignoreCase = true) ||
                livestock.notes.contains(query, ignoreCase = true)
            ) {
                results.add(SearchResult.Livestock(livestock))
            }
        }
    }
    
    // TODO: Add search for activities and records when those ViewModels are available
    
    return results
} 