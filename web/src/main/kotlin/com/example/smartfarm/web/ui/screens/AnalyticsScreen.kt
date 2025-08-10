package com.example.smartfarm.web.ui.screens

import androidx.compose.runtime.*
import androidx.compose.web.elements.*
import androidx.compose.web.css.*
import com.example.smartfarm.web.ui.theme.AppTheme

@Composable
fun AnalyticsScreen() {
    var selectedPeriod by remember { mutableStateOf("month") }
    var selectedMetric by remember { mutableStateOf("overview") }

    Div({
        style {
            maxWidth(1200.px)
            margin(0.px, LinearDimension.auto)
            padding(AppTheme.spacing.large)
        }
    }) {
        // Header
        H1({
            style {
                color(AppTheme.textColor)
                fontSize(32.px)
                marginBottom(AppTheme.spacing.large)
                fontWeight("bold")
            }
        }) {
            Text("📈 Analytics Dashboard")
        }

        // Period Selector
        Div({
            style {
                display(DisplayStyle.Flex)
                gap(AppTheme.spacing.medium)
                marginBottom(AppTheme.spacing.large)
                flexWrap("wrap")
            }
        }) {
            PeriodButton("Week", "week", selectedPeriod) { selectedPeriod = it }
            PeriodButton("Month", "month", selectedPeriod) { selectedPeriod = it }
            PeriodButton("Quarter", "quarter", selectedPeriod) { selectedPeriod = it }
            PeriodButton("Year", "year", selectedPeriod) { selectedPeriod = it }
        }

        // Key Metrics
        Div({
            style {
                display(DisplayStyle.Grid)
                gridTemplateColumns("repeat(auto-fit, minmax(250px, 1fr))")
                gap(AppTheme.spacing.large)
                marginBottom(AppTheme.spacing.xlarge)
            }
        }) {
            MetricCard("Total Revenue", "$45,230", "+12.5%", "this $selectedPeriod", Color("#4CAF50"))
            MetricCard("Total Expenses", "$28,450", "-5.2%", "this $selectedPeriod", Color("#F44336"))
            MetricCard("Net Profit", "$16,780", "+18.7%", "this $selectedPeriod", Color("#2196F3"))
            MetricCard("Crop Yield", "2,450 kg", "+8.3%", "this $selectedPeriod", Color("#FF9800"))
        }

        // Main Content
        Div({
            style {
                display(DisplayStyle.Flex)
                gap(AppTheme.spacing.large)
            }
        }) {
            // Left Column - Charts
            Div({
                style {
                    flex(2)
                    display(DisplayStyle.Flex)
                    flexDirection(FlexDirection.Column)
                    gap(AppTheme.spacing.large)
                }
            }) {
                // Revenue vs Expenses Chart
                ChartCard(
                    title = "Revenue vs Expenses",
                    subtitle = "Monthly comparison",
                    content = RevenueExpensesChart()
                )

                // Crop Performance Chart
                ChartCard(
                    title = "Crop Performance",
                    subtitle = "Yield by crop type",
                    content = CropPerformanceChart()
                )
            }

            // Right Column - Insights & Details
            Div({
                style {
                    flex(1)
                    display(DisplayStyle.Flex)
                    flexDirection(FlexDirection.Column)
                    gap(AppTheme.spacing.large)
                }
            }) {
                // Performance Insights
                InsightsCard()

                // Top Performing Items
                TopPerformersCard()

                // Recent Activity
                RecentActivityCard()
            }
        }
    }
}

@Composable
private fun PeriodButton(text: String, period: String, selectedPeriod: String, onSelect: (String) -> Unit) {
    val isActive = selectedPeriod == period
    Button({
        onClick { onSelect(period) }
        style {
            backgroundColor(if (isActive) AppTheme.primaryColor else AppTheme.surfaceColor)
            color(if (isActive) Color.white else AppTheme.textColor)
            border(1.px, LineStyle.Solid, if (isActive) AppTheme.primaryColor else AppTheme.backgroundColor)
            padding(AppTheme.spacing.small, AppTheme.spacing.medium)
            borderRadius(AppTheme.borderRadius)
            cursor("pointer")
            fontSize(14.px)
            fontWeight(if (isActive) "bold" else "normal")
        }
    }) {
        Text(text)
    }
}

@Composable
private fun MetricCard(title: String, value: String, change: String, period: String, color: Color) {
    Div({
        style {
            backgroundColor(AppTheme.surfaceColor)
            padding(AppTheme.spacing.large)
            borderRadius(AppTheme.borderRadius)
            boxShadow(AppTheme.shadow)
        }
    }) {
        H3({
            style {
                color(AppTheme.textSecondaryColor)
                fontSize(14.px)
                margin(0.px, 0.px, AppTheme.spacing.small, 0.px)
                textTransform("uppercase")
                letterSpacing(1.px)
            }
        }) {
            Text(title)
        }
        
        Div({
            style {
                fontSize(28.px)
                fontWeight("bold")
                color(color)
                marginBottom(AppTheme.spacing.small)
            }
        }) {
            Text(value)
        }
        
        Div({
            style {
                display(DisplayStyle.Flex)
                alignItems(Align.Center)
                gap(AppTheme.spacing.small)
            }
        }) {
            Div({
                style {
                    color(if (change.startsWith("+")) Color("#4CAF50") else Color("#F44336"))
                    fontSize(14.px)
                    fontWeight("bold")
                }
            }) {
                Text(change)
            }
            Div({
                style {
                    color(AppTheme.textSecondaryColor)
                    fontSize(12.px)
                }
            }) {
                Text(period)
            }
        }
    }
}

