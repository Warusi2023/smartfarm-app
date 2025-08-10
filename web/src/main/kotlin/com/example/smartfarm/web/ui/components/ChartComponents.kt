package com.example.smartfarm.web.ui.components

import androidx.compose.runtime.*
import androidx.compose.web.css.*
import androidx.compose.web.dom.*

@Composable
fun YieldChart() {
    Div({
        style {
            height(300.px)
            position(Position.Relative)
        }
        id("yieldChart")
    }) {
        // Chart will be initialized by JavaScript
    }
    
    DisposableEffect(Unit) {
        // Initialize Chart.js when component mounts
        val script = """
            const ctx = document.getElementById('yieldChart').getContext('2d');
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                    datasets: [{
                        label: 'Corn Yield (tons/acre)',
                        data: [4.2, 4.5, 4.8, 5.1, 5.3, 5.6],
                        borderColor: '#4CAF50',
                        backgroundColor: 'rgba(76, 175, 80, 0.1)',
                        tension: 0.4
                    }, {
                        label: 'Wheat Yield (tons/acre)',
                        data: [3.8, 4.0, 4.2, 4.4, 4.6, 4.8],
                        borderColor: '#FF9800',
                        backgroundColor: 'rgba(255, 152, 0, 0.1)',
                        tension: 0.4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        title: {
                            display: true,
                            text: 'Crop Yield Trends'
                        },
                        legend: {
                            position: 'top'
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Yield (tons/acre)'
                            }
                        }
                    }
                }
            });
        """.trimIndent()
        
        // Execute the script
        js("eval")(script)
        
        onDispose {
            // Cleanup if needed
        }
    }
}

@Composable
fun RevenueChart() {
    Div({
        style {
            height(300.px)
            position(Position.Relative)
        }
        id("revenueChart")
    }) {
        // Chart will be initialized by JavaScript
    }
    
    DisposableEffect(Unit) {
        val script = """
            const ctx = document.getElementById('revenueChart').getContext('2d');
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                    datasets: [{
                        label: 'Revenue ($)',
                        data: [12500, 14200, 15800, 17500, 19200, 21000],
                        backgroundColor: 'rgba(54, 162, 235, 0.8)',
                        borderColor: '#36A2EB',
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        title: {
                            display: true,
                            text: 'Monthly Revenue'
                        },
                        legend: {
                            position: 'top'
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Revenue ($)'
                            }
                        }
                    }
                }
            });
        """.trimIndent()
        
        js("eval")(script)
        
        onDispose {
            // Cleanup if needed
        }
    }
}

@Composable
fun CostAnalysisChart() {
    Div({
        style {
            height(300.px)
            position(Position.Relative)
        }
        id("costChart")
    }) {
        // Chart will be initialized by JavaScript
    }
    
    DisposableEffect(Unit) {
        val script = """
            const ctx = document.getElementById('costChart').getContext('2d');
            new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: ['Fertilizer', 'Seeds', 'Equipment', 'Labor', 'Fuel', 'Other'],
                    datasets: [{
                        data: [25, 20, 15, 30, 8, 2],
                        backgroundColor: [
                            '#FF6384',
                            '#36A2EB',
                            '#FFCE56',
                            '#4BC0C0',
                            '#9966FF',
                            '#FF9F40'
                        ],
                        borderWidth: 2,
                        borderColor: '#fff'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        title: {
                            display: true,
                            text: 'Cost Breakdown'
                        },
                        legend: {
                            position: 'right'
                        }
                    }
                }
            });
        """.trimIndent()
        
        js("eval")(script)
        
        onDispose {
            // Cleanup if needed
        }
    }
}

