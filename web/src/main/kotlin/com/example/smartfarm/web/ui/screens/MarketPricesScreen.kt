package com.example.smartfarm.web.ui.screens

import androidx.compose.runtime.*
import androidx.compose.web.css.*
import androidx.compose.web.dom.*
import com.example.smartfarm.web.ui.components.*

@Composable
fun MarketPricesScreen() {
    var selectedCategory by remember { mutableStateOf("crops") }
    var selectedTimeframe by remember { mutableStateOf("1m") }
    var searchQuery by remember { mutableStateOf("") }
    
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
                Text("Market Price Tracking")
            }
            
            Button({
                style {
                    backgroundColor(Color("#4CAF50"))
                    color(Color.white)
                    border(none)
                    padding(12.px, 24.px)
                    borderRadius(8.px)
                    fontSize(16.px)
                    fontWeight(600)
                    cursor("pointer")
                    transition("all 0.2s ease")
                }
            }) {
                Text("📊 Export Report")
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
            // Category Filter
            Select({
                style {
                    padding(12.px, 16.px)
                    border(1.px, LineStyle.Solid, Color("#E0E0E0"))
                    borderRadius(8.px)
                    fontSize(16.px)
                    backgroundColor(Color.white)
                }
                value(selectedCategory)
                onChange { selectedCategory = it.value }
            }) {
                Option { attrs { value("crops") }; Text("Crops") }
                Option { attrs { value("livestock") }; Text("Livestock") }
                Option { attrs { value("dairy") }; Text("Dairy") }
                Option { attrs { value("poultry") }; Text("Poultry") }
            }
            
            // Timeframe Filter
            Select({
                style {
                    padding(12.px, 16.px)
                    border(1.px, LineStyle.Solid, Color("#E0E0E0"))
                    borderRadius(8.px)
                    fontSize(16.px)
                    backgroundColor(Color.white)
                }
                value(selectedTimeframe)
                onChange { selectedTimeframe = it.value }
            }) {
                Option { attrs { value("1w") }; Text("1 Week") }
                Option { attrs { value("1m") }; Text("1 Month") }
                Option { attrs { value("3m") }; Text("3 Months") }
                Option { attrs { value("6m") }; Text("6 Months") }
                Option { attrs { value("1y") }; Text("1 Year") }
            }
            
            // Search
            Input({
                style {
                    flex(1)
                    minWidth(300.px)
                    padding(12.px, 16.px)
                    border(1.px, LineStyle.Solid, Color("#E0E0E0"))
                    borderRadius(8.px)
                    fontSize(16.px)
                }
                placeholder("Search products...")
                value(searchQuery)
                onInput { searchQuery = it.value }
            })
        }
        
        // Market Overview Cards
        Div({
            style {
                display(DisplayStyle.Grid)
                gridTemplateColumns("repeat(auto-fit, minmax(250px, 1fr))")
                gap(24.px)
                marginBottom(32.px)
            }
        }) {
            MarketOverviewCard(
                title = "Average Crop Price",
                value = "$4.25",
                change = "+2.3%",
                isPositive = true,
                trend = "↗️"
            )
            
            MarketOverviewCard(
                title = "Average Livestock Price",
                value = "$1,250",
                change = "-1.8%",
                isPositive = false,
                trend = "↘️"
            )
            
            MarketOverviewCard(
                title = "Market Volatility",
                value = "12.5%",
                change = "+0.5%",
                isPositive = false,
                trend = "↗️"
            )
            
            MarketOverviewCard(
                title = "Total Volume",
                value = "2.4M",
                change = "+8.2%",
                isPositive = true,
                trend = "↗️"
            )
        }
        
        // Price Charts Section
        Div({
            style {
                display(DisplayStyle.Grid)
                gridTemplateColumns("2fr 1fr")
                gap(24.px)
                marginBottom(32.px)
            }
        }) {
            // Main Chart
            Div({
                style {
                    backgroundColor(Color.white)
                    borderRadius(12.px)
                    padding(24.px)
                    boxShadow(0.px, 4.px, 12.px, Color("rgba(0,0,0,0.1)"))
                }
            }) {
                H2({
                    style {
                        fontSize(20.px)
                        fontWeight(600)
                        color(Color("#2C3E50"))
                        margin(0.px, 0.px, 16.px, 0.px)
                    }
                }) {
                    Text("Price Trends - ${selectedCategory.capitalize()}")
                }
                
                // Chart Placeholder
                Div({
                    style {
                        height(300.px)
                        backgroundColor(Color("#F8F9FA"))
                        borderRadius(8.px)
                        display(DisplayStyle.Flex)
                        alignItems(Align.Center)
                        justifyContent(JustifyContent.Center)
                        border(2.px, LineStyle.Dashed, Color("#DEE2E6"))
                    }
                }) {
                    Div({
                        style {
                            textAlign(TextAlign.Center)
                            color(Color("#6C757D"))
                        }
                    }) {
                        P({
                            style {
                                fontSize(24.px)
                                margin(0.px, 0.px, 8.px, 0.px)
                            }
                        }) {
                            Text("📈")
                        }
                        P({
                            style {
                                fontSize(16.px)
                                margin(0.px)
                            }
                        }) {
                            Text("Interactive Price Chart")
                        }
                        P({
                            style {
                                fontSize(14.px)
                                margin(0.px)
                            }
                        }) {
                            Text("Chart.js integration coming soon")
                        }
                    }
                }
            }
            
            // Market News
            Div({
                style {
                    backgroundColor(Color.white)
                    borderRadius(12.px)
                    padding(24.px)
                    boxShadow(0.px, 4.px, 12.px, Color("rgba(0,0,0,0.1)"))
                }
            }) {
                H2({
                    style {
                        fontSize(20.px)
                        fontWeight(600)
                        color(Color("#2C3E50"))
                        margin(0.px, 0.px, 16.px, 0.px)
                    }
                }) {
                    Text("Market News")
                }
                
                Div({
                    style {
                        display(DisplayStyle.Flex)
                        flexDirection(FlexDirection.Column)
                        gap(16.px)
                    }
                }) {
                    NewsItem(
                        title = "Corn Prices Hit 3-Month High",
                        summary = "Strong demand from ethanol producers drives prices up",
                        time = "2 hours ago",
                        category = "Crops"
                    )
                    
                    NewsItem(
                        title = "Beef Exports Increase 15%",
                        summary = "Asian markets show strong demand for US beef",
                        time = "4 hours ago",
                        category = "Livestock"
                    )
                    
                    NewsItem(
                        title = "Weather Concerns for Wheat",
                        summary = "Drought conditions in key growing regions",
                        time = "6 hours ago",
                        category = "Crops"
                    )
                }
            }
        }
        
        // Price Table
        Div({
            style {
                backgroundColor(Color.white)
                borderRadius(12.px)
                padding(24.px)
                boxShadow(0.px, 4.px, 12.px, Color("rgba(0,0,0,0.1)"))
            }
        }) {
            H2({
                style {
                    fontSize(20.px)
                    fontWeight(600)
                    color(Color("#2C3E50"))
                    margin(0.px, 0.px, 16.px, 0.px)
                }
            }) {
                Text("Current Market Prices")
            }
            
            // Table Header
            Div({
                style {
                    display(DisplayStyle.Grid)
                    gridTemplateColumns("2fr 1fr 1fr 1fr 1fr")
                    gap(16.px)
                    padding(16.px, 0.px)
                    borderBottom(1.px, LineStyle.Solid, Color("#E0E0E0"))
                    fontWeight(600)
                    color(Color("#2C3E50"))
                }
            }) {
                Text("Product")
                Text("Current Price")
                Text("Change")
                Text("Volume")
                Text("Trend")
            }
            
            // Table Rows
            PriceTableRow(
                product = "Corn",
                currentPrice = "$4.25/bu",
                change = "+$0.15",
                volume = "1.2M bu",
                trend = "↗️",
                isPositive = true
            )
            
            PriceTableRow(
                product = "Soybeans",
                currentPrice = "$12.80/bu",
                change = "-$0.30",
                volume = "850K bu",
                trend = "↘️",
                isPositive = false
            )
            
            PriceTableRow(
                product = "Wheat",
                currentPrice = "$6.45/bu",
                change = "+$0.25",
                volume = "650K bu",
                trend = "↗️",
                isPositive = true
            )
            
            PriceTableRow(
                product = "Cattle",
                currentPrice = "$1,250/cwt",
                change = "-$15.00",
                volume = "45K cwt",
                trend = "↘️",
                isPositive = false
            )
            
            PriceTableRow(
                product = "Hogs",
                currentPrice = "$85.50/cwt",
                change = "+$2.75",
                volume = "32K cwt",
                trend = "↗️",
                isPositive = true
            )
            
            PriceTableRow(
                product = "Milk",
                currentPrice = "$18.75/cwt",
                change = "+$0.50",
                volume = "125K cwt",
                trend = "↗️",
                isPositive = true
            )
        }
        
        // Alerts and Notifications
        Div({
            style {
                display(DisplayStyle.Grid)
                gridTemplateColumns("repeat(auto-fit, minmax(300px, 1fr))")
                gap(24.px)
                marginTop(32.px)
            }
        }) {
            // Price Alerts
            Div({
                style {
                    backgroundColor(Color.white)
                    borderRadius(12.px)
                    padding(24.px)
                    boxShadow(0.px, 4.px, 12.px, Color("rgba(0,0,0,0.1)"))
                }
            }) {
                H3({
                    style {
                        fontSize(18.px)
                        fontWeight(600)
                        color(Color("#2C3E50"))
                        margin(0.px, 0.px, 16.px, 0.px)
                    }
                }) {
                    Text("Price Alerts")
                }
                
                Div({
                    style {
                        display(DisplayStyle.Flex)
                        flexDirection(FlexDirection.Column)
                        gap(12.px)
                    }
                }) {
                    AlertItem(
                        product = "Corn",
                        condition = "Above $4.50/bu",
                        status = "Active",
                        isTriggered = true
                    )
                    
                    AlertItem(
                        product = "Soybeans",
                        condition = "Below $12.00/bu",
                        status = "Active",
                        isTriggered = false
                    )
                    
                    AlertItem(
                        product = "Cattle",
                        condition = "Above $1,300/cwt",
                        status = "Inactive",
                        isTriggered = false
                    )
                }
            }
            
            // Market Predictions
            Div({
                style {
                    backgroundColor(Color.white)
                    borderRadius(12.px)
                    padding(24.px)
                    boxShadow(0.px, 4.px, 12.px, Color("rgba(0,0,0,0.1)"))
                }
            }) {
                H3({
                    style {
                        fontSize(18.px)
                        fontWeight(600)
                        color(Color("#2C3E50"))
                        margin(0.px, 0.px, 16.px, 0.px)
                    }
                }) {
                    Text("AI Market Predictions")
                }
                
                Div({
                    style {
                        display(DisplayStyle.Flex)
                        flexDirection(FlexDirection.Column)
                        gap(16.px)
                    }
                }) {
                    PredictionItem(
                        product = "Corn",
                        prediction = "$4.45/bu",
                        confidence = "85%",
                        timeframe = "Next Week",
                        direction = "up"
                    )
                    
                    PredictionItem(
                        product = "Soybeans",
                        prediction = "$12.60/bu",
                        confidence = "72%",
                        timeframe = "Next Week",
                        direction = "down"
                    )
                    
                    PredictionItem(
                        product = "Wheat",
                        prediction = "$6.75/bu",
                        confidence = "91%",
                        timeframe = "Next Week",
                        direction = "up"
                    )
                }
            }
        }
    }
}