@Composable
private fun ChartCard(title: String, subtitle: String, content: @Composable () -> Unit) {
    Div({
        style {
            backgroundColor(AppTheme.surfaceColor)
            padding(AppTheme.spacing.large)
            borderRadius(AppTheme.borderRadius)
            boxShadow(AppTheme.shadow)
        }
    }) {
        H3({
            style {
                color(AppTheme.textColor)
                fontSize(18.px)
                margin(0.px, 0.px, AppTheme.spacing.small, 0.px)
                fontWeight("bold")
            }
        }) {
            Text(title)
        }
        
        Div({
            style {
                color(AppTheme.textSecondaryColor)
                fontSize(14.px)
                marginBottom(AppTheme.spacing.large)
            }
        }) {
            Text(subtitle)
        }
        
        content()
    }
}

@Composable
private fun RevenueExpensesChart() {
    Div({
        style {
            height(200.px)
            display(DisplayStyle.Flex)
            alignItems(Align.End)
            gap(8.px)
            padding(AppTheme.spacing.medium, 0.px)
        }
    }) {
        // Revenue bars
        listOf(65, 78, 82, 75, 90, 85, 88).forEach { height ->
            Div({
                style {
                    flex(1)
                    height(height.percent)
                    backgroundColor(AppTheme.primaryColor)
                    borderRadius(4.px, 4.px, 0.px, 0.px)
                    position(Position.Relative)
                }
            }) {
                Div({
                    style {
                        position(Position.Absolute)
                        top((-20).px)
                        left(50.percent)
                        transform("translateX(-50%)")
                        backgroundColor(AppTheme.textColor)
                        color(Color.white)
                        padding(2.px, 6.px)
                        borderRadius(4.px)
                        fontSize(10.px)
                        whiteSpace("nowrap")
                    }
                }) {
                    Text("$${height * 100}")
                }
            }
        }
    }
    
    // X-axis labels
    Div({
        style {
            display(DisplayStyle.Flex)
            justifyContent(JustifyContent.SpaceBetween)
            marginTop(AppTheme.spacing.small)
            fontSize(12.px)
            color(AppTheme.textSecondaryColor)
        }
    }) {
        Text("Jan")
        Text("Feb")
        Text("Mar")
        Text("Apr")
        Text("May")
        Text("Jun")
        Text("Jul")
    }
}

@Composable
private fun CropPerformanceChart() {
    Div({
        style {
            height(200.px)
            display(DisplayStyle.Flex)
            alignItems(Align.End)
            gap(12.px)
            padding(AppTheme.spacing.medium, 0.px)
        }
    }) {
        listOf(
            Triple("Corn", 85, Color("#4CAF50")),
            Triple("Wheat", 72, Color("#FF9800")),
            Triple("Soybeans", 68, Color("#2196F3")),
            Triple("Rice", 78, Color("#9C27B0"))
        ).forEach { (crop, height, color) ->
            Div({
                style {
                    flex(1)
                    display(DisplayStyle.Flex)
                    flexDirection(FlexDirection.Column)
                    alignItems(Align.Center)
                }
            }) {
                Div({
                    style {
                        width(40.px)
                        height(height.percent)
                        backgroundColor(color)
                        borderRadius(4.px, 4.px, 0.px, 0.px)
                        marginBottom(AppTheme.spacing.small)
                    }
                })
                Div({
                    style {
                        fontSize(12.px)
                        color(AppTheme.textSecondaryColor)
                        textAlign("center")
                    }
                }) {
                    Text(crop)
                }
            }
        }
    }
}

@Composable
private fun InsightsCard() {
    Div({
        style {
            backgroundColor(AppTheme.surfaceColor)
            padding(AppTheme.spacing.large)
            borderRadius(AppTheme.borderRadius)
            boxShadow(AppTheme.shadow)
        }
    }) {
        H3({
            style {
                color(AppTheme.textColor)
                fontSize(18.px)
                marginBottom(AppTheme.spacing.medium)
                fontWeight("bold")
            }
        }) {
            Text("Performance Insights")
        }
        
        Div({
            style {
                display(DisplayStyle.Flex)
                flexDirection(FlexDirection.Column)
                gap(AppTheme.spacing.medium)
            }
        }) {
            InsightItem("📈", "Revenue increased by 12.5% this month", "positive")
            InsightItem("🌾", "Wheat yield exceeded expectations by 15%", "positive")
            InsightItem("💰", "Expenses reduced by 5.2% through optimization", "positive")
            InsightItem("⚠️", "Corn field needs attention - yield below target", "warning")
        }
    }
}

