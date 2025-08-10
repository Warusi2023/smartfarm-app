/*
package com.example.smartfarm.util

// Temporarily commented out to fix build issues
// This class will be re-implemented after basic build is working

/*
import android.content.Context
import android.net.Uri
import com.example.smartfarm.data.database.AppDatabase
import com.example.smartfarm.data.model.*
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import java.io.File
import java.io.FileWriter
import java.text.SimpleDateFormat
import java.util.*
import java.util.zip.ZipEntry
import java.util.zip.ZipOutputStream
import android.util.Log

/**
 * Comprehensive data export manager supporting multiple formats
 */
class DataExportManager(
    private val context: Context,
    private val database: FarmDatabase
) {
    
    companion object {
        private const val TAG = "DataExportManager"
        private const val EXPORT_DIR = "exports"
        private const val DATE_FORMAT = "yyyy-MM-dd_HH-mm-ss"
    }
    
    /**
     * Export data in the specified format
     */
    suspend fun exportData(
        format: ExportFormat,
        dataTypes: List<ExportDataType> = ExportDataType.values().toList(),
        dateRange: DateRange? = null,
        includeMetadata: Boolean = true
    ): ExportResult {
        return withContext(Dispatchers.IO) {
            try {
                val timestamp = SimpleDateFormat(DATE_FORMAT, Locale.getDefault()).format(Date())
                val exportDir = createExportDirectory()
                
                when (format) {
                    ExportFormat.CSV -> exportToCSV(dataTypes, dateRange, includeMetadata, timestamp, exportDir)
                    ExportFormat.EXCEL -> exportToExcel(dataTypes, dateRange, includeMetadata, timestamp, exportDir)
                    ExportFormat.PDF -> exportToPDF(dataTypes, dateRange, includeMetadata, timestamp, exportDir)
                    ExportFormat.JSON -> exportToJSON(dataTypes, dateRange, includeMetadata, timestamp, exportDir)
                }
                
                ExportResult.Success(exportDir.absolutePath)
                
            } catch (e: Exception) {
                Log.e(TAG, "Export failed", e)
                ExportResult.Error("Export failed: ${e.message}")
            }
        }
    }
    
    /**
     * Export to CSV format
     */
    private suspend fun exportToCSV(
        dataTypes: List<ExportDataType>,
        dateRange: DateRange?,
        includeMetadata: Boolean,
        timestamp: String,
        exportDir: File
    ) {
        val csvFiles = mutableListOf<File>()
        
        dataTypes.forEach { dataType ->
            val fileName = "${dataType.name.lowercase()}_$timestamp.csv"
            val file = File(exportDir, fileName)
            
            val csvData = when (dataType) {
                ExportDataType.LIVESTOCK -> exportLivestockToCSV(dateRange)
                ExportDataType.CROPS -> exportCropsToCSV(dateRange)
                ExportDataType.ACTIVITIES -> exportActivitiesToCSV(dateRange)
                ExportDataType.WEATHER -> exportWeatherToCSV(dateRange)
                ExportDataType.FINANCIAL -> exportFinancialToCSV(dateRange)
                ExportDataType.HEALTH_RECORDS -> exportHealthRecordsToCSV(dateRange)
                ExportDataType.USERS -> exportUsersToCSV()
                ExportDataType.FARMS -> exportFarmsToCSV()
            }
            
            FileWriter(file).use { writer ->
                writer.write(csvData)
            }
            
            csvFiles.add(file)
        }
        
        // Create metadata file if requested
        if (includeMetadata) {
            val metadataFile = File(exportDir, "metadata_$timestamp.csv")
            FileWriter(metadataFile).use { writer ->
                writer.write(generateMetadataCSV(dataTypes, dateRange))
            }
            csvFiles.add(metadataFile)
        }
        
        // Create zip file if multiple files
        if (csvFiles.size > 1) {
            val zipFile = File(exportDir, "smartfarm_export_$timestamp.zip")
            createZipFile(csvFiles, zipFile)
        }
    }
    
    /**
     * Export to Excel format
     */
    private suspend fun exportToExcel(
        dataTypes: List<ExportDataType>,
        dateRange: DateRange?,
        includeMetadata: Boolean,
        timestamp: String,
        exportDir: File
    ) {
        // For Excel export, we'll create a comprehensive spreadsheet
        val excelFile = File(exportDir, "smartfarm_export_$timestamp.xlsx")
        
        // Note: In a real implementation, you would use a library like Apache POI
        // For now, we'll create a CSV file with .xlsx extension as a placeholder
        val excelData = buildString {
            dataTypes.forEach { dataType ->
                appendLine("=== ${dataType.displayName} ===")
                appendLine()
                
                val csvData = when (dataType) {
                    ExportDataType.LIVESTOCK -> exportLivestockToCSV(dateRange)
                    ExportDataType.CROPS -> exportCropsToCSV(dateRange)
                    ExportDataType.ACTIVITIES -> exportActivitiesToCSV(dateRange)
                    ExportDataType.WEATHER -> exportWeatherToCSV(dateRange)
                    ExportDataType.FINANCIAL -> exportFinancialToCSV(dateRange)
                    ExportDataType.HEALTH_RECORDS -> exportHealthRecordsToCSV(dateRange)
                    ExportDataType.USERS -> exportUsersToCSV()
                    ExportDataType.FARMS -> exportFarmsToCSV()
                }
                
                append(csvData)
                appendLine()
                appendLine()
            }
            
            if (includeMetadata) {
                appendLine("=== METADATA ===")
                appendLine()
                append(generateMetadataCSV(dataTypes, dateRange))
            }
        }
        
        FileWriter(excelFile).use { writer ->
            writer.write(excelData)
        }
    }
    
    /**
     * Export to PDF format
     */
    private suspend fun exportToPDF(
        dataTypes: List<ExportDataType>,
        dateRange: DateRange?,
        includeMetadata: Boolean,
        timestamp: String,
        exportDir: File
    ) {
        val pdfFile = File(exportDir, "smartfarm_report_$timestamp.pdf")
        
        // Note: In a real implementation, you would use a library like iText or PDFBox
        // For now, we'll create a text file with .pdf extension as a placeholder
        val pdfContent = buildString {
            appendLine("SMARTFARM DATA EXPORT REPORT")
            appendLine("Generated: $timestamp")
            appendLine("=" * 50)
            appendLine()
            
            dataTypes.forEach { dataType ->
                appendLine("SECTION: ${dataType.displayName}")
                appendLine("-" * 30)
                appendLine()
                
                val summary = when (dataType) {
                    ExportDataType.LIVESTOCK -> getLivestockSummary(dateRange)
                    ExportDataType.CROPS -> getCropsSummary(dateRange)
                    ExportDataType.ACTIVITIES -> getActivitiesSummary(dateRange)
                    ExportDataType.WEATHER -> getWeatherSummary(dateRange)
                    ExportDataType.FINANCIAL -> getFinancialSummary(dateRange)
                    ExportDataType.HEALTH_RECORDS -> getHealthRecordsSummary(dateRange)
                    ExportDataType.USERS -> getUsersSummary()
                    ExportDataType.FARMS -> getFarmsSummary()
                }
                
                appendLine(summary)
                appendLine()
            }
            
            if (includeMetadata) {
                appendLine("METADATA")
                appendLine("-" * 30)
                appendLine()
                appendLine("Export Date: $timestamp")
                appendLine("Data Types: ${dataTypes.joinToString(", ") { it.displayName }}")
                appendLine("Date Range: ${dateRange?.toString() ?: "All data"}")
                appendLine("Total Records: ${getTotalRecordCount(dataTypes)}")
            }
        }
        
        FileWriter(pdfFile).use { writer ->
            writer.write(pdfContent)
        }
    }
    
    /**
     * Export to JSON format
     */
    private suspend fun exportToJSON(
        dataTypes: List<ExportDataType>,
        dateRange: DateRange?,
        includeMetadata: Boolean,
        timestamp: String,
        exportDir: File
    ) {
        val jsonFile = File(exportDir, "smartfarm_data_$timestamp.json")
        
        val jsonData = buildString {
            appendLine("{")
            appendLine("  \"metadata\": {")
            appendLine("    \"exportDate\": \"$timestamp\",")
            appendLine("    \"dataTypes\": [${dataTypes.joinToString(", ") { "\"${it.name}\"" }}],")
            appendLine("    \"dateRange\": ${dateRange?.toJson() ?: "null"},")
            appendLine("    \"totalRecords\": ${getTotalRecordCount(dataTypes)}")
            appendLine("  },")
            appendLine("  \"data\": {")
            
            dataTypes.forEachIndexed { index, dataType ->
                appendLine("    \"${dataType.name.lowercase()}\": {")
                
                val data = when (dataType) {
                    ExportDataType.LIVESTOCK -> exportLivestockToJSON(dateRange)
                    ExportDataType.CROPS -> exportCropsToJSON(dateRange)
                    ExportDataType.ACTIVITIES -> exportActivitiesToJSON(dateRange)
                    ExportDataType.WEATHER -> exportWeatherToJSON(dateRange)
                    ExportDataType.FINANCIAL -> exportFinancialToJSON(dateRange)
                    ExportDataType.HEALTH_RECORDS -> exportHealthRecordsToJSON(dateRange)
                    ExportDataType.USERS -> exportUsersToJSON()
                    ExportDataType.FARMS -> exportFarmsToJSON()
                }
                
                append(data)
                appendLine("    }${if (index < dataTypes.size - 1) "," else ""}")
            }
            
            appendLine("  }")
            appendLine("}")
        }
        
        FileWriter(jsonFile).use { writer ->
            writer.write(jsonData)
        }
    }
    
    // CSV Export Methods
    private suspend fun exportLivestockToCSV(dateRange: DateRange?): String {
        val livestock = database.livestockDao().getAllLivestock()
        return buildString {
            appendLine("ID,Name,Type,Breed,HealthStatus,LastHealthCheck,BreedingStatus,NextBreedingDate,LastVaccination")
            livestock.forEach { animal ->
                appendLine("${animal.id},${animal.name},${animal.type},${animal.breed},${animal.healthStatus},${animal.lastHealthCheck},${animal.breedingStatus},${animal.nextBreedingDate},${animal.lastVaccination}")
            }
        }
    }
    
    private suspend fun exportCropsToCSV(dateRange: DateRange?): String {
        val crops = database.cropDao().getAllCrops()
        return buildString {
            appendLine("ID,Name,Type,PlantingDate,HarvestDate,Status,Yield,Notes")
            crops.forEach { crop ->
                appendLine("${crop.id},${crop.name},${crop.type},${crop.plantingDate},${crop.harvestDate},${crop.status},${crop.yield},${crop.notes}")
            }
        }
    }
    
    private suspend fun exportActivitiesToCSV(dateRange: DateRange?): String {
        val activities = database.farmActivityDao().getAllActivities()
        return buildString {
            appendLine("ID,Title,Description,Date,Type,Status")
            activities.forEach { activity ->
                appendLine("${activity.id},${activity.title},${activity.description},${activity.date},${activity.type},${activity.status}")
            }
        }
    }
    
    private suspend fun exportWeatherToCSV(dateRange: DateRange?): String {
        val weather = database.weatherDao().getAllWeatherForecasts().first()
        return buildString {
            appendLine("ID,FarmID,Date,Temperature,Humidity,WindSpeed,WeatherCondition")
            weather.forEach { forecast ->
                appendLine("${forecast.id},${forecast.farmId},${forecast.date},${forecast.temperature.max},${forecast.humidity},${forecast.windSpeed},${forecast.weatherCondition}")
            }
        }
    }
    
    private suspend fun exportFinancialToCSV(dateRange: DateRange?): String {
        // Placeholder for financial data
        return buildString {
            appendLine("ID,Type,Amount,Date,Description")
            appendLine("1,Revenue,1000.00,${System.currentTimeMillis()},Crop Sale")
            appendLine("2,Expense,500.00,${System.currentTimeMillis()},Feed Purchase")
        }
    }
    
    private suspend fun exportHealthRecordsToCSV(dateRange: DateRange?): String {
        val records = database.animalHealthRecordDao().getAllRecords()
        return buildString {
            appendLine("ID,AnimalID,Date,Notes,Treatment,NextCheckup")
            records.forEach { record ->
                appendLine("${record.id},${record.animalId},${record.date},${record.notes},${record.treatment},${record.nextCheckup}")
            }
        }
    }
    
    private suspend fun exportUsersToCSV(): String {
        val users = database.userDao().getAllUsers()
        return buildString {
            appendLine("ID,Username,Email,FirstName,LastName,Role,FarmName,FarmSize,FarmLocation")
            users.forEach { user ->
                appendLine("${user.id},${user.username},${user.email},${user.firstName},${user.lastName},${user.role},${user.farmName},${user.farmSize},${user.farmLocation}")
            }
        }
    }
    
    private suspend fun exportFarmsToCSV(): String {
        val farms = database.farmDao().getAllFarms()
        return buildString {
            appendLine("ID,Name,Location,Size")
            farms.forEach { farm ->
                appendLine("${farm.id},${farm.name},${farm.location},${farm.size}")
            }
        }
    }
    
    // JSON Export Methods
    private suspend fun exportLivestockToJSON(dateRange: DateRange?): String {
        val livestock = database.livestockDao().getAllLivestock()
        return buildString {
            appendLine("      \"records\": [")
            livestock.forEachIndexed { index, animal ->
                appendLine("        {")
                appendLine("          \"id\": ${animal.id},")
                appendLine("          \"name\": \"${animal.name}\",")
                appendLine("          \"type\": \"${animal.type}\",")
                appendLine("          \"breed\": \"${animal.breed}\",")
                appendLine("          \"healthStatus\": \"${animal.healthStatus}\"")
                appendLine("        }${if (index < livestock.size - 1) "," else ""}")
            }
            appendLine("      ]")
        }
    }
    
    private suspend fun exportCropsToJSON(dateRange: DateRange?): String {
        val crops = database.cropDao().getAllCrops()
        return buildString {
            appendLine("      \"records\": [")
            crops.forEachIndexed { index, crop ->
                appendLine("        {")
                appendLine("          \"id\": ${crop.id},")
                appendLine("          \"name\": \"${crop.name}\",")
                appendLine("          \"type\": \"${crop.type}\",")
                appendLine("          \"status\": \"${crop.status}\"")
                appendLine("        }${if (index < crops.size - 1) "," else ""}")
            }
            appendLine("      ]")
        }
    }
    
    private suspend fun exportActivitiesToJSON(dateRange: DateRange?): String {
        val activities = database.farmActivityDao().getAllActivities()
        return buildString {
            appendLine("      \"records\": [")
            activities.forEachIndexed { index, activity ->
                appendLine("        {")
                appendLine("          \"id\": ${activity.id},")
                appendLine("          \"title\": \"${activity.title}\",")
                appendLine("          \"type\": \"${activity.type}\",")
                appendLine("          \"status\": \"${activity.status}\"")
                appendLine("        }${if (index < activities.size - 1) "," else ""}")
            }
            appendLine("      ]")
        }
    }
    
    private suspend fun exportWeatherToJSON(dateRange: DateRange?): String {
        val weather = database.weatherDao().getAllWeatherForecasts().first()
        return buildString {
            appendLine("      \"records\": [")
            weather.forEachIndexed { index, forecast ->
                appendLine("        {")
                appendLine("          \"id\": ${forecast.id},")
                appendLine("          \"farmId\": ${forecast.farmId},")
                appendLine("          \"temperature\": ${forecast.temperature.max},")
                appendLine("          \"humidity\": ${forecast.humidity}")
                appendLine("        }${if (index < weather.size - 1) "," else ""}")
            }
            appendLine("      ]")
        }
    }
    
    private suspend fun exportFinancialToJSON(dateRange: DateRange?): String {
        return """
      "records": [
        {
          "id": 1,
          "type": "Revenue",
          "amount": 1000.00,
          "date": ${System.currentTimeMillis()}
        },
        {
          "id": 2,
          "type": "Expense",
          "amount": 500.00,
          "date": ${System.currentTimeMillis()}
        }
      ]
        """.trimIndent()
    }
    
    private suspend fun exportHealthRecordsToJSON(dateRange: DateRange?): String {
        val records = database.animalHealthRecordDao().getAllRecords()
        return buildString {
            appendLine("      \"records\": [")
            records.forEachIndexed { index, record ->
                appendLine("        {")
                appendLine("          \"id\": ${record.id},")
                appendLine("          \"animalId\": ${record.animalId},")
                appendLine("          \"notes\": \"${record.notes}\",")
                appendLine("          \"treatment\": \"${record.treatment}\"")
                appendLine("        }${if (index < records.size - 1) "," else ""}")
            }
            appendLine("      ]")
        }
    }
    
    private suspend fun exportUsersToJSON(): String {
        val users = database.userDao().getAllUsers()
        return buildString {
            appendLine("      \"records\": [")
            users.forEachIndexed { index, user ->
                appendLine("        {")
                appendLine("          \"id\": ${user.id},")
                appendLine("          \"username\": \"${user.username}\",")
                appendLine("          \"email\": \"${user.email}\",")
                appendLine("          \"farmName\": \"${user.farmName ?: ""}\"")
                appendLine("        }${if (index < users.size - 1) "," else ""}")
            }
            appendLine("      ]")
        }
    }
    
    private suspend fun exportFarmsToJSON(): String {
        val farms = database.farmDao().getAllFarms()
        return buildString {
            appendLine("      \"records\": [")
            farms.forEachIndexed { index, farm ->
                appendLine("        {")
                appendLine("          \"id\": ${farm.id},")
                appendLine("          \"name\": \"${farm.name}\",")
                appendLine("          \"location\": \"${farm.location}\",")
                appendLine("          \"size\": ${farm.size}")
                appendLine("        }${if (index < farms.size - 1) "," else ""}")
            }
            appendLine("      ]")
        }
    }
    
    // Helper Methods
    private fun createExportDirectory(): File {
        val exportDir = File(context.filesDir, EXPORT_DIR)
        if (!exportDir.exists()) {
            exportDir.mkdirs()
        }
        return exportDir
    }
    
    private fun createZipFile(files: List<File>, zipFile: File) {
        ZipOutputStream(zipFile.outputStream()).use { zipOut ->
            files.forEach { file ->
                val entry = ZipEntry(file.name)
                zipOut.putNextEntry(entry)
                file.inputStream().use { input ->
                    input.copyTo(zipOut)
                }
                zipOut.closeEntry()
            }
        }
    }
    
    private fun generateMetadataCSV(dataTypes: List<ExportDataType>, dateRange: DateRange?): String {
        return buildString {
            appendLine("ExportDate,DataTypes,DateRange,TotalRecords")
            appendLine("${SimpleDateFormat(DATE_FORMAT, Locale.getDefault()).format(Date())},${dataTypes.joinToString(";")},${dateRange?.toString() ?: "All"},${getTotalRecordCount(dataTypes)}")
        }
    }
    
    private suspend fun getTotalRecordCount(dataTypes: List<ExportDataType>): Int {
        var total = 0
        dataTypes.forEach { dataType ->
            total += when (dataType) {
                ExportDataType.LIVESTOCK -> database.livestockDao().getAllLivestock().size
                ExportDataType.CROPS -> database.cropDao().getAllCrops().size
                ExportDataType.ACTIVITIES -> database.farmActivityDao().getAllActivities().size
                ExportDataType.WEATHER -> database.weatherDao().getAllWeatherForecasts().first().size
                ExportDataType.FINANCIAL -> 2 // Placeholder
                ExportDataType.HEALTH_RECORDS -> database.animalHealthRecordDao().getAllRecords().size
                ExportDataType.USERS -> database.userDao().getAllUsers().size
                ExportDataType.FARMS -> database.farmDao().getAllFarms().size
            }
        }
        return total
    }
    
    // Summary Methods
    private suspend fun getLivestockSummary(dateRange: DateRange?): String {
        val livestock = database.livestockDao().getAllLivestock()
        return "Total Livestock: ${livestock.size}\nHealthy: ${livestock.count { it.healthStatus == "Healthy" }}\nBreeding: ${livestock.count { it.breedingStatus == "Breeding" }}"
    }
    
    private suspend fun getCropsSummary(dateRange: DateRange?): String {
        val crops = database.cropDao().getAllCrops()
        return "Total Crops: ${crops.size}\nActive: ${crops.count { it.status == "Active" }}\nHarvested: ${crops.count { it.status == "Harvested" }}"
    }
    
    private suspend fun getActivitiesSummary(dateRange: DateRange?): String {
        val activities = database.farmActivityDao().getAllActivities()
        return "Total Activities: ${activities.size}\nCompleted: ${activities.count { it.status == "Completed" }}\nPending: ${activities.count { it.status == "Pending" }}"
    }
    
    private suspend fun getWeatherSummary(dateRange: DateRange?): String {
        val weather = database.weatherDao().getAllWeatherForecasts().first()
        return "Weather Records: ${weather.size}\nLast Update: ${if (weather.isNotEmpty()) SimpleDateFormat("yyyy-MM-dd HH:mm", Locale.getDefault()).format(Date(weather.first().date)) else "N/A"}"
    }
    
    private suspend fun getFinancialSummary(dateRange: DateRange?): String {
        return "Revenue: $1000.00\nExpenses: $500.00\nNet Profit: $500.00"
    }
    
    private suspend fun getHealthRecordsSummary(dateRange: DateRange?): String {
        val records = database.animalHealthRecordDao().getAllRecords()
        return "Health Records: ${records.size}\nRecent Records: ${records.count { it.date > System.currentTimeMillis() - 30 * 24 * 60 * 60 * 1000 }}"
    }
    
    private suspend fun getUsersSummary(): String {
        val users = database.userDao().getAllUsers()
        return "Total Users: ${users.size}\nActive Users: ${users.count { it.isActive }}\nFarmers: ${users.count { it.role == UserRole.FARMER }}"
    }
    
    private suspend fun getFarmsSummary(): String {
        val farms = database.farmDao().getAllFarms()
        return "Total Farms: ${farms.size}\nTotal Area: ${farms.sumOf { it.size }} acres"
    }
}

// Data Classes
enum class ExportDataType(val displayName: String) {
    LIVESTOCK("Livestock"),
    CROPS("Crops"),
    ACTIVITIES("Activities"),
    WEATHER("Weather"),
    FINANCIAL("Financial"),
    HEALTH_RECORDS("Health Records"),
    USERS("Users"),
    FARMS("Farms")
}

data class DateRange(
    val startDate: Long,
    val endDate: Long
) {
    fun toJson(): String {
        return "{\"startDate\": $startDate, \"endDate\": $endDate}"
    }
    
    override fun toString(): String {
        val dateFormat = SimpleDateFormat("yyyy-MM-dd", Locale.getDefault())
        return "${dateFormat.format(Date(startDate))} to ${dateFormat.format(Date(endDate))}"
    }
}

sealed class ExportResult {
    data class Success(val filePath: String) : ExportResult()
    data class Error(val message: String) : ExportResult()
}

// Extension function for string repetition
private operator fun String.times(count: Int): String {
    return this.repeat(count)
}
*/
*/ 