@Composable
private fun MarketOverviewCard(
    title: String,
    value: String,
    change: String,
    isPositive: Boolean,
    trend: String
) {
    Div({
        style {
            backgroundColor(Color.white)
            borderRadius(12.px)
            padding(24.px)
            boxShadow(0.px, 4.px, 12.px, Color("rgba(0,0,0,0.1)"))
        }
    }) {
        Div({
            style {
                display(DisplayStyle.Flex)
                justifyContent(JustifyContent.SpaceBetween)
                alignItems(Align.Center)
                marginBottom(12.px)
            }
        }) {
            Span({
                style {
                    fontSize(14.px)
                    color(Color("#757575"))
                    fontWeight(500)
                }
            }) {
                Text(title)
            }
            
            Span({
                style {
                    fontSize(20.px)
                }
            }) {
                Text(trend)
            }
        }
        
        Div({
            style {
                fontSize(28.px)
                fontWeight(700)
                color(Color("#2C3E50"))
                marginBottom(8.px)
            }
        }) {
            Text(value)
        }
        
        Span({
            style {
                fontSize(14.px)
                fontWeight(600)
                color(if (isPositive) Color("#4CAF50") else Color("#F44336"))
            }
        }) {
            Text(change)
        }
    }
}

@Composable
private fun NewsItem(
    title: String,
    summary: String,
    time: String,
    category: String
) {
    Div({
        style {
            padding(16.px)
            border(1.px, LineStyle.Solid, Color("#F0F0F0"))
            borderRadius(8.px)
            transition("all 0.2s ease")
            cursor("pointer")
        }
        onMouseEnter {
            it.target.style.backgroundColor = "#F8F9FA"
        }
        onMouseLeave {
            it.target.style.backgroundColor = "transparent"
        }
    }) {
        Div({
            style {
                display(DisplayStyle.Flex)
                justifyContent(JustifyContent.SpaceBetween)
                alignItems(Align.Center)
                marginBottom(8.px)
            }
        }) {
            Span({
                style {
                    fontSize(12.px)
                    color(Color("#4CAF50"))
                    fontWeight(600)
                    backgroundColor(Color("#E8F5E8"))
                    padding(4.px, 8.px)
                    borderRadius(4.px)
                }
            }) {
                Text(category)
            }
            
            Span({
                style {
                    fontSize(12.px)
                    color(Color("#757575"))
                }
            }) {
                Text(time)
            }
        }
        
        H4({
            style {
                fontSize(16.px)
                fontWeight(600)
                color(Color("#2C3E50"))
                margin(0.px, 0.px, 4.px, 0.px)
            }
        }) {
            Text(title)
        }
        
        P({
            style {
                fontSize(14.px)
                color(Color("#757575"))
                margin(0.px)
            }
        }) {
            Text(summary)
        }
    }
}