@Composable
private fun InsightItem(icon: String, text: String, type: String) {
    Div({
        style {
            display(DisplayStyle.Flex)
            alignItems(Align.Start)
            gap(AppTheme.spacing.small)
            padding(AppTheme.spacing.small)
            borderRadius(AppTheme.borderRadius)
            backgroundColor(when(type) {
                "positive" -> Color("#E8F5E8")
                "warning" -> Color("#FFF3E0")
                else -> AppTheme.backgroundColor
            })
        }
    }) {
        Div({ style { fontSize(16.px) } }) { Text(icon) }
        Div({
            style {
                fontSize(14.px)
                color(AppTheme.textColor)
                lineHeight(1.4)
            }
        }) {
            Text(text)
        }
    }
}

@Composable
private fun TopPerformersCard() {
    Div({
        style {
            backgroundColor(AppTheme.surfaceColor)
            padding(AppTheme.spacing.large)
            borderRadius(AppTheme.borderRadius)
            boxShadow(AppTheme.shadow)
        }
    }) {
        H3({
            style {
                color(AppTheme.textColor)
                fontSize(18.px)
                marginBottom(AppTheme.spacing.medium)
                fontWeight("bold")
            }
        }) {
            Text("Top Performers")
        }
        
        Div({
            style {
                display(DisplayStyle.Flex)
                flexDirection(FlexDirection.Column)
                gap(AppTheme.spacing.small)
            }
        }) {
            TopPerformerItem("Corn Field A", "95% yield", "1st")
            TopPerformerItem("Wheat Field B", "88% yield", "2nd")
            TopPerformerItem("Soybean Field C", "82% yield", "3rd")
            TopPerformerItem("Rice Field D", "78% yield", "4th")
        }
    }
}

@Composable
private fun TopPerformerItem(name: String, performance: String, rank: String) {
    Div({
        style {
            display(DisplayStyle.Flex)
            justifyContent(JustifyContent.SpaceBetween)
            alignItems(Align.Center)
            padding(AppTheme.spacing.small, AppTheme.spacing.medium)
            borderRadius(AppTheme.borderRadius)
            backgroundColor(AppTheme.backgroundColor)
        }
    }) {
        Div({
            style {
                display(DisplayStyle.Flex)
                alignItems(Align.Center)
                gap(AppTheme.spacing.small)
            }
        }) {
            Div({
                style {
                    backgroundColor(AppTheme.primaryColor)
                    color(Color.white)
                    width(24.px)
                    height(24.px)
                    borderRadius(50.percent)
                    display(DisplayStyle.Flex)
                    alignItems(Align.Center)
                    justifyContent(JustifyContent.Center)
                    fontSize(12.px)
                    fontWeight("bold")
                }
            }) {
                Text(rank)
            }
            Div({
                style {
                    fontSize(14.px)
                    color(AppTheme.textColor)
                    fontWeight("bold")
                }
            }) {
                Text(name)
            }
        }
        Div({
            style {
                fontSize(14.px)
                color(AppTheme.primaryColor)
                fontWeight("bold")
            }
        }) {
            Text(performance)
        }
    }
}

@Composable
private fun RecentActivityCard() {
    Div({
        style {
            backgroundColor(AppTheme.surfaceColor)
            padding(AppTheme.spacing.large)
            borderRadius(AppTheme.borderRadius)
            boxShadow(AppTheme.shadow)
        }
    }) {
        H3({
            style {
                color(AppTheme.textColor)
                fontSize(18.px)
                marginBottom(AppTheme.spacing.medium)
                fontWeight("bold")
            }
        }) {
            Text("Recent Activity")
        }
        
        Div({
            style {
                display(DisplayStyle.Flex)
                flexDirection(FlexDirection.Column)
                gap(AppTheme.spacing.small)
            }
        }) {
            ActivityItem("Harvest completed", "2 hours ago", "🌾")
            ActivityItem("New livestock added", "4 hours ago", "🐄")
            ActivityItem("Equipment maintenance", "1 day ago", "🔧")
            ActivityItem("Weather alert", "2 days ago", "🌤️")
            ActivityItem("Financial report generated", "3 days ago", "📊")
        }
    }
}

@Composable
private fun ActivityItem(description: String, time: String, icon: String) {
    Div({
        style {
            display(DisplayStyle.Flex)
            alignItems(Align.Center)
            gap(AppTheme.spacing.small)
            padding(AppTheme.spacing.small, 0.px)
            borderBottom(1.px, LineStyle.Solid, AppTheme.backgroundColor)
            
            lastChild {
                borderBottom(0.px, LineStyle.Solid, Color.transparent)
            }
        }
    }) {
        Div({ style { fontSize(16.px) } }) { Text(icon) }
        Div({
            style {
                flex(1)
                fontSize(14.px)
                color(AppTheme.textColor)
            }
        }) {
            Text(description)
        }
        Div({
            style {
                fontSize(12.px)
                color(AppTheme.textSecondaryColor)
            }
        }) {
            Text(time)
        }
    }
} 