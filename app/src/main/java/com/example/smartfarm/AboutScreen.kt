package com.example.smartfarm

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
import com.example.smartfarm.util.*
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.foundation.clickable
import androidx.compose.ui.graphics.Color
import android.content.Context

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun AboutScreen(
    onNavigateBack: () -> Unit = {},
    onNavigateToPrivacyPolicy: () -> Unit = {},
    onNavigateToTermsOfService: () -> Unit = {},
    onNavigateToLicenses: () -> Unit = {}
) {
    val context = LocalContext.current
    
    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("About SmartFarm") },
                navigationIcon = {
                    IconButton(onClick = onNavigateBack) {
                        Icon(Icons.Default.ArrowBack, contentDescription = "Back")
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
            // App Header
            item {
                AppHeaderCard()
            }
            
            // App Description
            item {
                AppDescriptionCard()
            }
            
            // Features
            item {
                FeaturesCard()
            }
            
            // Team
            item {
                TeamCard()
            }
            
            // Version History
            item {
                VersionHistoryCard()
            }
            
            // Legal Links
            item {
                LegalLinksCard(
                    onPrivacyPolicy = onNavigateToPrivacyPolicy,
                    onTermsOfService = onNavigateToTermsOfService,
                    onLicenses = onNavigateToLicenses
                )
            }
            
            // Social Links
            item {
                SocialLinksCard(context)
            }
            
            // Contact Information
            item {
                ContactInfoCard(context)
            }
            
            // App Statistics
            item {
                AppStatisticsCard()
            }
        }
    }
}

@Composable
private fun AppHeaderCard() {
    Card(
        modifier = Modifier.fillMaxWidth()
    ) {
        Column(
            modifier = Modifier.padding(24.dp),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            // App Icon
            Surface(
                modifier = Modifier.size(80.dp),
                shape = MaterialTheme.shapes.medium,
                color = MaterialTheme.colorScheme.primaryContainer
            ) {
                Box(
                    modifier = Modifier.fillMaxSize(),
                    contentAlignment = Alignment.Center
                ) {
                    Icon(
                        Icons.Default.Agriculture,
                        contentDescription = "SmartFarm",
                        tint = MaterialTheme.colorScheme.onPrimaryContainer,
                        modifier = Modifier.size(48.dp)
                    )
                }
            }
            
            Spacer(modifier = Modifier.height(16.dp))
            
            Text(
                text = "SmartFarm",
                style = MaterialTheme.typography.headlineMedium,
                fontWeight = FontWeight.Bold
            )
            
            Text(
                text = "Version 1.0.0",
                style = MaterialTheme.typography.bodyMedium,
                color = MaterialTheme.colorScheme.onSurfaceVariant
            )
            
            Text(
                text = "Revolutionizing Farm Management",
                style = MaterialTheme.typography.bodySmall,
                color = MaterialTheme.colorScheme.primary,
                fontWeight = FontWeight.Medium
            )
        }
    }
}

@Composable
private fun AppDescriptionCard() {
    Card(
        modifier = Modifier.fillMaxWidth()
    ) {
        Column(
            modifier = Modifier.padding(16.dp)
        ) {
            Text(
                text = "About SmartFarm",
                style = MaterialTheme.typography.titleMedium,
                fontWeight = FontWeight.Bold
            )
            
            Spacer(modifier = Modifier.height(8.dp))
            
            Text(
                text = "SmartFarm is a comprehensive farm management application designed to help farmers and agricultural professionals streamline their operations, track livestock health, monitor weather conditions, and optimize farm productivity.",
                style = MaterialTheme.typography.bodyMedium,
                color = MaterialTheme.colorScheme.onSurfaceVariant
            )
            
            Spacer(modifier = Modifier.height(12.dp))
            
            Text(
                text = "Our mission is to empower farmers with modern technology to make data-driven decisions, improve animal welfare, and increase farm profitability while promoting sustainable agricultural practices.",
                style = MaterialTheme.typography.bodyMedium,
                color = MaterialTheme.colorScheme.onSurfaceVariant
            )
        }
    }
}

