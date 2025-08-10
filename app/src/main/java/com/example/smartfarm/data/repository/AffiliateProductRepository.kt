package com.example.smartfarm.data.repository

import com.example.smartfarm.data.database.MonetizationDao
import com.example.smartfarm.data.model.AffiliateProduct
import kotlinx.coroutines.flow.Flow
import javax.inject.Inject

class AffiliateProductRepository @Inject constructor(
    private val monetizationDao: MonetizationDao
) {
    fun getAllAffiliateProducts(): Flow<List<AffiliateProduct>> = monetizationDao.getAllAffiliateProducts()
    
    suspend fun getAffiliateProductById(id: Long): AffiliateProduct? = monetizationDao.getAffiliateProductById(id)
    
    suspend fun insertAffiliateProduct(product: AffiliateProduct): Long = monetizationDao.insertAffiliateProduct(product)
    
    suspend fun updateAffiliateProduct(product: AffiliateProduct) = monetizationDao.updateAffiliateProduct(product)
    
    suspend fun deleteAffiliateProduct(product: AffiliateProduct) = monetizationDao.deleteAffiliateProduct(product)
    
    fun getActiveAffiliateProducts(): Flow<List<AffiliateProduct>> = monetizationDao.getActiveAffiliateProducts()
}
