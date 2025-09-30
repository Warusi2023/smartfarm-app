package com.yourcompany.smartfarm.shared.services

import com.yourcompany.smartfarm.shared.models.*
import com.yourcompany.smartfarm.shared.config.CategoryConfig
import com.smartfarm.shared.services.ByproductsService
import com.smartfarm.shared.domain.model.*
import kotlinx.coroutines.delay

open class DataService {
    
    // Mock data - replace with real API calls later
    private val mockFarms = mutableListOf(
        Farm(
            id = 1,
            name = "Green Valley Farm",
            location = Location(
                latitude = 40.7128,
                longitude = -74.0060,
                address = "Springfield, IL"
            ),
            size = 150.0,
            type = FarmType.MIXED,
            status = FarmStatus.ACTIVE,
            ownerId = 1
        ),
        Farm(
            id = 2,
            name = "Sunset Ranch",
            location = Location(
                latitude = 34.0522,
                longitude = -118.2437,
                address = "Austin, TX"
            ),
            size = 200.0,
            type = FarmType.LIVESTOCK,
            status = FarmStatus.ACTIVE,
            ownerId = 1
        )
    )
    
    private val mockCrops = mutableListOf(
        Crop(
            id = 1,
            name = "Corn",
            variety = "Sweet Corn",
            farmId = 1,
            plantedDate = "2024-05-01",
            expectedHarvestDate = "2024-09-01",
            area = 50.0,
            status = CropStatus.GROWING
        ),
        Crop(
            id = 2,
            name = "Wheat",
            variety = "Winter Wheat",
            farmId = 1,
            plantedDate = "2024-10-01",
            expectedHarvestDate = "2025-07-01",
            area = 75.0,
            status = CropStatus.READY_FOR_HARVEST
        ),
        Crop(
            id = 3,
            name = "Rose",
            variety = "Red Rose",
            farmId = 1,
            plantedDate = "2024-03-01",
            expectedHarvestDate = "2024-06-01",
            area = 5.0,
            status = CropStatus.GROWING
        ),
        Crop(
            id = 4,
            name = "Tulip",
            variety = "Yellow Tulip",
            farmId = 1,
            plantedDate = "2024-02-01",
            expectedHarvestDate = "2024-05-01",
            area = 3.0,
            status = CropStatus.GROWING
        ),
        Crop(
            id = 5,
            name = "Apple Tree",
            variety = "Red Delicious",
            farmId = 1,
            plantedDate = "2020-04-01",
            expectedHarvestDate = "2024-09-01",
            area = 10.0,
            status = CropStatus.GROWING
        ),
        Crop(
            id = 6,
            name = "Orange Tree",
            variety = "Navel Orange",
            farmId = 2,
            plantedDate = "2019-03-01",
            expectedHarvestDate = "2024-12-01",
            area = 8.0,
            status = CropStatus.GROWING
        ),
        Crop(
            id = 7,
            name = "Tomato",
            variety = "Cherry Tomato",
            farmId = 1,
            plantedDate = "2024-04-01",
            expectedHarvestDate = "2024-08-01",
            area = 2.0,
            status = CropStatus.GROWING
        ),
        Crop(
            id = 8,
            name = "Lettuce",
            variety = "Romaine",
            farmId = 1,
            plantedDate = "2024-03-15",
            expectedHarvestDate = "2024-06-01",
            area = 1.5,
            status = CropStatus.GROWING
        ),
        Crop(
            id = 9,
            name = "Strawberry",
            variety = "Sweet Strawberry",
            farmId = 1,
            plantedDate = "2024-02-01",
            expectedHarvestDate = "2024-05-01",
            area = 0.5,
            status = CropStatus.GROWING
        ),
        Crop(
            id = 10,
            name = "Herbs Mix",
            variety = "Basil, Mint, Rosemary",
            farmId = 1,
            plantedDate = "2024-03-01",
            expectedHarvestDate = "2024-07-01",
            area = 0.3,
            status = CropStatus.GROWING
        ),
        Crop(
            id = 11,
            name = "Kava",
            variety = "Noble Kava",
            farmId = 1,
            plantedDate = "2022-01-15",
            expectedHarvestDate = "2025-01-15",
            area = 0.2,
            status = CropStatus.GROWING,
            notes = "Traditional Pacific Island medicinal plant, requires 3-year growth cycle"
        )
    )
    
