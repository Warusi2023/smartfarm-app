package com.example.smartfarm.web.ui.screens

import androidx.compose.runtime.*
import androidx.compose.web.elements.*
import androidx.compose.web.css.*
import com.example.smartfarm.web.ui.theme.AppTheme

@Composable
fun FinancialScreen() {
    var showAddTransaction by remember { mutableStateOf(false) }
    var transactions by remember { mutableStateOf(sampleTransactions) }
    var selectedTransaction by remember { mutableStateOf<Transaction?>(null) }
    var activeTab by remember { mutableStateOf("overview") }

    Div({
        style {
            maxWidth(1200.px)
            margin(0.px, LinearDimension.auto)
            padding(AppTheme.spacing.large)
        }
    }) {
        // Header
        Div({
            style {
                display(DisplayStyle.Flex)
                justifyContent(JustifyContent.SpaceBetween)
                alignItems(Align.Center)
                marginBottom(AppTheme.spacing.large)
            }
        }) {
            H1({
                style {
                    color(AppTheme.textColor)
                    fontSize(32.px)
                    fontWeight("bold")
                    margin(0.px)
                }
            }) {
                Text("💰 Financial Management")
            }
            
            Button({
                onClick { showAddTransaction = true }
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
                Text("+ Add Transaction")
            }
        }

        // Financial Overview Stats
        Div({
            style {
                display(DisplayStyle.Grid)
                gridTemplateColumns("repeat(auto-fit, minmax(200px, 1fr))")
                gap(AppTheme.spacing.large)
                marginBottom(AppTheme.spacing.xlarge)
            }
        }) {
            val totalIncome = transactions.filter { it.type == "Income" }.sumOf { it.amount }
            val totalExpenses = transactions.filter { it.type == "Expense" }.sumOf { it.amount }
            val netProfit = totalIncome - totalExpenses
            
            StatCard("Total Income", "$${totalIncome}", "this month", Color("#4CAF50"))
            StatCard("Total Expenses", "$${totalExpenses}", "this month", Color("#F44336"))
            StatCard("Net Profit", "$${netProfit}", "this month", if (netProfit >= 0) Color("#4CAF50") else Color("#F44336"))
            StatCard("Transactions", transactions.size.toString(), "total", Color("#2196F3"))
        }

        // Tab Navigation
        Div({
            style {
                display(DisplayStyle.Flex)
                gap(AppTheme.spacing.medium)
                marginBottom(AppTheme.spacing.large)
                borderBottom(1.px, LineStyle.Solid, AppTheme.backgroundColor)
            }
        }) {
            TabButton("Overview", "overview", activeTab) { activeTab = it }
            TabButton("Transactions", "transactions", activeTab) { activeTab = it }
            TabButton("Budget", "budget", activeTab) { activeTab = it }
            TabButton("Analytics", "analytics", activeTab) { activeTab = it }
        }

        // Tab Content
        when (activeTab) {
            "overview" -> FinancialOverview(transactions)
            "transactions" -> TransactionsList(transactions, onTransactionClick = { selectedTransaction = it })
            "budget" -> BudgetManagement()
            "analytics" -> FinancialAnalytics(transactions)
        }
    }

    // Add Transaction Modal
    if (showAddTransaction) {
        AddTransactionModal(
            onClose = { showAddTransaction = false },
            onAdd = { newTransaction ->
                transactions = listOf(newTransaction) + transactions
                showAddTransaction = false
            }
        )
    }

    // Transaction Details Modal
    selectedTransaction?.let { transaction ->
        TransactionDetailsModal(
            transaction = transaction,
            onClose = { selectedTransaction = null },
            onUpdate = { updatedTransaction ->
                transactions = transactions.map { if (it.id == updatedTransaction.id) updatedTransaction else it }
                selectedTransaction = null
            }
        )
    }
}

@Composable
private fun StatCard(title: String, value: String, subtitle: String, color: Color) {
    Div({
        style {
            backgroundColor(AppTheme.surfaceColor)
            padding(AppTheme.spacing.large)
            borderRadius(AppTheme.borderRadius)
            boxShadow(AppTheme.shadow)
            textAlign("center")
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
                fontSize(32.px)
                fontWeight("bold")
                color(color)
                marginBottom(AppTheme.spacing.small)
            }
        }) {
            Text(value)
        }
        
        Div({
            style {
                color(AppTheme.textSecondaryColor)
                fontSize(14.px)
            }
        }) {
            Text(subtitle)
        }
    }
}

