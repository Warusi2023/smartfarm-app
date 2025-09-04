package com.yourcompany.smartfarm.shared.ui.charts

import kotlinx.serialization.Serializable

/**
 * Professional charting library interface for SmartFarm
 * Supports Chart.js (Web), MPAndroidChart (Android), and custom implementations
 */
@Serializable
data class ChartData(
    val labels: List<String>,
    val datasets: List<Dataset>,
    val options: ChartOptions = ChartOptions()
)

@Serializable
data class Dataset(
    val label: String,
    val data: List<Double>,
    val backgroundColor: String? = null,
    val borderColor: String? = null,
    val borderWidth: Int = 2,
    val fill: Boolean = false
)

@Serializable
data class ChartOptions(
    val responsive: Boolean = true,
    val maintainAspectRatio: Boolean = false,
    val plugins: PluginOptions = PluginOptions(),
    val scales: ScaleOptions = ScaleOptions()
)

@Serializable
data class PluginOptions(
    val title: TitleOptions = TitleOptions(),
    val legend: LegendOptions = LegendOptions(),
    val tooltip: TooltipOptions = TooltipOptions()
)

@Serializable
data class TitleOptions(
    val display: Boolean = true,
    val text: String = "",
    val fontSize: Int = 16
)

@Serializable
data class LegendOptions(
    val display: Boolean = true,
    val position: String = "top"
)

@Serializable
data class TooltipOptions(
    val enabled: Boolean = true,
    val mode: String = "index"
)

@Serializable
data class ScaleOptions(
    val y: AxisOptions = AxisOptions(),
    val x: AxisOptions = AxisOptions()
)

@Serializable
data class AxisOptions(
    val beginAtZero: Boolean = true,
    val grid: GridOptions = GridOptions()
)

@Serializable
data class GridOptions(
    val display: Boolean = true,
    val color: String = "#e0e0e0"
)

/**
 * Chart types supported by the library
 */
enum class ChartType {
    LINE, BAR, PIE, DOUGHNUT, RADAR, POLAR_AREA, SCATTER, BUBBLE
}

/**
 * Chart configuration for different farm data types
 */
object ChartConfig {
    
    fun createProductionChart(
        plants: Int,
        flowers: Int,
        trees: Int,
        aquatic: Int,
        livestock: Int,
        pets: Int
    ): ChartData {
        return ChartData(
            labels = listOf("Plants", "Flowers", "Trees", "Aquatic", "Livestock", "Pets"),
            datasets = listOf(
                Dataset(
                    label = "Production Count",
                    data = listOf(plants.toDouble(), flowers.toDouble(), trees.toDouble(), 
                                aquatic.toDouble(), livestock.toDouble(), pets.toDouble()),
                    backgroundColor = listOf("#4CAF50", "#E91E63", "#2196F3", "#00BCD4", "#FF9800", "#9C27B0"),
                    borderColor = listOf("#388E3C", "#C2185B", "#1976D2", "#0097A7", "#F57C00", "#7B1FA2"),
                    fill = true
                )
            ),
            options = ChartOptions(
                plugins = PluginOptions(
                    title = TitleOptions(text = "Farm Production Overview", fontSize = 18)
                )
            )
        )
    }
    
    fun createFinancialChart(
        revenue: List<Double>,
        expenses: List<Double>,
        months: List<String>
    ): ChartData {
        return ChartData(
            labels = months,
            datasets = listOf(
                Dataset(
                    label = "Revenue",
                    data = revenue,
                    backgroundColor = "#4CAF50",
                    borderColor = "#388E3C",
                    fill = false
                ),
                Dataset(
                    label = "Expenses",
                    data = expenses,
                    backgroundColor = "#F44336",
                    borderColor = "#D32F2F",
                    fill = false
                )
            ),
            options = ChartOptions(
                plugins = PluginOptions(
                    title = TitleOptions(text = "Financial Performance", fontSize = 18)
                )
            )
        )
    }
    
    fun createEfficiencyChart(
        efficiency: Double,
        growthRate: Double,
        sustainability: Double
    ): ChartData {
        return ChartData(
            labels = listOf("Efficiency", "Growth Rate", "Sustainability"),
            datasets = listOf(
                Dataset(
                    label = "Performance Metrics",
                    data = listOf(efficiency, growthRate, sustainability),
                    backgroundColor = listOf("#4CAF50", "#2196F3", "#FF9800"),
                    borderColor = listOf("#388E3C", "#1976D2", "#F57C00"),
                    fill = true
                )
            ),
            options = ChartOptions(
                plugins = PluginOptions(
                    title = TitleOptions(text = "Farm Performance Metrics", fontSize = 18)
                )
            )
        )
    }
    
    fun createEquipmentStatusChart(
        operational: Int,
        maintenance: Int,
        offline: Int
    ): ChartData {
        return ChartData(
            labels = listOf("Operational", "Maintenance", "Offline"),
            datasets = listOf(
                Dataset(
                    label = "Equipment Status",
                    data = listOf(operational.toDouble(), maintenance.toDouble(), offline.toDouble()),
                    backgroundColor = listOf("#4CAF50", "#FF9800", "#F44336"),
                    borderColor = listOf("#388E3C", "#F57C00", "#D32F2F"),
                    fill = true
                )
            ),
            options = ChartOptions(
                plugins = PluginOptions(
                    title = TitleOptions(text = "Equipment Status Overview", fontSize = 18)
                )
            )
        )
    }
}