    private val mockLivestock = mutableListOf(
        Livestock(
            id = 1,
            name = "Bessie",
            type = LivestockType.CATTLE,
            breed = "Holstein",
            farmId = 2,
            birthDate = "2022-01-01",
            weight = 650.0,
            status = LivestockStatus.ACTIVE,
            location = "Barn A"
        ),
        Livestock(
            id = 2,
            name = "Daisy",
            type = LivestockType.CATTLE,
            breed = "Jersey",
            farmId = 2,
            birthDate = "2021-01-01",
            weight = 450.0,
            status = LivestockStatus.ACTIVE,
            location = "Barn A"
        ),
        Livestock(
            id = 3,
            name = "Buddy",
            type = LivestockType.OTHER,
            breed = "Golden Retriever",
            farmId = 1,
            birthDate = "2020-06-01",
            weight = 65.0,
            status = LivestockStatus.ACTIVE,
            location = "Farm House"
        ),
        Livestock(
            id = 4,
            name = "Whiskers",
            type = LivestockType.OTHER,
            breed = "Farm Cat",
            farmId = 1,
            birthDate = "2021-03-01",
            weight = 12.0,
            status = LivestockStatus.ACTIVE,
            location = "Farm House"
        ),
        Livestock(
            id = 5,
            name = "Goldie",
            type = LivestockType.FISH,
            breed = "Goldfish",
            farmId = 1,
            birthDate = "2023-01-01",
            weight = 0.5,
            status = LivestockStatus.ACTIVE,
            location = "Pond"
        ),
        Livestock(
            id = 6,
            name = "Clammy",
            type = LivestockType.OTHER,
            breed = "Freshwater Clam",
            farmId = 1,
            birthDate = "2022-08-01",
            weight = 2.0,
            status = LivestockStatus.ACTIVE,
            location = "Pond"
        ),
        Livestock(
            id = 7,
            name = "Honey",
            type = LivestockType.OTHER,
            breed = "Italian Honey Bee",
            farmId = 1,
            birthDate = "2023-04-01",
            weight = 0.1,
            status = LivestockStatus.ACTIVE,
            location = "Beehive A"
        ),
        Livestock(
            id = 8,
            name = "Billy",
            type = LivestockType.GOATS,
            breed = "Nubian Goat",
            farmId = 2,
            birthDate = "2021-06-01",
            weight = 45.0,
            status = LivestockStatus.ACTIVE,
            location = "Goat Pen"
        ),
        Livestock(
            id = 9,
            name = "Cluckers",
            type = LivestockType.POULTRY,
            breed = "Rhode Island Red",
            farmId = 2,
            birthDate = "2022-09-01",
            weight = 2.5,
            status = LivestockStatus.ACTIVE,
            location = "Chicken Coop"
        ),
        Livestock(
            id = 10,
            name = "Thunder",
            type = LivestockType.HORSES,
            breed = "Quarter Horse",
            farmId = 2,
            birthDate = "2020-03-01",
            weight = 450.0,
            status = LivestockStatus.ACTIVE,
            location = "Horse Barn"
        )
    )
    
    private val mockTasks = mutableListOf(
        Task(
            id = 1,
            title = "Harvest Wheat Field",
            description = "Harvest the winter wheat in the north field",
            farmId = 1,
            assignedTo = 2,
            priority = TaskPriority.HIGH,
            status = TaskStatus.PENDING,
            dueDate = getCurrentTimeMillis() + (7L * 24L * 60L * 60L * 1000L), // 7 days from now
            category = TaskCategory.HARVESTING,
            estimatedHours = 8.0
        ),
        Task(
            id = 2,
            title = "Feed Livestock",
            description = "Morning feeding for all cattle",
            farmId = 2,
            assignedTo = 1,
            priority = TaskPriority.MEDIUM,
            status = TaskStatus.COMPLETED,
            dueDate = getCurrentTimeMillis() - (2L * 60L * 60L * 1000L), // 2 hours ago
            category = TaskCategory.LIVESTOCK_CARE,
            estimatedHours = 2.0
        ),
        Task(
            id = 3,
            title = "Tractor Maintenance",
            description = "Regular maintenance check for John Deere tractor",
            farmId = 1,
            assignedTo = 1,
            priority = TaskPriority.HIGH,
            status = TaskStatus.PENDING,
            dueDate = getCurrentTimeMillis() + (3L * 24L * 60L * 60L * 1000L), // 3 days from now
            category = TaskCategory.EQUIPMENT_MAINTENANCE,
            estimatedHours = 4.0
        ),
        Task(
            id = 4,
            title = "Irrigation System Check",
            description = "Inspect and test irrigation system",
            farmId = 1,
            assignedTo = 2,
            priority = TaskPriority.MEDIUM,
            status = TaskStatus.PENDING,
            dueDate = getCurrentTimeMillis() + (5L * 24L * 60L * 60L * 1000L), // 5 days from now
            category = TaskCategory.EQUIPMENT_MAINTENANCE,
            estimatedHours = 3.0
        )
    )
    
