package com.yourcompany.smartfarm.shared

import com.yourcompany.smartfarm.shared.config.ApiConfig
import com.yourcompany.smartfarm.shared.config.CategoryConfig
import com.yourcompany.smartfarm.shared.services.ServiceFactory
import kotlin.test.Test
import kotlin.test.assertTrue
import kotlin.test.assertEquals
import kotlin.test.assertNotNull

/**
 * Comprehensive test suite for SmartFarm configuration and services
 */
class ConfigurationTest {
    
    @Test
    fun testApiConfigEnvironments() {
        // Test environment switching
        assertEquals("PRODUCTION", ApiConfig.currentEnvironment.name)
        assertTrue(ApiConfig.baseUrl.contains("api.smartfarm.com"))
        
        // Test endpoints
        assertEquals("/farms", ApiConfig.Endpoints.FARMS)
        assertEquals("/crops", ApiConfig.Endpoints.CROPS)
        assertEquals("/livestock", ApiConfig.Endpoints.LIVESTOCK)
        assertEquals("/tasks", ApiConfig.Endpoints.TASKS)
        assertEquals("/users", ApiConfig.Endpoints.USERS)
        assertEquals("/inventory", ApiConfig.Endpoints.INVENTORY)
        assertEquals("/financial", ApiConfig.Endpoints.FINANCIAL)
        assertEquals("/analytics", ApiConfig.Endpoints.ANALYTICS)
        assertEquals("/health", ApiConfig.Endpoints.HEALTH)
    }
    
    @Test
    fun testApiConfigSettings() {
        // Test API settings
        assertEquals(30L, ApiConfig.Settings.TIMEOUT_SECONDS)
        assertEquals(3, ApiConfig.Settings.RETRY_ATTEMPTS)
        assertEquals(5L, ApiConfig.Settings.CACHE_DURATION_MINUTES)
        assertEquals("application/json", ApiConfig.Settings.CONTENT_TYPE)
        assertEquals("application/json", ApiConfig.Settings.ACCEPT)
        assertEquals("SmartFarm-Mobile/1.0.0", ApiConfig.Settings.USER_AGENT)
    }
    
    @Test
    fun testApiConfigFeatures() {
        // Test feature flags
        assertTrue(ApiConfig.Features.ENABLE_CACHING)
        assertTrue(ApiConfig.Features.ENABLE_OFFLINE_MODE)
        assertTrue(ApiConfig.Features.ENABLE_REAL_TIME_UPDATES)
        assertTrue(ApiConfig.Features.ENABLE_FILE_UPLOADS)
        assertTrue(ApiConfig.Features.ENABLE_PUSH_NOTIFICATIONS)
    }
    
    @Test
    fun testApiConfigDebugInfo() {
        val debugInfo = ApiConfig.getDebugInfo()
        assertNotNull(debugInfo["Environment"])
        assertNotNull(debugInfo["Base URL"])
        assertNotNull(debugInfo["Timeout"])
        assertNotNull(debugInfo["Retry Attempts"])
        assertNotNull(debugInfo["Caching Enabled"])
        assertNotNull(debugInfo["Offline Mode"])
    }
    
    @Test
    fun testServiceFactoryTypes() {
        // Test service types
        assertEquals("REAL_API", ServiceFactory.currentServiceType.name)
        
        // Test service creation
        val dataService = ServiceFactory.getDataService()
        assertNotNull(dataService)
        
        val webSocketService = ServiceFactory.getWebSocketService()
        assertNotNull(webSocketService)
        
        val cacheService = ServiceFactory.getCacheService()
        assertNotNull(cacheService)
        
        val fileUploadService = ServiceFactory.getFileUploadService()
        assertNotNull(fileUploadService)
    }
    
    @Test
    fun testServiceFactoryInfo() {
        val serviceInfo = ServiceFactory.getServiceInfo()
        assertNotNull(serviceInfo["Service Type"])
        assertNotNull(serviceInfo["Data Source"])
        assertNotNull(serviceInfo["Environment"])
        assertNotNull(serviceInfo["Base URL"])
    }
    
    @Test
    fun testCategoryConfigCrops() {
        // Test crop categories
        val cropCategories = CategoryConfig.getAllCropCategories()
        assertTrue(cropCategories.containsKey("Grains"))
        assertTrue(cropCategories.containsKey("Legumes"))
        assertTrue(cropCategories.containsKey("Vegetables"))
        assertTrue(cropCategories.containsKey("Fruits"))
        assertTrue(cropCategories.containsKey("Herbs"))
        assertTrue(cropCategories.containsKey("Flowers"))
        assertTrue(cropCategories.containsKey("Trees"))
        assertTrue(cropCategories.containsKey("Nuts"))
        assertTrue(cropCategories.containsKey("Roots"))
        assertTrue(cropCategories.containsKey("Leafy Greens"))
        assertTrue(cropCategories.containsKey("Organic"))
        assertTrue(cropCategories.containsKey("Heirloom"))
        assertTrue(cropCategories.containsKey("Hybrid"))
        assertTrue(cropCategories.containsKey("Seasonal"))
        assertTrue(cropCategories.containsKey("Perennial"))
        assertTrue(cropCategories.containsKey("Annual"))
        
        // Test specific crop keywords
        assertTrue(CategoryConfig.Crops.GRAINS.contains("corn"))
        assertTrue(CategoryConfig.Crops.GRAINS.contains("wheat"))
        assertTrue(CategoryConfig.Crops.LEGUMES.contains("soybean"))
        assertTrue(CategoryConfig.Crops.VEGETABLES.contains("tomato"))
        assertTrue(CategoryConfig.Crops.FRUITS.contains("apple"))
        assertTrue(CategoryConfig.Crops.HERBS.contains("basil"))
        assertTrue(CategoryConfig.Crops.FLOWERS.contains("rose"))
        assertTrue(CategoryConfig.Crops.TREES.contains("apple"))
    }
    
