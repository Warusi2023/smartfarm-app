package com.smartfarm.blockchain

import android.content.Context
import com.smartfarm.data.BlockchainTransaction
import com.smartfarm.data.FarmData
import com.smartfarm.data.CropRecord
import com.smartfarm.data.SustainabilityMetrics
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import java.security.MessageDigest
import java.util.*
import javax.crypto.Cipher
import javax.crypto.spec.SecretKeySpec

/**
 * Blockchain Manager for SmartFarm Supply Chain Transparency
 * Provides immutable records of farming practices and product traceability
 */
class BlockchainManager(private val context: Context) {
    
    companion object {
        private const val TAG = "BlockchainManager"
        private const val ALGORITHM = "AES"
        private const val HASH_ALGORITHM = "SHA-256"
        private const val BLOCK_SIZE = 64
    }
    
    private val blockchain = mutableListOf<Block>()
    private var lastHash: String? = null
    
    init {
        // Initialize genesis block
        createGenesisBlock()
    }
    
    /**
     * Create a new blockchain transaction
     */
    suspend fun createTransaction(
        farmId: String,
        cropType: String,
        action: String,
        data: Map<String, Any>
    ): BlockchainTransaction = withContext(Dispatchers.Default) {
        try {
            val transactionId = generateTransactionId()
            val timestamp = Date()
            val hash = calculateHash(transactionId, timestamp, farmId, cropType, action, data)
            
            val transaction = BlockchainTransaction(
                transactionId = transactionId,
                timestamp = timestamp,
                farmId = farmId,
                cropType = cropType,
                action = action,
                data = data,
                hash = hash,
                previousHash = lastHash
            )
            
            // Add to blockchain
            addTransactionToBlockchain(transaction)
            
            transaction
        } catch (e: Exception) {
            throw BlockchainException("Failed to create transaction: ${e.message}")
        }
    }
    
    /**
     * Record crop planting in blockchain
     */
    suspend fun recordCropPlanting(
        farmData: FarmData,
        cropRecord: CropRecord
    ): BlockchainTransaction = withContext(Dispatchers.Default) {
        val data = mapOf(
            "plantingDate" to cropRecord.plantingDate.toString(),
            "cropVariety" to cropRecord.variety,
            "fieldLocation" to "${farmData.location.latitude},${farmData.location.longitude}",
            "soilProfile" to mapOf(
                "ph" to farmData.soilProfile.ph,
                "organicMatter" to farmData.soilProfile.organicMatter,
                "nitrogen" to farmData.soilProfile.nitrogen
            ),
            "certification" to "Organic Certified",
            "sustainabilityScore" to calculateSustainabilityScore(farmData)
        )
        
        createTransaction(
            farmId = farmData.farmId,
            cropType = cropRecord.cropType,
            action = "CROP_PLANTING",
            data = data
        )
    }
    
    /**
     * Record harvest in blockchain
     */
    suspend fun recordHarvest(
        farmData: FarmData,
        cropRecord: CropRecord,
        yield: Double,
        quality: String
    ): BlockchainTransaction = withContext(Dispatchers.Default) {
        val data = mapOf(
            "harvestDate" to Date().toString(),
            "yield" to yield,
            "quality" to quality,
            "harvestMethod" to "Sustainable harvesting",
            "postHarvestTreatment" to "Minimal processing",
            "packaging" to "Eco-friendly materials",
            "transportMethod" to "Local distribution"
        )
        
        createTransaction(
            farmId = farmData.farmId,
            cropType = cropRecord.cropType,
            action = "CROP_HARVEST",
            data = data
        )
    }
    