    private val mockUsers = mutableListOf(
        User(
            id = 1,
            email = "john.doe@farm.com",
            firstName = "John",
            lastName = "Doe",
            role = UserRole.FARMER,
            farmId = 1
        ),
        User(
            id = 2,
            email = "jane.smith@farm.com",
            firstName = "Jane",
            lastName = "Smith",
            role = UserRole.WORKER,
            farmId = 1
        )
    )
    
    private val mockInventory = mutableListOf(
        InventoryItem(
            id = "inv-1",
            name = "Corn Seeds",
            farmId = "1",
            category = InventoryCategory.SEEDS,
            quantity = 100.0,
            unit = "kg",
            cost = 50.0,
            supplier = "Seed Co"
        ),
        InventoryItem(
            id = "inv-2",
            name = "Fertilizer",
            farmId = "1",
            category = InventoryCategory.FERTILIZER,
            quantity = 500.0,
            unit = "kg",
            cost = 200.0,
            supplier = "Fertilizer Co"
        ),
        InventoryItem(
            id = "inv-3",
            name = "Tractor",
            farmId = "1",
            category = InventoryCategory.EQUIPMENT,
            quantity = 1.0,
            unit = "unit",
            cost = 50000.0,
            supplier = "John Deere"
        ),
        InventoryItem(
            id = "inv-4",
            name = "Irrigation System",
            farmId = "1",
            category = InventoryCategory.EQUIPMENT,
            quantity = 1.0,
            unit = "system",
            cost = 15000.0,
            supplier = "Irrigation Pro"
        ),
        InventoryItem(
            id = "inv-5",
            name = "Harvester",
            farmId = "1",
            category = InventoryCategory.EQUIPMENT,
            quantity = 1.0,
            unit = "unit",
            cost = 75000.0,
            supplier = "Case IH"
        ),
        InventoryItem(
            id = "inv-6",
            name = "Seed Drill",
            farmId = "1",
            category = InventoryCategory.EQUIPMENT,
            quantity = 1.0,
            unit = "unit",
            cost = 12000.0,
            supplier = "Great Plains"
        ),
        InventoryItem(
            id = "inv-7",
            name = "Greenhouse System",
            farmId = "1",
            category = InventoryCategory.EQUIPMENT,
            quantity = 1.0,
            unit = "system",
            cost = 25000.0,
            supplier = "Greenhouse Pro"
        ),
        InventoryItem(
            id = "inv-8",
            name = "Drip Irrigation Kit",
            farmId = "1",
            category = InventoryCategory.EQUIPMENT,
            quantity = 1.0,
            unit = "kit",
            cost = 8000.0,
            supplier = "Irrigation Plus"
        ),
        InventoryItem(
            id = "inv-9",
            name = "Organic Fertilizer",
            farmId = "1",
            category = InventoryCategory.FERTILIZER,
            quantity = 1000.0,
            unit = "kg",
            cost = 800.0,
            supplier = "Organic Farm Supply"
        ),
        InventoryItem(
            id = "inv-10",
            name = "Beehive Equipment",
            farmId = "1",
            category = InventoryCategory.EQUIPMENT,
            quantity = 5.0,
            unit = "units",
            cost = 500.0,
            supplier = "Bee Supply Co"
        ),
        InventoryItem(
            id = "inv-11",
            name = "Chicken Feed",
            farmId = "2",
            category = InventoryCategory.FEED,
            quantity = 500.0,
            unit = "kg",
            cost = 300.0,
            supplier = "Feed & Grain Co"
        ),
        InventoryItem(
            id = "inv-12",
            name = "Veterinary Supplies",
            farmId = "2",
            category = InventoryCategory.MEDICINE,
            quantity = 50.0,
            unit = "units",
            cost = 1200.0,
            supplier = "Vet Supply Pro"
        )
    )
    