    @Test
    fun testCategoryConfigLivestock() {
        // Test livestock categories
        val livestockCategories = CategoryConfig.getAllLivestockCategories()
        assertTrue(livestockCategories.containsKey("Cattle"))
        assertTrue(livestockCategories.containsKey("Poultry"))
        assertTrue(livestockCategories.containsKey("Goats"))
        assertTrue(livestockCategories.containsKey("Horses"))
        assertTrue(livestockCategories.containsKey("Sheep"))
        assertTrue(livestockCategories.containsKey("Pigs"))
        assertTrue(livestockCategories.containsKey("Fish"))
        assertTrue(livestockCategories.containsKey("Bees"))
        assertTrue(livestockCategories.containsKey("Pets"))
        assertTrue(livestockCategories.containsKey("Exotic"))
        assertTrue(livestockCategories.containsKey("Dairy"))
        assertTrue(livestockCategories.containsKey("Meat"))
        assertTrue(livestockCategories.containsKey("Egg Laying"))
        assertTrue(livestockCategories.containsKey("Working"))
        
        // Test specific livestock keywords
        assertTrue(CategoryConfig.Livestock.CATTLE.contains("cow"))
        assertTrue(CategoryConfig.Livestock.POULTRY.contains("chicken"))
        assertTrue(CategoryConfig.Livestock.GOATS.contains("goat"))
        assertTrue(CategoryConfig.Livestock.HORSES.contains("horse"))
        assertTrue(CategoryConfig.Livestock.FISH.contains("fish"))
        assertTrue(CategoryConfig.Livestock.BEES.contains("bee"))
        assertTrue(CategoryConfig.Livestock.PETS.contains("dog"))
    }
    
    @Test
    fun testCategoryConfigEquipment() {
        // Test equipment categories
        val equipmentCategories = CategoryConfig.getAllEquipmentCategories()
        assertTrue(equipmentCategories.containsKey("Tractors"))
        assertTrue(equipmentCategories.containsKey("Irrigation"))
        assertTrue(equipmentCategories.containsKey("Greenhouse"))
        assertTrue(equipmentCategories.containsKey("Tools"))
        assertTrue(equipmentCategories.containsKey("Machinery"))
        assertTrue(equipmentCategories.containsKey("Monitoring"))
        assertTrue(equipmentCategories.containsKey("Storage"))
        assertTrue(equipmentCategories.containsKey("Transport"))
        assertTrue(equipmentCategories.containsKey("Automation"))
        assertTrue(equipmentCategories.containsKey("Solar"))
        assertTrue(equipmentCategories.containsKey("Precision"))
        
        // Test specific equipment keywords
        assertTrue(CategoryConfig.Equipment.TRACTORS.contains("tractor"))
        assertTrue(CategoryConfig.Equipment.IRRIGATION.contains("irrigation"))
        assertTrue(CategoryConfig.Equipment.GREENHOUSE.contains("greenhouse"))
        assertTrue(CategoryConfig.Equipment.TOOLS.contains("shovel"))
        assertTrue(CategoryConfig.Equipment.MONITORING.contains("sensor"))
    }
    
    @Test
    fun testCategoryConfigTasks() {
        // Test task categories
        assertTrue(CategoryConfig.Tasks.PLANTING.contains("planting"))
        assertTrue(CategoryConfig.Tasks.HARVESTING.contains("harvesting"))
        assertTrue(CategoryConfig.Tasks.MAINTENANCE.contains("maintenance"))
        assertTrue(CategoryConfig.Tasks.FEEDING.contains("feeding"))
        assertTrue(CategoryConfig.Tasks.HEALTH.contains("health"))
        assertTrue(CategoryConfig.Tasks.MONITORING.contains("monitoring"))
        assertTrue(CategoryConfig.Tasks.MARKETING.contains("marketing"))
        assertTrue(CategoryConfig.Tasks.ADMINISTRATION.contains("administration"))
        assertTrue(CategoryConfig.Tasks.SUSTAINABILITY.contains("sustainability"))
        assertTrue(CategoryConfig.Tasks.RESEARCH.contains("research"))
        assertTrue(CategoryConfig.Tasks.TRAINING.contains("training"))
    }
    
    @Test
    fun testCategoryConfigFinancial() {
        // Test financial categories
        assertTrue(CategoryConfig.Financial.INCOME.contains("income"))
        assertTrue(CategoryConfig.Financial.EXPENSES.contains("expenses"))
        assertTrue(CategoryConfig.Financial.INVESTMENTS.contains("investment"))
        assertTrue(CategoryConfig.Financial.LOANS.contains("loan"))
        assertTrue(CategoryConfig.Financial.GRANTS.contains("grant"))
        assertTrue(CategoryConfig.Financial.INSURANCE.contains("insurance"))
        assertTrue(CategoryConfig.Financial.SUSTAINABILITY_FUNDS.contains("sustainability"))
        assertTrue(CategoryConfig.Financial.RESEARCH_FUNDS.contains("research"))
        assertTrue(CategoryConfig.Financial.EDUCATION_FUNDS.contains("education"))
    }
    
    @Test
    fun testCustomCategoryOperations() {
        // Test adding custom categories
        CategoryConfig.addCustomCategory(
            type = "Test",
            name = "Test Category",
            keywords = listOf("test", "demo", "example")
        )
        
        // Test removing custom categories
        CategoryConfig.removeCustomCategory(
            type = "Test",
            name = "Test Category"
        )
        
        // These operations should complete without errors
        assertTrue(true)
    }
}
