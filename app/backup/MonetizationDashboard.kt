package com.yourcompany.smartfarm

import androidx.compose.foundation.background
import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.compose.ui.platform.LocalContext
import androidx.lifecycle.viewmodel.compose.viewModel
import com.yourcompany.smartfarm.data.model.*

@Composable
fun MonetizationDashboard(
    sponsorshipViewModel: SponsorshipViewModel = viewModel(),
    affiliateViewModel: AffiliateProductViewModel = viewModel(),
    earningsViewModel: EarningsViewModel = viewModel()
) {
    val sponsorshipState by sponsorshipViewModel.uiState.collectAsState()
    val affiliateState by affiliateViewModel.uiState.collectAsState()
    val earningsState by earningsViewModel.uiState.collectAsState()
    
    LazyColumn(
        modifier = Modifier
            .fillMaxSize()
            .background(MaterialTheme.colorScheme.surface)
            .padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        item {
            DashboardHeader(totalEarnings = earningsState.totalEarnings)
        }
        
        item {
            RevenueOverviewCard(
                totalEarnings = earningsState.totalEarnings,
                sponsorshipCount = sponsorshipState.sponsorships.size,
                productCount = affiliateState.products.size
            )
        }
        
        item {
            QuickActionsCard()
        }
        
        if (sponsorshipState.sponsorships.isNotEmpty()) {
            item {
                Text(
                    text = "Recent Sponsorships",
                    style = MaterialTheme.typography.titleLarge,
                    fontWeight = FontWeight.Bold
                )
            }
            
            items(sponsorshipState.sponsorships.take(3)) { sponsorship ->
                SponsorshipCard(sponsorship = sponsorship)
            }
        }
        
        if (affiliateState.products.isNotEmpty()) {
            item {
                Text(
                    text = "Top Products",
                    style = MaterialTheme.typography.titleLarge,
                    fontWeight = FontWeight.Bold
                )
            }
            
            items(affiliateState.products.take(3)) { product ->
                ProductCard(product = product)
            }
        }
        
        if (earningsState.earnings.isNotEmpty()) {
            item {
                Text(
                    text = "Recent Earnings",
                    style = MaterialTheme.typography.titleLarge,
                    fontWeight = FontWeight.Bold
                )
            }
            
            items(earningsState.earnings.take(5)) { earning ->
                EarningCard(earning = earning)
            }
        }
    }
}

@Composable
fun DashboardHeader(totalEarnings: Double) {
    Card(
        modifier = Modifier.fillMaxWidth(),
        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.primaryContainer)
    ) {
        Column(
            modifier = Modifier.padding(16.dp),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            Icon(
                Icons.Default.MonetizationOn,
                contentDescription = null,
                modifier = Modifier.size(48.dp),
                tint = MaterialTheme.colorScheme.primary
            )
            
            Spacer(modifier = Modifier.height(8.dp))
            
            Text(
                text = "Farm Revenue Dashboard",
                style = MaterialTheme.typography.headlineMedium,
                fontWeight = FontWeight.Bold
            )
            
            Text(
                text = "Total Earnings: $${String.format("%.2f", totalEarnings)}",
                style = MaterialTheme.typography.titleLarge,
                fontWeight = FontWeight.Bold,
                color = MaterialTheme.colorScheme.primary
            )
            
            Text(
                text = "Multiple revenue streams for your farm",
                style = MaterialTheme.typography.bodyMedium,
                color = MaterialTheme.colorScheme.onSurfaceVariant
            )
        }
    }
}