    private val mockFinancialRecords = mutableListOf(
        FinancialRecord(
            id = 1,
            farmId = 1,
            type = FinancialType.EXPENSE,
            category = FinancialCategory.SEEDS_AND_PLANTS,
            amount = 2500.0,
            description = "Corn and wheat seeds",
            date = getCurrentTimeMillis() - (90L * 24L * 60L * 60L * 1000L)
        ),
        FinancialRecord(
            id = 2,
            farmId = 1,
            type = FinancialType.INCOME,
            category = FinancialCategory.CROP_SALES,
            amount = 15000.0,
            description = "Soybean harvest sale",
            date = getCurrentTimeMillis() - (30L * 24L * 60L * 60L * 1000L)
        )
    )
    
    // Farm operations
    open suspend fun getFarms(): List<Farm> {
        delay(500) // Simulate network delay
        return mockFarms.toList()
    }
    
    open suspend fun getFarm(id: String): Farm? {
        delay(300)
        return mockFarms.find { it.id.toString() == id }
    }
    
    open suspend fun createFarm(farm: Farm): Farm {
        delay(500)
        val newFarm = farm.copy(id = (mockFarms.maxOfOrNull { it.id } ?: 0) + 1)
        mockFarms.add(newFarm)
        return newFarm
    }
    
    open suspend fun updateFarm(farm: Farm): Farm {
        delay(300)
        val index = mockFarms.indexOfFirst { it.id == farm.id }
        if (index != -1) {
            mockFarms[index] = farm.copy(updatedAt = getCurrentTimeMillis())
            return mockFarms[index]
        }
        return farm
    }
    
    open suspend fun deleteFarm(id: String): Boolean {
        delay(300)
        val index = mockFarms.indexOfFirst { it.id.toString() == id }
        if (index != -1) {
            mockFarms.removeAt(index)
            return true
        }
        return false
    }
    
    // Crop operations
    open suspend fun getCrops(): List<Crop> {
        delay(400)
        return mockCrops.toList()
    }
    
    open suspend fun getCrop(id: String): Crop? {
        delay(300)
        return mockCrops.find { it.id.toString() == id }
    }
    
    open suspend fun createCrop(crop: Crop): Crop {
        delay(500)
        val newCrop = crop.copy(id = (mockCrops.maxOfOrNull { it.id } ?: 0) + 1)
        mockCrops.add(newCrop)
        return newCrop
    }
    
    open suspend fun updateCrop(crop: Crop): Crop {
        delay(300)
        val index = mockCrops.indexOfFirst { it.id == crop.id }
        if (index != -1) {
            mockCrops[index] = crop
            return mockCrops[index]
        }
        return crop
    }
    
    open suspend fun deleteCrop(id: Long): Boolean {
        delay(300)
        val index = mockCrops.indexOfFirst { it.id == id }
        if (index != -1) {
            mockCrops.removeAt(index)
            return true
        }
        return false
    }
    
    open suspend fun addCrop(crop: Crop): Crop {
        delay(500)
        val newCrop = crop.copy(id = (mockCrops.maxOfOrNull { it.id } ?: 0) + 1)
        mockCrops.add(newCrop)
        return newCrop
    }
    
    // Livestock operations
    open suspend fun getLivestock(): List<Livestock> {
        delay(400)
        return mockLivestock.toList()
    }
    
    open suspend fun getLivestockItem(id: String): Livestock? {
        delay(300)
        return mockLivestock.find { it.id.toString() == id }
    }
    
    open suspend fun createLivestock(livestock: Livestock): Livestock {
        delay(500)
        val newLivestock = livestock.copy(id = (mockLivestock.maxOfOrNull { it.id } ?: 0) + 1)
        mockLivestock.add(newLivestock)
        return newLivestock
    }
    
