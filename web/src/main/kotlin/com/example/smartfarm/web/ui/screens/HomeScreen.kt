package com.example.smartfarm.web.ui.screens

import androidx.compose.runtime.*
import androidx.compose.web.elements.*
import androidx.compose.web.css.*
import com.example.smartfarm.web.ui.theme.AppTheme

@Composable
fun HomeScreen(onNavigate: (String) -> Unit) {
    Div({
        style {
            maxWidth(1200.px)
            margin(0.px, LinearDimension.auto)
        }
    }) {
        // Header
        H1({
            style {
                color(AppTheme.textColor)
                fontSize(32.px)
                marginBottom(AppTheme.spacing.large)
                textAlign("center")
                fontWeight("bold")
            }
        }) {
            Text("Welcome to SmartFarm")
        }

        // Quick Navigation Grid
        Div({
            style {
                display(DisplayStyle.Grid)
                gridTemplateColumns("repeat(auto-fit, minmax(200px, 1fr))")
                gap(AppTheme.spacing.large)
                marginBottom(AppTheme.spacing.xlarge)
            }
        }) {
            QuickNavCard("Livestock", "🐄", "Manage your animals", "livestock", onNavigate)
            QuickNavCard("Crops", "🌱", "Track your crops", "crops", onNavigate)
            QuickNavCard("Financial", "💰", "Track income & expenses", "financial", onNavigate)
            QuickNavCard("Tasks", "📋", "Manage farm tasks", "tasks", onNavigate)
            QuickNavCard("Inventory", "📦", "Manage supplies & equipment", "inventory", onNavigate)
            QuickNavCard("Employees", "👥", "Manage farm workers", "employees", onNavigate)
            QuickNavCard("Market Prices", "📈", "Track market trends", "market-prices", onNavigate)
            QuickNavCard("Weather", "🌤️", "View forecasts", "weather", onNavigate)
            QuickNavCard("Expert Chat", "🤖", "AI farming advice", "expert-chat", onNavigate)
            QuickNavCard("Analytics", "📊", "Performance insights", "analytics", onNavigate)
            QuickNavCard("Reports", "📋", "Farm analytics", "reports", onNavigate)
            QuickNavCard("Settings", "⚙️", "App preferences", "settings", onNavigate)
        }

        // Placeholder for stats and recent activity
        H2({ style { marginTop(AppTheme.spacing.xlarge) } }) { Text("Quick Stats (Coming Soon)") }
        H2({ style { marginTop(AppTheme.spacing.large) } }) { Text("Recent Activity (Coming Soon)") }
    }
}

@Composable
private fun QuickNavCard(
    title: String,
    icon: String,
    description: String,
    route: String,
    onNavigate: (String) -> Unit
) {
    Button({
        onClick { onNavigate(route) }
        style {
            backgroundColor(AppTheme.surfaceColor)
            border(1.px, LineStyle.Solid, AppTheme.backgroundColor)
            padding(AppTheme.spacing.large)
            borderRadius(AppTheme.borderRadius)
            cursor("pointer")
            textAlign("center")
            width(100.percent)
            transition("all 0.2s ease")
            hover {
                backgroundColor(AppTheme.backgroundColor)
                borderColor(AppTheme.primaryColor)
                transform("translateY(-1px)")
            }
        }
    }) {
        Div({ style { fontSize(32.px); marginBottom(AppTheme.spacing.small) } }) { Text(icon) }
        Div({ style { fontWeight("bold"); color(AppTheme.textColor); marginBottom(AppTheme.spacing.small) } }) { Text(title) }
        Div({ style { fontSize(12.px); color(AppTheme.textSecondaryColor); lineHeight(1.4) } }) { Text(description) }
    }
} 