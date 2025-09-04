package com.yourcompany.smartfarm.shared.ui.charts

import android.content.Context
import android.graphics.Color
import android.view.ViewGroup
import android.widget.LinearLayout
import com.github.mikephil.charting.charts.*
import com.github.mikephil.charting.components.XAxis
import com.github.mikephil.charting.data.*
import com.github.mikephil.charting.formatter.IndexAxisValueFormatter
import com.github.mikephil.charting.interfaces.datasets.IBarDataSet
import com.github.mikephil.charting.interfaces.datasets.ILineDataSet
import com.github.mikephil.charting.interfaces.datasets.IPieDataSet

/**
 * Android-specific chart renderer using MPAndroidChart
 * Provides professional charts with native Android performance
 */
class AndroidChartRenderer(private val context: Context) {
    
    private val charts = mutableMapOf<String, Chart<*>>()
    
    /**
     * Render a chart in the specified container
     */
    fun renderChart(
        container: ViewGroup,
        chartData: ChartData,
        chartType: ChartType = ChartType.BAR
    ): Boolean {
        try {
            // Clear existing content
            container.removeAllViews()
            
            // Create chart based on type
            val chart = when (chartType) {
                ChartType.LINE -> createLineChart(chartData)
                ChartType.BAR -> createBarChart(chartData)
                ChartType.PIE -> createPieChart(chartData)
                ChartType.DOUGHNUT -> createDoughnutChart(chartData)
                ChartType.RADAR -> createRadarChart(chartData)
                ChartType.POLAR_AREA -> createPolarAreaChart(chartData)
                ChartType.SCATTER -> createScatterChart(chartData)
                ChartType.BUBBLE -> createBubbleChart(chartData)
            }
            
            // Add chart to container
            container.addView(chart)
            
            // Store chart reference
            val chartId = container.id.toString()
            charts[chartId] = chart
            
            println("📊 Android chart rendered successfully: $chartId")
            return true
            
        } catch (e: Exception) {
            println("❌ Failed to render Android chart: ${e.message}")
            return false
        }
    }
    
    /**
     * Create a bar chart
     */
    private fun createBarChart(chartData: ChartData): BarChart {
        val chart = BarChart(context)
        chart.layoutParams = LinearLayout.LayoutParams(
            ViewGroup.LayoutParams.MATCH_PARENT,
            ViewGroup.LayoutParams.MATCH_PARENT
        )
        
        // Configure chart
        chart.description.isEnabled = false
        chart.legend.isEnabled = chartData.options.plugins.legend.display
        chart.setDrawGridBackground(false)
        chart.setDrawBarShadow(false)
        chart.setDrawValueAboveBar(true)
        
        // Configure X-axis
        val xAxis = chart.xAxis
        xAxis.position = XAxis.XAxisPosition.BOTTOM
        xAxis.setDrawGridLines(false)
        xAxis.valueFormatter = IndexAxisValueFormatter(chartData.labels)
        xAxis.labelRotationAngle = 45f
        
        // Configure Y-axis
        val leftAxis = chart.axisLeft
        leftAxis.setDrawGridLines(true)
        leftAxis.axisMinimum = 0f
        
        val rightAxis = chart.axisRight
        rightAxis.isEnabled = false
        
        // Create data sets
        val dataSets = mutableListOf<IBarDataSet>()
        chartData.datasets.forEach { dataset ->
            val entries = dataset.data.mapIndexed { index, value ->
                BarEntry(index.toFloat(), value.toFloat())
            }
            
            val barDataSet = BarDataSet(entries, dataset.label)
            barDataSet.color = parseColor(dataset.backgroundColor ?: "#4CAF50")
            barDataSet.setDrawValues(true)
            
            dataSets.add(barDataSet)
        }
        
        // Set data
        val barData = BarData(dataSets)
        chart.data = barData
        
        // Animate chart
        chart.animateY(1000)
        
        return chart
    }
    