    open suspend fun addLivestock(livestock: Livestock): Livestock {
        delay(500)
        val newLivestock = livestock.copy(id = (mockLivestock.maxOfOrNull { it.id } ?: 0) + 1)
        mockLivestock.add(newLivestock)
        return newLivestock
    }
    
    open suspend fun updateLivestock(livestock: Livestock): Livestock {
        delay(300)
        val index = mockLivestock.indexOfFirst { it.id == livestock.id }
        if (index != -1) {
            mockLivestock[index] = livestock
            return mockLivestock[index]
        }
        return livestock
    }
    
    open suspend fun deleteLivestock(id: Long): Boolean {
        delay(300)
        val index = mockLivestock.indexOfFirst { it.id == id }
        if (index != -1) {
            mockLivestock.removeAt(index)
            return true
        }
        return false
    }
    
    // Task operations
    open suspend fun getTasks(): List<Task> {
        delay(400)
        return mockTasks.toList()
    }
    
    open suspend fun getTask(id: String): Task? {
        delay(300)
        return mockTasks.find { it.id.toString() == id }
    }
    
    open suspend fun createTask(task: Task): Task {
        delay(500)
        val newTask = task.copy(id = (mockTasks.maxOfOrNull { it.id } ?: 0) + 1)
        mockTasks.add(newTask)
        return newTask
    }
    
    open suspend fun updateTask(task: Task): Task {
        delay(300)
        val index = mockTasks.indexOfFirst { it.id == task.id }
        if (index != -1) {
            mockTasks[index] = task
            return mockTasks[index]
        }
        return task
    }
    
    open suspend fun deleteTask(id: String): Boolean {
        delay(300)
        val index = mockTasks.indexOfFirst { it.id.toString() == id }
        if (index != -1) {
            mockTasks.removeAt(index)
            return true
        }
        return false
    }
    
    open suspend fun updateTaskStatus(taskId: Long, status: TaskStatus): Task? {
        delay(300)
        val taskIndex = mockTasks.indexOfFirst { it.id == taskId }
        if (taskIndex != -1) {
            val updatedTask = mockTasks[taskIndex].copy(
                status = status,
                completedDate = if (status == TaskStatus.COMPLETED) getCurrentTimeMillis() else null
            )
            mockTasks[taskIndex] = updatedTask
            return updatedTask
        }
        return null
    }
    
    // User operations
    open suspend fun getUsers(): List<User> {
        delay(400)
        return mockUsers.toList()
    }
    
    open suspend fun getUser(id: String): User? {
        delay(300)
        return mockUsers.find { it.id.toString() == id }
    }
    
    open suspend fun createUser(user: User): User {
        delay(500)
        val newUser = user.copy(id = (mockUsers.maxOfOrNull { it.id } ?: 0) + 1)
        mockUsers.add(newUser)
        return newUser
    }
    
    open suspend fun updateUser(user: User): User {
        delay(300)
        val index = mockUsers.indexOfFirst { it.id == user.id }
        if (index != -1) {
            mockUsers[index] = user
            return mockUsers[index]
        }
        return user
    }
    
    open suspend fun deleteUser(id: String): Boolean {
        delay(300)
        val index = mockUsers.indexOfFirst { it.id.toString() == id }
        if (index != -1) {
            mockUsers.removeAt(index)
            return true
        }
        return false
    }
    
    // Inventory operations
    open suspend fun getInventory(): List<InventoryItem> {
        delay(400)
        return mockInventory.toList()
    }
    
    open suspend fun getInventoryItem(id: String): InventoryItem? {
        delay(300)
        return mockInventory.find { it.id == id }
    }
    
    open suspend fun createInventoryItem(item: InventoryItem): InventoryItem {
        delay(500)
        val newItem = item.copy(id = "inv-${getCurrentTimeMillis()}")
        mockInventory.add(newItem)
        return newItem
    }
    
    open suspend fun updateInventoryItem(item: InventoryItem): InventoryItem {
        delay(300)
        val index = mockInventory.indexOfFirst { it.id == item.id }
        if (index != -1) {
            mockInventory[index] = item.copy(updatedAt = getCurrentTimeMillis())
            return mockInventory[index]
        }
        return item
    }
    
