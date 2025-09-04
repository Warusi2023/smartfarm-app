package com.yourcompany.smartfarm.shared.ui.charts

import kotlinx.browser.document
import kotlinx.browser.window
import org.w3c.dom.Element
import org.w3c.dom.HTMLCanvasElement
import org.w3c.dom.HTMLScriptElement

/**
 * Chart.js renderer for web platform
 * Provides professional charts with animations and interactivity
 */
class ChartJsRenderer {
    
    private var chartJsLoaded = false
    private val charts = mutableMapOf<String, dynamic>()
    
    init {
        loadChartJs()
    }
    
    private fun loadChartJs() {
        if (chartJsLoaded) return
        
        // Load Chart.js from CDN
        val script = document.createElement("script") as HTMLScriptElement
        script.src = "https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.js"
        script.onload = {
            chartJsLoaded = true
            println("📊 Chart.js loaded successfully")
        }
        script.onerror = {
            println("❌ Failed to load Chart.js")
        }
        document.head?.appendChild(script)
    }
    
    /**
     * Render a chart in the specified container
     */
    fun renderChart(
        containerId: String,
        chartData: ChartData,
        chartType: ChartType = ChartType.BAR
    ): Boolean {
        if (!chartJsLoaded) {
            println("⏳ Chart.js not loaded yet, retrying...")
            window.setTimeout({ renderChart(containerId, chartData, chartType) }, 100)
            return false
        }
        
        val container = document.getElementById(containerId)
        if (container == null) {
            println("❌ Container not found: $containerId")
            return false
        }
        
        // Clear existing content
        container.innerHTML = ""
        
        // Create canvas element
        val canvas = document.createElement("canvas") as HTMLCanvasElement
        canvas.id = "${containerId}_canvas"
        container.appendChild(canvas)
        
        // Convert chart data to Chart.js format
        val jsChartData = convertToChartJsData(chartData, chartType)
        
        // Create Chart.js chart
        val chart = js("new Chart(canvas, jsChartData)")
        charts[containerId] = chart
        
        println("📊 Chart rendered successfully: $containerId")
        return true
    }
    
    /**
     * Update existing chart with new data
     */
    fun updateChart(containerId: String, chartData: ChartData) {
        val chart = charts[containerId]
        if (chart != null) {
            val jsChartData = convertToChartJsData(chartData, ChartType.BAR)
            chart.data = jsChartData.data
            chart.options = jsChartData.options
            chart.update()
            println("📊 Chart updated: $containerId")
        }
    }
    
    /**
     * Destroy a chart
     */
    fun destroyChart(containerId: String) {
        val chart = charts[containerId]
        if (chart != null) {
            chart.destroy()
            charts.remove(containerId)
            println("🗑️ Chart destroyed: $containerId")
        }
    }
    
    /**
     * Convert SmartFarm chart data to Chart.js format
     */
    private fun convertToChartJsData(chartData: ChartData, chartType: ChartType): dynamic {
        val jsData = js("{}")
        
        // Set chart type
        jsData.type = when (chartType) {
            ChartType.LINE -> "line"
            ChartType.BAR -> "bar"
            ChartType.PIE -> "pie"
            ChartType.DOUGHNUT -> "doughnut"
            ChartType.RADAR -> "radar"
            ChartType.POLAR_AREA -> "polarArea"
            ChartType.SCATTER -> "scatter"
            ChartType.BUBBLE -> "bubble"
        }
        
        // Set labels
        jsData.data = js("{}")
        jsData.data.labels = chartData.labels.toTypedArray()
        
        // Set datasets
        jsData.data.datasets = chartData.datasets.map { dataset ->
            val jsDataset = js("{}")
            jsDataset.label = dataset.label
            jsDataset.data = dataset.data.toTypedArray()
            
            if (dataset.backgroundColor != null) {
                jsDataset.backgroundColor = dataset.backgroundColor
            }
            if (dataset.borderColor != null) {
                jsDataset.borderColor = dataset.borderColor
            }
            
            jsDataset.borderWidth = dataset.borderWidth
            jsDataset.fill = dataset.fill
            
            jsDataset
        }.toTypedArray()
        
        // Set options
        jsData.options = js("{}")
        jsData.options.responsive = chartData.options.responsive
        jsData.options.maintainAspectRatio = chartData.options.maintainAspectRatio
        
        // Set plugins
        jsData.options.plugins = js("{}")
        jsData.options.plugins.title = js("{}")
        jsData.options.plugins.title.display = chartData.options.plugins.title.display
        jsData.options.plugins.title.text = chartData.options.plugins.title.text
        jsData.options.plugins.title.font = js("{}")
        jsData.options.plugins.title.font.size = chartData.options.plugins.title.fontSize
        
        jsData.options.plugins.legend = js("{}")
        jsData.options.plugins.legend.display = chartData.options.plugins.legend.display
        jsData.options.plugins.legend.position = chartData.options.plugins.legend.position
        
        jsData.options.plugins.tooltip = js("{}")
        jsData.options.plugins.tooltip.enabled = chartData.options.plugins.tooltip.enabled
        jsData.options.plugins.tooltip.mode = chartData.options.plugins.tooltip.mode
        
        // Set scales for non-pie charts
        if (chartType != ChartType.PIE && chartType != ChartType.DOUGHNUT && 
            chartType != ChartType.POLAR_AREA) {
            jsData.options.scales = js("{}")
            jsData.options.scales.y = js("{}")
            jsData.options.scales.y.beginAtZero = chartData.options.scales.y.beginAtZero
            jsData.options.scales.y.grid = js("{}")
            jsData.options.scales.y.grid.display = chartData.options.scales.y.grid.display
            jsData.options.scales.y.grid.color = chartData.options.scales.y.grid.color
            
            jsData.options.scales.x = js("{}")
            jsData.options.scales.x.grid = js("{}")
            jsData.options.scales.x.grid.display = chartData.options.scales.x.grid.display
            jsData.options.scales.x.grid.color = chartData.options.scales.x.grid.color
        }
        
        return jsData
    }
    
    /**
     * Render a production overview chart
     */
    fun renderProductionChart(
        containerId: String,
        plants: Int,
        flowers: Int,
        trees: Int,
        aquatic: Int,
        livestock: Int,
        pets: Int
    ) {
        val chartData = ChartConfig.createProductionChart(plants, flowers, trees, aquatic, livestock, pets)
        renderChart(containerId, chartData, ChartType.BAR)
    }
    
    /**
     * Render a financial performance chart
     */
    fun renderFinancialChart(
        containerId: String,
        revenue: List<Double>,
        expenses: List<Double>,
        months: List<String>
    ) {
        val chartData = ChartConfig.createFinancialChart(revenue, expenses, months)
        renderChart(containerId, chartData, ChartType.LINE)
    }
    
    /**
     * Render an efficiency metrics chart
     */
    fun renderEfficiencyChart(
        containerId: String,
        efficiency: Double,
        growthRate: Double,
        sustainability: Double
    ) {
        val chartData = ChartConfig.createEfficiencyChart(efficiency, growthRate, sustainability)
        renderChart(containerId, chartData, ChartType.RADAR)
    }
    
    /**
     * Render an equipment status chart
     */
    fun renderEquipmentStatusChart(
        containerId: String,
        operational: Int,
        maintenance: Int,
        offline: Int
    ) {
        val chartData = ChartConfig.createEquipmentStatusChart(operational, maintenance, offline)
        renderChart(containerId, chartData, ChartType.DOUGHNUT)
    }
}