@Composable
private fun TabButton(text: String, tab: String, activeTab: String, onSelect: (String) -> Unit) {
    val isActive = activeTab == tab
    Button({
        onClick { onSelect(tab) }
        style {
            backgroundColor(Color.transparent)
            color(if (isActive) AppTheme.primaryColor else AppTheme.textColor)
            border(0.px)
            borderBottom(if (isActive) 2.px else 0.px, LineStyle.Solid, if (isActive) AppTheme.primaryColor else Color.transparent)
            padding(AppTheme.spacing.medium, AppTheme.spacing.large)
            cursor("pointer")
            fontSize(16.px)
            fontWeight(if (isActive) "bold" else "normal")
        }
    }) {
        Text(text)
    }
}

@Composable
private fun FinancialOverview(transactions: List<Transaction>) {
    Div({
        style {
            display(DisplayStyle.Grid)
            gridTemplateColumns("1fr 1fr")
            gap(AppTheme.spacing.large)
        }
    }) {
        // Recent Transactions
        Div({
            style {
                backgroundColor(AppTheme.surfaceColor)
                padding(AppTheme.spacing.large)
                borderRadius(AppTheme.borderRadius)
                boxShadow(AppTheme.shadow)
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
                Text("Recent Transactions")
            }
            
            transactions.take(5).forEach { transaction ->
                TransactionRow(transaction)
            }
        }

        // Income vs Expenses Chart
        Div({
            style {
                backgroundColor(AppTheme.surfaceColor)
                padding(AppTheme.spacing.large)
                borderRadius(AppTheme.borderRadius)
                boxShadow(AppTheme.shadow)
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
                Text("Income vs Expenses")
            }
            
            val income = transactions.filter { it.type == "Income" }.sumOf { it.amount }
            val expenses = transactions.filter { it.type == "Expense" }.sumOf { it.amount }
            val total = income + expenses
            
            if (total > 0) {
                Div({
                    style {
                        display(DisplayStyle.Flex)
                        flexDirection(FlexDirection.Column)
                        gap(AppTheme.spacing.medium)
                    }
                }) {
                    ProgressBar("Income", income, total, Color("#4CAF50"))
                    ProgressBar("Expenses", expenses, total, Color("#F44336"))
                }
            } else {
                Div({
                    style {
                        color(AppTheme.textSecondaryColor)
                        textAlign("center")
                        padding(AppTheme.spacing.large)
                    }
                }) {
                    Text("No transactions yet")
                }
            }
        }
    }
}

@Composable
private fun ProgressBar(label: String, value: Double, total: Double, color: Color) {
    val percentage = if (total > 0) (value / total * 100).toInt() else 0
    
    Div({
        style {
            marginBottom(AppTheme.spacing.small)
        }
    }) {
        Div({
            style {
                display(DisplayStyle.Flex)
                justifyContent(JustifyContent.SpaceBetween)
                marginBottom(AppTheme.spacing.small)
            }
        }) {
            Text(label)
            Text("$${value.toInt()}")
        }
        
        Div({
            style {
                width(100.percent)
                height(8.px)
                backgroundColor(AppTheme.backgroundColor)
                borderRadius(4.px)
                overflow("hidden")
            }
        }) {
            Div({
                style {
                    width(percentage.percent)
                    height(100.percent)
                    backgroundColor(color)
                    transition("width 0.3s ease")
                }
            })
        }
    }
}

@Composable
private fun TransactionsList(transactions: List<Transaction>, onTransactionClick: (Transaction) -> Unit) {
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
                gridTemplateColumns("1fr 1fr 1fr 1fr 1fr")
                gap(AppTheme.spacing.medium)
                fontWeight("bold")
                color(AppTheme.textSecondaryColor)
                fontSize(14.px)
            }
        }) {
            Text("Date")
            Text("Description")
            Text("Category")
            Text("Amount")
            Text("Actions")
        }
        
        // Transaction rows
        transactions.forEach { transaction ->
            TransactionListRow(transaction, onTransactionClick)
        }
    }
}