    /**
     * Record sustainability practices
     */
    suspend fun recordSustainabilityPractice(
        farmData: FarmData,
        practice: String,
        metrics: SustainabilityMetrics
    ): BlockchainTransaction = withContext(Dispatchers.Default) {
        val data = mapOf(
            "practice" to practice,
            "carbonFootprint" to metrics.carbonFootprint,
            "waterUsage" to metrics.waterUsage,
            "energyConsumption" to metrics.energyConsumption,
            "certification" to metrics.certificationStatus,
            "verificationDate" to Date().toString()
        )
        
        createTransaction(
            farmId = farmData.farmId,
            cropType = "SUSTAINABILITY",
            action = "SUSTAINABILITY_PRACTICE",
            data = data
        )
    }
    
    /**
     * Verify product authenticity
     */
    suspend fun verifyProductAuthenticity(
        transactionId: String,
        productHash: String
    ): VerificationResult = withContext(Dispatchers.Default) {
        try {
            val transaction = findTransaction(transactionId)
            if (transaction == null) {
                return@withContext VerificationResult(
                    isValid = false,
                    reason = "Transaction not found",
                    blockchainData = null
                )
            }
            
            val calculatedHash = calculateHash(
                transaction.transactionId,
                transaction.timestamp,
                transaction.farmId,
                transaction.cropType,
                transaction.action,
                transaction.data
            )
            
            val isValid = calculatedHash == productHash
            
            VerificationResult(
                isValid = isValid,
                reason = if (isValid) "Product verified" else "Hash mismatch",
                blockchainData = if (isValid) transaction else null
            )
        } catch (e: Exception) {
            VerificationResult(
                isValid = false,
                reason = "Verification failed: ${e.message}",
                blockchainData = null
            )
        }
    }
    
    /**
     * Generate QR code data for product traceability
     */
    suspend fun generateTraceabilityQR(
        transactionId: String
    ): TraceabilityData = withContext(Dispatchers.Default) {
        val transaction = findTransaction(transactionId)
            ?: throw BlockchainException("Transaction not found")
        
        val qrData = mapOf(
            "transactionId" to transactionId,
            "farmId" to transaction.farmId,
            "cropType" to transaction.cropType,
            "action" to transaction.action,
            "timestamp" to transaction.timestamp.toString(),
            "hash" to transaction.hash,
            "traceabilityUrl" to "https://smartfarm.com/trace/$transactionId"
        )
        
        TraceabilityData(
            qrCodeData = qrData.toString(),
            blockchainUrl = "https://smartfarm.com/blockchain/$transactionId",
            verificationHash = transaction.hash,
            farmInformation = getFarmInformation(transaction.farmId)
        )
    }
    
    /**
     * Get complete product journey
     */
    suspend fun getProductJourney(
        farmId: String,
        cropType: String
    ): ProductJourney = withContext(Dispatchers.Default) {
        val transactions = blockchain
            .flatMap { it.transactions }
            .filter { it.farmId == farmId && it.cropType == cropType }
            .sortedBy { it.timestamp }
        
        val journeySteps = transactions.map { transaction ->
            JourneyStep(
                action = transaction.action,
                timestamp = transaction.timestamp,
                data = transaction.data,
                hash = transaction.hash
            )
        }
        
        ProductJourney(
            farmId = farmId,
            cropType = cropType,
            journeySteps = journeySteps,
            totalSteps = journeySteps.size,
            verificationStatus = "Verified",
            sustainabilityScore = calculateOverallSustainabilityScore(transactions)
        )
    }
    
    // Private helper methods
    private fun createGenesisBlock() {
        val genesisBlock = Block(
            index = 0,
            timestamp = Date(),
            transactions = emptyList(),
            previousHash = null,
            hash = "0000000000000000000000000000000000000000000000000000000000000000"
        )
        blockchain.add(genesisBlock)
        lastHash = genesisBlock.hash
    }
    
    private fun addTransactionToBlockchain(transaction: BlockchainTransaction) {
        // Add to current block or create new block
        if (blockchain.last().transactions.size >= BLOCK_SIZE) {
            createNewBlock(listOf(transaction))
        } else {
            blockchain.last().transactions.add(transaction)
        }
        
        lastHash = transaction.hash
    }
    