@Composable
private fun FeaturesCard() {
    Card(
        modifier = Modifier.fillMaxWidth()
    ) {
        Column(
            modifier = Modifier.padding(16.dp)
        ) {
            Text(
                text = "Key Features",
                style = MaterialTheme.typography.titleMedium,
                fontWeight = FontWeight.Bold
            )
            
            Spacer(modifier = Modifier.height(12.dp))
            
            val features = listOf(
                "Livestock Management & Health Tracking",
                "Real-time Weather Monitoring",
                "Farm Activity Scheduling",
                "Financial Management & Reports",
                "Expert Agricultural Support",
                "Data Export & Backup",
                "GPS Location Services",
                "Push Notifications & Alerts"
            )
            
            features.forEach { feature ->
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(vertical = 4.dp),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Icon(
                        Icons.Default.Check,
                        contentDescription = null,
                        tint = MaterialTheme.colorScheme.primary,
                        modifier = Modifier.size(16.dp)
                    )
                    Spacer(modifier = Modifier.width(8.dp))
                    Text(
                        text = feature,
                        style = MaterialTheme.typography.bodyMedium
                    )
                }
            }
        }
    }
}

@Composable
private fun TeamCard() {
    Card(
        modifier = Modifier.fillMaxWidth()
    ) {
        Column(
            modifier = Modifier.padding(16.dp)
        ) {
            Text(
                text = "Development Team",
                style = MaterialTheme.typography.titleMedium,
                fontWeight = FontWeight.Bold
            )
            
            Spacer(modifier = Modifier.height(12.dp))
            
            val teamMembers = listOf(
                TeamMember("John Smith", "Lead Developer", "john.smith@smartfarm.com"),
                TeamMember("Sarah Johnson", "UI/UX Designer", "sarah.johnson@smartfarm.com"),
                TeamMember("Michael Brown", "Agricultural Expert", "michael.brown@smartfarm.com"),
                TeamMember("Emily Davis", "Product Manager", "emily.davis@smartfarm.com"),
                TeamMember("David Wilson", "Backend Developer", "david.wilson@smartfarm.com")
            )
            
            teamMembers.forEach { member ->
                TeamMemberItem(member)
                if (member != teamMembers.last()) {
                    Spacer(modifier = Modifier.height(8.dp))
                }
            }
        }
    }
}

@Composable
private fun TeamMemberItem(member: TeamMember) {
    Row(
        modifier = Modifier.fillMaxWidth(),
        verticalAlignment = Alignment.CenterVertically
    ) {
        Surface(
            modifier = Modifier.size(40.dp),
            shape = MaterialTheme.shapes.medium,
            color = MaterialTheme.colorScheme.primaryContainer
        ) {
            Box(
                modifier = Modifier.fillMaxSize(),
                contentAlignment = Alignment.Center
            ) {
                Text(
                    text = member.name.split(" ").map { it[0] }.joinToString(""),
                    style = MaterialTheme.typography.bodySmall,
                    fontWeight = FontWeight.Bold,
                    color = MaterialTheme.colorScheme.onPrimaryContainer
                )
            }
        }
        
        Spacer(modifier = Modifier.width(12.dp))
        
        Column(modifier = Modifier.weight(1f)) {
            Text(
                text = member.name,
                style = MaterialTheme.typography.bodyMedium,
                fontWeight = FontWeight.Medium
            )
            Text(
                text = member.role,
                style = MaterialTheme.typography.bodySmall,
                color = MaterialTheme.colorScheme.onSurfaceVariant
            )
        }
        
        val context = LocalContext.current
        IconButton(
            onClick = {
                CommonFunctions.navigateToExternalEmail(
                    context,
                    member.email,
                    "SmartFarm - Contact ${member.name}",
                    ""
                )
            }
        ) {
            Icon(
                Icons.Default.Email,
                contentDescription = "Email ${member.name}",
                tint = MaterialTheme.colorScheme.primary
            )
        }
    }
}

