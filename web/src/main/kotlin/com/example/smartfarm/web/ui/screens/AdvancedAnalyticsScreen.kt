package com.example.smartfarm.web.ui.screens

import androidx.compose.runtime.*
import androidx.compose.web.css.*
import androidx.compose.web.dom.*
import com.example.smartfarm.web.ui.components.*

@Composable
fun AdvancedAnalyticsScreen() {
    var selectedTimeRange by remember { mutableStateOf("30d") }
    var selectedMetric by remember { mutableStateOf("yield") }
    var showPredictions by remember { mutableStateOf(true) }
    
    Div({
        style {
            padding(24.px)
        }
    }) {
        // Header
        Div({
            style {
                display(DisplayStyle.Flex)
                justifyContent(JustifyContent.SpaceBetween)
                alignItems(Align.Center)
                marginBottom(32.px)
            }
        }) {
            H1({
                style {
                    fontSize(32.px)
                    fontWeight(700)
                    color(Color("#2C3E50"))
                    margin(0.px)
                }
            }) {
                Text("Advanced Analytics")
            }
            
            Div({
                style {
                    display(DisplayStyle.Flex)
                    gap(12.px)
                }
            }) {
                Button({
                    style {
                        padding(8.px, 16.px)
                        border(1.px, LineStyle.Solid, Color("#E0E0E0"))
                        borderRadius(6.px)
                        backgroundColor(if (showPredictions) Color("#4CAF50") else Color.white)
                        color(if (showPredictions) Color.white else Color("#757575"))
                        fontSize(14.px)
                        cursor("pointer")
                    }
                    onClick { showPredictions = !showPredictions }
                }) {
                    Text("🤖 AI Predictions")
                }
            }
        }
        
        // Filters
        Div({
            style {
                display(DisplayStyle.Flex)
                gap(16.px)
                marginBottom(24.px)
                flexWrap(FlexWrap.Wrap)
            }
        }) {
            // Time Range Selector
            Select({
                style {
                    padding(12.px, 16.px)
                    border(1.px, LineStyle.Solid, Color("#E0E0E0"))
                    borderRadius(8.px)
                    fontSize(16.px)
                    backgroundColor(Color.white)
                }
                value(selectedTimeRange)
                onChange { selectedTimeRange = it.value }
            }) {
                Option { attrs { value("7d") }; Text("Last 7 Days") }
                Option { attrs { value("30d") }; Text("Last 30 Days") }
                Option { attrs { value("90d") }; Text("Last 90 Days") }
                Option { attrs { value("1y") }; Text("Last Year") }
                Option { attrs { value("all") }; Text("All Time") }
            }
            
            // Metric Selector
            Select({
                style {
                    padding(12.px, 16.px)
                    border(1.px, LineStyle.Solid, Color("#E0E0E0"))
                    borderRadius(8.px)
                    fontSize(16.px)
                    backgroundColor(Color.white)
                }
                value(selectedMetric)
                onChange { selectedMetric = it.value }
            }) {
                Option { attrs { value("yield") }; Text("Crop Yield") }
                Option { attrs { value("revenue") }; Text("Revenue") }
                Option { attrs { value("costs") }; Text("Costs") }
                Option { attrs { value("profit") }; Text("Profit") }
                Option { attrs { value("efficiency") }; Text("Efficiency") }
            }
        }
        
        // Analytics Grid
        Div({
            style {
                display(DisplayStyle.Grid)
                gridTemplateColumns("repeat(auto-fit, minmax(400px, 1fr))")
                gap(24.px)
            }
        }) {
            // Yield Prediction Chart
            AnalyticsCard(
                title = "Crop Yield Prediction",
                subtitle = "AI-powered yield forecasting",
                content = {
                    YieldChart()
                }
            )
            
            // Revenue Analysis
            AnalyticsCard(
                title = "Revenue Analysis",
                subtitle = "Income trends and projections",
                content = {
                    RevenueChart()
                }
            )
            
            // Cost Optimization
            AnalyticsCard(
                title = "Cost Optimization",
                subtitle = "Expense analysis and recommendations",
                content = {
                    CostAnalysisChart()
                }
            )
            
            // Weather Impact
            AnalyticsCard(
                title = "Weather Impact Analysis",
                subtitle = "Climate effects on farm performance",
                content = {
                    WeatherImpactChart()
                }
            )
        }
        
        // AI Insights Section
        if (showPredictions) {
            Div({
                style {
                    marginTop(32.px)
                    padding(24.px)
                    backgroundColor(Color("#F8F9FA"))
                    borderRadius(12.px)
                    border(1.px, LineStyle.Solid, Color("#E9ECEF"))
                }
            }) {
                H2({
                    style {
                        fontSize(24.px)
                        fontWeight(600)
                        color(Color("#2C3E50"))
                        marginBottom(16.px)
                    }
                }) {
                    Text("🤖 AI Insights & Recommendations")
                }
                
                Div({
                    style {
                        display(DisplayStyle.Grid)
                        gridTemplateColumns("repeat(auto-fit, minmax(300px, 1fr))")
                        gap(16.px)
                    }
                }) {
                    InsightCard(
                        title = "Yield Prediction",
                        description = "Based on current weather patterns and historical data, expect 15% increase in corn yield this season.",
                        type = "positive"
                    )
                    InsightCard(
                        title = "Cost Alert",
                        description = "Fertilizer prices are expected to rise by 8% next month. Consider bulk purchase now.",
                        type = "warning"
                    )
                    InsightCard(
                        title = "Market Opportunity",
                        description = "Wheat prices are projected to increase by 12% in Q3. Plan harvest timing accordingly.",
                        type = "opportunity"
                    )
                }
            }
        }
    }
}

@Composable
private fun AnalyticsCard(
    title: String,
    subtitle: String,
    content: @Composable () -> Unit
) {
    Div({
        style {
            backgroundColor(Color.white)
            borderRadius(12.px)
            padding(24.px)
            border(1.px, LineStyle.Solid, Color("#E9ECEF"))
            boxShadow(0.px, 4.px, 6.px, Color(0, 0, 0, 0.1))
        }
    }) {
        H3({
            style {
                fontSize(20.px)
                fontWeight(600)
                color(Color("#2C3E50"))
                marginBottom(4.px)
            }
        }) {
            Text(title)
        }
        
        P({
            style {
                fontSize(14.px)
                color(Color("#6C757D"))
                marginBottom(16.px)
            }
        }) {
            Text(subtitle)
        }
        
        content()
    }
}

@Composable
private fun InsightCard(
    title: String,
    description: String,
    type: String
) {
    val backgroundColor = when (type) {
        "positive" -> Color("#D4EDDA")
        "warning" -> Color("#FFF3CD")
        "opportunity" -> Color("#CCE5FF")
        else -> Color("#F8F9FA")
    }
    
    val borderColor = when (type) {
        "positive" -> Color("#C3E6CB")
        "warning" -> Color("#FFEAA7")
        "opportunity" -> Color("#B3D9FF")
        else -> Color("#E9ECEF")
    }
    
    Div({
        style {
            backgroundColor(backgroundColor)
            border(1.px, LineStyle.Solid, borderColor)
            borderRadius(8.px)
            padding(16.px)
        }
    }) {
        H4({
            style {
                fontSize(16.px)
                fontWeight(600)
                color(Color("#2C3E50"))
                marginBottom(8.px)
            }
        }) {
            Text(title)
        }
        
        P({
            style {
                fontSize(14.px)
                color(Color("#495057"))
                margin(0.px)
                lineHeight(1.5)
            }
        }) {
            Text(description)
        }
    }
} 