    private fun createNewBlock(transactions: List<BlockchainTransaction>) {
        val newBlock = Block(
            index = blockchain.size,
            timestamp = Date(),
            transactions = transactions,
            previousHash = lastHash,
            hash = calculateBlockHash(blockchain.size, Date(), transactions, lastHash)
        )
        blockchain.add(newBlock)
    }
    
    private fun calculateHash(
        transactionId: String,
        timestamp: Date,
        farmId: String,
        cropType: String,
        action: String,
        data: Map<String, Any>
    ): String {
        val input = "$transactionId$timestamp$farmId$cropType$action$data"
        val digest = MessageDigest.getInstance(HASH_ALGORITHM)
        val hashBytes = digest.digest(input.toByteArray())
        return hashBytes.joinToString("") { "%02x".format(it) }
    }
    
    private fun calculateBlockHash(
        index: Int,
        timestamp: Date,
        transactions: List<BlockchainTransaction>,
        previousHash: String?
    ): String {
        val input = "$index$timestamp$transactions$previousHash"
        val digest = MessageDigest.getInstance(HASH_ALGORITHM)
        val hashBytes = digest.digest(input.toByteArray())
        return hashBytes.joinToString("") { "%02x".format(it) }
    }
    
    private fun generateTransactionId(): String {
        return UUID.randomUUID().toString()
    }
    
    private fun findTransaction(transactionId: String): BlockchainTransaction? {
        return blockchain
            .flatMap { it.transactions }
            .find { it.transactionId == transactionId }
    }
    
    private fun calculateSustainabilityScore(farmData: FarmData): Double {
        // Calculate sustainability score based on various factors
        var score = 0.0
        
        // Soil health
        if (farmData.soilProfile.organicMatter > 3.0) score += 25
        if (farmData.soilProfile.ph in 6.0..7.5) score += 20
        
        // Water efficiency
        if (farmData.irrigationSystem.efficiency > 0.8) score += 25
        
        // Equipment efficiency
        val modernEquipment = farmData.equipment.count { it.year > 2015 }
        score += (modernEquipment.toDouble() / farmData.equipment.size) * 30
        
        return score.coerceIn(0.0, 100.0)
    }
    
    private fun calculateOverallSustainabilityScore(transactions: List<BlockchainTransaction>): Double {
        // Calculate overall sustainability score from all transactions
        val sustainabilityTransactions = transactions.filter { it.action == "SUSTAINABILITY_PRACTICE" }
        if (sustainabilityTransactions.isEmpty()) return 0.0
        
        val totalScore = sustainabilityTransactions.sumOf { 
            (it.data["carbonFootprint"] as? Double) ?: 0.0 
        }
        return totalScore / sustainabilityTransactions.size
    }
    
    private fun getFarmInformation(farmId: String): Map<String, Any> {
        // This would typically fetch from a database
        return mapOf(
            "farmName" to "SmartFarm Demo",
            "location" to "Sustainable Agriculture Zone",
            "certification" to "Organic Certified",
            "sustainabilityRating" to "Gold Level"
        )
    }
}

// Data classes for blockchain operations
data class Block(
    val index: Int,
    val timestamp: Date,
    val transactions: MutableList<BlockchainTransaction>,
    val previousHash: String?,
    val hash: String
)

data class VerificationResult(
    val isValid: Boolean,
    val reason: String,
    val blockchainData: BlockchainTransaction?
)

data class TraceabilityData(
    val qrCodeData: String,
    val blockchainUrl: String,
    val verificationHash: String,
    val farmInformation: Map<String, Any>
)

data class ProductJourney(
    val farmId: String,
    val cropType: String,
    val journeySteps: List<JourneyStep>,
    val totalSteps: Int,
    val verificationStatus: String,
    val sustainabilityScore: Double
)

data class JourneyStep(
    val action: String,
    val timestamp: Date,
    val data: Map<String, Any>,
    val hash: String
)

class BlockchainException(message: String) : Exception(message)
