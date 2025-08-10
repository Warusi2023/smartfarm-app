package com.example.smartfarm.data.database

import androidx.room.TypeConverter
import com.example.smartfarm.data.model.*
import com.google.gson.Gson
import com.google.gson.reflect.TypeToken
import com.example.smartfarm.data.model.WeatherCondition
import com.example.smartfarm.data.model.FarmingImpact
import com.example.smartfarm.data.model.AlertType
import com.example.smartfarm.data.model.AlertSeverity
import java.text.SimpleDateFormat
import java.util.*

class Converters {
    private val gson = Gson()
    private val dateFormat = SimpleDateFormat("yyyy-MM-dd", Locale.US)
    private val dateTimeFormat = SimpleDateFormat("yyyy-MM-dd HH:mm:ss", Locale.US)

    // Timestamp converters
    @TypeConverter
    fun fromTimestamp(value: Long?): Date? = value?.let { Date(it) }

    @TypeConverter
    fun dateToTimestamp(date: Date?): Long? = date?.time

    @TypeConverter
    fun fromLongTimestamp(value: Long?): String? = value?.let { dateFormat.format(Date(it)) }

    @TypeConverter
    fun stringToLongTimestamp(dateString: String?): Long? = dateString?.let { 
        try {
            dateFormat.parse(it)?.time
        } catch (e: Exception) {
            null
        }
    }

    // PlantCategory
    @TypeConverter
    fun fromPlantCategory(value: PlantCategory): String = value.name

    @TypeConverter
    fun toPlantCategory(value: String): PlantCategory = PlantCategory.valueOf(value)

    // WaterRequirement
    @TypeConverter
    fun fromWaterRequirement(value: WaterRequirement): String = value.name

    @TypeConverter
    fun toWaterRequirement(value: String): WaterRequirement = WaterRequirement.valueOf(value)

    // SunlightRequirement
    @TypeConverter
    fun fromSunlightRequirement(value: SunlightRequirement): String = value.name

    @TypeConverter
    fun toSunlightRequirement(value: String): SunlightRequirement = SunlightRequirement.valueOf(value)

    // SoilType
    @TypeConverter
    fun fromSoilType(value: SoilType): String = value.name

    @TypeConverter
    fun toSoilType(value: String): SoilType = SoilType.valueOf(value)

    // ClimateZone
    @TypeConverter
    fun fromClimateZoneList(value: List<ClimateZone>): String = gson.toJson(value)

    @TypeConverter
    fun toClimateZoneList(value: String): List<ClimateZone> {
        val listType = object : TypeToken<List<ClimateZone>>() {}.type
        return gson.fromJson(value, listType)
    }

    // Season
    @TypeConverter
    fun fromSeasonList(value: List<Season>): String = gson.toJson(value)

    @TypeConverter
    fun toSeasonList(value: String): List<Season> {
        val listType = object : TypeToken<List<Season>>() {}.type
        return gson.fromJson(value, listType)
    }

    // SoilNutrient
    @TypeConverter
    fun fromSoilNutrientList(value: List<SoilNutrient>): String = gson.toJson(value)

    @TypeConverter
    fun toSoilNutrientList(value: String): List<SoilNutrient> {
        val listType = object : TypeToken<List<SoilNutrient>>() {}.type
        return gson.fromJson(value, listType)
    }

    // String lists
    @TypeConverter
    fun fromStringList(value: List<String>): String = gson.toJson(value)

    @TypeConverter
    fun toStringList(value: String): List<String> {
        val listType = object : TypeToken<List<String>>() {}.type
        return gson.fromJson(value, listType)
    }

    // FlowerCategory
    @TypeConverter
    fun fromFlowerCategory(value: FlowerCategory): String = value.name

    @TypeConverter
    fun toFlowerCategory(value: String): FlowerCategory = FlowerCategory.valueOf(value)

    // TreeCategory
    @TypeConverter
    fun fromTreeCategory(value: TreeCategory): String = value.name

    @TypeConverter
    fun toTreeCategory(value: String): TreeCategory = TreeCategory.valueOf(value)

    // GrowthRate
    @TypeConverter
    fun fromGrowthRate(value: GrowthRate): String = value.name

    @TypeConverter
    fun toGrowthRate(value: String): GrowthRate = GrowthRate.valueOf(value)

    // WoodType
    @TypeConverter
    fun fromWoodType(value: WoodType?): String? = value?.name

    @TypeConverter
    fun toWoodType(value: String?): WoodType? = value?.let { WoodType.valueOf(it) }

    // FishCategory
    @TypeConverter
    fun fromFishCategory(value: FishCategory): String = value.name

    @TypeConverter
    fun toFishCategory(value: String): FishCategory = FishCategory.valueOf(value)

    // WaterType
    @TypeConverter
    fun fromWaterType(value: WaterType): String = value.name

    @TypeConverter
    fun toWaterType(value: String): WaterType = WaterType.valueOf(value)

    // FeedingHabits
    @TypeConverter
    fun fromFeedingHabits(value: FeedingHabits): String = value.name

    @TypeConverter
    fun toFeedingHabits(value: String): FeedingHabits = FeedingHabits.valueOf(value)

    // LivestockCategory
    @TypeConverter
    fun fromLivestockCategory(value: LivestockCategory): String = value.name

    @TypeConverter
    fun toLivestockCategory(value: String): LivestockCategory = LivestockCategory.valueOf(value)

    // IrrigationType
    @TypeConverter
    fun fromIrrigationType(value: IrrigationType): String = value.name

    @TypeConverter
    fun toIrrigationType(value: String): IrrigationType = IrrigationType.valueOf(value)