@Composable
fun WeatherImpactChart() {
    Div({
        style {
            height(300.px)
            position(Position.Relative)
        }
        id("weatherChart")
    }) {
        // Chart will be initialized by JavaScript
    }
    
    DisposableEffect(Unit) {
        val script = """
            const ctx = document.getElementById('weatherChart').getContext('2d');
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                    datasets: [{
                        label: 'Temperature (°C)',
                        data: [2, 5, 8, 12, 16, 20],
                        borderColor: '#FF6384',
                        backgroundColor: 'rgba(255, 99, 132, 0.1)',
                        yAxisID: 'y'
                    }, {
                        label: 'Precipitation (mm)',
                        data: [45, 52, 48, 65, 78, 85],
                        borderColor: '#36A2EB',
                        backgroundColor: 'rgba(54, 162, 235, 0.1)',
                        yAxisID: 'y1'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        title: {
                            display: true,
                            text: 'Weather Impact on Yield'
                        },
                        legend: {
                            position: 'top'
                        }
                    },
                    scales: {
                        y: {
                            type: 'linear',
                            display: true,
                            position: 'left',
                            title: {
                                display: true,
                                text: 'Temperature (°C)'
                            }
                        },
                        y1: {
                            type: 'linear',
                            display: true,
                            position: 'right',
                            title: {
                                display: true,
                                text: 'Precipitation (mm)'
                            },
                            grid: {
                                drawOnChartArea: false
                            }
                        }
                    }
                }
            });
        """.trimIndent()
        
        js("eval")(script)
        
        onDispose {
            // Cleanup if needed
        }
    }
}

@Composable
fun ProfitTrendChart() {
    Div({
        style {
            height(300.px)
            position(Position.Relative)
        }
        id("profitChart")
    }) {
        // Chart will be initialized by JavaScript
    }
    
    DisposableEffect(Unit) {
        val script = """
            const ctx = document.getElementById('profitChart').getContext('2d');
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                    datasets: [{
                        label: 'Profit ($)',
                        data: [3200, 3800, 4200, 4800, 5200, 5800],
                        borderColor: '#4CAF50',
                        backgroundColor: 'rgba(76, 175, 80, 0.1)',
                        fill: true,
                        tension: 0.4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        title: {
                            display: true,
                            text: 'Profit Trends'
                        },
                        legend: {
                            position: 'top'
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Profit ($)'
                            }
                        }
                    }
                }
            });
        """.trimIndent()
        
        js("eval")(script)
        
        onDispose {
            // Cleanup if needed
        }
    }
}

@Composable
fun EfficiencyChart() {
    Div({
        style {
            height(300.px)
            position(Position.Relative)
        }
        id("efficiencyChart")
    }) {
        // Chart will be initialized by JavaScript
    }
    
    DisposableEffect(Unit) {
        val script = """
            const ctx = document.getElementById('efficiencyChart').getContext('2d');
            new Chart(ctx, {
                type: 'radar',
                data: {
                    labels: ['Water Usage', 'Fertilizer Efficiency', 'Labor Productivity', 'Equipment Utilization', 'Energy Efficiency', 'Crop Yield'],
                    datasets: [{
                        label: 'Current Performance',
                        data: [85, 78, 92, 88, 75, 90],
                        borderColor: '#4CAF50',
                        backgroundColor: 'rgba(76, 175, 80, 0.2)',
                        pointBackgroundColor: '#4CAF50'
                    }, {
                        label: 'Industry Average',
                        data: [70, 65, 75, 80, 70, 75],
                        borderColor: '#FF9800',
                        backgroundColor: 'rgba(255, 152, 0, 0.2)',
                        pointBackgroundColor: '#FF9800'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        title: {
                            display: true,
                            text: 'Farm Efficiency Analysis'
                        },
                        legend: {
                            position: 'top'
                        }
                    },
                    scales: {
                        r: {
                            beginAtZero: true,
                            max: 100,
                            ticks: {
                                stepSize: 20
                            }
                        }
                    }
                }
            });
        """.trimIndent()
        
        js("eval")(script)
        
        onDispose {
            // Cleanup if needed
        }
    }
} 