@Composable
private fun VersionHistoryCard() {
    Card(
        modifier = Modifier.fillMaxWidth()
    ) {
        Column(
            modifier = Modifier.padding(16.dp)
        ) {
            Text(
                text = "Version History",
                style = MaterialTheme.typography.titleMedium,
                fontWeight = FontWeight.Bold
            )
            
            Spacer(modifier = Modifier.height(12.dp))
            
            val versions = listOf(
                VersionInfo("1.0.0", "2024-01-15", "Initial release with core features"),
                VersionInfo("0.9.0", "2023-12-01", "Beta testing with limited users"),
                VersionInfo("0.8.0", "2023-11-15", "UI improvements and bug fixes"),
                VersionInfo("0.7.0", "2023-10-30", "Added weather integration"),
                VersionInfo("0.6.0", "2023-10-15", "Livestock management features"),
                VersionInfo("0.5.0", "2023-09-30", "Basic farm tracking functionality")
            )
            
            versions.forEach { version ->
                VersionItem(version)
                if (version != versions.last()) {
                    Spacer(modifier = Modifier.height(8.dp))
                }
            }
        }
    }
}

@Composable
private fun VersionItem(version: VersionInfo) {
    Row(
        modifier = Modifier.fillMaxWidth(),
        verticalAlignment = Alignment.Top
    ) {
        Column(modifier = Modifier.weight(1f)) {
            Text(
                text = "v${version.version}",
                style = MaterialTheme.typography.bodyMedium,
                fontWeight = FontWeight.Medium
            )
            Text(
                text = version.date,
                style = MaterialTheme.typography.bodySmall,
                color = MaterialTheme.colorScheme.onSurfaceVariant
            )
        }
        
        Text(
            text = version.description,
            style = MaterialTheme.typography.bodySmall,
            color = MaterialTheme.colorScheme.onSurfaceVariant,
            modifier = Modifier.weight(2f)
        )
    }
}

@Composable
private fun LegalLinksCard(
    onPrivacyPolicy: () -> Unit,
    onTermsOfService: () -> Unit,
    onLicenses: () -> Unit
) {
    Card(
        modifier = Modifier.fillMaxWidth()
    ) {
        Column(
            modifier = Modifier.padding(16.dp)
        ) {
            Text(
                text = "Legal",
                style = MaterialTheme.typography.titleMedium,
                fontWeight = FontWeight.Bold
            )
            
            Spacer(modifier = Modifier.height(12.dp))
            
            LegalLinkItem(
                icon = Icons.Default.PrivacyTip,
                title = "Privacy Policy",
                subtitle = "How we handle your data",
                onClick = onPrivacyPolicy
            )
            
            LegalLinkItem(
                icon = Icons.Default.Description,
                title = "Terms of Service",
                subtitle = "Usage terms and conditions",
                onClick = onTermsOfService
            )
            
            LegalLinkItem(
                icon = Icons.Default.LibraryBooks,
                title = "Open Source Licenses",
                subtitle = "Third-party libraries used",
                onClick = onLicenses
            )
        }
    }
}

@Composable
private fun LegalLinkItem(
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
private fun SocialLinksCard(context: Context) {
    Card(
        modifier = Modifier.fillMaxWidth()
    ) {
        Column(
            modifier = Modifier.padding(16.dp)
        ) {
            Text(
                text = "Connect With Us",
                style = MaterialTheme.typography.titleMedium,
                fontWeight = FontWeight.Bold
            )
            
            Spacer(modifier = Modifier.height(12.dp))
            
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceEvenly
            ) {
                SocialLinkButton(
                    icon = Icons.Default.Language,
                    label = "Website",
                    onClick = {
                        CommonFunctions.navigateToExternalBrowser(context, "https://smartfarm.com")
                    }
                )
                SocialLinkButton(
                    icon = Icons.Default.Email,
                    label = "Email",
                    onClick = {
                        CommonFunctions.navigateToExternalEmail(
                            context,
                            "info@smartfarm.com",
                            "SmartFarm Inquiry",
                            ""
                        )
                    }
                )
                SocialLinkButton(
                    icon = Icons.Default.Phone,
                    label = "Phone",
                    onClick = {
                        CommonFunctions.navigateToExternalPhone(context, "+1-800-SMARTFARM")
                    }
                )
            }
        }
    }
}