    /**
     * Create a line chart
     */
    private fun createLineChart(chartData: ChartData): LineChart {
        val chart = LineChart(context)
        chart.layoutParams = LinearLayout.LayoutParams(
            ViewGroup.LayoutParams.MATCH_PARENT,
            ViewGroup.LayoutParams.MATCH_PARENT
        )
        
        // Configure chart
        chart.description.isEnabled = false
        chart.legend.isEnabled = chartData.options.plugins.legend.display
        chart.setDrawGridBackground(false)
        chart.setTouchEnabled(true)
        chart.isDragEnabled = true
        chart.setScaleEnabled(true)
        chart.setPinchZoom(true)
        
        // Configure X-axis
        val xAxis = chart.xAxis
        xAxis.position = XAxis.XAxisPosition.BOTTOM
        xAxis.setDrawGridLines(false)
        xAxis.valueFormatter = IndexAxisValueFormatter(chartData.labels)
        
        // Configure Y-axis
        val leftAxis = chart.axisLeft
        leftAxis.setDrawGridLines(true)
        leftAxis.axisMinimum = 0f
        
        val rightAxis = chart.axisRight
        rightAxis.isEnabled = false
        
        // Create data sets
        val dataSets = mutableListOf<ILineDataSet>()
        chartData.datasets.forEach { dataset ->
            val entries = dataset.data.mapIndexed { index, value ->
                com.github.mikephil.charting.data.Entry(index.toFloat(), value.toFloat())
            }
            
            val lineDataSet = LineDataSet(entries, dataset.label)
            lineDataSet.color = parseColor(dataset.backgroundColor ?: "#4CAF50")
            lineDataSet.setDrawCircles(true)
            lineDataSet.setDrawValues(true)
            lineDataSet.mode = LineDataSet.Mode.CUBIC_BEZIER
            
            dataSets.add(lineDataSet)
        }
        
        // Set data
        val lineData = LineData(dataSets)
        chart.data = lineData
        
        // Animate chart
        chart.animateX(1000)
        
        return chart
    }
    
    /**
     * Create a pie chart
     */
    private fun createPieChart(chartData: ChartData): PieChart {
        val chart = PieChart(context)
        chart.layoutParams = LinearLayout.LayoutParams(
            ViewGroup.LayoutParams.MATCH_PARENT,
            ViewGroup.LayoutParams.MATCH_PARENT
        )
        
        // Configure chart
        chart.description.isEnabled = false
        chart.legend.isEnabled = chartData.options.plugins.legend.display
        chart.setDrawHoleEnabled(true)
        chart.holeRadius = 58f
        chart.transparentCircleRadius = 61f
        chart.setDrawCenterText(true)
        chart.centerText = chartData.options.plugins.title.text
        
        // Create data entries
        val entries = chartData.datasets.first().data.mapIndexed { index, value ->
            PieEntry(value.toFloat(), chartData.labels[index])
        }
        
        // Create data set
        val dataSet = PieDataSet(entries, "")
        dataSet.colors = chartData.datasets.first().backgroundColor?.map { parseColor(it) } ?: 
                        listOf(Color.parseColor("#4CAF50"), Color.parseColor("#2196F3"), 
                               Color.parseColor("#FF9800"), Color.parseColor("#E91E63"),
                               Color.parseColor("#9C27B0"), Color.parseColor("#00BCD4"))
        
        // Set data
        val pieData = PieData(dataSet)
        pieData.setValueTextSize(11f)
        pieData.setValueTextColor(Color.WHITE)
        
        chart.data = pieData
        
        // Animate chart
        chart.animateY(1000)
        
        return chart
    }
    
    /**
     * Create a doughnut chart
     */
    private fun createDoughnutChart(chartData: ChartData): PieChart {
        val chart = createPieChart(chartData)
        chart.holeRadius = 70f
        chart.transparentCircleRadius = 75f
        return chart
    }
    
    /**
     * Create a radar chart
     */
    private fun createRadarChart(chartData: ChartData): RadarChart {
        val chart = RadarChart(context)
        chart.layoutParams = LinearLayout.LayoutParams(
            ViewGroup.LayoutParams.MATCH_PARENT,
            ViewGroup.LayoutParams.MATCH_PARENT
        )
        
        // Configure chart
        chart.description.isEnabled = false
        chart.legend.isEnabled = chartData.options.plugins.legend.display
        chart.setDrawWeb(true)
        chart.webLineWidth = 1f
        chart.webColor = Color.LTGRAY
        chart.webColorInner = Color.LTGRAY
        chart.webAlpha = 150
        
        // Configure Y-axis
        val yAxis = chart.yAxis
        yAxis.axisMinimum = 0f
        yAxis.axisMaximum = chartData.datasets.first().data.maxOrNull()?.toFloat()?.times(1.2f) ?: 100f
        
        // Configure X-axis
        val xAxis = chart.xAxis
        xAxis.valueFormatter = IndexAxisValueFormatter(chartData.labels)
        
        // Create data entries
        val entries = chartData.datasets.first().data.mapIndexed { index, value ->
            com.github.mikephil.charting.data.RadarEntry(value.toFloat())
        }
        
        // Create data set
        val dataSet = RadarDataSet(entries, chartData.datasets.first().label)
        dataSet.color = parseColor(chartData.datasets.first().backgroundColor?.firstOrNull() ?: "#4CAF50")
        dataSet.fillColor = parseColor(chartData.datasets.first().backgroundColor?.firstOrNull() ?: "#4CAF50")
        dataSet.fillAlpha = 180
        dataSet.lineWidth = 2f
        dataSet.isDrawFilled = true
        
        // Set data
        val radarData = RadarData(dataSet)
        chart.data = radarData
        
        // Animate chart
        chart.animateXY(1000, 1000)
        
        return chart
    }
    
