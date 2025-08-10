package com.example.smartfarm.web.ui.screens

import androidx.compose.runtime.*
import androidx.compose.web.elements.*
import androidx.compose.web.css.*
import com.example.smartfarm.web.ui.theme.AppTheme

@Composable
fun ReportsScreen() {
    var selectedReportType by remember { mutableStateOf("livestock") }
    var dateRange by remember { mutableStateOf("month") }
    var reports by remember { mutableStateOf(sampleReports) }

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
            Text("📊 Reports & Analytics")
        }

        // Report Types Grid
        Div({
            style {
                display(DisplayStyle.Grid)
                gridTemplateColumns("repeat(auto-fit, minmax(300px, 1fr))")
                gap(AppTheme.spacing.large)
                marginBottom(AppTheme.spacing.xlarge)
            }
        }) {
            ReportCard("Livestock Report", "🐄", "Animal health, breeding, and production data", "livestock", selectedReportType) { selectedReportType = it }
            ReportCard("Crop Report", "🌱", "Crop yields, growth progress, and field analysis", "crops", selectedReportType) { selectedReportType = it }
            ReportCard("Financial Report", "💰", "Revenue, expenses, and profitability analysis", "financial", selectedReportType) { selectedReportType = it }
            ReportCard("Weather Report", "🌤️", "Weather patterns and impact on farming", "weather", selectedReportType) { selectedReportType = it }
            ReportCard("Activity Report", "📋", "Daily activities and task completion", "activities", selectedReportType) { selectedReportType = it }
            ReportCard("Performance Report", "📈", "Overall farm performance metrics", "performance", selectedReportType) { selectedReportType = it }
        }

        // Report Generation Controls
        Div({
            style {
                backgroundColor(AppTheme.surfaceColor)
                padding(AppTheme.spacing.large)
                borderRadius(AppTheme.borderRadius)
                boxShadow(AppTheme.shadow)
                marginBottom(AppTheme.spacing.xlarge)
            }
        }) {
            H2({
                style {
                    color(AppTheme.textColor)
                    fontSize(20.px)
                    marginBottom(AppTheme.spacing.medium)
                    fontWeight("bold")
                }
            }) {
                Text("Generate Report")
            }

            Div({
                style {
                    display(DisplayStyle.Flex)
                    gap(AppTheme.spacing.large)
                    alignItems(Align.End)
                    flexWrap("wrap")
                }
            }) {
                Div({
                    style {
                        flex(1)
                        minWidth(200.px)
                    }
                }) {
                    Label({ style { display(DisplayStyle.Block); marginBottom(AppTheme.spacing.small) } }) {
                        Text("Report Type")
                    }
                    Select({
                        value = selectedReportType
                        onChange { selectedReportType = it.value }
                        style {
                            width(100.percent)
                            padding(AppTheme.spacing.small)
                            border(1.px, LineStyle.Solid, AppTheme.backgroundColor)
                            borderRadius(AppTheme.borderRadius)
                        }
                    }) {
                        Option { Text("Livestock Report") }
                        Option { Text("Crop Report") }
                        Option { Text("Financial Report") }
                        Option { Text("Weather Report") }
                        Option { Text("Activity Report") }
                        Option { Text("Performance Report") }
                    }
                }

                Div({
                    style {
                        flex(1)
                        minWidth(200.px)
                    }
                }) {
                    Label({ style { display(DisplayStyle.Block); marginBottom(AppTheme.spacing.small) } }) {
                        Text("Date Range")
                    }
                    Select({
                        value = dateRange
                        onChange { dateRange = it.value }
                        style {
                            width(100.percent)
                            padding(AppTheme.spacing.small)
                            border(1.px, LineStyle.Solid, AppTheme.backgroundColor)
                            borderRadius(AppTheme.borderRadius)
                        }
                    }) {
                        Option { Text("Last Week") }
                        Option { Text("Last Month") }
                        Option { Text("Last Quarter") }
                        Option { Text("Last Year") }
                        Option { Text("Custom Range") }
                    }
                }

                Button({
                    onClick = {
                        val newReport = Report(
                            id = (reports.maxOfOrNull { it.id } ?: 0) + 1,
                            name = "${getReportTypeName(selectedReportType)} - ${getDateRangeName(dateRange)}",
                            type = selectedReportType,
                            format = "PDF",
                            generated = "Just now",
                            size = "1.2 MB"
                        )
                        reports = listOf(newReport) + reports
                    }
                    style {
                        backgroundColor(AppTheme.primaryColor)
                        color(Color.white)
                        border(0.px)
                        padding(AppTheme.spacing.medium, AppTheme.spacing.large)
                        borderRadius(AppTheme.borderRadius)
                        cursor("pointer")
                        fontSize(16.px)
                        fontWeight("bold")
                    }
                }) {
                    Text("Generate Report")
                }
            }
        }

        // Recent Reports
        H2({
            style {
                color(AppTheme.textColor)
                fontSize(24.px)
                marginBottom(AppTheme.spacing.medium)
                fontWeight("bold")
            }
        }) {
            Text("Recent Reports")
        }

        RecentReportsList(reports)
    }
}