@Composable
private fun SocialLinkButton(
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
private fun ContactInfoCard(context: Context) {
    Card(
        modifier = Modifier.fillMaxWidth()
    ) {
        Column(
            modifier = Modifier.padding(16.dp)
        ) {
            Text(
                text = "Contact Information",
                style = MaterialTheme.typography.titleMedium,
                fontWeight = FontWeight.Bold
            )
            
            Spacer(modifier = Modifier.height(12.dp))
            
            ContactInfoItem(
                icon = Icons.Default.Email,
                label = "Email",
                value = "support@smartfarm.com",
                onClick = {
                    CommonFunctions.navigateToExternalEmail(
                        context,
                        "support@smartfarm.com",
                        "SmartFarm Support",
                        ""
                    )
                }
            )
            
            ContactInfoItem(
                icon = Icons.Default.Phone,
                label = "Phone",
                value = "+1-800-SMARTFARM",
                onClick = {
                    CommonFunctions.navigateToExternalPhone(context, "+1-800-SMARTFARM")
                }
            )
            
            ContactInfoItem(
                icon = Icons.Default.LocationOn,
                label = "Address",
                value = "123 Farm Street, Agriculture City, AC 12345",
                onClick = {
                    CommonFunctions.navigateToExternalMap(
                        context,
                        40.7128, -74.0060, "SmartFarm Headquarters"
                    )
                }
            )
        }
    }
}

@Composable
private fun ContactInfoItem(
    icon: androidx.compose.ui.graphics.vector.ImageVector,
    label: String,
    value: String,
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
                text = label,
                style = MaterialTheme.typography.bodyMedium,
                fontWeight = FontWeight.Medium
            )
            Text(
                text = value,
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
private fun AppStatisticsCard() {
    Card(
        modifier = Modifier.fillMaxWidth()
    ) {
        Column(
            modifier = Modifier.padding(16.dp)
        ) {
            Text(
                text = "App Statistics",
                style = MaterialTheme.typography.titleMedium,
                fontWeight = FontWeight.Bold
            )
            
            Spacer(modifier = Modifier.height(12.dp))
            
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceEvenly
            ) {
                StatItem(
                    icon = Icons.Default.Download,
                    label = "Downloads",
                    value = "10K+"
                )
                StatItem(
                    icon = Icons.Default.Star,
                    label = "Rating",
                    value = "4.8★"
                )
                StatItem(
                    icon = Icons.Default.People,
                    label = "Users",
                    value = "5K+"
                )
            }
        }
    }
}

@Composable
private fun StatItem(
    icon: androidx.compose.ui.graphics.vector.ImageVector,
    label: String,
    value: String
) {
    Column(
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Icon(
            icon,
            contentDescription = label,
            modifier = Modifier.size(24.dp),
            tint = MaterialTheme.colorScheme.primary
        )
        Spacer(modifier = Modifier.height(4.dp))
        Text(
            text = value,
            style = MaterialTheme.typography.headlineSmall,
            fontWeight = FontWeight.Bold
        )
        Text(
            text = label,
            style = MaterialTheme.typography.bodySmall,
            color = MaterialTheme.colorScheme.onSurfaceVariant
        )
    }
}

// Data classes
data class TeamMember(
    val name: String,
    val role: String,
    val email: String
)

data class VersionInfo(
    val version: String,
    val date: String,
    val description: String
) 