    /**
     * Create a scatter chart
     */
    private fun createScatterChart(chartData: ChartData): ScatterChart {
        val chart = ScatterChart(context)
        chart.layoutParams = LinearLayout.LayoutParams(
            ViewGroup.LayoutParams.MATCH_PARENT,
            ViewGroup.LayoutParams.MATCH_PARENT
        )
        
        // Configure chart
        chart.description.isEnabled = false
        chart.legend.isEnabled = chartData.options.plugins.legend.display
        chart.setDrawGridBackground(false)
        
        // Configure axes
        val xAxis = chart.xAxis
        xAxis.setDrawGridLines(false)
        xAxis.valueFormatter = IndexAxisValueFormatter(chartData.labels)
        
        val leftAxis = chart.axisLeft
        leftAxis.setDrawGridLines(true)
        
        val rightAxis = chart.axisRight
        rightAxis.isEnabled = false
        
        // Create data entries
        val entries = chartData.datasets.first().data.mapIndexed { index, value ->
            com.github.mikephil.charting.data.Entry(index.toFloat(), value.toFloat())
        }
        
        // Create data set
        val dataSet = ScatterDataSet(entries, chartData.datasets.first().label)
        dataSet.color = parseColor(chartData.datasets.first().backgroundColor?.firstOrNull() ?: "#4CAF50")
        dataSet.scatterShapeSize = 10f
        
        // Set data
        val scatterData = ScatterData(dataSet)
        chart.data = scatterData
        
        // Animate chart
        chart.animateY(1000)
        
        return chart
    }
    
    /**
     * Create a bubble chart
     */
    private fun createBubbleChart(chartData: ChartData): BubbleChart {
        val chart = BubbleChart(context)
        chart.layoutParams = LinearLayout.LayoutParams(
            ViewGroup.LayoutParams.MATCH_PARENT,
            ViewGroup.LayoutParams.MATCH_PARENT
        )
        
        // Configure chart
        chart.description.isEnabled = false
        chart.legend.isEnabled = chartData.options.plugins.legend.display
        chart.setDrawGridBackground(false)
        
        // Configure axes
        val xAxis = chart.xAxis
        xAxis.setDrawGridLines(false)
        xAxis.valueFormatter = IndexAxisValueFormatter(chartData.labels)
        
        val leftAxis = chart.axisLeft
        leftAxis.setDrawGridLines(true)
        
        val rightAxis = chart.axisRight
        rightAxis.isEnabled = false
        
        // Create data entries with bubble sizes
        val entries = chartData.datasets.first().data.mapIndexed { index, value ->
            BubbleEntry(index.toFloat(), value.toFloat(), (value * 0.1).toFloat())
        }
        
        // Create data set
        val dataSet = BubbleDataSet(entries, chartData.datasets.first().label)
        dataSet.color = parseColor(chartData.datasets.first().backgroundColor?.firstOrNull() ?: "#4CAF50")
        dataSet.setDrawValues(true)
        
        // Set data
        val bubbleData = BubbleData(dataSet)
        chart.data = bubbleData
        
        // Animate chart
        chart.animateY(1000)
        
        return chart
    }
    
    /**
     * Create a polar area chart (using PieChart as base)
     */
    private fun createPolarAreaChart(chartData: ChartData): PieChart {
        val chart = createPieChart(chartData)
        chart.holeRadius = 0f
        chart.transparentCircleRadius = 0f
        return chart
    }
    
    /**
     * Update existing chart with new data
     */
    fun updateChart(chartId: String, chartData: ChartData) {
        val chart = charts[chartId]
        if (chart != null) {
            // Update chart data based on chart type
            when (chart) {
                is BarChart -> updateBarChart(chart, chartData)
                is LineChart -> updateLineChart(chart, chartData)
                is PieChart -> updatePieChart(chart, chartData)
                is RadarChart -> updateRadarChart(chart, chartData)
                is ScatterChart -> updateScatterChart(chart, chartData)
                is BubbleChart -> updateBubbleChart(chart, chartData)
            }
            
            chart.invalidate()
            println("📊 Android chart updated: $chartId")
        }
    }
    
    /**
     * Destroy a chart
     */
    fun destroyChart(chartId: String) {
        val chart = charts[chartId]
        if (chart != null) {
            chart.clear()
            charts.remove(chartId)
            println("🗑️ Android chart destroyed: $chartId")
        }
    }
    