    open suspend fun deleteInventoryItem(id: String): Boolean {
        delay(300)
        val index = mockInventory.indexOfFirst { it.id == id }
        if (index != -1) {
            mockInventory.removeAt(index)
            return true
        }
        return false
    }
    
    // Financial operations
    open suspend fun getFinancialRecords(farmId: Long? = null, type: FinancialType? = null): List<FinancialRecord> {
        delay(400)
        var filteredRecords = if (farmId != null) {
            mockFinancialRecords.filter { it.farmId == farmId }
        } else {
            mockFinancialRecords.toList()
        }
        
        if (type != null) {
            filteredRecords = filteredRecords.filter { it.type == type }
        }
        
        return filteredRecords
    }
    
    open suspend fun addFinancialRecord(record: FinancialRecord): FinancialRecord {
        delay(500)
        val newRecord = record.copy(id = (mockFinancialRecords.maxOfOrNull { it.id } ?: 0) + 1)
        mockFinancialRecords.add(newRecord)
        return newRecord
    }
    
    // Analytics
    open suspend fun getFarmStats(farmId: Long): Map<String, Any> {
        delay(600)
        val crops = mockCrops.filter { it.farmId == farmId }
        val livestock = mockLivestock.filter { it.farmId == farmId }
        val tasks = mockTasks.filter { it.farmId == farmId }
        val finances = mockFinancialRecords.filter { it.farmId == farmId }
        val inventory = mockInventory.filter { it.farmId.toLongOrNull() == farmId }
        
        val totalIncome = finances.filter { it.type == FinancialType.INCOME }.sumOf { it.amount }
        val totalExpenses = finances.filter { it.type == FinancialType.EXPENSE }.sumOf { it.amount }
        val netProfit = totalIncome - totalExpenses
        val profitMargin = if (totalIncome > 0) (netProfit / totalIncome) * 100 else 0.0
        
        // Categorize crops using configurable categories
        val cropCategories = CategoryConfig.getAllCropCategories()
        val plants = crops.filter { crop ->
            cropCategories.values.flatten().any { keyword ->
                crop.name.lowercase().contains(keyword)
            }
        }
        
        // Specific crop categories
        val grains = crops.filter { crop ->
            CategoryConfig.Crops.GRAINS.any { keyword ->
                crop.name.lowercase().contains(keyword)
            }
        }
        val legumes = crops.filter { crop ->
            CategoryConfig.Crops.LEGUMES.any { keyword ->
                crop.name.lowercase().contains(keyword)
            }
        }
        val vegetables = crops.filter { crop ->
            CategoryConfig.Crops.VEGETABLES.any { keyword ->
                crop.name.lowercase().contains(keyword)
            }
        }
        val herbs = crops.filter { crop ->
            CategoryConfig.Crops.HERBS.any { keyword ->
                crop.name.lowercase().contains(keyword)
            }
        }
        val berries = crops.filter { crop ->
            CategoryConfig.Crops.FRUITS.any { keyword ->
                crop.name.lowercase().contains(keyword) && (keyword.contains("berry") || keyword.contains("strawberry") || keyword.contains("blueberry") || keyword.contains("raspberry"))
            }
        }
        val flowers = crops.filter { crop ->
            CategoryConfig.Crops.FLOWERS.any { keyword ->
                crop.name.lowercase().contains(keyword)
            }
        }
        val trees = crops.filter { crop ->
            CategoryConfig.Crops.TREES.any { keyword ->
                crop.name.lowercase().contains(keyword)
            }
        }
        val organicProducts = crops.filter { crop ->
            CategoryConfig.Crops.ORGANIC.any { keyword ->
                crop.name.lowercase().contains(keyword)
            }
        }
        val seasonalCrops = crops.filter { crop ->
            CategoryConfig.Crops.SEASONAL.any { keyword ->
                crop.name.lowercase().contains(keyword)
            }
        }
        val perennialCrops = crops.filter { crop ->
            CategoryConfig.Crops.PERENNIAL.any { keyword ->
                crop.name.lowercase().contains(keyword)
            }
        }
        val annualCrops = crops.filter { crop ->
            CategoryConfig.Crops.ANNUAL.any { keyword ->
                crop.name.lowercase().contains(keyword)
            }
        }
        
        // Categorize livestock using configurable categories
        val livestockCategories = CategoryConfig.getAllLivestockCategories()
        val pets = livestock.filter { animal ->
            CategoryConfig.Livestock.PETS.any { keyword ->
                animal.breed.lowercase().contains(keyword)
            }
        }
        val aquatic = livestock.filter { animal ->
            animal.type == LivestockType.FISH || CategoryConfig.Livestock.FISH.any { keyword ->
                animal.breed.lowercase().contains(keyword)
            }
        }
        val bees = livestock.filter { animal ->
            CategoryConfig.Livestock.BEES.any { keyword ->
                animal.breed.lowercase().contains(keyword)
            }
        }
        val poultry = livestock.filter { animal ->
            animal.type == LivestockType.POULTRY
        }
        val goats = livestock.filter { animal ->
            animal.type == LivestockType.GOATS
        }
        val horses = livestock.filter { animal ->
            animal.type == LivestockType.HORSES
        }
        val cattle = livestock.filter { animal ->
            animal.type == LivestockType.CATTLE
        }
        val sheep = livestock.filter { animal ->
            CategoryConfig.Livestock.SHEEP.any { keyword ->
                animal.breed.lowercase().contains(keyword)
            }
        }
        val pigs = livestock.filter { animal ->
            CategoryConfig.Livestock.PIGS.any { keyword ->
                animal.breed.lowercase().contains(keyword)
            }
        }
        
        // Equipment and maintenance using configurable categories
        val equipmentCategories = CategoryConfig.getAllEquipmentCategories()
        val equipment = inventory.filter { item ->
            item.category == InventoryCategory.EQUIPMENT
        }
        val pendingMaintenance = tasks.filter { task ->
            task.category == TaskCategory.EQUIPMENT_MAINTENANCE && task.status == TaskStatus.PENDING
        }
        val greenhouseEquipment = inventory.filter { item ->
            item.category == InventoryCategory.EQUIPMENT && CategoryConfig.Equipment.GREENHOUSE.any { keyword ->
                item.name.lowercase().contains(keyword)
            }
        }
        val irrigationEquipment = inventory.filter { item ->
            item.category == InventoryCategory.EQUIPMENT && CategoryConfig.Equipment.IRRIGATION.any { keyword ->
                item.name.lowercase().contains(keyword)
            }
        }
        val harvestingEquipment = inventory.filter { item ->
            item.category == InventoryCategory.EQUIPMENT && CategoryConfig.Equipment.TRACTORS.any { keyword ->
                item.name.lowercase().contains(keyword)
            }
        }
        val plantingEquipment = inventory.filter { item ->
            item.category == InventoryCategory.EQUIPMENT && CategoryConfig.Equipment.TRACTORS.any { keyword ->
                item.name.lowercase().contains(keyword)
            }
        }
        
        // Performance metrics
        val efficiency = if (tasks.isNotEmpty()) {
            (tasks.filter { it.status == TaskStatus.COMPLETED }.size.toDouble() / tasks.size) * 100
        } else 0.0
        
        val growthRate = if (crops.isNotEmpty()) {
            crops.filter { it.status == CropStatus.GROWING }.size.toDouble() / crops.size * 100
        } else 0.0
        
        return mapOf(
            // Production categories
            "totalPlants" to plants.size,
            "totalFlowers" to flowers.size,
            "totalTrees" to trees.size,
            "totalVegetables" to vegetables.size,
            "totalHerbs" to herbs.size,
            "totalBerries" to berries.size,
            "totalGrains" to grains.size,
            "totalLegumes" to legumes.size,
            "totalOrganicProducts" to organicProducts.size,
            "totalSeasonalCrops" to seasonalCrops.size,
            "totalPerennialCrops" to perennialCrops.size,
            "totalAnnualCrops" to annualCrops.size,
            "totalAquatic" to aquatic.size,
            "totalLivestock" to livestock.size,
            "totalPets" to pets.size,
            "totalBees" to bees.size,
            "totalPoultry" to poultry.size,
            "totalGoats" to goats.size,
            "totalHorses" to horses.size,
            "totalCattle" to cattle.size,
            "totalSheep" to sheep.size,
            "totalPigs" to pigs.size,
            "totalEquipment" to equipment.size,
            "totalGreenhouseEquipment" to greenhouseEquipment.size,
            "totalIrrigationEquipment" to irrigationEquipment.size,
            "totalHarvestingEquipment" to harvestingEquipment.size,
            "totalPlantingEquipment" to plantingEquipment.size,
            "pendingMaintenance" to pendingMaintenance.size,
            
            // Legacy categories (for backward compatibility)
            "totalCrops" to crops.size,
            "activeCrops" to crops.filter { it.status != CropStatus.HARVESTED && it.status != CropStatus.FAILED }.size,
            "healthyLivestock" to livestock.filter { it.status == LivestockStatus.ACTIVE }.size,
            
            // Task metrics
            "pendingTasks" to tasks.filter { it.status == TaskStatus.PENDING }.size,
            "completedTasks" to tasks.filter { it.status == TaskStatus.COMPLETED }.size,
            
            // Financial metrics
            "totalIncome" to totalIncome,
            "totalExpenses" to totalExpenses,
            "totalRevenue" to totalIncome,
            "netProfit" to netProfit,
            "profitMargin" to profitMargin,
            
            // Performance metrics
            "efficiency" to efficiency,
            "growthRate" to growthRate
        )
    }
    
