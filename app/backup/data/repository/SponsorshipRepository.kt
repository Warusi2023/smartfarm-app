package com.yourcompany.smartfarm.data.repository

import com.yourcompany.smartfarm.data.database.MonetizationDao
import com.yourcompany.smartfarm.data.model.Sponsorship
import kotlinx.coroutines.flow.Flow
import javax.inject.Inject

class SponsorshipRepository @Inject constructor(
    private val monetizationDao: MonetizationDao
) {
    fun getAllSponsorships(): Flow<List<Sponsorship>> = monetizationDao.getAllSponsorships()
    
    suspend fun getSponsorshipById(id: Long): Sponsorship? = monetizationDao.getSponsorshipById(id)
    
    suspend fun insertSponsorship(sponsorship: Sponsorship): Long = monetizationDao.insertSponsorship(sponsorship)
    
    suspend fun updateSponsorship(sponsorship: Sponsorship) = monetizationDao.updateSponsorship(sponsorship)
    
    suspend fun deleteSponsorship(sponsorship: Sponsorship) = monetizationDao.deleteSponsorship(sponsorship)
    
    fun getActiveSponsorships(): Flow<List<Sponsorship>> = monetizationDao.getActiveSponsorships()
}
