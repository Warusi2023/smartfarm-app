package com.smartfarm.shared.services

import com.smartfarm.shared.data.ByproductsDatabase
import com.smartfarm.shared.domain.model.*

class ByproductsService {
    
    private val database = ByproductsDatabase
    
    // Get byproducts for a specific crop
    suspend fun getCropByproducts(cropName: String): Result<List<Byproduct>> {
        return try {
            val byproducts = database.getByproductsForCrop(cropName)
            Result.success(byproducts)
        } catch (e: Exception) {
            Result.failure(e)
        }
    }
    
    // Get byproducts for a specific livestock
    suspend fun getLivestockByproducts(animalType: String): Result<List<Byproduct>> {
        return try {
            val byproducts = database.getByproductsForLivestock(animalType)
            Result.success(byproducts)
        } catch (e: Exception) {
            Result.failure(e)
        }
    }
    
    // Get all byproducts
    suspend fun getAllByproducts(): Result<List<Byproduct>> {
        return try {
            val allByproducts = database.cropByproducts.values.flatten() + 
                               database.livestockByproducts.values.flatten()
            Result.success(allByproducts)
        } catch (e: Exception) {
            Result.failure(e)
        }
    }
    
    // Get byproducts by category
    suspend fun getByproductsByCategory(category: String): Result<List<Byproduct>> {
        return try {
            val allByproducts = database.cropByproducts.values.flatten() + 
                               database.livestockByproducts.values.flatten()
            val filteredByproducts = allByproducts.filter { it.category == category }
            Result.success(filteredByproducts)
        } catch (e: Exception) {
            Result.failure(e)
        }
    }
    
    // Get market prices
    suspend fun getMarketPrices(): Result<List<MarketPrice>> {
        return try {
            val prices = database.marketPrices
            Result.success(prices)
        } catch (e: Exception) {
            Result.failure(e)
        }
    }
    
    // Get market price for specific byproduct
    suspend fun getMarketPrice(byproductName: String, marketType: MarketType): Result<MarketPrice?> {
        return try {
            val price = database.getMarketPrice(byproductName, marketType)
            Result.success(price)
        } catch (e: Exception) {
            Result.failure(e)
        }
    }
    
    // Get processing equipment
    suspend fun getProcessingEquipment(): Result<List<ProcessingEquipment>> {
        return try {
            val equipment = database.processingEquipment
            Result.success(equipment)
        } catch (e: Exception) {
            Result.failure(e)
        }
    }
    
    // Get equipment by category
    suspend fun getEquipmentByCategory(category: EquipmentCategory): Result<List<ProcessingEquipment>> {
        return try {
            val equipment = database.getEquipmentByCategory(category)
            Result.success(equipment)
        } catch (e: Exception) {
            Result.failure(e)
        }
    }
    
    // Calculate potential revenue
    suspend fun calculatePotentialRevenue(byproduct: Byproduct, quantity: Double): Result<Double> {
        return try {
            val revenue = database.calculatePotentialRevenue(byproduct, quantity)
            Result.success(revenue)
        } catch (e: Exception) {
            Result.failure(e)
        }
    }
    
    // Get top byproducts by revenue
    suspend fun getTopByproductsByRevenue(limit: Int = 5): Result<List<Pair<String, Double>>> {
        return try {
            val topByproducts = database.getTopByproductsByRevenue(limit)
            Result.success(topByproducts)
        } catch (e: Exception) {
            Result.failure(e)
        }
    }
    
    // Create processing plan
    suspend fun createProcessingPlan(plan: ProcessingPlan): Result<ProcessingPlan> {
        return try {
            // In a real implementation, this would save to a database
            // For now, we'll just return the plan as if it was created
            Result.success(plan)
        } catch (e: Exception) {
            Result.failure(e)
        }
    }
    
    // Update processing plan
    suspend fun updateProcessingPlan(planId: String, plan: ProcessingPlan): Result<ProcessingPlan> {
        return try {
            // In a real implementation, this would update the database
            Result.success(plan)
        } catch (e: Exception) {
            Result.failure(e)
        }
    }
    
    // Delete processing plan
    suspend fun deleteProcessingPlan(planId: String): Result<Boolean> {
        return try {
            // In a real implementation, this would delete from database
            Result.success(true)
        } catch (e: Exception) {
            Result.failure(e)
        }
    }
    