@Composable
private fun PriceTableRow(
    product: String,
    currentPrice: String,
    change: String,
    volume: String,
    trend: String,
    isPositive: Boolean
) {
    Div({
        style {
            display(DisplayStyle.Grid)
            gridTemplateColumns("2fr 1fr 1fr 1fr 1fr")
            gap(16.px)
            padding(16.px, 0.px)
            borderBottom(1.px, LineStyle.Solid, Color("#F0F0F0"))
            alignItems(Align.Center)
        }
    }) {
        Span({
            style {
                fontSize(16.px)
                fontWeight(600)
                color(Color("#2C3E50"))
            }
        }) {
            Text(product)
        }
        
        Span({
            style {
                fontSize(16.px)
                fontWeight(600)
                color(Color("#2C3E50"))
            }
        }) {
            Text(currentPrice)
        }
        
        Span({
            style {
                fontSize(16.px)
                fontWeight(600)
                color(if (isPositive) Color("#4CAF50") else Color("#F44336"))
            }
        }) {
            Text(change)
        }
        
        Span({
            style {
                fontSize(16.px)
                color(Color("#757575"))
            }
        }) {
            Text(volume)
        }
        
        Span({
            style {
                fontSize(20.px)
            }
        }) {
            Text(trend)
        }
    }
}

