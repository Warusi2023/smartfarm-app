package com.smartfarm.shared.data

import com.smartfarm.shared.domain.model.*

object ByproductsDatabase {
    
    // Crop Byproducts Database
    val cropByproducts = mapOf(
        "cassava" to listOf(
            Byproduct(
                id = "byp_001",
                name = "Cassava Flour",
                category = "Food Processing",
                description = "High-quality flour for baking and cooking",
                marketValue = 2.50,
                processingMethod = "Drying and grinding",
                equipment = listOf("Drying racks", "Grinding mill"),
                shelfLife = "12 months",
                targetMarket = "Bakeries, restaurants, households",
                sourceType = SourceType.CROP,
                sourceId = "cassava",
                createdAt = "2024-01-01T00:00:00.000Z",
                updatedAt = "2024-01-01T00:00:00.000Z"
            ),
            Byproduct(
                id = "byp_002",
                name = "Cassava Starch",
                category = "Industrial",
                description = "Pure starch for industrial applications",
                marketValue = 3.20,
                processingMethod = "Washing, extraction, drying",
                equipment = listOf("Starch extractor", "Centrifuge", "Dryer"),
                shelfLife = "24 months",
                targetMarket = "Food industry, textile, paper",
                sourceType = SourceType.CROP,
                sourceId = "cassava",
                createdAt = "2024-01-01T00:00:00.000Z",
                updatedAt = "2024-01-01T00:00:00.000Z"
            ),
            Byproduct(
                id = "byp_003",
                name = "Cassava Chips",
                category = "Snack Food",
                description = "Crispy chips for snacking",
                marketValue = 4.00,
                processingMethod = "Slicing, frying, seasoning",
                equipment = listOf("Slicer", "Deep fryer", "Seasoning mixer"),
                shelfLife = "6 months",
                targetMarket = "Retail stores, snack distributors",
                sourceType = SourceType.CROP,
                sourceId = "cassava",
                createdAt = "2024-01-01T00:00:00.000Z",
                updatedAt = "2024-01-01T00:00:00.000Z"
            )
        ),
        "taro" to listOf(
            Byproduct(
                id = "byp_004",
                name = "Taro Flour",
                category = "Food Processing",
                description = "Gluten-free flour alternative",
                marketValue = 3.50,
                processingMethod = "Peeling, drying, grinding",
                equipment = listOf("Peeler", "Drying racks", "Grinding mill"),
                shelfLife = "12 months",
                targetMarket = "Health food stores, gluten-free bakeries",
                sourceType = SourceType.CROP,
                sourceId = "taro",
                createdAt = "2024-01-01T00:00:00.000Z",
                updatedAt = "2024-01-01T00:00:00.000Z"
            ),
            Byproduct(
                id = "byp_005",
                name = "Taro Chips",
                category = "Snack Food",
                description = "Purple chips with unique flavor",
                marketValue = 4.50,
                processingMethod = "Slicing, frying, seasoning",
                equipment = listOf("Slicer", "Deep fryer", "Seasoning mixer"),
                shelfLife = "6 months",
                targetMarket = "Specialty food stores, online retailers",
                sourceType = SourceType.CROP,
                sourceId = "taro",
                createdAt = "2024-01-01T00:00:00.000Z",
                updatedAt = "2024-01-01T00:00:00.000Z"
            )
        ),
        "sweet_potato" to listOf(
            Byproduct(
                id = "byp_006",
                name = "Sweet Potato Flour",
                category = "Food Processing",
                description = "Natural sweetener and thickener",
                marketValue = 3.00,
                processingMethod = "Washing, drying, grinding",
                equipment = listOf("Washing station", "Drying racks", "Grinding mill"),
                shelfLife = "12 months",
                targetMarket = "Baking industry, health food stores",
                sourceType = SourceType.CROP,
                sourceId = "sweet_potato",
                createdAt = "2024-01-01T00:00:00.000Z",
                updatedAt = "2024-01-01T00:00:00.000Z"
            ),
            Byproduct(
                id = "byp_007",
                name = "Sweet Potato Chips",
                category = "Snack Food",
                description = "Orange chips with natural sweetness",
                marketValue = 3.80,
                processingMethod = "Slicing, frying, seasoning",
                equipment = listOf("Slicer", "Deep fryer", "Seasoning mixer"),
                shelfLife = "6 months",
                targetMarket = "Retail stores, snack distributors",
                sourceType = SourceType.CROP,
                sourceId = "sweet_potato",
                createdAt = "2024-01-01T00:00:00.000Z",
                updatedAt = "2024-01-01T00:00:00.000Z"
            )
        ),
        "banana" to listOf(
            Byproduct(
                id = "byp_008",
                name = "Banana Chips",
                category = "Snack Food",
                description = "Crispy dried banana chips",
                marketValue = 6.00,
                processingMethod = "Slicing, drying, seasoning",
                equipment = listOf("Slicer", "Dehydrator", "Seasoning mixer"),
                shelfLife = "12 months",
                targetMarket = "Retail stores, snack distributors",
                sourceType = SourceType.CROP,
                sourceId = "banana",
                createdAt = "2024-01-01T00:00:00.000Z",
                updatedAt = "2024-01-01T00:00:00.000Z"
            ),
            Byproduct(
                id = "byp_009",
                name = "Banana Flour",
                category = "Food Processing",
                description = "Gluten-free flour from green bananas",
                marketValue = 4.50,
                processingMethod = "Peeling, drying, grinding",
                equipment = listOf("Peeler", "Drying racks", "Grinding mill"),
                shelfLife = "18 months",
                targetMarket = "Health food stores, gluten-free bakeries",
                sourceType = SourceType.CROP,
                sourceId = "banana",
                createdAt = "2024-01-01T00:00:00.000Z",
                updatedAt = "2024-01-01T00:00:00.000Z"
            )
        ),
        "kava" to listOf(
            Byproduct(
                id = "byp_010",
                name = "Kava Powder",
                category = "Beverage",
                description = "Traditional ceremonial drink powder",
                marketValue = 12.00,
                processingMethod = "Drying, grinding",
                equipment = listOf("Drying racks", "Grinding mill"),
                shelfLife = "24 months",
                targetMarket = "Traditional medicine stores, cultural centers",
                sourceType = SourceType.CROP,
                sourceId = "kava",
                createdAt = "2024-01-01T00:00:00.000Z",
                updatedAt = "2024-01-01T00:00:00.000Z"
            ),
            Byproduct(
                id = "byp_011",
                name = "Kava Extract",
                category = "Supplements",
                description = "Concentrated liquid extract",
                marketValue = 25.00,
                processingMethod = "Extraction, concentration",
                equipment = listOf("Extraction equipment", "Concentrator"),
                shelfLife = "36 months",
                targetMarket = "Health supplement stores, online retailers",
                sourceType = SourceType.CROP,
                sourceId = "kava",
                createdAt = "2024-01-01T00:00:00.000Z",
                updatedAt = "2024-01-01T00:00:00.000Z"
            )
        )
    )
    