    // Get processing plans
    suspend fun getProcessingPlans(): Result<List<ProcessingPlan>> {
        return try {
            // In a real implementation, this would fetch from database
            val samplePlans = listOf(
                ProcessingPlan(
                    id = "plan_001",
                    userId = "demo_user_1",
                    sourceType = SourceType.CROP,
                    sourceId = "cassava_001",
                    byproductName = "Cassava Flour",
                    quantity = 100.0,
                    processingMethod = "Drying and grinding",
                    equipment = listOf("Drying racks", "Grinding mill"),
                    targetMarket = "Local bakeries",
                    expectedRevenue = 250.0,
                    processingDate = "2024-02-01",
                    notes = "High quality flour for local market",
                    status = ProcessingStatus.PLANNED,
                    createdAt = "2024-01-15T00:00:00.000Z",
                    updatedAt = "2024-01-15T00:00:00.000Z"
                ),
                ProcessingPlan(
                    id = "plan_002",
                    userId = "demo_user_1",
                    sourceType = SourceType.LIVESTOCK,
                    sourceId = "goat_001",
                    byproductName = "Goat Cheese",
                    quantity = 50.0,
                    processingMethod = "Cheese making, aging",
                    equipment = listOf("Cheese making equipment", "Aging room"),
                    targetMarket = "Specialty food stores",
                    expectedRevenue = 600.0,
                    processingDate = "2024-02-15",
                    notes = "Artisanal goat cheese for premium market",
                    status = ProcessingStatus.IN_PROGRESS,
                    createdAt = "2024-01-20T00:00:00.000Z",
                    updatedAt = "2024-01-20T00:00:00.000Z"
                )
            )
            Result.success(samplePlans)
        } catch (e: Exception) {
            Result.failure(e)
        }
    }
    
    // Create sales record
    suspend fun createSalesRecord(record: SalesRecord): Result<SalesRecord> {
        return try {
            // In a real implementation, this would save to database
            Result.success(record)
        } catch (e: Exception) {
            Result.failure(e)
        }
    }
    
    // Get sales records
    suspend fun getSalesRecords(): Result<List<SalesRecord>> {
        return try {
            // In a real implementation, this would fetch from database
            val sampleRecords = listOf(
                SalesRecord(
                    id = "sale_001",
                    userId = "demo_user_1",
                    processingPlanId = "plan_001",
                    byproductName = "Cassava Flour",
                    quantity = 50.0,
                    unitPrice = 2.50,
                    totalAmount = 125.0,
                    buyerName = "Local Bakery",
                    buyerContact = "555-0123",
                    saleDate = "2024-01-15",
                    paymentStatus = PaymentStatus.PAID,
                    notes = "Regular customer order",
                    createdAt = "2024-01-15T00:00:00.000Z",
                    updatedAt = "2024-01-15T00:00:00.000Z"
                ),
                SalesRecord(
                    id = "sale_002",
                    userId = "demo_user_1",
                    processingPlanId = "plan_002",
                    byproductName = "Banana Chips",
                    quantity = 25.0,
                    unitPrice = 4.00,
                    totalAmount = 100.0,
                    buyerName = "Snack Distributor",
                    buyerContact = "555-0456",
                    saleDate = "2024-01-10",
                    paymentStatus = PaymentStatus.PAID,
                    notes = "Bulk order for retail distribution",
                    createdAt = "2024-01-10T00:00:00.000Z",
                    updatedAt = "2024-01-10T00:00:00.000Z"
                )
            )
            Result.success(sampleRecords)
        } catch (e: Exception) {
            Result.failure(e)
        }
    }
    
    // Get revenue analytics
    suspend fun getRevenueAnalytics(): Result<Map<String, Any>> {
        return try {
            val salesRecords = getSalesRecords().getOrThrow()
            val totalRevenue = salesRecords.sumOf { it.totalAmount }
            val totalSales = salesRecords.size
            val averageSaleValue = if (totalSales > 0) totalRevenue / totalSales else 0.0
            
            val monthlyRevenue = salesRecords.groupBy { it.saleDate.substring(0, 7) }
                .mapValues { (_, records) -> records.sumOf { it.totalAmount } }
            
            val analytics = mapOf(
                "totalRevenue" to totalRevenue,
                "totalSales" to totalSales,
                "averageSaleValue" to averageSaleValue,
                "monthlyRevenue" to monthlyRevenue
            )
            
            Result.success(analytics)
        } catch (e: Exception) {
            Result.failure(e)
        }
    }
}