@Composable
private fun AlertItem(
    product: String,
    condition: String,
    status: String,
    isTriggered: Boolean
) {
    Div({
        style {
            display(DisplayStyle.Flex)
            justifyContent(JustifyContent.SpaceBetween)
            alignItems(Align.Center)
            padding(12.px, 16.px)
            backgroundColor(if (isTriggered) Color("#FFF3E0") else Color("#F8F9FA"))
            borderRadius(8.px)
            border(if (isTriggered) 1.px else 0.px, LineStyle.Solid, if (isTriggered) Color("#FF9800") else Color.transparent)
        }
    }) {
        Div({
            style {
                display(DisplayStyle.Flex)
                flexDirection(FlexDirection.Column)
                gap(4.px)
            }
        }) {
            Span({
                style {
                    fontSize(14.px)
                    fontWeight(600)
                    color(Color("#2C3E50"))
                }
            }) {
                Text(product)
            }
            
            Span({
                style {
                    fontSize(12.px)
                    color(Color("#757575"))
                }
            }) {
                Text(condition)
            }
        }
        
        Div({
            style {
                display(DisplayStyle.Flex)
                alignItems(Align.Center)
                gap(8.px)
            }
        }) {
            Span({
                style {
                    fontSize(12.px)
                    fontWeight(600)
                    color(if (isTriggered) Color("#E65100") else Color("#757575"))
                    backgroundColor(if (isTriggered) Color("#FFE0B2") else Color("#E0E0E0"))
                    padding(4.px, 8.px)
                    borderRadius(4.px)
                }
            }) {
                Text(status)
            }
            
            if (isTriggered) {
                Span({
                    style {
                        fontSize(16.px)
                        color(Color("#E65100"))
                    }
                }) {
                    Text("🔔")
                }
            }
        }
    }
}