    // Livestock Byproducts Database
    val livestockByproducts = mapOf(
        "cattle" to listOf(
            Byproduct(
                id = "byp_012",
                name = "Leather",
                category = "Manufacturing",
                description = "High-quality leather for products",
                marketValue = 50.00,
                processingMethod = "Tanning, finishing",
                equipment = listOf("Tanning facility", "Finishing equipment"),
                shelfLife = "Indefinite",
                targetMarket = "Leather goods manufacturers, fashion industry",
                sourceType = SourceType.LIVESTOCK,
                sourceId = "cattle",
                createdAt = "2024-01-01T00:00:00.000Z",
                updatedAt = "2024-01-01T00:00:00.000Z"
            ),
            Byproduct(
                id = "byp_013",
                name = "Bone Meal",
                category = "Fertilizer",
                description = "Nutrient-rich organic fertilizer",
                marketValue = 2.00,
                processingMethod = "Grinding, processing",
                equipment = listOf("Grinding mill", "Processing equipment"),
                shelfLife = "24 months",
                targetMarket = "Garden centers, organic farms",
                sourceType = SourceType.LIVESTOCK,
                sourceId = "cattle",
                createdAt = "2024-01-01T00:00:00.000Z",
                updatedAt = "2024-01-01T00:00:00.000Z"
            )
        ),
        "goats" to listOf(
            Byproduct(
                id = "byp_014",
                name = "Goat Cheese",
                category = "Dairy",
                description = "Artisanal goat cheese varieties",
                marketValue = 12.00,
                processingMethod = "Cheese making, aging",
                equipment = listOf("Cheese making equipment", "Aging room"),
                shelfLife = "3 months",
                targetMarket = "Specialty food stores, restaurants",
                sourceType = SourceType.LIVESTOCK,
                sourceId = "goats",
                createdAt = "2024-01-01T00:00:00.000Z",
                updatedAt = "2024-01-01T00:00:00.000Z"
            ),
            Byproduct(
                id = "byp_015",
                name = "Goat Milk Soap",
                category = "Cosmetics",
                description = "Moisturizing soap with goat milk",
                marketValue = 6.00,
                processingMethod = "Soap making, curing",
                equipment = listOf("Soap making equipment", "Curing racks"),
                shelfLife = "24 months",
                targetMarket = "Cosmetic stores, online retailers",
                sourceType = SourceType.LIVESTOCK,
                sourceId = "goats",
                createdAt = "2024-01-01T00:00:00.000Z",
                updatedAt = "2024-01-01T00:00:00.000Z"
            )
        ),
        "chickens" to listOf(
            Byproduct(
                id = "byp_016",
                name = "Feathers",
                category = "Manufacturing",
                description = "Down feathers for pillows and comforters",
                marketValue = 2.50,
                processingMethod = "Cleaning, sorting, processing",
                equipment = listOf("Cleaning equipment", "Sorting machine"),
                shelfLife = "Indefinite",
                targetMarket = "Bedding manufacturers, craft suppliers",
                sourceType = SourceType.LIVESTOCK,
                sourceId = "chickens",
                createdAt = "2024-01-01T00:00:00.000Z",
                updatedAt = "2024-01-01T00:00:00.000Z"
            ),
            Byproduct(
                id = "byp_017",
                name = "Chicken Manure",
                category = "Fertilizer",
                description = "High-nitrogen organic fertilizer",
                marketValue = 1.50,
                processingMethod = "Composting, packaging",
                equipment = listOf("Composting facility", "Packaging equipment"),
                shelfLife = "12 months",
                targetMarket = "Garden centers, organic farms",
                sourceType = SourceType.LIVESTOCK,
                sourceId = "chickens",
                createdAt = "2024-01-01T00:00:00.000Z",
                updatedAt = "2024-01-01T00:00:00.000Z"
            )
        )
    )
    