    // Byproducts operations
    private val byproductsService = ByproductsService()
    
    open suspend fun getCropByproducts(cropName: String): List<Byproduct> {
        delay(400)
        return byproductsService.getCropByproducts(cropName).getOrElse { emptyList() }
    }
    
    open suspend fun getLivestockByproducts(animalType: String): List<Byproduct> {
        delay(400)
        return byproductsService.getLivestockByproducts(animalType).getOrElse { emptyList() }
    }
    
    open suspend fun getAllByproducts(): List<Byproduct> {
        delay(400)
        return byproductsService.getAllByproducts().getOrElse { emptyList() }
    }
    
    open suspend fun getByproductsByCategory(category: String): List<Byproduct> {
        delay(400)
        return byproductsService.getByproductsByCategory(category).getOrElse { emptyList() }
    }
    
    open suspend fun getMarketPrices(): List<MarketPrice> {
        delay(400)
        return byproductsService.getMarketPrices().getOrElse { emptyList() }
    }
    
    open suspend fun getProcessingEquipment(): List<ProcessingEquipment> {
        delay(400)
        return byproductsService.getProcessingEquipment().getOrElse { emptyList() }
    }
    
    open suspend fun getProcessingPlans(): List<ProcessingPlan> {
        delay(400)
        return byproductsService.getProcessingPlans().getOrElse { emptyList() }
    }
    