@Composable
fun RevenueOverviewCard(
    totalEarnings: Double,
    sponsorshipCount: Int,
    productCount: Int
) {
    Card(
        modifier = Modifier.fillMaxWidth()
    ) {
        Column(
            modifier = Modifier.padding(16.dp)
        ) {
            Text(
                text = "Revenue Overview",
                style = MaterialTheme.typography.titleMedium,
                fontWeight = FontWeight.Bold
            )
            
            Spacer(modifier = Modifier.height(16.dp))
            
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceEvenly
            ) {
                RevenueMetric(
                    icon = Icons.Default.AccountBalance,
                    label = "Sponsorships",
                    value = sponsorshipCount.toString(),
                    color = MaterialTheme.colorScheme.primary
                )
                
                RevenueMetric(
                    icon = Icons.Default.ShoppingCart,
                    label = "Products",
                    value = productCount.toString(),
                    color = MaterialTheme.colorScheme.secondary
                )
                
                RevenueMetric(
                    icon = Icons.Default.AttachMoney,
                    label = "Earnings",
                    value = "$${String.format("%.2f", totalEarnings)}",
                    color = MaterialTheme.colorScheme.tertiary
                )
            }
        }
    }
}

@Composable
fun RevenueMetric(
    icon: androidx.compose.ui.graphics.vector.ImageVector,
    label: String,
    value: String,
    color: Color
) {
    Column(
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Icon(
            icon,
            contentDescription = null,
            modifier = Modifier.size(32.dp),
            tint = color
        )
        
        Spacer(modifier = Modifier.height(4.dp))
        
        Text(
            text = value,
            style = MaterialTheme.typography.titleMedium,
            fontWeight = FontWeight.Bold,
            color = color
        )
        
        Text(
            text = label,
            style = MaterialTheme.typography.bodySmall,
            color = MaterialTheme.colorScheme.onSurfaceVariant
        )
    }
}

@Composable
fun QuickActionsCard() {
    Card(
        modifier = Modifier.fillMaxWidth()
    ) {
        Column(
            modifier = Modifier.padding(16.dp)
        ) {
            Text(
                text = "Quick Actions",
                style = MaterialTheme.typography.titleMedium,
                fontWeight = FontWeight.Bold
            )
            
            Spacer(modifier = Modifier.height(16.dp))
            
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceEvenly
            ) {
                QuickActionButton(
                    icon = Icons.Default.Search,
                    label = "Find Sponsorships",
                    onClick = { /* Navigate to sponsorships */ }
                )
                
                QuickActionButton(
                    icon = Icons.Default.ShoppingCart,
                    label = "Browse Products",
                    onClick = { /* Navigate to marketplace */ }
                )
                
                QuickActionButton(
                    icon = Icons.Default.AccountBalance,
                    label = "View Earnings",
                    onClick = { /* Navigate to earnings */ }
                )
            }
        }
    }
}

@Composable
private fun QuickActionButton(
    icon: androidx.compose.ui.graphics.vector.ImageVector,
    label: String,
    onClick: () -> Unit
) {
    Column(
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        FilledTonalButton(
            onClick = onClick,
            modifier = Modifier.size(80.dp),
            shape = RoundedCornerShape(12.dp)
        ) {
            Icon(
                icon,
                contentDescription = null,
                modifier = Modifier.size(24.dp)
            )
        }
        
        Spacer(modifier = Modifier.height(4.dp))
        
        Text(
            text = label,
            style = MaterialTheme.typography.bodySmall,
            textAlign = androidx.compose.ui.text.style.TextAlign.Center
        )
    }
}

@Composable
fun MonetizationTabs(
    currentTab: String,
    onTabChange: (String) -> Unit
) {
    val tabs = listOf("Dashboard", "Sponsorships", "Marketplace", "Earnings")
    
    TabRow(
        selectedTabIndex = tabs.indexOf(currentTab),
        modifier = Modifier.fillMaxWidth()
    ) {
        tabs.forEachIndexed { index, tab ->
            Tab(
                selected = currentTab == tab,
                onClick = { onTabChange(tab) },
                text = { Text(tab) },
                icon = {
                    when (tab) {
                        "Dashboard" -> Icon(Icons.Default.Dashboard, contentDescription = null)
                        "Sponsorships" -> Icon(Icons.Default.AccountBalance, contentDescription = null)
                        "Marketplace" -> Icon(Icons.Default.ShoppingCart, contentDescription = null)
                        "Earnings" -> Icon(Icons.Default.AttachMoney, contentDescription = null)
                    }
                }
            )
        }
    }
}