    /**
     * Render specific chart types
     */
    fun renderProductionChart(
        container: ViewGroup,
        plants: Int,
        flowers: Int,
        trees: Int,
        aquatic: Int,
        livestock: Int,
        pets: Int
    ) {
        val chartData = ChartConfig.createProductionChart(plants, flowers, trees, aquatic, livestock, pets)
        renderChart(container, chartData, ChartType.BAR)
    }
    
    fun renderFinancialChart(
        container: ViewGroup,
        revenue: List<Double>,
        expenses: List<Double>,
        months: List<String>
    ) {
        val chartData = ChartConfig.createFinancialChart(revenue, expenses, months)
        renderChart(container, chartData, ChartType.LINE)
    }
    
    fun renderEfficiencyChart(
        container: ViewGroup,
        efficiency: Double,
        growthRate: Double,
        sustainability: Double
    ) {
        val chartData = ChartConfig.createEfficiencyChart(efficiency, growthRate, sustainability)
        renderChart(container, chartData, ChartType.RADAR)
    }
    
    fun renderEquipmentStatusChart(
        container: ViewGroup,
        operational: Int,
        maintenance: Int,
        offline: Int
    ) {
        val chartData = ChartConfig.createEquipmentStatusChart(operational, maintenance, offline)
        renderChart(container, chartData, ChartType.DOUGHNUT)
    }
    
    // Helper methods for updating charts
    private fun updateBarChart(chart: BarChart, chartData: ChartData) {
        val dataSets = mutableListOf<IBarDataSet>()
        chartData.datasets.forEach { dataset ->
            val entries = dataset.data.mapIndexed { index, value ->
                BarEntry(index.toFloat(), value.toFloat())
            }
            val barDataSet = BarDataSet(entries, dataset.label)
            barDataSet.color = parseColor(dataset.backgroundColor ?: "#4CAF50")
            dataSets.add(barDataSet)
        }
        chart.data = BarData(dataSets)
    }
    
    private fun updateLineChart(chart: LineChart, chartData: ChartData) {
        val dataSets = mutableListOf<ILineDataSet>()
        chartData.datasets.forEach { dataset ->
            val entries = dataset.data.mapIndexed { index, value ->
                com.github.mikephil.charting.data.Entry(index.toFloat(), value.toFloat())
            }
            val lineDataSet = LineDataSet(entries, dataset.label)
            lineDataSet.color = parseColor(dataset.backgroundColor ?: "#4CAF50")
            dataSets.add(lineDataSet)
        }
        chart.data = LineData(dataSets)
    }
    
    private fun updatePieChart(chart: PieChart, chartData: ChartData) {
        val entries = chartData.datasets.first().data.mapIndexed { index, value ->
            PieEntry(value.toFloat(), chartData.labels[index])
        }
        val dataSet = PieDataSet(entries, "")
        dataSet.colors = chartData.datasets.first().backgroundColor?.map { parseColor(it) } ?: 
                        listOf(Color.parseColor("#4CAF50"), Color.parseColor("#2196F3"))
        chart.data = PieData(dataSet)
    }
    
    private fun updateRadarChart(chart: RadarChart, chartData: ChartData) {
        val entries = chartData.datasets.first().data.mapIndexed { index, value ->
            com.github.mikephil.charting.data.RadarEntry(value.toFloat())
        }
        val dataSet = RadarDataSet(entries, chartData.datasets.first().label)
        dataSet.color = parseColor(chartData.datasets.first().backgroundColor?.firstOrNull() ?: "#4CAF50")
        chart.data = RadarData(dataSet)
    }
    
    private fun updateScatterChart(chart: ScatterChart, chartData: ChartData) {
        val entries = chartData.datasets.first().data.mapIndexed { index, value ->
            com.github.mikephil.charting.data.Entry(index.toFloat(), value.toFloat())
        }
        val dataSet = ScatterDataSet(entries, chartData.datasets.first().label)
        dataSet.color = parseColor(chartData.datasets.first().backgroundColor?.firstOrNull() ?: "#4CAF50")
        chart.data = ScatterData(dataSet)
    }
    
    private fun updateBubbleChart(chart: BubbleChart, chartData: ChartData) {
        val entries = chartData.datasets.first().data.mapIndexed { index, value ->
            BubbleEntry(index.toFloat(), value.toFloat(), (value * 0.1).toFloat())
        }
        val dataSet = BubbleDataSet(entries, chartData.datasets.first().label)
        dataSet.color = parseColor(chartData.datasets.first().backgroundColor?.firstOrNull() ?: "#4CAF50")
        chart.data = BubbleData(dataSet)
    }
    
    /**
     * Parse color string to Android color
     */
    private fun parseColor(colorString: String): Int {
        return try {
            Color.parseColor(colorString)
        } catch (e: Exception) {
            Color.parseColor("#4CAF50") // Default green color
        }
    }
}