@Composable
private fun TransactionListRow(transaction: Transaction, onTransactionClick: (Transaction) -> Unit) {
    Div({
        style {
            padding(AppTheme.spacing.medium)
            borderBottom(1.px, LineStyle.Solid, AppTheme.backgroundColor)
            display(DisplayStyle.Grid)
            gridTemplateColumns("1fr 1fr 1fr 1fr 1fr")
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
                color(AppTheme.textColor)
            }
        }) {
            Text(transaction.date)
        }
        
        Div({
            style {
                fontWeight("bold")
                color(AppTheme.textColor)
            }
        }) {
            Text(transaction.description)
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
            Text(transaction.category)
        }
        
        Div({
            style {
                color(if (transaction.type == "Income") Color("#4CAF50") else Color("#F44336"))
                fontWeight("bold")
            }
        }) {
            Text("$${transaction.amount}")
        }
        
        Button({
            onClick { onTransactionClick(transaction) }
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
            Text("View")
        }
    }
}

@Composable
private fun TransactionRow(transaction: Transaction) {
    Div({
        style {
            padding(AppTheme.spacing.medium)
            borderBottom(1.px, LineStyle.Solid, AppTheme.backgroundColor)
            display(DisplayStyle.Flex)
            justifyContent(JustifyContent.SpaceBetween)
            alignItems(Align.Center)
            
            lastChild {
                borderBottom(0.px, LineStyle.Solid, Color.transparent)
            }
        }
    }) {
        Div({
            style {
                flex(1)
            }
        }) {
            Div({
                style {
                    fontWeight("bold")
                    color(AppTheme.textColor)
                    marginBottom(AppTheme.spacing.small)
                }
            }) {
                Text(transaction.description)
            }
            
            Div({
                style {
                    color(AppTheme.textSecondaryColor)
                    fontSize(14.px)
                }
            }) {
                Text("${transaction.category} • ${transaction.date}")
            }
        }
        
        Div({
            style {
                color(if (transaction.type == "Income") Color("#4CAF50") else Color("#F44336"))
                fontWeight("bold")
                fontSize(18.px)
            }
        }) {
            Text("$${transaction.amount}")
        }
    }
}