    // Market Prices Database
    val marketPrices = listOf(
        MarketPrice(
            id = "mp_001",
            byproductName = "Cassava Flour",
            category = "Food Processing",
            marketType = MarketType.LOCAL,
            price = 2.50,
            currency = "USD",
            location = "Suva",
            date = "2024-01-01",
            source = "Local Market Survey",
            notes = "High demand in local bakeries",
            createdAt = "2024-01-01T00:00:00.000Z"
        ),
        MarketPrice(
            id = "mp_002",
            byproductName = "Banana Chips",
            category = "Snack Food",
            marketType = MarketType.EXPORT,
            price = 7.50,
            currency = "USD",
            location = "International",
            date = "2024-01-01",
            source = "Export Price Index",
            notes = "Premium quality for export",
            createdAt = "2024-01-01T00:00:00.000Z"
        ),
        MarketPrice(
            id = "mp_003",
            byproductName = "Goat Cheese",
            category = "Dairy",
            marketType = MarketType.REGIONAL,
            price = 15.00,
            currency = "USD",
            location = "Pacific Region",
            date = "2024-01-01",
            source = "Regional Trade Data",
            notes = "Artisanal quality",
            createdAt = "2024-01-01T00:00:00.000Z"
        )
    )
    
    // Processing Equipment Database
    val processingEquipment = listOf(
        ProcessingEquipment(
            id = "eq_001",
            userId = "demo_user_1",
            equipmentName = "Solar Dryer",
            category = EquipmentCategory.DRYING,
            status = EquipmentStatus.AVAILABLE,
            purchaseDate = "2024-01-01",
            purchasePrice = 500.00,
            maintenanceSchedule = listOf("2024-06-01", "2024-12-01"),
            location = "Main Farm",
            notes = "Energy efficient drying solution",
            createdAt = "2024-01-01T00:00:00.000Z",
            updatedAt = "2024-01-01T00:00:00.000Z"
        ),
        ProcessingEquipment(
            id = "eq_002",
            userId = "demo_user_1",
            equipmentName = "Grinding Mill",
            category = EquipmentCategory.GRINDING,
            status = EquipmentStatus.AVAILABLE,
            purchaseDate = "2024-01-01",
            purchasePrice = 800.00,
            maintenanceSchedule = listOf("2024-07-01", "2025-01-01"),
            location = "Processing Shed",
            notes = "High capacity grinding mill",
            createdAt = "2024-01-01T00:00:00.000Z",
            updatedAt = "2024-01-01T00:00:00.000Z"
        ),
        ProcessingEquipment(
            id = "eq_003",
            userId = "demo_user_1",
            equipmentName = "Vacuum Sealer",
            category = EquipmentCategory.PACKAGING,
            status = EquipmentStatus.AVAILABLE,
            purchaseDate = "2024-01-01",
            purchasePrice = 200.00,
            maintenanceSchedule = listOf("2024-08-01", "2025-02-01"),
            location = "Packaging Room",
            notes = "Food grade vacuum sealing",
            createdAt = "2024-01-01T00:00:00.000Z",
            updatedAt = "2024-01-01T00:00:00.000Z"
        )
    )
    