@Composable
private fun PredictionItem(
    product: String,
    prediction: String,
    confidence: String,
    timeframe: String,
    direction: String
) {
    Div({
        style {
            padding(16.px)
            border(1.px, LineStyle.Solid, Color("#F0F0F0"))
            borderRadius(8.px)
        }
    }) {
        Div({
            style {
                display(DisplayStyle.Flex)
                justifyContent(JustifyContent.SpaceBetween)
                alignItems(Align.Center)
                marginBottom(8.px)
            }
        }) {
            Span({
                style {
                    fontSize(14.px)
                    fontWeight(600)
                    color(Color("#2C3E50"))
                }
            }) {
                Text(product)
            }
            
            Span({
                style {
                    fontSize(20.px)
                    color(if (direction == "up") Color("#4CAF50") else Color("#F44336"))
                }
            }) {
                Text(if (direction == "up") "↗️" else "↘️")
            }
        }
        
        Div({
            style {
                fontSize(18.px)
                fontWeight(700)
                color(Color("#2C3E50"))
                marginBottom(4.px)
            }
        }) {
            Text(prediction)
        }
        
        Div({
            style {
                display(DisplayStyle.Flex)
                justifyContent(JustifyContent.SpaceBetween)
                alignItems(Align.Center)
            }
        }) {
            Span({
                style {
                    fontSize(12.px)
                    color(Color("#757575"))
                }
            }) {
                Text(timeframe)
            }
            
            Span({
                style {
                    fontSize(12.px)
                    fontWeight(600)
                    color(Color("#4CAF50"))
                    backgroundColor(Color("#E8F5E8"))
                    padding(4.px, 8.px)
                    borderRadius(4.px)
                }
            }) {
                Text("$confidence confidence")
            }
        }
    }
}

private fun String.capitalize(): String {
    return this.replaceFirstChar { if (it.isLowerCase()) it.titlecase() else it.toString() }
} 