@Composable
fun MonetizationMainScreen() {
    var currentTab by remember { mutableStateOf("Dashboard") }
    
    Column {
        MonetizationTabs(
            currentTab = currentTab,
            onTabChange = { currentTab = it }
        )
        
        when (currentTab) {
            "Dashboard" -> MonetizationDashboard()
            "Sponsorships" -> SponsorshipScreen()
            "Marketplace" -> AffiliateMarketplaceScreen()
            "Earnings" -> EarningsScreen()
        }
    }
}

@Composable
fun AdBanner(
    adCampaign: AdCampaign?,
    onAdClick: () -> Unit
) {
    adCampaign?.let { campaign ->
        Card(
            modifier = Modifier.fillMaxWidth(),
            colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.secondaryContainer)
        ) {
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(16.dp),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Column(
                    modifier = Modifier.weight(1f)
                ) {
                    Text(
                        text = campaign.campaignName,
                        style = MaterialTheme.typography.titleMedium,
                        fontWeight = FontWeight.Bold
                    )
                    Text(
                        text = campaign.advertiserName,
                        style = MaterialTheme.typography.bodySmall,
                        color = MaterialTheme.colorScheme.onSurfaceVariant
                    )
                }
                
                Button(
                    onClick = onAdClick,
                    colors = ButtonDefaults.buttonColors(
                        containerColor = MaterialTheme.colorScheme.primary
                    )
                ) {
                    Text("Learn More")
                }
            }
        }
    }
}

@Composable
fun SubscriptionPromoCard(
    currentSubscription: UserSubscription?,
    onUpgrade: () -> Unit
) {
    if (currentSubscription?.subscriptionType == SubscriptionType.FREE) {
        Card(
            modifier = Modifier.fillMaxWidth(),
            colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.tertiaryContainer)
        ) {
            Column(
                modifier = Modifier.padding(16.dp)
            ) {
                Row(
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Icon(
                        Icons.Default.Star,
                        contentDescription = null,
                        tint = MaterialTheme.colorScheme.primary,
                        modifier = Modifier.size(24.dp)
                    )
                    
                    Spacer(modifier = Modifier.width(8.dp))
                    
                    Text(
                        text = "Upgrade to Premium",
                        style = MaterialTheme.typography.titleMedium,
                        fontWeight = FontWeight.Bold
                    )
                }
                
                Spacer(modifier = Modifier.height(8.dp))
                
                Text(
                    text = "Unlock unlimited weather data, advanced analytics, and priority support",
                    style = MaterialTheme.typography.bodyMedium
                )
                
                Spacer(modifier = Modifier.height(8.dp))
                
                // Yearly incentive banner
                Card(
                    modifier = Modifier.fillMaxWidth(),
                    colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.secondaryContainer),
                    border = BorderStroke(1.dp, MaterialTheme.colorScheme.secondary)
                ) {
                    Row(
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(8.dp),
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Icon(
                            Icons.Default.LocalOffer,
                            contentDescription = null,
                            tint = MaterialTheme.colorScheme.secondary,
                            modifier = Modifier.size(16.dp)
                        )
                        
                        Spacer(modifier = Modifier.width(6.dp))
                        
                        Text(
                            text = "Save 17% with yearly billing - Get 2 months free!",
                            style = MaterialTheme.typography.bodySmall,
                            fontWeight = FontWeight.Bold,
                            color = MaterialTheme.colorScheme.onSecondaryContainer
                        )
                    }
                }
                
                Spacer(modifier = Modifier.height(12.dp))
                
                Button(
                    onClick = onUpgrade,
                    modifier = Modifier.fillMaxWidth(),
                    colors = ButtonDefaults.buttonColors(
                        containerColor = MaterialTheme.colorScheme.primary
                    )
                ) {
                    Text("Upgrade Now")
                }
            }
        }
    }
} 