    // Helper functions
    fun getByproductsForCrop(cropName: String): List<Byproduct> {
        return cropByproducts[cropName.lowercase().replace(" ", "_")] ?: emptyList()
    }
    
    fun getByproductsForLivestock(animalType: String): List<Byproduct> {
        return livestockByproducts[animalType.lowercase()] ?: emptyList()
    }
    
    fun getMarketPrice(byproductName: String, marketType: MarketType): MarketPrice? {
        return marketPrices.find { it.byproductName == byproductName && it.marketType == marketType }
    }
    
    fun getEquipmentByCategory(category: EquipmentCategory): List<ProcessingEquipment> {
        return processingEquipment.filter { it.category == category }
    }
    
    fun calculatePotentialRevenue(byproduct: Byproduct, quantity: Double): Double {
        return byproduct.marketValue * quantity
    }
    
    fun getTopByproductsByRevenue(limit: Int = 5): List<Pair<String, Double>> {
        val revenueMap = mutableMapOf<String, Double>()
        
        // Calculate revenue for each byproduct
        cropByproducts.values.flatten().forEach { byproduct ->
            val currentRevenue = revenueMap[byproduct.name] ?: 0.0
            revenueMap[byproduct.name] = currentRevenue + byproduct.marketValue
        }
        
        livestockByproducts.values.flatten().forEach { byproduct ->
            val currentRevenue = revenueMap[byproduct.name] ?: 0.0
            revenueMap[byproduct.name] = currentRevenue + byproduct.marketValue
        }
        
        return revenueMap.toList().sortedByDescending { it.second }.take(limit)
    }
}