@Composable
private fun ReportCard(
    title: String,
    icon: String,
    description: String,
    type: String,
    selectedType: String,
    onSelect: (String) -> Unit
) {
    val isSelected = selectedType == type
    Button({
        onClick { onSelect(type) }
        style {
            backgroundColor(if (isSelected) AppTheme.primaryColor else AppTheme.surfaceColor)
            color(if (isSelected) Color.white else AppTheme.textColor)
            border(1.px, LineStyle.Solid, if (isSelected) AppTheme.primaryColor else AppTheme.backgroundColor)
            padding(AppTheme.spacing.large)
            borderRadius(AppTheme.borderRadius)
            cursor("pointer")
            textAlign("left")
            width(100.percent)
            transition("all 0.2s ease")
            
            hover {
                backgroundColor(if (isSelected) AppTheme.primaryColor else AppTheme.backgroundColor)
                borderColor(AppTheme.primaryColor)
                transform("translateY(-1px)")
            }
        }
    }) {
        Div({
            style {
                display(DisplayStyle.Flex)
                flexDirection(FlexDirection.Column)
                alignItems(Align.Start)
            }
        }) {
            Div({
                style {
                    fontSize(32.px)
                    marginBottom(AppTheme.spacing.medium)
                }
            }) {
                Text(icon)
            }
            
            H3({
                style {
                    fontSize(18.px)
                    fontWeight("bold")
                    margin(0.px, 0.px, AppTheme.spacing.small, 0.px)
                }
            }) {
                Text(title)
            }
            
            Div({
                style {
                    color(if (isSelected) Color.white else AppTheme.textSecondaryColor)
                    fontSize(14.px)
                    lineHeight(1.4)
                    marginBottom(AppTheme.spacing.medium)
                }
            }) {
                Text(description)
            }
            
            Div({
                style {
                    display(DisplayStyle.Flex)
                    gap(AppTheme.spacing.small)
                }
            }) {
                Button({
                    style {
                        backgroundColor(if (isSelected) Color.white else AppTheme.primaryColor)
                        color(if (isSelected) AppTheme.primaryColor else Color.white)
                        border(0.px)
                        padding(AppTheme.spacing.small, AppTheme.spacing.medium)
                        borderRadius(AppTheme.borderRadius)
                        cursor("pointer")
                        fontSize(14.px)
                    }
                }) {
                    Text("Generate")
                }
                
                Button({
                    style {
                        backgroundColor(Color.transparent)
                        color(if (isSelected) Color.white else AppTheme.primaryColor)
                        border(1.px, LineStyle.Solid, if (isSelected) Color.white else AppTheme.primaryColor)
                        padding(AppTheme.spacing.small, AppTheme.spacing.medium)
                        borderRadius(AppTheme.borderRadius)
                        cursor("pointer")
                        fontSize(14.px)
                    }
                }) {
                    Text("Export")
                }
            }
        }
    }
}