@Composable
private fun BudgetManagement() {
    Div({
        style {
            backgroundColor(AppTheme.surfaceColor)
            padding(AppTheme.spacing.large)
            borderRadius(AppTheme.borderRadius)
            boxShadow(AppTheme.shadow)
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
            Text("Budget Planning")
        }
        
        Div({
            style {
                color(AppTheme.textSecondaryColor)
                textAlign("center")
                padding(AppTheme.spacing.xlarge)
            }
        }) {
            Text("Budget management features coming soon!")
        }
    }
}

@Composable
private fun FinancialAnalytics(transactions: List<Transaction>) {
    Div({
        style {
            display(DisplayStyle.Grid)
            gridTemplateColumns("1fr 1fr")
            gap(AppTheme.spacing.large)
        }
    }) {
        // Category Breakdown
        Div({
            style {
                backgroundColor(AppTheme.surfaceColor)
                padding(AppTheme.spacing.large)
                borderRadius(AppTheme.borderRadius)
                boxShadow(AppTheme.shadow)
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
                Text("Expense Categories")
            }
            
            val categoryTotals = transactions
                .filter { it.type == "Expense" }
                .groupBy { it.category }
                .mapValues { it.value.sumOf { transaction -> transaction.amount } }
            
            categoryTotals.forEach { (category, total) ->
                CategoryBreakdown(category, total)
            }
        }

        // Monthly Trend
        Div({
            style {
                backgroundColor(AppTheme.surfaceColor)
                padding(AppTheme.spacing.large)
                borderRadius(AppTheme.borderRadius)
                boxShadow(AppTheme.shadow)
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
                Text("Monthly Trend")
            }
            
            Div({
                style {
                    color(AppTheme.textSecondaryColor)
                    textAlign("center")
                    padding(AppTheme.spacing.large)
                }
            }) {
                Text("Chart visualization coming soon!")
            }
        }
    }
}

@Composable
private fun CategoryBreakdown(category: String, total: Double) {
    Div({
        style {
            display(DisplayStyle.Flex)
            justifyContent(JustifyContent.SpaceBetween)
            alignItems(Align.Center)
            padding(AppTheme.spacing.small, 0.px)
        }
    }) {
        Text(category)
        Div({
            style {
                color(AppTheme.primaryColor)
                fontWeight("bold")
            }
        }) {
            Text("$${total.toInt()}")
        }
    }
}

@Composable
private fun AddTransactionModal(onClose: () -> Unit, onAdd: (Transaction) -> Unit) {
    var description by remember { mutableStateOf("") }
    var amount by remember { mutableStateOf("") }
    var category by remember { mutableStateOf("Feed") }
    var type by remember { mutableStateOf("Expense") }
    var date by remember { mutableStateOf("") }

    Div({
        style {
            position(Position.Fixed)
            top(0.px)
            left(0.px)
            right(0.px)
            bottom(0.px)
            backgroundColor(Color("rgba(0,0,0,0.5)"))
            display(DisplayStyle.Flex)
            justifyContent(JustifyContent.Center)
            alignItems(Align.Center)
            zIndex(1000)
        }
    }) {
        Div({
            style {
                backgroundColor(AppTheme.surfaceColor)
                padding(AppTheme.spacing.xlarge)
                borderRadius(AppTheme.borderRadius)
                boxShadow(AppTheme.shadowLarge)
                maxWidth(500.px)
                width(100.percent)
            }
        }) {
            H2({
                style {
                    margin(0.px, 0.px, AppTheme.spacing.large, 0.px)
                    color(AppTheme.textColor)
                }
            }) {
                Text("Add Transaction")
            }

            Div({ style { marginBottom(AppTheme.spacing.medium) } }) {
                Label({ style { display(DisplayStyle.Block); marginBottom(AppTheme.spacing.small) } }) {
                    Text("Description")
                }
                Input({
                    value = description
                    onInput { description = it.value }
                    style {
                        width(100.percent)
                        padding(AppTheme.spacing.small)
                        border(1.px, LineStyle.Solid, AppTheme.backgroundColor)
                        borderRadius(AppTheme.borderRadius)
                    }
                })
            }

            Div({ style { marginBottom(AppTheme.spacing.medium) } }) {
                Label({ style { display(DisplayStyle.Block); marginBottom(AppTheme.spacing.small) } }) {
                    Text("Type")
                }
                Select({
                    value = type
                    onChange { type = it.value }
                    style {
                        width(100.percent)
                        padding(AppTheme.spacing.small)
                        border(1.px, LineStyle.Solid, AppTheme.backgroundColor)
                        borderRadius(AppTheme.borderRadius)
                    }
                }) {
                    Option { Text("Income") }
                    Option { Text("Expense") }
                }
            }

            Div({ style { marginBottom(AppTheme.spacing.medium) } }) {
                Label({ style { display(DisplayStyle.Block); marginBottom(AppTheme.spacing.small) } }) {
                    Text("Category")
                }
                Select({
                    value = category
                    onChange { category = it.value }
                    style {
                        width(100.percent)
                        padding(AppTheme.spacing.small)
                        border(1.px, LineStyle.Solid, AppTheme.backgroundColor)
                        borderRadius(AppTheme.borderRadius)
                    }
                }) {
                    Option { Text("Feed") }
                    Option { Text("Equipment") }
                    Option { Text("Labor") }
                    Option { Text("Veterinary") }
                    Option { Text("Crop Sales") }
                    Option { Text("Livestock Sales") }
                    Option { Text("Other") }
                }
            }

            Div({ style { marginBottom(AppTheme.spacing.medium) } }) {
                Label({ style { display(DisplayStyle.Block); marginBottom(AppTheme.spacing.small) } }) {
                    Text("Amount")
                }
                Input({
                    type = InputType.Number
                    value = amount
                    onInput { amount = it.value }
                    style {
                        width(100.percent)
                        padding(AppTheme.spacing.small)
                        border(1.px, LineStyle.Solid, AppTheme.backgroundColor)
                        borderRadius(AppTheme.borderRadius)
                    }
                })
            }

            Div({ style { marginBottom(AppTheme.spacing.large) } }) {
                Label({ style { display(DisplayStyle.Block); marginBottom(AppTheme.spacing.small) } }) {
                    Text("Date")
                }
                Input({
                    type = InputType.Date
                    value = date
                    onInput { date = it.value }
                    style {
                        width(100.percent)
                        padding(AppTheme.spacing.small)
                        border(1.px, LineStyle.Solid, AppTheme.backgroundColor)
                        borderRadius(AppTheme.borderRadius)
                    }
                })
            }

            Div({
                style {
                    display(DisplayStyle.Flex)
                    gap(AppTheme.spacing.medium)
                    justifyContent(JustifyContent.End)
                }
            }) {
                Button({
                    onClick = onClose
                    style {
                        backgroundColor(Color.transparent)
                        color(AppTheme.textColor)
                        border(1.px, LineStyle.Solid, AppTheme.backgroundColor)
                        padding(AppTheme.spacing.medium, AppTheme.spacing.large)
                        borderRadius(AppTheme.borderRadius)
                        cursor("pointer")
                    }
                }) {
                    Text("Cancel")
                }
                
                Button({
                    onClick = {
                        if (description.isNotBlank() && amount.isNotBlank() && date.isNotBlank()) {
                            onAdd(Transaction(
                                id = (sampleTransactions.maxOfOrNull { it.id } ?: 0) + 1,
                                description = description,
                                amount = amount.toDoubleOrNull() ?: 0.0,
                                category = category,
                                type = type,
                                date = date
                            ))
                        }
                    }
                    style {
                        backgroundColor(AppTheme.primaryColor)
                        color(Color.white)
                        border(0.px)
                        padding(AppTheme.spacing.medium, AppTheme.spacing.large)
                        borderRadius(AppTheme.borderRadius)
                        cursor("pointer")
                    }
                }) {
                    Text("Add Transaction")
                }
            }
        }
    }
}

@Composable
private fun TransactionDetailsModal(
    transaction: Transaction,
    onClose: () -> Unit,
    onUpdate: (Transaction) -> Unit
) {
    var description by remember { mutableStateOf(transaction.description) }
    var amount by remember { mutableStateOf(transaction.amount.toString()) }
    var category by remember { mutableStateOf(transaction.category) }
    var type by remember { mutableStateOf(transaction.type) }
    var date by remember { mutableStateOf(transaction.date) }

    Div({
        style {
            position(Position.Fixed)
            top(0.px)
            left(0.px)
            right(0.px)
            bottom(0.px)
            backgroundColor(Color("rgba(0,0,0,0.5)"))
            display(DisplayStyle.Flex)
            justifyContent(JustifyContent.Center)
            alignItems(Align.Center)
            zIndex(1000)
        }
    }) {
        Div({
            style {
                backgroundColor(AppTheme.surfaceColor)
                padding(AppTheme.spacing.xlarge)
                borderRadius(AppTheme.borderRadius)
                boxShadow(AppTheme.shadowLarge)
                maxWidth(500.px)
                width(100.percent)
            }
        }) {
            H2({
                style {
                    margin(0.px, 0.px, AppTheme.spacing.large, 0.px)
                    color(AppTheme.textColor)
                }
            }) {
                Text("Transaction Details")
            }

            Div({ style { marginBottom(AppTheme.spacing.medium) } }) {
                Label({ style { display(DisplayStyle.Block); marginBottom(AppTheme.spacing.small) } }) {
                    Text("Description")
                }
                Input({
                    value = description
                    onInput { description = it.value }
                    style {
                        width(100.percent)
                        padding(AppTheme.spacing.small)
                        border(1.px, LineStyle.Solid, AppTheme.backgroundColor)
                        borderRadius(AppTheme.borderRadius)
                    }
                })
            }

            Div({ style { marginBottom(AppTheme.spacing.medium) } }) {
                Label({ style { display(DisplayStyle.Block); marginBottom(AppTheme.spacing.small) } }) {
                    Text("Type")
                }
                Select({
                    value = type
                    onChange { type = it.value }
                    style {
                        width(100.percent)
                        padding(AppTheme.spacing.small)
                        border(1.px, LineStyle.Solid, AppTheme.backgroundColor)
                        borderRadius(AppTheme.borderRadius)
                    }
                }) {
                    Option { Text("Income") }
                    Option { Text("Expense") }
                }
            }

            Div({ style { marginBottom(AppTheme.spacing.medium) } }) {
                Label({ style { display(DisplayStyle.Block); marginBottom(AppTheme.spacing.small) } }) {
                    Text("Category")
                }
                Select({
                    value = category
                    onChange { category = it.value }
                    style {
                        width(100.percent)
                        padding(AppTheme.spacing.small)
                        border(1.px, LineStyle.Solid, AppTheme.backgroundColor)
                        borderRadius(AppTheme.borderRadius)
                    }
                }) {
                    Option { Text("Feed") }
                    Option { Text("Equipment") }
                    Option { Text("Labor") }
                    Option { Text("Veterinary") }
                    Option { Text("Crop Sales") }
                    Option { Text("Livestock Sales") }
                    Option { Text("Other") }
                }
            }

            Div({ style { marginBottom(AppTheme.spacing.medium) } }) {
                Label({ style { display(DisplayStyle.Block); marginBottom(AppTheme.spacing.small) } }) {
                    Text("Amount")
                }
                Input({
                    type = InputType.Number
                    value = amount
                    onInput { amount = it.value }
                    style {
                        width(100.percent)
                        padding(AppTheme.spacing.small)
                        border(1.px, LineStyle.Solid, AppTheme.backgroundColor)
                        borderRadius(AppTheme.borderRadius)
                    }
                })
            }

            Div({ style { marginBottom(AppTheme.spacing.large) } }) {
                Label({ style { display(DisplayStyle.Block); marginBottom(AppTheme.spacing.small) } }) {
                    Text("Date")
                }
                Input({
                    type = InputType.Date
                    value = date
                    onInput { date = it.value }
                    style {
                        width(100.percent)
                        padding(AppTheme.spacing.small)
                        border(1.px, LineStyle.Solid, AppTheme.backgroundColor)
                        borderRadius(AppTheme.borderRadius)
                    }
                })
            }

            Div({
                style {
                    display(DisplayStyle.Flex)
                    gap(AppTheme.spacing.medium)
                    justifyContent(JustifyContent.End)
                }
            }) {
                Button({
                    onClick = onClose
                    style {
                        backgroundColor(Color.transparent)
                        color(AppTheme.textColor)
                        border(1.px, LineStyle.Solid, AppTheme.backgroundColor)
                        padding(AppTheme.spacing.medium, AppTheme.spacing.large)
                        borderRadius(AppTheme.borderRadius)
                        cursor("pointer")
                    }
                }) {
                    Text("Cancel")
                }
                
                Button({
                    onClick = {
                        if (description.isNotBlank() && amount.isNotBlank() && date.isNotBlank()) {
                            onUpdate(transaction.copy(
                                description = description,
                                amount = amount.toDoubleOrNull() ?: transaction.amount,
                                category = category,
                                type = type,
                                date = date
                            ))
                        }
                    }
                    style {
                        backgroundColor(AppTheme.primaryColor)
                        color(Color.white)
                        border(0.px)
                        padding(AppTheme.spacing.medium, AppTheme.spacing.large)
                        borderRadius(AppTheme.borderRadius)
                        cursor("pointer")
                    }
                }) {
                    Text("Update")
                }
            }
        }
    }
}

data class Transaction(
    val id: Int,
    val description: String,
    val amount: Double,
    val category: String,
    val type: String,
    val date: String
)

private val sampleTransactions = listOf(
    Transaction(1, "Corn Feed Purchase", 250.0, "Feed", "Expense", "2024-01-15"),
    Transaction(2, "Cattle Sale", 1500.0, "Livestock Sales", "Income", "2024-01-20"),
    Transaction(3, "Veterinary Visit", 120.0, "Veterinary", "Expense", "2024-01-22"),
    Transaction(4, "Wheat Harvest Sale", 800.0, "Crop Sales", "Income", "2024-01-25"),
    Transaction(5, "Equipment Repair", 300.0, "Equipment", "Expense", "2024-01-28"),
    Transaction(6, "Labor Payment", 400.0, "Labor", "Expense", "2024-01-30")
) 