    // FarmType
    @TypeConverter
    fun fromFarmType(value: FarmType): String = value.name

    @TypeConverter
    fun toFarmType(value: String): FarmType = FarmType.valueOf(value)

    // TaskType
    @TypeConverter
    fun fromTaskType(value: TaskType): String = value.name

    @TypeConverter
    fun toTaskType(value: String): TaskType = TaskType.valueOf(value)

    // TaskCategory
    @TypeConverter
    fun fromTaskCategory(value: TaskCategory): String = value.name

    @TypeConverter
    fun toTaskCategory(value: String): TaskCategory = TaskCategory.valueOf(value)

    // Priority
    @TypeConverter
    fun fromPriority(value: Priority): String = value.name

    @TypeConverter
    fun toPriority(value: String): Priority = Priority.valueOf(value)

    // TaskStatus
    @TypeConverter
    fun fromTaskStatus(value: TaskStatus): String = value.name

    @TypeConverter
    fun toTaskStatus(value: String): TaskStatus = TaskStatus.valueOf(value)

    // WeatherCondition
    @TypeConverter
    fun fromWeatherCondition(condition: WeatherCondition): String {
        return condition.name
    }

    @TypeConverter
    fun toWeatherCondition(condition: String): WeatherCondition {
        return WeatherCondition.valueOf(condition)
    }

    // RecurrencePattern
    @TypeConverter
    fun fromRecurrencePattern(value: RecurrencePattern?): String? = value?.name

    @TypeConverter
    fun toRecurrencePattern(value: String?): RecurrencePattern? = value?.let { RecurrencePattern.valueOf(it) }

    // PestCategory
    @TypeConverter
    fun fromPestCategory(value: PestCategory): String = value.name

    @TypeConverter
    fun toPestCategory(value: String): PestCategory = PestCategory.valueOf(value)

    // ControlMethod
    @TypeConverter
    fun fromControlMethodList(value: List<ControlMethod>): String = gson.toJson(value)

    @TypeConverter
    fun toControlMethodList(value: String): List<ControlMethod> {
        val listType = object : TypeToken<List<ControlMethod>>() {}.type
        return gson.fromJson(value, listType)
    }

    // Severity
    @TypeConverter
    fun fromSeverity(value: Severity): String = value.name

    @TypeConverter
    fun toSeverity(value: String): Severity = Severity.valueOf(value)

    // ChemicalControl
    @TypeConverter
    fun fromChemicalControlList(value: List<ChemicalControl>): String = gson.toJson(value)

    @TypeConverter
    fun toChemicalControlList(value: String): List<ChemicalControl> {
        val listType = object : TypeToken<List<ChemicalControl>>() {}.type
        return gson.fromJson(value, listType)
    }

    // FarmingImpact
    @TypeConverter
    fun fromFarmingImpact(impact: FarmingImpact): String {
        return impact.name
    }

    @TypeConverter
    fun toFarmingImpact(impact: String): FarmingImpact {
        return FarmingImpact.valueOf(impact)
    }

    // AlertType
    @TypeConverter
    fun fromAlertType(type: AlertType): String {
        return type.name
    }

    @TypeConverter
    fun toAlertType(type: String): AlertType {
        return AlertType.valueOf(type)
    }

    // AlertSeverity
    @TypeConverter
    fun fromAlertSeverity(severity: AlertSeverity): String {
        return severity.name
    }

    @TypeConverter
    fun toAlertSeverity(severity: String): AlertSeverity {
        return AlertSeverity.valueOf(severity)
    }

    // NotificationType
    @TypeConverter
    fun fromNotificationType(value: NotificationType): String = value.name

    @TypeConverter
    fun toNotificationType(value: String): NotificationType = NotificationType.valueOf(value)

    // FarmLocation
    @TypeConverter
    fun fromFarmLocation(value: FarmLocation): String = gson.toJson(value)

    @TypeConverter
    fun toFarmLocation(value: String): FarmLocation = gson.fromJson(value, FarmLocation::class.java)

    // Temperature
    @TypeConverter
    fun fromTemperature(value: Temperature): String = gson.toJson(value)

    @TypeConverter
    fun toTemperature(value: String): Temperature = gson.fromJson(value, Temperature::class.java)

    // WeatherCondition List
    @TypeConverter
    fun fromWeatherConditionList(value: List<WeatherCondition>): String = gson.toJson(value)

    @TypeConverter
    fun toWeatherConditionList(value: String): List<WeatherCondition> {
        val listType = object : TypeToken<List<WeatherCondition>>() {}.type
        return gson.fromJson(value, listType)
    }

    // ActivityType
    @TypeConverter
    fun fromActivityType(value: ActivityType): String = value.name

    @TypeConverter
    fun toActivityType(value: String): ActivityType = ActivityType.valueOf(value)

    // Recurrence
    @TypeConverter
    fun fromRecurrence(value: Recurrence?): String? = value?.let { gson.toJson(it) }

    @TypeConverter
    fun toRecurrence(value: String?): Recurrence? = value?.let { gson.fromJson(it, Recurrence::class.java) }

    // RecurrenceFrequency
    @TypeConverter
    fun fromRecurrenceFrequency(value: RecurrenceFrequency): String = value.name

    @TypeConverter
    fun toRecurrenceFrequency(value: String): RecurrenceFrequency = RecurrenceFrequency.valueOf(value)

    // UserPreferences
    @TypeConverter
    fun fromUserPreferences(value: UserPreferences): String = gson.toJson(value)

    @TypeConverter
    fun toUserPreferences(value: String): UserPreferences = gson.fromJson(value, UserPreferences::class.java)
} 