    open suspend fun createProcessingPlan(plan: ProcessingPlan): ProcessingPlan {
        delay(500)
        return byproductsService.createProcessingPlan(plan).getOrElse { plan }
    }
    
    open suspend fun updateProcessingPlan(planId: String, plan: ProcessingPlan): ProcessingPlan {
        delay(300)
        return byproductsService.updateProcessingPlan(planId, plan).getOrElse { plan }
    }
    
    open suspend fun deleteProcessingPlan(planId: String): Boolean {
        delay(300)
        return byproductsService.deleteProcessingPlan(planId).getOrElse { false }
    }
    
    open suspend fun getSalesRecords(): List<SalesRecord> {
        delay(400)
        return byproductsService.getSalesRecords().getOrElse { emptyList() }
    }
    
    open suspend fun createSalesRecord(record: SalesRecord): SalesRecord {
        delay(500)
        return byproductsService.createSalesRecord(record).getOrElse { record }
    }
    
    open suspend fun getRevenueAnalytics(): Map<String, Any> {
        delay(600)
        return byproductsService.getRevenueAnalytics().getOrElse { emptyMap() }
    }
    
    open suspend fun calculatePotentialRevenue(byproduct: Byproduct, quantity: Double): Double {
        delay(200)
        return byproductsService.calculatePotentialRevenue(byproduct, quantity).getOrElse { 0.0 }
    }
    
    open suspend fun getTopByproductsByRevenue(limit: Int = 5): List<Pair<String, Double>> {
        delay(400)
        return byproductsService.getTopByproductsByRevenue(limit).getOrElse { emptyList() }
    }
}

// Platform-agnostic time function

expect fun getCurrentTimeMillis(): Long