@Composable
private fun RecentReportsList(reports: List<Report>) {
    Div({
        style {
            backgroundColor(AppTheme.surfaceColor)
            borderRadius(AppTheme.borderRadius)
            boxShadow(AppTheme.shadow)
            overflow("hidden")
        }
    }) {
        // Header
        Div({
            style {
                padding(AppTheme.spacing.medium)
                backgroundColor(AppTheme.backgroundColor)
                borderBottom(1.px, LineStyle.Solid, AppTheme.backgroundColor)
                display(DisplayStyle.Grid)
                gridTemplateColumns("2fr 1fr 1fr 1fr 1fr")
                gap(AppTheme.spacing.medium)
                fontWeight("bold")
                color(AppTheme.textSecondaryColor)
                fontSize(14.px)
            }
        }) {
            Text("Report Name")
            Text("Format")
            Text("Generated")
            Text("Size")
            Text("Actions")
        }
        
        // Report rows
        reports.forEach { report ->
            ReportRow(report)
        }
    }
}

@Composable
private fun ReportRow(report: Report) {
    Div({
        style {
            padding(AppTheme.spacing.medium)
            borderBottom(1.px, LineStyle.Solid, AppTheme.backgroundColor)
            display(DisplayStyle.Grid)
            gridTemplateColumns("2fr 1fr 1fr 1fr 1fr")
            gap(AppTheme.spacing.medium)
            alignItems(Align.Center)
            
            lastChild {
                borderBottom(0.px, LineStyle.Solid, Color.transparent)
            }
            
            hover {
                backgroundColor(AppTheme.backgroundColor)
            }
        }
    }) {
        Div({
            style {
                fontWeight("bold")
                color(AppTheme.textColor)
            }
        }) {
            Text(report.name)
        }
        
        Div({
            style {
                backgroundColor(AppTheme.primaryColor)
                color(Color.white)
                padding(2.px, 8.px)
                borderRadius(4.px)
                fontSize(12.px)
                textAlign("center")
                width("fit-content")
            }
        }) {
            Text(report.format)
        }
        
        Div({
            style {
                color(AppTheme.textSecondaryColor)
                fontSize(14.px)
            }
        }) {
            Text(report.generated)
        }
        
        Div({
            style {
                color(AppTheme.textSecondaryColor)
                fontSize(14.px)
            }
        }) {
            Text(report.size)
        }
        
        Div({
            style {
                display(DisplayStyle.Flex)
                gap(AppTheme.spacing.small)
            }
        }) {
            Button({
                style {
                    backgroundColor(AppTheme.secondaryColor)
                    color(Color.white)
                    border(0.px)
                    padding(4.px, 8.px)
                    borderRadius(4.px)
                    cursor("pointer")
                    fontSize(12.px)
                }
            }) {
                Text("Download")
            }
            
            Button({
                style {
                    backgroundColor(AppTheme.primaryColor)
                    color(Color.white)
                    border(0.px)
                    padding(4.px, 8.px)
                    borderRadius(4.px)
                    cursor("pointer")
                    fontSize(12.px)
                }
            }) {
                Text("Share")
            }
        }
    }
}

data class Report(
    val id: Int,
    val name: String,
    val type: String,
    val format: String,
    val generated: String,
    val size: String
)

private val sampleReports = listOf(
    Report(1, "Livestock Health Report - Last Month", "livestock", "PDF", "2 hours ago", "1.2 MB"),
    Report(2, "Monthly Crop Analysis - Last Month", "crops", "Excel", "1 day ago", "856 KB"),
    Report(3, "Financial Summary Q1 - Last Quarter", "financial", "PDF", "3 days ago", "2.1 MB"),
    Report(4, "Weather Impact Report - Last Month", "weather", "PDF", "1 week ago", "1.5 MB"),
    Report(5, "Activity Log March - Last Month", "activities", "CSV", "2 weeks ago", "324 KB")
)

private fun getReportTypeName(type: String): String {
    return when (type) {
        "livestock" -> "Livestock Report"
        "crops" -> "Crop Report"
        "financial" -> "Financial Report"
        "weather" -> "Weather Report"
        "activities" -> "Activity Report"
        "performance" -> "Performance Report"
        else -> "Report"
    }
}

private fun getDateRangeName(range: String): String {
    return when (range) {
        "week" -> "Last Week"
        "month" -> "Last Month"
        "quarter" -> "Last Quarter"
        "year" -> "Last Year"
        "custom" -> "Custom Range"
        else -> "Last Month"
    }
} 